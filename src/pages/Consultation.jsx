import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useContent } from '../context/ContentContext';

function SLabel({ children }) {
  return <span className="inline-block text-xs font-display font-bold tracking-widest uppercase text-green-light mb-3">{children}</span>;
}
function useReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } }),
      { threshold: 0.1 }
    );
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

export default function Consultation() {
  const { content } = useContent();
  const { settings, consultation } = content;
  const [formState, setFormState] = useState({ firstName:'', lastName:'', email:'', phone:'', projectType:'', serviceNeeded:'', message:'', agree: false });
  const [submitted, setSubmitted] = useState(false);
  useReveal();

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setFormState(s => ({ ...s, [name]: type === 'checkbox' ? checked : value }));
  };
  const handleSubmit = e => { e.preventDefault(); setSubmitted(true); };

  return (
    <div className="min-h-screen pt-20">

      {/* Page header */}
      <section className="py-24 bg-dark-2 relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(26,107,60,0.06) 0%, transparent 55%)' }} />
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-xs text-white/30 mb-6">
            <Link to="/" className="hover:text-green-light transition-colors">Home</Link>
            <span className="mx-2">›</span><span>Free Consultation</span>
          </div>
          <SLabel>No Obligation</SLabel>
          <h1 className="font-display font-black text-5xl lg:text-6xl tracking-tight mb-4">
            Book Your <span className="gradient-text">Free Consultation</span>
          </h1>
          <p className="text-white/60 max-w-2xl text-lg leading-relaxed">
            Tell us about your project and our MEP engineering experts will get back to you with professional guidance — completely free of charge.
          </p>
        </div>
      </section>

      {/* Form + Info */}
      <section className="py-28 bg-dark-1">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">

            {/* Left: Info */}
            <div className="reveal">
              <SLabel>Reach Us</SLabel>
              <h2 className="uppercase font-display font-extrabold text-4xl tracking-tight mb-4">
                Let's Start a <span className="gradient-text">Conversation</span>
              </h2>
              <p className="text-white/60 mb-8 leading-relaxed">Whether you are a developer, investor, architect, or contractor — MCFEW is ready to assist with expert MEP engineering guidance tailored to your project.</p>

              <div className="flex flex-col gap-4 mb-8">
                {[
                  { icon: '📍', label: 'Address',  value: settings.address,                            href: null },
                  { icon: '📞', label: 'Phone',    value: `${settings.phone1} / ${settings.phone2}`,  href: `tel:${settings.phone1}` },
                  { icon: '✉️', label: 'Email',    value: settings.email,                              href: `mailto:${settings.email}` },
                  { icon: '🔗', label: 'LinkedIn', value: 'T M Weerakkody',                            href: settings.linkedin },
                ].map(({ icon, label, value, href }) => (
                  <div key={label} className="flex items-start gap-4 p-5 rounded-xl border border-white/8 bg-dark-card hover:border-green-brand/30 transition-all duration-200">
                    <span className="text-xl mt-0.5">{icon}</span>
                    <div>
                      <div className="text-xs text-white/30 uppercase tracking-wider mb-0.5">{label}</div>
                      {href
                        ? <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                             className="text-sm text-green-light hover:text-green-brand transition-colors">{value}</a>
                        : <span className="text-sm text-white/65">{value}</span>
                      }
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-6 rounded-xl border border-green-brand/20 bg-green-brand/5">
                <h4 className="font-display font-bold text-sm mb-4">📅 What to Expect</h4>
                {['Submit the form with your project details', 'Our team reviews your requirements within 24–48 hours', "We'll schedule a call or meeting at your convenience", 'Receive expert MEP guidance — completely free, no obligation'].map((s, i) => (
                  <div key={s} className="flex gap-3 mb-2 last:mb-0">
                    <span className="text-green-brand font-display font-bold text-xs min-w-[1.5rem]">{String(i + 1).padStart(2, '0')}.</span>
                    <span className="text-sm text-white/60">{s}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Form */}
            <div className="reveal reveal-delay-1">
              <div className="rounded-2xl border border-white/8 bg-dark-card p-8 lg:p-10">
                {submitted ? (
                  <div className="text-center py-10">
                    <div className="text-5xl mb-4">✅</div>
                    <h3 className="font-display font-bold text-xl mb-2 text-green-light">Message Sent!</h3>
                    <p className="text-white/60 text-sm leading-relaxed">Thank you for reaching out. Our team will review your request and get back to you within 24–48 hours.</p>
                  </div>
                ) : (
                  <>
                    <h3 className="font-display font-bold text-xl mb-1">Get Your Free Consultation</h3>
                    <p className="text-white/50 text-sm mb-7">Fill in the form and an MCFEW expert will be in touch shortly.</p>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                      <div className="grid grid-cols-2 gap-4">
                        {[['firstName','First Name','John'],['lastName','Last Name','Smith']].map(([name, label, ph]) => (
                          <div key={name}>
                            <label className="block text-xs text-white/50 mb-1.5 uppercase tracking-wider">{label} *</label>
                            <input required name={name} placeholder={ph} value={formState[name]} onChange={handleChange} className="input-field" />
                          </div>
                        ))}
                      </div>
                      <div>
                        <label className="block text-xs text-white/50 mb-1.5 uppercase tracking-wider">Email Address *</label>
                        <input required type="email" name="email" placeholder="john@example.com" value={formState.email} onChange={handleChange} className="input-field" />
                      </div>
                      <div>
                        <label className="block text-xs text-white/50 mb-1.5 uppercase tracking-wider">Phone Number</label>
                        <input type="tel" name="phone" placeholder="+94 77 123 4567" value={formState.phone} onChange={handleChange} className="input-field" />
                      </div>
                      <div>
                        <label className="block text-xs text-white/50 mb-1.5 uppercase tracking-wider">Project Type *</label>
                        <select required name="projectType" value={formState.projectType} onChange={handleChange} className="input-field">
                          <option value="" disabled>Select project type</option>
                          {['High-rise Building','Apartment Building','Office Building','Hotel Building','Industrial / Factory','Shopping Mall','Infrastructure Development','Interior Fit-out','Solar Installation','Energy Audit / Certification','Other'].map(o => <option key={o} value={o}>{o}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs text-white/50 mb-1.5 uppercase tracking-wider">Service Needed *</label>
                        <select required name="serviceNeeded" value={formState.serviceNeeded} onChange={handleChange} className="input-field">
                          <option value="" disabled>Select a service</option>
                          {['MEP Design','MEP Consultation','Project Management','Testing & Commissioning','Energy Auditing','Electrical Certification','Not Sure — Need Guidance'].map(o => <option key={o} value={o}>{o}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs text-white/50 mb-1.5 uppercase tracking-wider">Tell Us About Your Project *</label>
                        <textarea required name="message" rows={4} placeholder="Describe your project — location, scale, timeline, and any specific requirements..."
                          value={formState.message} onChange={handleChange} className="input-field resize-none" />
                      </div>
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input type="checkbox" name="agree" required checked={formState.agree} onChange={handleChange}
                          className="mt-0.5 w-4 h-4 accent-green-brand cursor-pointer" />
                        <span className="text-xs text-white/50">I agree to be contacted by MCFEW Consultants regarding my inquiry.</span>
                      </label>
                      <button type="submit"
                        className="w-full py-4 rounded-xl bg-green-brand hover:bg-green-light text-white font-display font-bold text-sm
                                   transition-all duration-200 hover:-translate-y-0.5 shadow-lg hover:shadow-green-brand/30">
                        🚀 Submit Consultation Request
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why MCFEW */}
      <section className="py-28 bg-dark-2">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14 reveal">
            <SLabel>Why Choose Us</SLabel>
            <h2 className="uppercase font-display font-extrabold text-4xl tracking-tight">
              Why <span className="gradient-text">MCFEW</span>?
            </h2>
            <p className="text-white/50 mt-4 max-w-lg mx-auto">Backed by decades of hands-on MEP experience in Sri Lanka's most landmark developments.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {consultation.whyCards.map((card, i) => (
              <div key={card.id}
                className={`reveal reveal-delay-${(i % 3) + 1} group text-center p-8 rounded-2xl border border-white/8 bg-dark-card
                             hover:border-green-brand/40 hover:-translate-y-2 card-hover`}>
                <div className="text-4xl mb-4">{card.icon}</div>
                <h3 className="font-display font-bold text-lg mb-3">{card.title}</h3>
                <p className="text-sm text-white/55 leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
