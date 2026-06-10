// GaleON home — remaining sections: Serviços, Vitrine, ProvaSocial, Jornada, Footer.

const { useState: useStateS, useEffect: useEffectS } = React;

// ─── Serviços (overview) ────────────────────────────────────────────────────
// Scannable grid of all 7 services — icon + name + 1-line summary, in the
// same hierarchy order as the SERVICES array. Sits above the existing
// `Servicos` (showcase) section using the same eyebrow + title.
function ServicosOverview({ mobile }) {
  const services = window.GaleonServices || [];
  const Icon = window.GaleonServiceIcon || {};
  return (
    <section id="servicos-overview" className="gl-section" style={{ paddingTop: mobile ? 56 : 96, paddingBottom: mobile ? 24 : 32 }}>
      <div style={{ maxWidth: 720, marginBottom: mobile ? 28 : 48 }}>
        <span className="gl-eyebrow">Serviços</span>
        <h2 style={{ fontSize: mobile ? 'var(--text-h2-mobile)' : 'var(--text-h2)', marginTop: 16, maxWidth: 880 }}>
          Pra cada momento da viagem.
        </h2>
      </div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: mobile ? '1fr 1fr' : 'repeat(4, 1fr)',
        gap: mobile ? 12 : 18
      }}>
        {services.map((s) =>
        <a key={s.key} href={`#${s.key}`} className="gl-card" style={{
          display: 'flex', flexDirection: 'column', gap: 16,
          padding: mobile ? '20px 18px' : '26px 26px 28px',
          border: '1px solid var(--c-border)', borderRadius: 'var(--r-lg)',
          background: 'var(--c-card)', minHeight: mobile ? 'auto' : 210,
          color: 'var(--c-foreground)',
          position: 'relative',
          textDecoration: 'none'
        }}>
            <div style={{
            width: mobile ? 40 : 44, height: mobile ? 40 : 44, borderRadius: 12,
            background: `color-mix(in srgb, ${s.color} 8%, transparent)`, color: s.color,
            display: 'grid', placeItems: 'center',
            alignSelf: 'flex-start'
          }}>
              {Icon[s.key] && Icon[s.key](mobile ? 20 : 22)}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: 1 }}>
              <span style={{ fontSize: mobile ? 'var(--text-subtitle-mobile)' : 'var(--text-subtitle)', fontWeight: 600, letterSpacing: '-0.01em' }}>{s.label}</span>
              <span style={{ fontSize: mobile ? 'var(--text-small-mobile)' : 'var(--text-small)', color: 'var(--c-muted-foreground)', lineHeight: 1.4 }}>{s.short}</span>
            </div>
            <span style={{
            position: 'absolute', top: mobile ? 18 : 24, right: mobile ? 16 : 22,
            color: 'var(--c-muted-foreground)'
          }}>{window.GaleonIcon.arrow(15)}</span>
          </a>
        )}
      </div>
    </section>);

}

// ─── Serviços ───────────────────────────────────────────────────────────────
function Servicos({ mobile }) {
  const compact = [
  { name: 'Guarda-volume', color: 'var(--c-guarda)', desc: 'Deixe a bagagem em segurança.' },
  { name: 'Câmbio', color: 'var(--c-cambio)', desc: 'Troque moeda sem fila.' },
  { name: 'Personal Shopper', color: 'var(--c-personal)', desc: 'Alguém compra por você no Galeão.' }];


  return (
    <section id="servicos" className="gl-section">
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
        gap: 24, marginBottom: mobile ? 32 : 64, flexWrap: 'wrap'
      }}>
        <div style={{ maxWidth: 720 }}>
          <span className="gl-eyebrow">Serviços</span>
          <h2 style={{ fontSize: mobile ? 'var(--text-h2-mobile)' : 'var(--text-h2)', marginTop: 16, maxWidth: 880 }}>
            Pra cada momento da viagem.
          </h2>
        </div>
        {!mobile &&
        <a href="#" className="gl-btn gl-btn--ghost">
            Ver todos os serviços {window.GaleonIcon.arrow(13)}
          </a>
        }
      </div>

      {/* Top row: Hospitalidade (huge) + Delivery (vertical) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: mobile ? '1fr' : '1.6fr 1fr',
        gap: mobile ? 14 : 18
      }}>
        <HospitalidadeCard mobile={mobile} />
        <DeliveryCard mobile={mobile} />
      </div>

      {/* Middle row: Sala VIP + Transportes */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: mobile ? '1fr' : '1fr 1fr',
        gap: mobile ? 14 : 18,
        marginTop: mobile ? 14 : 18
      }}>
        <SalaVipCard mobile={mobile} />
        <TransportesCard mobile={mobile} />
      </div>

      {/* Compact row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: mobile ? '1fr' : 'repeat(3, 1fr)',
        gap: mobile ? 14 : 18,
        marginTop: mobile ? 14 : 18
      }}>
        {compact.map((c) =>
        <CompactCard key={c.name} {...c} mobile={mobile} />
        )}
      </div>
    </section>);

}

function ServiceCardBase({ children, dark, style, mobile, slotId, slotPlaceholder, ratio = '4/3', height }) {
  return (
    <article className="gl-card" style={{
      position: 'relative',
      borderRadius: 'var(--r-xl)',
      overflow: 'hidden',
      background: dark ? 'var(--c-surface-dark)' : 'var(--c-background-soft)',
      color: dark ? 'var(--c-surface-dark-foreground)' : 'var(--c-foreground)',
      border: '1px solid ' + (dark ? 'var(--c-border-strong)' : 'var(--c-border)'),
      ...style
    }}>
      {slotId &&
      <div style={{ width: '100%', aspectRatio: height ? undefined : ratio, height: height || undefined, position: 'relative' }}>
          <image-slot
          id={slotId}
          shape="rounded"
          radius="0"
          placeholder={slotPlaceholder}
          style={{ width: '100%', height: '100%' }}>
        </image-slot>
        </div>
      }
      <div style={{ padding: mobile ? '20px 22px 22px' : '28px 32px 32px' }}>
        {children}
      </div>
    </article>);

}

function HospitalidadeCard({ mobile }) {
  return (
    <article className="gl-card" id="hospitalidade" style={{
      position: 'relative',
      borderRadius: 'var(--r-xl)',
      overflow: 'hidden',
      background: 'var(--c-surface-dark)', color: 'var(--c-on-media)',
      minHeight: mobile ? 520 : 620,
      display: 'flex', flexDirection: 'column'
    }}>
      <div style={{ position: 'absolute', inset: 0 }}>
        <image-slot
          id="gl-srv-hospitalidade"
          shape="rounded"
          radius="0"
          placeholder="atendente da Hospitalidade recebendo passageiro"
          style={{ width: '100%', height: '100%' }}>
        </image-slot>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.0) 35%, rgba(0,0,0,0.0) 50%, rgba(0,0,0,0.75) 100%)' }} />
      </div>
      <div style={{ position: 'relative', padding: mobile ? '24px 24px' : '36px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
        <span className="gl-tag" style={{ background: 'rgba(255,255,255,0.18)', color: 'var(--c-on-media)', borderColor: 'rgba(255,255,255,0.24)', backdropFilter: 'blur(8px)' }}>
          <span className="dot" style={{ background: 'var(--c-primary)' }} /> Em destaque
        </span>
        <span style={{ fontSize: 'var(--text-micro)', color: 'rgba(255,255,255,0.7)' }}>Hospitalidade</span>
      </div>
      <div style={{ flex: 1 }} />
      <div style={{ position: 'relative', padding: mobile ? '0 24px 28px' : '0 40px 40px', display: 'flex', flexDirection: 'column', gap: 22, maxWidth: 720 }}>
        <h3 style={{ fontSize: mobile ? 'var(--text-h2-mobile)' : 'var(--text-h2)', color: 'var(--c-on-media)' }}>
          Hospitalidade do<br />desembarque ao embarque.
        </h3>
        <p style={{ fontSize: mobile ? 'var(--text-body-mobile)' : 'var(--text-body)', color: 'rgba(255,255,255,0.78)', maxWidth: 460, lineHeight: 1.45 }}>
          Check-in assistido, fast-track e condução até o portão.
        </p>
        <div style={{ display: 'flex', flexDirection: mobile ? 'column' : 'row', gap: 10, alignItems: mobile ? 'stretch' : 'center' }}>
          <a href="meet-greet.html" className="gl-btn gl-btn--primary" style={{ textDecoration: 'none' }}>Conhecer mais {window.GaleonIcon.arrow(14)}</a>
          <span style={{ fontSize: 'var(--text-small)', color: 'rgba(255,255,255,0.65)', marginLeft: mobile ? 0 : 4 }}>
            A partir de R$ 480
          </span>
        </div>
      </div>
    </article>);

}

function DeliveryCard({ mobile }) {
  return (
    <article className="gl-card" style={{
      position: 'relative',
      borderRadius: 'var(--r-xl)',
      overflow: 'hidden',
      background: 'var(--c-background-soft)',
      border: '1px solid var(--c-border)',
      display: 'flex', flexDirection: 'column',
      minHeight: mobile ? 'auto' : 620
    }}>
      <div style={{ position: 'relative', height: mobile ? 220 : 320 }}>
        <image-slot
          id="gl-srv-delivery"
          shape="rounded"
          radius="0"
          placeholder="bandeja de hambúrguer entregue no portão"
          style={{ width: '100%', height: '100%' }}>
        </image-slot>
        <span className="gl-tag" style={{
          position: 'absolute', top: 18, left: 18,
          color: 'var(--c-delivery)', background: 'rgba(255,255,255,0.95)'
        }}>
          <span className="dot" /> Delivery
        </span>
      </div>
      <div style={{ padding: mobile ? '22px 22px 26px' : '32px 32px 36px', display: 'flex', flexDirection: 'column', gap: 16, flex: 1 }}>
        <h3 style={{ fontSize: mobile ? 'var(--text-h4-mobile)' : 'var(--text-h4)' }}>
          Peça sua comida sem sair do portão de embarque
        </h3>
        <p style={{ color: 'var(--c-muted-foreground)', fontSize: mobile ? 'var(--text-body-mobile)' : 'var(--text-body)', lineHeight: 1.45, flex: 1 }}>
          Mais de 30 restaurantes do RIOgaleão entregam direto para você. Em até 30 minutos.
        </p>
        <button className="gl-btn gl-btn--dark" style={{ alignSelf: 'flex-start' }}>
          Peça no portão de embarque {window.GaleonIcon.arrow(14)}
        </button>
      </div>
    </article>);

}

function SalaVipCard({ mobile }) {
  return (
    <article className="gl-card" style={{
      borderRadius: 'var(--r-xl)',
      overflow: 'hidden',
      background: '#F4F0F4',
      border: '1px solid #E8DCE8',
      display: 'grid',
      gridTemplateColumns: mobile ? '1fr' : '1fr 1fr',
      minHeight: mobile ? 'auto' : 340
    }}>
      <div style={{ padding: mobile ? '22px 22px 26px' : '32px 32px 32px', display: 'flex', flexDirection: 'column', gap: 16, justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <span className="gl-tag" style={{ color: 'var(--c-sala-vip)', alignSelf: 'flex-start' }}>
            <span className="dot" /> Sala VIP
          </span>
          <h3 style={{ fontSize: mobile ? 'var(--text-h4-mobile)' : 'var(--text-h4)' }}>
            Embarque sem barulho.
          </h3>
          <p style={{ color: 'var(--c-muted-foreground)', fontSize: 'var(--text-body)', lineHeight: 1.45 }}>
            Salas domésticas e internacionais, com chuveiro e bebidas.
          </p>
        </div>
        <button className="gl-btn gl-btn--outline" style={{ alignSelf: 'flex-start' }}>
          Reserve sua Sala VIP {window.GaleonIcon.arrow(14)}
        </button>
      </div>
      <div style={{ position: 'relative', minHeight: mobile ? 200 : 'auto' }}>
        <image-slot
          id="gl-srv-vip"
          shape="rounded"
          radius="0"
          placeholder="poltrona da sala VIP com vista para a pista"
          style={{ width: '100%', height: '100%' }}>
        </image-slot>
      </div>
    </article>);

}

function TransportesCard({ mobile }) {
  return (
    <article className="gl-card" style={{
      borderRadius: 'var(--r-xl)',
      overflow: 'hidden',
      background: '#FBF5E9',
      border: '1px solid #F2E8CC',
      display: 'grid',
      gridTemplateColumns: mobile ? '1fr' : '1fr 1fr',
      minHeight: mobile ? 'auto' : 340
    }}>
      <div style={{ padding: mobile ? '22px 22px 26px' : '32px 32px 32px', display: 'flex', flexDirection: 'column', gap: 16, justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <span className="gl-tag" style={{ color: '#B07D00', alignSelf: 'flex-start' }}>
            <span className="dot" /> Transportes
          </span>
          <h3 style={{ fontSize: mobile ? 'var(--text-h4-mobile)' : 'var(--text-h4)' }}>
            Táxi e transfer pra começar leve.
          </h3>
          <p style={{ color: 'var(--c-muted-foreground)', fontSize: 'var(--text-body)', lineHeight: 1.45 }}>
            Motorista te encontra no portão certo.
          </p>
        </div>
        <button className="gl-btn gl-btn--outline" style={{ alignSelf: 'flex-start' }}>
          Reserve seu transfer {window.GaleonIcon.arrow(14)}
        </button>
      </div>
      <div style={{ position: 'relative', minHeight: mobile ? 200 : 'auto' }}>
        <image-slot
          id="gl-srv-transfer"
          shape="rounded"
          radius="0"
          placeholder="van de transfer encostada no terminal"
          style={{ width: '100%', height: '100%' }}>
        </image-slot>
      </div>
    </article>);

}

function CompactCard({ name, color, desc, mobile }) {
  return (
    <article className="gl-card" style={{
      borderRadius: 'var(--r-lg)',
      padding: mobile ? '22px' : '28px',
      background: 'var(--c-card)',
      border: '1px solid var(--c-border)',
      display: 'flex', flexDirection: 'column', gap: 18,
      minHeight: mobile ? 'auto' : 220
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          fontSize: 'var(--text-micro)', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase',
          color
        }}>
          <span style={{ width: 8, height: 8, borderRadius: 4, background: color, boxShadow: `0 0 0 4px ${color}22` }} />
          {name}
        </span>
        <span style={{ color: 'var(--c-muted-foreground)' }}>{window.GaleonIcon.arrow(15)}</span>
      </div>
      <p style={{ fontSize: mobile ? 'var(--text-subtitle-mobile)' : 'var(--text-subtitle)', lineHeight: 1.3, color: 'var(--c-foreground)', fontWeight: 500, letterSpacing: '-0.01em', flex: 1 }}>
        {desc}
      </p>
    </article>);

}

// ─── Vitrine ────────────────────────────────────────────────────────────────
const VITRINE_DATA = {
  delivery: {
    eyebrow: 'Delivery',
    title: 'Mais pedidos',
    cta: 'Peça no portão de embarque',
    items: [
    { brand: 'Outback', dish: 'Bloomin\' Burger', meta: '12 min · R$ 64', slot: 'gl-vit-outback' },
    { brand: 'Cheirin Bão', dish: 'Pão de queijo recheado', meta: '8 min · R$ 22', slot: 'gl-vit-cheirin' },
    { brand: 'Spoleto', dish: 'Penne ao rosé', meta: '10 min · R$ 38', slot: 'gl-vit-spoleto' },
    { brand: 'Bonjour Café', dish: 'Croissant + flat white', meta: '6 min · R$ 28', slot: 'gl-vit-bonjour' },
    { brand: 'Lokal', dish: 'Bowl de salmão grelhado', meta: '14 min · R$ 56', slot: 'gl-vit-lokal' },
    { brand: 'Brasileirinho', dish: 'Feijoada premium', meta: '15 min · R$ 49', slot: 'gl-vit-brasileirinho' }]

  },
  vip: {
    eyebrow: 'Sala VIP',
    title: 'Salas disponíveis.',
    cta: 'Reserve sua Sala VIP',
    items: [
    { brand: 'Plaza Premium', dish: 'Embarque doméstico', meta: '3h · a partir de R$ 189', slot: 'gl-vit-pp-dom' },
    { brand: 'Plaza Premium', dish: 'Embarque internacional', meta: '3h · a partir de R$ 245', slot: 'gl-vit-pp-int' },
    { brand: 'TFC The Club', dish: 'Embarque internacional', meta: '4h · a partir de R$ 289', slot: 'gl-vit-tfc' }]

  },
  transportes: {
    eyebrow: 'Transportes',
    title: 'Opções de transfer.',
    cta: 'Reserve seu transfer',
    items: [
    { brand: 'Táxi Executivo', dish: 'Transfer privativo', meta: 'Do aeroporto ao destino', slot: 'gl-vit-taxi-1' },
    { brand: 'Van Compartilhada', dish: 'Transfer econômico', meta: 'Até 8 passageiros', slot: 'gl-vit-taxi-2' },
    { brand: 'Transfer VIP', dish: 'Veículo premium', meta: 'Mercedes ou similar', slot: 'gl-vit-taxi-3' },
    { brand: 'Transfer Noturno', dish: 'Disponível 24h', meta: 'Reserva com antecedência', slot: 'gl-vit-taxi-4' }]

  }
};

function Vitrine({ mobile }) {
  const [tab, setTab] = useStateS('delivery');
  const data = VITRINE_DATA[tab];
  return (
    <section id="vitrine" className="gl-section" style={{ background: 'var(--c-background)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24, flexWrap: 'wrap', marginBottom: mobile ? 28 : 40 }}>
        <div style={{ maxWidth: 720, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <span className="gl-eyebrow">Destaques</span>
          <h2 style={{ fontSize: mobile ? 'var(--text-h2-mobile)' : 'var(--text-h2)' }}>Mais pedidos</h2>
        </div>
        <div className="gl-tabs">
          {['delivery', 'vip', 'transportes'].map((k) => {
            const isActive = tab === k;
            const tabColor = k === 'delivery' ? 'var(--c-delivery)' :
              k === 'vip' ? 'var(--c-sala-vip)' :
              'var(--c-transportes)';
            const tabInk = k === 'delivery' ? 'var(--c-delivery-foreground)' :
              k === 'vip' ? 'var(--c-sala-vip-foreground)' :
              'var(--c-transportes-foreground)';
            return (
              <button
                key={k}
                className="gl-tab"
                data-active={isActive}
                onClick={() => setTab(k)}
                style={isActive ? { background: tabColor, color: tabInk } : undefined}>
                {k === 'delivery' ? 'Delivery' : k === 'vip' ? 'Sala VIP' : 'Transportes'}
              </button>);
          })}
        </div>
      </div>
      <div className="gl-hscroll" style={{
        display: 'grid',
        gridAutoFlow: 'column',
        gridAutoColumns: mobile ? '78%' : tab === 'delivery' ? '300px' : '380px',
        gap: 16,
        overflowX: 'auto',
        padding: '4px 0 24px',
        scrollSnapType: 'x mandatory'
      }}>
        {data.items.map((it, i) =>
        <VitrineCard key={i} {...it} accent={tab} />
        )}
      </div>
    </section>);

}

function VitrineCard({ brand, dish, meta, slot, accent }) {
  const accentColor = accent === 'delivery' ? 'var(--c-delivery)' : accent === 'vip' ? 'var(--c-sala-vip)' : 'var(--c-foreground)';
  return (
    <article style={{
      background: 'var(--c-card)',
      borderRadius: 'var(--r-lg)',
      overflow: 'hidden',
      border: '1px solid var(--c-border)',
      scrollSnapAlign: 'start',
      display: 'flex', flexDirection: 'column'
    }}>
      <div style={{ aspectRatio: '4/3', position: 'relative' }}>
        <image-slot id={slot} shape="rounded" radius="0" placeholder={`foto: ${dish}`} style={{ width: '100%', height: '100%' }}></image-slot>
      </div>
      <div style={{ padding: '16px 18px 18px', display: 'flex', flexDirection: 'column', gap: 6 }}>
        <span style={{ fontSize: 'var(--text-micro)', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', color: accentColor }}>{brand}</span>
        <span style={{ fontSize: 'var(--text-body)', fontWeight: 500, letterSpacing: '-0.01em' }}>{dish}</span>
        <span style={{ fontSize: 'var(--text-small)', color: 'var(--c-muted-foreground)', marginTop: 4 }}>{meta}</span>
      </div>
    </article>);

}

// ─── Sobre o GaleON ─────────────────────────────────────────────────────────
// Editorial section: 3 zones only — header → focal moment with image →
// credentials + partners as the data block. Title matches the declarative
// pattern of other sections ("Tudo encaixado…", "Ainda tem perguntas?").
// ─── Parceiros (faixa horizontal contínua) ──────────────────────────────────
// Lives between the hero and the ProvaSocial section. Real brand logos served
// by the Simple Icons CDN, forced to monochrome black via the `/000000` color
// suffix + a `brightness(0)` filter as a hardening fallback. Reads as a single
// typographic band passing through the page.
function ParceirosStrip({ mobile }) {
  const partners = [
  { slug: 'starbucks', alt: 'Starbucks' },
  { slug: 'burgerking', alt: 'Burger King' },
  { slug: 'mcdonalds', alt: "McDonald's" },
  { slug: 'kfc', alt: 'KFC' },
  { slug: 'loccitaneenprovence', alt: "L'Occitane en Provence" },
  { slug: 'hilton', alt: 'Hilton' },
  { slug: 'marriott', alt: 'Marriott' },
  { slug: 'americanairlines', alt: 'American Airlines' },
  { slug: 'airbnb', alt: 'Airbnb' },
  { slug: 'bookingdotcom', alt: 'Booking.com' },
  { slug: 'expedia', alt: 'Expedia' },
  { slug: 'visa', alt: 'Visa' },
  { slug: 'mastercard', alt: 'Mastercard' }];

  return (
    <div style={{
      paddingTop: mobile ? 48 : 80,
      paddingBottom: mobile ? 28 : 40,
      background: 'var(--c-background)',
      overflow: 'hidden',
      maskImage: 'linear-gradient(90deg, transparent 0, #000 6%, #000 94%, transparent 100%)',
      WebkitMaskImage: 'linear-gradient(90deg, transparent 0, #000 6%, #000 94%, transparent 100%)'
    }}>
      <div className="gl-marquee-track" style={{ gap: mobile ? 56 : 88, alignItems: 'center' }}>
        {[...partners, ...partners].map((p, i) =>
        <img
          key={i}
          src={`https://cdn.simpleicons.org/${p.slug}/000000`}
          alt={p.alt}
          loading="lazy"
          style={{
            height: mobile ? 22 : 30,
            width: 'auto',
            flexShrink: 0,
            opacity: 0.7,
            filter: 'brightness(0)'
          }} />
        )}
      </div>
    </div>);

}

window.GaleonParceirosStrip = ParceirosStrip;

// ─── Experiências (premium service feature) ────────────────────────────────
// Editorial split card: full-bleed image on the left, copy block on the
// right. Shares the soft grey background with "Sua viagem" so the two
// service-context blocks read as one act of the page.
function Experiencias({ mobile }) {
  return (
    <section id="experiencias" className="gl-section" style={{ background: 'var(--c-background-soft)' }}>
      <div style={{
        display: 'flex', flexDirection: 'column', gap: 16,
        maxWidth: 760, marginBottom: mobile ? 28 : 40
      }}>
        <span className="gl-eyebrow">Serviços</span>
        <h2 style={{ fontSize: mobile ? 'var(--text-h2-mobile)' : 'var(--text-h2)', lineHeight: 'var(--text-h2-lh)' }}>
          Experiências para cada momento da sua jornada
        </h2>
      </div>

      <article style={{
        background: 'var(--c-card)',
        borderRadius: 'var(--r-xl)',
        overflow: 'hidden',
        display: 'grid',
        gridTemplateColumns: mobile ? '1fr' : '1.05fr 1fr',
        height: mobile ? 'auto' : 390,
        transition: 'transform .2s ease, box-shadow .2s ease'
      }}
      onMouseOver={(e) => {e.currentTarget.style.transform = 'translateY(-2px)';e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.08)';}}
      onMouseOut={(e) => {e.currentTarget.style.transform = 'translateY(0)';e.currentTarget.style.boxShadow = 'none';}}>
        {/* Image side */}
        <div style={{
          position: 'relative',
          padding: mobile ? 16 : '36px 0 36px 40px',
          aspectRatio: mobile ? '4/3' : 'auto',
          minHeight: mobile ? 230 : 'auto'
        }}>
          <div style={{
            position: 'relative',
            width: '100%', height: '100%',
            borderRadius: 'var(--r-lg)',
            overflow: 'hidden'
          }}>
            <image-slot
              id="gl-exp-hospitalidade"
              shape="rect"
              fit="cover"
              placeholder="passageira sorrindo no terminal do Galeão"
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
            </image-slot>
            <div style={{
              position: 'absolute', inset: 0,
              background: mobile ?
              'linear-gradient(180deg, rgba(0,0,0,0) 60%, rgba(0,0,0,0.25) 100%)' :
              'linear-gradient(90deg, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0) 60%)',
              pointerEvents: 'none'
            }} />
          </div>
        </div>

        {/* Copy side */}
        <div style={{
          padding: mobile ? '28px 24px 32px' : '44px 56px 44px 36px',
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          gap: mobile ? 16 : 20
        }}>
          {/* Service tag — icon + name in service color */}
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            color: 'var(--c-sala-vip)',
            fontSize: 'var(--text-micro)', fontWeight: 600, letterSpacing: '0.06em',
            textTransform: 'uppercase'
          }}>
            {window.GaleonServiceIcon && window.GaleonServiceIcon.vip(16)}
            Sala VIP
          </span>

          <h3 style={{
            margin: 0,
            fontSize: mobile ? 'var(--text-h4-mobile)' : 'var(--text-h4)', lineHeight: 'var(--text-h4-lh)', letterSpacing: 'var(--text-h4-tracking)',
            fontWeight: 600,
            maxWidth: 520
          }}>
            Embarque com privacidade e conforto
          </h3>

          <div style={{
            display: 'flex', flexDirection: 'column', gap: 12,
            fontSize: mobile ? 'var(--text-body-mobile)' : 'var(--text-body)', lineHeight: 1.5,
            color: 'var(--c-muted-foreground)', maxWidth: 480
          }}>
            <p style={{ margin: 0 }}>
              Salas domésticas e internacionais com chuveiro, bebida e wi-fi rápido — reserve por hora, sem milhas.
            </p>
          </div>

          <a href="#servicos" className="gl-btn gl-btn--ghost" style={{ alignSelf: 'flex-start', marginLeft: -16 }}>
            Conhecer todos os serviços {window.GaleonIcon && window.GaleonIcon.arrow(13)}
          </a>
        </div>
      </article>

      {/* Secondary feature cards \u2014 two side-by-side teasers below the hero */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: mobile ? '1fr' : '1fr 1fr',
        gap: mobile ? 16 : 24,
        marginTop: mobile ? 16 : 24
      }}>
        <ExpFeatureCard
          serviceKey="delivery"
          serviceLabel="Delivery"
          serviceColor="var(--c-delivery)"
          title="Peça sem sair do portão"
          desc="Restaurantes do Galeão entregam no seu assento em até 12 minutos."
          slotId="gl-exp-delivery"
          slotPlaceholder="bandeja de comida entregue no portão de embarque"
          href="#delivery"
          mobile={mobile} />
        <ExpFeatureCard
          serviceKey="transportes"
          serviceLabel="Transporte"
          serviceColor="var(--c-transportes)"
          title="Planeje seu retorno com segurança"
          desc="Táxi e transfer com tarifa fechada antes de chegar ao Galeão."
          slotId="gl-exp-transportes"
          slotPlaceholder="van de transfer encostada no terminal"
          href="#transportes"
          mobile={mobile} />
      </div>

      {/* Tertiary row — 3 compact cards (eyebrow + desc only) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: mobile ? '1fr' : 'repeat(3, 1fr)',
        gap: mobile ? 12 : 24,
        marginTop: mobile ? 12 : 24
      }}>
        <ExpMiniCard
          serviceKey="guarda"
          serviceLabel="Guarda-volumes"
          serviceColor="var(--c-guarda)"
          desc="Deixe a bagagem em segurança no aeroporto e ande leve enquanto resolve a viagem."
          href="#guarda"
          mobile={mobile} />
        <ExpMiniCard
          serviceKey="cambio"
          serviceLabel="Câmbio"
          serviceColor="var(--c-cambio)"
          desc="Reserve a taxa online e retire moeda estrangeira sem fila no balcão do Galeão."
          href="#cambio"
          mobile={mobile} />
        <ExpMiniCard
          serviceKey="personal"
          serviceLabel="Personal Shopper"
          serviceColor="var(--c-personal)"
          desc="Alguém faz as compras das lojas do Galeão e entrega antes do embarque."
          href="#personal"
          mobile={mobile} />
      </div>
    </section>);

}

// Secondary feature card used by Experiencias \u2014 Apple-style: copy on top,
// image filling the bottom. Pure white card, no inner divisions.
function ExpFeatureCard({ serviceKey, serviceLabel, serviceColor, title, desc, slotId, slotPlaceholder, href, mobile }) {
  const Icon = window.GaleonServiceIcon || {};
  return (
    <a href={href} style={{
      background: 'var(--c-card)',
      borderRadius: 'var(--r-xl)',
      overflow: 'hidden',
      display: 'flex', flexDirection: 'column',
      textDecoration: 'none', color: 'inherit',
      minHeight: mobile ? 340 : 380,
      transition: 'transform .2s ease, box-shadow .2s ease'
    }}
    onMouseOver={(e) => {e.currentTarget.style.transform = 'translateY(-2px)';e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.08)';}}
    onMouseOut={(e) => {e.currentTarget.style.transform = 'translateY(0)';e.currentTarget.style.boxShadow = 'none';}}>
      {/* Top: copy block — centered horizontally, top-aligned */}
      <div style={{
        padding: mobile ? '28px 24px 0' : '36px 40px 0px 46px',
        display: 'flex', flexDirection: 'column',
        gap: mobile ? 12 : 14,
        alignItems: 'flex-start', textAlign: 'left'
      }}>
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          color: serviceColor,
          fontSize: 'var(--text-micro)', fontWeight: 600, letterSpacing: '0.06em',
          textTransform: 'uppercase'
        }}>
          {Icon[serviceKey] && Icon[serviceKey](16)}
          {serviceLabel}
        </span>

        <h3 style={{
          margin: 0,
          fontSize: mobile ? 'var(--text-h4-mobile)' : 'var(--text-h4)', lineHeight: 'var(--text-h4-lh)', letterSpacing: 'var(--text-h4-tracking)',
          fontWeight: 600, maxWidth: 480
        }}>{title}</h3>

        <p style={{
          margin: 0, fontSize: mobile ? 'var(--text-body-mobile)' : 'var(--text-body)',
          color: 'var(--c-muted-foreground)', lineHeight: 1.5,
          maxWidth: 420
        }}>{desc}</p>

        <span className="gl-btn gl-btn--ghost" style={{ alignSelf: 'flex-start', marginLeft: -16 }}>
          Saiba mais {window.GaleonIcon && window.GaleonIcon.arrow(13)}
        </span>
      </div>

      {/* Bottom: image fills remaining space */}
      <div style={{
        position: 'relative', flex: 1,
        marginTop: mobile ? 22 : 28,
        minHeight: mobile ? 150 : 170
      }}>
        <image-slot
          id={slotId}
          shape="rect"
          fit="cover"
          placeholder={slotPlaceholder}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        </image-slot>
      </div>
    </a>);

}

// Compact card — eyebrow + description only, no image.
function ExpMiniCard({ serviceKey, serviceLabel, serviceColor, desc, href, mobile }) {
  const Icon = window.GaleonServiceIcon || {};
  return (
    <a href={href} style={{
      position: 'relative',
      background: 'var(--c-card)',
      borderRadius: 'var(--r-lg)',
      padding: mobile ? '24px 22px' : '28px 28px',
      display: 'flex', flexDirection: 'column',
      gap: mobile ? 10 : 12,
      textDecoration: 'none', color: 'inherit',
      transition: 'transform .2s ease, box-shadow .2s ease'
    }}
    onMouseOver={(e) => {e.currentTarget.style.transform = 'translateY(-2px)';e.currentTarget.style.boxShadow = '0 10px 28px rgba(0,0,0,0.06)';}}
    onMouseOut={(e) => {e.currentTarget.style.transform = 'translateY(0)';e.currentTarget.style.boxShadow = 'none';}}>
      <span style={{
        display: 'inline-flex', alignItems: 'center', gap: 8,
        color: serviceColor,
        fontSize: 'var(--text-micro)', fontWeight: 600, letterSpacing: '0.06em',
        textTransform: 'uppercase'
      }}>
        {Icon[serviceKey] && Icon[serviceKey](16)}
        {serviceLabel}
      </span>
      <p style={{
        margin: 0,
        fontSize: mobile ? 'var(--text-body-mobile)' : 'var(--text-body)',
        color: 'var(--c-muted-foreground)', lineHeight: 1.5
      }}>{desc}</p>
      <span className="gl-btn gl-btn--ghost" style={{ alignSelf: 'flex-start', marginLeft: -16, marginTop: 4 }}>
        Saiba mais {window.GaleonIcon && window.GaleonIcon.arrow(13)}
      </span>
    </a>);

}

window.GaleonExperiencias = Experiencias;

// ─── Hospitalidade (cinematic full-bleed feature) ──────────────────────────
// A single-viewport break section. Photo fills the entire frame, blurred
// and dimmed. Copy lives over the image, left-anchored, editorial typography
// following the design system scale.
function Hospitalidade({ mobile }) {
  const includes = [
  'Receptivo de embarque e desembarque',
  'Fila prioritária no raio-x',
  'Acessos diferenciados',
  'Carrinho elétrico',
  'Suporte na jornada aeroportuária',
  'Serviço de maleiro',
  'Pick-up e drop-off para veículos'];

  return (
    <section id="hospitalidade-feature" style={{
      position: 'relative',
      width: '100%',
      minHeight: '100vh',
      overflow: 'hidden',
      background: 'var(--c-meet-greet)',
      backgroundImage: 'radial-gradient(ellipse 80% 80% at 50% -20%, rgba(120,119,198,0.3), rgba(255,255,255,0))'
    }}>
      {/* Two-column layout: content on the left, image on the right */}
      <div style={{
        position: 'relative',
        display: 'grid',
        gridTemplateColumns: mobile ? '1fr' : '1.3fr 0.85fr',
        gap: mobile ? 32 : 40,
        padding: mobile ? '56px 20px' : '80px 56px',
        boxSizing: 'border-box',
        alignItems: 'center',
        minHeight: '100vh'
      }}>
        {/* Left — content */}
        <div style={{
          display: 'flex', flexDirection: 'column',
          gap: mobile ? 20 : 28,
          maxWidth: mobile ? 'none' : 580,
          color: 'var(--c-meet-greet-foreground)'
        }}>
          <span className="gl-eyebrow" style={{ color: 'var(--c-meet-greet-foreground)' }}>
            Meet & Greet
          </span>

          <h2 style={{
            margin: 0,
            fontSize: mobile ? 'var(--text-h2-mobile)' : 'var(--text-h2)',
            lineHeight: 'var(--text-h2-lh)', letterSpacing: 'var(--text-h2-tracking)',
            fontWeight: 600, color: 'var(--c-meet-greet-foreground)'
          }}>
            Atendimento exclusivo do início ao fim
          </h2>

          <p style={{
            margin: 0,
            fontSize: mobile ? 'var(--text-body-mobile)' : 'var(--text-body)',
            color: 'rgba(255,255,255,0.78)',
            lineHeight: 1.55,
            maxWidth: 560
          }}>
            Acompanhamento personalizado da chegada ao portão — ou do portão ao veículo — com segurança, privacidade e comodidade.
          </p>

          {/* Hairline divider */}
          <span style={{
            display: 'block', width: '100%',
            height: 1, background: 'rgba(255,255,255,0.18)',
            marginTop: mobile ? 4 : 8
          }} />

          <ul style={{
            listStyle: 'none', padding: 0, margin: 0,
            display: 'grid',
            gridTemplateColumns: mobile ? '1fr' : '1fr 1fr',
            gap: mobile ? '10px 0' : '12px 32px'
          }}>
            {includes.map((it) =>
            <li key={it} style={{
              display: 'flex', alignItems: 'center', gap: 12,
              fontSize: mobile ? 'var(--text-body-mobile)' : 'var(--text-body)',
              fontWeight: 500, letterSpacing: '-0.005em',
              color: 'rgba(255,255,255,0.92)',
              lineHeight: 1.4
            }}>
                <span style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                width: 18, height: 18, flexShrink: 0,
                color: 'var(--c-primary)'
              }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12l5 5L20 7" />
                  </svg>
                </span>
                {it}
              </li>
            )}
          </ul>

          <a href="meet-greet.html" className="gl-btn gl-btn--ghost" style={{
            '--btn-fg': 'var(--c-meet-greet-foreground)',
            '--btn-ghost-hover': 'rgba(255,255,255,0.12)',
            alignSelf: 'flex-start', marginLeft: -8, marginTop: mobile ? 4 : 8
          }}>
            Conhecer mais {window.GaleonIcon && window.GaleonIcon.arrow(13)}
          </a>
        </div>

        {/* Right — image */}
        <div style={{
          position: 'relative',
          width: '100%',
          height: mobile ? 320 : 'auto',
          alignSelf: 'stretch',
          borderRadius: 'var(--r-xl)',
          overflow: 'hidden',
          background: 'rgba(255,255,255,0.06)'
        }}>
          <image-slot
            id="gl-hosp-feature-bg"
            shape="rect"
            fit="cover"
            placeholder="foto: atendente da Hospitalidade recebendo passageiro no Galeão"
            style={{
              position: 'absolute', inset: 0,
              width: '100%', height: '100%'
            }}>
          </image-slot>
        </div>
      </div>
    </section>);

}

window.GaleonHospitalidadeFeature = Hospitalidade;

function ProvaSocial({ mobile }) {
  // Stats only — benefit microcopy removed per request. The headline inside
  // the image carries the situational promise; numbers below carry the proof.
  const proof = [
  { stat: '+20 mil', desc: 'pedidos entregues' },
  { stat: '+18 mil', desc: 'reservas online', mobileBreak: true },
  { stat: '4.8', desc: 'nota de satisfação', star: true }];


  return (
    <section id="sobre" className="gl-section" style={{
      background: 'var(--c-background)',
      paddingTop: mobile ? 56 : 80,
      paddingBottom: mobile ? 56 : 80
    }}>
      {/* ─── Compact header — eyebrow + title only ─────────────────── */}
      <div style={{
        display: 'flex', flexDirection: 'column', gap: 14,
        maxWidth: 760, marginBottom: mobile ? 28 : 40
      }}>
        <span className="gl-eyebrow">Sobre o GaleON</span>
        <h2 style={{
          fontSize: mobile ? 'var(--text-h2-mobile)' : 'var(--text-h2)',
          lineHeight: 'var(--text-h2-lh)', letterSpacing: 'var(--text-h2-tracking)'
        }}>
          O RIOgaleão na palma da sua mão.
        </h2>
      </div>

      {/* ─── Cinematic image with one emotional benefit overlay ────── */}
      <div style={{
        position: 'relative',
        width: '100%',
        aspectRatio: mobile ? '1/1' : '21/8',
        borderRadius: 'var(--r-lg)',
        overflow: 'hidden',
        marginBottom: 0, height: "480px"
      }}>
        <image-slot
          id="gl-sobre-momento"
          shape="rounded"
          radius="0"
          placeholder="passageiro tranquilo recebendo atendimento no Galeão"
          style={{ width: '100%', height: "480px" }}>
        </image-slot>
        {/* Bottom-left dark gradient for legibility */}
        <div style={{
          position: 'absolute', inset: 0,
          background: mobile ?
          'linear-gradient(180deg, rgba(0,0,0,0) 35%, rgba(0,0,0,0.72) 100%)' :
          'linear-gradient(100deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.18) 45%, rgba(0,0,0,0) 70%)',
          pointerEvents: 'none'
        }} />
        {/* Overlay copy — anchored bottom-left */}
        <div style={{
          position: 'absolute',
          left: mobile ? 22 : 48,
          right: mobile ? 22 : 'auto',
          bottom: mobile ? 24 : 44,
          maxWidth: mobile ? 'none' : 520,
          display: 'flex', flexDirection: 'column', gap: mobile ? 10 : 14,
          color: 'var(--c-on-media)'
        }}>
          <span style={{
            fontSize: 'var(--text-micro)', fontWeight: 600,
            letterSpacing: '0.08em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.78)'
          }}>Galeão · 2026</span>
          <h3 style={{
            fontSize: mobile ? 'var(--text-h3-mobile)' : 'var(--text-h3)',
            lineHeight: 'var(--text-h3-lh)', letterSpacing: 'var(--text-h3-tracking)',
            fontWeight: 500, color: 'var(--c-on-media)'
          }}>
            Reserve antes, chegue tranquilo.
          </h3>
          <p style={{
            fontSize: mobile ? 'var(--text-body-mobile)' : 'var(--text-body)',
            color: 'rgba(255,255,255,0.82)',
            lineHeight: 1.5, maxWidth: 440
          }}>
            Operado por quem cuida do RIOgaleão há mais de 40 anos. Não é app de terceiro.
          </p>
        </div>
      </div>

      {/* ─── Stats glued to the bottom of the image ─────────────────
                                                                       No dividers, tight top margin. Reads as a single composition:
                                                                       the image is the moment, the numbers are its caption. */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: mobile ? 12 : 32,
        paddingTop: mobile ? 20 : 36
      }}>
        {proof.map((p, i) => {
          return (
            <div key={i} style={{
              display: 'flex', flexDirection: 'column', gap: 6,
              alignItems: 'center',
              textAlign: 'center',
              justifyContent: 'center'
            }}>
              <span style={{
                display: 'inline-flex', alignItems: 'baseline', gap: mobile ? 4 : 8,
                fontSize: mobile ? 'var(--num-stat-mobile)' : 'var(--num-stat)',
                lineHeight: 0.92, letterSpacing: '-0.045em', fontWeight: 600,
                color: 'var(--c-foreground)',
                fontVariantNumeric: 'tabular-nums',
                justifyContent: 'center',
                position: 'relative'
              }}>
                {p.star &&
                <svg
                  width={mobile ? 16 : 36}
                  height={mobile ? 16 : 36}
                  viewBox="0 0 24 24"
                  fill="var(--c-primary)"
                  style={{
                    position: 'absolute',
                    right: '100%',
                    marginRight: mobile ? 6 : 12,
                    top: mobile ? '4px' : '8px',
                    flexShrink: 0
                  }}
                  aria-hidden="true">
                    <path d="M12 2.5l2.95 5.98 6.6.96-4.78 4.66 1.13 6.57L12 17.58l-5.9 3.1 1.13-6.57L2.45 9.44l6.6-.96L12 2.5z" />
                  </svg>
                }
                {p.stat.startsWith('+') ?
                <React.Fragment>
                    <span style={{
                    color: 'var(--c-primary)',
                    position: 'absolute',
                    right: '100%',
                    marginRight: mobile ? 2 : 4,
                    top: 0
                  }}>+</span>
                    {p.stat.slice(1)}
                  </React.Fragment> :
                p.stat
                }
              </span>
              <span style={{
                fontSize: mobile ? 'var(--text-body-mobile)' : 'var(--text-body)', color: 'var(--c-muted-foreground)',
                lineHeight: 1.4, maxWidth: mobile ? 'none' : 280,
                marginTop: mobile ? 2 : 6
              }}>
                {mobile && p.mobileBreak ?
                p.desc.split(' ').map((w, wi) =>
                <React.Fragment key={wi}>
                      {wi > 0 && <br />}
                      {w}
                    </React.Fragment>
                ) :
                p.desc
                }
              </span>
            </div>);
        })}
      </div>
    </section>);

}

// ─── FAQ ────────────────────────────────────────────────────────────────────
// Editorial accordion. Sticky left column with title, accordion on the right.
const FAQ_ITEMS = [
{
  q: 'Quem opera os serviços do GaleON?',
  a: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
},
{
  q: 'Posso cancelar ou alterar uma reserva?',
  a: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
},
{
  q: 'O atendimento é em português?',
  a: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.'
},
{
  q: 'E se o meu voo atrasar ou for cancelado?',
  a: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.'
},
{
  q: 'Como funciona o pagamento dos serviços?',
  a: 'Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur. At vero eos et accusamus et iusto odio.'
},
{
  q: 'Os preços já incluem todas as taxas?',
  a: 'Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus.'
}];


function FAQ({ mobile }) {
  const [openIdx, setOpenIdx] = useStateS(0);
  return (
    <section id="faq" className="gl-section" style={{ background: 'var(--c-background-soft)', padding: "96px 56px 0px", overflow: 'hidden' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: mobile ? '1fr' : '0.9fr 1.3fr',
        gap: mobile ? 32 : 96,
        alignItems: 'start'
      }}>
        <div style={{ position: mobile ? 'static' : 'sticky', top: 120 }}>
          <span className="gl-eyebrow">Dúvidas</span>
          <h2 style={{ fontSize: mobile ? 'var(--text-h2-mobile)' : 'var(--text-h2)', marginTop: 16, lineHeight: 'var(--text-h2-lh)' }}>
            Ainda tem perguntas?
          </h2>
          {!mobile &&
          <p style={{ marginTop: 24, fontSize: 'var(--text-body)', color: 'var(--c-muted-foreground)', lineHeight: 1.5, maxWidth: 320 }}>
              Se a sua dúvida não estiver aqui, fale com a gente pela Central de Atendimento.
            </p>
          }
        </div>
        <div style={{ paddingTop: mobile ? 0 : 36 }}>
          {FAQ_ITEMS.map((item, i) => {
            const isOpen = openIdx === i;
            return (
              <div key={i} style={{
                borderTop: '1px solid var(--c-border)',
                borderBottom: i === FAQ_ITEMS.length - 1 ? '1px solid var(--c-border)' : 'none'
              }}>
                <button
                  onClick={() => setOpenIdx(isOpen ? -1 : i)}
                  style={{
                    width: '100%',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    gap: 24,
                    padding: mobile ? '20px 0' : '26px 0',
                    border: 0, background: 'transparent', cursor: 'pointer',
                    fontFamily: 'inherit', color: 'var(--c-foreground)',
                    textAlign: 'left'
                  }}>
                  
                  <span style={{
                    fontSize: mobile ? 'var(--text-h5-mobile)' : 'var(--text-h5)',
                    fontWeight: 500, letterSpacing: 'var(--text-h5-tracking)', lineHeight: 'var(--text-h5-lh)'
                  }}>{item.q}</span>
                  <span style={{
                    width: 34, height: 34, borderRadius: 17,
                    border: '1px solid ' + (isOpen ? 'var(--c-foreground)' : 'var(--c-border)'),
                    background: isOpen ? 'var(--c-foreground)' : 'transparent',
                    color: isOpen ? 'var(--c-surface-dark-foreground)' : 'var(--c-foreground)',
                    display: 'grid', placeItems: 'center', flexShrink: 0,
                    transition: 'transform .3s ease, background-color .25s ease, border-color .25s ease, color .25s ease',
                    transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)'
                  }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                      <path d="M12 5v14" /><path d="M5 12h14" />
                    </svg>
                  </span>
                </button>
                <div style={{
                  display: 'grid',
                  gridTemplateRows: isOpen ? '1fr' : '0fr',
                  transition: 'grid-template-rows .35s ease'
                }}>
                  <div style={{ overflow: 'hidden' }}>
                    <div style={{
                      paddingBottom: mobile ? 24 : 30,
                      paddingRight: mobile ? 0 : 80,
                      fontSize: mobile ? 'var(--text-body-mobile)' : 'var(--text-body)',
                      color: 'var(--c-muted-foreground)', lineHeight: 1.55,
                      maxWidth: 700
                    }}>{item.a}</div>
                  </div>
                </div>
              </div>);

          })}
        </div>
      </div>
      {/* Wave divider sits flush at the bottom of the section — negative
                                                                              margins cancel the gl-section side padding so the SVG spans edge to
                                                                              edge. Padding-bottom on the section is 0 for the same reason. */}
    </section>);

}

// ─── Jornada (Antes, Durante e Depois) ──────────────────────────────────────
function Jornada({ mobile }) {
  const cols = [
  {
    moment: 'Antes',
    sub: 'de sair de casa',
    items: [
    { tag: 'Meet & Greet', color: 'var(--c-meet-greet)', text: 'Garanta atendimento exclusivo no dia.' },
    { tag: 'Transportes', color: 'var(--c-transportes)', text: 'Reserve táxi ou transfer pro Galeão.' },
    { tag: 'Personal Shopper', color: 'var(--c-personal)', text: 'Encomende o que comprar nas lojas.' }]

  },
  {
    moment: 'Durante',
    sub: 'no aeroporto',
    items: [
    { tag: 'Delivery', color: 'var(--c-delivery)', text: 'Comida e bebida no seu portão.' },
    { tag: 'Sala VIP', color: 'var(--c-sala-vip)', text: 'Embarque com privacidade.' },
    { tag: 'Guarda-volume', color: 'var(--c-guarda)', text: 'Deixe a bagagem em segurança.' }]

  },
  {
    moment: 'Depois',
    sub: 'na chegada',
    items: [
    { tag: 'Câmbio', color: 'var(--c-cambio)', text: 'Troque moeda sem fila.' },
    { tag: 'Transportes', color: 'var(--c-transportes)', text: 'Transfer de saída esperando.' }]

  }];


  return (
    <section id="jornada" className="gl-section">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 900, marginBottom: mobile ? 32 : 56 }}>
        <span className="gl-eyebrow">Antes, durante e depois</span>
        <h2 style={{ fontSize: mobile ? 'var(--text-h2-mobile)' : 'var(--text-h2)' }}>
          Alguém do Galeão em cada parte da viagem.
        </h2>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: mobile ? '1fr' : 'repeat(3, 1fr)',
        gap: mobile ? 24 : 4,
        position: 'relative'
      }}>
        {cols.map((c, i) =>
        <div key={i} style={{
          padding: mobile ? '24px 0 0' : '24px 28px',
          borderLeft: !mobile && i > 0 ? '1px solid var(--c-border)' : 'none',
          borderTop: mobile && i > 0 ? '1px solid var(--c-border)' : 'none',
          paddingTop: mobile && i > 0 ? 28 : mobile ? 0 : 24,
          display: 'flex', flexDirection: 'column', gap: 24
        }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
              <span style={{
              fontSize: 'var(--text-small)', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase',
              display: 'inline-flex', alignItems: 'center', gap: 8
            }}>
                <span style={{ display: 'inline-grid', placeItems: 'center', width: 22, height: 22, borderRadius: 999, background: 'var(--c-foreground)', color: 'var(--c-surface-dark-foreground)', fontSize: 'var(--text-micro)' }}>0{i + 1}</span>
                {c.moment}
              </span>
              <span style={{ fontSize: 'var(--text-small)', color: 'var(--c-muted-foreground)' }}>{c.sub}</span>
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 18 }}>
              {c.items.map((it, j) =>
            <li key={j} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <span style={{
                fontSize: 'var(--text-micro)', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase',
                color: it.color, display: 'inline-flex', alignItems: 'center', gap: 6
              }}>
                    <span style={{ width: 6, height: 6, borderRadius: 3, background: it.color }} />
                    {it.tag}
                  </span>
                  <span style={{ fontSize: mobile ? 'var(--text-subtitle-mobile)' : 'var(--text-subtitle)', fontWeight: 500, letterSpacing: '-0.01em', lineHeight: 1.3 }}>
                    {it.text}
                  </span>
                </li>
            )}
            </ul>
          </div>
        )}
      </div>
    </section>);

}

// ─── Final CTA + Footer ─────────────────────────────────────────────────────
function FinalCTA({ mobile }) {
  return (
    <section className="gl-section" style={{ paddingTop: mobile ? 32 : 56, paddingBottom: mobile ? 64 : 120 }}>
      <div style={{
        borderRadius: 'var(--r-xl)',
        background: 'var(--c-primary)',
        padding: mobile ? '40px 28px' : '80px 64px',
        display: 'flex', flexDirection: mobile ? 'column' : 'row',
        gap: 32, alignItems: mobile ? 'stretch' : 'center', justifyContent: 'space-between'
      }}>
        <h3 style={{ fontSize: mobile ? 'var(--text-h2-mobile)' : 'var(--text-h2)', color: 'var(--c-primary-foreground)', maxWidth: 720 }}>
          O próximo voo é por nossa conta.
        </h3>
        <div style={{ display: 'flex', flexDirection: mobile ? 'column' : 'row', gap: 10 }}>
          <button className="gl-btn gl-btn--dark">Garanta sua Hospitalidade {window.GaleonIcon.arrow(14)}</button>
          <button className="gl-btn gl-btn--outline">
            Peça no portão agora
          </button>
        </div>
      </div>
    </section>);

}

function Footer({ mobile }) {
  return (
    <footer style={{
      borderTop: '1px solid var(--c-border)',
      padding: mobile ? '40px 20px 32px' : '64px 56px 40px',
      display: 'flex', flexDirection: 'column', gap: 40
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: mobile ? '1fr' : '1fr auto auto auto',
        gap: mobile ? 32 : '24px 56px',
        alignItems: 'stretch'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18, maxWidth: 360 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <image-slot
              id="gl-logo"
              shape="rect"
              fit="contain"
              position="0% 50%"
              placeholder="logo GaleON (PNG)"
              style={{
                width: 208, height: 52, display: 'block',
                background: 'transparent',
                ['--imgslot-frame-bg']: 'transparent'
              }}>
            </image-slot>
          </div>
          {window.GaleonAwardBadge &&
          <div style={{ marginTop: 'auto' }}>
              <window.GaleonAwardBadge
              subtitle="TRAVEL COMMERCE 2024"
              title="Innovation of the Year"
              link="#" />
            </div>
          }
        </div>
        {[
        { h: 'Serviços', l: ['Meet & Greet', 'Delivery', 'Sala VIP', 'Transportes', 'Guarda-volume', 'Câmbio', 'Personal Shopper'] },
        { h: 'GaleON', l: ['Como funciona', 'Para empresas', 'Para parceiros', 'Imprensa'] },
        { h: 'Ajuda', l: ['Central de atendimento', 'Status do pedido', 'Termos', 'Privacidade'] }].
        map((c, i) =>
        <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <h4 style={{ fontSize: 'var(--text-micro)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--c-muted-foreground)' }}>{c.h}</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {c.l.map((x) => <li key={x}><a href="#" style={{ fontSize: 'var(--text-small)' }}>{x}</a></li>)}
            </ul>
          </div>
        )}
      </div>
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        paddingTop: 24, borderTop: '1px solid var(--c-border)',
        fontSize: 'var(--text-small)', color: 'var(--c-muted-foreground)', flexWrap: 'wrap', gap: 12
      }}>
        <span>© 2026 GaleON · RIOgaleão</span>
        <img src="uploads/desenvolvido-pelo-strelo.webp" alt="Desenvolvido pelo Strelo" style={{ height: 20 }} />
      </div>
    </footer>);

}

// ─── Page assembly ──────────────────────────────────────────────────────────
function HomePage({ width, density }) {
  const mobile = width <= 480;
  const [activeKey, setActiveKey] = useStateS('hospitalidade');
  const [isDragging, setIsDragging] = useStateS(false);
  // Pause auto-rotate while user is dragging a file onto an image slot, so the
  // hero doesn't switch mid-drop.
  useEffectS(() => {
    let depth = 0;
    const hasFiles = (e) => {
      const types = e.dataTransfer && e.dataTransfer.types;
      if (!types) return false;
      for (let i = 0; i < types.length; i++) if (types[i] === 'Files') return true;
      return false;
    };
    const onEnter = (e) => {if (hasFiles(e)) {depth++;setIsDragging(true);document.body.classList.add('gl-is-dragging');}};
    const onLeave = (e) => {if (hasFiles(e)) {depth = Math.max(0, depth - 1);if (depth === 0) {setIsDragging(false);document.body.classList.remove('gl-is-dragging');}}};
    const onEnd = () => {depth = 0;setIsDragging(false);document.body.classList.remove('gl-is-dragging');};
    window.addEventListener('dragenter', onEnter);
    window.addEventListener('dragleave', onLeave);
    window.addEventListener('drop', onEnd);
    window.addEventListener('dragend', onEnd);
    return () => {
      window.removeEventListener('dragenter', onEnter);
      window.removeEventListener('dragleave', onLeave);
      window.removeEventListener('drop', onEnd);
      window.removeEventListener('dragend', onEnd);
    };
  }, []);
  // Auto-rotate: every 4.5s advance to the next service. The effect re-arms
  // on every activeKey change so a manual click resets the countdown.
  useEffectS(() => {
    if (isDragging) return undefined;
    const services = (window.GaleonServices || []).filter((s) => s.inHero);
    const reduceMotion = typeof matchMedia === 'function' &&
    matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion || services.length === 0) return undefined;
    const t = setTimeout(() => {
      const idx = services.findIndex((s) => s.key === activeKey);
      const next = services[(idx + 1) % services.length].key;
      setActiveKey(next);
    }, 4500);
    return () => clearTimeout(t);
  }, [activeKey, isDragging]);
  return (
    <div className="galeao" data-vp={mobile ? 'mobile' : 'desktop'}>
      <window.GaleonHeader mobile={mobile} />
      <window.GaleonHero mobile={mobile} active={activeKey} onSelect={setActiveKey} />
      <ParceirosStrip mobile={mobile} />
      <ProvaSocial mobile={mobile} />
      <Hospitalidade mobile={mobile} />
      <Experiencias mobile={mobile} />
      <Vitrine mobile={mobile} />
      <FAQ mobile={mobile} />
      <Footer mobile={mobile} />
      {/* <window.GaleonViagem mobile={mobile} /> */}
    </div>);

}

window.GaleonHomePage = HomePage;