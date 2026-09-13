import React, { useEffect, useState } from 'react';
import { Zap, Dumbbell } from 'lucide-react';

interface LoadingScreenProps {
  onComplete?: () => void;
  duration?: number;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete, duration = 1600 }) => {
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFade(true);
      setTimeout(() => {
        onComplete?.();
      }, 400);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onComplete]);

  return (
    <div className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#121212] transition-opacity duration-500 select-none ${
      fade ? 'opacity-0 pointer-events-none' : 'opacity-100'
    }`}>
      {/* Background ambient lighting */}
      <div className="absolute w-96 h-96 rounded-full bg-[#ff5722]/10 blur-[120px] pointer-events-none" />
      <div className="absolute w-80 h-80 rounded-full bg-[#00ff66]/5 blur-[100px] pointer-events-none" />

      {/* Center Logo and Symbol */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Animated Badge Icon */}
        <div className="relative mb-6 flex items-center justify-center">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-[#1c1c1e] to-[#2a2a2e] border border-white/10 flex items-center justify-center shadow-2xl animate-pulse-glow">
            <Dumbbell className="w-10 h-10 text-[#ff5722] animate-bounce" style={{ animationDuration: '1.8s' }} />
          </div>
          <div className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-[#00ff66] flex items-center justify-center shadow-lg">
            <Zap className="w-3.5 h-3.5 text-black fill-black" />
          </div>
        </div>

        {/* Brand Name */}
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white flex items-center gap-2">
          YOU <span className="text-[#ff5722]">CAN</span>
        </h1>

        {/* Dynamic Tagline */}
        <p className="mt-3 text-sm font-semibold tracking-[0.25em] text-[#ff5722] uppercase animate-pulse">
          GET READY. YOU CAN.
        </p>

        {/* Subtle Loading Bar */}
        <div className="mt-8 w-48 h-1 bg-neutral-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-[#ff5722] to-[#00ff66] rounded-full transition-all ease-out"
            style={{ 
              width: '100%', 
              transitionDuration: `${duration}ms` 
            }}
          />
        </div>
      </div>
    </div>
  );
};
