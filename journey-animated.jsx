// ─── Journey Linear ────────────────────────────────────────────────────────
// Vertical timeline inspired by Heathrow's "My Flights" screen.
// Continuous line on the left, circle at each step, editorial card on the
// right. Same layout on desktop and mobile — desktop just gets more breathing
// room and wider cards. No path animation, no plane — clarity over flourish.

const { useState: useStateJA, useEffect: useEffectJA, useRef: useRefJA } = React;

// Delivery card thumbnail logos
const __JA_partners = ['kfc', 'burgerking', 'mcdonalds', 'starbucks'];

// ─── Editorial card with image, title, and time chip ───────────────────────
function JourneyEditorialCard({ step, idx, svcByKey, Icon, mobile, flightId }) {
  const svc = svcByKey[step.key];
  const color = svc?.color || '#0E0F0E';
  const isDelivery = step.key === 'delivery';

  // image-slot id is scoped to the flight so each flight type gets its own
  // drop target — domestic delivery photo ≠ international delivery photo.
  const slotId = `gl-viagem-${flightId || 'ghost'}-${step.key}`;

  return (
    <a
      href={`#${step.key}`}
      style={{
        position: 'relative',
        display: 'block',
        background: color + '22',
        borderRadius: 'var(--r-lg)',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'transform var(--dur-base) ease, box-shadow var(--dur-base) ease',
        userSelect: 'none',
        textDecoration: 'none',
        color: 'inherit',
        aspectRatio: mobile ? '16/10' : '4/3',
        minHeight: mobile ? 200 : 180
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = 'var(--shadow-card-hover)';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}>
      {/* Image */}
      <image-slot
        id={slotId}
        shape="rect"
        fit="cover"
        placeholder={`foto: ${svc?.label?.toLowerCase()}`}
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%'
        }}>
      </image-slot>

      {/* Gradient scrim for legibility — transparent top, dark bottom */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, rgba(0,0,0,0) 35%, rgba(0,0,0,0.55) 70%, rgba(0,0,0,0.85) 100%)',
        pointerEvents: 'none',
        zIndex: 1
      }} />

      {/* Title block — bottom-left, over scrim */}
      <div style={{
        position: 'absolute',
        left: mobile ? 16 : 20, right: mobile ? 16 : 20,
        bottom: mobile ? 16 : 20,
        display: 'flex', flexDirection: 'column', gap: 'var(--space-8)',
        zIndex: 2
      }}>
        <h3 style={{
          margin: 0,
          fontSize: mobile ? 17 : 19, fontWeight: 600,
          letterSpacing: '-0.015em', lineHeight: 1.2,
          color: '#fff',
          display: 'flex', alignItems: 'center', gap: 'var(--space-8)'
        }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', flexShrink: 0
          }}>
            {Icon[step.key] && Icon[step.key](mobile ? 18 : 20)}
          </span>
          {svc?.label}
        </h3>
        <p style={{
          margin: 0, fontSize: mobile ? 13 : 14,
          color: 'rgba(255,255,255,0.85)', lineHeight: 1.45
        }}>{step.meta}</p>
      </div>
    </a>);

}

// ─── The linear timeline ───────────────────────────────────────────────────
// Desktop: horizontal line at the top, cards laid out in a row below.
// Mobile: vertical line on the left, cards stacked underneath each circle.
function JourneyLinear({ journey, flight, isGhost, selected, onToggle, svcByKey, Icon, mobile }) {
  const circleSize = mobile ? 14 : 18;
  const railThickness = 2;

  if (!mobile) {
    // ── Desktop: horizontal timeline ──────────────────────────────────────
    return (
      <div style={{ position: 'relative', paddingTop: circleSize + 28 }}>
        {/* Continuous horizontal line spanning from first to last circle */}
        <div style={{
          position: 'absolute',
          top: (circleSize / 2) - (railThickness / 2),
          // The first/last circles sit at the center of their column.
          // Each column is 1/n of the width, so the first circle's center is
          // at 50%/n from the left, and the last circle's center is at
          // (n-0.5)/n from the left. The line spans between those.
          left: `calc(${100 / (journey.length * 2)}%)`,
          right: `calc(${100 / (journey.length * 2)}%)`,
          height: railThickness,
          background: 'var(--c-primary)',
          opacity: 0.85,
          zIndex: 0
        }} />

        {/* Steps */}
        <ol style={{
          listStyle: 'none', padding: 0, margin: 0,
          display: 'grid',
          gridTemplateColumns: `repeat(${journey.length}, minmax(0, 1fr))`,
          gap: 'var(--space-20)'
        }}>
          {journey.map((step, idx) =>
            <li key={idx} style={{ position: 'relative' }}>
              {/* Circle marker — centered above the card on the horizontal line */}
              <span style={{
                position: 'absolute',
                left: '50%',
                top: -(circleSize + 28),
                transform: 'translateX(-50%)',
                width: circleSize, height: circleSize, borderRadius: 'var(--r-pill)',
                background: '#fff',
                border: `3px solid var(--c-primary)`,
                boxSizing: 'border-box',
                zIndex: 1
              }} />

              {/* Vertical connector — from circle bottom down to card top */}
              <span style={{
                position: 'absolute',
                left: '50%',
                top: -28,
                transform: 'translateX(-50%)',
                width: railThickness,
                height: 28,
                background: 'var(--c-primary)',
                opacity: 0.85,
                zIndex: 0
              }} />

              <JourneyEditorialCard
              step={step} idx={idx}
              svcByKey={svcByKey} Icon={Icon}
              mobile={mobile}
              flightId={flight && flight.id} />
          </li>
        )}
      </ol>
    </div>);

  }

  // ── Mobile: vertical timeline ───────────────────────────────────────────
  const railLeft = 14;
  const cardOffsetLeft = 38;
  const gap = 24;

  return (
    <div style={{ position: 'relative' }}>
      {/* Continuous vertical line */}
      <div style={{
        position: 'absolute',
        left: railLeft + (circleSize / 2) - 1,
        top: circleSize / 2,
        bottom: circleSize / 2,
        width: railThickness,
        background: 'var(--c-primary)',
        opacity: 0.85,
        zIndex: 0
      }} />

      <ol style={{
        listStyle: 'none', padding: 0, margin: 0,
        display: 'flex', flexDirection: 'column', gap
      }}>
        {journey.map((step, idx) =>
          <li key={idx} style={{
            position: 'relative',
            paddingLeft: cardOffsetLeft,
            minHeight: circleSize
          }}>
            <span style={{
              position: 'absolute',
              left: railLeft,
              top: 0,
              width: circleSize, height: circleSize, borderRadius: 'var(--r-pill)',
              background: '#fff',
              border: `3px solid var(--c-primary)`,
              boxSizing: 'border-box',
              zIndex: 1
            }} />

            {/* Horizontal connector — from circle right to card left */}
            <span style={{
              position: 'absolute',
              left: railLeft + circleSize,
              top: (circleSize / 2) - (railThickness / 2),
              width: cardOffsetLeft - railLeft - circleSize,
              height: railThickness,
              background: 'var(--c-primary)',
              opacity: 0.85,
              zIndex: 0
            }} />

            <JourneyEditorialCard
              step={step} idx={idx}
              svcByKey={svcByKey} Icon={Icon}
              mobile={mobile}
              flightId={flight && flight.id} />
          </li>
        )}
      </ol>
    </div>);

}

window.GaleonJourneyAnimated = JourneyLinear;
