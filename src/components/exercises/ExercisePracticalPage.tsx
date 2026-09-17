import React from 'react';
import { 
  ArrowLeft, 
  Bookmark, 
  Dumbbell, 
  AlertTriangle, 
  ShieldCheck, 
  Layers, 
  Repeat, 
  Clock, 
  CheckCircle2,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useFitness } from '../../context/FitnessContext';

export const ExercisePracticalPage: React.FC = () => {
  const { 
    selectedExerciseId, 
    exercises, 
    setCurrentView, 
    toggleFavorite, 
    openComparison, 
    startWorkout 
  } = useFitness();

  const exercise = exercises.find(e => e.id === selectedExerciseId) || exercises[0];

  if (!exercise) {
    return (
      <div className="py-20 text-center select-none">
        <p className="text-neutral-400">Exercise not found.</p>
        <button
          onClick={() => setCurrentView('exercises')}
          className="mt-4 px-4 py-2 rounded-xl bg-[#ff5722] text-white font-bold text-xs"
        >
          Back to Library
        </button>
      </div>
    );
  }

  return (
    <div className="py-6 px-4 sm:px-6 max-w-7xl mx-auto space-y-8 select-none">
      {/* Top Breadcrumb & Action Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => {
            setCurrentView('exercises');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2 text-xs font-bold text-neutral-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>BACK TO EXERCISE LIBRARY</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => openComparison(exercise.id)}
            className="px-3 py-1.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold text-neutral-300 hover:text-white border border-neutral-700 flex items-center gap-1.5 transition-all"
          >
            <Layers className="w-3.5 h-3.5 text-[#00ff66]" />
            <span>Compare</span>
          </button>

          <button
            onClick={() => toggleFavorite(exercise.id)}
            className={`p-2 rounded-xl border transition-all ${
              exercise.isFavorite 
                ? 'bg-amber-500/20 border-amber-500/50 text-amber-400' 
                : 'bg-neutral-800 border-neutral-700 text-neutral-400 hover:text-white'
            }`}
            title="Save to Favorites"
          >
            <Bookmark className={`w-4 h-4 ${exercise.isFavorite ? 'fill-amber-400' : ''}`} />
          </button>
        </div>
      </div>

      {/* Main Split Layout: Left Avatar | Right Exercise Telemetry */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT SIDE (Section 17): Realistic Human Photo */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative w-full h-[520px] rounded-2xl overflow-hidden bg-gradient-to-br from-[#1c1c1e] to-[#2a2a2e] border border-[#2a2a2e]">
            <img
              src="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&q=80"
              alt="Professional fitness trainer demonstrating proper exercise form"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                <span className="text-white text-sm font-semibold">Live Demonstration</span>
              </div>
              <p className="text-neutral-200 text-xs">Watch proper form and technique from professional trainers</p>
            </div>
          </div>

          {/* Quick Telemetry Strip */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3.5 rounded-2xl bg-[#1c1c1e] border border-[#2a2a2e] text-center">
              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">Sets</span>
              <p className="text-base font-black text-white mt-0.5">{exercise.sets} Sets</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#1c1c1e] border border-[#2a2a2e] text-center">
              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">Reps / Time</span>
              <p className="text-base font-black text-white mt-0.5">{exercise.reps}</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#1c1c1e] border border-[#2a2a2e] text-center">
              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">Rest Interval</span>
              <p className="text-base font-black text-[#00ff66] mt-0.5">{exercise.restSeconds}s Rest</p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE (Section 17): Detailed Exercise Information */}
        <div className="lg:col-span-6 space-y-6">
          {/* Title & Badges */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 text-xs font-bold uppercase rounded-full bg-[#ff5722]/20 text-[#ff5722] border border-[#ff5722]/40">
                {exercise.primaryMuscle} Focus
              </span>
              <span className="px-3 py-1 text-xs font-semibold rounded-full bg-neutral-800 text-neutral-300 border border-neutral-700">
                {exercise.location}
              </span>
              <span className="px-3 py-1 text-xs font-semibold rounded-full bg-neutral-800 text-neutral-300 border border-neutral-700">
                {exercise.difficulty}
              </span>
              <span className="px-3 py-1 text-xs font-semibold rounded-full bg-[#00ff66]/15 text-[#00ff66] border border-[#00ff66]/30">
                {exercise.type}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              {exercise.name}
            </h1>
            <p className="text-sm text-neutral-300 leading-relaxed">
              {exercise.description}
            </p>
          </div>

          {/* MUSCLES WORKED */}
          <div className="p-5 rounded-2xl bg-[#1c1c1e] border border-[#2a2a2e] space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400">Muscles Targeted</h3>
            <div className="flex flex-wrap gap-2">
              <div className="px-3 py-1.5 rounded-xl bg-[#ff5722]/20 border border-[#ff5722]/40 text-xs font-bold text-[#ff5722] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#ff5722] animate-pulse" />
                Primary: {exercise.primaryMuscle}
              </div>
              {exercise.secondaryMuscles.map(sec => (
                <div key={sec} className="px-3 py-1.5 rounded-xl bg-neutral-800/80 border border-neutral-700 text-xs font-medium text-neutral-300">
                  Secondary: {sec}
                </div>
              ))}
            </div>
            {exercise.targetJoints && exercise.targetJoints.length > 0 && (
              <p className="text-[11px] text-neutral-500 font-medium">
                Articulating Joints: {exercise.targetJoints.join(', ')}
              </p>
            )}
          </div>

          {/* HOW TO PERFORM (Step 1, Step 2, Step 3, Step 4) */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#00ff66]" />
              HOW TO PERFORM STEP-BY-STEP
            </h3>
            <div className="space-y-2.5">
              {exercise.instructions.map((step, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-[#1c1c1e] border border-[#2a2a2e] flex items-start gap-3">
                  <span className="w-6 h-6 rounded-lg bg-neutral-800 border border-neutral-700 text-xs font-bold text-[#ff5722] flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <p className="text-xs text-neutral-300 leading-relaxed">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* COMMON MISTAKES (With Warning Icons) */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              COMMON MISTAKES TO AVOID
            </h3>
            <div className="space-y-2">
              {exercise.commonMistakes.map((mistake, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-start gap-2.5 text-xs text-amber-200">
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>{mistake}</span>
                </div>
              ))}
            </div>
          </div>

          {/* SAFETY TIPS */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              SAFETY & JOINT INTEGRITY TIPS
            </h3>
            <div className="space-y-2">
              {exercise.safetyTips.map((tip, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-start gap-2.5 text-xs text-emerald-200">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{tip}</span>
                </div>
              ))}
            </div>
          </div>

          {/* HOME VS GYM ALTERNATIVES & MODIFICATIONS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 space-y-1">
              <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">Home Alternative</p>
              <p className="text-xs font-semibold text-white">{exercise.homeAlternative}</p>
            </div>
            <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 space-y-1">
              <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">Gym Alternative</p>
              <p className="text-xs font-semibold text-white">{exercise.gymAlternative}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 space-y-1">
              <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">Beginner Modification</p>
              <p className="text-xs text-neutral-300">{exercise.beginnerModification}</p>
            </div>
            <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 space-y-1">
              <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">Advanced Modification</p>
              <p className="text-xs text-neutral-300">{exercise.advancedModification}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
