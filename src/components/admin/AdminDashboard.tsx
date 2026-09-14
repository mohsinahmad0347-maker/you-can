import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useFitness } from '../../context/FitnessContext';
import { AdminExerciseForm } from './AdminExerciseForm';

const TABS = ['Overview', 'Users', 'Exercises', 'Workouts', 'Analytics', 'Content', 'Logs', 'System', 'Roles'];

export const AdminDashboard: React.FC = () => {
  const {
    exercises, workouts, adminUsers, activityLogs, systemHealth,
    notifications, carouselSlides, sendAnnouncement,
    addExercise, deleteExercise, updateExercise,
    addWorkout, deleteWorkout,
    toggleUserStatus, logoutAdmin, adminRole,
    updateCarouselSlide
  } = useFitness();

  const [activeTab, setActiveTab] = useState('Overview');
  const [announcement, setAnnouncement] = useState({ title: '', message: '' });
  const [announcementSent, setAnnouncementSent] = useState(false);
  const [exerciseSearch, setExerciseSearch] = useState('');
  const [userSearch, setUserSearch] = useState('');
  const [showExerciseForm, setShowExerciseForm] = useState(false);
  const [editingExercise, setEditingExercise] = useState<any>(null);

  const handleSendAnnouncement = () => {
    if (!announcement.title || !announcement.message) return;
    sendAnnouncement(announcement.title, announcement.message);
    setAnnouncement({ title: '', message: '' });
    setAnnouncementSent(true);
    setTimeout(() => setAnnouncementSent(false), 3000);
  };

  const filteredExercises = exercises.filter(e =>
    e.name.toLowerCase().includes(exerciseSearch.toLowerCase())
  );

  const filteredUsers = adminUsers.filter(u =>
    u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
    u.email.toLowerCase().includes(userSearch.toLowerCase())
  );

  const statCards = [
    { label: 'Total Users', value: adminUsers.length, icon: '👥', color: '#38bdf8' },
    { label: 'Exercises', value: exercises.length, icon: '🏋️', color: '#ff5722' },
    { label: 'Workouts', value: workouts.length, icon: '📋', color: '#a855f7' },
    { label: 'Notifications', value: notifications.length, icon: '🔔', color: '#f59e0b' },
    { label: 'Active Users', value: adminUsers.filter(u => u.status === 'active').length, icon: '✅', color: '#00ff66' },
    { label: 'System Health', value: `${systemHealth.filter(s => s.status === 'Operational').length}/${systemHealth.length}`, icon: '💻', color: '#10b981' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#080808', display: 'flex', flexDirection: 'column', paddingTop: 70 }}>
      {/* Admin Header */}
      <div style={{ background: 'rgba(255,87,34,0.08)', borderBottom: '1px solid rgba(255,87,34,0.2)', padding: '16px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: 'linear-gradient(135deg,#ff5722,#ff8a50)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>🛡️</div>
          <div>
            <h2 style={{ color: '#fff', fontFamily: 'Outfit, sans-serif', margin: 0, fontSize: 20 }}>Admin Panel</h2>
            <span style={{ color: '#ff8a50', fontSize: 12, fontWeight: 600 }}>{adminRole}</span>
          </div>
        </div>
        <button onClick={logoutAdmin} style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)', color: '#ef4444', borderRadius: 10, padding: '8px 20px', cursor: 'pointer', fontWeight: 700 }}>Logout</button>
      </div>

      <div style={{ display: 'flex', flex: 1 }}>
        {/* Sidebar Tabs */}
        <div style={{ width: 200, background: 'rgba(255,255,255,0.02)', borderRight: '1px solid rgba(255,255,255,0.06)', padding: '16px 0', flexShrink: 0 }}>
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                width: '100%', padding: '12px 24px', border: 'none', background: activeTab === tab ? 'rgba(255,87,34,0.15)' : 'transparent',
                color: activeTab === tab ? '#ff5722' : '#888',
                borderRight: activeTab === tab ? '3px solid #ff5722' : '3px solid transparent',
                textAlign: 'left', cursor: 'pointer', fontWeight: activeTab === tab ? 700 : 500, fontSize: 14, transition: 'all .2s'
              }}
            >{tab}</button>
          ))}
        </div>

        {/* Main Content */}
        <div style={{ flex: 1, padding: '32px', overflowY: 'auto' }}>

          {/* OVERVIEW */}
          {activeTab === 'Overview' && (
            <div>
              <h2 style={{ color: '#fff', fontFamily: 'Outfit, sans-serif', marginBottom: 24 }}>📊 Platform Overview</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 16, marginBottom: 32 }}>
                {statCards.map(s => (
                  <div key={s.label} className="glass-panel" style={{ borderRadius: 16, padding: '20px 16px', textAlign: 'center' }}>
                    <div style={{ fontSize: 28 }}>{s.icon}</div>
                    <div style={{ color: s.color, fontSize: 28, fontWeight: 800, fontFamily: 'Outfit, sans-serif', marginTop: 8 }}>{s.value}</div>
                    <div style={{ color: '#666', fontSize: 12, marginTop: 4 }}>{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Announcements */}
              <div className="glass-panel" style={{ borderRadius: 20, padding: 28, marginBottom: 24 }}>
                <h3 style={{ color: '#fff', fontFamily: 'Outfit, sans-serif', marginBottom: 20 }}>📢 Send Announcement</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <input
                    value={announcement.title}
                    onChange={e => setAnnouncement(p => ({ ...p, title: e.target.value }))}
                    placeholder="Announcement title..."
                    style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 10, padding: '12px 16px', color: '#fff', fontSize: 15 }}
                  />
                  <textarea
                    value={announcement.message}
                    onChange={e => setAnnouncement(p => ({ ...p, message: e.target.value }))}
                    placeholder="Message to all users..."
                    rows={3}
                    style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 10, padding: '12px 16px', color: '#fff', fontSize: 14, resize: 'none' }}
                  />
                  <button
                    onClick={handleSendAnnouncement}
                    style={{ background: announcementSent ? 'rgba(0,255,102,0.3)' : 'linear-gradient(135deg,#ff5722,#ff8a50)', border: 'none', borderRadius: 12, padding: '14px 28px', color: '#fff', fontWeight: 700, cursor: 'pointer', alignSelf: 'flex-start', fontSize: 15 }}
                  >{announcementSent ? '✓ Sent!' : '📤 Send to All Users'}</button>
                </div>
              </div>

              {/* System Health */}
              <div className="glass-panel" style={{ borderRadius: 20, padding: 24 }}>
                <h3 style={{ color: '#fff', fontFamily: 'Outfit, sans-serif', marginBottom: 16 }}>💻 System Health</h3>
                <div style={{ display: 'grid', gap: 12 }}>
                  {systemHealth.map(item => (
                    <div key={item.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: 'rgba(255,255,255,0.04)', borderRadius: 12 }}>
                      <div>
                        <div style={{ color: '#e0e0e0', fontWeight: 600 }}>{item.service || item.name}</div>
                        {item.detail && <div style={{ color: '#666', fontSize: 12 }}>{item.detail}</div>}
                      </div>
                      <div style={{
                        padding: '4px 12px',
                        borderRadius: 20,
                        fontSize: 12,
                        fontWeight: 600,
                        background: item.status === 'Operational' ? 'rgba(0,255,102,0.15)' : 'rgba(239,68,68,0.15)',
                        color: item.status === 'Operational' ? '#00ff66' : '#ef4444',
                      }}>
                        {item.status}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* USERS */}
          {activeTab === 'Users' && (
            <div>
              <h2 style={{ color: '#fff', fontFamily: 'Outfit, sans-serif', marginBottom: 24 }}>👥 User Management</h2>
              <input
                value={userSearch}
                onChange={e => setUserSearch(e.target.value)}
                placeholder="🔍 Search users..."
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 12, padding: '12px 18px', color: '#fff', fontSize: 14, width: '100%', boxSizing: 'border-box', marginBottom: 20 }}
              />
              <div style={{ display: 'grid', gap: 12 }}>
                {filteredUsers.map(u => (
                  <div key={u.id} className="glass-panel" style={{ borderRadius: 14, padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                    <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'linear-gradient(135deg,#ff5722,#ff8a50)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: '#fff', fontSize: 18, flexShrink: 0 }}>
                      {u.name.charAt(0)}
                    </div>
                    <div style={{ flex: 1, minWidth: 120 }}>
                      <div style={{ color: '#fff', fontWeight: 700 }}>{u.name}</div>
                      <div style={{ color: '#666', fontSize: 12 }}>{u.email}</div>
                    </div>
                    <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
                      <span style={{ background: 'rgba(168,85,247,0.15)', color: '#a855f7', fontSize: 12, padding: '3px 10px', borderRadius: 20, fontWeight: 600 }}>{u.role}</span>
                      <span style={{
                        background: u.status === 'active' ? 'rgba(0,255,102,0.15)' : 'rgba(239,68,68,0.15)',
                        color: u.status === 'active' ? '#00ff66' : '#ef4444',
                        fontSize: 12, padding: '3px 10px', borderRadius: 20, fontWeight: 600
                      }}>{u.status}</span>
                      <div style={{ color: '#666', fontSize: 12 }}>Last: {u.lastLogin}</div>
                      <button
                        onClick={() => toggleUserStatus(u.id)}
                        style={{
                          background: u.status === 'active' ? 'rgba(239,68,68,0.15)' : 'rgba(0,255,102,0.15)',
                          border: 'none', borderRadius: 8, padding: '6px 14px',
                          color: u.status === 'active' ? '#ef4444' : '#00ff66',
                          cursor: 'pointer', fontWeight: 700, fontSize: 12
                        }}
                      >{u.status === 'active' ? 'Disable' : 'Enable'}</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* EXERCISES */}
          {activeTab === 'Exercises' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <h2 style={{ color: '#fff', fontFamily: 'Outfit, sans-serif', margin: 0 }}>🏋️ Exercise Management</h2>
                <button
                  onClick={() => { setEditingExercise(null); setShowExerciseForm(true); }}
                  style={{ background: 'linear-gradient(135deg,#ff5722,#ff8a50)', border: 'none', borderRadius: 10, padding: '10px 20px', color: '#fff', cursor: 'pointer', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8 }}
                >
                  <Plus style={{ width: 16, height: 16 }} />
                  Add Exercise
                </button>
              </div>
              <input
                value={exerciseSearch}
                onChange={e => setExerciseSearch(e.target.value)}
                placeholder="🔍 Search exercises..."
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 12, padding: '12px 18px', color: '#fff', fontSize: 14, width: '100%', boxSizing: 'border-box', marginBottom: 20 }}
              />
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                      {['Name', 'Category', 'Muscle', 'Difficulty', 'Published', 'Actions'].map(h => (
                        <th key={h} style={{ color: '#888', fontSize: 12, fontWeight: 700, padding: '12px 16px', textAlign: 'left' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredExercises.map((ex, i) => (
                      <tr key={ex.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)' }}>
                        <td style={{ color: '#e0e0e0', padding: '14px 16px', fontWeight: 600 }}>{ex.name}</td>
                        <td style={{ padding: '14px 16px' }}><span style={{ background: 'rgba(255,87,34,0.15)', color: '#ff8a50', fontSize: 12, padding: '3px 10px', borderRadius: 20 }}>{ex.category}</span></td>
                        <td style={{ color: '#888', padding: '14px 16px', fontSize: 13 }}>{ex.primaryMuscle}</td>
                        <td style={{ padding: '14px 16px' }}>
                          <span style={{
                            background: ex.difficulty === 'Beginner' ? 'rgba(0,255,102,0.15)' : ex.difficulty === 'Intermediate' ? 'rgba(245,158,11,0.15)' : 'rgba(239,68,68,0.15)',
                            color: ex.difficulty === 'Beginner' ? '#00ff66' : ex.difficulty === 'Intermediate' ? '#f59e0b' : '#ef4444',
                            fontSize: 11, padding: '3px 10px', borderRadius: 20, fontWeight: 700
                          }}>{ex.difficulty}</span>
                        </td>
                        <td style={{ padding: '14px 16px' }}>
                          <button onClick={() => updateExercise(ex.id, { published: !ex.published })} style={{
                            background: ex.published ? 'rgba(0,255,102,0.15)' : 'rgba(255,255,255,0.08)',
                            border: 'none', borderRadius: 8, padding: '4px 12px', cursor: 'pointer',
                            color: ex.published ? '#00ff66' : '#888', fontSize: 12, fontWeight: 700
                          }}>{ex.published ? '✓ Live' : '○ Draft'}</button>
                        </td>
                        <td style={{ padding: '14px 16px' }}>
                          <button onClick={() => { setEditingExercise(ex); setShowExerciseForm(true); }} style={{ background: 'rgba(59,130,246,0.15)', border: 'none', borderRadius: 8, padding: '6px 12px', cursor: 'pointer', color: '#3b82f6', fontSize: 12, fontWeight: 700, marginRight: 8 }}>Edit</button>
                          <button onClick={() => deleteExercise(ex.id)} style={{ background: 'rgba(239,68,68,0.15)', border: 'none', borderRadius: 8, padding: '6px 12px', cursor: 'pointer', color: '#ef4444', fontSize: 12, fontWeight: 700 }}>Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* WORKOUTS */}
          {activeTab === 'Workouts' && (
            <div>
              <h2 style={{ color: '#fff', fontFamily: 'Outfit, sans-serif', marginBottom: 24 }}>📋 Workout Management</h2>
              <div style={{ display: 'grid', gap: 12 }}>
                {workouts.map(w => (
                  <div key={w.id} className="glass-panel" style={{ borderRadius: 14, padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
                    <div>
                      <div style={{ color: '#fff', fontWeight: 700 }}>{w.name}</div>
                      <div style={{ color: '#888', fontSize: 13 }}>{w.exercises.length} exercises · {w.durationMinutes} min · {w.difficulty}</div>
                    </div>
                    <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                      <span style={{
                        background: w.published ? 'rgba(0,255,102,0.15)' : 'rgba(255,255,255,0.08)',
                        color: w.published ? '#00ff66' : '#888',
                        fontSize: 12, fontWeight: 700, padding: '4px 12px', borderRadius: 20
                      }}>{w.published ? 'Published' : 'Draft'}</span>
                      <button onClick={() => deleteWorkout(w.id)} style={{ background: 'rgba(239,68,68,0.15)', border: 'none', borderRadius: 8, padding: '6px 14px', cursor: 'pointer', color: '#ef4444', fontWeight: 700, fontSize: 13 }}>Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ANALYTICS */}
          {activeTab === 'Analytics' && (
            <div>
              <h2 style={{ color: '#fff', fontFamily: 'Outfit, sans-serif', marginBottom: 24 }}>📈 Platform Analytics</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
                {[
                  { title: 'Daily Active Users', data: [120, 185, 145, 210, 190, 230, 175], color: '#38bdf8' },
                  { title: 'Workouts Completed/Day', data: [45, 78, 62, 95, 88, 102, 71], color: '#00ff66' },
                  { title: 'New Signups/Day', data: [8, 14, 10, 22, 18, 25, 16], color: '#ff5722' },
                  { title: 'Exercise Views/Day', data: [320, 480, 390, 560, 510, 620, 445], color: '#a855f7' },
                ].map(chart => (
                  <div key={chart.title} className="glass-panel" style={{ borderRadius: 20, padding: 24 }}>
                    <h4 style={{ color: '#fff', fontFamily: 'Outfit, sans-serif', marginBottom: 20 }}>{chart.title}</h4>
                    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 80 }}>
                      {chart.data.map((val, i) => {
                        const max = Math.max(...chart.data);
                        return (
                          <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                            <div style={{ width: '100%', height: `${(val / max) * 60}px`, background: chart.color, borderRadius: '4px 4px 0 0', opacity: 0.8, transition: 'all .3s' }} />
                            <span style={{ color: '#555', fontSize: 10 }}>{['M','T','W','T','F','S','S'][i]}</span>
                          </div>
                        );
                      })}
                    </div>
                    <div style={{ marginTop: 12, color: chart.color, fontSize: 18, fontWeight: 800, fontFamily: 'Outfit, sans-serif' }}>
                      {chart.data[chart.data.length - 1].toLocaleString()}
                      <span style={{ color: '#00ff66', fontSize: 13, marginLeft: 8 }}>↑ 12%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CONTENT */}
          {activeTab === 'Content' && (
            <div>
              <h2 style={{ color: '#fff', fontFamily: 'Outfit, sans-serif', marginBottom: 24 }}>🎨 Content Management</h2>
              <h3 style={{ color: '#888', fontSize: 16, marginBottom: 16 }}>Hero Carousel Slides</h3>
              <div style={{ display: 'grid', gap: 14 }}>
                {carouselSlides.map(slide => (
                  <div key={slide.id} className="glass-panel" style={{ borderRadius: 16, padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
                    <div>
                      <div style={{ color: '#fff', fontWeight: 700 }}>{slide.title}</div>
                      <div style={{ color: '#888', fontSize: 13 }}>{slide.subtitle}</div>
                    </div>
                    <div style={{ display: 'flex', gap: 10 }}>
                      <button onClick={() => updateCarouselSlide(slide.id, { active: !slide.active })} style={{
                        background: slide.active ? 'rgba(0,255,102,0.15)' : 'rgba(255,255,255,0.08)',
                        border: 'none', borderRadius: 10, padding: '8px 18px',
                        color: slide.active ? '#00ff66' : '#888',
                        cursor: 'pointer', fontWeight: 700, fontSize: 13
                      }}>{slide.active ? '✓ Active' : '○ Inactive'}</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* LOGS */}
          {activeTab === 'Logs' && (
            <div>
              <h2 style={{ color: '#fff', fontFamily: 'Outfit, sans-serif', marginBottom: 24 }}>📋 Activity Logs</h2>
              <div style={{ display: 'grid', gap: 10 }}>
                {activityLogs.map(log => (
                  <div key={log.id} className="glass-panel" style={{ borderRadius: 12, padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                    <span style={{
                      background: log.status === 'Success' ? 'rgba(0,255,102,0.15)' : log.status === 'Warning' ? 'rgba(245,158,11,0.15)' : 'rgba(59,130,246,0.15)',
                      color: log.status === 'Success' ? '#00ff66' : log.status === 'Warning' ? '#f59e0b' : '#60a5fa',
                      fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 20, flexShrink: 0
                    }}>{log.status}</span>
                    <div style={{ flex: 1, minWidth: 150 }}>
                      <div style={{ color: '#e0e0e0', fontWeight: 600, fontSize: 14 }}>{log.action}</div>
                      <div style={{ color: '#666', fontSize: 12 }}>{log.details}</div>
                    </div>
                    <div style={{ color: '#555', fontSize: 12, flexShrink: 0 }}>{log.adminName} · {log.timestamp}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SYSTEM */}
          {activeTab === 'System' && (
            <div>
              <h2 style={{ color: '#fff', fontFamily: 'Outfit, sans-serif', marginBottom: 24 }}>⚙️ System Settings</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
                {[
                  { title: 'Maintenance Mode', desc: 'Take the platform offline for updates', value: false },
                  { title: 'Registration Open', desc: 'Allow new user sign-ups', value: true },
                  { title: 'Email Notifications', desc: 'Send system emails to users', value: true },
                  { title: 'AI Coach Feature', desc: 'Enable the AI fitness assistant', value: true },
                  { title: 'Analytics Tracking', desc: 'Collect anonymized usage data', value: true },
                  { title: 'Public Exercise Library', desc: 'Allow public access without login', value: false },
                ].map(setting => (
                  <div key={setting.title} className="glass-panel" style={{ borderRadius: 16, padding: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
                    <div>
                      <div style={{ color: '#fff', fontWeight: 600 }}>{setting.title}</div>
                      <div style={{ color: '#666', fontSize: 12, marginTop: 4 }}>{setting.desc}</div>
                    </div>
                    <div style={{
                      width: 48, height: 26, borderRadius: 13, cursor: 'pointer', position: 'relative',
                      background: setting.value ? 'linear-gradient(135deg,#ff5722,#ff8a50)' : 'rgba(255,255,255,0.12)',
                      flexShrink: 0
                    }}>
                      <div style={{ position: 'absolute', width: 20, height: 20, borderRadius: '50%', background: '#fff', top: 3, left: setting.value ? 24 : 4, transition: 'left .2s' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ROLES */}
          {activeTab === 'Roles' && (
            <div>
              <h2 style={{ color: '#fff', fontFamily: 'Outfit, sans-serif', marginBottom: 24 }}>🔐 Roles & Permissions</h2>
              <div style={{ display: 'grid', gap: 20 }}>
                {[
                  { role: 'Super Admin', color: '#ff5722', perms: ['All access', 'User management', 'Content management', 'System settings', 'Analytics', 'Role management'] },
                  { role: 'Content Manager', color: '#a855f7', perms: ['Exercise management', 'Workout management', 'Content editing', 'View analytics'] },
                  { role: 'Trainer', color: '#38bdf8', perms: ['View exercises', 'Create workouts', 'View users assigned', 'Log activities'] },
                  { role: 'Support', color: '#10b981', perms: ['View users', 'View activity logs', 'Send announcements', 'View reports'] },
                ].map(r => (
                  <div key={r.role} className="glass-panel" style={{ borderRadius: 18, padding: 24 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                      <div style={{ width: 40, height: 40, borderRadius: 12, background: `${r.color}22`, border: `1px solid ${r.color}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>🔐</div>
                      <span style={{ color: r.color, fontWeight: 800, fontSize: 18, fontFamily: 'Outfit, sans-serif' }}>{r.role}</span>
                    </div>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                      {r.perms.map(p => (
                        <span key={p} style={{ background: `${r.color}15`, color: r.color, fontSize: 13, padding: '5px 14px', borderRadius: 20, fontWeight: 600 }}>{p}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Exercise Form Modal */}
          {showExerciseForm && (
            <AdminExerciseForm
              onClose={() => { setShowExerciseForm(false); setEditingExercise(null); }}
              exercise={editingExercise}
            />
          )}
        </div>
      </div>
    </div>
  );
};
