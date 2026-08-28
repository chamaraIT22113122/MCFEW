import React, { useState, useEffect } from 'react';
import { getAssetPath } from '../utils/path';

export default function ThreeDCarousel({ items, autoRotate = true, rotateInterval = 4000, cardHeight = 400 }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const length = items.length;
  
  const radius = length > 0 ? Math.max(300, (350 / 2) / Math.tan(Math.PI / length)) : 0;

  useEffect(() => {
    if (!autoRotate || length <= 1 || isHovered) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => prev + 1);
    }, rotateInterval);
    return () => clearInterval(timer);
  }, [autoRotate, length, rotateInterval, isHovered]);

  const handleNext = () => setCurrentIndex(prev => prev + 1);
  const handlePrev = () => setCurrentIndex(prev => prev - 1);

  if (!items || length === 0) return null;

  return (
    <div 
      className="relative flex justify-center items-center w-full py-10"
      style={{ height: cardHeight + 100, perspective: '1200px' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        className="relative w-full max-w-[320px] h-full transition-transform duration-1000 ease-out"
        style={{ 
          transformStyle: 'preserve-3d',
          transform: 'translateZ(-' + radius + 'px) rotateY(' + (currentIndex * (-360 / length)) + 'deg)'
        }}
      >
        {items.map((item, i) => {
          const rotateY = i * (360 / length);
          
          const normalizedCurrent = ((currentIndex % length) + length) % length;
          const distance = Math.min(
            Math.abs(normalizedCurrent - i),
            length - Math.abs(normalizedCurrent - i)
          );
          
          const isActive = distance === 0;

          return (
            <div
              key={item.id || i}
              className={bsolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[320px] 
                          rounded-2xl border transition-all duration-700 overflow-hidden bg-dark-card
                          }
              style={{
                height: cardHeight,
                transform: 'rotateY(' + rotateY + 'deg) translateZ(' + radius + 'px)',
              }}
            >
              <div className="h-48 relative overflow-hidden bg-black/50">
                {item.imageUrl || item.image ? (
                  <img 
                    src={getAssetPath(item.imageUrl || item.image)} 
                    alt={item.title || item.name} 
                    className="w-full h-full object-cover opacity-80" 
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-green-brand/10 text-green-brand font-display text-4xl">
                    {(item.title || item.name || 'MC').substring(0,2).toUpperCase()}
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-dark-card to-transparent" />
              </div>

              <div className="p-6 relative z-10 flex flex-col items-center text-center">
                <h3 className="font-display font-bold text-xl text-white mb-1">{item.title || item.name}</h3>
                <div className="text-green-light text-sm font-semibold mb-4">{item.brand || item.role}</div>
                <p className="text-white/60 text-sm line-clamp-4">{item.description || item.exp}</p>
                
                {item.tags && (
                  <div className="mt-6 flex flex-wrap justify-center gap-2">
                    {item.tags.map((tag, idx) => (
                      <span key={idx} className="text-[10px] px-2 py-1 rounded-full border border-white/10 text-white/40 uppercase tracking-wider">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-4 z-20 pointer-events-none">
        <button 
          onClick={handlePrev} 
          className="pointer-events-auto w-12 h-12 rounded-full border border-white/10 bg-dark-2 text-white/50 hover:text-green-brand hover:border-green-brand/50 flex items-center justify-center transition-colors"
        >
          ?
        </button>
        <button 
          onClick={handleNext}
          className="pointer-events-auto w-12 h-12 rounded-full border border-white/10 bg-dark-2 text-white/50 hover:text-green-brand hover:border-green-brand/50 flex items-center justify-center transition-colors"
        >
          ?
        </button>
      </div>
    </div>
  );
}
