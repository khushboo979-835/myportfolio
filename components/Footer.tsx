'use client';

import Link from 'next/link';
import { FaPhoneAlt, FaWhatsapp, FaChevronUp, FaArrowRight } from 'react-icons/fa';
import { motion } from 'framer-motion';
import VisitorCounter from './VisitorCounter';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative mt-20 pb-8 overflow-hidden bg-[#030014]">
      {/* Wave/Divider Decor */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-pink-500/20 to-transparent" />

      {/* Background Ambient Glows */}
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-pink-600/10 blur-[120px] rounded-full" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-600/10 blur-[120px] rounded-full" />

      <div className="container-custom relative z-10">
        {/* Top Section: CTA "The Bridge" */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative mb-20 p-px rounded-[2rem] overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-indigo-500/20 group-hover:via-pink-500/40 opacity-50 transition-all duration-500" />
          <div className="relative bg-[#0b0c10]/95 backdrop-blur-3xl rounded-[2rem] p-8 sm:p-12 flex flex-col sm:flex-row items-center justify-between gap-8 border border-white/5">
            <div className="max-w-md text-center sm:text-left">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight">
                Ready to bring your <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">next idea to life?</span>
              </h2>
              <p className="text-slate-400">Let's build something extraordinary together.</p>
            </div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="#contact"
                className="group relative inline-flex items-center gap-3 bg-white text-black px-8 py-4 rounded-2xl font-bold transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]"
              >
                Say Hello
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Middle Section: Meta Info */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-12 mb-16 px-4">
          {/* Logo & About */}
          <div className="sm:col-span-5 space-y-6">
            <div className="inline-block">
              <h3 className="text-4xl font-bold tracking-tighter text-white">
                K<span className="text-pink-500">.</span>
              </h3>
              <div className="h-1 w-full bg-gradient-to-r from-pink-500 to-transparent mt-1" />
            </div>
            <p className="text-slate-400 text-lg leading-relaxed max-w-sm">
              Creating digital experiences that merge <span className="text-white">innovation</span> with <span className="text-white">aesthetics</span>. Always pushing the boundaries of web development.
            </p>
          </div>

          {/* Connect Zone */}
          <div className="sm:col-span-4 space-y-6">
            <h4 className="text-xs font-bold uppercase tracking-[0.3em] text-pink-500/80">Connect</h4>
            <div className="flex flex-wrap gap-4">
              {[
                {
                  icon: FaPhoneAlt,
                  href: 'tel:+917857023438',
                  label: 'Phone',
                  glowColor: 'bg-blue-500',
                  borderColor: 'border-white/10 group-hover:border-blue-500/50',
                  textColor: 'text-slate-300 group-hover:text-blue-400',
                },
                {
                  icon: FaWhatsapp,
                  href: 'https://wa.me/917857023438',
                  label: 'WhatsApp',
                  glowColor: 'bg-green-500',
                  borderColor: 'border-white/10 group-hover:border-green-500/50',
                  textColor: 'text-slate-300 group-hover:text-green-400',
                },
              ].map((social, idx) => (
                <motion.div key={idx} whileHover={{ y: -5 }}>
                  <Link
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group relative flex items-center gap-4 px-6 py-4 rounded-2xl bg-[#0b0c10]/80 backdrop-blur-xl border ${social.borderColor} transition-all duration-500 overflow-hidden shadow-lg hover:shadow-[0_8px_30px_rgb(0,0,0,0.5)]`}
                  >
                    {/* Inner Hover Glows */}
                    <div className="absolute inset-0 pointer-events-none z-0 mix-blend-screen">
                      <div className={`absolute -top-10 -right-10 w-28 h-28 ${social.glowColor} blur-[40px] rounded-full opacity-0 group-hover:opacity-40 transition-opacity duration-700 ease-out`} />
                      <div className={`absolute -bottom-10 -left-10 w-28 h-28 ${social.glowColor} blur-[40px] rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-700 ease-out delay-75`} />
                      <div className="absolute inset-0 shadow-[inset_0_0_0px_rgba(255,255,255,0)] group-hover:shadow-[inset_0_0_20px_rgba(255,255,255,0.05)] transition-shadow duration-700" />
                    </div>

                    <div className="relative z-10 flex items-center gap-4 w-full">
                      <div className={`p-2.5 rounded-xl bg-white/5 border border-white/10 group-hover:bg-transparent group-hover:border-transparent ${social.textColor} transition-all duration-500`}>
                        <social.icon size={18} className="group-hover:scale-110 transition-transform duration-500" />
                      </div>
                      <span className={`text-sm font-bold tracking-wide ${social.textColor} transition-colors duration-500`}>{social.label}</span>
                    </div>

                    {/* Gloss / Light sweep */}
                    <div className="absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-20deg] group-hover:animate-[shimmer_2s_infinite] pointer-events-none" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Quick Nav / Meta */}
          <div className="sm:col-span-3 flex flex-col space-y-6 sm:items-end">
            <h4 className="text-xs font-bold uppercase tracking-[0.3em] text-pink-500/80">Status</h4>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-[10px] font-bold text-green-500 uppercase">Available for Hire</span>
            </div>
            <motion.button
              onClick={scrollToTop}
              whileHover={{ y: -3 }}
              className="group flex items-center justify-center w-12 h-12 rounded-full bg-white/5 border border-white/10 hover:border-pink-500 transition-all duration-300"
              aria-label="Back to top"
            >
              <FaChevronUp className="text-slate-400 group-hover:text-pink-500 transition-colors" />
            </motion.button>
          </div>
        </div>

        {/* Bottom Section: Footer Meta */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6 opacity-60 hover:opacity-100 transition-opacity duration-500">
          <div className="flex flex-col sm:flex-row items-center gap-4 lg:gap-8">
            <div className="flex items-center gap-4 text-[11px] font-bold uppercase tracking-widest text-slate-500">
              <span>© {currentYear} Khushboo Kumari</span>
              <span className="w-1 h-1 bg-slate-700 rounded-full" />
              <span>All rights reserved</span>
            </div>
            <VisitorCounter />
          </div>

          <div className="flex items-center gap-3 text-[10px] text-slate-500 font-bold tracking-widest uppercase">
            Built with
            <span className="px-2 py-1 rounded bg-white/5 border border-white/10 text-pink-400">Next.js</span>
            <span className="px-2 py-1 rounded bg-white/5 border border-white/10 text-purple-400">Framer Motion</span>
          </div>
        </div>
      </div>
    </footer>
  );
}