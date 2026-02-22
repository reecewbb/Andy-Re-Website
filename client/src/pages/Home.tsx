import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ChevronRight, CheckCircle, Star, MapPin, Calendar, Users, Trophy, Play, ChevronDown } from "lucide-react";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const stats = [
  { value: "91", label: "Underage Internationals", sub: "Boys programme" },
  { value: "43", label: "International Debuts", sub: "Boys programme" },
  { value: "42", label: "LOI First Team Contracts", sub: "Boys programme" },
  { value: "21", label: "USA Scholarships", sub: "Boys programme" },
];

const pillars = [
  {
    title: "Player Development",
    icon: "⚽",
    color: "from-[#9A0A0A] to-[#7a0808]",
    bullets: [
      "Technical excellence & tactical intelligence",
      "Small-sided games & position-specific training",
      "Video analysis & performance reviews",
      "Weekly 1-on-1 coaching sessions",
      "Strength & conditioning integration",
    ],
  },
  {
    title: "Education & Personal Growth",
    icon: "📚",
    color: "from-[#1a1f2e] to-[#111316]",
    bullets: [
      "Transition Year curriculum support",
      "Life skills & leadership workshops",
      "Sports psychology & mental resilience",
      "Career planning & academic support",
      "Community service & volunteering",
    ],
  },
  {
    title: "Athletic Development",
    icon: "💪",
    color: "from-[#2a1a1a] to-[#111316]",
    bullets: [
      "Strength & conditioning programme",
      "Speed, agility & explosiveness training",
      "Injury prevention & recovery protocols",
      "Nutrition education & hydration guidance",
      "Sports science monitoring",
    ],
  },
];

const setsApart = [
  { title: "Proven Foundation", desc: "20+ years producing elite players for domestic and international football" },
  { title: "Elite Coaching", desc: "Led by UEFA Pro & UEFA A licensed coaches with professional playing experience" },
  { title: "Pro Environment", desc: "Train at TU Blanchardstown & Corduff Sports Centre in professional facilities" },
  { title: "Top-Level Exposure", desc: "Premier League & international club visits, trials and scouting opportunities" },
  { title: "Complete Development", desc: "Balancing football excellence with academic achievement and personal growth" },
];

const testimonials = [
  {
    quote: "The programme gave me the platform to get noticed at the highest level. The coaching staff pushed me every day and believed in me when others didn't.",
    name: "Killian Phillips",
    role: "Republic of Ireland International",
    initials: "KP",
  },
  {
    quote: "Andy and his staff helped shape me into the player and person I am today. The environment they created was unlike anything I had experienced before.",
    name: "Aidomo Emakhu",
    role: "Professional Footballer",
    initials: "AE",
  },
  {
    quote: "As a parent, I couldn't have asked for a better environment for my son. The professionalism, the care, and the results speak for themselves.",
    name: "Lorraine Cailloce",
    role: "Parent",
    initials: "LC",
  },
  {
    quote: "My daughter's confidence on and off the pitch has grown enormously. This programme is the best decision our family ever made for her future.",
    name: "Fran Sheridan",
    role: "Parent",
    initials: "FS",
  },
];

const faqs = [
  {
    q: "Who is the programme for?",
    a: "The programme is open to male and female players in Transition Year (or equivalent) who are committed to pursuing a career in professional football while completing their education.",
  },
  {
    q: "What are the programme dates?",
    a: "The 2026/27 programme runs from September 3, 2026 to May 28, 2027. Applications are open from February 26, 2026.",
  },
  {
    q: "Where does training take place?",
    a: "Training takes place at TU Blanchardstown and Corduff Sports Centre, both state-of-the-art facilities in Dublin.",
  },
  {
    q: "What qualifications do the coaches hold?",
    a: "Our head coaches hold UEFA Pro and UEFA A licences respectively, with extensive professional playing and coaching experience at the highest levels of the game.",
  },
];

export default function Home() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  return (
    <div className="bg-[#111316] text-white">
      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=1600&q=80')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#111316]/80 via-[#111316]/70 to-[#111316]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#111316]/60 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 pt-40">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-[#9A0A0A]/20 border border-[#9A0A0A]/40 rounded-full px-4 py-2 mb-8">
              <div className="w-2 h-2 bg-[#9A0A0A] rounded-full animate-pulse" />
              <span className="text-[#E2E2E1] text-xs uppercase tracking-widest font-medium">Applications Now Open — Feb 26, 2026</span>
            </div>

            <h1 className="font-heading text-6xl sm:text-7xl lg:text-8xl xl:text-9xl leading-none text-white mb-6 uppercase tracking-wide">
              TRANSITION YEAR<br />
              <span className="text-[#9A0A0A]">FULL-TIME</span><br />
              FOOTBALL &amp;<br />
              EDUCATION COURSE
            </h1>

            <p className="text-xl sm:text-2xl text-[#B9B2A5] font-light mb-10 tracking-wide">
              Train Like a Pro. Develop Like a Pro.
            </p>

            <div className="flex flex-wrap gap-3 mb-10">
              {[
                { icon: <MapPin className="w-3.5 h-3.5" />, text: "TU Blanchardstown & Corduff Sports Centre" },
                { icon: <Calendar className="w-3.5 h-3.5" />, text: "Sept 3 – May 28" },
                { icon: <Users className="w-3.5 h-3.5" />, text: "UEFA Pro & UEFA A Coaches" },
                { icon: <Trophy className="w-3.5 h-3.5" />, text: "136 Underage Internationals" },
              ].map((chip, i) => (
                <div key={i} className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-xs text-[#E2E2E1] font-medium">
                  {chip.icon}
                  {chip.text}
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <Button
                asChild
                size="lg"
                className="bg-[#9A0A0A] text-white font-semibold text-sm uppercase tracking-widest px-8"
                data-testid="hero-apply-now"
              >
                <Link href="/apply">Apply Now <ChevronRight className="w-4 h-4 ml-1" /></Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white/30 text-white bg-white/5 backdrop-blur-sm text-sm uppercase tracking-widest"
                data-testid="hero-view-programme"
              >
                <Link href="/programme">View Programme</Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-white/40" />
        </div>
      </section>

      {/* PROGRAMME OVERVIEW */}
      <section className="py-24 bg-[#0e1014]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-block bg-[#9A0A0A]/20 border border-[#9A0A0A]/30 text-[#9A0A0A] text-xs uppercase tracking-widest px-3 py-1.5 rounded-md mb-6 font-medium">
                The Programme
              </div>
              <h2 className="font-heading text-5xl sm:text-6xl text-white uppercase tracking-wide leading-none mb-6">
                AN ELITE PATHWAY<br /><span className="text-[#9A0A0A]">FOR SERIOUS PLAYERS</span>
              </h2>
              <p className="text-[#B9B2A5] leading-relaxed mb-6">
                The Andy Reid Elite Soccer Academy Transition Year Programme is a full-time, people-first football and education experience built for players who are serious about reaching the professional game. We create a safe, inclusive, and high-performance environment where every player is empowered to grow.
              </p>
              <p className="text-[#B9B2A5] leading-relaxed mb-8">
                Based at TU Blanchardstown and Corduff Sports Centre in Dublin, our programme combines elite technical coaching from UEFA-licensed staff with academic support, life skills, and real exposure to professional football environments — including Premier League and international club experiences.
              </p>
              <Button asChild className="bg-[#9A0A0A] text-white font-semibold text-xs uppercase tracking-widest">
                <Link href="/programme">Explore Programme <ChevronRight className="w-4 h-4 ml-1" /></Link>
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "Full-Time", label: "Daily Coaching", desc: "Morning & afternoon sessions" },
                { value: "UEFA", label: "Licensed Coaches", desc: "Pro & A licence holders" },
                { value: "TY", label: "Recognised", desc: "Transition Year approved" },
                { value: "20+", label: "Years Track Record", desc: "Proven player development" },
              ].map((stat, i) => (
                <div key={i} className="bg-[#1a1e25] border border-white/10 rounded-md p-6">
                  <div className="font-heading text-3xl text-[#9A0A0A] mb-1">{stat.value}</div>
                  <div className="text-white font-semibold text-sm mb-1">{stat.label}</div>
                  <div className="text-[#655955] text-xs">{stat.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* THREE PILLARS */}
      <section className="py-24 bg-[#111316]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block bg-[#9A0A0A]/20 border border-[#9A0A0A]/30 text-[#9A0A0A] text-xs uppercase tracking-widest px-3 py-1.5 rounded-md mb-4 font-medium">
              Three Pillars
            </div>
            <h2 className="font-heading text-5xl sm:text-6xl text-white uppercase tracking-wide leading-none">
              A COMPLETE <span className="text-[#9A0A0A]">DEVELOPMENT</span> SYSTEM
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {pillars.map((pillar, i) => (
              <div key={i} className="bg-[#1a1e25] border border-white/10 rounded-md p-8 group hover-elevate">
                <div className={`w-12 h-1 bg-[#9A0A0A] rounded-full mb-6`} />
                <h3 className="font-heading text-3xl text-white uppercase tracking-wide mb-6">{pillar.title}</h3>
                <ul className="space-y-3">
                  {pillar.bullets.map((b, j) => (
                    <li key={j} className="flex items-start gap-3 text-[#B9B2A5] text-sm leading-relaxed">
                      <CheckCircle className="w-4 h-4 text-[#9A0A0A] mt-0.5 flex-shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <Link href="/curriculum" className="text-[#9A0A0A] text-xs uppercase tracking-wider font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                    Learn More <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT SETS US APART */}
      <section className="py-24 bg-[#0e1014]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block bg-[#9A0A0A]/20 border border-[#9A0A0A]/30 text-[#9A0A0A] text-xs uppercase tracking-widest px-3 py-1.5 rounded-md mb-4 font-medium">
              Our Difference
            </div>
            <h2 className="font-heading text-5xl sm:text-6xl text-white uppercase tracking-wide leading-none">
              WHAT SETS US <span className="text-[#9A0A0A]">APART</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {setsApart.map((item, i) => (
              <div key={i} className="bg-[#1a1e25] border border-white/10 rounded-md p-6 hover-elevate">
                <div className="w-8 h-0.5 bg-[#9A0A0A] mb-4" />
                <h4 className="font-heading text-lg text-white uppercase tracking-wide mb-3">{item.title}</h4>
                <p className="text-[#B9B2A5] text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE TEASER */}
      <section className="relative py-32 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=1600&q=80')` }}
        />
        <div className="absolute inset-0 bg-[#111316]/80" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block bg-[#9A0A0A]/20 border border-[#9A0A0A]/30 text-[#9A0A0A] text-xs uppercase tracking-widest px-3 py-1.5 rounded-md mb-6 font-medium">
            Premier League & International Experience
          </div>
          <h2 className="font-heading text-5xl sm:text-6xl lg:text-7xl text-white uppercase tracking-wide leading-none mb-6">
            TRAIN WITH &amp; VISIT<br /><span className="text-[#9A0A0A]">THE WORLD'S BEST</span>
          </h2>
          <p className="text-[#B9B2A5] max-w-2xl mx-auto text-lg mb-10">
            Our players gain exclusive access to Premier League academies, international club visits, and professional training environments that money can't buy.
          </p>
          <Button asChild size="lg" className="bg-[#9A0A0A] text-white font-semibold text-xs uppercase tracking-widest px-8">
            <Link href="/experience">View Experience <ChevronRight className="w-4 h-4 ml-1" /></Link>
          </Button>
        </div>
      </section>

      {/* OUTCOMES STATS */}
      <section className="py-24 bg-[#9A0A0A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-5xl sm:text-6xl text-white uppercase tracking-wide leading-none mb-4">
              A PROVEN PATHWAY<br />TO ELITE FOOTBALL
            </h2>
            <p className="text-white/70 text-sm uppercase tracking-widest">Boys Programme Results</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {stats.map((s, i) => (
              <div key={i} className="text-center bg-white/10 rounded-md p-6 border border-white/20" data-testid={`stat-${s.label.toLowerCase().replace(/ /g, '-')}`}>
                <div className="font-heading text-6xl sm:text-7xl text-white leading-none mb-2">{s.value}</div>
                <div className="text-white font-semibold text-sm mb-1">{s.label}</div>
                <div className="text-white/60 text-xs">{s.sub}</div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Button asChild variant="outline" size="lg" className="border-white/30 text-white bg-white/10 text-xs uppercase tracking-widest">
              <Link href="/outcomes">View All Outcomes <ChevronRight className="w-4 h-4 ml-1" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* MEDIA GALLERY */}
      <section className="py-24 bg-[#111316]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block bg-[#9A0A0A]/20 border border-[#9A0A0A]/30 text-[#9A0A0A] text-xs uppercase tracking-widest px-3 py-1.5 rounded-md mb-4 font-medium">
              Media Gallery
            </div>
            <h2 className="font-heading text-5xl sm:text-6xl text-white uppercase tracking-wide leading-none">
              SEE US <span className="text-[#9A0A0A]">IN ACTION</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
            {[
              "https://images.unsplash.com/photo-1571512599285-9ac4e4b1af59?w=500&q=80",
              "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=500&q=80",
              "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=500&q=80",
              "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=500&q=80",
              "https://images.unsplash.com/photo-1556056504-5c7696c4c28d?w=500&q=80",
              "https://images.unsplash.com/photo-1459865264687-595d652de67e?w=500&q=80",
              "https://images.unsplash.com/photo-1624454002302-036b25ea7a8a?w=500&q=80",
              "https://images.unsplash.com/photo-1598257006463-7c64a5a538cc?w=500&q=80",
            ].map((src, i) => (
              <div key={i} className={`relative bg-[#1a1e25] rounded-md overflow-hidden ${i === 0 ? "col-span-2 row-span-2" : ""}`} style={{ aspectRatio: i === 0 ? "1" : "1" }}>
                <img src={src} alt={`Training photo ${i + 1}`} className="w-full h-full object-cover" style={{ minHeight: i === 0 ? "300px" : "140px" }} />
                <div className="absolute inset-0 bg-[#111316]/20 hover:bg-[#111316]/0 transition-colors" />
              </div>
            ))}
          </div>

          {/* Highlight Reel */}
          <div className="bg-[#1a1e25] border border-white/10 rounded-md p-8 text-center">
            <div className="w-16 h-16 bg-[#9A0A0A] rounded-full flex items-center justify-center mx-auto mb-4">
              <Play className="w-7 h-7 text-white ml-1" />
            </div>
            <h3 className="font-heading text-3xl text-white uppercase tracking-wide mb-2">Academy Highlight Reel 2025</h3>
            <p className="text-[#B9B2A5] text-sm mb-6">Watch our players in action — training, matches, and life at the academy.</p>
            <Button asChild variant="outline" className="border-white/20 text-white bg-white/5 text-xs uppercase tracking-widest">
              <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
                Watch on YouTube <ChevronRight className="w-3.5 h-3.5 ml-1" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 bg-[#0e1014]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block bg-[#9A0A0A]/20 border border-[#9A0A0A]/30 text-[#9A0A0A] text-xs uppercase tracking-widest px-3 py-1.5 rounded-md mb-4 font-medium">
              Testimonials
            </div>
            <h2 className="font-heading text-5xl sm:text-6xl text-white uppercase tracking-wide leading-none">
              WHAT THEY <span className="text-[#9A0A0A]">SAY</span>
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="bg-[#1a1e25] border border-white/10 rounded-md p-8 sm:p-12 text-center mb-8">
              <div className="flex justify-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-[#9A0A0A] fill-current" />
                ))}
              </div>
              <blockquote className="text-[#E2E2E1] text-lg sm:text-xl leading-relaxed mb-8 italic">
                "{testimonials[activeTestimonial].quote}"
              </blockquote>
              <div className="flex items-center justify-center gap-4">
                <div className="w-12 h-12 bg-[#9A0A0A] rounded-full flex items-center justify-center font-heading text-white text-lg">
                  {testimonials[activeTestimonial].initials}
                </div>
                <div className="text-left">
                  <div className="text-white font-semibold">{testimonials[activeTestimonial].name}</div>
                  <div className="text-[#655955] text-sm">{testimonials[activeTestimonial].role}</div>
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTestimonial(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${i === activeTestimonial ? "bg-[#9A0A0A]" : "bg-white/20"}`}
                  data-testid={`testimonial-dot-${i}`}
                />
              ))}
            </div>

            <div className="text-center mt-8">
              <Button asChild variant="outline" className="border-white/20 text-white bg-white/5 text-xs uppercase tracking-widest">
                <Link href="/testimonials">All Testimonials <ChevronRight className="w-3.5 h-3.5 ml-1" /></Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ PREVIEW */}
      <section className="py-24 bg-[#111316]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-block bg-[#9A0A0A]/20 border border-[#9A0A0A]/30 text-[#9A0A0A] text-xs uppercase tracking-widest px-3 py-1.5 rounded-md mb-4 font-medium">
              FAQ
            </div>
            <h2 className="font-heading text-5xl sm:text-6xl text-white uppercase tracking-wide leading-none">
              COMMON <span className="text-[#9A0A0A]">QUESTIONS</span>
            </h2>
          </div>
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="bg-[#1a1e25] border border-white/10 rounded-md px-6 data-[state=open]:border-[#9A0A0A]/40">
                <AccordionTrigger className="text-white font-semibold text-sm py-5 hover:no-underline text-left">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-[#B9B2A5] text-sm leading-relaxed pb-5">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <div className="text-center mt-8">
            <Button asChild variant="outline" className="border-white/20 text-white bg-white/5 text-xs uppercase tracking-widest">
              <Link href="/faq">All FAQs <ChevronRight className="w-3.5 h-3.5 ml-1" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24 bg-[#0e1014]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-block bg-[#9A0A0A]/20 border border-[#9A0A0A]/30 text-[#9A0A0A] text-xs uppercase tracking-widest px-3 py-1.5 rounded-md mb-6 font-medium">
                Get In Touch
              </div>
              <h2 className="font-heading text-5xl sm:text-6xl text-white uppercase tracking-wide leading-none mb-6">
                TAKE THE <span className="text-[#9A0A0A]">FIRST STEP</span>
              </h2>
              <p className="text-[#B9B2A5] leading-relaxed mb-8">
                Have questions about the programme? We'd love to hear from you. Reach out to our admissions team and we'll get back to you within 24 hours.
              </p>
              <div className="space-y-4">
                <a href="mailto:admissions@areidacademy.ie" className="flex items-center gap-4 text-[#B9B2A5] hover:text-white transition-colors">
                  <div className="w-10 h-10 bg-[#9A0A0A]/20 border border-[#9A0A0A]/30 rounded-md flex items-center justify-center flex-shrink-0">
                    <span className="text-[#9A0A0A] text-lg">@</span>
                  </div>
                  <span>admissions@areidacademy.ie</span>
                </a>
                <a href="tel:+35301234567" className="flex items-center gap-4 text-[#B9B2A5] hover:text-white transition-colors">
                  <div className="w-10 h-10 bg-[#9A0A0A]/20 border border-[#9A0A0A]/30 rounded-md flex items-center justify-center flex-shrink-0">
                    <span className="text-[#9A0A0A] text-sm font-bold">#</span>
                  </div>
                  <span>+353 01 234 5678</span>
                </a>
              </div>
            </div>
            <div className="bg-[#1a1e25] border border-white/10 rounded-md p-8">
              <h3 className="font-heading text-2xl text-white uppercase tracking-wide mb-6">Send a Message</h3>
              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); }}>
                <div>
                  <label className="text-[#B9B2A5] text-xs uppercase tracking-wider mb-2 block">Your Name</label>
                  <input
                    type="text"
                    className="w-full bg-[#111316] border border-white/10 rounded-md px-4 py-3 text-white text-sm focus:border-[#9A0A0A]/60 focus:outline-none transition-colors placeholder:text-[#655955]"
                    placeholder="John Smith"
                    data-testid="contact-name"
                  />
                </div>
                <div>
                  <label className="text-[#B9B2A5] text-xs uppercase tracking-wider mb-2 block">Email Address</label>
                  <input
                    type="email"
                    className="w-full bg-[#111316] border border-white/10 rounded-md px-4 py-3 text-white text-sm focus:border-[#9A0A0A]/60 focus:outline-none transition-colors placeholder:text-[#655955]"
                    placeholder="john@example.com"
                    data-testid="contact-email"
                  />
                </div>
                <div>
                  <label className="text-[#B9B2A5] text-xs uppercase tracking-wider mb-2 block">Message</label>
                  <textarea
                    rows={4}
                    className="w-full bg-[#111316] border border-white/10 rounded-md px-4 py-3 text-white text-sm focus:border-[#9A0A0A]/60 focus:outline-none transition-colors resize-none placeholder:text-[#655955]"
                    placeholder="Tell us about your player..."
                    data-testid="contact-message"
                  />
                </div>
                <Button type="submit" className="w-full bg-[#9A0A0A] text-white font-semibold text-xs uppercase tracking-widest" data-testid="contact-submit">
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA BANNER */}
      <section className="bg-[#9A0A0A] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-5xl sm:text-6xl lg:text-7xl text-white uppercase tracking-wide leading-none mb-4">
            APPLICATIONS FOR<br />SEPTEMBER 2026 NOW OPEN
          </h2>
          <p className="text-white/70 text-lg mb-8">Places are limited. Don't miss your chance to train with Ireland's best.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-white text-[#9A0A0A] font-bold text-sm uppercase tracking-widest px-10"
              data-testid="cta-apply-now"
            >
              <Link href="/apply">Apply Now</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white/30 text-white bg-white/10 text-xs uppercase tracking-widest"
            >
              <Link href="/programme">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
