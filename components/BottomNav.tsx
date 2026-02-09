
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Briefcase, LayoutGrid, MessageSquare } from 'lucide-react';

const BottomNav: React.FC = () => {
  const links = [
    { to: '/', icon: Home, label: 'Home' },
    { to: '/services', icon: Briefcase, label: 'Services' },
    { to: '/portfolio', icon: LayoutGrid, label: 'Work' },
    { to: '/contact', icon: MessageSquare, label: 'Chat' },
  ];

  return (
    <nav className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[150] md:hidden w-[85%] max-w-sm">
      <div className="bg-white/80 backdrop-blur-3xl border border-white/60 shadow-[0_30px_60px_-15px_rgba(15,23,42,0.15)] rounded-[48px] px-6 py-3 flex justify-between items-center">
        {links.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 transition-all duration-500 ${
                isActive ? 'text-[#1F4E79] scale-110' : 'text-slate-300'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div className={`p-3 rounded-[24px] transition-all duration-500 ${isActive ? 'bg-[#1F4E79] text-white shadow-lg shadow-blue-900/20' : 'hover:bg-slate-50 hover:text-slate-500'}`}>
                  <Icon size={20} strokeWidth={isActive ? 3 : 2} />
                </div>
                <span className={`text-[9px] font-black uppercase tracking-[0.2em] transition-all duration-500 ${isActive ? 'opacity-100 mt-1' : 'opacity-0 h-0 overflow-hidden'}`}>
                  {label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
