import { site } from "@/lib/site";

export const dynamic = "force-static";

const routes = ["/", "/about", "/services", "/projects", "/contact", "/privacy", "/terms"];

export default function sitemap() {
  const lastModified = new Date();
  return routes.map((route) => ({
    url: route === "/" ? `${site.url}/` : `${site.url}${route}`,
    lastModified,
  }));
}