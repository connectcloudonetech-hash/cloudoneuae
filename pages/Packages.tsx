
import React from 'react';
import { PACKAGES } from '../constants';
import { CheckCircle2, ShieldCheck, Zap, Headphones, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const Packages: React.FC = () => {
  return (
    <div className="bg-[#F8FAFC] min-h-screen py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
           <div className="inline-flex items-center px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-purple-100 text-purple-700">
            <Sparkles size={14} className="mr-2" />
            Pricing Plans
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tight leading-tight">Simple Pricing</h1>
          <p className="text-gray-500 font-medium leading-relaxed">
            Choose the best fit for your goals. All plans include premium UI design and mobile optimization.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-24">
          {PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              className={`relative app-card p-10 bg-white flex flex-col transition-all duration-500 ${
                pkg.recommended ? 'ring-4 ring-blue-600 shadow-2xl scale-105 z-10' : 'border border-gray-100 shadow-sm hover:shadow-xl'
              }`}
            >
              {pkg.recommended && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-xl">
                  Most Popular
                </div>
              )}
              <h3 className="text-2xl font-black text-gray-900 mb-1">{pkg.name}</h3>
              <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-8">One-time payment</p>
              
              <div className="mb-10 flex items-baseline gap-2">
                <span className="text-lg font-black text-gray-300">AED</span>
                <span className="text-6xl font-black text-gray-900 tracking-tighter">{pkg.price}</span>
              </div>

              <div className="flex-grow space-y-4 mb-10">
                {pkg.features.map((feature, i) => (
                  <div key={i} className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center mr-4 shrink-0">
                       <CheckCircle2 size={12} className="text-blue-600" strokeWidth={3} />
                    </div>
                    <span className="text-gray-600 font-medium text-sm leading-tight">{feature}</span>
                  </div>
                ))}
              </div>

              <Link to="/contact" className={`w-full py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all text-center active:scale-95 ${
                pkg.recommended ? 'bg-blue-600 text-white shadow-xl shadow-blue-100 hover:bg-blue-700' : 'bg-gray-50 text-gray-900 hover:bg-gray-100'
              }`}>
                Get Started
              </Link>
            </div>
          ))}
        </div>

        {/* Benefits Section - App Card Style */}
        <div className="bg-white rounded-[48px] p-12 md:p-20 shadow-sm border border-gray-50">
          <div className="text-center mb-16 space-y-2">
            <h2 className="text-2xl md:text-4xl font-black text-gray-900 tracking-tight">Included in Every Plan</h2>
            <p className="text-gray-400 text-xs font-black uppercase tracking-widest">Standard quality benchmarks</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-16">
            <div className="space-y-6 text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-50 rounded-[32px] text-blue-600">
                <ShieldCheck size={36} />
              </div>
              <h4 className="text-xl font-black text-gray-900">Secure Hosting</h4>
              <p className="text-gray-500 font-medium text-sm leading-relaxed">Free SSL certificates and enterprise-grade security protocols.</p>
            </div>
            <div className="space-y-6 text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-teal-50 rounded-[32px] text-teal-600">
                <Zap size={36} />
              </div>
              <h4 className="text-xl font-black text-gray-900">Fast Performance</h4>
              <p className="text-gray-500 font-medium text-sm leading-relaxed">Highly optimized pages for seamless user experience and SEO.</p>
            </div>
            <div className="space-y-6 text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-purple-50 rounded-[32px] text-purple-600">
                <Headphones size={36} />
              </div>
              <h4 className="text-xl font-black text-gray-900">Priority Support</h4>
              <p className="text-gray-500 font-medium text-sm leading-relaxed">Direct access to our tech team for maintenance and updates.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Packages;
