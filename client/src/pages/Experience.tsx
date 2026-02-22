import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Globe, Star, Users, Trophy } from "lucide-react";

const experiences = [
  {
    category: "Premier League Visits",
    items: [
      { name: "Manchester United Training Complex", desc: "Tour and training session at Carrington — one of the world's most iconic football facilities." },
      { name: "Tottenham Hotspur Stadium", desc: "Behind-the-scenes access to the world-class Spurs training facility and stadium tour." },
      { name: "Arsenal Academy", desc: "Training day with Arsenal's world-renowned youth development coaches at London Colney." },
      { name: "Everton FC", desc: "Session with Everton's coaching staff, including tactical workshops with first-team methodologies." },
    ],
  },
  {
    category: "International Experiences",
    items: [
      { name: "Barcelona Football Academy", desc: "Trip to Camp Nou and training sessions focused on the famous Barça positional play system." },
      { name: "Portugal Training Tour", desc: "Intensive training camp in Portugal with exposure to high-level Portuguese football culture." },
      { name: "FAI National Training Centre", desc: "Sessions at the FAI's state-of-the-art National Training Centre with elite Irish coaches." },
      { name: "European Club Visits", desc: "Annual visits to top European clubs, tailored to that year's calendar and opportunities." },
    ],
  },
];

export default function Experience() {
  return (
    <div className="bg-[#111316] text-white pt-20">
      {/* Hero */}
      <section className="relative py-32 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=1600&q=80')` }}
        />
        <div className="absolute inset-0 bg-[#111316]/85" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-block bg-[#9A0A0A]/20 border border-[#9A0A0A]/30 text-[#9A0A0A] text-xs uppercase tracking-widest px-3 py-1.5 rounded-md mb-6 font-medium">
            Premier League & International Experience
          </div>
          <h1 className="font-heading text-6xl sm:text-7xl lg:text-8xl text-white uppercase tracking-wide leading-none mb-6">
            TRAIN WITH &amp;<br />VISIT THE<br /><span className="text-[#9A0A0A]">WORLD'S BEST</span>
          </h1>
          <p className="text-[#B9B2A5] text-xl max-w-2xl leading-relaxed">
            Our programme provides exclusive access to Premier League academies, elite European clubs, and professional training environments that set our players apart from the rest.
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="py-20 bg-[#0e1014]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {[
              { icon: <Globe className="w-6 h-6" />, title: "International Exposure", desc: "Players experience football culture at the highest level across Europe and the UK, gaining perspective and inspiration that transforms their development." },
              { icon: <Users className="w-6 h-6" />, title: "Professional Connections", desc: "Our coaching network gives players direct access to scouts, coaches, and professionals from Premier League and European clubs." },
              { icon: <Trophy className="w-6 h-6" />, title: "Real Opportunities", desc: "Multiple alumni have gone on to professional trials and contracts directly through connections made during our experience programmes." },
            ].map((item, i) => (
              <div key={i} className="bg-[#1a1e25] border border-white/10 rounded-md p-6">
                <div className="w-12 h-12 bg-[#9A0A0A]/20 border border-[#9A0A0A]/30 rounded-md flex items-center justify-center text-[#9A0A0A] mb-4">
                  {item.icon}
                </div>
                <h3 className="font-heading text-xl text-white uppercase tracking-wide mb-3">{item.title}</h3>
                <p className="text-[#B9B2A5] text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Categories */}
      {experiences.map((cat, i) => (
        <section key={i} className={`py-20 ${i % 2 === 0 ? "bg-[#111316]" : "bg-[#0e1014]"}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="w-12 h-1 bg-[#9A0A0A] mb-6" />
            <h2 className="font-heading text-4xl sm:text-5xl text-white uppercase tracking-wide leading-none mb-12">
              {cat.category}
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {cat.items.map((item, j) => (
                <div key={j} className="bg-[#1a1e25] border border-white/10 rounded-md p-6 flex gap-4 hover-elevate">
                  <div className="w-10 h-10 bg-[#9A0A0A]/20 border border-[#9A0A0A]/30 rounded-md flex items-center justify-center flex-shrink-0">
                    <Star className="w-4 h-4 text-[#9A0A0A]" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-2">{item.name}</h4>
                    <p className="text-[#B9B2A5] text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Quote */}
      <section className="py-20 bg-[#9A0A0A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="font-heading text-6xl text-white/20 leading-none mb-4">"</div>
          <blockquote className="text-white text-xl sm:text-2xl leading-relaxed font-light italic mb-8">
            These experiences don't just inspire players — they show them exactly what's possible, what it takes, and how to get there.
          </blockquote>
          <p className="text-white/70 font-semibold uppercase tracking-widest text-sm">Andy Reid, Head Coach</p>
        </div>
      </section>

      {/* Media Gallery Placeholder */}
      <section className="py-20 bg-[#111316]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-4xl sm:text-5xl text-white uppercase tracking-wide leading-none mb-4">
              GALLERY
            </h2>
            <p className="text-[#B9B2A5]">Photos and videos from our Premier League and international visits</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=500&q=80",
              "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=500&q=80",
              "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=500&q=80",
              "https://images.unsplash.com/photo-1556056504-5c7696c4c28d?w=500&q=80",
              "https://images.unsplash.com/photo-1571512599285-9ac4e4b1af59?w=500&q=80",
              "https://images.unsplash.com/photo-1459865264687-595d652de67e?w=500&q=80",
            ].map((src, i) => (
              <div key={i} className="relative rounded-md overflow-hidden aspect-video bg-[#1a1e25]">
                <img src={src} alt={`Experience gallery ${i + 1}`} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-[#111316]/30 hover:bg-[#111316]/10 transition-colors" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#0e1014]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-5xl sm:text-6xl text-white uppercase tracking-wide leading-none mb-6">
            EXPERIENCE IT<br /><span className="text-[#9A0A0A]">FOR YOURSELF</span>
          </h2>
          <p className="text-[#B9B2A5] text-lg mb-8">Apply now and gain access to the experiences that shape the next generation of elite footballers.</p>
          <Button asChild size="lg" className="bg-[#9A0A0A] text-white font-bold text-sm uppercase tracking-widest px-10">
            <Link href="/apply">Apply Now</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
