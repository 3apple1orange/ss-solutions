import { site, orgId } from "@/lib/site";

const abs = (path) => `${site.url}${path}`;
const places = () => site.areaServed.map((name) => ({ "@type": "Place", name }));

// The organization, linked to Manan Singla's central Person entity by @id only
export function organizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": orgId,
    name: site.name,
    url: `${site.url}/`,
    description: site.description,
    foundingDate: site.foundingDate,
    founder: { "@id": site.proprietor.id },
    areaServed: places(),
  };

  if (site.legalName) schema.legalName = site.legalName;
  if (site.images.logo) schema.logo = abs(site.images.logo);
  if (site.contact.email) schema.email = site.contact.email;
  if (site.contact.phone) schema.telephone = site.contact.phone;
  if (site.contact.address) {
    schema.address = { "@type": "PostalAddress", ...site.contact.address };
  }

  return schema;
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: `${site.url}/`,
    name: site.name,
    inLanguage: "en-IN",
    publisher: { "@id": orgId },
  };
}

export function webPageSchema({ path, name, description }) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${abs(path)}#webpage`,
    url: abs(path),
    name,
    description,
    isPartOf: { "@id": `${site.url}/#website` },
    about: { "@id": orgId },
  };
}

export function breadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: abs(item.path),
    })),
  };
}

export function servicesSchema(list) {
  return {
    "@context": "https://schema.org",
    "@graph": list.map((s) => ({
      "@type": "Service",
      "@id": `${site.url}/services#${s.slug}`,
      name: s.title,
      serviceType: s.title,
      description: s.summary,
      url: `${site.url}/services#${s.slug}`,
      provider: { "@id": orgId },
      areaServed: places(),
    })),
  };
}