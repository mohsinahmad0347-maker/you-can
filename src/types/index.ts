export type MuscleGroup = 
  | 'Chest' 
  | 'Back' 
  | 'Shoulders' 
  | 'Biceps' 
  | 'Triceps' 
  | 'Arms' 
  | 'Legs' 
  | 'Glutes' 
  | 'Core' 
  | 'Cardio' 
  | 'Full Body' 
  | 'Mobility' 
  | 'Stretching' 
  | 'Balance'
  | 'Traps'
  | 'Rotator Cuff'
  | 'Forearms'
  | 'Obliques'
  | 'Hip Flexors'
  | 'Upper Back';

export type EquipmentType = 
  | 'Bodyweight' 
  | 'Dumbbells' 
  | 'Barbell' 
  | 'Bench' 
  | 'Cable' 
  | 'Machine' 
  | 'Resistance Band' 
  | 'Kettlebell' 
  | 'Pull-up Bar' 
  | 'Mat';

export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export type LocationType = 'Home' | 'Gym' | 'Both';

export type ExerciseType = 'Strength' | 'Cardio' | 'Mobility' | 'Stretching' | 'Balance' | 'Conditioning';

export type FitnessGoal = 'General Fitness' | 'Strength' | 'Endurance' | 'Mobility' | 'Conditioning';

export interface Exercise {
  id: string;
  name: string;
  description: string;
  primaryMuscle: MuscleGroup;
  secondaryMuscles: MuscleGroup[];
  equipment: EquipmentType[];
  difficulty: DifficultyLevel;
  location: LocationType;
  type: ExerciseType;
  instructions: string[];
  commonMistakes: string[];
  safetyTips: string[];
  sets: number;
  reps: number | string;
  restSeconds: number;
  durationSeconds?: number;
  beginnerModification: string;
  advancedModification: string;
  homeAlternative: string;
  gymAlternative: string;
  biomechanicsKey: string; // Used by 3D Avatar (e.g., 'squat', 'pushup', 'bench_press', etc.)
  targetJoints?: string[];
  motionPath?: string;
  isFavorite?: boolean;
  published?: boolean;
  category?: string;
}

export interface WorkoutExerciseItem {
  exerciseId: string;
  exerciseName: string;
  sets: number;
  reps: number | string;
  restSeconds: number;
  notes?: string;
}

export interface WorkoutProgram {
  id: string;
  name: string;
  description: string;
  goal: FitnessGoal;
  difficulty: DifficultyLevel;
  location: LocationType;
  durationMinutes: number;
  exercises: WorkoutExerciseItem[];
  warmup: string[];
  cooldown: string[];
  featured?: boolean;
  category: string;
  isFavorite?: boolean;
  published?: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  experienceLevel: DifficultyLevel;
  preferredLocation: LocationType;
  goals: string[];
  availableEquipment: EquipmentType[];
  preferredDuration: number;
  totalWorkouts: number;
  streakDays: number;
  activeMinutes: number;
  points: number;
  bio?: string;
  fitnessGoal?: string;
  activityLevel?: string;
  gender?: string;
  age?: number;
  height?: number;
  weight?: number;
  goalWeight?: number;
  workoutsPerWeek?: number;
  equipment?: EquipmentType[];
}

export interface PersonalRecord {
  id: string;
  exerciseName: string;
  value: string;
  category: string;
  date: string;
  safetyTip: string;
  unit?: string;
}

export interface FitnessGoalItem {
  id: string;
  title: string;
  category: string;
  target: number;
  current: number;
  unit: string;
  deadline: string;
  completed: boolean;
  priority?: 'high' | 'medium' | 'low';
}

export interface CalendarEntry {
  id: string;
  date: string; // YYYY-MM-DD
  workoutName: string;
  status: 'completed' | 'planned' | 'rest' | 'missed';
  durationMinutes?: number;
  notes?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'announcement' | 'reminder' | 'milestone' | 'update';
  date: string;
  read: boolean;
  link?: string;
}

export interface CarouselSlide {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  ctaText: string;
  ctaAction: string;
  accent: string;
  active: boolean;
  order: number;
  /** Hero background image URL (optional — older saved slides fall back to CAROUSEL_IMAGES) */
  image?: string;
  /** Accessible description of the hero background image */
  imageAlt?: string;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  joinDate: string;
  status: 'active' | 'disabled';
  workoutsCompleted: number;
  lastActive: string;
  role: string;
  lastLogin?: string;
}

export interface ActivityLog {
  id: string;
  adminName: string;
  action: string;
  timestamp: string;
  status: 'Success' | 'Warning' | 'Pending';
  details: string;
}

export interface SystemHealthItem {
  name: string;
  service?: string;
  status: 'Operational' | 'Degraded' | 'Downtime' | 'healthy';
  latency: string;
  uptime: string;
  lastChecked: string;
  detail?: string;
}

export type AdminRole = 'Super Admin' | 'Content Admin' | 'Analytics Admin' | 'Support Admin';
