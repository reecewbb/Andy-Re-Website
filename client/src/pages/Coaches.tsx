import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Award, Shield, Trophy, ChevronRight } from "lucide-react";
import littonLaneImg from "@assets/Litton-Lane_1771776748056.png";

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
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80"
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
                Andy Reid is one of Ireland's most respected football coaches and former professional players. After a distinguished playing career that included stints at Nottingham Forest, Tottenham Hotspur, Sunderland, and the Republic of Ireland national team, Andy transitioned into elite football education and coaching.
              </p>
              <p className="text-[#B9B2A5] leading-relaxed mb-4">
                Holding the UEFA Pro Licence — the highest coaching qualification in football — Andy brings an unparalleled combination of professional experience and coaching expertise to the academy. His philosophy centres on technical excellence, tactical intelligence, and the holistic development of young players.
              </p>
              <p className="text-[#B9B2A5] leading-relaxed mb-8">
                Under his leadership, the academy has produced over 91 underage internationals, 42 League of Ireland first-team players, and 21 USA scholarship recipients. His track record of developing players to professional level is unmatched in Irish football.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { icon: <Award className="w-4 h-4" />, label: "UEFA Pro Licence" },
                  { icon: <Trophy className="w-4 h-4" />, label: "Former Premier League Player" },
                  { icon: <Shield className="w-4 h-4" />, label: "Republic of Ireland International" },
                  { icon: <Award className="w-4 h-4" />, label: "20+ Years Coaching Experience" },
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
                  src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&q=80"
                  alt="Denis Hyland"
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e1014]/80 via-transparent to-transparent" />
              </div>
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-[#9A0A0A] px-4 py-2 rounded-md inline-block mb-2">
                  <span className="font-heading text-white text-sm tracking-widest uppercase">UEFA A Licence</span>
                </div>
              </div>
            </div>
            <div className="lg:order-1">
              <div className="w-12 h-1 bg-[#9A0A0A] mb-6" />
              <h2 className="font-heading text-5xl sm:text-6xl text-white uppercase tracking-wide leading-none mb-2">
                DENIS HYLAND
              </h2>
              <p className="text-[#9A0A0A] text-sm uppercase tracking-widest font-semibold mb-6">Assistant Head Coach & Athletic Development Lead</p>

              <p className="text-[#B9B2A5] leading-relaxed mb-4">
                Denis Hyland is an elite-level football coach and athletic development specialist who has worked at professional clubs in Ireland and the UK. Holding the UEFA A Licence, Denis brings exceptional expertise in technical coaching, sports science, and player performance optimisation.
              </p>
              <p className="text-[#B9B2A5] leading-relaxed mb-4">
                A former professional player himself, Denis understands the journey players must take to reach the top level. His coaching style is direct, detailed, and player-centred — always focused on helping each individual unlock their maximum potential.
              </p>
              <p className="text-[#B9B2A5] leading-relaxed mb-8">
                Denis leads the academy's athletic development programme, ensuring every player builds the physical foundation needed to compete and excel at professional level. His work has been instrumental in the academy's strong track record across all programme outcomes.
              </p>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: <Award className="w-4 h-4" />, label: "UEFA A Licence" },
                  { icon: <Trophy className="w-4 h-4" />, label: "Former Professional Player" },
                  { icon: <Shield className="w-4 h-4" />, label: "Athletic Development Specialist" },
                  { icon: <Award className="w-4 h-4" />, label: "Sports Science Background" },
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
                    alt="Litton Lane Training — Education Partner"
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
            TRAIN UNDER<br />IRELAND'S BEST
          </h2>
          <p className="text-white/70 text-lg mb-8">Apply now to learn from UEFA Pro and UEFA A licensed coaches with proven professional track records.</p>
          <Button asChild size="lg" className="bg-white text-[#9A0A0A] font-bold text-sm uppercase tracking-widest px-10">
            <Link href="/apply">Apply Now</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
