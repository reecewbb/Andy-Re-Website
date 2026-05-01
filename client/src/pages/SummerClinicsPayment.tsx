import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

function getSummary() {
  try {
    const raw = sessionStorage.getItem("summerClinicRegistrationSummary");
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function getRid(): string | null {
  const params = new URLSearchParams(window.location.search);
  const ridFromUrl = params.get("rid");
  if (ridFromUrl && ridFromUrl.trim()) return ridFromUrl.trim();

  const ridFromStorage = sessionStorage.getItem("summerClinicRegistrationId");
  if (ridFromStorage && ridFromStorage.trim()) return ridFromStorage.trim();

  return null;
}

function isCanceled(): boolean {
  const params = new URLSearchParams(window.location.search);
  return params.get("canceled") === "1";
}

export default function SummerClinicsPayment() {
  const summary = getSummary();
  const rid = getRid();
  const canceled = isCanceled();

  const [paying, setPaying] = useState(false);
  const [payError, setPayError] = useState<string | null>(null);

  async function startPayment() {
    if (!rid) return;

    setPayError(null);
    setPaying(true);

    try {
      const res = await fetch("/api/summer-clinics/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ registrationId: rid }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        setPayError(data?.error || "Could not start payment. Please try again.");
        return;
      }

      if (data?.url) {
        window.location.href = String(data.url);
        return;
      }

      setPayError("Stripe did not return a checkout URL. Please try again.");
    } catch {
      setPayError("Network error. Please try again.");
    } finally {
      setPaying(false);
    }
  }

  return (
    <main className="bg-[#111316] text-white">
      <section className="py-16">
        <div className="mx-auto w-full max-w-3xl px-4">
          <div className="rounded-2xl border border-white/10 bg-black/30 p-8">
            <p className="text-sm tracking-[0.25em] text-[#B9B2A5]">PAYMENT</p>
            <h1 className="mt-3 text-3xl font-extrabold md:text-4xl">
              Complete <span className="text-[#9A0A0A]">Payment</span>
            </h1>
            <p className="mt-4 text-[#E2E2E1]">
              Your registration has been received. Your place is only confirmed once payment is completed.
            </p>
          </div>

          {canceled && (
            <div className="mt-6 rounded-2xl border border-yellow-500/30 bg-yellow-500/10 p-6 text-sm text-yellow-200">
              <p className="font-semibold text-white">Payment cancelled</p>
              <p className="mt-2">
                Your place is only confirmed once payment is completed. You can try again below.
              </p>
            </div>
          )}

          {!rid && (
            <div className="mt-6 rounded-2xl border border-yellow-500/30 bg-yellow-500/10 p-6 text-sm text-yellow-200">
              <p className="font-semibold text-white">Action required</p>
              <p className="mt-2">
                We couldn’t confirm a registration ID for this session. Please return to the registration
                form and submit again to ensure your registration is recorded.
              </p>
              <div className="mt-4">
                <Link href="/summer-clinics/register">
                  <Button className="bg-[#9A0A0A] hover:bg-[#7f0808]">Return to registration</Button>
                </Link>
              </div>
            </div>
          )}

          <div className="mt-8 rounded-2xl border border-white/10 bg-black/20 p-6 md:p-8">
            <h2 className="text-lg font-bold">Summary</h2>

            {summary ? (
              <div className="mt-4 rounded-xl bg-black/30 p-5 text-sm text-[#E2E2E1] space-y-2">
                {rid && (
                  <div>
                    <span className="text-[#B9B2A5]">Registration ID:</span> {rid}
                  </div>
                )}
                <div>
                  <span className="text-[#B9B2A5]">Clinic:</span> {summary.clinicTitle}
                </div>
                <div>
                  <span className="text-[#B9B2A5]">Dates:</span> {summary.dates}
                </div>
                <div>
                  <span className="text-[#B9B2A5]">Time:</span> {summary.time}
                </div>
                <div>
                  <span className="text-[#B9B2A5]">Price:</span> {summary.price}
                </div>
                <div>
                  <span className="text-[#B9B2A5]">Player:</span> {summary.playerName}
                </div>
                <div>
                  <span className="text-[#B9B2A5]">Parent email:</span> {summary.parentEmail}
                </div>
              </div>
            ) : (
              <p className="mt-3 text-sm text-[#B9B2A5]">
                (Summary not available — please return to registration if needed.)
              </p>
            )}

            <div className="mt-6">
              <Button
                disabled={!rid || paying}
                onClick={startPayment}
                className="w-full bg-[#9A0A0A] hover:bg-[#7f0808]"
              >
                {paying ? "Redirecting to Stripe..." : "Pay €150"}
              </Button>

              {payError && (
                <p className="mt-3 text-center text-xs text-red-200">{payError}</p>
              )}

              <p className="mt-3 text-center text-xs text-[#B9B2A5]">
                Your place is only confirmed once payment is completed.
              </p>
            </div>

            <div className="mt-6">
              <Link href="/summer-clinics/register">
                <Button className="w-full border border-white/10 bg-black/30 hover:bg-black/40">
                  Back to registration
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}