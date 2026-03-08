import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
    try {
        const certDir = path.join(process.cwd(), 'public', 'certificates');
        const metaPath = path.join(process.cwd(), 'public', 'certificates.json');

        // Try to load metadata if it exists
        if (fs.existsSync(metaPath)) {
            const metaData = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
            return NextResponse.json({ success: true, data: metaData });
        }

        // Fallback to directory listing if metadata doesn't exist
        if (!fs.existsSync(certDir)) {
            return NextResponse.json({ success: true, data: [] });
        }

        const files = fs.readdirSync(certDir);

        // Map files to metadata
        const certificates = files
            .filter(file => /\.(png|jpe?g|webp|gif)$/i.test(file))
            .map(file => {
                // Create an ID and Title from filename
                const id = file.split('.')[0].replace(/[-_]/g, ' ');
                const title = id.charAt(0).toUpperCase() + id.slice(1);

                return {
                    id: file,
                    title: title,
                    issuer: 'Verified Certification',
                    image: `/certificates/${file}`,
                };
            });

        return NextResponse.json({ success: true, data: certificates });
    } catch (error) {
        console.error('Certificates API Error:', error);
        return NextResponse.json({ success: false, error: 'Failed to load certificates' }, { status: 500 });
    }
}
