'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { FaLinkedin, FaTwitter, FaGithub, FaServer } from 'react-icons/fa';
import { SiReact, SiMongodb } from 'react-icons/si';
import { cn } from '@/lib/utils';

const titles = [
  { text: "Frontend Developer", Icon: SiReact, color: "text-pink-400" },
  { text: "Backend Developer", Icon: FaServer, color: "text-purple-400" },
  { text: "MERN Stack Developer", Icon: SiMongodb, color: "text-pink-600" },
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
    <div className="flex items-center gap-3 min-h-[40px] flex-wrap">
      <motion.div
        key={index}
        initial={{ opacity: 0, scale: 0.8, rotate: -20 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        exit={{ opacity: 0, scale: 0.8, rotate: 20 }}
        className={cn("p-2 rounded-xl bg-white/5 border border-white/10 shadow-xl shrink-0", titles[index].color)}
      >
        <CurrentIcon className="text-xl md:text-3xl" />
      </motion.div>
      <div className="relative flex items-center min-w-0">
        <span className="text-lg md:text-2xl font-semibold text-pink-400 tracking-tight whitespace-normal break-words">
          {displayText}
        </span>
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
          className="ml-2 w-[3px] h-6 md:h-7 bg-pink-500 shrink-0"
        />
      </div>
    </div>
  );
};

export function Hero() {
  const [activeSocial, setActiveSocial] = useState<number | null>(null);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const socialLinks = [
    {
      icon: FaLinkedin,
      href: "https://www.linkedin.com/in/khushboo-kumari-37531a298",
      color: "hover:text-[#0077b5] hover:border-[#0077b5]/50 hover:bg-[#0077b5]/10 hover:shadow-[0_0_20px_rgba(0,119,181,0.3)]",
      activeColor: "text-[#0077b5] border-[#0077b5]/50 bg-[#0077b5]/10 shadow-[0_0_20px_rgba(0,119,181,0.3)]"
    },
    {
      icon: FaTwitter,
      href: "#",
      color: "hover:text-[#1DA1F2] hover:border-[#1DA1F2]/50 hover:bg-[#1DA1F2]/10 hover:shadow-[0_0_20px_rgba(29,161,242,0.3)]",
      activeColor: "text-[#1DA1F2] border-[#1DA1F2]/50 bg-[#1DA1F2]/10 shadow-[0_0_20px_rgba(29,161,242,0.3)]"
    },
    {
      icon: FaGithub,
      href: "https://github.com/khushbooyadav23074",
      color: "hover:text-white hover:border-white/50 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]",
      activeColor: "text-white border-white/50 bg-white/10 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
    }
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-32 md:pt-40 pb-32 overflow-hidden bg-black"
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            x: [-50, 50, -50],
            y: [-30, 30, -30],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-pink-500/10 blur-[140px] rounded-full"
        />
      </div>

      <div className="container-custom relative z-10 mx-auto">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col space-y-8"
          >
            <motion.h1
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 1,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.2
              }}
              className="text-5xl font-black leading-[1.1] text-white md:text-7xl lg:text-8xl tracking-tighter"
            >
              Hi, I&apos;m <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-pink-200 to-pink-500 relative inline-block">
                Khushboo Kumari
                <motion.div
                  className="absolute -bottom-2 left-0 h-1.5 bg-pink-500 shadow-[0_0_20px_rgb(var(--theme-primary))] rounded-full"
                  initial={{ width: 0 }}
                  animate={{
                    width: ['0%', '100%', '100%', '0%']
                  }}
                  transition={{
                    duration: 4,
                    delay: 1.2,
                    ease: "easeInOut",
                    repeat: Infinity,
                  }}
                />
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <LoopingTypewriter />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="text-lg md:text-xl text-slate-200 max-w-lg leading-relaxed font-medium"
            >
              I build <span className="text-pink-400 font-semibold">responsive web applications</span> with <span className="text-white font-bold underline decoration-pink-500/30">React, Next.js and MERN stack</span>. Currently leading team projects and working as a <span className="text-pink-400 font-semibold">Frontend Developer Intern</span> at <span className="text-pink-500 font-bold">Mecenza</span>.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap gap-6"
            >
              <button
                onClick={() => scrollToSection('projects')}
                className="group relative px-10 py-4 rounded-full bg-white text-black font-bold text-lg overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10 group-hover:text-white transition-colors duration-300">View Projects</span>
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="px-10 py-4 rounded-full bg-black border-2 border-pink-500/50 text-white font-bold text-lg hover:border-pink-500 hover:shadow-[0_0_30px_rgba(var(--theme-primary),)] backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95"
              >
                Contact Me
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="flex items-center gap-6"
            >
              {socialLinks.map((social, i) => (
                <Link
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setActiveSocial(i)}
                  className={cn(
                    "group relative w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 transition-all duration-300 hover:-translate-y-2",
                    social.color,
                    activeSocial === i && social.activeColor
                  )}
                >
                  <social.icon size={26} className="relative z-10" />
                </Link>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative flex justify-center items-center lg:justify-end"
          >
            <div className="relative w-64 h-64 md:w-[420px] md:h-[420px] flex items-center justify-center">

              {/* Synchronized Outer Pulse Ring - Snappier Fade-out */}
              <motion.div
                className="absolute inset-[-15px] rounded-full border-[2px] border-pink-500/60"
                style={{
                  boxShadow: '0 0 60px rgba(var(--theme-primary),)',
                }}
                animate={{
                  scale: [1, 1.15],
                  opacity: [1, 0]
                }}
                transition={{
                  duration: 0.5, // Faster fade (from 0.8s)
                  repeat: Infinity,
                  repeatDelay: 1.0, // Total 1.5s cycle (0.5s active + 1.0s hidden)
                  ease: "easeOut"
                }}
              />

              {/* Inner Glowing Ring - Continuous smooth rotation */}
              <motion.div
                className="absolute inset-[-12px] rounded-full border-[20px] border-transparent"
                style={{
                  background: 'conic-gradient(from 0deg, rgb(var(--theme-primary)) 0%, rgb(var(--theme-primary)) 20%, transparent 60%) border-box',
                  WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  WebkitMaskComposite: 'destination-out',
                  maskComposite: 'exclude',
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              />

              {/* Pulsing Ambient Glow */}
              <motion.div
                className="absolute inset-[-40px] rounded-full bg-pink-500/10 blur-[80px] -z-10"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Image Container */}
              <div className="relative w-full h-full rounded-full overflow-hidden border-[3px] border-white/10 z-10 shadow-[0_0_50px_rgba(0,0,0,0.8)]">
                <Image
                  src="/profile-hero.jpeg"
                  alt="Khushboo Kumari"
                  fill
                  sizes="(max-width: 768px) 100vw, 420px"
                  className="object-cover object-center transition-transform duration-700 hover:scale-110"
                  priority
                />

                {/* Subtle Glass Coating Overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-pink-500/10 pointer-events-none" />

                {/* Inner Shadow for Depth */}
                <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.5)] pointer-events-none" />
              </div>

              {/* Ambient Reflection below */}
              <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[80%] h-20 bg-pink-500/5 blur-[50px] rounded-full pointer-events-none" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Hero Bottom Fade */}
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black via-transparent to-transparent z-20 pointer-events-none" />
    </section>
  );
}
