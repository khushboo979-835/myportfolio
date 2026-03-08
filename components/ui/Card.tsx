import * as React from 'react';
import { cn } from '@/lib/utils';

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'rounded-2xl border transition-all duration-300 p-6',
      'bg-white/5 backdrop-blur-2xl border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.3)]',
      'hover:border-indigo-500/50 hover:shadow-[0_0_25px_rgba(99,102,241,0.2)]',
      className
    )}
    {...props}
  />
));

Card.displayName = 'Card';

export { Card };