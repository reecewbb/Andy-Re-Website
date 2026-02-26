import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Award, Shield, Trophy } from "lucide-react";
import andyReidImg from "@assets/AndyReidCoaching_1772065939274.png";
import denisHylandImg from "@assets/DenisHylandCoaching_1772065939274.jpg";

export default function Coaches() {
  return (
    <div className="bg-[#111316] text-white pt-20">
      {/* Hero */}
      <section className="py-24 bg-[#0e1014] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 60% 50%, #9A0A0A 0%, transparent 60%)" }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-block bg-[#9A0A0A]/20 border border-[#9A0A0A]/30 text-[#9A0A0A] text-xs uppercase tracking-widest px-3 py-1.5 rounded-md mb-6 font-medium">
            Coaching Staff
          </div>
          <h1 className="font-heading text-6xl sm:text-7xl lg:text-8xl text-white uppercase tracking-wide leading-none mb-6">
            LEARN FROM<br /><span className="text-[#9A0A0A]">THE BEST</span>
          </h1>
          <p className="text-[#B9B2A5] text-xl max-w-2xl leading-relaxed">
            Our coaching team brings together UEFA Pro and UEFA A licensed coaches with decades of professional playing and coaching experience at the highest levels of the game.
          </p>
        </div>
      </section>

      {/* Andy Reid */}
      <section className="py-20 bg-[#111316]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="relative">
              <div className="bg-[#1a1e25] border border-white/10 rounded-md overflow-hidden aspect-[4/5]">
                <img
                  src={andyReidImg}
                  alt="Andy Reid"
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111316]/80 via-transparent to-transparent" />
              </div>
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-[#9A0A0A] px-4 py-2 rounded-md inline-block mb-2">
                  <span className="font-heading text-white text-sm tracking-widest uppercase">UEFA Pro Licence</span>
                </div>
              </div>
            </div>
            <div>
              <div className="w-12 h-1 bg-[#9A0A0A] mb-6" />
              <h2 className="font-heading text-5xl sm:text-6xl text-white uppercase tracking-wide leading-none mb-2">
                ANDY REID
              </h2>
              <p className="text-[#9A0A0A] text-sm uppercase tracking-widest font-semibold mb-6">Head Coach & Academy Director</p>

              <p className="text-[#B9B2A5] leading-relaxed mb-4">
                Andy Reid is a former Republic of Ireland international midfielder and current academy coach at Premier League club Nottingham Forest. He enjoyed a successful professional career playing over 400 senior games, including spells with Nottingham Forest, Tottenham Hotspur, Charlton Athletic, Sunderland, and Blackpool. Andy earned 29 caps for Ireland, representing his country at senior international level for more than a decade. Since retiring, he has moved into elite coaching, helping develop the next generation of professional players.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { icon: <Award className="w-4 h-4" />, label: "UEFA Pro Licence" },
                  { icon: <Trophy className="w-4 h-4" />, label: "Former Premier League Player" },
                  { icon: <Shield className="w-4 h-4" />, label: "Republic of Ireland International" },
                  { icon: <Award className="w-4 h-4" />, label: "29 Senior International Caps" },
                ].map((badge, i) => (
                  <div key={i} className="flex items-center gap-3 bg-[#1a1e25] border border-white/10 rounded-md px-4 py-3">
                    <div className="text-[#9A0A0A]">{badge.icon}</div>
                    <span className="text-[#E2E2E1] text-xs font-medium">{badge.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Denis Hyland */}
      <section className="py-20 bg-[#0e1014]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="lg:order-2 relative">
              <div className="bg-[#1a1e25] border border-white/10 rounded-md overflow-hidden aspect-[4/5]">
                <img
                  src={denisHylandImg}
                  alt="Denis Hyland"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e1014]/80 via-transparent to-transparent" />
              </div>
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-[#9A0A0A] px-4 py-2 rounded-md inline-block mb-2">
                  <span className="font-heading text-white text-sm tracking-widest uppercase">UEFA Pro Licence</span>
                </div>
              </div>
            </div>
            <div className="lg:order-1">
              <div className="w-12 h-1 bg-[#9A0A0A] mb-6" />
              <h2 className="font-heading text-5xl sm:text-6xl text-white uppercase tracking-wide leading-none mb-2">
                DENIS HYLAND
              </h2>
              <p className="text-[#9A0A0A] text-sm uppercase tracking-widest font-semibold mb-6">Head of Football</p>

              <p className="text-[#B9B2A5] leading-relaxed mb-8">
                Denis Hyland is a UEFA Pro Licensed coach with over 20 years' experience developing elite youth and international players. As founder of the TY programme, he has guided numerous players to professional contracts and senior international football. For the past 15 years, he has also served as a national team coach with Ireland's U16, U18, and U21 squads.
              </p>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: <Award className="w-4 h-4" />, label: "UEFA Pro Licence" },
                  { icon: <Trophy className="w-4 h-4" />, label: "TY Programme Founder" },
                  { icon: <Shield className="w-4 h-4" />, label: "National Team Coach" },
                  { icon: <Award className="w-4 h-4" />, label: "20+ Years Experience" },
                ].map((badge, i) => (
                  <div key={i} className="flex items-center gap-3 bg-[#1a1e25] border border-white/10 rounded-md px-4 py-3">
                    <div className="text-[#9A0A0A]">{badge.icon}</div>
                    <span className="text-[#E2E2E1] text-xs font-medium">{badge.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#9A0A0A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-5xl sm:text-6xl text-white uppercase tracking-wide leading-none mb-6">
            TRAIN UNDER<br />IRELAND'S BEST
          </h2>
          <p className="text-white/70 text-lg mb-8">Apply now to learn from UEFA Pro licensed coaches with proven professional track records.</p>
          <Button asChild size="lg" className="bg-white text-[#9A0A0A] font-bold text-sm uppercase tracking-widest px-10">
            <Link href="/apply">Apply Now</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
