// GaleON canvas — desktop + mobile artboards, Tweaks for hero style.

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "heroVariant": "split"
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // Heights are generous — artboards size content; React renders whatever fits.
  // Both artboards render the same HomePage with different `width` so layout
  // adapts via the `mobile` flag inside the component.
  const sharedProps = { heroVariant: t.heroVariant };

  return (
    <React.Fragment>
      <DesignCanvas>
        <DCSection id="home" title="GaleON · Home" subtitle="Mobile-first + desktop · 1 direção polida">
          <DCArtboard id="desktop" label="Desktop · 1440" width={1440} height={6400}>
            <window.GaleonHomePage width={1440} {...sharedProps}/>
          </DCArtboard>
          <DCArtboard id="mobile" label="Mobile · 390 (QR no portão)" width={390} height={6400}>
            <window.GaleonHomePage width={390} {...sharedProps}/>
          </DCArtboard>
        </DCSection>

        <DCSection id="notes" title="Notas">
          <DCPostIt width={320} height={220}>
            <strong>Imagens</strong><br/>
            Todos os blocos cinza com texto são slots — arraste fotos reais (passageiros, restaurantes, sala VIP, vista do terminal) e elas persistem.
          </DCPostIt>
          <DCPostIt width={320} height={220}>
            <strong>Tweaks</strong><br/>
            Use o painel à direita para trocar o estilo do hero entre Editorial Split, Cinema (full-bleed) e Statement (tipo gigante).
          </DCPostIt>
          <DCPostIt width={320} height={220}>
            <strong>Hierarquia dos serviços</strong><br/>
            Hospitalidade quebra o grid (card grande, fundo escuro, imagem cheia). Delivery sobe junto. Compactos descem.
          </DCPostIt>
        </DCSection>
      </DesignCanvas>

      <TweaksPanel>
        <TweakSection label="Hero"/>
        <TweakRadio
          label="Estilo"
          value={t.heroVariant}
          options={[
            { value: 'split',     label: 'Split' },
            { value: 'cinema',    label: 'Cinema' },
            { value: 'statement', label: 'Statement' },
          ]}
          onChange={(v) => setTweak('heroVariant', v)}
        />
        <div style={{ fontSize: 11, color: 'rgba(41,38,27,.55)', lineHeight: 1.4, marginTop: 4 }}>
          <strong style={{ color: 'rgba(41,38,27,.78)' }}>Split</strong> — texto + foto lado a lado, chip de pedido flutuante.<br/>
          <strong style={{ color: 'rgba(41,38,27,.78)' }}>Cinema</strong> — imagem grande full-bleed, headline sobreposto.<br/>
          <strong style={{ color: 'rgba(41,38,27,.78)' }}>Statement</strong> — tipo gigante editorial com mosaico de 3 imagens.
        </div>
      </TweaksPanel>
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
