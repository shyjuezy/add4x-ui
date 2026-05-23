type CircuitTracesProps = {
  className?: string;
};

/**
 * Pomelo-style stepped circuit traces.
 * Each trace = 3 segments:
 *   1. Top horizontal in from the left edge, fading in (transparent → magenta)
 *   2. Rounded corner down + short vertical + rounded corner right (solid magenta)
 *   3. Bottom horizontal out to the right edge, fading out (magenta → transparent)
 * Three traces step diagonally inward. Decorative only; aria-hidden.
 */
export function CircuitTraces({ className }: CircuitTracesProps) {
  const r = 36; // corner radius
  const startX = 0;
  const endX = 800;

  const traces = [
    { topY: 64, cornerX: 332, bottomY: 208 },
    { topY: 112, cornerX: 392, bottomY: 244 },
    { topY: 160, cornerX: 452, bottomY: 280 },
  ];

  return (
    <svg
      viewBox="0 0 800 360"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      className={className}
      style={{ filter: "drop-shadow(0 0 4px rgba(255,45,111,0.4))" }}
    >
      <defs>
        {/* Fade in from left: transparent at x=0, full magenta by the bends */}
        <linearGradient
          id="left-fade"
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1="0"
          x2="460"
          y2="0"
        >
          <stop offset="0%" stopColor="#FF2D6F" stopOpacity="0" />
          <stop offset="50%" stopColor="#FF2D6F" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#FF2D6F" stopOpacity="1" />
        </linearGradient>
        {/* Fade out to right: full magenta at the bends, transparent at x=800 */}
        <linearGradient
          id="right-fade"
          gradientUnits="userSpaceOnUse"
          x1="380"
          y1="0"
          x2="800"
          y2="0"
        >
          <stop offset="0%" stopColor="#FF2D6F" stopOpacity="1" />
          <stop offset="55%" stopColor="#FF2D6F" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#FF2D6F" stopOpacity="0" />
        </linearGradient>
      </defs>

      <g fill="none" strokeLinecap="round" strokeWidth="1.5">
        {traces.map((t, i) => {
          const stemEndY = t.topY + r;
          const trailStartY = t.bottomY;
          const topHEnd = t.cornerX - r;
          const bottomHStart = t.cornerX + r;
          return (
            <g key={i}>
              {/* 1. Top horizontal in from the left, fading in */}
              <path
                d={`M ${startX} ${t.topY} H ${topHEnd}`}
                stroke="url(#left-fade)"
              />
              {/* 2. Rounded corner down + vertical + rounded corner right (solid) */}
              <path
                d={
                  `M ${topHEnd} ${t.topY} ` +
                  `Q ${t.cornerX} ${t.topY} ${t.cornerX} ${stemEndY} ` +
                  `V ${trailStartY - r} ` +
                  `Q ${t.cornerX} ${t.bottomY} ${bottomHStart} ${t.bottomY}`
                }
                stroke="#FF2D6F"
              />
              {/* 3. Bottom horizontal out to the right, fading out */}
              <path
                d={`M ${bottomHStart} ${t.bottomY} H ${endX}`}
                stroke="url(#right-fade)"
              />
            </g>
          );
        })}
      </g>
    </svg>
  );
}
