import React from 'react';
import { 
  Bookmark, 
  Dumbbell, 
  Flame, 
  Clock, 
  ArrowRight,
  Heart,
  Sparkles
} from 'lucide-react';
import { useFitness } from '../../context/FitnessContext';

export const FavoritesPage: React.FC = () => {
  const { 
    exercises, 
    workouts, 
    openExerciseDetail, 
    toggleFavorite, 
    toggleWorkoutFavorite,
    startWorkout 
  } = useFitness();

  const favoriteExercises = exercises.filter(e => e.isFavorite);
  const favoriteWorkouts = workouts.filter(w => w.isFavorite);

  return (
    <div className="py-6 px-4 sm:px-6 max-w-7xl mx-auto space-y-8 select-none">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 text-amber-400 text-xs font-bold mb-2">
            <Heart className="w-3.5 h-3.5 fill-amber-400" />
            YOUR FAVORITE COLLECTION
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Favorites
          </h1>
          <p className="text-sm text-neutral-400 mt-1">
            Quick access to your favorite exercises and workouts.
          </p>
        </div>
      </div>

      {/* Favorite Exercises Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Dumbbell className="w-5 h-5 text-[#ff5722]" />
            Favorite Exercises
            <span className="text-sm font-normal text-neutral-400">({favoriteExercises.length})</span>
          </h2>
        </div>

        {favoriteExercises.length === 0 ? (
          <div className="py-12 text-center rounded-3xl bg-[#1c1c1e] border border-[#2a2a2e] space-y-3">
            <Bookmark className="w-10 h-10 text-neutral-600 mx-auto" />
            <h3 className="text-base font-bold text-white">No favorite exercises yet</h3>
            <p className="text-xs text-neutral-500">Start exploring the exercise library and save your favorites!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoriteExercises.map(ex => (
              <div
                key={ex.id}
                className="p-6 rounded-3xl bg-[#1c1c1e] border border-[#2a2a2e] hover:border-amber-500/50 flex flex-col justify-between transition-all shadow-xl group relative"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2.5 py-1 text-[10px] font-bold uppercase rounded-md bg-[#ff5722]/15 text-[#ff5722] border border-[#ff5722]/30">
                      {ex.primaryMuscle}
                    </span>
                    <button
                      onClick={() => toggleFavorite(ex.id)}
                      className="p-1 text-amber-400 hover:text-amber-300 transition-colors"
                    >
                      <Bookmark className="w-4 h-4 fill-amber-400" />
                    </button>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-[#ff5722] transition-colors">
                    {ex.name}
                  </h3>

                  <p className="text-xs text-neutral-400 mt-2 line-clamp-2 leading-relaxed">
                    {ex.description}
                  </p>

                  <div className="mt-4 pt-3 border-t border-neutral-800/80 flex items-center justify-between text-[11px] text-neutral-400">
                    <span className="font-semibold text-[#00ff66]">{ex.difficulty}</span>
                    <span>{ex.location}</span>
                  </div>
                </div>

                <button
                  onClick={() => openExerciseDetail(ex.id)}
                  className="mt-6 w-full py-3 rounded-2xl bg-neutral-800 hover:bg-[#ff5722] text-white text-xs font-black tracking-wider uppercase flex items-center justify-center gap-2 transition-all shadow-md active:scale-95"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Favorite Workouts Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Flame className="w-5 h-5 text-[#ff5722]" />
            Favorite Workouts
            <span className="text-sm font-normal text-neutral-400">({favoriteWorkouts.length})</span>
          </h2>
        </div>

        {favoriteWorkouts.length === 0 ? (
          <div className="py-12 text-center rounded-3xl bg-[#1c1c1e] border border-[#2a2a2e] space-y-3">
            <Sparkles className="w-10 h-10 text-neutral-600 mx-auto" />
            <h3 className="text-base font-bold text-white">No favorite workouts yet</h3>
            <p className="text-xs text-neutral-500">Explore workout plans and save your favorites!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {favoriteWorkouts.map(workout => (
              <div
                key={workout.id}
                className="p-6 rounded-3xl bg-[#1c1c1e] border border-[#2a2a2e] hover:border-[#ff5722]/50 transition-all shadow-xl group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded bg-[#ff5722]/15 text-[#ff5722]">
                        {workout.goal}
                      </span>
                      <span className="px-2 py-0.5 text-[10px] font-semibold rounded bg-neutral-800 text-neutral-300">
                        {workout.difficulty}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-white group-hover:text-[#ff5722] transition-colors">
                      {workout.name}
                    </h3>
                  </div>
                  <button
                    onClick={() => toggleWorkoutFavorite(workout.id)}
                    className="p-1 text-amber-400 hover:text-amber-300 transition-colors"
                  >
                    <Bookmark className="w-4 h-4 fill-amber-400" />
                  </button>
                </div>

                <p className="text-xs text-neutral-400 line-clamp-2 mb-4">
                  {workout.description}
                </p>

                <div className="flex items-center gap-4 text-xs text-neutral-400 mb-4">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{workout.durationMinutes} min</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Dumbbell className="w-3.5 h-3.5" />
                    <span>{workout.exercises.length} exercises</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-[#00ff66]/15 text-[#00ff66] text-[10px] font-bold">
                    {workout.location}
                  </span>
                </div>

                <button
                  onClick={() => startWorkout(workout)}
                  className="w-full py-3 rounded-2xl bg-[#ff5722] hover:bg-[#ff5722]/90 text-white text-xs font-black tracking-wider uppercase flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#ff5722]/25 active:scale-95"
                >
                  <Flame className="w-4 h-4 fill-white" />
                  <span>Start Workout</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
