// Meet & Greet — orientation rail. Sticky chips whose progress fills as you
// scroll THROUGH each section (scroll-driven, never a timer). Clicking a chip
// scrolls to that section. Nothing is filtered or hidden — pure orientation.
// Reuses the visual language of the Home hero chips, adapted to a light bar.

const { useState: useStateR, useEffect: useEffectR, useRef: useRefR } = React;

const MG_RAIL_SECTIONS = [
  { id: 'familia',  label: 'Para você e sua família', short: 'Você' },
  { id: 'empresas', label: 'Grupos e empresas',       short: 'Grupos' },
  { id: 'confianca',label: 'Por que o GaleON',         short: 'Confiança' }
];

function MGRail({ mobile }) {
  const railRef = useRefR(null);
  const [active, setActive] = useStateR('familia');
  const [headerH, setHeaderH] = useStateR(0);
  const [fills, setFills] = useStateR({ familia: 0, empresas: 0, confianca: 0 });

  const getHeaderH = () => {
    const h = document.querySelector('.mg-home-topbar');
    return h ? h.getBoundingClientRect().height : 0;
  };

  useEffectR(() => {
    let raf = 0;
    const compute = () => {
      raf = 0;
      const hH = getHeaderH();
      const railH = railRef.current ? railRef.current.offsetHeight : 56;
      const stick = hH + railH;
      const scrollY = window.scrollY || window.pageYOffset || 0;
      const probe = scrollY + stick + 8;
      const nextFills = {};
      let nextActive = MG_RAIL_SECTIONS[0].id;
      MG_RAIL_SECTIONS.forEach((s) => {
        const el = document.getElementById(s.id);
        if (!el) { nextFills[s.id] = 0; return; }
        const rect = el.getBoundingClientRect();
        const top = rect.top + scrollY;
        const h = rect.height || 1;
        const p = (probe - top) / h;
        nextFills[s.id] = Math.max(0, Math.min(1, p));
        if (top <= probe + 1) nextActive = s.id;
      });
      setFills(nextFills);
      setActive(nextActive);
      setHeaderH(hH);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(compute); };
    compute();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const goTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const railH = railRef.current ? railRef.current.offsetHeight : 56;
    const stick = getHeaderH() + railH;
    const top = el.getBoundingClientRect().top + window.scrollY - stick + 1;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  return (
    <div className="mg-rail" ref={railRef} style={{ top: headerH }}>
      <div className="mg-rail-inner">
        {!mobile &&
          <div className="mg-rail-brand">
            <span className="mark">{window.MGFeat.receptivo(13)}</span>
            Meet &amp; Greet
          </div>
        }
        <div className="mg-chips" role="tablist" aria-label="Seções da página">
          {MG_RAIL_SECTIONS.map((s) => {
            const isActive = active === s.id;
            return (
              <button
                key={s.id}
                className="mg-chip"
                data-active={isActive}
                onClick={() => goTo(s.id)}>
                {mobile ? s.short : s.label}
                <span className="mg-chip-track">
                  <span className="mg-chip-fill" style={{ ['--fill']: fills[s.id] || 0 }} />
                </span>
              </button>
            );
          })}
        </div>
        {!mobile &&
          <button className="gl-btn gl-btn--sm mg-rail-cta" style={{ background: 'var(--c-mg)', color: '#fff' }} onClick={() => goTo('familia')}>
            Reservar {window.MGIcon.arrow(13)}
          </button>
        }
      </div>
    </div>
  );
}

window.MGRail = MGRail;
