
import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import BottomNav from './components/BottomNav';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Packages from './pages/Packages';
import PackagesUAE from './pages/PackagesUAE';
import PackagesIndia from './pages/PackagesIndia';
import Portfolio from './pages/Portfolio';
import Clients from './pages/Clients';
import Contact from './pages/Contact';
import { FirebaseProvider } from './FirebaseProvider';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  return (
    <FirebaseProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <ScrollToTop />
          <Header />
          <main className="flex-grow pb-24 md:pb-0">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/packages" element={<Packages />} />
              <Route path="/packages/uae" element={<PackagesUAE />} />
              <Route path="/packages/india" element={<PackagesIndia />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/clients" element={<Clients />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
          <BottomNav />
          <Footer />
        </div>
      </Router>
    </FirebaseProvider>
  );
};

export default App;
