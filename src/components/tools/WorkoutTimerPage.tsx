import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  SkipForward, 
  Clock,
  Timer,
  Plus,
  Minus,
  Bell
} from 'lucide-react';
import { sounds } from '../../utils/audio';

export const WorkoutTimerPage: React.FC = () => {
  const [mode, setMode] = useState<'stopwatch' | 'countdown' | 'interval'>('stopwatch');
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0); // in seconds
  const [initialTime, setInitialTime] = useState(300); // 5 minutes default for countdown
  const [rounds, setRounds] = useState(5);
  const [currentRound, setCurrentRound] = useState(1);
  const [workTime, setWorkTime] = useState(30);
  const [restTime, setRestTime] = useState(10);
  const [isRest, setIsRest] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime(prev => {
          if (mode === 'countdown') {
            if (prev <= 1) {
              setIsRunning(false);
              sounds.playCompleteChime();
              return 0;
            }
            return prev - 1;
          } else if (mode === 'interval') {
            const currentDuration = isRest ? restTime : workTime;
            if (prev <= 1) {
              if (isRest) {
                setIsRest(false);
                sounds.playGoChime();
                return workTime;
              } else {
                if (currentRound >= rounds) {
                  setIsRunning(false);
                  sounds.playCompleteChime();
                  return 0;
                }
                setIsRest(true);
                setCurrentRound(prev => prev + 1);
                sounds.playCompleteChime();
                return restTime;
              }
            }
            return prev - 1;
          }
          return prev + 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, mode, isRest, workTime, restTime, currentRound, rounds]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStart = () => {
    if (!isRunning) {
      sounds.playGoChime();
    }
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    if (mode === 'stopwatch') {
      setTime(0);
    } else if (mode === 'countdown') {
      setTime(initialTime);
    } else if (mode === 'interval') {
      setTime(workTime);
      setCurrentRound(1);
      setIsRest(false);
    }
  };

  const handleSkip = () => {
    if (mode === 'interval') {
      setIsRest(!isRest);
      setTime(isRest ? workTime : restTime);
      if (!isRest) {
        setCurrentRound(prev => Math.min(prev + 1, rounds));
      }
      sounds.playGoChime();
    }
  };

  return (
    <div className="py-6 px-4 sm:px-6 max-w-4xl mx-auto space-y-8 select-none">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ff5722]/15 text-[#ff5722] text-xs font-bold mb-2">
          <Timer className="w-3.5 h-3.5" />
          WORKOUT TIMER
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Workout Timer
        </h1>
        <p className="text-sm text-neutral-400 mt-1">
          Professional timing for your training sessions
        </p>
      </div>

      {/* Mode Selection */}
      <div className="flex justify-center gap-3">
        {(['stopwatch', 'countdown', 'interval'] as const).map(m => (
          <button
            key={m}
            onClick={() => {
              setMode(m);
              handleReset();
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase border transition-all ${
              mode === m 
                ? 'bg-[#ff5722] border-[#ff5722] text-white shadow-md' 
                : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white'
            }`}
          >
            {m}
          </button>
        ))}
      </div>

      {/* Timer Display */}
      <div className="p-8 rounded-3xl bg-[#1c1c1e] border border-[#2a2a2e] shadow-2xl text-center">
        {mode === 'interval' && (
          <div className="mb-4">
            <span className={`px-4 py-2 rounded-full text-sm font-bold uppercase ${
              isRest ? 'bg-blue-500/20 text-blue-400' : 'bg-[#ff5722]/20 text-[#ff5722]'
            }`}>
              {isRest ? 'REST' : 'WORK'}
            </span>
            <p className="text-xs text-neutral-400 mt-2">
              Round {currentRound} of {rounds}
            </p>
          </div>
        )}

        <div className="text-7xl sm:text-8xl font-black text-white tracking-tight mb-8 font-mono">
          {formatTime(time)}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={handleReset}
            className="p-4 rounded-2xl bg-neutral-800 hover:bg-neutral-700 text-white transition-all"
            title="Reset"
          >
            <RotateCcw className="w-6 h-6" />
          </button>

          <button
            onClick={handleStart}
            className="p-6 rounded-2xl bg-[#ff5722] hover:bg-[#ff5722]/90 text-white transition-all shadow-xl shadow-[#ff5722]/25 active:scale-95"
          >
            {isRunning ? <Pause className="w-8 h-8 fill-white" /> : <Play className="w-8 h-8 fill-white" />}
          </button>

          {mode === 'interval' && (
            <button
              onClick={handleSkip}
              className="p-4 rounded-2xl bg-neutral-800 hover:bg-neutral-700 text-white transition-all"
              title="Skip"
            >
              <SkipForward className="w-6 h-6" />
            </button>
          )}
        </div>
      </div>

      {/* Settings based on mode */}
      {mode === 'countdown' && (
        <div className="p-6 rounded-3xl bg-[#1c1c1e] border border-[#2a2a2e] space-y-4">
          <h3 className="text-base font-bold text-white">Countdown Settings</h3>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setInitialTime(prev => Math.max(60, prev - 60))}
              className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white"
            >
              <Minus className="w-4 h-4" />
            </button>
            <div className="flex-1 text-center">
              <p className="text-2xl font-bold text-white">{Math.floor(initialTime / 60)} min</p>
            </div>
            <button
              onClick={() => setInitialTime(prev => prev + 60)}
              className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <button
            onClick={() => {
              setTime(initialTime);
              handleReset();
            }}
            className="w-full py-3 rounded-2xl bg-[#ff5722] hover:bg-[#ff5722]/90 text-white text-xs font-bold uppercase"
          >
            Set Timer
          </button>
        </div>
      )}

      {mode === 'interval' && (
        <div className="p-6 rounded-3xl bg-[#1c1c1e] border border-[#2a2a2e] space-y-4">
          <h3 className="text-base font-bold text-white">Interval Settings</h3>
          
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-neutral-400 mb-2 block">WORK TIME (seconds)</label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setWorkTime(prev => Math.max(5, prev - 5))}
                  className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <div className="flex-1 text-center">
                  <p className="text-2xl font-bold text-white">{workTime}s</p>
                </div>
                <button
                  onClick={() => setWorkTime(prev => prev + 5)}
                  className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-neutral-400 mb-2 block">REST TIME (seconds)</label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setRestTime(prev => Math.max(5, prev - 5))}
                  className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <div className="flex-1 text-center">
                  <p className="text-2xl font-bold text-white">{restTime}s</p>
                </div>
                <button
                  onClick={() => setRestTime(prev => prev + 5)}
                  className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-neutral-400 mb-2 block">ROUNDS</label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setRounds(prev => Math.max(1, prev - 1))}
                  className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <div className="flex-1 text-center">
                  <p className="text-2xl font-bold text-white">{rounds}</p>
                </div>
                <button
                  onClick={() => setRounds(prev => prev + 1)}
                  className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              setTime(workTime);
              setCurrentRound(1);
              setIsRest(false);
              handleReset();
            }}
            className="w-full py-3 rounded-2xl bg-[#ff5722] hover:bg-[#ff5722]/90 text-white text-xs font-bold uppercase"
          >
            Apply Settings
          </button>
        </div>
      )}

      {/* Quick Presets */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: '1 min', time: 60 },
          { label: '5 min', time: 300 },
          { label: '10 min', time: 600 },
          { label: '30 min', time: 1800 }
        ].map(preset => (
          <button
            key={preset.label}
            onClick={() => {
              setMode('countdown');
              setInitialTime(preset.time);
              setTime(preset.time);
              handleReset();
            }}
            className="p-3 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-[#ff5722]/50 text-white text-xs font-bold transition-all"
          >
            <Clock className="w-4 h-4 mx-auto mb-1" />
            {preset.label}
          </button>
        ))}
      </div>
    </div>
  );
};
