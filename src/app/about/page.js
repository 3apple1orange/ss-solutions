import Image from "next/image";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { site, orgId } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import { container } from "@/lib/ui";
import Mark from "@/components/Mark";
import Seal from "@/components/Seal";
const title = "About";
const description =
  "S.S. Solutions is a sole proprietorship based in Haryana established in April 2025 for municipal and tendered service work. Proprietor: Manan Singla.";

export const metadata = pageMetadata({ title, description, path: "/about" });

// Set to the portrait details once the file is in public/images. Leave null to show initials.
const portrait = {
  src: "/images/manan-singla-founder-ecto-india.jpeg",
  alt: "Manan Singla, proprietor of S.S. Solutions",
  width: 1000,
  height: 1500,
};

// Fill from certificates. Empty values are hidden.
const registrations = [
  { label: "Legal structure", value: site.entityType },
  { label: "Proprietor", value: site.proprietor.name },
  { label: "Established", value: "April 2025" },
  { label: "GST registration", value: "May 2025" },
  { label: "GSTIN", value: null }, // TODO: only if the client approves publishing it
  { label: "Udyam (MSME)", value: "Registered" }, // TODO: confirm against certificate
  { label: "Registered office", value: "Kaithal, Haryana" },
].filter((r) => r.value);

const principles = [
  {
    title: "Clear scope",
    text: "We commit only where the scope, location and timeline match what the firm can deliver in full.",
  },
  {
    title: "Documented work",
    text: "Every engagement is recorded properly, and only documented work is presented in public.",
  },
  {
    title: "Accountable delivery",
    text: "As a proprietorship, responsibility for every contract sits directly with the proprietor.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        title={title}
          intro="A proprietorship based in Haryana for municipal contracts and tendered public work, established in April 2025."
      />

            {/* The firm */}
      <section className="bg-paper">
        <div className={`${container} py-24 md:py-36`}>
          <div className="max-w-[60rem] md:ml-[16.66%]">
            <Reveal>
              <h2 className="text-[clamp(1.9rem,3.6vw,3.4rem)] leading-[1.12] tracking-[-0.02em]">
                {site.name} is a <Mark delay={500}>sole proprietorship</Mark> based
                in Haryana, established in <Mark delay={900}>April 2025</Mark> to
                undertake municipal and tendered service work.
              </h2>
            </Reveal>
            <Reveal delay={150}>
              <p className="mt-6 font-serif text-[clamp(1.9rem,3.6vw,3.4rem)] font-light leading-[1.12] tracking-[-0.02em] text-ink/40">
                Since September 2025, it has operated mechanised road sweeping
                for the <Mark delay={700}>Municipal Council, Thanesar</Mark>, in
                Kurukshetra.
              </p>
            </Reveal>
          </div>

          <div className="mt-24 grid gap-14 md:mt-32 md:grid-cols-12">
            <Reveal className="flex justify-center md:col-span-3 md:block">
              <Seal
                text="Sole proprietorship ✦ Haryana ✦ Established 2025 ✦"
                className="h-44 w-44 text-ink md:h-48 md:w-48"
              />
            </Reveal>

            <div className="md:col-span-9">
              <dl className="grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
                {registrations.map((r, i) => (
                  <Reveal key={r.label} delay={(i % 3) * 120} className="relative pb-10 pt-6">
                    <span aria-hidden="true" className="draw-line absolute inset-x-0 top-0 h-px bg-ink/30" />
                    <dt className="text-sm text-ink/60">{r.label}</dt>
                    <dd className="mt-3 font-serif text-[clamp(1.5rem,2.2vw,2rem)] font-light leading-tight">
                      {r.value}
                    </dd>
                  </Reveal>
                ))}
              </dl>

              <Link href="/projects" className="link-line mt-4 inline-block text-sm">
                See the current project
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* The proprietor */}
      <section className="relative overflow-hidden bg-ink text-paper">
        <div className={`${container} grid items-center gap-16 py-28 md:grid-cols-12 md:py-36`}>
          <Reveal fade={false} className="relative mx-auto w-64 md:col-span-5 md:w-full md:max-w-sm">
            <svg
              aria-hidden="true"
              className="pointer-events-none absolute -inset-5 h-[calc(100%+2.5rem)] w-[calc(100%+2.5rem)] -rotate-90 text-brand"
              viewBox="0 0 200 200"
              fill="none"
            >
              <circle cx="100" cy="100" r="99" stroke="currentColor" strokeWidth="0.6" className="draw" pathLength="1" />
            </svg>

            <div className="relative aspect-square overflow-hidden rounded-full bg-paper/5">
              {portrait ? (
                <Image
                  src={portrait.src}
                  alt={portrait.alt}
                  width={portrait.width}
                  height={portrait.height}
                  sizes="(min-width: 768px) 384px, 256px"
                  className="h-full w-full object-cover object-[50%_30%] grayscale transition-[filter] duration-700 hover:grayscale-0"
                />
              ) : (
                <span aria-hidden="true" className="flex h-full w-full items-center justify-center font-serif text-7xl font-light text-paper/80">
                  MS
                </span>
              )}
            </div>
          </Reveal>

          <div className="md:col-span-6 md:col-start-7">
            <Reveal>
              <h2 className="text-[clamp(2.25rem,4.5vw,4rem)] leading-[1.05]">
                {site.proprietor.name}
              </h2>
              <p className="mt-3 text-paper/60">
                {site.proprietor.title}, {site.name}
              </p>
            </Reveal>

            <Reveal delay={150}>
              <p className="mt-10 font-serif text-[clamp(1.2rem,1.7vw,1.5rem)] font-light leading-[1.45] text-paper/90">
                {site.proprietor.name} leads {site.name} as its proprietor and
                oversees every contract the firm takes on, from tender to daily
                operation.
              </p>
              <p className="mt-6 font-serif text-[clamp(1.2rem,1.7vw,1.5rem)] font-light leading-[1.45] text-paper/90">
                He is also the founder of <Mark delay={500}>ECTO India</Mark>, an
                auto rickshaw mobility platform being developed for Tier 2 and
                Tier 3 Indian cities, and the author of{" "}
                <Mark delay={900}><em>Meet Me in the Backyard</em></Mark>, a
                philosophical work on identity, fear and mortality.
              </p>
              <p className="mt-6 font-serif text-[clamp(1.2rem,1.7vw,1.5rem)] font-light leading-[1.45] text-paper/90">
                His research paper, <em>Platformisation in Smaller Indian Cities:
                A Literature Review of Informal Institutions, Labour and
                Technology Adoption in Urban Mobility</em>, has been endorsed by{" "}
                <Mark delay={1300}>Angela M. Counts</Mark>, former Director of
                Admissions at{" "}
                <Mark delay={1700}>Harvard Divinity School, Harvard University</Mark>.
              </p>

            </Reveal>

            <Reveal delay={300} className="mt-12 flex flex-wrap gap-x-10 gap-y-4 text-sm">
              <a href={site.proprietor.aboutUrl} className="link-line">
                Read the full profile
              </a>
              <a href={site.related.ectoUrl} className="link-line">
                Visit ECTO India
              </a>
              <a href={site.related.bookUrl} className="link-line">
                Read about his book
              </a>
            </Reveal>
          </div>
        </div>
      </section>

    {/* Principles */}
      <section className="bg-paper">
        <div className={`${container} py-28 md:py-36`}>
          <Reveal>
            <h2 className="text-[clamp(1.9rem,3.6vw,3.4rem)] leading-[1.1] md:ml-[16.66%]">
              How the firm works.
            </h2>
          </Reveal>

          <ul className="mt-16 md:mt-20">
            {principles.map((p, i) => (
              <Reveal as="li" key={p.title} delay={i * 120} className="group relative isolate">
                <span aria-hidden="true" className="draw-line absolute inset-x-0 top-0 h-px bg-ink" />
                <span
                  aria-hidden="true"
                  className="absolute inset-0 -z-10 origin-bottom scale-y-0 bg-brand transition-transform duration-500 ease-[cubic-bezier(0.7,0,0.2,1)] group-hover:scale-y-100"
                />
                <div className="grid items-baseline gap-4 py-10 md:grid-cols-12 md:px-6 md:py-14">
                  <h3 className="font-serif text-[clamp(2.25rem,5.5vw,5rem)] font-light leading-none tracking-[-0.025em] transition-transform duration-500 ease-[cubic-bezier(0.7,0,0.2,1)] group-hover:translate-x-4 md:col-span-7">
                    {p.title}
                  </h3>
                  <p className="max-w-sm leading-relaxed text-ink/70 transition-colors duration-500 group-hover:text-ink md:col-span-4 md:col-start-9">
                    {p.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>
          <Reveal fade={false}>
            <span aria-hidden="true" className="draw-line block h-px bg-ink" />
          </Reveal>
        </div>
      </section>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          "@id": `${site.url}/about#webpage`,
          url: `${site.url}/about`,
          name: `${title} | ${site.name}`,
          description,
          isPartOf: { "@id": `${site.url}/#website` },
          mainEntity: { "@id": orgId },
          mentions: { "@id": site.proprietor.id },
        }}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: title, path: "/about" },
        ])}
      />
    </>
  );
}