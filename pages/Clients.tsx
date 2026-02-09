
import React, { useState, useEffect, useRef } from 'react';
import { CLIENTS } from '../constants';
import { Sparkles, ArrowRight, Building2, Quote, Plus, X, Lock, LogOut, Trash2, Upload, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Client } from '../types';

const Clients: React.FC = () => {
  // Use localStorage to persist clients
  const [clientsList, setClientsList] = useState<Client[]>(() => {
    const saved = localStorage.getItem('cloudone_clients');
    return saved ? JSON.parse(saved) : CLIENTS;
  });
  
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showUploader, setShowUploader] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Form State
  const [newName, setNewName] = useState('');
  const [newIndustry, setNewIndustry] = useState('');
  const [newLogoBase64, setNewLogoBase64] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync with localStorage
  useEffect(() => {
    localStorage.setItem('cloudone_clients', JSON.stringify(clientsList));
  }, [clientsList]);

  // Check for admin session on mount
  useEffect(() => {
    const adminStatus = sessionStorage.getItem('cloudone_admin');
    if (adminStatus === 'true') setIsAdmin(true);
  }, []);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>, text: string = 'Partner') => {
    e.currentTarget.src = `https://placehold.co/400x400/F1F5F9/1F4E79?text=${encodeURIComponent(text)}`;
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsAdmin(true);
      sessionStorage.setItem('cloudone_admin', 'true');
      setShowLogin(false);
      setPassword('');
      setError('');
    } else {
      setError('Access Denied. Invalid Token.');
    }
  };

  const handleLogout = () => {
    setIsAdmin(false);
    sessionStorage.removeItem('cloudone_admin');
    setShowUploader(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const SIZE = 400; 
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > SIZE) {
              height *= SIZE / width;
              width = SIZE;
            }
          } else {
            if (height > SIZE) {
              width *= SIZE / height;
              height = SIZE;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            const dataUrl = canvas.toDataURL('image/png', 0.9);
            setNewLogoBase64(dataUrl);
          }
        };
        img.src = event.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddClient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAdmin) return;

    const newClient: Client = {
      id: Date.now().toString(),
      name: newName || 'New Client',
      industry: newIndustry || 'Industry Partner',
      logoUrl: newLogoBase64 || `https://placehold.co/400x400/F1F5F9/1F4E79?text=${encodeURIComponent(newName || 'Partner')}`
    };

    setClientsList([newClient, ...clientsList]);
    setShowUploader(false);
    setNewName('');
    setNewIndustry('');
    setNewLogoBase64('');
  };

  const handleDeleteClient = (id: string) => {
    if (!isAdmin) return;
    if (window.confirm('Remove this partner from the ecosystem?')) {
      setClientsList(prev => prev.filter(c => c.id !== id));
    }
  };

  return (
    <div className="bg-[#FDFDFE] min-h-screen">
      <section className="bg-white rounded-[64px] pt-20 pb-32 px-6 shadow-sm border border-slate-50 max-w-7xl mx-auto text-center relative overflow-hidden animate-reveal">
        <div className="relative z-10 space-y-8 max-w-4xl mx-auto">
          <div className="inline-flex items-center px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] bg-blue-50 text-[#1F4E79] border border-blue-100/50">
            <Building2 size={14} className="mr-2" />
            Our Network
          </div>
          <h1 className="text-6xl md:text-9xl font-black text-slate-900 tracking-tighter leading-[0.9]">
            Trusted <br />
            <span className="text-gradient">Partners.</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">The visionary brands within the Cloud One ecosystem.</p>
          <div className="pt-8 flex justify-center">
            {isAdmin ? (
              <div className="flex gap-4">
                <button onClick={() => setShowUploader(!showUploader)} className="px-8 py-4 bg-[#1F4E79] text-white font-black rounded-3xl hover:bg-[#153450] transition-all shadow-xl active:scale-95 text-xs uppercase tracking-widest flex items-center">
                  {showUploader ? <X className="mr-2" size={16} /> : <Plus className="mr-2" size={16} />}
                  {showUploader ? 'Cancel' : 'Add Partner'}
                </button>
                <button onClick={handleLogout} className="p-4 bg-red-50 text-red-600 rounded-3xl hover:bg-red-100 transition-all border border-red-100"><LogOut size={20} /></button>
              </div>
            ) : (
              <div className="px-6 py-3 bg-slate-50 border border-slate-100 rounded-full flex items-center gap-3">
                <ShieldCheck size={16} className="text-[#1F4E79]" />
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Verified Gallery</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {isAdmin && showUploader && (
        <section className="max-w-7xl mx-auto px-6 mb-16 animate-reveal">
          <div className="bg-white rounded-[40px] p-8 md:p-12 shadow-2xl border border-slate-100">
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-10 flex items-center"><Plus className="mr-4 text-[#34C1E5]" /> Partner Registration</h2>
            <form onSubmit={handleAddClient} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Company Name</label>
                <input type="text" required className="w-full px-8 py-5 rounded-3xl border bg-slate-50/50 font-bold outline-none focus:bg-white focus:ring-4 focus:ring-blue-500/10" placeholder="e.g. Acme Corp" value={newName} onChange={(e) => setNewName(e.target.value)} />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Sector</label>
                <input type="text" required className="w-full px-8 py-5 rounded-3xl border bg-slate-50/50 font-bold outline-none focus:bg-white focus:ring-4 focus:ring-blue-500/10" placeholder="e.g. Technology" value={newIndustry} onChange={(e) => setNewIndustry(e.target.value)} />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Logo</label>
                <div onClick={() => fileInputRef.current?.click()} className={`w-full h-[68px] border-2 border-dashed rounded-3xl flex items-center px-6 cursor-pointer transition-all ${newLogoBase64 ? 'border-[#34C1E5] bg-blue-50/30' : 'border-slate-200 bg-slate-50 hover:border-[#1F4E79]'}`}>
                  <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
                  {newLogoBase64 ? (
                    <div className="flex items-center gap-3 overflow-hidden">
                      <img src={newLogoBase64} className="w-10 h-10 object-contain rounded-lg shrink-0 bg-white p-1 shadow-sm" alt="Preview" />
                      <span className="text-xs font-bold text-[#1F4E79] truncate">Logo Optimized</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <Upload size={18} className="text-slate-400" />
                      <span className="text-sm font-bold text-slate-400">Select Image</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="lg:col-span-3 flex justify-end">
                <button type="submit" className="w-full md:w-auto px-16 py-6 bg-[#1F4E79] text-white font-black rounded-3xl text-xs uppercase tracking-widest shadow-lg active:scale-95 transition-transform">Register Partner</button>
              </div>
            </form>
          </div>
        </section>
      )}

      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {clientsList.map((client) => (
            <div key={client.id} className="app-card p-10 flex flex-col items-center text-center group animate-reveal relative">
              {isAdmin && (
                <button onClick={() => handleDeleteClient(client.id)} className="absolute top-4 right-4 z-20 w-8 h-8 bg-white/90 rounded-full text-red-500 shadow-lg border border-slate-100 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all transform active:scale-90"><Trash2 size={14} /></button>
              )}
              <div className="w-24 h-24 mb-8 bg-white rounded-[32px] p-5 shadow-sm border border-slate-100 flex items-center justify-center group-hover:scale-110 transition-all duration-500">
                <img 
                  src={client.logoUrl} 
                  alt={client.name} 
                  className="max-w-full max-h-full grayscale group-hover:grayscale-0 transition-all duration-500 object-contain"
                  onError={(e) => handleImageError(e, client.name)}
                />
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-1 leading-tight">{client.name}</h3>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{client.industry}</p>
            </div>
          ))}
        </div>
      </section>

      {showLogin && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-slate-900/80 backdrop-blur-xl animate-in fade-in duration-300">
          <div className="w-full max-w-md bg-white rounded-[40px] p-10 shadow-2xl relative">
            <button onClick={() => setShowLogin(false)} className="absolute top-8 right-8 text-slate-400 hover:text-slate-900"><X size={24} /></button>
            <div className="text-center mb-10">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-[#1F4E79] mx-auto mb-6"><Lock size={32} /></div>
              <h3 className="text-2xl font-black text-slate-900">Admin Login</h3>
            </div>
            <form onSubmit={handleLogin} className="space-y-6">
              <input type="password" autoFocus required placeholder="Admin Token" className="w-full px-6 py-4 rounded-2xl border bg-slate-50 text-center text-xl font-black outline-none focus:ring-4 focus:ring-blue-500/10" value={password} onChange={(e) => setPassword(e.target.value)} />
              {error && <p className="text-red-500 text-[10px] font-black uppercase text-center">{error}</p>}
              <button type="submit" className="w-full py-5 bg-[#1F4E79] text-white font-black rounded-2xl shadow-xl uppercase tracking-widest text-xs">Login</button>
            </form>
          </div>
        </div>
      )}

      {!isAdmin && (
        <div className="pb-16 flex justify-center">
          <button onClick={() => setShowLogin(true)} className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-200 hover:text-slate-400 transition-colors">Admin Login</button>
        </div>
      )}
    </div>
  );
};

export default Clients;
