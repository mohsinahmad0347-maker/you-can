import React, { useState } from 'react';
import { useFitness } from '../../context/FitnessContext';

export const ComparisonPage: React.FC = () => {
  const { exercises, compareExerciseIds, openComparison } = useFitness();
  const [leftId, setLeftId] = useState(compareExerciseIds?.[0] || exercises[0]?.id || '');
  const [rightId, setRightId] = useState(compareExerciseIds?.[1] || exercises[1]?.id || '');

  const left = exercises.find(e => e.id === leftId);
  const right = exercises.find(e => e.id === rightId);

  const attrs = [
    { key: 'difficulty', label: '⚡ Difficulty' },
    { key: 'primaryMuscle', label: '💪 Primary Muscle' },
    { key: 'secondaryMuscles', label: '🔗 Secondary Muscles' },
    { key: 'category', label: '📁 Category' },
    { key: 'equipment', label: '🏋️ Equipment' },
    { key: 'type', label: '🎯 Type' },
    { key: 'caloriesPerMinute', label: '🔥 Cal/Min' },
  ];

  const renderVal = (ex: typeof left, key: string) => {
    if (!ex) return '—';
    const val = (ex as any)[key];
    if (Array.isArray(val)) return val.join(', ') || '—';
    return val || '—';
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0d0d0d', padding: '100px 24px 40px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <h1 style={{ color: '#fff', fontFamily: 'Outfit, sans-serif', fontSize: 32, fontWeight: 800, marginBottom: 8 }}>⚔️ Exercise Comparison</h1>
        <p style={{ color: '#666', marginBottom: 32 }}>Compare two exercises side-by-side</p>

        {/* Selectors */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 20, marginBottom: 40, alignItems: 'center' }}>
          <div>
            <label style={{ color: '#888', fontSize: 13, display: 'block', marginBottom: 8 }}>Exercise A</label>
            <select
              value={leftId}
              onChange={e => setLeftId(e.target.value)}
              style={{ width: '100%', background: '#1c1c1e', border: '1px solid rgba(255,87,34,0.3)', borderRadius: 12, padding: '14px 16px', color: '#fff', fontSize: 15 }}
            >
              {exercises.map(ex => <option key={ex.id} value={ex.id}>{ex.name}</option>)}
            </select>
          </div>
          <div style={{ color: '#ff5722', fontSize: 28, fontWeight: 900, textAlign: 'center' }}>VS</div>
          <div>
            <label style={{ color: '#888', fontSize: 13, display: 'block', marginBottom: 8 }}>Exercise B</label>
            <select
              value={rightId}
              onChange={e => setRightId(e.target.value)}
              style={{ width: '100%', background: '#1c1c1e', border: '1px solid rgba(255,87,34,0.3)', borderRadius: 12, padding: '14px 16px', color: '#fff', fontSize: 15 }}
            >
              {exercises.map(ex => <option key={ex.id} value={ex.id}>{ex.name}</option>)}
            </select>
          </div>
        </div>

        {/* Header Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
          {[left, right].map((ex, idx) => ex && (
            <div key={idx} className="glass-panel" style={{ borderRadius: 20, padding: 24, border: `1px solid rgba(255,87,34,${idx === 0 ? '0.3' : '0.1'})` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
                <div style={{
                  width: 56, height: 56, borderRadius: 16,
                  background: idx === 0 ? 'linear-gradient(135deg,#ff5722,#ff8a50)' : 'linear-gradient(135deg,#38bdf8,#0ea5e9)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28
                }}>🏋️</div>
                <div>
                  <h2 style={{ color: '#fff', fontFamily: 'Outfit, sans-serif', margin: 0, fontSize: 20 }}>{ex.name}</h2>
                  <span style={{ color: idx === 0 ? '#ff8a50' : '#38bdf8', fontSize: 13 }}>{ex.category}</span>
                </div>
              </div>
              <p style={{ color: '#888', fontSize: 14, lineHeight: 1.6 }}>{ex.description?.slice(0, 120)}...</p>
              <div style={{ display: 'flex', gap: 10, marginTop: 12, flexWrap: 'wrap' }}>
                <span style={{ background: 'rgba(255,255,255,0.08)', color: '#ccc', fontSize: 12, padding: '4px 12px', borderRadius: 20 }}>{ex.difficulty}</span>
                <span style={{ background: 'rgba(255,255,255,0.08)', color: '#ccc', fontSize: 12, padding: '4px 12px', borderRadius: 20 }}>{ex.primaryMuscle}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Attribute Table */}
        <div className="glass-panel" style={{ borderRadius: 20, overflow: 'hidden' }}>
          <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <h3 style={{ color: '#fff', fontFamily: 'Outfit, sans-serif', margin: 0 }}>📊 Attribute Comparison</h3>
          </div>
          {attrs.map((attr, i) => (
            <div key={attr.key} style={{
              display: 'grid', gridTemplateColumns: '1fr 140px 1fr',
              padding: '16px 24px',
              background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)',
              borderBottom: '1px solid rgba(255,255,255,0.04)',
              alignItems: 'center', gap: 16
            }}>
              <div style={{ color: '#e0e0e0', fontWeight: 500, textAlign: 'right' }}>{renderVal(left, attr.key)}</div>
              <div style={{ color: '#555', fontSize: 13, textAlign: 'center', fontWeight: 600 }}>{attr.label}</div>
              <div style={{ color: '#e0e0e0', fontWeight: 500 }}>{renderVal(right, attr.key)}</div>
            </div>
          ))}
        </div>

        {/* Muscle Overlap */}
        {left && right && (
          <div className="glass-panel" style={{ borderRadius: 20, padding: 28, marginTop: 24 }}>
            <h3 style={{ color: '#fff', fontFamily: 'Outfit, sans-serif', marginBottom: 20 }}>💪 Muscle Group Analysis</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
              {[left, right].map((ex, idx) => {
                const muscles = [ex!.primaryMuscle, ...(ex!.secondaryMuscles || [])].filter(Boolean);
                return (
                  <div key={idx}>
                    <div style={{ color: idx === 0 ? '#ff8a50' : '#38bdf8', fontWeight: 700, marginBottom: 12 }}>{ex!.name}</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                      {muscles.map((m, j) => (
                        <span key={j} style={{
                          background: j === 0 ? (idx === 0 ? 'rgba(255,87,34,0.25)' : 'rgba(56,189,248,0.25)') : 'rgba(255,255,255,0.08)',
                          color: j === 0 ? (idx === 0 ? '#ff8a50' : '#38bdf8') : '#ccc',
                          fontSize: 13, padding: '6px 14px', borderRadius: 20, fontWeight: j === 0 ? 700 : 500
                        }}>{m}{j === 0 ? ' (Primary)' : ''}</span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
