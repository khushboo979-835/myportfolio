import { NextResponse } from 'next/server';

export async function GET() {
    const GITHUB_USERNAME = 'khushbooyadav23074';
    const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

    // Check for placeholder or missing token
    const isPlaceholder = !GITHUB_TOKEN || GITHUB_TOKEN === 'your_personal_access_token_here';

    try {
        if (isPlaceholder) {
            console.warn('GitHub API: GITHUB_TOKEN is missing or using placeholder value.');
            return NextResponse.json({
                success: false,
                error: 'GitHub Integration not configured. Please update GITHUB_TOKEN in .env.local',
                isConfigError: true
            }, { status: 200 }); // Return 200 with error flag to handle gracefully in UI
        }

        const headers: HeadersInit = {
            'Accept': 'application/vnd.github.v3+json',
            'Authorization': `token ${GITHUB_TOKEN}`
        };

        const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=10`, {
            headers,
            next: { revalidate: 3600 }, // Cache for 1 hour
        });

        if (!res.ok) {
            throw new Error(`GitHub API returned ${res.status}`);
        }

        const repos = await res.json();

        // Filter and map only relevant repositories
        const formattedRepos = repos
            .filter((repo: any) => !repo.fork && repo.stargazers_count >= 0)
            .map((repo: any) => ({
                id: repo.id,
                title: repo.name,
                description: repo.description,
                tech: repo.topics || [repo.language].filter(Boolean),
                source: repo.html_url,
                live: repo.homepage || repo.html_url,
                stars: repo.stargazers_count,
                updatedAt: repo.updated_at,
                year: new Date(repo.created_at).getFullYear().toString(),
            }));

        return NextResponse.json({ success: true, data: formattedRepos });
    } catch (error: any) {
        console.error('GitHub API Error:', error);
        return NextResponse.json({ success: false, error: 'Failed to fetch repositories' }, { status: 500 });
    }
}
