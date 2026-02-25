import { Link } from "wouter";
import { MapPin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0a0c0e] text-[#B9B2A5] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#9A0A0A] flex items-center justify-center flex-shrink-0">
                <span className="font-heading text-white text-lg leading-none">AR</span>
              </div>
              <div>
                <div className="font-heading text-white text-lg leading-none tracking-wide">ANDY REID</div>
                <div className="text-[#655955] text-[10px] uppercase tracking-widest leading-none">Elite Soccer Academy</div>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-[#655955] mt-4">
              Ireland's premier football and education programme. Empowering young players to reach their full potential on and off the pitch.
            </p>
          </div>

          <div>
            <h4 className="font-heading text-white text-lg tracking-wide mb-4">Programme</h4>
            <ul className="space-y-2 text-sm">
              {[
                ["Programme Overview", "/programme"],
                ["Curriculum", "/curriculum"],
                ["Coaches", "/coaches"],
                ["Locations", "/locations"],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="hover:text-white transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-white text-lg tracking-wide mb-4">Info</h4>
            <ul className="space-y-2 text-sm">
              {[
                ["Testimonials", "/testimonials"],
                ["FAQ", "/faq"],
                ["Apply Now", "/apply"],
                ["Privacy Policy", "/privacy"],
                ["Terms of Use", "/terms"],
                ["Cookie Policy", "/cookies"],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="hover:text-white transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-white text-lg tracking-wide mb-4">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#9A0A0A] mt-0.5 flex-shrink-0" />
                <span>TU Blanchardstown &amp; Corduff Sports Centre, Dublin</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#9A0A0A] flex-shrink-0" />
                <a href="mailto:admissions@andyreidelitesocceracademy.ie" className="hover:text-white transition-colors">
                  admissions@andyreidelitesocceracademy.ie
                </a>
              </li>
            </ul>
            <div className="mt-6 p-4 bg-[#9A0A0A]/10 border border-[#9A0A0A]/20 rounded-md">
              <p className="text-xs text-[#B9B2A5] mb-1 uppercase tracking-wider font-medium">Applications Open</p>
              <p className="text-white font-semibold text-sm">September 2026 Intake</p>
              <p className="text-[#655955] text-xs mt-1">Deadline: Rolling admissions</p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#655955]">
            &copy; {new Date().getFullYear()} Andy Reid Elite Soccer Academy. All rights reserved.
          </p>
          <div className="flex gap-4 text-xs">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
            <Link href="/cookies" className="hover:text-white transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
