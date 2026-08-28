import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { ContentProvider } from './context/ContentContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import WhatWeDo from './pages/WhatWeDo';
import About from './pages/About';
import Projects from './pages/Projects';
import Blog from './pages/Blog';
import Consultation from './pages/Consultation';
import Admin from './pages/Admin';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

// Layout wrapper (no navbar/footer on admin)
function Layout({ children }) {
  const { pathname } = useLocation();
  const isAdmin = pathname === '/admin';
  return (
    <>
      {!isAdmin && <Navbar />}
      {children}
      {!isAdmin && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <ContentProvider>
        <HashRouter>
          <ScrollToTop />
          <Layout>
            <Routes>
              <Route path="/"             element={<Home />}         />
              <Route path="/what-we-do"   element={<WhatWeDo />}     />
              <Route path="/about"        element={<About />}        />
              <Route path="/projects"     element={<Projects />}     />
              <Route path="/blog"         element={<Blog />}         />
              <Route path="/consultation" element={<Consultation />} />
              <Route path="/admin"        element={<Admin />}        />
            </Routes>
          </Layout>
        </HashRouter>
      </ContentProvider>
    </ThemeProvider>
  );
}
