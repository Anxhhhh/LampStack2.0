'use client';

import { useState } from 'react';

const NAV = [
  { id: 'home',     label: 'Home',     icon: 'home' },
  { id: 'services', label: 'Services', icon: 'hub' },
  { id: 'work',     label: 'Work',     icon: 'folder_open' },
  { id: 'about',    label: 'About',    icon: 'group' },
  { id: 'contact',  label: 'Contact',  icon: 'mail' },
];

const SOCIALS = [
  { label: 'GitHub',    icon: 'code',     href: '#' },
  { label: 'LinkedIn',  icon: 'work',     href: '#' },
  { label: 'Instagram', icon: 'rss_feed', href: '#' },
];

interface SidebarProps {
  active: string;
  onNav: (id: string) => void;
}

export default function Sidebar({ active, onNav }: SidebarProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <aside
      className={`sidebar${hovered ? ' expanded' : ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="sidebar-logo">
        <div className="sidebar-logo-icon">L</div>
        <span className="sidebar-logo-text">LampStack</span>
      </div>

      <div className="nav-items">
        {NAV.map(({ id, label, icon }) => (
          <button
            key={id}
            className={`nav-item${active === id ? ' active' : ''}`}
            onClick={() => onNav(id)}
          >
            <span
              className="material-symbols-outlined nav-icon"
              style={{ fontVariationSettings: active === id ? "'FILL' 1" : "'FILL' 0" }}
            >
              {icon}
            </span>
            <span className="nav-label">{label}</span>
            <span className="active-dot" />
          </button>
        ))}
      </div>

      <div className="sidebar-bottom">
        <div style={{ height: 1, background: 'rgba(255,255,255,0.05)', margin: '8px 4px 12px' }} />
        {SOCIALS.map(({ label, icon, href }) => (
          <a key={label} href={href} className="social-btn" style={{ textDecoration: 'none' }}>
            <span className="material-symbols-outlined nav-icon" style={{ fontVariationSettings: "'FILL' 0" }}>{icon}</span>
            <span className="nav-label">{label}</span>
          </a>
        ))}
      </div>
    </aside>
  );
}
