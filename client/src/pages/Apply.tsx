import { useState } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronRight, ChevronLeft, CheckCircle, AlertCircle, Info } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

const step1Schema = z.object({
  playerName: z.string().min(2, "Full name is required"),
  dob: z.string().min(1, "Date of birth is required"),
  gender: z.string().min(1, "Please select a gender"),
  school: z.string().min(2, "School name is required"),
  schoolYear: z.string().min(1, "Please select a school year"),
  county: z.string().min(2, "County is required"),
  club: z.string().min(2, "Current club is required"),
  position: z.string().min(2, "Playing position is required"),
  level: z.string().optional(),
});

const step2Schema = z.object({
  highlightVideo: z.string().url("Please enter a valid URL").min(1, "Highlight video link is required"),
  extraLink1: z.string().optional(),
  extraLink2: z.string().optional(),
  extraLink3: z.string().optional(),
  notes: z.string().optional(),
});

const step3Schema = z.object({
  parentName: z.string().min(2, "Parent/guardian name is required"),
  parentEmail: z.string().email("Please enter a valid email address"),
  parentPhone: z.string().min(7, "Phone number is required"),
  hearAboutUs: z.string().optional(),
  message: z.string().optional(),
  consentParent: z.boolean().refine((v) => v === true, "You must confirm parent/guardian consent"),
  consentContact: z.boolean().refine((v) => v === true, "You must agree to be contacted"),
  honeypot: z.string().max(0).optional(),
});

type Step1Data = z.infer<typeof step1Schema>;
type Step2Data = z.infer<typeof step2Schema>;
type Step3Data = z.infer<typeof step3Schema>;

const steps = [
  { number: 1, label: "Player Details" },
  { number: 2, label: "Football Profile" },
  { number: 3, label: "Parent & Consent" },
];

function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center justify-center gap-2 sm:gap-4 mb-10">
      {steps.map((step, i) => (
        <div key={step.number} className="flex items-center gap-2 sm:gap-4">
          <div className="flex flex-col items-center gap-1.5">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-heading text-lg transition-colors ${
                current === step.number
                  ? "bg-[#9A0A0A] text-white"
                  : current > step.number
                  ? "bg-[#9A0A0A]/30 border border-[#9A0A0A]/50 text-[#9A0A0A]"
                  : "bg-[#1a1e25] border border-white/10 text-[#655955]"
              }`}
              data-testid={`step-indicator-${step.number}`}
            >
              {current > step.number ? <CheckCircle className="w-5 h-5" /> : step.number}
            </div>
            <span className={`text-xs uppercase tracking-wider hidden sm:block ${current === step.number ? "text-white" : "text-[#655955]"}`}>
              {step.label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div className={`w-12 sm:w-20 h-px ${current > step.number ? "bg-[#9A0A0A]" : "bg-white/10"}`} />
          )}
        </div>
      ))}
    </div>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
      <AlertCircle className="w-3 h-3" /> {message}
    </p>
  );
}

function FormField({ label, required, children, error, hint }: { label: string; required?: boolean; children: React.ReactNode; error?: string; hint?: string }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-[#B9B2A5] text-xs uppercase tracking-wider">
        {label}{required && <span className="text-[#9A0A0A] ml-1">*</span>}
      </Label>
      {children}
      {hint && <p className="text-[#655955] text-xs flex items-start gap-1"><Info className="w-3 h-3 mt-0.5 flex-shrink-0" />{hint}</p>}
      <FieldError message={error} />
    </div>
  );
}

const inputClass = "bg-[#0e1014] border-white/10 text-white placeholder:text-[#655955] focus:border-[#9A0A0A]/60 focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none";
const selectClass = "w-full bg-[#0e1014] border border-white/10 text-white rounded-md px-3 py-2.5 text-sm focus:border-[#9A0A0A]/60 focus:outline-none";

export default function Apply() {
  const [, setLocation] = useLocation();
  const [currentStep, setCurrentStep] = useState(1);
  const [step1Data, setStep1Data] = useState<Step1Data | null>(null);
  const [step2Data, setStep2Data] = useState<Step2Data | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form1 = useForm<Step1Data>({ resolver: zodResolver(step1Schema), defaultValues: { gender: "", schoolYear: "" } });
  const form2 = useForm<Step2Data>({ resolver: zodResolver(step2Schema) });
  const form3 = useForm<Step3Data>({
    resolver: zodResolver(step3Schema),
    defaultValues: { consentParent: false, consentContact: false, honeypot: "" },
  });

  const handleStep1 = form1.handleSubmit((data) => {
    setStep1Data(data);
    setCurrentStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  const handleStep2 = form2.handleSubmit((data) => {
    setStep2Data(data);
    setCurrentStep(3);
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  const handleStep3 = form3.handleSubmit(async (data) => {
    if (data.honeypot) return;
    if (!step1Data || !step2Data) return;
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      await apiRequest("POST", "/api/apply", {
        ...step1Data,
        ...step2Data,
        ...data,
        honeypot: undefined,
      });
      setLocation("/thank-you");
    } catch (err: any) {
      setSubmitError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  });

  return (
    <div className="bg-[#111316] text-white pt-20 min-h-screen">
      {/* Hero */}
      <section className="py-16 bg-[#0e1014] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 50% 50%, #9A0A0A 0%, transparent 60%)" }} />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block bg-[#9A0A0A]/20 border border-[#9A0A0A]/30 text-[#9A0A0A] text-xs uppercase tracking-widest px-3 py-1.5 rounded-md mb-6 font-medium">
            September 2026 Intake
          </div>
          <h1 className="font-heading text-5xl sm:text-6xl text-white uppercase tracking-wide leading-none mb-4">
            APPLY NOW
          </h1>
          <p className="text-[#B9B2A5] leading-relaxed">
            Complete the form below to apply for the Andy Reid Elite Soccer Academy Transition Year Programme. Places are strictly limited.
          </p>
        </div>
      </section>

      <section className="py-16 bg-[#111316]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <StepIndicator current={currentStep} />

          {/* Step 1: Player Details */}
          {currentStep === 1 && (
            <form onSubmit={handleStep1} className="space-y-6">
              <div className="bg-[#1a1e25] border border-white/10 rounded-md p-8">
                <h2 className="font-heading text-3xl text-white uppercase tracking-wide mb-6">Player Details</h2>
                <div className="space-y-5">
                  <FormField label="Player Full Name" required error={form1.formState.errors.playerName?.message}>
                    <Input
                      {...form1.register("playerName")}
                      placeholder="e.g. John Smith"
                      className={inputClass}
                      data-testid="input-player-name"
                    />
                  </FormField>

                  <div className="grid grid-cols-2 gap-4">
                    <FormField label="Date of Birth" required error={form1.formState.errors.dob?.message}>
                      <Input
                        type="date"
                        {...form1.register("dob")}
                        className={`${inputClass} [color-scheme:dark]`}
                        data-testid="input-dob"
                      />
                    </FormField>
                    <FormField label="Gender" required error={form1.formState.errors.gender?.message}>
                      <select {...form1.register("gender")} className={selectClass} data-testid="select-gender">
                        <option value="">Select...</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                        <option value="prefer-not-to-say">Prefer not to say</option>
                      </select>
                    </FormField>
                  </div>

                  <FormField label="Current School" required error={form1.formState.errors.school?.message}>
                    <Input
                      {...form1.register("school")}
                      placeholder="e.g. St. Patrick's CBS"
                      className={inputClass}
                      data-testid="input-school"
                    />
                  </FormField>

                  <FormField label="Current School Year" required error={form1.formState.errors.schoolYear?.message}>
                    <select {...form1.register("schoolYear")} className={selectClass} data-testid="select-school-year">
                      <option value="">Select year...</option>
                      <option value="3rd-year">3rd Year</option>
                      <option value="ty">Transition Year (TY)</option>
                      <option value="5th-year">5th Year</option>
                      <option value="6th-year">6th Year</option>
                      <option value="other">Other</option>
                    </select>
                  </FormField>

                  <FormField label="County" required error={form1.formState.errors.county?.message}>
                    <Input
                      {...form1.register("county")}
                      placeholder="e.g. Dublin"
                      className={inputClass}
                      data-testid="input-county"
                    />
                  </FormField>

                  <FormField label="Current Club" required error={form1.formState.errors.club?.message}>
                    <Input
                      {...form1.register("club")}
                      placeholder="e.g. Bohemian FC"
                      className={inputClass}
                      data-testid="input-club"
                    />
                  </FormField>

                  <FormField label="Playing Position(s)" required error={form1.formState.errors.position?.message}>
                    <Input
                      {...form1.register("position")}
                      placeholder="e.g. Central Midfielder, Left Wing"
                      className={inputClass}
                      data-testid="input-position"
                    />
                  </FormField>

                  <FormField label="Current Level / League" error={form1.formState.errors.level?.message}>
                    <Input
                      {...form1.register("level")}
                      placeholder="e.g. LOI U17, Regional League Division 1"
                      className={inputClass}
                      data-testid="input-level"
                    />
                  </FormField>
                </div>
              </div>

              <div className="flex justify-end">
                <Button type="submit" className="bg-[#9A0A0A] text-white font-semibold text-xs uppercase tracking-widest px-8" data-testid="button-next-step-1">
                  Next: Football Profile <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </form>
          )}

          {/* Step 2: Football Profile */}
          {currentStep === 2 && (
            <form onSubmit={handleStep2} className="space-y-6">
              <div className="bg-[#1a1e25] border border-white/10 rounded-md p-8">
                <h2 className="font-heading text-3xl text-white uppercase tracking-wide mb-6">Football Profile & Links</h2>
                <div className="space-y-5">
                  <FormField
                    label="Highlight Video Link"
                    required
                    error={form2.formState.errors.highlightVideo?.message}
                    hint="Upload to YouTube, Vimeo, or Google Drive. If using Drive: Share → Anyone with the link can view, or share directly with admissions@areidacademy.ie"
                  >
                    <Input
                      {...form2.register("highlightVideo")}
                      placeholder="https://youtube.com/watch?v=..."
                      className={inputClass}
                      data-testid="input-highlight-video"
                    />
                  </FormField>

                  <div className="bg-[#111316] border border-[#9A0A0A]/20 rounded-md p-4">
                    <p className="text-[#9A0A0A] text-xs uppercase tracking-wider font-semibold mb-2">Additional Links (Optional)</p>
                    <p className="text-[#655955] text-xs mb-4">Add up to 3 additional links — match footage, player profile, CV, etc.</p>
                    <div className="space-y-3">
                      <Input {...form2.register("extraLink1")} placeholder="Extra link 1 (match footage, player profile...)" className={inputClass} data-testid="input-extra-link-1" />
                      <Input {...form2.register("extraLink2")} placeholder="Extra link 2" className={inputClass} data-testid="input-extra-link-2" />
                      <Input {...form2.register("extraLink3")} placeholder="Extra link 3" className={inputClass} data-testid="input-extra-link-3" />
                    </div>
                  </div>

                  <FormField label="Playing History & Achievements (Optional)" error={form2.formState.errors.notes?.message}>
                    <textarea
                      {...form2.register("notes")}
                      rows={5}
                      placeholder="Tell us about your football journey — clubs played for, representative honours, notable achievements, trials, etc."
                      className="w-full bg-[#0e1014] border border-white/10 text-white rounded-md px-3 py-2.5 text-sm focus:border-[#9A0A0A]/60 focus:outline-none resize-none placeholder:text-[#655955]"
                      data-testid="textarea-notes"
                    />
                  </FormField>
                </div>
              </div>

              <div className="flex items-center justify-between gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => { setCurrentStep(1); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  className="border-white/20 text-white bg-white/5 text-xs uppercase tracking-widest"
                  data-testid="button-prev-step-2"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" /> Back
                </Button>
                <Button type="submit" className="bg-[#9A0A0A] text-white font-semibold text-xs uppercase tracking-widest px-8" data-testid="button-next-step-2">
                  Next: Parent Details <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </form>
          )}

          {/* Step 3: Parent Details & Consent */}
          {currentStep === 3 && (
            <form onSubmit={handleStep3} className="space-y-6">
              {/* Honeypot */}
              <input type="text" {...form3.register("honeypot")} className="sr-only" tabIndex={-1} autoComplete="off" />

              <div className="bg-[#1a1e25] border border-white/10 rounded-md p-8">
                <h2 className="font-heading text-3xl text-white uppercase tracking-wide mb-6">Parent / Guardian Details</h2>
                <div className="space-y-5">
                  <FormField label="Parent / Guardian Full Name" required error={form3.formState.errors.parentName?.message}>
                    <Input
                      {...form3.register("parentName")}
                      placeholder="e.g. Mary Smith"
                      className={inputClass}
                      data-testid="input-parent-name"
                    />
                  </FormField>

                  <FormField label="Parent / Guardian Email" required error={form3.formState.errors.parentEmail?.message}>
                    <Input
                      type="email"
                      {...form3.register("parentEmail")}
                      placeholder="mary@example.com"
                      className={inputClass}
                      data-testid="input-parent-email"
                    />
                  </FormField>

                  <FormField label="Parent / Guardian Mobile" required error={form3.formState.errors.parentPhone?.message}>
                    <Input
                      type="tel"
                      {...form3.register("parentPhone")}
                      placeholder="+353 87 123 4567"
                      className={inputClass}
                      data-testid="input-parent-phone"
                    />
                  </FormField>

                  <FormField label="How did you hear about us?" error={form3.formState.errors.hearAboutUs?.message}>
                    <select {...form3.register("hearAboutUs")} className={selectClass} data-testid="select-hear-about-us">
                      <option value="">Select...</option>
                      <option value="social-media">Social Media</option>
                      <option value="friend-family">Friend / Family</option>
                      <option value="coach">Coach / Manager</option>
                      <option value="school">School</option>
                      <option value="website">Website / Search</option>
                      <option value="former-player">Former Player</option>
                      <option value="other">Other</option>
                    </select>
                  </FormField>

                  <FormField label="Additional Message (Optional)" error={form3.formState.errors.message?.message}>
                    <textarea
                      {...form3.register("message")}
                      rows={4}
                      placeholder="Any additional information you'd like to share with us..."
                      className="w-full bg-[#0e1014] border border-white/10 text-white rounded-md px-3 py-2.5 text-sm focus:border-[#9A0A0A]/60 focus:outline-none resize-none placeholder:text-[#655955]"
                      data-testid="textarea-message"
                    />
                  </FormField>
                </div>
              </div>

              {/* Consent */}
              <div className="bg-[#1a1e25] border border-white/10 rounded-md p-8">
                <h3 className="font-heading text-xl text-white uppercase tracking-wide mb-6">Consent & Declarations</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="consentParent"
                      checked={form3.watch("consentParent")}
                      onCheckedChange={(v) => form3.setValue("consentParent", Boolean(v), { shouldValidate: true })}
                      className="mt-0.5 border-white/20 data-[state=checked]:bg-[#9A0A0A] data-[state=checked]:border-[#9A0A0A]"
                      data-testid="checkbox-consent-parent"
                    />
                    <label htmlFor="consentParent" className="text-[#B9B2A5] text-sm leading-relaxed cursor-pointer">
                      I confirm that I am the parent or legal guardian of the player named in this application and I consent to submitting this application on their behalf. <span className="text-[#9A0A0A]">*</span>
                    </label>
                  </div>
                  {form3.formState.errors.consentParent && (
                    <FieldError message={form3.formState.errors.consentParent.message} />
                  )}

                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="consentContact"
                      checked={form3.watch("consentContact")}
                      onCheckedChange={(v) => form3.setValue("consentContact", Boolean(v), { shouldValidate: true })}
                      className="mt-0.5 border-white/20 data-[state=checked]:bg-[#9A0A0A] data-[state=checked]:border-[#9A0A0A]"
                      data-testid="checkbox-consent-contact"
                    />
                    <label htmlFor="consentContact" className="text-[#B9B2A5] text-sm leading-relaxed cursor-pointer">
                      I understand that Andy Reid Elite Soccer Academy may contact me via email or phone regarding this application and the programme. <span className="text-[#9A0A0A]">*</span>
                    </label>
                  </div>
                  {form3.formState.errors.consentContact && (
                    <FieldError message={form3.formState.errors.consentContact.message} />
                  )}
                </div>
              </div>

              {submitError && (
                <div className="bg-red-900/20 border border-red-500/30 rounded-md p-4 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <p className="text-red-300 text-sm">{submitError}</p>
                </div>
              )}

              <div className="flex items-center justify-between gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => { setCurrentStep(2); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  className="border-white/20 text-white bg-white/5 text-xs uppercase tracking-widest"
                  data-testid="button-prev-step-3"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" /> Back
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#9A0A0A] text-white font-semibold text-xs uppercase tracking-widest px-8 disabled:opacity-50"
                  data-testid="button-submit-application"
                >
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                </Button>
              </div>

              <p className="text-[#655955] text-xs text-center">
                By submitting, you agree to our{" "}
                <a href="/privacy" className="text-[#B9B2A5] underline">Privacy Policy</a> and{" "}
                <a href="/terms" className="text-[#B9B2A5] underline">Terms of Use</a>.
              </p>
            </form>
          )}
        </div>
      </section>

      {/* Info strip */}
      <section className="py-12 bg-[#0e1014] border-t border-white/10">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 gap-6 text-center">
            {[
              { label: "Places", value: "Limited" },
              { label: "Start Date", value: "Sept 3, 2026" },
              { label: "Applications Open", value: "Feb 26, 2026" },
            ].map((item, i) => (
              <div key={i}>
                <div className="font-heading text-2xl text-[#9A0A0A] leading-none mb-1">{item.value}</div>
                <div className="text-[#655955] text-xs uppercase tracking-wider">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
