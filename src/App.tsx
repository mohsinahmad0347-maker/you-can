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

// ─── Inner App (has access to FitnessContext) ───────────────────────────────
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
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2200);
    return () => clearTimeout(timer);
  }, []);

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
    <div style={{ minHeight: '100vh', background: '#0d0d0d', position: 'relative' }}>
      {/* Top Navigation Bar */}
      <Navbar isSidebarOpen={sidebarOpen} setIsSidebarOpen={setSidebarOpen} />

      {/* Slide-in Sidebar */}
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {/* Overlay for sidebar on mobile */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)',
            zIndex: 40, backdropFilter: 'blur(2px)'
          }}
        />
      )}

      {/* Main Content */}
      <main style={{ transition: 'all 0.3s ease' }}>
        {renderView()}
      </main>

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
