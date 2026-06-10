// ─── AwardBadge ─────────────────────────────────────────────────────────────
// Ported from the Product Hunt "Golden Kitty"-style badge to plain JSX with
// inline styles. The 3D parallax + rainbow overlay animation are preserved.
//
// Usage:
//   <AwardBadge subtitle="TRAVEL COMMERCE 2024" title="Innovation of the Year" link="#" />

const { useState: useStateAB, useEffect: useEffectAB, useRef: useRefAB } = React;

const __AB_identity =
  '1, 0, 0, 0, ' +
  '0, 1, 0, 0, ' +
  '0, 0, 1, 0, ' +
  '0, 0, 0, 1';
const __AB_maxRotate = 0.25;
const __AB_minRotate = -0.25;
const __AB_maxScale = 1;
const __AB_minScale = 0.97;
const __AB_bg = '#ddd';

function AwardBadge({
  subtitle = 'TRAVEL COMMERCE 2024',
  title = 'Innovation of the Year',
  link = '#',
  width = 260
}) {
  const reduceMotion = typeof matchMedia === 'function' &&
    matchMedia('(prefers-reduced-motion: reduce)').matches;
  const ref = useRefAB(null);
  const [firstOverlayPosition, setFirstOverlayPosition] = useStateAB(0);
  const [matrix, setMatrix] = useStateAB(__AB_identity);
  const [currentMatrix, setCurrentMatrix] = useStateAB(__AB_identity);
  const [disableInOutOverlayAnimation, setDisableInOutOverlayAnimation] = useStateAB(true);
  const [disableOverlayAnimation, setDisableOverlayAnimation] = useStateAB(false);
  const [isTimeoutFinished, setIsTimeoutFinished] = useStateAB(false);
  const enterTimeout = useRefAB(null);
  const leaveTimeout1 = useRefAB(null);
  const leaveTimeout2 = useRefAB(null);
  const leaveTimeout3 = useRefAB(null);

  const getDimensions = () => {
    const r = ref.current && ref.current.getBoundingClientRect();
    return {
      left:   r ? r.left   : 0,
      right:  r ? r.right  : 0,
      top:    r ? r.top    : 0,
      bottom: r ? r.bottom : 0
    };
  };

  const getMatrix = (clientX, clientY) => {
    const { left, right, top, bottom } = getDimensions();
    const xCenter = (left + right) / 2;
    const yCenter = (top + bottom) / 2;
    const scale = [
      __AB_maxScale - (__AB_maxScale - __AB_minScale) * Math.abs(xCenter - clientX) / (xCenter - left || 1),
      __AB_maxScale - (__AB_maxScale - __AB_minScale) * Math.abs(yCenter - clientY) / (yCenter - top || 1),
      __AB_maxScale - (__AB_maxScale - __AB_minScale) * (Math.abs(xCenter - clientX) + Math.abs(yCenter - clientY)) / ((xCenter - left) + (yCenter - top) || 1)
    ];
    const rotate = {
      x1: 0.25 * ((yCenter - clientY) / (yCenter || 1) - (xCenter - clientX) / (xCenter || 1)),
      x2: __AB_maxRotate - (__AB_maxRotate - __AB_minRotate) * Math.abs(right - clientX) / (right - left || 1),
      x3: 0,
      y0: 0,
      y2: __AB_maxRotate - (__AB_maxRotate - __AB_minRotate) * (top - clientY) / (top - bottom || 1),
      y3: 0,
      z0: -(__AB_maxRotate - (__AB_maxRotate - __AB_minRotate) * Math.abs(right - clientX) / (right - left || 1)),
      z1: (0.2 - (0.2 + 0.6) * (top - clientY) / (top - bottom || 1)),
      z3: 0
    };
    return `${scale[0]}, ${rotate.y0}, ${rotate.z0}, 0, ` +
           `${rotate.x1}, ${scale[1]}, ${rotate.z1}, 0, ` +
           `${rotate.x2}, ${rotate.y2}, ${scale[2]}, 0, ` +
           `${rotate.x3}, ${rotate.y3}, ${rotate.z3}, 1`;
  };

  const getOppositeMatrix = (m, clientY, onEnter) => {
    const { top, bottom } = getDimensions();
    const oppositeY = bottom - clientY + top;
    const weakening = onEnter ? 0.7 : 4;
    const multiplier = onEnter ? -1 : 1;
    return m.split(', ').map((v, i) => {
      if (i === 2 || i === 4 || i === 8) return -parseFloat(v) * multiplier / weakening;
      if (i === 0 || i === 5 || i === 10) return '1';
      if (i === 6) return multiplier * (__AB_maxRotate - (__AB_maxRotate - __AB_minRotate) * (top - oppositeY) / (top - bottom || 1)) / weakening;
      if (i === 9) return (__AB_maxRotate - (__AB_maxRotate - __AB_minRotate) * (top - oppositeY) / (top - bottom || 1)) / weakening;
      return v;
    }).join(', ');
  };

  const onMouseEnter = (e) => {
    [leaveTimeout1, leaveTimeout2, leaveTimeout3].forEach((t) => { if (t.current) clearTimeout(t.current); });
    setDisableOverlayAnimation(true);
    const { left, right, top, bottom } = getDimensions();
    const xCenter = (left + right) / 2;
    const yCenter = (top + bottom) / 2;
    setDisableInOutOverlayAnimation(false);
    enterTimeout.current = setTimeout(() => setDisableInOutOverlayAnimation(true), 350);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setFirstOverlayPosition((Math.abs(xCenter - e.clientX) + Math.abs(yCenter - e.clientY)) / 1.5);
      });
    });
    const m = getMatrix(e.clientX, e.clientY);
    const opp = getOppositeMatrix(m, e.clientY, true);
    setMatrix(opp);
    setIsTimeoutFinished(false);
    setTimeout(() => setIsTimeoutFinished(true), 200);
  };

  const onMouseMove = (e) => {
    const { left, right, top, bottom } = getDimensions();
    const xCenter = (left + right) / 2;
    const yCenter = (top + bottom) / 2;
    setTimeout(() => setFirstOverlayPosition((Math.abs(xCenter - e.clientX) + Math.abs(yCenter - e.clientY)) / 1.5), 150);
    if (isTimeoutFinished) setCurrentMatrix(getMatrix(e.clientX, e.clientY));
  };

  const onMouseLeave = (e) => {
    const opp = getOppositeMatrix(matrix, e.clientY);
    if (enterTimeout.current) clearTimeout(enterTimeout.current);
    setCurrentMatrix(opp);
    setTimeout(() => setCurrentMatrix(__AB_identity), 200);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setDisableInOutOverlayAnimation(false);
        leaveTimeout1.current = setTimeout(() => setFirstOverlayPosition(-firstOverlayPosition / 4), 150);
        leaveTimeout2.current = setTimeout(() => setFirstOverlayPosition(0), 300);
        leaveTimeout3.current = setTimeout(() => {
          setDisableOverlayAnimation(false);
          setDisableInOutOverlayAnimation(true);
        }, 500);
      });
    });
  };

  useEffectAB(() => {
    if (isTimeoutFinished) setMatrix(currentMatrix);
  }, [currentMatrix, isTimeoutFinished]);

  // Unique keyframe names so they don't collide with anything else on the page.
  const overlayKeyframes = [...Array(10).keys()].map((e) => (`
    @keyframes glAwardOverlay${e + 1} {
      0%   { transform: rotate(${e * 10}deg); }
      50%  { transform: rotate(${(e + 1) * 10}deg); }
      100% { transform: rotate(${e * 10}deg); }
    }`
  )).join('\n');

  // Rainbow overlay colors — same gradient as the Product Hunt original.
  const overlayColors = [
    'hsl(358, 100%, 62%)',
    'hsl(30, 100%, 50%)',
    'hsl(60, 100%, 50%)',
    'hsl(96, 100%, 50%)',
    'hsl(233, 85%, 47%)',
    'hsl(271, 85%, 47%)',
    'hsl(300, 20%, 35%)',
    'transparent',
    'transparent',
    'white'
  ];

  return (
    <a
      ref={ref}
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onMouseEnter={onMouseEnter}
      style={{
        display: 'block',
        width,
        height: 'auto',
        cursor: 'pointer',
        textDecoration: 'none'
      }}>
      <style>{overlayKeyframes}</style>
      <div style={{
        transform: `perspective(700px) matrix3d(${matrix})`,
        transformOrigin: 'center center',
        transition: 'transform 200ms ease-out'
      }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 260 54"
          style={{ width: '100%', height: 'auto', display: 'block' }}>
          <defs>
            <filter id="glAwardBlur">
              <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
            </filter>
            <mask id="glAwardMask">
              <rect width="260" height="54" fill="white" rx="10" />
            </mask>
          </defs>
          <rect width="260" height="54" rx="10" fill={__AB_bg} />
          <rect x="4" y="4" width="252" height="46" rx="8" fill="transparent" stroke="#bbb" strokeWidth="1" />
          <text fontFamily="Helvetica-Bold, Helvetica" fontSize="9" fontWeight="bold" fill="#666" x="53" y="20">
            {subtitle}
          </text>
          <text fontFamily="Helvetica-Bold, Helvetica" fontSize="14" fontWeight="bold" fill="#666" x="52" y="40">
            {title}
          </text>
          {/* Laurel wreath icon (original Product Hunt badge path) */}
          <g transform="translate(8, 9)" fill="#666">
            <path d="M14.963 9.075c.787-3-.188-5.887-.188-5.887S12.488 5.175 11.7 8.175c-.787 3 .188 5.887.188 5.887s2.25-1.987 3.075-4.987m-4.5 1.987c.787 3-.188 5.888-.188 5.888S7.988 14.962 7.2 11.962c-.787-3 .188-5.887.188-5.887s2.287 1.987 3.075 4.987m.862 10.388s-.6-2.962-2.775-5.175C6.337 14.1 3.375 13.5 3.375 13.5s.6 2.962 2.775 5.175c2.213 2.175 5.175 2.775 5.175 2.775m3.3 3.413s-1.988-2.288-4.988-3.075-5.887.187-5.887.187 1.987 2.287 4.988 3.075c3 .787 5.887-.188 5.887-.188Zm6.75 0s1.988-2.288 4.988-3.075c3-.826 5.887.187 5.887.187s-1.988 2.287-4.988 3.075c-3 .787-5.887-.188-5.887-.188ZM32.625 13.5s-2.963.6-5.175 2.775c-2.213 2.213-2.775 5.175-2.775 5.175s2.962-.6 5.175-2.775c2.175-2.213 2.775-5.175 2.775-5.175M28.65 6.075s.975 2.887.188 5.887c-.826 3-3.076 4.988-3.076 4.988s-.974-2.888-.187-5.888c.788-3 3.075-4.987 3.075-4.987m-4.5 7.987s.975-2.887.188-5.887c-.788-3-3.076-4.988-3.076-4.988s-.974 2.888-.187 5.888c.788 3 3.075 4.988 3.075 4.988ZM18 26.1c.975-.225 3.113-.6 5.325 0 3 .788 5.063 3.038 5.063 3.038s-2.888.975-5.888.187a13 13 0 0 1-1.425-.525c.563.788 1.125 1.425 2.288 1.913l-.863 2.062c-2.063-.862-2.925-2.137-3.675-3.262-.262-.375-.525-.713-.787-1.05-.26.293-.465.586-.686.903l-.102.147-.048.068c-.775 1.108-1.643 2.35-3.627 3.194l-.862-2.062c1.162-.488 1.725-1.125 2.287-1.913-.45.225-.938.375-1.425.525-3 .788-5.887-.187-5.887-.187s1.987-2.288 4.987-3.075c2.212-.563 4.35-.188 5.325.037" />
          </g>
          <g style={{ mixBlendMode: 'overlay' }} mask="url(#glAwardMask)">
            {overlayColors.map((fill, i) =>
              <g key={i} style={{
                transform: `rotate(${firstOverlayPosition + i * 10}deg)`,
                transformOrigin: 'center center',
                transition: !disableInOutOverlayAnimation ? 'transform 200ms ease-out' : 'none',
                animation: (disableOverlayAnimation || reduceMotion) ? 'none' : `glAwardOverlay${i + 1} 5s infinite`,
                willChange: 'transform'
              }}>
                <polygon
                  points="0,0 260,54 260,0 0,54"
                  fill={fill}
                  filter="url(#glAwardBlur)"
                  opacity="0.38" />
              </g>
            )}
          </g>
        </svg>
      </div>
    </a>);

}

window.GaleonAwardBadge = AwardBadge;
