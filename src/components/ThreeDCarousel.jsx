import React, { useState, useEffect, useRef } from 'react';
import { getAssetPath } from '../utils/path';
import { useInView } from 'framer-motion';

export default function ThreeDCarousel({ items, autoRotate = true, rotateInterval = 4000, cardHeight = 460 }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { margin: "0px" });
  const length = items.length;
  
  // Increased base width and radius multiplier to "expand it more"
  const radius = length > 0 ? Math.max(400, (450 / 2) / Math.tan(Math.PI / length)) : 0;

  useEffect(() => {
    if (!autoRotate || length <= 1 || isHovered || !isInView) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => prev + 1);
    }, rotateInterval);
    return () => clearInterval(timer);
  }, [autoRotate, length, rotateInterval, isHovered, isInView]);

  const handleNext = () => setCurrentIndex(prev => prev + 1);
  const handlePrev = () => setCurrentIndex(prev => prev - 1);

  if (!items || length === 0) return null;

  return (
    <div 
      ref={containerRef}
      className="relative flex justify-center items-center w-full py-10"
      style={{ height: cardHeight + 100, perspective: '1500px' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        className="relative w-full max-w-[320px] h-full transition-transform duration-1000 ease-out"
        style={{ 
          transformStyle: 'preserve-3d',
          transform: `translateZ(-${radius}px) rotateY(${currentIndex * (-360 / length)}deg)`
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

          // Default image to avatar.jpg if none provided
          const imageSrc = item.imageUrl || item.image || '/assets/avatar.jpg';

          return (
            <div
              key={item.id || i}
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[320px] 
                          rounded-2xl border transition-all duration-700 overflow-hidden bg-dark-card
                          ${isActive ? 'border-green-brand/50 shadow-xl shadow-green-brand/10 opacity-100' : 'border-white/5 opacity-40 blur-[2px]'}`}
              style={{
                height: cardHeight,
                transform: `rotateY(${rotateY}deg) translateZ(${radius}px)`,
              }}
            >
              {/* Increased height to h-64 and used object-contain so full image is seen without cropping */}
              <div className="h-64 relative flex items-center justify-center bg-dark-2">
                <img 
                  src={getAssetPath(imageSrc)} 
                  alt={item.title || item.name} 
                  className="w-full h-full object-contain p-2" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-card to-transparent" />
              </div>

              <div className="p-6 relative z-10 flex flex-col items-center text-center -mt-4">
                <h3 className="font-display font-bold text-xl text-white mb-1">{item.title || item.name}</h3>
                <div className="text-green-light text-sm font-semibold mb-3">{item.brand || item.role}</div>
                <p className="text-white/60 text-sm line-clamp-4">{item.description || item.exp}</p>
                
                {item.tags && (
                  <div className="mt-4 flex flex-wrap justify-center gap-2">
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
          &larr;
        </button>
        <button 
          onClick={handleNext}
          className="pointer-events-auto w-12 h-12 rounded-full border border-white/10 bg-dark-2 text-white/50 hover:text-green-brand hover:border-green-brand/50 flex items-center justify-center transition-colors"
        >
          &rarr;
        </button>
      </div>
    </div>
  );
}
