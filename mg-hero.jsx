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
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: open ? 'var(--c-bg-soft)' : 'transparent', border: 0,
          padding: compact ? '6px 8px' : '6px 10px 6px 8px', borderRadius: 999,
          fontSize: 'var(--text-small)', color: 'var(--c-fg)', fontWeight: 500, fontFamily: 'inherit', cursor: 'pointer',
          transition: 'background .15s ease'
        }}>
        <MGFlag cc={current.cc} size={compact ? 20 : 22} />
        {!compact &&
          <span style={{ color: 'var(--c-muted)', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
            <span>{current.short}</span>
            <span style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .2s', display: 'inline-flex' }}>{window.MGIcon.chevron(11)}</span>
          </span>
        }
      </button>
      <div style={{
        position: 'absolute', top: 'calc(100% + 8px)', right: 0, background: '#fff',
        borderRadius: 14, padding: 6, boxShadow: '0 12px 40px rgba(0,0,0,0.10), 0 0 0 1px var(--c-border)',
        minWidth: 200, opacity: open ? 1 : 0, transform: open ? 'translateY(0)' : 'translateY(-6px)',
        pointerEvents: open ? 'auto' : 'none', transition: 'opacity .18s ease, transform .18s ease', zIndex: 10
      }}>
        {MG_LOCALES.map((l) => {
          const isActive = l.code === active;
          return (
            <button key={l.code} onClick={() => { setActive(l.code); setOpen(false); }}
              style={{
                display: 'flex', alignItems: 'center', gap: 12, width: '100%', padding: '10px 12px',
                borderRadius: 10, border: 0, background: isActive ? 'var(--c-bg-soft)' : 'transparent',
                cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left', transition: 'background .15s ease'
              }}
              onMouseOver={(e) => { if (!isActive) e.currentTarget.style.background = 'var(--c-bg-soft)'; }}
              onMouseOut={(e) => { if (!isActive) e.currentTarget.style.background = 'transparent'; }}>
              <MGFlag cc={l.cc} size={22} />
              <span style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: 'var(--text-small)', fontWeight: 500, color: 'var(--c-fg)' }}>{l.label}</span>
                <span style={{ fontSize: 'var(--text-micro)', color: 'var(--c-muted)', letterSpacing: '0.04em', textTransform: 'uppercase', fontWeight: 600 }}>{l.short}</span>
              </span>
              {isActive &&
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--c-fg)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5L20 7"/></svg>
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
          display: 'inline-flex', alignItems: 'center', gap: 6,
          background: open ? 'var(--c-bg-soft)' : 'transparent', border: 0,
          padding: '8px 14px', borderRadius: 8, fontSize: 'var(--text-small)', color: 'var(--c-fg)', fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit'
        }}>
        Serviços <span style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .2s', display: 'inline-flex' }}>{window.MGIcon.chevron(13)}</span>
      </button>
      <div style={{
        position: 'absolute', top: 'calc(100% + 8px)', right: 0, background: '#fff',
        borderRadius: 16, padding: 12, boxShadow: '0 12px 40px rgba(0,0,0,0.10), 0 0 0 1px var(--c-border)',
        minWidth: 520, opacity: open ? 1 : 0, transform: open ? 'translateY(0)' : 'translateY(-6px)',
        pointerEvents: open ? 'auto' : 'none', transition: 'opacity .18s ease, transform .18s ease',
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4, zIndex: 10
      }}>
        {window.MG_NAV.map((s) =>
          <a key={s.key} href={s.key === 'meet-greet' ? '#' : 'site.html#' + s.key} onClick={() => setOpen(false)}
            style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', borderRadius: 10, transition: 'background .15s ease' }}
            onMouseOver={(e) => e.currentTarget.style.background = 'var(--c-bg-soft)'}
            onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}>
            <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 36, height: 36, borderRadius: 10, background: s.color + '14', color: s.color }}>
              {Nav[s.key] && Nav[s.key](18)}
            </span>
            <span style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: 'var(--text-small)', fontWeight: 600, color: 'var(--c-fg)' }}>{s.label}</span>
              <span style={{ fontSize: 'var(--text-micro)', color: 'var(--c-muted)' }}>{s.desc}</span>
            </span>
          </a>
        )}
      </div>
    </div>
  );
}

const mgNavLink = { fontSize: 'var(--text-small)', color: 'var(--c-fg)', fontWeight: 500, padding: '8px 14px', borderRadius: 8 };

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
      transition: 'transform 0.28s ease'
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: mobile ? '20px 20px 14px' : '24px 40px 16px'
      }}>
        <a href="site.html" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <image-slot id="mg-logo" shape="rect" fit="contain" placeholder="logo GaleON (PNG)"
            style={{ width: mobile ? 108 : 132, height: mobile ? 28 : 34, display: 'block', background: 'transparent', ['--imgslot-frame-bg']: 'transparent' }}>
          </image-slot>
        </a>
        {!mobile &&
          <nav style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            <MGServicesDropdown />
            <a href="#confianca" style={mgNavLink}>Atendimento</a>
            <a href="#" style={mgNavLink}>Entrar</a>
            <MGLanguage />
          </nav>
        }
        {mobile &&
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <MGLanguage compact />
            <button aria-label="Menu" style={{ background: 'transparent', border: 0, padding: 6 }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--c-fg)" strokeWidth="1.6" strokeLinecap="round"><path d="M4 8h16"/><path d="M4 16h16"/></svg>
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
    <section style={{ padding: mobile ? '10px 20px 8px' : '10px 40px 8px' }}>
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
          background: 'linear-gradient(180deg, rgba(21,17,13,0.28) 0%, rgba(21,17,13,0) 32%, rgba(21,17,13,0) 50%, rgba(21,17,13,0.72) 100%)'
        }} />

        <div style={{
          position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          padding: mobile ? '90px 24px 36px' : '110px 56px 56px', pointerEvents: 'none'
        }}>
          <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', color: '#fff', maxWidth: 1000 }}>
            <span className="gl-eyebrow" style={{ position: 'absolute', bottom: '100%', marginBottom: mobile ? 18 : 24, color: 'rgba(255,255,255,0.72)' }}>Meet &amp; Greet</span>
            <h1 style={{ fontSize: mobile ? 'var(--text-h1-mobile)' : 'var(--text-h1)', lineHeight: 'var(--text-h1-lh)', letterSpacing: 'var(--text-h1-tracking)', fontWeight: 600, color: '#fff' }}>
              Sua jornada,<br/>cuidada de ponta a ponta
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { MGHeader, MGHero });
