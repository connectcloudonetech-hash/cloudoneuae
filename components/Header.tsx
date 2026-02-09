
import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, MessageCircle, ChevronDown } from 'lucide-react';
import Logo from './Logo';
import { SERVICES } from '../constants';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsOpen(false);
    setServicesOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services', hasDropdown: true },
    { name: 'Packages', path: '/packages' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Clients', path: '/clients' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header 
      className={`sticky top-0 z-[100] transition-all duration-500 ${
        scrolled ? 'py-4' : 'py-6 md:py-8'
      }`}
    >
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-500 ${
        scrolled ? 'max-w-6xl' : ''
      }`}>
        <div className={`glass border border-white/50 rounded-[32px] md:rounded-[40px] px-6 md:px-10 h-20 md:h-24 flex justify-between items-center shadow-xl shadow-blue-900/5`}>
          <Link to="/" className="flex items-center transform active:scale-95 transition-transform shrink-0">
            <Logo className="h-9 md:h-12 w-auto" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <div 
                key={link.path} 
                className="relative group"
                onMouseEnter={() => link.hasDropdown && setServicesOpen(true)}
                onMouseLeave={() => link.hasDropdown && setServicesOpen(false)}
                ref={link.hasDropdown ? dropdownRef : null}
              >
                <Link
                  to={link.path}
                  className={`px-5 py-3 text-[11px] font-black uppercase tracking-widest rounded-2xl transition-all flex items-center gap-2 ${
                    isActive(link.path) 
                      ? 'bg-[#1F4E79] text-white shadow-lg shadow-blue-200/50' 
                      : 'text-gray-500 hover:bg-white hover:text-gray-900'
                  }`}
                >
                  {link.name}
                  {link.hasDropdown && (
                    <ChevronDown size={14} className={`transition-transform duration-300 ${servicesOpen ? 'rotate-180' : ''}`} />
                  )}
                </Link>

                {/* Desktop Dropdown */}
                {link.hasDropdown && (
                  <div className={`absolute top-full left-0 pt-4 transition-all duration-300 ${servicesOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
                    <div className="bg-white/95 backdrop-blur-3xl border border-slate-100 rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.1)] p-4 min-w-[280px]">
                      {SERVICES.map((service) => (
                        <Link
                          key={service.id}
                          to="/services"
                          className="flex items-center p-4 rounded-2xl hover:bg-slate-50 transition-colors group/item"
                        >
                          <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-[#1F4E79] group-hover/item:bg-[#1F4E79] group-hover/item:text-white transition-all mr-4">
                            <span className="text-[10px] font-black">{service.title.substring(0, 1)}</span>
                          </div>
                          <div>
                            <p className="text-sm font-black text-slate-900">{service.title}</p>
                            <p className="text-[10px] text-slate-400 font-medium line-clamp-1">{service.description}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            <a
              href="https://wa.me/971555791309"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-4 inline-flex items-center px-8 py-3.5 bg-[#25D366] text-white text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-[#20bd5c] transition-all shadow-xl shadow-green-100 active:scale-95"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              WhatsApp
            </a>
          </nav>

          {/* Tablet/Mobile Menu Trigger */}
          <div className="lg:hidden flex items-center gap-3">
             <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-4 bg-white border border-gray-100 rounded-2xl shadow-sm text-gray-900 active:scale-90 transition-all"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden fixed inset-x-4 top-28 bg-white/95 backdrop-blur-3xl rounded-[40px] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.4)] border border-white p-6 max-h-[70vh] overflow-y-auto no-scrollbar animate-reveal z-[110]">
          <div className="space-y-2">
            {navLinks.map((link) => (
              <div key={link.path}>
                <div className="flex items-center justify-between">
                  <Link
                    to={link.path}
                    onClick={() => !link.hasDropdown && setIsOpen(false)}
                    className={`flex-grow px-8 py-4 text-lg font-black rounded-[24px] transition-all ${
                      isActive(link.path) && !link.hasDropdown
                        ? 'bg-[#1F4E79] text-white shadow-xl'
                        : 'text-gray-600'
                    }`}
                  >
                    {link.name}
                  </Link>
                  {link.hasDropdown && (
                    <button 
                      onClick={() => setServicesOpen(!servicesOpen)}
                      className="p-4 text-slate-400 hover:text-slate-900 transition-colors"
                    >
                      <ChevronDown size={24} className={`transition-transform duration-300 ${servicesOpen ? 'rotate-180' : ''}`} />
                    </button>
                  )}
                </div>
                
                {link.hasDropdown && servicesOpen && (
                  <div className="mt-2 ml-4 space-y-1 border-l-2 border-slate-100 pl-4 animate-reveal">
                    {SERVICES.map((service) => (
                      <Link
                        key={service.id}
                        to="/services"
                        onClick={() => setIsOpen(false)}
                        className="block px-6 py-4 text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors"
                      >
                        {service.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          <a
            href="https://wa.me/971555791309"
            className="flex items-center justify-center w-full px-8 py-5 bg-[#25D366] text-white text-xs font-black uppercase tracking-[0.2em] rounded-3xl shadow-xl shadow-green-100 mt-8"
          >
            <MessageCircle className="w-5 h-5 mr-3" />
            Chat WhatsApp
          </a>
        </div>
      )}
    </header>
  );
};

export default Header;
