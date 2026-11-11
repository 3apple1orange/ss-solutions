import Link from "next/link";
import Button from "@/components/Button";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import ProjectGallery from "@/components/ProjectGallery";
import Reveal from "@/components/Reveal";
import { projects } from "@/lib/projects";
import { services } from "@/lib/services";
import { site, orgId } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";
import { container } from "@/lib/ui";



const title = "Projects";
const description =
  "Documented projects by S.S. Solutions, including mechanised road sweeping for the Municipal Council, Thanesar, in Kurukshetra, Haryana.";

export const metadata = pageMetadata({ title, description, path: "/projects" });

function LiveDot() {
  return (
    <span aria-hidden="true" className="relative flex h-2 w-2">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-75" />
      <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
    </span>
  );
}

function projectFacts(project) {
  const service = services.find((s) => s.slug === project.serviceSlug);
  const d = project.details;

  return [
    { label: "Location", value: project.location },
    service && {
      label: "Service",
      value: (
        <Link href={`/services#${service.slug}`} className="link-grow">
          {service.title}
        </Link>
      ),
    },
    d.client && { label: "Client", value: d.client },
    d.role && { label: "Role", value: d.role },
    d.contractType && { label: "Engagement", value: d.contractType },
    d.started && { label: "Started", value: d.started },
    d.machine && { label: "Machine", value: d.machine },
    {
      label: "Status",
      value: (
        <span className="inline-flex items-center gap-3">
          <LiveDot />
          {project.status}
        </span>
      ),
    },
  ].filter(Boolean);
}

export default function ProjectsPage() {
  const allPhotos = projects.flatMap((p) => p.photos || []);

  return (
    <>
      <PageHero
        title={title}
        intro="Documented work for municipal bodies. Each engagement is listed once its records are in place."
      />

      {projects.map((project) => (
        <section key={project.slug} id={project.slug} className="scroll-mt-8 bg-paper">
          <div className={`${container} py-24 md:py-32`}>
            <article className="relative grid gap-12 pt-12 md:grid-cols-12">
              <Reveal fade={false} className="absolute inset-x-0 top-0">
                <span aria-hidden="true" className="draw-line block h-px bg-ink" />
              </Reveal>

              <Reveal className="self-start md:sticky md:top-10 md:col-span-5">
                <h2 className="text-[clamp(2.25rem,4.2vw,3.75rem)] leading-[1.04]">
                  {project.title}
                </h2>
                <p className="mt-6 text-ink/60">{project.location}</p>
              </Reveal>

              <Reveal delay={120} className="md:col-span-6 md:col-start-7">
                {project.overview.map((para, i) => (
                  <p
                    key={i}
                    className={`font-serif text-[clamp(1.25rem,1.8vw,1.6rem)] font-light leading-[1.4] ${i > 0 ? "mt-6" : ""}`}
                  >
                    {para}
                  </p>
                ))}

                <dl className="mt-14 border-t border-ink/15">
                  {projectFacts(project).map((fact) => (
                    <div
                      key={fact.label}
                      className="grid grid-cols-3 gap-4 border-b border-ink/15 py-4"
                    >
                      <dt className="text-sm text-ink/60">{fact.label}</dt>
                      <dd className="col-span-2">{fact.value}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            </article>

            <ProjectGallery photos={project.photos} title={project.title} />
          </div>
        </section>
      ))}

      {/* Closing band */}
      <section className="relative overflow-hidden bg-ink text-paper">
        <Reveal
          fade={false}
          className="pointer-events-none absolute -right-[28rem] -top-40 h-[52rem] w-[52rem]"
        >
          <svg aria-hidden="true" className="h-full w-full text-brand/70" viewBox="0 0 200 200" fill="none">
            <circle cx="100" cy="100" r="99" stroke="currentColor" strokeWidth="0.25" className="draw" pathLength="1" />
          </svg>
        </Reveal>

        <div className={`${container} relative py-28 md:py-36`}>
          <div className="max-w-3xl md:ml-[16.66%]">
            <Reveal>
              <h2 className="text-[clamp(2.25rem,5vw,4.5rem)] leading-[1.05]">
                Only documented work is listed here.
              </h2>
            </Reveal>
            <Reveal delay={150}>
              <p className="mt-8 max-w-xl leading-relaxed text-paper/75">
                As new engagements begin and their records are in place, they
                are added to this page with photographs from the site.
              </p>
            </Reveal>
            <Reveal delay={300}>
              <Button href="/contact" variant="solid-dark" className="mt-12">
                Discuss a project
              </Button>
            </Reveal>
          </div>
        </div>
      </section>

      <JsonLd data={webPageSchema({ path: "/projects", name: `${title} | ${site.name}`, description })} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: title, path: "/projects" },
        ])}
      />
      {allPhotos.length > 0 && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
              "@graph": allPhotos.map((photo) => ({
              "@type": "ImageObject",
              contentUrl: `${site.url}${photo.src}`,
              caption: photo.caption || photo.alt,
              creator: { "@id": orgId },
              copyrightHolder: { "@id": orgId },
              creditText: site.name,
              copyrightNotice: `© ${new Date().getFullYear()} ${site.name}`,
              license: `${site.url}/terms`,
              acquireLicensePage: `${site.url}/contact`,
            })),
          }}
        />
      )}
    </>
  );
}