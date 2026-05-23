type CircuitTracesProps = {
  className?: string;
};

/**
 * Pomelo-style L-shaped circuit traces with a centered radial fade
 * and a soft pink glow. Decorative only; aria-hidden.
 */
export function CircuitTraces({ className }: CircuitTracesProps) {
  return (
    <svg
      viewBox="0 0 720 360"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      className={className}
      style={{ filter: "drop-shadow(0 0 8px rgba(255,45,111,0.45))" }}
    >
      <defs>
        <radialGradient id="trace-fade" cx="42%" cy="68%" r="58%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
          <stop offset="55%" stopColor="#ffffff" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
        <mask id="trace-mask">
          <rect width="720" height="360" fill="url(#trace-fade)" />
        </mask>
      </defs>

      <g
        mask="url(#trace-mask)"
        fill="none"
        stroke="#FF2D6F"
        strokeLinecap="round"
        strokeWidth="1.25"
      >
        {/* Outermost L */}
        <path d="M 110 0 V 200 Q 110 240 150 240 H 720" />
        {/* Mid-outer L */}
        <path d="M 220 40 V 218 Q 220 258 260 258 H 720" />
        {/* Mid-inner L */}
        <path d="M 330 80 V 236 Q 330 276 370 276 H 720" />
        {/* Innermost L */}
        <path d="M 410 120 V 250 Q 410 290 450 290 H 720" />
      </g>
    </svg>
  );
}
