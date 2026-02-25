import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Programme", href: "/programme" },
  { label: "Curriculum", href: "/curriculum" },
  { label: "Coaches", href: "/coaches" },
  { label: "Locations", href: "/locations" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "FAQ", href: "/faq" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#111316]/95 backdrop-blur-md shadow-xl"
          : "bg-[#111316]/80 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link href="/" className="flex items-center gap-3 flex-shrink-0 pl-[10px] pr-[10px]">
            <div className="w-10 h-10 rounded-full bg-[#9A0A0A] flex items-center justify-center">
              <span className="font-heading text-white text-lg leading-none">AR</span>
            </div>
            <div>
              <div className="font-heading text-white text-lg leading-none tracking-wide">
                ANDY REID
              </div>
              <div className="text-[#B9B2A5] text-[10px] uppercase tracking-widest leading-none">
                Elite Soccer Academy
              </div>
            </div>
          </Link>

          <div className="hidden xl:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 text-xs font-medium uppercase tracking-wider transition-colors duration-200 rounded-md ${
                  location === link.href
                    ? "text-[#9A0A0A] bg-white/5"
                    : "text-[#B9B2A5] hover:text-white hover:bg-white/5"
                }`}
                data-testid={`nav-link-${link.label.toLowerCase()}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden xl:flex items-center gap-3">
            <Button
              asChild
              size="sm"
              className="bg-[#9A0A0A] text-white text-xs uppercase tracking-wider font-semibold px-5"
            >
              <Link href="/apply" data-testid="nav-apply-now">Apply Now</Link>
            </Button>
          </div>

          <button
            className="xl:hidden p-2 text-white"
            onClick={() => setOpen(!open)}
            data-testid="button-mobile-menu"
            aria-label="Toggle menu"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="xl:hidden bg-[#111316] border-t border-white/10">
          <div className="px-4 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-3 text-sm font-medium uppercase tracking-wider rounded-md transition-colors ${
                  location === link.href
                    ? "text-[#9A0A0A] bg-white/5"
                    : "text-[#B9B2A5] hover:text-white hover:bg-white/5"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 flex flex-col gap-3">
              <Button
                asChild
                className="bg-[#9A0A0A] text-white text-sm uppercase tracking-wider font-semibold"
              >
                <Link href="/apply">Apply Now</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
