import { Header } from "@/src/components/layout/Header";
import { Footer } from "@/src/components/layout/Footer";
import { PageHero } from "@/src/components/layout/PageHero";
import { SignaturePackages } from "@/src/components/home/SignaturePackages";

export default function PackagesPage() {
  return (
    <>
      <Header />
      <main className="bg-[var(--background)]">
        <PageHero
          label="Beauty Packages"
          title={
            <>
              Beauty packages
              <br />
              <span className="italic text-[#9B72B3]">from AED 99.</span>
            </>
          }
          description="Explore selected hair, nail, facial and relaxation combinations at Salon Nelumbo in Al Nahda, Dubai."
          image="/images/booking/booking-cta.jpg"
          imageAlt="Beauty package appointment at Salon Nelumbo in Al Nahda, Dubai"
        />
        <SignaturePackages />
      </main>
      <Footer />
    </>
  );
}
