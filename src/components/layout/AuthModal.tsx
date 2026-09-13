import React, { useState } from 'react';
import { X, Lock, Mail, User, Dumbbell, Sparkles, Check } from 'lucide-react';
import { useFitness } from '../../context/FitnessContext';
import { DifficultyLevel, LocationType, EquipmentType } from '../../types';

export const AuthModal: React.FC = () => {
  const { 
    isAuthModalOpen, 
    setIsAuthModalOpen, 
    authMode, 
    setAuthMode, 
    userProfile, 
    updateUserProfile 
  } = useFitness();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState(userProfile.name);
  const [experience, setExperience] = useState<DifficultyLevel>(userProfile.experienceLevel);
  const [location, setLocation] = useState<LocationType>(userProfile.preferredLocation);
  const [duration, setDuration] = useState<number>(userProfile.preferredDuration);
  const [selectedGoals, setSelectedGoals] = useState<string[]>(userProfile.goals);

  if (!isAuthModalOpen) return null;

  const handleSaveSetup = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({
      name: name || 'Athlete',
      experienceLevel: experience,
      preferredLocation: location,
      preferredDuration: duration,
      goals: selectedGoals,
    });
    setIsAuthModalOpen(false);
  };

  const toggleGoalSelection = (goal: string) => {
    setSelectedGoals(prev => 
      prev.includes(goal) ? prev.filter(g => g !== goal) : [...prev, goal]
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
      <div 
        className="w-full max-w-md bg-[#1c1c1e] border border-[#2a2a2e] rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-[#2a2a2e] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#ff5722] to-amber-500 flex items-center justify-center text-white">
              <Dumbbell className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-black text-white tracking-tight">
                {authMode === 'login' ? 'WELCOME BACK' : authMode === 'signup' ? 'JOIN YOU CAN' : 'PERSONALIZE PROFILE'}
              </h3>
              <p className="text-[11px] text-[#ff5722] font-semibold tracking-wider uppercase">
                TRAIN STRONG. MOVE BETTER.
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6">
          {authMode === 'login' && (
            <form onSubmit={(e) => { e.preventDefault(); setIsAuthModalOpen(false); }} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1.5">Email Address</label>
                <div className="flex items-center px-3.5 py-2.5 bg-neutral-900 border border-neutral-800 rounded-xl focus-within:border-[#ff5722]">
                  <Mail className="w-4 h-4 text-neutral-500 mr-2.5" />
                  <input
                    type="email"
                    required
                    placeholder="you@domain.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full bg-transparent text-sm text-white outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1.5">Password</label>
                <div className="flex items-center px-3.5 py-2.5 bg-neutral-900 border border-neutral-800 rounded-xl focus-within:border-[#ff5722]">
                  <Lock className="w-4 h-4 text-neutral-500 mr-2.5" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full bg-transparent text-sm text-white outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#ff5722] hover:bg-[#ff5722]/90 text-white text-sm font-bold shadow-lg shadow-[#ff5722]/20 transition-all active:scale-98 mt-2"
              >
                LOG IN
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => setAuthMode('signup')}
                  className="text-xs text-neutral-400 hover:text-white"
                >
                  Don't have an account? <span className="text-[#ff5722] font-semibold">Sign up</span>
                </button>
              </div>
            </form>
          )}

          {authMode === 'signup' && (
            <form onSubmit={(e) => { e.preventDefault(); setAuthMode('setup'); }} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1.5">Full Name</label>
                <div className="flex items-center px-3.5 py-2.5 bg-neutral-900 border border-neutral-800 rounded-xl focus-within:border-[#ff5722]">
                  <User className="w-4 h-4 text-neutral-500 mr-2.5" />
                  <input
                    type="text"
                    required
                    placeholder="Alex Vance"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full bg-transparent text-sm text-white outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1.5">Email Address</label>
                <div className="flex items-center px-3.5 py-2.5 bg-neutral-900 border border-neutral-800 rounded-xl focus-within:border-[#ff5722]">
                  <Mail className="w-4 h-4 text-neutral-500 mr-2.5" />
                  <input
                    type="email"
                    required
                    placeholder="you@domain.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full bg-transparent text-sm text-white outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1.5">Password</label>
                <div className="flex items-center px-3.5 py-2.5 bg-neutral-900 border border-neutral-800 rounded-xl focus-within:border-[#ff5722]">
                  <Lock className="w-4 h-4 text-neutral-500 mr-2.5" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full bg-transparent text-sm text-white outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#ff5722] hover:bg-[#ff5722]/90 text-white text-sm font-bold shadow-lg shadow-[#ff5722]/20 transition-all active:scale-98 mt-2"
              >
                CONTINUE TO PREFERENCES
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => setAuthMode('login')}
                  className="text-xs text-neutral-400 hover:text-white"
                >
                  Already have an account? <span className="text-[#ff5722] font-semibold">Log in</span>
                </button>
              </div>
            </form>
          )}

          {authMode === 'setup' && (
            <form onSubmit={handleSaveSetup} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1.5">Experience Level</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Beginner', 'Intermediate', 'Advanced'] as DifficultyLevel[]).map(exp => (
                    <button
                      type="button"
                      key={exp}
                      onClick={() => setExperience(exp)}
                      className={`py-2 px-2 rounded-xl text-xs font-bold border transition-all ${
                        experience === exp 
                          ? 'bg-[#ff5722] border-[#ff5722] text-white shadow-md' 
                          : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white'
                      }`}
                    >
                      {exp}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1.5">Preferred Training Location</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Home', 'Gym', 'Both'] as LocationType[]).map(loc => (
                    <button
                      type="button"
                      key={loc}
                      onClick={() => setLocation(loc)}
                      className={`py-2 px-2 rounded-xl text-xs font-bold border transition-all ${
                        location === loc 
                          ? 'bg-[#ff5722] border-[#ff5722] text-white shadow-md' 
                          : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white'
                      }`}
                    >
                      {loc}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1.5">Session Duration Target</label>
                <div className="grid grid-cols-4 gap-2">
                  {[15, 30, 45, 60].map(mins => (
                    <button
                      type="button"
                      key={mins}
                      onClick={() => setDuration(mins)}
                      className={`py-2 px-2 rounded-xl text-xs font-bold border transition-all ${
                        duration === mins 
                          ? 'bg-[#ff5722] border-[#ff5722] text-white shadow-md' 
                          : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white'
                      }`}
                    >
                      {mins}m
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1.5">Primary Goals</label>
                <div className="flex flex-wrap gap-2">
                  {['Build Muscle', 'Lose Fat', 'Improve Mobility', 'Increase Strength', 'Maintain Consistency'].map(goal => (
                    <button
                      type="button"
                      key={goal}
                      onClick={() => toggleGoalSelection(goal)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all flex items-center gap-1.5 ${
                        selectedGoals.includes(goal)
                          ? 'bg-[#00ff66]/20 border-[#00ff66]/60 text-[#00ff66] font-bold'
                          : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white'
                      }`}
                    >
                      {selectedGoals.includes(goal) && <Check className="w-3 h-3" />}
                      {goal}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#00ff66] hover:bg-[#00ff66]/90 text-black text-sm font-black shadow-lg shadow-[#00ff66]/20 transition-all active:scale-98 mt-3"
              >
                COMPLETE SETUP & START
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
