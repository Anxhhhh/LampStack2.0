'use client';
import { useEffect, useRef, RefObject } from 'react';

// ─── Must match page.tsx ──────────────────────────────────
const SVC_START_PAGE   = 1;
const SVC_SCROLL_PAGES = 10;

interface ServicesPanelProps {
  onNav: (id: string) => void;
  scrollContainerRef: RefObject<HTMLDivElement | null>;
}

// ─── Service data ─────────────────────────────────────────
const SERVICES = [
  {
    num: '01', icon: 'code', color: '#adc6ff', catIcon: 'terminal',
    cat: 'Development',
    title: 'Web Development',
    desc: 'High-performance websites, web apps, and platforms built with Next.js and React — optimised for speed, SEO, and conversion from day one.',
    features: ['Landing Pages', 'SaaS Platforms', 'E-commerce Stores', 'Custom Portals'],
    stat: '3×', statLabel: 'Avg. traffic growth',
  },
  {
    num: '02', icon: 'smartphone', color: '#d0bcff', catIcon: 'terminal',
    cat: 'Development',
    title: 'App Development',
    desc: 'Native iOS & Android and cross-platform mobile experiences built with Flutter and React Native — seamless, fast, and delightful.',
    features: ['iOS & Android', 'Cross-Platform', 'Push Notifications', 'Offline Support'],
    stat: '98%', statLabel: 'Client satisfaction',
  },
  {
    num: '03', icon: 'storage', color: '#adc6ff', catIcon: 'terminal',
    cat: 'Development',
    title: 'Software Development',
    desc: 'Scalable backend systems, APIs, and custom software built for enterprise-grade reliability, performance, and long-term maintainability.',
    features: ['REST & GraphQL APIs', 'Microservices', 'Database Architecture', 'Cloud Infra'],
    stat: '99.9%', statLabel: 'Uptime guaranteed',
  },
  {
    num: '04', icon: 'neurology', color: '#4cd7f6', catIcon: 'auto_awesome', hot: true,
    cat: 'AI & Automation',
    title: 'AI Solutions',
    desc: 'Custom AI models, LLM integrations, chatbots, and intelligent features embedded directly into your products and workflows.',
    features: ['LLM Integration', 'Custom AI Models', 'AI-Powered Search', 'Data Pipelines'],
    stat: '10×', statLabel: 'Productivity boost',
  },
  {
    num: '05', icon: 'precision_manufacturing', color: '#4cd7f6', catIcon: 'auto_awesome', hot: true,
    cat: 'AI & Automation',
    title: 'AI Automation',
    desc: 'Business workflow automation with AI agents that handle repetitive tasks — freeing your team to focus entirely on high-value work.',
    features: ['Workflow Automation', 'AI Agents', 'CRM Integration', 'Email Sequences'],
    stat: '70%', statLabel: 'Ops cost reduced',
  },
  {
    num: '06', icon: 'design_services', color: '#d0bcff', catIcon: 'palette',
    cat: 'Creative',
    title: 'UI & UX Design',
    desc: 'Research-backed, pixel-perfect interfaces crafted to delight your users, reduce churn, and drive measurable business outcomes.',
    features: ['User Research', 'Wireframing', 'Prototyping', 'Design Systems'],
    stat: '40%', statLabel: 'Lower bounce rate',
  },
  {
    num: '07', icon: 'brush', color: '#d0bcff', catIcon: 'palette',
    cat: 'Creative',
    title: 'Graphic Design',
    desc: 'Brand identity, logos, marketing collateral, and visual assets that make your business instantly recognisable and deeply trusted.',
    features: ['Logo & Brand Identity', 'Social Assets', 'Pitch Decks', 'Print Design'],
    stat: '500+', statLabel: 'Brands elevated',
  },
  {
    num: '08', icon: 'movie', color: '#adc6ff', catIcon: 'palette',
    cat: 'Creative',
    title: 'Video Editing',
    desc: 'Cinematic video editing, reels, motion graphics, and branded content crafted to stop the scroll on every platform and format.',
    features: ['Short-form Reels', 'Brand Films', 'Motion Graphics', 'YouTube Content'],
    stat: '2M+', statLabel: 'Views generated',
  },
  {
    num: '09', icon: 'campaign', color: '#adc6ff', catIcon: 'trending_up',
    cat: 'Growth',
    title: 'Social Media',
    desc: 'Full-service social strategy, content creation, scheduling, and community management across all major social platforms.',
    features: ['Content Strategy', 'Daily Posting', 'Community Mgmt', 'Analytics'],
    stat: '5×', statLabel: 'Engagement uplift',
  },
  {
    num: '10', icon: 'business_center', color: '#d0bcff', catIcon: 'trending_up',
    cat: 'Growth',
    title: 'Workspace Mgmt',
    desc: 'End-to-end digital workspace setup and optimisation — tools, systems, and automations that help every team member move faster.',
    features: ['Tool Integrations', 'Process Docs', 'Team Onboarding', 'Productivity Systems'],
    stat: '2×', statLabel: 'Team velocity',
  },
] as const;

type Service = typeof SERVICES[number];

// ─── Per-category styles ──────────────────────────────────
const CAT_STYLE: Record<string, { pill: string; border: string; glow: string; gradient: string }> = {
  'Development':     { pill: 'rgba(173,198,255,0.10)', border: 'rgba(173,198,255,0.28)', glow: 'rgba(173,198,255,0.15)', gradient: 'linear-gradient(135deg,#adc6ff,#90b3ff)' },
  'AI & Automation': { pill: 'rgba(76,215,246,0.10)',  border: 'rgba(76,215,246,0.30)',  glow: 'rgba(76,215,246,0.18)',  gradient: 'linear-gradient(135deg,#4cd7f6,#00b8e0)' },
  'Creative':        { pill: 'rgba(208,188,255,0.10)', border: 'rgba(208,188,255,0.28)', glow: 'rgba(208,188,255,0.15)', gradient: 'linear-gradient(135deg,#d0bcff,#b89fff)' },
  'Growth':          { pill: 'rgba(173,198,255,0.10)', border: 'rgba(173,198,255,0.28)', glow: 'rgba(173,198,255,0.15)', gradient: 'linear-gradient(135deg,#adc6ff,#90b3ff)' },
};

// ─── Single service card ──────────────────────────────────
function ServiceCard({ svc, onNav, index }: { svc: Service; onNav: (id: string) => void; index: number }) {
  const { num, icon, color, cat, title, desc, features, stat, statLabel } = svc;
  const hot = 'hot' in svc ? svc.hot : false;
  const catIcon = 'catIcon' in svc ? svc.catIcon : 'circle';
  const cs  = CAT_STYLE[cat] ?? CAT_STYLE['Development'];
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top)  / rect.height) * 100;
    el.style.setProperty('--sx', `${x}%`);
    el.style.setProperty('--sy', `${y}%`);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.borderColor = cs.border;
        el.style.boxShadow   = `0 0 0 1px ${cs.border}, 0 32px 64px rgba(0,0,0,0.5), 0 0 80px ${cs.glow}`;
        el.style.transform   = 'translateY(-8px)';
        const spot = el.querySelector('.card-spotlight') as HTMLElement | null;
        if (spot) spot.style.opacity = '1';
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.borderColor = 'rgba(255,255,255,0.07)';
        el.style.boxShadow   = '0 8px 32px rgba(0,0,0,0.3)';
        el.style.transform   = '';
        const spot = el.querySelector('.card-spotlight') as HTMLElement | null;
        if (spot) spot.style.opacity = '0';
      }}
      style={{
        width: 'clamp(310px, 26vw, 375px)',
        height: '100%',
        flexShrink: 0,
        borderRadius: 20,
        padding: '30px 26px 26px',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(160deg, rgba(22,22,26,0.92) 0%, rgba(13,13,16,0.97) 100%)',
        border: '1px solid rgba(255,255,255,0.07)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
        transition: 'border-color 0.3s, box-shadow 0.3s, transform 0.32s cubic-bezier(0.34,1.56,0.64,1)',
        cursor: 'default',
        willChange: 'transform',
        backdropFilter: 'blur(6px)',
      }}
    >
      {/* Mouse spotlight */}
      <div
        className="card-spotlight"
        style={{
          position: 'absolute', inset: 0, borderRadius: 20,
          background: `radial-gradient(380px circle at var(--sx, 50%) var(--sy, 50%), ${cs.glow}, transparent 60%)`,
          opacity: 0, transition: 'opacity 0.3s', pointerEvents: 'none', zIndex: 0,
        }}
      />

      {/* Top accent bar */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 1,
        background: `linear-gradient(90deg, transparent 0%, ${color} 40%, transparent 100%)`,
        opacity: 0.55,
      }} />

      {/* Corner glow */}
      <div style={{
        position: 'absolute', top: -60, right: -60, width: 180, height: 180, borderRadius: '50%',
        background: `radial-gradient(circle, ${cs.glow}, transparent 70%)`,
        pointerEvents: 'none',
      }} />

      {/* Ghost number */}
      <div style={{
        position: 'absolute', bottom: -16, right: 14,
        fontSize: 108, fontWeight: 900, lineHeight: 1,
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        color: `${color}09`,
        userSelect: 'none', pointerEvents: 'none',
        letterSpacing: '-0.06em',
      }}>{num}</div>

      {/* ── Content ───────────────────────────────────────── */}
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>

        {/* Row: icon + stat */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
          <div style={{
            width: 50, height: 50, borderRadius: 14, flexShrink: 0,
            background: cs.pill, border: `1px solid ${cs.border}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: `0 0 16px ${cs.glow}`,
          }}>
            <span className="material-symbols-outlined" style={{ fontSize: 23, color, fontVariationSettings: "'FILL' 0" }}>{icon}</span>
          </div>

          <div style={{ textAlign: 'right' }}>
            <div style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 900, fontSize: 21, lineHeight: 1,
              background: cs.gradient, WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>{stat}</div>
            <div style={{ fontSize: 9.5, color: '#4e5368', fontFamily: 'Inter, sans-serif', fontWeight: 500, marginTop: 3 }}>{statLabel}</div>
          </div>
        </div>

        {/* Category pill */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 11 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 5,
            padding: '3px 9px', borderRadius: 99,
            background: cs.pill, border: `1px solid ${cs.border}`,
          }}>
            <span className="material-symbols-outlined" style={{ fontSize: 10, color, fontVariationSettings: "'FILL' 1" }}>{catIcon}</span>
            <span style={{ fontSize: 9, fontWeight: 700, color, textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: 'Inter, sans-serif' }}>{cat}</span>
          </div>
          {hot && (
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 4,
              padding: '3px 8px', borderRadius: 99,
              background: 'rgba(76,215,246,0.1)', border: '1px solid rgba(76,215,246,0.3)',
            }}>
              <span className="material-symbols-outlined" style={{ fontSize: 10, color: '#4cd7f6', fontVariationSettings: "'FILL' 1" }}>local_fire_department</span>
              <span style={{ fontSize: 8.5, fontWeight: 700, color: '#4cd7f6', letterSpacing: '0.1em', fontFamily: 'Inter, sans-serif' }}>HOT</span>
            </div>
          )}
        </div>

        {/* Title */}
        <h3 style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontWeight: 800, fontSize: 'clamp(18px, 1.55vw, 23px)',
          color: '#e5e1e4', margin: '0 0 9px', lineHeight: 1.2,
        }}>{title}</h3>

        {/* Thin divider */}
        <div style={{
          height: 1, marginBottom: 13, opacity: 0.4,
          background: `linear-gradient(90deg, ${cs.border}, transparent)`,
        }} />

        {/* Description */}
        <p style={{
          fontSize: 12.5, color: '#72768a', lineHeight: 1.82,
          fontFamily: 'Inter, sans-serif', margin: '0 0 18px', flex: 1,
        }}>{desc}</p>

        {/* Features 2-col grid */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '7px 10px', marginBottom: 22,
        }}>
          {features.map(f => (
            <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{
                width: 4, height: 4, borderRadius: '50%', flexShrink: 0,
                background: color, boxShadow: `0 0 5px ${color}`,
              }} />
              <span style={{ fontSize: 11, fontWeight: 500, color: '#a8acbe', fontFamily: 'Inter, sans-serif' }}>{f}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <button
          onClick={() => onNav('contact')}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
            padding: '10px 16px', borderRadius: 10,
            border: `1px solid ${cs.border}`,
            background: cs.pill, color,
            fontSize: 12, fontWeight: 700, fontFamily: 'Inter, sans-serif',
            cursor: 'pointer', transition: 'all 0.22s', letterSpacing: '0.03em',
            flexShrink: 0,
          }}
          onMouseEnter={e => {
            const b = e.currentTarget as HTMLButtonElement;
            b.style.background = cs.glow;
            b.style.boxShadow  = `0 6px 20px ${cs.glow}`;
            b.style.transform  = 'translateY(-1px)';
          }}
          onMouseLeave={e => {
            const b = e.currentTarget as HTMLButtonElement;
            b.style.background = cs.pill;
            b.style.boxShadow  = '';
            b.style.transform  = '';
          }}
        >
          Get a Quote
          <span className="material-symbols-outlined" style={{ fontSize: 13, fontVariationSettings: "'FILL' 0" }}>arrow_forward</span>
        </button>
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────
export default function ServicesPanel({ onNav, scrollContainerRef }: ServicesPanelProps) {
  const stripRef    = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const counterRef  = useRef<HTMLSpanElement>(null);
  const hintRef     = useRef<HTMLDivElement>(null);
  const dotsRef     = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    const strip     = stripRef.current;
    if (!container || !strip) return;

    let current = 0;
    let target  = 0;
    let rafId   = 0;
    let running = true;

    const computeTarget = () => {
      const scrollTop   = container.scrollTop;
      const vh          = window.innerHeight;
      const startPx     = SVC_START_PAGE   * vh;
      const spacePx     = SVC_SCROLL_PAGES * vh;
      const rawProgress = (scrollTop - startPx) / spacePx;
      const progress    = Math.max(0, Math.min(1, rawProgress));
      // Use offsetWidth of the parent viewport and the strip's full layout width
      // (scrollWidth is unreliable when overflow:hidden + translateX is used;
      //  instead compute: total strip content width - visible parent width)
      const viewWidth   = strip.parentElement?.offsetWidth ?? (window.innerWidth - 72);
      // Walk children to find the real rightmost edge (accurate even with translateX)
      let rightEdge = 0;
      strip.childNodes.forEach((child) => {
        const el = child as HTMLElement;
        if (el.offsetLeft !== undefined) {
          rightEdge = Math.max(rightEdge, el.offsetLeft + el.offsetWidth);
        }
      });
      // Add right padding of the strip itself
      const stripStyle  = window.getComputedStyle(strip);
      const paddingRight = parseFloat(stripStyle.paddingRight) || 0;
      const totalWidth  = rightEdge + paddingRight;
      const maxX        = Math.max(0, totalWidth - viewWidth);
      target = progress * maxX;

      if (progressRef.current) progressRef.current.style.width = `${progress * 100}%`;
      const idx = Math.min(Math.round(progress * (SERVICES.length - 1)), SERVICES.length - 1);
      if (counterRef.current) counterRef.current.textContent = String(idx + 1).padStart(2, '0');
      if (hintRef.current) hintRef.current.style.opacity = progress > 0.02 ? '0' : '1';

      dotsRef.current.forEach((d, i) => {
        if (!d) return;
        const active = i === idx;
        d.style.background = active ? '#adc6ff' : 'rgba(255,255,255,0.08)';
        d.style.transform  = active ? 'scale(1.6)' : 'scale(1)';
        d.style.boxShadow  = active ? '0 0 8px rgba(173,198,255,0.8)' : 'none';
      });
    };

    const animate = () => {
      if (!running) return;
      // 0.13 lerp factor: smooth but responsive (was 0.095 which felt sluggish)
      current += (target - current) * 0.13;
      // Snap to exact target when very close to avoid infinite micro-updates
      if (Math.abs(target - current) < 0.1) current = target;
      if (strip) strip.style.transform = `translateX(${-current}px)`;
      rafId = requestAnimationFrame(animate);
    };

    container.addEventListener('scroll', computeTarget, { passive: true });
    computeTarget();
    rafId = requestAnimationFrame(animate);

    return () => {
      running = false;
      container.removeEventListener('scroll', computeTarget);
      cancelAnimationFrame(rafId);
    };
  }, [scrollContainerRef]);

  return (
    <div style={{
      height: '100%', display: 'flex', flexDirection: 'column',
      background: '#09090B', position: 'relative', overflow: 'hidden',
    }}>
      {/* Background */}
      <div className="grid-overlay" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }} />
      <div style={{
        position: 'absolute', top: '35%', left: '30%', width: 600, height: 600, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(173,198,255,0.04), transparent 70%)',
        filter: 'blur(60px)', pointerEvents: 'none', zIndex: 0, transform: 'translate(-50%,-50%)',
      }} />
      <div style={{
        position: 'absolute', top: '65%', right: '8%', width: 380, height: 380, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(76,215,246,0.04), transparent 70%)',
        filter: 'blur(60px)', pointerEvents: 'none', zIndex: 0,
      }} />

      <div style={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column' }}>

        {/* ── Header ────────────────────────────────────────── */}
        <div style={{ padding: '38px 64px 16px', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>

            <div>
              {/* Label row */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                <div style={{ width: 26, height: 1.5, background: 'linear-gradient(90deg,#adc6ff,transparent)' }} />
                <span style={{
                  fontSize: 10.5, fontWeight: 700, color: '#adc6ff',
                  textTransform: 'uppercase', letterSpacing: '0.16em', fontFamily: 'Inter, sans-serif',
                }}>What We Build</span>
              </div>

              <h2 style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 800, fontSize: 'clamp(26px, 3vw, 44px)',
                lineHeight: 1.1, color: '#e5e1e4', margin: 0,
              }}>
                One agency.{' '}
                <span style={{
                  background: 'linear-gradient(135deg, #adc6ff 0%, #d0bcff 50%, #4cd7f6 100%)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                }}>Every service<br />you need.</span>
              </h2>
            </div>

            {/* Counter + progress */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 10, flexShrink: 0 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                <span ref={counterRef} style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 900, fontSize: 40, color: '#adc6ff', lineHeight: 1,
                  textShadow: '0 0 28px rgba(173,198,255,0.5)',
                }}>01</span>
                <span style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 400, fontSize: 20, color: '#252830', lineHeight: 1,
                }}>&thinsp;/ {String(SERVICES.length).padStart(2, '0')}</span>
              </div>

              <div style={{ width: 180, height: 3, borderRadius: 99, background: 'rgba(255,255,255,0.05)', overflow: 'hidden' }}>
                <div ref={progressRef} style={{
                  height: '100%', borderRadius: 99, width: '0%',
                  background: 'linear-gradient(90deg, #adc6ff, #d0bcff, #4cd7f6)',
                  boxShadow: '0 0 8px rgba(173,198,255,0.5)',
                }} />
              </div>

              <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                {SERVICES.map((_, i) => (
                  <div
                    key={i}
                    ref={el => { dotsRef.current[i] = el; }}
                    style={{
                      width: 5, height: 5, borderRadius: '50%',
                      background: i === 0 ? '#adc6ff' : 'rgba(255,255,255,0.08)',
                      transition: 'background 0.3s, transform 0.3s, box-shadow 0.3s',
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Scroll hint */}
          <div ref={hintRef} style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 16, opacity: 1, transition: 'opacity 0.6s ease' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '5px 12px', borderRadius: 99,
              background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
            }}>
              <span className="material-symbols-outlined" style={{
                fontSize: 13, color: '#424754', fontVariationSettings: "'FILL' 0",
                animation: 'bounce 2s ease-in-out infinite',
              }}>keyboard_arrow_down</span>
              <span style={{
                fontSize: 10.5, fontWeight: 600, color: '#424754',
                letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif',
              }}>Scroll to explore all {SERVICES.length} services</span>
            </div>
          </div>
        </div>

        {/* ── Horizontal card strip ──────────────────────────── */}
        <div style={{ flex: 1, position: 'relative', overflow: 'hidden', paddingBottom: 28 }}>

          {/* Edge fades */}
          <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 90, background: 'linear-gradient(to right, #09090B 20%, transparent)', zIndex: 10, pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 90, background: 'linear-gradient(to left, #09090B 20%, transparent)', zIndex: 10, pointerEvents: 'none' }} />

          <div
            ref={stripRef}
            style={{
              display: 'flex', alignItems: 'stretch', gap: 18,
              height: '100%', paddingLeft: 64, paddingRight: 130,
              willChange: 'transform', transform: 'translateX(0px)',
            }}
          >
            {SERVICES.map((svc, i) => (
              <ServiceCard key={svc.title} svc={svc} onNav={onNav} index={i} />
            ))}

            {/* CTA end-card */}
            <div style={{
              width: 'clamp(260px, 22vw, 330px)', height: '100%', flexShrink: 0,
              borderRadius: 20, padding: '32px 26px',
              background: 'linear-gradient(160deg, rgba(22,22,26,0.92), rgba(13,13,16,0.97))',
              border: '1px solid rgba(173,198,255,0.12)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              textAlign: 'center', gap: 20, position: 'relative', overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute', top: -40, left: '50%', transform: 'translateX(-50%)',
                width: 220, height: 220, borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(173,198,255,0.07), transparent 70%)',
                pointerEvents: 'none',
              }} />

              <div style={{
                width: 66, height: 66, borderRadius: '50%', position: 'relative',
                background: 'linear-gradient(135deg, rgba(173,198,255,0.12), rgba(208,188,255,0.08))',
                border: '1px solid rgba(173,198,255,0.25)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 0 30px rgba(173,198,255,0.12)',
              }}>
                <span className="material-symbols-outlined" style={{ fontSize: 30, color: '#adc6ff', fontVariationSettings: "'FILL' 0" }}>handshake</span>
              </div>

              <div style={{ position: 'relative' }}>
                <div style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 800, fontSize: 19, color: '#e5e1e4', marginBottom: 10, lineHeight: 1.35,
                }}>Need something<br />bespoke?</div>
                <p style={{ fontSize: 12.5, color: '#4e5368', fontFamily: 'Inter, sans-serif', lineHeight: 1.7, margin: 0 }}>
                  Every business is unique. Let&apos;s craft a custom solution built precisely around your needs.
                </p>
              </div>

              <button
                className="btn-primary"
                style={{ fontSize: 13, padding: '12px 22px', borderRadius: 10 }}
                onClick={() => onNav('contact')}
              >
                Start a Conversation
                <span className="material-symbols-outlined" style={{ fontSize: 16 }}>arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
