export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Visitor from '@/models/Visitor';

export async function POST(req: NextRequest) {
    try {
        const conn = await dbConnect();
        if (!conn) {
            return NextResponse.json({ success: false, error: 'Database connection unavailable' }, { status: 503 });
        }

        // Standard IP discovery
        const forwarded = req.headers.get('x-forwarded-for');
        const ip = forwarded ? forwarded.split(',')[0] : (req.headers.get('x-real-ip') || '127.0.0.1');

        const userAgent = req.headers.get('user-agent') || 'Unknown';
        const country = req.headers.get('x-vercel-ip-country') || 'Unknown';
        const city = req.headers.get('x-vercel-ip-city') || 'Unknown';

        const body = await req.json().catch(() => ({}));
        const { path = '/' } = body;

        // Log the visit with error protection
        await Visitor.create({
            ip,
            userAgent,
            path,
            country,
            city,
        }).catch(err => console.error('Failed to create visitor record:', err));

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Analytics POST Error:', error);
        if (!process.env.MONGODB_URI) {
            console.error('CRITICAL: MONGODB_URI is missing during analytics log.');
        }
        return NextResponse.json({ success: false, error: 'Failed to log visit' }, { status: 200 }); // Silent fail for analytics
    }
}

export async function GET() {
    try {
        await dbConnect();

        const totalVisits = await Visitor.countDocuments();
        const uniqueVisitors = await Visitor.distinct('ip').then(ips => ips.length);

        return NextResponse.json({
            success: true,
            data: {
                totalVisits,
                uniqueVisitors
            }
        });
    } catch (error) {
        console.error('Analytics GET Error:', error);
        if (!process.env.MONGODB_URI) {
            console.error('CRITICAL: MONGODB_URI is missing during analytics fetch.');
        }
        return NextResponse.json({ success: false, error: 'Failed to fetch analytics' }, { status: 500 });
    }
}
