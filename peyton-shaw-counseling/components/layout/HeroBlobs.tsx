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
        className={`absolute top-10 w-32 h-32 bg-white rounded-full filter blur-xl opacity-40 transition-opacity duration-[3000ms] ease-out ${
          isLoaded ? 'animate-blob-drift-right' : 'opacity-0'
        }`}
      ></div>
      
      {/* Blob 2 - top right to left (delayed) */}
      <div 
        className={`absolute top-32 w-28 h-28 bg-white rounded-full filter blur-xl opacity-35 transition-opacity duration-[3000ms] ease-out delay-500 ${
          isLoaded ? 'animate-blob-drift-left' : 'opacity-0'
        }`} 
        style={{ animationDelay: '8s' }}
      ></div>
      
      {/* Blob 3 - small top center */}
      <div 
        className={`absolute top-20 left-1/2 w-24 h-24 bg-white rounded-full filter blur-xl opacity-45 transition-opacity duration-[3000ms] ease-out delay-200 ${
          isLoaded ? 'animate-blob-drift-vertical' : 'opacity-0'
        }`} 
        style={{ animationDelay: '3s' }}
      ></div>
      
      {/* Middle section blobs */}
      {/* Blob 4 - middle diagonal down */}
      <div 
        className={`absolute top-1/3 w-36 h-36 bg-white rounded-full filter blur-xl opacity-30 transition-opacity duration-[3000ms] ease-out delay-300 ${
          isLoaded ? 'animate-blob-drift-diagonal-down' : 'opacity-0'
        }`} 
        style={{ animationDelay: '4s' }}
      ></div>
      
      {/* Blob 5 - middle diagonal up */}
      <div 
        className={`absolute bottom-1/3 w-30 h-30 bg-white rounded-full filter blur-xl opacity-45 transition-opacity duration-[3000ms] ease-out delay-700 ${
          isLoaded ? 'animate-blob-drift-diagonal-up' : 'opacity-0'
        }`} 
        style={{ animationDelay: '12s' }}
      ></div>
      
      {/* Blob 6 - tiny mid left */}
      <div 
        className={`absolute top-1/2 left-10 w-20 h-20 bg-white rounded-full filter blur-xl opacity-55 transition-opacity duration-[3000ms] ease-out delay-400 ${
          isLoaded ? 'animate-blob-drift-right' : 'opacity-0'
        }`} 
        style={{ animationDelay: '7s' }}
      ></div>
      
      {/* Blob 7 - tiny mid right */}
      <div 
        className={`absolute top-1/2 right-10 w-16 h-16 bg-white rounded-full filter blur-xl opacity-60 transition-opacity duration-[3000ms] ease-out delay-800 ${
          isLoaded ? 'animate-blob-drift-left' : 'opacity-0'
        }`} 
        style={{ animationDelay: '15s' }}
      ></div>
      
      {/* Lower section blobs */}
      {/* Blob 8 - bottom left to right */}
      <div 
        className={`absolute bottom-24 w-34 h-34 bg-white rounded-full filter blur-xl opacity-35 transition-opacity duration-[3000ms] ease-out delay-1000 ${
          isLoaded ? 'animate-blob-drift-right' : 'opacity-0'
        }`} 
        style={{ animationDelay: '16s' }}
      ></div>
      
      {/* Blob 9 - vertical drift left side */}
      <div 
        className={`absolute left-1/4 w-26 h-26 bg-white rounded-full filter blur-xl opacity-50 transition-opacity duration-[3000ms] ease-out delay-[600ms] ${
          isLoaded ? 'animate-blob-drift-vertical' : 'opacity-0'
        }`} 
        style={{ animationDelay: '6s' }}
      ></div>
      
      {/* Blob 10 - vertical drift right side */}
      <div 
        className={`absolute right-1/3 w-32 h-32 bg-white rounded-full filter blur-xl opacity-30 transition-opacity duration-[3000ms] ease-out delay-[1200ms] ${
          isLoaded ? 'animate-blob-drift-vertical' : 'opacity-0'
        }`} 
        style={{ animationDelay: '20s' }}
      ></div>
      
      {/* Blob 11 - slow horizontal middle */}
      <div 
        className={`absolute top-1/2 w-40 h-40 bg-white rounded-full filter blur-xl opacity-25 transition-opacity duration-[3000ms] ease-out delay-[900ms] ${
          isLoaded ? 'animate-blob-drift-slow' : 'opacity-0'
        }`} 
        style={{ animationDelay: '14s' }}
      ></div>
      
      {/* Extra small floating orbs */}
      {/* Blob 12 - tiny top left */}
      <div 
        className={`absolute top-5 left-20 w-12 h-12 bg-white rounded-full filter blur-lg opacity-70 transition-opacity duration-[3000ms] ease-out delay-100 ${
          isLoaded ? 'animate-blob-drift-diagonal-down' : 'opacity-0'
        }`} 
        style={{ animationDelay: '2s' }}
      ></div>
      
      {/* Blob 13 - tiny top right */}
      <div 
        className={`absolute top-16 right-24 w-14 h-14 bg-white rounded-full filter blur-lg opacity-65 transition-opacity duration-[3000ms] ease-out delay-[1100ms] ${
          isLoaded ? 'animate-blob-drift-diagonal-up' : 'opacity-0'
        }`} 
        style={{ animationDelay: '18s' }}
      ></div>
      
      {/* Blob 14 - small bottom center */}
      <div 
        className={`absolute bottom-32 left-1/2 w-22 h-22 bg-white rounded-full filter blur-xl opacity-40 transition-opacity duration-[3000ms] ease-out delay-[1300ms] ${
          isLoaded ? 'animate-blob-drift-vertical' : 'opacity-0'
        }`} 
        style={{ animationDelay: '22s' }}
      ></div>
      
      {/* Blob 15 - micro orb 1 */}
      <div 
        className={`absolute top-3/4 left-16 w-10 h-10 bg-white rounded-full filter blur-lg opacity-75 transition-opacity duration-[3000ms] ease-out delay-[1400ms] ${
          isLoaded ? 'animate-blob-drift-right' : 'opacity-0'
        }`} 
        style={{ animationDelay: '10s' }}
      ></div>
      
      {/* Blob 16 - micro orb 2 */}
      <div 
        className={`absolute top-1/4 right-20 w-8 h-8 bg-white rounded-full filter blur-lg opacity-80 transition-opacity duration-[3000ms] ease-out delay-[1500ms] ${
          isLoaded ? 'animate-blob-drift-left' : 'opacity-0'
        }`} 
        style={{ animationDelay: '24s' }}
      ></div>
      
      {/* Subtle noise texture overlay */}
      <div className="absolute inset-0 opacity-5 pattern-grain"></div>
    </div>
  );
}