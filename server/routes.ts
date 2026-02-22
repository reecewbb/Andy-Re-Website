import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { Resend } from "resend";

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

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.post("/api/apply", async (req: Request, res: Response) => {
    try {
      const ip = (req.headers["x-forwarded-for"] as string) || req.socket.remoteAddress || "unknown";
      if (rateLimit(ip)) {
        return res.status(429).json({ error: "Too many requests. Please try again later." });
      }

      const body = req.body;

      // Honeypot check
      if (body.honeypot && body.honeypot.length > 0) {
        return res.status(200).json({ ok: true });
      }

      // Basic validation
      const required = ["playerName", "dob", "gender", "school", "schoolYear", "county", "club", "position", "highlightVideo", "parentName", "parentEmail", "parentPhone"];
      for (const field of required) {
        if (!body[field] || String(body[field]).trim() === "") {
          return res.status(400).json({ error: `Missing required field: ${field}` });
        }
      }

      // Log the application to console (in production, send via Resend/SendGrid)
      console.log("=== NEW APPLICATION RECEIVED ===");
      console.log(`Player: ${body.playerName} | DOB: ${body.dob} | Club: ${body.club}`);
      console.log(`Parent: ${body.parentName} | Email: ${body.parentEmail} | Phone: ${body.parentPhone}`);
      console.log(`Video: ${body.highlightVideo}`);
      console.log("================================");

      // Try to send email via Resend if API key is available
      const resendKey = process.env.RESEND_API_KEY;
      if (resendKey) {
        try {
          const adminEmail = process.env.APPLICATION_EMAIL_TO || "admissions@andyreidelitesocceracademy.ie";

          // IMPORTANT: Resend verified "send" as a subdomain, so From must be @send...
          const fromEmail =
            process.env.APPLICATION_EMAIL_FROM ||
            "Andy Reid Elite Soccer Academy <no-reply@send.andyreidelitesocceracademy.ie>";

          const htmlBody = `
            <div style="font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto; background: #111316; color: #E2E2E1; padding: 40px; border-radius: 8px;">
              <div style="background: #9A0A0A; padding: 20px; border-radius: 6px; margin-bottom: 30px;">
                <h1 style="color: white; margin: 0; font-size: 24px; letter-spacing: 2px;">NEW APPLICATION — AREID ACADEMY</h1>
              </div>

              <h2 style="color: #9A0A0A; font-size: 14px; letter-spacing: 2px; text-transform: uppercase; border-bottom: 1px solid #333; padding-bottom: 10px;">Player Details</h2>
              <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
                ${[
                  ["Full Name", body.playerName],
                  ["Date of Birth", body.dob],
                  ["Gender", body.gender],
                  ["Current School", body.school],
                  ["School Year", body.schoolYear],
                  ["County", body.county],
                  ["Current Club", body.club],
                  ["Position(s)", body.position],
                  ["Level / League", body.level || "—"],
                ].map(([k, v]) => `<tr><td style="padding: 8px; background: #1a1e25; color: #B9B2A5; width: 40%; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">${k}</td><td style="padding: 8px; background: #1a1e25; color: #E2E2E1;">${v}</td></tr>`).join("")}
              </table>

              <h2 style="color: #9A0A0A; font-size: 14px; letter-spacing: 2px; text-transform: uppercase; border-bottom: 1px solid #333; padding-bottom: 10px;">Football Profile</h2>
              <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
                <tr><td style="padding: 8px; background: #1a1e25; color: #B9B2A5; width: 40%; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Highlight Video</td><td style="padding: 8px; background: #1a1e25; color: #E2E2E1;"><a href="${body.highlightVideo}" style="color: #9A0A0A;">${body.highlightVideo}</a></td></tr>
                ${body.extraLink1 ? `<tr><td style="padding: 8px; background: #1a1e25; color: #B9B2A5; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Extra Link 1</td><td style="padding: 8px; background: #1a1e25;"><a href="${body.extraLink1}" style="color: #9A0A0A;">${body.extraLink1}</a></td></tr>` : ""}
                ${body.extraLink2 ? `<tr><td style="padding: 8px; background: #1a1e25; color: #B9B2A5; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Extra Link 2</td><td style="padding: 8px; background: #1a1e25;"><a href="${body.extraLink2}" style="color: #9A0A0A;">${body.extraLink2}</a></td></tr>` : ""}
                ${body.extraLink3 ? `<tr><td style="padding: 8px; background: #1a1e25; color: #B9B2A5; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Extra Link 3</td><td style="padding: 8px; background: #1a1e25;"><a href="${body.extraLink3}" style="color: #9A0A0A;">${body.extraLink3}</a></td></tr>` : ""}
                ${body.notes ? `<tr><td style="padding: 8px; background: #1a1e25; color: #B9B2A5; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Notes</td><td style="padding: 8px; background: #1a1e25; color: #E2E2E1;">${body.notes}</td></tr>` : ""}
              </table>

              <h2 style="color: #9A0A0A; font-size: 14px; letter-spacing: 2px; text-transform: uppercase; border-bottom: 1px solid #333; padding-bottom: 10px;">Parent / Guardian</h2>
              <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
                ${[
                  ["Name", body.parentName],
                  ["Email", body.parentEmail],
                  ["Phone", body.parentPhone],
                  ["How Did They Hear?", body.hearAboutUs || "—"],
                  ["Message", body.message || "—"],
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
              <p style="color: #B9B2A5;">Dear ${body.parentName},</p>
              <p style="color: #B9B2A5;">Thank you for submitting an application for <strong style="color: white;">${body.playerName}</strong> to the Andy Reid Elite Soccer Academy Transition Year Programme.</p>
              <p style="color: #B9B2A5;">We've received your application and our coaching team will review it carefully. You can expect to hear from us within <strong style="color: white;">5-7 working days</strong>.</p>
              
              <div style="background: #1a1e25; border: 1px solid #333; border-radius: 6px; padding: 20px; margin: 30px 0;">
                <h3 style="color: #9A0A0A; font-size: 12px; letter-spacing: 2px; text-transform: uppercase; margin-top: 0;">What Happens Next?</h3>
                <ol style="color: #B9B2A5; padding-left: 20px; line-height: 1.8;">
                  <li>Our team reviews your application and highlight video</li>
                  <li>Shortlisted players are invited to a trial session</li>
                  <li>Successful applicants receive a formal offer</li>
                </ol>
              </div>

              <p style="color: #B9B2A5;">If you have any questions, please don't hesitate to get in touch:</p>
              <a href="mailto:admissions@andyreidelitesocceracademy.ie" style="color: #9A0A0A;">admissions@andyreidelitesocceracademy.ie</a>

              <p style="color: #655955; font-size: 12px; margin-top: 30px;">Andy Reid Elite Soccer Academy | TU Blanchardstown &amp; Corduff Sports Centre, Dublin 15</p>
            </div>
          `;

          const resend = new Resend(resendKey);

          const parentEmail = String(body.parentEmail).trim();

          await Promise.all([
            resend.emails.send({
              from: fromEmail,
              to: adminEmail,
              replyTo: parentEmail,
              subject: `New Application: ${body.playerName} — ${body.club}`,
              html: htmlBody,
            }),
            resend.emails.send({
              from: fromEmail,
              to: parentEmail,
              replyTo: adminEmail, // so replies go to admissions@...
              subject: "Application Received — Andy Reid Elite Soccer Academy",
              html: confirmationHtml,
            }),
          ]);

          console.log("Emails sent successfully via Resend");
        } catch (emailErr) {
          console.error("Email send failed:", emailErr);
          // Don't fail the request if email fails
        }
      }

      return res.status(200).json({ ok: true, message: "Application submitted successfully" });
    } catch (err: any) {
      console.error("Application error:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  return httpServer;
}
