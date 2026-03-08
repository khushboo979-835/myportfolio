'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';
import { MdAutoAwesome, MdPalette } from 'react-icons/md';
import { Button } from '@/components/ui/Button';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setTheme(theme === 'golden' ? 'dark' : 'golden')}
      className="w-10 h-10 px-0 rounded-full hover:bg-white/10 transition-colors"
      title={theme === 'golden' ? 'Switch to Pink Theme' : 'Switch to Golden Theme'}
    >
      {theme === 'golden' ? (
        <MdAutoAwesome size={22} className="text-yellow-500 drop-shadow-[0_0_8px_rgba(234,179,8,0.8)]" />
      ) : (
        <MdPalette size={22} className="text-pink-500 drop-shadow-[0_0_8px_rgba(var(--theme-primary),)]" />
      )}
    </Button>
  );
}