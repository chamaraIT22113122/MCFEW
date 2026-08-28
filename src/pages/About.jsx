import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useContent } from '../context/ContentContext';
import { getAssetPath } from '../utils/path';
import CountUp from 'react-countup';
import ThreeDCarousel from '../components/ThreeDCarousel';

function SLabel({ children }) {
  return <span className="inline-block text-xs font-display font-bold tracking-widest uppercase text-green-light mb-3">{children}</span>;
}

function useReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } }),
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

function TeamCard({ member, isFounder }) {
  return (
    <div className={`group p-7 rounded-2xl border transition-all duration-300 hover:-translate-y-2
                     ${isFounder
                       ? 'border-green-brand/50 bg-gradient-to-br from-green-dark/30 to-dark-card'
                       : 'border-white/8 bg-dark-card hover:border-green-brand/30'}`}>
      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center font-display font-black text-xl mb-4 overflow-hidden
                        ${isFounder ? 'bg-green-brand text-white' : 'bg-green-brand/10 text-green-light border border-green-brand/20'}`}>
        {member.image ? (
          <img src={getAssetPath(member.image)} alt={member.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300" />
        ) : (
          member.name.split(' ').map(n=>n[0]).join('').substring(0,2).toUpperCase()
        )}
      </div>
      <h3 className="font-display font-bold text-base mb-1">{member.name}</h3>
      <div className={`text-sm font-semibold mb-2 ${isFounder ? 'text-green-light' : 'text-white/70'}`}>{member.role}</div>
      <div className="text-xs text-white/40 leading-relaxed">{member.quals}</div>
      <div className="text-xs text-green-brand mt-2 font-semibold">{member.exp}</div>
    </div>
  );
}

export default function About() {
  const { content } = useContent();
  const { about } = content;
  useReveal();

  return (
    <div className="min-h-screen pt-20">

      {/* Page header */}
      <section className="py-24 bg-dark-2 relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 70% 50%, rgba(26,107,60,0.06) 0%, transparent 55%)' }} />
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-xs text-white/30 mb-6">
            <Link to="/" className="hover:text-green-light transition-colors">Home</Link>
            <span className="mx-2">›</span><span>About Us</span>
          </div>
          <SLabel>Who We Are</SLabel>
          <h1 className="font-display font-black text-5xl lg:text-6xl tracking-tight mb-4">
            About <span className="gradient-text">MCFEW</span>
          </h1>
          <p className="text-white/60 max-w-2xl text-lg leading-relaxed">
            Sri Lanka's premier MEP engineering consultancy — built on experience, driven by innovation, and committed to excellence in every project.
          </p>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-28 bg-dark-1">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="reveal rounded-2xl border border-green-brand/30 bg-gradient-to-br from-green-dark/20 to-dark-card p-10">
              <div className="text-4xl mb-4">👁️</div>
              <SLabel>Vision</SLabel>
              <p className="font-display font-semibold text-xl italic text-green-light leading-relaxed">{about.vision}</p>
            </div>
            <div className="reveal reveal-delay-1 rounded-2xl border border-white/10 bg-dark-card p-10 hover:border-green-brand/30 transition-all duration-300">
              <div className="text-4xl mb-4">🎯</div>
              <SLabel>Mission</SLabel>
              <p className="text-white/70 text-lg leading-relaxed">{about.mission}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-28 bg-dark-2">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-start">
            <div className="reveal">
              <SLabel>Our Story</SLabel>
              <h2 className="uppercase font-display font-extrabold text-4xl lg:text-5xl tracking-tight mb-6">
                Engineering <span className="gradient-text">Excellence</span> Since 2021
              </h2>
              <p className="text-white/65 leading-relaxed mb-6">{about.story1}</p>
              <p className="text-white/65 leading-relaxed">{about.story2}</p>
            </div>
            {/* Timeline */}
            <div className="reveal reveal-delay-1 flex flex-col gap-6">
              {[
                { year: '2021', label: 'MCFEW Founded',        desc: 'Established with a mission to deliver world-class MEP consultancy to Sri Lanka\'s property sector.' },
                { year: '2022', label: 'First Major Projects', desc: 'Completed first landmark projects including Victoria Golf Course infrastructure and Uber Head Office.' },
                { year: '2023', label: 'International Reach',  desc: 'Extended services to the Maldives — 10-storey hotel MEP design at Maafushi Island.' },
                { year: '2024', label: 'Growing Portfolio',    desc: '50+ projects delivered across residential, commercial, hotel, and industrial sectors.' },
              ].map((t, i) => (
                <div key={t.year} className="flex gap-6">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full border-2 border-green-brand bg-green-brand/10 flex items-center justify-center font-display font-bold text-xs text-green-light flex-shrink-0">
                      {t.year.slice(2)}
                    </div>
                    {i < 3 && <div className="w-0.5 flex-1 bg-gradient-to-b from-green-brand/30 to-transparent mt-2" />}
                  </div>
                  <div className="pb-6">
                    <div className="text-xs font-display font-bold text-green-brand uppercase tracking-wider mb-1">{t.year}</div>
                    <div className="font-display font-semibold text-sm mb-1">{t.label}</div>
                    <div className="text-xs text-white/50 leading-relaxed">{t.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Counters */}
      <section className="py-16 bg-dark-card border-y border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/5">
            {[
              { num: 50, suffix: '+', label: 'Projects Delivered' },
              { num: 20, suffix: '+', label: 'Happy Clients' },
              { num: 3,  suffix: '',  label: 'Countries Reached' },
              { num: 4,  suffix: '+', label: 'Years of Excellence' }
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center justify-center text-center p-4">
                <div className="font-display font-black text-4xl lg:text-5xl text-white mb-2">
                  <span>{stat.num}</span>
                  <span className="text-green-brand">{stat.suffix}</span>
                </div>
                <div className="text-xs font-display font-bold text-white/50 uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-28 bg-dark-1">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 reveal">
            <SLabel>Our Process</SLabel>
            <h2 className="uppercase font-display font-extrabold text-4xl lg:text-5xl tracking-tight">
              Our <span className="gradient-text">Design Process</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { num: '01', icon: '💬', title: "Client's Inquiry",   desc: "You approach us through any channel. We listen, collect all information needed to begin the concept design, and understand your exact requirements." },
              { num: '02', icon: '💡', title: 'Concept Design',     desc: 'Initial concept design submitted with all creative design factors aligned with client marketing & operational objectives for review and feedback.' },
              { num: '03', icon: '📐', title: 'Design Development', desc: 'All engineering aspects are addressed. Product tolerances are minimized through precise calculations and specifications.' },
              { num: '04', icon: '🚀', title: 'Final Output',       desc: 'Tender-ready documents handed to client for contractor selection. MCFEW remains on-call to assist throughout construction.' },
            ].map((step, i) => (
              <div key={step.num}
                className={`reveal reveal-delay-${i + 1} group p-7 rounded-2xl border border-white/8 bg-dark-card
                             hover:border-green-brand/40 hover:-translate-y-2 transition-all duration-300 relative`}>
                {i < 3 && (
                  <div className="absolute -right-3 top-1/2 -translate-y-1/2 text-green-brand/20 text-lg font-black hidden lg:block">›</div>
                )}
                <div className="font-display font-black text-5xl text-green-brand/8 group-hover:text-green-brand/15 transition-colors mb-2">{step.num}</div>
                <div className="text-3xl mb-3">{step.icon}</div>
                <h3 className="font-display font-bold text-lg mb-3">{step.title}</h3>
                <p className="text-sm text-white/55 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expert Panel */}
      <section className="py-28 bg-dark-2">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14 reveal">
            <SLabel>Our Team</SLabel>
            <h2 className="uppercase font-display font-extrabold text-4xl lg:text-5xl tracking-tight">
              Expert <span className="gradient-text">Panel</span>
            </h2>
            <p className="text-white/50 mt-4 max-w-xl mx-auto">A multidisciplinary team of chartered engineers, architects, and specialists — all under one roof.</p>
          </div>
          <ThreeDCarousel 
            items={about.expertPanel.map(m => ({
              id: m.id,
              name: m.name,
              role: m.role,
              exp: m.quals, // use quals as description
              tags: [m.exp], // use exp as tag
              imageUrl: m.image
            }))}
            autoRotate={true}
            rotateInterval={4000}
            cardHeight={420}
          />
        </div>
      </section>

      {/* Design Team */}
      <section className="py-28 bg-dark-1">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14 reveal">
            <SLabel>Design & QA Team</SLabel>
            <h2 className="uppercase font-display font-extrabold text-4xl lg:text-5xl tracking-tight">
              Design <span className="gradient-text">Team</span>
            </h2>
          </div>
          <ThreeDCarousel 
            items={about.designTeam.map(m => ({
              id: m.id,
              name: m.name,
              role: m.role,
              exp: m.quals || m.exp, // Use experience as desc
              imageUrl: '' // They use initials
            }))}
            autoRotate={true}
            rotateInterval={4500}
            cardHeight={300}
          />
        </div>
      </section>

    </div>
  );
}
