
import React from 'react';
import { Target, Lightbulb, Users, CheckCircle2, HeartHandshake, Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
  return (
    <div className="bg-[#FDFDFE] min-h-screen py-10">
      {/* Immersive Header */}
      <section className="bg-white rounded-[64px] pt-20 pb-32 px-6 shadow-sm border border-slate-50 max-w-7xl mx-auto text-center relative overflow-hidden animate-reveal">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-blue-50/20 to-transparent pointer-events-none"></div>
        <div className="relative z-10 space-y-8 max-w-4xl mx-auto">
          <div className="inline-flex items-center px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] bg-blue-50 text-[#1F4E79] border border-blue-100/50">
            <Sparkles size={14} className="mr-2" />
            Our Legacy
          </div>
          <h1 className="text-6xl md:text-9xl font-black text-slate-900 tracking-tighter leading-[0.9]">
            Cloud One <br />
            <span className="text-gradient">Originals.</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
            Dubai's premier boutique agency dedicated to digital precision and client-centric innovation.
          </p>
        </div>
      </section>

      {/* Story Segment - Dual Layer */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="relative group animate-reveal">
            <div className="rounded-[64px] overflow-hidden shadow-[0_50px_100px_-20px_rgba(15,23,42,0.15)] bg-slate-100">
              <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2671&auto=format&fit=crop" className="w-full object-cover aspect-[4/5] group-hover:scale-105 transition-transform duration-[2s]" alt="Team Dynamics" />
            </div>
            <div className="absolute -bottom-10 -right-6 bg-slate-900 p-12 rounded-[48px] text-white shadow-2xl border-8 border-white hidden md:block">
              <span className="text-6xl font-black block mb-2 leading-none">5+</span>
              <span className="text-[11px] uppercase tracking-[0.3em] font-black opacity-60">Years Excellence</span>
            </div>
          </div>
          
          <div className="space-y-12 animate-reveal [animation-delay:200ms]">
            <h2 className="text-5xl md:text-7xl font-black text-slate-900 leading-[0.95] tracking-tighter">
              Crafting for <br />
              <span className="text-gradient">High Impact.</span>
            </h2>
            <div className="space-y-8">
              <p className="text-xl text-slate-500 font-medium leading-relaxed">
                Cloud One Technologies Dubai isn't just an agency—we are a strategic extension of your brand. Based in the heart of Dubai, we bridge the gap between complex engineering and elegant user interfaces.
              </p>
              <p className="text-xl text-slate-500 font-medium leading-relaxed">
                Our approach is rooted in transparency and performance. We don't just build websites; we engineer business growth drivers.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
              <div className="p-10 bg-white rounded-[40px] border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
                <div className="w-16 h-16 bg-blue-50 rounded-[24px] flex items-center justify-center text-[#1F4E79] mb-8 group-hover:scale-110 transition-transform">
                   <Target size={32} />
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-3 tracking-tight">Our Vision</h3>
                <p className="text-sm text-slate-400 font-bold uppercase tracking-widest leading-relaxed">Leading the UAE's digital shift.</p>
              </div>
              <div className="p-10 bg-white rounded-[40px] border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
                <div className="w-16 h-16 bg-teal-50 rounded-[24px] flex items-center justify-center text-teal-600 mb-8 group-hover:scale-110 transition-transform">
                   <Users size={32} />
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-3 tracking-tight">Artisan Team</h3>
                <p className="text-sm text-slate-400 font-bold uppercase tracking-widest leading-relaxed">Passion in every pixel.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values - Gallery Style */}
      <section className="py-32 bg-slate-900 rounded-[80px] mt-20">
        <div className="max-w-7xl mx-auto px-10">
          <div className="text-center mb-24 space-y-6">
            <h2 className="text-5xl md:text-7xl font-black text-white tracking-tight">Core Values.</h2>
            <p className="text-slate-400 text-lg font-black uppercase tracking-[0.3em]">The foundation of our craft</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: 'Pure Quality', desc: 'Zero compromise on the integrity of our code and design systems.', icon: <CheckCircle2 size={40} /> },
              { title: 'Client First', desc: 'Your operational success is the only metric we truly track.', icon: <HeartHandshake size={40} /> },
              { title: 'Next Tech', desc: 'We build for today using tomorrow\'s most reliable frameworks.', icon: <Lightbulb size={40} /> }
            ].map((value, idx) => (
              <div key={idx} className="bg-white/5 backdrop-blur-md p-14 rounded-[56px] text-center border border-white/10 hover:bg-white/10 transition-all duration-500 group">
                <div className={`inline-flex items-center justify-center w-24 h-24 rounded-[32px] mb-10 transition-all duration-700 group-hover:scale-110 group-hover:rotate-6 ${idx === 0 ? 'bg-[#34C1E5]/20 text-[#34C1E5]' : idx === 1 ? 'bg-blue-500/20 text-blue-400' : 'bg-white/10 text-white'}`}>
                  {value.icon}
                </div>
                <h3 className="text-3xl font-black text-white mb-6 tracking-tight">{value.title}</h3>
                <p className="text-slate-400 text-lg font-medium leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Final CTA */}
      <section className="py-32 max-w-5xl mx-auto px-6 text-center">
         <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-10 tracking-tight leading-tight">Ready to collaborate <br /> with the best?</h2>
         <Link to="/contact" className="btn-primary px-16 py-6 text-white font-black rounded-full shadow-2xl shadow-blue-900/20 inline-flex items-center gap-4 text-lg hover:scale-105 transition-transform active:scale-95">
            Let's Start <ArrowRight />
         </Link>
      </section>
    </div>
  );
};

export default About;
