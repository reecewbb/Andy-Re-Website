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

export default function SummerClinicsPayment() {
  const summary = getSummary();
  const rid = getRid();

  return (
    <main className="bg-[#111316] text-white">
      <section className="py-16">
        <div className="mx-auto w-full max-w-3xl px-4">
          <div className="rounded-2xl border border-white/10 bg-black/30 p-8">
            <p className="text-sm tracking-[0.25em] text-[#B9B2A5]">
              PAYMENT (COMING NEXT)
            </p>
            <h1 className="mt-3 text-3xl font-extrabold md:text-4xl">
              Payment <span className="text-[#9A0A0A]">Placeholder</span>
            </h1>
            <p className="mt-4 text-[#E2E2E1]">
              Your registration has been received. Your place is only confirmed
              once payment is completed.
            </p>
          </div>

          {!rid && (
            <div className="mt-6 rounded-2xl border border-yellow-500/30 bg-yellow-500/10 p-6 text-sm text-yellow-200">
              <p className="font-semibold text-white">Action required</p>
              <p className="mt-2">
                We couldn’t confirm a registration ID for this session. Please
                return to the registration form and submit again to ensure your
                registration is recorded.
              </p>
              <div className="mt-4">
                <Link href="/summer-clinics/register">
                  <Button className="bg-[#9A0A0A] hover:bg-[#7f0808]">
                    Return to registration
                  </Button>
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
                    <span className="text-[#B9B2A5]">Registration ID:</span>{" "}
                    {rid}
                  </div>
                )}
                <div>
                  <span className="text-[#B9B2A5]">Clinic:</span>{" "}
                  {summary.clinicTitle}
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
                  <span className="text-[#B9B2A5]">Player:</span>{" "}
                  {summary.playerName}
                </div>
                <div>
                  <span className="text-[#B9B2A5]">Parent email:</span>{" "}
                  {summary.parentEmail}
                </div>
              </div>
            ) : (
              <p className="mt-3 text-sm text-[#B9B2A5]">
                (Summary not available — please return to registration if needed.)
              </p>
            )}

            <div className="mt-6">
              <Button disabled className="w-full bg-[#9A0A0A] opacity-60">
                Pay €150 (Stripe coming next)
              </Button>
              <p className="mt-3 text-center text-xs text-[#B9B2A5]">
                Payment will be enabled once Stripe is connected.
              </p>
            </div>

            <div className="mt-6 flex flex-col gap-3 md:flex-row">
              {rid ? (
                <Link href={`/summer-clinics/submitted?rid=${encodeURIComponent(rid)}`}>
                  <Button className="w-full md:w-auto border border-white/10 bg-black/30 hover:bg-black/40">
                    Continue
                  </Button>
                </Link>
              ) : (
                <Button
                  disabled
                  className="w-full md:w-auto border border-white/10 bg-black/30 opacity-60"
                >
                  Continue
                </Button>
              )}

              <Link href="/summer-clinics/register">
                <Button className="w-full md:w-auto border border-white/10 bg-black/30 hover:bg-black/40">
                  Edit registration
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}