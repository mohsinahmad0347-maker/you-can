import React, { useState } from 'react';
import { 
  Flame, 
  Clock, 
  Play, 
  Bookmark, 
  Dumbbell, 
  Sparkles, 
  Search, 
  ChevronRight,
  Filter
} from 'lucide-react';
import { useFitness } from '../../context/FitnessContext';

export const WorkoutPlansPage: React.FC = () => {
  const { workouts, startWorkout, toggleWorkoutFavorite, setCurrentView } = useFitness();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Full Body', 'Strength', 'Home Workouts', 'Conditioning', 'Recovery'];

  const filteredWorkouts = workouts.filter(w => {
    if (selectedCategory !== 'All' && w.category !== selectedCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      if (!w.name.toLowerCase().includes(q) && !w.description.toLowerCase().includes(q) && !w.goal.toLowerCase().includes(q)) {
        return false;
      }
    }
    return true;
  });

  return (
    <div className="py-6 px-4 sm:px-6 max-w-7xl mx-auto space-y-8 select-none">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ff5722]/15 text-[#ff5722] text-xs font-bold mb-2">
            <Flame className="w-3.5 h-3.5" />
            CURATED TRAINING PROGRAMS
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Workout Plans
          </h1>
          <p className="text-sm text-neutral-400 mt-1">
            Structured fitness routines built for progressive overload, metabolic conditioning, and complete physical transformation.
          </p>
        </div>

        <button
          onClick={() => {
            setCurrentView('generator');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="px-5 py-3 rounded-2xl bg-[#ff5722] hover:bg-[#ff5722]/90 text-white text-xs font-black tracking-wider uppercase flex items-center gap-2 shadow-lg shadow-[#ff5722]/20 transition-all active:scale-95 shrink-0"
        >
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>GENERATE CUSTOM WORKOUT</span>
        </button>
      </div>

      {/* Filter Tabs & Search */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center">
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                selectedCategory === cat 
                  ? 'bg-[#ff5722] border-[#ff5722] text-white shadow-md' 
                  : 'bg-[#1c1c1e] border-[#2a2a2e] text-neutral-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex items-center px-3.5 py-2 bg-neutral-900 border border-neutral-800 rounded-xl max-w-xs focus-within:border-[#ff5722]">
          <Search className="w-4 h-4 text-neutral-500 mr-2" />
          <input
            type="text"
            placeholder="Filter workouts..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-transparent text-xs text-white outline-none"
          />
        </div>
      </div>

      {/* Grid of Workouts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredWorkouts.map(wo => (
          <div
            key={wo.id}
            className="p-6 rounded-3xl bg-[#1c1c1e] border border-[#2a2a2e] hover:border-neutral-700 flex flex-col justify-between transition-all shadow-xl group"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-neutral-800 text-[11px] font-bold text-neutral-300">
                  {wo.category}
                </span>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 text-xs font-semibold text-neutral-400">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{wo.durationMinutes}m</span>
                  </div>
                  <button
                    onClick={() => toggleWorkoutFavorite(wo.id)}
                    className="p-1 text-neutral-500 hover:text-amber-400"
                  >
                    <Bookmark className={`w-4 h-4 ${wo.isFavorite ? 'fill-amber-400 text-amber-400' : ''}`} />
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white group-hover:text-[#ff5722] transition-colors">
                  {wo.name}
                </h3>
                <p className="text-xs text-neutral-400 mt-1.5 line-clamp-2 leading-relaxed">
                  {wo.description}
                </p>
              </div>

              {/* Exercise preview rows */}
              <div className="space-y-1.5 pt-2 border-t border-neutral-800/80">
                <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">
                  Included Movements:
                </p>
                {wo.exercises.slice(0, 3).map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs text-neutral-300">
                    <span className="truncate max-w-[200px]">• {item.exerciseName}</span>
                    <span className="text-neutral-500 text-[11px] font-mono">{item.sets} × {item.reps}</span>
                  </div>
                ))}
                {wo.exercises.length > 3 && (
                  <p className="text-[11px] text-[#ff5722] font-semibold">
                    + {wo.exercises.length - 3} additional exercises
                  </p>
                )}
              </div>
            </div>

            <button
              onClick={() => startWorkout(wo)}
              className="mt-6 w-full py-3.5 rounded-2xl bg-[#ff5722] hover:bg-[#ff5722]/90 text-white text-xs font-black tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg shadow-[#ff5722]/20 transition-all active:scale-95"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>START WORKOUT</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
