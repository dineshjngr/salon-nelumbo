"use client";

import { Header } from "@/src/components/layout/Header";
import { HeroSection } from "@/src/components/home/HeroSection";
import { FeaturedCategories } from "@/src/components/home/FeaturedCategories";
import { SignaturePackages } from "@/src/components/home/SignaturePackages";
import { SalonExperience } from "@/src/components/home/SalonExperience";
import { BeforeAfter } from "@/src/components/home/BeforeAfter";
import { WhyChooseUs } from "@/src/components/home/WhyChooseUs";
import { SalonAtAGlance } from "@/src/components/home/SalonAtAGlance";
import { InstagramFeed } from "@/src/components/home/InstagramFeed";
import { OurSpace } from "@/src/components/home/OurSpace";
import { ProductsMarquee } from "@/src/components/home/ProductsMarquee";
import { TeamSection } from "@/src/components/home/TeamSection";
import { Testimonials } from "@/src/components/home/Testimonials";
import { BeautyJournal } from "@/src/components/home/BeautyJournal";
import { HomeFAQ } from "@/src/components/home/HomeFAQ";
import { HomeFooter } from "@/src/components/home/HomeFooter";
import { ScrollProgress } from "@/src/components/ui/ScrollProgress";
import { FaqJsonLd } from "@/src/components/seo/FaqJsonLd";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F8F3FC] text-[#241B2F]">
      <FaqJsonLd />
      <h1 className="sr-only">Salon Nelumbo beauty salon in Al Nahda, Dubai</h1>
      <ScrollProgress />
      <Header />

      <HeroSection />
      <FeaturedCategories />
      <SignaturePackages />
      <SalonExperience />
      <BeforeAfter />
      <WhyChooseUs />
      <SalonAtAGlance />
      <InstagramFeed />
      <OurSpace />
      <ProductsMarquee />
      <TeamSection />
      <Testimonials />
      <BeautyJournal />
      <HomeFAQ />
      <HomeFooter />
    </main>
  );
}
