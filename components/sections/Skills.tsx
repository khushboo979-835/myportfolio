'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
  FiCpu, FiGlobe, FiDatabase,
  FiLayout, FiServer, FiSettings, FiChevronDown
} from 'react-icons/fi';

const skillCategories = [
  {
    id: 'frontend',
    name: 'Frontend',
    icon: <FiLayout className="w-5 h-5 md:w-6 md:h-6" />,
    skills: ['React.js', 'Next.js', 'HTML5', 'CSS3', 'Tailwind CSS', 'Framer Motion', 'TypeScript'],
    color: 'from-blue-500 via-cyan-400 to-blue-600',
    glow: 'rgba(34, 211, 238, 0.6)',
    description: 'Modern, interactive user interfaces'
  },
  {
    id: 'backend',
    name: 'Backend',
    icon: <FiServer className="w-5 h-5 md:w-6 md:h-6" />,
    skills: ['Node.js', 'Express.js', 'MongoDB', 'SQL', 'PostgreSQL', 'RESTful APIs', 'GraphQL'],
    color: 'from-purple-500 via-indigo-500 to-purple-700',
    glow: 'rgba(var(--theme-secondary),)',
    description: 'Scalable server-side foundations'
  },
  {
    id: 'database',
    name: 'Database',
    icon: <FiDatabase className="w-5 h-5 md:w-6 md:h-6" />,
    skills: ['Firebase', 'Prisma', 'Redis', 'Cloudinary', 'MySQL', 'DynamoDB', 'Supabase'],
    color: 'from-emerald-500 via-teal-500 to-emerald-700',
    glow: 'rgba(16, 185, 129, 0.6)',
    description: 'Robust data architecture'
  },
  {
    id: 'tools',
    name: 'Tools & DevOps',
    icon: <FiSettings className="w-5 h-5 md:w-6 md:h-6" />,
    skills: ['Git', 'GitHub', 'Docker', 'Vercel', 'Postman', 'Figma', 'AWS'],
    color: 'from-orange-500 via-rose-500 to-orange-700',
    glow: 'rgba(244, 63, 94, 0.6)',
    description: 'Precision development tools'
  },
];

const BackgroundGlow = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-600/10 rounded-full blur-[140px]" />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/8 rounded-full blur-[100px] animate-pulse" />
  </div>
);

const AnimatedBorder = ({ color, isFocused }: { color: string, isFocused: boolean }) => (
  <div className="absolute -inset-[1.5px] rounded-[2rem] md:rounded-[2.5rem] overflow-hidden">
    <motion.div
      className="absolute inset-0"
      animate={{ rotate: 360 }}
      transition={{ duration: isFocused ? 2 : 4, repeat: Infinity, ease: "linear" }}
      style={{
        background: `conic-gradient(from 0deg, transparent 0deg, ${color.includes('blue') ? '#3b82f6' : color.includes('purple') ? 'rgb(var(--theme-secondary))' : color.includes('emerald') ? '#10b981' : '#f43f5e'} 180deg, transparent 360deg)`,
        filter: isFocused ? 'blur(10px) brightness(1.8)' : 'blur(4px) brightness(1.2)',
      }}
    />
    <div className="absolute inset-[2px] bg-[#030014] rounded-[1.9rem] md:rounded-[2.4rem]" />
  </div>
);

const SkillCard = ({
  category,
  index,
  total,
  isFanned,
  isExpanded,
  hoveredIndex,
  isMobile,
  onHover,
  onToggle
}: {
  category: typeof skillCategories[0],
  index: number,
  total: number,
  isFanned: boolean,
  isExpanded: boolean,
  hoveredIndex: number | null,
  isMobile: boolean,
  onHover: (idx: number | null) => void,
  onToggle: () => void
}) => {
  const isFocused = hoveredIndex === index && isFanned;
  const middle = (total - 1) / 2;
  const offset = index - middle;

  // COORDINATED FAN ANIMATION LOGIC (V3.1) - Mobile Vertical Stack
  let rotate = isFanned ? (isMobile ? 0 : offset * 18) : offset * 2;
  let x = isFanned ? (isMobile ? 0 : offset * 185) : offset * 8;
  let y = isFanned ? (isMobile ? offset * 380 : Math.abs(offset) * 25) : offset * -2;
  let zIndex = isExpanded || isFocused ? 100 : (hoveredIndex !== null ? 10 : 50 - Math.abs(index - middle));
  let scale = isExpanded ? (isMobile ? 1.05 : 1.1) : (isFocused ? (isMobile ? 1.05 : 1.18) : 1);

  // Focus adjustment: straighten when focused
  if (isFocused) {
    rotate = 0;
    y = isMobile ? y : y - 50; // Lift up significantly when focused (desktop only)
  }

  // Neighbor spread logic: if another card is focused, shift neighbors away (desktop only)
  if (hoveredIndex !== null && hoveredIndex !== index && isFanned && !isMobile) {
    const neighborOffset = 100; // Increased spread for v3.1
    if (index < hoveredIndex) x -= neighborOffset;
    if (index > hoveredIndex) x += neighborOffset;
    scale = 0.92; // Slightly shrink others more
    zIndex = 5; // Put background cards behind everything
  }

  return (
    <motion.div
      layout
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
      onClick={(e) => {
        if (!isFanned) return;
        e.stopPropagation();
        onToggle();
      }}
      animate={{
        rotate,
        x,
        y,
        scale,
        zIndex,
      }}
      transition={{
        type: "spring",
        stiffness: 180,
        damping: 22,
        mass: 1
      }}
      className={cn(
        "absolute w-[260px] md:w-[340px] aspect-[10/14] rounded-[2rem] md:rounded-[2.5rem]",
        "bg-[#0a0a1a]/85 backdrop-blur-3xl transition-shadow duration-500",
        isFanned ? "cursor-pointer" : "cursor-default",
        isFocused ? "shadow-[0_0_80px_rgba(0,0,0,1)]" : "shadow-3xl"
      )}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <AnimatedBorder color={category.color} isFocused={isFocused} />

      {/* INNER CONTENT */}
      <div className="relative h-full w-full p-6 md:p-10 flex flex-col items-center overflow-hidden rounded-[1.9rem] md:rounded-[2.4rem]">
        {/* Glow behind icon - intensified */}
        <div className={cn(
          "absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 blur-[60px] transition-opacity duration-700",
          isFocused ? "opacity-60" : "opacity-20"
        )} style={{ background: category.glow }} />

        <div className="relative z-10 w-full h-full flex flex-col items-center">
          <motion.div
            animate={isFocused ? { scale: 1.25, rotate: [0, -5, 5, 0] } : {}}
            className={cn(
              "p-4 md:p-5 rounded-2xl bg-gradient-to-br shadow-2xl mb-6 md:mb-8 text-white",
              category.color
            )}
          >
            {category.icon}
          </motion.div>

          <h3 className={cn(
            "text-2xl md:text-3xl font-black tracking-tighter uppercase mb-2 text-center transition-all duration-300",
            isFocused ? "text-white scale-110" : "text-white/80"
          )}>
            {category.name}
          </h3>

          <p className={cn(
            "text-xs md:text-sm font-medium text-center px-4 leading-relaxed mb-8 transition-colors duration-300",
            isFocused ? "text-white/70" : "text-white/40"
          )}>
            {category.description}
          </p>

          <div className="w-full flex-1 flex flex-col justify-center">
            <AnimatePresence mode="wait">
              {isExpanded ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 10 }}
                  className="grid grid-cols-2 gap-4 md:gap-8"
                >
                  {category.skills.map((skill, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="px-3 py-2.5 rounded-xl bg-white/10 border border-white/20 text-[10px] md:text-[11px] text-white font-bold backdrop-blur-md shadow-lg"
                    >
                      {skill}
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <div className="flex flex-wrap justify-center gap-2.5">
                  {category.skills.slice(0, 3).map((skill, i) => (
                    <motion.span
                      key={i}
                      animate={isFocused ? { opacity: 1, y: 0, scale: 1.1 } : { opacity: 0.4, y: 0, scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                      className="px-3 py-1.5 rounded-full bg-white/5 text-[9px] md:text-[10px] text-white font-bold border border-white/10"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              )}
            </AnimatePresence>
          </div>

          <div className="mt-6 pt-6 border-t border-white/10 w-full text-center">
            <span className={cn(
              "text-[8px] md:text-[10px] font-mono tracking-[0.4em] font-black uppercase transition-all duration-300",
              isExpanded ? "text-purple-400" : isFocused ? "text-white/60" : "text-white/20"
            )}>
              {isExpanded ? 'System Active' : isFocused ? 'Analyze Module' : 'Standby'}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export function Skills() {
  const [isFanned, setIsFanned] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section
      id="skills"
      onClick={() => setExpandedId(null)}
      className="relative bg-[#030014] py-12 sm:py-20 sm:min-h-screen overflow-hidden flex flex-col items-center justify-center cursor-default"
    >
      <BackgroundGlow />

      <div className="container-custom relative z-10 w-full px-6 flex flex-col items-center">
        <div className="mb-12 sm:mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <h2 className="text-4xl sm:text-6xl font-black text-white leading-[0.85] tracking-tighter uppercase italic drop-shadow-2xl">
              Skills <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-rose-500 not-italic">Arsenal</span>
            </h2>
            <div className="mt-8 flex items-center justify-center gap-6">
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                whileInView={{ width: 48, opacity: 1 }}
                viewport={{ once: true }}
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ opacity: { duration: 3, repeat: Infinity, ease: "easeInOut" }, duration: 1 }}
                className="h-[1px] bg-gradient-to-r from-transparent via-blue-500 to-transparent"
              />
              <span className="text-white/60 font-black text-[10px] sm:text-[11px] tracking-[0.2em] uppercase">
                [Professional Stack Overview]
              </span>
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                whileInView={{ width: 48, opacity: 1 }}
                viewport={{ once: true }}
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ opacity: { duration: 3, repeat: Infinity, ease: "easeInOut" }, duration: 1 }}
                className="h-[1px] bg-gradient-to-r from-transparent via-rose-500 to-transparent"
              />
            </div>
          </motion.div>
        </div>

        {/* STACKED CARDS CONTAINER */}
        <motion.div
          animate={{ height: isFanned && isMobile ? 1700 : (isMobile ? 380 : 550) }}
          transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
          className="relative w-full flex items-center justify-center perspective-2000"
        >
          <div className="relative w-full max-w-6xl h-full flex items-center justify-center">
            {skillCategories.map((category, idx) => (
              <SkillCard
                key={category.id}
                category={category}
                index={idx}
                total={skillCategories.length}
                isFanned={isFanned}
                isExpanded={expandedId === category.id}
                hoveredIndex={hoveredIndex}
                isMobile={isMobile}
                onHover={(idx) => setHoveredIndex(idx)}
                onToggle={() => setExpandedId(expandedId === category.id ? null : category.id)}
              />
            ))}
          </div>
        </motion.div>

        {/* INTERACTIVE TRIGGER */}
        <div className="mt-8 sm:mt-12 relative z-[200]">
          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              setIsFanned(!isFanned);
              if (isFanned) {
                setExpandedId(null);
                setHoveredIndex(null);
              }
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative flex flex-col items-center gap-6 outline-none"
          >
            <div className="px-10 py-4 rounded-full bg-white/5 border border-white/10 text-white/50 group-hover:text-white group-hover:bg-white/10 transition-all duration-500 font-mono text-xs sm:text-sm tracking-[0.3em] font-black uppercase backdrop-blur-3xl shadow-2xl">
              {isFanned ? 'Terminate Arsenal' : 'Initiate Skill Stack'}
            </div>

            <motion.div
              animate={{ y: isFanned ? 0 : [0, 8, 0], rotate: isFanned ? 180 : 0 }}
              transition={{ repeat: isFanned ? 0 : Infinity, duration: 1.5, ease: "easeInOut" }}
              className="text-purple-500"
            >
              <FiChevronDown size={32} />
            </motion.div>

            {/* Glowing ring around the button */}
            <div className="absolute -inset-4 bg-purple-500/30 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-full" />
          </motion.button>
        </div>
      </div>

      <style jsx global>{`
        .perspective-2000 {
          perspective: 2000px;
        }
      `}</style>
    </section>
  );
}
