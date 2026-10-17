import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";
import { site } from "@/lib/site";
import { container } from "@/lib/ui";

export default function LegalPage({ title, intro, path, description, updated, sections }) {
  return (
    <>
      <PageHero title={title} intro={intro} />

      <section className="bg-paper">
        <div className={`${container} py-24 lg:py-32`}>
          <div className="max-w-2xl lg:ml-[33.33%]">
            <p className="text-sm text-ink/60">Last updated {updated}</p>
            {sections.map((s) => (
              <div key={s.heading} className="mt-12 border-t border-ink/15 pt-8">
                <h2 className="text-[clamp(1.5rem,2.4vw,2rem)] leading-tight">{s.heading}</h2>
                {s.body.map((para, i) => (
                  <p key={i} className="mt-4 leading-relaxed text-ink/80">
                    {para}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <JsonLd data={webPageSchema({ path, name: `${title} | ${site.name}`, description })} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: title, path },
        ])}
      />
    </>
  );
}