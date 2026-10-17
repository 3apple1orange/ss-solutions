export default function Seal({ text, center = "S.S.", className = "" }) {
  return (
    <div aria-hidden="true" className={`relative ${className}`}>
      <svg
        viewBox="0 0 200 200"
        className="h-full w-full animate-[spin_40s_linear_infinite] motion-reduce:animate-none"
      >
        <defs>
          <path
            id="seal-circle"
            d="M100,100 m-80,0 a80,80 0 1,1 160,0 a80,80 0 1,1 -160,0"
          />
        </defs>
        <circle cx="100" cy="100" r="97" fill="none" stroke="currentColor" strokeWidth="0.6" />
        <circle cx="100" cy="100" r="62" fill="none" stroke="currentColor" strokeWidth="0.6" />
        <text className="fill-current font-sans text-[12px] uppercase">
          <textPath href="#seal-circle" textLength="500" lengthAdjust="spacing">
            {text}
          </textPath>
        </text>
      </svg>
      <span className="absolute inset-0 flex items-center justify-center font-serif text-4xl font-semibold tracking-[-0.03em]">
        {center}
      </span>
    </div>
  );
}