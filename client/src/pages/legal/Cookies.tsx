export default function Cookies() {
  return (
    <div className="bg-[#111316] text-white pt-20 min-h-screen">
      <section className="py-20 bg-[#0e1014]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-block bg-[#9A0A0A]/20 border border-[#9A0A0A]/30 text-[#9A0A0A] text-xs uppercase tracking-widest px-3 py-1.5 rounded-md mb-6 font-medium">Legal</div>
          <h1 className="font-heading text-5xl sm:text-6xl text-white uppercase tracking-wide leading-none mb-4">Cookie Policy</h1>
          <p className="text-[#655955] text-sm">Last updated: February 2026</p>
        </div>
      </section>
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-[#B9B2A5]">
          <div>
            <h2 className="font-heading text-2xl text-white uppercase tracking-wide mb-3">What Are Cookies?</h2>
            <p>Cookies are small text files that are stored on your device when you visit a website. They help websites remember information about your visit and improve your experience.</p>
          </div>
          <div>
            <h2 className="font-heading text-2xl text-white uppercase tracking-wide mb-3">Cookies We Use</h2>
            <p className="mb-4">This website uses the following types of cookies:</p>
            <div className="space-y-3">
              {[
                { type: "Essential Cookies", desc: "Required for the website to function properly. These cannot be disabled.", canDisable: false },
                { type: "Analytics Cookies", desc: "Help us understand how visitors interact with our website so we can improve the user experience.", canDisable: true },
                { type: "Preference Cookies", desc: "Remember your settings and preferences to improve your visit.", canDisable: true },
              ].map((c, i) => (
                <div key={i} className="bg-[#1a1e25] border border-white/10 rounded-md p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-white font-semibold text-sm">{c.type}</h4>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${c.canDisable ? "bg-[#9A0A0A]/20 text-[#9A0A0A]" : "bg-green-900/20 text-green-400"}`}>
                      {c.canDisable ? "Optional" : "Required"}
                    </span>
                  </div>
                  <p className="text-[#B9B2A5] text-sm">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="font-heading text-2xl text-white uppercase tracking-wide mb-3">Managing Cookies</h2>
            <p>You can control and delete cookies through your browser settings. Note that disabling certain cookies may affect the functionality of our website. For more information, visit <a href="https://www.aboutcookies.org" target="_blank" rel="noopener noreferrer" className="text-[#9A0A0A]">aboutcookies.org</a>.</p>
          </div>
          <div>
            <h2 className="font-heading text-2xl text-white uppercase tracking-wide mb-3">Contact</h2>
            <p>For questions about our cookie policy: <a href="mailto:admissions@areidacademy.ie" className="text-[#9A0A0A]">admissions@areidacademy.ie</a></p>
          </div>
        </div>
      </section>
    </div>
  );
}
