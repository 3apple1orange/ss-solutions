"use client";

import { useState } from "react";
import Reveal from "@/components/Reveal";
import { enquiryTypes, validateEnquiry } from "@/lib/enquiry";

function Field({ label, name, type = "text", required = false, error, defaultValue, autoComplete, multiline = false }) {
  const id = `field-${name}`;
  const Input = multiline ? "textarea" : "input";

  return (
    <div>
      <label htmlFor={id} className="block text-sm text-ink/60">
        {label}
        {!required && " (optional)"}
      </label>
      <div className="relative">
        <Input
          id={id}
          name={name}
          type={multiline ? undefined : type}
          rows={multiline ? 5 : undefined}
          required={required}
          defaultValue={defaultValue}
          autoComplete={autoComplete}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className="peer mt-2 block w-full resize-y border-0 border-b border-ink/30 bg-transparent px-0 py-3 text-lg outline-none transition-colors focus:border-ink aria-[invalid=true]:border-red-700"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-brand transition-transform duration-500 ease-[cubic-bezier(0.7,0,0.2,1)] peer-focus:scale-x-100"
        />
      </div>
      {error && (
        <p id={`${id}-error`} className="mt-2 text-sm text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}

function Success() {
  return (
    <Reveal className="py-6" role="status">
      <svg aria-hidden="true" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-16 w-16 text-brand">
        <circle cx="24" cy="24" r="22" className="draw" pathLength="1" />
        <path d="M15 24.5l6 6 12-13" className="draw" pathLength="1" style={{ "--delay": "500ms" }} />
      </svg>
      <h2 className="mt-8 text-[clamp(1.9rem,3.2vw,3rem)] leading-[1.1]">
        Thank you. Your enquiry has been sent.
      </h2>
      <p className="mt-4 max-w-md leading-relaxed text-ink/70">
        We will reply to the email address you provided.
      </p>
    </Reveal>
  );
}

export default function ContactForm() {
  const [state, setState] = useState({ status: "idle" });
  const [pending, setPending] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const values = Object.fromEntries(formData);

    const errors = validateEnquiry(values);
    if (Object.keys(errors).length) {
      setState({ status: "error", errors, values, attempt: Date.now() });
      return;
    }

    setPending(true);
    try {
      // The email function runs only on Cloudflare; in local development the enquiry is just logged
      if (process.env.NODE_ENV === "development") {
        console.log("Enquiry (development only, not sent):", values);
        setState({ status: "success" });
        return;
      }

      const res = await fetch("/api/enquiry", { method: "POST", body: formData });
      const data = await res.json().catch(() => ({}));

      if (res.ok && data.status === "success") {
        setState({ status: "success" });
      } else {
        setState({
          status: "error",
          errors: data.errors,
          message: data.errors
            ? undefined
            : data.message || "Your enquiry could not be sent. Please try again in a few minutes.",
          values,
          attempt: Date.now(),
        });
      }
    } catch {
      setState({
        status: "error",
        message: "Your enquiry could not be sent. Please check your connection and try again.",
        values,
        attempt: Date.now(),
      });
    } finally {
      setPending(false);
    }
  }

  if (state.status === "success") return <Success />;

  const v = state.values || {};
  const e = state.errors || {};

  return (
    <form key={state.attempt || 0} onSubmit={handleSubmit} noValidate className="space-y-12">
      {state.message && (
        <p role="alert" className="border-l-2 border-red-700 pl-4 text-red-700">
          {state.message}
        </p>
      )}

      <fieldset aria-describedby={e.type ? "type-error" : undefined}>
        <legend className="text-sm text-ink/60">What is the enquiry about?</legend>
        <div className="mt-4 flex flex-wrap gap-3">
          {enquiryTypes.map((t) => (
            <label key={t} className="cursor-pointer">
              <input type="radio" name="type" value={t} defaultChecked={v.type === t} className="peer sr-only" />
              <span className="inline-block rounded-full border border-ink/30 px-5 py-2.5 text-sm transition-colors duration-300 hover:border-ink peer-checked:border-ink peer-checked:bg-ink peer-checked:text-paper peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ink">
                {t}
              </span>
            </label>
          ))}
        </div>
        {e.type && (
          <p id="type-error" className="mt-3 text-sm text-red-700">
            {e.type}
          </p>
        )}
      </fieldset>

      <div className="grid gap-12 sm:grid-cols-2">
        <Field label="Name" name="name" required autoComplete="name" error={e.name} defaultValue={v.name} />
        <Field label="Organisation" name="organisation" autoComplete="organization" defaultValue={v.organisation} />
        <Field label="Email" name="email" type="email" required autoComplete="email" error={e.email} defaultValue={v.email} />
        <Field label="Phone" name="phone" type="tel" autoComplete="tel" defaultValue={v.phone} />
      </div>

      <Field label="Location of the work" name="location" defaultValue={v.location} />
      <Field label="Scope and timeline" name="message" required multiline error={e.message} defaultValue={v.message} />

      <div aria-hidden="true" className="hidden">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <button type="submit" disabled={pending} className="btn btn-solid disabled:cursor-wait disabled:opacity-70">
        <span className="btn-label">
          <span>{pending ? "Sending..." : "Send enquiry"}</span>
          <span aria-hidden="true">{pending ? "Sending..." : "Send enquiry"}</span>
        </span>
      </button>
    </form>
  );
}