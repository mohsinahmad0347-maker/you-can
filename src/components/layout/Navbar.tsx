import React from 'react';
import { 
  Search, 
  Bell, 
  User, 
  Dumbbell, 
  ShieldCheck, 
  Menu, 
  X, 
  Flame 
} from 'lucide-react';
import { useFitness } from '../../context/FitnessContext';

interface NavbarProps {
  /** Mobile drawer state (true when the off-canvas sidebar is open) */
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
  /** Desktop collapse state of the sidebar column */
  isCollapsed: boolean;
  /** True when the app is rendering the desktop two-column layout */
  isDesktop: boolean;
  /** Single toggle: collapses the desktop column / opens the mobile drawer */
  onToggleSidebar: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  isSidebarOpen,
  setIsSidebarOpen,
  isCollapsed,
  isDesktop,
  onToggleSidebar,
}) => {
  const { 
    currentView, 
    setCurrentView, 
    setIsSearchOpen, 
    setIsNotificationOpen, 
    unreadNotificationCount, 
    userProfile, 
    setIsAuthModalOpen,
    isAdminLoggedIn
  } = useFitness();

  return (
    <header className="sticky top-0 z-40 w-full glass-nav px-4 lg:px-6 h-16 flex items-center justify-between transition-all select-none">
      {/* LEFT: Menu Toggle & YOU CAN Brand Logo */}
      <div className="flex items-center gap-3">
        {/* Hamburger / sidebar toggle — uses the YOU CAN logo accent color (#ff5722) */}
        <button
          type="button"
          onClick={onToggleSidebar}
          aria-label="Toggle navigation"
          aria-controls="app-sidebar"
          aria-expanded={isDesktop ? !isCollapsed : isSidebarOpen}
          title={
            isDesktop
              ? isCollapsed ? 'Expand navigation' : 'Collapse navigation'
              : isSidebarOpen ? 'Close navigation' : 'Open navigation'
          }
          className="shrink-0 w-11 h-11 lg:w-[42px] lg:h-[42px] rounded-xl flex items-center justify-center bg-[#ff5722]/10 border border-[#ff5722]/40 text-[#ff5722] hover:bg-[#ff5722]/20 hover:text-[#ff8a65] hover:border-[#ff5722]/70 active:scale-95 transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff5722]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#121212]"
        >
          {!isDesktop && isSidebarOpen
            ? <X className="w-[22px] h-[22px] lg:w-[26px] lg:h-[26px]" strokeWidth={2.6} />
            : <Menu className="w-[26px] h-[26px] lg:w-[22px] lg:h-[22px]" strokeWidth={2.6} />}
        </button>

        {/* Brand Logo */}
        <div 
          onClick={() => {
            if (currentView === 'admin') {
              setCurrentView('admin');
            } else {
              setCurrentView('home');
            }
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#ff5722] to-[#ff8a65] flex items-center justify-center shadow-lg shadow-[#ff5722]/25 group-hover:scale-105 transition-all">
            <Dumbbell className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-tight text-white leading-none">
              YOU <span className="text-[#ff5722]">CAN</span>
            </span>
            <span className="text-[9px] font-bold tracking-widest text-[#00ff66] uppercase leading-tight mt-0.5">
              TRAIN STRONG
            </span>
          </div>
        </div>

        {/* Streak Counter Pill in Header */}
        <div 
          onClick={() => setCurrentView('dashboard')}
          className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-[#ff5722]/15 to-amber-500/10 border border-[#ff5722]/30 text-[#ff5722] text-xs font-bold cursor-pointer hover:border-[#ff5722]/60 transition-all ml-4"
          title="Active Workout Streak"
        >
          <Flame className="w-3.5 h-3.5 fill-[#ff5722] animate-pulse" />
          <span>{userProfile.streakDays} Day Streak</span>
        </div>
      </div>

      {/* RIGHT: Search, Notifications, Profile & Admin Toggle */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Quick Admin Platform Switcher */}
        <button
          onClick={() => {
            if (currentView === 'admin' || currentView === 'admin-login') {
              setCurrentView('home');
            } else {
              setCurrentView(isAdminLoggedIn ? 'admin' : 'admin-login');
            }
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all active:scale-95 ${
            currentView.startsWith('admin')
              ? 'bg-[#00ff66]/15 border-[#00ff66]/40 text-[#00ff66]'
              : 'bg-neutral-800/80 border-neutral-700/60 text-neutral-300 hover:text-white hover:border-neutral-600'
          }`}
          title="Toggle Admin Platform"
        >
          <ShieldCheck className="w-4 h-4 text-[#ff5722]" />
          <span className="hidden sm:inline">
            {currentView.startsWith('admin') ? 'Exit Admin' : 'Admin Panel'}
          </span>
        </button>

        {/* 1. Search Trigger */}
        <button
          onClick={() => setIsSearchOpen(true)}
          className="flex items-center gap-2 p-2 sm:px-3 sm:py-1.5 rounded-xl bg-neutral-900/80 hover:bg-neutral-800 text-neutral-400 hover:text-white border border-neutral-800 hover:border-neutral-700 transition-all active:scale-95"
          aria-label="Global Search"
        >
          <Search className="w-4 h-4 text-neutral-300" />
          <span className="hidden sm:inline text-xs text-neutral-400">Search library...</span>
          <kbd className="hidden md:inline-block px-1.5 py-0.5 text-[10px] font-semibold text-neutral-500 bg-neutral-800 rounded border border-neutral-700">
            ⌘K
          </kbd>
        </button>

        {/* 2. Notifications Trigger */}
        <button
          onClick={() => setIsNotificationOpen(true)}
          className="relative p-2 rounded-xl bg-neutral-900/80 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-800 hover:border-neutral-700 transition-all active:scale-95"
          aria-label="Notifications"
        >
          <Bell className="w-4 h-4" />
          {unreadNotificationCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#ff5722] text-white text-[10px] font-black flex items-center justify-center animate-pulse">
              {unreadNotificationCount}
            </span>
          )}
        </button>

        {/* 3. User Profile Avatar */}
        <button
          onClick={() => {
            setCurrentView('profile');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2 p-1.5 sm:px-2.5 sm:py-1 rounded-xl bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 transition-all active:scale-95"
          aria-label="User Profile"
        >
          <div className="w-6 h-6 rounded-lg bg-[#2a2a2a] border border-[#ff5722]/50 flex items-center justify-center text-xs font-bold text-white shadow-sm">
            {userProfile.avatar || <User className="w-3.5 h-3.5 text-neutral-300" />}
          </div>
          <span className="hidden sm:inline text-xs font-semibold text-neutral-200 truncate max-w-[100px]">
            {userProfile.name}
          </span>
        </button>
      </div>
    </header>
  );
};
