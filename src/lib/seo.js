import { site } from "@/lib/site";

export function pageMetadata({ title, description, path, absoluteTitle = false }) {
  const fullTitle = absoluteTitle ? title : `${title} | ${site.name}`;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: site.locale,
      siteName: site.name,
      url: path,
      title: fullTitle,
      description,
      images: [
        { url: site.images.og, width: 1200, height: 630, alt: site.name },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [site.images.og],
    },
  };
}