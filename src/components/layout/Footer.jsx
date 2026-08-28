import { Link } from 'react-router-dom';
import { useContent } from '../../context/ContentContext';

export default function Footer() {
  const { content } = useContent();
  const { settings } = content;

  const quickLinks = [
    { to: '/',            label: 'Home'              },
    { to: '/what-we-do',  label: 'What We Do'        },
    { to: '/about',       label: 'About Us'           },
    { to: '/projects',    label: 'Projects'           },
    { to: '/blog',        label: 'Blog'               },
    { to: '/consultation',label: 'Free Consultation'  },
  ];

  const services = [
    'MEP Design', 'MEP Consultation', 'Project Management',
    'Testing & Commissioning', 'Energy Auditing', 'Electrical Certification',
  ];

  return (
    <footer className="bg-black border-t border-white/8 pt-20 pb-0">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-white/8">

          {/* Brand */}
          <div>
            <img src="/logo.png" alt="MCFEW Consultants" className="h-16 w-auto mb-5 rounded-md" />
            <p className="text-sm text-white/50 leading-relaxed mb-6">{settings.footerDesc}</p>
            <div className="flex gap-3">
              {[
                { href: settings.facebook,  label: 'Facebook',  icon: 'f' },
                { href: settings.instagram, label: 'Instagram', icon: 'in' },
                { href: settings.linkedin,  label: 'LinkedIn',  icon: 'li' },
              ].map(({ href, label, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-lg border border-white/10 flex items-center justify-center
                             text-xs font-bold font-display text-white/50 hover:border-green-brand
                             hover:bg-green-brand hover:text-white transition-all duration-200 hover:-translate-y-1"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-700 text-sm uppercase tracking-widest text-white/50 mb-5">Quick Links</h4>
            <ul className="flex flex-col gap-2.5">
              {quickLinks.map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="text-sm text-white/60 hover:text-green-light transition-colors duration-200">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display font-700 text-sm uppercase tracking-widest text-white/50 mb-5">Services</h4>
            <ul className="flex flex-col gap-2.5">
              {services.map(s => (
                <li key={s} className="text-sm text-white/60">{s}</li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-700 text-sm uppercase tracking-widest text-white/50 mb-5">Contact Us</h4>
            <div className="flex flex-col gap-4">
              {[
                { icon: '📍', text: settings.address },
                { icon: '📞', text: `${settings.phone1} / ${settings.phone2}` },
                { icon: '✉️', href: `mailto:${settings.email}`, text: settings.email },
              ].map(({ icon, text, href }) => (
                <div key={text} className="flex items-start gap-3">
                  <span className="text-base leading-none mt-0.5 flex-shrink-0">{icon}</span>
                  {href
                    ? <a href={href} className="text-sm text-green-light hover:text-green-brand transition-colors">{text}</a>
                    : <span className="text-sm text-white/60 leading-relaxed">{text}</span>
                  }
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between py-6 gap-3 text-xs text-white/30 border-t border-white/8 mt-8">
          <p>© {settings.copyrightYear} {settings.legalName}. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="text-white/40">Developed by <span className="text-green-light font-display font-semibold">Eflash24</span></span>
            <Link to="/admin" className="hover:text-green-brand transition-colors">Admin Panel</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
