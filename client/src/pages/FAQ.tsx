import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    category: "About the Programme",
    questions: [
      {
        q: "Who is the programme designed for?",
        a: "The programme is designed for male and female players in Transition Year (or equivalent year) who are seriously committed to pursuing a career in professional football while completing their secondary education. Players should be willing to work hard, commit fully, and embrace a high-performance environment.",
      },
      {
        q: "What age group is the programme for?",
        a: "The programme is primarily for students in Transition Year (TY), which typically corresponds to students aged 15-16. However, we consider applications from players in other year groups depending on their circumstances — please contact us if you're unsure.",
      },
      {
        q: "Is the programme open to girls as well as boys?",
        a: "Yes. The Andy Reid Elite Soccer Academy is open to both male and female players. We have an excellent track record of developing female players, with 25 USA scholarships and 78 LOI first team contracts produced across our combined boys and girls programmes.",
      },
      {
        q: "How is the programme structured during the week?",
        a: "Players train five days a week, with morning and afternoon sessions. A typical day includes a technical or tactical session in the morning, followed by athletic development, video analysis, or education sessions in the afternoon. Match days are usually on Fridays.",
      },
    ],
  },
  {
    category: "Applications & Admissions",
    questions: [
      {
        q: "When do applications open?",
        a: "Applications for the September 2026 intake open on February 26, 2026. We recommend applying as early as possible as places are strictly limited and offered on a rolling basis.",
      },
      {
        q: "What do I need to apply?",
        a: "You'll need to complete our online application form including personal and school details, a highlight video link (YouTube, Vimeo, or Google Drive), and parent/guardian details and consent. We may invite shortlisted applicants for a trial or interview.",
      },
      {
        q: "Is there a trial or interview process?",
        a: "Following review of your application and video, we may invite you to attend a trial session at our facilities. We assess players holistically — technically, physically, mentally, and academically — before making final decisions.",
      },
      {
        q: "What happens after I apply?",
        a: "You'll receive an immediate confirmation email. Our admissions team will review your application and be in touch within 5-7 working days to advise on next steps. Shortlisted players will be invited to a trial session.",
      },
    ],
  },
  {
    category: "Logistics & Practicalities",
    questions: [
      {
        q: "Where does the programme take place?",
        a: "The programme is based at two world-class venues in Dublin 15: TU Blanchardstown (our main academic and training hub) and Corduff Sports Centre (our dedicated match and high-performance training facility). Both venues are within minutes of each other.",
      },
      {
        q: "What are the programme dates?",
        a: "The 2026/27 programme runs from September 3, 2026 to May 28, 2027. Players are expected to be available for all training and match days throughout the programme.",
      },
      {
        q: "Do I need to attend school as well?",
        a: "Yes. The programme is designed to complement your Transition Year curriculum, not replace it. We work directly with schools to ensure players meet their academic requirements. Full communication with your school is encouraged from the start.",
      },
      {
        q: "How much does the programme cost?",
        a: "Programme fees will be communicated during the application process. We are committed to making the programme as accessible as possible and offer payment plans and limited scholarship support in cases of genuine financial need. Please contact us to discuss.",
      },
      {
        q: "What equipment and kit do I need?",
        a: "Players are expected to bring appropriate training gear to each session. The academy provides kit for match days. A full equipment list will be provided to all accepted players prior to the programme start date.",
      },
    ],
  },
  {
    category: "Outcomes & Opportunities",
    questions: [
      {
        q: "What outcomes have previous players achieved?",
        a: "Our alumni have gone on to represent Ireland at underage and senior international level, sign professional contracts in the League of Ireland, the UK, and Europe, and earn full academic scholarships to US colleges. Our combined stats include 136 underage internationals, 78 LOI first team contracts, and 25 USA scholarships.",
      },
      {
        q: "Do you help with trials and professional contracts?",
        a: "Yes. Part of our role is to facilitate trial opportunities and connect players with professional clubs, scouts, and coaches through our extensive network. We work to maximise exposure opportunities for every player in the programme.",
      },
      {
        q: "What about USA scholarships?",
        a: "We have a strong track record of placing players in US colleges on full and partial athletic scholarships. We guide players and families through the entire process, from NCAA eligibility to application support. This is an option available to players who meet the required academic and athletic criteria.",
      },
    ],
  },
];

export default function FAQ() {
  return (
    <div className="bg-[#111316] text-white pt-20">
      {/* Hero */}
      <section className="py-24 bg-[#0e1014] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 50% 50%, #9A0A0A 0%, transparent 60%)" }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block bg-[#9A0A0A]/20 border border-[#9A0A0A]/30 text-[#9A0A0A] text-xs uppercase tracking-widest px-3 py-1.5 rounded-md mb-6 font-medium">
            FAQ
          </div>
          <h1 className="font-heading text-6xl sm:text-7xl lg:text-8xl text-white uppercase tracking-wide leading-none mb-6">
            FREQUENTLY ASKED<br /><span className="text-[#9A0A0A]">QUESTIONS</span>
          </h1>
          <p className="text-[#B9B2A5] text-xl max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about the Andy Reid Elite Soccer Academy Transition Year Programme.
          </p>
        </div>
      </section>

      {/* FAQ Sections */}
      <section className="py-20 bg-[#111316]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {faqs.map((section, si) => (
            <div key={si} className="mb-12">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-8 h-0.5 bg-[#9A0A0A]" />
                <h2 className="font-heading text-2xl text-[#9A0A0A] uppercase tracking-wider">{section.category}</h2>
              </div>
              <Accordion type="single" collapsible className="space-y-3">
                {section.questions.map((faq, i) => (
                  <AccordionItem
                    key={i}
                    value={`${si}-${i}`}
                    className="bg-[#1a1e25] border border-white/10 rounded-md px-6 data-[state=open]:border-[#9A0A0A]/40"
                    data-testid={`faq-item-${si}-${i}`}
                  >
                    <AccordionTrigger className="text-white font-semibold text-sm py-5 hover:no-underline text-left">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-[#B9B2A5] text-sm leading-relaxed pb-5">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>
      </section>

      {/* Still have questions */}
      <section className="py-20 bg-[#0e1014]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-12 h-1 bg-[#9A0A0A] mx-auto mb-6" />
          <h2 className="font-heading text-4xl sm:text-5xl text-white uppercase tracking-wide leading-none mb-4">
            STILL HAVE QUESTIONS?
          </h2>
          <p className="text-[#B9B2A5] text-lg mb-8">Our admissions team is happy to chat through any questions you might have.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild size="lg" className="bg-[#9A0A0A] text-white font-bold text-sm uppercase tracking-widest px-10">
              <a href="mailto:admissions@areidacademy.ie">Email Us</a>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white/20 text-white bg-white/5 text-xs uppercase tracking-widest">
              <Link href="/apply">Apply Now</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
