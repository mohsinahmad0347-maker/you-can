import React, { useState } from 'react';
import { 
  TrendingUp, 
  Calendar, 
  Dumbbell, 
  Flame, 
  Target, 
  Award,
  Clock,
  BarChart3,
  LineChart,
  Activity
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  Line,
  AreaChart,
  Area
} from 'recharts';
import { useFitness } from '../../context/FitnessContext';

export const ProgressPage: React.FC = () => {
  const { 
    userProfile, 
    calendar, 
    personalRecords, 
    goals 
  } = useFitness();

  const [timeframe, setTimeframe] = useState<'week' | 'month' | 'year'>('month');

  // Weekly workout data
  const weeklyData = [
    { day: 'Mon', workouts: 1, minutes: 45 },
    { day: 'Tue', workouts: 1, minutes: 30 },
    { day: 'Wed', workouts: 0, minutes: 0 },
    { day: 'Thu', workouts: 1, minutes: 50 },
    { day: 'Fri', workouts: 1, minutes: 40 },
    { day: 'Sat', workouts: 1, minutes: 60 },
    { day: 'Sun', workouts: 0, minutes: 0 }
  ];

  // Monthly progress data
  const monthlyData = [
    { week: 'Week 1', workouts: 4, minutes: 180 },
    { week: 'Week 2', workouts: 5, minutes: 220 },
    { week: 'Week 3', workouts: 4, minutes: 195 },
    { week: 'Week 4', workouts: 6, minutes: 280 }
  ];

  // Consistency trend
  const consistencyData = [
    { month: 'May', score: 72 },
    { month: 'Jun', score: 78 },
    { month: 'Jul', score: 85 },
    { month: 'Aug', score: 88 },
    { month: 'Sep', score: 92 }
  ];

  const completedWorkouts = calendar.filter(c => c.status === 'completed');
  const completedGoals = goals.filter(g => g.completed);

  return (
    <div className="py-6 px-4 sm:px-6 max-w-7xl mx-auto space-y-8 select-none">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ff5722]/15 text-[#ff5722] text-xs font-bold mb-2">
            <TrendingUp className="w-3.5 h-3.5" />
            PERFORMANCE ANALYTICS
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Progress Tracking
          </h1>
          <p className="text-sm text-neutral-400 mt-1">
            Monitor your fitness journey with detailed analytics and insights.
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

      {/* Overview Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="p-5 rounded-3xl bg-[#1c1c1e] border border-[#2a2a2e] space-y-2 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">Total Workouts</span>
            <div className="w-8 h-8 rounded-xl bg-blue-500/15 text-blue-400 flex items-center justify-center">
              <Dumbbell className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl sm:text-4xl font-black text-white">{userProfile.totalWorkouts}</p>
          <p className="text-[11px] text-[#00ff66] font-semibold">All time</p>
        </div>

        <div className="p-5 rounded-3xl bg-[#1c1c1e] border border-[#2a2a2e] space-y-2 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">Active Minutes</span>
            <div className="w-8 h-8 rounded-xl bg-[#00ff66]/15 text-[#00ff66] flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl sm:text-4xl font-black text-white">{userProfile.activeMinutes.toLocaleString()}</p>
          <p className="text-[11px] text-[#00ff66] font-semibold">+180 this week</p>
        </div>

        <div className="p-5 rounded-3xl bg-[#1c1c1e] border border-[#2a2a2e] space-y-2 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">Current Streak</span>
            <div className="w-8 h-8 rounded-xl bg-[#ff5722]/15 text-[#ff5722] flex items-center justify-center">
              <Flame className="w-4 h-4 fill-[#ff5722]" />
            </div>
          </div>
          <p className="text-3xl sm:text-4xl font-black text-white">{userProfile.streakDays} DAYS</p>
          <p className="text-[11px] text-neutral-400 font-medium">Keep it going!</p>
        </div>

        <div className="p-5 rounded-3xl bg-[#1c1c1e] border border-[#2a2a2e] space-y-2 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">Goals Completed</span>
            <div className="w-8 h-8 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center">
              <Target className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl sm:text-4xl font-black text-white">{completedGoals.length}/{goals.length}</p>
          <p className="text-[11px] text-neutral-400 font-medium">Active goals</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Workout Frequency */}
        <div className="p-6 rounded-3xl bg-[#1c1c1e] border border-[#2a2a2e] shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-white">Weekly Workout Frequency</h3>
              <p className="text-xs text-neutral-400 mt-0.5">Sessions completed this week</p>
            </div>
            <span className="text-xs font-bold text-[#00ff66]">5/7 Days</span>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData}>
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

        {/* Monthly Progress */}
        <div className="p-6 rounded-3xl bg-[#1c1c1e] border border-[#2a2a2e] shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-white">Monthly Activity Volume</h3>
              <p className="text-xs text-neutral-400 mt-0.5">Total training minutes per week</p>
            </div>
            <span className="text-xs font-bold text-[#ff5722]">+22% Growth</span>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient id="colorMinutes" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ff5722" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#ff5722" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="week" stroke="#666" fontSize={12} tickLine={false} />
                <YAxis stroke="#666" fontSize={12} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1c1c1e', borderColor: '#2a2a2e', borderRadius: '12px', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="minutes" stroke="#ff5722" strokeWidth={3} fillOpacity={1} fill="url(#colorMinutes)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Consistency Trend */}
      <div className="p-6 rounded-3xl bg-[#1c1c1e] border border-[#2a2a2e] shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-white">Consistency Trend</h3>
            <p className="text-xs text-neutral-400 mt-0.5">Your training consistency score over time</p>
          </div>
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-[#00ff66]" />
            <span className="text-xs font-bold text-[#00ff66]">Excellent</span>
          </div>
        </div>

        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsLineChart data={consistencyData}>
              <XAxis dataKey="month" stroke="#666" fontSize={12} tickLine={false} />
              <YAxis stroke="#666" fontSize={12} tickLine={false} domain={[0, 100]} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1c1c1e', borderColor: '#2a2a2e', borderRadius: '12px', fontSize: '12px' }}
              />
              <Line 
                type="monotone" 
                dataKey="score" 
                stroke="#00ff66" 
                strokeWidth={3} 
                dot={{ fill: '#00ff66', r: 4 }}
                activeDot={{ r: 6 }}
              />
            </RechartsLineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Personal Records */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            Personal Records
          </h2>
        </div>

        {personalRecords.length === 0 ? (
          <div className="py-12 text-center rounded-3xl bg-[#1c1c1e] border border-[#2a2a2e] space-y-3">
            <Award className="w-10 h-10 text-neutral-600 mx-auto" />
            <h3 className="text-base font-bold text-white">No personal records yet</h3>
            <p className="text-xs text-neutral-500">Start tracking your progress to set personal records!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {personalRecords.map(pr => (
              <div
                key={pr.id}
                className="p-4 rounded-2xl bg-[#1c1c1e] border border-[#2a2a2e] hover:border-amber-500/50 transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-bold text-white">{pr.exerciseName}</h4>
                  <Award className="w-4 h-4 text-amber-400" />
                </div>
                <p className="text-2xl font-black text-[#ff5722]">{pr.value}</p>
                <p className="text-[10px] text-neutral-400 mt-1">{pr.date}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recent Workout History */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#ff5722]" />
            Recent Workout History
          </h2>
        </div>

        {completedWorkouts.length === 0 ? (
          <div className="py-12 text-center rounded-3xl bg-[#1c1c1e] border border-[#2a2a2e] space-y-3">
            <Calendar className="w-10 h-10 text-neutral-600 mx-auto" />
            <h3 className="text-base font-bold text-white">No workout history yet</h3>
            <p className="text-xs text-neutral-500">Complete your first workout to start tracking!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {completedWorkouts.slice(0, 10).map(entry => (
              <div
                key={entry.id}
                className="p-4 rounded-2xl bg-[#1c1c1e] border border-[#2a2a2e] flex items-center justify-between hover:border-[#ff5722]/30 transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#00ff66]/15 text-[#00ff66] flex items-center justify-center">
                    <Flame className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">{entry.workoutName}</h4>
                    <p className="text-xs text-neutral-400">{entry.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-white">{entry.durationMinutes} min</p>
                  <p className="text-[10px] text-[#00ff66] font-semibold">Completed</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
