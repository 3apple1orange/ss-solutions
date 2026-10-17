import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { site, orgId } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import { container } from "@/lib/ui";

const title = "Contact";
const description =
  "Contact S.S. Solutions about municipal contracts, public tenders and mechanised road sweeping work in Haryana.";

export const metadata = pageMetadata({ title, description, path: "/contact" });

export default function ContactPage() {
  const { email, phone, address } = site.contact;

  const details = [
    email && { label: "Email", value: <a href={`mailto:${email}`} className="link-grow">{email}</a> },
    phone && { label: "Phone", value: <a href={`tel:${phone.replace(/\s/g, "")}`} className="link-grow">{phone}</a> },
    address && {
      label: "Registered office",
      value: (
        <address className="not-italic leading-relaxed">
          {address.streetAddress}
          <br />
          {address.addressLocality}, {address.addressRegion} {address.postalCode}
        </address>
      ),
    },
        { label: "Geographic focus", value: site.geographicFocus.join(", ") },
    { label: "Proprietor", value: site.proprietor.name },
  ].filter(Boolean);

  return (
    <>
      <PageHero
        title={title}
                intro="For municipal contracts, tenders and partnerships. Share the scope, and we will respond."
      />

      <section className="bg-paper">
        <div className={`${container} py-24 md:py-32`}>
          <div className="relative grid gap-16 pt-12 md:grid-cols-12">
            <Reveal fade={false} className="absolute inset-x-0 top-0">
              <span aria-hidden="true" className="draw-line block h-px bg-ink" />
            </Reveal>

            <Reveal className="self-start md:sticky md:top-10 md:col-span-4">
              <h2 className="text-[clamp(2.25rem,4.2vw,3.75rem)] leading-[1.04]">Send an enquiry</h2>
              <p className="mt-6 max-w-sm leading-relaxed text-ink/70">
                Share the scope, location and timeline of the work. Enquiries
                from municipal bodies, government departments and contractors
                are welcome.
              </p>

              <dl className="mt-12 border-t border-ink/15">
                {details.map((d) => (
                  <div key={d.label} className="border-b border-ink/15 py-4">
                    <dt className="text-sm text-ink/60">{d.label}</dt>
                    <dd className="mt-1">{d.value}</dd>
                  </div>
                ))}
              </dl>

              <p className="mt-10 max-w-sm text-sm leading-relaxed text-ink/60">
                For press or personal enquiries, visit{" "}
                <a href={site.proprietor.aboutUrl} className="link-line text-ink">
                  manansingla.com
                </a>
                .
              </p>
            </Reveal>

            <Reveal delay={150} className="md:col-span-7 md:col-start-6">
              <ContactForm />
            </Reveal>
          </div>

          <p className="mt-20 text-sm text-ink/50">
            Looking for what we do first? See our{" "}
            <Link href="/services" className="link-line text-ink">services</Link>{" "}
            and{" "}
            <Link href="/projects" className="link-line text-ink">current project</Link>.
          </p>
        </div>
      </section>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "@id": `${site.url}/contact#webpage`,
          url: `${site.url}/contact`,
          name: `${title} | ${site.name}`,
          description,
          isPartOf: { "@id": `${site.url}/#website` },
          mainEntity: { "@id": orgId },
        }}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: title, path: "/contact" },
        ])}
      />
    </>
  );
}