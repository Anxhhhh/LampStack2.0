"use client";
import { useState, useEffect, useRef } from 'react';
import Sidebar    from './components/Sidebar';
import HomePanel  from './sections/HomePanel';
import ServicesPanel from './sections/ServicesPanel';
import WorkPanel  from './sections/WorkPanel';
import AboutPanel from './sections/AboutPanel';
import ContactPanel from './sections/ContactPanel';

// ─── Constants shared with ServicesPanel ──────────────────
// Services section gets this many extra scroll "pages" for the horizontal animation.
// One page = one viewport height of outer scroll.
export const SVC_SCROLL_PAGES = 10;

// ── How the absolute slide-over stack works ─────────────
// All section containers are absolutely positioned within a wrapper.
// Each container goes from its specific 'top' down to 'bottom: 0'.
// Because they stretch to the end of the page, they NEVER release their
// sticky state. They pile up perfectly, so transparent rounded corners
// never reveal a background scrolling away.
//
// Geometry:
// Total scrollable height = 1500vh (max scrollTop = 1400vh)
//
// Home:     top: 0
// Services: top: 100vh   → slides over Home from 0–100vh, sticks at 100vh.
//                        → Horiz scrolls from 100vh to 1100vh.
// Work:     top: 1200vh  → slides over Services from 1100vh–1200vh.
// About:    top: 1300vh  → slides over Work from 1200vh–1300vh.
// Contact:  top: 1400vh  → slides over About from 1300vh–1400vh.
//
export const SVC_START_PAGE = 1;

const OFF = {
  home:     0,
  services: 1,
  work:     12,
  about:    13,
  contact:  14,
} as const;

type SectionId = keyof typeof OFF;

export default function App() {
  const [active, setActive]   = useState<SectionId>('home');
  const scrollRef             = useRef<HTMLDivElement>(null);

  // ── Scroll spy ───────────────────────────────────────────
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const spy = () => {
      const t  = el.scrollTop;
      const vh = window.innerHeight;
      if      (t < OFF.services * vh) setActive('home');
      else if (t < OFF.work     * vh) setActive('services');
      else if (t < OFF.about    * vh) setActive('work');
      else if (t < OFF.contact  * vh) setActive('about');
      else                            setActive('contact');
    };
    el.addEventListener('scroll', spy, { passive: true });
    return () => el.removeEventListener('scroll', spy);
  }, []);

  // ── Navigation ───────────────────────────────────────────
  const handleNav = (id: string) => {
    const el = scrollRef.current;
    if (!el) return;
    const pages = OFF[id as SectionId] ?? 0;
    el.scrollTo({ top: pages * window.innerHeight, behavior: 'smooth' });
    setActive(id as SectionId);
  };

  // ── Shared section styles ────────────────────────────────
  const sectionBase: React.CSSProperties = {
    position: 'sticky', top: 0,
    height: '100vh', overflow: 'hidden',
    background: '#09090B',
  };

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', background: '#09090B' }}>
      <div className="bg-noise" />
      <Sidebar active={active} onNav={handleNav} />

      {/* ── Outer scroll track (hidden scrollbar) ─────────── */}
      <div
        ref={scrollRef}
        id="main-scroll"
        style={{
          position: 'fixed', left: 72, top: 0, right: 0, bottom: 0,
          overflowY: 'scroll', overflowX: 'hidden',
          scrollbarWidth: 'none',
        } as React.CSSProperties}
      >
        <div style={{ position: 'relative', height: '1500vh' }}>

          {/* HOME */}
          <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
            <section style={{ ...sectionBase, zIndex: 1 }}>
              <HomePanel onNav={handleNav} />
            </section>
          </div>

          {/* SERVICES */}
          <div style={{ position: 'absolute', top: '100vh', bottom: 0, left: 0, right: 0 }}>
            <section style={{
              ...sectionBase, zIndex: 2,
              borderRadius: '20px 20px 0 0',
              boxShadow: '0 -24px 60px rgba(0,0,0,0.85)',
            }}>
              <ServicesPanel onNav={handleNav} scrollContainerRef={scrollRef} />
            </section>
          </div>

          {/* WORK */}
          <div style={{ position: 'absolute', top: '1200vh', bottom: 0, left: 0, right: 0 }}>
            <section style={{
              ...sectionBase, zIndex: 3,
              borderRadius: '20px 20px 0 0',
              boxShadow: '0 -24px 60px rgba(0,0,0,0.85)',
            }}>
              <WorkPanel onNav={handleNav} />
            </section>
          </div>

          {/* ABOUT */}
          <div style={{ position: 'absolute', top: '1300vh', bottom: 0, left: 0, right: 0 }}>
            <section style={{
              ...sectionBase, zIndex: 4,
              borderRadius: '20px 20px 0 0',
              boxShadow: '0 -24px 60px rgba(0,0,0,0.85)',
            }}>
              <AboutPanel onNav={handleNav} />
            </section>
          </div>

          {/* CONTACT */}
          <div style={{ position: 'absolute', top: '1400vh', bottom: 0, left: 0, right: 0 }}>
            <section style={{
              ...sectionBase, zIndex: 5,
              borderRadius: '20px 20px 0 0',
              boxShadow: '0 -24px 60px rgba(0,0,0,0.85)',
            }}>
              <ContactPanel />
            </section>
          </div>

        </div>
      </div>
    </div>
  );
}
