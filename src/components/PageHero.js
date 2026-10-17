import { container } from "@/lib/ui";

export default function PageHero({ title, intro }) {
  return (
    <section className="overflow-hidden bg-brand text-ink">
      <div className={`${container} pt-36 md:pt-48`}>
        <p className="hero-intro max-w-xl font-serif text-[clamp(1.5rem,2.6vw,2.25rem)] font-light leading-[1.2] tracking-[-0.015em] md:ml-[50%]">
          {intro}
        </p>
        <h1 className="mt-20 overflow-hidden whitespace-nowrap pb-[0.06em] font-serif text-[clamp(4.5rem,19vw,17rem)] font-semibold leading-none tracking-[-0.03em] md:mt-32">
          {Array.from(title).map((char, i) => (
            <span key={i} className="hero-letter" style={{ "--i": i }}>
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h1>
      </div>
    </section>
  );
}