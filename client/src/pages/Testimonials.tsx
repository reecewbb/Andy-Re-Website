import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Star, Quote } from "lucide-react";

const playerTestimonials = [
  {
    quote: "The programme gave me the platform to get noticed at the highest level. The coaching staff pushed me every day and believed in me when others didn't. Training in such a professional environment every day raised my standards across the board.",
    name: "Killian Phillips",
    role: "Republic of Ireland International Midfielder",
    club: "Crystal Palace FC",
    initials: "KP",
  },
  {
    quote: "Andy and his staff helped shape me into the player and person I am today. The environment they created was unlike anything I had experienced before. The attention to detail, the quality of coaching, and the high standards they demanded made me a better player.",
    name: "Aidomo Emakhu",
    role: "Republic of Ireland U21 International",
    club: "Professional Club Footballer",
    initials: "AE",
  },
];

const parentTestimonials = [
  {
    quote: "As a parent, I couldn't have asked for a better environment for my son. The professionalism, the care, and the results speak for themselves. Andy and his team genuinely care about every player as an individual, not just as a footballer. We saw incredible growth in confidence and ability.",
    name: "Lorraine Cailloce",
    role: "Parent",
    child: "Programme Graduate",
    initials: "LC",
  },
  {
    quote: "My daughter's confidence on and off the pitch has grown enormously. This programme is the best decision our family ever made for her future. The coaches are exceptional, the facilities are top class, and the opportunities it opened up were beyond anything we expected.",
    name: "Fran Sheridan",
    role: "Parent",
    child: "Programme Graduate",
    initials: "FS",
  },
];

function TestimonialCard({ testimonial, type }: { testimonial: any; type: "player" | "parent" }) {
  return (
    <div className="bg-[#1a1e25] border border-white/10 rounded-md p-8 hover-elevate">
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-4 h-4 text-[#9A0A0A] fill-current" />
        ))}
      </div>
      <Quote className="w-8 h-8 text-[#9A0A0A]/30 mb-4" />
      <blockquote className="text-[#E2E2E1] leading-relaxed text-sm sm:text-base mb-8 italic">
        "{testimonial.quote}"
      </blockquote>
      <div className="flex items-center gap-4 border-t border-white/10 pt-6">
        <div className="w-12 h-12 bg-[#9A0A0A] rounded-full flex items-center justify-center flex-shrink-0">
          <span className="font-heading text-white text-lg">{testimonial.initials}</span>
        </div>
        <div>
          <div className="text-white font-bold">{testimonial.name}</div>
          <div className="text-[#9A0A0A] text-xs uppercase tracking-wider font-medium">{testimonial.role}</div>
          <div className="text-[#655955] text-xs">{type === "player" ? testimonial.club : testimonial.child}</div>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  return (
    <div className="bg-[#111316] text-white pt-20">
      {/* Hero */}
      <section className="py-24 bg-[#0e1014] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 70% 50%, #9A0A0A 0%, transparent 60%)" }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-block bg-[#9A0A0A]/20 border border-[#9A0A0A]/30 text-[#9A0A0A] text-xs uppercase tracking-widest px-3 py-1.5 rounded-md mb-6 font-medium">
            Testimonials
          </div>
          <h1 className="font-heading text-6xl sm:text-7xl lg:text-8xl text-white uppercase tracking-wide leading-none mb-6">
            WHAT OUR<br /><span className="text-[#9A0A0A]">PLAYERS &amp; PARENTS SAY</span>
          </h1>
          <p className="text-[#B9B2A5] text-xl max-w-2xl leading-relaxed">
            Hear directly from the players who've been through the programme and the parents who've seen the transformation first-hand.
          </p>
        </div>
      </section>

      {/* Player Testimonials */}
      <section className="py-20 bg-[#111316]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="w-12 h-1 bg-[#9A0A0A] mb-6" />
          <h2 className="font-heading text-4xl sm:text-5xl text-white uppercase tracking-wide leading-none mb-12">
            FROM THE PLAYERS
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {playerTestimonials.map((t, i) => (
              <TestimonialCard key={i} testimonial={t} type="player" />
            ))}
          </div>
        </div>
      </section>

      {/* Stats interlude */}
      <section className="py-16 bg-[#9A0A0A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { value: "100%", label: "Would Recommend" },
              { value: "20+", label: "Years Track Record" },
              { value: "136", label: "Internationals Produced" },
              { value: "25", label: "USA Scholarships" },
            ].map((s, i) => (
              <div key={i}>
                <div className="font-heading text-5xl sm:text-6xl text-white leading-none mb-2">{s.value}</div>
                <div className="text-white/70 text-sm uppercase tracking-widest">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Parent Testimonials */}
      <section className="py-20 bg-[#0e1014]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="w-12 h-1 bg-[#9A0A0A] mb-6" />
          <h2 className="font-heading text-4xl sm:text-5xl text-white uppercase tracking-wide leading-none mb-12">
            FROM THE PARENTS
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {parentTestimonials.map((t, i) => (
              <TestimonialCard key={i} testimonial={t} type="parent" />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#111316]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-12 h-1 bg-[#9A0A0A] mx-auto mb-8" />
          <h2 className="font-heading text-5xl sm:text-6xl text-white uppercase tracking-wide leading-none mb-6">
            YOUR STORY<br /><span className="text-[#9A0A0A]">STARTS HERE</span>
          </h2>
          <p className="text-[#B9B2A5] text-lg mb-8 max-w-xl mx-auto">
            Join the players and families who have already transformed their football futures through the Andy Reid Elite Soccer Academy.
          </p>
          <Button asChild size="lg" className="bg-[#9A0A0A] text-white font-bold text-sm uppercase tracking-widest px-10">
            <Link href="/apply">Apply Now</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
