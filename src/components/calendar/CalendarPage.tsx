import React, { useState } from 'react';
import { useFitness } from '../../context/FitnessContext';

const MONTH_NAMES = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const DAY_NAMES = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

export const CalendarPage: React.FC = () => {
  const { calendar, workouts, startWorkout, setCurrentView } = useFitness();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<string | null>(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const getEntryForDay = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return calendar.find(e => e.date === dateStr);
  };

  const selectedEntry = selectedDay ? calendar.find(e => e.date === selectedDay) : null;

  const upcomingWorkouts = workouts.slice(0, 4);

  return (
    <div style={{ minHeight: '100vh', background: '#0d0d0d', padding: '100px 24px 40px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32, flexWrap: 'wrap', gap: 16 }}>
          <div>
            <h1 style={{ color: '#fff', fontFamily: 'Outfit, sans-serif', fontSize: 32, fontWeight: 800, margin: 0 }}>📅 Training Calendar</h1>
            <p style={{ color: '#666', margin: '8px 0 0' }}>Plan and track your workouts</p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 24, alignItems: 'start' }}>
          {/* Calendar Grid */}
          <div className="glass-panel" style={{ borderRadius: 24, padding: 28 }}>
            {/* Month Nav */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <button onClick={prevMonth} style={{ background: 'rgba(255,255,255,0.08)', border: 'none', color: '#fff', width: 40, height: 40, borderRadius: 12, cursor: 'pointer', fontSize: 18 }}>‹</button>
              <h2 style={{ color: '#fff', fontFamily: 'Outfit, sans-serif', fontSize: 22, fontWeight: 800, margin: 0 }}>
                {MONTH_NAMES[month]} {year}
              </h2>
              <button onClick={nextMonth} style={{ background: 'rgba(255,255,255,0.08)', border: 'none', color: '#fff', width: 40, height: 40, borderRadius: 12, cursor: 'pointer', fontSize: 18 }}>›</button>
            </div>

            {/* Day labels */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', marginBottom: 8 }}>
              {DAY_NAMES.map(d => (
                <div key={d} style={{ textAlign: 'center', color: '#555', fontSize: 12, fontWeight: 700, padding: '6px 0' }}>{d}</div>
              ))}
            </div>

            {/* Days */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4 }}>
              {Array.from({ length: firstDay }).map((_, i) => (
                <div key={`empty-${i}`} />
              ))}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                const entry = getEntryForDay(day);
                const isToday = new Date().toISOString().split('T')[0] === dateStr;
                const isSelected = selectedDay === dateStr;

                return (
                  <button
                    key={day}
                    onClick={() => setSelectedDay(dateStr === selectedDay ? null : dateStr)}
                    style={{
                      aspectRatio: '1',
                      border: 'none',
                      borderRadius: 10,
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 2,
                      background: isSelected ? 'linear-gradient(135deg,#ff5722,#ff8a50)' :
                        isToday ? 'rgba(255,87,34,0.2)' :
                        entry ? 'rgba(0,255,102,0.1)' : 'rgba(255,255,255,0.04)',
                      transition: 'all .2s',
                      position: 'relative'
                    }}
                  >
                    <span style={{
                      color: isSelected ? '#fff' : isToday ? '#ff5722' : '#e0e0e0',
                      fontSize: 14, fontWeight: isToday ? 800 : 500
                    }}>{day}</span>
                    {entry && (
                      <div style={{
                        width: 6, height: 6, borderRadius: '50%',
                        background: entry.status === 'completed' ? '#00ff66' : '#f59e0b'
                      }} />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div style={{ display: 'flex', gap: 20, marginTop: 20, paddingTop: 20, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              {[
                { color: '#00ff66', label: 'Completed' },
                { color: '#f59e0b', label: 'Planned' },
                { color: '#ff5722', label: 'Today' },
              ].map(item => (
                <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: item.color }} />
                  <span style={{ color: '#888', fontSize: 12 }}>{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Selected Day Detail */}
            {selectedEntry ? (
              <div className="glass-panel" style={{ borderRadius: 20, padding: 24 }}>
                <h3 style={{ color: '#fff', fontFamily: 'Outfit, sans-serif', marginBottom: 16 }}>📋 {selectedEntry.date}</h3>
                <div style={{ background: selectedEntry.status === 'completed' ? 'rgba(0,255,102,0.1)' : 'rgba(245,158,11,0.1)', borderRadius: 12, padding: 16 }}>
                  <div style={{ color: '#fff', fontWeight: 700, marginBottom: 4 }}>{selectedEntry.workoutName}</div>
                  <div style={{ color: '#888', fontSize: 13 }}>⏱️ {selectedEntry.durationMinutes} min</div>
                  {selectedEntry.notes && <div style={{ color: '#888', fontSize: 12, marginTop: 8 }}>{selectedEntry.notes}</div>}
                  <div style={{ marginTop: 12, display: 'inline-block', background: selectedEntry.status === 'completed' ? 'rgba(0,255,102,0.2)' : 'rgba(245,158,11,0.2)', color: selectedEntry.status === 'completed' ? '#00ff66' : '#f59e0b', fontSize: 12, fontWeight: 700, borderRadius: 20, padding: '4px 12px' }}>
                    {selectedEntry.status.toUpperCase()}
                  </div>
                </div>
              </div>
            ) : selectedDay ? (
              <div className="glass-panel" style={{ borderRadius: 20, padding: 24 }}>
                <h3 style={{ color: '#fff', fontFamily: 'Outfit, sans-serif', marginBottom: 12 }}>📋 {selectedDay}</h3>
                <p style={{ color: '#666', fontSize: 14 }}>No workout logged for this day.</p>
                <button onClick={() => setCurrentView('workout-plans')} style={{
                  marginTop: 12, background: 'linear-gradient(135deg,#ff5722,#ff8a50)', border: 'none', borderRadius: 10, padding: '10px 20px', color: '#fff', fontWeight: 700, cursor: 'pointer', width: '100%'
                }}>+ Schedule Workout</button>
              </div>
            ) : null}

            {/* Upcoming Workouts */}
            <div className="glass-panel" style={{ borderRadius: 20, padding: 24 }}>
              <h3 style={{ color: '#fff', fontFamily: 'Outfit, sans-serif', marginBottom: 16 }}>🎯 Suggested Workouts</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {upcomingWorkouts.map(w => (
                  <div key={w.id} style={{
                    background: 'rgba(255,255,255,0.04)', borderRadius: 12, padding: '12px 16px',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    border: '1px solid rgba(255,255,255,0.06)'
                  }}>
                    <div>
                      <div style={{ color: '#e0e0e0', fontWeight: 600, fontSize: 14 }}>{w.name}</div>
                      <div style={{ color: '#666', fontSize: 12 }}>{w.durationMinutes} min · {w.difficulty}</div>
                    </div>
                    <button
                      onClick={() => startWorkout(w)}
                      style={{ background: 'rgba(255,87,34,0.2)', border: '1px solid rgba(255,87,34,0.4)', color: '#ff5722', borderRadius: 8, padding: '6px 12px', cursor: 'pointer', fontSize: 12, fontWeight: 700 }}
                    >▶</button>
                  </div>
                ))}
              </div>
            </div>

            {/* Monthly Summary */}
            <div className="glass-panel" style={{ borderRadius: 20, padding: 24 }}>
              <h3 style={{ color: '#fff', fontFamily: 'Outfit, sans-serif', marginBottom: 16 }}>📊 Month Summary</h3>
              {[
                { label: 'Workouts Done', value: calendar.filter(e => e.date.startsWith(`${year}-${String(month + 1).padStart(2, '0')}`) && e.status === 'completed').length },
                { label: 'Total Minutes', value: calendar.filter(e => e.date.startsWith(`${year}-${String(month + 1).padStart(2, '0')}`)).reduce((s, e) => s + (e.durationMinutes || 0), 0) },
                { label: 'Rest Days', value: daysInMonth - calendar.filter(e => e.date.startsWith(`${year}-${String(month + 1).padStart(2, '0')}`)).length },
              ].map(item => (
                <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <span style={{ color: '#888', fontSize: 14 }}>{item.label}</span>
                  <span style={{ color: '#ff5722', fontWeight: 700 }}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
