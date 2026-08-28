import React from 'react';

export function InfiniteMarquee({ children, baseVelocity = 20, direction = 1, className = '' }) {
  const duration = Math.max(10, 100 / baseVelocity);
  
  return (
    <div className={`overflow-hidden flex w-full relative group ${className}`}>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee ${duration}s linear infinite;
        }
        .animate-marquee.reverse {
          animation-direction: reverse;
        }
        .group:hover .animate-marquee {
          animation-play-state: paused;
        }
      `}</style>
      
      <div className={`flex w-max animate-marquee ${direction === -1 ? 'reverse' : ''}`}>
        <div className="flex shrink-0 items-center justify-center gap-12 px-6">
          {children}
        </div>
        <div className="flex shrink-0 items-center justify-center gap-12 px-6" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
