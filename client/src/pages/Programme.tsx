import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { CheckCircle, ChevronRight } from "lucide-react";

export default function Programme() {
  return (
    <div className="bg-[#111316] text-white pt-20">
      {/* Hero */}
      <section className="relative py-24 bg-[#0e1014] overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 70% 50%, #9A0A0A 0%, transparent 60%)" }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-block bg-[#9A0A0A]/20 border border-[#9A0A0A]/30 text-[#9A0A0A] text-xs uppercase tracking-widest px-3 py-1.5 rounded-md mb-6 font-medium">
            Programme Overview
          </div>
          <h1 className="font-heading text-6xl sm:text-7xl lg:text-8xl text-white uppercase tracking-wide leading-none mb-6">
            THE ANDY REID<br /><span className="text-[#9A0A0A]">TY PROGRAMME</span>
          </h1>
          <p className="text-[#B9B2A5] text-xl max-w-2xl leading-relaxed">
            Ireland's most comprehensive football and education programme for Transition Year students who are serious about pursuing a career in the professional game.
          </p>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20 bg-[#111316]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="w-12 h-1 bg-[#9A0A0A] mb-8" />
            <h2 className="font-heading text-4xl sm:text-5xl text-white uppercase tracking-wide leading-none mb-8">
              OUR MISSION
            </h2>
            <p className="text-[#B9B2A5] text-lg leading-relaxed mb-6">
              At Andy Reid Elite Soccer Academy, our mission is people-first. We create a safe, inclusive, and high-performance environment where every player — regardless of background — is empowered to grow as an athlete, a student, and a human being.
            </p>
            <p className="text-[#B9B2A5] leading-relaxed mb-6">
              We believe that elite football and academic excellence are not mutually exclusive. Our programme has been designed from the ground up to develop the complete footballer: technically excellent, physically elite, tactically intelligent, and mentally resilient.
            </p>
            <p className="text-[#B9B2A5] leading-relaxed">
              With over 20 years of experience producing players who have gone on to represent Ireland at underage and senior international level, to sign professional contracts in the League of Ireland and overseas, and to earn full scholarships to US colleges, our track record speaks for itself.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-[#0e1014]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <div className="w-12 h-1 bg-[#9A0A0A] mb-6" />
              <h2 className="font-heading text-4xl sm:text-5xl text-white uppercase tracking-wide leading-none mb-8">
                WHY CHOOSE US?
              </h2>
              <div className="space-y-6">
                {[
                  { title: "UEFA-Licensed Head Coaches", desc: "Andy Reid (UEFA Pro) and Denis Hyland (UEFA A) bring professional playing and coaching experience to every session." },
                  { title: "Full-Time Programme", desc: "This is not an after-school club. Players train morning and afternoon, five days a week, in a true full-time professional environment." },
                  { title: "Academic Integration", desc: "We work with schools to ensure players fulfil their TY requirements while training at the highest level." },
                  { title: "Small Group Sizes", desc: "We keep squad numbers deliberately small to ensure every player receives individual attention and detailed coaching feedback." },
                  { title: "Real Pathways", desc: "Our alumni have signed for League of Ireland clubs, gone on trial in the UK and Europe, and earned US college scholarships." },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-6 h-6 bg-[#9A0A0A]/20 border border-[#9A0A0A]/40 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="w-3.5 h-3.5 text-[#9A0A0A]" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold text-sm mb-1">{item.title}</h4>
                      <p className="text-[#B9B2A5] text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-[#1a1e25] border border-white/10 rounded-md overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1571512599285-9ac4e4b1af59?w=800&q=80"
                  alt="Training session"
                  className="w-full h-64 object-cover"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Training Days", value: "5 / Week" },
                  { label: "Programme Length", value: "8 Months" },
                  { label: "Start Date", value: "Sept 3, 2026" },
                  { label: "Applications", value: "Open Feb 26" },
                ].map((item, i) => (
                  <div key={i} className="bg-[#1a1e25] border border-white/10 rounded-md p-5">
                    <div className="font-heading text-2xl text-[#9A0A0A] mb-1">{item.value}</div>
                    <div className="text-[#B9B2A5] text-xs uppercase tracking-wider">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Sets Us Apart */}
      <section className="py-20 bg-[#111316]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="w-12 h-1 bg-[#9A0A0A] mb-6" />
          <h2 className="font-heading text-4xl sm:text-5xl text-white uppercase tracking-wide leading-none mb-12">
            WHAT SETS US APART
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Proven Foundation", desc: "Over two decades of producing elite players for the domestic and international game. Our methods are refined and results-driven." },
              { title: "Elite Coaching Staff", desc: "Our coaching team holds the highest UEFA qualifications in Ireland. Every session is planned and delivered with professional precision." },
              { title: "Professional Environment", desc: "State-of-the-art facilities at TU Blanchardstown and Corduff Sports Centre mirror the environment found at professional academies." },
              { title: "Top-Level Exposure", desc: "Premier League club visits, international training experiences, and direct exposure to scouts and coaches at elite level." },
              { title: "Complete Development", desc: "We develop the complete player: technical, tactical, physical, mental, and academic — nothing is left to chance." },
              { title: "People-First Culture", desc: "Our programme is inclusive, supportive, and built on relationships. Every player matters, and every player is supported." },
            ].map((item, i) => (
              <div key={i} className="bg-[#1a1e25] border border-white/10 rounded-md p-6 hover-elevate">
                <div className="w-8 h-0.5 bg-[#9A0A0A] mb-4" />
                <h3 className="font-heading text-xl text-white uppercase tracking-wide mb-3">{item.title}</h3>
                <p className="text-[#B9B2A5] text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#9A0A0A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-5xl sm:text-6xl text-white uppercase tracking-wide leading-none mb-6">
            READY TO APPLY?
          </h2>
          <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto">Applications for the September 2026 intake are now open. Places are strictly limited.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-[#9A0A0A] font-bold text-sm uppercase tracking-widest px-10">
              <Link href="/apply">Apply Now</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white/30 text-white bg-white/10 text-xs uppercase tracking-widest">
              <Link href="/curriculum">View Curriculum <ChevronRight className="w-4 h-4 ml-1" /></Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
