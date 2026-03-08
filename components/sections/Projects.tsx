'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaCodeBranch } from 'react-icons/fa';
import Image from 'next/image';

const cardColors = [
  'rgba(56, 189, 248, 0.6)', // Blue neon
  'rgba(236, 72, 153, 0.6)',  // Pink neon
  'rgba(251, 146, 60, 0.6)',  // Orange neon
];

export function Projects() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('/api/projects');
        const json = await res.json();
        if (json.success) {
          setProjects(json.data.slice(0, 6));
        }
      } catch (error) {
        console.error('Failed to fetch projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section id="projects" className="py-32 relative overflow-hidden bg-[#030014]">
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-1/4 w-[700px] h-[700px] bg-purple-900/20 blur-[150px] rounded-full mix-blend-screen animate-pulse" />
        <div className="absolute bottom-1/4 -right-1/4 w-[600px] h-[600px] bg-indigo-900/20 blur-[150px] rounded-full mix-blend-screen animate-pulse" style={{ animationDelay: '3s' }} />
      </div>

      <div className="container-custom relative z-10 px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center mb-24 text-center"
        >
          <h2 className="text-4xl md:text-6xl font-black mb-6">
            <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent italic tracking-tighter">
              Featured Projects
            </span>
          </h2>
          <div className="h-[2px] w-32 bg-gradient-to-r from-transparent via-purple-500 to-transparent shadow-[0_0_15px_rgba(var(--theme-secondary),)]" />
        </motion.div>

        {/* Staggered Grid: Middle Item Slightly UP, others standard */}
        <div className="grid gap-x-12 gap-y-24 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto items-start">
          {loading ? (
            [...Array(6)].map((_, i) => (
              <div key={i} className="h-[580px] rounded-[2.5rem] bg-white/5 animate-pulse border border-white/10" />
            ))
          ) : (
            projects.map((project, idx) => (
              <ProjectCard
                key={project.id}
                project={project}
                color={cardColors[idx % 3]}
                // Staggered layout: middle card is higher (idx 1, 4)
                offset={idx % 3 === 1 ? -40 : 40}
                delay={idx * 0.1}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, color, offset, delay }: { project: any, color: string, offset: number, delay: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: offset + 50 }}
      whileInView={{
        opacity: 1,
        y: offset,
      }}
      animate={{
        // Infinity floating movement
        y: [offset, offset - 12, offset, offset + 12, offset],
        x: [0, 8, 0, -8, 0],
      }}
      transition={{
        y: { duration: 6 + Math.random() * 2, repeat: Infinity, ease: "easeInOut" },
        x: { duration: 8 + Math.random() * 2, repeat: Infinity, ease: "easeInOut" },
        opacity: { duration: 0.8, delay },
        initial: { type: "spring", stiffness: 100 }
      }}
      viewport={{ once: true }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transformStyle: "preserve-3d",
      }}
      className="group relative flex flex-col p-6 rounded-[2.5rem] bg-[#0c0d21]/80 backdrop-blur-xl border border-white/5 shadow-2xl overflow-hidden h-[600px] transition-all duration-500 hover:shadow-[0_0_50px_rgba(0,0,0,0.6)]"
    >
      {/* Intense Neon Full-Boundary Glow (Emerging on touch/hover) */}
      <div
        className="absolute inset-0 rounded-[2.5rem] pointer-events-none z-30 border border-transparent group-hover:border-white/20 transition-all duration-700"
        style={{
          boxShadow: isHovered
            ? `0 0 50px ${color.replace('0.6', '0.6')}, inset 0 0 20px ${color.replace('0.6', '0.4')}`
            : `0 0 0px transparent, inset 0 0 0px transparent`,
        }}
      />

      {/* Moving/Shifting Corner Glows (Orbiting) */}
      <div className="absolute inset-0 z-40 pointer-events-none overflow-hidden rounded-[2.5rem]">
        {[
          { pos: 'top-0 left-0', x: [-15, 15, -15], y: [-15, 15, -15] },
          { pos: 'top-0 right-0', x: [15, -15, 15], y: [-15, 15, -15] },
          { pos: 'bottom-0 left-0', x: [-15, 15, -15], y: [15, -15, 15] },
          { pos: 'bottom-0 right-0', x: [15, -15, 15], y: [15, -15, 15] }
        ].map((glow, i) => (
          <motion.div
            key={i}
            animate={isHovered ? {
              opacity: [0.5, 0.9, 0.5],
              scale: [1, 1.5, 1],
              x: glow.x,
              y: glow.y
            } : { opacity: 0.1, scale: 0.8 }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.4
            }}
            className={`absolute w-32 h-32 ${glow.pos} -translate-x-1/2 -translate-y-1/2 bg-white/20 blur-[30px] rounded-full`}
            style={{
              background: `radial-gradient(circle at center, ${color}, transparent 80%)`,
            }}
          />
        ))}
      </div>

      {/* Top and Side Neon Lines */}
      <div
        className="absolute inset-x-8 top-[-1px] h-[3px] opacity-40 group-hover:opacity-100 transition-opacity duration-700 z-40 rounded-full"
        style={{
          background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
          boxShadow: `0 0 30px ${color}, 0 0 60px ${color}`
        }}
      />

      {/* Central Asset Box with Maximum Image Coverage */}
      <div className="relative w-full aspect-[4/3] mb-8 mt-2 rounded-3xl overflow-hidden bg-[#02030d] border border-white/5 shadow-[inset_0_2px_20px_rgba(0,0,0,0.8)] flex items-center justify-center p-3 group/img">

        {/* specific glowing light emerging at the inner boundary corner when touched */}
        <div
          className="absolute inset-0 opacity-0 group-hover/img:opacity-100 transition-opacity duration-500 pointer-events-none z-20"
          style={{
            boxShadow: `0 0 40px ${color} inset`,
            background: `radial-gradient(circle at center, transparent 40%, ${color.replace('0.6', '0.15')} 100%)`
          }}
        />

        <div className="relative w-[96%] h-[96%] z-10 transition-transform duration-[800ms] ease-out group-hover:scale-[1.03]">
          {project.image ? (
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover rounded-xl filter drop-shadow-[0_0_15px_rgba(255,255,255,0.05)] opacity-90 group-hover/img:opacity-100 transition-opacity"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-white/[0.02] rounded-xl">
              <FaCodeBranch className="text-6xl text-white/5" />
            </div>
          )}
        </div>
      </div>

      {/* Text Content */}
      <div className="flex-1 flex flex-col items-center text-center px-4 w-full">
        {/* Title with flanking lines (Refined for Clarity) */}
        <div className="flex items-center gap-4 w-full mb-5">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-white/30" />
          <motion.h3
            animate={isHovered ? { scale: 1.08, color: color.replace('0.6', '1'), textShadow: `0 0 10px ${color}` } : { scale: 1, color: '#fff' }}
            className="text-[22px] md:text-2xl font-black tracking-tight cursor-default px-1 leading-tight z-50 transition-colors duration-500"
          >
            {project.title}
          </motion.h3>
          <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-white/30" />
        </div>

        <p className="text-[13px] text-slate-300/70 leading-relaxed mb-6 line-clamp-3 font-medium px-2">
          {project.description}
        </p>

        {/* Tech Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {project.tech?.slice(0, 3).map((t: string) => (
            <span key={t} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[9px] font-black text-white/30 tracking-[0.2em] uppercase">
              {t}
            </span>
          ))}
        </div>

        {/* Actions - Modern Floating Buttons */}
        <div className="flex gap-4 w-full mt-auto relative z-50">
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-[3] h-14 rounded-2xl bg-white/5 border border-white/10 text-white text-[10px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-3 hover:bg-white/10 hover:border-white/20 transition-all active:scale-95 group/btn overflow-hidden relative shadow-lg"
          >
            <div
              className="absolute inset-0 opacity-0 group-hover/btn:opacity-20 transition-opacity duration-300"
              style={{ background: color }}
            />
            Live Demo <FaExternalLinkAlt size={11} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
          </a>
          <a
            href={project.source}
            target="_blank"
            rel="noopener noreferrer"
            className="h-14 w-14 rounded-2xl bg-white/5 border border-white/10 text-white flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all active:scale-95 group/btn relative overflow-hidden shadow-lg"
          >
            <div
              className="absolute inset-0 opacity-0 group-hover/btn:opacity-20 transition-opacity duration-300"
              style={{ background: color }}
            />
            <FaGithub size={22} className="group-hover/btn:rotate-12 transition-transform" />
          </a>
        </div>
      </div>

      {/* Subtle bottom neon pulse accent */}
      <motion.div
        animate={{ opacity: [0.3, 0.8, 0.3], width: ['20%', '40%', '20%'] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 h-[1.5px]"
        style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)`, boxShadow: `0 0 10px ${color}` }}
      />
    </motion.div>
  );
}
