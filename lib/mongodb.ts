import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    if (process.env.NODE_ENV === 'production') {
        console.warn('MONGODB_URI is not defined. Please ensure it is set in your production environment.');
    } else {
        // throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
        // For build compatibility even in dev without URI
        console.warn('MONGODB_URI is missing. Backend features will not work.');
    }
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = (global as any).mongoose;

if (!cached) {
    cached = (global as any).mongoose = { conn: null, promise: null };
}

async function dbConnect() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!MONGODB_URI) {
        console.error('MONGODB_URI is missing. Cannot connect to database.');
        return null;
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
            connectTimeoutMS: 10000, // 10s timeout
        };

        cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
            console.log('MongoDB Connected successfully');
            return mongoose;
        }).catch(err => {
            console.error('MongoDB Connection Error:', err);
            cached.promise = null;
            throw err;
        });
    }

    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        return null; // Return null instead of throwing to let callers handle it gracefully
    }

    return cached.conn;
}

export default dbConnect;
