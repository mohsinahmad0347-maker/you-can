import React, { useState } from 'react';
import { 
  Flame, 
  Dumbbell, 
  Clock, 
  Target, 
  TrendingUp, 
  Play, 
  Calendar as CalendarIcon, 
  Award, 
  ChevronRight,
  Sparkles,
  Layers,
  CheckCircle2
} from 'lucide-react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  AreaChart, 
  Area, 
  LineChart, 
  Line 
} from 'recharts';
import { useFitness } from '../../context/FitnessContext';

export const FitnessDashboard: React.FC = () => {
  const { 
    userProfile, 
    workouts, 
    exercises, 
    startWorkout, 
    setCurrentView, 
    goals, 
    openExerciseDetail 
  } = useFitness();

  const [timeframe, setTimeframe] = useState<'week' | 'month' | 'year'>('week');

  const todaysWorkout = workouts[0];
  const favoriteExercises = exercises.filter(e => e.isFavorite).slice(0, 4);

  // Training Distribution Data (Donut Chart)
  const distributionData = [
    { name: 'Strength', value: 48, color: '#ff5722' },
    { name: 'Cardio', value: 24, color: '#00ff66' },
    { name: 'Mobility', value: 16, color: '#38bdf8' },
    { name: 'Recovery', value: 12, color: '#fbbf24' }
  ];

  // Workouts per week (Column / Bar Chart)
  const weeklyWorkoutsData = [
    { day: 'Mon', workouts: 1 },
    { day: 'Tue', workouts: 1 },
    { day: 'Wed', workouts: 0 },
    { day: 'Thu', workouts: 1 },
    { day: 'Fri', workouts: 1 },
    { day: 'Sat', workouts: 1 },
    { day: 'Sun', workouts: 0 }
  ];

  // Activity progression (Area Chart)
  const activityData = [
    { label: 'Week 1', minutes: 210, calories: 1850 },
    { label: 'Week 2', minutes: 280, calories: 2400 },
    { label: 'Week 3', minutes: 260, calories: 2200 },
    { label: 'Week 4', minutes: 340, calories: 2950 },
  ];

  // Consistency over time (Line Chart)
  const consistencyData = [
    { month: 'May', consistency: 78 },
    { month: 'Jun', consistency: 84 },
    { month: 'Jul', consistency: 88 },
    { month: 'Aug', consistency: 92 },
    { month: 'Sep', consistency: 96 }
  ];

  const completedGoalsCount = goals.filter(g => g.completed).length;
  const goalPercentage = goals.length > 0 ? Math.round((completedGoalsCount / goals.length) * 100) : 0;

  return (
    <div className="py-6 px-4 sm:px-6 max-w-7xl mx-auto space-y-8 select-none">
      {/* Top Banner Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ff5722]/15 text-[#ff5722] text-xs font-bold mb-2">
            <Flame className="w-3.5 h-3.5 fill-[#ff5722]" />
            ATHLETE TELEMETRY & PROGRESS
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Fitness Dashboard
          </h1>
          <p className="text-sm text-neutral-400 mt-1">
            Welcome back, <strong className="text-white">{userProfile.name}</strong>. You are currently on a <strong className="text-[#ff5722]">{userProfile.streakDays}-day streak</strong>.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {(['week', 'month', 'year'] as const).map(tf => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold uppercase border transition-all ${
                timeframe === tf 
                  ? 'bg-[#ff5722] border-[#ff5722] text-white shadow-md' 
                  : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Statistic Cards (Section 21) */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Workout Streak */}
        <div className="p-5 rounded-3xl bg-[#1c1c1e] border border-[#2a2a2e] space-y-2 shadow-xl hover:border-[#ff5722]/50 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">Workout Streak</span>
            <div className="w-8 h-8 rounded-xl bg-[#ff5722]/15 text-[#ff5722] flex items-center justify-center">
              <Flame className="w-4 h-4 fill-[#ff5722]" />
            </div>
          </div>
          <p className="text-3xl sm:text-4xl font-black text-white">{userProfile.streakDays} DAYS</p>
          <p className="text-[11px] text-[#00ff66] font-semibold">Active consecutive streak</p>
        </div>

        {/* Total Workouts */}
        <div className="p-5 rounded-3xl bg-[#1c1c1e] border border-[#2a2a2e] space-y-2 shadow-xl hover:border-neutral-700 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">Total Workouts</span>
            <div className="w-8 h-8 rounded-xl bg-blue-500/15 text-blue-400 flex items-center justify-center">
              <Dumbbell className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl sm:text-4xl font-black text-white">{userProfile.totalWorkouts}</p>
          <p className="text-[11px] text-neutral-400 font-medium">Logged on platform</p>
        </div>

        {/* Active Minutes */}
        <div className="p-5 rounded-3xl bg-[#1c1c1e] border border-[#2a2a2e] space-y-2 shadow-xl hover:border-neutral-700 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">Active Minutes</span>
            <div className="w-8 h-8 rounded-xl bg-[#00ff66]/15 text-[#00ff66] flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl sm:text-4xl font-black text-white">{userProfile.activeMinutes.toLocaleString()}</p>
          <p className="text-[11px] text-[#00ff66] font-semibold">+180 mins this week</p>
        </div>

        {/* Goals Progress */}
        <div className="p-5 rounded-3xl bg-[#1c1c1e] border border-[#2a2a2e] space-y-2 shadow-xl hover:border-neutral-700 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">Goals Progress</span>
            <div className="w-8 h-8 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center">
              <Target className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl sm:text-4xl font-black text-white">{goalPercentage}%</p>
          <div className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden">
            <div className="h-full bg-[#ff5722] rounded-full" style={{ width: `${goalPercentage}%` }} />
          </div>
        </div>
      </div>

      {/* TODAY'S WORKOUT FEATURED CARD (Section 21) */}
      {todaysWorkout && (
        <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-r from-[#1c1c1e] via-[#222226] to-[#1c1c1e] border border-[#ff5722]/40 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md bg-[#ff5722]/20 text-[#ff5722] border border-[#ff5722]/40">
              TODAY'S SCHEDULED WORKOUT
            </span>
            <h3 className="text-2xl font-black text-white">{todaysWorkout.name}</h3>
            <p className="text-xs text-neutral-300 leading-relaxed">{todaysWorkout.description}</p>
            <div className="flex items-center gap-4 text-xs text-neutral-400 pt-1">
              <span>Duration: <strong className="text-white">{todaysWorkout.durationMinutes} min</strong></span>
              <span>Level: <strong className="text-[#00ff66]">{todaysWorkout.difficulty}</strong></span>
              <span>Goal: <strong className="text-[#ff5722]">{todaysWorkout.goal}</strong></span>
            </div>
          </div>

          <button
            onClick={() => startWorkout(todaysWorkout)}
            className="px-8 py-4 rounded-2xl bg-[#ff5722] hover:bg-[#ff5722]/90 text-white text-xs font-black tracking-wider uppercase flex items-center gap-2 shadow-xl shadow-[#ff5722]/25 transition-all active:scale-95 shrink-0"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>START TODAY'S SESSION</span>
          </button>
        </div>
      )}

      {/* CHARTS GRID (Section 22) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* DONUT CHART: Training Distribution */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-[#1c1c1e] border border-[#2a2a2e] shadow-xl flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-white">Training Distribution</h3>
            <p className="text-xs text-neutral-400 mt-0.5">Discipline balance across strength, cardio, and mobility</p>
          </div>

          <div className="h-60 w-full relative my-2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={distributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {distributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1c1c1e', borderColor: '#2a2a2e', borderRadius: '12px', fontSize: '12px' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-2xl font-black text-white">100%</span>
              <span className="text-[10px] text-neutral-400 uppercase tracking-wider font-semibold">Balance</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-neutral-800/80">
            {distributionData.map(item => (
              <div key={item.name} className="flex items-center gap-2 text-xs">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-neutral-400">{item.name}:</span>
                <span className="font-bold text-white">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* COLUMN CHART: Workouts Per Week */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-[#1c1c1e] border border-[#2a2a2e] shadow-xl flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white">Weekly Workout Frequency</h3>
              <p className="text-xs text-neutral-400 mt-0.5">Target: 4-5 sessions per week</p>
            </div>
            <span className="px-2.5 py-1 rounded-lg bg-[#00ff66]/15 text-[#00ff66] text-xs font-bold">
              On Track
            </span>
          </div>

          <div className="h-64 w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyWorkoutsData}>
                <XAxis dataKey="day" stroke="#666666" fontSize={12} tickLine={false} />
                <YAxis stroke="#666666" fontSize={12} tickLine={false} allowDecimals={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1c1c1e', borderColor: '#2a2a2e', borderRadius: '12px', fontSize: '12px' }}
                />
                <Bar dataKey="workouts" fill="#ff5722" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* SECOND CHARTS ROW: Area Chart Activity + Consistency Line */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* AREA CHART: Activity Progression */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-[#1c1c1e] border border-[#2a2a2e] shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-white">Activity & Volume Progression</h3>
              <p className="text-xs text-neutral-400">Total active training minutes over 4 weeks</p>
            </div>
            <span className="text-xs font-bold text-[#ff5722]">Weekly Growth</span>
          </div>

          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={activityData}>
                <defs>
                  <linearGradient id="colorMinutes" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ff5722" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#ff5722" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="label" stroke="#666" fontSize={12} tickLine={false} />
                <YAxis stroke="#666" fontSize={12} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1c1c1e', borderColor: '#2a2a2e', borderRadius: '12px', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="minutes" stroke="#ff5722" strokeWidth={3} fillOpacity={1} fill="url(#colorMinutes)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* PROGRESS BARS: Pillar Progression */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-[#1c1c1e] border border-[#2a2a2e] shadow-xl flex flex-col justify-between space-y-4">
          <div>
            <h3 className="text-base font-bold text-white">Fitness Pillar Mastery</h3>
            <p className="text-xs text-neutral-400">Comprehensive athletic competence index</p>
          </div>

          <div className="space-y-3.5">
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-neutral-300">Strength & Overload</span>
                <span className="text-[#ff5722]">88%</span>
              </div>
              <div className="w-full h-2 bg-neutral-800 rounded-full overflow-hidden">
                <div className="h-full bg-[#ff5722] rounded-full" style={{ width: '88%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-neutral-300">Cardiovascular Endurance</span>
                <span className="text-[#00ff66]">76%</span>
              </div>
              <div className="w-full h-2 bg-neutral-800 rounded-full overflow-hidden">
                <div className="h-full bg-[#00ff66] rounded-full" style={{ width: '76%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-neutral-300">Joint Mobility & Flexibility</span>
                <span className="text-sky-400">82%</span>
              </div>
              <div className="w-full h-2 bg-neutral-800 rounded-full overflow-hidden">
                <div className="h-full bg-sky-400 rounded-full" style={{ width: '82%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-neutral-300">Habitual Consistency</span>
                <span className="text-amber-400">95%</span>
              </div>
              <div className="w-full h-2 bg-neutral-800 rounded-full overflow-hidden">
                <div className="h-full bg-amber-400 rounded-full" style={{ width: '95%' }} />
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-neutral-800/80 flex items-center justify-between text-xs text-neutral-400">
            <span>Aggregated Athlete Score</span>
            <strong className="text-white font-mono text-sm">85.2 / 100</strong>
          </div>
        </div>
      </div>

      {/* FAVORITE EXERCISES LIST (Section 21) */}
      <div className="p-6 rounded-3xl bg-[#1c1c1e] border border-[#2a2a2e] shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white">Favorite Exercises Quick Access</h3>
            <p className="text-xs text-neutral-400">Jump directly into 3D demonstration</p>
          </div>
          <button
            onClick={() => setCurrentView('favorites')}
            className="text-xs font-bold text-[#ff5722] hover:underline"
          >
            Manage Favorites
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {favoriteExercises.map(ex => (
            <div
              key={ex.id}
              onClick={() => openExerciseDetail(ex.id)}
              className="p-4 rounded-2xl bg-neutral-900/80 border border-neutral-800 hover:border-[#ff5722]/50 cursor-pointer transition-all flex items-center justify-between group"
            >
              <div>
                <span className="text-[10px] font-bold text-[#ff5722] uppercase">{ex.primaryMuscle}</span>
                <h4 className="text-sm font-bold text-white group-hover:text-[#ff5722] transition-colors">{ex.name}</h4>
              </div>
              <ChevronRight className="w-4 h-4 text-neutral-600 group-hover:text-white transition-colors" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
