import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { MapPin, Car, Train, Clock } from "lucide-react";

const locations = [
  {
    name: "TU Blanchardstown",
    shortName: "TUB",
    address: "Blanchardstown Road North, Dublin 15, D15 YV78",
    type: "Main Academic & Training Facility",
    desc: "TU Blanchardstown serves as our primary training and academic base. The university campus provides state-of-the-art indoor and outdoor facilities, including full-size 3G pitches, indoor training halls, sports science labs, and classroom facilities for our education programme.",
    features: [
      "Full-size 3G artificial pitches",
      "Indoor sports hall",
      "Sports science and conditioning suite",
      "Changing facilities and medical room",
      "Classroom and presentation facilities",
      "Campus café and social areas",
    ],
    transport: [
      { icon: <Car className="w-4 h-4" />, mode: "By Car", detail: "Accessible via N3/M50 interchange. On-campus parking available." },
      { icon: <Train className="w-4 h-4" />, mode: "By Bus", detail: "Routes 39, 39A, 70, 70A all serve Blanchardstown campus." },
      { icon: <Clock className="w-4 h-4" />, mode: "Journey Times", detail: "15 min from Dublin city centre by car; 30-40 min by public transport." },
    ],
    imgUrl: "https://images.unsplash.com/photo-1571512599285-9ac4e4b1af59?w=800&q=80",
  },
  {
    name: "Corduff Sports Centre",
    shortName: "CSC",
    address: "Corduff Road, Blanchardstown, Dublin 15",
    type: "Elite Training & Match Facility",
    desc: "Corduff Sports Centre is our dedicated high-performance training venue. A purpose-built facility with premium pitches and sports infrastructure, Corduff provides the professional match and training environment our players need to develop at the highest level.",
    features: [
      "New 4G state-of-the-art training pitch",
      "Full match facilities with floodlights",
      "Professional changing and medical rooms",
      "Video analysis suite",
      "Spectator areas for match days",
      "Adjacent community sports infrastructure",
    ],
    transport: [
      { icon: <Car className="w-4 h-4" />, mode: "By Car", detail: "5 minutes from TU Blanchardstown campus. Easy access from M50." },
      { icon: <Train className="w-4 h-4" />, mode: "By Bus", detail: "Local bus routes serve the Corduff area from Blanchardstown town centre." },
      { icon: <Clock className="w-4 h-4" />, mode: "Journey Times", detail: "2-minute drive or 10-minute walk from TU Blanchardstown." },
    ],
    imgUrl: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&q=80",
  },
];

export default function Locations() {
  return (
    <div className="bg-[#111316] text-white pt-20">
      {/* Hero */}
      <section className="py-24 bg-[#0e1014] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 50% 50%, #9A0A0A 0%, transparent 60%)" }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block bg-[#9A0A0A]/20 border border-[#9A0A0A]/30 text-[#9A0A0A] text-xs uppercase tracking-widest px-3 py-1.5 rounded-md mb-6 font-medium">
            Our Facilities
          </div>
          <h1 className="font-heading text-6xl sm:text-7xl lg:text-8xl text-white uppercase tracking-wide leading-none mb-6">
            ACADEMY<br /><span className="text-[#9A0A0A]">FACILITIES</span>
          </h1>
          <p className="text-[#B9B2A5] text-xl max-w-2xl mx-auto leading-relaxed">
            Train where the pros train. Our facilities in Dublin 15 provide everything a serious footballer needs to develop to their full potential.
          </p>
        </div>
      </section>

      {/* Location Cards */}
      {locations.map((loc, i) => (
        <section key={i} className={`py-20 ${i % 2 === 0 ? "bg-[#111316]" : "bg-[#0e1014]"}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                <div className="bg-[#1a1e25] border border-[#9A0A0A]/30 rounded-md inline-flex items-center gap-2 px-3 py-1.5 mb-6">
                  <div className="w-6 h-6 bg-[#9A0A0A] rounded-full flex items-center justify-center">
                    <span className="font-heading text-white text-xs">{i + 1}</span>
                  </div>
                  <span className="text-[#9A0A0A] text-xs uppercase tracking-widest font-medium">{loc.type}</span>
                </div>
                <h2 className="font-heading text-5xl sm:text-6xl text-white uppercase tracking-wide leading-none mb-3">
                  {loc.name}
                </h2>
                <div className="flex items-center gap-2 text-[#655955] text-sm mb-6">
                  <MapPin className="w-4 h-4 text-[#9A0A0A]" />
                  {loc.address}
                </div>
                <p className="text-[#B9B2A5] leading-relaxed mb-8">{loc.desc}</p>

                <h4 className="font-heading text-lg text-white uppercase tracking-wide mb-4">Facilities</h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-8">
                  {loc.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-2 text-[#B9B2A5] text-sm">
                      <div className="w-1.5 h-1.5 bg-[#9A0A0A] rounded-full flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <h4 className="font-heading text-lg text-white uppercase tracking-wide mb-4">Getting Here</h4>
                <div className="space-y-3">
                  {loc.transport.map((t, j) => (
                    <div key={j} className="flex items-start gap-3 text-sm">
                      <div className="w-8 h-8 bg-[#9A0A0A]/20 border border-[#9A0A0A]/30 rounded-md flex items-center justify-center text-[#9A0A0A] flex-shrink-0 mt-0.5">
                        {t.icon}
                      </div>
                      <div>
                        <span className="text-white font-semibold">{t.mode}: </span>
                        <span className="text-[#B9B2A5]">{t.detail}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                <div className="rounded-md overflow-hidden aspect-video bg-[#1a1e25]">
                  <img src={loc.imgUrl} alt={loc.name} className="w-full h-full object-cover" />
                </div>
                {/* Map placeholder */}
                <div className="mt-4 bg-[#1a1e25] border border-white/10 rounded-md p-8 text-center">
                  <MapPin className="w-8 h-8 text-[#9A0A0A] mx-auto mb-3" />
                  <p className="text-[#B9B2A5] text-sm mb-4">Interactive map coming soon</p>
                  <Button asChild variant="outline" size="sm" className="border-white/20 text-white bg-white/5 text-xs uppercase tracking-widest">
                    <a href={`https://www.google.com/maps/search/${encodeURIComponent(loc.address)}`} target="_blank" rel="noopener noreferrer">
                      Open in Google Maps
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="py-20 bg-[#9A0A0A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-5xl sm:text-6xl text-white uppercase tracking-wide leading-none mb-6">
            COME AND SEE<br />FOR YOURSELF
          </h2>
          <p className="text-white/70 text-lg mb-8">Apply to the programme and experience our world-class facilities in person.</p>
          <Button asChild size="lg" className="bg-white text-[#9A0A0A] font-bold text-sm uppercase tracking-widest px-10">
            <Link href="/apply">Apply Now</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
