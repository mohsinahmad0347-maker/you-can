import React, { useState } from 'react';
import { 
  Dumbbell, 
  Flame, 
  Sparkles, 
  ShieldAlert, 
  HeartHandshake, 
  ArrowRight, 
  Play, 
  Bookmark, 
  CheckCircle2, 
  TrendingUp, 
  Activity, 
  Clock, 
  Compass,
  Sliders,
  ChevronRight,
  Zap,
  Info
} from 'lucide-react';
import { HeroCarousel } from './HeroCarousel';
import { useFitness } from '../../context/FitnessContext';
import { Exercise } from '../../types';

export const HomePage: React.FC = () => {
  const { 
    exercises, 
    workouts, 
    setCurrentView, 
    openExerciseDetail, 
    startWorkout, 
    toggleFavorite, 
    setSelectedCategoryFilter,
    userProfile 
  } = useFitness();

  const [avatarDemoExercise, setAvatarDemoExercise] = useState<Exercise>(() => {
    return exercises.find(e => e.biomechanicsKey === 'squat') || exercises[0];
  });

  const featuredExercises = exercises.filter(e => e.isFavorite || ['ex-bench-press', 'ex-squat', 'ex-pullup', 'ex-pushup'].includes(e.id)).slice(0, 4);
  const popularWorkouts = workouts.slice(0, 3);

  const muscleCategories = [
    { name: 'Chest', count: exercises.filter(e => e.primaryMuscle === 'Chest').length, color: '#ff5722' },
    { name: 'Back', count: exercises.filter(e => e.primaryMuscle === 'Back').length, color: '#00ff66' },
    { name: 'Shoulders', count: exercises.filter(e => e.primaryMuscle === 'Shoulders').length, color: '#ff5722' },
    { name: 'Arms', count: exercises.filter(e => ['Biceps', 'Triceps', 'Arms'].includes(e.primaryMuscle)).length, color: '#00ff66' },
    { name: 'Legs', count: exercises.filter(e => e.primaryMuscle === 'Legs').length, color: '#ff5722' },
    { name: 'Core', count: exercises.filter(e => e.primaryMuscle === 'Core').length, color: '#00ff66' },
    { name: 'Cardio', count: exercises.filter(e => e.primaryMuscle === 'Cardio').length, color: '#ff5722' },
    { name: 'Mobility', count: exercises.filter(e => e.primaryMuscle === 'Mobility').length, color: '#00ff66' },
  ];

  return (
    <div className="space-y-16 py-6 pb-20 select-none">
      {/* 3. HERO CAROUSEL */}
      <section className="px-4 sm:px-6 max-w-7xl mx-auto">
        <HeroCarousel />
      </section>

      {/* 4. MAIN CTA BANNER */}
      <section className="px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-r from-[#1c1c1e] via-[#242428] to-[#1c1c1e] border border-[#2a2a2e] flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden">
          <div className="space-y-2 max-w-xl">
            <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">
              YOU <span className="text-[#ff5722]">CAN.</span>
            </h1>
            <p className="text-base text-neutral-300">
              Build strength. Build confidence. Build yourself. Whether at home or in the gym, our 3D interactive personal trainer guides every rep.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => {
                if (popularWorkouts[0]) startWorkout(popularWorkouts[0]);
              }}
              className="px-6 py-3.5 rounded-2xl bg-[#ff5722] hover:bg-[#ff5722]/90 text-white text-sm font-black tracking-wider uppercase shadow-xl shadow-[#ff5722]/25 flex items-center gap-2 transition-all active:scale-95"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>START WORKOUT</span>
            </button>
            <button
              onClick={() => {
                setCurrentView('exercises');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-6 py-3.5 rounded-2xl bg-neutral-800 hover:bg-neutral-700 text-white text-sm font-bold border border-neutral-700 transition-all active:scale-95"
            >
              EXPLORE EXERCISES
            </button>
          </div>
        </div>
      </section>

      {/* 5. WHY YOU CAN (4 VALUE PILLARS) */}
      <section className="px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <p className="text-xs font-bold uppercase tracking-widest text-[#ff5722]">ENGINEERED FOR EXCELLENCE</p>
          <h2 className="text-3xl font-black text-white">Why Train With YOU CAN?</h2>
          <p className="text-sm text-neutral-400">
            A comprehensive, professional fitness ecosystem designed to eliminate guesswork and foster lifelong athletic consistency.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="p-6 rounded-2xl bg-[#1c1c1e] border border-[#2a2a2e] space-y-3 hover:border-[#ff5722]/50 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-[#ff5722]/10 border border-[#ff5722]/20 flex items-center justify-center text-[#ff5722] group-hover:scale-110 transition-transform">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white">3D Biomechanical Avatar</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Visualize correct exercise kinematics, glowing joint angles, muscle heatmaps, and multi-angle camera controls.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#1c1c1e] border border-[#2a2a2e] space-y-3 hover:border-[#00ff66]/50 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-[#00ff66]/10 border border-[#00ff66]/20 flex items-center justify-center text-[#00ff66] group-hover:scale-110 transition-transform">
              <Dumbbell className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white">Gym & Home Libraries</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Seamlessly switch between heavy barbell gym training and zero-equipment bodyweight routines anywhere.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#1c1c1e] border border-[#2a2a2e] space-y-3 hover:border-[#ff5722]/50 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-[#ff5722]/10 border border-[#ff5722]/20 flex items-center justify-center text-[#ff5722] group-hover:scale-110 transition-transform">
              <Sliders className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white">Intelligent Generator</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Generate structured, goal-driven workouts tailored precisely to your available equipment and timeframe.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#1c1c1e] border border-[#2a2a2e] space-y-3 hover:border-[#00ff66]/50 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-[#00ff66]/10 border border-[#00ff66]/20 flex items-center justify-center text-[#00ff66] group-hover:scale-110 transition-transform">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white">Analytics & Consistency</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Track workout volume, consecutive streaks, personal records, and monthly progress with professional charts.
            </p>
          </div>
        </div>
      </section>

      {/* 8. INTERACTIVE 3D VIRTUAL AVATAR SHOWCASE */}
      <section className="px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="p-6 md:p-10 rounded-3xl bg-gradient-to-b from-[#1c1c1e] to-[#141416] border border-[#2a2a2e] shadow-2xl">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* Left Info & Exercise Selector */}
            <div className="lg:w-5/12 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ff5722]/15 border border-[#ff5722]/30 text-[#ff5722] text-xs font-bold">
                <Zap className="w-3.5 h-3.5" />
                VIRTUAL PERSONAL TRAINER
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-white">
                Master Form With Interactive 3D Demonstrations
              </h2>

              <p className="text-sm text-neutral-300 leading-relaxed">
                Watch our real-time 3D biomechanical avatar perform exercises with strict technique. Rotate the model in 360 degrees, inspect joint alignment, switch to 0.4x slow motion, and observe target muscle activation.
              </p>

              {/* Selector Pills */}
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">Select Exercise To Demonstrate:</p>
                <div className="flex flex-wrap gap-2">
                  {exercises.slice(0, 6).map(ex => (
                    <button
                      key={ex.id}
                      onClick={() => setAvatarDemoExercise(ex)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                        avatarDemoExercise.id === ex.id
                          ? 'bg-[#ff5722] border-[#ff5722] text-white shadow-md'
                          : 'bg-neutral-800/80 border-neutral-700 text-neutral-300 hover:text-white'
                      }`}
                    >
                      {ex.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Live telemetry for selected exercise */}
              <div className="p-4 rounded-2xl bg-neutral-900/80 border border-neutral-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-neutral-400 font-medium">Demonstrating:</span>
                  <span className="text-xs font-bold text-white">{avatarDemoExercise.name}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-neutral-400 font-medium">Primary Focus:</span>
                  <span className="text-xs font-bold text-[#00ff66]">{avatarDemoExercise.primaryMuscle}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-neutral-400 font-medium">Difficulty Level:</span>
                  <span className="text-xs font-bold text-neutral-200">{avatarDemoExercise.difficulty}</span>
                </div>
              </div>

              <button
                onClick={() => openExerciseDetail(avatarDemoExercise.id)}
                className="w-full py-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-bold flex items-center justify-center gap-2 border border-neutral-700 transition-all"
              >
                <span>OPEN FULL PRACTICAL LAB & SAFETY TIPS</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Right: Realistic Human Photo */}
            <div className="w-full lg:w-7/12">
              <div className="relative w-full h-[450px] rounded-2xl overflow-hidden bg-gradient-to-br from-[#1c1c1e] to-[#2a2a2e] border border-[#2a2a2e]">
                <img
                  src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80"
                  alt="Fitness trainer demonstrating exercise"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white text-sm font-semibold">Professional Trainer Demonstration</p>
                  <p className="text-neutral-300 text-xs">Real human guidance for proper form</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FEATURED EXERCISES */}
      <section className="px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[#ff5722]">FOUNDATIONAL MOVEMENTS</p>
            <h2 className="text-2xl sm:text-3xl font-black text-white">Featured Exercises</h2>
          </div>
          <button
            onClick={() => {
              setCurrentView('exercises');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-1 text-xs font-bold text-[#ff5722] hover:underline"
          >
            <span>VIEW ALL ({exercises.length})</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featuredExercises.map(ex => (
            <div
              key={ex.id}
              className="p-5 rounded-2xl bg-[#1c1c1e] border border-[#2a2a2e] flex flex-col justify-between hover:border-[#ff5722]/50 transition-all shadow-lg group relative"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-1 text-[10px] font-bold uppercase rounded-md bg-[#ff5722]/15 text-[#ff5722] border border-[#ff5722]/30">
                    {ex.primaryMuscle}
                  </span>
                  <button
                    onClick={() => toggleFavorite(ex.id)}
                    className="p-1 text-neutral-400 hover:text-amber-400 transition-colors"
                  >
                    <Bookmark className={`w-4 h-4 ${ex.isFavorite ? 'fill-amber-400 text-amber-400' : ''}`} />
                  </button>
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-[#ff5722] transition-colors">
                  {ex.name}
                </h3>
                <p className="text-xs text-neutral-400 mt-1.5 line-clamp-2 leading-relaxed">
                  {ex.description}
                </p>

                <div className="mt-4 pt-3 border-t border-neutral-800/80 flex items-center justify-between text-[11px] text-neutral-400 font-medium">
                  <span>{ex.equipment.join(', ')}</span>
                  <span className="text-[#00ff66]">{ex.difficulty}</span>
                </div>
              </div>

              <button
                onClick={() => openExerciseDetail(ex.id)}
                className="mt-4 w-full py-2.5 rounded-xl bg-neutral-800 hover:bg-[#ff5722] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
              >
                <span>DEMONSTRATE</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 7. GYM VS HOME TRAINING COMPARISON */}
      <section className="px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="p-8 md:p-12 rounded-3xl bg-[#1c1c1e] border border-[#2a2a2e] shadow-xl">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <p className="text-xs font-bold uppercase tracking-widest text-[#00ff66]">TOTAL VERSATILITY</p>
            <h2 className="text-2xl sm:text-3xl font-black text-white">Gym Training vs. Home Training</h2>
            <p className="text-sm text-neutral-400">
              YOU CAN provides tailored exercise variations for both environments. Every gym barbell exercise has a direct home bodyweight or resistance band alternative.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* GYM CARD */}
            <div className="p-6 rounded-2xl bg-neutral-900/90 border border-neutral-800 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#ff5722]/15 text-[#ff5722] flex items-center justify-center font-bold">
                  <Dumbbell className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Commercial Gym Training</h3>
                  <p className="text-xs text-neutral-400">Barbells, Dumbbells, Cables, & Free Weights</p>
                </div>
              </div>
              <ul className="space-y-2 text-xs text-neutral-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#ff5722] shrink-0" />
                  <span>Maximum progressive overload for absolute strength and bone density.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#ff5722] shrink-0" />
                  <span>Isolate specific muscle groups with precision cable and machine paths.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#ff5722] shrink-0" />
                  <span>Extensive heavy compound tracking (Squat, Bench, Deadlift, OHP).</span>
                </li>
              </ul>
              <button
                onClick={() => {
                  setSelectedCategoryFilter(null);
                  setCurrentView('exercises');
                }}
                className="w-full py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-bold transition-all"
              >
                BROWSE GYM MOVEMENTS
              </button>
            </div>

            {/* HOME CARD */}
            <div className="p-6 rounded-2xl bg-neutral-900/90 border border-neutral-800 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#00ff66]/15 text-[#00ff66] flex items-center justify-center font-bold">
                  <Flame className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Home & Calisthenics Training</h3>
                  <p className="text-xs text-neutral-400">Bodyweight, Resistance Bands, & Minimal Gear</p>
                </div>
              </div>
              <ul className="space-y-2 text-xs text-neutral-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00ff66] shrink-0" />
                  <span>Zero commute time; train in living rooms, parks, or hotel rooms.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00ff66] shrink-0" />
                  <span>Superior relative bodyweight strength, core bracing, and joint mobility.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00ff66] shrink-0" />
                  <span>Scalable modifications from knee push-ups to explosive star jumps.</span>
                </li>
              </ul>
              <button
                onClick={() => {
                  setSelectedCategoryFilter(null);
                  setCurrentView('exercises');
                }}
                className="w-full py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-bold transition-all"
              >
                BROWSE HOME EXERCISES
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 9. POPULAR WORKOUTS */}
      <section className="px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[#ff5722]">PROVEN PROGRAMS</p>
            <h2 className="text-2xl sm:text-3xl font-black text-white">Popular Structured Workouts</h2>
          </div>
          <button
            onClick={() => {
              setCurrentView('workouts');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-1 text-xs font-bold text-[#ff5722] hover:underline"
          >
            <span>VIEW ALL ({workouts.length})</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {popularWorkouts.map(wo => (
            <div 
              key={wo.id}
              className="p-6 rounded-3xl bg-[#1c1c1e] border border-[#2a2a2e] flex flex-col justify-between hover:border-neutral-700 transition-all shadow-xl group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-neutral-800 text-[11px] font-bold text-neutral-300">
                    {wo.goal}
                  </span>
                  <div className="flex items-center gap-1 text-xs font-semibold text-neutral-400">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{wo.durationMinutes} min</span>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-[#ff5722] transition-colors">
                  {wo.name}
                </h3>
                <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                  {wo.description}
                </p>

                <div className="pt-2 space-y-1.5">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">Includes:</p>
                  {wo.exercises.slice(0, 3).map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs text-neutral-300">
                      <span>• {item.exerciseName}</span>
                      <span className="text-neutral-500">{item.sets} × {item.reps}</span>
                    </div>
                  ))}
                  {wo.exercises.length > 3 && (
                    <p className="text-[11px] text-neutral-500 font-medium">+ {wo.exercises.length - 3} more movements</p>
                  )}
                </div>
              </div>

              <button
                onClick={() => startWorkout(wo)}
                className="mt-6 w-full py-3 rounded-2xl bg-[#ff5722] hover:bg-[#ff5722]/90 text-white text-xs font-black tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg shadow-[#ff5722]/20 transition-all active:scale-95"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>START WORKOUT</span>
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 10. MUSCLE CATEGORIES */}
      <section className="px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-8 space-y-1">
          <p className="text-xs font-bold uppercase tracking-widest text-[#00ff66]">ANATOMICAL DIRECTORY</p>
          <h2 className="text-2xl sm:text-3xl font-black text-white">Target Any Muscle Group</h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {muscleCategories.map(cat => (
            <button
              key={cat.name}
              onClick={() => {
                setSelectedCategoryFilter(cat.name);
                setCurrentView('exercises');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="p-4 rounded-2xl bg-[#1c1c1e] border border-[#2a2a2e] hover:border-[#ff5722]/50 text-left transition-all group flex items-center justify-between shadow-sm"
            >
              <div>
                <p className="text-sm font-bold text-white group-hover:text-[#ff5722] transition-colors">{cat.name}</p>
                <p className="text-[11px] text-neutral-400 mt-0.5">{cat.count} Exercises</p>
              </div>
              <ChevronRight className="w-4 h-4 text-neutral-600 group-hover:text-white transition-colors" />
            </button>
          ))}
        </div>
      </section>

      {/* 11. WORKOUT GENERATOR PREVIEW */}
      <section className="px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-r from-[#1f1a18] via-[#1c1c1e] to-[#171a18] border border-[#ff5722]/30 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-3 max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ff5722]/20 text-[#ff5722] text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                AUTOMATED TRAINING GENERATOR
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                Build Your Custom Workout In Seconds
              </h2>
              <p className="text-sm text-neutral-300 leading-relaxed">
                Choose your goal (Strength, Conditioning, Mobility), select your location (Home or Gym), pick your available equipment, set your duration (10 to 60 minutes), and get an instantly structured workout with warm-up and cool-down.
              </p>
            </div>

            <button
              onClick={() => {
                setCurrentView('generator');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-8 py-4 rounded-2xl bg-[#ff5722] hover:bg-[#ff5722]/90 text-white text-sm font-black tracking-wider uppercase shadow-xl shadow-[#ff5722]/25 flex items-center gap-2 shrink-0 transition-all active:scale-95"
            >
              <span>LAUNCH GENERATOR</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 14 & 15. RECOVERY & SAFETY FORM PROTOCOL */}
      <section className="px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* RECOVERY BOX */}
          <div className="p-6 rounded-3xl bg-[#1c1c1e] border border-[#2a2a2e] space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Recovery & Mobility</h3>
                <p className="text-xs text-neutral-400">Tissue restoration and injury mitigation</p>
              </div>
            </div>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Muscles do not grow in the gym—they grow during intelligent recovery. Integrate dynamic warm-ups prior to lifting and deliberate post-workout static stretches to preserve joint health.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentView('warmup')}
                className="px-3.5 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-xs font-bold text-white transition-all"
              >
                Dynamic Warm-ups
              </button>
              <button
                onClick={() => setCurrentView('recovery')}
                className="px-3.5 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-xs font-bold text-white transition-all"
              >
                Mobility & Stretch
              </button>
            </div>
          </div>

          {/* SAFETY PROTOCOL BOX */}
          <div className="p-6 rounded-3xl bg-[#1c1c1e] border border-[#2a2a2e] space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Safety & Technique Priority</h3>
                <p className="text-xs text-neutral-400">Longevity over ego lifting</p>
              </div>
            </div>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Never sacrifice joint mechanics for arbitrary poundage. Progress gradually, brace your abdominal core, use safety pins on heavy barbell movements, and stop immediately if sharp pain occurs.
            </p>
            <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-[11px] text-neutral-400 flex items-center gap-2">
              <Info className="w-4 h-4 text-[#ff5722] shrink-0" />
              <span>Always consult a qualified health or fitness professional before undertaking new physical regimens.</span>
            </div>
          </div>
        </div>
      </section>

      {/* 16. MOTIVATIONAL BANNER */}
      <section className="px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="py-8 px-6 rounded-3xl bg-[#18181a] border border-[#2a2a2e] text-center space-y-3">
          <p className="text-xs font-bold uppercase tracking-widest text-[#ff5722]">THE ATHLETE MANIFESTO</p>
          <blockquote className="text-xl sm:text-2xl font-black text-white italic">
            “You don’t need to be perfect. Start where you are. Stay consistent. YOU CAN.”
          </blockquote>
          <p className="text-xs text-neutral-500">Every workout counts. Every rep matters.</p>
        </div>
      </section>

      {/* 17. FINAL CTA */}
      <section className="px-4 sm:px-6 max-w-7xl mx-auto text-center py-10 space-y-5">
        <h2 className="text-3xl sm:text-4xl font-black text-white">
          READY TO ELEVATE YOUR FITNESS?
        </h2>
        <p className="text-sm text-neutral-400 max-w-md mx-auto">
          Take control of your physique, posture, and endurance today with the complete YOU CAN platform.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => {
              setCurrentView('generator');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-8 py-4 rounded-2xl bg-[#ff5722] hover:bg-[#ff5722]/90 text-white text-sm font-black tracking-wider uppercase shadow-xl shadow-[#ff5722]/30 transition-all active:scale-95"
          >
            START TRAINING NOW
          </button>
        </div>
      </section>

      {/* 18. PREMIUM FOOTER (SECTION 72) */}
      <footer className="border-t border-[#2a2a2e] pt-12 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-[#ff5722] flex items-center justify-center text-white font-bold">
                <Dumbbell className="w-4 h-4" />
              </div>
              <span className="text-xl font-black text-white">
                YOU <span className="text-[#ff5722]">CAN</span>
              </span>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Train Strong. Move Better. You Can. The complete modern fitness platform and 3D virtual trainer.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-300 mb-3">Platform</h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li><button onClick={() => setCurrentView('exercises')} className="hover:text-white">Exercises</button></li>
              <li><button onClick={() => setCurrentView('workouts')} className="hover:text-white">Workouts</button></li>
              <li><button onClick={() => setCurrentView('generator')} className="hover:text-white">Workout Generator</button></li>
              <li><button onClick={() => setCurrentView('dashboard')} className="hover:text-white">Dashboard</button></li>
              <li><button onClick={() => setCurrentView('calendar')} className="hover:text-white">Calendar</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-300 mb-3">Resources</h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li><button onClick={() => setCurrentView('coach')} className="hover:text-white">YOU CAN Coach (AI)</button></li>
              <li><button onClick={() => setCurrentView('warmup')} className="hover:text-white">Warm-up Library</button></li>
              <li><button onClick={() => setCurrentView('recovery')} className="hover:text-white">Recovery & Mobility</button></li>
              <li><button onClick={() => setCurrentView('comparison')} className="hover:text-white">Exercise Comparison</button></li>
              <li><button onClick={() => setCurrentView('tools')} className="hover:text-white">Workout Timer</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-300 mb-3">Administration</h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li><button onClick={() => setCurrentView('admin-login')} className="hover:text-[#ff5722] font-semibold">Admin Panel</button></li>
              <li><span className="text-neutral-500">Security & Session Policy</span></li>
              <li><span className="text-neutral-500">Terms of Service</span></li>
              <li><span className="text-neutral-500">Privacy & Data Control</span></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-800/80 py-6 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-4">
          <p>© {new Date().getFullYear()} YOU CAN Fitness Platform. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="text-[#00ff66] font-semibold">System Status: Operational</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
