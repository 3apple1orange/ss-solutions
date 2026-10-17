import LegalPage from "@/components/LegalPage";
import { site } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

const title = "Terms";
const description = "Terms for using the S.S. Solutions website.";

export const metadata = pageMetadata({ title, description, path: "/terms" });

const sections = [
  {
    heading: "Using this website",
    body: [
      `This website is operated by ${site.name}. By using it, you agree to these terms. If you do not agree, please do not use the website.`,
    ],
  },
  {
    heading: "Information on this website",
    body: [
      "The content on this website is provided for general information about the firm and its work. It is not an offer, quotation or contract. Any work is agreed only through a separate written contract or work order.",
      "We aim to keep the information accurate and current, but we do not guarantee that it is complete or free of errors.",
    ],
  },
  {
    heading: "Ownership of content",
    body: [
      `The text, photographs, logo and design of this website belong to ${site.name} unless stated otherwise. They may not be copied or reused without written permission.`,
    ],
  },
  {
    heading: "Links to other websites",
    body: [
      "This website links to other websites, including those of related ventures. We are not responsible for the content or practices of those websites.",
    ],
  },
  {
    heading: "Liability",
    body: [
      "To the extent permitted by law, we are not liable for any loss arising from the use of this website or reliance on its content.",
    ],
  },
  {
    heading: "Governing law",
    body: [
      "These terms are governed by the laws of India. Questions about them can be sent to " + site.contact.email + ".",
    ],
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      title={title}
      intro="The terms that apply when you use this website."
      path="/terms"
      description={description}
      updated="October 2026"
      sections={sections}
    />
  );
}