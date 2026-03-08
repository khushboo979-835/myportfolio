'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export default function VisitorTracker() {
    const pathname = usePathname();
    const lastLoggedPath = useRef<string | null>(null);

    useEffect(() => {
        // Prevent double logging on same path (e.g. Strict Mode or Re-renders)
        if (lastLoggedPath.current === pathname) return;

        const logVisit = async () => {
            try {
                lastLoggedPath.current = pathname;
                await fetch('/api/visit', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ path: pathname }),
                });
            } catch (error) {
                console.error('Failed to log visit:', error);
            }
        };

        logVisit();
    }, [pathname]);

    return null;
}
