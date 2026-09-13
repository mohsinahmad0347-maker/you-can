import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Dumbbell, 
  Bookmark, 
  ArrowRight, 
  SlidersHorizontal, 
  RotateCcw,
  Sparkles,
  Layers
} from 'lucide-react';
import { useFitness } from '../../context/FitnessContext';
import { MuscleGroup, EquipmentType, DifficultyLevel, LocationType, ExerciseType } from '../../types';

export const ExerciseLibrary: React.FC = () => {
  const { 
    exercises, 
    openExerciseDetail, 
    toggleFavorite, 
    selectedCategoryFilter, 
    setSelectedCategoryFilter,
    openComparison 
  } = useFitness();

  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMuscle, setSelectedMuscle] = useState<string>(selectedCategoryFilter || 'All');
  const [selectedEquipment, setSelectedEquipment] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [selectedLocation, setSelectedLocation] = useState<string>('All');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [showOnlyFavorites, setShowOnlyFavorites] = useState<boolean>(false);

  // Sync category filter if changed from sidebar
  React.useEffect(() => {
    if (selectedCategoryFilter) {
      setSelectedMuscle(selectedCategoryFilter);
    }
  }, [selectedCategoryFilter]);

  const muscleOptions = ['All', 'Chest', 'Back', 'Shoulders', 'Arms', 'Biceps', 'Triceps', 'Legs', 'Glutes', 'Core', 'Cardio', 'Mobility'];
  const equipmentOptions = ['All', 'Bodyweight', 'Dumbbells', 'Barbell', 'Bench', 'Cable', 'Machine', 'Resistance Band', 'Pull-up Bar', 'Mat'];
  const difficultyOptions = ['All', 'Beginner', 'Intermediate', 'Advanced'];
  const locationOptions = ['All', 'Home', 'Gym', 'Both'];
  const typeOptions = ['All', 'Strength', 'Cardio', 'Mobility', 'Conditioning'];

  const filteredExercises = useMemo(() => {
    return exercises.filter(ex => {
      // Search term
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const match = ex.name.toLowerCase().includes(q) ||
          ex.primaryMuscle.toLowerCase().includes(q) ||
          ex.equipment.some(eq => eq.toLowerCase().includes(q));
        if (!match) return false;
      }

      // Favorites only
      if (showOnlyFavorites && !ex.isFavorite) return false;

      // Muscle
      if (selectedMuscle !== 'All') {
        if (selectedMuscle === 'Arms') {
          if (!['Biceps', 'Triceps', 'Arms'].includes(ex.primaryMuscle) && !ex.secondaryMuscles.some(m => ['Biceps', 'Triceps', 'Arms'].includes(m))) {
            return false;
          }
        } else if (ex.primaryMuscle !== selectedMuscle && !ex.secondaryMuscles.includes(selectedMuscle as MuscleGroup)) {
          return false;
        }
      }

      // Equipment
      if (selectedEquipment !== 'All' && !ex.equipment.includes(selectedEquipment as EquipmentType)) {
        return false;
      }

      // Difficulty
      if (selectedDifficulty !== 'All' && ex.difficulty !== selectedDifficulty) {
        return false;
      }

      // Location
      if (selectedLocation !== 'All') {
        if (selectedLocation === 'Home' && ex.location !== 'Home' && ex.location !== 'Both') return false;
        if (selectedLocation === 'Gym' && ex.location !== 'Gym' && ex.location !== 'Both') return false;
      }

      // Type
      if (selectedType !== 'All' && ex.type !== selectedType) {
        return false;
      }

      return true;
    });
  }, [exercises, searchQuery, selectedMuscle, selectedEquipment, selectedDifficulty, selectedLocation, selectedType, showOnlyFavorites]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedMuscle('All');
    setSelectedEquipment('All');
    setSelectedDifficulty('All');
    setSelectedLocation('All');
    setSelectedType('All');
    setShowOnlyFavorites(false);
    setSelectedCategoryFilter(null);
  };

  return (
    <div className="py-6 px-4 sm:px-6 max-w-7xl mx-auto space-y-8 select-none">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ff5722]/15 text-[#ff5722] text-xs font-bold mb-2">
            <Dumbbell className="w-3.5 h-3.5" />
            COMPREHENSIVE MOVEMENT REPOSITORY
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Exercise Library
          </h1>
          <p className="text-sm text-neutral-400 mt-1">
            Browse {exercises.length} biomechanically verified gym and home exercises with interactive 3D avatar guides.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold border transition-all flex items-center gap-2 ${
              showOnlyFavorites 
                ? 'bg-amber-500/20 border-amber-500/60 text-amber-400' 
                : 'bg-[#1c1c1e] border-[#2a2a2e] text-neutral-300 hover:text-white'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${showOnlyFavorites ? 'fill-amber-400' : ''}`} />
            <span>Favorites</span>
          </button>

          <button
            onClick={resetFilters}
            className="p-2.5 rounded-2xl bg-[#1c1c1e] border border-[#2a2a2e] text-neutral-400 hover:text-white hover:border-neutral-600 transition-all"
            title="Reset all filters"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Search and Multi-Filter Controls */}
      <div className="p-6 rounded-3xl bg-[#1c1c1e] border border-[#2a2a2e] space-y-4 shadow-xl">
        {/* Search Bar */}
        <div className="flex items-center px-4 py-3 bg-neutral-900 border border-neutral-800 rounded-2xl focus-within:border-[#ff5722] transition-colors">
          <Search className="w-5 h-5 text-neutral-400 mr-3" />
          <input
            type="text"
            placeholder="Search by exercise name, muscle, or equipment..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-transparent text-sm text-white placeholder-neutral-500 outline-none font-medium"
          />
        </div>

        {/* Dropdown / Pill Filter Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 pt-1">
          {/* Muscle Filter */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-1.5">Muscle Group</label>
            <select
              value={selectedMuscle}
              onChange={e => setSelectedMuscle(e.target.value)}
              className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-xs font-semibold text-white outline-none focus:border-[#ff5722]"
            >
              {muscleOptions.map(m => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>

          {/* Equipment Filter */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-1.5">Equipment</label>
            <select
              value={selectedEquipment}
              onChange={e => setSelectedEquipment(e.target.value)}
              className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-xs font-semibold text-white outline-none focus:border-[#ff5722]"
            >
              {equipmentOptions.map(eq => (
                <option key={eq} value={eq}>{eq}</option>
              ))}
            </select>
          </div>

          {/* Location Filter */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-1.5">Location</label>
            <select
              value={selectedLocation}
              onChange={e => setSelectedLocation(e.target.value)}
              className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-xs font-semibold text-white outline-none focus:border-[#ff5722]"
            >
              {locationOptions.map(loc => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>

          {/* Difficulty Filter */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-1.5">Difficulty</label>
            <select
              value={selectedDifficulty}
              onChange={e => setSelectedDifficulty(e.target.value)}
              className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-xs font-semibold text-white outline-none focus:border-[#ff5722]"
            >
              {difficultyOptions.map(diff => (
                <option key={diff} value={diff}>{diff}</option>
              ))}
            </select>
          </div>

          {/* Exercise Type */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-1.5">Training Type</label>
            <select
              value={selectedType}
              onChange={e => setSelectedType(e.target.value)}
              className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-xs font-semibold text-white outline-none focus:border-[#ff5722]"
            >
              {typeOptions.map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Result Counter & Active Chips */}
      <div className="flex items-center justify-between text-xs text-neutral-400">
        <p>Showing <strong className="text-white">{filteredExercises.length}</strong> of {exercises.length} exercises</p>
      </div>

      {/* Grid of Exercise Cards */}
      {filteredExercises.length === 0 ? (
        <div className="py-20 text-center rounded-3xl bg-[#1c1c1e] border border-[#2a2a2e] space-y-3">
          <Dumbbell className="w-10 h-10 text-neutral-600 mx-auto" />
          <h3 className="text-base font-bold text-white">No exercises match your filter</h3>
          <p className="text-xs text-neutral-500">Try adjusting your search criteria or resetting filters.</p>
          <button
            onClick={resetFilters}
            className="px-4 py-2 rounded-xl bg-[#ff5722] text-white text-xs font-bold"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExercises.map(ex => (
            <div
              key={ex.id}
              className="p-6 rounded-3xl bg-[#1c1c1e] border border-[#2a2a2e] hover:border-[#ff5722]/50 flex flex-col justify-between transition-all shadow-xl group relative"
            >
              <div>
                {/* Header badges */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1.5">
                    <span className="px-2.5 py-1 text-[10px] font-bold uppercase rounded-md bg-[#ff5722]/15 text-[#ff5722] border border-[#ff5722]/30">
                      {ex.primaryMuscle}
                    </span>
                    <span className="px-2 py-1 text-[10px] font-semibold rounded-md bg-neutral-800 text-neutral-300">
                      {ex.location}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => openComparison(ex.id)}
                      className="p-1 text-neutral-500 hover:text-neutral-300 transition-colors"
                      title="Compare"
                    >
                      <Layers className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => toggleFavorite(ex.id)}
                      className="p-1 text-neutral-500 hover:text-amber-400 transition-colors"
                      title="Favorite"
                    >
                      <Bookmark className={`w-4 h-4 ${ex.isFavorite ? 'fill-amber-400 text-amber-400' : ''}`} />
                    </button>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-[#ff5722] transition-colors">
                  {ex.name}
                </h3>

                <p className="text-xs text-neutral-400 mt-2 line-clamp-2 leading-relaxed">
                  {ex.description}
                </p>

                {/* Equipment & Difficulty tags */}
                <div className="mt-4 pt-3 border-t border-neutral-800/80 flex flex-wrap items-center justify-between gap-2 text-[11px] text-neutral-400">
                  <span className="truncate max-w-[150px]">Equip: {ex.equipment.join(', ')}</span>
                  <span className="font-semibold text-[#00ff66]">{ex.difficulty}</span>
                </div>
              </div>

              <button
                onClick={() => openExerciseDetail(ex.id)}
                className="mt-6 w-full py-3 rounded-2xl bg-neutral-800 hover:bg-[#ff5722] text-white text-xs font-black tracking-wider uppercase flex items-center justify-center gap-2 transition-all shadow-md active:scale-95"
              >
                <span>DEMONSTRATE IN 3D</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
