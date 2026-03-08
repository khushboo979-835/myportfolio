import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET() {
    try {
        const filePath = path.join(process.cwd(), 'public', 'projects.json');
        const fileContent = await fs.readFile(filePath, 'utf8');
        const projects = JSON.parse(fileContent);

        return NextResponse.json({ success: true, data: projects });
    } catch (error) {
        console.error('Failed to load projects from JSON:', error);

        // Fallback or empty state if file doesn't exist
        return NextResponse.json({
            success: false,
            error: 'Failed to load project data',
            data: []
        }, { status: 500 });
    }
}
