import { Heart, ShieldCheck, Sparkles, Star } from "lucide-react";
import { Header } from "@/src/components/layout/Header";
import { Footer } from "@/src/components/layout/Footer";
import { PageHero } from "@/src/components/layout/PageHero";
import { SiteContainer } from "@/src/components/ui/SiteContainer";
import { SectionHeading } from "@/src/components/ui/SectionHeading";
import { ImageReveal } from "@/src/components/ui/ImageReveal";
import { TeamSection } from "@/src/components/home/TeamSection";
import { WhyChooseUs } from "@/src/components/home/WhyChooseUs";

const values = [
  {
    title: "Personal attention",
    text: "Appointments are approached with care for your preferred treatment, timing and finish.",
    icon: Heart,
  },
  {
    title: "Comfort first",
    text: "A calm environment designed to make beauty care feel easy and unhurried.",
    icon: Sparkles,
  },
  {
    title: "Clean details",
    text: "Treatment spaces and tools are prepared with hygiene and guest comfort in mind.",
    icon: ShieldCheck,
  },
  {
    title: "Polished results",
    text: "Services are focused on natural confidence and a refined salon finish.",
    icon: Star,
  },
];

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="bg-[var(--background)]">
        <PageHero
          label="About Salon Nelumbo"
          title={<>Beauty care<br /><span className="italic text-[#9B72B3]">with calm intention.</span></>}
          description="Salon Nelumbo is a Dubai beauty salon for hair, nails, facial treatments, waxing, threading and relaxing massage services."
          image="/images/why-us/main-salon.jpg"
          imageAlt="Elegant salon interior with soft lighting"
        />

        <section className="section-space">
          <SiteContainer>
            <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div>
                <SectionHeading
                  label="Salon Story"
                  title={<>A softer rhythm<br /><span className="italic text-[#9B72B3]">for self-care.</span></>}
                />
                <p className="mt-7 max-w-2xl text-base leading-8 text-[var(--muted)]">
                  The salon brings together everyday grooming and restorative beauty rituals in a setting that feels composed, clean and personal. Each visit is shaped around comfort, care and a polished finish.
                </p>
              </div>
              <div className="relative">
                <ImageReveal
                  src="/images/gallery/salon-interior.jpg"
                  alt="Salon seating and interior details"
                  sizes="(min-width:1024px) 52vw, 100vw"
                  className="aspect-[4/5] rounded-[34px]"
                />
                <div className="absolute -bottom-8 left-8 max-w-xs rounded-[26px] border border-white/55 bg-white/70 p-6 shadow-[var(--shadow-md)] backdrop-blur-[18px]">
                  <p className="font-serif text-3xl font-semibold text-[var(--primary)]">Hair, beauty, nails and relaxation</p>
                  <p className="mt-3 text-sm leading-7 text-[var(--muted)]">A considered menu for regular beauty care.</p>
                </div>
              </div>
            </div>
          </SiteContainer>
        </section>

        <section className="section-space bg-white">
          <SiteContainer>
            <SectionHeading
              label="Mission And Values"
              title={<>Care that feels<br /><span className="italic text-[#9B72B3]">thoughtful.</span></>}
              align="center"
            />
            <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {values.map((value) => {
                const Icon = value.icon;
                return (
                  <article key={value.title} className="group rounded-[30px] border border-[var(--border)] bg-[#FAF7FC] p-7 shadow-[var(--shadow-sm)] transition hover:-translate-y-1 hover:border-[#542568]/30 hover:shadow-[var(--shadow-md)]">
                    <Icon aria-hidden="true" className="h-7 w-7 text-[#A678B6]" />
                    <h2 className="mt-6 font-serif text-3xl font-semibold text-[var(--text)]">{value.title}</h2>
                    <p className="mt-4 text-sm leading-7 text-[var(--muted)]">{value.text}</p>
                  </article>
                );
              })}
            </div>
          </SiteContainer>
        </section>

        <section className="section-space">
          <SiteContainer>
            <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
              <ImageReveal
                src="/images/why-us/clean-space.jpg"
                alt="Clean salon towels and treatment products"
                sizes="(min-width:1024px) 50vw, 100vw"
                className="aspect-[16/12] rounded-[34px]"
              />
              <div>
                <SectionHeading
                  label="Hygiene And Comfort"
                  title={<>A clean setting<br /><span className="italic text-[#9B72B3]">for your pause.</span></>}
                  description="Treatment spaces are maintained with guest comfort in mind, so every appointment can feel calm from arrival to finish."
                />
              </div>
            </div>
          </SiteContainer>
        </section>

        <TeamSection />
        <WhyChooseUs />
      </main>
      <Footer />
    </>
  );
}
