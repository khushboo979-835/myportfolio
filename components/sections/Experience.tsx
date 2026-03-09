'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { SiReact, SiNextdotjs, SiTailwindcss, SiFramer } from 'react-icons/si';

const experiences = [
  {
    title: 'Frontend Developer Intern',
    organization: 'Mecenza',
    location: 'Remote',
    duration: 'Dec 2025 – Present',
    description: [
      'Working on real‑world projects using React.js and Next.js.',
      'Developing responsive UI components with animations and interactive layouts.',
      'Optimizing frontend performance and fixing rendering issues.',
    ],
    tags: ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion'],
    icons: [SiReact, SiNextdotjs, SiTailwindcss, SiFramer]
  }
];

// Particle system for "tiny sparkles" at specific corners
const SparkleParticles = ({ isHovered }: { isHovered: boolean }) => {
  const [particles, setParticles] = useState<{
    id: number;
    x: number;
    y: number;
    targetX: number;
    targetY: number;
    size: number;
    duration: number;
  }[]>([]);

  useEffect(() => {
    // Generate particles continuously, but faster on hover
    const intervalTime = isHovered ? 70 : 600;
    const generateCount = isHovered ? 4 : 1;

    const interval = setInterval(() => {
      const newParticles = Array.from({ length: generateCount }).map((_, i) => {
        const isTopRight = Math.random() > 0.5;
        const startX = isTopRight ? 100 : 0;
        const startY = isTopRight ? 0 : 100;

        const targetX = isTopRight ? (Math.random() * 80 + 30) : -(Math.random() * 80 + 30);
        const targetY = isTopRight ? -(Math.random() * 80 + 30) : (Math.random() * 80 + 30);

        return {
          id: Date.now() + i + Math.random(),
          x: startX,
          y: startY,
          targetX,
          targetY,
          size: Math.random() * 3.5 + 1.5,
          duration: Math.random() * 1.5 + 1.5
        };
      });

      setParticles(prev => [...prev.slice(-80), ...newParticles]);
    }, intervalTime);

    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <div className="absolute inset-0 pointer-events-none z-50 overflow-visible">
      <AnimatePresence>
        {particles.map(p => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
            animate={{
              opacity: [0, 1, 0.8, 0],
              scale: [0.5, 1.2, 0.5],
              // Smooth, definitive movement towards the target
              x: p.targetX,
              y: p.targetY
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: p.duration, ease: "easeOut" }}
            className="absolute rounded-full bg-pink-100"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              boxShadow: '0 0 10px rgb(var(--theme-primary)), 0 0 20px rgb(var(--theme-secondary))',
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

// Double border effect with inner/outer glow (Pink/Purple Theme)
const NeonBorders = ({ isHovered }: { isHovered: boolean }) => {
  return (
    <>
      {/* Outer Ambient Jelly Glow - THICKER AND MORE COLORFUL */}
      <div
        className="absolute inset-[-15px] pointer-events-none z-0 transition-all duration-700 blur-[30px]"
        style={{
          borderRadius: '70px 0 70px 0',
          background: isHovered
            ? 'linear-gradient(135deg, rgba(var(--theme-primary), 0.6) 0%, rgba(var(--theme-secondary), 0.4) 100%)'
            : 'linear-gradient(135deg, rgba(var(--theme-primary), 0.3) 0%, transparent 100%)',
          opacity: isHovered ? 1 : 0.6,
        }}
      />

      {/* Glassy Border Line - THICKER */}
      <div
        className="absolute inset-0 pointer-events-none z-20 transition-all duration-500 border-[3px]"
        style={{
          borderRadius: '60px 0 60px 0',
          borderColor: isHovered ? 'rgba(var(--theme-primary), 1)' : 'rgba(var(--theme-primary), 0.3)',
          boxShadow: isHovered
            ? 'inset 0 0 30px rgba(var(--theme-primary), 0.5), 0 0 45px rgba(var(--theme-primary), 0.8)'
            : 'inset 0 0 10px rgba(var(--theme-primary), 0.2), 0 0 20px rgba(var(--theme-primary), 0.2)'
        }}
      />

      {/* Floating Light Beam (Boundary highlight) - MORE PROMINENT */}
      <motion.div
        animate={{
          opacity: isHovered ? [0.6, 1, 0.6] : [0.3, 0.6, 0.3],
          background: [
            'linear-gradient(0deg, transparent, rgba(255,255,255,0.6), transparent)',
            'linear-gradient(180deg, transparent, rgba(255,255,255,0.6), transparent)',
            'linear-gradient(360deg, transparent, rgba(255,255,255,0.6), transparent)'
          ]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 pointer-events-none z-30"
        style={{
          borderRadius: '60px 0 60px 0',
          padding: '2px', // Slightly thicker beam
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
      />
    </>
  );
};


const ExperienceCard = ({ item }: { item: typeof experiences[0] }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      className="relative w-full max-w-5xl mx-auto p-[2px] transition-all duration-500 overflow-visible"
    >
      <SparkleParticles isHovered={isHovered} />

      <div
        className="relative flex flex-col md:flex-row gap-8 p-10 md:p-14 bg-white/[0.03] backdrop-blur-md overflow-hidden shadow-2xl transition-all duration-500 group group-hover:scale-[1.02] ease-[cubic-bezier(0.34,1.56,0.64,1)] active:scale-95"
        style={{
          borderRadius: '60px 0 60px 0',
          boxShadow: `inset 0 4px 8px rgba(255,255,255,0.1), inset 0 -4px 12px rgba(0,0,0,0.4), 0 20px 40px rgba(0,0,0,0.5)`,
        }}
      >
        <NeonBorders isHovered={isHovered} />

        {/* Interactive Mouse Spotlight Glow */}
        <motion.div
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(var(--theme-primary), 0.15), transparent 40%)`
          }}
        />

        {/* Ambient background light */}
        <div
          className={`absolute inset-x-0 top-0 h-full opacity-10 blur-[80px] pointer-events-none z-0 transition-all duration-700 ${isHovered ? 'opacity-30 blur-[100px]' : ''}`}
          style={{ background: 'radial-gradient(circle at top, rgb(var(--theme-primary)), transparent)' }}
        />

        {/* Left Section: Branding & Role */}
        <div className="relative z-40 w-full md:w-2/5 space-y-6">
          <motion.div
            animate={isHovered ? { x: 10 } : { x: 0 }}
            className="inline-block px-4 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-500 text-[10px] font-black uppercase tracking-[0.3em]"
          >
            Employment History
          </motion.div>

          <h3 className="text-4xl md:text-5xl font-black text-white italic tracking-tighter leading-tight">
            {item.title}
          </h3>

          <div className="space-y-1">
            <p className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent capitalize">
              {item.organization}
            </p>
            <div className="flex items-center gap-3 text-sm font-medium text-slate-400">
              <span className="tracking-widest uppercase text-[11px]">{item.duration}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-pink-500/40" />
              <span>{item.location}</span>
            </div>
          </div>

          <div className="flex gap-4 pt-4 border-t border-white/5 opacity-50 group-hover:opacity-100 transition-opacity">
            {item.icons.map((Icon, i) => (
              <Icon key={i} size={24} className="text-pink-600/60 hover:text-pink-400 transition-colors" />
            ))}
          </div>
        </div>

        {/* Right Section: Achievements */}
        <div className="relative z-40 w-full md:w-3/5">
          <div
            className="p-8 rounded-[40px] bg-white/[0.02] border border-white/10 shadow-inner backdrop-blur-sm transition-all duration-500 group-hover:bg-white/[0.05]"
            style={{
              boxShadow: `inset 0 2px 4px rgba(255,255,255,0.05), inset 0 -2px 8px rgba(0,0,0,0.3)`,
            }}
          >
            <ul className="space-y-5">
              {item.description.map((point, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="flex gap-4 text-slate-300 group/point"
                >
                  <div className="mt-2.5 h-1.5 w-1.5 rounded-full bg-pink-500 shadow-[0_0_8px_rgb(var(--theme-primary))] shrink-0 group-hover/point:scale-150 transition-transform" />
                  <span className="text-lg leading-relaxed font-medium group-hover/point:text-white transition-colors">
                    {point}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap gap-2 mt-8">
            {item.tags.map((tag) => (
              <span key={tag} className="px-3 py-1 bg-pink-500/5 border border-pink-500/20 rounded-lg text-[10px] font-bold text-pink-400 tracking-wider">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export function Experience() {
  return (
    <section id="experience" className="relative py-16 md:py-32 overflow-hidden bg-black">
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-[800px] h-[800px] bg-pink-900/5 blur-[150px] rounded-full -translate-x-1/2" />
      </div>

      <div className="container-custom relative z-10 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center mb-24"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-pink-500" />
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-pink-500">Milestones</span>
            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-pink-500" />
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter text-center">
            Professional <span className="bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent italic underline decoration-pink-500/30 underline-offset-8">Experience</span>
          </h2>
        </motion.div>

        <div className="space-y-16">
          {experiences.map((exp, idx) => (
            <ExperienceCard key={idx} item={exp} />
          ))}
        </div>
      </div>
    </section>
  );
}
