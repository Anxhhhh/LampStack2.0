'use client';
import { useState } from 'react';

interface AboutPanelProps { onNav: (id: string) => void; }

const TABS = ['About', 'Testimonials', 'Team'] as const;
type Tab = typeof TABS[number];

const STATS: [string, string][] = [['50+','Projects Delivered'],['100%','Client Satisfaction'],['10+','Core Services'],['24h','Response Time']];

const VALUES = [
  { icon: 'rocket_launch',           title: 'Move at Speed',       desc: 'Prototype in hours, iterate in days.' },
  { icon: 'precision_manufacturing', title: 'Built for Scale',      desc: 'From MVP to millions of users.' },
  { icon: 'neurology',               title: 'AI-First by Default',  desc: 'Intelligence embedded from day one.' },
  { icon: 'handshake',               title: 'True Partnership',     desc: 'Invested in your long-term success.' },
];

const TESTIMONIALS = [
  { quote: "LampStack completely transformed our online presence. In 3 months, our leads increased by 4× and our site finally looks as premium as our product.", author: 'Sarah Chen', role: 'Founder, MedCore Clinic', color: '#adc6ff', icon: 'local_hospital' },
  { quote: "The AI automation system saves our operations team 30+ hours every week. The ROI was visible within the first month. Genuinely impressive work.", author: 'Mohammed Al-Hassan', role: 'CEO, PropTech Ventures', color: '#4cd7f6', icon: 'apartment' },
  { quote: "From design to launch in 6 weeks. The Flutter app has a 4.9-star rating and is the #1 driver of our repeat purchase rate.", author: 'Priya Sharma', role: 'Head of Digital, Luxora Retail', color: '#d0bcff', icon: 'shopping_cart' },
];

const TEAM = [
  { name: 'Product Team',  role: 'Strategy & Discovery',   icon: 'lightbulb', color: '#adc6ff', bg: 'rgba(173,198,255,0.1)', border: '2px solid rgba(173,198,255,0.25)' },
  { name: 'Design Studio', role: 'UI/UX & Graphic Design', icon: 'palette',   color: '#d0bcff', bg: 'rgba(208,188,255,0.1)', border: '2px solid rgba(208,188,255,0.25)' },
  { name: 'Dev Squad',     role: 'Web, App & Software',    icon: 'code',      color: '#4cd7f6', bg: 'rgba(76,215,246,0.1)',  border: '2px solid rgba(76,215,246,0.25)' },
  { name: 'AI Division',   role: 'AI & Automation',        icon: 'smart_toy', color: '#adc6ff', bg: 'rgba(173,198,255,0.1)', border: '2px solid rgba(173,198,255,0.25)' },
];

export default function AboutPanel({ onNav }: AboutPanelProps) {
  const [tab, setTab] = useState<Tab>('About');

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#09090B', position: 'relative', overflow: 'hidden', padding: '44px 60px 32px', boxSizing: 'border-box' }}>
      {/* Ambient background */}
      <div className="grid-overlay" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'absolute', top: '50%', right: '30%', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(208,188,255,0.04), transparent 70%)', filter: 'blur(50px)', pointerEvents: 'none', zIndex: 0, transform: 'translate(50%,-50%)' }} />
      <div style={{ position: 'absolute', bottom: '-20%', left: '20%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(173,198,255,0.03), transparent 70%)', filter: 'blur(40px)', pointerEvents: 'none', zIndex: 0 }} />

      <div style={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <div style={{ marginBottom: 20 }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: '#d0bcff', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 6, fontFamily: 'Inter,sans-serif' }}>About LampStack</p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24 }}>
            <h2 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 800, fontSize: 'clamp(28px, 3.2vw, 48px)', lineHeight: 1.08, color: '#e5e1e4', margin: 0 }}>
              Human creativity. <span style={{ background: 'linear-gradient(135deg,#d0bcff,#adc6ff 55%,#4cd7f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>AI power.</span>
            </h2>
            <div style={{ display: 'flex', gap: 6, background: 'rgba(255,255,255,0.04)', padding: 5, borderRadius: 12, border: '1px solid rgba(255,255,255,0.07)', flexShrink: 0 }}>
              {TABS.map(t => (
                <button key={t} onClick={() => setTab(t)} style={{ padding: '8px 18px', borderRadius: 8, border: 'none', cursor: 'pointer', fontFamily: 'Inter,sans-serif', fontSize: 13, fontWeight: 600, transition: 'all 0.2s', background: tab === t ? 'rgba(208,188,255,0.12)' : 'transparent', color: tab === t ? '#d0bcff' : '#8c909f', outline: tab === t ? '1px solid rgba(208,188,255,0.25)' : 'none' }}>{t}</button>
              ))}
            </div>
          </div>
        </div>

        {/* Tab: About */}
        {tab === 'About' && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 14 }}>
            {/* Mission + Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 14 }}>
              <div
                style={{
                  borderRadius: 24, padding: '32px', display: 'flex', flexDirection: 'column', gap: 16,
                  background: 'linear-gradient(160deg, rgba(22,22,25,0.95) 0%, rgba(16,16,19,0.98) 100%)',
                  border: '1px solid rgba(255,255,255,0.06)', position: 'relative', overflow: 'hidden'
                }}
              >
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, #d0bcff, transparent 70%)` }} />
                <div style={{ position: 'absolute', top: -60, right: -60, width: 160, height: 160, borderRadius: '50%', background: 'rgba(208,188,255,0.08)', filter: 'blur(50px)', pointerEvents: 'none' }} />
                
                <div style={{ fontSize: 10, fontWeight: 700, color: '#d0bcff', textTransform: 'uppercase', letterSpacing: '0.12em', fontFamily: 'Inter,sans-serif' }}>Our Mission</div>
                <p style={{ fontSize: 24, fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 800, color: '#e5e1e4', lineHeight: 1.3, margin: 0 }}>
                  &quot;Democratize world-class digital capabilities so every ambitious company can compete at the highest level.&quot;
                </p>
                <p style={{ fontSize: 14.5, color: '#8c909f', lineHeight: 1.75, fontFamily: 'Inter,sans-serif', margin: 0 }}>
                  LampStack is made up of engineers, designers, and AI specialists. We exist for one reason: to help ambitious businesses dominate their digital market.
                </p>
                <button className="btn-primary" style={{ width: 'fit-content', marginTop: 'auto', padding: '12px 24px', fontSize: 14 }} onClick={() => onNav('contact')}>
                  Work With Us <span className="material-symbols-outlined" style={{ fontSize: 18 }}>arrow_forward</span>
                </button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                {STATS.map(([v, l]) => (
                  <div key={l}
                    style={{
                      borderRadius: 20, padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: 8,
                      background: 'linear-gradient(160deg, rgba(22,22,25,0.9) 0%, rgba(16,16,19,0.95) 100%)',
                      border: '1px solid rgba(255,255,255,0.05)',
                      transition: 'transform 0.35s, border-color 0.35s, box-shadow 0.35s',
                    }}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLDivElement;
                      el.style.borderColor = '#adc6ff';
                      el.style.boxShadow = `0 0 48px rgba(173,198,255,0.1), 0 16px 32px rgba(0,0,0,0.4)`;
                      el.style.transform = 'translateY(-4px) scale(1.02)';
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLDivElement;
                      el.style.borderColor = 'rgba(255,255,255,0.05)';
                      el.style.boxShadow = '';
                      el.style.transform = '';
                    }}
                  >
                    <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 800, fontSize: 36, background: 'linear-gradient(135deg,#adc6ff,#d0bcff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{v}</div>
                    <div style={{ fontSize: 11, color: '#8c909f', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'Inter,sans-serif', lineHeight: 1.4 }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
            {/* Values */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, flex: 1 }}>
              {VALUES.map(({ icon, title, desc }) => (
                <div key={title}
                  style={{
                    borderRadius: 20, padding: '24px', cursor: 'default',
                    background: 'linear-gradient(160deg, rgba(22,22,25,0.95) 0%, rgba(16,16,19,0.98) 100%)',
                    border: '1px solid rgba(255,255,255,0.05)',
                    transition: 'transform 0.35s, border-color 0.35s, box-shadow 0.35s',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLDivElement;
                    el.style.borderColor = '#4cd7f6';
                    el.style.boxShadow = `0 0 48px rgba(76,215,246,0.1), 0 16px 32px rgba(0,0,0,0.4)`;
                    el.style.transform = 'translateY(-4px)';
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLDivElement;
                    el.style.borderColor = 'rgba(255,255,255,0.05)';
                    el.style.boxShadow = '';
                    el.style.transform = '';
                  }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: 26, color: '#adc6ff', fontVariationSettings: "'FILL' 0", display: 'block', marginBottom: 16 }}>{icon}</span>
                  <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 800, fontSize: 16, color: '#e5e1e4', marginBottom: 8 }}>{title}</div>
                  <div style={{ fontSize: 13.5, color: '#8c909f', lineHeight: 1.6, fontFamily: 'Inter,sans-serif' }}>{desc}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab: Testimonials */}
        {tab === 'Testimonials' && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 14 }}>
            <p style={{ fontSize: 15, color: '#8c909f', fontFamily: 'Inter,sans-serif', margin: 0 }}>Don&apos;t take our word for it. Take theirs.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14, flex: 1 }}>
              {TESTIMONIALS.map(({ quote, author, role, color, icon }) => (
                <div key={author}
                  style={{
                    borderRadius: 20, position: 'relative', overflow: 'hidden', cursor: 'default', display: 'flex', flexDirection: 'column', gap: 18, padding: '24px',
                    background: 'linear-gradient(160deg, rgba(22,22,25,0.95) 0%, rgba(16,16,19,0.98) 100%)',
                    border: '1px solid rgba(255,255,255,0.05)',
                    transition: 'transform 0.35s, border-color 0.35s, box-shadow 0.35s',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLDivElement;
                    el.style.borderColor = color;
                    el.style.boxShadow = `0 0 48px ${color}15, 0 16px 32px rgba(0,0,0,0.4)`;
                    el.style.transform = 'translateY(-4px)';
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLDivElement;
                    el.style.borderColor = 'rgba(255,255,255,0.05)';
                    el.style.boxShadow = '';
                    el.style.transform = '';
                  }}
                >
                  <div style={{ position: 'absolute', top: -30, right: -10, fontSize: 140, color: `${color}08`, fontFamily: 'serif', lineHeight: 1, pointerEvents: 'none', userSelect: 'none' }}>&quot;</div>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: `${color}14`, border: `1px solid ${color}28`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 22, color, fontVariationSettings: "'FILL' 0" }}>{icon}</span>
                  </div>
                  <p style={{ fontSize: 14.5, color: '#c2c6d6', lineHeight: 1.75, fontFamily: 'Inter,sans-serif', margin: 0, position: 'relative', zIndex: 1, flex: 1 }}>&quot;{quote}&quot;</p>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: '#e5e1e4', fontFamily: 'Inter,sans-serif' }}>{author}</div>
                    <div style={{ fontSize: 11, fontWeight: 700, color, fontFamily: 'Inter,sans-serif', marginTop: 4, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{role}</div>
                  </div>
                </div>
              ))}
            </div>
            {/* Stars */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 32, padding: '16px', borderRadius: 14, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
              {[['5.0', 'Average Rating'], ['50+', 'Projects Completed'], ['100%', 'Would Recommend']].map(([v, l]) => (
                <div key={l} style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 800, fontSize: 24, color: '#adc6ff' }}>{v}</div>
                  <div style={{ fontSize: 11, color: '#8c909f', fontFamily: 'Inter,sans-serif', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: 3 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab: Team */}
        {tab === 'Team' && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 20 }}>
            <p style={{ fontSize: 15, color: '#8c909f', fontFamily: 'Inter,sans-serif', margin: 0 }}>Specialists in every discipline you need.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14 }}>
              {TEAM.map(({ name, role, icon, color, bg, border }) => (
                <div key={name}
                  style={{
                    borderRadius: 20, padding: '32px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 16, cursor: 'default',
                    background: 'linear-gradient(160deg, rgba(22,22,25,0.95) 0%, rgba(16,16,19,0.98) 100%)',
                    border: '1px solid rgba(255,255,255,0.05)',
                    transition: 'transform 0.35s, border-color 0.35s, box-shadow 0.35s',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLDivElement;
                    el.style.borderColor = color;
                    el.style.boxShadow = `0 0 48px ${color}15, 0 16px 32px rgba(0,0,0,0.4)`;
                    el.style.transform = 'translateY(-4px)';
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLDivElement;
                    el.style.borderColor = 'rgba(255,255,255,0.05)';
                    el.style.boxShadow = '';
                    el.style.transform = '';
                  }}
                >
                  <div style={{ width: 68, height: 68, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: bg, border, color, position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', inset: 0, background: color, filter: 'blur(15px)', opacity: 0.15 }} />
                    <span className="material-symbols-outlined" style={{ fontSize: 32, fontVariationSettings: "'FILL' 1", position: 'relative', zIndex: 1 }}>{icon}</span>
                  </div>
                  <div>
                    <div style={{ fontSize: 17, fontWeight: 800, color: '#e5e1e4', fontFamily: 'Inter,sans-serif' }}>{name}</div>
                    <div style={{ fontSize: 11, fontWeight: 700, color, textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: 6, fontFamily: 'Inter,sans-serif' }}>{role}</div>
                  </div>
                </div>
              ))}
            </div>
            {/* Skill bars */}
            <div className="glass-card" style={{ borderRadius: 18, padding: '28px 32px', display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#8c909f', textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: 'Inter,sans-serif' }}>Core Capabilities</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '12px 40px' }}>
                {[['Web & App Development',99],['UI/UX & Graphic Design',97],['AI & Automation',95],['Social Media & Content',92]].map(([l,p]) => (
                  <div key={l as string}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                      <span style={{ fontSize: 13, fontWeight: 600, color: '#c2c6d6', fontFamily: 'Inter,sans-serif' }}>{l}</span>
                      <span style={{ fontSize: 13, fontWeight: 800, color: '#adc6ff', fontFamily: 'Inter,sans-serif' }}>{p}%</span>
                    </div>
                    <div className="progress-track"><div className="progress-fill" style={{ width: `${p}%` }} /></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
