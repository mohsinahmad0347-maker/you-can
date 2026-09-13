import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import confetti from 'canvas-confetti';
import { 
  Exercise, 
  WorkoutProgram, 
  UserProfile, 
  PersonalRecord, 
  FitnessGoalItem, 
  CalendarEntry, 
  NotificationItem, 
  CarouselSlide, 
  AdminUser, 
  ActivityLog, 
  SystemHealthItem,
  AdminRole 
} from '../types';
import { 
  INITIAL_EXERCISES, 
  INITIAL_WORKOUTS, 
  INITIAL_USER_PROFILE, 
  INITIAL_PRS, 
  INITIAL_GOALS, 
  INITIAL_CALENDAR, 
  INITIAL_NOTIFICATIONS, 
  INITIAL_CAROUSEL, 
  INITIAL_ADMIN_USERS, 
  INITIAL_ACTIVITY_LOGS, 
  INITIAL_SYSTEM_HEALTH 
} from '../data/initialData';
import { sounds } from '../utils/audio';

export interface ActiveWorkoutState {
  workout: WorkoutProgram;
  currentExerciseIndex: number;
  currentSet: number;
  totalSetsForCurrent: number;
  isResting: boolean;
  isPaused: boolean;
  secondsRemaining: number;
  totalElapsedSeconds: number;
  completed: boolean;
}

interface FitnessContextType {
  // Navigation & View
  currentView: string;
  setCurrentView: (view: string) => void;
  selectedExerciseId: string | null;
  setSelectedExerciseId: (id: string | null) => void;
  openExerciseDetail: (exerciseId: string) => void;
  compareExerciseIds: [string, string] | null;
  openComparison: (id1?: string, id2?: string) => void;
  selectedCategoryFilter: string | null;
  setSelectedCategoryFilter: (cat: string | null) => void;

  // Search & Modals
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isNotificationOpen: boolean;
  setIsNotificationOpen: (open: boolean) => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  authMode: 'login' | 'signup' | 'setup';
  setAuthMode: (mode: 'login' | 'signup' | 'setup') => void;

  // Core Data
  exercises: Exercise[];
  workouts: WorkoutProgram[];
  userProfile: UserProfile;
  personalRecords: PersonalRecord[];
  goals: FitnessGoalItem[];
  calendar: CalendarEntry[];
  notifications: NotificationItem[];
  unreadNotificationCount: number;
  carouselSlides: CarouselSlide[];
  adminUsers: AdminUser[];
  activityLogs: ActivityLog[];
  systemHealth: SystemHealthItem[];

  // Admin Session
  isAdminLoggedIn: boolean;
  adminRole: AdminRole;
  loginAdmin: (role?: AdminRole) => void;
  logoutAdmin: () => void;

  // Data Actions
  toggleFavorite: (exerciseId: string) => void;
  toggleWorkoutFavorite: (workoutId: string) => void;
  createGoal: (goal: Omit<FitnessGoalItem, 'id' | 'completed'>) => void;
  toggleGoal: (goalId: string) => void;
  addPersonalRecord: (pr: Omit<PersonalRecord, 'id'>) => void;
  markNotificationAsRead: (id: string) => void;
  clearAllNotifications: () => void;
  sendAnnouncement: (title: string, message: string) => void;
  addExercise: (exercise: Omit<Exercise, 'id'>) => void;
  updateExercise: (id: string, updates: Partial<Exercise>) => void;
  deleteExercise: (id: string) => void;
  addWorkout: (workout: Omit<WorkoutProgram, 'id'>) => void;
  updateWorkout: (id: string, updates: Partial<WorkoutProgram>) => void;
  deleteWorkout: (id: string) => void;
  updateUserProfile: (updates: Partial<UserProfile>) => void;
  toggleUserStatus: (userId: string) => void;
  updateCarouselSlide: (id: string, updates: Partial<CarouselSlide>) => void;
  addActivityLog: (action: string, status: 'Success' | 'Warning' | 'Pending', details: string) => void;

  // Live Workout Mode
  activeWorkout: ActiveWorkoutState | null;
  startWorkout: (workout: WorkoutProgram) => void;
  pauseWorkout: () => void;
  resumeWorkout: () => void;
  nextExerciseOrSet: () => void;
  previousExerciseOrSet: () => void;
  skipRest: () => void;
  finishWorkout: () => void;
  exitWorkout: () => void;
}

const FitnessContext = createContext<FitnessContextType | undefined>(undefined);

export const FitnessProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Navigation State
  const [currentView, setCurrentView] = useState<string>('home');
  const [selectedExerciseId, setSelectedExerciseId] = useState<string | null>(null);
  const [compareExerciseIds, setCompareExerciseIds] = useState<[string, string] | null>(null);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string | null>(null);

  // Modals & Search
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isNotificationOpen, setIsNotificationOpen] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup' | 'setup'>('login');

  // Admin Session State
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('you_can_admin_auth') === 'true';
  });
  const [adminRole, setAdminRole] = useState<AdminRole>(() => {
    return (localStorage.getItem('you_can_admin_role') as AdminRole) || 'Super Admin';
  });

  // Persistent Core Data
  const [exercises, setExercises] = useState<Exercise[]>(() => {
    const saved = localStorage.getItem('you_can_exercises');
    return saved ? JSON.parse(saved) : INITIAL_EXERCISES;
  });

  const [workouts, setWorkouts] = useState<WorkoutProgram[]>(() => {
    const saved = localStorage.getItem('you_can_workouts');
    return saved ? JSON.parse(saved) : INITIAL_WORKOUTS;
  });

  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('you_can_profile');
    return saved ? JSON.parse(saved) : INITIAL_USER_PROFILE;
  });

  const [personalRecords, setPersonalRecords] = useState<PersonalRecord[]>(() => {
    const saved = localStorage.getItem('you_can_prs');
    return saved ? JSON.parse(saved) : INITIAL_PRS;
  });

  const [goals, setGoals] = useState<FitnessGoalItem[]>(() => {
    const saved = localStorage.getItem('you_can_goals');
    return saved ? JSON.parse(saved) : INITIAL_GOALS;
  });

  const [calendar, setCalendar] = useState<CalendarEntry[]>(() => {
    const saved = localStorage.getItem('you_can_calendar');
    return saved ? JSON.parse(saved) : INITIAL_CALENDAR;
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem('you_can_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  const [carouselSlides, setCarouselSlides] = useState<CarouselSlide[]>(() => {
    const saved = localStorage.getItem('you_can_carousel');
    return saved ? JSON.parse(saved) : INITIAL_CAROUSEL;
  });

  const [adminUsers, setAdminUsers] = useState<AdminUser[]>(() => {
    const saved = localStorage.getItem('you_can_admin_users');
    return saved ? JSON.parse(saved) : INITIAL_ADMIN_USERS;
  });

  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>(() => {
    const saved = localStorage.getItem('you_can_activity_logs');
    return saved ? JSON.parse(saved) : INITIAL_ACTIVITY_LOGS;
  });

  const [systemHealth] = useState<SystemHealthItem[]>(INITIAL_SYSTEM_HEALTH);

  // Live Workout State
  const [activeWorkout, setActiveWorkout] = useState<ActiveWorkoutState | null>(null);

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem('you_can_exercises', JSON.stringify(exercises));
  }, [exercises]);

  useEffect(() => {
    localStorage.setItem('you_can_workouts', JSON.stringify(workouts));
  }, [workouts]);

  useEffect(() => {
    localStorage.setItem('you_can_profile', JSON.stringify(userProfile));
  }, [userProfile]);

  useEffect(() => {
    localStorage.setItem('you_can_prs', JSON.stringify(personalRecords));
  }, [personalRecords]);

  useEffect(() => {
    localStorage.setItem('you_can_goals', JSON.stringify(goals));
  }, [goals]);

  useEffect(() => {
    localStorage.setItem('you_can_calendar', JSON.stringify(calendar));
  }, [calendar]);

  useEffect(() => {
    localStorage.setItem('you_can_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('you_can_carousel', JSON.stringify(carouselSlides));
  }, [carouselSlides]);

  useEffect(() => {
    localStorage.setItem('you_can_admin_users', JSON.stringify(adminUsers));
  }, [adminUsers]);

  useEffect(() => {
    localStorage.setItem('you_can_activity_logs', JSON.stringify(activityLogs));
  }, [activityLogs]);

  // Live Workout Timer Interval
  useEffect(() => {
    if (!activeWorkout || activeWorkout.isPaused || activeWorkout.completed) return;

    const interval = setInterval(() => {
      setActiveWorkout(prev => {
        if (!prev || prev.isPaused || prev.completed) return prev;

        const newElapsed = prev.totalElapsedSeconds + 1;
        const newSeconds = Math.max(0, prev.secondsRemaining - 1);

        // Audio countdown for last 3 seconds
        if (newSeconds <= 3 && newSeconds > 0) {
          sounds.playCountdownTick();
        }

        if (newSeconds === 0 && prev.isResting) {
          // Rest finished!
          sounds.playGoChime();
          return {
            ...prev,
            isResting: false,
            secondsRemaining: 45, // default active interval
            totalElapsedSeconds: newElapsed
          };
        }

        return {
          ...prev,
          secondsRemaining: newSeconds,
          totalElapsedSeconds: newElapsed
        };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [activeWorkout]);

  // Actions
  const openExerciseDetail = (exerciseId: string) => {
    setSelectedExerciseId(exerciseId);
    setCurrentView('exercise-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openComparison = (id1?: string, id2?: string) => {
    const first = id1 || exercises[0]?.id || 'ex-bench-press';
    const second = id2 || exercises[1]?.id || 'ex-pushup';
    setCompareExerciseIds([first, second]);
    setCurrentView('comparison');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleFavorite = (exerciseId: string) => {
    setExercises(prev => prev.map(ex => 
      ex.id === exerciseId ? { ...ex, isFavorite: !ex.isFavorite } : ex
    ));
  };

  const toggleWorkoutFavorite = (workoutId: string) => {
    setWorkouts(prev => prev.map(w => 
      w.id === workoutId ? { ...w, isFavorite: !w.isFavorite } : w
    ));
  };

  const createGoal = (goalData: Omit<FitnessGoalItem, 'id' | 'completed'>) => {
    const newGoal: FitnessGoalItem = {
      ...goalData,
      id: `goal-${Date.now()}`,
      completed: false,
    };
    setGoals(prev => [newGoal, ...prev]);
  };

  const toggleGoal = (goalId: string) => {
    setGoals(prev => prev.map(g => {
      if (g.id === goalId) {
        const nextState = !g.completed;
        if (nextState) {
          confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
          sounds.playCompleteChime();
        }
        return { ...g, completed: nextState, current: nextState ? g.target : g.current };
      }
      return g;
    }));
  };

  const addPersonalRecord = (prData: Omit<PersonalRecord, 'id'>) => {
    const newPR: PersonalRecord = {
      ...prData,
      id: `pr-${Date.now()}`
    };
    setPersonalRecords(prev => [newPR, ...prev]);
    sounds.playCompleteChime();
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const sendAnnouncement = (title: string, message: string) => {
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title,
      message,
      type: 'announcement',
      date: 'Just now',
      read: false
    };
    setNotifications(prev => [newNotif, ...prev]);
    addActivityLog('Announcement Dispatched', 'Success', `Sent: "${title}"`);
  };

  const addExercise = (exData: Omit<Exercise, 'id'>) => {
    const newEx: Exercise = {
      ...exData,
      id: `ex-${Date.now()}`,
      published: true
    };
    setExercises(prev => [newEx, ...prev]);
    addActivityLog('New Exercise Added', 'Success', `Added "${newEx.name}"`);
  };

  const updateExercise = (id: string, updates: Partial<Exercise>) => {
    setExercises(prev => prev.map(ex => ex.id === id ? { ...ex, ...updates } : ex));
    addActivityLog('Exercise Updated', 'Success', `Updated ID: ${id}`);
  };

  const deleteExercise = (id: string) => {
    setExercises(prev => prev.filter(ex => ex.id !== id));
    addActivityLog('Exercise Deleted', 'Warning', `Removed exercise ID: ${id}`);
  };

  const addWorkout = (wData: Omit<WorkoutProgram, 'id'>) => {
    const newW: WorkoutProgram = {
      ...wData,
      id: `wo-${Date.now()}`,
      published: true
    };
    setWorkouts(prev => [newW, ...prev]);
    addActivityLog('Workout Program Created', 'Success', `Created "${newW.name}"`);
  };

  const updateWorkout = (id: string, updates: Partial<WorkoutProgram>) => {
    setWorkouts(prev => prev.map(w => w.id === id ? { ...w, ...updates } : w));
    addActivityLog('Workout Program Updated', 'Success', `Updated ID: ${id}`);
  };

  const deleteWorkout = (id: string) => {
    setWorkouts(prev => prev.filter(w => w.id !== id));
    addActivityLog('Workout Program Deleted', 'Warning', `Deleted workout ID: ${id}`);
  };

  const updateUserProfile = (updates: Partial<UserProfile>) => {
    setUserProfile(prev => ({ ...prev, ...updates }));
  };

  const toggleUserStatus = (userId: string) => {
    setAdminUsers(prev => prev.map(u => 
      u.id === userId 
        ? { ...u, status: u.status === 'active' ? 'disabled' : 'active' } 
        : u
    ));
    addActivityLog('User Status Toggled', 'Warning', `User ${userId} status changed.`);
  };

  const updateCarouselSlide = (id: string, updates: Partial<CarouselSlide>) => {
    setCarouselSlides(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s));
  };

  const addActivityLog = (action: string, status: 'Success' | 'Warning' | 'Pending', details: string) => {
    const newLog: ActivityLog = {
      id: `log-${Date.now()}`,
      adminName: 'Chief Admin',
      action,
      timestamp: new Date().toLocaleString(),
      status,
      details
    };
    setActivityLogs(prev => [newLog, ...prev.slice(0, 49)]);
  };

  const loginAdmin = (role: AdminRole = 'Super Admin') => {
    setIsAdminLoggedIn(true);
    setAdminRole(role);
    localStorage.setItem('you_can_admin_auth', 'true');
    localStorage.setItem('you_can_admin_role', role);
    setCurrentView('admin');
    addActivityLog('Admin Login', 'Success', `Logged in as ${role}`);
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem('you_can_admin_auth');
    localStorage.removeItem('you_can_admin_role');
    setCurrentView('home');
    addActivityLog('Admin Logout', 'Success', 'Session ended');
  };

  // Workout Session Handlers
  const startWorkout = (workout: WorkoutProgram) => {
    sounds.playGoChime();
    const currentEx = workout.exercises[0];
    setActiveWorkout({
      workout,
      currentExerciseIndex: 0,
      currentSet: 1,
      totalSetsForCurrent: currentEx ? currentEx.sets : 3,
      isResting: false,
      isPaused: false,
      secondsRemaining: 45,
      totalElapsedSeconds: 0,
      completed: false,
    });
    setCurrentView('workout-mode');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const pauseWorkout = () => {
    setActiveWorkout(prev => prev ? { ...prev, isPaused: true } : null);
  };

  const resumeWorkout = () => {
    setActiveWorkout(prev => prev ? { ...prev, isPaused: false } : null);
  };

  const nextExerciseOrSet = () => {
    if (!activeWorkout) return;
    const currentEx = activeWorkout.workout.exercises[activeWorkout.currentExerciseIndex];
    if (!currentEx) return;

    // Check if we need to rest between sets
    if (!activeWorkout.isResting && activeWorkout.currentSet < activeWorkout.totalSetsForCurrent) {
      sounds.playCompleteChime();
      setActiveWorkout(prev => prev ? {
        ...prev,
        isResting: true,
        secondsRemaining: currentEx.restSeconds || 45,
      } : null);
      return;
    }

    // If resting, advance to next set
    if (activeWorkout.isResting) {
      sounds.playGoChime();
      setActiveWorkout(prev => prev ? {
        ...prev,
        isResting: false,
        currentSet: prev.currentSet + 1,
        secondsRemaining: 45,
      } : null);
      return;
    }

    // Move to next exercise
    const nextIdx = activeWorkout.currentExerciseIndex + 1;
    if (nextIdx < activeWorkout.workout.exercises.length) {
      sounds.playGoChime();
      const nextEx = activeWorkout.workout.exercises[nextIdx];
      setActiveWorkout(prev => prev ? {
        ...prev,
        currentExerciseIndex: nextIdx,
        currentSet: 1,
        totalSetsForCurrent: nextEx.sets,
        isResting: false,
        secondsRemaining: 45,
      } : null);
    } else {
      finishWorkout();
    }
  };

  const previousExerciseOrSet = () => {
    if (!activeWorkout) return;
    if (activeWorkout.currentSet > 1) {
      setActiveWorkout(prev => prev ? {
        ...prev,
        currentSet: prev.currentSet - 1,
        isResting: false,
        secondsRemaining: 45,
      } : null);
    } else if (activeWorkout.currentExerciseIndex > 0) {
      const prevIdx = activeWorkout.currentExerciseIndex - 1;
      const prevEx = activeWorkout.workout.exercises[prevIdx];
      setActiveWorkout(prev => prev ? {
        ...prev,
        currentExerciseIndex: prevIdx,
        currentSet: prevEx.sets,
        totalSetsForCurrent: prevEx.sets,
        isResting: false,
        secondsRemaining: 45,
      } : null);
    }
  };

  const skipRest = () => {
    if (!activeWorkout || !activeWorkout.isResting) return;
    sounds.playGoChime();
    setActiveWorkout(prev => prev ? {
      ...prev,
      isResting: false,
      currentSet: prev.currentSet + 1,
      secondsRemaining: 45,
    } : null);
  };

  const finishWorkout = () => {
    if (!activeWorkout) return;
    sounds.playCompleteChime();

    // Trigger celebratory confetti
    try {
      confetti({
        particleCount: 120,
        spread: 100,
        origin: { y: 0.5 },
        colors: ['#FF5722', '#00FF66', '#FFFFFF', '#FFA000']
      });
    } catch {
      // ignore
    }

    const elapsedMinutes = Math.max(1, Math.round(activeWorkout.totalElapsedSeconds / 60));
    
    // Log to Calendar
    const todayStr = new Date().toISOString().split('T')[0];
    const newEntry: CalendarEntry = {
      id: `cal-${Date.now()}`,
      date: todayStr,
      workoutName: activeWorkout.workout.name,
      status: 'completed',
      durationMinutes: elapsedMinutes,
      notes: `Finished ${activeWorkout.workout.exercises.length} exercises. High intensity!`
    };
    setCalendar(prev => [newEntry, ...prev.filter(c => c.date !== todayStr)]);

    // Update Profile statistics
    setUserProfile(prev => ({
      ...prev,
      totalWorkouts: prev.totalWorkouts + 1,
      activeMinutes: prev.activeMinutes + elapsedMinutes,
      streakDays: prev.streakDays + 1,
      points: prev.points + 150
    }));

    setActiveWorkout(prev => prev ? { ...prev, completed: true } : null);
  };

  const exitWorkout = () => {
    setActiveWorkout(null);
    setCurrentView('dashboard');
  };

  const unreadNotificationCount = notifications.filter(n => !n.read).length;

  return (
    <FitnessContext.Provider value={{
      currentView,
      setCurrentView,
      selectedExerciseId,
      setSelectedExerciseId,
      openExerciseDetail,
      compareExerciseIds,
      openComparison,
      selectedCategoryFilter,
      setSelectedCategoryFilter,
      isSearchOpen,
      setIsSearchOpen,
      searchQuery,
      setSearchQuery,
      isNotificationOpen,
      setIsNotificationOpen,
      isAuthModalOpen,
      setIsAuthModalOpen,
      authMode,
      setAuthMode,
      exercises,
      workouts,
      userProfile,
      personalRecords,
      goals,
      calendar,
      notifications,
      unreadNotificationCount,
      carouselSlides,
      adminUsers,
      activityLogs,
      systemHealth,
      isAdminLoggedIn,
      adminRole,
      loginAdmin,
      logoutAdmin,
      toggleFavorite,
      toggleWorkoutFavorite,
      createGoal,
      toggleGoal,
      addPersonalRecord,
      markNotificationAsRead,
      clearAllNotifications,
      sendAnnouncement,
      addExercise,
      updateExercise,
      deleteExercise,
      addWorkout,
      updateWorkout,
      deleteWorkout,
      updateUserProfile,
      toggleUserStatus,
      updateCarouselSlide,
      addActivityLog,
      activeWorkout,
      startWorkout,
      pauseWorkout,
      resumeWorkout,
      nextExerciseOrSet,
      previousExerciseOrSet,
      skipRest,
      finishWorkout,
      exitWorkout,
    }}>
      {children}
    </FitnessContext.Provider>
  );
};

export const useFitness = () => {
  const context = useContext(FitnessContext);
  if (!context) {
    throw new Error('useFitness must be used within a FitnessProvider');
  }
  return context;
};
