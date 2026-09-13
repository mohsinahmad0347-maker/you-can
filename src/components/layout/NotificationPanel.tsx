import React from 'react';
import { 
  Bell, 
  X, 
  CheckCheck, 
  Trash2, 
  Flame, 
  Trophy, 
  Megaphone, 
  Clock, 
  Sparkles 
} from 'lucide-react';
import { useFitness } from '../../context/FitnessContext';

export const NotificationPanel: React.FC = () => {
  const { 
    isNotificationOpen, 
    setIsNotificationOpen, 
    notifications, 
    markNotificationAsRead, 
    clearAllNotifications 
  } = useFitness();

  if (!isNotificationOpen) return null;

  const getIcon = (type: string) => {
    switch (type) {
      case 'announcement':
        return <Megaphone className="w-4 h-4 text-[#ff5722]" />;
      case 'milestone':
        return <Trophy className="w-4 h-4 text-amber-400" />;
      case 'reminder':
        return <Clock className="w-4 h-4 text-[#00ff66]" />;
      default:
        return <Sparkles className="w-4 h-4 text-blue-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden select-none">
      {/* Backdrop */}
      <div 
        onClick={() => setIsNotificationOpen(false)}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#1c1c1e] border-l border-[#2a2a2e] shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-[#2a2a2e] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-[#2a2a2a] flex items-center justify-center text-[#ff5722]">
                <Bell className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Notifications</h3>
                <p className="text-[11px] text-neutral-400">
                  {notifications.filter(n => !n.read).length} unread updates
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {notifications.length > 0 && (
                <button
                  onClick={clearAllNotifications}
                  className="p-1.5 rounded-lg text-neutral-400 hover:text-red-400 hover:bg-neutral-800 transition-colors"
                  title="Clear all notifications"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={() => setIsNotificationOpen(false)}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* List of Notifications */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {notifications.length === 0 ? (
              <div className="py-16 text-center">
                <div className="w-12 h-12 rounded-2xl bg-neutral-800/80 mx-auto flex items-center justify-center text-neutral-500 mb-3">
                  <Bell className="w-6 h-6" />
                </div>
                <p className="text-sm font-semibold text-neutral-300">All caught up!</p>
                <p className="text-xs text-neutral-500 mt-1">
                  You have no pending notifications or reminders.
                </p>
              </div>
            ) : (
              notifications.map(notif => (
                <div
                  key={notif.id}
                  onClick={() => markNotificationAsRead(notif.id)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer relative group ${
                    notif.read
                      ? 'bg-neutral-900/40 border-neutral-800/80 text-neutral-400'
                      : 'bg-neutral-800/80 border-[#ff5722]/30 text-white shadow-md'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-xl bg-neutral-900 border border-neutral-800 shrink-0 mt-0.5">
                      {getIcon(notif.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <p className={`text-xs font-bold truncate ${notif.read ? 'text-neutral-300' : 'text-white'}`}>
                          {notif.title}
                        </p>
                        <span className="text-[10px] text-neutral-500 shrink-0">
                          {notif.date}
                        </span>
                      </div>
                      <p className="text-xs text-neutral-400 mt-1 line-clamp-2 leading-relaxed">
                        {notif.message}
                      </p>
                    </div>
                  </div>

                  {!notif.read && (
                    <span className="absolute top-3 right-3 w-2 h-2 rounded-full bg-[#ff5722]" />
                  )}
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="p-3 border-t border-[#2a2a2e] bg-neutral-900/50 flex items-center justify-between text-xs text-neutral-400">
            <span>YOU CAN Notifications</span>
            <span className="text-[11px] text-[#00ff66] font-semibold">Real-Time Sync</span>
          </div>
        </div>
      </div>
    </div>
  );
};
