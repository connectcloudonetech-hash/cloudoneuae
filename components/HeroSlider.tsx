
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const SLIDES = [
  {
    id: 1,
    headline: "We Build Powerful Websites",
    text: "Modern, fast and scalable web solutions for your business",
    primaryCTA: "Get Started",
    secondaryCTA: "View Portfolio",
    visual: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
    accent: "from-blue-500/20 to-purple-500/20"
  },
  {
    id: 2,
    headline: "Grow Your Business Online",
    text: "Digital marketing strategies that drive real results",
    primaryCTA: "Get Started",
    secondaryCTA: "View Portfolio",
    visual: "https://images.unsplash.com/photo-1557838923-2985c318be48?q=80&w=2070&auto=format&fit=crop",
    accent: "from-emerald-500/20 to-blue-500/20"
  },
  {
    id: 3,
    headline: "Custom Software Solutions",
    text: "We develop apps and systems tailored to your needs",
    primaryCTA: "Get Started",
    secondaryCTA: "View Portfolio",
    visual: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop",
    accent: "from-purple-500/20 to-pink-500/20"
  }
];

const HeroSlider: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 8000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  return (
    <section className="relative w-full h-[700px] md:h-[900px] overflow-hidden hero-gradient">
      {/* Background Accents */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={`bg-${current}`}
          custom={direction}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className={`absolute inset-0 bg-gradient-to-br ${SLIDES[current].accent} pointer-events-none`}
        />
      </AnimatePresence>

      <div className="relative z-10 max-w-7xl mx-auto px-4 h-full flex items-center">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={current}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.5 }
            }}
            className="grid lg:grid-cols-2 gap-12 items-center w-full"
          >
            {/* Left Content */}
            <div className="space-y-8 text-white">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center px-4 py-2 rounded-full glass-dark text-[#34C1E5] text-xs font-bold uppercase tracking-[0.3em]"
              >
                <Sparkles size={14} className="mr-2 animate-pulse" />
                Nexus Digital Agency
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-5xl md:text-8xl font-black font-display leading-[1.1] tracking-tighter"
              >
                {SLIDES[current].headline.split(' ').map((word, i) => (
                  <span key={i} className={i >= 2 ? "text-gradient block md:inline" : ""}>
                    {word}{' '}
                  </span>
                ))}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-xl md:text-2xl text-slate-300 font-medium max-w-xl leading-relaxed"
              >
                {SLIDES[current].text}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-6 pt-4"
              >
                <Link
                  to="/contact"
                  className="btn-primary px-10 py-5 text-white font-bold rounded-2xl shadow-2xl flex items-center justify-center text-lg hover:scale-[1.05] transition-transform active:scale-95 group"
                >
                  {SLIDES[current].primaryCTA}
                  <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/portfolio"
                  className="px-10 py-5 glass-dark text-white font-bold rounded-2xl border border-white/10 hover:bg-white/10 transition-all flex items-center justify-center text-lg active:scale-95"
                >
                  {SLIDES[current].secondaryCTA}
                </Link>
              </motion.div>
            </div>

            {/* Right Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="relative hidden lg:block"
            >
              <div className="relative z-10 animate-float">
                <div className="relative rounded-[40px] overflow-hidden border-[8px] border-white/10 glass shadow-2xl">
                  <img
                    src={SLIDES[current].visual}
                    alt={SLIDES[current].headline}
                    className="w-full aspect-[4/3] object-cover"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.src = `https://picsum.photos/seed/${SLIDES[current].id}/800/600`;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
                </div>
                
                {/* Floating Elements */}
                <div className="absolute -top-10 -right-10 w-32 h-32 glass rounded-3xl flex items-center justify-center animate-float delay-700">
                  <div className="w-16 h-16 rounded-2xl bg-[#34C1E5]/20 flex items-center justify-center text-[#34C1E5]">
                    <Sparkles size={32} />
                  </div>
                </div>
                <div className="absolute -bottom-10 -left-10 p-6 glass rounded-3xl shadow-2xl animate-float delay-1000">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                      <ChevronRight size={24} />
                    </div>
                    <div>
                      <p className="text-white font-bold text-sm">Real-time Results</p>
                      <p className="text-slate-400 text-xs">Updated just now</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Glow Effect */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-500/20 blur-[120px] -z-10 rounded-full" />
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 flex items-center gap-8">
        <div className="flex items-center gap-4">
          <button
            onClick={prevSlide}
            className="w-12 h-12 rounded-full glass-dark text-white flex items-center justify-center hover:bg-white/10 transition-all active:scale-90"
          >
            <ChevronLeft size={24} />
          </button>
          <div className="flex gap-3">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > current ? 1 : -1);
                  setCurrent(i);
                }}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  current === i ? "w-12 bg-[#34C1E5]" : "w-3 bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>
          <button
            onClick={nextSlide}
            className="w-12 h-12 rounded-full glass-dark text-white flex items-center justify-center hover:bg-white/10 transition-all active:scale-90"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSlider;
