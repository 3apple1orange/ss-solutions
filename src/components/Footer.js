import Link from "next/link";
import Button from "@/components/Button";
import Wordmark from "@/components/Wordmark";
import { site } from "@/lib/site";
import { legalNavigation, navigation } from "@/lib/navigation";

const colHeading = "mb-4 text-sm text-ink/60";
const colLink = "text-sm link-grow";

export default function Footer() {
  const year = new Date().getFullYear();
  const { address } = site.contact;

  return (
    <footer className="bg-paper text-ink">
      <div className="mx-auto max-w-360 px-6 md:px-14">
        <div className="grid gap-12 border-t border-ink pb-20 pt-10 sm:grid-cols-2 lg:grid-cols-12">
          <div className="sm:col-span-2 lg:col-span-5">
            <h2 className="max-w-md text-4xl leading-[1.1] md:text-[2.75rem]">
              Have a municipal or tender requirement?
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-relaxed">
              Share the scope, location and timeline of the work, and we will
              respond with how we can help.
            </p>
            <Button href="/contact" className="mt-8">
              Send an enquiry
            </Button>
          </div>

          <nav aria-label="Footer" className="lg:col-span-2 lg:col-start-7">
            <p className={colHeading}>Pages</p>
            <ul className="space-y-2">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={colLink}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-2">
            <p className={colHeading}>Related</p>
            <ul className="space-y-2">
              <li>
                <a href={site.proprietor.aboutUrl} className={colLink}>
                  {site.proprietor.name}
                </a>
              </li>
              <li>
                <a href={site.related.ectoUrl} className={colLink}>
                  ECTO India
                </a>
              </li>
              <li>
                <a href={site.related.bookUrl} className={colLink}>
                  Meet Me in the Backyard
                </a>
              </li>
            </ul>
          </div>

          <div className="sm:col-span-2 lg:col-span-2">
            <p className={colHeading}>Contact</p>
            <ul className="space-y-2 text-sm">
              {site.contact.email ? (
                <li>
                  <a href={`mailto:${site.contact.email}`} className={colLink}>
                    {site.contact.email}
                  </a>
                </li>
              ) : (
                <li>
                  <Link href="/contact" className={colLink}>
                    Enquiry form
                  </Link>
                </li>
              )}
              <li>
                {address.addressLocality}, {address.addressRegion}, India
              </li>
              <li>{site.foundedLabel}</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-ink pt-6">
          <Wordmark as="p" text={site.name} animate={false} aria-hidden="true" />
          <div className="flex flex-col gap-3 py-8 text-xs text-ink/60 md:flex-row md:items-center md:justify-between">
            <p>
              © {year} {site.name}. {site.entityType}. {site.proprietor.title}: {site.proprietor.name}
            </p>
            <ul className="flex gap-6">
              {legalNavigation.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="link-grow">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}