import mongoose, { Schema, Document } from 'mongoose';

export interface IVisitor extends Document {
    ip: string;
    userAgent: string;
    path: string;
    country?: string;
    city?: string;
    timestamp: Date;
}

const VisitorSchema: Schema = new Schema({
    ip: { type: String, required: true },
    userAgent: { type: String },
    path: { type: String, default: '/' },
    country: { type: String },
    city: { type: String },
    timestamp: { type: Date, default: Date.now },
});

// Use a dynamic model name to prevent OverwriteModelError during hot reloads
export default mongoose.models.Visitor || mongoose.model<IVisitor>('Visitor', VisitorSchema);
