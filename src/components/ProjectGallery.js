import Image from "next/image";
import Reveal from "@/components/Reveal";

// Repeating editorial layout: large, offset small, inset, offset wide
const layout = [
  { box: "md:col-span-7", sizes: "(min-width: 768px) 58vw, 100vw" },
  { box: "md:col-span-4 md:col-start-9 md:mt-40", sizes: "(min-width: 768px) 33vw, 100vw" },
  { box: "md:col-span-5 md:col-start-2", sizes: "(min-width: 768px) 42vw, 100vw" },
  { box: "md:col-span-5 md:col-start-8 md:mt-28", sizes: "(min-width: 768px) 42vw, 100vw" },
];

export default function ProjectGallery({ photos, title }) {
  if (!photos?.length) return null;

  return (
    <div className="mt-28 md:mt-40">
      <Reveal className="flex flex-col gap-3 border-t border-ink pt-8 md:flex-row md:items-baseline md:justify-between">
        <h3 className="text-[clamp(1.75rem,3vw,2.5rem)] leading-tight">From the site</h3>
        <p className="text-sm text-ink/60">{title}</p>
      </Reveal>

      <div className="mt-14 grid gap-y-14 md:grid-cols-12 md:gap-x-8 md:gap-y-24">
        {photos.map((photo, i) => {
          const slot = layout[i % layout.length];
          return (
            <Reveal as="figure" key={photo.src} fade={false} delay={(i % 2) * 150} className={slot.box}>
              <div className="reveal-wipe overflow-hidden rounded-sm bg-ink/5">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  width={photo.width}
                  height={photo.height}
                  sizes={slot.sizes}
                  className="h-auto w-full"
                />
              </div>
              {photo.caption && (
                <figcaption className="mt-4 flex justify-between gap-6 text-sm text-ink/60">
                  <span>{photo.caption}</span>
                  {photo.date && <span className="shrink-0">{photo.date}</span>}
                </figcaption>
              )}
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}