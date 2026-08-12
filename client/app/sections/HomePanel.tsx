'use client';

import { useState, useCallback } from 'react';


interface HomePanelProps { onNav: (id: string) => void; }

const STATS = [
  { v: '50+',  l: 'Projects Delivered' },
  { v: '10',   l: 'Core Services' },
  { v: '100%', l: 'Client Satisfaction' },
  { v: '24h',  l: 'Response Time' },
];

const TRUST = [
  { icon: 'verified',      label: 'Quality Guaranteed' },
  { icon: 'lock',          label: 'NDA Protected' },
  { icon: 'support_agent', label: 'Ongoing Support' },
  { icon: 'rocket_launch', label: 'Fast Delivery' },
  { icon: 'schedule',      label: '24h Response' },
];

const FLOATERS = [
  { icon: 'code',       label: 'Development',  value: '50+',  sub: 'Projects shipped',  color: '#adc6ff', delay: '0s' },
  { icon: 'smart_toy',  label: 'AI Solutions', value: '10x',  sub: 'Faster workflows',  color: '#4cd7f6', delay: '0.4s' },
  { icon: 'palette',    label: 'Creative',     value: '100%', sub: 'Satisfaction rate', color: '#d0bcff', delay: '0.8s' },
  { icon: 'trending_up',label: 'Growth',       value: '3x',   sub: 'Average ROI boost', color: '#adc6ff', delay: '1.2s' },
];

export default function HomePanel({ onNav }: HomePanelProps) {
  const [mouse, setMouse] = useState({ x: 50, y: 50 });

  const handleMouse = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setMouse({
      x: ((e.clientX - r.left) / r.width) * 100,
      y: ((e.clientY - r.top) / r.height) * 100,
    });
  }, []);

  return (
    <div
      style={{ height: '100%', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}
      onMouseMove={handleMouse}
    >
      {/* Mouse-follow gradient */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
        background: `
          radial-gradient(ellipse 55% 45% at ${mouse.x}% ${mouse.y}%, rgba(173,198,255,0.07) 0%, transparent 70%),
          radial-gradient(at 0% 0%,   hsla(253,16%,7%,1)  0, transparent 55%),
          radial-gradient(at 50% 0%,  hsla(225,39%,22%,1) 0, transparent 55%),
          radial-gradient(at 100% 0%, hsla(339,49%,22%,1) 0, transparent 55%)
        `,
      }} />
      <div className="grid-overlay" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }} />

      {/* Ambient glows */}
      <div style={{ position: 'absolute', top: '15%', left: '10%', width: 380, height: 380, background: 'rgba(173,198,255,0.07)', borderRadius: '50%', filter: 'blur(100px)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'absolute', bottom: '20%', right: '15%', width: 440, height: 440, background: 'rgba(208,188,255,0.05)', borderRadius: '50%', filter: 'blur(120px)', pointerEvents: 'none', zIndex: 0 }} />

      {/* Hero content */}
      <section style={{ flex: 1, display: 'flex', alignItems: 'center', padding: '0 60px', position: 'relative', zIndex: 1, boxSizing: 'border-box' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72, alignItems: 'center', width: '100%', maxWidth: 1200 }}>

          {/* LEFT */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>

            {/* Status pill */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '7px 18px', borderRadius: 99, background: 'rgba(76,215,246,0.07)', border: '1px solid rgba(76,215,246,0.2)', width: 'fit-content' }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#4cd7f6', display: 'inline-block', animation: 'pulse 2s ease-in-out infinite' }} />
              <span style={{ fontSize: 11, fontWeight: 700, color: '#4cd7f6', letterSpacing: '0.12em', textTransform: 'uppercase', fontFamily: 'Inter,sans-serif' }}>
                Now Accepting New Projects
              </span>
            </div>

            {/* Headline */}
            <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 'clamp(38px, 4.8vw, 68px)', lineHeight: 1.07, letterSpacing: '-0.04em', color: '#e5e1e4', margin: 0 }}>
              We Build Digital<br />
              <span className="gradient-text">Experiences</span><br />
              That Drive Growth.
            </h1>

            {/* Sub copy */}
            <p style={{ fontSize: 17, lineHeight: 1.75, color: '#8c909f', margin: 0, maxWidth: 460, fontFamily: 'Inter,sans-serif' }}>
              LampStack is a full-spectrum digital agency — we design, build, automate, and grow your digital presence so you can focus on scaling your business.
            </p>

            {/* CTAs */}
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 4 }}>
              <button className="btn-primary" style={{ fontSize: 15, padding: '15px 32px' }} onClick={() => onNav('contact')}>
                Start Your Project
                <span className="material-symbols-outlined" style={{ fontSize: 18, fontVariationSettings: "'FILL' 0" }}>arrow_forward</span>
              </button>
              <button className="btn-ghost" style={{ fontSize: 15, padding: '15px 32px' }} onClick={() => onNav('work')}>
                View Our Work
              </button>
            </div>

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, paddingTop: 28, borderTop: '1px solid rgba(255,255,255,0.06)', marginTop: 4 }}>
              {STATS.map(({ v, l }) => (
                <div key={l}>
                  <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 800, fontSize: 28, color: '#adc6ff', lineHeight: 1 }}>{v}</div>
                  <div style={{ fontSize: 11, color: '#8c909f', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.07em', marginTop: 6, fontFamily: 'Inter,sans-serif', lineHeight: 1.4 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — animated feature cards */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, position: 'relative', zIndex: 1 }}>
            {/* Centre glow */}
            <div style={{ position: 'absolute', inset: '-20px', background: 'radial-gradient(circle at 50% 50%, rgba(173,198,255,0.04), transparent 70%)', pointerEvents: 'none' }} />
            {FLOATERS.map(({ icon, label, value, sub, color, delay }) => (
              <div key={label} className="glass-card" style={{ borderRadius: 20, padding: '22px', animation: 'float 4s ease-in-out infinite', animationDelay: delay, cursor: 'default' }}>
                <div style={{ width: 40, height: 40, borderRadius: 11, background: `${color}14`, border: `1px solid ${color}28`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 20, color, fontVariationSettings: "'FILL' 1" }}>{icon}</span>
                </div>
                <div style={{ fontSize: 12, fontWeight: 600, color: '#8c909f', fontFamily: 'Inter,sans-serif', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</div>
                <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 800, fontSize: 26, color, lineHeight: 1 }}>{value}</div>
                <div style={{ fontSize: 11, color: '#424754', fontFamily: 'Inter,sans-serif', marginTop: 4 }}>{sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trust marquee bar ──────────────────────────────── */}
      <div
        style={{
          position: 'relative', zIndex: 1,
          borderTop: '1px solid rgba(255,255,255,0.05)',
          background: 'rgba(9,9,11,0.85)',
          backdropFilter: 'blur(24px)',
          overflow: 'hidden',
          height: 46,
          flexShrink: 0,
        }}
      >
        {/* Left fade */}
        <div style={{
          position: 'absolute', left: 0, top: 0, bottom: 0, width: 120, zIndex: 2, pointerEvents: 'none',
          background: 'linear-gradient(to right, rgba(9,9,11,0.95) 0%, transparent 100%)',
        }} />
        {/* Right fade */}
        <div style={{
          position: 'absolute', right: 0, top: 0, bottom: 0, width: 120, zIndex: 2, pointerEvents: 'none',
          background: 'linear-gradient(to left, rgba(9,9,11,0.95) 0%, transparent 100%)',
        }} />

        {/* Marquee track — two identical sets for seamless loop */}
        <div
          className="trust-track"
          style={{
            display: 'flex', alignItems: 'center',
            height: '100%',
            width: 'max-content',
            animation: 'trustMarquee 28s linear infinite',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLDivElement).style.animationPlayState = 'paused';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLDivElement).style.animationPlayState = 'running';
          }}
        >
          {/* Render items twice for the infinite loop */}
          {[...TRUST, ...TRUST].map(({ icon, label }, i) => (
            <div
              key={i}
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '0 40px',
                flexShrink: 0,
                opacity: 0.42,
                transition: 'opacity 0.25s',
                cursor: 'default',
                userSelect: 'none',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.opacity = '0.9'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.opacity = '0.42'; }}
            >
              <span
                className="material-symbols-outlined"
                style={{ fontSize: 15, color: '#adc6ff', fontVariationSettings: "'FILL' 0", flexShrink: 0 }}
              >{icon}</span>
              <span style={{
                fontSize: 12, fontWeight: 600,
                fontFamily: 'Inter, sans-serif',
                color: '#c2c6d6',
                letterSpacing: '0.01em',
                whiteSpace: 'nowrap',
              }}>{label}</span>

              {/* Dot separator — hidden after last item of each set */}
              {(i + 1) % TRUST.length !== 0 && (
                <div style={{
                  width: 3, height: 3, borderRadius: '50%',
                  background: 'rgba(173,198,255,0.2)',
                  marginLeft: 40, flexShrink: 0,
                }} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
