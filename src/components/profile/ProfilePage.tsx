import React, { useState } from 'react';
import type { DifficultyLevel, LocationType, EquipmentType } from '../../types';
import { useFitness } from '../../context/FitnessContext';

const ACHIEVEMENT_LIST = [
  { id: 'a1', icon: '🔥', title: 'First Workout', desc: 'Complete your very first workout', unlocked: true },
  { id: 'a2', icon: '💪', title: 'Iron Will', desc: 'Complete 10 workouts', unlocked: true },
  { id: 'a3', icon: '🏆', title: 'Centurion', desc: 'Complete 100 workouts', unlocked: false },
  { id: 'a4', icon: '⚡', title: 'Speed Demon', desc: 'Complete a workout under 20 min', unlocked: true },
  { id: 'a5', icon: '🌅', title: 'Early Bird', desc: 'Workout before 7 AM', unlocked: false },
  { id: 'a6', icon: '🦁', title: 'Consistency King', desc: 'Maintain a 30-day streak', unlocked: false },
  { id: 'a7', icon: '🎯', title: 'Goal Crusher', desc: 'Complete 5 fitness goals', unlocked: true },
  { id: 'a8', icon: '🥇', title: 'PR Machine', desc: 'Log 20 personal records', unlocked: false },
  { id: 'a9', icon: '🔩', title: 'Iron Man', desc: 'Lift over 10,000 kg total', unlocked: false },
  { id: 'a10', icon: '🌟', title: 'All-Rounder', desc: 'Try every exercise category', unlocked: true },
  { id: 'a11', icon: '🧘', title: 'Recovery Pro', desc: 'Complete 10 mobility sessions', unlocked: false },
  { id: 'a12', icon: '👑', title: 'Legend', desc: 'Reach 10,000 points', unlocked: false },
];

export const ProfilePage: React.FC = () => {
  const { userProfile, personalRecords, updateUserProfile } = useFitness();
  const [activeTab, setActiveTab] = useState<'overview' | 'prs' | 'achievements' | 'settings'>('overview');
  const [editMode, setEditMode] = useState(false);
  const [editForm, setEditForm] = useState({ name: userProfile.name, bio: userProfile.bio || '' });

  const levelProgress = (userProfile.points % 1000) / 10;
  const currentLevel = Math.floor(userProfile.points / 1000) + 1;

  const handleSave = () => {
    updateUserProfile({ name: editForm.name, bio: editForm.bio });
    setEditMode(false);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0d0d0d', padding: '100px 24px 40px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>

        {/* Profile Header */}
        <div className="glass-panel" style={{ borderRadius: 24, padding: 32, marginBottom: 24, display: 'flex', gap: 32, alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative' }}>
            <div style={{
              width: 110, height: 110, borderRadius: '50%',
              background: 'linear-gradient(135deg, #ff5722, #ff8a50)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 48, fontWeight: 900, color: '#fff',
              boxShadow: '0 0 40px rgba(255,87,34,0.45)',
              border: '3px solid rgba(255,87,34,0.4)',
              flexShrink: 0
            }}>
              {userProfile.name.charAt(0).toUpperCase()}
            </div>
            <div style={{
              position: 'absolute', bottom: 4, right: 4,
              background: '#00ff66', width: 18, height: 18, borderRadius: '50%',
              border: '3px solid #0d0d0d'
            }} />
          </div>

          <div style={{ flex: 1, minWidth: 200 }}>
            {editMode ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <input
                  value={editForm.name}
                  onChange={e => setEditForm(p => ({ ...p, name: e.target.value }))}
                  style={{
                    background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,87,34,0.4)',
                    borderRadius: 10, padding: '10px 14px', color: '#fff', fontSize: 20, fontWeight: 700,
                    fontFamily: 'Outfit, sans-serif'
                  }}
                />
                <textarea
                  value={editForm.bio}
                  onChange={e => setEditForm(p => ({ ...p, bio: e.target.value }))}
                  placeholder="Write your bio..."
                  style={{
                    background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,87,34,0.4)',
                    borderRadius: 10, padding: '10px 14px', color: '#fff', fontSize: 14,
                    resize: 'none', minHeight: 60
                  }}
                />
                <div style={{ display: 'flex', gap: 8 }}>
                  <button onClick={handleSave} style={{ background: 'linear-gradient(135deg,#ff5722,#ff8a50)', border: 'none', borderRadius: 8, padding: '8px 20px', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>Save</button>
                  <button onClick={() => setEditMode(false)} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: 8, padding: '8px 20px', color: '#e0e0e0', cursor: 'pointer' }}>Cancel</button>
                </div>
              </div>
            ) : (
              <>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <h1 style={{ color: '#fff', fontSize: 28, fontFamily: 'Outfit, sans-serif', fontWeight: 800, margin: 0 }}>{userProfile.name}</h1>
                  <span style={{ background: 'linear-gradient(135deg,#ff5722,#ff8a50)', padding: '3px 12px', borderRadius: 20, fontSize: 12, fontWeight: 700, color: '#fff' }}>Lv. {currentLevel}</span>
                </div>
                <p style={{ color: '#888', margin: '6px 0 10px', fontSize: 14 }}>{userProfile.bio || 'No bio yet — add one to personalize your profile.'}</p>
                <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                  <span style={{ color: '#ccc', fontSize: 13 }}>🎯 {userProfile.fitnessGoal}</span>
                  <span style={{ color: '#ccc', fontSize: 13 }}>⚡ {userProfile.activityLevel}</span>
                  <span style={{ color: '#ccc', fontSize: 13 }}>🧬 {userProfile.gender} · {userProfile.age} yrs</span>
                </div>
              </>
            )}
          </div>

          {!editMode && (
            <button onClick={() => setEditMode(true)} style={{
              background: 'rgba(255,87,34,0.15)', border: '1px solid rgba(255,87,34,0.3)',
              borderRadius: 12, padding: '12px 24px', color: '#ff5722', fontWeight: 700,
              cursor: 'pointer', fontSize: 14, transition: 'all .2s'
            }}>✏️ Edit Profile</button>
          )}
        </div>

        {/* Level Bar */}
        <div className="glass-panel" style={{ borderRadius: 16, padding: '16px 24px', marginBottom: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ color: '#ff5722', fontWeight: 700, fontFamily: 'Outfit, sans-serif' }}>Level {currentLevel} — {userProfile.points.toLocaleString()} XP</span>
            <span style={{ color: '#888', fontSize: 13 }}>{1000 - (userProfile.points % 1000)} XP to Level {currentLevel + 1}</span>
          </div>
          <div style={{ height: 8, background: 'rgba(255,255,255,0.08)', borderRadius: 100, overflow: 'hidden' }}>
            <div style={{ width: `${levelProgress}%`, height: '100%', background: 'linear-gradient(90deg,#ff5722,#ff8a50)', borderRadius: 100, transition: 'width 1s ease' }} />
          </div>
        </div>

        {/* Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 16, marginBottom: 24 }}>
          {[
            { label: 'Workouts', value: userProfile.totalWorkouts, icon: '🏋️', color: '#ff5722' },
            { label: 'Active Minutes', value: `${userProfile.activeMinutes.toLocaleString()}m`, icon: '⏱️', color: '#00ff66' },
            { label: 'Streak', value: `${userProfile.streakDays}d`, icon: '🔥', color: '#f59e0b' },
            { label: 'Calories Burned', value: `${(userProfile.totalWorkouts * 380).toLocaleString()}`, icon: '🔥', color: '#ef4444' },
            { label: 'PRs Set', value: personalRecords.length, icon: '🏆', color: '#a855f7' },
            { label: 'Points', value: userProfile.points.toLocaleString(), icon: '⭐', color: '#38bdf8' },
          ].map((stat) => (
            <div key={stat.label} className="glass-panel" style={{ borderRadius: 16, padding: '20px 16px', textAlign: 'center' }}>
              <div style={{ fontSize: 26, marginBottom: 8 }}>{stat.icon}</div>
              <div style={{ color: stat.color, fontSize: 24, fontWeight: 800, fontFamily: 'Outfit, sans-serif' }}>{stat.value}</div>
              <div style={{ color: '#666', fontSize: 12, marginTop: 4 }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 24, background: 'rgba(255,255,255,0.04)', padding: 6, borderRadius: 14, width: 'fit-content', flexWrap: 'wrap' }}>
          {(['overview', 'prs', 'achievements', 'settings'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '10px 20px', borderRadius: 10, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 14, transition: 'all .2s',
                background: activeTab === tab ? 'linear-gradient(135deg,#ff5722,#ff8a50)' : 'transparent',
                color: activeTab === tab ? '#fff' : '#888'
              }}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
            {/* Body Stats */}
            <div className="glass-panel" style={{ borderRadius: 20, padding: 24 }}>
              <h3 style={{ color: '#fff', marginBottom: 20, fontFamily: 'Outfit, sans-serif' }}>📊 Body Stats</h3>
              {[
                { label: 'Height', value: `${userProfile.height} cm` },
                { label: 'Weight', value: `${userProfile.weight} kg` },
                { label: 'Goal Weight', value: `${userProfile.goalWeight || '--'} kg` },
                { label: 'BMI', value: userProfile.weight && userProfile.height ? (userProfile.weight / ((userProfile.height / 100) ** 2)).toFixed(1) : '--' },
              ].map(item => (
                <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <span style={{ color: '#888', fontSize: 14 }}>{item.label}</span>
                  <span style={{ color: '#e0e0e0', fontWeight: 600 }}>{item.value}</span>
                </div>
              ))}
            </div>

            {/* Training Preferences */}
            <div className="glass-panel" style={{ borderRadius: 20, padding: 24 }}>
              <h3 style={{ color: '#fff', marginBottom: 20, fontFamily: 'Outfit, sans-serif' }}>⚙️ Training Preferences</h3>
              {[
                { label: 'Fitness Goal', value: userProfile.fitnessGoal },
                { label: 'Activity Level', value: userProfile.activityLevel },
                { label: 'Workout Duration', value: `${userProfile.preferredDuration || 45} min` },
                { label: 'Days per Week', value: `${userProfile.workoutsPerWeek || 4} days` },
                { label: 'Equipment', value: (userProfile.equipment || ['Barbell', 'Dumbbells']).join(', ') },
              ].map(item => (
                <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.06)', flexWrap: 'wrap', gap: 8 }}>
                  <span style={{ color: '#888', fontSize: 14 }}>{item.label}</span>
                  <span style={{ color: '#e0e0e0', fontWeight: 600, fontSize: 13 }}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'prs' && (
          <div className="glass-panel" style={{ borderRadius: 20, padding: 24 }}>
            <h3 style={{ color: '#fff', marginBottom: 20, fontFamily: 'Outfit, sans-serif' }}>🏆 Personal Records</h3>
            {personalRecords.length === 0 ? (
              <p style={{ color: '#666', textAlign: 'center', padding: 40 }}>No personal records yet. Start lifting!</p>
            ) : (
              <div style={{ display: 'grid', gap: 12 }}>
                {personalRecords.map(pr => (
                  <div key={pr.id} style={{
                    display: 'flex', alignItems: 'center', gap: 16, padding: '16px 20px',
                    background: 'rgba(255,87,34,0.06)', borderRadius: 14, border: '1px solid rgba(255,87,34,0.15)'
                  }}>
                    <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'linear-gradient(135deg,#ff5722,#ff8a50)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>🏅</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ color: '#fff', fontWeight: 700 }}>{pr.exerciseName}</div>
                      <div style={{ color: '#888', fontSize: 12 }}>{pr.date}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ color: '#ff5722', fontSize: 22, fontWeight: 800, fontFamily: 'Outfit, sans-serif' }}>{pr.value} {pr.unit}</div>
                      <div style={{ color: '#888', fontSize: 12 }}>{pr.category}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'achievements' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 }}>
            {ACHIEVEMENT_LIST.map(ach => (
              <div key={ach.id} className="glass-panel" style={{
                borderRadius: 16, padding: 20, textAlign: 'center',
                opacity: ach.unlocked ? 1 : 0.4,
                border: ach.unlocked ? '1px solid rgba(255,87,34,0.3)' : '1px solid rgba(255,255,255,0.06)',
                transition: 'all .3s'
              }}>
                <div style={{ fontSize: 40, marginBottom: 10, filter: ach.unlocked ? 'none' : 'grayscale(100%)' }}>{ach.icon}</div>
                <div style={{ color: ach.unlocked ? '#fff' : '#555', fontWeight: 700, marginBottom: 4 }}>{ach.title}</div>
                <div style={{ color: '#666', fontSize: 12 }}>{ach.desc}</div>
                {ach.unlocked && (
                  <div style={{ marginTop: 10, background: 'rgba(0,255,102,0.15)', color: '#00ff66', fontSize: 11, fontWeight: 700, borderRadius: 20, padding: '3px 10px', display: 'inline-block' }}>✓ UNLOCKED</div>
                )}
              </div>
            ))}
          </div>
        )}

        {activeTab === 'settings' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
            <div className="glass-panel" style={{ borderRadius: 20, padding: 24 }}>
              <h3 style={{ color: '#fff', marginBottom: 20, fontFamily: 'Outfit, sans-serif' }}>🔔 Notification Preferences</h3>
              {['Workout Reminders', 'Goal Updates', 'New Content', 'Streak Alerts', 'PR Celebrations'].map(item => (
                <div key={item} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <span style={{ color: '#e0e0e0', fontSize: 14 }}>{item}</span>
                  <div style={{
                    width: 44, height: 24, borderRadius: 12, background: 'linear-gradient(135deg,#ff5722,#ff8a50)',
                    position: 'relative', cursor: 'pointer'
                  }}>
                    <div style={{ position: 'absolute', right: 3, top: 3, width: 18, height: 18, borderRadius: '50%', background: '#fff' }} />
                  </div>
                </div>
              ))}
            </div>

            <div className="glass-panel" style={{ borderRadius: 20, padding: 24 }}>
              <h3 style={{ color: '#fff', marginBottom: 20, fontFamily: 'Outfit, sans-serif' }}>🔒 Privacy & Account</h3>
              {[
                { label: 'Public Profile', value: 'On' },
                { label: 'Share Workouts', value: 'Friends only' },
                { label: 'Data Export', value: 'Download' },
                { label: 'Account Deletion', value: 'Request' },
              ].map(item => (
                <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <span style={{ color: '#e0e0e0', fontSize: 14 }}>{item.label}</span>
                  <button style={{ background: 'rgba(255,255,255,0.08)', border: 'none', color: '#ccc', borderRadius: 8, padding: '6px 14px', cursor: 'pointer', fontSize: 13 }}>{item.value}</button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
