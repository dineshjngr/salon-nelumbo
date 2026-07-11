import Image from "next/image";
import Link from "next/link";
import { Clock, MapPin, Sparkles } from "lucide-react";
import { images } from "@/src/data/images";
import { salon } from "@/src/data/site-data";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-ivory via-[#fffdfb] to-blush pt-28">
      <div className="absolute right-[-8rem] top-16 h-80 w-80 rounded-full bg-pink/15 blur-3xl" />
      <div className="absolute bottom-10 left-[-10rem] h-96 w-96 rounded-full bg-gold/15 blur-3xl" />
      <div className="mx-auto grid min-h-[calc(100vh-2rem)] max-w-7xl items-center gap-12 px-5 pb-16 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:pt-4">
        <div className="relative z-10">
          <p className="mb-4 inline-flex rounded-full border border-gold/30 bg-white/70 px-4 py-2 text-sm font-semibold uppercase tracking-[0.18em] text-plum shadow-sm">
            Beauty, Care & Relaxation
          </p>
          <h1 className="max-w-3xl font-serif text-5xl font-semibold leading-[1.02] text-plum sm:text-6xl lg:text-7xl">
            Feel Beautiful. Look Confident.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-muted">
            Professional hair, beauty, nail and relaxation services created to
            help you look and feel your best.
          </p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <a
              href={salon.bookingWhatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-plum px-7 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-pink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-plum motion-reduce:transition-none motion-reduce:hover:translate-y-0"
            >
              Book an Appointment
            </a>
            <Link
              href="/services"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-plum/20 bg-white/70 px-7 text-sm font-semibold text-plum transition hover:border-plum hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-plum"
            >
              Explore Services
            </Link>
          </div>
        </div>
        <div className="relative z-10 mx-auto w-full max-w-xl lg:max-w-none">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/70 bg-white shadow-soft">
            <Image
              src={images.hero.src}
              alt={images.hero.alt}
              fill
              priority
              sizes="(min-width: 1024px) 48vw, 92vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -left-2 top-10 rounded-2xl border border-plum/10 bg-white/90 px-4 py-3 shadow-soft backdrop-blur sm:-left-8">
            <div className="flex items-center gap-2 text-sm font-semibold text-plum">
              <Sparkles aria-hidden="true" className="h-4 w-4 text-pink" />
              Packages from AED 99
            </div>
          </div>
          <div className="absolute -right-2 bottom-24 rounded-2xl border border-plum/10 bg-white/90 px-4 py-3 shadow-soft backdrop-blur sm:-right-8">
            <div className="flex items-center gap-2 text-sm font-semibold text-plum">
              <Clock aria-hidden="true" className="h-4 w-4 text-gold" />
              Open until 11 PM
            </div>
          </div>
          <div className="absolute bottom-5 left-5 rounded-2xl border border-plum/10 bg-white/90 px-4 py-3 shadow-soft backdrop-blur">
            <div className="flex items-center gap-2 text-sm font-semibold text-plum">
              <MapPin aria-hidden="true" className="h-4 w-4 text-pink" />
              Dubai, UAE
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
