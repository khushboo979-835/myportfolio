import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Message from '@/models/Message';
import nodemailer from 'nodemailer';
import { z } from 'zod';
import DOMPurify from 'isomorphic-dompurify';
import { rateLimit } from '@/lib/rate-limit';

const contactSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    message: z.string().min(10, 'Message must be at least 10 characters'),
});

// GET handler for health checks
export async function GET() {
    return NextResponse.json({
        success: true,
        message: 'Contact API is active and reachable.',
        timestamp: new Date().toISOString()
    });
}

// OPTIONS handler for preflight requests
export async function OPTIONS() {
    return new NextResponse(null, {
        status: 204,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
    });
}

export async function POST(req: NextRequest) {
    try {
        const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || '127.0.0.1';
        if (!rateLimit(ip, 3, 60000)) { // 3 messages per minute
            return NextResponse.json({ success: false, error: 'Too many messages. Please try again later.' }, { status: 429 });
        }

        const conn = await dbConnect();
        if (!conn) {
            return NextResponse.json({
                success: false,
                error: 'Database connection failed. Please try again or contact me directly via email/phone.'
            }, { status: 503 });
        }

        const body = await req.json();

        // Validate input
        const validatedData = contactSchema.parse(body);

        // Sanitize message
        const sanitizedMessage = DOMPurify.sanitize(validatedData.message);

        // Save to MongoDB
        const newMessage = await Message.create({
            name: validatedData.name,
            email: validatedData.email,
            message: sanitizedMessage,
        });

        // Check for placeholder credentials or missing config
        const isPlaceholder = !process.env.SMTP_USER ||
            process.env.SMTP_USER === 'your-email@gmail.com' ||
            !process.env.SMTP_PASS ||
            process.env.SMTP_PASS === 'your-app-specific-password';

        if (isPlaceholder) {
            console.warn('Contact API: Email service not fully configured.');
            return NextResponse.json({
                success: false,
                error: 'The email service is currently being configured. Your message has been saved to our database, and I will see it soon!',
                isConfigError: true
            }, { status: 200 }); // Friendly 200 to avoid scary red errors for non-technical users
        }

        // Send Email Notification
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: Number(process.env.SMTP_PORT) === 465, // SSL for 465
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        const mailOptions = {
            from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
            to: process.env.CONTACT_EMAIL || process.env.SMTP_USER,
            subject: `New Message from ${validatedData.name}`,
            html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #ec4899;">New Portfolio Message</h2>
          <p><strong>Name:</strong> ${validatedData.name}</p>
          <p><strong>Email:</strong> ${validatedData.email}</p>
          <p><strong>Message:</strong></p>
          <div style="background: #f9f9f9; padding: 15px; border-radius: 5px; border-left: 4px solid #ec4899;">
            ${sanitizedMessage}
          </div>
          <hr style="margin-top: 20px; border: 0; border-top: 1px solid #eee;" />
          <p style="font-size: 12px; color: #888;">Sent from your portfolio dashboard.</p>
        </div>
      `,
        };

        // Only try to send email if user and pass are set and not placeholders
        await transporter.sendMail(mailOptions);

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error('--- CONTACT API CRITICAL ERROR ---');
        console.error('Error Name:', error.name);
        console.error('Error Message:', error.message);
        console.error('Stack Trace:', error.stack);

        if (error instanceof z.ZodError) {
            return NextResponse.json({ success: false, errors: error.flatten().fieldErrors }, { status: 400 });
        }

        // Check for missing DB connection
        if (error.message?.includes('MONGODB_URI') || error.name === 'MongooseError' || error.name === 'MongoServerError') {
            return NextResponse.json({ success: false, error: 'Database connection failed. Please contact me directly while I fix this!' }, { status: 500 });
        }

        return NextResponse.json({ success: false, error: 'Failed to send message. Please try again later.' }, { status: 500 });
    }
}
