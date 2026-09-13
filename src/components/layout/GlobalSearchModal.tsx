import React, { useState, useMemo } from 'react';
import { Search, X, Dumbbell, Flame, Compass, ChevronRight } from 'lucide-react';
import { useFitness } from '../../context/FitnessContext';

export const GlobalSearchModal: React.FC = () => {
  const { 
    isSearchOpen, 
    setIsSearchOpen, 
    exercises, 
    workouts, 
    openExerciseDetail, 
    startWorkout, 
    setSelectedCategoryFilter,
    setCurrentView 
  } = useFitness();

  const [query, setQuery] = useState('');

  const filteredResults = useMemo(() => {
    if (!query.trim()) return { exercises: [], workouts: [], categories: [] };
    const q = query.toLowerCase();

    const matchedExercises = exercises.filter(e => 
      e.name.toLowerCase().includes(q) ||
      e.primaryMuscle.toLowerCase().includes(q) ||
      e.equipment.some(eq => eq.toLowerCase().includes(q)) ||
      e.type.toLowerCase().includes(q)
    ).slice(0, 6);

    const matchedWorkouts = workouts.filter(w => 
      w.name.toLowerCase().includes(q) ||
      w.goal.toLowerCase().includes(q) ||
      w.category.toLowerCase().includes(q)
    ).slice(0, 4);

    const muscleGroups = ['Chest', 'Back', 'Shoulders', 'Biceps', 'Triceps', 'Legs', 'Core', 'Cardio', 'Mobility'];
    const matchedCategories = muscleGroups.filter(m => m.toLowerCase().includes(q));

    return {
      exercises: matchedExercises,
      workouts: matchedWorkouts,
      categories: matchedCategories
    };
  }, [query, exercises, workouts]);

  if (!isSearchOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/75 backdrop-blur-md transition-all animate-in fade-in">
      <div 
        className="w-full max-w-2xl bg-[#1c1c1e] border border-[#2a2a2e] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 border-b border-[#2a2a2e] flex items-center gap-3">
          <Search className="w-5 h-5 text-[#ff5722]" />
          <input
            type="text"
            placeholder="Search exercises, workouts, muscle groups, equipment (e.g. Chest, Squat, Push-up)..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            autoFocus
            className="flex-1 bg-transparent text-white placeholder-neutral-500 text-sm md:text-base outline-none font-medium"
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="p-1 text-neutral-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-neutral-800 text-neutral-400 hover:text-white"
          >
            ESC
          </button>
        </div>

        {/* Quick Suggestion Chips */}
        {!query && (
          <div className="p-4 border-b border-[#2a2a2e]/60 bg-neutral-900/40">
            <p className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">Popular Searches</p>
            <div className="flex flex-wrap gap-2">
              {['Chest', 'Squat', 'Push-up', 'Full Body', 'Pull-up', 'Home Workout', 'Core', 'Mobility'].map(chip => (
                <button
                  key={chip}
                  onClick={() => setQuery(chip)}
                  className="px-3 py-1 rounded-full text-xs font-medium bg-neutral-800/80 hover:bg-[#ff5722]/20 hover:text-[#ff5722] border border-neutral-700/60 hover:border-[#ff5722]/40 transition-all text-neutral-300"
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-5">
          {/* Categories / Muscle Groups */}
          {filteredResults.categories.length > 0 && (
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2 flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-[#00ff66]" /> Muscle Groups
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {filteredResults.categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategoryFilter(cat);
                      setCurrentView('exercises');
                      setIsSearchOpen(false);
                    }}
                    className="p-2.5 rounded-xl bg-neutral-800/60 hover:bg-neutral-800 border border-neutral-700/60 hover:border-[#00ff66]/50 text-left transition-all"
                  >
                    <p className="text-xs font-bold text-white">{cat} Exercises</p>
                    <p className="text-[11px] text-neutral-400">View muscle library</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Exercises */}
          {filteredResults.exercises.length > 0 && (
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2 flex items-center gap-1.5">
                <Dumbbell className="w-3.5 h-3.5 text-[#ff5722]" /> Exercises
              </p>
              <div className="space-y-1.5">
                {filteredResults.exercises.map(ex => (
                  <button
                    key={ex.id}
                    onClick={() => {
                      openExerciseDetail(ex.id);
                      setIsSearchOpen(false);
                    }}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl bg-neutral-900/60 hover:bg-neutral-800 border border-neutral-800 hover:border-[#ff5722]/50 text-left transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#2a2a2a] flex items-center justify-center text-[#ff5722] group-hover:scale-110 transition-transform">
                        <Dumbbell className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white group-hover:text-[#ff5722] transition-colors">{ex.name}</p>
                        <p className="text-xs text-neutral-400">{ex.primaryMuscle} • {ex.equipment.join(', ')} • {ex.difficulty}</p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-neutral-500 group-hover:text-white transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Workouts */}
          {filteredResults.workouts.length > 0 && (
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2 flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-amber-400" /> Workout Programs
              </p>
              <div className="space-y-1.5">
                {filteredResults.workouts.map(wo => (
                  <button
                    key={wo.id}
                    onClick={() => {
                      startWorkout(wo);
                      setIsSearchOpen(false);
                    }}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl bg-neutral-900/60 hover:bg-neutral-800 border border-neutral-800 hover:border-amber-400/50 text-left transition-all group"
                  >
                    <div>
                      <p className="text-sm font-semibold text-white group-hover:text-amber-400 transition-colors">{wo.name}</p>
                      <p className="text-xs text-neutral-400">{wo.durationMinutes} min • {wo.goal} • {wo.difficulty}</p>
                    </div>
                    <span className="px-2 py-1 rounded bg-[#ff5722] text-[11px] font-bold text-white">Start</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {query.trim() && 
           filteredResults.categories.length === 0 && 
           filteredResults.exercises.length === 0 && 
           filteredResults.workouts.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-neutral-400 text-sm font-medium">No exercises or workouts found matching "{query}"</p>
              <p className="text-neutral-600 text-xs mt-1">Try searching by muscle group, equipment, or exercise name.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
