// "Construa sua viagem" — interactive timeline that adapts to the selected
// flight. Two modes:
//   • Planejar → full pre/post-flight timeline (4 anchors, all services)
//   • Estou no Galeão agora → present-tense view, gated by "time to boarding".
//     Less time = fewer cards (only what actually fits).

const { useState: useStateV, useMemo: useMemoV, useEffect: useEffectV } = React;

// ─── Test flights ───────────────────────────────────────────────────────────
const FLIGHTS = [
  {
    id: 'lat-cgh', code: 'LATAM 3104',
    direction: 'departure', type: 'domestic',
    origin: { code: 'GIG', city: 'Rio' },
    destination: { code: 'CGH', city: 'São Paulo' },
    when: 'Sexta · 06:30', date: '24 Mai', time: '06:30',
    timeOfDay: 'dawn',
    label: 'Doméstico, manhã cedo'
  },
  {
    id: 'gol-ssa', code: 'GOL 1842',
    direction: 'departure', type: 'domestic',
    origin: { code: 'GIG', city: 'Rio' },
    destination: { code: 'SSA', city: 'Salvador' },
    when: 'Sábado · 21:15', date: '25 Mai', time: '21:15',
    timeOfDay: 'night',
    label: 'Doméstico, voo noturno'
  },
  {
    id: 'tap-lis', code: 'TAP 8024',
    direction: 'departure', type: 'international',
    origin: { code: 'GIG', city: 'Rio' },
    destination: { code: 'LIS', city: 'Lisboa' },
    when: 'Sexta · 23:00', date: '24 Mai', time: '23:00',
    timeOfDay: 'night',
    currency: 'EUR',
    label: 'Internacional pra Europa'
  },
  {
    id: 'lat-mia', code: 'LATAM 8088',
    direction: 'departure', type: 'international',
    origin: { code: 'GIG', city: 'Rio' },
    destination: { code: 'MIA', city: 'Miami' },
    when: 'Quinta · 09:45', date: '23 Mai', time: '09:45',
    timeOfDay: 'morning',
    currency: 'USD',
    label: 'Internacional pros EUA'
  },
  {
    id: 'lat-arr-lis', code: 'LATAM 8023',
    direction: 'arrival', type: 'international',
    origin: { code: 'LIS', city: 'Lisboa' },
    destination: { code: 'GIG', city: 'Rio' },
    when: 'Domingo · 06:30', date: '26 Mai', time: '06:30',
    timeOfDay: 'dawn',
    currency: 'EUR',
    label: 'Voltando pra casa'
  }];

// ─── Pricing ────────────────────────────────────────────────────────────────
const BASE_PRICES = {
  hospitalidade: 480, delivery: 32,
  vip_dom: 189, vip_int: 289,
  transportes: 95, guarda: 32,
  cambio: 0, personal: 0,
};

function priceFor(itemKey, flight) {
  if (itemKey === 'vip') return flight.type === 'international' ? BASE_PRICES.vip_int : BASE_PRICES.vip_dom;
  return BASE_PRICES[itemKey] || 0;
}

function mealForTime(tod) {
  if (tod === 'dawn' || tod === 'morning') return { cta: 'Café da manhã no portão', meta: 'A partir de R$ 18 · 8 min' };
  if (tod === 'afternoon') return { cta: 'Almoço no portão', meta: 'A partir de R$ 38 · 12 min' };
  return { cta: 'Jantar no portão', meta: 'A partir de R$ 42 · 12 min' };
}

// ─── Timeline builder (Planejar mode) ───────────────────────────────────────
function buildTimeline(flight) {
  const isInt = flight.type === 'international';
  if (flight.direction === 'departure') {
    return [
      {
        id: 'casa', label: 'Em casa', time: '1–2 dias antes',
        items: [
          { key: 'hospitalidade', cta: 'Reservar Hospitalidade', meta: 'A partir de R$ 480', recommended: isInt },
          { key: 'personal', cta: 'Pedir Personal Shopper', meta: 'Comissão de 12%' },
        ],
      },
      {
        id: 'a-caminho', label: 'A caminho', time: '2–3h antes',
        items: [
          { key: 'transportes', cta: 'Transfer pro Galeão', meta: 'A partir de R$ 95' },
        ],
      },
      {
        id: 'galeao', label: 'No Galeão', time: isInt ? '3h antes do voo' : '2h antes do voo',
        items: [
          { key: 'guarda', cta: 'Guardar bagagem extra', meta: 'A partir de R$ 32/dia' },
          ...(isInt ? [{
            key: 'cambio',
            cta: `Retirar em ${flight.currency === 'EUR' ? 'euros' : 'dólares'}`,
            meta: 'Reserva online, sem fila',
            recommended: true,
          }] : []),
        ],
      },
      {
        id: 'embarque', label: 'No portão', time: '30–40min antes',
        items: [
          {
            key: 'vip',
            cta: `Sala VIP ${isInt ? 'internacional' : 'doméstica'}`,
            meta: isInt ? 'A partir de R$ 289' : 'A partir de R$ 189',
          },
          { key: 'delivery', ...mealForTime(flight.timeOfDay) },
        ],
      },
    ];
  }
  return [
    {
      id: 'pouso', label: 'Pousando',
      time: (flight.when.split(' · ')[1] || '').trim() || 'horário do pouso',
      items: [],
    },
    {
      id: 'galeao-arr', label: 'No Galeão', time: '15–30min após pouso',
      items: [
        { key: 'hospitalidade', cta: 'Desembarque assistido', meta: 'Fast-track na imigração', recommended: isInt },
        { key: 'guarda', cta: 'Retirar bagagem guardada', meta: 'Se deixou antes da viagem' },
        ...(isInt ? [{
          key: 'cambio',
          cta: 'Trocar moeda que sobrou',
          meta: 'Receba em real, taxa de hoje',
        }] : []),
      ],
    },
    {
      id: 'saida', label: 'Saindo do Galeão', time: '1h após pouso',
      items: [
        { key: 'transportes', cta: 'Transfer pra sua casa', meta: 'A partir de R$ 95' },
      ],
    },
    {
      id: 'em-casa', label: 'Em casa', time: 'depois',
      items: [],
    },
  ];
}

// ─── Now-mode builder (Estou no Galeão) ─────────────────────────────────────
// Returns { framing, items } based on how much time is left until boarding.
function buildNow(flight, boardingIn) {
  const isInt = flight.type === 'international';
  const meal = mealForTime(flight.timeOfDay);

  if (boardingIn === '30min') {
    return {
      framing: 'Pouco tempo, mas ainda dá pra resolver:',
      items: [
        {
          key: 'delivery',
          cta: meal.cta,
          meta: 'Chega em 8 min · garantido antes do embarque',
          urgent: true,
        },
      ],
    };
  }

  if (boardingIn === '1h') {
    return {
      framing: 'Tempo bom pra embarcar com calma:',
      items: [
        {
          key: 'vip',
          cta: `Sala VIP ${isInt ? 'internacional' : 'doméstica'}`,
          meta: isInt ? 'A partir de R$ 289' : 'A partir de R$ 189',
          recommended: true,
        },
        {
          key: 'delivery',
          cta: meal.cta,
          meta: meal.meta,
        },
      ],
    };
  }

  // 2h+
  return {
    framing: 'Tempo de sobra, vale aproveitar:',
    items: [
      {
        key: 'vip',
        cta: `Sala VIP ${isInt ? 'internacional' : 'doméstica'}`,
        meta: isInt ? 'A partir de R$ 289' : 'A partir de R$ 189',
        recommended: true,
      },
      {
        key: 'delivery',
        cta: meal.cta,
        meta: meal.meta,
      },
      ...(isInt ? [{
        key: 'cambio',
        cta: `Retirar em ${flight.currency === 'EUR' ? 'euros' : 'dólares'}`,
        meta: 'Reserva online, sem fila',
      }] : []),
      {
        key: 'guarda',
        cta: 'Guardar bagagem extra',
        meta: 'A partir de R$ 32/dia',
      },
      ...(isInt ? [{
        key: 'personal',
        cta: 'Pedir Personal Shopper',
        meta: 'Compra entregue antes do embarque',
      }] : []),
    ],
  };
}

// ─── Card (compact, used in Planejar timeline) ──────────────────────────────
function ServiceCard({ item, anchorId, idx, selected, onToggle, svcByKey, Icon }) {
  const svc = svcByKey[item.key];
  const key = `${anchorId}-${idx}`;
  const isSelected = selected.has(key);
  const color = svc?.color || '#0E0F0E';
  const ink = svc?.ink || 'var(--c-on-media)';
  return (
    <button
      onClick={() => onToggle(key)}
      style={{
        background: isSelected ? color : 'var(--c-card)',
        color: isSelected ? ink : 'var(--c-foreground)',
        border: '1px solid ' + (isSelected ? color : 'var(--c-border)'),
        borderRadius: 'var(--r-md)',
        padding: 'var(--space-16) var(--space-16)',
        display: 'flex', flexDirection: 'column', gap: 'var(--space-8)',
        cursor: 'pointer', textAlign: 'left',
        fontFamily: 'inherit',
        transition: 'background-color var(--dur-base) ease, color var(--dur-base) ease, border-color var(--dur-base) ease',
        width: '100%',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-8)'}}>
        <span style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          width: 28, height: 28, borderRadius: 'var(--r-sm)',
          background: isSelected ? 'rgba(255,255,255,0.16)' : color + '14',
          color: isSelected ? ink : color,
          flexShrink: 0,
        }}>{Icon[item.key] && Icon[item.key](14)}</span>
        <span style={{
          flex: 1, fontSize: 12, fontWeight: 600, letterSpacing: '0.04em',
          textTransform: 'uppercase',
          opacity: isSelected ? 0.9 : 0.7,
        }}>{svc?.label}</span>
        {item.recommended && !isSelected && (
          <span style={{
            fontSize: 10, fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase',
            padding: '3px var(--space-8)', borderRadius: 'var(--r-pill)',
            color: color, border: '1px solid ' + color,
          }}>Sugerido</span>
        )}
      </div>
      <div style={{ fontSize: 15, fontWeight: 500, letterSpacing: '-0.01em', lineHeight: 1.3 }}>{item.cta}</div>
      <div style={{ fontSize: 12, opacity: isSelected ? 0.78 : 0.55 }}>{item.meta}</div>
    </button>
  );
}

// ─── Card (large, used in "Agora" mode) ─────────────────────────────────────
function NowCard({ item, idx, selected, onToggle, svcByKey, Icon, large }) {
  const svc = svcByKey[item.key];
  const k = `now-${idx}-${item.key}`;
  const isSelected = selected.has(k);
  const color = svc?.color || '#0E0F0E';
  const ink = svc?.ink || 'var(--c-on-media)';
  return (
    <button
      onClick={() => onToggle(k)}
      style={{
        background: isSelected ? color : 'var(--c-card)',
        color: isSelected ? ink : 'var(--c-foreground)',
        border: '1px solid ' + (isSelected ? color : 'var(--c-border)'),
        borderRadius: 'var(--r-lg)',
        padding: large ? 'var(--space-28) var(--space-32)' : 'var(--space-24) var(--space-24)',
        display: 'flex', flexDirection: 'column', gap: 'var(--space-16)',
        cursor: 'pointer', textAlign: 'left',
        fontFamily: 'inherit',
        transition: 'background-color var(--dur-base) ease, color var(--dur-base) ease, border-color var(--dur-base) ease',
        minHeight: large ? 240 : 180,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-12)'}}>
        <span style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          width: 38, height: 38, borderRadius: 11,
          background: isSelected ? 'rgba(255,255,255,0.16)' : color + '14',
          color: isSelected ? ink : color,
          flexShrink: 0,
        }}>{Icon[item.key] && Icon[item.key](18)}</span>
        <span style={{
          fontSize: 12, fontWeight: 600, letterSpacing: '0.04em',
          textTransform: 'uppercase',
          opacity: isSelected ? 0.9 : 0.72,
        }}>{svc?.label}</span>
        {item.recommended && !isSelected && (
          <span style={{
            marginLeft: 'auto',
            fontSize: 10, fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase',
            padding: '3px var(--space-8)', borderRadius: 'var(--r-pill)',
            color, border: '1px solid ' + color,
          }}>Sugerido</span>
        )}
        {item.urgent && !isSelected && (
          <span style={{
            marginLeft: 'auto',
            fontSize: 10, fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase',
            padding: '3px var(--space-8)', borderRadius: 'var(--r-pill)',
            color: ink, background: color,
          }}>Agora</span>
        )}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)', flex: 1 }}>
        <div style={{
          fontSize: large ? 26 : 20, fontWeight: 600,
          letterSpacing: '-0.02em', lineHeight: 1.15,
        }}>{item.cta}</div>
        <div style={{ fontSize: 13, opacity: isSelected ? 0.8 : 0.62, lineHeight: 1.4 }}>{item.meta}</div>
      </div>
    </button>
  );
}

// ─── Section ────────────────────────────────────────────────────────────────
// New flow: empty state → flight number input → ticket + timeline.
// `flightId === null` shows the input; selecting / typing a known code
// reveals the ticket and the 4-anchor timeline below it.

function FlightInput({ flight, onSelect, onClear, mobile }) {
  const [code, setCode] = useStateV('');
  const [demoOpen, setDemoOpen] = useStateV(false);

  // Normalize "lat 3104" / "latam3104" / "LATAM 3104" → "LATAM3104"
  const normalize = (s) => (s || '').toUpperCase().replace(/[\s-]/g, '');

  const tryResolve = (raw) => {
    const n = normalize(raw);
    if (!n) return null;
    return FLIGHTS.find((f) => {
      const fn = normalize(f.code);
      return fn === n || fn.startsWith(n) || fn.endsWith(n);
    }) || null;
  };

  const submit = (e) => {
    if (e) e.preventDefault();
    const f = tryResolve(code);
    if (f) { onSelect(f.id); setCode(''); }
  };

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', gap: mobile ? 'var(--space-16)' : 'var(--space-20)'
    }}>
      {/* Search row — input + active flight chip side by side */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 'var(--space-12)',
        flexWrap: 'wrap'
      }}>
        <form onSubmit={submit} style={{
          display: 'flex', gap: 'var(--space-8)', alignItems: 'stretch',
          background: 'var(--c-card)', border: '1px solid var(--c-border)',
          borderRadius: 'var(--r-pill)', padding: 'var(--space-4)',
          flex: mobile ? '1 1 100%' : '0 1 380px',
          minWidth: mobile ? 0 : 280
        }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            paddingLeft: 'var(--space-16)', color: 'var(--c-muted-foreground)'
          }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="7" /><path d="m20 20-3-3" />
            </svg>
          </span>
          <input
            id="gl-flight-input"
            type="text"
            autoComplete="off"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Buscar voo"
            style={{
              flex: 1, minWidth: 0,
              border: 0, outline: 0, background: 'transparent',
              padding: '0 var(--space-8)', height: 38,
              fontSize: 14, fontWeight: 500,
              letterSpacing: '-0.005em',
              fontFamily: 'inherit', color: 'var(--c-foreground)'
            }} />
          {code &&
            <button
              type="submit"
              style={{
                height: 38, padding: '0 var(--space-16)',
                borderRadius: 'var(--r-pill)', border: 0,
                background: 'var(--c-foreground)', color: 'var(--c-surface-dark-foreground)',
                fontSize: 13, fontWeight: 600, cursor: 'pointer',
                fontFamily: 'inherit'
              }}>
              Buscar
            </button>
          }
        </form>

        {flight &&
          <button
            onClick={onClear}
            className="gl-hero-anim"
            aria-label={`Remover voo ${flight.code}`}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 'var(--space-12)',
              padding: 'var(--space-8) var(--space-12) var(--space-8) var(--space-16)',
              border: '1px solid var(--c-primary)',
              background: 'var(--c-primary)', color: 'var(--c-primary-foreground)',
              borderRadius: 'var(--r-pill)',
              fontSize: 13, fontWeight: 600, letterSpacing: '-0.005em',
              cursor: 'pointer', whiteSpace: 'nowrap',
              fontFamily: 'inherit',
              transition: 'opacity var(--dur-fast) ease'
            }}
            onMouseOver={(e) => { e.currentTarget.style.opacity = '0.88'; }}
            onMouseOut={(e) => { e.currentTarget.style.opacity = '1'; }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1L15 22v-1.5L13 19v-5.5L21 16z" />
            </svg>
            <span>
              {flight.destination.city}
              <span style={{ color: 'var(--c-primary-foreground)', opacity: 0.45, margin: '0 var(--space-8)'}}>•</span>
              {flight.date}
              <span style={{ color: 'var(--c-primary-foreground)', opacity: 0.45, margin: '0 var(--space-8)'}}>•</span>
              {flight.time}
            </span>
            <span style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              width: 18, height: 18, borderRadius: 'var(--r-pill)',
              background: 'rgba(31,42,12,0.16)',
              marginLeft: 2
            }}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                <path d="M6 6l12 12" /><path d="M18 6 6 18" />
              </svg>
            </span>
          </button>
        }
      </div>

      {/* Demo flights — only in empty state, hidden behind a discreet toggle */}
      {!flight &&
        <div style={{ display: 'flex', flexDirection: 'column', gap: demoOpen ? 'var(--space-12)' : 0}}>
          <button
            onClick={() => setDemoOpen((o) => !o)}
            style={{
              alignSelf: 'flex-start',
              display: 'inline-flex', alignItems: 'center', gap: 'var(--space-8)',
              background: 'transparent', border: 0, padding: 'var(--space-4) 2px',
              cursor: 'pointer', fontFamily: 'inherit',
              fontSize: 12, fontWeight: 500, letterSpacing: '-0.005em',
              color: 'var(--c-muted-foreground)',
              transition: 'color var(--dur-fast) ease'
            }}
            onMouseOver={(e) => { e.currentTarget.style.color = 'var(--c-foreground)'; }}
            onMouseOut={(e) => { e.currentTarget.style.color = 'var(--c-muted-foreground)'; }}>
            {demoOpen ? 'Esconder' : 'Ver'} voos de demonstração
            <span style={{
              display: 'inline-flex',
              transform: demoOpen ? 'rotate(180deg)' : 'rotate(0)',
              transition: 'transform var(--dur-base) ease'
            }}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m6 9 6 6 6-6" />
              </svg>
            </span>
          </button>
          <div style={{
            display: 'grid',
            gridTemplateRows: demoOpen ? '1fr' : '0fr',
            transition: 'grid-template-rows var(--dur-base) ease'
          }}>
            <div style={{ overflow: 'hidden' }}>
              <div style={{ display: 'flex', gap: 'var(--space-8)', flexWrap: 'wrap', paddingTop: 'var(--space-4)'}}>
                {FLIGHTS.map((f) =>
                  <button
                    key={f.id}
                    onClick={() => onSelect(f.id)}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: 'var(--space-12)',
                      padding: mobile ? 'var(--space-8) var(--space-12)' : 'var(--space-12) var(--space-16)',
                      borderRadius: 'var(--r-pill)',
                      border: '1px solid var(--c-border)',
                      background: 'var(--c-card)', color: 'var(--c-foreground)',
                      fontSize: 13, fontWeight: 500, letterSpacing: '-0.005em',
                      cursor: 'pointer', whiteSpace: 'nowrap',
                      fontFamily: 'inherit',
                      transition: 'border-color var(--dur-fast) ease'
                    }}
                    onMouseOver={(e) => { e.currentTarget.style.borderColor = 'var(--c-foreground)'; }}
                    onMouseOut={(e) => { e.currentTarget.style.borderColor = 'var(--c-border)'; }}>
                    <span style={{ fontWeight: 600 }}>{f.code}</span>
                    <span style={{ color: 'var(--c-muted-foreground)', fontSize: 12 }}>
                      {f.origin.code} → {f.destination.code}
                    </span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      }
    </div>);

}

function FlightTicket({ flight, mobile }) {
  const airline = (flight.code || '').split(' ')[0];
  const flightNum = (flight.code || '').split(' ')[1] || flight.code;
  const isInt = flight.type === 'international';
  const stubW = mobile ? 78 : 92;
  const bars = [2, 1, 3, 1, 2, 1, 1, 3, 2, 1, 2, 1, 3, 1, 2];

  return (
    <article className="gl-hero-anim" style={{
      position: 'relative',
      width: '100%', maxWidth: mobile ? 'none' : 500,
      background: 'var(--c-card)',
      border: '1px solid var(--c-border)',
      borderRadius: 'var(--r-lg)',
      display: 'grid',
      gridTemplateColumns: `1fr ${stubW}px`,
      boxShadow: '0 1px 0 rgba(0,0,0,0.02)'
    }}>
      {/* ── Main body (left) ── */}
      <div style={{
        padding: mobile ? 'var(--space-16) var(--space-16)' : 'var(--space-16) var(--space-20)',
        display: 'flex', flexDirection: 'column',
        gap: mobile ? 'var(--space-12)' : 'var(--space-16)',
        borderRight: '1.5px dashed var(--c-border)'
      }}>
        {/* Airline + boarding pass label */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-8)'}}>
          <span style={{
            fontSize: 10, fontWeight: 700, letterSpacing: '0.1em',
            color: 'var(--c-foreground)', textTransform: 'uppercase'
          }}>{airline}</span>
          <span style={{ height: 10, width: 1, background: 'var(--c-border)' }} />
          <span style={{
            fontSize: 9, fontWeight: 600, letterSpacing: '0.08em',
            color: 'var(--c-muted-foreground)', textTransform: 'uppercase'
          }}>Boarding pass</span>
        </div>

        {/* Route */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto 1fr',
          alignItems: 'end', gap: 'var(--space-8)'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 3, minWidth: 0 }}>
            <span style={{
              fontSize: 8, fontWeight: 700, letterSpacing: '0.1em',
              color: 'var(--c-muted-foreground)', textTransform: 'uppercase'
            }}>From</span>
            <span style={{
              fontSize: mobile ? 26 : 32, fontWeight: 700,
              letterSpacing: '-0.045em', lineHeight: 0.95,
              color: 'var(--c-foreground)'
            }}>{flight.origin.code}</span>
            <span style={{
              fontSize: 10, color: 'var(--c-muted-foreground)',
              whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
            }}>{flight.origin.city}</span>
          </div>

          <div style={{
            display: 'flex', alignItems: 'center', gap: 'var(--space-4)',
            paddingBottom: mobile ? 'var(--space-12)' : 'var(--space-12)'
          }}>
            <span style={{ width: 10, borderTop: '1px dashed var(--c-border)' }} />
            <svg width={mobile ? 12 : 14} height={mobile ? 12 : 14} viewBox="0 0 24 24" fill="var(--c-foreground)" style={{ flexShrink: 0 }}>
              <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1L15 22v-1.5L13 19v-5.5L21 16z" />
            </svg>
            <span style={{ width: 10, borderTop: '1px dashed var(--c-border)' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 3, alignItems: 'flex-end', minWidth: 0 }}>
            <span style={{
              fontSize: 8, fontWeight: 700, letterSpacing: '0.1em',
              color: 'var(--c-muted-foreground)', textTransform: 'uppercase'
            }}>To</span>
            <span style={{
              fontSize: mobile ? 26 : 32, fontWeight: 700,
              letterSpacing: '-0.045em', lineHeight: 0.95,
              color: 'var(--c-foreground)'
            }}>{flight.destination.code}</span>
            <span style={{
              fontSize: 10, color: 'var(--c-muted-foreground)',
              whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
              textAlign: 'right'
            }}>{flight.destination.city}</span>
          </div>
        </div>

        {/* Meta — Date + Class only */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'var(--space-12)',
          paddingTop: 'var(--space-12)',
          borderTop: '1px dashed var(--c-border)'
        }}>
          <TicketMeta label="Date" value={flight.when} />
          <TicketMeta label="Class" value={isInt ? 'Intl' : 'Dom'} />
        </div>
      </div>

      {/* ── Stub (right) ── */}
      <div style={{
        padding: mobile ? 'var(--space-12) var(--space-8)' : 'var(--space-16) var(--space-8)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'space-between',
        gap: 'var(--space-12)'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}>
          <span style={{
            fontSize: 8, fontWeight: 700, letterSpacing: '0.1em',
            color: 'var(--c-muted-foreground)', textTransform: 'uppercase'
          }}>Voo</span>
          <span style={{
            fontSize: mobile ? 15 : 16, fontWeight: 700,
            letterSpacing: '-0.01em', color: 'var(--c-foreground)',
            fontVariantNumeric: 'tabular-nums'
          }}>{flightNum}</span>
        </div>

        {/* Stylized barcode */}
        <div style={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
          {bars.map((w, i) =>
            <span key={i} style={{
              width: w, height: mobile ? 24 : 28,
              background: 'var(--c-foreground)', opacity: 0.88
            }} />
          )}
        </div>
      </div>

      {/* ── Perforation cutouts ── */}
      <span style={{
        position: 'absolute', top: -8, left: `calc(100% - ${stubW}px - 8px)`,
        width: 16, height: 16, borderRadius: 'var(--r-sm)',
        background: 'var(--c-background-soft)',
        border: '1px solid var(--c-border)',
        pointerEvents: 'none'
      }} />
      <span style={{
        position: 'absolute', bottom: -8, left: `calc(100% - ${stubW}px - 8px)`,
        width: 16, height: 16, borderRadius: 'var(--r-sm)',
        background: 'var(--c-background-soft)',
        border: '1px solid var(--c-border)',
        pointerEvents: 'none'
      }} />
    </article>);

}

function TicketMeta({ label, value }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <span style={{
        fontSize: 9, fontWeight: 700, letterSpacing: '0.1em',
        color: 'var(--c-muted-foreground)', textTransform: 'uppercase'
      }}>{label}</span>
      <span style={{
        fontSize: 12, fontWeight: 600, letterSpacing: '-0.005em',
        color: 'var(--c-foreground)'
      }}>{value}</span>
    </div>);

}

// ─── Journey model (new) ────────────────────────────────────────────────────
// Each service IS a journey step. The list is ordered chronologically and
// filtered by flight type. No more "Atos" — time becomes microcopy on each
// card, not a container.

// Presentation hints for each service used by JourneyCard.
// `partners` overrides the default visual with a logo grid (delivery only).
const SVC_PRESENT = {
  hospitalidade: { partners: null },
  vip:           { partners: null },
  delivery:      { partners: ['kfc', 'burgerking', 'mcdonalds', 'starbucks'] },
  personal:      { partners: null },
  cambio:        { partners: null },
  transportes:   { partners: null },
  guarda:        { partners: null }
};

function buildJourney(flight) {
  const isInt = flight.type === 'international';
  const isDep = flight.direction === 'departure';
  const curr = flight.currency === 'EUR' ? 'euros' : flight.currency === 'USD' ? 'dólares' : 'moeda estrangeira';

  if (isDep && isInt) {
    return [
      { key: 'hospitalidade', time: '48H ANTES',  cta: 'Reserve sua Hospitalidade', meta: 'Check-in assistido, fast-track e condução até o portão.', recommended: true },
      { key: 'cambio',        time: '24H ANTES',  cta: 'Reserve seu Câmbio',         meta: `Reserve a taxa e retire ${curr} sem fila no balcão.`, recommended: true },
      { key: 'personal',      time: '24H ANTES',  cta: 'Personal Shopper',           meta: 'Encomende o que comprar nas lojas — entregamos antes do embarque.' },
      { key: 'vip',           time: '3H ANTES',   cta: 'Sala VIP internacional',     meta: 'Embarque com chuveiro, bebida e privacidade.' },
      { key: 'delivery',      time: '30MIN ANTES',cta: 'Comer no portão',            meta: 'Restaurantes do Galeão entregam no seu assento em 12 min.' }
    ];
  }
  if (isDep && !isInt) {
    return [
      { key: 'hospitalidade', time: '24H ANTES',  cta: 'Reserve sua Hospitalidade', meta: 'Despache assistido e condução até o portão.', recommended: true },
      { key: 'vip',           time: '2H ANTES',   cta: 'Sala VIP doméstica',         meta: 'Embarque sem barulho, com bebida inclusa.' },
      { key: 'delivery',      time: '30MIN ANTES',cta: 'Comer no portão',            meta: 'Restaurantes do Galeão entregam no seu assento em 12 min.' }
    ];
  }
  if (!isDep && isInt) {
    return [
      { key: 'hospitalidade', time: 'AO POUSAR',  cta: 'Hospitalidade no desembarque', meta: 'Fast-track na imigração e bagagem assistida.', recommended: true },
      { key: 'personal',      time: '30MIN DEPOIS', cta: 'Personal Shopper na chegada', meta: 'Souvenirs ou compra urgente antes de sair.' },
      { key: 'cambio',        time: '30MIN DEPOIS', cta: 'Troque a moeda que sobrou',   meta: 'Receba em real com a taxa do dia.' },
      { key: 'guarda',        time: '30MIN DEPOIS', cta: 'Guarda-volume',               meta: 'Se vai aproveitar o Rio antes de seguir viagem.' },
      { key: 'transportes',   time: '1H DEPOIS',    cta: 'Transfer pra sua casa',       meta: 'Motorista te espera no portão certo, no horário certo.' }
    ];
  }
  // Doméstico desembarque
  return [
    { key: 'hospitalidade', time: 'AO POUSAR',    cta: 'Hospitalidade no desembarque', meta: 'Acolhimento e bagagem assistida.' },
    { key: 'guarda',        time: '30MIN DEPOIS', cta: 'Guarda-volume',               meta: 'Se vai parar no Rio antes de seguir.' },
    { key: 'transportes',   time: '1H DEPOIS',    cta: 'Transfer pra sua casa',       meta: 'Motorista te espera no portão.' }
  ];
}

// ─── Curved path — SVG above the cards ──────────────────────────────────────
// Straight connecting line + numbered step circles. The line spans from the
// center of the first card to the center of the last; each card carries its
// own numbered circle that sits on the line — visually connecting the path
// to the card itself rather than floating above.
function JourneyPath({ count }) {
  if (count < 2) return null;
  // Position: top: 16 inside a 36px paddingTop container, so the line center
  // is at y=17 (1px stroke height ÷ 2 + top offset).
  return (
    <div style={{
      position: 'absolute',
      top: 17,
      left: `calc(50% / ${count})`,
      right: `calc(50% / ${count})`,
      height: 2,
      background: 'var(--c-primary)',
      zIndex: 1,
      pointerEvents: 'none'
    }} />);

}

// ─── Journey card ───────────────────────────────────────────────────────────
function JourneyCard({ step, idx, flight, selected, onToggle, svcByKey, Icon, ghost, mobile }) {
  const svc = svcByKey[step.key];
  const key = `step-${idx}`;
  const isSelected = !ghost && selected.has(key);
  const color = svc?.color || '#0E0F0E';
  const ink = svc?.ink || 'var(--c-on-media)';
  const partners = SVC_PRESENT[step.key]?.partners;

  return (
    <button
      onClick={() => !ghost && onToggle(key)}
      disabled={ghost}
      style={{
        position: 'relative',
        background: 'var(--c-card)',
        border: `1px solid ${isSelected ? color : 'var(--c-border)'}`,
        boxShadow: isSelected ? `0 0 0 2px ${color}` : 'none',
        borderRadius: 'var(--r-md)',
        padding: 0,
        display: 'flex', flexDirection: 'column',
        cursor: ghost ? 'default' : 'pointer',
        textAlign: 'left',
        fontFamily: 'inherit',
        overflow: 'visible',
        transition: 'border-color var(--dur-base) ease, box-shadow var(--dur-base) ease, transform var(--dur-base) ease',
        width: '100%'
      }}
      onMouseOver={(e) => { if (!ghost && !isSelected) e.currentTarget.style.transform = 'translateY(-2px)'; }}
      onMouseOut={(e) => { if (!ghost && !isSelected) e.currentTarget.style.transform = 'translateY(0)'; }}>
      {/* Numbered step circle — sits on the connecting line */}
      {!mobile &&
        <span style={{
          position: 'absolute',
          top: -22,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 30, height: 30, borderRadius: 'var(--r-pill)',
          background: 'var(--c-card)',
          border: '2px solid var(--c-primary)',
          display: 'grid', placeItems: 'center',
          fontSize: 12, fontWeight: 700,
          color: 'var(--c-primary)',
          fontVariantNumeric: 'tabular-nums',
          zIndex: 3,
          boxSizing: 'border-box'
        }}>{idx + 1}</span>
      }

      {/* Thumbnail — smaller, fixed height */}
      <div style={{
        position: 'relative',
        height: mobile ? 80 : 96,
        background: color + '14',
        display: 'grid', placeItems: 'center',
        overflow: 'hidden',
        borderTopLeftRadius: 'var(--r-md)',
        borderTopRightRadius: 'var(--r-md)'
      }}>
        {partners ?
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: mobile ? 'var(--space-12)' : 'var(--space-16)', padding: '0 var(--space-12)',
            width: '100%', height: '100%',
            boxSizing: 'border-box'
          }}>
            {partners.map((slug) =>
              <img
                key={slug}
                src={`https://cdn.simpleicons.org/${slug}/000000`}
                alt=""
                loading="lazy"
                style={{ height: mobile ? 18 : 22, width: 'auto', maxWidth: '24%', opacity: 0.78, filter: 'brightness(0)' }} />
            )}
          </div> :

          <span style={{ color: color, opacity: 0.92, display: 'grid', placeItems: 'center' }}>
            {Icon[step.key] && Icon[step.key](mobile ? 32 : 38)}
          </span>
        }

        {step.recommended && !isSelected && !ghost &&
          <span style={{
            position: 'absolute', top: 8, left: 8,
            fontSize: 9, fontWeight: 600, letterSpacing: '0.06em',
            textTransform: 'uppercase',
            padding: '3px var(--space-8)', borderRadius: 'var(--r-pill)',
            background: 'var(--c-card)', color, border: `1px solid ${color}`
          }}>Sugerido</span>
        }
        {isSelected &&
          <span style={{
            position: 'absolute', top: 8, right: 8,
            width: 22, height: 22, borderRadius: 'var(--r-pill)',
            background: color, color: ink,
            display: 'grid', placeItems: 'center'
          }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12l5 5L20 7" />
            </svg>
          </span>
        }
      </div>

      {/* Body */}
      <div style={{
        padding: mobile ? 'var(--space-12) var(--space-16) var(--space-16)' : 'var(--space-16) var(--space-16) var(--space-16)',
        display: 'flex', flexDirection: 'column', gap: 'var(--space-8)', flex: 1
      }}>
        <h4 style={{
          fontSize: mobile ? 15 : 16, fontWeight: 600,
          letterSpacing: '-0.015em', lineHeight: 1.25, margin: 0,
          display: 'flex', alignItems: 'center', gap: 'var(--space-8)'
        }}>
          <span style={{
            width: 6, height: 6, borderRadius: 3,
            background: color, flexShrink: 0
          }} />
          {svc?.label}
        </h4>
        <p style={{
          margin: 0, fontSize: 12,
          color: 'var(--c-muted-foreground)', lineHeight: 1.45, flex: 1
        }}>{step.meta}</p>
        <span style={{
          marginTop: 'var(--space-8)',
          paddingTop: 'var(--space-8)',
          borderTop: '1px dashed var(--c-border)',
          fontSize: 10, fontWeight: 600,
          letterSpacing: '0.08em', textTransform: 'uppercase',
          color: 'var(--c-muted-foreground)',
          fontVariantNumeric: 'tabular-nums'
        }}>{step.time}</span>
      </div>
    </button>);

}

function Viagem({ mobile }) {
  const [flightId, setFlightId] = useStateV(null);

  const flight = flightId ? FLIGHTS.find((f) => f.id === flightId) : null;

  const SERVICES = window.GaleonServices || [];
  const svcByKey = Object.fromEntries(SERVICES.map((s) => [s.key, s]));
  const Icon = window.GaleonServiceIcon || {};

  // Ghost flight used for the empty-state preview — TAP 8024 (Lisboa).
  // Renders a faded, non-interactive version of the full journey so the
  // user understands the section before adding their own flight.
  const ghostFlight = FLIGHTS.find((f) => f.id === 'tap-lis');
  const active = flight || ghostFlight;
  const isGhost = !flight;

  const journey = useMemoV(() => buildJourney(active), [active && active.id]);

  return (
    <section id="viagem" className="gl-section" style={{ background: 'var(--c-background-soft)' }}>
      {/* Header */}
      <div style={{
        display: 'flex', flexDirection: 'column', gap: 'var(--space-16)',
        maxWidth: 760, marginBottom: mobile ? 'var(--space-24)' : 'var(--space-32)'
      }}>
        <span className="gl-eyebrow">Sua viagem</span>
        <h2 style={{ fontSize: mobile ? 36 : 64 }}>
          Tudo encaixado no seu voo.
        </h2>
        <p style={{ fontSize: mobile ? 15 : 17, color: 'var(--c-muted-foreground)', maxWidth: 580 }}>
          {flight ?
            'Os serviços aparecem no momento exato em que fazem sentido. Você escolhe o que entra na sua viagem.' :
            'Digite o número do voo. A gente desenha a viagem em volta dele — Hospitalidade, Sala VIP, transfer, delivery — no horário certo.'
          }
        </p>
      </div>

      {/* Search + active flight chip */}
      <div style={{ marginBottom: mobile ? 'var(--space-24)' : 'var(--space-32)'}}>
        <FlightInput
          flight={flight}
          mobile={mobile}
          onSelect={setFlightId}
          onClear={() => setFlightId(null)} />
      </div>

      {/* Journey — always active (ideal departure from Lisboa as preview) */}
      <div key={active.id} style={{ position: 'relative' }}>
        {window.GaleonJourneyAnimated &&
          <window.GaleonJourneyAnimated
            journey={journey}
            flight={active}
            isGhost={false}
            svcByKey={svcByKey}
            Icon={Icon}
            mobile={mobile} />
        }
      </div>
    </section>);

}

window.GaleonViagem = Viagem;
