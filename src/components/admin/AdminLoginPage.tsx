import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff,
  LogIn,
  AlertCircle
} from 'lucide-react';
import { useFitness } from '../../context/FitnessContext';

export const AdminLoginPage: React.FC = () => {
  const { loginAdmin, setCurrentView } = useFitness();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate authentication delay
    setTimeout(() => {
      // Demo authentication - accept any credentials for demo
      if (email && password) {
        loginAdmin();
        setCurrentView('admin');
      } else {
        setError('Please enter email and password');
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 select-none" style={{ background: '#0d0d0d' }}>
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-[#ff5722] flex items-center justify-center">
              <ShieldCheck className="w-7 h-7 text-white" />
            </div>
            <div className="text-left">
              <h1 className="text-2xl font-black text-white tracking-tight">YOU CAN</h1>
              <p className="text-xs text-[#ff5722] font-bold uppercase tracking-wider">Admin Platform</p>
            </div>
          </div>
          <p className="text-sm text-neutral-400">
            Secure administrative access to platform management
          </p>
        </div>

        {/* Login Card */}
        <div className="p-8 rounded-3xl bg-[#1c1c1e] border border-[#2a2a2e] shadow-2xl">
          <h2 className="text-xl font-bold text-white mb-6">Admin Login</h2>

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-400" />
              <p className="text-xs text-red-400">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@youcan.fitness"
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-xl pl-10 pr-4 py-3 text-sm text-white outline-none focus:border-[#ff5722] transition-colors placeholder-neutral-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-xl pl-10 pr-12 py-3 text-sm text-white outline-none focus:border-[#ff5722] transition-colors placeholder-neutral-600"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-neutral-700 bg-neutral-900 text-[#ff5722] focus:ring-[#ff5722]" />
                <span className="text-xs text-neutral-400">Remember me</span>
              </label>
              <button type="button" className="text-xs text-[#ff5722] hover:underline">
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 rounded-2xl bg-[#ff5722] hover:bg-[#ff5722]/90 text-white text-sm font-black tracking-wider uppercase flex items-center justify-center gap-2 transition-all shadow-xl shadow-[#ff5722]/25 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  <span>Login to Admin Panel</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-neutral-800 text-center">
            <p className="text-xs text-neutral-500 mb-2">
              Demo credentials: any email & password
            </p>
            <button
              onClick={() => setCurrentView('home')}
              className="text-xs text-neutral-400 hover:text-white transition-colors"
            >
              ← Back to YOU CAN Platform
            </button>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-6 p-4 rounded-2xl bg-[#1c1c1e]/50 border border-neutral-800">
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-4 h-4 text-[#ff5722] shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-semibold text-white">Security Notice</p>
              <p className="text-[10px] text-neutral-400 mt-1">
                Unauthorized access to this admin panel is prohibited. All actions are logged and monitored.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
