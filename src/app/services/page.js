import Image from "next/image";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import ServiceIcon from "@/components/ServiceIcon";
import { services } from "@/lib/services";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbSchema, servicesSchema, webPageSchema } from "@/lib/schema";
import { container } from "@/lib/ui";

const title = "Services";
const description =
  "Infrastructure and environmental solutions from S.S. Solutions, including urban and municipal operations, waste to energy and infrastructure contracting.";

export const metadata = pageMetadata({ title, description, path: "/services" });

const steps = [
  {
    title: "Scope review",
    text: "We read the tender or request in full and check the scope, location and timeline against what we can deliver.",
  },
  {
    title: "Bid or proposal",
    text: "We prepare the bid or proposal with the documentation the issuing body requires.",
  },
  {
    title: "Mobilisation",
    text: "Once the work is awarded, we arrange the machinery, staff and supervision the contract calls for.",
  },
  {
    title: "Operation",
    text: "The work runs to the agreed scope, with records kept for the municipal body.",
  },
];

function ServiceVisual({ service }) {
  if (service.image) {
    const { illustrative } = service.image;
    return (
      <figure className="group relative">
        <div className="relative">
          <div className="reveal-wipe aspect-[4/3] overflow-hidden rounded-sm bg-ink/5">
            <Image
              src={service.image.src}
              alt={service.image.alt}
              width={service.image.width}
              height={service.image.height}
              sizes="(min-width: 768px) 40vw, 100vw"
              className="h-full w-full object-cover"
            />
          </div>
          <span className="absolute bottom-4 left-4 flex h-12 w-12 items-center justify-center rounded-full bg-paper text-ink">
            <ServiceIcon slug={service.slug} className="h-6 w-6" />
          </span>
        </div>
        {illustrative && (
          <figcaption className="mt-3 text-xs text-ink/50">Illustrative image</figcaption>
        )}
      </figure>
    );
  }

  return (
    <div className="group relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-sm bg-brand/10 text-ink">
      <svg
        aria-hidden="true"
        viewBox="0 0 200 200"
        fill="none"
        className="pointer-events-none absolute h-[135%] w-[135%] text-brand"
      >
        <circle cx="100" cy="100" r="96" stroke="currentColor" strokeWidth="0.4" className="draw" pathLength="1" />
        <circle cx="100" cy="100" r="74" stroke="currentColor" strokeWidth="0.4" className="draw" pathLength="1" style={{ "--delay": "200ms" }} />
        <circle cx="100" cy="100" r="52" stroke="currentColor" strokeWidth="0.4" className="draw" pathLength="1" style={{ "--delay": "400ms" }} />
      </svg>
      <ServiceIcon
        slug={service.slug}
        strokeWidth={0.8}
        className="relative h-28 w-28 transition-transform duration-700 ease-[cubic-bezier(0.2,0.7,0.1,1)] group-hover:scale-110 md:h-36 md:w-36"
      />
    </div>
  );
}

export default function ServicesPage() {
  return (
    <>
      <PageHero
        title={title}
        intro="Infrastructure and environmental work for the public and private sectors, scoped with care and carried out on the ground."
      />

      {/* Service details */}
      <section className="bg-paper">
        <div className={`${container} py-16 md:py-24`}>
          {services.map((service, i) => {
            const flip = i % 2 === 1;

            return (
              <article
                key={service.slug}
                id={service.slug}
                className="relative grid scroll-mt-8 gap-12 py-16 md:grid-cols-12 md:py-28"
              >
                <Reveal fade={false} className="absolute inset-x-0 top-0">
                  <span aria-hidden="true" className="draw-line block h-px bg-ink" />
                </Reveal>

                {/* Title and visual */}
                <Reveal
                  className={`self-start md:sticky md:top-10 md:col-span-5 ${
                    flip ? "md:order-2 md:col-start-8" : "md:order-1 md:col-start-1"
                  }`}
                >
                  <h2 className="text-[clamp(2.25rem,4vw,3.5rem)] leading-[1.04]">
                    {service.title}
                  </h2>
                  <p className="mt-4 max-w-sm leading-relaxed text-ink/60">{service.summary}</p>
                  <div className="mt-10">
                    <ServiceVisual service={service} />
                  </div>
                </Reveal>

                {/* Description and scope */}
                <Reveal
                  delay={120}
                  className={`md:col-span-6 md:pt-2 ${
                    flip ? "md:order-1 md:col-start-1" : "md:order-2 md:col-start-7"
                  }`}
                >
                  <p className="font-serif text-[clamp(1.3rem,1.9vw,1.7rem)] font-light leading-[1.4]">
                    {service.description}
                  </p>

                  <h3 className="mb-2 mt-14 font-sans text-sm font-normal tracking-normal text-ink/60">
                    What it covers
                  </h3>
                  <ul>
                    {service.scope.map((item) => (
                      <li
                        key={item}
                        className="group flex items-center gap-4 border-b border-ink/15 py-4 transition-[padding] duration-300 hover:pl-2"
                      >
                        <span
                          aria-hidden="true"
                          className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand transition-transform duration-300 group-hover:scale-[2]"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>

                  {service.related && (
                    <Link href={service.related.href} className="link-line mt-10 inline-block text-sm">
                      {service.related.label}
                    </Link>
                  )}
                </Reveal>
              </article>
            );
          })}
        </div>
      </section>

      {/* Process */}
      <section className="relative overflow-hidden bg-ink text-paper">
        <Reveal
          fade={false}
          className="pointer-events-none absolute -left-[34rem] top-10 h-[52rem] w-[52rem]"
        >
          <svg aria-hidden="true" className="h-full w-full text-brand/70" viewBox="0 0 200 200" fill="none">
            <circle cx="100" cy="100" r="99" stroke="currentColor" strokeWidth="0.25" className="draw" pathLength="1" />
          </svg>
        </Reveal>

        <div className={`${container} relative py-28 md:py-36`}>
          <Reveal>
            <h2 className="max-w-3xl text-[clamp(2.25rem,5vw,4.5rem)] leading-[1.05] md:ml-[16.66%]">
              How an engagement runs.
            </h2>
          </Reveal>

          <ol className="mt-20 grid gap-x-10 gap-y-14 sm:grid-cols-2 md:ml-[16.66%] lg:grid-cols-4">
            {steps.map((step, i) => (
              <Reveal as="li" key={step.title} delay={i * 140} className="relative pt-8">
                <span aria-hidden="true" className="draw-line absolute inset-x-0 top-0 h-px bg-paper/40" />
                <span className="font-serif text-5xl font-light text-brand">{i + 1}</span>
                <h3 className="mt-6 font-sans text-xl font-normal tracking-normal">{step.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-paper/75">{step.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <JsonLd data={webPageSchema({ path: "/services", name: `${title} | S.S. Solutions`, description })} />
      <JsonLd data={servicesSchema(services)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ])}
      />
    </>
  );
}