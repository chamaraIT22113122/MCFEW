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
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

export default function Projects() {
  const { content } = useContent();
  const { projects } = content;
  const [filter, setFilter] = useState('all');
  useReveal();

  const categories = ['all', ...new Set(projects.items.map(p => p.category))];
  const filtered = filter === 'all' ? projects.items : projects.items.filter(p => p.category === filter);

  return (
    <div className="min-h-screen pt-20">

      {/* Page header */}
      <section className="py-24 bg-dark-2 relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(26,107,60,0.06) 0%, transparent 55%)' }} />
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-xs text-white/30 mb-6">
            <Link to="/" className="hover:text-green-light transition-colors">Home</Link>
            <span className="mx-2">›</span><span>Projects</span>
          </div>
          <SLabel>Our Portfolio</SLabel>
          <h1 className="font-display font-black text-5xl lg:text-6xl tracking-tight mb-4">
            Project <span className="gradient-text">Involvement</span>
          </h1>
          <p className="text-white/60 max-w-2xl text-lg leading-relaxed">
            From iconic Sri Lankan developments to international hotel projects — MCFEW has left its mark on some of the region's most ambitious builds.
          </p>
        </div>
      </section>

      {/* Featured */}
      <section className="py-28 bg-dark-1">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-10 reveal">
            <SLabel>Flagship Project</SLabel>
            <h2 className="font-display font-extrabold text-4xl tracking-tight">
              Victoria Golf Course & <span className="gradient-text">Country Resort</span>
            </h2>
          </div>
          {projects.items.slice(0, 1).map(p => (
            <div key={p.id} className="reveal rounded-2xl border border-green-brand/30 bg-dark-card overflow-hidden flex flex-col lg:flex-row group">
              <div className="lg:w-2/5 min-h-[300px] lg:min-h-full overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-dark-card to-transparent z-10 opacity-70 lg:opacity-40" />
                <img src={p.image || '/hero.png'} alt={p.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 absolute inset-0" />
              </div>
              <div className="flex-1 p-10 relative z-20 flex flex-col justify-center">
                <span className="w-fit inline-block text-xs font-display font-bold text-green-light uppercase tracking-wider mb-3 px-3 py-1 rounded-full bg-green-brand/10 border border-green-brand/20">
                  {p.category}
                </span>
                <h3 className="font-display font-bold text-3xl mb-4 leading-tight">
                  {p.title}
                </h3>
                <p className="text-white/60 text-lg leading-relaxed mb-8">{p.desc}</p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="p-5 rounded-xl bg-dark-3/50 backdrop-blur-sm border border-white/5">
                    <div className="text-xs font-display font-bold text-green-brand uppercase tracking-wider mb-3">Project Tags</div>
                    <ul className="flex flex-col gap-2">
                      {(p.tags || '').split(',').map(tag => (
                        <li key={tag.trim()} className="text-sm text-white/70 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-brand"></span> {tag.trim()}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* All projects with filter */}
      <section className="py-28 bg-dark-2">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10 reveal">
            <SLabel>Portfolio</SLabel>
            <h2 className="font-display font-extrabold text-4xl tracking-tight">
              All <span className="gradient-text">Projects</span>
            </h2>
          </div>

          {/* Filter pills */}
          <div className="flex flex-wrap gap-3 justify-center mb-10 reveal">
            {categories.map(cat => (
              <button key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2 rounded-full text-xs font-display font-bold uppercase tracking-wider transition-all duration-200
                             ${filter === cat
                               ? 'bg-green-brand text-white'
                               : 'border border-white/15 text-white/50 hover:border-green-brand hover:text-green-light'}`}>
                {cat === 'all' ? 'All Projects' : cat}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p, i) => (
              <div key={p.id}
                className={`reveal reveal-delay-${(i % 3) + 1} group rounded-2xl border border-white/8 bg-dark-card
                             hover:border-green-brand/40 card-hover overflow-hidden flex flex-col`}>
                <div className="h-48 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-card to-transparent z-10 opacity-60" />
                  <img src={p.image || '/hero.png'} alt={p.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="p-7 flex-1 flex flex-col relative z-20">
                  <span className="text-xs font-display font-bold text-green-light uppercase tracking-wider">{p.category}</span>
                  <h3 className="font-display font-bold text-lg mt-1.5 mb-2 leading-tight">{p.title}</h3>
                  <p className="text-sm text-white/55 leading-relaxed mb-4 flex-1">{p.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {(p.tags || '').split(',').map(tag => (
                      <span key={tag.trim()} className="px-3 py-1 rounded-full bg-white/5 border border-white/8 text-xs text-white/45">
                        {tag.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Energy Auditing */}
      <section className="py-28 bg-dark-1">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12 reveal">
            <SLabel>Specialist Services</SLabel>
            <h2 className="font-display font-extrabold text-4xl tracking-tight">
              Energy Auditing & <span className="gradient-text">Certification</span>
            </h2>
          </div>
          <div className="flex flex-col gap-4">
            {projects.energyAudit.map((item, i) => (
              <div key={i}
                className={`reveal reveal-delay-${(i % 3) + 1} flex gap-5 items-start p-6 rounded-xl border border-white/8 bg-dark-card
                             hover:border-green-brand/30 hover:bg-green-brand/3 transition-all duration-300`}>
                <div className="font-display font-black text-xl text-green-brand min-w-[2rem]">{String(i + 1).padStart(2, '0')}</div>
                <p className="text-sm text-white/65 leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Clients */}
      <section className="py-28 bg-dark-2">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12 reveal">
            <SLabel>Involvement</SLabel>
            <h2 className="font-display font-extrabold text-4xl tracking-tight">
              Our <span className="gradient-text">Clients</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: '🏢', title: 'Developers & Business Entities', key: 'developers' },
              { icon: '🏛️', title: 'Architects',                     key: 'architects'  },
              { icon: '🔨', title: 'Interior Contractors',           key: 'contractors' },
            ].map((cat, i) => (
              <div key={cat.key}
                className={`reveal reveal-delay-${i + 1} p-8 rounded-2xl border border-white/8 bg-dark-card
                             hover:border-green-brand/30 hover:-translate-y-1 transition-all duration-300`}>
                <h4 className="font-display text-xs font-bold text-green-light uppercase tracking-widest mb-5">
                  {cat.icon} {cat.title}
                </h4>
                <ul className="flex flex-col">
                  {(projects.clients[cat.key] || '').split('\n').filter(l => l.trim()).map(l => (
                    <li key={l} className="text-sm text-white/60 py-2.5 border-b border-white/5 last:border-b-0">{l.trim()}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-dark-1 text-center relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(26,107,60,0.08) 0%, transparent 60%)' }} />
        <div className="relative max-w-2xl mx-auto px-6">
          <SLabel>Your Project Next</SLabel>
          <h2 className="font-display font-black text-4xl mb-4 tracking-tight">
            Ready to Add Your Project<br />to Our <span className="gradient-text">Portfolio?</span>
          </h2>
          <p className="text-white/60 mb-8">Get expert MEP engineering consultation for your development — from concept to commissioning.</p>
          <Link to="/consultation"
            className="inline-flex px-8 py-4 rounded-xl bg-green-brand hover:bg-green-light text-white
                       font-display font-bold transition-all duration-200 hover:-translate-y-1 shadow-xl hover:shadow-green-brand/30">
            Start a Conversation →
          </Link>
        </div>
      </section>
    </div>
  );
}
