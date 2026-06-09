// Meet & Greet — Confiança (trust) + FAQ + Footer.
// Logic: felt the care (hero) → saw the proof (credential + stats) →
// objections answered (FAQ) → confident. FAQ content adapted from the live
// RIOgaleão FAQ, reframed for Meet & Greet.

const { useState: useStateT } = React;

const MG_STATS = [
{ stat: '+08', desc: 'anos de experiência' },
{ stat: '+15 mil', desc: 'atendimentos' },
{ stat: '4.9', desc: 'nota de satisfação', star: true }];


const MG_FAQ = [
{ q: 'O que é o Meet & Greet?',
  a: 'É o acompanhamento personalizado de um anfitrião pelo aeroporto — da chegada ao portão, ou do portão ao veículo. Você ganha segurança, privacidade e agilidade, com apoio no check-in e na bagagem, acessos diferenciados e condução até onde precisar.' },
{ q: 'E se o meu voo atrasar?',
  a: 'Em atrasos de até 90 minutos, mantemos seu atendimento normalmente. Acima disso, a prestação fica sujeita à disponibilidade da equipe no novo horário — e nossa central acompanha seu voo em tempo real para se reorganizar com você.' },
{ q: 'Não encontrei meu agente no aeroporto. O que faço?',
  a: 'Dirija-se ao balcão de informações no 2º piso, próximo ao check-in C e ao embarque doméstico — eles direcionam você ao seu agente. No desembarque ou em outro ponto, ligue para a central 24h: +55 21 99793-4907.' },
{ q: 'Posso remarcar ou cancelar a reserva?',
  a: 'Sim. Remarcações devem ser pedidas à equipe pelo e-mail cerimonial@riogaleao.com. Para pedidos com menos de 24h úteis de antecedência, aplica-se uma taxa de 25% e a disponibilidade é confirmada no momento.' },
{ q: 'Posso reservar para outra pessoa?',
  a: 'Pode. Se for empresa, informe seus dados de contato e o nome de quem será recebido. Caso contrário, basta inserir o contato da pessoa que deve receber as instruções do atendimento.' },
{ q: 'Em quais idiomas o atendimento é feito?',
  a: 'Português, inglês, espanhol e francês.' },
{ q: 'Crianças podem usar o serviço?',
  a: 'Sim, desde que acompanhadas por um responsável legal. O valor adicional varia conforme o serviço escolhido.' }];


// Three objections surfaced as quick reassurance, ahead of the full FAQ.
const MG_OBJECTIONS = [
{ icon: 'globe', t: 'Voo atrasou?', d: 'Acompanhamos seu voo em tempo real e nos reorganizamos com você.' },
{ icon: 'receptivo', t: 'Onde encontro meu agente?', d: 'Ponto de encontro definido + central 24h para te localizar.' },
{ icon: 'check', t: 'Mudou o plano?', d: 'Remarcação simples pela equipe de cerimonial.' }];


function MGTrust({ mobile }) {
  const [open, setOpen] = useStateT(0);
  return (
    <>
    <section id="confianca" className="mg-zone" style={{ paddingTop: mobile ? 64 : 104 }}>
      <div className="mg-zone-head" style={{ marginBottom: mobile ? 28 : 44 }}>
        <span className="gl-eyebrow" style={{ color: 'var(--c-mg)' }}>Por que o GaleON</span>
        <h2 style={{ fontSize: mobile ? 'var(--text-h2-mobile)' : 'var(--text-h2)', letterSpacing: 'var(--text-h2-tracking)', lineHeight: 'var(--text-h2-lh)' }}>
          Quem cuida de você já cuidou de milhares.
        </h2>

      </div>

      {/* Cinematic credential + stats glued below */}
      <div style={{
          position: 'relative', width: '100%',
          aspectRatio: mobile ? '4/5' : '21/8',
          borderRadius: 'var(--r-lg)', overflow: 'hidden'
        }}>
        <image-slot id="mg-trust-photo" shape="rect" fit="cover"
          placeholder="foto real: anfitrião do Meet & Greet recebendo passageiro no RIOgaleão"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}></image-slot>
        <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: mobile ?
            'linear-gradient(180deg, rgba(21,17,13,0) 40%, rgba(21,17,13,0.78) 100%)' :
            'linear-gradient(100deg, rgba(21,17,13,0.6) 0%, rgba(21,17,13,0.15) 45%, rgba(21,17,13,0) 70%)'
          }} />
        <div style={{
            position: 'absolute', left: mobile ? 22 : 48, bottom: mobile ? 24 : 44,
            right: mobile ? 22 : 'auto', maxWidth: mobile ? 'none' : 520,
            display: 'flex', flexDirection: 'column', gap: mobile ? 10 : 14, color: '#fff'
          }}>
          <span style={{ fontSize: 'var(--text-micro)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.78)' }}>PRIVACIDADE • EXCLUSIVIDADE • CONFORTO • CUIDADO

            </span>
          <h3 style={{ fontSize: mobile ? 'var(--text-h4-mobile)' : 'var(--text-h4)', lineHeight: 'var(--text-h4-lh)', letterSpacing: 'var(--text-h4-tracking)', fontWeight: 600, color: '#fff' }}>Seja na chegada, na partida ou em conexão, sua viagem é gerenciada do início ao fim com total discrição.

</h3>
        </div>
      </div>

      {/* Stats — mesmo tratamento da home (ProvaSocial): 3 colunas lado a
          lado em qualquer viewport, "+"/estrela em verde posicionados à
          esquerda do número, e os mesmos tamanhos de fonte. */}
      <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
          gap: mobile ? 12 : 32, paddingTop: mobile ? 20 : 36
        }}>
        {MG_STATS.map((p, i) =>
          <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'center', textAlign: 'center', justifyContent: 'center' }}>
            <span className="mg-stat" style={{
                display: 'inline-flex', alignItems: 'baseline', gap: mobile ? 4 : 8,
                fontSize: mobile ? 'var(--num-stat-mobile)' : 'var(--num-stat)', lineHeight: 0.92, letterSpacing: '-0.045em',
                fontWeight: 600, color: 'var(--c-fg)', fontVariantNumeric: 'tabular-nums',
                justifyContent: 'center', position: 'relative'
              }}>
              {p.star &&
                <svg width={mobile ? 16 : 36} height={mobile ? 16 : 36} viewBox="0 0 24 24"
                  fill="var(--c-mg)" aria-hidden="true"
                  style={{ position: 'absolute', right: '100%', marginRight: mobile ? 6 : 12, top: mobile ? '4px' : '8px', flexShrink: 0 }}>
                  <path d="M12 2.5l2.95 5.98 6.6.96-4.78 4.66 1.13 6.57L12 17.58l-5.9 3.1 1.13-6.57L2.45 9.44l6.6-.96L12 2.5z" />
                </svg>}
              {p.stat.startsWith('+') ?
                <React.Fragment>
                  <span style={{ color: 'var(--c-mg)', position: 'absolute', right: '100%', marginRight: mobile ? 2 : 4, top: 0 }}>+</span>
                  {p.stat.slice(1)}
                </React.Fragment> :
                p.stat}
            </span>
            <span style={{ fontSize: mobile ? 'var(--text-body-mobile)' : 'var(--text-body)', color: 'var(--c-muted)', lineHeight: 1.4, maxWidth: mobile ? 'none' : 280, marginTop: mobile ? 2 : 6 }}>{p.desc}</span>
          </div>
          )}
      </div>
    </section>

    {/* FAQ — gray band (same soft gray as the Home "Serviços" section) */}
    <section id="faq" className="mg-zone mg-faq-band">
      <div style={{
          display: 'grid', gridTemplateColumns: mobile ? '1fr' : '0.9fr 1.3fr',
          gap: mobile ? 36 : 80, alignItems: 'start'
        }}>
        <div style={{ position: mobile ? 'static' : 'sticky', top: 90, display: 'flex', flexDirection: 'column', gap: 22 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <span className="gl-eyebrow">Antes de você perguntar</span>
            <h3 style={{ fontSize: mobile ? 'var(--text-h2-mobile)' : 'var(--text-h2)', letterSpacing: 'var(--text-h2-tracking)', lineHeight: 'var(--text-h2-lh)' }}>
              Sem surpresas no dia.
            </h3>
          </div>
        </div>

        <div>
          {MG_FAQ.map((item, i) => {
              const isOpen = open === i;
              return (
                <div key={i} className="mg-faq-item" style={{ borderBottom: i === MG_FAQ.length - 1 ? '1px solid var(--c-border)' : 'none' }}>
                <button className="mg-faq-q" onClick={() => setOpen(isOpen ? -1 : i)}>
                  <span style={{ fontSize: mobile ? 'var(--text-h5-mobile)' : 'var(--text-h5)', fontWeight: 500, letterSpacing: 'var(--text-h5-tracking)', lineHeight: 1.3 }}>{item.q}</span>
                  <span className="mg-faq-icon" style={{
                      border: '1px solid ' + (isOpen ? 'var(--c-mg)' : 'var(--c-border)'),
                      background: isOpen ? 'var(--c-mg)' : 'transparent',
                      color: isOpen ? '#fff' : 'var(--c-fg)',
                      transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)'
                    }}>
                    {window.MGIcon.plus(14)}
                  </span>
                </button>
                <div style={{ display: 'grid', gridTemplateRows: isOpen ? '1fr' : '0fr', transition: 'grid-template-rows .35s ease' }}>
                  <div style={{ overflow: 'hidden' }}>
                    <div style={{ paddingBottom: mobile ? 22 : 28, paddingRight: mobile ? 0 : 70, fontSize: mobile ? 'var(--text-body-mobile)' : 'var(--text-body)', color: 'var(--c-muted)', lineHeight: 1.6, maxWidth: 720 }}>
                      {item.a}
                    </div>
                  </div>
                </div>
              </div>);

            })}
        </div>
      </div>
    </section>
    </>);

}

function MGFooter({ mobile }) {
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
        { h: 'Serviços', l: ['Hospitalidade', 'Delivery', 'Sala VIP', 'Transportes', 'Guarda-volume', 'Câmbio', 'Personal Shopper'] },
        { h: 'GaleON', l: ['Como funciona', 'Para empresas', 'Para parceiros', 'Imprensa'] },
        { h: 'Ajuda', l: ['Central de atendimento', 'Status do pedido', 'Termos', 'Privacidade'] }].
        map((c, i) =>
        <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <h4 style={{ fontSize: 'var(--text-micro)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--c-muted)' }}>{c.h}</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {c.l.map((x) => <li key={x}><a href="#" style={{ fontSize: 'var(--text-small)' }}>{x}</a></li>)}
            </ul>
          </div>
        )}
      </div>
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        paddingTop: 24, borderTop: '1px solid var(--c-border)',
        fontSize: 'var(--text-small)', color: 'var(--c-muted)', flexWrap: 'wrap', gap: 12
      }}>
        <span>© 2026 GaleON · RIOgaleão</span>
        <span>Aeroporto Internacional do Rio de Janeiro — Tom Jobim</span>
      </div>
    </footer>);

}

Object.assign(window, { MGTrust, MGFooter });