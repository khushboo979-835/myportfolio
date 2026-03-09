'use client';

import * as React from 'react';
import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState('Home');
  const [hoveredTab, setHoveredTab] = React.useState<string | null>(null);

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id.replace('#', ''));
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsOpen(false);
    // Extract name from href for active state
    const item = navItems.find(item => item.href === id);
    if (item) setActiveTab(item.name);
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-500",
        scrolled ? "py-2 sm:py-4" : "py-4 sm:py-8"
      )}
    >
      {/* Glow Effect Background Layer */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-24 bg-pink-600/20 blur-[120px] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-24 bg-purple-600/10 blur-[100px] pointer-events-none delay-700" />

      <nav className={cn(
        "relative flex items-center h-14 sm:h-16 px-4 sm:px-10 rounded-full transition-all duration-500 ease-in-out",
        "backdrop-blur-xl border border-white/10 shadow-2xl",
        scrolled
          ? "w-[94%] sm:w-[90%] max-w-5xl bg-black/40 border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
          : "w-[96%] sm:w-[94%] max-w-7xl bg-white/5 border-white/10"
      )}>
        {/* Branding (Left) */}
        <div className="flex-1 flex items-center justify-start">
          <Link
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('#home');
            }}
            className="group relative flex items-center gap-2"
          >
            <span className="text-xl sm:text-2xl font-bold tracking-tight text-white transition-all duration-300 group-hover:text-pink-400">
              My <span className="text-pink-500">Portfolio</span>
            </span>
            <motion.div
              className="absolute -bottom-1 left-0 h-[2px] bg-gradient-to-r from-pink-500 to-purple-500 shadow-[0_0_10px_rgb(var(--theme-primary))]"
              initial={{ width: 0 }}
              whileHover={{ width: '100%' }}
              transition={{ duration: 0.3 }}
            />
          </Link>
        </div>

        {/* Navigation (Center) */}
        <div className="hidden sm:flex items-center justify-center flex-[2]">
          <div className="flex items-center gap-2 px-2 py-1 bg-white/5 rounded-full border border-white/5">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onMouseEnter={() => setHoveredTab(item.name)}
                onMouseLeave={() => setHoveredTab(null)}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.href);
                }}
                className={cn(
                  "relative px-5 py-2 text-sm font-medium transition-colors duration-300",
                  activeTab === item.name ? "text-white" : "text-white/60 hover:text-white"
                )}
              >
                {/* Active Indicator (Neon Glow) */}
                {activeTab === item.name && (
                  <motion.div
                    layoutId="active-nav"
                    className="absolute inset-x-0 -bottom-1 h-0.5 bg-pink-500 shadow-[0_0_12px_rgb(var(--theme-primary))] rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}

                {/* Hover Slide Underline */}
                {hoveredTab === item.name && activeTab !== item.name && (
                  <motion.div
                    layoutId="hover-nav"
                    className="absolute inset-0 bg-white/5 rounded-full -z-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  />
                )}

                <span className="relative z-10">{item.name}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Actions (Right) */}
        <div className="flex-1 flex items-center justify-end gap-2 sm:gap-4">
          <ThemeToggle />

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection('#contact')}
            className="hidden sm:flex group relative px-6 py-2.5 overflow-hidden rounded-full font-semibold text-sm transition-all duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 transition-all duration-300 group-hover:opacity-90" />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl bg-gradient-to-r from-pink-400 to-purple-400" />
            <span className="relative z-10 text-white">Hire Me</span>
          </motion.button>

          {/* Mobile Menu Trigger */}
          <button
            className="sm:hidden relative z-50 p-2 text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="w-6 h-5 flex flex-col justify-between items-end">
              <motion.span
                animate={isOpen ? { rotate: 45, y: 9, width: '100%' } : { rotate: 0, y: 0, width: '100%' }}
                className="h-0.5 bg-white rounded-full transition-all origin-right"
              />
              <motion.span
                animate={isOpen ? { opacity: 0, x: 20 } : { opacity: 1, x: 0 }}
                className="h-0.5 w-2/3 bg-pink-400 rounded-full transition-all shadow-[0_0_8px_rgb(var(--theme-primary))]"
              />
              <motion.span
                animate={isOpen ? { rotate: -45, y: -9, width: '100%' } : { rotate: 0, y: 0, width: '100%' }}
                className="h-0.5 bg-white rounded-full transition-all origin-right"
              />
            </div>
          </button>
        </div>

        {/* Mobile Dropdown Panel */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="absolute top-20 left-0 right-0 mx-4 p-6 rounded-3xl bg-black/80 backdrop-blur-2xl border border-white/10 shadow-2xl sm:hidden flex flex-col gap-4"
            >
              {navItems.map((item, idx) => (
                <motion.button
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className={cn(
                    "text-left text-lg font-medium py-3 px-4 rounded-2xl transition-all duration-300",
                    activeTab === item.name ? "bg-white/10 text-pink-400" : "text-white/70 hover:bg-white/5 hover:text-white"
                  )}
                >
                  {item.name}
                </motion.button>
              ))}
              <button
                onClick={() => scrollToSection('#contact')}
                className="mt-2 w-full py-4 rounded-2xl bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold shadow-lg shadow-pink-500/20"
              >
                Hire Me
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}
