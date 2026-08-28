import { useEffect } from 'react';
import { Link } from 'react-router-dom';

function SLabel({ children }) {
  return <span className="inline-block text-xs font-display font-bold tracking-widest uppercase text-green-light mb-3">{children}</span>;
}

function useReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } }),
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    );
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

export default function WhatWeDo() {
  useReveal();

  const electrical = [
    { icon: '⚡', title: 'MV & LV Distribution', desc: 'Complete medium and low voltage electrical distribution design for all building types.' },
    { icon: '🔋', title: 'Generator Systems', desc: 'Standby generator systems, ATS panels, and UPS systems for critical power continuity.' },
    { icon: '⛈️', title: 'Lightning Protection', desc: 'Early streamer emission, conventional, and surge protection system design.' },
    { icon: '📡', title: 'ELV Systems', desc: 'Network, CCTV, EACS, PA, GRMS, nurse call systems, and smart home integration.' },
    { icon: '🚨', title: 'Fire Detection & BMS', desc: 'Addressable fire detection systems and building management system design.' },
    { icon: '🌞', title: 'Solar PV & EV Charging', desc: 'Grid-tied and off-grid solar photovoltaic systems, EV charging infrastructure.' },
  ];

  const mechanical = [
    { icon: '🔥', title: 'Fire Protection', desc: 'Sprinkler, fire suppression, hydrant and extinguisher systems per SLS & NFPA.' },
    { icon: '❄️', title: 'HVAC Systems', desc: 'Air conditioning, fresh air, pressurization, and exhaust ventilation systems.' },
    { icon: '💧', title: 'Plumbing & Drainage', desc: 'Water supply, drainage, and sewage systems for all building categories.' },
    { icon: '🏊', title: 'Specialized Systems', desc: 'Swimming pool, sauna/SPA, rainwater harvesting, and LPG distribution.' },
    { icon: '🛗', title: 'Vertical Transport', desc: 'Elevator, escalator, and travelator system specifications and installation guidance.' },
    { icon: '🌿', title: 'Sustainability Systems', desc: 'STP, ETP, rainwater harvesting and green building compliance design.' },
  ];

  const values = [
    { icon: '🎯', title: 'Precision', desc: 'Every calculation, every specification is done with engineering rigor. No assumptions — only verified data.' },
    { icon: '⚡', title: 'Innovation', desc: 'We continuously adapt to new technologies, integrating smart systems and sustainable solutions.' },
    { icon: '🤝', title: 'Partnership', desc: 'We work alongside developers, architects, and contractors — not above them.' },
    { icon: '✅', title: 'Compliance', desc: 'Full adherence to SLS, NFPA, IEE Wiring Regulations, ASHRAE, and local authority standards.' },
  ];

  return (
    <div className="min-h-screen pt-20">

      {/* Page header */}
      <section className="py-24 bg-dark-2 relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(26,107,60,0.06) 0%, transparent 60%)' }} />
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-xs text-white/30 mb-6">
            <Link to="/" className="hover:text-green-light transition-colors">Home</Link>
            <span className="mx-2">›</span><span>What We Do</span>
          </div>
          <SLabel>Our Services</SLabel>
          <h1 className="font-display font-black text-5xl lg:text-6xl tracking-tight mb-4">
            What We <span className="gradient-text">Do</span>
          </h1>
          <p className="text-white/60 max-w-2xl text-lg leading-relaxed">
            Built on three major pillars — MEP Design, MEP Consultation, and Project Management — MCFEW delivers comprehensive engineering services across every building type.
          </p>
        </div>
      </section>

      {/* 3 pillars */}
      <section className="py-28 bg-dark-1">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 reveal">
            <SLabel>Three Major Pillars</SLabel>
            <h2 className="uppercase font-display font-extrabold text-4xl lg:text-5xl tracking-tight">
              Our <span className="gradient-text">Core Services</span>
            </h2>
          </div>
          <div className="grid lg:grid-cols-3 gap-6">
            {[
              { num: '01', icon: '📐', title: 'MEP Design', color: 'border-green-brand/50 bg-green-brand/5', items: ['Conceptual Design','Electrical Drawings','Mechanical Drawings','Plumbing Drawings','BOQ Preparation','Specifications','Tender Documents','Authority Approvals'] },
              { num: '02', icon: '💼', title: 'MEP Consultation', color: 'border-green-light/50 bg-green-light/5', items: ['Technical Consultation','Concept to Handover','Material Approvals','Contractor Evaluation','Pre-commission Tests','As-built Drawings','Progress Monitoring','Feasibility Studies'] },
              { num: '03', icon: '🏗️', title: 'Project Management', color: 'border-white/15 bg-white/2', items: ['Technical Support','Site Inspections','Shop Drawing Review','Commissioning T&C','Site Meeting Support','Punch List Management','Defect Liability Period','Client Reporting'] },
            ].map((pillar, i) => (
              <div key={pillar.num}
                className={`reveal reveal-delay-${i + 1} rounded-2xl border p-8 ${pillar.color} hover:-translate-y-2 transition-all duration-300`}>
                <div className="font-display font-black text-6xl text-green-brand/10 mb-1">{pillar.num}</div>
                <div className="text-4xl mb-4">{pillar.icon}</div>
                <h3 className="font-display font-bold text-2xl mb-5">{pillar.title}</h3>
                <ul className="flex flex-col gap-2.5">
                  {pillar.items.map(item => (
                    <li key={item} className="flex items-center gap-2 text-sm text-white/65">
                      <span className="text-green-brand">✓</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Electrical */}
      <section className="py-28 bg-dark-2">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-14 reveal">
            <SLabel>Electrical Scope</SLabel>
            <h2 className="uppercase font-display font-extrabold text-4xl lg:text-5xl tracking-tight">
              Electrical & <span className="gradient-text">ELV Systems</span>
            </h2>
            <p className="text-white/55 mt-4 max-w-xl">From basic power distribution to complex smart building systems — we design them all.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {electrical.map((item, i) => (
              <div key={item.title}
                className={`reveal reveal-delay-${(i % 3) + 1} group p-6 rounded-2xl border border-white/8 bg-dark-card
                             hover:border-green-brand/40 hover:bg-green-brand/5 transition-all duration-300 hover:-translate-y-1`}>
                <div className="text-2xl mb-3">{item.icon}</div>
                <h3 className="font-display font-bold text-base mb-2">{item.title}</h3>
                <p className="text-sm text-white/55 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mechanical */}
      <section className="py-28 bg-dark-1">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-14 reveal">
            <SLabel>Mechanical Scope</SLabel>
            <h2 className="uppercase font-display font-extrabold text-4xl lg:text-5xl tracking-tight">
              Mechanical & <span className="gradient-text">Plumbing Systems</span>
            </h2>
            <p className="text-white/55 mt-4 max-w-xl">HVAC, fire protection, plumbing — engineered for efficiency, safety, and code compliance.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {mechanical.map((item, i) => (
              <div key={item.title}
                className={`reveal reveal-delay-${(i % 3) + 1} group p-6 rounded-2xl border border-white/8 bg-dark-card
                             hover:border-green-brand/40 hover:bg-green-brand/5 transition-all duration-300 hover:-translate-y-1`}>
                <div className="text-2xl mb-3">{item.icon}</div>
                <h3 className="font-display font-bold text-base mb-2">{item.title}</h3>
                <p className="text-sm text-white/55 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core values */}
      <section className="py-28 bg-dark-2">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14 reveal">
            <SLabel>Our Values</SLabel>
            <h2 className="uppercase font-display font-extrabold text-4xl lg:text-5xl tracking-tight">
              Core <span className="gradient-text">Values</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <div key={v.title}
                className={`reveal reveal-delay-${i + 1} text-center p-8 rounded-2xl border border-white/8 bg-dark-card
                             hover:border-green-brand/40 hover:-translate-y-2 transition-all duration-300`}>
                <div className="text-4xl mb-4">{v.icon}</div>
                <h3 className="font-display font-bold text-lg mb-3">{v.title}</h3>
                <p className="text-sm text-white/55 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-dark-1 text-center relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(26,107,60,0.08) 0%, transparent 60%)' }} />
        <div className="relative max-w-2xl mx-auto px-6">
          <SLabel>Let's Work Together</SLabel>
          <h2 className="uppercase font-display font-black text-4xl mb-4 tracking-tight">
            Ready to Engineer Your <span className="gradient-text">Next Project?</span>
          </h2>
          <p className="text-white/60 mb-8">Get a free consultation from our expert MEP team. No commitment required.</p>
          <Link to="/consultation"
            className="inline-flex px-8 py-4 rounded-xl bg-green-brand hover:bg-green-light text-white
                       font-display font-bold transition-all duration-200 hover:-translate-y-1 shadow-xl hover:shadow-green-brand/30">
            Book Free Consultation →
          </Link>
        </div>
      </section>
    </div>
  );
}
