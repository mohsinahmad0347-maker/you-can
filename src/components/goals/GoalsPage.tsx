import React, { useState } from 'react';
import { useFitness } from '../../context/FitnessContext';

export const GoalsPage: React.FC = () => {
  const { goals, createGoal, toggleGoal } = useFitness();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    title: '', category: 'Strength', target: 100, current: 0, unit: 'kg', deadline: '', priority: 'medium' as 'high' | 'medium' | 'low'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createGoal(form);
    setForm({ title: '', category: 'Strength', target: 100, current: 0, unit: 'kg', deadline: '', priority: 'medium' });
    setShowForm(false);
  };

  const active = goals.filter(g => !g.completed);
  const completed = goals.filter(g => g.completed);

  return (
    <div style={{ minHeight: '100vh', background: '#0d0d0d', padding: '100px 24px 40px' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32, flexWrap: 'wrap', gap: 16 }}>
          <div>
            <h1 style={{ color: '#fff', fontFamily: 'Outfit, sans-serif', fontSize: 32, fontWeight: 800, margin: 0 }}>🎯 Fitness Goals</h1>
            <p style={{ color: '#666', margin: '8px 0 0' }}>{active.length} active · {completed.length} completed</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            style={{ background: 'linear-gradient(135deg,#ff5722,#ff8a50)', border: 'none', borderRadius: 14, padding: '14px 28px', color: '#fff', fontWeight: 700, cursor: 'pointer', fontSize: 15 }}
          >+ New Goal</button>
        </div>

        {/* New Goal Form */}
        {showForm && (
          <div className="glass-panel" style={{ borderRadius: 20, padding: 28, marginBottom: 28, border: '1px solid rgba(255,87,34,0.3)' }}>
            <h3 style={{ color: '#ff5722', fontFamily: 'Outfit, sans-serif', marginBottom: 20 }}>Create New Goal</h3>
            <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ color: '#888', fontSize: 13, display: 'block', marginBottom: 6 }}>Goal Title</label>
                <input
                  required value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
                  placeholder="e.g. Bench Press 100kg"
                  style={{ width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 10, padding: '12px 16px', color: '#fff', fontSize: 15, boxSizing: 'border-box' }}
                />
              </div>
              {[
                { label: 'Category', key: 'category', type: 'select', options: ['Strength', 'Cardio', 'Weight', 'Endurance', 'Flexibility', 'Habit'] },
                { label: 'Target Value', key: 'target', type: 'number' },
                { label: 'Current Value', key: 'current', type: 'number' },
                { label: 'Unit', key: 'unit', type: 'text', placeholder: 'kg, km, min…' },
                { label: 'Deadline', key: 'deadline', type: 'date' },
                { label: 'Priority', key: 'priority', type: 'select', options: ['high', 'medium', 'low'] },
              ].map(field => (
                <div key={field.key}>
                  <label style={{ color: '#888', fontSize: 13, display: 'block', marginBottom: 6 }}>{field.label}</label>
                  {field.type === 'select' ? (
                    <select
                      value={(form as any)[field.key]}
                      onChange={e => setForm(p => ({ ...p, [field.key]: e.target.value }))}
                      style={{ width: '100%', background: '#1c1c1e', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 10, padding: '12px 16px', color: '#fff', fontSize: 14 }}
                    >
                      {field.options!.map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                  ) : (
                    <input
                      type={field.type}
                      value={(form as any)[field.key]}
                      onChange={e => setForm(p => ({ ...p, [field.key]: field.type === 'number' ? Number(e.target.value) : e.target.value }))}
                      placeholder={(field as any).placeholder}
                      style={{ width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 10, padding: '12px 16px', color: '#fff', fontSize: 14, boxSizing: 'border-box' }}
                    />
                  )}
                </div>
              ))}
              <div style={{ gridColumn: '1 / -1', display: 'flex', gap: 12, marginTop: 8 }}>
                <button type="submit" style={{ background: 'linear-gradient(135deg,#ff5722,#ff8a50)', border: 'none', borderRadius: 12, padding: '14px 32px', color: '#fff', fontWeight: 700, cursor: 'pointer', fontSize: 15 }}>Create Goal</button>
                <button type="button" onClick={() => setShowForm(false)} style={{ background: 'rgba(255,255,255,0.08)', border: 'none', borderRadius: 12, padding: '14px 24px', color: '#ccc', cursor: 'pointer' }}>Cancel</button>
              </div>
            </form>
          </div>
        )}

        {/* Active Goals */}
        {active.length > 0 && (
          <>
            <h2 style={{ color: '#fff', fontFamily: 'Outfit, sans-serif', fontSize: 18, marginBottom: 16 }}>🔥 Active Goals</h2>
            <div style={{ display: 'grid', gap: 16, marginBottom: 32 }}>
              {active.map(goal => {
                const progress = Math.min(100, Math.round((goal.current / goal.target) * 100));
                const priorityColor = goal.priority === 'high' ? '#ef4444' : goal.priority === 'medium' ? '#f59e0b' : '#00ff66';
                return (
                  <div key={goal.id} className="glass-panel" style={{ borderRadius: 18, padding: 24, border: '1px solid rgba(255,255,255,0.06)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16, flexWrap: 'wrap', gap: 10 }}>
                      <div>
                        <h3 style={{ color: '#fff', fontFamily: 'Outfit, sans-serif', margin: '0 0 6px' }}>{goal.title}</h3>
                        <div style={{ display: 'flex', gap: 10 }}>
                          <span style={{ background: 'rgba(255,87,34,0.15)', color: '#ff8a50', fontSize: 12, padding: '2px 10px', borderRadius: 20, fontWeight: 600 }}>{goal.category}</span>
                          <span style={{ background: `${priorityColor}22`, color: priorityColor, fontSize: 12, padding: '2px 10px', borderRadius: 20, fontWeight: 600 }}>{goal.priority?.toUpperCase()} PRIORITY</span>
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ color: '#ff5722', fontSize: 24, fontWeight: 800, fontFamily: 'Outfit, sans-serif' }}>{progress}%</div>
                        <div style={{ color: '#888', fontSize: 13 }}>{goal.current} / {goal.target} {goal.unit}</div>
                      </div>
                    </div>
                    <div style={{ height: 8, background: 'rgba(255,255,255,0.08)', borderRadius: 100, marginBottom: 12 }}>
                      <div style={{ width: `${progress}%`, height: '100%', background: progress >= 80 ? 'linear-gradient(90deg,#00ff66,#10b981)' : 'linear-gradient(90deg,#ff5722,#ff8a50)', borderRadius: 100, transition: 'width 1s ease' }} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      {goal.deadline && <span style={{ color: '#666', fontSize: 12 }}>📅 Deadline: {goal.deadline}</span>}
                      <button
                        onClick={() => toggleGoal(goal.id)}
                        style={{ background: 'rgba(0,255,102,0.15)', border: '1px solid rgba(0,255,102,0.3)', color: '#00ff66', borderRadius: 10, padding: '8px 18px', cursor: 'pointer', fontWeight: 700, fontSize: 13 }}
                      >✓ Mark Done</button>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* Completed Goals */}
        {completed.length > 0 && (
          <>
            <h2 style={{ color: '#00ff66', fontFamily: 'Outfit, sans-serif', fontSize: 18, marginBottom: 16 }}>✅ Completed Goals</h2>
            <div style={{ display: 'grid', gap: 12 }}>
              {completed.map(goal => (
                <div key={goal.id} className="glass-panel" style={{ borderRadius: 16, padding: '16px 24px', opacity: 0.7, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ color: '#e0e0e0', fontWeight: 600, textDecoration: 'line-through' }}>{goal.title}</div>
                    <div style={{ color: '#666', fontSize: 12 }}>{goal.category} · {goal.target} {goal.unit}</div>
                  </div>
                  <div style={{ background: 'rgba(0,255,102,0.15)', color: '#00ff66', fontSize: 12, fontWeight: 700, borderRadius: 20, padding: '4px 14px' }}>DONE ✓</div>
                </div>
              ))}
            </div>
          </>
        )}

        {goals.length === 0 && !showForm && (
          <div style={{ textAlign: 'center', padding: 80 }}>
            <div style={{ fontSize: 64, marginBottom: 16 }}>🎯</div>
            <h3 style={{ color: '#fff', fontFamily: 'Outfit, sans-serif', marginBottom: 8 }}>No goals yet</h3>
            <p style={{ color: '#666' }}>Set your first fitness goal and start crushing it!</p>
          </div>
        )}
      </div>
    </div>
  );
};
