import { Link } from "wouter";
import { Button } from "@/components/ui/button";

function getRid(): string | null {
  const params = new URLSearchParams(window.location.search);
  const ridFromUrl = params.get("rid");
  if (ridFromUrl && ridFromUrl.trim()) return ridFromUrl.trim();

  const ridFromStorage = sessionStorage.getItem("summerClinicRegistrationId");
  if (ridFromStorage && ridFromStorage.trim()) return ridFromStorage.trim();

  return null;
}

export default function SummerClinicsSubmitted() {
  const rid = getRid();

  if (!rid) {
    return (
      <main className="bg-[#111316] text-white">
        <section className="py-16">
          <div className="mx-auto w-full max-w-3xl px-4">
            <div className="rounded-2xl border border-yellow-500/30 bg-yellow-500/10 p-8">
              <p className="text-sm tracking-[0.25em] text-[#B9B2A5]">
                REGISTRATION NOT CONFIRMED
              </p>
              <h1 className="mt-3 text-3xl font-extrabold md:text-4xl">
                We couldn’t confirm your <span className="text-[#9A0A0A]">registration</span>
              </h1>
              <p className="mt-4 text-[#E2E2E1]">
                This page should only be shown after a successful form submission.
                Please return to the registration form and submit again.
              </p>

              <div className="mt-8 flex flex-col gap-3 md:flex-row">
                <Link href="/summer-clinics/register">
                  <Button className="w-full md:w-auto bg-[#9A0A0A] hover:bg-[#7f0808]">
                    Return to registration
                  </Button>
                </Link>

                <Link href="/summer-clinics">
                  <Button className="w-full md:w-auto border border-white/10 bg-black/30 hover:bg-black/40">
                    Back to Summer Clinics
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="bg-[#111316] text-white">
      <section className="py-16">
        <div className="mx-auto w-full max-w-3xl px-4">
          <div className="rounded-2xl border border-white/10 bg-black/30 p-8">
            <p className="text-sm tracking-[0.25em] text-[#B9B2A5]">
              REGISTRATION RECEIVED
            </p>
            <h1 className="mt-3 text-3xl font-extrabold md:text-4xl">
              Thank you — <span className="text-[#9A0A0A]">we’ve received your registration</span>
            </h1>
            <p className="mt-4 text-[#E2E2E1]">
              Please check your email for confirmation. Payment is required to confirm your place.
            </p>

            <div className="mt-4 rounded-xl border border-white/10 bg-black/20 p-4 text-sm text-[#E2E2E1]">
              <span className="text-[#B9B2A5]">Registration ID:</span> {rid}
            </div>

            <div className="mt-8 flex flex-col gap-3 md:flex-row">
              <Link href="/summer-clinics">
                <Button className="w-full md:w-auto bg-[#9A0A0A] hover:bg-[#7f0808]">
                  Back to Summer Clinics
                </Button>
              </Link>

              <Link href="/summer-clinics/terms">
                <Button className="w-full md:w-auto border border-white/10 bg-black/30 hover:bg-black/40">
                  View Terms & Conditions
                </Button>
              </Link>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-6 text-sm text-[#B9B2A5]">
            <p className="font-semibold text-[#E2E2E1]">Important</p>
            <p className="mt-2">Your place is only confirmed once payment has been completed.</p>
          </div>
        </div>
      </section>
    </main>
  );
}