import React, { useState } from 'react';

const RECOVERY_ROUTINES = [
  {
    id: 'r1', title: 'Morning Mobility Flow', duration: '15 min', category: 'Mobility', icon: '🌅',
    exercises: [
      { name: 'Cat-Cow', sets: '2 min', desc: 'Spine articulation, breath-linked' },
      { name: "World's Greatest Stretch", sets: '5 reps/side', desc: 'Hip flexor, thoracic, hamstring combo' },
      { name: 'Hip 90/90 Stretch', sets: '90 sec/side', desc: 'Deep hip external rotation' },
      { name: 'Thoracic Rotation', sets: '10 reps/side', desc: 'Upper back mobility' },
      { name: 'Downward Dog to Cobra', sets: '8 reps', desc: 'Full spine wave' },
    ]
  },
  {
    id: 'r2', title: 'Post-Workout Cooldown', duration: '10 min', category: 'Cooldown', icon: '❄️',
    exercises: [
      { name: 'Doorway Pec Stretch', sets: '60 sec/side', desc: 'Post-pressing anterior chest stretch' },
      { name: 'Pigeon Pose', sets: '2 min/side', desc: 'Deep hip flexor & glute release' },
      { name: 'Standing Quad Stretch', sets: '45 sec/side', desc: 'Anterior thigh' },
      { name: "Child's Pose", sets: '2 min', desc: 'Lat and lower back decompression' },
    ]
  },
  {
    id: 'r3', title: 'Foam Rolling Protocol', duration: '12 min', category: 'Recovery', icon: '🔵',
    exercises: [
      { name: 'IT Band Roll', sets: '60 sec/side', desc: 'Lateral quad and hip tightness' },
      { name: 'Thoracic Spine Roll', sets: '90 sec', desc: 'Upper back tension release' },
      { name: 'Lat Roll', sets: '45 sec/side', desc: 'Side body compression release' },
      { name: 'Calf SMR', sets: '60 sec/side', desc: 'Gastrocnemius and soleus' },
      { name: 'Glute Roll', sets: '60 sec/side', desc: 'Piriformis and glute med' },
    ]
  },
  {
    id: 'r4', title: 'Active Recovery Day', duration: '30 min', category: 'Active', icon: '🚶',
    exercises: [
      { name: 'Easy Walk or Bike', sets: '15 min', desc: 'Low-intensity cardiovascular movement' },
      { name: 'Band Pull-Aparts', sets: '3×20', desc: 'Rotator cuff health and scapula retraction' },
      { name: 'Glute Bridge', sets: '3×15', desc: 'Posterior chain activation without load' },
      { name: 'Dead Bug', sets: '3×10', desc: 'Core stability and breathing pattern' },
      { name: 'Breathing Work', sets: '5 min', desc: '4-7-8 breathing for nervous system reset' },
    ]
  },
  {
    id: 'r5', title: 'Yoga for Athletes', duration: '25 min', category: 'Yoga', icon: '🧘',
    exercises: [
      { name: 'Sun Salutation A', sets: '3 rounds', desc: 'Full body warm-up flow' },
      { name: 'Warrior I & II', sets: '90 sec/side', desc: 'Hip, leg, and shoulder opener' },
      { name: 'Lizard Pose', sets: '2 min/side', desc: 'Deep hip flexor stretch' },
      { name: 'Supine Twist', sets: '90 sec/side', desc: 'Thoracic and lumbar rotation' },
      { name: 'Savasana', sets: '5 min', desc: 'Full body relaxation and integration' },
    ]
  },
];

const SLEEP_TIPS = [
  { icon: '🌡️', tip: 'Keep bedroom at 18–20°C for optimal sleep quality' },
  { icon: '📵', tip: 'No screens 60 min before bed — blue light disrupts melatonin' },
  { icon: '🥛', tip: 'Casein protein before bed supports overnight muscle repair' },
  { icon: '💤', tip: 'Aim for 7–9 hours — most muscle growth happens during deep sleep' },
  { icon: '⏰', tip: 'Consistent sleep/wake schedule resets your circadian rhythm' },
  { icon: '🛁', tip: 'Hot bath 1–2 hrs before bed raises then drops body temperature' },
];

export const RecoveryPage: React.FC = () => {
  const [selectedRoutine, setSelectedRoutine] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Mobility', 'Cooldown', 'Recovery', 'Active', 'Yoga'];
  const filtered = activeCategory === 'All' ? RECOVERY_ROUTINES : RECOVERY_ROUTINES.filter(r => r.category === activeCategory);
  const active = RECOVERY_ROUTINES.find(r => r.id === selectedRoutine);

  return (
    <div style={{ minHeight: '100vh', background: '#0d0d0d', padding: '100px 24px 40px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <h1 style={{ color: '#fff', fontFamily: 'Outfit, sans-serif', fontSize: 32, fontWeight: 800, marginBottom: 8 }}>🌿 Recovery & Mobility</h1>
        <p style={{ color: '#666', marginBottom: 32 }}>Train smart, recover stronger</p>

        {/* Recovery Score */}
        <div className="glass-panel" style={{ borderRadius: 20, padding: 28, marginBottom: 28, display: 'flex', gap: 40, flexWrap: 'wrap', alignItems: 'center', background: 'linear-gradient(135deg, rgba(0,255,102,0.06), rgba(56,189,248,0.06))' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 72, fontWeight: 900, fontFamily: 'Outfit, sans-serif', background: 'linear-gradient(135deg,#00ff66,#38bdf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>84</div>
            <div style={{ color: '#888', fontSize: 14 }}>Recovery Score</div>
          </div>
          <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 16 }}>
            {[
              { label: 'Sleep Quality', value: 87, color: '#38bdf8' },
              { label: 'HRV', value: 72, color: '#00ff66' },
              { label: 'Soreness', value: 60, color: '#f59e0b' },
              { label: 'Stress Level', value: 78, color: '#a855f7' },
            ].map(metric => (
              <div key={metric.label}>
                <div style={{ color: '#888', fontSize: 12, marginBottom: 6 }}>{metric.label}</div>
                <div style={{ height: 6, background: 'rgba(255,255,255,0.08)', borderRadius: 100 }}>
                  <div style={{ width: `${metric.value}%`, height: '100%', background: metric.color, borderRadius: 100 }} />
                </div>
                <div style={{ color: metric.color, fontSize: 13, fontWeight: 700, marginTop: 4 }}>{metric.value}%</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: selectedRoutine ? '1fr 380px' : '1fr', gap: 24 }}>
          {/* Left: Routines */}
          <div>
            {/* Category Filter */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
              {categories.map(cat => (
                <button key={cat} onClick={() => setActiveCategory(cat)} style={{
                  padding: '8px 18px', borderRadius: 20, border: 'none', cursor: 'pointer',
                  background: activeCategory === cat ? 'linear-gradient(135deg,#00ff66,#10b981)' : 'rgba(255,255,255,0.06)',
                  color: activeCategory === cat ? '#000' : '#888',
                  fontWeight: activeCategory === cat ? 700 : 500, fontSize: 13, transition: 'all .2s'
                }}>{cat}</button>
              ))}
            </div>

            <div style={{ display: 'grid', gap: 16 }}>
              {filtered.map(routine => (
                <div
                  key={routine.id}
                  onClick={() => setSelectedRoutine(routine.id === selectedRoutine ? null : routine.id)}
                  className="glass-panel"
                  style={{
                    borderRadius: 18, padding: 24, cursor: 'pointer', transition: 'all .3s',
                    border: selectedRoutine === routine.id ? '1px solid rgba(0,255,102,0.4)' : '1px solid rgba(255,255,255,0.06)',
                    background: selectedRoutine === routine.id ? 'rgba(0,255,102,0.06)' : 'rgba(28,28,30,0.75)'
                  }}
                >
                  <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                    <div style={{ fontSize: 36 }}>{routine.icon}</div>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ color: '#fff', fontFamily: 'Outfit, sans-serif', margin: '0 0 6px' }}>{routine.title}</h3>
                      <div style={{ display: 'flex', gap: 10 }}>
                        <span style={{ color: '#888', fontSize: 13 }}>⏱️ {routine.duration}</span>
                        <span style={{ background: 'rgba(0,255,102,0.15)', color: '#00ff66', fontSize: 12, padding: '2px 10px', borderRadius: 20, fontWeight: 600 }}>{routine.category}</span>
                      </div>
                    </div>
                    <div style={{ color: '#444', fontSize: 24 }}>{selectedRoutine === routine.id ? '▼' : '›'}</div>
                  </div>

                  {selectedRoutine === routine.id && (
                    <div style={{ marginTop: 20, borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 20 }}>
                      {routine.exercises.map((ex, i) => (
                        <div key={i} style={{ display: 'flex', gap: 16, padding: '12px 0', borderBottom: i < routine.exercises.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                          <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(0,255,102,0.15)', color: '#00ff66', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 14, flexShrink: 0 }}>{i + 1}</div>
                          <div>
                            <div style={{ color: '#e0e0e0', fontWeight: 600 }}>{ex.name} <span style={{ color: '#00ff66', fontSize: 13 }}>— {ex.sets}</span></div>
                            <div style={{ color: '#666', fontSize: 13 }}>{ex.desc}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right: Sleep Tips (when no routine selected) */}
          {!selectedRoutine && (
            <div style={{ display: 'none' }} />
          )}
        </div>

        {/* Sleep & Recovery Tips */}
        <div className="glass-panel" style={{ borderRadius: 20, padding: 28, marginTop: 28 }}>
          <h3 style={{ color: '#fff', fontFamily: 'Outfit, sans-serif', marginBottom: 20 }}>😴 Sleep & Recovery Science</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 14 }}>
            {SLEEP_TIPS.map((tip, i) => (
              <div key={i} style={{ display: 'flex', gap: 14, padding: '16px 18px', background: 'rgba(255,255,255,0.04)', borderRadius: 14 }}>
                <div style={{ fontSize: 24, flexShrink: 0 }}>{tip.icon}</div>
                <div style={{ color: '#ccc', fontSize: 14, lineHeight: 1.5 }}>{tip.tip}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
