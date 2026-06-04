// Meet & Greet — "Para você e sua família" zone (Anexo 1 pattern):
// a vertical stack of split units. Each unit = a white content card next to a
// photo panel of EQUAL HEIGHT; the photo side alternates down the page
// (zigzag). Inside the content card: dashed eyebrow + name, "a partir de"
// price top-right, lead, the inclusos grouped by hairlines, and the CTA pinned
// to the bottom — mirroring the Home "Experiências" card language.

function mgIsQuote(s) {return !/^R\$/.test(s.price.value);}

// ─── Price block — two tiers (doméstico / internacional), page style ────────
function MGFamPrice({ s }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      {s.prices.map((p) =>
      <div key={p.tier} style={{ display: 'flex', alignItems: 'baseline', gap: 7, flexWrap: 'wrap' }}>
          <span className="ds-num" style={{ fontSize: 24, fontWeight: 600, color: 'var(--c-fg)', letterSpacing: '-0.02em' }}>{p.value}</span>
          <span style={{ fontSize: 16, color: 'var(--c-muted)' }}>{p.tier}</span>
        </div>
      )}
      {s.priceUnit && <div style={{ fontSize: 13, color: 'var(--c-muted)', marginTop: 2 }}>{s.priceUnit}</div>}
    </div>);

}

// ─── Inclusos as icon + label list ──────────────────────────────────────────
function MGFamInclGroup({ items }) {
  const Feat = window.MGFeat;
  return (
    <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
      {items.map((it) =>
      <li key={it.label} style={{ display: 'flex', alignItems: 'flex-start', gap: 13, fontSize: 15, color: 'var(--c-fg)', lineHeight: 1.35 }}>
          <span style={{ color: 'var(--c-mg)', flexShrink: 0, marginTop: 1 }}>{Feat[it.icon] && Feat[it.icon](18)}</span>
          <span>{it.label}</span>
        </li>
      )}
    </ul>);

}

// ─── Auto-advancing image gallery (horizontal) ──────────────────────────────
function MGGallery({ images }) {
  const { useState } = React;
  const [idx, setIdx] = useState(0);
  return (
    <div className="mg-gallery">
      <div className="mg-gallery__track" style={{ transform: `translateX(-${idx * 100}%)` }}>
        {images.map((im) =>
        <div className="mg-gallery__slide" key={im.slot}>
            <image-slot id={im.slot} shape="rect" fit="cover" placeholder={`foto: ${im.photo}`}></image-slot>
          </div>
        )}
      </div>
      {images.length > 1 &&
      <div className="mg-gallery__dots">
          {images.map((im, i) =>
        <button key={im.slot} type="button"
          className={'mg-gallery__dot' + (i === idx ? ' is-active' : '')}
          onClick={() => setIdx(i)} aria-label={`Imagem ${i + 1}`}></button>
        )}
        </div>}
    </div>);

}

// ─── Shared content body (name → lead → inclusos → price → CTA) ─────────────
function MGFamBody({ s, mobile, style }) {
  const Icon = window.MGIcon;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: mobile ? 18 : 22, ...style }}>
      <h3 style={{ fontSize: mobile ? 28 : 34, lineHeight: 1.04, letterSpacing: '-0.03em' }}>{s.name}</h3>
      <p style={{ fontSize: mobile ? 15.5 : 17, color: 'var(--c-muted)', lineHeight: 1.5 }}>{s.lead}</p>
      <MGFamInclGroup items={s.includes} />
      <MGFamPrice s={s} />
      <div style={{ marginTop: 4 }}>
        <button className="gl-btn gl-btn--sm" style={{ background: 'var(--c-mg)', color: '#fff', fontWeight: '600' }}>{s.cta} {Icon.arrow(13)}</button>
      </div>
    </div>);
}

// ─── Split unit — four layout variants (toggled via Tweaks) ─────────────────
//   overlap : Anexo 1 default — white content card floats over a wider photo
//   flush   : one white card; image sits flush inside it (no padding) on its
//             side — the CARD carries the shadow, the clipped image casts none
//   beside  : photo and card as separate panels with a small gap (reference)
//   inset   : one white card, image framed inside it by the card's padding
//             (mirrors the Home "Serviços" card language)
function MGServiceCard({ s, side, mobile, variant = 'overlap' }) {
  const imgLeft = side === 'left';
  const gallery = s.gallery || [{ slot: s.slot, photo: s.photo }];
  const media = (style) =>
    <div className="mg-fam__media" style={style}><MGGallery images={gallery} /></div>;

  // ── MOBILE: a single clean stacked card for every variant ──────────────
  if (mobile) {
    if (variant === 'overlap') {
      return (
        <article className="mg-fam" id={s.key} style={{ position: 'relative', display: 'block' }}>
          {media({ position: 'relative', width: '100%', aspectRatio: '4/3' })}
          <div className="mg-fam__card" style={{ position: 'relative', zIndex: 1, margin: '-40px 16px 0', padding: '64px 26px 28px' }}>
            <MGFamBody s={s} mobile={mobile} />
          </div>
        </article>);
    }
    const insetM = variant === 'inset';
    if (variant === 'flush') {
      return (
        <article className="mg-fam" id={s.key} style={{
          background: '#fff', border: '1px solid var(--c-border)', borderRadius: 'var(--r-xl)',
          overflow: 'hidden', boxShadow: '0 16px 44px rgba(20,17,13,0.06)',
          display: 'flex', flexDirection: 'column'
        }}>
          {media({ position: 'relative', width: '100%', aspectRatio: '4/3', borderRadius: 0, boxShadow: 'none' })}
          <div style={{ padding: '24px 22px 22px' }}>
            <MGFamBody s={s} mobile={mobile} />
          </div>
        </article>);
    }
    return (
      <article className="mg-fam" id={s.key}
        style={insetM
          ? { background: '#fff', border: '1px solid var(--c-border)', borderRadius: 'var(--r-xl)', boxShadow: '0 16px 44px rgba(20,17,13,0.06)', padding: 14, display: 'flex', flexDirection: 'column', gap: 6 }
          : { display: 'flex', flexDirection: 'column', gap: 16 }}>
        {media({ position: 'relative', width: '100%', aspectRatio: '4/3', borderRadius: insetM ? 'var(--r-lg)' : 'var(--r-xl)' })}
        <div className="mg-fam__card" style={insetM
          ? { background: 'transparent', border: 0, boxShadow: 'none', borderRadius: 0, padding: '14px 12px 10px' }
          : { padding: '26px 24px' }}>
          <MGFamBody s={s} mobile={mobile} />
        </div>
      </article>);
  }

  // ── DESKTOP: BESIDE — two panels, small gap ────────────────────────────
  if (variant === 'beside') {
    const mediaEl = media({ position: 'relative', flex: '1.05 1 0', borderRadius: 'var(--r-xl)', overflow: 'hidden', boxShadow: '0 18px 48px -18px rgba(20,17,13,0.18)', background: 'var(--c-mg-soft)' });
    const cardEl =
      <div className="mg-fam__card" style={{ flex: '1 1 0', padding: '52px 56px' }}>
        <MGFamBody s={s} mobile={mobile} />
      </div>;
    return (
      <article className="mg-fam mg-fam--beside" id={s.key} style={{ display: 'flex', alignItems: 'stretch', gap: 28, minHeight: 520 }}>
        {imgLeft ? <React.Fragment>{mediaEl}{cardEl}</React.Fragment> : <React.Fragment>{cardEl}{mediaEl}</React.Fragment>}
      </article>);
  }

  // ── DESKTOP: INSET — image framed inside one padded white card ─────────
  if (variant === 'inset') {
    const mediaEl = media({ position: 'relative', flex: '1.05 1 0', borderRadius: 'var(--r-lg)', overflow: 'hidden', boxShadow: 'none', background: 'var(--c-mg-soft)' });
    const cardEl =
      <div style={{ flex: '1 1 0', padding: imgLeft ? '32px 36px 32px 24px' : '32px 24px 32px 36px' }}>
        <MGFamBody s={s} mobile={mobile} />
      </div>;
    return (
      <article className="mg-fam mg-fam--inset" id={s.key} style={{
        display: 'flex', alignItems: 'stretch', gap: 8, minHeight: 520,
        background: '#fff', border: '1px solid var(--c-border)', borderRadius: 'var(--r-xl)',
        boxShadow: '0 16px 44px rgba(20,17,13,0.06)', padding: 18
      }}>
        {imgLeft ? <React.Fragment>{mediaEl}{cardEl}</React.Fragment> : <React.Fragment>{cardEl}{mediaEl}</React.Fragment>}
      </article>);
  }

  // ── DESKTOP: FLUSH ("sobreposto sem sombra") — image fills its side flush
  //    to the card edges (no frame); outer corners clipped by the card, inner
  //    corners rounded. The CARD carries the shadow, the image casts none ──
  if (variant === 'flush') {
    const mediaRadius = imgLeft ? '0 var(--r-lg) var(--r-lg) 0' : 'var(--r-lg) 0 0 var(--r-lg)';
    const mediaEl = media({ position: 'relative', flex: '1.12 1 0', borderRadius: mediaRadius, overflow: 'hidden', boxShadow: 'none', background: 'var(--c-mg-soft)' });
    const cardEl =
      <div style={{ flex: '1 1 0', padding: imgLeft ? '40px 48px 40px 20px' : '40px 20px 40px 48px' }}>
        <MGFamBody s={s} mobile={mobile} />
      </div>;
    return (
      <article className="mg-fam mg-fam--flush" id={s.key} style={{
        display: 'flex', alignItems: 'stretch', minHeight: 520, gap: 28,
        background: '#fff', border: '1px solid var(--c-border)', borderRadius: 'var(--r-xl)',
        overflow: 'hidden', boxShadow: '0 16px 44px rgba(20,17,13,0.06)'
      }}>
        {imgLeft ? <React.Fragment>{mediaEl}{cardEl}</React.Fragment> : <React.Fragment>{cardEl}{mediaEl}</React.Fragment>}
      </article>);
  }

  // ── DESKTOP: OVERLAP (default, unchanged) ──────────────────────────────
  const mediaEl = media({
    position: 'absolute', top: 0, bottom: 0,
    left: imgLeft ? 0 : 'auto', right: imgLeft ? 'auto' : 0, width: '60%'
  });
  const cardEl =
    <div className="mg-fam__card" style={{
      position: 'relative', zIndex: 1, width: '44%',
      marginLeft: imgLeft ? 'auto' : 0, marginRight: imgLeft ? 0 : 'auto',
      padding: imgLeft ? '46px 50px 46px 132px' : '46px 132px 46px 50px'
    }}>
      <MGFamBody s={s} mobile={mobile} />
    </div>;
  return (
    <article className="mg-fam" id={s.key} style={{ position: 'relative', display: 'flex', minHeight: 520 }}>
      {imgLeft ? <React.Fragment>{mediaEl}{cardEl}</React.Fragment> : <React.Fragment>{cardEl}{mediaEl}</React.Fragment>}
    </article>);
}

// ─── Zone ───────────────────────────────────────────────────────────────────
function MGZoneSection({ zone, mobile, variant = 'overlap' }) {
  const all = window.MGServicesByZone(zone.id);
  const rootRef = React.useRef(null);

  // Equalize all family cards to the height of the tallest (desktop only).
  React.useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const cards = [...root.querySelectorAll('.mg-fam')];
    if (mobile) { cards.forEach((c) => { c.style.minHeight = ''; }); return; }
    const equalize = () => {
      cards.forEach((c) => { c.style.minHeight = ''; });
      const max = Math.max(...cards.map((c) => c.getBoundingClientRect().height));
      cards.forEach((c) => { c.style.minHeight = max + 'px'; });
    };
    equalize();
    const t = setTimeout(equalize, 300);
    window.addEventListener('resize', equalize);
    return () => { window.removeEventListener('resize', equalize); clearTimeout(t); };
  }, [mobile, all.length]);

  return (
    <section ref={rootRef} id={zone.id} className="gl-section" style={{ scrollMarginTop: 80 }}>
      <div style={{ maxWidth: 820, display: 'flex', flexDirection: 'column', gap: 16, marginBottom: mobile ? 32 : 52 }} className="mg-reveal">
        <span className="gl-eyebrow" style={{ color: 'var(--c-mg)' }}>{zone.eyebrow}</span>
        <h2 style={{ fontSize: mobile ? 34 : 56, letterSpacing: '-0.04em', lineHeight: 0.98 }}>{zone.title}</h2>
        {zone.sub && <p style={{ fontSize: mobile ? 16 : 18, color: 'var(--c-muted)', lineHeight: 1.5, maxWidth: 640 }}>{zone.sub}</p>}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: mobile ? 48 : 104 }}>
        {all.map((s, i) =>
        <div key={s.key} className="mg-reveal">
            <MGServiceCard s={s} side={i % 2 === 0 ? 'right' : 'left'} mobile={mobile} variant={variant} />
          </div>
        )}
      </div>
    </section>);

}

Object.assign(window, { MGZoneSection });