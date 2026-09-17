import type { 
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
  SystemHealthItem 
} from '../types';

export const INITIAL_EXERCISES: Exercise[] = [
  // CHEST
  {
    id: 'ex-bench-press',
    name: 'Barbell Bench Press',
    description: 'The premier compound barbell movement for building upper body pushing strength, pectorals, and anterior deltoids.',
    primaryMuscle: 'Chest',
    secondaryMuscles: ['Triceps', 'Shoulders'],
    equipment: ['Barbell', 'Bench'],
    difficulty: 'Intermediate',
    location: 'Gym',
    type: 'Strength',
    instructions: [
      'Lie flat on the bench with eyes positioned directly under the racked bar, feet planted firmly on the floor.',
      'Grip the barbell slightly wider than shoulder-width with hands wrapped securely and wrists straight.',
      'Unrack the bar, lower it smoothly to your mid-chest while tucking elbows at roughly a 45-degree angle.',
      'Press the bar explosively back upward along a slight arc until arms are extended, without unlocking shoulders.'
    ],
    commonMistakes: [
      'Bouncing the bar violently off the ribcage.',
      'Flaring elbows out at 90 degrees, stressing the shoulder rotator cuffs.',
      'Lifting hips and glutes off the bench during the press.'
    ],
    safetyTips: [
      'Always utilize safety pins or train with an experienced spotter when using heavy loads.',
      'Keep your wrists neutral and avoid resting the bar on fingertips.'
    ],
    sets: 4,
    reps: '8 - 10',
    restSeconds: 90,
    beginnerModification: 'Use light dumbbells or dumbbell floor press to learn the groove.',
    advancedModification: 'Add 2-second eccentric pauses at chest level before driving up.',
    homeAlternative: 'Standard Push-up or Deficit Push-up on books.',
    gymAlternative: 'Dumbbell Chest Press or Hammer Strength Chest Press.',
    biomechanicsKey: 'bench_press',
    targetJoints: ['Shoulders', 'Elbows', 'Wrists'],
    motionPath: 'Vertical arc over sternum',
    published: true,
    isFavorite: true,
  },
  {
    id: 'ex-pushup',
    name: 'Classic Push-up',
    description: 'The timeless bodyweight compound exercise building foundational chest, shoulder, and core stability.',
    primaryMuscle: 'Chest',
    secondaryMuscles: ['Triceps', 'Core', 'Shoulders'],
    equipment: ['Bodyweight'],
    difficulty: 'Beginner',
    location: 'Both',
    type: 'Strength',
    instructions: [
      'Place hands on the floor slightly wider than shoulder-width, fingers pointing forward.',
      'Extend legs back into a rigid plank position, engaging glutes and core to form a straight line from crown to heels.',
      'Lower chest toward the floor until elbows reach 90 degrees, keeping elbows angled at 45 degrees to torso.',
      'Drive through the palms to return to top plank position while maintaining spinal alignment.'
    ],
    commonMistakes: [
      'Sagging the lower back and dropping hips.',
      'Craning the neck downward ahead of the chest.',
      'Incomplete range of motion.'
    ],
    safetyTips: [
      'Keep neck neutral by looking 6 inches ahead of your hands.',
      'Maintain full abdominal bracing throughout every repetition.'
    ],
    sets: 3,
    reps: '12 - 15',
    restSeconds: 60,
    beginnerModification: 'Knee Push-ups or Hands-Elevated Incline Push-ups on a bench.',
    advancedModification: 'Feet-Elevated Decline Push-ups or Clapping Push-ups.',
    homeAlternative: 'Floor Push-up with hands on parallettes or books.',
    gymAlternative: 'Machine Chest Press.',
    biomechanicsKey: 'pushup',
    targetJoints: ['Shoulders', 'Elbows', 'Core'],
    motionPath: 'Linear diagonal press',
    published: true,
    isFavorite: true,
  },
  {
    id: 'ex-incline-db-press',
    name: 'Incline Dumbbell Press',
    description: 'Targets the clavicular head (upper chest) and anterior deltoids with free range of motion.',
    primaryMuscle: 'Chest',
    secondaryMuscles: ['Shoulders', 'Triceps'],
    equipment: ['Dumbbells', 'Bench'],
    difficulty: 'Intermediate',
    location: 'Gym',
    type: 'Strength',
    instructions: [
      'Set an adjustable bench to a 30 to 45-degree angle and sit with dumbbells resting on thighs.',
      'Kick the dumbbells up to shoulder level as you lean back onto the bench.',
      'Press dumbbells upward together in a controlled arc until arms are extended overhead.',
      'Lower slowly back to upper chest level, feeling a gentle stretch in the clavicular fibers.'
    ],
    commonMistakes: [
      'Setting bench angle too high (above 45 degrees), shifting load onto front deltoids.',
      'Colliding dumbbells loudly at the peak.'
    ],
    safetyTips: [
      'Never drop heavy dumbbells carelessly; bring them back to knees when finished.'
    ],
    sets: 3,
    reps: '10 - 12',
    restSeconds: 75,
    beginnerModification: 'Incline Smith machine press or lighter dumbbells.',
    advancedModification: 'Perform unilateral alternating presses.',
    homeAlternative: 'Decline Push-up (feet on couch/chair).',
    gymAlternative: 'Incline Barbell Bench Press.',
    biomechanicsKey: 'incline_press',
    targetJoints: ['Shoulders', 'Elbows'],
    published: true,
  },
  {
    id: 'ex-cable-fly',
    name: 'Cable Chest Fly',
    description: 'Provides constant tension across the entire pectoral contraction arc for muscle hypertrophy.',
    primaryMuscle: 'Chest',
    secondaryMuscles: ['Shoulders'],
    equipment: ['Cable'],
    difficulty: 'Intermediate',
    location: 'Gym',
    type: 'Strength',
    instructions: [
      'Set cable pulleys at chest height, grab handles, and take a staggered step forward.',
      'Keep a slight bend in the elbows and maintain a steady, proud chest posture.',
      'Bring hands together in a hugging motion, squeezing the chest at peak contraction.',
      'Slowly open arms wide until you feel a deep stretch in the pectorals.'
    ],
    commonMistakes: [
      'Turning the movement into an arm press instead of an arcing fly.',
      'Letting the weight stack pull shoulders backward violently.'
    ],
    safetyTips: [
      'Keep shoulder blades pinned back and down throughout the movement.'
    ],
    sets: 3,
    reps: '12 - 15',
    restSeconds: 60,
    beginnerModification: 'Pec Deck Machine.',
    advancedModification: 'Add a 3-second isometric squeeze at center.',
    homeAlternative: 'Resistance Band Crossover Fly anchored to door.',
    gymAlternative: 'Dumbbell Fly on Flat Bench.',
    biomechanicsKey: 'cable_fly',
    targetJoints: ['Shoulders'],
    published: true,
  },

  // BACK
  {
    id: 'ex-pullup',
    name: 'Wide-Grip Pull-up',
    description: 'The gold standard bodyweight vertical pulling movement building a wide V-taper back and grip strength.',
    primaryMuscle: 'Back',
    secondaryMuscles: ['Biceps', 'Shoulders', 'Core'],
    equipment: ['Pull-up Bar'],
    difficulty: 'Advanced',
    location: 'Both',
    type: 'Strength',
    instructions: [
      'Grip the pull-up bar with an overhand grip slightly wider than shoulder-width.',
      'Hang with arms fully extended into an active dead-hang, engaging the scapulae.',
      'Drive elbows down toward hips while pulling chest up toward the bar until chin clears the bar.',
      'Lower yourself back down with complete control to a full stretch.'
    ],
    commonMistakes: [
      'Kipping or swinging legs violently to build momentum.',
      'Failing to reach full extension at the bottom.'
    ],
    safetyTips: [
      'Do not jump down carelessly from the bar; step down on a platform to protect knees.'
    ],
    sets: 4,
    reps: '6 - 8',
    restSeconds: 90,
    beginnerModification: 'Resistance Band Assisted Pull-ups or Lat Pulldown.',
    advancedModification: 'Weighted Pull-ups with dipping belt.',
    homeAlternative: 'Inverted Row under a sturdy table or doorframe pull-up bar.',
    gymAlternative: 'Lat Pulldown with Wide Grip.',
    biomechanicsKey: 'pullup',
    targetJoints: ['Shoulders', 'Elbows', 'Scapulae'],
    published: true,
    isFavorite: true,
  },
  {
    id: 'ex-barbell-row',
    name: 'Barbell Bent-Over Row',
    description: 'Fundamental compound pulling movement for building back thickness and strength.',
    primaryMuscle: 'Back',
    secondaryMuscles: ['Biceps', 'Shoulders', 'Core'],
    equipment: ['Barbell'],
    difficulty: 'Intermediate',
    location: 'Gym',
    type: 'Strength',
    instructions: [
      'Stand with feet hip-width apart, grip barbell with overhand grip slightly wider than shoulders.',
      'Hinge at hips while maintaining neutral spine, lowering torso until nearly parallel to floor.',
      'Pull barbell toward lower ribcage by driving elbows back and squeezing shoulder blades.',
      'Lower barbell with control back to starting position.'
    ],
    commonMistakes: [
      'Rounding the lower back excessively.',
      'Using momentum to swing the weight up.',
      'Pulling too high toward the neck instead of ribcage.'
    ],
    safetyTips: [
      'Keep core braced throughout the movement.',
      'Start with lighter weight to master the hinge pattern.'
    ],
    sets: 4,
    reps: '8 - 10',
    restSeconds: 90,
    beginnerModification: 'Dumbbell Rows or Chest-Supported Machine Rows.',
    advancedModification: 'Add pause at peak contraction or use underhand grip.',
    homeAlternative: 'Resistance Band Rows anchored to door.',
    gymAlternative: 'Seated Cable Row or T-Bar Row.',
    biomechanicsKey: 'barbell_row',
    targetJoints: ['Shoulders', 'Elbows', 'Hips'],
    published: true,
  },
  {
    id: 'ex-lat-pulldown',
    name: 'Lat Pulldown',
    description: 'Machine-based vertical pull targeting the lats for back width development.',
    primaryMuscle: 'Back',
    secondaryMuscles: ['Biceps', 'Shoulders'],
    equipment: ['Cable', 'Machine'],
    difficulty: 'Beginner',
    location: 'Gym',
    type: 'Strength',
    instructions: [
      'Sit at lat pulldown machine and grip bar with wide overhand grip.',
      'Lean back slightly and engage lats by pulling shoulder blades down.',
      'Pull bar down to upper chest level, driving elbows toward sides.',
      'Control the weight back up to full arm extension.'
    ],
    commonMistakes: [
      'Leaning back excessively and using body English.',
      'Pulling bar behind the neck (unsafe for shoulder joints).',
      'Not fully extending arms at the top.'
    ],
    safetyTips: [
      'Always pull to the front of your chest, never behind the neck.',
      'Control the negative phase to protect shoulders.'
    ],
    sets: 3,
    reps: '10 - 12',
    restSeconds: 60,
    beginnerModification: 'Use lighter weight and focus on form.',
    advancedModification: 'Add 2-second eccentric or use different grip variations.',
    homeAlternative: 'Resistance Band Pulldowns anchored high.',
    gymAlternative: 'Assisted Pull-up Machine.',
    biomechanicsKey: 'lat_pulldown',
    targetJoints: ['Shoulders', 'Elbows'],
    published: true,
  },
  {
    id: 'ex-deadlift',
    name: 'Conventional Deadlift',
    description: 'The king of compound exercises, building total body strength and posterior chain power.',
    primaryMuscle: 'Back',
    secondaryMuscles: ['Legs', 'Glutes', 'Core'],
    equipment: ['Barbell'],
    difficulty: 'Advanced',
    location: 'Gym',
    type: 'Strength',
    instructions: [
      'Stand with barbell over mid-foot, feet hip-width apart, toes slightly pointed out.',
      'Hinge at hips and grip bar just outside knees with mixed or double overhand grip.',
      'Drive through heels, extend hips and knees simultaneously while keeping bar close to body.',
      'Lock out at top with glutes squeezed, then lower with control.'
    ],
    commonMistakes: [
      'Rounding the lower back during the pull.',
      'Starting with hips too high (squat-like) or too low.',
      'Letting the bar drift away from the body.'
    ],
    safetyTips: [
      'Maintain neutral spine throughout the entire movement.',
      'Use lifting belt for heavy sets if needed.'
    ],
    sets: 4,
    reps: '5 - 6',
    restSeconds: 120,
    beginnerModification: 'Romanian Deadlifts with lighter weight or Trap Bar Deadlift.',
    advancedModification: 'Deficit Deadlifts or Pause Deadlifts.',
    homeAlternative: 'Kettlebell Swing or Dumbbell Deadlift.',
    gymAlternative: 'Trap Bar Deadlift or Rack Pulls.',
    biomechanicsKey: 'deadlift',
    targetJoints: ['Hips', 'Knees', 'Shoulders'],
    published: true,
    isFavorite: true,
  },

  // SHOULDERS
  {
    id: 'ex-ohp',
    name: 'Overhead Press',
    description: 'Fundamental vertical pressing movement building shoulder strength and stability.',
    primaryMuscle: 'Shoulders',
    secondaryMuscles: ['Triceps', 'Core'],
    equipment: ['Barbell'],
    difficulty: 'Intermediate',
    location: 'Gym',
    type: 'Strength',
    instructions: [
      'Stand with barbell resting on front shoulders, grip slightly wider than shoulders.',
      'Brace core and glutes, press bar directly overhead until arms are fully extended.',
      'Keep bar path vertical over elbows and mid-foot.',
      'Lower bar with control back to starting position on shoulders.'
    ],
    commonMistakes: [
      'Arching the lower back excessively at lockout.',
      'Pressing bar in front of the body instead of vertical path.',
      'Not locking out fully at the top.'
    ],
    safetyTips: [
      'Keep ribs down and core tight throughout.',
      'Avoid hyperextending the spine at the top.'
    ],
    sets: 4,
    reps: '6 - 8',
    restSeconds: 90,
    beginnerModification: 'Seated Dumbbell Press or Machine Press.',
    advancedModification: 'Push Press or Behind-the-Neck Press (for advanced lifters only).',
    homeAlternative: 'Dumbbell Overhead Press or Pike Push-up.',
    gymAlternative: 'Seated Barbell Press or Arnold Press.',
    biomechanicsKey: 'overhead_press',
    targetJoints: ['Shoulders', 'Elbows'],
    published: true,
    isFavorite: true,
  },
  {
    id: 'ex-lateral-raise',
    name: 'Dumbbell Lateral Raise',
    description: 'Isolation exercise targeting the medial deltoid for shoulder width.',
    primaryMuscle: 'Shoulders',
    secondaryMuscles: ['Traps'],
    equipment: ['Dumbbells'],
    difficulty: 'Beginner',
    location: 'Both',
    type: 'Strength',
    instructions: [
      'Stand with dumbbells at sides, slight bend in elbows.',
      'Raise arms out to sides until parallel with floor.',
      'Keep palms facing down or slightly forward.',
      'Lower with control back to starting position.'
    ],
    commonMistakes: [
      'Using momentum and swinging the weight up.',
      'Raising arms too high (above shoulder level).',
      'Flaring elbows instead of keeping slight bend.'
    ],
    safetyTips: [
      'Use lighter weights and focus on controlled movement.',
      'Keep shoulders down away from ears.'
    ],
    sets: 3,
    reps: '12 - 15',
    restSeconds: 45,
    beginnerModification: 'Use lighter dumbbells or resistance bands.',
    advancedModification: 'Add pause at top or perform drop sets.',
    homeAlternative: 'Resistance Band Lateral Raises.',
    gymAlternative: 'Cable Lateral Raises or Machine Lateral Raise.',
    biomechanicsKey: 'lateral_raise',
    targetJoints: ['Shoulders'],
    published: true,
  },
  {
    id: 'ex-face-pulls',
    name: 'Cable Face Pull',
    description: 'Excellent exercise for rear delt development and shoulder health.',
    primaryMuscle: 'Shoulders',
    secondaryMuscles: ['Traps', 'Rotator Cuff'],
    equipment: ['Cable'],
    difficulty: 'Beginner',
    location: 'Gym',
    type: 'Strength',
    instructions: [
      'Set cable pulley at face height, attach rope attachment.',
      'Grip rope with neutral grip, step back and assume athletic stance.',
      'Pull rope toward face, spreading hands apart at end.',
      'Squeeze rear delts and upper back at peak contraction.',
      'Return with control to starting position.'
    ],
    commonMistakes: [
      'Using too much weight and relying on momentum.',
      'Not spreading the rope at the end.',
      'Pulling too far behind the head.'
    ],
    safetyTips: [
      'Focus on the squeeze rather than heavy weight.',
      'Keep shoulders down throughout the movement.'
    ],
    sets: 3,
    reps: '15 - 20',
    restSeconds: 45,
    beginnerModification: 'Lighter resistance band face pulls.',
    advancedModification: 'Add 3-second hold at peak contraction.',
    homeAlternative: 'Resistance Band Face Pulls anchored high.',
    gymAlternative: 'Reverse Pec Deck or Bent-Over Rear Delt Fly.',
    biomechanicsKey: 'face_pull',
    targetJoints: ['Shoulders'],
    published: true,
  },

  // ARMS
  {
    id: 'ex-bicep-curl',
    name: 'Barbell Bicep Curl',
    description: 'Classic arm-building exercise targeting the biceps brachii.',
    primaryMuscle: 'Biceps',
    secondaryMuscles: ['Forearms'],
    equipment: ['Barbell'],
    difficulty: 'Beginner',
    location: 'Gym',
    type: 'Strength',
    instructions: [
      'Stand with barbell in hands, shoulder-width grip, arms fully extended.',
      'Keep elbows pinned to sides throughout the movement.',
      'Curl barbell toward shoulders by flexing elbows.',
      'Squeeze biceps at top, then lower with control.'
    ],
    commonMistakes: [
      'Swinging the body to generate momentum.',
      'Moving elbows forward during the curl.',
      'Not fully extending arms at the bottom.'
    ],
    safetyTips: [
      'Keep core tight and avoid excessive back arching.',
      'Focus on the eccentric (lowering) phase.'
    ],
    sets: 3,
    reps: '10 - 12',
    restSeconds: 60,
    beginnerModification: 'Dumbbell Curls or EZ Bar Curls.',
    advancedModification: '21s or Cheat Curls with controlled form.',
    homeAlternative: 'Dumbbell Curls or Resistance Band Curls.',
    gymAlternative: 'Preacher Curls or Machine Curls.',
    biomechanicsKey: 'bicep_curl',
    targetJoints: ['Elbows'],
    published: true,
    isFavorite: true,
  },
  {
    id: 'ex-tricep-pushdown',
    name: 'Cable Tricep Pushdown',
    description: 'Isolation exercise for triceps development.',
    primaryMuscle: 'Triceps',
    secondaryMuscles: ['Forearms'],
    equipment: ['Cable'],
    difficulty: 'Beginner',
    location: 'Gym',
    type: 'Strength',
    instructions: [
      'Stand at cable machine with rope or straight bar attachment.',
      'Grip with overhand grip, elbows pinned to sides.',
      'Push weight down by extending elbows.',
      'Squeeze triceps at bottom, return with control.'
    ],
    commonMistakes: [
      'Flaring elbows out during the movement.',
      'Using body weight and leaning forward.',
      'Not fully extending elbows at the bottom.'
    ],
    safetyTips: [
      'Keep elbows stationary throughout.',
      'Control the weight on the way up.'
    ],
    sets: 3,
    reps: '12 - 15',
    restSeconds: 45,
    beginnerModification: 'Lighter resistance band pushdowns.',
    advancedModification: 'Add pause at bottom or use different attachments.',
    homeAlternative: 'Resistance Band Pushdowns.',
    gymAlternative: 'Overhead Cable Extension or Skull Crushers.',
    biomechanicsKey: 'tricep_pushdown',
    targetJoints: ['Elbows'],
    published: true,
  },
  {
    id: 'ex-hammer-curl',
    name: 'Dumbbell Hammer Curl',
    description: 'Targets brachialis and brachioradialis for arm thickness.',
    primaryMuscle: 'Biceps',
    secondaryMuscles: ['Forearms'],
    equipment: ['Dumbbells'],
    difficulty: 'Beginner',
    location: 'Both',
    type: 'Strength',
    instructions: [
      'Stand with dumbbells at sides, neutral grip (palms facing body).',
      'Keep elbows pinned to sides.',
      'Curl dumbbells toward shoulders, maintaining neutral grip.',
      'Squeeze at top, lower with control.'
    ],
    commonMistakes: [
      'Rotating palms during the curl.',
      'Swinging the weight up.',
      'Not fully extending arms at bottom.'
    ],
    safetyTips: [
      'Focus on the squeeze at the top.',
      'Keep wrists neutral throughout.'
    ],
    sets: 3,
    reps: '10 - 12',
    restSeconds: 60,
    beginnerModification: 'Lighter dumbbells or resistance bands.',
    advancedModification: 'Add pause at top or perform alternating curls.',
    homeAlternative: 'Resistance Band Hammer Curls.',
    gymAlternative: 'Cable Hammer Curls.',
    biomechanicsKey: 'hammer_curl',
    targetJoints: ['Elbows'],
    published: true,
  },

  // LEGS
  {
    id: 'ex-squat',
    name: 'Barbell Back Squat',
    description: 'The king of lower body exercises, building leg strength and mass.',
    primaryMuscle: 'Legs',
    secondaryMuscles: ['Glutes', 'Core'],
    equipment: ['Barbell'],
    difficulty: 'Advanced',
    location: 'Gym',
    type: 'Strength',
    instructions: [
      'Set barbell on traps or low bar position, step out of rack.',
      'Set feet shoulder-width apart, toes slightly pointed out.',
      'Initiate squat by sitting back and down, keeping knees tracking over toes.',
      'Descend until thighs are at least parallel to floor.',
      'Drive through heels to return to standing position.'
    ],
    commonMistakes: [
      'Knees caving inward during the descent.',
      'Rounding the lower back.',
      'Not reaching proper depth (parallel or below).'
    ],
    safetyTips: [
      'Always use safety pins in the squat rack.',
      'Start with bodyweight squats to master the pattern.'
    ],
    sets: 4,
    reps: '6 - 8',
    restSeconds: 120,
    beginnerModification: 'Goblet Squat or Bodyweight Squat.',
    advancedModification: 'Pause Squats or Box Squats.',
    homeAlternative: 'Goblet Squat with dumbbell or Bodyweight Squat.',
    gymAlternative: 'Leg Press or Hack Squat.',
    biomechanicsKey: 'squat',
    targetJoints: ['Hips', 'Knees', 'Ankles'],
    published: true,
    isFavorite: true,
  },
  {
    id: 'ex-leg-press',
    name: 'Leg Press',
    description: 'Machine-based compound leg movement for building lower body strength.',
    primaryMuscle: 'Legs',
    secondaryMuscles: ['Glutes'],
    equipment: ['Machine'],
    difficulty: 'Beginner',
    location: 'Gym',
    type: 'Strength',
    instructions: [
      'Sit in leg press machine, feet shoulder-width apart on platform.',
      'Release safety handles and lower weight by bending knees.',
      'Descend until thighs are parallel to platform or slightly below.',
      'Press through heels to extend legs, but do not lock knees completely.'
    ],
    commonMistakes: [
      'Locking knees at the top of the movement.',
      'Placing feet too high or too low on platform.',
      'Using too much weight and sacrificing form.'
    ],
    safetyTips: [
      'Never lock your knees at extension.',
      'Keep lower back pressed against the seat.'
    ],
    sets: 3,
    reps: '10 - 12',
    restSeconds: 90,
    beginnerModification: 'Lighter weight, focus on form.',
    advancedModification: 'Single-leg press or add pause at bottom.',
    homeAlternative: 'Bodyweight Squat or Goblet Squat.',
    gymAlternative: 'Hack Squat or Barbell Squat.',
    biomechanicsKey: 'leg_press',
    targetJoints: ['Hips', 'Knees'],
    published: true,
  },
  {
    id: 'ex-lunge',
    name: 'Walking Lunge',
    description: 'Unilateral leg exercise building strength, balance, and coordination.',
    primaryMuscle: 'Legs',
    secondaryMuscles: ['Glutes', 'Core'],
    equipment: ['Bodyweight'],
    difficulty: 'Intermediate',
    location: 'Both',
    type: 'Strength',
    instructions: [
      'Stand with feet hip-width apart, hands on hips or holding weights.',
      'Step forward with one leg, lowering hips until both knees are at 90 degrees.',
      'Front knee should not extend past toes, back knee hovering above ground.',
      'Push through front heel to step forward into next lunge with opposite leg.'
    ],
    commonMistakes: [
      'Front knee extending past toes.',
      'Not reaching 90-degree knee bend.',
      'Taking too short or too long steps.'
    ],
    safetyTips: [
      'Keep torso upright throughout the movement.',
      'Start with bodyweight before adding weights.'
    ],
    sets: 3,
    reps: '10 per leg',
    restSeconds: 60,
    beginnerModification: 'Stationary Lunges or Reverse Lunges.',
    advancedModification: 'Weighted Lunges or Jump Lunges.',
    homeAlternative: 'Bodyweight Lunges or Dumbbell Lunges.',
    gymAlternative: 'Barbell Lunges or Split Squats.',
    biomechanicsKey: 'lunge',
    targetJoints: ['Hips', 'Knees'],
    published: true,
  },
  {
    id: 'ex-leg-curl',
    name: 'Lying Leg Curl',
    description: 'Isolation exercise targeting hamstrings for posterior leg development.',
    primaryMuscle: 'Legs',
    secondaryMuscles: ['Glutes'],
    equipment: ['Machine'],
    difficulty: 'Beginner',
    location: 'Gym',
    type: 'Strength',
    instructions: [
      'Lie face down on leg curl machine, pad positioned above Achilles tendon.',
      'Grip handles for stability.',
      'Curl weight up by flexing knees.',
      'Squeeze hamstrings at top, lower with control.'
    ],
    commonMistakes: [
      'Using momentum and swinging the weight up.',
      'Lifting hips off the bench.',
      'Not fully extending legs at the bottom.'
    ],
    safetyTips: [
      'Keep hips pressed into the bench.',
      'Focus on the squeeze at the top.'
    ],
    sets: 3,
    reps: '12 - 15',
    restSeconds: 60,
    beginnerModification: 'Lighter weight, focus on form.',
    advancedModification: 'Single-leg curls or add pause at top.',
    homeAlternative: 'Resistance Band Leg Curls or Glute Bridges.',
    gymAlternative: 'Seated Leg Curl or Romanian Deadlift.',
    biomechanicsKey: 'leg_curl',
    targetJoints: ['Knees'],
    published: true,
  },

  // CORE
  {
    id: 'ex-plank',
    name: 'Forearm Plank',
    description: 'Fundamental isometric core exercise building stability and endurance.',
    primaryMuscle: 'Core',
    secondaryMuscles: ['Shoulders', 'Back'],
    equipment: ['Bodyweight'],
    difficulty: 'Beginner',
    location: 'Both',
    type: 'Strength',
    instructions: [
      'Place forearms on ground, elbows under shoulders.',
      'Extend legs back, toes on ground, body in straight line.',
      'Engage core, glutes, and quads to maintain position.',
      'Hold without letting hips sag or pike up.'
    ],
    commonMistakes: [
      'Sagging hips toward the ground.',
      'Piking hips too high.',
      'Holding breath instead of breathing steadily.'
    ],
    safetyTips: [
      'Keep neck neutral, looking at the ground.',
      'Focus on quality over duration.'
    ],
    sets: 3,
    reps: '30 - 60 seconds',
    restSeconds: 45,
    beginnerModification: 'Knee Plank or Elevated Plank on bench.',
    advancedModification: 'Weighted Plank or Plank with shoulder taps.',
    homeAlternative: 'Standard Plank on floor.',
    gymAlternative: 'Ab Wheel Rollout or Hanging Leg Raise.',
    biomechanicsKey: 'plank',
    targetJoints: ['Core', 'Shoulders'],
    published: true,
    isFavorite: true,
  },
  {
    id: 'ex-crunch',
    name: 'Basic Crunch',
    description: 'Classic ab exercise targeting the rectus abdominis.',
    primaryMuscle: 'Core',
    secondaryMuscles: ['Obliques'],
    equipment: ['Mat'],
    difficulty: 'Beginner',
    location: 'Both',
    type: 'Strength',
    instructions: [
      'Lie on back, knees bent, feet flat on floor.',
      'Place hands behind head or across chest.',
      'Contract abs to lift shoulder blades off ground.',
      'Lower with control back to starting position.'
    ],
    commonMistakes: [
      'Pulling on neck with hands.',
      'Using momentum instead of ab contraction.',
      'Not fully controlling the eccentric phase.'
    ],
    safetyTips: [
      'Keep elbows wide and avoid pulling head.',
      'Focus on squeezing abs at the top.'
    ],
    sets: 3,
    reps: '15 - 20',
    restSeconds: 30,
    beginnerModification: 'Smaller crunch range of motion.',
    advancedModification: 'Weighted crunches or cable crunches.',
    homeAlternative: 'Standard crunch on mat.',
    gymAlternative: 'Cable Crunch or Ab Machine.',
    biomechanicsKey: 'crunch',
    targetJoints: ['Spine'],
    published: true,
  },
  {
    id: 'ex-russian-twist',
    name: 'Russian Twist',
    description: 'Rotational core exercise targeting obliques.',
    primaryMuscle: 'Core',
    secondaryMuscles: ['Obliques', 'Hip Flexors'],
    equipment: ['Bodyweight'],
    difficulty: 'Intermediate',
    location: 'Both',
    type: 'Strength',
    instructions: [
      'Sit on ground, knees bent, feet slightly off floor.',
      'Lean back slightly, engage core.',
      'Clasp hands together in front of chest.',
      'Rotate torso side to side, touching ground on each side.'
    ],
    commonMistakes: [
      'Moving arms instead of rotating torso.',
      'Leaning too far back.',
      'Moving too fast without control.'
    ],
    safetyTips: [
      'Keep movement slow and controlled.',
      'Focus on the rotation, not the arm swing.'
    ],
    sets: 3,
    reps: '20 total',
    restSeconds: 45,
    beginnerModification: 'Keep feet on ground for stability.',
    advancedModification: 'Hold weight or medicine ball.',
    homeAlternative: 'Bodyweight Russian Twist.',
    gymAlternative: 'Cable Russian Twist or Machine Oblique Twist.',
    biomechanicsKey: 'russian_twist',
    targetJoints: ['Spine', 'Hips'],
    published: true,
  },

  // CARDIO
  {
    id: 'ex-burpee',
    name: 'Burpee',
    description: 'High-intensity full-body cardio exercise.',
    primaryMuscle: 'Cardio',
    secondaryMuscles: ['Legs', 'Chest', 'Core'],
    equipment: ['Bodyweight'],
    difficulty: 'Intermediate',
    location: 'Both',
    type: 'Cardio',
    instructions: [
      'Start standing, then drop into squat position.',
      'Place hands on ground, jump feet back into plank position.',
      'Perform a push-up (optional).',
      'Jump feet back to squat position.',
      'Explosively jump up with arms overhead.'
    ],
    commonMistakes: [
      'Not fully extending hips at the top.',
      'Sacrificing form for speed.',
      'Landing with poor mechanics on jumps.'
    ],
    safetyTips: [
      'Land softly with bent knees.',
      'Maintain core tightness throughout.'
    ],
    sets: 3,
    reps: '10 - 15',
    restSeconds: 60,
    beginnerModification: 'Step back instead of jump, remove push-up.',
    advancedModification: 'Add push-up or jump over object.',
    homeAlternative: 'Standard Burpee.',
    gymAlternative: 'Battle Ropes or Rowing Machine.',
    biomechanicsKey: 'burpee',
    targetJoints: ['Full Body'],
    published: true,
  },
  {
    id: 'ex-jumping-jacks',
    name: 'Jumping Jacks',
    description: 'Classic cardio warm-up and conditioning exercise.',
    primaryMuscle: 'Cardio',
    secondaryMuscles: ['Legs', 'Shoulders'],
    equipment: ['Bodyweight'],
    difficulty: 'Beginner',
    location: 'Both',
    type: 'Cardio',
    instructions: [
      'Stand with feet together, arms at sides.',
      'Jump feet apart while raising arms overhead.',
      'Jump back to starting position.',
      'Maintain steady rhythm.'
    ],
    commonMistakes: [
      'Not fully extending arms overhead.',
      'Landing with stiff knees.',
      'Moving too slowly for cardio benefit.'
    ],
    safetyTips: [
      'Land softly with bent knees.',
      'Keep core engaged throughout.'
    ],
    sets: 3,
    reps: '30 - 60 seconds',
    restSeconds: 30,
    beginnerModification: 'Step jacks instead of jumping.',
    advancedModification: 'Add squat to each jack.',
    homeAlternative: 'Standard Jumping Jacks.',
    gymAlternative: 'Box Jumps or Skier Jumps.',
    biomechanicsKey: 'jumping_jacks',
    targetJoints: ['Full Body'],
    published: true,
  },
  {
    id: 'ex-mountain-climber',
    name: 'Mountain Climber',
    description: 'Dynamic core and cardio exercise.',
    primaryMuscle: 'Cardio',
    secondaryMuscles: ['Core', 'Legs', 'Shoulders'],
    equipment: ['Bodyweight'],
    difficulty: 'Intermediate',
    location: 'Both',
    type: 'Cardio',
    instructions: [
      'Start in high plank position.',
      'Drive one knee toward chest, then quickly switch.',
      'Alternate knees rapidly while maintaining plank position.',
      'Keep hips low and core engaged.'
    ],
    commonMistakes: [
      'Hips piking up too high.',
      'Not driving knees high enough.',
      'Sacrificing plank form for speed.'
    ],
    safetyTips: [
      'Keep shoulders directly over hands.',
      'Maintain neutral spine throughout.'
    ],
    sets: 3,
    reps: '30 - 45 seconds',
    restSeconds: 30,
    beginnerModification: 'Slower pace, step instead of jump.',
    advancedModification: 'Add push-up between climbers or cross knees.',
    homeAlternative: 'Standard Mountain Climbers.',
    gymAlternative: 'Battle Ropes or Sled Push.',
    biomechanicsKey: 'mountain_climber',
    targetJoints: ['Full Body'],
    published: true,
  },

  // MOBILITY
  {
    id: 'ex-cat-cow',
    name: 'Cat-Cow Stretch',
    description: 'Spinal mobility exercise improving back flexibility.',
    primaryMuscle: 'Mobility',
    secondaryMuscles: ['Back', 'Core'],
    equipment: ['Mat'],
    difficulty: 'Beginner',
    location: 'Both',
    type: 'Mobility',
    instructions: [
      'Start on hands and knees, table position.',
      'Arch back and look up (cow position).',
      'Round spine and tuck chin (cat position).',
      'Alternate slowly between positions.'
    ],
    commonMistakes: [
      'Moving too quickly through the range.',
      'Not fully extending each position.',
      'Holding breath during movement.'
    ],
    safetyTips: [
      'Move slowly and with control.',
      'Breathe deeply throughout the movement.'
    ],
    sets: 2,
    reps: '10 - 12',
    restSeconds: 30,
    beginnerModification: 'Smaller range of motion.',
    advancedModification: 'Add holds at each position.',
    homeAlternative: 'Standard Cat-Cow on mat.',
    gymAlternative: 'Foam Rolling or Assisted Stretching.',
    biomechanicsKey: 'cat_cow',
    targetJoints: ['Spine'],
    published: true,
  },
  {
    id: 'ex-hip-flexor',
    name: 'Hip Flexor Stretch',
    description: 'Stretches hip flexors and improves hip mobility.',
    primaryMuscle: 'Mobility',
    secondaryMuscles: ['Legs', 'Glutes'],
    equipment: ['Mat'],
    difficulty: 'Beginner',
    location: 'Both',
    type: 'Stretching',
    instructions: [
      'Kneel on one knee, other foot forward.',
      'Keep torso upright, engage core.',
      'Gently push hips forward until you feel stretch in front hip.',
      'Hold position, then switch sides.'
    ],
    commonMistakes: [
      'Arching lower back excessively.',
      'Leaning torso forward instead of driving hips.',
      'Not engaging glutes.'
    ],
    safetyTips: [
      'Keep movement gentle, never force the stretch.',
      'Engage glutes to protect lower back.'
    ],
    sets: 2,
    reps: '30 seconds per side',
    restSeconds: 15,
    beginnerModification: 'Smaller range of motion.',
    advancedModification: 'Add arm reach overhead.',
    homeAlternative: 'Standard Hip Flexor Stretch.',
    gymAlternative: 'Assisted PNF Stretching.',
    biomechanicsKey: 'hip_flexor',
    targetJoints: ['Hips'],
    published: true,
  },
  {
    id: 'ex-shoulder-roll',
    name: 'Shoulder Roll',
    description: 'Simple shoulder mobility exercise.',
    primaryMuscle: 'Mobility',
    secondaryMuscles: ['Shoulders', 'Upper Back'],
    equipment: ['Bodyweight'],
    difficulty: 'Beginner',
    location: 'Both',
    type: 'Mobility',
    instructions: [
      'Stand with arms at sides.',
      'Roll shoulders up toward ears.',
      'Roll shoulders back and down.',
      'Reverse direction and repeat.'
    ],
    commonMistakes: [
      'Shrugging excessively.',
      'Moving too quickly.',
      'Not completing full circles.'
    ],
    safetyTips: [
      'Keep movement smooth and controlled.',
      'Avoid excessive shrugging.'
    ],
    sets: 2,
    reps: '10 - 12 each direction',
    restSeconds: 15,
    beginnerModification: 'Smaller range of motion.',
    advancedModification: 'Add arm circles.',
    homeAlternative: 'Standard Shoulder Rolls.',
    gymAlternative: 'Band Pull-aparts or Shoulder Dislocations.',
    biomechanicsKey: 'shoulder_roll',
    targetJoints: ['Shoulders'],
    published: true,
  },
];

export const INITIAL_WORKOUTS: WorkoutProgram[] = [
  {
    id: 'wo-full-body-30',
    name: '30-Minute Total Body Conditioning',
    description: 'A balanced, high-efficiency workout targeting every major muscle group for optimal strength and metabolic burn.',
    goal: 'General Fitness',
    difficulty: 'Beginner',
    location: 'Both',
    durationMinutes: 30,
    category: 'Full Body',
    featured: true,
    warmup: [
      'Arm Circles & Shoulder Rolls — 1 min',
      'Dynamic Air Squats — 1 min',
      'Cat-Cow Mobility — 1 min',
      'Light Jumping Jacks — 2 min'
    ],
    cooldown: [
      "World's Greatest Stretch — 2 min",
      'Child’s Pose & Deep Breathing — 3 min'
    ],
    exercises: [
      { exerciseId: 'ex-bodyweight-squat', exerciseName: 'Bodyweight Air Squat', sets: 3, reps: '12 - 15', restSeconds: 45 },
      { exerciseId: 'ex-pushup', exerciseName: 'Classic Push-up', sets: 3, reps: '10 - 12', restSeconds: 45 },
      { exerciseId: 'ex-lunges', exerciseName: 'Walking Dumbbell Lunges', sets: 3, reps: '10 per leg', restSeconds: 60 },
      { exerciseId: 'ex-plank', exerciseName: 'Isometric Forearm Plank', sets: 3, reps: '45 sec', restSeconds: 45 },
      { exerciseId: 'ex-mountain-climbers', exerciseName: 'Mountain Climbers', sets: 3, reps: '30 sec', restSeconds: 45 }
    ],
    published: true,
    isFavorite: true,
  },
  {
    id: 'wo-push-hypertrophy',
    name: 'Upper Body Push Power & Hypertrophy',
    description: 'Focused hypertrophy training for chest, shoulders, and triceps with heavy compound overload.',
    goal: 'Strength',
    difficulty: 'Intermediate',
    location: 'Gym',
    durationMinutes: 45,
    category: 'Strength',
    featured: true,
    warmup: [
      'Shoulder Dislocates with Band — 2 min',
      'Scapular Push-ups — 2 min',
      'Light Dumbbell External Rotations — 1 min'
    ],
    cooldown: [
      'Doorway Pectoral Stretch — 2 min',
      'Overhead Triceps & Lat Stretch — 3 min'
    ],
    exercises: [
      { exerciseId: 'ex-bench-press', exerciseName: 'Barbell Bench Press', sets: 4, reps: '8 - 10', restSeconds: 90 },
      { exerciseId: 'ex-incline-db-press', exerciseName: 'Incline Dumbbell Press', sets: 3, reps: '10 - 12', restSeconds: 75 },
      { exerciseId: 'ex-overhead-press', exerciseName: 'Standing Overhead Press', sets: 3, reps: '8 - 10', restSeconds: 90 },
      { exerciseId: 'ex-lateral-raise', exerciseName: 'Dumbbell Lateral Raise', sets: 3, reps: '12 - 15', restSeconds: 60 },
      { exerciseId: 'ex-tricep-pushdown', exerciseName: 'Cable Triceps Pushdown', sets: 3, reps: '12 - 15', restSeconds: 60 }
    ],
    published: true,
    isFavorite: true,
  },
  {
    id: 'wo-pull-back-biceps',
    name: 'V-Taper Pull & Bicep Forge',
    description: 'Heavy vertical and horizontal pulling targeting back thickness, lats, and peak bicep recruitment.',
    goal: 'Strength',
    difficulty: 'Intermediate',
    location: 'Gym',
    durationMinutes: 45,
    category: 'Strength',
    featured: false,
    warmup: [
      'Dead-Hangs from Pull-up Bar — 1 min',
      'Band Pull-Aparts — 2 min',
      'Thoracic Spine Rotations — 2 min'
    ],
    cooldown: [
      'Lat Hanging Stretch — 2 min',
      'Forearm & Bicep Wall Stretch — 3 min'
    ],
    exercises: [
      { exerciseId: 'ex-pullup', exerciseName: 'Wide-Grip Pull-up', sets: 4, reps: '6 - 8', restSeconds: 90 },
      { exerciseId: 'ex-barbell-row', exerciseName: 'Bent-Over Barbell Row', sets: 4, reps: '8 - 10', restSeconds: 90 },
      { exerciseId: 'ex-lat-pulldown', exerciseName: 'Lat Pulldown', sets: 3, reps: '10 - 12', restSeconds: 60 },
      { exerciseId: 'ex-barbell-curl', exerciseName: 'Barbell Bicep Curl', sets: 3, reps: '10 - 12', restSeconds: 60 }
    ],
    published: true,
  },
  {
    id: 'wo-home-calisthenics',
    name: 'Home Calisthenics Burn',
    description: 'No gym, no excuses. A 100% bodyweight workout engineered to build athletic stamina and definition anywhere.',
    goal: 'Endurance',
    difficulty: 'Beginner',
    location: 'Home',
    durationMinutes: 20,
    category: 'Home Workouts',
    featured: true,
    warmup: [
      'Jumping Jacks — 1 min',
      'Arm Circles — 1 min',
      'Torso Twists — 1 min'
    ],
    cooldown: [
      'Standing Quad Stretch — 2 min',
      'Seated Hamstring Fold — 2 min'
    ],
    exercises: [
      { exerciseId: 'ex-pushup', exerciseName: 'Classic Push-up', sets: 3, reps: '12 - 15', restSeconds: 45 },
      { exerciseId: 'ex-bodyweight-squat', exerciseName: 'Bodyweight Air Squat', sets: 3, reps: '20', restSeconds: 45 },
      { exerciseId: 'ex-mountain-climbers', exerciseName: 'Mountain Climbers', sets: 3, reps: '30 sec', restSeconds: 30 },
      { exerciseId: 'ex-burpees', exerciseName: 'Full-Body Burpees', sets: 3, reps: '10', restSeconds: 60 },
      { exerciseId: 'ex-plank', exerciseName: 'Isometric Forearm Plank', sets: 3, reps: '45 sec', restSeconds: 45 }
    ],
    published: true,
  },
  {
    id: 'wo-hiit-shred',
    name: '20-Minute High-Intensity Interval Shred',
    description: 'Fast-paced Tabata and interval protocol driving heart rate into the fat-burning zone while sparing lean muscle.',
    goal: 'Conditioning',
    difficulty: 'Advanced',
    location: 'Both',
    durationMinutes: 20,
    category: 'Conditioning',
    featured: false,
    warmup: ['Light Jogging in Place — 2 min', 'High Knees — 1 min'],
    cooldown: ['Walking Recovery — 2 min', 'Deep Diaphragmatic Breathing — 2 min'],
    exercises: [
      { exerciseId: 'ex-burpees', exerciseName: 'Full-Body Burpees', sets: 4, reps: '30 sec on / 15 sec rest', restSeconds: 30 },
      { exerciseId: 'ex-jumping-jacks', exerciseName: 'Dynamic Jumping Jacks', sets: 4, reps: '45 sec', restSeconds: 20 },
      { exerciseId: 'ex-mountain-climbers', exerciseName: 'Mountain Climbers', sets: 4, reps: '30 sec', restSeconds: 30 },
      { exerciseId: 'ex-bicycle-crunch', exerciseName: 'Bicycle Crunch', sets: 4, reps: '30 sec', restSeconds: 30 }
    ],
    published: true,
  },
  {
    id: 'wo-mobility-reset',
    name: '15-Minute Recovery & Spine Reset',
    description: 'Decompress tight joints, release hip tension, and mobilize the thoracic spine after intense training sessions.',
    goal: 'Mobility',
    difficulty: 'Beginner',
    location: 'Both',
    durationMinutes: 15,
    category: 'Recovery',
    featured: true,
    warmup: ['Deep Belly Breathing on Back — 2 min'],
    cooldown: ['Corpse Pose Relaxation — 3 min'],
    exercises: [
      { exerciseId: 'ex-cat-cow', exerciseName: 'Cat-Cow Spinal Stretch', sets: 3, reps: '10 breaths', restSeconds: 20 },
      { exerciseId: 'ex-worlds-greatest-stretch', exerciseName: "World's Greatest Stretch", sets: 3, reps: '5 per side', restSeconds: 30 },
      { exerciseId: 'ex-plank', exerciseName: 'Isometric Forearm Plank (Light Activation)', sets: 2, reps: '30 sec', restSeconds: 30 }
    ],
    published: true,
  }
];

export const INITIAL_USER_PROFILE: UserProfile = {
  id: 'user-default-1',
  name: 'Alex Vance',
  email: 'alex.vance@fitness.io',
  avatar: '⚡',
  experienceLevel: 'Intermediate',
  preferredLocation: 'Both',
  goals: ['Build Muscle', 'Improve Mobility', 'Maintain Consistency'],
  availableEquipment: ['Bodyweight', 'Dumbbells', 'Barbell', 'Pull-up Bar', 'Mat'],
  preferredDuration: 30,
  totalWorkouts: 84,
  streakDays: 12,
  activeMinutes: 1240,
  points: 3420,
};

export const INITIAL_PRS: PersonalRecord[] = [
  {
    id: 'pr-1',
    exerciseName: 'Barbell Bench Press',
    value: '100 kg (220 lbs)',
    category: 'Chest',
    date: '2026-08-20',
    safetyTip: 'Prioritize shoulder retraction and controlled bar touch over excessive ego weight.'
  },
  {
    id: 'pr-2',
    exerciseName: 'Barbell Back Squat',
    value: '140 kg (308 lbs)',
    category: 'Legs',
    date: '2026-08-25',
    safetyTip: 'Ensure knee alignment and hip crease below parallel before attempting heavier weights.'
  },
  {
    id: 'pr-3',
    exerciseName: 'Deadlift',
    value: '180 kg (396 lbs)',
    category: 'Back',
    date: '2026-09-02',
    safetyTip: 'Maintain neutral spine brace; never sacrifice spinal integrity for a PR.'
  },
  {
    id: 'pr-4',
    exerciseName: 'Wide-Grip Pull-ups',
    value: '18 Reps',
    category: 'Back',
    date: '2026-09-08',
    safetyTip: 'Count only strict dead-hang reps to build genuine tendon resilience.'
  },
  {
    id: 'pr-5',
    exerciseName: 'Isometric Forearm Plank',
    value: '3m 15s',
    category: 'Core',
    date: '2026-09-10',
    safetyTip: 'Discontinue the set the instant your lower back begins to arch or sag.'
  }
];

export const INITIAL_GOALS: FitnessGoalItem[] = [
  {
    id: 'goal-1',
    title: 'Complete 3 Workouts Per Week',
    category: 'Consistency',
    target: 3,
    current: 3,
    unit: 'workouts',
    deadline: '2026-09-30',
    completed: true,
  },
  {
    id: 'goal-2',
    title: 'Learn 10 New Exercises With Proper Form',
    category: 'Mastery',
    target: 10,
    current: 8,
    unit: 'exercises',
    deadline: '2026-10-15',
    completed: false,
  },
  {
    id: 'goal-3',
    title: 'Reach 30-Day Workout Streak',
    category: 'Streak',
    target: 30,
    current: 12,
    unit: 'days',
    deadline: '2026-10-31',
    completed: false,
  },
  {
    id: 'goal-4',
    title: 'Accumulate 1,500 Active Training Minutes',
    category: 'Volume',
    target: 1500,
    current: 1240,
    unit: 'minutes',
    deadline: '2026-10-01',
    completed: false,
  }
];

export const INITIAL_CALENDAR: CalendarEntry[] = [
  { id: 'cal-1', date: '2026-09-01', workoutName: '30-Minute Total Body Conditioning', status: 'completed', durationMinutes: 30, notes: 'Felt energetic. Nailed all push-up sets!' },
  { id: 'cal-2', date: '2026-09-02', workoutName: 'Rest & Mobility Reset', status: 'rest', durationMinutes: 15, notes: 'Foam rolled lats and hips.' },
  { id: 'cal-3', date: '2026-09-03', workoutName: 'Upper Body Push Power', status: 'completed', durationMinutes: 45, notes: 'Solid bench session at 90kg.' },
  { id: 'cal-4', date: '2026-09-04', workoutName: 'Rest Day', status: 'rest', notes: 'Active walk.' },
  { id: 'cal-5', date: '2026-09-05', workoutName: 'V-Taper Pull & Bicep Forge', status: 'completed', durationMinutes: 45, notes: 'Hit clean 4x8 pull-ups.' },
  { id: 'cal-6', date: '2026-09-06', workoutName: 'Home Calisthenics Burn', status: 'completed', durationMinutes: 20, notes: 'Quick home session.' },
  { id: 'cal-7', date: '2026-09-07', workoutName: 'Rest & Recovery', status: 'rest' },
  { id: 'cal-8', date: '2026-09-08', workoutName: '20-Minute HIIT Shred', status: 'completed', durationMinutes: 20, notes: 'Heart rate peaked at 165 bpm.' },
  { id: 'cal-9', date: '2026-09-09', workoutName: 'Total Body Conditioning', status: 'completed', durationMinutes: 30 },
  { id: 'cal-10', date: '2026-09-10', workoutName: 'Push Power & Hypertrophy', status: 'completed', durationMinutes: 42 },
  { id: 'cal-11', date: '2026-09-11', workoutName: 'V-Taper Pull & Biceps', status: 'completed', durationMinutes: 45 },
  { id: 'cal-12', date: '2026-09-12', workoutName: 'Today: 30-Minute Full Body', status: 'planned', durationMinutes: 30, notes: 'Scheduled for this afternoon.' },
  { id: 'cal-13', date: '2026-09-13', workoutName: 'HIIT Cardio Rush', status: 'planned', durationMinutes: 25 },
  { id: 'cal-14', date: '2026-09-14', workoutName: 'Sunday Rest & Mobility', status: 'planned', durationMinutes: 20 },
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: '🔥 12-Day Streak Milestone!',
    message: 'Incredible dedication! You have logged 12 consecutive active training days.',
    type: 'milestone',
    date: '2 hours ago',
    read: false,
  },
  {
    id: 'notif-2',
    title: '📢 New Home Workout Collection Available!',
    message: 'Admin has published 6 new minimal equipment routines optimized for home training.',
    type: 'announcement',
    date: 'Yesterday',
    read: false,
  },
  {
    id: 'notif-3',
    title: '⏰ Workout Reminder',
    message: "Today's scheduled session: '30-Minute Total Body Conditioning'. Ready to move?",
    type: 'reminder',
    date: '5 hours ago',
    read: true,
  },
  {
    id: 'notif-4',
    title: '🏆 Goal Completed: 3 Workouts / Week',
    message: 'Congratulations! You achieved your weekly frequency goal ahead of schedule.',
    type: 'milestone',
    date: '2 days ago',
    read: true,
  }
];

/**
 * Hero carousel imagery — one unique, high quality fitness photo per slide.
 * `auto=format` lets the browser receive modern (webp/avif) formats automatically and
 * the width is appended per breakpoint by the carousel (`srcSet` → responsive delivery).
 */
export const CAROUSEL_IMAGES: string[] = [
  // 1. Gym strength training
  'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=70',
  // 2. Home workout
  'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=70',
  // 3. Cardio training
  'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&q=70',
  // 4. Functional training
  'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&q=70',
  // 5. Stretching & mobility
  'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=70',
  // 6. Dumbbell workout
  'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&q=70',
];

export const INITIAL_CAROUSEL: CarouselSlide[] = [
  {
    id: 'slide-1',
    title: 'BUILD YOUR STRENGTH',
    subtitle: 'Train with structured gym workouts built around progressive overload and perfect form.',
    badge: 'GYM STRENGTH',
    ctaText: 'EXPLORE GYM',
    ctaAction: 'workouts',
    accent: '#FF5722',
    active: true,
    order: 1,
    image: CAROUSEL_IMAGES[0],
    imageAlt: 'Athlete performing a heavy barbell strength training lift in a modern gym',
  },
  {
    id: 'slide-2',
    title: 'WORKOUT ANYWHERE',
    subtitle: 'Powerful home workouts without complicated equipment — no commute, no excuses.',
    badge: 'HOME TRAINING',
    ctaText: 'EXPLORE HOME',
    ctaAction: 'exercises',
    accent: '#00FF66',
    active: true,
    order: 2,
    image: CAROUSEL_IMAGES[1],
    imageAlt: 'Person completing a guided bodyweight workout at home',
  },
  {
    id: 'slide-3',
    title: 'IMPROVE YOUR FITNESS',
    subtitle: 'Build endurance with guided cardio sessions, intervals and conditioning blocks.',
    badge: 'CARDIO TRAINING',
    ctaText: 'START CARDIO',
    ctaAction: 'generator',
    accent: '#FF5722',
    active: true,
    order: 3,
    image: CAROUSEL_IMAGES[2],
    imageAlt: 'Runner training cardio endurance on a treadmill',
  },
  {
    id: 'slide-4',
    title: 'MOVE BETTER',
    subtitle: 'Improve mobility, flexibility and movement quality with functional training.',
    badge: 'FUNCTIONAL TRAINING',
    ctaText: 'TRAIN FUNCTIONAL',
    ctaAction: 'workouts',
    accent: '#00FF66',
    active: true,
    order: 4,
    image: CAROUSEL_IMAGES[3],
    imageAlt: 'Athlete performing a functional kettlebell training movement',
  },
  {
    id: 'slide-5',
    title: 'STRETCH & RECOVER',
    subtitle: 'Guided stretching and mobility flows that keep every joint moving freely.',
    badge: 'MOBILITY & STRETCHING',
    ctaText: 'EXPLORE MOBILITY',
    ctaAction: 'recovery',
    accent: '#FF5722',
    active: true,
    order: 5,
    image: CAROUSEL_IMAGES[4],
    imageAlt: 'Person stretching and working on mobility on a training mat',
  },
  {
    id: 'slide-6',
    title: 'SCULPT WITH DUMBBELLS',
    subtitle: 'Build muscle with efficient dumbbell sessions suited to every experience level.',
    badge: 'DUMBBELL WORKOUT',
    ctaText: 'BUILD MUSCLE',
    ctaAction: 'exercises',
    accent: '#00FF66',
    active: true,
    order: 6,
    image: CAROUSEL_IMAGES[5],
    imageAlt: 'Row of dumbbells ready for a dumbbell strength workout',
  }
];

export const INITIAL_ADMIN_USERS: AdminUser[] = [
  { id: 'usr-1', name: 'Alex Vance', email: 'alex.vance@fitness.io', joinDate: '2026-03-15', status: 'active', workoutsCompleted: 84, lastActive: '10 min ago', role: 'Member' },
  { id: 'usr-2', name: 'Sarah Connor', email: 'sconnor@resistance.net', joinDate: '2026-04-02', status: 'active', workoutsCompleted: 112, lastActive: '1 hour ago', role: 'VIP Member' },
  { id: 'usr-3', name: 'Marcus Brody', email: 'mbrody@ironforge.com', joinDate: '2026-05-19', status: 'active', workoutsCompleted: 43, lastActive: '3 hours ago', role: 'Member' },
  { id: 'usr-4', name: 'Elena Rostova', email: 'elena.rostova@athletics.org', joinDate: '2026-06-11', status: 'active', workoutsCompleted: 67, lastActive: 'Yesterday', role: 'Trainer' },
  { id: 'usr-5', name: 'James Wilson', email: 'jwilson@workout.co', joinDate: '2026-07-28', status: 'disabled', workoutsCompleted: 12, lastActive: '14 days ago', role: 'Member' },
  { id: 'usr-6', name: 'David Kim', email: 'dkim@fitpro.io', joinDate: '2026-08-05', status: 'active', workoutsCompleted: 95, lastActive: '25 min ago', role: 'VIP Member' },
  { id: 'usr-7', name: 'Chloe Dubois', email: 'cdubois@gymlife.fr', joinDate: '2026-08-19', status: 'active', workoutsCompleted: 31, lastActive: 'Just now', role: 'Member' },
];

export const INITIAL_ACTIVITY_LOGS: ActivityLog[] = [
  { id: 'log-1', adminName: 'Chief Admin', action: 'New Workout Published', timestamp: '2026-09-11 19:42', status: 'Success', details: "Published 'Home Calisthenics Burn' to general catalog" },
  { id: 'log-2', adminName: 'Content Lead', action: 'Exercise Updated', timestamp: '2026-09-11 18:15', status: 'Success', details: "Updated safety cues for 'Barbell Bench Press'" },
  { id: 'log-3', adminName: 'Chief Admin', action: 'Announcement Dispatched', timestamp: '2026-09-11 15:30', status: 'Success', details: "Sent push announcement: 'NEW HOME WORKOUT COLLECTION AVAILABLE!'" },
  { id: 'log-4', adminName: 'Support Admin', action: 'User Account Status Changed', timestamp: '2026-09-11 12:04', status: 'Warning', details: "Flagged user #usr-5 for account verification review" },
  { id: 'log-5', adminName: 'System Admin', action: 'Backup & Health Verification', timestamp: '2026-09-11 04:00', status: 'Success', details: 'Automated database and media asset check passed with 99.98% uptime' }
];

export const INITIAL_SYSTEM_HEALTH: SystemHealthItem[] = [
  { name: 'Web Application Server', status: 'Operational', latency: '18 ms', uptime: '99.99%', lastChecked: 'Just now' },
  { name: 'Exercise & Media Database', status: 'Operational', latency: '24 ms', uptime: '99.98%', lastChecked: '1 min ago' },
  { name: 'User Authentication & Sessions', status: 'Operational', latency: '12 ms', uptime: '100%', lastChecked: 'Just now' },
  { name: '3D Biomechanics Simulation Pipeline', status: 'Operational', latency: '16 ms', uptime: '99.95%', lastChecked: 'Just now' },
  { name: 'Real-Time Notification Dispatcher', status: 'Operational', latency: '32 ms', uptime: '99.97%', lastChecked: '3 min ago' },
  { name: 'Analytics & Reporting Engine', status: 'Operational', latency: '45 ms', uptime: '99.92%', lastChecked: '5 min ago' },
];
