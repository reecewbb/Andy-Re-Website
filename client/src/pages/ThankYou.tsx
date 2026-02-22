import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { CheckCircle, ChevronRight } from "lucide-react";

export default function ThankYou() {
  return (
    <div className="bg-[#111316] text-white pt-20 min-h-screen flex items-center">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center w-full">
        <div className="w-20 h-20 bg-[#9A0A0A]/20 border border-[#9A0A0A]/40 rounded-full flex items-center justify-center mx-auto mb-8">
          <CheckCircle className="w-10 h-10 text-[#9A0A0A]" />
        </div>

        <div className="inline-block bg-[#9A0A0A]/20 border border-[#9A0A0A]/30 text-[#9A0A0A] text-xs uppercase tracking-widest px-3 py-1.5 rounded-md mb-6 font-medium">
          Application Received
        </div>

        <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl text-white uppercase tracking-wide leading-none mb-6">
          THANK YOU<br />FOR APPLYING!
        </h1>

        <p className="text-[#B9B2A5] text-lg leading-relaxed mb-4 max-w-xl mx-auto">
          We've received your application for the Andy Reid Elite Soccer Academy Transition Year Programme.
        </p>
        <p className="text-[#B9B2A5] leading-relaxed mb-12 max-w-xl mx-auto">
          A confirmation email has been sent to the parent/guardian email address you provided. Our admissions team will review your application and be in touch within <strong className="text-white">5–7 working days</strong> to advise on next steps.
        </p>

        {/* What Happens Next */}
        <div className="bg-[#1a1e25] border border-white/10 rounded-md p-8 text-left mb-10 max-w-lg mx-auto">
          <h3 className="font-heading text-2xl text-white uppercase tracking-wide mb-6">What Happens Next?</h3>
          <div className="space-y-4">
            {[
              { step: "01", title: "Application Review", desc: "Our coaching team will review your application and highlight video within 5-7 working days." },
              { step: "02", title: "Shortlist Notification", desc: "Shortlisted players will be invited to attend a trial session at our facilities in Dublin." },
              { step: "03", title: "Trial Day", desc: "Attend a trial session where our coaches assess you on and off the pitch." },
              { step: "04", title: "Final Decision", desc: "Successful applicants will receive a formal offer of a place in the programme." },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="font-heading text-2xl text-[#9A0A0A]/40 leading-none w-8 flex-shrink-0">{item.step}</div>
                <div>
                  <h4 className="text-white font-semibold text-sm mb-0.5">{item.title}</h4>
                  <p className="text-[#B9B2A5] text-xs leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#111316] border border-[#9A0A0A]/20 rounded-md p-5 mb-10 max-w-lg mx-auto">
          <p className="text-[#B9B2A5] text-sm">
            Questions? Contact our admissions team at{" "}
            <a href="mailto:admissions@areidacademy.ie" className="text-[#9A0A0A] font-semibold">
              admissions@areidacademy.ie
            </a>
          </p>
        </div>

        <div className="flex flex-wrap gap-4 justify-center">
          <Button asChild className="bg-[#9A0A0A] text-white font-semibold text-xs uppercase tracking-widest px-8">
            <Link href="/">Back to Home <ChevronRight className="w-4 h-4 ml-1" /></Link>
          </Button>
          <Button asChild variant="outline" className="border-white/20 text-white bg-white/5 text-xs uppercase tracking-widest">
            <Link href="/programme">View Programme</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
