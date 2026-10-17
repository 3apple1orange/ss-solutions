const shape = { className: "draw", pathLength: 1 };

const spokes = Array.from({ length: 8 }, (_, i) => {
  const a = (i * Math.PI) / 4;
  return [
    24 + Math.cos(a) * 4.5,
    22 + Math.sin(a) * 4.5,
    24 + Math.cos(a) * 11,
    22 + Math.sin(a) * 11,
  ].map((n) => +n.toFixed(2));
});

const icons = {
  "urban-municipal-operations": (
    <>
      <circle cx="24" cy="22" r="11" {...shape} />
      <g className="origin-[24px_22px] transition-transform duration-1000 group-hover:rotate-90">
        {spokes.map(([x1, y1, x2, y2], i) => (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} {...shape} />
        ))}
      </g>
      <path d="M6 40h36" {...shape} />
    </>
  ),
  "waste-to-energy": (
    <>
      <g className="origin-center transition-transform duration-1000 group-hover:rotate-[120deg]">
        <path d="M26.78 8.24A16 16 0 0 1 39.04 29.47" {...shape} />
        <path d="M36.26 34.28A16 16 0 0 1 11.74 34.28" {...shape} />
        <path d="M8.96 29.47A16 16 0 0 1 21.22 8.24" {...shape} />
      </g>
      <path d="M26 15l-6 10h7l-5 9" {...shape} />
    </>
  ),
  "infrastructure-contracting": (
    <>
      <path d="M4 18h40" {...shape} />
      <path d="M10 18v22M38 18v22" {...shape} />
      <path d="M10 33Q24 21 38 33" {...shape} />
      <path d="M4 40h40" {...shape} />
    </>
  ),
};

export default function ServiceIcon({ slug, className = "", strokeWidth = 1.5 }) {
  const icon = icons[slug];
  if (!icon) return null;

  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {icon}
    </svg>
  );
}