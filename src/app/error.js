"use client";

import Link from "next/link";
import { container } from "@/lib/ui";

export default function Error({ reset }) {
  return (
    <section className="bg-brand text-ink">
      <div className={`${container} pb-28 pt-36 lg:pt-48`}>
        <h1 className="max-w-2xl text-[clamp(2.25rem,4.5vw,4rem)] leading-[1.05]">
          Something went wrong on this page.
        </h1>
        <p className="mt-6 max-w-md leading-relaxed">
          Please try again. If the problem continues, return to the homepage.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <button type="button" onClick={() => reset()} className="btn btn-outline">
            <span className="btn-label">
              <span>Try again</span>
              <span aria-hidden="true">Try again</span>
            </span>
          </button>
          <Link href="/" className="btn btn-outline">
            <span className="btn-label">
              <span>Back to the homepage</span>
              <span aria-hidden="true">Back to the homepage</span>
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}