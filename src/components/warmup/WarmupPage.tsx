import React from 'react';
import { 
  Activity, 
  Flame, 
  Clock, 
  Play, 
  ArrowRight,
  Zap,
  Heart
} from 'lucide-react';
import { useFitness } from '../../context/FitnessContext';

export const WarmupPage: React.FC = () => {
  const { exercises, openExerciseDetail, startWorkout } = useFitness();

  const warmupExercises = exercises.filter(ex => 
    ex.type === 'Mobility' || ex.type === 'Cardio' || ex.difficulty === 'Beginner'
  ).slice(0, 8);

  const warmupRoutines = [
    {
      id: 'warmup-quick',
      name: 'Quick 5-Minute Warm-up',
      description: 'Essential movements to prepare your body for any workout',
      duration: 5,
      exercises: ['Jumping Jacks', 'Arm Circles', 'Leg Swings', 'Bodyweight Squats']
    },
    {
      id: 'warmup-full',
      name: 'Comprehensive 10-Minute Warm-up',
      description: 'Complete warm-up routine with mobility and activation',
      duration: 10,
      exercises: ['Jumping Jacks', 'Arm Circles', 'Leg Swings', 'Bodyweight Squats', 'Cat-Cow', 'World\'s Greatest Stretch', 'Hip Openers', 'Shoulder Rolls']
    },
    {
      id: 'warmupper-body',
      name: 'Upper Body Warm-up',
      description: 'Focus on shoulders, chest, and back preparation',
      duration: 8,
      exercises: ['Arm Circles', 'Shoulder Rolls', 'Band Pull-aparts', 'Push-up to Plank']
    },
    {
      id: 'warmup-lower-body',
      name: 'Lower Body Warm-up',
      description: 'Prepare hips, knees, and ankles for leg training',
      duration: 8,
      exercises: ['Leg Swings', 'Bodyweight Squats', 'Lunges with Rotation', 'Ankle Circles']
    }
  ];

  return (
    <div className="py-6 px-4 sm:px-6 max-w-7xl mx-auto space-y-8 select-none">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 text-amber-400 text-xs font-bold mb-2">
            <Activity className="w-3.5 h-3.5" />
            PREPARATION & ACTIVATION
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Warm-up Library
          </h1>
          <p className="text-sm text-neutral-400 mt-1">
            Proper warm-up exercises to prepare your body and prevent injury.
          </p>
        </div>
      </div>

      {/* Warm-up Importance */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-[#1c1c1e] via-[#222226] to-[#1c1c1e] border border-amber-500/30 shadow-xl">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/15 text-amber-400 flex items-center justify-center shrink-0">
            <Zap className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white mb-2">Why Warm-up Matters</h3>
            <p className="text-sm text-neutral-300 leading-relaxed">
              A proper warm-up increases blood flow to muscles, improves joint mobility, and prepares your nervous system for exercise. 
              Spending 5-10 minutes warming up can significantly reduce injury risk and improve performance.
            </p>
          </div>
        </div>
      </div>

      {/* Warm-up Routines */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Flame className="w-5 h-5 text-[#ff5722]" />
          Warm-up Routines
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {warmupRoutines.map(routine => (
            <div
              key={routine.id}
              className="p-6 rounded-3xl bg-[#1c1c1e] border border-[#2a2a2e] hover:border-[#ff5722]/50 transition-all shadow-xl group"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded bg-[#ff5722]/15 text-[#ff5722]">
                    {routine.duration} min
                  </span>
                </div>
                <div className="flex items-center gap-1 text-neutral-400">
                  <Clock className="w-3.5 h-3.5" />
                  <span className="text-xs">{routine.exercises.length} exercises</span>
                </div>
              </div>

              <h3 className="text-lg font-bold text-white group-hover:text-[#ff5722] transition-colors mb-2">
                {routine.name}
              </h3>

              <p className="text-xs text-neutral-400 line-clamp-2 mb-4">
                {routine.description}
              </p>

              <div className="flex flex-wrap gap-1 mb-4">
                {routine.exercises.slice(0, 3).map((ex, idx) => (
                  <span key={idx} className="px-2 py-0.5 text-[10px] rounded bg-neutral-800 text-neutral-300">
                    {ex}
                  </span>
                ))}
                {routine.exercises.length > 3 && (
                  <span className="px-2 py-0.5 text-[10px] rounded bg-neutral-800 text-neutral-400">
                    +{routine.exercises.length - 3}
                  </span>
                )}
              </div>

              <button className="w-full py-3 rounded-2xl bg-[#ff5722] hover:bg-[#ff5722]/90 text-white text-xs font-black tracking-wider uppercase flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#ff5722]/25 active:scale-95">
                <Play className="w-4 h-4 fill-white" />
                <span>Start Routine</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Individual Warm-up Exercises */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Heart className="w-5 h-5 text-red-400" />
          Individual Warm-up Exercises
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {warmupExercises.map(ex => (
            <div
              key={ex.id}
              onClick={() => openExerciseDetail(ex.id)}
              className="p-4 rounded-2xl bg-[#1c1c1e] border border-[#2a2a2e] hover:border-[#ff5722]/50 cursor-pointer transition-all group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded bg-amber-500/15 text-amber-400">
                  {ex.type}
                </span>
                <span className="text-[10px] text-neutral-400">{ex.difficulty}</span>
              </div>

              <h4 className="text-sm font-bold text-white group-hover:text-[#ff5722] transition-colors mb-2">
                {ex.name}
              </h4>

              <p className="text-xs text-neutral-400 line-clamp-2 mb-3">
                {ex.description}
              </p>

              <div className="flex items-center justify-between">
                <span className="text-[10px] text-neutral-500">{ex.equipment.join(', ')}</span>
                <ArrowRight className="w-3 h-3 text-neutral-600 group-hover:text-white transition-colors" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tips Section */}
      <div className="p-6 rounded-3xl bg-[#1c1c1e] border border-[#2a2a2e] space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Zap className="w-4 h-4 text-amber-400" />
          Warm-up Tips
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#00ff66]/15 text-[#00ff66] flex items-center justify-center shrink-0 mt-0.5">
              <span className="text-xs font-bold">1</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Start Slow</p>
              <p className="text-xs text-neutral-400">Begin with gentle movements and gradually increase intensity</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#00ff66]/15 text-[#00ff66] flex items-center justify-center shrink-0 mt-0.5">
              <span className="text-xs font-bold">2</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Focus on Problem Areas</p>
              <p className="text-xs text-neutral-400">Spend extra time on tight or previously injured areas</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#00ff66]/15 text-[#00ff66] flex items-center justify-center shrink-0 mt-0.5">
              <span className="text-xs font-bold">3</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Include Dynamic Stretching</p>
              <p className="text-xs text-neutral-400">Use movement-based stretches rather than static holds</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#00ff66]/15 text-[#00ff66] flex items-center justify-center shrink-0 mt-0.5">
              <span className="text-xs font-bold">4</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Stay Hydrated</p>
              <p className="text-xs text-neutral-400">Drink water before and during your warm-up</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
