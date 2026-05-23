type CircuitTracesProps = {
  className?: string;
};

/**
 * Pomelo-style nested L-shaped circuit traces.
 * Each L is two paths: a vertical stem that fades IN toward the corner,
 * and a corner-arc + horizontal trail that fades OUT toward the right.
 * Decorative only; aria-hidden.
 */
export function CircuitTraces({ className }: CircuitTracesProps) {
  // Each L: { stemX, cornerY, trailEndX } — corner steps down-and-right
  const traces = [
    { stemX: 60, cornerY: 240, trailEndX: 680 },
    { stemX: 120, cornerY: 256, trailEndX: 680 },
    { stemX: 180, cornerY: 272, trailEndX: 680 },
    { stemX: 240, cornerY: 288, trailEndX: 680 },
  ];
  const cornerRadius = 22;
  const stemTop = 0;
  const trailFadeStartX = 320; // start of right-side fade
  const stemFadeEndY = 60; // top of stem where opacity is 0

  return (
    <svg
      viewBox="0 0 720 320"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      className={className}
      style={{ filter: "drop-shadow(0 0 6px rgba(255,45,111,0.55))" }}
    >
      <defs>
        <linearGradient
          id="stem-fade"
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1={stemTop}
          x2="0"
          y2={stemFadeEndY + 180}
        >
          <stop offset="0%" stopColor="#FF2D6F" stopOpacity="0" />
          <stop offset="55%" stopColor="#FF2D6F" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#FF2D6F" stopOpacity="1" />
        </linearGradient>
        <linearGradient
          id="trail-fade"
          gradientUnits="userSpaceOnUse"
          x1={trailFadeStartX}
          y1="0"
          x2={trailFadeStartX + 360}
          y2="0"
        >
          <stop offset="0%" stopColor="#FF2D6F" stopOpacity="1" />
          <stop offset="45%" stopColor="#FF2D6F" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#FF2D6F" stopOpacity="0" />
        </linearGradient>
      </defs>

      <g fill="none" strokeLinecap="round" strokeWidth="1.25">
        {traces.map((t, i) => {
          const stemEndY = t.cornerY - cornerRadius;
          const trailStartX = t.stemX + cornerRadius;
          return (
            <g key={i}>
              {/* Vertical stem — fades in toward corner */}
              <path
                d={`M ${t.stemX} ${stemTop} V ${stemEndY}`}
                stroke="url(#stem-fade)"
              />
              {/* Corner arc + horizontal trail — fades out toward right */}
              <path
                d={`M ${t.stemX} ${stemEndY} Q ${t.stemX} ${t.cornerY} ${trailStartX} ${t.cornerY} H ${t.trailEndX}`}
                stroke="url(#trail-fade)"
              />
            </g>
          );
        })}
      </g>
    </svg>
  );
}
