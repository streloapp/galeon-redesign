// Meet & Greet — app shell. Continuous scrolling landing (no canvas), so the
// sticky scroll-progress rail behaves for real. Each zone uses a DIFFERENT
// component for rhythm: zone 1 = experience carousel, a cinematic moment
// between zones, zone 2 = split-card stack.

const { useState: useStateA, useEffect: useEffectA } = React;

// Only re-render when the mobile/desktop boolean actually flips (avoids
// resetting JS-added classes like .is-in on every resize tick).
function useViewport() {
  const [mobile, setMobile] = useStateA(() => (typeof window !== 'undefined' ? window.innerWidth < 820 : false));
  useEffectA(() => {
    const on = () => { const m = window.innerWidth < 820; setMobile((p) => (p === m ? p : m)); };
    window.addEventListener('resize', on);
    return () => window.removeEventListener('resize', on);
  }, []);
  return { mobile };
}

// Reveal-on-scroll. Robust: reveals anything already in view immediately,
// observes the rest, and a safety timeout guarantees nothing stays hidden.
function useScrollReveal(dep) {
  useEffectA(() => {
    const els = Array.from(document.querySelectorAll('.mg-reveal'));
    if (!els.length) return;
    const reveal = (el) => el.classList.add('is-in');
    if (!('IntersectionObserver' in window)) { els.forEach(reveal); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { reveal(e.target); io.unobserve(e.target); } });
    }, { threshold: 0.08, rootMargin: '0px 0px -4% 0px' });
    const vh = window.innerHeight || 800;
    els.forEach((el) => {
      if (el.getBoundingClientRect().top < vh * 0.92) reveal(el);
      else io.observe(el);
    });
    const t = setTimeout(() => els.forEach(reveal), 1600);
    return () => { io.disconnect(); clearTimeout(t); };
  }, [dep]);
}

const FAM_TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "famVariant": "overlap"
}/*EDITMODE-END*/;

function MGApp() {
  const { mobile } = useViewport();
  useScrollReveal(mobile);
  const [t, setTweak] = window.useTweaks(FAM_TWEAK_DEFAULTS);
  const scrollToFamilia = () => {
    const el = document.getElementById('familia');
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 56, behavior: 'smooth' });
  };
  const zones = window.MG_ZONES;
  return (
    <div className="galeao mg-page" data-vp={mobile ? 'mobile' : 'desktop'}>
      <window.MGHeader mobile={mobile} />
      <window.MGHero mobile={mobile} onExplore={scrollToFamilia} />
      <window.MGZoneSection zone={zones[0]} mobile={mobile} variant={t.famVariant} />
      <window.MGCarouselZone zone={zones[1]} mobile={mobile} />
      <window.MGTrust mobile={mobile} />
      <window.MGFooter mobile={mobile} />

      <window.TweaksPanel>
        <window.TweakSection label="Card de Experiências" />
        <window.TweakSelect label="Layout" value={t.famVariant}
          options={[{ value: 'overlap', label: 'Sobreposto' }, { value: 'flush', label: 'Sobreposto sem sombra' }, { value: 'beside', label: 'Lado a lado' }, { value: 'inset', label: 'No card' }]}
          onChange={(v) => setTweak('famVariant', v)} />
      </window.TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<MGApp />);
