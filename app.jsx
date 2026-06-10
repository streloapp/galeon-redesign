// GaleON canvas — desktop + mobile artboards. Hero direction locked to Split.

// EDITMODE anchor — host rewrites this block on disk if tweaks are added.
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{}/*EDITMODE-END*/;

function App() {
  // Heights are generous — artboards size content; React renders whatever fits.
  // Both artboards render the same HomePage with different `width` so layout
  // adapts via the `mobile` flag inside the component.
  return (
    <React.Fragment>
      <DesignCanvas>
        <DCSection id="home" title="GaleON · Home" subtitle="Mobile-first + desktop · 1 direção polida">
          <DCArtboard id="desktop" label="Desktop · 1440" width={1440} height={6400}>
            <window.GaleonHomePage width={1440}/>
          </DCArtboard>
          <DCArtboard id="mobile" label="Mobile · 390 (QR no portão)" width={390} height={6400}>
            <window.GaleonHomePage width={390}/>
          </DCArtboard>
        </DCSection>

        <DCSection id="notes" title="Notas">
          <DCPostIt width={320} height={220}>
            <strong>Imagens</strong><br/>
            Todos os blocos cinza com texto são slots — arraste fotos reais (passageiros, restaurantes, sala VIP, vista do terminal) e elas persistem.
          </DCPostIt>
          <DCPostIt width={320} height={220}>
            <strong>Hero</strong><br/>
            Direção definida: <strong>Split</strong> — texto + foto lado a lado, com chip de pedido flutuante. As variações Cinema e Statement foram removidas.
          </DCPostIt>
          <DCPostIt width={320} height={220}>
            <strong>Hierarquia dos serviços</strong><br/>
            Hospitalidade quebra o grid (card grande, fundo escuro, imagem cheia). Delivery sobe junto. Compactos descem.
          </DCPostIt>
        </DCSection>
      </DesignCanvas>

      <TweaksPanel />
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
