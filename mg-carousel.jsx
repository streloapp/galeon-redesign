// Meet & Greet — "Para grupos e empresas" zone (Anexo 2 pattern):
// a DARK band (same near-black used for the Meet & Greet service card on the
// Home). Title + description anchored left; the offerings live to the right as
// a horizontal-scroll carousel showing ~2.5 cards at once. Each card is
// deliberately lean: photo, title, description, "a partir de" price, and a
// single "Saber mais" action.

const { useRef: useRefC, useState: useStateC, useEffect: useEffectC } = React;

function mgCarQuote(s) { return !/^R\$/.test(s.price.value); }

function MGCarPrice({ s }) {
  if (mgCarQuote(s)) {
    return <span className="ds-num" style={{ fontSize: 22, color: 'var(--c-fg)' }}>{s.price.value}</span>;
  }
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 7, flexWrap: 'wrap' }}>
      <span className="ds-num" style={{ fontSize: 24, fontWeight: 600, color: 'var(--c-fg)', letterSpacing: '-0.02em' }}>{s.price.value}</span>
      {s.price.unit && <span style={{ fontSize: 12, color: 'var(--c-muted)' }}>{s.price.unit}</span>}
    </div>
  );
}

function MGCarouselSlide({ s }) {
  const Icon = window.MGIcon;
  return (
    <article className="mg-emp-card" id={s.key}>
      <div className="mg-emp-card__media">
        <image-slot id={'mg-car-' + s.key} shape="rect" fit="cover" placeholder={`foto: ${s.photo}`}></image-slot>
      </div>
      <div className="mg-emp-card__body">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <h3 style={{ fontSize: 22, letterSpacing: '-0.025em', lineHeight: 1.1, color: 'var(--c-fg)' }}>{s.name}</h3>
          <p style={{ fontSize: 16, color: 'var(--c-muted)', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{s.lead}</p>
        </div>
        <div style={{ marginTop: 'auto', paddingTop: 28, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
          <MGCarPrice s={s} />
          <button className="gl-btn gl-btn--sm" style={{ background: 'var(--c-mg)', color: '#fff', fontWeight: '600', flexShrink: 0 }}>Saber mais {Icon.arrow(13)}</button>
        </div>
      </div>
    </article>
  );
}

function MGCarouselZone({ zone, mobile }) {
  const all = window.MGServicesByZone(zone.id);
  const scrollRef = useRefC(null);
  const [prog, setProg] = useStateC(0);
  const [nav, setNav] = useStateC({ left: false, right: true });

  const updateProg = () => {
    const el = scrollRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProg(max > 8 ? el.scrollLeft / max : 0);
    setNav({ left: el.scrollLeft > 4, right: el.scrollLeft < max - 4 });
  };
  useEffectC(() => { updateProg(); window.addEventListener('resize', updateProg); return () => window.removeEventListener('resize', updateProg); }, [all.length]);

  const scrollBy = (dir) => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.querySelector('.mg-emp-card');
    const step = card ? card.offsetWidth + 24 : el.clientWidth * 0.7;
    el.scrollBy({ left: dir * step, behavior: 'smooth' });
  };

  return (
    <section id={zone.id} className="mg-emp" style={{ scrollMarginTop: 80 }}>
      <div className="mg-emp__inner">
        {/* Left — title + description */}
        <div className="mg-emp__intro mg-reveal">
          <span className="gl-eyebrow" style={{ color: 'rgba(255,255,255,0.62)' }}>{zone.eyebrow}</span>
          <h2 style={{ fontSize: mobile ? 34 : 56, letterSpacing: '-0.04em', lineHeight: 1.0, color: '#fff' }}>{zone.title}</h2>
          <p style={{ fontSize: mobile ? 16 : 18, color: 'rgba(255,255,255,0.66)', lineHeight: 1.55, maxWidth: 420 }}>{zone.sub}</p>
        </div>

        {/* Right — horizontal scroll carousel */}
        <div className="mg-emp__railwrap">
          <div className="mg-emp__rail" ref={scrollRef} onScroll={updateProg}>
            {all.map((s) => <MGCarouselSlide key={s.key} s={s} />)}
          </div>
          <div className="mg-emp-controls">
            {!mobile &&
              <React.Fragment>
                <button onClick={() => scrollBy(-1)} disabled={!nav.left} aria-label="Anterior" className="mg-emp-arrow">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="m14 6-6 6 6 6"/></svg>
                </button>
                <button onClick={() => scrollBy(1)} disabled={!nav.right} aria-label="Próximo" className="mg-emp-arrow">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="m10 6 6 6-6 6"/></svg>
                </button>
              </React.Fragment>
            }
            <div className="mg-emp-progress" role="progressbar" aria-label="Progresso do carrossel">
              <span className="mg-emp-progress__fill" style={{ width: Math.max(12, prog * 100) + '%' }}></span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

window.MGCarouselZone = MGCarouselZone;
