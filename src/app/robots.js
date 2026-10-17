import { site } from "@/lib/site";

export const dynamic = "force-static";

// Preview links on *.pages.dev are blocked separately in public/_headers
export default function robots() {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
  };
}