import React, { useState } from 'react';
import { X, Plus, Save } from 'lucide-react';
import { useFitness } from '../../context/FitnessContext';
import { MuscleGroup, EquipmentType, DifficultyLevel, LocationType, ExerciseType } from '../../types';

interface AdminExerciseFormProps {
  onClose: () => void;
  exercise?: any;
}

export const AdminExerciseForm: React.FC<AdminExerciseFormProps> = ({ onClose, exercise }) => {
  const { addExercise, updateExercise } = useFitness();
  
  const [formData, setFormData] = useState({
    name: exercise?.name || '',
    description: exercise?.description || '',
    primaryMuscle: exercise?.primaryMuscle || 'Chest' as MuscleGroup,
    secondaryMuscles: exercise?.secondaryMuscles || [] as MuscleGroup[],
    equipment: exercise?.equipment || ['Bodyweight'] as EquipmentType[],
    difficulty: exercise?.difficulty || 'Beginner' as DifficultyLevel,
    location: exercise?.location || 'Both' as LocationType,
    type: exercise?.type || 'Strength' as ExerciseType,
    instructions: exercise?.instructions || [''],
    commonMistakes: exercise?.commonMistakes || [''],
    safetyTips: exercise?.safetyTips || [''],
    sets: exercise?.sets || 3,
    reps: exercise?.reps || '10',
    restSeconds: exercise?.restSeconds || 60,
    beginnerModification: exercise?.beginnerModification || '',
    advancedModification: exercise?.advancedModification || '',
    homeAlternative: exercise?.homeAlternative || '',
    gymAlternative: exercise?.gymAlternative || '',
    biomechanicsKey: exercise?.biomechanicsKey || 'squat',
  });

  const muscleOptions: MuscleGroup[] = ['Chest', 'Back', 'Shoulders', 'Biceps', 'Triceps', 'Arms', 'Legs', 'Glutes', 'Core', 'Cardio', 'Full Body', 'Mobility', 'Stretching', 'Balance'];
  const equipmentOptions: EquipmentType[] = ['Bodyweight', 'Dumbbells', 'Barbell', 'Bench', 'Cable', 'Machine', 'Resistance Band', 'Kettlebell', 'Pull-up Bar', 'Mat'];
  const difficultyOptions: DifficultyLevel[] = ['Beginner', 'Intermediate', 'Advanced'];
  const locationOptions: LocationType[] = ['Home', 'Gym', 'Both'];
  const typeOptions: ExerciseType[] = ['Strength', 'Cardio', 'Mobility', 'Stretching', 'Balance', 'Conditioning'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const exerciseData = {
      ...formData,
      instructions: formData.instructions.filter(i => i.trim()),
      commonMistakes: formData.commonMistakes.filter(m => m.trim()),
      safetyTips: formData.safetyTips.filter(s => s.trim()),
    };

    if (exercise?.id) {
      updateExercise(exercise.id, exerciseData);
    } else {
      addExercise(exerciseData);
    }
    onClose();
  };

  const addArrayItem = (field: 'instructions' | 'commonMistakes' | 'safetyTips') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const updateArrayItem = (field: 'instructions' | 'commonMistakes' | 'safetyTips', index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const removeArrayItem = (field: 'instructions' | 'commonMistakes' | 'safetyTips', index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const toggleArrayItem = (field: 'secondaryMuscles' | 'equipment', value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value as any)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value as any]
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.8)' }}>
      <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#1c1c1e] border border-[#2a2a2e] shadow-2xl">
        <div className="sticky top-0 z-10 p-6 border-b border-[#2a2a2e] bg-[#1c1c1e] flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">
            {exercise?.id ? 'Edit Exercise' : 'Add New Exercise'}
          </h2>
          <button onClick={onClose} className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">Exercise Name *</label>
              <input type="text" value={formData.name} onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))} required className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-[#ff5722]" placeholder="e.g., Barbell Bench Press" />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">Description *</label>
              <textarea value={formData.description} onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))} required rows={3} className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-[#ff5722] resize-none" placeholder="Brief description..." />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">Primary Muscle *</label>
              <select value={formData.primaryMuscle} onChange={e => setFormData(prev => ({ ...prev, primaryMuscle: e.target.value as MuscleGroup }))} required className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-[#ff5722]">
                {muscleOptions.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">Difficulty *</label>
              <select value={formData.difficulty} onChange={e => setFormData(prev => ({ ...prev, difficulty: e.target.value as DifficultyLevel }))} required className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-[#ff5722]">
                {difficultyOptions.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">Location *</label>
              <select value={formData.location} onChange={e => setFormData(prev => ({ ...prev, location: e.target.value as LocationType }))} required className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-[#ff5722]">
                {locationOptions.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">Exercise Type *</label>
              <select value={formData.type} onChange={e => setFormData(prev => ({ ...prev, type: e.target.value as ExerciseType }))} required className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-[#ff5722]">
                {typeOptions.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">Secondary Muscles</label>
            <div className="flex flex-wrap gap-2">
              {muscleOptions.map(m => (
                <button key={m} type="button" onClick={() => toggleArrayItem('secondaryMuscles', m)} className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${formData.secondaryMuscles.includes(m as MuscleGroup) ? 'bg-[#ff5722] text-white' : 'bg-neutral-900 border border-neutral-800 text-neutral-400 hover:border-[#ff5722]'}`}>
                  {m}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">Equipment</label>
            <div className="flex flex-wrap gap-2">
              {equipmentOptions.map(eq => (
                <button key={eq} type="button" onClick={() => toggleArrayItem('equipment', eq)} className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${formData.equipment.includes(eq as EquipmentType) ? 'bg-[#ff5722] text-white' : 'bg-neutral-900 border border-neutral-800 text-neutral-400 hover:border-[#ff5722]'}`}>
                  {eq}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-4">
            <button type="submit" className="flex-1 py-3 rounded-xl bg-[#ff5722] hover:bg-[#ff5722]/90 text-white text-sm font-bold uppercase flex items-center justify-center gap-2">
              <Save className="w-4 h-4" />
              {exercise?.id ? 'Update Exercise' : 'Add Exercise'}
            </button>
            <button type="button" onClick={onClose} className="px-6 py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-sm font-bold uppercase">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
