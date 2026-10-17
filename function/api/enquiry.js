// Cloudflare Pages Function: POST /api/enquiry
// Needs these variables in Cloudflare: RESEND_API_KEY, CONTACT_TO_EMAIL, optional CONTACT_FROM_EMAIL

const TYPES = ["Municipal contract", "Tender or bid", "Subcontracting or partnership", "Other"];

const clean = (value, max) => String(value ?? "").trim().slice(0, max);

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });

export async function onRequestPost({ request, env }) {
  let form;
  try {
    form = await request.formData();
  } catch {
    return json({ status: "error", message: "The request could not be read." }, 400);
  }

  // Spam trap: real visitors never fill this hidden field
  if (form.get("website")) return json({ status: "success" });

  const d = {
    name: clean(form.get("name"), 120),
    organisation: clean(form.get("organisation"), 160),
    email: clean(form.get("email"), 200),
    phone: clean(form.get("phone"), 40),
    type: clean(form.get("type"), 60),
    location: clean(form.get("location"), 160),
    message: clean(form.get("message"), 5000),
  };

  const errors = {};
  if (!d.name) errors.name = "Enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email)) errors.email = "Enter a valid email address.";
  if (!TYPES.includes(d.type)) errors.type = "Choose what the enquiry is about.";
  if (d.message.length < 20) errors.message = "Describe the work in at least 20 characters.";
  if (Object.keys(errors).length) return json({ status: "error", errors }, 400);

  if (!env.RESEND_API_KEY || !env.CONTACT_TO_EMAIL) {
    return json({ status: "error", message: "The enquiry form is not available right now. Please try again later." }, 500);
  }

  const text = [
    `Name: ${d.name}`,
    `Organisation: ${d.organisation || "Not given"}`,
    `Email: ${d.email}`,
    `Phone: ${d.phone || "Not given"}`,
    `Enquiry type: ${d.type}`,
    `Location of work: ${d.location || "Not given"}`,
    "",
    d.message,
  ].join("\n");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: env.CONTACT_FROM_EMAIL || "S.S. Solutions <onboarding@resend.dev>",
      to: [env.CONTACT_TO_EMAIL],
      reply_to: d.email,
      subject: `New enquiry: ${d.type} from ${d.name}`,
      text,
    }),
  });

  if (!res.ok) {
    return json({ status: "error", message: "Your enquiry could not be sent. Please try again in a few minutes." }, 502);
  }
  return json({ status: "success" });
}