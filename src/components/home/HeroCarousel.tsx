import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, Sparkles, ArrowRight } from 'lucide-react';
import { useFitness } from '../../context/FitnessContext';

export const HeroCarousel: React.FC = () => {
  const { carouselSlides, setCurrentView } = useFitness();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const activeSlides = carouselSlides.filter(s => s.active);

  // Auto-play interval with pause on hover
  useEffect(() => {
    if (isHovered || activeSlides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlideIndex(prev => (prev + 1) % activeSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isHovered, activeSlides.length]);

  if (activeSlides.length === 0) return null;
  const slide = activeSlides[currentSlideIndex] || activeSlides[0];

  const handleNext = () => {
    setCurrentSlideIndex(prev => (prev + 1) % activeSlides.length);
  };

  const handlePrev = () => {
    setCurrentSlideIndex(prev => (prev - 1 + activeSlides.length) % activeSlides.length);
  };

  const handleCta = (action: string) => {
    if (action === 'generator') setCurrentView('generator');
    else if (action === 'exercises') setCurrentView('exercises');
    else if (action === 'dashboard') setCurrentView('dashboard');
    else setCurrentView('workouts');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div 
      className="relative w-full overflow-hidden rounded-3xl bg-gradient-to-br from-[#1c1c1e] via-[#17171a] to-[#121212] border border-[#2a2a2e] shadow-2xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Dynamic Background Glow Pattern */}
      <div 
        className="absolute -top-24 -right-24 w-96 h-96 rounded-full blur-[100px] opacity-25 transition-all duration-700 pointer-events-none"
        style={{ backgroundColor: slide.accent || '#ff5722' }}
      />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-[#00ff66]/10 blur-[90px] pointer-events-none" />

      {/* Slide Content Area */}
      <div className="relative z-10 px-6 py-12 md:px-12 md:py-16 flex flex-col md:flex-row items-center justify-between gap-8 min-h-[380px]">
        {/* Left Column: Text & CTA */}
        <div className="flex-1 max-w-xl text-left space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-800/80 border border-neutral-700/60 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-[#ff5722]" />
            <span className="text-[11px] font-black tracking-widest uppercase text-white">
              {slide.badge}
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
            {slide.title}
          </h2>

          <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
            {slide.subtitle}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => handleCta(slide.ctaAction)}
              className="px-6 py-3.5 rounded-2xl bg-[#ff5722] hover:bg-[#ff5722]/90 text-white text-sm font-black tracking-wider uppercase shadow-xl shadow-[#ff5722]/25 flex items-center gap-2 transition-all active:scale-95"
            >
              <span>{slide.ctaText}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                setCurrentView('exercises');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-6 py-3.5 rounded-2xl bg-neutral-800/80 hover:bg-neutral-800 text-neutral-200 hover:text-white text-sm font-bold border border-neutral-700/80 transition-all active:scale-95"
            >
              EXPLORE EXERCISES
            </button>
          </div>
        </div>

        {/* Right Column: Dynamic Visual Badge Display */}
        <div className="w-full md:w-auto flex items-center justify-center">
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-3xl bg-neutral-900/60 border border-neutral-800/80 flex flex-col items-center justify-center p-6 text-center backdrop-blur-md shadow-2xl">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-[#ff5722] to-amber-500 flex items-center justify-center shadow-lg shadow-[#ff5722]/30 mb-4 animate-float">
              <Play className="w-8 h-8 text-white fill-white ml-1" />
            </div>
            <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider">YOU CAN PLATFORM</p>
            <p className="text-lg font-black text-white mt-1">Train Strong. Move Better.</p>
            <p className="text-xs text-[#00ff66] font-semibold mt-2">Interactive 3D Virtual Coach Ready</p>
          </div>
        </div>
      </div>

      {/* Navigation Controls: Arrows & Pagination Dots */}
      <div className="relative z-10 px-6 pb-6 flex items-center justify-between">
        {/* Pagination Dots */}
        <div className="flex items-center gap-2">
          {activeSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlideIndex(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentSlideIndex === idx 
                  ? 'w-8 bg-[#ff5722]' 
                  : 'w-2 bg-neutral-700 hover:bg-neutral-600'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Next / Prev Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            className="p-2.5 rounded-xl bg-neutral-800/80 hover:bg-neutral-700 text-neutral-300 hover:text-white border border-neutral-700/60 transition-all active:scale-95"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={handleNext}
            className="p-2.5 rounded-xl bg-neutral-800/80 hover:bg-neutral-700 text-neutral-300 hover:text-white border border-neutral-700/60 transition-all active:scale-95"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
