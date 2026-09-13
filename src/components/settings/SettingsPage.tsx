import React, { useState } from 'react';
import { 
  Settings, 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Globe,
  Volume2,
  Lock,
  LogOut,
  Save,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';
import { useFitness } from '../../context/FitnessContext';

export const SettingsPage: React.FC = () => {
  const { userProfile, updateUserProfile, setCurrentView } = useFitness();
  
  const [notifications, setNotifications] = useState(true);
  const [soundEffects, setSoundEffects] = useState(true);
  const [autoPlay, setAutoPlay] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [language, setLanguage] = useState('en');

  const handleSave = () => {
    // In a real app, this would save to backend
    alert('Settings saved successfully!');
  };

  const handleLogout = () => {
    setCurrentView('home');
  };

  return (
    <div className="py-6 px-4 sm:px-6 max-w-4xl mx-auto space-y-8 select-none">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ff5722]/15 text-[#ff5722] text-xs font-bold mb-2">
            <Settings className="w-3.5 h-3.5" />
            ACCOUNT SETTINGS
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Settings
          </h1>
          <p className="text-sm text-neutral-400 mt-1">
            Manage your account preferences and application settings.
          </p>
        </div>
      </div>

      {/* Profile Settings */}
      <div className="p-6 rounded-3xl bg-[#1c1c1e] border border-[#2a2a2e] space-y-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-[#ff5722]/15 text-[#ff5722] flex items-center justify-center">
            <User className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white">Profile Settings</h3>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
              Display Name
            </label>
            <input
              type="text"
              value={userProfile.name}
              onChange={(e) => updateUserProfile({ name: e.target.value })}
              className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-[#ff5722] transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
              Email
            </label>
            <input
              type="email"
              value={userProfile.email}
              onChange={(e) => updateUserProfile({ email: e.target.value })}
              className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-[#ff5722] transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
              Experience Level
            </label>
            <select
              value={userProfile.experienceLevel}
              onChange={(e) => updateUserProfile({ experienceLevel: e.target.value as any })}
              className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-[#ff5722]"
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
              Preferred Location
            </label>
            <select
              value={userProfile.preferredLocation}
              onChange={(e) => updateUserProfile({ preferredLocation: e.target.value as any })}
              className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-[#ff5722]"
            >
              <option value="Home">Home</option>
              <option value="Gym">Gym</option>
              <option value="Both">Both</option>
            </select>
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="p-6 rounded-3xl bg-[#1c1c1e] border border-[#2a2a2e] space-y-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-blue-500/15 text-blue-400 flex items-center justify-center">
            <Bell className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white">Notifications</h3>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="text-sm font-semibold text-white">Push Notifications</p>
              <p className="text-xs text-neutral-400">Receive workout reminders</p>
            </div>
            <button
              onClick={() => setNotifications(!notifications)}
              className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 transition-colors"
            >
              {notifications ? <ToggleRight className="w-5 h-5 text-[#00ff66]" /> : <ToggleLeft className="w-5 h-5 text-neutral-500" />}
            </button>
          </div>

          <div className="flex items-center justify-between py-2">
            <div>
              <p className="text-sm font-semibold text-white">Email Updates</p>
              <p className="text-xs text-neutral-400">Weekly progress reports</p>
            </div>
            <button
              onClick={() => setNotifications(!notifications)}
              className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 transition-colors"
            >
              {notifications ? <ToggleRight className="w-5 h-5 text-[#00ff66]" /> : <ToggleLeft className="w-5 h-5 text-neutral-500" />}
            </button>
          </div>
        </div>
      </div>

      {/* App Settings */}
      <div className="p-6 rounded-3xl bg-[#1c1c1e] border border-[#2a2a2e] space-y-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-purple-500/15 text-purple-400 flex items-center justify-center">
            <Palette className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white">App Preferences</h3>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="text-sm font-semibold text-white">Sound Effects</p>
              <p className="text-xs text-neutral-400">Workout timer sounds</p>
            </div>
            <button
              onClick={() => setSoundEffects(!soundEffects)}
              className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 transition-colors"
            >
              {soundEffects ? <ToggleRight className="w-5 h-5 text-[#00ff66]" /> : <ToggleLeft className="w-5 h-5 text-neutral-500" />}
            </button>
          </div>

          <div className="flex items-center justify-between py-2">
            <div>
              <p className="text-sm font-semibold text-white">Auto-play Videos</p>
              <p className="text-xs text-neutral-400">Exercise demonstrations</p>
            </div>
            <button
              onClick={() => setAutoPlay(!autoPlay)}
              className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 transition-colors"
            >
              {autoPlay ? <ToggleRight className="w-5 h-5 text-[#00ff66]" /> : <ToggleLeft className="w-5 h-5 text-neutral-500" />}
            </button>
          </div>

          <div className="flex items-center justify-between py-2">
            <div>
              <p className="text-sm font-semibold text-white">Dark Mode</p>
              <p className="text-xs text-neutral-400">App theme</p>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 transition-colors"
            >
              {darkMode ? <ToggleRight className="w-5 h-5 text-[#00ff66]" /> : <ToggleLeft className="w-5 h-5 text-neutral-500" />}
            </button>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
              Language
            </label>
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-neutral-400" />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="flex-1 bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-[#ff5722]"
              >
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
                <option value="de">Deutsch</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Security Settings */}
      <div className="p-6 rounded-3xl bg-[#1c1c1e] border border-[#2a2a2e] space-y-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center">
            <Shield className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white">Security</h3>
        </div>

        <div className="space-y-3">
          <button className="w-full py-3 px-4 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-sm font-semibold text-left flex items-center justify-between transition-colors">
            <div className="flex items-center gap-3">
              <Lock className="w-4 h-4 text-neutral-400" />
              <span>Change Password</span>
            </div>
            <span className="text-neutral-500">→</span>
          </button>

          <button className="w-full py-3 px-4 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-sm font-semibold text-left flex items-center justify-between transition-colors">
            <div className="flex items-center gap-3">
              <Shield className="w-4 h-4 text-neutral-400" />
              <span>Two-Factor Authentication</span>
            </div>
            <span className="text-[#00ff66] text-xs font-bold">Enabled</span>
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={handleSave}
          className="flex-1 py-4 rounded-2xl bg-[#ff5722] hover:bg-[#ff5722]/90 text-white text-sm font-black tracking-wider uppercase flex items-center justify-center gap-2 transition-all shadow-xl shadow-[#ff5722]/25 active:scale-95"
        >
          <Save className="w-4 h-4" />
          <span>Save Changes</span>
        </button>

        <button
          onClick={handleLogout}
          className="flex-1 py-4 rounded-2xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-white text-sm font-black tracking-wider uppercase flex items-center justify-center gap-2 transition-all active:scale-95"
        >
          <LogOut className="w-4 h-4" />
          <span>Log Out</span>
        </button>
      </div>
    </div>
  );
};
