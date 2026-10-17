"use client";

import { useLayoutEffect, useRef } from "react";

const BASE = 100; // measure at a fixed size so results never drift

export default function Wordmark({ text, as: Tag = "h1", animate = true, className = "", ...rest }) {
  const boxRef = useRef(null);
  const textRef = useRef(null);
  const lastWidth = useRef(0);

  useLayoutEffect(() => {
    const box = boxRef.current;
    const inner = textRef.current;
    if (!box || !inner) return;

    const fit = (force = false) => {
      const width = box.clientWidth;
      if (!width) return;
      if (!force && width === lastWidth.current) return; // ignore height changes
      lastWidth.current = width;

      box.style.fontSize = `${BASE}px`;
      const used = inner.offsetWidth;
      if (!used) return;
      box.style.fontSize = `${(BASE * width * 0.995) / used}px`;
    };

    fit(true);
    document.fonts?.ready.then(() => fit(true));

    const observer = new ResizeObserver(() => fit());
    observer.observe(box);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={boxRef}
      className={`overflow-hidden font-serif text-[15vw] font-semibold leading-none tracking-[-0.03em] ${className}`}
      {...rest}
    >
      <span ref={textRef} className="inline-block whitespace-nowrap pb-[0.06em]">
        {Array.from(text).map((char, i) => (
          <span key={i} className={animate ? "hero-letter" : undefined} style={animate ? { "--i": i } : undefined}>
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </span>
    </Tag>
  );
}