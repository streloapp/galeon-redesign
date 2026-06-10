// Meet & Greet — header + hero, matching the GaleON Home style:
// a glass white sticky topbar (logo · Serviços dropdown · Atendimento · Entrar
// · idioma) above a rounded, inset cinematic hero card (video-ready).

const { useState: useStateH, useRef: useRefH, useEffect: useEffectH } = React;

// Vídeo de fundo da hero. Aponte para o seu arquivo (coloque-o em assets/).
// Enquanto não houver vídeo, a imagem-poster (slot mg-hero-video) aparece sozinha.
// Defina como null para usar somente a imagem.
const MG_HERO_VIDEO = 'assets/mg-hero.mp4';

// ─── Language selector (mirrors Home) ───────────────────────────────────────
const MG_LOCALES = [
  { code: 'pt-BR', cc: 'br', label: 'Português', short: 'PT' },
  { code: 'en-US', cc: 'us', label: 'English',   short: 'EN' },
  { code: 'es-ES', cc: 'es', label: 'Español',   short: 'ES' }
];

function MGFlag({ cc, size = 22 }) {
  const FLAG_RES = { br: 'flag_br', us: 'flag_us', es: 'flag_es' };
  const flagSrc = (typeof window !== 'undefined' && window.__resources && window.__resources[FLAG_RES[cc]])
    || `https://flagcdn.com/${cc}.svg`;
  return (
    <span style={{
      display: 'inline-block', width: size, height: Math.round(size * 0.72),
      borderRadius: 4, overflow: 'hidden', flexShrink: 0,
      boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.08)', background: '#eee'
    }}>
      <img src={flagSrc} alt="" aria-hidden="true" loading="lazy"
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
    </span>
  );
}

function MGLanguage({ compact = false }) {
  const [open, setOpen] = useStateH(false);
  const [active, setActive] = useStateH('pt-BR');
  const current = MG_LOCALES.find((l) => l.code === active) || MG_LOCALES[0];
  return (
    <div style={{ position: 'relative' }}
      onMouseEnter={() => !compact && setOpen(true)}
      onMouseLeave={() => !compact && setOpen(false)}>
      <button onClick={() => setOpen((o) => !o)} aria-label={`Idioma: ${current.label}`}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 'var(--space-8)',
          background: open ? 'var(--c-background-soft)' : 'transparent', border: 0,
          padding: compact ? 'var(--space-8) var(--space-8)' : 'var(--space-8) var(--space-12) var(--space-8) var(--space-8)', borderRadius: 'var(--r-pill)',
          fontSize: 'var(--text-small)', color: 'var(--c-foreground)', fontWeight: 500, fontFamily: 'inherit', cursor: 'pointer',
          transition: 'background var(--dur-fast) ease'
        }}>
        <MGFlag cc={current.cc} size={compact ? 20 : 22} />
        {!compact &&
          <span style={{ color: 'var(--c-muted-foreground)', display: 'inline-flex', alignItems: 'center', gap: 'var(--space-4)'}}>
            <span>{current.short}</span>
            <span style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform var(--dur-base)', display: 'inline-flex' }}>{window.MGIcon.chevron(11)}</span>
          </span>
        }
      </button>
      <div style={{
        position: 'absolute', top: 'calc(100% + 8px)', right: 0, background: 'var(--c-card)',
        borderRadius: 'var(--r-md)', padding: 'var(--space-8)', boxShadow: 'var(--shadow-panel)',
        minWidth: 200, opacity: open ? 1 : 0, transform: open ? 'translateY(0)' : 'translateY(-6px)',
        pointerEvents: open ? 'auto' : 'none', transition: 'opacity var(--dur-base) ease, transform var(--dur-base) ease', zIndex: 10
      }}>
        {MG_LOCALES.map((l) => {
          const isActive = l.code === active;
          return (
            <button key={l.code} onClick={() => { setActive(l.code); setOpen(false); }}
              style={{
                display: 'flex', alignItems: 'center', gap: 'var(--space-12)', width: '100%', padding: 'var(--space-12) var(--space-12)',
                borderRadius: 'var(--r-sm)', border: 0, background: isActive ? 'var(--c-background-soft)' : 'transparent',
                cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left', transition: 'background var(--dur-fast) ease'
              }}
              onMouseOver={(e) => { if (!isActive) e.currentTarget.style.background = 'var(--c-background-soft)'; }}
              onMouseOut={(e) => { if (!isActive) e.currentTarget.style.background = 'transparent'; }}>
              <MGFlag cc={l.cc} size={22} />
              <span style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: 'var(--text-small)', fontWeight: 500, color: 'var(--c-foreground)' }}>{l.label}</span>
                <span style={{ fontSize: 'var(--text-micro)', color: 'var(--c-muted-foreground)', letterSpacing: '0.04em', textTransform: 'uppercase', fontWeight: 600 }}>{l.short}</span>
              </span>
              {isActive &&
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--c-foreground)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5L20 7"/></svg>
              }
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Serviços dropdown (global GaleON nav) ──────────────────────────────────
function MGServicesDropdown() {
  const [open, setOpen] = useStateH(false);
  const Nav = window.MGNavIcon;
  return (
    <div style={{ position: 'relative' }} onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button onClick={() => setOpen((o) => !o)}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 'var(--space-8)',
          background: open ? 'var(--c-background-soft)' : 'transparent', border: 0,
          padding: 'var(--space-8) var(--space-16)', borderRadius: 'var(--r-sm)', fontSize: 'var(--text-small)', color: 'var(--c-foreground)', fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit'
        }}>
        Serviços <span style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform var(--dur-base)', display: 'inline-flex' }}>{window.MGIcon.chevron(13)}</span>
      </button>
      <div style={{
        position: 'absolute', top: 'calc(100% + 8px)', right: 0, background: 'var(--c-card)',
        borderRadius: 'var(--r-md)', padding: 'var(--space-12)', boxShadow: 'var(--shadow-panel)',
        minWidth: 520, opacity: open ? 1 : 0, transform: open ? 'translateY(0)' : 'translateY(-6px)',
        pointerEvents: open ? 'auto' : 'none', transition: 'opacity var(--dur-base) ease, transform var(--dur-base) ease',
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)', zIndex: 10
      }}>
        {window.MG_NAV.map((s) =>
          <a key={s.key} href={s.key === 'meet-greet' ? '#' : 'site.html#' + s.key} onClick={() => setOpen(false)}
            style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-12)', padding: 'var(--space-12) var(--space-16)', borderRadius: 'var(--r-sm)', transition: 'background var(--dur-fast) ease' }}
            onMouseOver={(e) => e.currentTarget.style.background = 'var(--c-background-soft)'}
            onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}>
            <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 36, height: 36, borderRadius: 'var(--r-sm)', background: `color-mix(in srgb, ${s.color} 8%, transparent)`, color: s.color }}>
              {Nav[s.key] && Nav[s.key](18)}
            </span>
            <span style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: 'var(--text-small)', fontWeight: 600, color: 'var(--c-foreground)' }}>{s.label}</span>
              <span style={{ fontSize: 'var(--text-micro)', color: 'var(--c-muted-foreground)' }}>{s.desc}</span>
            </span>
          </a>
        )}
      </div>
    </div>
  );
}

const mgNavLink = { fontSize: 'var(--text-small)', color: 'var(--c-foreground)', fontWeight: 500, padding: 'var(--space-8) var(--space-16)', borderRadius: 'var(--r-sm)'};

function MGHeader({ mobile }) {
  const [hidden, setHidden] = useStateH(false);
  const lastY = useRefH(0);

  useEffectH(() => {
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
    <header className="mg-home-topbar" style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: 'rgba(255,255,255,0.92)',
      backdropFilter: 'blur(16px) saturate(180%)', WebkitBackdropFilter: 'blur(16px) saturate(180%)',
      transform: hidden ? 'translateY(-110%)' : 'translateY(0)',
      transition: 'transform var(--dur-moderate) ease'
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: mobile ? 'var(--space-20) var(--space-20) var(--space-16)' : 'var(--space-24) var(--space-40) var(--space-16)'
      }}>
        <a href="site.html" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-8)'}}>
          <image-slot id="mg-logo" shape="rect" fit="contain" placeholder="logo GaleON (PNG)"
            style={{ width: mobile ? 108 : 132, height: mobile ? 28 : 34, display: 'block', background: 'transparent', ['--imgslot-frame-bg']: 'transparent' }}>
          </image-slot>
        </a>
        {!mobile &&
          <nav style={{ display: 'flex', gap: 'var(--space-8)', alignItems: 'center' }}>
            <MGServicesDropdown />
            <a href="#confianca" style={mgNavLink}>Atendimento</a>
            <a href="#" style={mgNavLink}>Entrar</a>
            <MGLanguage />
          </nav>
        }
        {mobile &&
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-8)'}}>
            <MGLanguage compact />
            <button aria-label="Menu" className="gl-btn gl-btn--ghost gl-btn--icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--c-foreground)" strokeWidth="1.6" strokeLinecap="round"><path d="M4 8h16"/><path d="M4 16h16"/></svg>
            </button>
          </div>
        }
      </div>
    </header>
  );
}

// ─── Hero — rounded inset cinematic card (Home "cinema" style) ──────────────
function MGHero({ mobile, onExplore }) {
  const Icon = window.MGIcon;
  return (
    <section style={{ padding: mobile ? 'var(--space-12) var(--space-20) var(--space-8)' : 'var(--space-12) var(--space-40) var(--space-8)'}}>
      <div style={{
        position: 'relative', borderRadius: 'var(--r-xl)', overflow: 'hidden',
        height: mobile ? 'calc(100dvh - 86px)' : 'calc(100dvh - 100px)',
        minHeight: mobile ? 560 : 620, background: 'var(--c-ink)'
      }}>
        <div className="mg-hero-media">
          <image-slot id="mg-hero-video" shape="rounded" radius="0" fit="cover"
            placeholder="POSTER do hero (imagem de fundo / fallback enquanto o vídeo não está disponível)"
            style={{ width: '100%', height: '100%' }}>
          </image-slot>
          {MG_HERO_VIDEO &&
            <video className="mg-hero-video-el" autoPlay muted loop playsInline
              preload="auto" aria-hidden="true" tabIndex={-1}>
              <source src={MG_HERO_VIDEO} type="video/mp4" />
            </video>
          }
        </div>
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'linear-gradient(180deg, color-mix(in srgb, var(--c-scrim) 28%, transparent) 0%, color-mix(in srgb, var(--c-scrim) 0%, transparent) 32%, color-mix(in srgb, var(--c-scrim) 0%, transparent) 50%, color-mix(in srgb, var(--c-scrim) 72%, transparent) 100%)'
        }} />

        <div style={{
          position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          padding: mobile ? 'var(--space-88) var(--space-24) var(--space-36)' : '110px var(--space-56) var(--space-56)', pointerEvents: 'none'
        }}>
          <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', color: 'var(--c-on-media)', maxWidth: 1000 }}>
            <span className="gl-eyebrow" style={{ position: 'absolute', bottom: '100%', marginBottom: mobile ? 'var(--space-20)' : 'var(--space-24)', color: 'rgba(255,255,255,0.72)' }}>Meet &amp; Greet</span>
            <h1 style={{ fontSize: mobile ? 'var(--text-h1-mobile)' : 'var(--text-h1)', lineHeight: 'var(--text-h1-lh)', letterSpacing: 'var(--text-h1-tracking)', fontWeight: 600, color: 'var(--c-on-media)' }}>
              Sua jornada,<br/>cuidada de ponta a ponta
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { MGHeader, MGHero });
