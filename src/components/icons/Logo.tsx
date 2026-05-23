type LogoProps = {
  className?: string;
  size?: number;
};

export function Logo({ className, size = 26 }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <rect x="1" y="1" width="30" height="30" rx="9" fill="#FF2D6F" />
      <text
        x="16"
        y="22"
        textAnchor="middle"
        fontFamily="var(--font-sans), Inter, system-ui, sans-serif"
        fontSize="16"
        fontWeight="700"
        letterSpacing="-0.04em"
        fill="#FFFFFF"
      >
        4x
      </text>
    </svg>
  );
}
