
import React, { useState } from 'react';
import { Mail, Phone, MapPin, MessageCircle, Send, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Web Design',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

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
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: 'Web Design',
          message: ''
        });
      } else {
        setSubmitStatus('error');
        setErrorMessage('Failed to send message. Please try again later.');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitStatus('error');
      setErrorMessage('Failed to send message. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#F8FAFC]">
      {/* App Header */}
      <section className="bg-gray-900 py-20 px-6 rounded-b-[48px] text-center shadow-2xl">
        <div className="max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-blue-500/20 text-blue-300">
            <Sparkles size={14} className="mr-2" />
            Let's Talk
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-tight">Best Web Design Company UAE</h1>
          <p className="text-gray-400 font-medium">
            Ready for expert Website Development Dubai or Mobile App Development UAE? We are here to help your brand thrive.
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
                  { icon: <Mail />, title: 'Email Us', value: 'info@cloudonetechuae.com' },
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
            
            {submitStatus === 'success' ? (
              <div className="bg-emerald-50 border border-emerald-100 rounded-[32px] p-8 text-center space-y-4 animate-reveal">
                <div className="w-16 h-16 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto shadow-lg shadow-emerald-100">
                  <CheckCircle2 size={32} />
                </div>
                <h4 className="text-xl font-black text-emerald-900">Message Sent!</h4>
                <p className="text-emerald-700 font-medium">Thank you for reaching out. Our team will get back to you within 24 hours.</p>
                <button 
                  onClick={() => setSubmitStatus('idle')}
                  className="mt-4 px-8 py-3 bg-emerald-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-700 transition-all"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {submitStatus === 'error' && (
                  <div className="bg-red-50 border border-red-100 rounded-2xl p-4 flex items-center text-red-700 space-x-3 animate-reveal">
                    <AlertCircle size={20} className="shrink-0" />
                    <p className="text-xs font-bold">{errorMessage}</p>
                  </div>
                )}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-6 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-4 focus:ring-blue-50 outline-none transition-all font-bold"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
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
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-6 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-4 focus:ring-blue-50 outline-none transition-all font-bold"
                    placeholder="name@company.com"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Service</label>
                  <select 
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-6 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-4 focus:ring-blue-50 outline-none transition-all font-bold appearance-none cursor-pointer"
                  >
                    <option>Web Design</option>
                    <option>Website Development</option>
                    <option>E-Commerce Website</option>
                    <option>Mobile App Development</option>
                    <option>Domain & Hosting</option>
                    <option>Graphics Design</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Project Brief</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    required
                    className="w-full px-6 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-4 focus:ring-blue-50 outline-none transition-all resize-none font-bold"
                    placeholder="Describe your vision..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-5 bg-blue-600 text-white font-black rounded-2xl shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all flex items-center justify-center group active:scale-95 uppercase tracking-widest text-sm ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                  ) : null}
                  {isSubmitting ? 'Launching...' : 'Launch Request'}
                  {!isSubmitting && <Send className="ml-3 w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                </button>
              </form>
            )}
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
