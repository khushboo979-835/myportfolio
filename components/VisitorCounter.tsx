'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function VisitorCounter() {
    const [count, setCount] = useState<number | null>(null);

    useEffect(() => {
        const fetchCount = async () => {
            try {
                const res = await fetch('/api/visit');
                const json = await res.json();
                if (json.success) {
                    setCount(json.data.totalVisits);
                }
            } catch (error) {
                console.error('Failed to fetch visitor count:', error);
            }
        };

        fetchCount();
    }, []);

    if (count === null) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10"
        >
            <span className="w-1.5 h-1.5 bg-pink-500 rounded-full animate-pulse" />
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Total Visitors: <span className="text-white">{count.toLocaleString()}</span>
            </span>
        </motion.div>
    );
}
