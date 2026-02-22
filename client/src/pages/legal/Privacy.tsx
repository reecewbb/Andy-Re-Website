export default function Privacy() {
  return (
    <div className="bg-[#111316] text-white pt-20 min-h-screen">
      <section className="py-20 bg-[#0e1014]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-block bg-[#9A0A0A]/20 border border-[#9A0A0A]/30 text-[#9A0A0A] text-xs uppercase tracking-widest px-3 py-1.5 rounded-md mb-6 font-medium">
            Legal
          </div>
          <h1 className="font-heading text-5xl sm:text-6xl text-white uppercase tracking-wide leading-none mb-4">Privacy Policy</h1>
          <p className="text-[#655955] text-sm">Last updated: February 2026</p>
        </div>
      </section>
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-invert prose-sm max-w-none">
          <div className="space-y-8 text-[#B9B2A5]">
            <div>
              <h2 className="font-heading text-2xl text-white uppercase tracking-wide mb-3">1. Who We Are</h2>
              <p>Andy Reid Elite Soccer Academy ("we", "us", "our") is a football education programme based in Dublin, Ireland. We are committed to protecting your privacy and handling your personal data in accordance with applicable Irish and EU data protection law, including the General Data Protection Regulation (GDPR).</p>
            </div>
            <div>
              <h2 className="font-heading text-2xl text-white uppercase tracking-wide mb-3">2. Data We Collect</h2>
              <p>When you submit an application or contact form, we collect:</p>
              <ul className="list-disc list-inside space-y-1 mt-2">
                <li>Player details: name, date of birth, gender, school, county, club, position</li>
                <li>Football profile: video links, playing history, achievements</li>
                <li>Parent/guardian details: name, email address, phone number</li>
                <li>Communication preferences and enquiry details</li>
              </ul>
            </div>
            <div>
              <h2 className="font-heading text-2xl text-white uppercase tracking-wide mb-3">3. How We Use Your Data</h2>
              <p>We use your data to process your application, communicate with you about the programme, and fulfil our obligations as an education programme. We do not sell or share your data with third parties for marketing purposes.</p>
            </div>
            <div>
              <h2 className="font-heading text-2xl text-white uppercase tracking-wide mb-3">4. Data Retention</h2>
              <p>We retain application data for up to 3 years following the conclusion of a programme year. You may request deletion of your data at any time by contacting us.</p>
            </div>
            <div>
              <h2 className="font-heading text-2xl text-white uppercase tracking-wide mb-3">5. Your Rights</h2>
              <p>Under GDPR, you have the right to access, rectify, erase, restrict processing of, and port your personal data. Contact us at admissions@areidacademy.ie to exercise these rights.</p>
            </div>
            <div>
              <h2 className="font-heading text-2xl text-white uppercase tracking-wide mb-3">6. Contact</h2>
              <p>For privacy enquiries: <a href="mailto:admissions@areidacademy.ie" className="text-[#9A0A0A]">admissions@areidacademy.ie</a></p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
