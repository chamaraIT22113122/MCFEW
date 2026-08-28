import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { useContent } from '../../context/ContentContext';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { content } = useContent();
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { to: '/',            label: 'Home'             },
    { to: '/what-we-do',  label: 'What We Do'       },
    { to: '/about',       label: 'About Us'          },
    { to: '/projects',    label: 'Projects'          },
    { to: '/blog',        label: 'Blog'              },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'nav-glass border-b border-white/8 shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3" onClick={() => setMenuOpen(false)}>
          <img src="/logo.png" alt="MCFEW Consultants" className="h-10 w-auto rounded-sm" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {links.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg text-sm font-medium font-display transition-all duration-200 ${
                  isActive
                    ? 'bg-green-brand/15 text-green-light'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-lg
                       hover:border-green-brand hover:bg-green-brand/10 transition-all duration-200 hover:scale-110"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>

          {/* CTA */}
          <Link
            to="/consultation"
            className="hidden lg:inline-flex items-center gap-2 px-5 py-2.5 rounded-lg
                       bg-green-brand hover:bg-green-light text-white text-sm font-semibold font-display
                       transition-all duration-200 hover:-translate-y-0.5 shadow-lg hover:shadow-green-brand/30"
          >
            Free Consultation
          </Link>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(o => !o)}
            className="lg:hidden flex flex-col gap-1.5 w-10 h-10 justify-center items-center"
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`lg:hidden nav-glass border-t border-white/8 overflow-hidden transition-all duration-300 ${
        menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="px-6 py-4 flex flex-col gap-1">
          {links.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `px-4 py-3 rounded-lg text-sm font-medium font-display transition-all ${
                  isActive ? 'bg-green-brand/15 text-green-light' : 'text-white/70 hover:text-white hover:bg-white/5'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
          <Link
            to="/consultation"
            onClick={() => setMenuOpen(false)}
            className="mt-2 px-4 py-3 rounded-lg bg-green-brand text-white text-sm font-semibold font-display text-center"
          >
            Free Consultation
          </Link>
        </div>
      </div>
    </header>
  );
}
