import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { CheckCircle, ChevronRight } from "lucide-react";
import littonLaneImg from "@assets/Litton-Lane_1771776748056.png";

const pillars = [
  {
    number: "01",
    title: "Player Development",
    subtitle: "Technical & Tactical Excellence",
    desc: "The core of our programme. Every session is designed with purpose to develop technically superior, tactically intelligent footballers who can compete at the highest level.",
    bullets: [
      "UEFA Pro Licence Coaches",
      "Individual learning plans",
      "Tactical sessions - age appropriate curriculum",
      "Games v Premier League academy opposition",
      "Premier League specialist coaching",
      "Sports psychology support",
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
      "Explosive power development \u2014 plyometrics & resistance",
      "Endurance base building and periodisation",
      "Injury prevention protocols \u2014 mobility, flexibility, activation",
      "Recovery sessions \u2014 ice bath, active recovery, sleep hygiene",
      "Nutrition education and hydration strategies",
      "Body composition monitoring and physical testing",
      "Sports science data collection and application",
      "Continuous testing and monitoring",
    ],
  },
  {
    number: "03",
    title: "Education & Personal Growth",
    subtitle: "Academic Achievement & Life Skills",
    desc: "We believe every player deserves the best possible future \u2014 in football and beyond. Our education and personal development strand ensures players leave our programme as rounded, confident young people.",
    bullets: [
      "ITEC Gym Instructor QQI Level 2",
      "Anatomy, Physiology, Diet & Nutrition",
      "Business Studies & Special Populations",
      "First Aid & Circuit Training",
      "Gym Instruction & Client Screening",
      "Premier League Guest Speakers",
      "Life skills workshops \u2014 communication, leadership, teamwork",
      "Sports psychology \u2014 resilience, focus, pressure management",
      "Career planning \u2014 football and non-football pathways",
      "University and scholarship application guidance",
      "Media training and personal brand awareness",
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

      {/* Education Partner: Litton Lane */}
      <section className="py-20 bg-[#111316]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="w-12 h-1 bg-[#9A0A0A] mx-auto mb-6" />
            <div className="inline-block bg-[#9A0A0A]/20 border border-[#9A0A0A]/30 text-[#9A0A0A] text-xs uppercase tracking-widest px-3 py-1.5 rounded-md mb-4 font-medium">
              Education Partner
            </div>
            <h2 className="font-heading text-4xl sm:text-5xl text-white uppercase tracking-wide leading-none">
              LITTON LANE
            </h2>
          </div>
          <div className="max-w-3xl mx-auto">
            <div className="bg-[#1a1e25] border border-white/10 rounded-md overflow-hidden">
              <div className="grid sm:grid-cols-2 items-center">
                <div className="bg-white flex items-center justify-center p-10 min-h-48">
                  <img
                    src={littonLaneImg}
                    alt="Litton Lane Training \u2014 Education Partner"
                    className="w-full max-w-[240px] object-contain"
                  />
                </div>
                <div className="p-8">
                  <div className="w-8 h-0.5 bg-[#9A0A0A] mb-4" />
                  <h3 className="font-heading text-2xl text-white uppercase tracking-wide mb-2">Litton Lane Training</h3>
                  <p className="text-[#9A0A0A] text-xs uppercase tracking-widest font-semibold mb-4">Training Fitness Professionals Since 1987</p>
                  <p className="text-[#B9B2A5] text-sm leading-relaxed">
                    Litton Lane supports the programme's education pillar, delivering personal training learning and certification throughout the year. Their involvement ensures every player graduates with recognised qualifications alongside their football development.
                  </p>
                  <a
                    href="https://littonlane.ie"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[#9A0A0A] text-xs uppercase tracking-wider font-semibold mt-5"
                  >
                    Learn More <ChevronRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
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
