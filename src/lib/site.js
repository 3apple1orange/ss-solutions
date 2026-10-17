// Single source of truth for S.S. Solutions.

export const site = {
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://thesssolutions.in",

  name: "S.S. Solutions",
  legalName: "S.S. Solutions",
  entityType: "Sole Proprietorship",
  foundingDate: "2025-04-01",
  foundedLabel: "Established in April 2025",

  title: "S.S. Solutions | Municipal Operations and Public Systems",
  description:
    "We are the contractors behind progress. From mechanised sweeping and urban operations to waste to energy, sustainable infrastructure and civil development.",
  shortIntro:
    "Mechanised road sweeping and municipal operations, delivered under contract in Kurukshetra, Haryana.",

  locale: "en_IN",
  areaServed: ["Kurukshetra", "Delhi NCR", "Telangana", "Dubai", "Barcelona"],
  geographicFocus: ["Kurukshetra", "Delhi NCR", "Telangana", "Dubai", "Barcelona"],

  contact: {
    email: "m@manansingla.com", // switch to the S.S. Solutions mailbox once it exists
    phone: null,
    address: {
      streetAddress: "Sector 33",
      addressLocality: "Kaithal",
      addressRegion: "Haryana",
      postalCode: "136027",
      addressCountry: "IN",
    },
  },

  proprietor: {
    name: "Manan Singla",
    title: "Proprietor",
    id: "https://www.manansingla.com/#person",
    url: "https://www.manansingla.com/",
    aboutUrl: "https://www.manansingla.com",
  },

  related: {
    ectoUrl: "https://www.ectoindia.com/",
    bookUrl: "https://www.meetmeinthebackyard.com",
  },

  images: {
    og: "/images/og-ss-solutions.jpg", // 1200 x 630
    logo: "/images/ss-solutions-logo.svg",
  },
};

export const orgId = `${site.url}/#organization`;