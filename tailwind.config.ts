import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        pink: {
          400: 'rgb(var(--theme-tertiary) / <alpha-value>)',
          500: 'rgb(var(--theme-primary) / <alpha-value>)',
          600: 'rgb(var(--theme-primary) / <alpha-value>)',
        },
        purple: {
          400: 'rgb(var(--theme-secondary) / <alpha-value>)',
          500: 'rgb(var(--theme-secondary) / <alpha-value>)',
          600: 'rgb(var(--theme-secondary) / <alpha-value>)',
        },
        primary: {
          DEFAULT: "#3b82f6",
          dark: "#2563eb",
        },
        accent: {
          DEFAULT: "#22d3ee",
          dark: "#0891b2",
        },
        'midnight': '#020617',
        'deep-navy': '#0f172a',
        'cobalt-glow': '#60a5fa',
        'cyan-glow': '#67e8f9',
        'neon-pink': 'rgb(var(--theme-primary))',
        'pink-glow': 'var(--theme-bg-glow-1)',
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'blob': 'blob 7s infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'text-reveal': 'textReveal 1s cubic-bezier(0.77, 0, 0.175, 1) forwards',
        'border-flow': 'borderFlow 4s linear infinite',
        'scanner': 'scanner 3s ease-in-out infinite',
        'float-hologram': 'floatHologram 4s ease-in-out infinite',
        'orbit-slow': 'orbit 20s linear infinite',
        'shimmer': 'shimmer 4s infinite linear',
      },
      keyframes: {
        orbit: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
        glow: {
          'from': { boxShadow: '0 0 10px #7c3aed, 0 0 20px #7c3aed' },
          'to': { boxShadow: '0 0 20px #7c3aed, 0 0 30px #ec4899' },
        },
        textReveal: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        borderFlow: {
          '0%': { strokeDashoffset: '1000' },
          '100%': { strokeDashoffset: '0' },
        },
        scanner: {
          '0%, 100%': { transform: 'translateY(-10%)', opacity: '0' },
          '50%': { transform: 'translateY(110%)', opacity: '0.5' },
        },
        floatHologram: {
          '0%, 100%': { transform: 'translateY(0) scale(1)', opacity: '0.8' },
          '50%': { transform: 'translateY(-15px) scale(1.05)', opacity: '1' },
        },
        shimmer: {
          '100%': { transform: 'translateX(200%)' },
        }
      },
    },
  },
  plugins: [],
}

export default config