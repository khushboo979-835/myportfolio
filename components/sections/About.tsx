'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  SiReact, SiJavascript, SiNodedotjs, SiExpress, SiMongodb,
  SiMongoose, SiMysql, SiPostgresql, SiBootstrap, SiHtml5, SiCss3,
  SiGit, SiTailwindcss, SiNextdotjs
} from 'react-icons/si';
import { FaChevronRight, FaServer } from 'react-icons/fa';
import Image from 'next/image';
import { cn } from '@/lib/utils';

const titles = [
  { text: "Frontend Developer", Icon: SiReact, color: "text-cyan-400" },
  { text: "Backend Developer", Icon: FaServer, color: "text-blue-400" },
  { text: "MERN Stack Developer", Icon: SiMongodb, color: "text-green-500" },
];

const LoopingTypewriter = () => {
  const [index, setIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const currentTitle = titles[index].text;

    if (isPaused) {
      const timeout = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(!isDeleting);
      }, isDeleting ? 300 : 2000);
      return () => clearTimeout(timeout);
    }

    const handleTyping = () => {
      if (!isDeleting) {
        if (displayText === currentTitle) {
          setIsPaused(true);
        } else {
          setDisplayText(currentTitle.slice(0, displayText.length + 1));
        }
      } else {
        if (displayText === '') {
          setIsPaused(true);
          setIndex((prev) => (prev + 1) % titles.length);
        } else {
          setDisplayText(currentTitle.slice(0, displayText.length - 1));
        }
      }
    };

    const speed = isDeleting ? 40 : 80;
    const timer = setTimeout(handleTyping, speed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, index, isPaused]);

  const CurrentIcon = titles[index].Icon;

  return (
    <div className="flex items-center gap-3 h-8">
      <motion.div
        key={index}
        initial={{ opacity: 0, scale: 0.8, rotate: -20 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        exit={{ opacity: 0, scale: 0.8, rotate: 20 }}
        className={cn("p-1.5 rounded-lg bg-white/5 border border-white/10 shadow-lg", titles[index].color)}
      >
        <CurrentIcon className="text-xl md:text-2xl" />
      </motion.div>
      <div className="relative flex items-center">
        <span className="text-xl md:text-2xl font-bold text-pink-400 tracking-tight">
          {displayText}
        </span>
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
          className="ml-2 w-[3px] h-7 bg-pink-500"
        />
      </div>
    </div>
  );
};

export function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [particles, setParticles] = useState<{ duration: number; delay: number; left: string; top: string }[]>([]);

  useEffect(() => {
    setMounted(true);
    const particleCount = window.innerWidth < 768 ? 5 : 10;
    const newParticles = [...Array(particleCount)].map(() => ({
      duration: 15 + Math.random() * 10,
      delay: Math.random() * 10,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
    }));
    setParticles(newParticles);
  }, []);

  const orbitIcons = [
    { Icon: SiReact, color: 'text-cyan-400' },
    { Icon: SiJavascript, color: 'text-yellow-400' },
    { Icon: SiNodedotjs, color: 'text-green-500' },
    { Icon: SiExpress, color: 'text-gray-400' },
    { Icon: SiMongodb, color: 'text-green-600' },
    { Icon: SiMongoose, color: 'text-red-500' },
    { Icon: SiMysql, color: 'text-blue-400' },
    { Icon: SiBootstrap, color: 'text-purple-500' },
    { Icon: SiHtml5, color: 'text-orange-500' },
    { Icon: SiCss3, color: 'text-blue-500' },
    { Icon: SiGit, color: 'text-orange-600' },
  ];

  const innerOrbitIcons = orbitIcons.slice(0, 5);
  const outerOrbitIcons = orbitIcons.slice(5);

  const skillTags = [
    "Responsive Design", "Clean Code", "UI/UX Focused", "Fast Learner", "MERN Stack"
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative py-20 md:py-32 overflow-hidden flex items-center justify-center bg-[#030014]"
    >
      {/* Immersive Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 overflow-hidden opacity-30 text-xs">
          {mounted && particles.map((particle, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-pink-500 rounded-full blur-[2px]"
              animate={{
                y: [0, -1000],
                opacity: [0, 0.5, 0],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                delay: particle.delay,
                ease: "linear",
              }}
              style={{
                left: particle.left,
                top: particle.top,
                willChange: 'transform, opacity'
              }}
            />
          ))}
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-pink-600/5 blur-[120px] rounded-full" />
      </div>

      <div className="container-custom relative z-10 w-full px-6 md:px-12">
        {/* Mobile Header (Visible only on mobile) */}
        <div className="lg:hidden text-center mb-16">
          <div className="flex flex-col items-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-white via-pink-400 to-pink-600 bg-clip-text text-transparent">
              About Me
            </h2>
            <motion.div
              className="h-[3px] bg-gradient-to-r from-pink-500 via-pink-400 to-transparent rounded-full shadow-[0_0_20px_rgba(var(--theme-primary),)]"
              initial={{ width: 0, opacity: 0.6 }}
              whileInView={{
                width: "120px",
                opacity: 1,
              }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            />
          </div>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center">

          {/* LEFT SIDE: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center lg:items-start space-y-8 text-center lg:text-left order-2 lg:order-1"
          >
            {/* Desktop Heading (Hidden on mobile) */}
            <div className="hidden lg:flex flex-col items-start space-y-4">
              <h2 className="text-4xl md:text-6xl font-black bg-gradient-to-r from-white via-pink-400 to-pink-600 bg-clip-text text-transparent w-fit">
                About Me
              </h2>
              <motion.div
                className="h-[3px] bg-gradient-to-r from-pink-500 via-pink-400 to-transparent rounded-full shadow-[0_0_20px_rgba(var(--theme-primary),)]"
                initial={{ width: 0, opacity: 0.6 }}
                whileInView={{
                  width: "140px",
                  opacity: [0.6, 1, 0.6],
                  boxShadow: [
                    "0 0 10px rgba(var(--theme-primary),)",
                    "0 0 30px rgba(var(--theme-primary),)",
                    "0 0 10px rgba(var(--theme-primary),)"
                  ]
                }}
                viewport={{ once: true }}
                transition={{
                  width: { duration: 1, delay: 0.2 },
                  opacity: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
                  boxShadow: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
                }}
              />
            </div>

            {/* Typewriter */}
            <div className="py-2">
              <LoopingTypewriter />
            </div>

            {/* Description Paragraphs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-6 text-slate-200 text-lg leading-relaxed max-w-xl font-medium"
            >
              <p>
                Passionate about web development with a focus on creating <span className="text-pink-400 font-bold drop-shadow-[0_0_10px_rgba(var(--theme-primary),)]">highly scalable</span>
                &nbsp;and <span className="text-white font-bold underline decoration-pink-500/30">intuitive interfaces</span>. I thrive on solving complex problems
                through clean, elegant code and modern technology.
              </p>
              <p>
                As a <span className="text-pink-400 font-bold italic">specialized MERN Stack Developer</span>, I am dedicated to building professional digital products
                that balance performance with <span className="text-pink-500 font-black">high-end aesthetics</span>.
              </p>
            </motion.div>

            {/* Skill Tags */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap gap-3 justify-center lg:justify-start max-w-xl"
            >
              {skillTags.map((skill, i) => (
                <motion.span
                  key={i}
                  whileHover={{
                    y: -4,
                    scale: 1.05,
                    backgroundColor: "rgba(var(--theme-primary),)",
                    borderColor: "rgba(var(--theme-primary),)",
                  }}
                  className="px-4 py-2 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest bg-white/[0.03] border border-white/10 text-slate-200 backdrop-blur-md cursor-default transition-all"
                >
                  {skill}
                </motion.span>
              ))}
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
              className="pt-4"
            >
              <button
                onClick={() => scrollToSection('contact')}
                className="group relative px-8 py-4 rounded-full font-bold text-sm text-white overflow-hidden transition-all duration-300 shadow-[0_0_20px_rgba(var(--theme-primary),)] hover:shadow-[0_0_30px_rgba(var(--theme-primary),)]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-pink-500 transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl bg-pink-400" />
                <span className="relative z-10 flex items-center gap-2">
                  Let&apos;s Work Together <FaChevronRight className="group-hover:translate-x-1 transition-transform text-xs" />
                </span>
              </button>
            </motion.div>

          </motion.div>

          {/* RIGHT SIDE: Profile Image + Tech Orbit */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative flex justify-center items-center order-1 lg:order-2 min-h-[400px] lg:min-h-[600px] w-full"
          >
            {/* Soft Glow behind image */}
            <div className="absolute w-[200px] h-[200px] md:w-[260px] md:h-[260px] bg-pink-500/30 blur-[80px] rounded-full" />

            {/* Inner Orbit */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute w-[240px] h-[240px] md:w-[340px] md:h-[340px] border border-white/10 rounded-full flex items-center justify-center"
            >
              {innerOrbitIcons.map((item, i) => {
                const angle = (i / innerOrbitIcons.length) * 360;
                return (
                  <div
                    key={i}
                    className="absolute w-full h-full flex items-center justify-center pointer-events-none"
                    style={{ transform: `rotate(${angle}deg)` }}
                  >
                    <div className="pointer-events-auto absolute -translate-y-[120px] md:-translate-y-[170px] w-10 h-10 flex items-center justify-center bg-[#030014]/60 backdrop-blur-md rounded-full border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.05)] hover:scale-110 transition-transform">
                      <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                        className="w-full h-full flex items-center justify-center"
                      >
                        <div style={{ transform: `rotate(-${angle}deg)` }} className="flex items-center justify-center">
                          <item.Icon className={cn("text-xl md:text-2xl drop-shadow-[0_0_8px_currentColor]", item.color)} />
                        </div>
                      </motion.div>
                    </div>
                  </div>
                );
              })}
            </motion.div>

            {/* Outer Orbit */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute w-[300px] h-[300px] md:w-[420px] md:h-[420px] border border-white/5 rounded-full flex items-center justify-center"
            >
              {outerOrbitIcons.map((item, i) => {
                const angle = (i / outerOrbitIcons.length) * 360;
                return (
                  <div
                    key={i}
                    className="absolute w-full h-full flex items-center justify-center pointer-events-none"
                    style={{ transform: `rotate(${angle}deg)` }}
                  >
                    <div className="pointer-events-auto absolute -translate-y-[150px] md:-translate-y-[210px] w-12 h-12 flex items-center justify-center bg-[#030014]/60 backdrop-blur-md rounded-full border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.05)] hover:scale-110 transition-transform">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                        className="w-full h-full flex items-center justify-center"
                      >
                        <div style={{ transform: `rotate(-${angle}deg)` }} className="flex items-center justify-center">
                          <item.Icon className={cn("text-xl md:text-2xl drop-shadow-[0_0_8px_currentColor]", item.color)} />
                        </div>
                      </motion.div>
                    </div>
                  </div>
                );
              })}
            </motion.div>

            {/* Profile Image */}
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-10 w-[180px] h-[180px] md:w-[260px] md:h-[260px] rounded-full p-1.5 md:p-2 bg-gradient-to-tr from-pink-600 via-purple-600 to-cyan-500 shadow-[0_0_40px_rgba(var(--theme-primary),)]"
            >
              <div className="w-full h-full rounded-full overflow-hidden border-4 border-[#030014] relative bg-[#030014]">
                <Image
                  src="/profile-about.jpeg"
                  alt="Profile"
                  fill
                  sizes="(max-width: 768px) 180px, 260px"
                  className="object-cover hover:scale-110 transition-transform duration-500"
                  priority
                />
              </div>
            </motion.div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
