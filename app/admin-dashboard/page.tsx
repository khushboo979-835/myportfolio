'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FaChartBar,
    FaEnvelope,
    FaUsers,
    FaGlobe,
    FaClock,
    FaCheckCircle,
    FaEnvelopeOpen,
    FaChevronRight
} from 'react-icons/fa';

export default function AdminDashboard() {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'analytics' | 'messages'>('analytics');

    useEffect(() => {
        fetchAnalytics();
    }, []);

    const fetchAnalytics = async () => {
        try {
            const res = await fetch('/api/analytics');
            const json = await res.json();
            if (json.success) {
                setData(json.data);
            }
        } catch (error) {
            console.error('Failed to fetch analytics:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#030014] flex items-center justify-center">
                <div className="w-16 h-16 border-4 border-pink-500/20 border-t-pink-500 rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#030014] text-white p-6 md:p-12">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div>
                        <h1 className="text-4xl font-black bg-gradient-to-r from-white to-slate-500 bg-clip-text text-transparent">
                            Admin <span className="text-pink-500">Dashboard</span>
                        </h1>
                        <p className="text-slate-400 mt-2">Portfolio Management & Insights</p>
                    </div>

                    <div className="flex bg-white/5 border border-white/10 rounded-2xl p-1.5 backdrop-blur-xl">
                        <button
                            onClick={() => setActiveTab('analytics')}
                            className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-300 ${activeTab === 'analytics' ? 'bg-pink-500 text-white shadow-lg shadow-pink-500/20' : 'text-slate-400 hover:text-white'}`}
                        >
                            <FaChartBar size={18} />
                            <span className="text-sm font-bold uppercase tracking-wider">Analytics</span>
                        </button>
                        <button
                            onClick={() => setActiveTab('messages')}
                            className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-300 ${activeTab === 'messages' ? 'bg-pink-500 text-white shadow-lg shadow-pink-500/20' : 'text-slate-400 hover:text-white'}`}
                        >
                            <FaEnvelope size={18} />
                            <span className="text-sm font-bold uppercase tracking-wider">Messages</span>
                        </button>
                    </div>
                </header>

                {activeTab === 'analytics' ? (
                    <div className="space-y-12">
                        {/* Stats Overview */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                { label: 'Total Visits', value: data.totalVisits, icon: FaUsers, color: 'text-pink-500' },
                                { label: 'Unique Visitors', value: data.uniqueVisitors, icon: FaGlobe, color: 'text-indigo-500' },
                                { label: 'Contact Messages', value: data.totalMessages, icon: FaEnvelope, color: 'text-purple-500' },
                            ].map((stat, i) => (
                                <div key={i} className="bg-white/5 border border-white/10 rounded-[2rem] p-8 backdrop-blur-2xl">
                                    <stat.icon className={`${stat.color} mb-4`} size={32} />
                                    <p className="text-slate-400 text-sm font-bold uppercase tracking-[0.2em] mb-1">{stat.label}</p>
                                    <h3 className="text-3xl font-black">{stat.value.toLocaleString()}</h3>
                                </div>
                            ))}
                        </div>

                        {/* Trends & Reach (Placeholder for chart) */}
                        <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-10 backdrop-blur-2xl">
                            <h3 className="text-xl font-bold mb-8 flex items-center gap-3">
                                <FaClock className="text-pink-500" />
                                Visitor Trends (Last 7 Days)
                            </h3>
                            <div className="flex items-end gap-4 h-64 border-b border-white/10 pb-4">
                                {data.dailyStats.map((day: any, i: number) => (
                                    <div key={i} className="flex-1 flex flex-col items-center justify-end gap-3 group">
                                        <motion.div
                                            initial={{ height: 0 }}
                                            animate={{ height: `${(day.visits / Math.max(...data.dailyStats.map((d: any) => d.visits))) * 100}%` }}
                                            className="w-full max-w-[40px] bg-gradient-to-t from-pink-500/80 to-purple-500/80 rounded-t-xl transition-all duration-500 group-hover:from-pink-500 group-hover:to-white shadow-[0_0_20px_rgba(236,72,153,0.1)]"
                                        />
                                        <span className="text-[10px] font-bold text-slate-500 group-hover:text-white transition-colors">{day._id.split('-').slice(1).join('/')}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-6">
                        <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                            <FaEnvelopeOpen className="text-pink-500" />
                            Inbox ({data.totalMessages})
                        </h3>
                        {data.recentMessages.length === 0 ? (
                            <div className="bg-white/5 border border-white/10 rounded-[2rem] p-20 text-center">
                                <p className="text-slate-500 italic text-xl">No messages yet...</p>
                            </div>
                        ) : (
                            <div className="grid gap-6">
                                {data.recentMessages.map((msg: any, i: number) => (
                                    <motion.div
                                        key={msg._id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        className="bg-white/5 border border-white/10 rounded-[2rem] p-8 backdrop-blur-2xl group hover:border-pink-500/30 transition-all duration-300"
                                    >
                                        <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
                                            <div className="flex items-start gap-4">
                                                <div className="w-12 h-12 rounded-2xl bg-pink-500/10 flex items-center justify-center text-pink-500 font-black text-xl">
                                                    {msg.name[0].toUpperCase()}
                                                </div>
                                                <div>
                                                    <h4 className="text-lg font-bold text-white group-hover:text-pink-400 transition-colors">{msg.name}</h4>
                                                    <p className="text-sm text-slate-400">{msg.email}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{new Date(msg.timestamp).toLocaleString()}</p>
                                                {msg.isRead ? (
                                                    <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-green-500 uppercase mt-2">
                                                        <FaCheckCircle size={10} /> Read
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-pink-500 uppercase mt-2">
                                                        New Message
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <p className="text-slate-300 leading-relaxed bg-white/5 p-6 rounded-2xl border border-white/5 italic">
                                            "{msg.message}"
                                        </p>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
