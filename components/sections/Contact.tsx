'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhoneAlt, FaWhatsapp, FaGithub, FaLinkedin } from 'react-icons/fa';
import Link from 'next/link';

export function Contact() {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = React.useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = React.useState('');
  const [fieldErrors, setFieldErrors] = React.useState<Record<string, string[]>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear errors when user types
    if (fieldErrors[e.target.name]) {
      const newErrors = { ...fieldErrors };
      delete newErrors[e.target.name];
      setFieldErrors(newErrors);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');
    setFieldErrors({});

    try {
      const res = await fetch('/api/contact/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        // Don't auto-reset success to idle too quickly if it was a success
      } else {
        setStatus('error');
        if (res.status === 405) {
          setErrorMessage('Method not allowed. This is likely a server configuration issue. Please reach out via WhatsApp/Email.');
        } else if (res.status >= 500) {
          setErrorMessage('Server error (Database connection failed). Please try again later or use alternative contact methods.');
        } else if (data.errors) {
          setFieldErrors(data.errors);
          setErrorMessage('Please fix the validation errors below.');
        } else if (data.isConfigError) {
          // Special handling for placeholder config
          setErrorMessage(data.error || 'Message service is in maintenance mode.');
          // We can still show success if it was saved to DB but mail failed
          setStatus('success');
          setFormData({ name: '', email: '', message: '' });
        } else {
          setErrorMessage(data.error || 'Failed to send message. Please try again.');
        }
      }
    } catch (error) {
      setStatus('error');
      setErrorMessage('Network error. Please check your connection and try again.');
    }
  };
  const contactInfo = [
    {
      icon: FaPhoneAlt,
      label: 'Phone',
      value: '+91 7857023438',
      href: 'tel:+917857023438',
      color: 'from-purple-500 to-indigo-500',
    },
    {
      icon: FaWhatsapp,
      label: 'WhatsApp',
      value: 'Chat on WhatsApp',
      href: 'https://wa.me/917857023438',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: FaEnvelope,
      label: 'Email',
      value: 'Khushbooyadav23074@gmail.com',
      href: 'mailto:Khushbooyadav23074@gmail.com',
      color: 'from-pink-500 to-rose-500',
    },
  ];

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-[#030014]">
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-pink-500/10 blur-[120px] rounded-full mix-blend-screen animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-600/10 blur-[120px] rounded-full mix-blend-screen animate-pulse delay-700" />
      </div>

      <div className="container-custom relative z-10 px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 mb-4 text-xs font-bold tracking-[0.2em] text-pink-400 uppercase rounded-full bg-pink-500/10 border border-pink-500/20 shadow-[0_0_15px_rgba(236,72,153,0.1)]">
            Connect
          </span>
          <h2 className="text-4xl md:text-6xl font-black mb-6">
            <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
              Get In Touch
            </span>
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-transparent via-pink-500 to-transparent mx-auto" />
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-5 items-start max-w-6xl mx-auto">
          {/* Contact Details - 2 Columns */}
          <div className="lg:col-span-2 space-y-6 order-2 lg:order-1">
            {contactInfo.map((info, idx) => (
              <motion.div
                key={info.label}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <Link
                  href={info.href}
                  target={info.href.startsWith('http') ? '_blank' : undefined}
                  rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="group relative flex items-center p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-pink-500/40 transition-all duration-500 overflow-hidden"
                >
                  {/* --- Professional Inner Glow on Hover --- */}
                  <div className="absolute inset-0 pointer-events-none z-0 rounded-2xl overflow-hidden mix-blend-screen">
                    {/* Top-Right Pink Glow */}
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-pink-500 blur-[40px] rounded-full opacity-0 group-hover:opacity-50 group-hover:translate-x-[-10px] group-hover:translate-y-[10px] transition-all duration-700 ease-out" />
                    {/* Bottom-Left Purple Glow */}
                    <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-500 blur-[40px] rounded-full opacity-0 group-hover:opacity-40 group-hover:translate-x-[10px] group-hover:translate-y-[-10px] transition-all duration-700 ease-out delay-75" />
                    {/* Inner Shadow Highlight */}
                    <div className="absolute inset-0 rounded-2xl shadow-[inset_0_0_0px_rgba(236,72,153,0)] group-hover:shadow-[inset_0_0_30px_rgba(236,72,153,0.15)] transition-shadow duration-700" />
                  </div>

                  <div className={`relative z-10 w-12 h-12 rounded-xl bg-gradient-to-br ${info.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                    <info.icon size={22} />
                  </div>
                  <div className="relative z-10 ml-5">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">{info.label}</p>
                    <p className="text-slate-200 group-hover:text-pink-300 transition-colors duration-500 font-medium">{info.value}</p>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-500 pointer-events-none" />
                </Link>
              </motion.div>
            ))}

            {/* Decorative Premium Element (Floating Glass Card) - Now visible on mobile and clickable */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="pt-4 pb-8 lg:pb-0"
            >
              <a
                href="mailto:Khushbooyadav23074@gmail.com"
                className="relative w-full aspect-square max-w-[180px] lg:max-w-[240px] mx-auto flex items-center justify-center cursor-pointer group/mail"
              >
                {/* Layered Orbital Rings */}
                <div className="absolute inset-0 border-[2px] border-dashed border-pink-500/20 rounded-full animate-[spin_35s_linear_infinite]" />
                <div className="absolute inset-4 border border-purple-500/30 rounded-full animate-[spin_25s_linear_infinite_reverse]" />

                <div className="absolute inset-1 rounded-full border border-white/5 overflow-hidden">
                  <motion.div
                    className="absolute inset-[15%] bg-gradient-to-tr from-pink-500/40 via-purple-500/40 to-transparent blur-3xl opacity-25"
                    animate={{ x: ['-100%', '100%'], y: ['-100%', '100%'] }}
                    transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                  />
                </div>

                <motion.div
                  animate={{
                    y: [0, -15, 0],
                    rotateX: [0, 8, 0, -8, 0],
                    rotateY: [0, 12, 0, -12, 0],
                  }}
                  transition={{
                    duration: 7,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="relative z-10 w-24 h-24 lg:w-36 lg:h-36 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center group overflow-hidden shadow-xl"
                  style={{ perspective: "1000px" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-purple-500/10 opacity-0 group-hover/mail:opacity-100 transition-opacity duration-500" />
                  <div className="absolute -inset-[100%] bg-gradient-to-r from-transparent via-white/10 to-transparent rotate-45 animate-[shimmer_5s_infinite]" />

                  <div className="relative">
                    <FaEnvelope className="text-5xl text-pink-400/90 filter drop-shadow-[0_0_15px_rgba(236,72,153,0.5)]" />
                    <FaEnvelope className="absolute inset-0 text-5xl text-white/20 blur-[1px]" />
                  </div>
                  <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
                </motion.div>

                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 rounded-full bg-indigo-400 blur-[0.5px]"
                    animate={{
                      y: [0, -80],
                      x: [0, (i % 2 === 0 ? 15 : -15)],
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0]
                    }}
                    transition={{
                      duration: 4 + i,
                      repeat: Infinity,
                      delay: i * 0.7,
                      ease: "easeOut"
                    }}
                    style={{
                      left: `${35 + (i * 8)}%`,
                      bottom: '25%'
                    }}
                  />
                ))}
                <div className="absolute inset-8 bg-gradient-to-r from-pink-500/20 to-purple-500/20 blur-[40px] lg:blur-[60px] rounded-full animate-pulse group-hover/mail:from-pink-500/40 group-hover/mail:to-purple-500/40 transition-colors duration-500" />
              </a>
            </motion.div>
          </div>

          {/* Form - 3 Columns */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3 order-1 lg:order-2"
          >
            <div className="group relative p-[2px] rounded-[32px] bg-white/5 h-full overflow-hidden shadow-2xl">
              <div className="absolute inset-[-100%] animate-[spin_8s_linear_infinite] bg-[conic-gradient(from_0deg_at_50%_50%,#f472b6_0%,rgb(var(--theme-secondary))_33%,#6366f1_66%,#f472b6_100%)] opacity-20 group-hover:opacity-100 transition-opacity duration-700" />

              <div className="bg-[#0b0c10] relative z-10 rounded-[30px] p-8 md:p-12 h-full overflow-hidden">

                {/* --- UNIQUE INNER GLOW EFFECTS (Hover to Emerge) --- */}
                <div className="absolute inset-0 pointer-events-none z-0 rounded-[30px] overflow-hidden mix-blend-screen">
                  {/* Top-Right Cyan/Blue Glow */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{
                      opacity: [0, 0.7, 0.4, 0.7, 0],
                      scale: [0.8, 1.2, 1, 1.2, 0.8],
                      x: [0, -30, 0]
                    }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-10 -right-10 w-48 h-48 bg-cyan-400 blur-[50px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  />
                  {/* Bottom-Left Green/Cyan Glow */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{
                      opacity: [0, 0.5, 0.8, 0.5, 0],
                      scale: [0.8, 1.4, 1.1, 1.4, 0.8],
                      x: [0, 40, 0]
                    }}
                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute -bottom-10 -left-10 w-56 h-56 bg-emerald-400 blur-[60px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  />
                  {/* Slow orbiting central wash */}
                  <motion.div
                    animate={{
                      rotate: [0, 360],
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0%,rgba(6,182,212,0.1)_25%,transparent_50%,rgba(16,185,129,0.1)_75%,transparent_100%)] opacity-0 group-hover:opacity-100 transition-opacity duration-1000"
                  />
                  {/* Solid inner boundary highlight */}
                  <div className="absolute inset-0 rounded-[30px] shadow-[inset_0_0_20px_rgba(6,182,212,0)] group-hover:shadow-[inset_0_0_30px_rgba(6,182,212,0.3)] transition-shadow duration-700 border border-transparent group-hover:border-cyan-500/30" />
                </div>
                {/* --------------------------------------------------- */}

                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-white mb-2">Send Message</h3>
                  <p className="text-slate-400 text-sm mb-8">Feel free to reach out for collaborations or just a friendly hello.</p>

                  {status === 'success' ? (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex flex-col items-center justify-center py-12 text-center"
                    >
                      <div className="w-20 h-20 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(34,197,94,0.2)]">
                        <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                        </div>
                      </div>
                      <h4 className="text-2xl font-bold text-white mb-2">Message Sent!</h4>
                      <p className="text-slate-400">Thanks for reaching out. I&apos;ll get back to you shortly.</p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {status === 'error' && (
                        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-bold flex items-center gap-3">
                          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                          {errorMessage}
                        </div>
                      )}
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-2">Full Name</label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            disabled={status === 'loading'}
                            placeholder="Your Name"
                            className={`w-full bg-white/5 border ${fieldErrors.name ? 'border-red-500/50' : 'border-white/10'} rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-pink-500 transition-colors placeholder:text-slate-600 focus:ring-4 focus:ring-pink-500/10 disabled:opacity-50`}
                          />
                          {fieldErrors.name && (
                            <p className="text-[10px] text-red-500 font-bold pl-2">{fieldErrors.name[0]}</p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-2">Email Address</label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            disabled={status === 'loading'}
                            placeholder="Your Email"
                            className={`w-full bg-white/5 border ${fieldErrors.email ? 'border-red-500/50' : 'border-white/10'} rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-pink-500 transition-colors placeholder:text-slate-600 focus:ring-4 focus:ring-pink-500/10 disabled:opacity-50`}
                          />
                          {fieldErrors.email && (
                            <p className="text-[10px] text-red-500 font-bold pl-2">{fieldErrors.email[0]}</p>
                          )}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-2">Message</label>
                        <textarea
                          name="message"
                          rows={5}
                          value={formData.message}
                          onChange={handleChange}
                          required
                          disabled={status === 'loading'}
                          placeholder="Write your message here..."
                          className={`w-full bg-white/5 border ${fieldErrors.message ? 'border-red-500/50' : 'border-white/10'} rounded-3xl px-6 py-4 text-white focus:outline-none focus:border-pink-500 transition-colors placeholder:text-slate-600 focus:ring-4 focus:ring-pink-500/10 resize-none disabled:opacity-50`}
                        />
                        {fieldErrors.message && (
                          <p className="text-[10px] text-red-500 font-bold pl-2">{fieldErrors.message[0]}</p>
                        )}
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={status === 'loading'}
                        className="group relative w-full h-14 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold rounded-2xl shadow-lg transition-all duration-300 overflow-hidden disabled:opacity-50"
                      >
                        <div className="relative z-10 flex items-center justify-center gap-2">
                          {status === 'loading' ? (
                            <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                          ) : (
                            <>
                              <span>Send Message</span>
                              <FaEnvelope className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </>
                          )}
                        </div>
                        <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </motion.button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}