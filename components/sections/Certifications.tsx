'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaAward } from 'react-icons/fa';
import Image from 'next/image';

interface CertificateCardProps {
  cert: any;
  idx: number;
  onClick: (cert: any) => void;
  isDimmed: boolean;
  onHover: (idx: number | null) => void;
}

function CertificateCard({ cert, idx, onClick, isDimmed, onHover }: CertificateCardProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePos({ x, y });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    onHover(idx);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    onHover(null);
  };

  const rotateX = isHovered ? (mousePos.y - 0.5) * -10 : 0;
  const rotateY = isHovered ? (mousePos.x - 0.5) * 10 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: (idx % 3) * 0.1, type: "spring", bounce: 0.3 }}
      animate={{
        scale: isHovered ? 1.05 : isDimmed ? 0.95 : 1,
        opacity: isDimmed ? 0.5 : 1,
      }}
      className="group relative cursor-pointer h-full perspective-1000 z-10 hover:z-20 backface-hidden will-change-transform transform-gpu"
      onClick={() => onClick(cert)}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        filter: isDimmed ? "blur(4px)" : "none"
      }}
    >
      {/* Outer Boundary - Beveled Frame Look */}
      <div className="relative p-[10px] md:p-[14px] rounded-[16px] bg-[#1a1b23] shadow-[0_15px_35px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.1)] border border-white/5 group-hover:shadow-[0_25px_60px_rgba(236,72,153,0.3)] h-full overflow-hidden">

        {/* Border Beam - Traveling Light Effect */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute inset-[-100%] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_300deg,rgb(var(--theme-tertiary))_330deg,rgb(var(--theme-secondary))_360deg)] opacity-40"
          />
        </div>

        {/* Floating Bubbles Masked to Outer Frame - Reduced count for performance */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <AnimatePresence>
            {isHovered && [...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  opacity: 0,
                  y: 150,
                  x: `${5 + Math.random() * 90}%`,
                  scale: 0
                }}
                animate={{
                  opacity: [0, 0.4, 0.8, 0.4, 0],
                  y: -300,
                  x: `${5 + Math.random() * 90 + (Math.random() - 0.5) * 40}%`,
                  scale: [0, 1 + Math.random() * 1.5, 1.5, 1, 0]
                }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 3 + Math.random() * 5,
                  repeat: Infinity,
                  delay: Math.random() * 3,
                  ease: "easeInOut"
                }}
                className="absolute w-1.5 h-1.5 rounded-full bg-gradient-to-t from-pink-500/30 to-purple-500/30 blur-[1px]"
              />
            ))}
          </AnimatePresence>
        </div>

        {/* Interactive Highlight Sweep */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none"
          style={{
            background: `radial-gradient(500px circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(236, 72, 153, 0.1), transparent 50%)`
          }}
        />

        {/* Inner Matting Area */}
        <div className="relative z-10 bg-[#0b0c10] rounded-[10px] p-4 md:p-6 border border-white/10 shadow-inner overflow-hidden h-full flex flex-col">

          {/* Inner Boundary - Decorative Gold/Silver Accents */}
          <div className="relative z-10 w-full aspect-[1.414/1] rounded-sm p-[3px] bg-gradient-to-br from-amber-400/40 via-transparent to-amber-600/40 shadow-lg group-hover:from-pink-500/40 group-hover:to-purple-500/40 transition-all duration-700 overflow-hidden">
            <div className="w-full h-full bg-[#0b0c10] overflow-hidden relative rounded-sm">
              {/* Premium Gloss sweep effect */}
              <div className="absolute inset-0 translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-[1200ms] bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[30deg] z-20" />

              <div className="relative w-full h-full">
                <Image
                  src={cert.image}
                  alt={cert.title}
                  fill
                  className="object-contain opacity-95 group-hover:opacity-100 transition-all duration-700 drop-shadow-2xl scale-[0.98] group-hover:scale-100"
                />
              </div>
            </div>

            {/* Verification Badge */}
            <div className="absolute top-2 -left-8 -rotate-45 bg-gradient-to-r from-pink-600 to-purple-700 text-white text-[8px] font-black py-1 px-10 text-center shadow-xl z-30 tracking-[0.2em] border-y border-white/20 whitespace-nowrap">
              VERIFIED
            </div>

            <div className="absolute bottom-2 right-2 z-30">
              <motion.div
                animate={isHovered ? { y: [0, -3, 0], scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-amber-200 via-yellow-500 to-amber-700 rounded-full flex items-center justify-center shadow-[0_5px_15px_rgba(0,0,0,0.4)] border border-white/20"
              >
                <FaAward className="text-lg md:text-xl text-white drop-shadow-md" />
              </motion.div>
            </div>
          </div>

          {/* Certificate Metadata */}
          <div className="mt-8 text-center flex-grow flex flex-col justify-center">
            <h3 className="text-slate-100 font-bold text-sm md:text-base group-hover:text-pink-300 transition-colors duration-300 tracking-[0.05em] uppercase leading-tight">
              {cert.title}
            </h3>
            <div className="flex items-center justify-center gap-3 my-4">
              <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-pink-500/50 group-hover:w-16 transition-all duration-700" />
              <div className="w-1.5 h-1.5 rounded-full bg-pink-500/30" />
              <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-pink-500/50 group-hover:w-16 transition-all duration-700" />
            </div>
            <p className="text-[10px] md:text-[11px] text-slate-400 font-bold tracking-[0.25em] uppercase">
              {cert.issuer}
            </p>
          </div>
        </div>

        {/* Frame Bevel Accents */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-white/10" />
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-black/40" />
        <div className="absolute top-0 left-0 w-[1px] h-full bg-white/10" />
        <div className="absolute top-0 right-0 w-[1px] h-full bg-black/40" />
      </div>
    </motion.div>
  );
}

export function Certifications() {
  const [certificates, setCertificates] = useState<any[]>([]);
  const [selectedCert, setSelectedCert] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  useEffect(() => {
    const fetchCerts = async () => {
      try {
        const res = await fetch('/api/certificates');
        const json = await res.json();
        if (json.success) {
          setCertificates(json.data);
        }
      } catch (error) {
        console.error('Failed to fetch certificates:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCerts();
  }, []);

  // Close modal on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedCert(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Helper to determine if a card should be dimmed based on row-specific focus
  const getIsDimmed = (idx: number) => {
    if (hoveredIdx === null) return false;
    if (hoveredIdx === idx) return false;

    // We assume 3 columns on desktop (lg), which is the primary focus of this request
    const cols = 3;
    const hoveredRow = Math.floor(hoveredIdx / cols);
    const currentRow = Math.floor(idx / cols);

    return hoveredRow === currentRow;
  };

  return (
    <section id="certifications" className="py-24 bg-[#030014] overflow-hidden relative min-h-screen">
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-pink-600/5 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-purple-600/5 blur-[100px] rounded-full mix-blend-screen" />
      </div>

      <div className="container-custom relative z-10 px-4 md:px-6 mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center mb-16 text-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/20 mb-4 shadow-[0_0_15px_rgba(236,72,153,0.15)]">
            <FaAward className="text-pink-400" />
            <span className="text-xs font-bold text-pink-300 tracking-wider uppercase">Achievements</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent pb-2 drop-shadow-sm">
            My Certifications
          </h2>
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className="h-[3px] w-20 bg-gradient-to-r from-transparent via-pink-500 to-transparent mt-6"
          />
        </motion.div>

        {/* Certificate Grid */}
        <div className="grid gap-12 md:gap-16 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mx-auto mt-10">
          {loading ? (
            [...Array(6)].map((_, i) => (
              <div key={i} className="aspect-[1.414/1] rounded-[24px] bg-white/5 animate-pulse border border-white/10" />
            ))
          ) : (
            certificates.map((cert, idx) => (
              <CertificateCard
                key={cert.id}
                cert={cert}
                idx={idx}
                onClick={setSelectedCert}
                isDimmed={getIsDimmed(idx)}
                onHover={setHoveredIdx}
              />
            ))
          )}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 bg-black/95 backdrop-blur-md cursor-pointer"
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              className="relative max-w-5xl w-full max-h-[90vh] flex items-center justify-center cursor-default z-[100]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full rounded-lg overflow-hidden border border-white/20 shadow-[0_0_50px_rgba(236,72,153,0.3)] bg-white aspect-[1.414/1]">
                <Image
                  src={selectedCert.image}
                  alt={selectedCert.title}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}