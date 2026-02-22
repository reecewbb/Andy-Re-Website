import { Link } from "wouter";
import { Button } from "@/components/ui/button";

const boysStats = [
  { value: "91", label: "Underage Internationals" },
  { value: "43", label: "International Debuts" },
  { value: "3", label: "Senior Internationals" },
  { value: "42", label: "LOI First Team Contracts" },
  { value: "21", label: "Overseas Contracts" },
  { value: "21", label: "USA Scholarships" },
];

const combinedStats = [
  { value: "136", label: "Underage Internationals" },
  { value: "67", label: "International Debuts" },
  { value: "4", label: "Senior Internationals" },
  { value: "78", label: "LOI First Team Contracts" },
  { value: "21", label: "Overseas Contracts" },
  { value: "25", label: "USA Scholarships" },
];

const pathways = [
  {
    title: "Professional Football",
    desc: "The majority of our players who aspire to play professionally have gone on to sign senior contracts in Ireland, the UK, and Europe.",
    examples: ["League of Ireland First Team", "English Football League", "European Leagues", "MLS & North American Leagues"],
  },
  {
    title: "International Football",
    desc: "Our programme has a remarkable record of producing underage internationals at every level from U15 through to Senior.",
    examples: ["Republic of Ireland U15–U21", "Senior International Debuts", "Cross-border opportunities", "International tournament experience"],
  },
  {
    title: "USA Scholarships",
    desc: "For players seeking academic and athletic excellence, we facilitate full and partial scholarships to Division I and Division II US colleges.",
    examples: ["Division I NCAA Scholarship", "Division II NCAA Scholarship", "NAIA Scholarships", "Academic & Athletic Package"],
  },
  {
    title: "Continued Development",
    desc: "Even players who don't reach the top level benefit enormously from the programme through fitness, education, discipline, and life skills.",
    examples: ["Coaching & Management", "Sports Science Careers", "Further Education", "Community & Grassroots Football"],
  },
];

export default function Outcomes() {
  return (
    <div className="bg-[#111316] text-white pt-20">
      {/* Hero */}
      <section className="py-24 bg-[#0e1014] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 80% 50%, #9A0A0A 0%, transparent 60%)" }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-block bg-[#9A0A0A]/20 border border-[#9A0A0A]/30 text-[#9A0A0A] text-xs uppercase tracking-widest px-3 py-1.5 rounded-md mb-6 font-medium">
            Outcomes
          </div>
          <h1 className="font-heading text-6xl sm:text-7xl lg:text-8xl text-white uppercase tracking-wide leading-none mb-6">
            A PROVEN PATHWAY<br /><span className="text-[#9A0A0A]">TO ELITE FOOTBALL</span>
          </h1>
          <p className="text-[#B9B2A5] text-xl max-w-2xl leading-relaxed">
            Our track record of producing elite players is unmatched in Ireland. These aren't projections — these are real outcomes achieved by real players from our programme.
          </p>
        </div>
      </section>

      {/* Boys Stats */}
      <section className="py-20 bg-[#111316]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="w-12 h-1 bg-[#9A0A0A] mb-6" />
          <h2 className="font-heading text-4xl sm:text-5xl text-white uppercase tracking-wide leading-none mb-4">
            BOYS PROGRAMME
          </h2>
          <p className="text-[#B9B2A5] mb-12">Career outcomes from our boys programme alumni</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {boysStats.map((stat, i) => (
              <div key={i} className="bg-[#1a1e25] border border-white/10 rounded-md p-6 text-center" data-testid={`boys-stat-${i}`}>
                <div className="font-heading text-5xl sm:text-6xl text-[#9A0A0A] leading-none mb-2">{stat.value}</div>
                <div className="text-[#B9B2A5] text-xs uppercase tracking-wider leading-relaxed">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Combined Stats */}
      <section className="py-20 bg-[#9A0A0A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="w-12 h-1 bg-white mb-6" />
          <h2 className="font-heading text-4xl sm:text-5xl text-white uppercase tracking-wide leading-none mb-4">
            BOYS &amp; GIRLS COMBINED
          </h2>
          <p className="text-white/70 mb-12">Total career outcomes across all programme participants</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {combinedStats.map((stat, i) => (
              <div key={i} className="bg-white/10 border border-white/20 rounded-md p-6 text-center" data-testid={`combined-stat-${i}`}>
                <div className="font-heading text-5xl sm:text-6xl text-white leading-none mb-2">{stat.value}</div>
                <div className="text-white/70 text-xs uppercase tracking-wider leading-relaxed">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pathways */}
      <section className="py-20 bg-[#0e1014]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="w-12 h-1 bg-[#9A0A0A] mx-auto mb-6" />
            <h2 className="font-heading text-4xl sm:text-5xl text-white uppercase tracking-wide leading-none mb-4">
              CAREER PATHWAYS
            </h2>
            <p className="text-[#B9B2A5] max-w-xl mx-auto">Where do our graduates go? Here are the four main pathways our players take after completing the programme.</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {pathways.map((path, i) => (
              <div key={i} className="bg-[#1a1e25] border border-white/10 rounded-md p-8 hover-elevate">
                <div className="w-8 h-0.5 bg-[#9A0A0A] mb-4" />
                <h3 className="font-heading text-2xl text-white uppercase tracking-wide mb-3">{path.title}</h3>
                <p className="text-[#B9B2A5] text-sm leading-relaxed mb-6">{path.desc}</p>
                <ul className="space-y-2">
                  {path.examples.map((ex, j) => (
                    <li key={j} className="flex items-center gap-2 text-[#E2E2E1] text-sm">
                      <div className="w-1.5 h-1.5 bg-[#9A0A0A] rounded-full flex-shrink-0" />
                      {ex}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Notable Alumni */}
      <section className="py-20 bg-[#111316]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="w-12 h-1 bg-[#9A0A0A] mx-auto mb-6" />
            <h2 className="font-heading text-4xl sm:text-5xl text-white uppercase tracking-wide leading-none mb-4">
              NOTABLE ALUMNI
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {[
              { name: "Killian Phillips", achievement: "Republic of Ireland International Midfielder", current: "Crystal Palace FC" },
              { name: "Aidomo Emakhu", achievement: "Republic of Ireland U21 International", current: "Professional Club Footballer" },
            ].map((alumni, i) => (
              <div key={i} className="bg-[#1a1e25] border border-white/10 rounded-md p-6 flex items-center gap-5">
                <div className="w-16 h-16 bg-[#9A0A0A] rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="font-heading text-white text-2xl">{alumni.name.split(' ').map(n => n[0]).join('')}</span>
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg mb-1">{alumni.name}</h4>
                  <p className="text-[#9A0A0A] text-xs uppercase tracking-wider font-semibold mb-1">{alumni.current}</p>
                  <p className="text-[#B9B2A5] text-xs">{alumni.achievement}</p>
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
            YOUR NAME<br />COULD BE ON THIS LIST
          </h2>
          <p className="text-white/70 text-lg mb-8">Apply now and take the first step towards your professional football career.</p>
          <Button asChild size="lg" className="bg-white text-[#9A0A0A] font-bold text-sm uppercase tracking-widest px-10">
            <Link href="/apply">Apply Now</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
