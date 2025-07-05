'use client';

import { useEffect, useState } from 'react';

export default function HeroBlobs() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Small delay to ensure smooth loading
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="absolute inset-0 z-0">
      {/* Upper section blobs */}
      {/* Blob 1 - top left to right */}
      <div 
        className={`absolute top-10 w-64 h-64 bg-nude-sand/50 rounded-full mix-blend-multiply filter blur-3xl transition-opacity duration-[3000ms] ease-out ${
          isLoaded ? 'opacity-100 animate-blob-drift-right' : 'opacity-0'
        }`}
      ></div>
      
      {/* Blob 2 - top right to left (delayed) */}
      <div 
        className={`absolute top-32 w-56 h-56 bg-nude-clay/35 rounded-full mix-blend-multiply filter blur-3xl transition-opacity duration-[3000ms] ease-out delay-500 ${
          isLoaded ? 'opacity-100 animate-blob-drift-left' : 'opacity-0'
        }`} 
        style={{ animationDelay: '8s' }}
      ></div>
      
      {/* Middle section blobs */}
      {/* Blob 3 - middle diagonal down */}
      <div 
        className={`absolute top-1/3 w-72 h-72 bg-nude-warm/30 rounded-full mix-blend-multiply filter blur-3xl transition-opacity duration-[3000ms] ease-out delay-300 ${
          isLoaded ? 'opacity-100 animate-blob-drift-diagonal-down' : 'opacity-0'
        }`} 
        style={{ animationDelay: '4s' }}
      ></div>
      
      {/* Blob 4 - middle diagonal up */}
      <div 
        className={`absolute bottom-1/3 w-60 h-60 bg-nude-sand/25 rounded-full mix-blend-multiply filter blur-3xl transition-opacity duration-[3000ms] ease-out delay-700 ${
          isLoaded ? 'opacity-100 animate-blob-drift-diagonal-up' : 'opacity-0'
        }`} 
        style={{ animationDelay: '12s' }}
      ></div>
      
      {/* Lower section blobs */}
      {/* Blob 5 - bottom left to right */}
      <div 
        className={`absolute bottom-24 w-68 h-68 bg-nude-clay/30 rounded-full mix-blend-multiply filter blur-3xl transition-opacity duration-[3000ms] ease-out delay-1000 ${
          isLoaded ? 'opacity-100 animate-blob-drift-right' : 'opacity-0'
        }`} 
        style={{ animationDelay: '16s' }}
      ></div>
      
      {/* Blob 6 - vertical drift left side */}
      <div 
        className={`absolute left-1/4 w-52 h-52 bg-nude-warm/35 rounded-full mix-blend-multiply filter blur-3xl transition-opacity duration-[3000ms] ease-out delay-[600ms] ${
          isLoaded ? 'opacity-100 animate-blob-drift-vertical' : 'opacity-0'
        }`} 
        style={{ animationDelay: '6s' }}
      ></div>
      
      {/* Blob 7 - vertical drift right side */}
      <div 
        className={`absolute right-1/3 w-64 h-64 bg-nude-sand/20 rounded-full mix-blend-multiply filter blur-3xl transition-opacity duration-[3000ms] ease-out delay-[1200ms] ${
          isLoaded ? 'opacity-100 animate-blob-drift-vertical' : 'opacity-0'
        }`} 
        style={{ animationDelay: '20s' }}
      ></div>
      
      {/* Blob 8 - slow horizontal middle */}
      <div 
        className={`absolute top-1/2 w-80 h-80 bg-nude-clay/15 rounded-full mix-blend-multiply filter blur-3xl transition-opacity duration-[3000ms] ease-out delay-[900ms] ${
          isLoaded ? 'opacity-100 animate-blob-drift-slow' : 'opacity-0'
        }`} 
        style={{ animationDelay: '14s' }}
      ></div>
      
      {/* Subtle noise texture overlay */}
      <div className="absolute inset-0 opacity-5 pattern-grain"></div>
    </div>
  );
}