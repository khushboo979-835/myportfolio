import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import mongoose from 'mongoose';

export async function GET() {
    const status: any = {
        database: 'disconnected',
        email: 'unconfigured',
        env: 'incomplete',
        timestamp: new Date().toISOString()
    };

    try {
        // 1. Check Database
        const conn = await dbConnect();
        if (conn && mongoose.connection.readyState === 1) {
            status.database = 'connected';
        }

        // 2. Check Email Configuration
        const hasEmailConfig = process.env.SMTP_USER &&
            process.env.SMTP_PASS &&
            process.env.SMTP_USER !== 'your-email@gmail.com';
        if (hasEmailConfig) {
            status.email = 'configured';
        }

        // 3. Check General Env
        if (process.env.MONGODB_URI && hasEmailConfig) {
            status.env = 'complete';
        }

        const isHealthy = status.database === 'connected' && status.env === 'complete';

        return NextResponse.json({
            success: true,
            status: isHealthy ? 'healthy' : 'degraded',
            details: status
        });

    } catch (error) {
        return NextResponse.json({
            success: false,
            status: 'error',
            error: 'Backend health check failed'
        }, { status: 500 });
    }
}
