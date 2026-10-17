import LegalPage from "@/components/LegalPage";
import { site } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

const title = "Privacy";
const description = "How S.S. Solutions collects and uses information sent through this website.";

export const metadata = pageMetadata({ title, description, path: "/privacy" });

const sections = [
  {
    heading: "Who we are",
    body: [
      `This website is operated by ${site.name}, a sole proprietorship registered in ${site.contact.address.addressLocality}, ${site.contact.address.addressRegion}, India. For any question about this policy, write to ${site.contact.email}.`,
    ],
  },
  {
    heading: "What we collect",
    body: [
      "When you send an enquiry, we receive the details you enter: your name, organisation, email address, phone number, the location of the work and your message.",
      "If analytics is switched on, we also receive general usage information such as the pages visited, the type of device and an approximate location. This does not identify you personally.",
    ],
  },
  {
    heading: "How we use it",
    body: [
      "Enquiry details are used only to reply to you and to discuss the work you describe. We do not sell or share them for marketing.",
      "Usage information helps us understand which pages are useful and improve the website.",
    ],
  },
  {
    heading: "Services that process data for us",
    body: [
      "Enquiries are delivered to us by email through Resend, an email delivery service. The website is hosted on Cloudflare, which processes technical information such as IP addresses to keep the site secure and available. If analytics is switched on, Google Analytics processes usage information and may set cookies.",
    ],
  },
  {
    heading: "How long we keep it",
    body: [
      "We keep enquiry emails for as long as needed to respond and to keep a record of our correspondence, after which they are deleted.",
    ],
  },
  {
    heading: "Your choices",
    body: [
      `You can ask to see, correct or delete the information you have sent us by writing to ${site.contact.email}. You can also block or delete cookies in your browser settings.`,
    ],
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      title={title}
      intro="How information sent through this website is collected, used and protected."
      path="/privacy"
      description={description}
      updated="October 2026"
      sections={sections}
    />
  );
}