// Meet & Greet — data layer: icons + service catalogue (fictitious copy/prices,
// flagged as draft in the UI). Names & sale-form are fixed per the brief.

// ─── Icons (universal) ──────────────────────────────────────────────────────
const MGIcon = {
  arrow: (s = 16) =>
    <svg className="gl-arrow" width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m13 5 7 7-7 7"/></svg>,
  check: (s = 16) =>
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5L20 7"/></svg>,
  plus: (s = 16) =>
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M12 5v14"/><path d="M5 12h14"/></svg>,
  chevron: (s = 14) =>
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>,
  play: (s = 13) =>
    <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>,
  star: (s = 16) =>
    <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor"><path d="m12 2 2.9 6.5 7.1.7-5.4 4.8 1.6 7L12 17.3 5.8 21l1.6-7L2 9.2l7.1-.7L12 2z"/></svg>,
  globe: (s = 16) =>
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18z"/></svg>
};

// ─── Feature glyphs (the "inclusos") — line, 24px viewBox, stroke 1.6 ───────
const sv = (s, w = 1.6) => ({ width: s, height: s, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: w, strokeLinecap: 'round', strokeLinejoin: 'round' });
const MGFeat = {
  receptivo: (s = 18) => <svg {...sv(s)}><path d="M4 18h16"/><path d="M5 18a7 7 0 0 1 14 0"/><path d="M12 8V6"/><path d="M10 4h4"/></svg>,
  suporte:   (s = 18) => <svg {...sv(s)}><path d="M4 13a8 8 0 0 1 16 0"/><path d="M4 13v3a2 2 0 0 0 2 2h1v-6H6a2 2 0 0 0-2 2z"/><path d="M20 13v3a2 2 0 0 1-2 2h-1v-6h1a2 2 0 0 1 2 1z"/></svg>,
  carrinho:  (s = 18) => <svg {...sv(s)}><path d="M3 7h11v8H3z"/><path d="M14 10h4l3 3v2h-7z"/><circle cx="7" cy="18" r="1.6"/><circle cx="17" cy="18" r="1.6"/></svg>,
  acessos:   (s = 18) => <svg {...sv(s)}><circle cx="9" cy="9" r="4"/><path d="m13 13 7 7"/><path d="m17 17 1.5 1.5"/><path d="M20 14l-3 3"/></svg>,
  maleiro:   (s = 18) => <svg {...sv(s)}><rect x="6" y="8" width="12" height="11" rx="2"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/><path d="M9 19v1"/><path d="M15 19v1"/></svg>,
  prioridade:(s = 18) => <svg {...sv(s)}><path d="M13 3 4 14h6l-1 7 9-11h-6z"/></svg>,
  vip:       (s = 18) => <svg {...sv(s)}><path d="M4 14v-3a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3"/><path d="M3 14a2 2 0 0 1 2 2v2h14v-2a2 2 0 0 1 2-2"/><path d="M7 14V11"/><path d="M17 14V11"/></svg>,
  conexao:   (s = 18) => <svg {...sv(s)}><path d="M4 8h13l-3-3"/><path d="M20 16H7l3 3"/></svg>,
  porta:     (s = 18) => <svg {...sv(s)}><path d="M5 21V5a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v16"/><path d="M3 21h16"/><circle cx="13" cy="12" r="1" fill="currentColor"/></svg>,
  grupo:     (s = 18) => <svg {...sv(s)}><circle cx="9" cy="8" r="3"/><path d="M3 19a6 6 0 0 1 12 0"/><path d="M16 6a3 3 0 0 1 0 6"/><path d="M18 19a6 6 0 0 0-3-5"/></svg>,
  jato:      (s = 18) => <svg {...sv(s)}><path d="M3 15l7-1 4-7a2 2 0 0 1 3 1l-2 6 4 1v2l-5 .5L13 21h-2l1-4-3 .3L7 19H5l1-3-3-.5z"/></svg>,
  espaco:    (s = 18) => <svg {...sv(s)}><path d="M3 21V8l9-5 9 5v13"/><path d="M3 21h18"/><path d="M9 21v-6h6v6"/></svg>,
  trofeu:    (s = 18) => <svg {...sv(s)}><path d="M7 4h10v4a5 5 0 0 1-10 0z"/><path d="M7 6H4v1a3 3 0 0 0 3 3"/><path d="M17 6h3v1a3 3 0 0 1-3 3"/><path d="M10 13.5V17h4v-3.5"/><path d="M8 20h8"/></svg>,
  cerimonial:(s = 18) => <svg {...sv(s)}><path d="M12 3v18"/><path d="M5 8l7-3 7 3"/><path d="M5 8v3a3 3 0 0 0 6 0"/><path d="M13 11a3 3 0 0 0 6 0V8"/></svg>,
  seguranca: (s = 18) => <svg {...sv(s)}><path d="M12 3 5 6v5c0 4 3 7 7 9 4-2 7-5 7-9V6z"/><path d="M9 12l2 2 4-4"/></svg>,
  bagagem:   (s = 18) => <svg {...sv(s)}><rect x="5" y="7" width="9" height="13" rx="2"/><path d="M8 7V5h3v2"/><path d="M16 9h3v9a2 2 0 0 1-2 2h-3"/></svg>
};

// ─── Services ───────────────────────────────────────────────────────────────
// zone: 'familia' (B2C) | 'empresas' (B2B). hero: gets cinematic visual weight.
const MG_SERVICES = [
  // ── Para você e sua família ────────────────────────────────────────────
  {
    key: 'fast-track', zone: 'familia', role: 'split', tag: 'Agilidade',
    name: 'Fast Track',
    lead: 'Você atravessa o aeroporto pelos acessos prioritários — enquanto a fila acontece do outro lado.',
    occasion: 'voo apertado, conexão curta, ou quando cada minuto conta.',
    includes: [
      { icon: 'receptivo', label: 'Receptivo no embarque' },
      { icon: 'prioridade', label: 'Fila prioritária na inspeção' },
      { icon: 'acessos', label: 'Acessos diferenciados' },
      { icon: 'suporte', label: 'Suporte na jornada' }
    ],
    prices: [
      { tier: 'para doméstico', value: 'R$ 799' },
      { tier: 'para internacional', value: 'R$ 999' }
    ],
    priceUnit: 'Preço por pessoa',
    cta: 'Reservar',
    slot: 'mg-fasttrack', photo: 'passageiro passando pelo acesso prioritário do RIOgaleão',
    gallery: [
      { slot: 'mg-fasttrack', photo: 'passageiro passando pelo acesso prioritário do RIOgaleão' },
      { slot: 'mg-fasttrack-2', photo: 'anfitrião recebendo o passageiro no balcão de embarque' },
      { slot: 'mg-fasttrack-3', photo: 'fila prioritária na inspeção de segurança' }
    ]
  },
  {
    key: 'vip', zone: 'familia', role: 'vertical', tag: 'Conforto',
    name: 'Experiência VIP',
    lead: 'Um anfitrião recebe você na porta, cuida das malas e conduz sem pressa até a sala VIP.',
    occasion: 'você quer transformar a espera em descanso.',
    includes: [
      { icon: 'receptivo', label: 'Receptivo no embarque' },
      { icon: 'maleiro', label: 'Serviço de maleiro' },
      { icon: 'acessos', label: 'Acessos diferenciados' },
      { icon: 'vip', label: 'Acesso à sala VIP' }
    ],
    prices: [
      { tier: 'para doméstico', value: 'R$ 1.099' },
      { tier: 'para internacional', value: 'R$ 1.349' }
    ],
    priceUnit: 'Preço por pessoa',
    cta: 'Reservar',
    slot: 'mg-vip', photo: 'sala VIP com poltrona e vista para a pista',
    gallery: [
      { slot: 'mg-vip', photo: 'sala VIP com poltrona e vista para a pista' },
      { slot: 'mg-vip-2', photo: 'anfitrião cuidando das malas na recepção' },
      { slot: 'mg-vip-3', photo: 'estar e buffet da sala VIP' }
    ]
  },
  {
    key: 'vip-plus', zone: 'familia', hero: true, role: 'flagship', tag: 'Ponta a ponta',
    name: 'Experiência VIP Plus',
    lead: 'Da porta do carro à poltrona do avião, um anfitrião conduz cada passo — com carrinho elétrico, maleiro e sala VIP.',
    occasion: 'a ocasião pede o mais completo: uma viagem especial ou simplesmente o melhor.',
    includes: [
      { icon: 'receptivo', label: 'Receptivo de embarque e desembarque' },
      { icon: 'carrinho', label: 'Carrinho elétrico (trecho internacional)' },
      { icon: 'porta', label: 'Condução exclusiva porta a porta' },
      { icon: 'maleiro', label: 'Serviço de maleiro' },
      { icon: 'vip', label: 'Acesso à sala VIP' },
      { icon: 'suporte', label: 'Suporte dedicado na jornada' }
    ],
    prices: [
      { tier: 'para doméstico', value: 'R$ 1.199' },
      { tier: 'para internacional', value: 'R$ 1.499' }
    ],
    priceUnit: 'Preço por pessoa',
    cta: 'Reservar',
    slot: 'mg-vipplus', photo: 'anfitrião conduzindo passageiro em carrinho elétrico pelo terminal',
    gallery: [
      { slot: 'mg-vipplus', photo: 'anfitrião conduzindo passageiro em carrinho elétrico pelo terminal' },
      { slot: 'mg-vipplus-2', photo: 'recepção na porta do carro com maleiro' },
      { slot: 'mg-vipplus-3', photo: 'passageiro acomodado na sala VIP antes do voo' }
    ]
  },
  {
    key: 'conexoes', zone: 'familia', role: 'split', tag: 'Conexão',
    name: 'Atendimento para Conexões',
    lead: 'Entre um voo e outro, um anfitrião encontra o passageiro na ponte e garante a chegada ao próximo portão com calma.',
    occasion: 'há conexão e não dá para correr pelo terminal.',
    includes: [
      { icon: 'receptivo', label: 'Receptivo na chegada do 1º voo' },
      { icon: 'conexao', label: 'Condução entre portões' },
      { icon: 'prioridade', label: 'Fila prioritária' },
      { icon: 'suporte', label: 'Suporte na jornada' }
    ],
    prices: [
      { tier: 'por pessoa', value: 'R$ 899' }
    ],
    cta: 'Reservar',
    slot: 'mg-conexoes', photo: 'passageiro sendo conduzido entre portões de conexão'
  },

  // ── Para grupos e empresas ──────────────────────────────────────────────
  {
    key: 'aviacao', zone: 'empresas', role: 'vertical', tag: 'Aviação executiva',
    name: 'Aviação executiva',
    lead: 'Atendimento dedicado para a aviação privada. Discrição, agilidade e privacidade do desembarque ao hangar.',
    occasion: 'você opera ou viaja em aviação executiva.',
    includes: [
      { icon: 'jato', label: 'Receptivo no terminal executivo' },
      { icon: 'seguranca', label: 'Migração e alfândega assistidas' },
      { icon: 'porta', label: 'Condução privativa' },
      { icon: 'cerimonial', label: 'Coordenação com a tripulação' }
    ],
    price: { value: 'R$ 8.000', unit: '/ atendimento' },
    cta: 'Saber mais',
    slot: 'mg-aviacao', photo: 'jato executivo no pátio com atendente recebendo'
  },
  {
    key: 'grupos', zone: 'empresas', role: 'split', tag: 'Grupos',
    name: 'Atendimento para grupos',
    lead: 'Recepção coordenada para grupos de viajantes: fluxo organizado, acessos ágeis e acompanhamento dedicado do desembarque à saída do terminal.',
    occasion: 'um grupo viaja junto e precisa de logística sob medida.',
    includes: [
      { icon: 'cerimonial', label: 'Coordenação dedicada ao grupo' },
      { icon: 'receptivo', label: 'Receptivo de chegada e/ou partida' },
      { icon: 'prioridade', label: 'Acessos e fluxos prioritários' },
      { icon: 'bagagem', label: 'Apoio com bagagem do grupo' }
    ],
    price: { value: 'R$ 6.999', unit: '/ 10 pessoas' },
    cta: 'Saber mais',
    slot: 'mg-grupos', photo: 'grupo de viajantes recebido por equipe no terminal'
  },
  {
    key: 'exclusive', zone: 'empresas', role: 'split', tag: 'Eventos',
    name: 'Espaço Riogaleão Exclusive',
    lead: 'Locação de um ambiente privativo dentro do terminal para receber convidados, fechar negócios ou celebrar uma chegada.',
    occasion: 'a ocasião pede privacidade total e um espaço à altura.',
    includes: [
      { icon: 'espaco', label: 'Espaço privativo exclusivo' },
      { icon: 'cerimonial', label: 'Equipe de cerimonial' },
      { icon: 'vip', label: 'Catering sob demanda' },
      { icon: 'acessos', label: 'Acessos diferenciados' }
    ],
    price: { value: 'R$ 8.900', unit: '/ evento' },
    cta: 'Saber mais',
    slot: 'mg-exclusive', photo: 'salão exclusivo privativo do RIOgaleão preparado para evento'
  },
  // Delegações esportivas: NÃO entra na grade de "Atendimentos sob medida"
  // (zone próprio, fora de MG_ZONES). Renderizado só como Hero por
  // MGDelegacoesSection, que o localiza por key.
  {
    key: 'delegacoes', zone: 'delegacoes', hero: true, role: 'flagship', tag: 'Delegações esportivas',
    name: 'Atendimento Delegações Esportivas',
    lead: 'No embarque ou desembarque: Acesso exclusivo, apoio logístico, atendimento personalizados e parada de veículos.',
    occasion: 'delegações esportivas chegando ou partindo do Rio.',
    includes: [
      { icon: 'trofeu', label: 'Receptivo de embarque e/ou desembarque' },
      { icon: 'cerimonial', label: 'Coordenação logística dedicada' },
      { icon: 'seguranca', label: 'Acessos e fluxos exclusivos' },
      { icon: 'bagagem', label: 'Apoio com bagagem volumosa' }
    ],
    price: { value: 'R$ 5.445', unit: '/ trecho' },
    cta: 'Saber mais',
    slot: 'mg-delegacoes', photo: 'delegação esportiva desembarcando recebida por equipe'
  }
];

const MG_ZONES = [
  { id: 'familia', railLabel: 'Para você e sua família', railShort: 'Você', eyebrow: 'Experiências',
    title: 'Diferentes experiências, o mesmo cuidado' },
  { id: 'empresas', railLabel: 'Grupos e empresas', railShort: 'Grupos', eyebrow: 'Atendimentos sob medida',
    title: 'Cada ocasião, do seu jeito' }
];

Object.assign(window, {
  MGIcon, MGFeat, MG_SERVICES, MG_ZONES,
  MGServicesByZone: (z) => MG_SERVICES.filter((s) => s.zone === z)
});

// ─── Global GaleON nav (mirrors the Home header dropdown) ───────────────────
const navsv = (s, w = 1.6) => ({ width: s, height: s, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: w, strokeLinecap: 'round', strokeLinejoin: 'round' });
const MGNavIcon = {
  'meet-greet': (s = 18) => <svg {...navsv(s)}><path d="M4 18h16"/><path d="M5 18a7 7 0 0 1 14 0"/><path d="M12 8V6"/><path d="M10 4h4"/></svg>,
  delivery:     (s = 18) => <svg {...navsv(s)}><path d="M5 10h14l-1.2 9.2A1.5 1.5 0 0 1 16.3 21H7.7a1.5 1.5 0 0 1-1.5-1.3L5 10z"/><path d="M5 10h14"/><path d="M9 7c0-1.5 1.5-2 1.5-3M14 7c0-1.5 1.5-2 1.5-3"/></svg>,
  vip:          (s = 18) => <svg {...navsv(s)}><path d="M4 14v-3a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3"/><path d="M3 14a2 2 0 0 1 2 2v2h14v-2a2 2 0 0 1 2-2"/><path d="M7 14V11"/><path d="M17 14V11"/></svg>,
  transportes:  (s = 18) => <svg {...navsv(s)}><path d="M5 16v-3l2-5h10l2 5v3"/><path d="M3 13h18"/><path d="M5 16v2h2v-2"/><path d="M17 16v2h2v-2"/><circle cx="7.5" cy="14.5" r="1"/><circle cx="16.5" cy="14.5" r="1"/></svg>,
  guarda:       (s = 18) => <svg {...navsv(s)}><rect x="5" y="6" width="14" height="14" rx="2"/><path d="M9 3h6v3H9z"/><path d="M5 12h14"/><circle cx="16" cy="15" r="0.6" fill="currentColor"/></svg>,
  cambio:       (s = 18) => <svg {...navsv(s)}><path d="M4 8h13l-3-3"/><path d="M20 16H7l3 3"/></svg>,
  personal:     (s = 18) => <svg {...navsv(s)}><path d="M6 8h12l-1 12H7L6 8z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>
};
const MG_NAV = [
  { key: 'meet-greet', label: 'Meet & Greet',     color: '#2B2B2B', desc: 'Atendimento exclusivo no aeroporto' },
  { key: 'delivery',   label: 'Delivery',          color: '#ED1C24', desc: 'Comida no portão de embarque' },
  { key: 'vip',        label: 'Sala VIP',          color: '#822A85', desc: 'Embarque com privacidade' },
  { key: 'transportes',label: 'Transportes',       color: '#C58200', desc: 'Táxi e transfer' },
  { key: 'guarda',     label: 'Guarda-volume',     color: '#F58220', desc: 'Bagagem em segurança' },
  { key: 'cambio',     label: 'Câmbio',            color: '#009B90', desc: 'Moeda sem fila' },
  { key: 'personal',   label: 'Personal Shopper',  color: '#ED0080', desc: 'Alguém compra por você' }
];
Object.assign(window, { MGNavIcon, MG_NAV });

// ─── Cinematic interstitial moment (between the two zones) ──────────────────
const MG_MOMENT = {
  kicker: 'A experiência Meet & Greet',
  pre: 'Do desembarque ao embarque, ',
  em: 'alguém cuida de cada detalhe',
  post: ' por você.',
  photo: 'anfitrião conduzindo passageiro pelo terminal do RIOgaleão ao entardecer'
};
Object.assign(window, { MG_MOMENT });
