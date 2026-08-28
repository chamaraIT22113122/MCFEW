import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useContent } from '../context/ContentContext';
import { getAssetPath } from '../utils/path';
import { InfiniteMarquee } from '../components/InfiniteMarquee';

/* ── Reusable section label ── */
function SLabel({ children }) {
  return (
    <span className="inline-block text-xs font-display font-bold tracking-widest uppercase text-green-light mb-3">
      {children}
    </span>
  );
}

/* ── Animated counter ── */
function Counter({ target }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const num = parseFloat(target);
        const suffix = target.replace(/[\d.]/g, '');
        const dur = 1800;
        const start = performance.now();
        const tick = (now) => {
          const p = Math.min((now - start) / dur, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          setCount(Math.floor(num * eased) + suffix);
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target]);

  return <span ref={ref}>{count || '0'}</span>;
}

/* ── Scroll reveal hook ── */
function useReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } }),
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

export default function Home() {
  const { content } = useContent();
  const { home, projects, blog, settings } = content;
  useReveal();

  return (
    <div className="min-h-screen">

      {/* ══════════════════════════════════════════
          HERO — full-screen video background
      ══════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 bg-dark-card overflow-hidden">
          <video autoPlay loop muted playsInline preload="auto" poster={getAssetPath('/hero.png')} className="absolute top-0 left-0 w-full h-full object-cover opacity-30">
            <source src={getAssetPath('/hero-video.mp4')} type="video/mp4" />
          </video>
        </div>
        {/* Overlay */}
        <div className="absolute inset-0 hero-video-overlay" />

        {/* Grid texture */}
        <div className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'linear-gradient(rgba(26,107,60,0.15) 1px,transparent 1px),linear-gradient(90deg,rgba(26,107,60,0.15) 1px,transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        {/* Hero content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-20 text-center">
          <div className="animate-fade-in-up" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
            <span className="inline-block px-4 py-1.5 rounded-full border border-green-brand/50 bg-green-brand/10
                             text-green-light text-xs font-display font-bold uppercase tracking-widest mb-6">
              {home.heroBadge}
            </span>
          </div>

          <h1 className="font-display font-black text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-[1.03]
                         tracking-tight text-white mb-6"
              style={{ animationDelay: '0.2s', animationFillMode: 'both' }}
          >
            Engineering the<br />
            <span className="gradient-text">Future of MEP</span>
          </h1>

          <p className="text-green-light/90 italic font-display text-lg mb-4"
             style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
            {home.heroSubtitle}
          </p>

          <p className="text-white/70 text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
             style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
            {home.heroDesc}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mb-16"
               style={{ animationDelay: '0.5s', animationFillMode: 'both' }}>
            <Link to="/consultation"
              className="px-8 py-4 rounded-xl bg-green-brand hover:bg-green-light text-white font-display font-bold
                         text-base transition-all duration-200 hover:-translate-y-1 shadow-xl hover:shadow-green-brand/40">
              Get Free Consultation
            </Link>
            <Link to="/projects"
              className="px-8 py-4 rounded-xl border border-white/20 text-white font-display font-semibold
                         text-base hover:border-green-brand hover:bg-green-brand/10 transition-all duration-200">
              View Our Projects
            </Link>
          </div>

          {/* Stats */}
          <div className="inline-flex flex-wrap justify-center gap-0 bg-black/40 backdrop-blur-md
                          border border-white/10 rounded-2xl px-2 py-2">
            {home.stats.map((stat, i) => (
              <div key={stat.id} className="flex items-center">
                <div className="px-8 py-4 text-center">
                  <div className="font-display font-black text-4xl text-green-light leading-none">
                    <Counter target={stat.number} />
                  </div>
                  <div className="text-xs text-white/50 uppercase tracking-wider mt-1">{stat.label}</div>
                </div>
                {i < home.stats.length - 1 && <div className="w-px h-10 bg-white/10" />}
              </div>
            ))}
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 text-xs uppercase tracking-widest">
          <div className="w-px h-10 bg-gradient-to-b from-transparent to-green-brand animate-pulse" />
          <span>Scroll</span>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          MARQUEE
      ══════════════════════════════════════════ */}
      <div className="bg-green-brand py-3 overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...Array(2)].map((_, rep) => (
            ['MEP Design', 'MEP Consultation', 'Project Management', 'T&C Services',
              'Energy Auditing', 'Electrical Systems', 'HVAC Systems', 'Fire Protection'].map(item => (
              <span key={`${rep}-${item}`} className="font-display font-semibold text-sm uppercase tracking-wider text-white/90 mx-6">
                {item} &nbsp;·
              </span>
            ))
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════
          ABOUT INTRO
      ══════════════════════════════════════════ */}
      <section className="py-28 bg-dark-2">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-start">
            {/* Left text */}
            <div className="reveal">
              <SLabel>About MCFEW</SLabel>
              <h2 className="uppercase font-display font-extrabold text-4xl lg:text-5xl leading-tight tracking-tight mb-6">
                {home.aboutTitle.split('Three').map((part, i) => i === 0
                  ? <span key={i}>{part}Three </span>
                  : <span key={i} className="gradient-text">{part}</span>
                )}
              </h2>
              <p className="text-white/60 leading-relaxed mb-4">{home.aboutDesc1}</p>
              <p className="text-white/60 leading-relaxed mb-8">{home.aboutDesc2}</p>
              <Link to="/about"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-green-brand hover:bg-green-light
                           text-white font-display font-semibold transition-all duration-200 hover:-translate-y-0.5">
                Learn More About Us →
              </Link>
            </div>

            {/* Pillar cards */}
            <div className="flex flex-col gap-5">
              {[
                { num: '01', icon: '📐', title: 'MEP Design',        desc: 'Complete Electrical & Mechanical scope design — RFP, drawings, specifications & BOQ.' },
                { num: '02', icon: '💼', title: 'MEP Consultation',   desc: 'Expert guidance from concept to handover, including authority clearances & approvals.' },
                { num: '03', icon: '🏗️', title: 'Project Management', desc: 'Technical support for contractors, site inspections, and full testing & commissioning.' },
              ].map((p, i) => (
                <div key={p.num}
                  className={`reveal reveal-delay-${i + 1} group flex gap-5 p-7 rounded-2xl border transition-all duration-300 cursor-default
                               bg-dark-card border-white/8 hover:border-green-brand/50 hover:bg-green-brand/5 hover:translate-x-2`}
                >
                  <div className="flex-shrink-0">
                    <div className="text-xs font-display font-bold text-green-brand mb-1">{p.num}</div>
                    <div className="text-3xl">{p.icon}</div>
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg mb-2">{p.title}</h3>
                    <p className="text-sm text-white/60 leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SERVICES
      ══════════════════════════════════════════ */}
      <section className="py-28 bg-dark-1 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(26,107,60,0.06) 0%, transparent 60%)' }} />
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="text-center mb-16 reveal">
            <SLabel>What We Do</SLabel>
            <h2 className="uppercase font-display font-extrabold text-4xl lg:text-5xl tracking-tight">
              Comprehensive <span className="gradient-text">MEP Services</span>
            </h2>
            <p className="text-white/50 mt-4 max-w-xl mx-auto">From high-rise towers to industrial plants — we engineer the systems that power, cool, and protect your building.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {[
              { icon: '⚡', title: 'Electrical Systems', featured: false, items: ['MV & LV Electrical Distribution','Generator Systems','Lightning Protection','ELV (Network/CCTV/EACS/PA)','Fire Detection & BMS','SMART Home Systems'] },
              { icon: '🏛️', title: 'MEP Consultation',  featured: true,  items: ['Conceptual Planning to Handover','Government Authority Approvals','Feasibility & Optimum Solutions','Contractor Evaluation','Material Approval & Inspection','Pre-Commissioning Testing'] },
              { icon: '🔧', title: 'Mechanical Systems',featured: false,  items: ['Fire Protection & HVAC','Water Supply & Drainage','Elevator / Escalator Systems','Rainwater Harvesting','LPG & Sewer Treatment','Swimming Pool & SAUNA/SPA'] },
            ].map((svc, i) => (
              <div key={svc.title}
                className={`reveal reveal-delay-${i + 1} card-hover group rounded-2xl p-8 border flex flex-col relative overflow-hidden
                             ${svc.featured
                               ? 'bg-gradient-to-br from-green-dark/40 to-dark-card border-green-brand/50'
                               : 'bg-dark-card border-white/8 hover:border-green-brand/30'}`}
              >
                {svc.featured && (
                  <span className="absolute top-4 right-4 text-xs font-display font-bold px-3 py-1 rounded-full bg-green-brand text-white uppercase tracking-wider">
                    Core Service
                  </span>
                )}
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl mb-5 transition-all duration-300
                                 ${svc.featured ? 'bg-green-brand/20 border border-green-brand/40' : 'bg-green-brand/10 border border-green-brand/20 group-hover:bg-green-brand'}`}>
                  {svc.icon}
                </div>
                <h3 className="font-display font-bold text-xl mb-4">{svc.title}</h3>
                <ul className="flex flex-col gap-2">
                  {svc.items.map(item => (
                    <li key={item} className="flex items-center gap-2 text-sm text-white/60">
                      <span className="text-green-brand text-xs">▸</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Installation types */}
          <div className="text-center reveal">
            <h3 className="font-display font-bold text-xl mb-6 text-white/80">Types of Installations</h3>
            <div className="flex flex-wrap gap-3 justify-center">
              {['High-rise Buildings','Infrastructure','Manufacturing Factories','Solar Installations','Club Houses','Restaurants','Apartment Buildings','Office Buildings','Hotel Buildings','Shopping Malls','Carpark Buildings','Manufacturing Plants'].map(t => (
                <span key={t}
                  className="px-4 py-2 rounded-full border border-white/10 text-sm text-white/60 cursor-default
                             hover:border-green-brand hover:text-green-light transition-all duration-200">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          PROCESS
      ══════════════════════════════════════════ */}
      <section className="py-28 bg-dark-2">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 reveal">
            <SLabel>Our Workflow</SLabel>
            <h2 className="uppercase font-display font-extrabold text-4xl lg:text-5xl tracking-tight">
              How We <span className="gradient-text">Work</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { num: '01', icon: '💬', title: "Client's Inquiry",    desc: 'You approach us through any channel. We collect all information needed to begin the concept design.' },
              { num: '02', icon: '💡', title: 'Concept Design',      desc: 'Initial concept submitted aligned with your marketing & operational objectives for review.' },
              { num: '03', icon: '📐', title: 'Design Development',  desc: 'All engineering aspects addressed; tolerances minimized through precision calculations.' },
              { num: '04', icon: '🚀', title: 'Final Output',        desc: 'Tender-ready documents for contractor selection. MCFEW remains on-call throughout.' },
            ].map((step, i) => (
              <div key={step.num}
                className={`reveal reveal-delay-${i + 1} group p-7 rounded-2xl border bg-dark-card border-white/8
                             hover:border-green-brand/40 hover:-translate-y-2 transition-all duration-300`}>
                <div className="font-display font-black text-5xl text-green-brand/10 group-hover:text-green-brand/20 transition-colors mb-2">{step.num}</div>
                <div className="text-3xl mb-3">{step.icon}</div>
                <h3 className="font-display font-bold text-lg mb-2">{step.title}</h3>
                <p className="text-sm text-white/55 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          PROJECT INVOLVEMENT
      ══════════════════════════════════════════ */}
      <section className="py-28 bg-dark-1">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-12 reveal">
            <div>
              <SLabel>Portfolio</SLabel>
              <h2 className="uppercase font-display font-extrabold text-4xl lg:text-5xl tracking-tight">
                Project <span className="gradient-text">Involvement</span>
              </h2>
            </div>
            <Link to="/projects"
              className="hidden sm:inline-flex px-5 py-2.5 rounded-xl border border-white/15 text-sm font-display font-semibold
                         hover:border-green-brand hover:text-green-light transition-all duration-200">
              View All →
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Large featured project */}
            {projects.items.slice(0, 1).map(p => (
              <div key={p.id}
                className="reveal md:col-span-2 flex flex-col md:flex-row rounded-2xl border border-white/8
                           bg-dark-card hover:border-green-brand/40 card-hover overflow-hidden group">
                <div className="md:w-2/5 min-h-48 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-card to-transparent z-10 opacity-50 md:hidden" />
                  <img src={getAssetPath(p.image || '/hero.png')} alt={p.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="flex-1 p-8 relative z-20">
                  <span className="text-xs font-display font-bold text-green-light uppercase tracking-wider">{p.category}</span>
                  <h3 className="font-display font-bold text-2xl mt-2 mb-3 leading-tight">{p.title}</h3>
                  <p className="text-sm text-white/60 leading-relaxed mb-4">{p.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {(p.tags || '').split(',').map(tag => (
                      <span key={tag.trim()} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-white/50">
                        {tag.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
            {/* Other projects */}
            {projects.items.slice(1, 3).map((p, i) => (
              <div key={p.id}
                className={`reveal reveal-delay-${i + 1} rounded-2xl border border-white/8 bg-dark-card hover:border-green-brand/40 card-hover overflow-hidden group flex flex-col`}>
                <div className="h-48 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-card to-transparent z-10 opacity-50" />
                  <img src={getAssetPath(p.image || '/hero.png')} alt={p.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="p-6 flex-1 flex flex-col relative z-20">
                  <span className="text-xs font-display font-bold text-green-light uppercase tracking-wider">{p.category}</span>
                  <h3 className="font-display font-bold text-lg mt-1 mb-2 leading-tight">{p.title}</h3>
                  <p className="text-sm text-white/60 leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CLIENTS
      ══════════════════════════════════════════ */}
      <section className="py-20 bg-dark-2">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10 reveal">
            <SLabel>Trusted By</SLabel>
            <h2 className="uppercase font-display font-extrabold text-3xl tracking-tight">
              Our <span className="gradient-text">Clients</span>
            </h2>
          </div>
          <div className="mt-8">
            <InfiniteMarquee baseVelocity={3} direction={1}>
              {(projects.clientLogos || []).map((c, i) => (
                <div key={c.id || i}
                  className={`p-6 h-28 w-48 flex items-center justify-center rounded-xl border border-white/8 bg-dark-card text-center
                               text-xs font-display font-semibold text-white/50 hover:border-green-brand hover:text-white
                               cursor-default transition-all duration-300 hover:shadow-lg hover:shadow-green-brand/10`}>
                  {c.image ? (
                    <img src={getAssetPath(c.image)} alt={c.name} className="max-h-full max-w-full object-contain filter grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500" />
                  ) : (
                    <span>{c.name}</span>
                  )}
                </div>
              ))}
            </InfiniteMarquee>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          BLOG PREVIEW
      ══════════════════════════════════════════ */}
      <section className="py-28 bg-dark-1">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-12 reveal">
            <div>
              <SLabel>Knowledge Hub</SLabel>
              <h2 className="uppercase font-display font-extrabold text-4xl lg:text-5xl tracking-tight">
                MCFEW <span className="gradient-text">Blog</span>
              </h2>
            </div>
            <Link to="/blog"
              className="hidden sm:inline-flex px-5 py-2.5 rounded-xl border border-white/15 text-sm font-display font-semibold
                         hover:border-green-brand hover:text-green-light transition-all duration-200">
              View All →
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {blog.posts.slice(0, 3).map((post, i) => (
              <div key={post.id}
                className={`reveal reveal-delay-${i + 1} group flex flex-col p-8 rounded-2xl border border-white/8 bg-dark-card
                             hover:border-green-brand/40 card-hover relative overflow-hidden`}>
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-green-brand to-green-light
                                 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                
                {/* Image Header */}
                <div className="-mx-8 -mt-8 mb-6 h-48 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-card to-transparent z-10 opacity-60" />
                  <img src={getAssetPath(post.image || '/hero.png')} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                
                <div className="text-xs text-white/30 mb-1">{post.date}</div>
                <span className="inline-block text-xs font-display font-bold text-green-light uppercase tracking-wider mb-3 px-2 py-0.5 rounded-full bg-green-brand/10 border border-green-brand/20 w-fit">
                  {post.category}
                </span>
                <h3 className="font-display font-bold text-lg leading-tight mb-3 flex-1">{post.title}</h3>
                <p className="text-sm text-white/55 leading-relaxed mb-5">{post.excerpt}</p>
                <Link to="/blog" className="text-sm font-display font-semibold text-green-light hover:text-green-brand transition-colors inline-flex items-center gap-1">
                  Read Article <span className="transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CTA BANNER
      ══════════════════════════════════════════ */}
      <section className="py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-dark/30 via-dark-2 to-dark-1" />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(26,107,60,0.12) 0%, transparent 65%)' }} />
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-green-brand/5 animate-pulse-glow" />
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <SLabel>Ready to Start?</SLabel>
          <h2 className="uppercase font-display font-black text-4xl lg:text-5xl tracking-tight mb-4">
            Get Your Free MEP<br />Consultation Today
          </h2>
          <p className="text-white/60 text-lg mb-10">Our expert team is ready to evaluate your project requirements and provide a no-obligation consultation.</p>
          <Link to="/consultation"
            className="inline-flex items-center gap-2 px-10 py-5 rounded-2xl bg-green-brand hover:bg-green-light
                       text-white font-display font-bold text-lg transition-all duration-200
                       hover:-translate-y-1 shadow-2xl hover:shadow-green-brand/40">
            Book Free Consultation →
          </Link>
        </div>
      </section>

    </div>
  );
}
