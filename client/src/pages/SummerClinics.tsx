import { Link } from "wouter";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

type ClinicKey = "hartstown" | "portmarnock";

const CLINICS: Array<{
  key: ClinicKey;
  title: string;
  dates: string;
  time: string;
  ageGroup: string;
  price: string;
  capacityNote: string;
}> = [
  {
    key: "hartstown",
    title: "Hartstown / Huntstown FC",
    dates: "July 7th, 8th & 9th",
    time: "10:00 – 14:00",
    ageGroup: "Players born 2010 to 2014 — boys & girls",
    price: "€150",
    capacityNote: "Limited spaces (max 60 places)",
  },
  {
    key: "portmarnock",
    title: "Portmarnock FC",
    dates: "July 14th, 15th & 16th",
    time: "10:00 – 14:00",
    ageGroup: "Players born 2010 to 2014 — boys & girls",
    price: "€150",
    capacityNote: "Limited spaces (max 60 places)",
  },
];

export default function SummerClinics() {
  return (
    <main className="bg-[#111316] text-white">
      {/* Hero */}
      <section className="py-16 md:py-20">
        <div className="mx-auto w-full max-w-6xl px-4">
          <div className="rounded-2xl border border-white/10 bg-black/30 p-8 md:p-12">
            <p className="text-sm tracking-[0.25em] text-[#B9B2A5]">ELITE SUMMER CLINICS</p>
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight md:text-5xl">
              Register for our <span className="text-[#9A0A0A]">Elite Summer Clinics</span>
            </h1>
            <p className="mt-4 max-w-2xl text-base text-[#E2E2E1] md:text-lg">
              Choose your location below to register. Places are limited.
            </p>
          </div>
        </div>
      </section>

      {/* Accordion dropdown blocks */}
      <section className="pb-20">
        <div className="mx-auto w-full max-w-6xl px-4">
          <div className="rounded-2xl border border-white/10 bg-black/20 p-6 md:p-8">
            <h2 className="text-xl font-bold tracking-wide md:text-2xl">
              Select your clinic
            </h2>
            <p className="mt-2 text-sm text-[#B9B2A5]">
              Both clinics are €150. Players born 2010–2014 (boys & girls). Limited spaces.
            </p>

            <div className="mt-6">
              <Accordion type="single" collapsible className="space-y-4">
                {CLINICS.map((c) => (
                  <AccordionItem
                    key={c.key}
                    value={c.key}
                    className="rounded-xl border border-white/10 bg-[#111316]"
                  >
                    <AccordionTrigger className="px-4 py-4 text-left hover:no-underline">
                      <div className="flex w-full flex-col gap-2 md:flex-row md:items-center md:justify-between">
                        <div>
                          <div className="text-lg font-bold">{c.title}</div>
                          <div className="text-sm text-[#B9B2A5]">{c.dates} • {c.time}</div>
                        </div>
                        <div className="text-sm font-semibold text-[#E2E2E1]">
                          {c.price}
                        </div>
                      </div>
                    </AccordionTrigger>

                    <AccordionContent className="px-4 pb-5">
                      <div className="grid gap-4 md:grid-cols-3">
                        <div className="rounded-xl bg-black/30 p-4">
                          <div className="text-xs tracking-[0.25em] text-[#B9B2A5]">DETAILS</div>
                          <ul className="mt-3 space-y-2 text-sm text-[#E2E2E1]">
                            <li><span className="text-[#B9B2A5]">Dates:</span> {c.dates}</li>
                            <li><span className="text-[#B9B2A5]">Time:</span> {c.time}</li>
                            <li><span className="text-[#B9B2A5]">Age group:</span> {c.ageGroup}</li>
                          </ul>
                        </div>

                        <div className="rounded-xl bg-black/30 p-4">
                          <div className="text-xs tracking-[0.25em] text-[#B9B2A5]">PRICING</div>
                          <p className="mt-3 text-sm text-[#E2E2E1]">
                            <span className="font-bold">{c.price}</span> per player
                          </p>
                          <p className="mt-2 text-sm text-[#B9B2A5]">{c.capacityNote}</p>
                        </div>

                        <div className="rounded-xl bg-black/30 p-4">
                          <div className="text-xs tracking-[0.25em] text-[#B9B2A5]">REGISTER</div>
                          <p className="mt-3 text-sm text-[#E2E2E1]">
                            Complete the registration form and proceed to payment.
                          </p>

                          <div className="mt-4">
                            <Link href={`/summer-clinics/register?clinic=${c.key}`}>
                              <Button className="w-full bg-[#9A0A0A] hover:bg-[#7f0808]">
                                Register Now
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}