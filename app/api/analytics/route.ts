import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Visitor from '@/models/Visitor';
import Message from '@/models/Message';

export async function GET() {
    try {
        await dbConnect();

        // Get aggregated stats
        const totalVisits = await Visitor.countDocuments();
        const uniqueVisitors = await Visitor.distinct('ip').then(ips => ips.length);

        // Get recent 10 messages
        const recentMessages = await Message.find().sort({ timestamp: -1 }).limit(10);
        const totalMessages = await Message.countDocuments();

        // Get daily visit trends (last 7 days)
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const dailyStats = await Visitor.aggregate([
            { $match: { timestamp: { $gte: sevenDaysAgo } } },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$timestamp" } },
                    visits: { $sum: 1 }
                }
            },
            { $sort: { "_id": 1 } }
        ]);

        return NextResponse.json({
            success: true,
            data: {
                totalVisits,
                uniqueVisitors,
                totalMessages,
                recentMessages,
                dailyStats
            }
        });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to fetch analytics' }, { status: 500 });
    }
}
