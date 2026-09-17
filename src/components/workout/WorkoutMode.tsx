import React, { useState, useEffect } from 'react';
import { 
  Pause, 
  Play, 
  SkipForward, 
  SkipBack, 
  CheckCircle2, 
  X, 
  Clock, 
  Flame, 
  Volume2, 
  RotateCcw,
  Trophy,
  ArrowRight
} from 'lucide-react';
import { useFitness } from '../../context/FitnessContext';

export const WorkoutMode: React.FC = () => {
  const { 
    activeWorkout, 
    pauseWorkout, 
    resumeWorkout, 
    nextExerciseOrSet, 
    previousExerciseOrSet, 
    skipRest, 
    finishWorkout, 
    exitWorkout, 
    exercises,
    setCurrentView 
  } = useFitness();

  const motivationalQuotes = [
    "KEEP GOING. YOU CAN.",
    "ONE MORE SET. FINISH STRONG.",
    "SMALL PROGRESS. BIG RESULTS.",
    "STAY CONSISTENT. STAY FOCUSED.",
    "DISCIPLINE CREATES FREEDOM."
  ];

  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setQuoteIndex(prev => (prev + 1) % motivationalQuotes.length);
    }, 12000);
    return () => clearInterval(timer);
  }, []);

  if (!activeWorkout) {
    return (
      <div className="py-20 text-center select-none">
        <p className="text-neutral-400">No active workout in progress.</p>
        <button
          onClick={() => setCurrentView('workouts')}
          className="mt-4 px-5 py-2.5 rounded-xl bg-[#ff5722] text-white text-xs font-bold"
        >
          Browse Workouts
        </button>
      </div>
    );
  }

  // Completion Screen (Section 20)
  if (activeWorkout.completed) {
    const elapsedMinutes = Math.max(1, Math.round(activeWorkout.totalElapsedSeconds / 60));
    const totalExercises = activeWorkout.workout.exercises.length;
    const totalSetsCompleted = activeWorkout.workout.exercises.reduce((acc, ex) => acc + ex.sets, 0);

    return (
      <div className="fixed inset-0 z-50 bg-[#121212] flex items-center justify-center p-4 select-none">
        <div className="w-full max-w-lg bg-[#1c1c1e] border border-[#2a2a2e] rounded-3xl p-8 text-center space-y-6 shadow-2xl animate-in zoom-in-95">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-[#00ff66]/20 to-[#00ff66]/10 border border-[#00ff66]/40 text-[#00ff66] mx-auto flex items-center justify-center shadow-lg shadow-[#00ff66]/20">
            <Trophy className="w-10 h-10" />
          </div>

          <div className="space-y-1">
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              WORKOUT COMPLETE 🎉
            </h1>
            <p className="text-sm text-[#ff5722] font-bold uppercase tracking-wider">
              YOU CRUSHED IT. YOU CAN.
            </p>
          </div>

          {/* Statistics Grid */}
          <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-neutral-900 border border-neutral-800">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">Duration</p>
              <p className="text-lg font-black text-white mt-0.5">{elapsedMinutes} MIN</p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">Exercises</p>
              <p className="text-lg font-black text-[#00ff66] mt-0.5">{totalExercises}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">Total Sets</p>
              <p className="text-lg font-black text-white mt-0.5">{totalSetsCompleted}</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800 text-left space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-neutral-400">Workout:</span>
              <span className="font-bold text-white">{activeWorkout.workout.name}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-neutral-400">Training Goal:</span>
              <span className="font-bold text-[#ff5722]">{activeWorkout.workout.goal}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-neutral-400">Completion:</span>
              <span className="font-bold text-[#00ff66]">100% Completed</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={() => {
                exitWorkout();
                setCurrentView('dashboard');
              }}
              className="flex-1 py-3.5 rounded-2xl bg-[#ff5722] hover:bg-[#ff5722]/90 text-white text-xs font-black tracking-wider uppercase shadow-xl shadow-[#ff5722]/20 transition-all active:scale-95"
            >
              VIEW DASHBOARD
            </button>
            <button
              onClick={() => {
                exitWorkout();
                setCurrentView('history');
              }}
              className="flex-1 py-3.5 rounded-2xl bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-bold border border-neutral-700 transition-all active:scale-95"
            >
              VIEW HISTORY
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentItem = activeWorkout.workout.exercises[activeWorkout.currentExerciseIndex];
  const fullExerciseData = exercises.find(e => e.id === currentItem?.exerciseId) || exercises[0];

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#121212] flex flex-col justify-between p-4 sm:p-6 overflow-y-auto select-none">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#ff5722] flex items-center justify-center text-white font-bold shadow-md shadow-[#ff5722]/20">
            <Flame className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-black text-white">{activeWorkout.workout.name}</h2>
            <p className="text-xs text-[#00ff66] font-semibold">
              Exercise {activeWorkout.currentExerciseIndex + 1} of {activeWorkout.workout.exercises.length}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#1c1c1e] border border-[#2a2a2e] text-xs font-mono font-bold text-neutral-300">
            <Clock className="w-3.5 h-3.5 text-neutral-500" />
            <span>{formatTime(activeWorkout.totalElapsedSeconds)}</span>
          </div>

          <button
            onClick={exitWorkout}
            className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white transition-colors"
            title="Quit Workout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Center Arena: 3D Avatar & Dynamic Countdown Rings */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 my-auto items-center max-w-6xl mx-auto w-full">
        {/* Left: Realistic Human Photo performing exercise */}
        <div className="lg:col-span-7">
          <div className="relative w-full h-[460px] rounded-2xl overflow-hidden bg-gradient-to-br from-[#1c1c1e] to-[#2a2a2e] border border-[#2a2a2e]">
            <img
              src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80"
              alt="Professional fitness trainer demonstrating workout exercise"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                <span className="text-white text-sm font-semibold">Live Workout Guide</span>
              </div>
              <p className="text-neutral-200 text-xs">Follow along with professional trainer demonstrations</p>
            </div>
          </div>
        </div>

        {/* Right: Live Telemetry HUD */}
        <div className="lg:col-span-5 space-y-5 text-center lg:text-left">
          {/* Active status pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mx-auto lg:mx-0 border"
            style={{
              backgroundColor: activeWorkout.isResting ? 'rgba(0, 255, 102, 0.15)' : 'rgba(255, 87, 34, 0.15)',
              borderColor: activeWorkout.isResting ? 'rgba(0, 255, 102, 0.4)' : 'rgba(255, 87, 34, 0.4)',
              color: activeWorkout.isResting ? '#00ff66' : '#ff5722'
            }}
          >
            <span className={`w-2 h-2 rounded-full animate-ping ${activeWorkout.isResting ? 'bg-[#00ff66]' : 'bg-[#ff5722]'}`} />
            {activeWorkout.isResting ? 'REST PERIOD' : 'ACTIVE EXERCISE'}
          </div>

          {/* Exercise Name */}
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            {currentItem.exerciseName}
          </h1>

          {/* Live Timer Clock */}
          <div className="p-6 rounded-3xl bg-[#1c1c1e] border border-[#2a2a2e] shadow-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-neutral-500">
              {activeWorkout.isResting ? 'REST TIME REMAINING' : 'INTERVAL TIMER'}
            </p>
            <p className="text-5xl sm:text-6xl font-black font-mono tracking-tight text-white mt-1">
              {formatTime(activeWorkout.secondsRemaining)}
            </p>

            {activeWorkout.isResting && (
              <button
                onClick={skipRest}
                className="mt-4 px-4 py-2 rounded-xl bg-[#00ff66] text-black text-xs font-black uppercase tracking-wider hover:bg-[#00ff66]/90 transition-all"
              >
                SKIP REST & RESUME
              </button>
            )}
          </div>

          {/* Set and Rep Counters (Section 19) */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-[#1c1c1e] border border-[#2a2a2e] text-center">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">CURRENT SET</span>
              <p className="text-2xl font-black text-white mt-1">
                {activeWorkout.currentSet} <span className="text-neutral-500 text-sm">/ {activeWorkout.totalSetsForCurrent}</span>
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#1c1c1e] border border-[#2a2a2e] text-center">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">TARGET REPS</span>
              <p className="text-2xl font-black text-[#ff5722] mt-1">
                {currentItem.reps}
              </p>
            </div>
          </div>

          {/* Dynamic Motivation Card (Section 19) */}
          <div className="p-3.5 rounded-2xl bg-neutral-900/80 border border-neutral-800 text-center">
            <p className="text-xs font-black tracking-widest text-amber-400 animate-pulse">
              “{motivationalQuotes[quoteIndex]}”
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Controls Bar (Section 19) */}
      <div className="max-w-xl mx-auto w-full pt-4">
        <div className="p-3 rounded-2xl bg-[#1c1c1e] border border-[#2a2a2e] flex items-center justify-between gap-2 shadow-2xl">
          {/* Previous Set / Exercise */}
          <button
            onClick={previousExerciseOrSet}
            disabled={activeWorkout.currentExerciseIndex === 0 && activeWorkout.currentSet === 1}
            className="p-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 disabled:opacity-30 disabled:pointer-events-none transition-all"
            title="Previous"
          >
            <SkipBack className="w-5 h-5" />
          </button>

          {/* Pause / Resume */}
          <button
            onClick={activeWorkout.isPaused ? resumeWorkout : pauseWorkout}
            className="p-3.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white transition-all shadow-md active:scale-95"
            title={activeWorkout.isPaused ? 'Resume' : 'Pause'}
          >
            {activeWorkout.isPaused ? <Play className="w-5 h-5 fill-white" /> : <Pause className="w-5 h-5" />}
          </button>

          {/* Next Set / Exercise */}
          <button
            onClick={nextExerciseOrSet}
            className="px-6 py-3.5 rounded-xl bg-[#ff5722] hover:bg-[#ff5722]/90 text-white text-xs font-black tracking-wider uppercase flex items-center gap-2 shadow-lg shadow-[#ff5722]/25 transition-all active:scale-95"
          >
            <span>{activeWorkout.isResting ? 'NEXT SET' : 'COMPLETE SET'}</span>
            <SkipForward className="w-4 h-4" />
          </button>

          {/* Finish Early */}
          <button
            onClick={finishWorkout}
            className="p-3 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 text-[#00ff66] border border-[#00ff66]/30 transition-all"
            title="Finish Workout Now"
          >
            <CheckCircle2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
