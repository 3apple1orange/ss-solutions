import Link from "next/link";
import Button from "@/components/Button";
import JsonLd from "@/components/JsonLd";
import Reveal from "@/components/Reveal";
import ServiceCard from "@/components/ServiceCard";
import Wordmark from "@/components/Wordmark";
import { site } from "@/lib/site";
import { services } from "@/lib/services";
import { pageMetadata } from "@/lib/seo";
import { webPageSchema } from "@/lib/schema";
import { container } from "@/lib/ui";

export const metadata = pageMetadata({
  title: site.title,
  description: site.description,
  path: "/",
  absoluteTitle: true,
});

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="flex min-h-svh flex-col overflow-hidden bg-brand text-ink">
        <div className={`${container} flex w-full flex-1 flex-col pt-28 md:pt-32`}>
          <div className="hero-intro mx-auto max-w-[72rem] text-center">
            <p className="font-serif text-[clamp(2rem,4vw,3.75rem)] font-light leading-[1.08] tracking-[-0.025em]">
              We are the contractors behind progress.
            </p>
            <p className="mx-auto mt-5 max-w-2xl leading-relaxed text-ink/80 md:text-lg">
              From mechanised sweeping and urban operations to waste to energy,
              sustainable infrastructure and civil development.
            </p>

            <div className="mt-8 flex flex-col items-center gap-2 md:flex-row md:justify-center md:gap-6">
              <span className="text-sm text-ink/60">Geographic focus</span>
              <ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-sm">
                {site.geographicFocus.map((place, i) => (
                  <li key={place} className="flex items-center gap-4">
                    {i > 0 && (
                      <span aria-hidden="true" className="h-1 w-1 shrink-0 rounded-full bg-ink" />
                    )}
                    {place}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <Wordmark text={site.name} className="mt-auto pt-24 pb-6 md:pt-32 md:pb-10" />
        </div>
      </section>

      {/* Statement */}
      <section className="overflow-hidden bg-paper">
        <Reveal fade={false} className="relative">
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute -left-6 top-0 h-56 w-56 text-ink/40 md:left-6 md:h-72 md:w-72"
            viewBox="0 0 200 200"
            fill="none"
          >
            <circle cx="200" cy="0" r="185" stroke="currentColor" strokeWidth="0.7" className="draw" pathLength="1" />
          </svg>

          <div className={`${container} relative py-28 md:py-40`}>
            <div className="max-w-2xl md:ml-[16.66%]">
              <Reveal>
                <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.18]">
                  Public work is judged on the street, every morning.
                </h2>
              </Reveal>
              <Reveal delay={150}>
                <p className="mt-10 font-serif text-[clamp(1.75rem,3vw,2.5rem)] font-light leading-[1.18] tracking-[-0.015em]">
                  {site.name} was established in April 2025 to take on
                  municipal, industrial and private infrastructure contracts
                  with a clear scope, documented delivery and a proprietor
                  directly accountable for the result.
                </p>
              </Reveal>
              <Reveal delay={300}>
                <Button href="/about" variant="outline" className="mt-14">
                  About the firm
                </Button>
              </Reveal>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Services */}
      <section className="relative overflow-hidden bg-ink text-paper">
        <Reveal
          fade={false}
          className="pointer-events-none absolute -right-[30rem] top-0 h-[60rem] w-[60rem] md:-right-[24rem]"
        >
          <svg aria-hidden="true" className="h-full w-full text-brand/70" viewBox="0 0 200 200" fill="none">
            <circle cx="100" cy="100" r="99" stroke="currentColor" strokeWidth="0.22" className="draw" pathLength="1" />
            <circle cx="100" cy="100" r="88" stroke="currentColor" strokeWidth="0.22" className="draw" pathLength="1" style={{ "--delay": "250ms" }} />
          </svg>
        </Reveal>

        <div className={`${container} relative py-28 md:py-36`}>
          <Reveal>
            <h2 className="max-w-4xl text-[clamp(2.25rem,5vw,4.5rem)] leading-[1.05]">
              Infrastructure and environmental solutions for the public and
              private sectors.
            </h2>
          </Reveal>
          <Reveal delay={150}>
            <Button href="/services" variant="solid-dark" className="mt-14">
              View services
            </Button>
          </Reveal>

          <ul className="mt-24 grid gap-x-12 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => (
              <ServiceCard key={service.slug} service={service} delay={i * 140} />
            ))}
          </ul>
        </div>
      </section>

      {/* Current work */}
      <section className="bg-paper">
        <div className={`${container} grid gap-10 py-28 md:grid-cols-12 md:py-36`}>
          <Reveal className="md:col-span-4">
            <h2 className="text-[clamp(2rem,3.5vw,3rem)] leading-[1.1]">Current work</h2>
          </Reveal>
          <Reveal delay={150} className="relative pt-8 md:col-span-7 md:col-start-6">
            <span aria-hidden="true" className="draw-line absolute inset-x-0 top-0 h-px bg-ink" />
            <h3 className="font-sans text-xl font-normal tracking-normal">
              Mechanised road sweeping, Kurukshetra
            </h3>
            <p className="mt-4 max-w-xl leading-relaxed">
              Operating a mechanised road sweeping machine for the Municipal
              Council, Thanesar, under direct contract since September 2025.
              The engagement is ongoing.
            </p>
            <Link href="/projects" className="link-line mt-8 inline-block text-sm">
              Read about the project
            </Link>
          </Reveal>
        </div>
      </section>

      <JsonLd data={webPageSchema({ path: "/", name: site.title, description: site.description })} />
    </>
  );
}