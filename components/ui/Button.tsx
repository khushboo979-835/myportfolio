import * as React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <button
        className={cn(
          'inline-flex items-center justify-center rounded-full font-semibold transition-all duration-300',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500',
          'disabled:opacity-50 disabled:pointer-events-none',
          'hover:scale-[1.05] active:scale-[0.95]',
          variant === 'primary' &&
          'bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-[0_0_15px_rgba(99,102,241,0.3)] hover:shadow-[0_0_25px_rgba(99,102,241,0.5)] border border-white/10',
          variant === 'outline' &&
          'border border-white/20 bg-white/5 text-white hover:bg-white/10 backdrop-blur-md shadow-[0_0_10px_rgba(255,255,255,0.05)]',
          variant === 'ghost' &&
          'bg-transparent text-gray-400 hover:text-white hover:bg-white/5',
          size === 'sm' && 'px-4 py-2 text-sm',
          size === 'md' && 'px-6 py-2.5 text-base',
          size === 'lg' && 'px-8 py-3.5 text-lg',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

export { Button };