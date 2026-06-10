// GaleON — header, service strip, and service-reactive hero.

const { useState, useMemo, useRef, useEffect } = React;

// ─── Icons ──────────────────────────────────────────────────────────────────
const Icon = {
  arrow: (s = 16) =>
  <svg className="gl-arrow" width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m13 5 7 7-7 7" /></svg>,

  chevron: (s = 14) =>
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>,

  menu: (s = 22) =>
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M4 8h16" /><path d="M4 16h16" /></svg>,

  plane: (s = 14) =>
  <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor"><path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1L15 22v-1.5L13 19v-5.5L21 16z" /></svg>,

  star: (s = 14) =>
  <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor"><path d="m12 2 2.9 6.5 7.1.7-5.4 4.8 1.6 7L12 17.3 5.8 21l1.6-7L2 9.2l7.1-.7L12 2z" /></svg>

};

// ─── Service icons (line, 24px viewBox) ─────────────────────────────────────
const sv = (s, stroke = 1.6) => ({
  width: s, height: s, viewBox: '0 0 24 24', fill: 'none',
  stroke: 'currentColor', strokeWidth: stroke,
  strokeLinecap: 'round', strokeLinejoin: 'round'
});
const ServiceIcon = {
  // concierge bell
  hospitalidade: (s = 20) =>
  <svg {...sv(s)}><path d="M4 18h16" /><path d="M5 18a7 7 0 0 1 14 0" /><path d="M12 8V6" /><path d="M10 4h4" /></svg>,

  // takeout container w/ steam
  delivery: (s = 20) =>
  <svg {...sv(s)}><path d="M5 10h14l-1.2 9.2A1.5 1.5 0 0 1 16.3 21H7.7a1.5 1.5 0 0 1-1.5-1.3L5 10z" /><path d="M5 10h14" /><path d="M9 7c0-1.5 1.5-2 1.5-3M14 7c0-1.5 1.5-2 1.5-3" /></svg>,

  // lounge sofa
  vip: (s = 20) =>
  <svg {...sv(s)}><path d="M4 14v-3a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3" /><path d="M3 14a2 2 0 0 1 2 2v2h14v-2a2 2 0 0 1 2-2" /><path d="M7 14V11" /><path d="M17 14V11" /></svg>,

  // car
  transportes: (s = 20) =>
  <svg {...sv(s)}><path d="M5 16v-3l2-5h10l2 5v3" /><path d="M3 13h18" /><path d="M5 16v2h2v-2" /><path d="M17 16v2h2v-2" /><circle cx="7.5" cy="14.5" r="1" /><circle cx="16.5" cy="14.5" r="1" /></svg>,

  // locker / luggage
  guarda: (s = 20) =>
  <svg {...sv(s)}><rect x="5" y="6" width="14" height="14" rx="2" /><path d="M9 3h6v3H9z" /><path d="M5 12h14" /><circle cx="16" cy="15" r="0.6" fill="currentColor" /></svg>,

  // currency exchange
  cambio: (s = 20) =>
  <svg {...sv(s)}><path d="M4 8h13l-3-3" /><path d="M20 16H7l3 3" /></svg>,

  // shopping bag w/ handle
  personal: (s = 20) =>
  <svg {...sv(s)}><path d="M6 8h12l-1 12H7L6 8z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /></svg>

};

// ─── Service data ───────────────────────────────────────────────────────────
const SERVICES = [
{
  key: 'hospitalidade', label: 'Meet & Greet', caption: 'Recepção personalizada', color: 'var(--c-meet-greet)', ink: 'var(--c-meet-greet-foreground)', inHero: true,
  short: 'Atendimento exclusivo, do desembarque ao embarque.',
  headline: 'Sua jornada, cuidada de ponta a ponta.',
  subline: 'Check-in assistido, fast-track e condução até o portão.',
  cta: 'Garanta sua Hospitalidade',
  slot: 'gl-hero-hospitalidade',
  photo: 'atendente da Hospitalidade recebendo passageiro'
},
{
  key: 'delivery', label: 'Delivery', caption: 'Entregas no portão', color: 'var(--c-delivery)', ink: 'var(--c-delivery-foreground)', inHero: true,
  short: 'Comida no portão de embarque, em 12 min.',
  headline: 'Comer sem sair do portão de embarque.',
  subline: 'Restaurantes do Galeão entregam no seu assento em 12 min.',
  cta: 'Peça no portão de embarque',
  slot: 'gl-hero-delivery',
  photo: 'bandeja entregue no portão de embarque'
},
{
  key: 'vip', label: 'Sala VIP', caption: 'Acesso a salas exclusivas', color: 'var(--c-sala-vip)', ink: 'var(--c-sala-vip-foreground)', inHero: true,
  short: 'Embarque com privacidade e conforto.',
  headline: 'Embarque sem barulho, com chuveiro e bebida.',
  subline: 'Salas domésticas e internacionais por hora, sem milhas.',
  cta: 'Reserve sua Sala VIP',
  slot: 'gl-hero-vip',
  photo: 'sala VIP com vista para a pista'
},
{
  key: 'transportes', label: 'Transportes', caption: 'Comuns e executivos', color: 'var(--c-transportes)', ink: 'var(--c-transportes-foreground)', inHero: true,
  short: 'Táxi e transfer, planejado ou imediato.',
  headline: 'Táxi e transfer pra começar leve.',
  subline: 'Motorista te encontra no portão certo, no horário certo.',
  cta: 'Reserve seu transfer',
  slot: 'gl-hero-transportes',
  photo: 'van de transfer encostada no terminal'
},
{
  key: 'guarda', label: 'Guarda-volume', caption: 'Locação de armários', color: 'var(--c-guarda)', ink: 'var(--c-guarda-foreground)', inHero: true,
  short: 'Bagagem em segurança no aeroporto.',
  headline: 'Deixe a bagagem em segurança e ande leve.',
  subline: 'Despache as malas no aeroporto e retire quando voltar.',
  cta: 'Reserve seu guarda-volume',
  slot: 'gl-hero-guarda',
  photo: 'compartimentos do guarda-volume do Galeão'
},
{
  key: 'cambio', label: 'Câmbio', caption: 'Moedas internacionais', color: 'var(--c-cambio)', ink: 'var(--c-cambio-foreground)', inHero: true,
  short: 'Troque moeda sem fila.',
  headline: 'Troque moeda sem fila.',
  subline: 'Reserve a taxa antes e retire no balcão do Galeão.',
  cta: 'Reserve seu câmbio',
  slot: 'gl-hero-cambio',
  photo: 'balcão de câmbio do Galeão'
},
{
  key: 'personal', label: 'Personal Shopper', caption: 'Assistência para compras', color: 'var(--c-personal)', ink: 'var(--c-personal-foreground)', inHero: true,
  short: 'Alguém compra por você nas lojas.',
  headline: 'Alguém compra por você nas lojas.',
  subline: 'Diga o que quer; entregamos antes do embarque.',
  cta: 'Falar com Personal Shopper',
  slot: 'gl-hero-personal',
  photo: 'personal shopper em loja do duty free'
}];


const SVC_BY_KEY = Object.fromEntries(SERVICES.map((s) => [s.key, s]));

// ─── Header (institutional topbar) ──────────────────────────────────────────
function Header({ mobile }) {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY.current;
      if (Math.abs(delta) < 5) return;
      setHidden(delta > 0 && y > 10);
      lastY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: 'rgba(255,255,255,0.92)',
      backdropFilter: 'blur(16px) saturate(180%)',
      WebkitBackdropFilter: 'blur(16px) saturate(180%)',
      transform: hidden ? 'translateY(-110%)' : 'translateY(0)',
      transition: 'transform var(--dur-moderate) ease'
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: mobile ? 'var(--space-24) var(--space-20) var(--space-16)' : 'var(--space-28) var(--space-40) var(--space-20)'
      }}>
        <a href="#" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-8)'}}>
          <image-slot
            id="gl-logo"
            shape="rect"
            fit="contain"
            placeholder="logo GaleON (PNG)"
            style={{
              width: mobile ? 108 : 132,
              height: mobile ? 28 : 34,
              display: 'block',
              background: 'transparent',
              ['--imgslot-frame-bg']: 'transparent'
            }}>
          </image-slot>
        </a>
        {!mobile &&
        <nav style={{ display: 'flex', gap: 'var(--space-8)', alignItems: 'center' }}>
            <ServicesDropdown open={open} setOpen={setOpen} />
            <a href="#" style={navLinkStyle}>Atendimento</a>
            <a href="#" style={navLinkStyle}>Entrar</a>
            <LanguageSelector />
          </nav>
        }
        {mobile &&
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-8)'}}>
          <LanguageSelector compact />
          <button className="gl-btn gl-btn--ghost gl-btn--icon">{Icon.menu()}</button>
        </div>
        }
      </div>
    </header>);

}

const navLinkStyle = {
  fontSize: 'var(--text-small)', color: 'var(--c-foreground)', fontWeight: 500,
  padding: 'var(--space-8) var(--space-16)', borderRadius: 'var(--r-sm)'
};

// ─── Language selector ─────────────────────────────────────────────────────
// Three locales, flag-led. Default pt-BR. Flags served as SVG from flagcdn.com
// (https://flagcdn.com/{cc}.svg). The trigger shows just the current flag in
// a rounded rect; the dropdown shows flag + label for each option.
const LOCALES = [
  { code: 'pt-BR', cc: 'br', label: 'Português', short: 'PT' },
  { code: 'en-US', cc: 'us', label: 'English',   short: 'EN' },
  { code: 'es-ES', cc: 'es', label: 'Español',   short: 'ES' }
];

function Flag({ cc, size = 22 }) {
  return (
    <span style={{
      display: 'inline-block',
      width: size, height: Math.round(size * 0.72),
      borderRadius: 4, overflow: 'hidden',
      flexShrink: 0,
      boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.08)',
      background: '#eee'
    }}>
      <img
        src={`https://flagcdn.com/${cc}.svg`}
        alt=""
        aria-hidden="true"
        loading="lazy"
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
    </span>);

}

function LanguageSelector({ compact = false }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('pt-BR');
  const ref = useRef(null);
  const current = LOCALES.find((l) => l.code === active) || LOCALES[0];

  return (
    <div
      ref={ref}
      style={{ position: 'relative' }}
      onMouseEnter={() => !compact && setOpen(true)}
      onMouseLeave={() => !compact && setOpen(false)}>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={`Idioma: ${current.label}`}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 'var(--space-8)',
          background: open ? 'var(--c-background-soft)' : 'transparent', border: 0,
          padding: compact ? 'var(--space-8) var(--space-8)' : 'var(--space-8) var(--space-12) var(--space-8) var(--space-8)',
          borderRadius: 'var(--r-pill)',
          fontSize: 'var(--text-small)', color: 'var(--c-foreground)', fontWeight: 500,
          fontFamily: 'inherit', cursor: 'pointer',
          transition: 'background var(--dur-fast) ease'
        }}>
        <Flag cc={current.cc} size={compact ? 20 : 22} />
        {!compact &&
          <span style={{ color: 'var(--c-muted-foreground)', display: 'inline-flex', alignItems: 'center', gap: 'var(--space-4)'}}>
            <span>{current.short}</span>
            <span style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform var(--dur-base)', display: 'inline-flex' }}>{Icon.chevron(11)}</span>
          </span>
        }
      </button>
      <div style={{
        position: 'absolute', top: 'calc(100% + 8px)', right: 0,
        background: 'var(--c-card)', borderRadius: 'var(--r-md)', padding: 'var(--space-8)',
        boxShadow: 'var(--shadow-panel)',
        minWidth: 200,
        opacity: open ? 1 : 0,
        transform: open ? 'translateY(0)' : 'translateY(-6px)',
        pointerEvents: open ? 'auto' : 'none',
        transition: 'opacity var(--dur-base) ease, transform var(--dur-base) ease',
        zIndex: 10
      }}>
        {LOCALES.map((l) => {
          const isActive = l.code === active;
          return (
            <button
              key={l.code}
              onClick={() => { setActive(l.code); setOpen(false); }}
              style={{
                display: 'flex', alignItems: 'center', gap: 'var(--space-12)',
                width: '100%', padding: 'var(--space-12) var(--space-12)', borderRadius: 'var(--r-sm)',
                border: 0, background: isActive ? 'var(--c-background-soft)' : 'transparent',
                cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left',
                transition: 'background var(--dur-fast) ease'
              }}
              onMouseOver={(e) => { if (!isActive) e.currentTarget.style.background = 'var(--c-background-soft)'; }}
              onMouseOut={(e) => { if (!isActive) e.currentTarget.style.background = 'transparent'; }}>
              <Flag cc={l.cc} size={22} />
              <span style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: 'var(--text-small)', fontWeight: 500, color: 'var(--c-foreground)' }}>{l.label}</span>
                <span style={{ fontSize: 'var(--text-micro)', color: 'var(--c-muted-foreground)', letterSpacing: '0.04em', textTransform: 'uppercase', fontWeight: 600 }}>{l.short}</span>
              </span>
              {isActive &&
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--c-foreground)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12l5 5L20 7" />
                </svg>
              }
            </button>);
        })}
      </div>
    </div>);

}

function ServicesDropdown({ open, setOpen }) {
  const ref = useRef(null);
  return (
    <div
      ref={ref}
      style={{ position: 'relative' }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}>
      
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 'var(--space-8)',
          background: open ? 'var(--c-background-soft)' : 'transparent', border: 0,
          padding: 'var(--space-8) var(--space-16)', borderRadius: 'var(--r-sm)',
          fontSize: 'var(--text-small)', color: 'var(--c-foreground)', fontWeight: 500
        }}>
        
        Serviços <span style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform var(--dur-base)' }}>{Icon.chevron(13)}</span>
      </button>
      <div style={{
        position: 'absolute', top: '100%', right: 0,
        paddingTop: 'var(--space-8)',
        opacity: open ? 1 : 0,
        transform: open ? 'translateY(0)' : 'translateY(-6px)',
        pointerEvents: open ? 'auto' : 'none',
        transition: 'opacity var(--dur-base) ease, transform var(--dur-base) ease',
        zIndex: 20
      }}>
        <div style={{
          background: 'var(--c-card)', borderRadius: 'var(--r-md)', padding: 'var(--space-12)',
          boxShadow: 'var(--shadow-panel)',
          minWidth: 480,
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)'
        }}>
        {SERVICES.map((s) =>
        <a key={s.key} href={s.key === 'hospitalidade' ? 'meet-greet.html' : `#${s.key}`} onClick={() => setOpen(false)} style={{
          display: 'flex', alignItems: 'center', gap: 'var(--space-12)',
          padding: 'var(--space-12) var(--space-16)', borderRadius: 'var(--r-sm)',
          transition: 'background var(--dur-fast) ease'
        }}
        onMouseOver={(e) => e.currentTarget.style.background = 'var(--c-background-soft)'}
        onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}>
            <span style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: 36, height: 36, borderRadius: 'var(--r-sm)', background: `color-mix(in srgb, ${s.color} 8%, transparent)`, color: s.color
          }}>{ServiceIcon[s.key](18)}</span>
            <span style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: 'var(--text-small)', fontWeight: 600, color: 'var(--c-foreground)' }}>{s.label}</span>
              <span style={{ fontSize: 'var(--text-micro)', color: 'var(--c-muted-foreground)' }}>{s.caption}</span>
            </span>
          </a>
        )}
        </div>
      </div>
    </div>);

}

// ─── Service chips bar (top of hero) ────────────────────────────────────────
// Desktop: full-width row of chips, space-between, lateral padding matches
// the top inset for balanced margins. Mobile: compact centered glass bar
// (icon-only) so all 7 still fit.
function ServiceChipsTop({ active, onSelect, mobile }) {
  const heroServices = SERVICES.filter((s) => s.inHero);
  if (mobile) {
    return (
      <div style={{
        position: 'absolute', top: 16, left: 0, right: 0, zIndex: 3,
        display: 'flex', justifyContent: 'center',
        padding: '0 var(--space-12)',
        pointerEvents: 'none'
      }}>
        <div style={{
          display: 'inline-flex',
          gap: 2,
          pointerEvents: 'auto',
          padding: 'var(--space-4)',
          background: 'rgba(20,20,18,0.32)',
          borderRadius: 'var(--r-md)',
          WebkitBackdropFilter: 'blur(22px) saturate(180%)',
          backdropFilter: 'blur(22px) saturate(180%)',
          border: '1px solid rgba(255,255,255,0.14)',
          boxShadow: '0 10px 30px rgba(0,0,0,0.22)',
          maxWidth: '100%',
          overflowX: 'auto',
          scrollbarWidth: 'none'
        }}>
          {heroServices.map((s) => {
            const isActive = s.key === active;
            return (
              <button
                key={s.key}
                className="gl-svc-top-chip gl-svc-top-chip--bare"
                data-active={isActive}
                onClick={() => onSelect(s.key)}
                style={isActive ? { ['--chip-c']: s.color } : undefined}>
                
                <span style={{ display: 'inline-flex', alignItems: 'center' }}>{ServiceIcon[s.key](16)}</span>
                {isActive && <span className="gl-svc-progress" />}
              </button>);

          })}
        </div>
      </div>);

  }
  // Desktop — full-width glass container, chips distributed end-to-end.
  return (
    <div style={{
      position: 'absolute', top: 24, left: 24, right: 24, zIndex: 3
    }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        gap: 'var(--space-4)',
        padding: 'var(--space-4)',
        background: 'rgba(20,20,18,0.32)',

        WebkitBackdropFilter: 'blur(22px) saturate(180%)',
        backdropFilter: 'blur(22px) saturate(180%)',
        border: '1px solid rgba(255,255,255,0.14)',
        boxShadow: '0 10px 30px rgba(0,0,0,0.22)', borderRadius: 'var(--r-md)'
      }}>
        {heroServices.map((s) => {
          const isActive = s.key === active;
          return (
            <button
              key={s.key}
              className="gl-svc-top-chip gl-svc-top-chip--bare"
              data-active={isActive}
              onClick={() => onSelect(s.key)}
              style={isActive ? { ['--chip-c']: s.color, flex: '1 1 auto' } : { flex: '1 1 auto' }}>
              
              <span style={{ display: 'inline-flex', alignItems: 'center' }}>{ServiceIcon[s.key](17)}</span>
              <span>{s.label}</span>
              {isActive && <span className="gl-svc-progress" />}
            </button>);

        })}
      </div>
    </div>);

}

window.GaleonServiceChipsTop = ServiceChipsTop;

// ─── Hero ───────────────────────────────────────────────────────────────────
// Single active service rendered. React `key={active}` remounts the wrapper
// on change; CSS keyframe `gl-fadein` plays on mount. Keyframes (unlike
// transitions on inline-style changes) run reliably inside the canvas's
// scaled transform context.

function HeroSplit({ mobile, active, onSelect }) {
  const s = SVC_BY_KEY[active] || SERVICES[0];
  return (
    <section style={{ padding: mobile ? 'var(--space-12) var(--space-20) var(--space-8)' : 'var(--space-12) var(--space-40) var(--space-8)'}}>
      <div style={{
        position: 'relative',
        borderRadius: 'var(--r-xl)',
        overflow: 'hidden',
        height: mobile ? 'calc(100dvh - 80px)' : 'calc(100dvh - 97px)',
        minHeight: mobile ? 560 : 620,
        background: 'var(--c-surface-dark)'
      }}>
        <div key={s.key} className="gl-hero-anim" style={{ position: 'absolute', inset: 0 }}>
          <image-slot
            id={s.slot}
            shape="rounded"
            radius="0"
            placeholder={`foto: ${s.photo}`}
            style={{ width: '100%', height: '100%' }}>
          </image-slot>
          <div style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(70% 65% at 50% 50%, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.45) 100%)',
            pointerEvents: 'none'
          }} />
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            gap: mobile ? 'var(--space-20)' : 'var(--space-28)',
            padding: mobile ? 'var(--space-96) var(--space-24) var(--space-32)' : '120px var(--space-48) var(--space-40)',
            textAlign: 'center',
            pointerEvents: 'none' /* let drops pass through to image-slot */
          }}>
            <h1 style={{
              fontSize: mobile ? 'var(--text-h1-mobile)' : 'var(--text-h1)', lineHeight: 'var(--text-h1-lh)', letterSpacing: 'var(--text-h1-tracking)',
              fontWeight: 600, color: 'var(--c-on-media)', maxWidth: 1000
            }}>{s.headline}</h1>
            <p style={{ fontSize: mobile ? 'var(--text-subtitle-mobile)' : 'var(--text-subtitle)', color: 'rgba(255,255,255,0.86)', maxWidth: 560, lineHeight: 1.4 }}>
              {s.subline}
            </p>
            {s.key === 'hospitalidade' ?
            <a href="meet-greet.html" className="gl-btn gl-btn--service gl-btn--lg" style={{
              '--btn-bg': s.color, '--btn-fg': s.ink, marginTop: mobile ? 'var(--space-4)' : 'var(--space-8)',
              pointerEvents: 'auto', textDecoration: 'none'
            }}>
              {s.cta} {Icon.arrow(14)}
            </a> :
            <button className="gl-btn gl-btn--service gl-btn--lg" style={{
              '--btn-bg': s.color, '--btn-fg': s.ink, marginTop: mobile ? 'var(--space-4)' : 'var(--space-8)',
              pointerEvents: 'auto'
            }}>
              {s.cta} {Icon.arrow(14)}
            </button>
            }
          </div>
        </div>
        <ServiceChipsTop active={active} onSelect={onSelect} mobile={mobile} />
      </div>
    </section>);

}

function Hero({ mobile, active, onSelect }) {
  return <HeroSplit mobile={mobile} active={active} onSelect={onSelect} />;
}

// Expose
Object.assign(window, {
  GaleonHero: Hero,
  GaleonHeader: Header,
  GaleonServiceChipsTop: ServiceChipsTop,
  GaleonIcon: Icon,
  GaleonServiceIcon: ServiceIcon,
  GaleonServices: SERVICES
});