
import React from 'react';
import { Mail, Phone, MapPin, MessageCircle, Send, Sparkles } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <div className="bg-[#F8FAFC]">
      {/* App Header */}
      <section className="bg-gray-900 py-20 px-6 rounded-b-[48px] text-center shadow-2xl">
        <div className="max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-blue-500/20 text-blue-300">
            <Sparkles size={14} className="mr-2" />
            Let's Talk
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-tight">Start Your Journey</h1>
          <p className="text-gray-400 font-medium">
            Ready to scale? We are here to help your brand thrive in Dubai's competitive market.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 md:gap-24 items-start">
          {/* Contact Details Column */}
          <div className="space-y-12">
            <div className="space-y-8">
              <h2 className="text-3xl font-black text-gray-900 tracking-tight">Contact Details</h2>
              <div className="space-y-8">
                {[
                  { icon: <MapPin />, title: 'Our Location', value: 'Office 304 Haji Nasser Building, Al-Sabkha, Dubai, UAE' },
                  { icon: <Mail />, title: 'Email Us', value: 'info@cloudonetechnologies.com' },
                  { icon: <Phone />, title: 'Call Us', value: '+971 555 791 309' }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start group">
                    <div className="w-14 h-14 bg-white rounded-3xl flex items-center justify-center text-blue-600 shrink-0 shadow-sm border border-gray-100 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                      {item.icon}
                    </div>
                    <div className="ml-5 pt-1">
                      <h4 className="font-black text-gray-900 text-lg leading-none mb-2">{item.title}</h4>
                      <p className="text-gray-500 font-medium">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-blue-600 rounded-[40px] p-10 text-white shadow-2xl shadow-blue-100 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-12 translate-x-12 blur-2xl"></div>
              <h3 className="text-2xl font-black mb-4 flex items-center relative z-10">
                <MessageCircle className="mr-3 w-7 h-7" />
                Quick Support?
              </h3>
              <p className="mb-10 text-blue-100 font-medium leading-relaxed relative z-10">Chat with our engineering team immediately via WhatsApp for rapid turnaround.</p>
              <a
                href="https://wa.me/971555791309"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-10 py-4 bg-white text-blue-600 font-black rounded-2xl hover:bg-gray-100 transition-all active:scale-95 shadow-xl relative z-10 uppercase tracking-widest text-xs"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>

          {/* Form Card */}
          <div className="bg-white p-8 md:p-12 rounded-[48px] shadow-2xl shadow-blue-50/50 border border-white">
            <h3 className="text-2xl font-black text-gray-900 mb-8">Send a Message</h3>
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Full Name</label>
                  <input
                    type="text"
                    required
                    className="w-full px-6 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-4 focus:ring-blue-50 outline-none transition-all font-bold"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Phone</label>
                  <input
                    type="tel"
                    required
                    className="w-full px-6 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-4 focus:ring-blue-50 outline-none transition-all font-bold"
                    placeholder="+971 5X XXX"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Email Address</label>
                <input
                  type="email"
                  required
                  className="w-full px-6 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-4 focus:ring-blue-50 outline-none transition-all font-bold"
                  placeholder="name@company.com"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Service</label>
                <select className="w-full px-6 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-4 focus:ring-blue-50 outline-none transition-all font-bold appearance-none cursor-pointer">
                  <option>Web Designing</option>
                  <option>Web Development</option>
                  <option>App Development</option>
                  <option>Branding Solutions</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Project Brief</label>
                <textarea
                  rows={4}
                  required
                  className="w-full px-6 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-4 focus:ring-blue-50 outline-none transition-all resize-none font-bold"
                  placeholder="Describe your vision..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full py-5 bg-blue-600 text-white font-black rounded-2xl shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all flex items-center justify-center group active:scale-95 uppercase tracking-widest text-sm"
              >
                Launch Request
                <Send className="ml-3 w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Map Embed - App Style Card */}
      <section className="px-6 mb-24 max-w-7xl mx-auto">
        <div className="h-[450px] w-full rounded-[48px] overflow-hidden shadow-2xl border-8 border-white">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3609.117215282928!2d55.298714311091215!3d25.266657929007466!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f4339e1e779a9%3A0xc303867c42702747!2sSabkha%2C%20Dubai!5e0!3m2!1sen!2sae!4v1716300000000!5m2!1sen!2sae"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>
    </div>
  );
};

export default Contact;
