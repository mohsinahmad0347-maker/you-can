import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play, Sparkles, ArrowRight } from 'lucide-react';
import { useFitness } from '../../context/FitnessContext';
import { CAROUSEL_IMAGES } from '../../data/initialData';

const AUTOPLAY_MS = 6000;
const IMAGE_WIDTHS = [640, 1024, 1600, 2000];

/** Responsive CDN delivery — widens the image URL per breakpoint (skipped for local assets). */
const buildSrcSet = (url?: string): string | undefined => {
  if (!url || !url.startsWith('http')) return undefined;
  const separator = url.includes('?') ? '&' : '?';
  return IMAGE_WIDTHS.map(width => `${url}${separator}w=${width} ${width}w`).join(', ');
};

/** Users who ask for less motion get a static hero (no auto-advance). */
const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const HeroCarousel: React.FC = () => {
  const { carouselSlides, setCurrentView } = useFitness();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Always render slides in the order configured in the admin dashboard
  const activeSlides = useMemo(
    () => carouselSlides.filter(s => s.active).sort((a, b) => a.order - b.order),
    [carouselSlides]
  );
  const slideCount = activeSlides.length;

  const goTo = useCallback((index: number) => {
    if (slideCount === 0) return;
    setCurrentSlideIndex(((index % slideCount) + slideCount) % slideCount);
  }, [slideCount]);

  const handleNext = useCallback(() => goTo(currentSlideIndex + 1), [currentSlideIndex, goTo]);
  const handlePrev = useCallback(() => goTo(currentSlideIndex - 1), [currentSlideIndex, goTo]);

  // Keep the index valid when slides are added, removed or deactivated in the admin panel
  useEffect(() => {
    if (slideCount === 0) return;
    setCurrentSlideIndex(prev => (prev >= slideCount ? 0 : prev));
  }, [slideCount]);

  // Auto-play interval with pause on hover (and respect for reduced-motion)
  useEffect(() => {
    if (isHovered || isPaused || slideCount <= 1) return;
    if (prefersReducedMotion()) return;
    const timer = window.setInterval(() => {
      setCurrentSlideIndex(prev => (prev + 1) % slideCount);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(timer);
  }, [isHovered, isPaused, slideCount]);

  if (slideCount === 0) return null;
  const slide = activeSlides[currentSlideIndex] || activeSlides[0];

  const handleCta = (action: string) => {
    if (action === 'generator') setCurrentView('generator');
    else if (action === 'exercises') setCurrentView('exercises');
    else if (action === 'dashboard') setCurrentView('dashboard');
    else setCurrentView('workouts');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToExercises = () => {
    setCurrentView('exercises');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Left / Right arrow keys move between slides once the hero has focus
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      handlePrev();
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      handleNext();
    }
  };

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="YOU CAN featured highlights"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full overflow-hidden rounded-3xl bg-[#1c1c1e] border border-[#2a2a2e] shadow-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff5722]/70"
    >
      {/* Real fitness photography crossfading behind the copy (one layer per active slide) */}
      <div className="absolute inset-0">
        {activeSlides.map((item, index) => {
          const image = item.image || CAROUSEL_IMAGES[index % CAROUSEL_IMAGES.length];
          const isCurrent = index === currentSlideIndex;
          return (
            <img
              key={item.id}
              src={image}
              srcSet={buildSrcSet(image)}
              sizes="100vw"
              alt={isCurrent ? (item.imageAlt || '') : ''}
              draggable={false}
              loading={index === 0 ? 'eager' : 'lazy'}
              decoding="async"
              className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-700 ease-out ${
                isCurrent ? 'opacity-100' : 'opacity-0'
              }`}
            />
          );
        })}
      </div>

      {/* Legibility overlays: dark left → transparent right, plus a bottom vignette */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/70 to-black/25 pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black/85 to-transparent pointer-events-none" />

      {/* Dynamic Background Glow Pattern */}
      <div 
        className="absolute -top-24 -right-24 w-96 h-96 rounded-full blur-[100px] opacity-25 transition-all duration-700 pointer-events-none"
        style={{ backgroundColor: slide.accent || '#ff5722' }}
      />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-[#00ff66]/10 blur-[90px] pointer-events-none" />

      {/* Slide Content Area */}
      <div className="relative z-10 px-6 py-12 md:px-12 md:py-16 flex flex-col md:flex-row items-center justify-between gap-8 min-h-[400px] sm:min-h-[440px] lg:min-h-[480px]">
        {/* Left Column: Text & CTA */}
        <div className="flex-1 max-w-xl text-left space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 border border-white/20 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-[#ff5722]" />
            <span className="text-[11px] font-black tracking-widest uppercase text-white">
              {slide.badge}
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.55)]">
            {slide.title}
          </h2>

          <p className="text-sm sm:text-base text-neutral-200 leading-relaxed drop-shadow-[0_1px_8px_rgba(0,0,0,0.6)]">
            {slide.subtitle}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => handleCta(slide.ctaAction)}
              className="px-6 py-3.5 rounded-2xl bg-[#ff5722] hover:bg-[#ff8a65] text-white text-sm font-black tracking-wider uppercase shadow-xl shadow-[#ff5722]/30 flex items-center gap-2 transition-all active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
            >
              <span>{slide.ctaText}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={goToExercises}
              className="px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white text-sm font-bold border border-white/25 backdrop-blur-md transition-all active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
            >
              EXPLORE EXERCISES
            </button>
          </div>
        </div>

        {/* Right Column: Dynamic Visual Badge Display */}
        <div className="w-full md:w-auto flex items-center justify-center">
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-3xl bg-black/35 border border-white/15 flex flex-col items-center justify-center p-6 text-center backdrop-blur-xl shadow-2xl overflow-hidden">
            <div
              className="absolute -top-16 -right-16 w-40 h-40 rounded-full blur-3xl opacity-40 transition-colors duration-700 pointer-events-none"
              style={{ backgroundColor: slide.accent || '#ff5722' }}
            />
            <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-tr from-[#ff5722] to-amber-500 flex items-center justify-center shadow-lg shadow-[#ff5722]/30 mb-4 animate-float">
              <Play className="w-8 h-8 text-white fill-white ml-1" />
            </div>
            <p className="relative text-xs font-bold text-neutral-300 uppercase tracking-wider">
              {slide.badge || 'YOU CAN PLATFORM'}
            </p>
            <p className="relative text-lg font-black text-white mt-1">Train Strong. Move Better.</p>
            <p className="relative text-xs text-[#00ff66] font-semibold mt-2">Interactive 3D Virtual Coach Ready</p>
          </div>
        </div>
      </div>

      {/* Navigation Controls: counter, pagination dots, arrows & autoplay toggle */}
      <div className="relative z-10 px-6 pb-6 flex flex-wrap items-center justify-between gap-4">
        {/* Slide counter + Pagination Dots */}
        <div className="flex items-center gap-4">
          <span className="text-[11px] font-black tracking-widest text-white/70 tabular-nums">
            {String(currentSlideIndex + 1).padStart(2, '0')}
            <span className="text-white/30"> / </span>
            {String(slideCount).padStart(2, '0')}
          </span>
          <div className="flex items-center gap-2">
            {activeSlides.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => goTo(idx)}
                className={`h-2 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff5722]/70 ${
                  currentSlideIndex === idx
                    ? 'w-8 bg-[#ff5722]'
                    : 'w-2 bg-white/30 hover:bg-white/60'
                }`}
                aria-label={`Go to slide ${idx + 1}: ${item.title}`}
                aria-current={currentSlideIndex === idx}
              />
            ))}
          </div>
        </div>

        {/* Prev / Autoplay / Next */}
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-md transition-all active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff5722]/70"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsPaused(prev => !prev)}
            className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-md transition-all active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff5722]/70"
            aria-label={isPaused ? 'Resume automatic slideshow' : 'Pause automatic slideshow'}
            aria-pressed={isPaused}
          >
            {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
          </button>
          <button
            onClick={handleNext}
            className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-md transition-all active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff5722]/70"
            aria-label="Next slide"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
