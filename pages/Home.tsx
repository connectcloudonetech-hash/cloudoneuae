
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, MessageCircle, Sparkles, Globe, Smartphone, Palette, Rocket, CheckCircle2, Building2, Send, CheckCircle, AlertCircle, Server, Mail, Lock, Headphones, Layout, Code, ShoppingCart, ShieldCheck } from 'lucide-react';
import { SERVICES, PACKAGES, INITIAL_PROJECTS, CLIENTS, TESTIMONIALS, FAQS } from '../constants';
import { Project, Client } from '../types';
import { Quote, Plus, Minus, HelpCircle } from 'lucide-react';

import HeroSlider from '../components/HeroSlider';

const Home: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [clientsList, setClientsList] = useState<Client[]>(CLIENTS);
  const [openFaq, setOpenFaq] = useState<number | null>(1);
  
  // Contact Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Web Designing',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const [region, setRegion] = useState<'UAE' | 'India'>('UAE');

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch('https://formsubmit.co/ajax/connectcloudonetech@gmail.com', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', phone: '', service: 'Web Designing', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (err) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  useEffect(() => {
    const savedProjects = localStorage.getItem('cloudone_portfolio');
    if (savedProjects) setProjects(JSON.parse(savedProjects));

    const savedClients = localStorage.getItem('cloudone_clients');
    if (savedClients) setClientsList(JSON.parse(savedClients));
  }, []);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>, text: string = 'Partner') => {
    e.currentTarget.src = `https://placehold.co/400x400/F1F5F9/1F4E79?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="flex flex-col gap-20 md:gap-32 pb-12 md:pb-20 overflow-hidden">
      {/* Hero Section - Modern Slider */}
      <HeroSlider />

      {/* Who We Are Section */}
      <section className="max-w-7xl mx-auto px-4 w-full">
        <div className="bg-white rounded-[64px] p-12 md:p-24 shadow-sm border border-slate-50 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50/50 blur-[100px] -z-10 rounded-full"></div>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] bg-blue-50 text-[#1F4E79] border border-blue-100/50">
                <Building2 size={14} className="mr-2" />
                Who We Are
              </div>
              <h3 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter leading-tight">
                Building Brands, <br />
                <span className="text-gradient">Growing Together</span>
              </h3>
              <p className="text-slate-500 font-medium text-xl leading-relaxed">
                Cloud One Technologies is a premier digital agency in Dubai, dedicated to transforming businesses through innovative web design, robust development, and strategic digital solutions.
              </p>
              <div className="grid grid-cols-2 gap-8 pt-4">
                <div className="space-y-2">
                  <h4 className="text-3xl font-black text-[#1F4E79]">100+</h4>
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Projects Delivered</p>
                </div>
                <div className="space-y-2">
                  <h4 className="text-3xl font-black text-[#34C1E5]">50+</h4>
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Global Clients</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-[48px] overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop" 
                  alt="Cloud One Technologies Team" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-slate-900 p-8 rounded-[32px] shadow-2xl text-white hidden md:block">
                <p className="text-sm font-bold italic">"We don't just build websites; we build digital legacies."</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="max-w-7xl mx-auto px-4 w-full">
        <div className="bg-slate-50/50 rounded-[64px] p-12 md:p-24">
          <div className="text-center mb-20 space-y-6">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] bg-blue-50 text-[#1F4E79] border border-blue-100/50">
              <Rocket size={14} className="mr-2" />
              What We Do
            </div>
            <h3 className="text-2xl sm:text-3xl md:text-5xl font-black text-slate-900 tracking-tighter pb-4">Create Outstanding <br /> <span className="text-gradient">Web Design Solutions </span></h3>
            <p className="text-slate-500 font-medium text-xl max-w-2xl mx-auto">From concept to execution, we provide end-to-end digital solutions tailored for the Dubai market.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
          {SERVICES.map((service, idx) => {
            const IconComponent = () => {
              switch (service.icon) {
                case 'Layout': return <Layout size={32} />;
                case 'Code': return <Code size={32} />;
                case 'Smartphone': return <Smartphone size={32} />;
                case 'Globe': return <Globe size={32} />;
                case 'Palette': return <Palette size={32} />;
                case 'ShoppingCart': return <ShoppingCart size={32} />;
                default: return <Sparkles size={32} />;
              }
            };

            return (
              <div key={service.id} className="bg-white p-10 rounded-[40px] shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-500 group">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 ${
                  idx % 3 === 0 ? 'bg-[#1F4E79] text-white' : 
                  idx % 3 === 1 ? 'bg-[#34C1E5] text-white' : 
                  'bg-slate-900 text-white'
                }`}>
                  <IconComponent />
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-4 leading-tight">{service.title}</h3>
                <p className="text-slate-500 font-medium leading-relaxed mb-6">{service.description}</p>
                <ul className="space-y-2">
                  {service.details.map((detail, i) => (
                    <li key={i} className="flex items-center text-xs font-bold text-slate-400">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mr-2"></div>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>

      {/* Portfolio Preview */}
      <section className="max-w-7xl mx-auto px-4 w-full">
        <div className="text-center mb-20 space-y-6">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] bg-blue-50 text-[#1F4E79] border border-blue-100/50">
            <Sparkles size={14} className="mr-2" />
            Portfolio
          </div>
              <h3 className="text-2xl sm:text-3xl md:text-5xl font-black text-slate-900 tracking-tighter leading-[1.1] pb-4">
                Discover Our<br />
                <span className="text-gradient">Web-Design Creations</span>
              </h3>
             <p className="text-slate-500 font-medium text-xl">Crafting digital experiences that matter.</p>

        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 px-4">
          {projects.slice(0, 3).map((project) => (
            <Link to="/portfolio" key={project.id} className="app-card overflow-hidden group">
              <div className="aspect-[4/3] overflow-hidden">
                <img 
                  src={project.imageUrl} 
                  alt={project.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  onError={(e) => handleImageError(e, 'Project')}
                />
              </div>
              <div className="p-10">
                <span className="text-[10px] font-black text-[#34C1E5] uppercase tracking-widest">{project.category}</span>
                <h3 className="text-2xl font-black text-slate-900 mt-2">{project.title}</h3>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-16">
          <Link to="/portfolio" className="inline-flex items-center text-[#1F4E79] font-black uppercase tracking-widest hover:text-[#34C1E5] transition-colors">
            View All Work <ArrowRight className="ml-3 w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Pricing Packages */}
      <section className="max-w-7xl mx-auto px-4 w-full">
        <div className="text-center mb-12 space-y-6">
           <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-slate-900 tracking-tighter text-gradient pb-2">We give you best Price Package</h2>
           <p className="text-slate-500 font-medium text-xl">Transparent investments for peak performance and high-quality Website Development Dubai.</p>
        </div>

        {/* Region Toggle */}
        <div className="flex flex-col items-center mb-16">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4">Select Your Region</span>
          <div className="bg-white p-1.5 rounded-2xl shadow-sm border border-slate-100 flex gap-2">
            <button
              onClick={() => setRegion('UAE')}
              className={`px-8 py-3 rounded-xl text-sm font-black transition-all flex items-center gap-2 ${
                region === 'UAE' ? 'bg-[#1F4E79] text-white shadow-lg shadow-blue-900/10' : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              <Globe size={16} />
              UAE (AED)
            </button>
            <button
              onClick={() => setRegion('India')}
              className={`px-8 py-3 rounded-xl text-sm font-black transition-all flex items-center gap-2 ${
                region === 'India' ? 'bg-[#1F4E79] text-white shadow-lg shadow-blue-900/10' : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              <Globe size={16} />
              INDIA (INR)
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
           {PACKAGES.map((pkg) => (
             <div key={pkg.id} className={`p-14 rounded-[56px] flex flex-col transition-all duration-500 group ${pkg.recommended ? 'bg-slate-900 text-white shadow-2xl shadow-blue-900/40 scale-105' : 'bg-white border border-slate-100 shadow-sm hover:shadow-2xl'}`}>
                {pkg.recommended && <div className="inline-flex mb-10 px-5 py-2 bg-[#34C1E5] text-white rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-lg self-start">Premium Tier</div>}
                <h3 className={`text-3xl font-black mb-10 ${pkg.recommended ? 'text-white' : 'text-slate-900'}`}>{pkg.name}</h3>
                <div className="flex items-baseline gap-2 mb-12">
                  <span className="text-2xl font-black opacity-30">{region === 'UAE' ? 'AED' : '₹'}</span>
                  <span className={`text-7xl font-black tracking-tighter ${pkg.recommended ? 'text-[#34C1E5]' : 'text-[#1F4E79]'}`}>
                    {region === 'UAE' ? pkg.priceUAE : pkg.priceIndia}
                  </span>
                </div>
                <div className="space-y-6 flex-grow mb-14">
                   {pkg.features.map((f, i) => (
                     <div key={i} className={`flex items-center gap-4 font-semibold text-base ${pkg.recommended ? 'text-slate-300' : 'text-slate-500'}`}>
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${pkg.recommended ? 'bg-[#34C1E5]/20 text-[#34C1E5]' : 'bg-blue-50 text-blue-600'}`}><CheckCircle2 size={14} strokeWidth={3} /></div>{f}
                     </div>
                   ))}
                </div>
                <Link to="/contact" className={`py-6 rounded-[32px] font-black text-xs uppercase tracking-[0.25em] text-center transition-all shadow-xl active:scale-95 ${pkg.recommended ? 'bg-white text-slate-900 hover:bg-slate-50' : 'bg-slate-900 text-white hover:bg-slate-800'}`}>Get Started</Link>
             </div>
           ))}
        </div>

        {/* Included in Every Plan */}
        <div className="mt-24 bg-slate-50/50 rounded-[48px] p-12 md:p-20 border border-slate-100">
          <div className="text-center mb-16 space-y-2">
            <h2 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tight">Included in Every Plan</h2>
            <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em]">Standard quality benchmarks</p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-8 md:gap-12">
            <div className="space-y-4 text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl text-[#1F4E79] shadow-sm group-hover:bg-[#1F4E79] group-hover:text-white transition-all duration-500 border border-slate-100">
                <Globe size={28} />
              </div>
              <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Free Domain</h4>
            </div>
            <div className="space-y-4 text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl text-[#34C1E5] shadow-sm group-hover:bg-[#34C1E5] group-hover:text-white transition-all duration-500 border border-slate-100">
                <Server size={28} />
              </div>
              <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Free Hosting</h4>
            </div>
            <div className="space-y-4 text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl text-purple-600 shadow-sm group-hover:bg-purple-600 group-hover:text-white transition-all duration-500 border border-slate-100">
                <Mail size={28} />
              </div>
              <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Free Email</h4>
            </div>
            <div className="space-y-4 text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl text-green-600 shadow-sm group-hover:bg-green-600 group-hover:text-white transition-all duration-500 border border-slate-100">
                <MessageCircle size={28} />
              </div>
              <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-widest">WhatsApp Integration</h4>
            </div>
            <div className="space-y-4 text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl text-orange-600 shadow-sm group-hover:bg-orange-600 group-hover:text-white transition-all duration-500 border border-slate-100">
                <Smartphone size={28} />
              </div>
              <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Mobile Responsive</h4>
            </div>
            <div className="space-y-4 text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl text-indigo-600 shadow-sm group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500 border border-slate-100">
                <Lock size={28} />
              </div>
              <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Free SSL</h4>
            </div>
            <div className="space-y-4 text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl text-rose-600 shadow-sm group-hover:bg-rose-600 group-hover:text-white transition-all duration-500 border border-slate-100">
                <Headphones size={28} />
              </div>
              <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Support</h4>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="max-w-7xl mx-auto px-4 w-full">
        <div className="bg-slate-900 rounded-[64px] p-12 md:p-24 shadow-2xl shadow-blue-900/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] -z-0"></div>
          <div className="grid lg:grid-cols-2 gap-20 relative z-10">
            <div className="space-y-10">
              <div className="inline-flex items-center px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] bg-blue-500/20 text-blue-300 border border-blue-500/30">
                <MessageCircle size={14} className="mr-2" />
                Get in Touch
              </div>
              <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-tight">Mobile App <br /><span className="text-[#34C1E5]">Development UAE.</span></h2>
              <p className="text-slate-400 font-medium text-xl leading-relaxed max-w-md">
                Contact the Best Web Design Company UAE for your next digital venture. We specialize in Website Development Dubai and custom software solutions.
              </p>
              <div className="space-y-6 pt-10">
                <div className="flex items-center gap-6 group cursor-pointer">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:bg-[#34C1E5] group-hover:text-slate-900 transition-all">
                    <Sparkles size={24} />
                  </div>
                  <div>
                    <h4 className="text-white font-black uppercase tracking-widest text-xs">Fast Turnaround</h4>
                    <p className="text-slate-500 text-sm">Initial concept in 48 hours</p>
                  </div>
                </div>
                <div className="flex items-center gap-6 group cursor-pointer">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:bg-[#34C1E5] group-hover:text-slate-900 transition-all">
                    <Rocket size={24} />
                  </div>
                  <div>
                    <h4 className="text-white font-black uppercase tracking-widest text-xs">Dubai Based</h4>
                    <p className="text-slate-500 text-sm">Local expertise, global standards</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-md p-8 md:p-12 rounded-[48px] border border-white/10">
              {submitStatus === 'success' ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-6 animate-reveal">
                  <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center text-white shadow-2xl shadow-emerald-500/20">
                    <CheckCircle size={40} />
                  </div>
                  <h3 className="text-3xl font-black text-white">Inquiry Sent!</h3>
                  <p className="text-slate-400 font-medium">We've received your request and will contact you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleContactChange}
                      placeholder="Full Name"
                      className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:bg-white/10 focus:border-[#34C1E5] outline-none transition-all font-bold"
                    />
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleContactChange}
                      placeholder="Phone Number"
                      className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:bg-white/10 focus:border-[#34C1E5] outline-none transition-all font-bold"
                    />
                  </div>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleContactChange}
                    placeholder="Email Address"
                    className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:bg-white/10 focus:border-[#34C1E5] outline-none transition-all font-bold"
                  />
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleContactChange}
                    className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white focus:bg-white/10 focus:border-[#34C1E5] outline-none transition-all font-bold appearance-none cursor-pointer"
                  >
                    <option className="bg-slate-900">Web Designing</option>
                    <option className="bg-slate-900">Web Development</option>
                    <option className="bg-slate-900">App Development</option>
                    <option className="bg-slate-900">Branding Solutions</option>
                  </select>
                  <textarea
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleContactChange}
                    rows={4}
                    placeholder="Tell us about your project..."
                    className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:bg-white/10 focus:border-[#34C1E5] outline-none transition-all resize-none font-bold"
                  ></textarea>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-5 bg-[#34C1E5] text-slate-900 font-black rounded-2xl shadow-xl shadow-blue-500/20 hover:bg-white transition-all flex items-center justify-center group active:scale-95 uppercase tracking-widest text-sm disabled:opacity-50"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Inquiry'}
                    {!isSubmitting && <Send className="ml-3 w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                  </button>
                  {submitStatus === 'error' && (
                    <p className="text-red-400 text-xs font-bold text-center flex items-center justify-center gap-2">
                      <AlertCircle size={14} /> Failed to send. Please try again.
                    </p>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Technologies We Use Section */}
      <section className="max-w-7xl mx-auto px-4 w-full">
        <div className="bg-white rounded-[64px] p-12 md:p-24 shadow-sm border border-slate-50 relative overflow-hidden text-center">
          <div className="space-y-6 mb-16">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] bg-blue-50 text-[#1F4E79] border border-blue-100/50">
              <Rocket size={14} className="mr-2" />
              Our Tech Stack
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter leading-tight">Technologies <br /><span className="text-gradient">We Use.</span></h2>
            <p className="text-slate-500 font-medium text-xl max-w-2xl mx-auto">We leverage the most advanced technologies to build scalable, high-performance digital solutions.</p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-8 items-center justify-center">
            {[
              { name: 'PHP Development', logo: 'https://cdn.simpleicons.org/php/777BB4' },
              { name: '.Net Development', logo: 'https://cdn.simpleicons.org/dotnet/512BD4' },
              { name: 'Angular Js', logo: 'https://cdn.simpleicons.org/angular/DD0031' },
              { name: 'HTML5', logo: 'https://cdn.simpleicons.org/html5/E34F26' },
              { name: 'iOS', logo: 'https://cdn.simpleicons.org/ios/000000' },
              { name: 'Android', logo: 'https://cdn.simpleicons.org/android/3DDC84' },
              { name: 'React Native', logo: 'https://cdn.simpleicons.org/react/61DAFB' }
            ].map((tech, i) => (
              <div key={i} className="flex flex-col items-center gap-4 group">
                <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center p-5 group-hover:bg-white group-hover:shadow-xl transition-all duration-500 border border-transparent group-hover:border-slate-100">
                  <img 
                    src={tech.logo} 
                    alt={tech.name} 
                    className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-slate-900 transition-colors">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Clients Section */}
      <section className="max-w-7xl mx-auto px-4 w-full">
        <div className="bg-slate-50/50 rounded-[64px] p-12 md:p-24 shadow-sm border border-slate-50 relative overflow-hidden text-center">
          <div className="space-y-6 mb-16">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] bg-blue-50 text-[#1F4E79] border border-blue-100/50">
              <Building2 size={14} className="mr-2" />
              Our Partners
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter leading-tight">Trusted by <br /><span className="text-gradient">Global Brands.</span></h2>
            <p className="text-slate-500 font-medium text-xl max-w-2xl mx-auto">We've partnered with industry leaders across the UAE and beyond to deliver exceptional digital experiences.</p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 items-center justify-center">
            {clientsList.map((client) => (
              <div key={client.id} className="flex flex-col items-center gap-4 group">
                <div className="w-full aspect-video bg-white rounded-3xl flex items-center justify-center p-8 group-hover:shadow-xl transition-all duration-500 border border-slate-100 group-hover:border-white">
                  <img 
                    src={client.logoUrl} 
                    alt={client.name} 
                    className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-500"
                    onError={(e) => handleImageError(e, client.name)}
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="text-center">
                  <h4 className="text-sm font-black text-slate-900">{client.name}</h4>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{client.industry}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="max-w-7xl mx-auto px-4 w-full">
        <div className="bg-white rounded-[64px] p-12 md:p-24 shadow-sm border border-slate-50 relative overflow-hidden text-center">
          <div className="space-y-6 mb-16">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] bg-blue-50 text-[#1F4E79] border border-blue-100/50">
              <Quote size={14} className="mr-2" />
              Testimonials
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter leading-tight">What Our <br /><span className="text-gradient">Clients Say.</span></h2>
            <p className="text-slate-500 font-medium text-xl max-w-2xl mx-auto">Don't just take our word for it. Here's what some of our valued partners have to say about working with Cloud One Technologies.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((testimonial) => (
              <div key={testimonial.id} className="bg-slate-50/50 p-10 rounded-[40px] border border-slate-100 text-left flex flex-col justify-between group hover:bg-white hover:shadow-xl transition-all duration-500">
                <div className="space-y-6">
                  <div className="w-12 h-12 bg-[#1F4E79] rounded-2xl flex items-center justify-center text-white">
                    <Quote size={24} />
                  </div>
                  <p className="text-slate-600 font-medium leading-relaxed italic">"{testimonial.content}"</p>
                </div>
                <div className="mt-10 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-md">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-slate-900">{testimonial.name}</h4>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-7xl mx-auto px-4 w-full">
        <div className="bg-slate-50/50 rounded-[64px] p-12 md:p-24 shadow-sm border border-slate-50 relative overflow-hidden">
          <div className="text-center mb-20 space-y-6">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] bg-blue-50 text-[#1F4E79] border border-blue-100/50">
              <HelpCircle size={14} className="mr-2" />
              FAQ
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter leading-tight">Frequently Asked <br /><span className="text-gradient">Questions.</span></h2>
            <p className="text-slate-500 font-medium text-xl max-w-2xl mx-auto">Find answers to common questions about our web design and development services in Dubai.</p>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-4">
            {FAQS.map((faq) => (
              <div 
                key={faq.id} 
                className={`bg-white rounded-[32px] border transition-all duration-500 overflow-hidden ${
                  openFaq === faq.id ? 'border-[#1F4E79] shadow-xl shadow-blue-900/5' : 'border-slate-100 hover:border-slate-200'
                }`}
              >
                <button 
                  onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                  className="w-full p-8 flex items-center justify-between text-left"
                >
                  <span className={`text-lg font-black tracking-tight transition-colors ${openFaq === faq.id ? 'text-[#1F4E79]' : 'text-slate-900'}`}>{faq.question}</span>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500 ${openFaq === faq.id ? 'bg-[#1F4E79] text-white rotate-180' : 'bg-slate-50 text-slate-400'}`}>
                    {openFaq === faq.id ? <Minus size={20} /> : <Plus size={20} />}
                  </div>
                </button>
                <motion.div 
                  initial={false}
                  animate={{ height: openFaq === faq.id ? 'auto' : 0, opacity: openFaq === faq.id ? 1 : 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="px-8"
                >
                  <div className="pb-8 text-slate-500 font-medium leading-relaxed">
                    {faq.answer}
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
