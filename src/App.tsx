import React, { useState, useEffect } from 'react';
import { FitnessProvider, useFitness } from './context/FitnessContext';

// Layout
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { GlobalSearchModal } from './components/layout/GlobalSearchModal';
import { NotificationPanel } from './components/layout/NotificationPanel';
import { AuthModal } from './components/layout/AuthModal';
import { LoadingScreen } from './components/layout/LoadingScreen';

// Pages
import { HomePage } from './components/home/HomePage';
import { FitnessDashboard } from './components/dashboard/FitnessDashboard';
import { ExerciseLibrary } from './components/exercises/ExerciseLibrary';
import { ExercisePracticalPage } from './components/exercises/ExercisePracticalPage';
import { ComparisonPage } from './components/exercises/ComparisonPage';
import { WorkoutPlansPage } from './components/workout/WorkoutPlansPage';
import { WorkoutGenerator } from './components/workout/WorkoutGenerator';
import { WorkoutMode } from './components/workout/WorkoutMode';
import { GoalsPage } from './components/goals/GoalsPage';
import { CalendarPage } from './components/calendar/CalendarPage';
import { ProfilePage } from './components/profile/ProfilePage';
import { AICoachPage } from './components/ai/AICoachPage';
import { RecoveryPage } from './components/recovery/RecoveryPage';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AdminLoginPage } from './components/admin/AdminLoginPage';
import { FavoritesPage } from './components/favorites/FavoritesPage';
import { ProgressPage } from './components/progress/ProgressPage';
import { WorkoutTimerPage } from './components/tools/WorkoutTimerPage';
import { SettingsPage } from './components/settings/SettingsPage';
import { WarmupPage } from './components/warmup/WarmupPage';

// ─── Inner App (has access to FitnessContext) ──────────────────────────────
const AppShell: React.FC = () => {
  const {
    currentView,
    isSearchOpen,
    isNotificationOpen,
    isAuthModalOpen,
    activeWorkout,
    isAdminLoggedIn,
  } = useFitness();

  const [isLoading, setIsLoading] = useState(true);
  // Mobile/tablet: sidebar is an off-canvas drawer
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // Desktop: sidebar is a permanent column that collapses to an icon rail
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isDesktop, setIsDesktop] = useState<boolean>(() =>
    typeof window === 'undefined' ? true : window.matchMedia('(min-width: 1024px)').matches
  );

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // Keep the layout mode in sync with the viewport (desktop column vs mobile drawer)
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const apply = (matches: boolean) => {
      setIsDesktop(matches);
      if (matches) setSidebarOpen(false); // never leave a drawer open behind desktop content
    };
    apply(mq.matches);
    const onChange = (event: MediaQueryListEvent) => apply(event.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  // Escape closes the mobile drawer
  useEffect(() => {
    if (isDesktop || !sidebarOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSidebarOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isDesktop, sidebarOpen]);

  /**
   * Freeze the page behind the phone drawer. Without this the article behind the overlay
   * keeps scrolling under the user's thumb, which is what made the drawer feel broken/janky
   * on phones. Only the overflow is locked (the body is never offset) so the sticky navbar —
   * and its close button — stays exactly where the user expects it.
   */
  useEffect(() => {
    if (isDesktop || !sidebarOpen) return;
    const html = document.documentElement;
    const previous = { html: html.style.overflow, body: document.body.style.overflow };
    html.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    return () => {
      html.style.overflow = previous.html;
      document.body.style.overflow = previous.body;
    };
  }, [isDesktop, sidebarOpen]);

  // Navigating to another page from the drawer already closes it; keep the state honest
  // if the view changes from anywhere else (dashboard shortcut, admin login, …).
  useEffect(() => {
    if (!isDesktop) setSidebarOpen(false);
  }, [currentView, isDesktop]);

  // One hamburger, two behaviours: collapse the desktop column / open the mobile drawer
  const toggleSidebar = () => {
    if (isDesktop) setSidebarCollapsed(prev => !prev);
    else setSidebarOpen(prev => !prev);
  };

  if (isLoading) return <LoadingScreen />;

  if (activeWorkout && currentView === 'workout-mode') {
    return <WorkoutMode />;
  }

  const renderView = () => {
    switch (currentView) {
      case 'home':        return <HomePage />;
      case 'dashboard':   return <FitnessDashboard />;
      case 'exercises':   return <ExerciseLibrary />;
      case 'exercise-detail': return <ExercisePracticalPage />;
      case 'comparison':  return <ComparisonPage />;
      case 'workout-plans': return <WorkoutPlansPage />;
      case 'workouts':    return <WorkoutPlansPage />;
      case 'generator':   return <WorkoutGenerator />;
      case 'goals':       return <GoalsPage />;
      case 'calendar':    return <CalendarPage />;
      case 'profile':     return <ProfilePage />;
      case 'ai-coach':    return <AICoachPage />;
      case 'coach':      return <AICoachPage />;
      case 'recovery':    return <RecoveryPage />;
      case 'favorites':   return <FavoritesPage />;
      case 'progress':    return <ProgressPage />;
      case 'tools':       return <WorkoutTimerPage />;
      case 'settings':    return <SettingsPage />;
      case 'warmup':      return <WarmupPage />;
      case 'admin':       return isAdminLoggedIn ? <AdminDashboard /> : <HomePage />;
      case 'admin-login': return <AdminLoginPage />;
      default:            return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#0d0d0d] relative">
      {/* Top Navigation Bar */}
      <Navbar
        isSidebarOpen={sidebarOpen}
        setIsSidebarOpen={setSidebarOpen}
        isCollapsed={sidebarCollapsed}
        isDesktop={isDesktop}
        onToggleSidebar={toggleSidebar}
      />

      {/* Application layout: sticky sidebar column + flexible main content */}
      <div className="flex w-full items-start">
        {/* Sidebar (sticky 260px column on desktop / off-canvas drawer on mobile) */}
        <Sidebar
          isOpen={sidebarOpen}
          setIsOpen={setSidebarOpen}
          isCollapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(prev => !prev)}
          isDesktop={isDesktop}
        />

        {/* Main Content — automatically takes the remaining width */}
        <main className="flex-1 min-w-0 w-full transition-all duration-300 ease-in-out">
          {renderView()}
        </main>
      </div>

      {/* Global Modals */}
      {isSearchOpen && <GlobalSearchModal />}
      {isNotificationOpen && <NotificationPanel />}
      {isAuthModalOpen && <AuthModal />}
    </div>
  );
};

// ─── Root App with Provider ──────────────────────────────────────────────────
function App() {
  return (
    <FitnessProvider>
      <AppShell />
    </FitnessProvider>
  );
}

export default App;
