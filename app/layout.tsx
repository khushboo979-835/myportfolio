import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://khushboo-portfolio.vercel.app'),
  title: 'Khushboo Kumari | Full Stack Developer Portfolio',
  description: 'Portfolio of Khushboo Kumari, a Full Stack Developer specializing in Next.js, React, and modern web aesthetics.',
  keywords: ['Khushboo Kumari', 'Full Stack Developer', 'Next.js', 'React', 'Portfolio', 'Web Design'],
  authors: [{ name: 'Khushboo Kumari' }],
  openGraph: {
    title: 'Khushboo Kumari | Full Stack Developer',
    description: 'Transforming ideas into digital reality with high-end animations and robust backend systems.',
    url: 'https://khushboo-portfolio.vercel.app',
    siteName: 'Khushboo Portfolio',
    images: [
      {
        url: '/khushi.jpeg',
        width: 1200,
        height: 630,
        alt: 'Khushboo Kumari Portfolio',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Khushboo Kumari | Full Stack Developer',
    description: 'Next.js developer building the future of the web.',
    images: ['/khushi.jpeg'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

import { Background } from '@/components/Background';
import VisitorTracker from '@/components/VisitorTracker';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} themes={['dark', 'golden']}>
          <VisitorTracker />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}