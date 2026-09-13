import React, { useState, useRef, useEffect } from 'react';
import { useFitness } from '../../context/FitnessContext';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const QUICK_PROMPTS = [
  '🏋️ Build a chest workout',
  '🔥 Best fat-burning exercises',
  '💊 Post-workout nutrition tips',
  '🧘 Mobility routine for desk workers',
  '📅 Weekly workout schedule',
  '💪 How to increase bench press',
];

const AI_RESPONSES: Record<string, string> = {
  default: "Great question! As your YOU CAN AI Fitness Coach, I'm here to help. For personalized advice, I recommend starting with compound movements and progressive overload. Would you like a specific workout plan, nutrition guidance, or recovery tips?",
  chest: "🔥 **Chest Workout Plan:**\n\n**Compound (3-4 sets each):**\n• Bench Press: 4×6-8 reps\n• Incline Dumbbell Press: 3×8-10\n• Dips (weighted): 3×8-12\n\n**Isolation (3 sets):**\n• Cable Flyes: 3×12-15\n• Pec Deck Machine: 3×15\n\n**Tips:** Rest 90-120 sec between sets. Focus on full range of motion and controlled eccentrics for maximum muscle growth! 💪",
  fat: "⚡ **Best Fat-Burning Exercises:**\n\n**High-Impact (burn most calories):**\n1. Burpees – 100 cal/10 min\n2. Jump Rope – 120 cal/10 min\n3. HIIT Sprint Intervals\n4. Battle Ropes\n5. Box Jumps\n\n**Steady-State:**\n• Rowing Machine\n• Cycling (high intensity)\n• Stair Climber\n\n**Pro Tip:** Combine HIIT with strength training for the afterburn effect (EPOC) — keeps burning calories 24-48 hrs post workout! 🔥",
  nutrition: "🥗 **Post-Workout Nutrition:**\n\n**Within 30-45 min:**\n• Protein: 25-40g (whey shake, chicken, eggs)\n• Carbs: 40-60g (rice, banana, oats)\n• Hydrate: 500-750ml water\n\n**Great meal combos:**\n• Chicken rice bowl with vegetables\n• Greek yogurt with fruit\n• Protein shake + banana\n\n**Why it matters:** The anabolic window is real — muscle protein synthesis peaks post-workout. Don't skip this!",
  mobility: "🧘 **Desk Worker Mobility Routine (15 min):**\n\n**Hip Flexors (5 min):**\n• 90/90 hip stretch – 2 min/side\n• Couch stretch – 1 min/side\n\n**Thoracic Spine (5 min):**\n• Thread-the-needle – 10 reps/side\n• Cat-cow – 20 reps\n• Foam roller extension\n\n**Neck & Shoulders (5 min):**\n• Chin tucks – 3×15\n• Wall angels – 3×10\n• Doorway pec stretch\n\n**Do this daily!** Especially before workouts to reduce injury risk.",
  schedule: "📅 **4-Day Workout Split:**\n\n**Monday – Push (Chest/Shoulders/Triceps)**\n**Tuesday – Pull (Back/Biceps)**\n**Wednesday – REST / Active Recovery**\n**Thursday – Legs (Quads/Hams/Glutes)**\n**Friday – Full Body / Weak Points**\n**Sat/Sun – REST or light cardio**\n\n**For beginners:** Try 3-day full body (Mon/Wed/Fri)\n**For advanced:** Try 5-6 day PPL or Arnold Split\n\nConsistency > intensity. Show up every week! 🦁",
  bench: "💪 **Increase Your Bench Press:**\n\n**Programming:**\n• Linear progression (add 2.5kg/week)\n• 5×5 strength protocol\n• Include competition-style paused reps\n\n**Technique fixes:**\n• Leg drive and tight arch\n• Retract scapula, 'break the bar'\n• Control the descent (2-3 sec)\n• Flare at top, tuck at bottom\n\n**Accessory work:**\n• Close-grip bench\n• JM Press\n• Tricep dips & pushdowns\n• Front delt raises\n\n**Patience:** 1% improvement per week = 50% in a year! 🚀",
};

const getAIResponse = (input: string): string => {
  const lower = input.toLowerCase();
  if (lower.includes('chest') || lower.includes('bench') && lower.includes('workout')) return AI_RESPONSES.chest;
  if (lower.includes('fat') || lower.includes('burn') || lower.includes('lose weight')) return AI_RESPONSES.fat;
  if (lower.includes('nutrition') || lower.includes('food') || lower.includes('eat') || lower.includes('protein')) return AI_RESPONSES.nutrition;
  if (lower.includes('mobility') || lower.includes('desk') || lower.includes('stretch') || lower.includes('flexibility')) return AI_RESPONSES.mobility;
  if (lower.includes('schedule') || lower.includes('plan') || lower.includes('week') || lower.includes('split')) return AI_RESPONSES.schedule;
  if (lower.includes('bench') || lower.includes('press') || lower.includes('increase') || lower.includes('stronger')) return AI_RESPONSES.bench;
  return AI_RESPONSES.default;
};

export const AICoachPage: React.FC = () => {
  const { userProfile } = useFitness();
  const [messages, setMessages] = useState<Message[]>([{
    id: 'welcome',
    role: 'assistant',
    content: `Hey ${userProfile.name}! 👋 I'm your YOU CAN AI Fitness Coach. I can help you with workout plans, exercise form, nutrition advice, recovery strategies, and more. What would you like to work on today?`,
    timestamp: new Date()
  }]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;
    const userMsg: Message = { id: `u-${Date.now()}`, role: 'user', content, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    await new Promise(r => setTimeout(r, 1200 + Math.random() * 800));

    const aiMsg: Message = {
      id: `a-${Date.now()}`,
      role: 'assistant',
      content: getAIResponse(content),
      timestamp: new Date()
    };
    setMessages(prev => [...prev, aiMsg]);
    setIsTyping(false);
  };

  const formatContent = (text: string) => {
    return text.split('\n').map((line, i) => {
      if (line.startsWith('**') && line.endsWith('**')) {
        return <div key={i} style={{ fontWeight: 800, color: '#ff5722', marginTop: 12, marginBottom: 4, fontFamily: 'Outfit, sans-serif' }}>{line.slice(2, -2)}</div>;
      }
      if (line.startsWith('•')) {
        return <div key={i} style={{ paddingLeft: 16, color: '#ccc', marginBottom: 2 }}>{line}</div>;
      }
      if (/^\d+\./.test(line)) {
        return <div key={i} style={{ paddingLeft: 16, color: '#ccc', marginBottom: 2 }}>{line}</div>;
      }
      return <div key={i} style={{ color: '#e0e0e0', marginBottom: 2 }}>{line}</div>;
    });
  };

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', background: '#0d0d0d', paddingTop: 70 }}>
      {/* Header */}
      <div className="glass-panel" style={{ padding: '16px 32px', display: 'flex', alignItems: 'center', gap: 16, flexShrink: 0 }}>
        <div style={{
          width: 48, height: 48, borderRadius: '50%',
          background: 'linear-gradient(135deg,#ff5722,#ff8a50)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24
        }}>🤖</div>
        <div>
          <h1 style={{ color: '#fff', fontFamily: 'Outfit, sans-serif', fontSize: 20, fontWeight: 800, margin: 0 }}>YOU CAN AI Coach</h1>
          <p style={{ color: '#00ff66', fontSize: 12, margin: 0, fontWeight: 600 }}>● Online – Ready to train</p>
        </div>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '24px 32px', display: 'flex', flexDirection: 'column', gap: 20 }}>
        {messages.map(msg => (
          <div key={msg.id} style={{
            display: 'flex',
            flexDirection: msg.role === 'user' ? 'row-reverse' : 'row',
            gap: 12, alignItems: 'flex-start'
          }}>
            <div style={{
              width: 38, height: 38, borderRadius: '50%', flexShrink: 0,
              background: msg.role === 'user' ? 'linear-gradient(135deg,#ff5722,#ff8a50)' : 'rgba(255,255,255,0.1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: msg.role === 'user' ? 16 : 20,
              fontWeight: 800, color: '#fff'
            }}>
              {msg.role === 'user' ? userProfile.name.charAt(0).toUpperCase() : '🤖'}
            </div>
            <div style={{
              maxWidth: '72%',
              background: msg.role === 'user' ? 'linear-gradient(135deg, #ff5722, #ff8a50)' : 'rgba(255,255,255,0.07)',
              borderRadius: msg.role === 'user' ? '20px 4px 20px 20px' : '4px 20px 20px 20px',
              padding: '14px 18px',
              border: msg.role === 'assistant' ? '1px solid rgba(255,255,255,0.08)' : 'none'
            }}>
              {msg.role === 'assistant' ? formatContent(msg.content) : (
                <span style={{ color: '#fff', fontSize: 15 }}>{msg.content}</span>
              )}
              <div style={{ color: msg.role === 'user' ? 'rgba(255,255,255,0.6)' : '#555', fontSize: 11, marginTop: 6, textAlign: msg.role === 'user' ? 'right' : 'left' }}>
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <div style={{ width: 38, height: 38, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>🤖</div>
            <div style={{ background: 'rgba(255,255,255,0.07)', borderRadius: '4px 20px 20px 20px', padding: '16px 20px', display: 'flex', gap: 5, alignItems: 'center' }}>
              {[0, 1, 2].map(i => (
                <div key={i} style={{
                  width: 8, height: 8, borderRadius: '50%', background: '#ff5722',
                  animation: 'bounce 1.4s infinite',
                  animationDelay: `${i * 0.2}s`
                }} />
              ))}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Quick Prompts */}
      <div style={{ padding: '0 32px 12px', display: 'flex', gap: 8, overflowX: 'auto', flexShrink: 0 }}>
        {QUICK_PROMPTS.map(prompt => (
          <button
            key={prompt}
            onClick={() => sendMessage(prompt)}
            style={{
              background: 'rgba(255,87,34,0.12)', border: '1px solid rgba(255,87,34,0.25)',
              borderRadius: 20, padding: '8px 16px', color: '#ff8a50',
              cursor: 'pointer', whiteSpace: 'nowrap', fontSize: 13, fontWeight: 600, flexShrink: 0,
              transition: 'all .2s'
            }}
          >{prompt}</button>
        ))}
      </div>

      {/* Input */}
      <div className="glass-panel" style={{ padding: '16px 32px', borderTop: '1px solid rgba(255,255,255,0.06)', flexShrink: 0 }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'flex-end', maxWidth: 1000, margin: '0 auto' }}>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(input); } }}
            placeholder="Ask your AI coach anything… (Enter to send)"
            rows={1}
            style={{
              flex: 1, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: 16, padding: '14px 18px', color: '#fff', fontSize: 15, resize: 'none',
              fontFamily: 'Inter, sans-serif', outline: 'none'
            }}
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || isTyping}
            style={{
              background: input.trim() ? 'linear-gradient(135deg,#ff5722,#ff8a50)' : 'rgba(255,255,255,0.1)',
              border: 'none', borderRadius: 14, padding: '14px 20px',
              color: input.trim() ? '#fff' : '#555', cursor: input.trim() ? 'pointer' : 'not-allowed',
              fontSize: 20, transition: 'all .2s', flexShrink: 0
            }}
          >➤</button>
        </div>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-8px); }
        }
      `}</style>
    </div>
  );
};
