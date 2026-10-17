import Link from "next/link";
import Button from "@/components/Button";
import { navigation } from "@/lib/navigation";
import { container } from "@/lib/ui";

export const metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="overflow-hidden bg-brand text-ink">
      <div className={`${container} pt-36 md:pt-48`}>
        <div className="hero-intro grid gap-14 md:grid-cols-12">
          <div className="md:col-span-6">
            <h1 className="text-[clamp(2.25rem,4.5vw,4rem)] leading-[1.05]">
              This page could not be found.
            </h1>
            <p className="mt-6 max-w-md leading-relaxed">
              The link may be out of date, or the page may have moved. Try one
              of these instead.
            </p>
            <Button href="/" variant="outline" className="mt-10">
              Back to the homepage
            </Button>
          </div>

          <nav aria-label="Suggested pages" className="md:col-span-5 md:col-start-8">
            <ul className="border-t border-ink/30">
              {navigation.map((item) => (
                <li key={item.href} className="border-b border-ink/30">
                  <Link
                    href={item.href}
                    className="group relative isolate block px-3 py-5 font-serif text-[clamp(1.75rem,2.6vw,2.5rem)] font-light leading-none transition-colors duration-500 hover:text-paper"
                  >
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 -z-10 origin-bottom scale-y-0 bg-ink transition-transform duration-500 ease-[cubic-bezier(0.7,0,0.2,1)] group-hover:scale-y-100"
                    />
                    <span className="inline-block transition-transform duration-500 ease-[cubic-bezier(0.7,0,0.2,1)] group-hover:translate-x-3">
                      {item.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <p
          aria-hidden="true"
          className="mt-24 overflow-hidden whitespace-nowrap pb-[0.06em] font-serif text-[clamp(8rem,40vw,30rem)] font-semibold leading-none tracking-[-0.04em] md:mt-32"
        >
          {Array.from("404").map((char, i) => (
            <span key={i} className="hero-letter" style={{ "--i": i + 2 }}>
              {char}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}