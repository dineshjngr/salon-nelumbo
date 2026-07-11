import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { images, type ImageKey } from "@/src/data/images";

type ServiceCardProps = {
  title: string;
  description: string;
  imageKey: string;
  href: string;
};

export function ServiceCard({ title, description, imageKey, href }: ServiceCardProps) {
  const image = images[imageKey as ImageKey];

  return (
    <article className="group overflow-hidden rounded-3xl border border-plum/10 bg-white shadow-minimal transition hover:-translate-y-1 hover:shadow-soft motion-reduce:transition-none motion-reduce:hover:translate-y-0">
      <Link href={href} className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-plum">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition duration-500 group-hover:scale-105 motion-reduce:transition-none"
          />
        </div>
        <div className="p-6">
          <h3 className="font-serif text-2xl font-semibold text-plum">{title}</h3>
          <p className="mt-3 text-sm leading-7 text-muted">{description}</p>
          <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-pink">
            View Services
            <ArrowRight aria-hidden="true" className="h-4 w-4 transition group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0" />
          </span>
        </div>
      </Link>
    </article>
  );
}
