'use client';
import { useState } from 'react';

interface WorkPanelProps { onNav: (id: string) => void; }

const TABS = ['Projects', 'Industries', 'Tech Stack'] as const;
type Tab = typeof TABS[number];

const PROJECTS = [
  { tag: 'Web Dev',       tagColor: '#adc6ff', title: 'FinTrack Dashboard',    challenge: 'Fintech startup needed real-time dashboard handling 50k+ daily transactions.',   solution: 'Next.js + WebSockets + D3.js with edge caching for global performance.',     result: '4× faster load · 32% ↑ retention · 0 downtime',   grad: 'rgba(173,198,255,0.08)' },
  { tag: 'AI Automation', tagColor: '#4cd7f6', title: 'ClinicAI Healthcare',   challenge: 'Dental group spent 30+ hrs/week on scheduling, follow-ups, intake forms.',       solution: 'AI agent handles scheduling, sends reminders, auto-fills EHR forms.',         result: '28 hrs saved/week · 91% no-show reduction · 5× ROI', grad: 'rgba(76,215,246,0.07)' },
  { tag: 'App Dev',       tagColor: '#d0bcff', title: 'ShopMate Mobile App',   challenge: 'Retail brand needed cross-platform app to recover abandoned carts.',              solution: 'Flutter + push notifications, loyalty program & AI product recommendations.', result: '40% ↑ repeat purchases · 4.9★ App Store rating',   grad: 'rgba(208,188,255,0.08)' },
];

const INDUSTRIES = [
  { icon: 'local_hospital', label: 'Healthcare',     color: '#4cd7f6' },
  { icon: 'dentistry',      label: 'Dental',         color: '#adc6ff' },
  { icon: 'apartment',      label: 'Real Estate',    color: '#d0bcff' },
  { icon: 'school',         label: 'Education',      color: '#adc6ff' },
  { icon: 'restaurant',     label: 'Restaurants',    color: '#4cd7f6' },
  { icon: 'shopping_cart',  label: 'E-commerce',     color: '#d0bcff' },
  { icon: 'rocket_launch',  label: 'Startups',       color: '#adc6ff' },
  { icon: 'store',          label: 'Local Business', color: '#4cd7f6' },
];

const TECH_ROW1 = [
  { name: 'React',       icon: 'code' }, { name: 'Next.js',    icon: 'web' },     { name: 'Flutter',     icon: 'phone_iphone' },
  { name: 'Node.js',     icon: 'terminal' }, { name: 'TypeScript', icon: 'data_object' }, { name: 'MongoDB',     icon: 'storage' },
  { name: 'Docker',      icon: 'deployed_code' }, { name: 'AWS',        icon: 'cloud' },
];
const TECH_ROW2 = [
  { name: 'OpenAI',       icon: 'smart_toy' }, { name: 'Firebase',    icon: 'local_fire_department' }, { name: 'TailwindCSS', icon: 'brush' },
  { name: 'Framer Motion',icon: 'animation' }, { name: 'PostgreSQL',  icon: 'database' },  { name: 'Stripe',      icon: 'payments' },
  { name: 'Vercel',       icon: 'speed' },      { name: 'GitHub',      icon: 'source' },
];

function TechBadge({ name, icon }: { name: string; icon: string }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '9px 16px', borderRadius: 10, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', whiteSpace: 'nowrap', flexShrink: 0 }}>
      <span className="material-symbols-outlined" style={{ fontSize: 15, color: '#adc6ff', fontVariationSettings: "'FILL' 0" }}>{icon}</span>
      <span style={{ fontSize: 13, fontWeight: 600, color: '#c2c6d6', fontFamily: 'Inter,sans-serif' }}>{name}</span>
    </div>
  );
}

export default function WorkPanel({ onNav }: WorkPanelProps) {
  const [tab, setTab] = useState<Tab>('Projects');

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#09090B', position: 'relative', overflow: 'hidden', padding: '44px 60px 32px', boxSizing: 'border-box' }}>
      {/* Ambient background */}
      <div className="grid-overlay" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'absolute', top: '50%', left: '30%', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(173,198,255,0.04), transparent 70%)', filter: 'blur(50px)', pointerEvents: 'none', zIndex: 0, transform: 'translate(-50%,-50%)' }} />
      <div style={{ position: 'absolute', top: '70%', right: '20%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(208,188,255,0.03), transparent 70%)', filter: 'blur(40px)', pointerEvents: 'none', zIndex: 0, transform: 'translate(50%,-50%)' }} />

      <div style={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <div style={{ marginBottom: 20 }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: '#adc6ff', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 6, fontFamily: 'Inter,sans-serif' }}>Our Work</p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24 }}>
            <h2 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 800, fontSize: 'clamp(28px, 3.2vw, 48px)', lineHeight: 1.08, color: '#e5e1e4', margin: 0 }}>
              Results that speak <span style={{ background: 'linear-gradient(135deg,#adc6ff,#d0bcff 55%,#4cd7f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>louder than promises.</span>
            </h2>
            <div style={{ display: 'flex', gap: 6, background: 'rgba(255,255,255,0.04)', padding: 5, borderRadius: 12, border: '1px solid rgba(255,255,255,0.07)', flexShrink: 0 }}>
              {TABS.map(t => (
                <button key={t} onClick={() => setTab(t)} style={{ padding: '8px 18px', borderRadius: 8, border: 'none', cursor: 'pointer', fontFamily: 'Inter,sans-serif', fontSize: 13, fontWeight: 600, transition: 'all 0.2s', background: tab === t ? 'rgba(173,198,255,0.15)' : 'transparent', color: tab === t ? '#adc6ff' : '#8c909f', outline: tab === t ? '1px solid rgba(173,198,255,0.25)' : 'none' }}>{t}</button>
              ))}
            </div>
          </div>
        </div>

        {/* Tab: Projects */}
        {tab === 'Projects' && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14, flex: 1 }}>
              {PROJECTS.map(({ tag, tagColor, title, challenge, solution, result, grad }) => (
                <div key={title}
                  style={{
                    borderRadius: 24, padding: '32px',
                    display: 'flex', flexDirection: 'column', gap: 16, cursor: 'default', boxSizing: 'border-box',
                    background: 'linear-gradient(160deg, rgba(22,22,25,0.95) 0%, rgba(16,16,19,0.98) 100%)',
                    border: `1px solid rgba(255,255,255,0.06)`,
                    transition: 'border-color 0.35s, box-shadow 0.35s, transform 0.35s',
                    willChange: 'transform',
                    position: 'relative', overflow: 'hidden',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLDivElement;
                    el.style.borderColor = tagColor;
                    el.style.boxShadow = `0 0 64px ${tagColor}15, 0 24px 48px rgba(0,0,0,0.4)`;
                    el.style.transform = 'translateY(-6px) scale(1.01)';
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLDivElement;
                    el.style.borderColor = 'rgba(255,255,255,0.06)';
                    el.style.boxShadow = '';
                    el.style.transform = '';
                  }}
                >
                  {/* Top gradient line */}
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${tagColor}, transparent 70%)` }} />
                  
                  {/* Corner glow */}
                  <div style={{ position: 'absolute', top: -60, right: -60, width: 160, height: 160, borderRadius: '50%', background: grad, filter: 'blur(50px)', pointerEvents: 'none' }} />

                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 12px', borderRadius: 99, background: `${tagColor}14`, border: `1px solid ${tagColor}28`, width: 'fit-content' }}>
                    <span style={{ fontSize: 10, fontWeight: 700, color: tagColor, letterSpacing: '0.12em', fontFamily: 'Inter,sans-serif', textTransform: 'uppercase' }}>{tag}</span>
                  </div>
                  <h3 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 800, fontSize: 22, color: '#e5e1e4', lineHeight: 1.25, margin: 0 }}>{title}</h3>
                  <div>
                    <div style={{ fontSize: 10, fontWeight: 700, color: '#8c909f', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6, fontFamily: 'Inter,sans-serif' }}>Challenge</div>
                    <p style={{ fontSize: 13.5, color: '#8c909f', lineHeight: 1.65, margin: 0, fontFamily: 'Inter,sans-serif' }}>{challenge}</p>
                  </div>
                  <div>
                    <div style={{ fontSize: 10, fontWeight: 700, color: '#8c909f', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6, fontFamily: 'Inter,sans-serif' }}>Solution</div>
                    <p style={{ fontSize: 13.5, color: '#8c909f', lineHeight: 1.65, margin: 0, fontFamily: 'Inter,sans-serif' }}>{solution}</p>
                  </div>
                  <div style={{ marginTop: 'auto', padding: '14px 18px', borderRadius: 12, background: 'linear-gradient(135deg, rgba(76,215,246,0.06), rgba(76,215,246,0.02))', border: '1px solid rgba(76,215,246,0.15)', display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: '#4cd7f6', textTransform: 'uppercase', letterSpacing: '0.12em', fontFamily: 'Inter,sans-serif' }}>Result</div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: '#c2c6d6', fontFamily: 'Inter,sans-serif' }}>{result}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: 'center' }}>
              <button className="btn-ghost" style={{ fontSize: 13, padding: '10px 24px' }} onClick={() => onNav('contact')}>
                Discuss Your Project
                <span className="material-symbols-outlined" style={{ fontSize: 16 }}>arrow_forward</span>
              </button>
            </div>
          </div>
        )}

        {/* Tab: Industries */}
        {tab === 'Industries' && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <p style={{ fontSize: 15, color: '#8c909f', fontFamily: 'Inter,sans-serif', margin: '0 0 28px' }}>Domain expertise across every major vertical.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14, flex: 1 }}>
              {INDUSTRIES.map(({ icon, label, color }) => (
                <div key={label} className="glass-card" style={{ borderRadius: 18, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14, textAlign: 'center', cursor: 'default' }}>
                  <div style={{ width: 56, height: 56, borderRadius: 15, background: `${color}10`, border: `1px solid ${color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 28, color, fontVariationSettings: "'FILL' 0" }}>{icon}</span>
                  </div>
                  <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: 16, color: '#e5e1e4' }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab: Tech Stack */}
        {tab === 'Tech Stack' && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 28 }}>
            <p style={{ fontSize: 15, color: '#8c909f', fontFamily: 'Inter,sans-serif', margin: 0 }}>We choose the right technology for each challenge — not just the trendiest one.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div className="tech-strip">
                <div className="tech-track">{[...TECH_ROW1, ...TECH_ROW1].map((t, i) => <TechBadge key={i} {...t} />)}</div>
              </div>
              <div className="tech-strip">
                <div className="tech-track tech-track-reverse">{[...TECH_ROW2, ...TECH_ROW2].map((t, i) => <TechBadge key={i} {...t} />)}</div>
              </div>
            </div>
            {/* Why we choose carefully */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12 }}>
              {[
                { icon: 'speed',          label: 'Performance First',  desc: 'Every choice optimized for speed.' },
                { icon: 'security',       label: 'Enterprise Grade',   desc: 'Battle-tested in production.' },
                { icon: 'open_in_new',    label: 'Open Standards',     desc: 'No proprietary lock-in.' },
                { icon: 'trending_up',    label: 'Future-Proof',       desc: 'Technologies with staying power.' },
              ].map(({ icon, label, desc }) => (
                <div key={label} className="glass-card" style={{ borderRadius: 14, padding: '18px', cursor: 'default' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 22, color: '#adc6ff', fontVariationSettings: "'FILL' 0", display: 'block', marginBottom: 10 }}>{icon}</span>
                  <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: 14, color: '#e5e1e4', marginBottom: 5 }}>{label}</div>
                  <div style={{ fontSize: 12, color: '#8c909f', fontFamily: 'Inter,sans-serif', lineHeight: 1.5 }}>{desc}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
