import Link from "next/link";
import Reveal from "@/components/Reveal";
import ServiceIcon from "@/components/ServiceIcon";

export default function ServiceCard({ service, delay = 0 }) {
  return (
    <Reveal as="li" delay={delay}>
      <Link
        href={`/services#${service.slug}`}
        className="group relative flex h-full flex-col pb-12"
      >
        <span className="flex h-16 w-16 items-center justify-center rounded-full border border-paper/25 text-brand transition-colors duration-500 group-hover:border-brand group-hover:bg-brand group-hover:text-ink">
          <ServiceIcon slug={service.slug} className="h-8 w-8" />
        </span>

        <h3 className="mt-10 font-sans text-2xl font-normal tracking-normal transition-transform duration-500 group-hover:translate-x-2">
          {service.title}
        </h3>
        <p className="mt-5 max-w-sm text-sm leading-relaxed text-paper/75 transition-colors duration-500 group-hover:text-paper">
          {service.summary}
        </p>

        <span aria-hidden="true" className="draw-line absolute inset-x-0 bottom-0 h-px bg-paper/40" />
        <span
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-0.5 origin-right scale-x-0 bg-brand transition-transform duration-700 ease-[cubic-bezier(0.7,0,0.2,1)] group-hover:origin-left group-hover:scale-x-100"
        />
      </Link>
    </Reveal>
  );
}