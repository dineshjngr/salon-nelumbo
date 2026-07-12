"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Check, Sparkles } from "lucide-react";
import { Header } from "@/src/components/layout/Header";
import { Footer } from "@/src/components/layout/Footer";
import { PageHero } from "@/src/components/layout/PageHero";
import { SiteContainer } from "@/src/components/ui/SiteContainer";
import { SectionHeading } from "@/src/components/ui/SectionHeading";
import { packages, packageBookingUrl } from "@/src/data/packages";

const groups = [
  {
    id: "hair",
    title: "Hair",
    description: "Hair styling and restorative treatments for soft, luminous hair.",
    items: ["Hair Styling", "Hair Treatments"],
  },
  {
    id: "facial",
    title: "Facial",
    description: "Makeup and facial care for a calm, polished glow.",
    items: ["Makeup", "Facial"],
  },
  {
    id: "nails",
    title: "Nails",
    description: "Manicure, pedicure and nail services.",
    items: ["Manicure", "Pedicure", "Nails"],
  },
  { id: "waxing", title: "Waxing", description: "Waxing services for smooth skin and lasting confidence.", items: ["Waxing"] },
  { id: "threading", title: "Threading", description: "Precise threading for defined brows and facial details.", items: ["Threading"] },
  {
    id: "massage",
    title: "Massage",
    description: "Relaxing care for the head, shoulders, hands and legs.",
    items: ["Hand massage", "Leg massage", "Face massage", "Neck and shoulder massage", "Head and shoulder massage"],
  },
];

export default function ServicesPage() {
  const [query, setQuery] = useState("");

  const filteredGroups = useMemo(
    () => {
      const normalizedQuery = query.trim().toLowerCase();
      if (!normalizedQuery) {
        return groups;
      }

      return groups
        .map((group) => ({
          ...group,
          items: group.items.filter((item) => item.toLowerCase().includes(normalizedQuery)),
        }))
        .filter((group) => group.items.length > 0 || group.title.toLowerCase().includes(normalizedQuery) || group.description.toLowerCase().includes(normalizedQuery));
    },
    [query]
  );

  return (
    <>
      <Header />
      <main className="bg-[var(--background)]">
        <PageHero
          label="Services"
          title={<>Salon services<br /><span className="italic text-[#9B72B3]">and rituals.</span></>}
          description="Explore hair, facial, nail, massage, waxing and threading services, plus selected AED 99 appointment packages."
          image="/images/gallery/hair-station.jpg"
          imageAlt="Salon hair station and styling tools"
        />

        <section className="sticky top-[72px] z-30 border-y border-[var(--border)] bg-[#FAF7FC]/82 py-4 backdrop-blur-md md:top-[96px]">
          <SiteContainer>
            <nav aria-label="Service categories" className="flex gap-3 overflow-x-auto">
              {groups.map((group) => (
                <Link
                  key={group.id}
                  href={`#${group.id}`}
                  className="shrink-0 rounded-full border border-[var(--border)] bg-white/70 px-5 py-3 text-xs font-medium uppercase tracking-[0.1em] text-[var(--primary)] transition hover:bg-[var(--primary)] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--primary)]"
                >
                  {group.title}
                </Link>
              ))}
            </nav>
          </SiteContainer>
        </section>

        <section className="section-space">
          <SiteContainer>
            <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
              <SectionHeading
                label="Featured Services"
                title={<>Choose the care<br /><span className="italic text-[#9B72B3]">that fits your day.</span></>}
                description="Individual service pricing is confirmed by the salon. Contact the team for current availability and details."
              />
              <div className="rounded-[26px] border border-[var(--border)] bg-[#F8F3FC] p-5 shadow-[var(--shadow-sm)] md:p-6">
                <label className="block text-sm font-medium text-[var(--text)]">
                  Search services
                  <input type="search" placeholder="Search Manicure, Facial, Waxing..." value={query} onChange={(event) => setQuery(event.target.value)} className="mt-3 min-h-12 w-full rounded-2xl border border-[var(--border)] bg-white px-4 text-[var(--text)] outline-none transition focus:border-[var(--primary)] focus:ring-2 focus:ring-[#542568]/20" />
                </label>
              </div>
            </div>
            <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {filteredGroups.length > 0 ? (
                filteredGroups.map((group) => (
                  <article
                    id={group.id}
                    key={group.id}
                    className="scroll-mt-40 rounded-[30px] border border-[var(--border)] bg-white/72 p-6 shadow-[var(--shadow-sm)] transition duration-300 hover:-translate-y-1 hover:border-[#542568]/30 hover:shadow-[var(--shadow-md)] md:p-7"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs font-medium uppercase tracking-[0.14em] text-[var(--muted)]">Contact for pricing</p>
                        <h2 className="mt-3 font-serif text-[28px] font-semibold text-[var(--text)] md:text-4xl">{group.title}</h2>
                      </div>
                      <span className="grid h-12 w-12 place-items-center rounded-full bg-[#EEE4F2] text-[var(--primary)]">
                        <Sparkles aria-hidden="true" className="h-5 w-5" />
                      </span>
                    </div>
                    <p className="mt-4 text-[14px] leading-7 text-[var(--muted)] md:text-sm">{group.description}</p>
                    <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                      {group.items.map((item) => (
                        <li key={item} className="flex gap-3 text-sm text-[var(--muted)]">
                          <Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-[#A678B6]" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </article>
                ))
              ) : (
                <div className="rounded-[30px] border border-[var(--border)] bg-white/72 p-10 text-center text-[var(--muted)] shadow-[var(--shadow-sm)]">
                  <p className="text-lg font-medium text-[var(--text)]">No services match your search.</p>
                  <p className="mt-3 text-sm leading-7">Try keywords like Hair, Makeup, Manicure, Waxing, or Threading.</p>
                </div>
              )}
            </div>
          </SiteContainer>
        </section>

        <section className="section-space bg-white">
          <SiteContainer>
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
              <SectionHeading
                label="AED 99 Packages"
                title={<>Selected rituals,<br /><span className="italic text-[#9B72B3]">simple booking.</span></>}
                description="Ten appointment combinations for hair, nails, beauty and relaxation."
              />
              <p className="max-w-xl text-sm leading-7 text-[var(--muted)] lg:ml-auto">
                Package availability may change. Please contact Salon Nelumbo before visiting to confirm the current offer.
              </p>
            </div>
            <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
              {packages.map((salonPackage) => (
                <article key={salonPackage.id} className="rounded-[28px] border border-[var(--border)] bg-[#FAF7FC] p-5 shadow-[var(--shadow-sm)] md:p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-[0.14em] text-[var(--muted)]">Package {String(salonPackage.id).padStart(2, "0")}</p>
                      <h3 className="mt-2 font-serif text-[26px] font-semibold text-[var(--text)] md:text-3xl">{salonPackage.title}</h3>
                    </div>
                    <p className="font-serif text-[28px] font-semibold text-[var(--primary)] md:text-3xl">99</p>
                  </div>
                  <ul className="mt-6 space-y-3">
                    {salonPackage.items.map((item) => (
                        <li key={item} className="flex gap-3 text-[14px] leading-6 text-[var(--muted)] md:text-sm">
                        <Check aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-[#A678B6]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={packageBookingUrl(salonPackage.id)}
                    target="_blank"
                    rel="noopener noreferrer"
                  className="group mt-7 inline-flex min-h-14 items-center justify-center rounded-full bg-[var(--primary)] px-5 text-sm font-medium text-white transition hover:bg-[var(--primary-dark)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--primary)]"
                  >
                    Book Package
                    <ArrowUpRight aria-hidden="true" className="ml-2 h-4 w-4 transition group-hover:rotate-45" />
                  </a>
                </article>
              ))}
            </div>
          </SiteContainer>
        </section>
      </main>
      <Footer />
    </>
  );
}
