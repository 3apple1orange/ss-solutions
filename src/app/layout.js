import { Newsreader, Public_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Analytics from "@/components/Analytics";
import JsonLd from "@/components/JsonLd";
import { site } from "@/lib/site";
import { organizationSchema, websiteSchema } from "@/lib/schema";

const newsreader = Newsreader({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-newsreader",
  display: "swap",
});

const publicSans = Public_Sans({
  subsets: ["latin"],
  variable: "--font-public-sans",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  openGraph: {
    type: "website",
    locale: site.locale,
    siteName: site.name,
    images: [{ url: site.images.og, width: 1200, height: 630, alt: site.name }],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport = {
  themeColor: "#22a052",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-IN" className={`${newsreader.variable} ${publicSans.variable}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-paper focus:px-4 focus:py-2"
        >
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <JsonLd data={organizationSchema()} />
        <JsonLd data={websiteSchema()} />
                <Analytics />
      </body>
    </html>
  );
}