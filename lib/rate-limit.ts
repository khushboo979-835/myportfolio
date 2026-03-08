import { NextRequest, NextResponse } from 'next/server';

const rateLimitMap = new Map();

export function rateLimit(ip: string, limit: number = 5, windowMs: number = 60000) {
    const now = Date.now();
    const userData = rateLimitMap.get(ip) || { count: 0, start: now };

    if (now - userData.start > windowMs) {
        userData.count = 1;
        userData.start = now;
    } else {
        userData.count++;
    }

    rateLimitMap.set(ip, userData);

    return userData.count <= limit;
}
