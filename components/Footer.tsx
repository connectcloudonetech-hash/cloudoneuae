
import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin } from 'lucide-react';
import Logo from './Logo';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0F172A] text-white pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-8">
            <Link to="/" className="inline-block transform hover:scale-105 transition-transform">
              <Logo className="h-14 w-auto" light />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed font-medium">
              Leading digital solutions agency in Dubai. We build innovative web and mobile experiences that drive business success across the UAE and beyond.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center hover:bg-[#34C1E5] transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center hover:bg-[#34C1E5] transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center hover:bg-[#34C1E5] transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-black mb-8 uppercase tracking-widest text-[#34C1E5]">Quick Links</h3>
            <ul className="space-y-4 text-gray-400 text-sm font-bold">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/portfolio" className="hover:text-white transition-colors">Our Portfolio</Link></li>
              <li><Link to="/clients" className="hover:text-white transition-colors">Clients</Link></li>
              <li><Link to="/packages" className="hover:text-white transition-colors">Pricing Packages</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-black mb-8 uppercase tracking-widest text-[#34C1E5]">Our Services</h3>
            <ul className="space-y-4 text-gray-400 text-sm font-bold">
              <li><Link to="/services" className="hover:text-white transition-colors">Web Designing</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Web Development</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">App Development</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Graphic Design</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Domain & Hosting</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-black mb-8 uppercase tracking-widest text-[#34C1E5]">Get in Touch</h3>
            <ul className="space-y-6 text-gray-400 text-sm font-medium">
              <li className="flex items-start">
                <div className="p-2 bg-gray-800 rounded-lg mr-4 text-[#34C1E5]">
                  <MapPin size={18} />
                </div>
                <span>Office 304 Haji Nasser Building, Al-Sabkha, Dubai, UAE</span>
              </li>
              <li className="flex items-center">
                <div className="p-2 bg-gray-800 rounded-lg mr-4 text-[#34C1E5]">
                  <Phone size={18} />
                </div>
                <span>+971 555 791 309</span>
              </li>
              <li className="flex items-center">
                <div className="p-2 bg-gray-800 rounded-lg mr-4 text-[#34C1E5]">
                  <Mail size={18} />
                </div>
                <span>info@cloudonetechnologies.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-gray-800 text-center text-gray-500 text-[10px] font-black uppercase tracking-[0.2em]">
          <p>© {new Date().getFullYear()} Cloud One Technologies Dubai. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
