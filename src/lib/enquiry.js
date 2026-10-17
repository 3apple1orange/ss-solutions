export const enquiryTypes = [
  "Municipal contract",
  "Tender or bid",
  "Subcontracting or partnership",
  "Other",
];

export function validateEnquiry(d) {
  const errors = {};
  if (!String(d.name || "").trim()) errors.name = "Enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(d.email || "").trim())) {
    errors.email = "Enter a valid email address.";
  }
  if (!enquiryTypes.includes(d.type)) errors.type = "Choose what the enquiry is about.";
  if (String(d.message || "").trim().length < 20) {
    errors.message = "Describe the work in at least 20 characters.";
  }
  return errors;
}