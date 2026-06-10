// Meet & Greet — "Para grupos e empresas" zone (Anexo 2 pattern):
// a DARK band (same near-black used for the Meet & Greet service card on the
// Home). Title anchored at the top; the offerings sit below as a fixed grid of
// aligned cards (no carousel). Each card is deliberately lean: photo, title,
// description, "a partir de" price, and a single "Saber mais" action.

function mgCarQuote(s) { return !/^R\$/.test(s.price.value); }

function MGCarPrice({ s }) {
  if (mgCarQuote(s)) {
    return <span className="ds-num" style={{ fontSize: 'var(--num-price-sm)', color: 'var(--c-foreground)' }}>{s.price.value}</span>;
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <span style={{ fontSize: 'var(--text-small)', color: 'var(--c-muted-foreground)' }}>A partir de</span>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 7, flexWrap: 'wrap' }}>
        <span className="ds-num" style={{ fontSize: 'var(--num-price)', fontWeight: 600, color: 'var(--c-foreground)', letterSpacing: '-0.02em' }}>{s.price.value}</span>
        {s.price.unit && <span style={{ fontSize: 'var(--text-micro)', color: 'var(--c-muted-foreground)' }}>{s.price.unit}</span>}
      </div>
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
          <h3 style={{ fontSize: 'var(--text-h5)', letterSpacing: 'var(--text-h5-tracking)', lineHeight: 'var(--text-h5-lh)', color: 'var(--c-foreground)' }}>{s.name}</h3>
          <p style={{ fontSize: 'var(--text-body)', color: 'var(--c-muted-foreground)', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{s.lead}</p>
        </div>
        <div style={{ marginTop: 22, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 22 }}>
          <MGCarPrice s={s} />
          <button className="gl-btn gl-btn--secondary" style={{ flexShrink: 0 }}>Saber mais {Icon.arrow(13)}</button>
        </div>
      </div>
    </article>
  );
}

function MGCarouselZone({ zone, mobile }) {
  const all = window.MGServicesByZone(zone.id);

  return (
    <section id={zone.id} className="mg-emp" style={{ scrollMarginTop: 80 }}>
      <div className="mg-emp__inner">
        {/* Title */}
        <div className="mg-emp__intro mg-reveal">
          <span className="gl-eyebrow" style={{ color: 'rgba(255,255,255,0.62)' }}>{zone.eyebrow}</span>
          <h2 style={{ fontSize: mobile ? 'var(--text-h2-mobile)' : 'var(--text-h2)', letterSpacing: 'var(--text-h2-tracking)', lineHeight: 'var(--text-h2-lh)', color: 'var(--c-on-media)' }}>{zone.title}</h2>
        </div>

        {/* Aligned grid of cards (no carousel) */}
        <div className="mg-emp__grid">
          {all.map((s) => <MGCarouselSlide key={s.key} s={s} />)}
        </div>
      </div>
    </section>
  );
}

window.MGCarouselZone = MGCarouselZone;
