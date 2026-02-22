export default function Medical() {
  return (
    <div className="bg-[#111316] text-white pt-20 min-h-screen">
      <section className="py-20 bg-[#0e1014]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-block bg-[#9A0A0A]/20 border border-[#9A0A0A]/30 text-[#9A0A0A] text-xs uppercase tracking-widest px-3 py-1.5 rounded-md mb-6 font-medium">Legal</div>
          <h1 className="font-heading text-5xl sm:text-6xl text-white uppercase tracking-wide leading-none mb-4">Medical Policy</h1>
          <p className="text-[#655955] text-sm">Last updated: February 2026</p>
        </div>
      </section>
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-[#B9B2A5]">
          <div>
            <h2 className="font-heading text-2xl text-white uppercase tracking-wide mb-3">Medical Information</h2>
            <p>All accepted players are required to complete a medical information form prior to the programme start date. This form captures relevant medical history, conditions, allergies, and emergency contact details to ensure we can provide appropriate care.</p>
          </div>
          <div>
            <h2 className="font-heading text-2xl text-white uppercase tracking-wide mb-3">Medical Fitness</h2>
            <p>Players are expected to be in good general health and medically fit to participate in intensive physical training. Any pre-existing medical conditions must be disclosed on the medical information form. We may request a medical clearance letter from a GP before a player can commence the programme.</p>
          </div>
          <div>
            <h2 className="font-heading text-2xl text-white uppercase tracking-wide mb-3">Injury Management</h2>
            <p>We have access to physiotherapy services for all programme participants. In the event of a training or match injury, our qualified first-aid certified staff will provide immediate first response. Injuries requiring further medical attention will be referred to appropriate healthcare services. Parents/guardians will be notified of any injury as soon as possible.</p>
          </div>
          <div>
            <h2 className="font-heading text-2xl text-white uppercase tracking-wide mb-3">Medication</h2>
            <p>Any player who needs to take medication during the programme day must declare this on the medical information form. Prescription medication must be clearly labelled with the player's name. Certain medications may require an accompanying letter from a healthcare professional.</p>
          </div>
          <div>
            <h2 className="font-heading text-2xl text-white uppercase tracking-wide mb-3">Emergency Procedures</h2>
            <p>In the event of a medical emergency, we will contact the emergency services immediately, followed by the parent/guardian at the earliest opportunity. All staff hold current first aid certification. Defibrillators are available at all primary training venues.</p>
          </div>
          <div>
            <h2 className="font-heading text-2xl text-white uppercase tracking-wide mb-3">Insurance</h2>
            <p>The academy holds appropriate public liability insurance. However, we strongly recommend that families hold personal accident insurance for their player throughout the programme year. Details of suitable insurance providers are available on request.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
