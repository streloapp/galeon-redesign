// Meet & Greet — seção dedicada a "Delegações Esportivas", logo abaixo de
// "Atendimentos sob medida". Tratamento "Hero": cartão arredondado inset com
// imagem de fundo, texto centralizado e CTA (mesma linguagem do MGHero da
// página). O conteúdo vem do serviço cadastrado em MG_SERVICES (key: 'delegacoes').

// Escudos de times brasileiros para a esteira de delegações já atendidas
// (conteúdo de demonstração). Servidos pela CDN pública da ESPN — PNG com fundo
// transparente. Para produção, validar uso/autorização das marcas.
const MG_DELEG_LOGOS = [
  { name: 'CBF — Seleção Brasileira', src: 'assets/cbf.svg' },
  { name: 'Flamengo',       src: 'https://a.espncdn.com/i/teamlogos/soccer/500/819.png' },
  { name: 'Palmeiras',      src: 'https://a.espncdn.com/i/teamlogos/soccer/500/2029.png' },
  { name: 'Corinthians',    src: 'https://a.espncdn.com/i/teamlogos/soccer/500/874.png' },
  { name: 'São Paulo',      src: 'https://a.espncdn.com/i/teamlogos/soccer/500/2026.png' },
  { name: 'Santos',         src: 'https://a.espncdn.com/i/teamlogos/soccer/500/2674.png' },
  { name: 'Grêmio',         src: 'https://a.espncdn.com/i/teamlogos/soccer/500/6273.png' },
  { name: 'Internacional',  src: 'https://a.espncdn.com/i/teamlogos/soccer/500/1936.png' },
  { name: 'Fluminense',     src: 'https://a.espncdn.com/i/teamlogos/soccer/500/3445.png' },
  { name: 'Botafogo',       src: 'https://a.espncdn.com/i/teamlogos/soccer/500/6086.png' },
  { name: 'Vasco da Gama',  src: 'https://a.espncdn.com/i/teamlogos/soccer/500/3454.png' },
  { name: 'Atlético-MG',    src: 'https://a.espncdn.com/i/teamlogos/soccer/500/7632.png' },
  { name: 'Cruzeiro',       src: 'https://a.espncdn.com/i/teamlogos/soccer/500/2022.png' }
];

function MGDelegacoesSection({ mobile }) {
  const Icon = window.MGIcon;
  const s = (window.MG_SERVICES || []).find((x) => x.key === 'delegacoes');
  if (!s) return null;

  // Nota: o `mg-reveal` fica num wrapper externo ESTÁVEL — se ficasse na própria
  // <section>, qualquer reescrita do className apagaria o `is-in` (adicionado por
  // JS), deixando a seção invisível.
  return (
    <div className="mg-reveal">
      <section id="delegacoes-esportivas" className="mg-deleg mg-deleg--herostyle">
        <div className="mg-deleg-hero__card">
          <image-slot id={s.slot} shape="rect" fit="cover" src="assets/delegacoes-bg.png" placeholder={`foto: ${s.photo}`}></image-slot>
          <div className="mg-deleg-hero__scrim" />
          <div className="mg-deleg-hero__body">
            <span className="gl-eyebrow" style={{ color: 'rgba(255,255,255,0.72)' }}>Delegações esportivas</span>
            <h2>{s.name}</h2>
            <p>{s.lead}</p>
            <div className="mg-price-line mg-deleg-hero__price">
              <span className="mg-deleg-hero__price-label">A partir de</span>
              <span><b>{s.price.value}</b> {s.price.unit}</span>
            </div>
            <button className="gl-btn gl-btn--secondary">
              {s.cta} {Icon.arrow(13)}
            </button>
          </div>
        </div>

        {/* Esteira contínua de logos das delegações já atendidas — FORA do
            card, logo abaixo dele (coladas, para lerem como uma unidade).
            Mesma mecânica da home (ParceirosStrip): .gl-marquee-track + lista
            DUPLICADA para o loop emendar sem corte. Grayscale por padrão,
            ganham cor ao passar o mouse (regra no CSS). */}
        <div className="mg-deleg-hero__logos">
          <div className="mg-deleg-hero__marquee">
            <div className="gl-marquee-track" style={{ gap: mobile ? 'var(--space-40)' : 'var(--space-64)', alignItems: 'center' }}>
              {MG_DELEG_LOGOS.concat(MG_DELEG_LOGOS).map((l, i) =>
                <img key={i} src={l.src} alt={l.name} title={l.name} loading="lazy"
                  style={{ height: mobile ? 38 : 48, width: 'auto', flexShrink: 0 }} />
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

Object.assign(window, { MGDelegacoesSection });
