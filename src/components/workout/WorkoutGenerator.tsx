import React, { useState } from 'react';
import { 
  Sparkles, 
  Play, 
  Dumbbell, 
  Clock, 
  RotateCcw, 
  Check, 
  Flame, 
  Compass, 
  Save, 
  ChevronRight,
  Sliders
} from 'lucide-react';
import { useFitness } from '../../context/FitnessContext';
import { FitnessGoal, LocationType, DifficultyLevel, EquipmentType, WorkoutProgram, WorkoutExerciseItem } from '../../types';

export const WorkoutGenerator: React.FC = () => {
  const { exercises, startWorkout, addWorkout, setCurrentView } = useFitness();

  // Wizard state
  const [goal, setGoal] = useState<FitnessGoal>('General Fitness');
  const [location, setLocation] = useState<LocationType>('Both');
  const [experience, setExperience] = useState<DifficultyLevel>('Beginner');
  const [duration, setDuration] = useState<number>(30);
  const [selectedEquipment, setSelectedEquipment] = useState<EquipmentType[]>(['Bodyweight', 'Dumbbells']);
  const [generatedWorkout, setGeneratedWorkout] = useState<WorkoutProgram | null>(null);

  const goalOptions: FitnessGoal[] = ['General Fitness', 'Strength', 'Endurance', 'Mobility', 'Conditioning'];
  const durationOptions = [10, 20, 30, 45, 60];
  const equipmentOptions: EquipmentType[] = [
    'Bodyweight', 
    'Dumbbells', 
    'Barbell', 
    'Bench', 
    'Cable', 
    'Machine', 
    'Resistance Band', 
    'Kettlebell', 
    'Pull-up Bar', 
    'Mat'
  ];

  const toggleEquipment = (eq: EquipmentType) => {
    setSelectedEquipment(prev => 
      prev.includes(eq) ? (prev.length > 1 ? prev.filter(item => item !== eq) : prev) : [...prev, eq]
    );
  };

  const handleGenerate = () => {
    // Filter matching exercises
    let candidates = exercises.filter(e => {
      // Location check
      if (location === 'Home' && e.location === 'Gym') return false;
      if (location === 'Gym' && e.location === 'Home') return false;

      // Equipment check
      const hasEquipment = e.equipment.some(eq => selectedEquipment.includes(eq));
      if (!hasEquipment) return false;

      // Goal match
      if (goal === 'Mobility' && e.primaryMuscle !== 'Mobility' && e.type !== 'Mobility') return false;
      if (goal === 'Strength' && e.type !== 'Strength') return false;

      return true;
    });

    // Fallback if candidate pool is small
    if (candidates.length < 4) {
      candidates = exercises.filter(e => e.equipment.includes('Bodyweight'));
    }

    // Determine number of exercises based on duration
    const numExercises = duration <= 15 ? 3 : duration <= 30 ? 5 : duration <= 45 ? 6 : 7;
    const shuffled = [...candidates].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, numExercises);

    const workoutExercises: WorkoutExerciseItem[] = selected.map(ex => ({
      exerciseId: ex.id,
      exerciseName: ex.name,
      sets: goal === 'Strength' ? 4 : 3,
      reps: goal === 'Strength' ? '6 - 8' : goal === 'Endurance' ? '15 - 20' : '10 - 12',
      restSeconds: goal === 'Strength' ? 90 : 45
    }));

    const workout: WorkoutProgram = {
      id: `wo-gen-${Date.now()}`,
      name: `${duration}-Minute Custom ${goal}`,
      description: `Intelligently generated ${experience.toLowerCase()} program optimized for ${location.toLowerCase()} training.`,
      goal,
      difficulty: experience,
      location,
      durationMinutes: duration,
      category: goal,
      warmup: [
        'Dynamic Shoulder Rolls & Arm Swings — 1 min',
        'Hip Circles & Cat-Cow Spinal Articulation — 2 min',
        'Light Jumping Jacks or Step-in-Place — 2 min'
      ],
      cooldown: [
        'World’s Greatest Stretch — 2 min',
        'Deep Diaphragmatic Breathing & Hip Flexor Stretch — 3 min'
      ],
      exercises: workoutExercises,
      published: true
    };

    setGeneratedWorkout(workout);
  };

  return (
    <div className="py-6 px-4 sm:px-6 max-w-7xl mx-auto space-y-8 select-none">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ff5722]/15 text-[#ff5722] text-xs font-bold mb-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          INTELLIGENT WORKOUT ENGINE
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Workout Generator
        </h1>
        <p className="text-sm text-neutral-400 mt-1">
          Customize your parameters and let our intelligent engine assemble a structured session tailored to your exact equipment.
        </p>
      </div>

      {/* Main Form & Generation Preview Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Generator Form Settings */}
        <div className="lg:col-span-6 space-y-6">
          <div className="p-6 rounded-3xl bg-[#1c1c1e] border border-[#2a2a2e] space-y-5 shadow-xl">
            {/* 1. GOAL */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
                1. Select Training Goal
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {goalOptions.map(g => (
                  <button
                    key={g}
                    onClick={() => setGoal(g)}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all text-center ${
                      goal === g 
                        ? 'bg-[#ff5722] border-[#ff5722] text-white shadow-md' 
                        : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. LOCATION */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
                2. Training Location
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['Home', 'Gym', 'Both'] as LocationType[]).map(loc => (
                  <button
                    key={loc}
                    onClick={() => setLocation(loc)}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all text-center ${
                      location === loc 
                        ? 'bg-[#ff5722] border-[#ff5722] text-white shadow-md' 
                        : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white'
                    }`}
                  >
                    {loc}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. EXPERIENCE LEVEL */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
                3. Experience Level
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['Beginner', 'Intermediate', 'Advanced'] as DifficultyLevel[]).map(exp => (
                  <button
                    key={exp}
                    onClick={() => setExperience(exp)}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all text-center ${
                      experience === exp 
                        ? 'bg-[#ff5722] border-[#ff5722] text-white shadow-md' 
                        : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white'
                    }`}
                  >
                    {exp}
                  </button>
                ))}
              </div>
            </div>

            {/* 4. DURATION */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
                4. Session Duration
              </label>
              <div className="grid grid-cols-5 gap-2">
                {durationOptions.map(mins => (
                  <button
                    key={mins}
                    onClick={() => setDuration(mins)}
                    className={`py-2.5 px-2 rounded-xl text-xs font-bold border transition-all text-center ${
                      duration === mins 
                        ? 'bg-[#ff5722] border-[#ff5722] text-white shadow-md' 
                        : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white'
                    }`}
                  >
                    {mins}m
                  </button>
                ))}
              </div>
            </div>

            {/* 5. AVAILABLE EQUIPMENT (Multi-select) */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
                5. Available Equipment (Multi-Select)
              </label>
              <div className="flex flex-wrap gap-2">
                {equipmentOptions.map(eq => {
                  const isSelected = selectedEquipment.includes(eq);
                  return (
                    <button
                      key={eq}
                      onClick={() => toggleEquipment(eq)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all flex items-center gap-1.5 ${
                        isSelected 
                          ? 'bg-[#00ff66]/20 border-[#00ff66]/60 text-[#00ff66] font-bold' 
                          : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white'
                      }`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5" />}
                      {eq}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Generate Action Button */}
            <button
              onClick={handleGenerate}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#ff5722] to-amber-500 hover:opacity-95 text-white text-sm font-black tracking-wider uppercase shadow-xl shadow-[#ff5722]/25 flex items-center justify-center gap-2 transition-all active:scale-95 mt-4"
            >
              <Sparkles className="w-4 h-4" />
              <span>GENERATE WORKOUT NOW</span>
            </button>
          </div>
        </div>

        {/* Right Column: Generated Structured Program */}
        <div className="lg:col-span-6">
          {!generatedWorkout ? (
            <div className="p-8 rounded-3xl bg-[#1c1c1e] border border-dashed border-[#2a2a2e] flex flex-col items-center justify-center text-center min-h-[460px] space-y-3">
              <div className="w-16 h-16 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-600">
                <Sliders className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-white">Your Custom Program Will Appear Here</h3>
              <p className="text-xs text-neutral-400 max-w-sm">
                Select your preferences on the left and click "GENERATE WORKOUT NOW" to produce a structured warm-up, core workout, and cool-down.
              </p>
            </div>
          ) : (
            <div className="p-6 rounded-3xl bg-[#1c1c1e] border border-[#2a2a2e] shadow-2xl space-y-6 animate-in zoom-in-95">
              {/* Program Header */}
              <div className="flex items-start justify-between gap-3 border-b border-neutral-800/80 pb-4">
                <div>
                  <span className="px-2.5 py-1 text-[10px] font-bold uppercase rounded-md bg-[#00ff66]/15 text-[#00ff66] border border-[#00ff66]/30">
                    GENERATED SESSION
                  </span>
                  <h2 className="text-2xl font-black text-white mt-1.5">{generatedWorkout.name}</h2>
                  <p className="text-xs text-neutral-400 mt-0.5">{generatedWorkout.description}</p>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold text-[#ff5722]">{generatedWorkout.durationMinutes} MIN</span>
                  <p className="text-[11px] text-neutral-500">{generatedWorkout.exercises.length} Exercises</p>
                </div>
              </div>

              {/* Dynamic Warm-up Section */}
              <div className="p-4 rounded-2xl bg-neutral-900/80 border border-neutral-800/80 space-y-2">
                <p className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" /> Dynamic Warm-up (5 min)
                </p>
                <ul className="text-xs text-neutral-300 space-y-1">
                  {generatedWorkout.warmup.map((item, idx) => (
                    <li key={idx}>• {item}</li>
                  ))}
                </ul>
              </div>

              {/* Exercises List (Section 18) */}
              <div className="space-y-3">
                <p className="text-xs font-bold uppercase tracking-wider text-white">
                  Main Workout Sequence
                </p>
                <div className="space-y-2">
                  {generatedWorkout.exercises.map((item, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-neutral-900/60 border border-neutral-800 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-lg bg-neutral-800 text-xs font-bold text-[#ff5722] flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        <span className="text-xs font-bold text-white">{item.exerciseName}</span>
                      </div>
                      <span className="text-xs font-mono font-semibold text-[#00ff66]">
                        {item.sets} × {item.reps}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cool-down Section */}
              <div className="p-4 rounded-2xl bg-neutral-900/80 border border-neutral-800/80 space-y-2">
                <p className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" /> Recovery & Cool-down (5 min)
                </p>
                <ul className="text-xs text-neutral-300 space-y-1">
                  {generatedWorkout.cooldown.map((item, idx) => (
                    <li key={idx}>• {item}</li>
                  ))}
                </ul>
              </div>

              {/* Actions: Start Workout & Re-generate */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={() => startWorkout(generatedWorkout)}
                  className="flex-1 py-3.5 rounded-2xl bg-[#ff5722] hover:bg-[#ff5722]/90 text-white text-xs font-black tracking-wider uppercase flex items-center justify-center gap-2 shadow-xl shadow-[#ff5722]/20 transition-all active:scale-95"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>START WORKOUT</span>
                </button>

                <button
                  onClick={handleGenerate}
                  className="px-4 py-3.5 rounded-2xl bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-bold border border-neutral-700 flex items-center justify-center gap-2 transition-all active:scale-95"
                  title="Re-generate"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Re-roll</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
