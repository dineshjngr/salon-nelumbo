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
            <span className="font-serif text-[42px] font-semibold text-[var(--primary)]/75 md:text-[62px]">{item}</span>
            <span className="text-[#A678B6]">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ProductsMarquee() {
  return (
    <section id="products-we-use" className="relative overflow-hidden bg-[#FAF7FC] py-24">
      <div className="mx-auto max-w-[900px] px-[clamp(24px,5vw,96px)] text-center">
        <h2 className="font-serif text-[46px] font-semibold leading-none text-[var(--text)] md:text-[70px]">Products selected<br />with care.</h2>
        <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-[var(--muted)]">Professional salon products chosen to support quality treatments and polished finishes.</p>
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#FAF7FC] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#FAF7FC] to-transparent" />
      <div className="mt-14 space-y-6">
        <MarqueeRow />
        <MarqueeRow reverse />
      </div>
      <p className="mt-10 text-center text-sm text-[var(--muted)]">Product availability may vary by treatment.</p>
    </section>
  );
}
