import { useEffect } from 'react';
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

export default function Blog() {
  const { content } = useContent();
  const { blog } = content;
  useReveal();

  const categories = [...new Set(blog.posts.map(p => p.category))];

  return (
    <div className="min-h-screen pt-20">

      {/* Page header */}
      <section className="py-24 bg-dark-2 relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 70% 50%, rgba(26,107,60,0.05) 0%, transparent 55%)' }} />
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-xs text-white/30 mb-6">
            <Link to="/" className="hover:text-green-light transition-colors">Home</Link>
            <span className="mx-2">›</span><span>Blog</span>
          </div>
          <SLabel>Knowledge Hub</SLabel>
          <h1 className="font-display font-black text-5xl lg:text-6xl tracking-tight mb-4">
            MCFEW <span className="gradient-text">Blog</span>
          </h1>
          <p className="text-white/60 max-w-2xl text-lg leading-relaxed">
            Expert insights, industry updates, and engineering knowledge from Sri Lanka's premier MEP consultancy team.
          </p>
        </div>
      </section>

      {/* Blog content + sidebar */}
      <section className="py-28 bg-dark-1">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-12 items-start">

            {/* Posts */}
            <div className="lg:col-span-2 flex flex-col gap-8">
              {blog.posts.map((post, i) => (
                <article key={post.id}
                  className={`reveal group flex flex-col rounded-2xl border border-white/8 bg-dark-card
                               hover:border-green-brand/40 overflow-hidden card-hover`}>
                  <div className="h-64 overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-card to-transparent z-10 opacity-60" />
                    <img src={post.image || '/hero.png'} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 absolute inset-0" />
                  </div>
                  <div className="p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-xs text-white/30">{post.date}</span>
                      <span className="px-3 py-1 rounded-full bg-green-brand/10 border border-green-brand/20 text-xs font-display font-bold text-green-light uppercase tracking-wider">
                        {post.category}
                      </span>
                    </div>
                    <h2 className="font-display font-bold text-2xl mb-3 leading-tight">{post.title}</h2>
                    <p className="text-white/60 leading-relaxed mb-6">{post.content}</p>
                    <button className="inline-flex items-center gap-2 text-sm font-display font-semibold text-green-light hover:text-green-brand transition-colors">
                      Read Full Article <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </button>
                  </div>
                </article>
              ))}
            </div>

            {/* Sidebar */}
            <aside className="flex flex-col gap-6 sticky top-24">

              {/* Recent */}
              <div className="reveal rounded-2xl border border-white/8 bg-dark-card p-6">
                <h4 className="font-display font-bold text-sm uppercase tracking-widest text-white/50 mb-5 pb-3 border-b border-white/8">
                  Recent Posts
                </h4>
                <div className="flex flex-col divide-y divide-white/5">
                  {blog.posts.map(p => (
                    <div key={p.id} className="py-3 hover:pl-2 transition-all duration-200 cursor-pointer group">
                      <div className="text-sm font-semibold text-white/80 group-hover:text-green-light transition-colors leading-tight mb-1">
                        {p.title}
                      </div>
                      <div className="text-xs text-white/30">{p.date}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Categories */}
              <div className="reveal rounded-2xl border border-white/8 bg-dark-card p-6">
                <h4 className="font-display font-bold text-sm uppercase tracking-widest text-white/50 mb-5 pb-3 border-b border-white/8">
                  Categories
                </h4>
                <div className="flex flex-col gap-2">
                  {categories.map(cat => (
                    <div key={cat} className="flex items-center justify-between py-1 cursor-pointer group hover:text-green-light transition-colors">
                      <span className="text-sm text-white/60 group-hover:text-green-light">{cat}</span>
                      <span className="text-xs bg-dark-3 rounded-full px-2.5 py-0.5 text-white/30">
                        {blog.posts.filter(p => p.category === cat).length}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div className="reveal rounded-2xl border border-white/8 bg-dark-card p-6">
                <h4 className="font-display font-bold text-sm uppercase tracking-widest text-white/50 mb-5 pb-3 border-b border-white/8">
                  Tags
                </h4>
                <div className="flex flex-wrap gap-2">
                  {['MEP', 'Electrical', 'HVAC', 'Energy', 'High-Rise', 'Sri Lanka', 'Consulting', 'Fire Protection'].map(tag => (
                    <span key={tag}
                      className="px-3 py-1 rounded-full border border-white/10 text-xs text-white/50
                                 hover:border-green-brand hover:text-green-light cursor-pointer transition-all duration-200">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA Widget */}
              <div className="reveal rounded-2xl border border-green-brand/30 bg-gradient-to-br from-green-dark/20 to-dark-card p-6 text-center">
                <div className="text-3xl mb-3">💬</div>
                <h4 className="font-display font-bold text-base mb-2">Need Expert Advice?</h4>
                <p className="text-sm text-white/55 mb-5 leading-relaxed">Get a free consultation from our MEP engineering experts.</p>
                <Link to="/consultation"
                  className="block w-full py-3 rounded-xl bg-green-brand hover:bg-green-light text-white
                             font-display font-bold text-sm text-center transition-all duration-200">
                  Free Consultation
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
