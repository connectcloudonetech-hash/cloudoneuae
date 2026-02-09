
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle, Sparkles, Globe, Smartphone, Palette, Rocket, CheckCircle2, Building2 } from 'lucide-react';
import { SERVICES, PACKAGES, INITIAL_PROJECTS, CLIENTS } from '../constants';
import { Project, Client } from '../types';

const Home: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [clientsList, setClientsList] = useState<Client[]>(CLIENTS);

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
    <div className="flex flex-col gap-20 py-8 md:py-12 overflow-hidden">
      {/* Hero Section - Focused on Web Design */}
      <section className="relative max-w-7xl mx-auto px-4 w-full animate-reveal">
        <div className="bg-white rounded-[64px] p-12 md:p-32 shadow-2xl shadow-blue-900/5 relative overflow-hidden flex flex-col items-center text-center group">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-b from-blue-50 to-transparent rounded-full blur-[120px] -z-0 opacity-40"></div>
          <div className="relative z-10 space-y-12 max-w-4xl">
            <div className="inline-flex items-center px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] bg-blue-50/50 text-[#1F4E79] border border-blue-100/30 backdrop-blur-sm">
              <Sparkles size={14} className="mr-2 text-[#34C1E5]" />
              Premier Web Design Studio Dubai
            </div>
            <h1 className="text-6xl md:text-9xl font-black text-slate-900 leading-[0.9] tracking-tighter">Websites that <br /><span className="text-gradient">Win.</span></h1>
            <p className="text-xl md:text-2xl text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed px-4">We craft high-performance, visually stunning websites tailored for Dubai's most ambitious businesses and global brands.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-6 pt-4">
              <Link to="/contact" className="btn-primary px-14 py-6 text-white font-bold rounded-[32px] shadow-2xl shadow-blue-900/20 flex items-center justify-center text-lg hover:scale-[1.03] transition-transform active:scale-95">Start Your Project <ArrowRight className="ml-3 w-6 h-6" /></Link>
              <a href="https://wa.me/971555791309" target="_blank" rel="noopener noreferrer" className="px-14 py-6 bg-white text-slate-900 border border-slate-100 font-bold rounded-[32px] shadow-sm hover:shadow-xl hover:border-white transition-all flex items-center justify-center text-lg active:scale-95"><MessageCircle className="mr-3 w-6 h-6 text-[#25D366]" />WhatsApp</a>
            </div>
          </div>
          <div className="mt-28 relative w-full max-w-5xl group/hero-img">
            <div className="relative rounded-[56px] overflow-hidden shadow-[0_50px_100px_-20px_rgba(15,23,42,0.15)] border-[12px] border-white/50 backdrop-blur-md">
               <img 
                src="https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?q=80&w=2669&auto=format&fit=crop" 
                alt="Bespoke Web Design Architecture" 
                className="w-full h-auto scale-[1.01] group-hover/hero-img:scale-[1.03] transition-transform duration-1000"
                onError={(e) => handleImageError(e, 'Cloud One Web Design')}
               />
            </div>
          </div>
        </div>
      </section>

      {/* Ticker Section */}
      <section className="py-12 bg-white/50 backdrop-blur-sm border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6 overflow-hidden relative">
          <div className="flex flex-col md:flex-row items-center justify-center gap-10">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 whitespace-nowrap">Industry Recognition</span>
            <div className="flex items-center gap-12 md:gap-20 overflow-x-auto no-scrollbar scroll-smooth">
               {clientsList.slice(0, 8).map(client => (
                 <img 
                  key={client.id} 
                  src={client.logoUrl} 
                  alt={client.name} 
                  className="h-8 md:h-10 opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-pointer shrink-0"
                  onError={(e) => handleImageError(e, client.name)}
                 />
               ))}
            </div>
          </div>
        </div>
      </section>

      {/* Client Ecosystem Section */}
      <section className="max-w-7xl mx-auto px-4 w-full py-12">
        <div className="bg-white rounded-[64px] p-12 md:p-24 shadow-sm border border-slate-50 relative overflow-hidden">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-20 gap-10">
            <div className="max-w-2xl space-y-6">
              <div className="inline-flex items-center px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] bg-blue-50 text-[#1F4E79] border border-blue-100/50"><Building2 size={14} className="mr-2" /> Trusted Partners</div>
              <h2 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter leading-[0.9]">Our Client <br /><span className="text-gradient">Ecosystem.</span></h2>
              <p className="text-slate-500 font-medium text-xl leading-relaxed">Empowering industry leaders across the UAE with future-ready digital platforms and bespoke software.</p>
            </div>
            <Link to="/clients" className="group inline-flex items-center gap-4 text-slate-900 font-black text-xs uppercase tracking-[0.2em] hover:text-[#1F4E79] transition-colors bg-slate-50 px-8 py-4 rounded-2xl">Success Stories <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" /></Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {clientsList.slice(0, 8).map((client) => (
              <div key={client.id} className="bg-slate-50/50 p-8 rounded-[32px] border border-slate-100 flex items-center justify-center group hover:bg-white hover:shadow-2xl hover:shadow-blue-900/5 hover:-translate-y-2 transition-all duration-500 h-24 md:h-36">
                <img 
                  src={client.logoUrl} 
                  alt={client.name} 
                  className="max-h-[60%] max-w-[80%] grayscale group-hover:grayscale-0 opacity-30 group-hover:opacity-100 transition-all duration-700"
                  onError={(e) => handleImageError(e, client.name)}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise Segment */}
      <section className="max-w-7xl mx-auto px-4 w-full py-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8 px-6">
          <div className="max-w-2xl space-y-6">
            <div className="w-12 h-1 bg-[#34C1E5] rounded-full"></div>
            <h2 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight leading-none">Engineering <br />Stack.</h2>
            <p className="text-slate-500 font-medium text-xl leading-relaxed">Modern technologies handled with artisan care.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 px-4">
          {SERVICES.slice(0, 3).map((service, idx) => (
            <div key={service.id} className="app-card p-12 group flex flex-col justify-between h-[480px] hover:bg-slate-50/30">
               <div className="space-y-8 relative z-10">
                  <div className={`w-20 h-20 rounded-[30px] flex items-center justify-center mb-12 shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 ${idx === 0 ? 'bg-[#1F4E79] text-white' : idx === 1 ? 'bg-[#34C1E5] text-white' : 'bg-slate-900 text-white'}`}>
                    {idx === 0 ? <Globe size={36} /> : idx === 1 ? <Smartphone size={36} /> : <Palette size={36} />}
                  </div>
                  <h3 className="text-4xl font-black text-slate-900 leading-tight">{service.title}</h3>
                  <p className="text-slate-500 font-medium text-lg leading-relaxed">{service.description}</p>
               </div>
               <div className="pt-10 border-t border-slate-100 flex items-center text-[#1F4E79] font-black uppercase tracking-[0.2em] text-[10px]">Explore expertise <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform" /></div>
            </div>
          ))}
        </div>
      </section>

      {/* Portfolio Preview */}
      <section className="max-w-7xl mx-auto px-4 w-full py-12">
        <div className="text-center mb-20 space-y-6">
          <h2 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter">Selected Works.</h2>
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
      <section className="max-w-7xl mx-auto px-4 w-full py-12 mb-20">
        <div className="text-center mb-20 space-y-6">
           <h2 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter">Packages.</h2>
           <p className="text-slate-500 font-medium text-xl">Transparent investments for peak performance.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
           {PACKAGES.map((pkg) => (
             <div key={pkg.id} className={`p-14 rounded-[56px] flex flex-col transition-all duration-500 group ${pkg.recommended ? 'bg-slate-900 text-white shadow-2xl shadow-blue-900/40 scale-105' : 'bg-white border border-slate-100 shadow-sm hover:shadow-2xl'}`}>
                {pkg.recommended && <div className="inline-flex mb-10 px-5 py-2 bg-[#34C1E5] text-white rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-lg self-start">Premium Tier</div>}
                <h3 className={`text-3xl font-black mb-10 ${pkg.recommended ? 'text-white' : 'text-slate-900'}`}>{pkg.name}</h3>
                <div className="flex items-baseline gap-2 mb-12"><span className="text-2xl font-black opacity-30">AED</span><span className={`text-7xl font-black tracking-tighter ${pkg.recommended ? 'text-[#34C1E5]' : 'text-[#1F4E79]'}`}>{pkg.price}</span></div>
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
      </section>
    </div>
  );
};

export default Home;
