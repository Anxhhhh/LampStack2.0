'use client';
import { useState } from 'react';

const SERVICES_LIST = ['Web Development','App Development','Software Development','AI Solutions','Business Automation','UI & UX Design','Graphic Design','Video Editing','Social Media Management','Workspace Management'];
const BUDGETS = ['Under $500','$500 – $2,000','$2,000 – $10,000','$10,000+'];
const FAQS = [
  { q: 'How quickly can you start?',            a: 'Within 5–7 business days after agreement. Fast-track available for urgent projects.' },
  { q: 'Do you work with early-stage startups?',a: 'Yes — flexible models for startup budgets with rapid iteration timelines.' },
  { q: 'What does your process look like?',     a: '7 steps: Discovery → Strategy → Design → Development → Testing → Launch → Support. Weekly check-ins with full visibility.' },
  { q: 'Will I own the code and IP?',           a: 'Always. Full IP ownership transferred to you on final payment. No lock-in, ever.' },
  { q: 'What happens after launch?',            a: 'Monthly retainer packages covering updates, monitoring, and AI retraining as needed.' },
  { q: 'Can you work on existing codebases?',   a: 'Yes. We regularly audit, refactor, and extend existing projects from any stack.' },
];
const INFO = [
  { icon: 'mail',        label: 'Email',    value: 'hello@lampstack.dev',    color: '#adc6ff' },
  { icon: 'schedule',    label: 'Hours',    value: 'Mon–Sat, 10am–8pm PKT', color: '#4cd7f6' },
  { icon: 'location_on', label: 'Base',     value: 'Pakistan · Remote-First',color: '#d0bcff' },
  { icon: 'support_agent',label:'Response', value: 'Within 24 hours',        color: '#adc6ff' },
];

interface FormState { name: string; email: string; company: string; message: string; }

export default function ContactPanel() {
  const [form, setForm]       = useState<FormState>({ name: '', email: '', company: '', message: '' });
  const [service, setService] = useState('');
  const [budget, setBudget]   = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [sent, setSent]       = useState(false);

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#09090B', position: 'relative', overflow: 'hidden', padding: '44px 60px 32px', boxSizing: 'border-box' }}>
      <div className="grid-overlay" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }} />

      <div style={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <div style={{ marginBottom: 16 }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: '#4cd7f6', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 4, fontFamily: 'Inter,sans-serif' }}>Let&apos;s Build Together</p>
          <h2 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 800, fontSize: 'clamp(24px,3vw,40px)', lineHeight: 1.12, color: '#e5e1e4', margin: '0 0 12px' }}>
            Tell us about your <span style={{ color: '#4cd7f6' }}>vision.</span>
          </h2>
          {/* Info strip */}
          <div style={{ display: 'flex', gap: 10 }}>
            {INFO.map(({ icon, label, value, color }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 14px', borderRadius: 10, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <span className="material-symbols-outlined" style={{ fontSize: 15, color, fontVariationSettings: "'FILL' 0" }}>{icon}</span>
                <span style={{ fontSize: 12, color: '#8c909f', fontFamily: 'Inter,sans-serif' }}><strong style={{ color: '#c2c6d6' }}>{label}:</strong> {value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 2-column layout: Form | FAQ */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.25fr 1fr', gap: 16, flex: 1, minHeight: 0 }}>

          {/* Form */}
          <div style={{ borderRadius: 24, padding: '24px 28px', overflow: 'hidden', background: 'linear-gradient(160deg, rgba(22,22,25,0.95) 0%, rgba(16,16,19,0.98) 100%)', border: '1px solid rgba(255,255,255,0.06)' }}>
            {sent ? (
              <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: 16 }}>
                <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(76,215,246,0.1)', border: '2px solid rgba(76,215,246,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 34, color: '#4cd7f6', fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                </div>
                <div>
                  <h3 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: 22, color: '#e5e1e4', marginBottom: 8 }}>Message Sent!</h3>
                  <p style={{ fontSize: 14, color: '#8c909f', fontFamily: 'Inter,sans-serif', margin: 0, lineHeight: 1.6 }}>We&apos;ll respond within 24 hours with a tailored proposal.</p>
                </div>
                <button className="btn-ghost" onClick={() => setSent(false)}>Send Another Message</button>
              </div>
            ) : (
              <form onSubmit={e => { e.preventDefault(); setSent(true); }} style={{ display: 'flex', flexDirection: 'column', gap: 12, height: '100%' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  {([['Full Name *','name','text','Your Name'],['Email *','email','email','hello@company.com']] as const).map(([label,key,type,ph]) => (
                    <div key={key}>
                      <label style={{ fontSize: 10, fontWeight: 700, color: '#8c909f', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: 5, fontFamily: 'Inter,sans-serif' }}>{label}</label>
                      <input required type={type} className="field" placeholder={ph} value={form[key as keyof FormState]} onChange={e => setForm({ ...form, [key]: e.target.value })} />
                    </div>
                  ))}
                </div>
                <div>
                  <label style={{ fontSize: 10, fontWeight: 700, color: '#8c909f', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: 5, fontFamily: 'Inter,sans-serif' }}>Company / Project</label>
                  <input type="text" className="field" placeholder="Your Company" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} />
                </div>
                <div>
                  <label style={{ fontSize: 10, fontWeight: 700, color: '#8c909f', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: 8, fontFamily: 'Inter,sans-serif' }}>Service Needed</label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {SERVICES_LIST.map(s => (
                      <button type="button" key={s} onClick={() => setService(service === s ? '' : s)} className="chip"
                        style={service === s ? { borderColor: 'rgba(173,198,255,0.5)', background: 'rgba(173,198,255,0.12)', color: '#adc6ff', fontSize: 11, padding: '4px 10px' } : { borderColor: 'rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.04)', color: '#8c909f', fontSize: 11, padding: '4px 10px' }}>
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: 10, fontWeight: 700, color: '#8c909f', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: 8, fontFamily: 'Inter,sans-serif' }}>Budget</label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {BUDGETS.map(b => (
                      <button type="button" key={b} onClick={() => setBudget(budget === b ? '' : b)} className="chip"
                        style={budget === b ? { borderColor: 'rgba(208,188,255,0.5)', background: 'rgba(208,188,255,0.12)', color: '#d0bcff', fontSize: 11, padding: '4px 10px' } : { borderColor: 'rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.04)', color: '#8c909f', fontSize: 11, padding: '4px 10px' }}>
                        {b}
                      </button>
                    ))}
                  </div>
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: 10, fontWeight: 700, color: '#8c909f', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: 5, fontFamily: 'Inter,sans-serif' }}>Project Brief *</label>
                  <textarea required className="field" style={{ resize: 'none', height: '100%', minHeight: 80 }}
                    placeholder="Describe your project, goals, and timeline..." value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
                </div>
                <button type="submit" className="btn-primary" style={{ justifyContent: 'center', padding: '13px', fontSize: 14 }}>
                  Send Project Brief <span className="material-symbols-outlined" style={{ fontSize: 17 }}>send</span>
                </button>
              </form>
            )}
          </div>

          {/* FAQ + CTA */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, minHeight: 0 }}>
            {/* Quick CTA */}
            <div className="glass-card" style={{ borderRadius: 16, padding: '18px 20px', display: 'flex', gap: 12, alignItems: 'center', flexShrink: 0 }}>
              <div style={{ width: 40, height: 40, borderRadius: 11, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(76,215,246,0.1)', border: '1px solid rgba(76,215,246,0.22)' }}>
                <span className="material-symbols-outlined" style={{ fontSize: 20, color: '#4cd7f6', fontVariationSettings: "'FILL' 1" }}>chat</span>
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#e5e1e4', fontFamily: 'Inter,sans-serif', marginBottom: 2 }}>Prefer to talk first?</div>
                <a href="mailto:hello@lampstack.dev" style={{ fontSize: 13, color: '#4cd7f6', fontWeight: 600, fontFamily: 'Inter,sans-serif', textDecoration: 'none' }}>Book a free 30-min discovery call &rarr;</a>
              </div>
            </div>

            {/* FAQ */}
            <div style={{ borderRadius: 20, padding: '20px 22px', flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', background: 'linear-gradient(160deg, rgba(22,22,25,0.95) 0%, rgba(16,16,19,0.98) 100%)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: '#8c909f', textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: 'Inter,sans-serif', margin: '0 0 12px' }}>Frequently Asked</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
                {FAQS.map(({ q, a }, i) => (
                  <div key={q} className="faq-item">
                    <button className="faq-q" style={{ padding: '12px 16px' }} onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                      <span style={{ fontSize: 13 }}>{q}</span>
                      <span className="material-symbols-outlined" style={{ color: '#adc6ff', fontSize: 18, flexShrink: 0, fontVariationSettings: "'FILL' 0", transform: openFaq === i ? 'rotate(180deg)' : 'none', transition: 'transform 0.25s' }}>keyboard_arrow_down</span>
                    </button>
                    {openFaq === i && <div className="faq-a" style={{ fontSize: 13, padding: '0 16px 12px' }}>{a}</div>}
                  </div>
                ))}
              </div>
            </div>

            {/* Footer strip */}
            <div style={{ padding: '14px 18px', borderRadius: 14, background: 'rgba(173,198,255,0.05)', border: '1px solid rgba(173,198,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 26, height: 26, borderRadius: 7, background: 'linear-gradient(135deg,#adc6ff,#d0bcff)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#001a42', fontWeight: 900, fontSize: 12 }}>L</div>
                <span style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: 14, color: '#adc6ff' }}>LampStack</span>
                <span style={{ fontSize: 12, color: '#424754', fontFamily: 'Inter,sans-serif' }}>· Full-Spectrum Digital Agency</span>
              </div>
              <span style={{ fontSize: 12, color: '#424754', fontFamily: 'Inter,sans-serif' }}>© 2025 LampStack</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
