
import React from 'react';
import { SERVICES } from '../constants';
import * as Icons from 'lucide-react';
import { CheckCircle2, Sparkles, Globe, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const serviceImages: Record<string, string> = {
  'web-design': 'https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=2670&auto=format&fit=crop',
  'web-dev': 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=2669&auto=format&fit=crop',
  'e-commerce': 'https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=2664&auto=format&fit=crop',
  'app-design': 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2670&auto=format&fit=crop',
  'domain-hosting': 'https://images.unsplash.com/photo-1558494949-ef010cbdcc48?q=80&w=2548&auto=format&fit=crop',
  'graphics': 'https://images.unsplash.com/photo-1609921212029-bb5a28e60960?q=80&w=2670&auto=format&fit=crop'
};

const Services: React.FC = () => {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop';
  };

  return (
    <div className="bg-[#F8FAFC]">
      {/* Immersive Header */}
      <section className="bg-white py-24 md:py-32 px-6 rounded-b-[64px] shadow-sm text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-50/50 rounded-full blur-[100px] -z-0"></div>
        <div className="max-w-4xl mx-auto space-y-8 relative z-10">
          <div className="inline-flex items-center px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] bg-[#1F4E79]/5 text-[#1F4E79] border border-[#1F4E79]/10">
            <Sparkles size={14} className="mr-2 text-[#34C1E5]" />
            Engineering Excellence
          </div>
          <h1 className="text-5xl md:text-8xl font-black text-slate-900 tracking-tighter leading-[0.9]">
            Our Digital <br />
            <span className="text-gradient">Core.</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
            From visionary interface design to robust architectural engineering, we deliver bespoke solutions tailored for the Dubai digital landscape.
          </p>
        </div>
      </section>

      {/* Detailed Services Sections */}
      <section className="py-24 md:py-32 max-w-7xl mx-auto px-6">
        <div className="space-y-32 md:space-y-48">
          {SERVICES.map((service, idx) => {
            const IconComponent = (Icons as any)[service.icon];
            const isEven = idx % 2 === 0;
            const imageUrl = serviceImages[service.id] || 'https://images.unsplash.com/photo-1551288049-bbbda536339a?q=80&w=2670&auto=format&fit=crop';
            
            return (
              <div key={service.id} className={`grid lg:grid-cols-2 gap-16 md:gap-24 items-center ${isEven ? '' : 'lg:flex-row-reverse'}`}>
                <div className={`space-y-10 animate-reveal ${isEven ? '' : 'lg:order-2'}`}>
                  <div className="space-y-6">
                    <div className={`w-20 h-20 rounded-[32px] flex items-center justify-center text-white shadow-2xl transform hover:rotate-6 transition-all duration-500 ${idx % 2 === 0 ? 'bg-[#1F4E79] shadow-blue-900/10' : 'bg-[#34C1E5] shadow-cyan-900/10'}`}>
                      {IconComponent && <IconComponent className="w-10 h-10" strokeWidth={1.5} />}
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter leading-none">{service.title}</h2>
                    <p className="text-xl text-slate-500 font-medium leading-relaxed">{service.description}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {service.details.map((detail, i) => (
                      <div key={i} className="flex items-center p-5 bg-white rounded-3xl border border-slate-100 shadow-sm group hover:border-[#34C1E5] transition-colors">
                        <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center mr-4 shrink-0 group-hover:bg-[#34C1E5] group-hover:text-white transition-all">
                          <CheckCircle2 size={16} strokeWidth={3} className="text-[#1F4E79] group-hover:text-white" />
                        </div>
                        <span className="text-slate-700 font-bold text-sm tracking-tight">{detail}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="pt-6">
                    <Link to="/contact" className={`inline-flex items-center px-10 py-5 text-white font-black rounded-3xl shadow-xl transition-all active:scale-95 group ${idx % 2 === 0 ? 'bg-[#1F4E79] hover:bg-[#153450]' : 'bg-slate-900 hover:bg-black'}`}>
                      Start Your Project
                      <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                    </Link>
                  </div>
                </div>
                
                <div className={`relative animate-reveal [animation-delay:200ms] ${isEven ? '' : 'lg:order-1'}`}>
                  <div className="rounded-[64px] overflow-hidden shadow-[0_50px_100px_-20px_rgba(15,23,42,0.15)] bg-white p-3 border border-slate-50 group">
                    <div className="rounded-[56px] overflow-hidden relative aspect-[4/5] lg:aspect-square">
                      <img
                        src={imageUrl}
                        alt={service.title}
                        className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
                        onError={handleImageError}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    </div>
                  </div>
                  <div className={`absolute -top-12 -right-12 w-48 h-48 rounded-full blur-[80px] opacity-30 -z-10 ${idx % 2 === 0 ? 'bg-blue-200' : 'bg-cyan-200'}`}></div>
                  <div className={`absolute -bottom-12 -left-12 w-48 h-48 rounded-full blur-[80px] opacity-30 -z-10 ${idx % 2 === 0 ? 'bg-cyan-200' : 'bg-blue-200'}`}></div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Domain Lookup Experience */}
      <section className="py-24 px-6 mb-32">
        <div className="max-w-6xl mx-auto bg-slate-900 rounded-[64px] p-10 md:p-24 text-center shadow-2xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-[#1F4E79]/50 to-transparent pointer-events-none"></div>
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px]"></div>
          
          <div className="relative z-10 space-y-10">
            <div className="inline-flex items-center px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.3em] bg-white/10 text-blue-200 backdrop-blur-md border border-white/5">
              <Globe size={14} className="mr-2" />
              Digital Identity Hub
            </div>
            <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter leading-none">Your Domain <br /><span className="text-[#34C1E5]">Starts Here.</span></h2>
            <p className="text-slate-400 font-medium text-xl max-w-2xl mx-auto leading-relaxed">
              Secure your professional UAE identity with localized .ae domains or global .com extensions today.
            </p>
            
            <div className="max-w-3xl mx-auto mt-12">
              <div className="flex flex-col md:flex-row gap-4 bg-white/5 p-3 rounded-[32px] backdrop-blur-3xl border border-white/10 shadow-2xl">
                <input
                  type="text"
                  placeholder="Enter your brand name (e.g. cloudone)"
                  className="flex-grow px-8 py-5 bg-transparent text-white placeholder-slate-500 outline-none font-black text-xl"
                />
                <button className="px-12 py-5 bg-white text-slate-900 font-black rounded-2xl hover:bg-[#34C1E5] hover:text-white transition-all active:scale-95 text-xs uppercase tracking-widest shadow-xl">
                  Check Domain
                </button>
              </div>
              <div className="flex justify-center gap-8 mt-8">
                 {['.ae', '.com', '.net', '.me'].map(ext => (
                   <span key={ext} className="text-slate-500 font-black text-xs tracking-widest uppercase">{ext}</span>
                 ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
