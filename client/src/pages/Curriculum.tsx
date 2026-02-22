import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

const pillars = [
  {
    number: "01",
    title: "Player Development",
    subtitle: "Technical & Tactical Excellence",
    desc: "The core of our programme. Every session is designed with purpose to develop technically superior, tactically intelligent footballers who can compete at the highest level.",
    bullets: [
      "Daily technical training — 1v1, 2v2, positional work",
      "Tactical sessions — team shape, pressing, transitions",
      "Small-sided games emphasising decision-making under pressure",
      "Position-specific coaching and role clarity",
      "Video analysis — individual and collective performance review",
      "Weekly feedback sessions with head coach",
      "Internal and external match programme",
      "Scout and trial opportunity facilitation",
      "Mental performance coaching and game intelligence",
      "Set-piece preparation and execution",
    ],
  },
  {
    number: "02",
    title: "Athletic Development",
    subtitle: "Physical Excellence & Injury Prevention",
    desc: "Elite footballers are elite athletes first. Our athletic development programme is designed to build the physical platform players need to compete at professional level.",
    bullets: [
      "Strength & conditioning programme tailored to footballers",
      "Speed, agility, quickness (SAQ) training",
      "Explosive power development — plyometrics & resistance",
      "Endurance base building and periodisation",
      "Injury prevention protocols — mobility, flexibility, activation",
      "Recovery sessions — ice bath, active recovery, sleep hygiene",
      "Nutrition education and hydration strategies",
      "Body composition monitoring and physical testing",
      "Sports science data collection and application",
      "Collaboration with physiotherapists as required",
    ],
  },
  {
    number: "03",
    title: "Education & Personal Growth",
    subtitle: "Academic Achievement & Life Skills",
    desc: "We believe every player deserves the best possible future — in football and beyond. Our education and personal development strand ensures players leave our programme as rounded, confident young people.",
    bullets: [
      "Transition Year curriculum support and school liaison",
      "Life skills workshops — communication, leadership, teamwork",
      "Sports psychology — resilience, focus, pressure management",
      "Career planning — football and non-football pathways",
      "University and scholarship application guidance",
      "Media training and personal brand awareness",
      "Community service and volunteer experience",
      "Financial literacy and independent living skills",
      "Guest speakers — professional players, coaches, scouts",
      "Graduation and certificate of completion",
    ],
  },
];

export default function Curriculum() {
  return (
    <div className="bg-[#111316] text-white pt-20">
      {/* Hero */}
      <section className="py-24 bg-[#0e1014] overflow-hidden relative">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 30% 50%, #9A0A0A 0%, transparent 60%)" }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-block bg-[#9A0A0A]/20 border border-[#9A0A0A]/30 text-[#9A0A0A] text-xs uppercase tracking-widest px-3 py-1.5 rounded-md mb-6 font-medium">
            Curriculum
          </div>
          <h1 className="font-heading text-6xl sm:text-7xl lg:text-8xl text-white uppercase tracking-wide leading-none mb-6">
            THREE PILLARS OF<br /><span className="text-[#9A0A0A]">DEVELOPMENT</span>
          </h1>
          <p className="text-[#B9B2A5] text-xl max-w-2xl leading-relaxed">
            Our curriculum is built on three interconnected pillars that together create a complete development programme unlike anything else available in Ireland.
          </p>
        </div>
      </section>

      {/* Pillars */}
      {pillars.map((pillar, i) => (
        <section key={i} className={`py-20 ${i % 2 === 0 ? "bg-[#111316]" : "bg-[#0e1014]"}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                <div className="font-heading text-8xl sm:text-9xl text-[#9A0A0A]/10 leading-none mb-4 select-none">{pillar.number}</div>
                <div className="w-12 h-1 bg-[#9A0A0A] mb-6" />
                <h2 className="font-heading text-4xl sm:text-5xl text-white uppercase tracking-wide leading-none mb-2">
                  {pillar.title}
                </h2>
                <p className="text-[#9A0A0A] text-sm uppercase tracking-widest font-semibold mb-6">{pillar.subtitle}</p>
                <p className="text-[#B9B2A5] leading-relaxed mb-8">{pillar.desc}</p>
                <Button asChild className="bg-[#9A0A0A] text-white font-semibold text-xs uppercase tracking-widest">
                  <Link href="/apply">Apply Now</Link>
                </Button>
              </div>
              <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                <div className="bg-[#1a1e25] border border-white/10 rounded-md p-8">
                  <h4 className="font-heading text-xl text-white uppercase tracking-wide mb-6">What's Included</h4>
                  <ul className="space-y-3">
                    {pillar.bullets.map((bullet, j) => (
                      <li key={j} className="flex items-start gap-3 text-[#B9B2A5] text-sm leading-relaxed">
                        <CheckCircle className="w-4 h-4 text-[#9A0A0A] mt-0.5 flex-shrink-0" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Weekly Schedule Overview */}
      <section className="py-20 bg-[#111316]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="w-12 h-1 bg-[#9A0A0A] mx-auto mb-6" />
            <h2 className="font-heading text-4xl sm:text-5xl text-white uppercase tracking-wide leading-none mb-4">
              A TYPICAL WEEK
            </h2>
            <p className="text-[#B9B2A5] max-w-xl mx-auto">A structured daily routine designed to maximise development across all three pillars.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {[
              { day: "MON", am: "Technical Training", pm: "Athletic Development" },
              { day: "TUE", am: "Tactical Session", pm: "Education & Life Skills" },
              { day: "WED", am: "Match Preparation", pm: "Video Analysis" },
              { day: "THU", am: "S&C / Athletic", pm: "Technical Training" },
              { day: "FRI", am: "Match Day", pm: "Review & Recovery" },
            ].map((day, i) => (
              <div key={i} className="bg-[#1a1e25] border border-white/10 rounded-md overflow-hidden">
                <div className="bg-[#9A0A0A] py-3 text-center">
                  <span className="font-heading text-white text-2xl tracking-wider">{day.day}</span>
                </div>
                <div className="p-4 space-y-3">
                  <div>
                    <p className="text-[#655955] text-xs uppercase tracking-wider mb-1">AM</p>
                    <p className="text-[#E2E2E1] text-xs font-medium">{day.am}</p>
                  </div>
                  <div className="border-t border-white/10 pt-3">
                    <p className="text-[#655955] text-xs uppercase tracking-wider mb-1">PM</p>
                    <p className="text-[#E2E2E1] text-xs font-medium">{day.pm}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#9A0A0A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-5xl sm:text-6xl text-white uppercase tracking-wide leading-none mb-6">
            READY TO START?
          </h2>
          <p className="text-white/70 text-lg mb-8">Applications for September 2026 are open. Secure your place today.</p>
          <Button asChild size="lg" className="bg-white text-[#9A0A0A] font-bold text-sm uppercase tracking-widest px-10">
            <Link href="/apply">Apply Now</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
