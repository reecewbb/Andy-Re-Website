import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "wouter";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

type ClinicKey = "hartstown" | "portmarnock";

const CLINICS: Record<ClinicKey, { title: string; dates: string; time: string }> =
  {
    hartstown: {
      title: "Hartstown / Huntstown FC",
      dates: "July 7th, 8th & 9th",
      time: "10:00 – 14:00",
    },
    portmarnock: {
      title: "Portmarnock FC",
      dates: "July 14th, 15th & 16th",
      time: "10:00 – 14:00",
    },
  };

function getClinicFromQuery(): ClinicKey | "" {
  const params = new URLSearchParams(window.location.search);
  const c = (params.get("clinic") || "").toLowerCase();
  if (c === "hartstown" || c === "portmarnock") return c;
  return "";
}

export default function SummerClinicsRegister() {
  const [, navigate] = useLocation();

  const prefilledClinic = useMemo(() => getClinicFromQuery(), []);
  const [clinic, setClinic] = useState<ClinicKey | "">(prefilledClinic);

  const [form, setForm] = useState({
    playerName: "",
    dob: "",
    gender: "male",
    county: "",
    club: "",
    position: "",
    levelLeague: "",
    medicalInfo: "",
    emergencyName: "",
    emergencyPhone: "",
    parentName: "",
    parentEmail: "",
    parentPhone: "",
    agreeTerms: false,
    honeypot: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // If clinic query param changes, keep in sync
  useEffect(() => {
    if (prefilledClinic) setClinic(prefilledClinic);
  }, [prefilledClinic]);

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function validate(): string | null {
    if (!clinic) return "Please select a clinic.";

    const requiredFields: Array<[keyof typeof form, string]> = [
      ["playerName", "Player name"],
      ["dob", "Date of birth"],
      ["county", "County"],
      ["club", "Current club"],
      ["position", "Position"],
      ["levelLeague", "Level / League"],
      ["emergencyName", "Emergency contact name"],
      ["emergencyPhone", "Emergency contact phone"],
      ["parentName", "Parent/guardian name"],
      ["parentEmail", "Parent/guardian email"],
      ["parentPhone", "Parent/guardian phone"],
    ];

    for (const [k, label] of requiredFields) {
      const v = String(form[k] || "").trim();
      if (!v) return `Missing required field: ${label}`;
    }

    const email = String(form.parentEmail).trim();
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailOk) return "Please enter a valid parent/guardian email address.";

    if (!form.agreeTerms) return "You must agree to the Terms & Conditions to continue.";
    return null;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const vErr = validate();
    if (vErr) {
      setError(vErr);
      return;
    }

    // Save a minimal summary for Payment page display
    const summary = {
      clinic,
      clinicTitle: clinic ? CLINICS[clinic].title : "",
      dates: clinic ? CLINICS[clinic].dates : "",
      time: clinic ? CLINICS[clinic].time : "",
      price: "€150",
      playerName: form.playerName,
      parentEmail: form.parentEmail,
    };
    sessionStorage.setItem(
      "summerClinicRegistrationSummary",
      JSON.stringify(summary),
    );

    setSubmitting(true);

    try {
      const payload = {
        clinic,
        playerName: form.playerName,
        dob: form.dob,
        gender: form.gender,
        county: form.county,
        club: form.club,
        position: form.position,
        levelLeague: form.levelLeague,
        medicalInfo: form.medicalInfo,
        emergencyName: form.emergencyName,
        emergencyPhone: form.emergencyPhone,
        parentName: form.parentName,
        parentEmail: form.parentEmail,
        parentPhone: form.parentPhone,
        agreeTerms: form.agreeTerms,
        honeypot: form.honeypot,
      };

      const res = await fetch("/api/summer-clinics/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        setError(data?.error || "Submission failed. Please try again.");
        return;
      }

      // Prefer backend-provided redirect (includes rid)
      if (data?.registrationId) {
        sessionStorage.setItem(
          "summerClinicRegistrationId",
          String(data.registrationId),
        );
      }

      if (data?.redirectUrl) {
        navigate(String(data.redirectUrl));
        return;
      }

      setError("Submission succeeded, but no redirect URL was provided.");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const clinicDetails = clinic ? CLINICS[clinic] : null;

  return (
    <main className="bg-[#111316] text-white">
      <section className="py-16">
        <div className="mx-auto w-full max-w-4xl px-4">
          <div className="rounded-2xl border border-white/10 bg-black/30 p-8">
            <p className="text-sm tracking-[0.25em] text-[#B9B2A5]">
              SUMMER CLINICS REGISTRATION
            </p>
            <h1 className="mt-3 text-3xl font-extrabold md:text-4xl">
              Register for the{" "}
              <span className="text-[#9A0A0A]">Elite Summer Clinics</span>
            </h1>
            <p className="mt-3 text-[#E2E2E1]">
              Players born 2010–2014 (boys & girls).{" "}
              <span className="text-[#B9B2A5]">Limited spaces.</span>
            </p>
          </div>

          <form
            onSubmit={onSubmit}
            className="mt-8 rounded-2xl border border-white/10 bg-black/20 p-6 md:p-8"
          >
            {/* Hidden honeypot */}
            <input
              value={form.honeypot}
              onChange={(e) => update("honeypot", e.target.value)}
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
            />

            {/* Clinic selection */}
            <div className="rounded-xl bg-black/30 p-5">
              <h2 className="text-lg font-bold">Clinic Selection</h2>
              <p className="mt-1 text-sm text-[#B9B2A5]">
                Select which clinic you’re registering for.
              </p>

              <div className="mt-4">
                <Label className="text-[#E2E2E1]">Clinic (required)</Label>
                <div className="mt-2">
                  <Select
                    value={clinic}
                    onValueChange={(v) => setClinic(v as ClinicKey)}
                  >
                    <SelectTrigger className="bg-[#111316] border-white/10">
                      <SelectValue placeholder="Choose a clinic" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hartstown">
                        Hartstown / Huntstown FC
                      </SelectItem>
                      <SelectItem value="portmarnock">Portmarnock FC</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {clinicDetails && (
                  <div className="mt-3 text-sm text-[#B9B2A5]">
                    {clinicDetails.dates} • {clinicDetails.time} • €150
                  </div>
                )}
              </div>
            </div>

            {/* Player info */}
            <div className="mt-6 rounded-xl bg-black/30 p-5">
              <h2 className="text-lg font-bold">Player Information</h2>

              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <div>
                  <Label>Full Name</Label>
                  <Input
                    className="mt-2 bg-[#111316] border-white/10"
                    value={form.playerName}
                    onChange={(e) => update("playerName", e.target.value)}
                  />
                </div>
                <div>
                  <Label>Date of Birth</Label>
                  <Input
                    type="date"
                    className="mt-2 bg-[#111316] border-white/10"
                    value={form.dob}
                    onChange={(e) => update("dob", e.target.value)}
                  />
                </div>
              </div>

              <div className="mt-4">
                <Label>Gender</Label>
                <RadioGroup
                  value={form.gender}
                  onValueChange={(v) => update("gender", v)}
                  className="mt-2 flex flex-wrap gap-6"
                >
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="male" id="gender-male" />
                    <Label htmlFor="gender-male">Male</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="female" id="gender-female" />
                    <Label htmlFor="gender-female">Female</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="other" id="gender-other" />
                    <Label htmlFor="gender-other">Other</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <div>
                  <Label>County</Label>
                  <Input
                    className="mt-2 bg-[#111316] border-white/10"
                    value={form.county}
                    onChange={(e) => update("county", e.target.value)}
                  />
                </div>
                <div>
                  <Label>Current Club</Label>
                  <Input
                    className="mt-2 bg-[#111316] border-white/10"
                    value={form.club}
                    onChange={(e) => update("club", e.target.value)}
                  />
                </div>
              </div>

              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <div>
                  <Label>Position</Label>
                  <Input
                    className="mt-2 bg-[#111316] border-white/10"
                    value={form.position}
                    onChange={(e) => update("position", e.target.value)}
                  />
                </div>
                <div>
                  <Label>Level / League</Label>
                  <Input
                    className="mt-2 bg-[#111316] border-white/10"
                    value={form.levelLeague}
                    onChange={(e) => update("levelLeague", e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Medical info */}
            <div className="mt-6 rounded-xl bg-black/30 p-5">
              <h2 className="text-lg font-bold">Medical Information (optional)</h2>
              <p className="mt-1 text-sm text-[#B9B2A5]">
                Please detail any medical conditions, injuries, or allergies we should be aware of.
              </p>
              <Textarea
                className="mt-3 bg-[#111316] border-white/10"
                rows={5}
                value={form.medicalInfo}
                onChange={(e) => update("medicalInfo", e.target.value)}
              />
            </div>

            {/* Emergency contact */}
            <div className="mt-6 rounded-xl bg-black/30 p-5">
              <h2 className="text-lg font-bold">Emergency Contact</h2>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <div>
                  <Label>Name</Label>
                  <Input
                    className="mt-2 bg-[#111316] border-white/10"
                    value={form.emergencyName}
                    onChange={(e) => update("emergencyName", e.target.value)}
                  />
                </div>
                <div>
                  <Label>Phone Number</Label>
                  <Input
                    className="mt-2 bg-[#111316] border-white/10"
                    value={form.emergencyPhone}
                    onChange={(e) => update("emergencyPhone", e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Parent/Guardian */}
            <div className="mt-6 rounded-xl bg-black/30 p-5">
              <h2 className="text-lg font-bold">Parent / Guardian</h2>
              <div className="mt-4 grid gap-4 md:grid-cols-3">
                <div className="md:col-span-1">
                  <Label>Name</Label>
                  <Input
                    className="mt-2 bg-[#111316] border-white/10"
                    value={form.parentName}
                    onChange={(e) => update("parentName", e.target.value)}
                  />
                </div>
                <div className="md:col-span-1">
                  <Label>Email</Label>
                  <Input
                    className="mt-2 bg-[#111316] border-white/10"
                    value={form.parentEmail}
                    onChange={(e) => update("parentEmail", e.target.value)}
                  />
                </div>
                <div className="md:col-span-1">
                  <Label>Phone</Label>
                  <Input
                    className="mt-2 bg-[#111316] border-white/10"
                    value={form.parentPhone}
                    onChange={(e) => update("parentPhone", e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Terms */}
            <div className="mt-6 rounded-xl bg-black/30 p-5">
              <h2 className="text-lg font-bold">Terms & Conditions</h2>
              <div className="mt-3 flex items-start gap-3">
                <Checkbox
                  id="agreeTerms"
                  checked={form.agreeTerms}
                  onCheckedChange={(v) => update("agreeTerms", Boolean(v))}
                />
                <Label htmlFor="agreeTerms" className="leading-relaxed text-[#E2E2E1]">
                  I agree to the Academy’s{" "}
                  <Link href="/summer-clinics/terms">
                    <a
                      className="text-[#9A0A0A] underline underline-offset-4"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Terms & Conditions
                    </a>
                  </Link>
                </Label>
              </div>
            </div>

            {error && (
              <div className="mt-6 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">
                {error}
              </div>
            )}

            <div className="mt-8">
              <Button
                type="submit"
                disabled={submitting}
                className="w-full bg-[#9A0A0A] hover:bg-[#7f0808] py-6 text-base font-semibold"
              >
                {submitting ? "Submitting..." : "Continue to Payment (€150)"}
              </Button>

              <p className="mt-3 text-center text-xs text-[#B9B2A5]">
                Your place is only confirmed once payment is completed.
              </p>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}