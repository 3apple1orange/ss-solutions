"use client";

import { useEffect, useRef } from "react";

export default function Reveal({
  as: Tag = "div",
  delay = 0,
  fade = true,
  className = "",
  style,
  children,
  ...rest
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (!("IntersectionObserver" in window)) {
      el.dataset.visible = "true";
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.dataset.visible = "true";
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${fade ? "reveal-fade" : ""} ${className}`}
      style={{ "--delay": `${delay}ms`, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  );
}