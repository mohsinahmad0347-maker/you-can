import React from 'react';
import { 
  LayoutDashboard, 
  Home, 
  Dumbbell, 
  Flame, 
  Calendar, 
  Target, 
  TrendingUp, 
  Timer, 
  Calculator, 
  Layers, 
  Bookmark, 
  Sparkles, 
  Bot, 
  HeartHandshake, 
  User, 
  Bell, 
  Settings, 
  HelpCircle, 
  ShieldCheck, 
  Activity,
  Compass,
  ChevronRight
} from 'lucide-react';
import { useFitness } from '../../context/FitnessContext';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  const { 
    currentView, 
    setCurrentView, 
    setSelectedCategoryFilter,
    setIsSearchOpen,
    setIsNotificationOpen,
    isAdminLoggedIn
  } = useFitness();

  const handleNav = (view: string, categoryFilter?: string) => {
    if (categoryFilter !== undefined) {
      setSelectedCategoryFilter(categoryFilter);
      setCurrentView('exercises');
    } else {
      setCurrentView(view);
    }
    // Auto-close on smaller screens
    if (window.innerWidth < 1024) {
      setIsOpen(false);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isViewActive = (view: string) => currentView === view;

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside className={`fixed top-16 bottom-0 left-0 z-40 w-64 bg-[#1e1e22] border-r border-[#2a2a2e] flex flex-col transition-transform duration-300 ease-in-out select-none ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        {/* Navigation scrollable content */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
          {/* 1. MAIN */}
          <div>
            <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-2">
              MAIN
            </p>
            <div className="space-y-1">
              <button
                onClick={() => handleNav('dashboard')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-semibold transition-all ${
                  isViewActive('dashboard')
                    ? 'bg-[#ff5722] text-white shadow-md shadow-[#ff5722]/20 font-bold'
                    : 'text-neutral-300 hover:bg-neutral-800/80 hover:text-white'
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Dashboard</span>
              </button>

              <button
                onClick={() => handleNav('home')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-semibold transition-all ${
                  isViewActive('home')
                    ? 'bg-[#ff5722] text-white shadow-md shadow-[#ff5722]/20 font-bold'
                    : 'text-neutral-300 hover:bg-neutral-800/80 hover:text-white'
                }`}
              >
                <Home className="w-4 h-4" />
                <span>Home</span>
              </button>

              <button
                onClick={() => handleNav('exercises', '')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-semibold transition-all ${
                  isViewActive('exercises')
                    ? 'bg-[#ff5722] text-white shadow-md shadow-[#ff5722]/20 font-bold'
                    : 'text-neutral-300 hover:bg-neutral-800/80 hover:text-white'
                }`}
              >
                <Dumbbell className="w-4 h-4" />
                <span>Exercises</span>
              </button>

              <button
                onClick={() => handleNav('generator')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-semibold transition-all ${
                  isViewActive('generator')
                    ? 'bg-[#ff5722] text-white shadow-md shadow-[#ff5722]/20 font-bold'
                    : 'text-neutral-300 hover:bg-neutral-800/80 hover:text-white'
                }`}
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Workout Generator</span>
              </button>

              <button
                onClick={() => handleNav('workouts')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-semibold transition-all ${
                  isViewActive('workouts')
                    ? 'bg-[#ff5722] text-white shadow-md shadow-[#ff5722]/20 font-bold'
                    : 'text-neutral-300 hover:bg-neutral-800/80 hover:text-white'
                }`}
              >
                <Flame className="w-4 h-4" />
                <span>Workout Plans</span>
              </button>

              <button
                onClick={() => handleNav('progress')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-semibold transition-all ${
                  isViewActive('progress')
                    ? 'bg-[#ff5722] text-white shadow-md shadow-[#ff5722]/20 font-bold'
                    : 'text-neutral-300 hover:bg-neutral-800/80 hover:text-white'
                }`}
              >
                <TrendingUp className="w-4 h-4" />
                <span>Progress & PRs</span>
              </button>

              <button
                onClick={() => handleNav('goals')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-semibold transition-all ${
                  isViewActive('goals')
                    ? 'bg-[#ff5722] text-white shadow-md shadow-[#ff5722]/20 font-bold'
                    : 'text-neutral-300 hover:bg-neutral-800/80 hover:text-white'
                }`}
              >
                <Target className="w-4 h-4" />
                <span>Goals</span>
              </button>

              <button
                onClick={() => handleNav('calendar')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-semibold transition-all ${
                  isViewActive('calendar')
                    ? 'bg-[#ff5722] text-white shadow-md shadow-[#ff5722]/20 font-bold'
                    : 'text-neutral-300 hover:bg-neutral-800/80 hover:text-white'
                }`}
              >
                <Calendar className="w-4 h-4" />
                <span>Calendar</span>
              </button>
            </div>
          </div>

          {/* 2. EXERCISE LIBRARY MUSCLE GROUPS */}
          <div>
            <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-2">
              EXERCISE LIBRARY
            </p>
            <div className="space-y-0.5">
              {[
                'All Exercises',
                'Chest',
                'Back',
                'Shoulders',
                'Arms',
                'Legs',
                'Glutes',
                'Core',
                'Cardio',
                'Full Body',
                'Mobility',
                'Stretching'
              ].map(cat => (
                <button
                  key={cat}
                  onClick={() => handleNav('exercises', cat === 'All Exercises' ? '' : cat)}
                  className="w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-medium text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800/60 transition-all text-left"
                >
                  <span>{cat}</span>
                  <ChevronRight className="w-3 h-3 text-neutral-600" />
                </button>
              ))}
            </div>
          </div>

          {/* 3. TRAINING CATEGORIES */}
          <div>
            <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-2">
              TRAINING MODES
            </p>
            <div className="space-y-1">
              <button
                onClick={() => handleNav('workouts', 'gym')}
                className="w-full flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-xs font-medium text-neutral-300 hover:bg-neutral-800/60 hover:text-white"
              >
                <span className="w-2 h-2 rounded-full bg-[#ff5722]" />
                <span>Gym Workouts</span>
              </button>
              <button
                onClick={() => handleNav('workouts', 'home')}
                className="w-full flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-xs font-medium text-neutral-300 hover:bg-neutral-800/60 hover:text-white"
              >
                <span className="w-2 h-2 rounded-full bg-[#00ff66]" />
                <span>Home Workouts</span>
              </button>
              <button
                onClick={() => handleNav('warmup')}
                className="w-full flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-xs font-medium text-neutral-300 hover:bg-neutral-800/60 hover:text-white"
              >
                <Activity className="w-3.5 h-3.5 text-amber-400" />
                <span>Warm-up Library</span>
              </button>
              <button
                onClick={() => handleNav('recovery')}
                className="w-full flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-xs font-medium text-neutral-300 hover:bg-neutral-800/60 hover:text-white"
              >
                <HeartHandshake className="w-3.5 h-3.5 text-emerald-400" />
                <span>Recovery & Mobility</span>
              </button>
            </div>
          </div>

          {/* 4. TOOLS & ASSISTANT */}
          <div>
            <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-2">
              TOOLS & ASSISTANT
            </p>
            <div className="space-y-1">
              <button
                onClick={() => handleNav('coach')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-semibold transition-all ${
                  isViewActive('coach')
                    ? 'bg-[#00ff66]/20 text-[#00ff66] border border-[#00ff66]/40 font-bold'
                    : 'text-neutral-300 hover:bg-neutral-800/80 hover:text-white'
                }`}
              >
                <Bot className="w-4 h-4 text-[#00ff66]" />
                <span>YOU CAN Coach (AI)</span>
              </button>

              <button
                onClick={() => handleNav('tools')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-semibold transition-all ${
                  isViewActive('tools')
                    ? 'bg-[#ff5722] text-white font-bold'
                    : 'text-neutral-300 hover:bg-neutral-800/80 hover:text-white'
                }`}
              >
                <Timer className="w-4 h-4" />
                <span>Workout Timer</span>
              </button>

              <button
                onClick={() => handleNav('comparison')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-semibold transition-all ${
                  isViewActive('comparison')
                    ? 'bg-[#ff5722] text-white font-bold'
                    : 'text-neutral-300 hover:bg-neutral-800/80 hover:text-white'
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>Exercise Comparison</span>
              </button>

              <button
                onClick={() => handleNav('favorites')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-semibold transition-all ${
                  isViewActive('favorites')
                    ? 'bg-[#ff5722] text-white font-bold'
                    : 'text-neutral-300 hover:bg-neutral-800/80 hover:text-white'
                }`}
              >
                <Bookmark className="w-4 h-4 text-amber-400" />
                <span>Favorites</span>
              </button>
            </div>
          </div>

          {/* 5. ACCOUNT */}
          <div>
            <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-2">
              ACCOUNT
            </p>
            <div className="space-y-1">
              <button
                onClick={() => handleNav('profile')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-semibold transition-all ${
                  isViewActive('profile')
                    ? 'bg-[#ff5722] text-white font-bold'
                    : 'text-neutral-300 hover:bg-neutral-800/80 hover:text-white'
                }`}
              >
                <User className="w-4 h-4" />
                <span>Profile</span>
              </button>

              <button
                onClick={() => setIsNotificationOpen(true)}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-semibold text-neutral-300 hover:bg-neutral-800/80 hover:text-white transition-all"
              >
                <Bell className="w-4 h-4" />
                <span>Notifications</span>
              </button>

              <button
                onClick={() => handleNav('settings')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-semibold transition-all ${
                  isViewActive('settings')
                    ? 'bg-[#ff5722] text-white font-bold'
                    : 'text-neutral-300 hover:bg-neutral-800/80 hover:text-white'
                }`}
              >
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Quick Switch to Admin Platform */}
        <div className="p-3 border-t border-[#2a2a2e] bg-[#17171a]">
          <button
            onClick={() => handleNav(isAdminLoggedIn ? 'admin' : 'admin-login')}
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-xs font-bold text-[#ff5722] border border-[#ff5722]/30 hover:border-[#ff5722]/60 transition-all"
          >
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              <span>YOU CAN ADMIN</span>
            </div>
            <span className="px-1.5 py-0.5 rounded bg-[#ff5722]/10 text-[10px] text-[#ff5722] font-black">
              PRO
            </span>
          </button>
        </div>
      </aside>
    </>
  );
};
