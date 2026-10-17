"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/lib/site";
import { legalNavigation, navigation } from "@/lib/navigation";

const navText = "text-[0.8125rem] uppercase tracking-[0.08em]";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href) => pathname === href || pathname.startsWith(`${href}/`);
  const close = () => setOpen(false);

  const footerLinks = [
    ...legalNavigation,
    { label: site.proprietor.name, href: site.proprietor.aboutUrl, external: true },
    { label: "ECTO India", href: site.related.ectoUrl, external: true },
  ];

  return (
    <header className="absolute inset-x-0 top-0 z-40">
      <div className="relative z-50 mx-auto flex max-w-360 items-center justify-between px-6 py-7 md:px-14">
        <Link href="/" onClick={close} className={`${navText} flex items-center gap-3`}>
          {site.images.logo && (
              <Image
              src={site.images.logo}
              alt=""
              width={30}
              height={28}
              priority
              className="h-7"
              style={{ width: "auto" }}
            />
          )}
          {site.name}
        </Link>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-10">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`${navText} link-grow`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          className={`${navText} md:hidden`}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      <div
        id="mobile-menu"
        hidden={!open}
        className="fixed inset-0 z-40 overflow-y-auto bg-brand text-ink md:hidden"
      >
        <div className="flex min-h-full flex-col px-6 pb-8 pt-24">
          <nav aria-label="Mobile">
            <ol className="border-t border-ink/25">
              {navigation.map((item, i) => (
                <li key={item.href} className="border-b border-ink/25">
                  <Link
                    href={item.href}
                    onClick={close}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className="flex items-baseline gap-5 py-5"
                  >
                    <span className="w-6 text-sm text-ink/60">{String(i + 1).padStart(2, "0")}</span>
                    <span className="font-serif text-4xl font-light leading-none">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ol>
          </nav>

          <ul className="mt-10 grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
            {footerLinks.map((item) => (
              <li key={item.href}>
                {item.external ? (
                  <a href={item.href} className="link-grow">{item.label}</a>
                ) : (
                  <Link href={item.href} onClick={close} className="link-grow">{item.label}</Link>
                )}
              </li>
            ))}
          </ul>

          <div className="mt-auto border-t border-ink/25 pt-6 text-sm">
            {site.contact.email && (
              <a href={`mailto:${site.contact.email}`} className="link-grow">{site.contact.email}</a>
            )}
            <p className="mt-2 text-ink/70">
              {site.contact.address.addressLocality}, {site.contact.address.addressRegion}, India
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}