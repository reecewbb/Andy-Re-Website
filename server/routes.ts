import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { Resend } from "resend";
import { appendApplicationRow } from "./googleSheets";
import { appendSummerClinicRow } from "./googleSheetsSummerClinics";
import { randomUUID } from "crypto";
import Stripe from "stripe";
import {
  findSummerClinicRegistration,
  updateSummerClinicPaymentStatus,
} from "./googleSheetsSummerClinics";

function escapeHtml(str: unknown): string {
  return String(str ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function rateLimit(ip: string, limit = 5, windowMs = 15 * 60 * 1000): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + windowMs });
    return false;
  }
  if (entry.count >= limit) return true;
  entry.count++;
  return false;
}

function getStripeClient(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("Missing STRIPE_SECRET_KEY");

  // Pin Stripe API version for stability.
  return new Stripe(key);
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const CLINIC_KEYS = ["hartstown", "portmarnock"] as const;
type ClinicKey = typeof CLINIC_KEYS[number];

function normalizeClinic(input: unknown): ClinicKey | null {
  const v = String(input ?? "").trim().toLowerCase();
  return (CLINIC_KEYS as readonly string[]).includes(v) ? (v as ClinicKey) : null;
}

function makeRegistrationId(): string {
  // Short, friendly ID; unique enough for this scope
  // Example: SC-2026-2f3a9c
  const short = randomUUID().split("-")[0];
  return `SC-2026-${short}`;
}

function resolveFromEmail(): string {
  const configured = process.env.APPLICATION_EMAIL_FROM;
  if (configured) {
    const match = configured.match(/<([^>]+)>/) || [null, configured];
    const address = match[1] ?? configured;
    const domain = address.split("@")[1] ?? "";
    if (!domain.includes("andyreidelitesocceracademy.ie")) {
      console.warn(
        `[email] WARNING: APPLICATION_EMAIL_FROM domain "${domain}" may not be verified for sending. ` +
        `Falling back to root domain. Set APPLICATION_EMAIL_FROM explicitly to suppress this warning.`
      );
      return "Andy Reid Elite Soccer Academy <no-reply@andyreidelitesocceracademy.ie>";
    }
    return configured;
  }
  return "Andy Reid Elite Soccer Academy <no-reply@andyreidelitesocceracademy.ie>";
}

async function sendEmail(
  resend: Resend,
  label: string,
  payload: { from: string; to: string; replyTo?: string; subject: string; html: string }
): Promise<void> {
  console.log(`[email] Attempting to send ${label} to: ${payload.to}`);
  const { data, error } = await resend.emails.send(payload);
  if (error) {
    console.error(`[email] FAILED to send ${label}:`, JSON.stringify(error));
  } else {
    console.log(`[email] Successfully sent ${label}. Message ID: ${data?.id ?? "unknown"}`);
  }
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  app.get("/api/email-health", (_req: Request, res: Response) => {
    const from = resolveFromEmail();
    const to = process.env.APPLICATION_EMAIL_TO || "admissions@andyreidelitesocceracademy.ie";
    res.json({
      resend_api_key_present: Boolean(process.env.RESEND_API_KEY),
      application_email_to_present: Boolean(process.env.APPLICATION_EMAIL_TO),
      application_email_from_present: Boolean(process.env.APPLICATION_EMAIL_FROM),
      resolved_from: from,
      resolved_to: to,
    });
  });

  app.post("/api/apply", async (req: Request, res: Response) => {
    try {
      const ip = (req.headers["x-forwarded-for"] as string)?.split(",")[0].trim()
        || req.socket.remoteAddress
        || "unknown";

      if (rateLimit(ip)) {
        return res.status(429).json({ error: "Too many requests. Please try again later." });
      }

      const body = req.body;

      if (body.honeypot && body.honeypot.length > 0) {
        return res.status(200).json({ ok: true });
      }

      const required = [
        "playerName", "dob", "gender", "school",
        "county", "club", "position",
        "parentName", "parentEmail", "parentPhone",
      ];
      for (const field of required) {
        if (!body[field] || String(body[field]).trim() === "") {
          return res.status(400).json({ error: `Missing required field: ${field}` });
        }
      }

      const parentEmail = String(body.parentEmail).trim().replace(/[\r\n]/g, "");
      if (!EMAIL_REGEX.test(parentEmail)) {
        return res.status(400).json({ error: "Invalid parent email address." });
      }

      console.log("=== NEW APPLICATION RECEIVED ===");
      console.log(`Player: ${body.playerName} | DOB: ${body.dob} | Club: ${body.club}`);
      console.log(`Parent: ${body.parentName} | Email: ${parentEmail} | Phone: ${body.parentPhone}`);
      console.log("================================");

      const submittedAt = new Date().toLocaleString("en-IE");

      try {
        await appendApplicationRow({
          submittedAt,
          playerName: body.playerName,
          dob: body.dob,
          gender: body.gender,
          school: body.school,
          county: body.county,
          club: body.club,
          position: body.position,
          level: body.level,
          notes: body.notes,
          parentName: body.parentName,
          parentEmail: parentEmail,
          parentPhone: body.parentPhone,
          hearAboutUs: body.hearAboutUs,
          message: body.message,
          ip,
        });
        console.log("[sheets] appended application row");
      } catch (err) {
        console.error("[sheets] FAILED to append row:", err);
      }

      const resendKey = process.env.RESEND_API_KEY;
      if (resendKey) {
        const adminEmail = process.env.APPLICATION_EMAIL_TO || "admissions@andyreidelitesocceracademy.ie";
        const fromEmail = resolveFromEmail();

        console.log(`[email] From: ${fromEmail}`);
        console.log(`[email] Admin recipient: ${adminEmail}`);

        const htmlBody = `
          <div style="font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto; background: #111316; color: #E2E2E1; padding: 40px; border-radius: 8px;">
            <div style="background: #9A0A0A; padding: 20px; border-radius: 6px; margin-bottom: 30px;">
              <h1 style="color: white; margin: 0; font-size: 24px; letter-spacing: 2px;">NEW APPLICATION — AREID ACADEMY</h1>
            </div>

            <h2 style="color: #9A0A0A; font-size: 14px; letter-spacing: 2px; text-transform: uppercase; border-bottom: 1px solid #333; padding-bottom: 10px;">Player Details</h2>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
              ${[
                ["Full Name", escapeHtml(body.playerName)],
                ["Date of Birth", escapeHtml(body.dob)],
                ["Gender", escapeHtml(body.gender)],
                ["Current School", escapeHtml(body.school)],
                ["County", escapeHtml(body.county)],
                ["Current Club", escapeHtml(body.club)],
                ["Position(s)", escapeHtml(body.position)],
                ["Level / League", escapeHtml(body.level) || "—"],
              ].map(([k, v]) => `<tr><td style="padding: 8px; background: #1a1e25; color: #B9B2A5; width: 40%; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">${k}</td><td style="padding: 8px; background: #1a1e25; color: #E2E2E1;">${v}</td></tr>`).join("")}
            </table>

            ${body.notes ? `
            <h2 style="color: #9A0A0A; font-size: 14px; letter-spacing: 2px; text-transform: uppercase; border-bottom: 1px solid #333; padding-bottom: 10px;">Playing History & Achievements</h2>
            <div style="background: #1a1e25; padding: 12px; margin-bottom: 24px; color: #E2E2E1; font-size: 14px;">${escapeHtml(body.notes)}</div>
            ` : ""}

            <h2 style="color: #9A0A0A; font-size: 14px; letter-spacing: 2px; text-transform: uppercase; border-bottom: 1px solid #333; padding-bottom: 10px;">Parent / Guardian</h2>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
              ${[
                ["Name", escapeHtml(body.parentName)],
                ["Email", escapeHtml(parentEmail)],
                ["Phone", escapeHtml(body.parentPhone)],
                ["How Did They Hear?", escapeHtml(body.hearAboutUs) || "—"],
                ["Message", escapeHtml(body.message) || "—"],
              ].map(([k, v]) => `<tr><td style="padding: 8px; background: #1a1e25; color: #B9B2A5; width: 40%; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">${k}</td><td style="padding: 8px; background: #1a1e25; color: #E2E2E1;">${v}</td></tr>`).join("")}
            </table>

            <p style="color: #655955; font-size: 12px; text-align: center; margin-top: 30px;">Submitted via andyreidelitesocceracademy.ie on ${new Date().toLocaleString("en-IE")}</p>
          </div>
        `;

        const confirmationHtml = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #111316; color: #E2E2E1; padding: 40px; border-radius: 8px;">
            <div style="background: #9A0A0A; padding: 20px; border-radius: 6px; margin-bottom: 30px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 24px; letter-spacing: 2px;">APPLICATION RECEIVED</h1>
            </div>
            <p style="color: #B9B2A5;">Dear ${escapeHtml(body.parentName)},</p>
            <p style="color: #B9B2A5;">Thank you for submitting an application for <strong style="color: white;">${escapeHtml(body.playerName)}</strong> to the Andy Reid Elite Soccer Academy Transition Year Programme.</p>
            <p style="color: #B9B2A5;">We've received your application and our coaching team will review it carefully. You can expect to hear from us within <strong style="color: white;">5-7 working days</strong>.</p>

            <div style="background: #1a1e25; border: 1px solid #333; border-radius: 6px; padding: 20px; margin: 30px 0;">
              <h3 style="color: #9A0A0A; font-size: 12px; letter-spacing: 2px; text-transform: uppercase; margin-top: 0;">What Happens Next?</h3>
              <ol style="color: #B9B2A5; padding-left: 20px; line-height: 1.8;">
                <li>Our team reviews your application</li>
                <li>Shortlisted players are invited to an Assessment Day</li>
                <li>Successful applicants receive a formal offer</li>
              </ol>
            </div>

            <p style="color: #B9B2A5;">If you have any questions, please don't hesitate to get in touch:</p>
            <a href="mailto:admissions@andyreidelitesocceracademy.ie" style="color: #9A0A0A;">admissions@andyreidelitesocceracademy.ie</a>

            <p style="color: #655955; font-size: 12px; margin-top: 30px;">Andy Reid Elite Soccer Academy | TU Blanchardstown &amp; Corduff Sports Centre, Dublin 15</p>
          </div>
        `;

        const resend = new Resend(resendKey);

        await Promise.allSettled([
          sendEmail(resend, "admin notification", {
            from: fromEmail,
            to: adminEmail,
            replyTo: parentEmail,
            subject: `New Application: ${String(body.playerName).replace(/[\r\n]/g, " ")} — ${String(body.club).replace(/[\r\n]/g, " ")}`,
            html: htmlBody,
          }),
          sendEmail(resend, "applicant confirmation", {
            from: fromEmail,
            to: parentEmail,
            replyTo: adminEmail,
            subject: "Application Received — Andy Reid Elite Soccer Academy",
            html: confirmationHtml,
          }),
        ]);
      } else {
        console.warn("[email] RESEND_API_KEY not set — emails not sent.");
      }

      return res.status(200).json({ ok: true, message: "Application submitted successfully" });
    } catch (err: any) {
      console.error("Application error:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/summer-clinics/checkout-session", async (req: Request, res: Response) => {
    try {
      const sessionId = String(req.query.session_id ?? "").trim();
      if (!sessionId) return res.status(400).json({ error: "Missing session_id" });

      const stripe = getStripeClient();
      const session = await stripe.checkout.sessions.retrieve(sessionId);

      // ✅ Only treat it as success if Stripe says paid
      if (session.payment_status !== "paid") {
        return res.status(400).json({
          error: "Payment not completed.",
          payment_status: session.payment_status,
          status: session.status,
        });
      }

      const registrationId =
        (session.metadata?.registrationId as string | undefined) ||
        (session.client_reference_id as string | undefined) ||
        "";

      if (!registrationId) {
        return res.status(400).json({ error: "Missing registrationId on Stripe session." });
      }

      return res.json({
        ok: true,
        registrationId,
        payment_status: session.payment_status,
        status: session.status,
      });
    } catch (err) {
      console.error("checkout-session lookup error:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/summer-clinics/register", async (req: Request, res: Response) => {
    try {
      const ip =
        (req.headers["x-forwarded-for"] as string)?.split(",")[0].trim() ||
        req.socket.remoteAddress ||
        "unknown";

      if (rateLimit(ip)) {
        return res.status(429).json({ error: "Too many requests. Please try again later." });
      }

      const body = req.body ?? {};

      // Honeypot
      if (body.honeypot && String(body.honeypot).trim().length > 0) {
        return res.status(200).json({ ok: true });
      }

      const clinic = normalizeClinic(body.clinic);
      if (!clinic) {
        return res.status(400).json({ error: "Invalid clinic selection." });
      }

      // Required fields for Summer Clinics
      const required = [
        "playerName",
        "dob",
        "gender",
        "county",
        "club",
        "position",
        "levelLeague",
        "emergencyName",
        "emergencyPhone",
        "parentName",
        "parentEmail",
        "parentPhone",
        "agreeTerms",
      ];

      for (const field of required) {
        const val = body[field];
        if (field === "agreeTerms") {
          if (val !== true) {
            return res.status(400).json({ error: "You must agree to the Terms & Conditions to continue." });
          }
        } else {
          if (!val || String(val).trim() === "") {
            return res.status(400).json({ error: `Missing required field: ${field}` });
          }
        }
      }

      const parentEmail = String(body.parentEmail).trim().replace(/[\r\n]/g, "");
      if (!EMAIL_REGEX.test(parentEmail)) {
        return res.status(400).json({ error: "Invalid parent/guardian email address." });
      }

      const registrationId = makeRegistrationId();
      const timestamp = new Date().toLocaleString("en-IE");

      // Save to Google Sheets (Payment pending for now)
      try {
        await appendSummerClinicRow({
          timestamp,
          registrationId,
          clinic,
          playerName: String(body.playerName).trim(),
          dob: String(body.dob).trim(),
          gender: String(body.gender).trim(),
          county: String(body.county).trim(),
          club: String(body.club).trim(),
          position: String(body.position).trim(),
          levelLeague: String(body.levelLeague).trim(),
          medicalInfo: String(body.medicalInfo ?? "").trim(),
          emergencyName: String(body.emergencyName).trim(),
          emergencyPhone: String(body.emergencyPhone).trim(),
          parentName: String(body.parentName).trim(),
          parentEmail,
          parentPhone: String(body.parentPhone).trim(),
          termsAccepted: true,
          paymentStatus: "Pending",
          notes: "",
          ip,
        });
        console.log("[sheets] appended summer clinic row");
      } catch (err) {
        console.error("[sheets] FAILED to append summer clinic row:", err);
        // don't block registration if sheets fails
      }

      // Email via Resend
      const resendKey = process.env.RESEND_API_KEY;
      if (resendKey) {
        const resend = new Resend(resendKey);
        const adminEmail = process.env.APPLICATION_EMAIL_TO || "admissions@andyreidelitesocceracademy.ie";
        const fromEmail = resolveFromEmail();

        const clinicTitle =
          clinic === "hartstown" ? "Hartstown / Huntstown FC" : "Portmarnock FC";

        const clinicDates =
          clinic === "hartstown"
            ? "July 7th, 8th & 9th (10:00–14:00)"
            : "July 14th, 15th & 16th (10:00–14:00)";

        const adminHtml = `
          <div style="font-family: Arial, sans-serif; max-width: 720px; margin: 0 auto; background:#111316; color:#E2E2E1; padding:32px; border-radius:10px;">
            <div style="background:#9A0A0A; padding:16px; border-radius:8px; margin-bottom:22px;">
              <h1 style="margin:0; color:white; font-size:20px; letter-spacing:2px;">SUMMER CLINIC REGISTRATION (PENDING)</h1>
            </div>

            <p style="margin:0 0 14px 0; color:#B9B2A5;">Registration ID: <strong style="color:white;">${escapeHtml(registrationId)}</strong></p>
            <p style="margin:0 0 14px 0; color:#B9B2A5;">Payment Status: <strong style="color:white;">Pending</strong></p>

            <h2 style="color:#9A0A0A; font-size:13px; letter-spacing:2px; text-transform:uppercase; border-bottom:1px solid #333; padding-bottom:8px;">Clinic</h2>
            <p style="margin:10px 0 20px 0; color:#E2E2E1;">
              <strong>${escapeHtml(clinicTitle)}</strong><br/>
              ${escapeHtml(clinicDates)}<br/>
              Price: €150 (payment pending)
            </p>

            <h2 style="color:#9A0A0A; font-size:13px; letter-spacing:2px; text-transform:uppercase; border-bottom:1px solid #333; padding-bottom:8px;">Player</h2>
            <table style="width:100%; border-collapse:collapse; margin:12px 0 20px 0;">
              ${[
                ["Full Name", body.playerName],
                ["DOB", body.dob],
                ["Gender", body.gender],
                ["County", body.county],
                ["Club", body.club],
                ["Position", body.position],
                ["Level/League", body.levelLeague],
              ]
                .map(
                  ([k, v]) =>
                    `<tr><td style="padding:8px; background:#1a1e25; color:#B9B2A5; width:40%; font-size:12px; text-transform:uppercase; letter-spacing:1px;">${k}</td><td style="padding:8px; background:#1a1e25; color:#E2E2E1;">${escapeHtml(v)}</td></tr>`
                )
                .join("")}
            </table>

            <h2 style="color:#9A0A0A; font-size:13px; letter-spacing:2px; text-transform:uppercase; border-bottom:1px solid #333; padding-bottom:8px;">Medical (optional)</h2>
            <div style="background:#1a1e25; padding:12px; border-radius:6px; margin:12px 0 20px 0;">
              <div style="color:#E2E2E1;">${escapeHtml(body.medicalInfo) || "—"}</div>
            </div>

            <h2 style="color:#9A0A0A; font-size:13px; letter-spacing:2px; text-transform:uppercase; border-bottom:1px solid #333; padding-bottom:8px;">Emergency Contact</h2>
            <table style="width:100%; border-collapse:collapse; margin:12px 0 20px 0;">
              ${[
                ["Name", body.emergencyName],
                ["Phone", body.emergencyPhone],
              ]
                .map(
                  ([k, v]) =>
                    `<tr><td style="padding:8px; background:#1a1e25; color:#B9B2A5; width:40%; font-size:12px; text-transform:uppercase; letter-spacing:1px;">${k}</td><td style="padding:8px; background:#1a1e25; color:#E2E2E1;">${escapeHtml(v)}</td></tr>`
                )
                .join("")}
            </table>

            <h2 style="color:#9A0A0A; font-size:13px; letter-spacing:2px; text-transform:uppercase; border-bottom:1px solid #333; padding-bottom:8px;">Parent / Guardian</h2>
            <table style="width:100%; border-collapse:collapse; margin:12px 0 20px 0;">
              ${[
                ["Name", body.parentName],
                ["Email", parentEmail],
                ["Phone", body.parentPhone],
              ]
                .map(
                  ([k, v]) =>
                    `<tr><td style="padding:8px; background:#1a1e25; color:#B9B2A5; width:40%; font-size:12px; text-transform:uppercase; letter-spacing:1px;">${k}</td><td style="padding:8px; background:#1a1e25; color:#E2E2E1;">${escapeHtml(v)}</td></tr>`
                )
                .join("")}
            </table>

            <p style="color:#655955; font-size:12px; text-align:center; margin-top:18px;">Submitted on ${escapeHtml(timestamp)}</p>
          </div>
        `;

        const parentHtml = `
          <div style="font-family: Arial, sans-serif; max-width: 640px; margin: 0 auto; background:#111316; color:#E2E2E1; padding:32px; border-radius:10px;">
            <div style="background:#9A0A0A; padding:16px; border-radius:8px; margin-bottom:22px; text-align:center;">
              <h1 style="margin:0; color:white; font-size:20px; letter-spacing:2px;">REGISTRATION RECEIVED</h1>
            </div>

            <p style="color:#B9B2A5;">Dear ${escapeHtml(body.parentName)},</p>
            <p style="color:#B9B2A5;">
              Thank you — we’ve received your registration for <strong style="color:white;">${escapeHtml(body.playerName)}</strong>.
            </p>

            <div style="background:#1a1e25; border:1px solid #333; border-radius:8px; padding:16px; margin:18px 0;">
              <p style="margin:0 0 10px 0; color:#E2E2E1;"><strong>Clinic:</strong> ${escapeHtml(clinicTitle)}</p>
              <p style="margin:0 0 10px 0; color:#E2E2E1;"><strong>Schedule:</strong> ${escapeHtml(clinicDates)}</p>
              <p style="margin:0; color:#E2E2E1;"><strong>Price:</strong> €150</p>
            </div>

            <p style="color:#B9B2A5;">
              <strong style="color:white;">Payment is required to confirm your place.</strong>
              Please complete payment using the payment link shown after submitting the form.
            </p>

            <p style="color:#B9B2A5;">
              You can view the Terms &amp; Conditions here:
              <a href="https://andyreidelitesocceracademy.ie/summer-clinics/terms" style="color:#9A0A0A;">Terms &amp; Conditions</a>
            </p>

            <p style="color:#655955; font-size:12px; margin-top:24px;">
              Andy Reid Elite Soccer Academy
            </p>
          </div>
        `;

        await Promise.allSettled([
          sendEmail(resend, "summer clinic admin notification", {
            from: fromEmail,
            to: adminEmail,
            replyTo: parentEmail,
            subject: `Summer Clinic Registration (PENDING) — ${clinicTitle} — ${String(body.playerName).replace(/[\r\n]/g, " ")}`,
            html: adminHtml,
          }),
          sendEmail(resend, "summer clinic parent confirmation", {
            from: fromEmail,
            to: parentEmail,
            replyTo: adminEmail,
            subject: "Registration Received — Andy Reid Elite Summer Clinics",
            html: parentHtml,
          }),
        ]);
      } else {
        console.warn("[email] RESEND_API_KEY not set — summer clinic emails not sent.");
      }

      return res.status(200).json({
        ok: true,
        registrationId,
        redirectUrl: `/summer-clinics/payment?rid=${encodeURIComponent(registrationId)}`,
      });
    } catch (err: any) {
      console.error("Summer clinic registration error:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/summer-clinics/create-checkout-session", async (req: Request, res: Response) => {
    try {
      const registrationId = String(req.body?.registrationId ?? "").trim();
      if (!registrationId) {
        return res.status(400).json({ error: "Missing registrationId" });
      }

      const priceId = process.env.STRIPE_PRICE_ID;
      if (!priceId) return res.status(500).json({ error: "Missing STRIPE_PRICE_ID" });

      const successUrl = process.env.STRIPE_SUCCESS_URL;
      const cancelUrl = process.env.STRIPE_CANCEL_URL;
      if (!successUrl || !cancelUrl) {
        return res.status(500).json({ error: "Missing STRIPE_SUCCESS_URL / STRIPE_CANCEL_URL" });
      }

      // Look up the registration in Sheets so we can:
      // - ensure the rid exists
      // - get parent email for receipt/customer_email
      // - prevent tampering
      const found = await findSummerClinicRegistration(registrationId);
      if (!found) {
        return res.status(404).json({ error: "Registration not found. Please re-submit the form." });
      }

      const stripe = getStripeClient();

      const cancelWithRid =
        cancelUrl.includes("?")
          ? `${cancelUrl}&rid=${encodeURIComponent(registrationId)}`
          : `${cancelUrl}?rid=${encodeURIComponent(registrationId)}`;

      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        line_items: [{ price: priceId, quantity: 1 }],
        success_url: successUrl,
        cancel_url: cancelWithRid,
        customer_email: found.parentEmail || undefined,
        client_reference_id: registrationId,
        metadata: { registrationId, clinic: found.clinic, playerName: found.playerName },
        payment_intent_data: { metadata: { registrationId } },
      });

      return res.json({ ok: true, url: session.url });
    } catch (err) {
      console.error("Create checkout session error:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/stripe/webhook", async (req: Request, res: Response) => {
    const sig = req.headers["stripe-signature"];
    if (!sig || typeof sig !== "string") {
      return res.status(400).send("Missing stripe-signature");
    }

    const secret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!secret) return res.status(500).send("Missing STRIPE_WEBHOOK_SECRET");

    let event: Stripe.Event;

    try {
      const stripe = getStripeClient();
      const rawBody = req.body as Buffer; // provided by express.raw() in server/index.ts
      event = stripe.webhooks.constructEvent(rawBody, sig, secret);
    } catch (err) {
      console.error("Webhook signature verification failed:", err);
      return res.status(400).send("Webhook Error");
    }

    try {
      // We care about checkout completion
      if (event.type === "checkout.session.completed") {
        const session = event.data.object as Stripe.Checkout.Session;

        const paid = session.payment_status === "paid";
        const registrationId =
          (session.metadata?.registrationId as string | undefined) ||
          (session.client_reference_id as string | undefined) ||
          "";

        if (paid && registrationId) {
          const notes = `Paid via Stripe. session=${session.id} payment_intent=${session.payment_intent ?? ""} paid_email_sent=1`;

          const updated = await updateSummerClinicPaymentStatus({
            registrationId,
            paymentStatus: "Paid",
            notes,
          });

          console.log(`[stripe] checkout.session.completed paid. rid=${registrationId} updated=${updated}`);

          if (!updated) {
            console.warn(
              `[stripe] paid but could not update sheet. skipping emails. rid=${registrationId}`,
            );
            return res.json({ received: true });
          }

          // Send "PAID" emails (admin + parent)
          const resendKey = process.env.RESEND_API_KEY;
          if (!resendKey) {
            console.warn("[email] RESEND_API_KEY not set — paid emails not sent.");
            return res.json({ received: true });
          }

          // Look up registration details so we can email the correct parent
          const found = await findSummerClinicRegistration(registrationId);
          if (!found) {
            console.warn(`[stripe] Paid but could not find registration in Sheets. rid=${registrationId}`);
            return res.json({ received: true });
          }

          const resend = new Resend(resendKey);
          const adminEmail = process.env.APPLICATION_EMAIL_TO || "admissions@andyreidelitesocceracademy.ie";
          const fromEmail = resolveFromEmail();

          const clinicTitle =
            found.clinic === "hartstown" ? "Hartstown / Huntstown FC" :
            found.clinic === "portmarnock" ? "Portmarnock FC" :
            found.clinic;

          const paidAdminHtml = `
            <div style="font-family: Arial, sans-serif; max-width: 720px; margin: 0 auto; background:#111316; color:#E2E2E1; padding:32px; border-radius:10px;">
              <div style="background:#9A0A0A; padding:16px; border-radius:8px; margin-bottom:22px;">
                <h1 style="margin:0; color:white; font-size:20px; letter-spacing:2px;">SUMMER CLINIC PAYMENT CONFIRMED</h1>
              </div>

              <p style="margin:0 0 14px 0; color:#B9B2A5;">Registration ID: <strong style="color:white;">${escapeHtml(registrationId)}</strong></p>
              <p style="margin:0 0 14px 0; color:#B9B2A5;">Payment Status: <strong style="color:white;">Paid</strong></p>

              <div style="background:#1a1e25; border:1px solid #333; border-radius:8px; padding:16px; margin:18px 0;">
                <p style="margin:0 0 10px 0; color:#E2E2E1;"><strong>Clinic:</strong> ${escapeHtml(clinicTitle)}</p>
                <p style="margin:0 0 10px 0; color:#E2E2E1;"><strong>Player:</strong> ${escapeHtml(found.playerName)}</p>
                <p style="margin:0; color:#E2E2E1;"><strong>Parent email:</strong> ${escapeHtml(found.parentEmail)}</p>
              </div>

              <p style="color:#655955; font-size:12px; text-align:center; margin-top:18px;">
                Stripe session: ${escapeHtml(session.id)}
              </p>
            </div>
          `;

          const paidParentHtml = `
            <div style="font-family: Arial, sans-serif; max-width: 640px; margin: 0 auto; background:#111316; color:#E2E2E1; padding:32px; border-radius:10px;">
              <div style="background:#9A0A0A; padding:16px; border-radius:8px; margin-bottom:22px; text-align:center;">
                <h1 style="margin:0; color:white; font-size:20px; letter-spacing:2px;">PAYMENT CONFIRMED</h1>
              </div>

              <p style="color:#B9B2A5;">
                Thank you — your payment has been received and your place is now confirmed.
              </p>

              <div style="background:#1a1e25; border:1px solid #333; border-radius:8px; padding:16px; margin:18px 0;">
                <p style="margin:0 0 10px 0; color:#E2E2E1;"><strong>Registration ID:</strong> ${escapeHtml(registrationId)}</p>
                <p style="margin:0 0 10px 0; color:#E2E2E1;"><strong>Clinic:</strong> ${escapeHtml(clinicTitle)}</p>
                <p style="margin:0; color:#E2E2E1;"><strong>Player:</strong> ${escapeHtml(found.playerName)}</p>
              </div>

              <p style="color:#B9B2A5;">
                Terms &amp; Conditions:
                <a href="https://andyreidelitesocceracademy.ie/summer-clinics/terms" style="color:#9A0A0A;">View Terms</a>
              </p>

              <p style="color:#655955; font-size:12px; margin-top:24px;">
                Andy Reid Elite Soccer Academy
              </p>
            </div>
          `;

          await Promise.allSettled([
            sendEmail(resend, "summer clinic paid admin confirmation", {
              from: fromEmail,
              to: adminEmail,
              replyTo: found.parentEmail || undefined,
              subject: `Summer Clinic Registration (PAID) — ${clinicTitle} — ${String(found.playerName).replace(/[\r\n]/g, " ")}`,
              html: paidAdminHtml,
            }),
            sendEmail(resend, "summer clinic paid parent confirmation", {
              from: fromEmail,
              to: found.parentEmail,
              replyTo: adminEmail,
              subject: "Payment Confirmed — Andy Reid Elite Summer Clinics",
              html: paidParentHtml,
            }),
          ]);
        } else {
          console.log(`[stripe] checkout.session.completed not paid or missing rid. paid=${paid} rid=${registrationId}`);
        }
      }

      if (event.type === "payment_intent.payment_failed") {
        const pi = event.data.object as Stripe.PaymentIntent;
        const registrationId = (pi.metadata?.registrationId as string | undefined) || "";

        if (registrationId) {
          await updateSummerClinicPaymentStatus({
            registrationId,
            paymentStatus: "Failed",
            notes: `Payment failed. payment_intent=${pi.id}`,
          });
          console.log(`[stripe] payment failed. rid=${registrationId}`);
        }
      }

      return res.json({ received: true });
    } catch (err) {
      console.error("Webhook handler error:", err);
      return res.status(500).send("Webhook handler failed");
    }
  });

  return httpServer;
}
