import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Star, Quote } from "lucide-react";

const playerTestimonials = [
  {
    quote: "When I began working with Denis, my goal was to become a professional footballer. He helped me develop my weaknesses, improve my overall game, and gave me the belief and guidance needed to pursue that ambition. Completing the TY programme was one of the best decisions I made, and I'm very grateful for the support and standards he provided throughout my journey.",
    name: "Killian Phillips",
    role: "Rep of Ireland Senior International Player",
    club: "St Mirren FC",
    initials: "KP",
    photo: null,
  },
  {
    quote: "The TY programme played a huge role in improving my physical performance and preparing me for the demands of the next level. Denis' guidance and high standards pushed me to improve every day, teaching me the consistency and discipline required to perform and giving me a strong foundation to progress in my football career.",
    name: "Aidomo Emakhu",
    role: "Professional Footballer",
    club: "Millwall FC",
    initials: "AE",
    photo: null,
  },
];

const parentTestimonials = [
  {
    quote: "From day one, the TY programme with Denis provided a professional and supportive environment. We saw real improvements in our children's football ability, maturity, and discipline. Both of my boys represented their country and now successfully combine football and education with UCD. The programme genuinely prepares players for both their sporting and academic futures.",
    name: "Lorraine Cailloce",
    role: "Parent",
    child: "Luca & Killian Cailloce — UCD AFC",
    initials: "LC",
    photo: null,
  },
  {
    quote: "Denis's TY programme was one of the best decisions we made for our son. From the very beginning, he stepped into a professional and supportive environment built on high standards. We saw tremendous progress in his football ability, along with real growth in his self-belief, discipline, and game awareness. The programme has been instrumental in preparing him for the next steps in both his football and educational journey.",
    name: "Fran Sheridan",
    role: "Parent",
    child: "Ryan Sheridan — St Patrick's Athletic FC",
    initials: "FS",
    photo: null,
  },
];

function TestimonialCard({ testimonial, type }: { testimonial: any; type: "player" | "parent" }) {
  return (
    <div className="bg-[#1a1e25] border border-white/10 rounded-md overflow-hidden hover-elevate">
      {/* Photo area */}
      <div className="w-full h-48 bg-[#0e1014] border-b border-white/10 flex items-center justify-center relative overflow-hidden">
        {testimonial.photo ? (
          <img src={testimonial.photo} alt={testimonial.name} className="w-full h-full object-cover object-top" />
        ) : (
          <div className="flex flex-col items-center gap-2 text-center px-4">
            <div className="w-16 h-16 rounded-full bg-[#1a1e25] border-2 border-dashed border-white/20 flex items-center justify-center mb-1">
              <span className="font-heading text-[#9A0A0A] text-2xl">{testimonial.initials}</span>
            </div>
            <span className="text-[#655955] text-xs uppercase tracking-widest">Photo coming soon</span>
          </div>
        )}
      </div>

      <div className="p-8">
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
