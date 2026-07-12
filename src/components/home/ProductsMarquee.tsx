const productCategories = [
  "Professional Hair Care",
  "Salon Colour",
  "Nail Care",
  "Skin Care",
  "Spa Essentials",
  "Styling Products",
];

function MarqueeRow({ reverse = false }: { reverse?: boolean }) {
  const items = [...productCategories, ...productCategories];

  return (
    <div className="overflow-hidden">
      <div className={`flex w-max gap-8 ${reverse ? "marquee-right" : "marquee-left"}`}>
        {items.map((item, index) => (
          <div key={`${item}-${index}`} className="flex items-center gap-8">
            <span className="font-serif text-[32px] font-semibold text-[var(--primary)]/75 md:text-[62px]">{item}</span>
            <span className="text-[14px] text-[#A678B6] md:text-base">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ProductsMarquee() {
  return (
    <section id="products-we-use" className="relative overflow-hidden bg-[#FAF7FC] py-14 md:py-24">
      <div className="mx-auto max-w-[900px] px-[var(--site-gutter)] text-center md:px-[clamp(24px,5vw,96px)]">
        <h2 className="font-serif text-[32px] font-semibold leading-[0.98] text-[var(--text)] md:text-[46px] lg:text-[70px]">Products selected<br />with care.</h2>
        <p className="mx-auto mt-5 max-w-xl text-[15px] leading-7 text-[var(--muted)] md:mt-6 md:text-base md:leading-8">Professional salon products chosen to support quality treatments and polished finishes.</p>
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#FAF7FC] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#FAF7FC] to-transparent" />
      <div className="mt-14 space-y-6">
        <MarqueeRow />
        <MarqueeRow reverse />
      </div>
      <p className="mt-8 text-center text-[13px] text-[var(--muted)] md:mt-10 md:text-sm">Product availability may vary by treatment.</p>
    </section>
  );
}
