'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const Background = () => {
    const [mounted, setMounted] = React.useState(false);
    const [bokehs, setBokehs] = React.useState<{ top: string; left: string; size: number }[]>([]);

    const [particles, setParticles] = React.useState<{ top: string; left: string; duration: number; delay: number }[]>([]);

    React.useEffect(() => {
        setMounted(true);
        const newBokehs = [...Array(10)].map((_, i) => ({
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            size: 200 + i * 60
        }));
        setBokehs(newBokehs);

        const newParticles = [...Array(25)].map(() => ({
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            duration: Math.random() * 6 + 8,
            delay: Math.random() * 10
        }));
        setParticles(newParticles);
    }, []);

    return (
        <div className="fixed inset-0 -z-10 overflow-hidden bg-[#000000]">
            {/* Deep Velvet Atmosphere */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,#1e0010_0%,#000000_70%)]" />
            </div>

            {/* Cinematic God Rays - Volumetric Light Shafts */}
            <div className="absolute inset-0 opacity-50 mix-blend-screen">
                {[...Array(3)].map((_, i) => (
                    <motion.div
                        key={`ray-${i}`}
                        animate={{
                            x: [-100, 100, -100],
                            opacity: [0.2, 0.4, 0.2],
                        }}
                        transition={{
                            duration: 20 + i * 5,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="absolute top-0 w-[400px] h-[200%] bg-gradient-to-r from-transparent via-pink-500/20 to-transparent -rotate-45 blur-[100px]"
                        style={{ left: `${15 + i * 35}%`, transformOrigin: 'top' }}
                    />
                ))}
            </div>

            {/* Stellar Bokeh Parallax Effect - Organic Light Orbs */}
            <div className="absolute inset-0">
                {mounted && bokehs.map((bokeh, i) => (
                    <motion.div
                        key={`bokeh-${i}`}
                        animate={{
                            scale: [1, 1.4, 1],
                            opacity: [0.1, 0.3, 0.1],
                            x: [0, (i % 2 === 0 ? 50 : -50), 0],
                            y: [0, (i % 3 === 0 ? 60 : -60), 0],
                        }}
                        transition={{
                            duration: 12 + i * 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="absolute rounded-full bg-pink-400/10 blur-[50px]"
                        style={{
                            width: `${bokeh.size}px`,
                            height: `${bokeh.size}px`,
                            top: bokeh.top,
                            left: bokeh.left,
                        }}
                    />
                ))}
            </div>

            {/* Professional Breathing Aura - Refined Pink & Purple */}
            <div className="absolute inset-0 opacity-40">
                <motion.div
                    animate={{
                        scale: [1, 1.3, 1],
                        x: [0, 60, 0],
                        y: [0, 30, 0],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute -top-[10%] -left-[10%] w-[1000px] h-[1000px] bg-pink-700/10 rounded-full blur-[180px]"
                />
                <motion.div
                    animate={{
                        scale: [1.3, 1, 1.3],
                        x: [0, -60, 0],
                        y: [0, -30, 0],
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute -bottom-[10%] -right-[10%] w-[1100px] h-[1100px] bg-purple-700/10 rounded-full blur-[200px]"
                />
            </div>

            {/* Delicate Micro-Particles */}
            <div className="absolute inset-0">
                {mounted && particles.map((particle, i) => (
                    <motion.div
                        key={`particle-${i}`}
                        animate={{
                            y: [0, -200],
                            opacity: [0, 1, 0],
                            scale: [0.5, 1.5, 0.5]
                        }}
                        transition={{
                            duration: particle.duration,
                            repeat: Infinity,
                            ease: "linear",
                            delay: particle.delay
                        }}
                        className="absolute h-[2px] w-[2px] rounded-full bg-pink-200/40 shadow-[0_0_15px_rgba(255,105,180,0.6)]"
                        style={{
                            top: particle.top,
                            left: particle.left,
                            willChange: 'transform, opacity'
                        }}
                    />
                ))}
            </div>

            {/* Subtle Grain Overlay for cinematic texture */}
            <div className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-overlay">
                <div className="w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
            </div>
        </div>
    );
};
