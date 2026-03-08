'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { cn } from '@/lib/utils';
import { FaGraduationCap } from 'react-icons/fa';

const education = [
  {
    degree: 'MCA – Master of Computer Applications',
    institution: 'Patna Women’s College, Patna',
    year: '2024 – 2026',
    grade: 'CGPA: 8.21',
    current: true,
    description: 'Specializing in Advanced Software Development and Cloud Computing.',
    color: 'from-fuchsia-500 to-pink-500',
    glowColor: 'rgba(217, 70, 239, 0.6)' // fuchsia-500
  },
  {
    degree: 'BCA – Bachelor of Computer Applications',
    institution: 'TPS College, Patna',
    year: '2021 – 2024',
    grade: 'CGPA: 7.95',
    description: 'Foundation in Computer Science, Data Structures, and Web Technologies.',
    color: 'from-pink-500 to-purple-500',
    glowColor: 'rgba(236, 72, 153, 0.6)' // pink-500
  },
  {
    degree: 'Higher Secondary (Science)',
    institution: 'Ganga Devi Mahila Mahavidyalaya, Patna',
    year: '2019 – 2021',
    grade: '65%',
    description: 'Focus on Mathematics and Physics with Computer Science electives.',
    color: 'from-purple-500 to-indigo-500',
    glowColor: 'rgba(var(--theme-secondary),)' // purple-500
  },
  {
    degree: 'Secondary Education',
    institution: 'Vidya Niketan Girls School, Patna',
    year: '2019',
    grade: '72%',
    description: 'Completed secondary schooling with distinction in Science and Math.',
    color: 'from-indigo-500 to-violet-500',
    glowColor: 'rgba(99, 102, 241, 0.6)' // indigo-500
  }
];

const BookOutlineCard = ({ item, index }: { item: typeof education[0]; index: number }) => {
  const isLeft = index % 2 === 0;

  // 3D Hover setup
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className="relative w-full mb-16 md:mb-24 perspective-[2000px] flex md:block flex-col">

      {/* TIMELINE NODE */}
      <div className="absolute left-[20px] md:left-1/2 md:-translate-x-1/2 top-1/2 -translate-y-1/2 flex items-center justify-center z-30">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          className="relative flex items-center justify-center w-10 h-10"
        >
          {/* TIMELINE DOTS */}
          <motion.div
            animate={{
              boxShadow: [
                `0 0 20px ${item.glowColor}`,
                `0 0 40px ${item.glowColor}`,
                `0 0 20px ${item.glowColor}`
              ]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-8 h-8 rounded-full bg-[#030014] border-2 border-fuchsia-500 flex items-center justify-center z-10 relative"
          >
            <div className={`w-3 h-3 rounded-full bg-gradient-to-tr ${item.color}`} />
          </motion.div>

          <motion.div
            animate={{ scale: [1, 2], opacity: [0.8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
            className={`absolute inset-0 rounded-full border border-fuchsia-500`}
          />
        </motion.div>
      </div>

      {/* BOOK OUTLINE CARD */}
      <div className={cn(
        "relative z-20 w-full pl-[50px] md:pl-0 md:w-1/2 flex",
        isLeft
          ? "md:ml-0 md:mr-auto justify-end md:pr-12 lg:pr-20"
          : "md:mr-0 md:ml-auto justify-start md:pl-12 lg:pl-20"
      )}>
        <motion.div
          initial={{
            opacity: 0,
            x: isLeft ? -50 : 50,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{
            duration: 1.0,
            type: "spring",
            bounce: 0.3,
            delay: index * 0.1
          }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
            transformOrigin: "center center"
          }}
          className="relative group w-[90%] sm:max-w-[400px] md:max-w-[420px] lg:max-w-[480px] min-h-[380px] flex items-center justify-center p-6 md:p-10 cursor-default mx-auto md:mx-0"
        >

          {/* THE SPIRAL LADDER LINE (ATTACHED DIRECTLY TO BOOK BOUNDARY) */}
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: "100%", opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className={cn(
              "absolute top-[50%] -translate-y-[50%] h-[2px] bg-gradient-to-r z-0",
              isLeft
                ? "left-[100%] origin-left from-fuchsia-500 to-transparent w-[0px] md:w-[3rem] lg:w-[5rem] hidden md:block"
                : "right-[100%] origin-right from-transparent to-fuchsia-500 w-[20px] md:w-[3rem] lg:w-[5rem]"
            )}
            style={{ boxShadow: `0 0 10px ${item.glowColor}` }}
          />

          {/* THE BOOK BORDER SHAPE / SVG GLOW OUTLINE */}
          <div className="absolute inset-0 pointer-events-none drop-shadow-[0_0_15px_rgba(217,70,239,0.5)] group-hover:drop-shadow-[0_0_30px_rgba(217,70,239,0.8)] transition-all duration-700">
            <svg
              className="w-full h-full"
              viewBox="0 0 400 360"
              preserveAspectRatio="none"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id={`bookGradient-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#d946ef" />  {/* fuchsia-500 */}
                  <stop offset="50%" stopColor="rgb(var(--theme-tertiary))" /> {/* pink-500 */}
                  <stop offset="100%" stopColor="rgb(var(--theme-secondary))" /> {/* purple-500 */}
                </linearGradient>

                <linearGradient id={`bookOuterGradient-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f59e0b" />  {/* amber-500 */}
                  <stop offset="50%" stopColor="#f97316" /> {/* orange-500 */}
                  <stop offset="100%" stopColor="#f59e0b" /> {/* amber-500 */}
                </linearGradient>

                <clipPath id={`sweepMask-${index}`}>
                  <motion.rect
                    initial={{ x: "-100%", y: 0, width: "100%", height: "100%" }}
                    animate={{ x: "200%" }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  />
                </clipPath>
              </defs>

              {/* The Static Glowing Book Path (Double Layer - Inner Line) */}
              <path
                d="M 20,40 Q 100,20 200,50 Q 300,20 380,40 L 380,320 Q 300,340 200,310 Q 100,340 20,320 Z"
                stroke={`url(#bookGradient-${index})`}
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="opacity-50 group-hover:opacity-80 transition-opacity duration-500"
              />

              {/* The Static Glowing Book Path (Double Layer - Outer Neon) */}
              <path
                d="M 10,30 Q 100,10 200,40 Q 300,10 390,30 L 390,330 Q 300,350 200,320 Q 100,350 10,330 Z"
                stroke={`url(#bookOuterGradient-${index})`}
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="opacity-70 group-hover:opacity-100 group-hover:drop-shadow-[0_0_25px_rgba(249,115,22,0.9)] transition-all duration-500"
              />

              {/* The Animated Sweep Path on Hover (Outer Neon) */}
              <path
                d="M 10,30 Q 100,10 200,40 Q 300,10 390,30 L 390,330 Q 300,350 200,320 Q 100,350 10,330 Z"
                stroke="white"
                strokeWidth="7"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-[0_0_20px_white]"
                clipPath={`url(#sweepMask-${index})`}
              />
            </svg>
          </div>

          {/* Under-Card Soft Shadow (Depth) */}
          <div className="absolute inset-8 bg-fuchsia-500/0 group-hover:bg-fuchsia-500/5 blur-[50px] transition-colors duration-700 rounded-full translate-y-10 -z-10" />

          {/* CONTENT (Inside the dark empty book) */}
          <div className="relative z-10 w-full transform-gpu transition-transform duration-300 group-hover:translate-z-[30px] pt-8 pb-16 px-4 md:px-8">

            {/* Header Info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-fuchsia-500/10 border border-fuchsia-500/20">
                <FaGraduationCap className={`text-lg text-fuchsia-400`} />
                <span className="text-xs font-bold text-fuchsia-200/90 tracking-wider">
                  {item.year}
                </span>
              </div>

              <div className={`px-4 py-1.5 rounded-lg border border-fuchsia-500/20 bg-gradient-to-r ${item.color} bg-opacity-10 shadow-[0_0_15px_rgba(217,70,239,0.15)]`}>
                <span className="text-sm font-black text-white whitespace-nowrap drop-shadow-[0_0_5px_rgba(236,72,153,0.8)]">
                  {item.grade}
                </span>
              </div>
            </div>

            {/* Title & Institution */}
            <div className="space-y-2 mb-4">
              <h3 className="text-xl md:text-2xl font-black text-white leading-tight drop-shadow-md">
                {item.degree}
              </h3>
              <div className="flex items-center gap-3">
                <div className={`w-6 h-[2px] bg-gradient-to-r ${item.color}`} />
                <p className="text-sm font-bold text-fuchsia-200/80 uppercase tracking-widest">
                  {item.institution}
                </p>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-slate-400 leading-relaxed font-medium">
              {item.description}
            </p>

            {/* Active Pursuit Indicator */}
            {item.current && (
              <motion.div
                initial={{ opacity: 0.5 }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="mt-5 flex items-center gap-2"
              >
                <div className="w-2 h-2 rounded-full bg-pink-400 shadow-[0_0_8px_rgb(var(--theme-tertiary))]" />
                <span className="text-[10px] font-bold text-pink-400 uppercase tracking-widest">
                  Currently Pursuing
                </span>
              </motion.div>
            )}
          </div>

        </motion.div>
      </div>

      {/* spacer to force the book purely on one side of timeline on md+ screens */}
      <div className="hidden md:block md:w-1/2" />
    </div>
  );
};

export function Education() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const timelineHeight = useTransform(scrollYProgress, [0, 0.8], ["0%", "100%"]);

  return (
    <section
      id="education"
      ref={containerRef}
      className="relative py-32 overflow-hidden bg-[#030014] perspective-[1000px]"
    >
      {/* Subtle Background Glows (Dimmed to keep book focus) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-amber-600/5 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-orange-600/5 blur-[120px] rounded-full mix-blend-screen" />
      </div>

      <div className="container-custom relative z-10 px-4 md:px-6 max-w-6xl mx-auto">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center mb-24 md:mb-32 text-center"
        >
          <div className="inline-flex items-center justify-center p-2 mb-4 rounded-full bg-amber-500/5 border border-amber-500/20 backdrop-blur-sm shadow-[0_0_15px_rgba(245,158,11,0.2)]">
            <FaGraduationCap className="text-amber-500 text-xl mx-2" />
            <span className="text-xs font-bold text-amber-200 tracking-[0.3em] uppercase pr-3">Academic Journey</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black bg-gradient-to-r from-white via-amber-200 to-orange-500 bg-clip-text text-transparent pb-2">
            My Education
          </h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "120px" }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className="h-[3px] bg-gradient-to-r from-transparent via-amber-500 to-transparent mt-6 shadow-[0_0_15px_rgba(245,158,11,0.5)]"
          />
        </motion.div>

        {/* Timeline Container */}
        <div className="relative w-full">

          {/* Central Glowing Timeline Line */}
          <div className="absolute left-[38px] md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[2px] bg-white/5 overflow-hidden">
            <motion.div
              className="absolute top-0 w-full bg-gradient-to-b from-amber-500 via-orange-500 to-amber-500"
              style={{ height: timelineHeight, boxShadow: "0 0 15px rgba(245,158,11,0.8)" }}
            />
          </div>

          <div className="py-10">
            {education.map((item, index) => (
              <BookOutlineCard key={index} item={item} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
