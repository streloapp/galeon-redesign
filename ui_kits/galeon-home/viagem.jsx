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
    when: 'Sexta · 06:30', timeOfDay: 'dawn',
    label: 'Doméstico, manhã cedo',
  },
  {
    id: 'gol-ssa', code: 'GOL 1842',
    direction: 'departure', type: 'domestic',
    origin: { code: 'GIG', city: 'Rio' },
    destination: { code: 'SSA', city: 'Salvador' },
    when: 'Sábado · 21:15', timeOfDay: 'night',
    label: 'Doméstico, voo noturno',
  },
  {
    id: 'tap-lis', code: 'TAP 8024',
    direction: 'departure', type: 'international',
    origin: { code: 'GIG', city: 'Rio' },
    destination: { code: 'LIS', city: 'Lisboa' },
    when: 'Sexta · 23:00', timeOfDay: 'night',
    currency: 'EUR',
    label: 'Internacional pra Europa',
  },
  {
    id: 'lat-mia', code: 'LATAM 8088',
    direction: 'departure', type: 'international',
    origin: { code: 'GIG', city: 'Rio' },
    destination: { code: 'MIA', city: 'Miami' },
    when: 'Quinta · 09:45', timeOfDay: 'morning',
    currency: 'USD',
    label: 'Internacional pros EUA',
  },
  {
    id: 'lat-arr-lis', code: 'LATAM 8023',
    direction: 'arrival', type: 'international',
    origin: { code: 'LIS', city: 'Lisboa' },
    destination: { code: 'GIG', city: 'Rio' },
    when: 'Domingo · 06:30', timeOfDay: 'dawn',
    currency: 'EUR',
    label: 'Voltando pra casa',
  },
];

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
  return (
    <button
      onClick={() => onToggle(key)}
      style={{
        background: isSelected ? color : '#fff',
        color: isSelected ? '#fff' : 'var(--c-fg)',
        border: '1px solid ' + (isSelected ? color : 'var(--c-border)'),
        borderRadius: 'var(--r-md)',
        padding: '14px 16px',
        display: 'flex', flexDirection: 'column', gap: 8,
        cursor: 'pointer', textAlign: 'left',
        fontFamily: 'inherit',
        transition: 'background-color .25s ease, color .25s ease, border-color .25s ease',
        width: '100%',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          width: 28, height: 28, borderRadius: 8,
          background: isSelected ? 'rgba(255,255,255,0.16)' : color + '14',
          color: isSelected ? '#fff' : color,
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
            padding: '3px 7px', borderRadius: 999,
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
  return (
    <button
      onClick={() => onToggle(k)}
      style={{
        background: isSelected ? color : '#fff',
        color: isSelected ? '#fff' : 'var(--c-fg)',
        border: '1px solid ' + (isSelected ? color : 'var(--c-border)'),
        borderRadius: 'var(--r-lg)',
        padding: large ? '28px 30px' : '22px 24px',
        display: 'flex', flexDirection: 'column', gap: 14,
        cursor: 'pointer', textAlign: 'left',
        fontFamily: 'inherit',
        transition: 'background-color .25s ease, color .25s ease, border-color .25s ease',
        minHeight: large ? 240 : 180,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          width: 38, height: 38, borderRadius: 11,
          background: isSelected ? 'rgba(255,255,255,0.16)' : color + '14',
          color: isSelected ? '#fff' : color,
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
            padding: '3px 8px', borderRadius: 999,
            color, border: '1px solid ' + color,
          }}>Sugerido</span>
        )}
        {item.urgent && !isSelected && (
          <span style={{
            marginLeft: 'auto',
            fontSize: 10, fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase',
            padding: '3px 8px', borderRadius: 999,
            color: '#fff', background: color,
          }}>Agora</span>
        )}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: 1 }}>
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
function Viagem({ mobile }) {
  const [mode, setMode] = useStateV('planejar'); // 'planejar' | 'agora'
  const [flightId, setFlightId] = useStateV('tap-lis');
  const [boardingIn, setBoardingIn] = useStateV('1h'); // '30min' | '1h' | '2h'
  const [selected, setSelected] = useStateV(new Set());

  // "Agora" mode only makes sense for departures.
  const availableFlights = useMemoV(() =>
    mode === 'agora' ? FLIGHTS.filter(f => f.direction === 'departure') : FLIGHTS,
    [mode]);
  const flight = availableFlights.find(f => f.id === flightId) || availableFlights[0];
  // Effective id (in case the active flight no longer exists in this mode).
  const effectiveFlightId = flight.id;

  // If we just switched to "agora" with an arrival flight selected, fall back.
  useEffectV(() => {
    if (effectiveFlightId !== flightId) setFlightId(effectiveFlightId);
  }, [effectiveFlightId, flightId]);

  // Wipe selection on any context change — picks shouldn't carry across modes/flights/times.
  useEffectV(() => { setSelected(new Set()); }, [mode, flightId, boardingIn]);

  const onToggle = (k) => setSelected(prev => {
    const next = new Set(prev);
    if (next.has(k)) next.delete(k); else next.add(k);
    return next;
  });

  const SERVICES = window.GaleonServices || [];
  const svcByKey = Object.fromEntries(SERVICES.map(s => [s.key, s]));
  const Icon = window.GaleonServiceIcon || {};

  const anchors = useMemoV(() => buildTimeline(flight), [flightId, mode]);
  const now = useMemoV(() => buildNow(flight, boardingIn), [flightId, boardingIn]);

  // Build cart from current view's selections.
  const cartItems = [];
  if (mode === 'planejar') {
    anchors.forEach(a => a.items.forEach((it, idx) => {
      const k = `${a.id}-${idx}`;
      if (selected.has(k)) cartItems.push({ ...it, k });
    }));
  } else {
    now.items.forEach((it, idx) => {
      const k = `now-${idx}-${it.key}`;
      if (selected.has(k)) cartItems.push({ ...it, k });
    });
  }
  const total = cartItems.reduce((sum, it) => sum + priceFor(it.key, flight), 0);

  return (
    <section id="viagem" className="gl-section" style={{ background: 'var(--c-bg-soft)' }}>
      {/* Header */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 760, marginBottom: mobile ? 24 : 36 }}>
        <span className="gl-eyebrow">Sua viagem</span>
        <h2 style={{ fontSize: mobile ? 36 : 64 }}>
          Tudo encaixado no seu voo.
        </h2>
        <p style={{ fontSize: mobile ? 15 : 17, color: 'var(--c-muted)', maxWidth: 580 }}>
          {mode === 'planejar'
            ? 'O Galeão sabe que tipo de voo é o seu, o horário, pra onde vai. Os serviços aparecem onde fazem sentido — você só escolhe.'
            : 'Já está no aeroporto? Diga quanto falta pro embarque que o Galeão indica o que dá pra resolver agora.'}
        </p>
      </div>

      {/* Mode toggle */}
      <div style={{
        display: 'inline-flex',
        padding: 4,
        background: '#fff',
        border: '1px solid var(--c-border)',
        borderRadius: 999,
        marginBottom: mobile ? 22 : 28,
        gap: 2,
      }}>
        {[
          { id: 'planejar', label: 'Planejar minha viagem' },
          { id: 'agora', label: 'Estou no Galeão agora' },
        ].map(t => {
          const isActive = t.id === mode;
          return (
            <button key={t.id} onClick={() => setMode(t.id)} style={{
              padding: mobile ? '8px 14px' : '10px 18px',
              borderRadius: 999, border: 0,
              background: isActive ? 'var(--c-fg)' : 'transparent',
              color: isActive ? '#fff' : 'var(--c-fg)',
              fontSize: 13, fontWeight: 500, letterSpacing: '-0.005em',
              cursor: 'pointer', whiteSpace: 'nowrap',
              fontFamily: 'inherit',
              transition: 'background-color .2s, color .2s',
            }}>
              {t.label}
            </button>
          );
        })}
      </div>

      {/* Flight selector */}
      <div style={{
        display: 'flex', gap: 8, flexWrap: 'wrap',
        marginBottom: mobile ? 20 : 24,
      }}>
        {availableFlights.map(f => {
          const isActive = f.id === flightId;
          return (
            <button key={f.id} onClick={() => setFlightId(f.id)} style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              padding: mobile ? '8px 14px' : '10px 18px',
              borderRadius: 999,
              border: '1px solid ' + (isActive ? 'var(--c-fg)' : 'var(--c-border)'),
              background: isActive ? 'var(--c-fg)' : '#fff',
              color: isActive ? '#fff' : 'var(--c-fg)',
              fontSize: 13, fontWeight: 500, letterSpacing: '-0.005em',
              cursor: 'pointer', whiteSpace: 'nowrap',
              fontFamily: 'inherit',
              transition: 'background-color .2s, color .2s, border-color .2s',
            }}>
              <span style={{ fontWeight: 600 }}>{f.origin.code} → {f.destination.code}</span>
              <span style={{ opacity: 0.65, fontSize: 12 }}>{f.label}</span>
            </button>
          );
        })}
      </div>

      {/* Flight strip */}
      <div style={{
        background: '#fff', border: '1px solid var(--c-border)',
        borderRadius: 'var(--r-lg)', padding: mobile ? '16px 18px' : '18px 28px',
        display: 'flex', gap: mobile ? 14 : 28, flexWrap: 'wrap', alignItems: 'center',
        marginBottom: mobile ? 24 : 36,
      }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
          <span style={{ fontSize: mobile ? 22 : 28, fontWeight: 600, letterSpacing: '-0.025em' }}>
            {flight.origin.code} → {flight.destination.code}
          </span>
          <span style={{ fontSize: 13, color: 'var(--c-muted)' }}>{flight.code}</span>
        </div>
        <div style={{ width: 1, height: 24, background: 'var(--c-border)' }}/>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span style={{ fontSize: 14, fontWeight: 500 }}>{flight.when}</span>
          <span style={{ fontSize: 12, color: 'var(--c-muted)' }}>
            {flight.direction === 'departure' ? 'Partindo do Galeão' : 'Chegando no Galeão'}
            {' · '}
            {flight.type === 'international' ? 'Internacional' : 'Doméstico'}
            {flight.currency ? ` · ${flight.currency}` : ''}
          </span>
        </div>
      </div>

      {mode === 'planejar' && (
        <div style={{ position: 'relative' }}>
          {!mobile && (
            <div style={{
              position: 'absolute', top: 11, left: '12.5%', right: '12.5%', height: 1,
              background: 'var(--c-border)', zIndex: 0,
            }}/>
          )}
          <div key={flightId} className="gl-hero-anim" style={{
            display: 'grid',
            gridTemplateColumns: mobile ? '1fr' : 'repeat(4, 1fr)',
            gap: mobile ? 28 : 18,
            position: 'relative', zIndex: 1,
          }}>
            {anchors.map((a, ai) => (
              <div key={a.id} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: mobile ? 'flex-start' : 'center' }}>
                  <span style={{
                    width: 22, height: 22, borderRadius: 11,
                    background: '#fff', border: '1.5px solid var(--c-fg)',
                    display: 'grid', placeItems: 'center', fontSize: 11, fontWeight: 600,
                    color: 'var(--c-fg)',
                  }}>{ai + 1}</span>
                  <span style={{ fontSize: 14, fontWeight: 600, letterSpacing: '-0.005em' }}>{a.label}</span>
                  <span style={{ fontSize: 12, color: 'var(--c-muted)' }}>{a.time}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {a.items.length === 0 && !mobile && (
                    <div style={{
                      border: '1px dashed var(--c-border)', borderRadius: 'var(--r-md)',
                      padding: '20px 16px', fontSize: 12, color: 'var(--c-muted)', textAlign: 'center',
                      minHeight: 100, display: 'grid', placeItems: 'center',
                    }}>
                      Sem ações aqui
                    </div>
                  )}
                  {a.items.map((it, idx) => (
                    <ServiceCard
                      key={`${a.id}-${idx}`}
                      item={it} anchorId={a.id} idx={idx}
                      selected={selected} onToggle={onToggle}
                      svcByKey={svcByKey} Icon={Icon}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {mode === 'agora' && (
        <div>
          {/* Boarding-in picker */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap',
            marginBottom: mobile ? 20 : 24,
          }}>
            <span style={{ fontSize: 14, fontWeight: 500 }}>Embarque em:</span>
            <div style={{
              display: 'inline-flex',
              padding: 4,
              background: '#fff',
              border: '1px solid var(--c-border)',
              borderRadius: 999,
              gap: 2,
            }}>
              {[
                { id: '30min', label: 'Menos de 30 min' },
                { id: '1h', label: 'Cerca de 1 hora' },
                { id: '2h', label: '2 horas ou mais' },
              ].map(t => {
                const isActive = t.id === boardingIn;
                return (
                  <button key={t.id} onClick={() => setBoardingIn(t.id)} style={{
                    padding: mobile ? '7px 12px' : '8px 16px',
                    borderRadius: 999, border: 0,
                    background: isActive ? 'var(--c-fg)' : 'transparent',
                    color: isActive ? '#fff' : 'var(--c-fg)',
                    fontSize: 13, fontWeight: 500,
                    cursor: 'pointer', whiteSpace: 'nowrap',
                    fontFamily: 'inherit',
                    transition: 'background-color .2s, color .2s',
                  }}>
                    {t.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Framing line + cards */}
          <div key={`${flightId}-${boardingIn}`} className="gl-hero-anim">
            <p style={{
              fontSize: mobile ? 18 : 22, fontWeight: 500,
              letterSpacing: '-0.015em', lineHeight: 1.3,
              marginBottom: mobile ? 16 : 24, maxWidth: 720,
            }}>{now.framing}</p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: mobile
                ? '1fr'
                : (now.items.length === 1 ? 'minmax(0, 520px)'
                  : now.items.length === 2 ? 'repeat(2, 1fr)'
                  : 'repeat(3, 1fr)'),
              gap: mobile ? 12 : 16,
            }}>
              {now.items.map((it, idx) => (
                <NowCard
                  key={`now-${idx}-${it.key}`}
                  item={it} idx={idx}
                  selected={selected} onToggle={onToggle}
                  svcByKey={svcByKey} Icon={Icon}
                  large={now.items.length === 1}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Cart */}
      {cartItems.length > 0 && (
        <div className="gl-hero-anim" style={{
          marginTop: mobile ? 28 : 36,
          padding: mobile ? '20px 22px' : '24px 32px',
          background: 'var(--c-fg)', color: '#fff',
          borderRadius: 'var(--r-lg)',
          display: 'flex', flexDirection: mobile ? 'column' : 'row',
          gap: mobile ? 18 : 24,
          alignItems: mobile ? 'stretch' : 'center', justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, flex: 1, minWidth: 0 }}>
            <span style={{ fontSize: 12, fontWeight: 500, letterSpacing: '0.04em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)' }}>
              {mode === 'planejar' ? 'Sua viagem' : 'Seu pedido'} · {cartItems.length} {cartItems.length === 1 ? 'serviço' : 'serviços'}
            </span>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {cartItems.map(it => {
                const s = svcByKey[it.key];
                return (
                  <span key={it.k} style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    padding: '7px 12px', borderRadius: 999,
                    background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.16)',
                    fontSize: 12, fontWeight: 500,
                  }}>
                    <span style={{ width: 6, height: 6, borderRadius: 3, background: s?.color }}/>
                    {s?.label}
                  </span>
                );
              })}
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexShrink: 0 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: mobile ? 'flex-start' : 'flex-end' }}>
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>A partir de</span>
              <span style={{ fontSize: mobile ? 24 : 28, fontWeight: 600, letterSpacing: '-0.025em' }}>
                R$ {total.toLocaleString('pt-BR')}
              </span>
            </div>
            <button className="gl-btn gl-btn--primary" style={{ flexShrink: 0 }}>
              {mode === 'planejar' ? 'Reservar viagem' : 'Reservar agora'} {window.GaleonIcon.arrow(14)}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

window.GaleonViagem = Viagem;
