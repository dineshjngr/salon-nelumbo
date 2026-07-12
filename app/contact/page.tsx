"use client";

import { FormEvent, useState } from "react";
import { motion } from "motion/react";
import { Calendar, CheckCircle2, MapPin, MessageCircle, Phone } from "lucide-react";
import { Header } from "@/src/components/layout/Header";
import { Footer } from "@/src/components/layout/Footer";
import { PageHero } from "@/src/components/layout/PageHero";
import { SiteContainer } from "@/src/components/ui/SiteContainer";
import { SectionHeading } from "@/src/components/ui/SectionHeading";
import { salon } from "@/src/data/site-data";
import { OpeningStatus } from "@/src/components/ui/OpeningStatus";

const services = [
  "Hair Styling",
  "Hair Treatments",
  "Makeup",
  "Facial",
  "Manicure",
  "Pedicure",
  "Nails",
  "Waxing",
  "Threading",
  "Massage",
  "AED 99 Package",
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") || "").trim();
    const phone = String(form.get("phone") || "").trim();

    if (!name || !phone) {
      setError("Please enter your name and phone number.");
      setSubmitted(false);
      return;
    }

    setError("");
    setSubmitted(true);
    event.currentTarget.reset();
  }

  return (
    <>
      <Header />
      <main className="bg-[var(--background)]">
        <PageHero
          label="Contact"
          title={<>Book or ask<br /><span className="italic text-[#9B72B3]">a question.</span></>}
          description="Call or message Salon Nelumbo to confirm appointment timings, current packages and service availability."
          image="/images/booking/booking-cta.jpg"
          imageAlt="Salon appointment setting"
        />

        <section className="section-space">
          <SiteContainer>
            <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
              <div>
                <SectionHeading
                  label="Contact Details"
                  title={<>Reach the salon<br /><span className="italic text-[#9B72B3]">directly.</span></>}
                />
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07 } } }}
                  className="mt-10 grid gap-4"
                >
                  <ContactCard icon={Phone} title="Phone" detail={salon.phoneDisplay} href={salon.phoneHref} />
                  <ContactCard icon={MessageCircle} title="WhatsApp" detail={salon.phoneInternational} href={salon.whatsapp} external />
                  <ContactCard icon={MapPin} title="Location" detail={salon.location} href={salon.mapsUrl} external />
                  <ContactCard icon={Calendar} title="Opening" detail={salon.hours} />
                </motion.div>
                <OpeningStatus className="mt-6 w-full" />
              </div>

              <motion.form
                onSubmit={onSubmit}
                noValidate
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-[34px] border border-[var(--border)] bg-white/76 p-5 shadow-[var(--shadow-md)] md:p-8"
              >
                <h2 className="font-serif text-[30px] font-semibold text-[var(--text)] md:text-4xl">Appointment request</h2>
                <p className="mt-3 text-sm leading-7 text-[var(--muted)]">This form prepares your details locally. A salon backend can be connected later.</p>
                <div className="mt-8 grid gap-5 md:grid-cols-2">
                  <Field label="Name" name="name" required />
                  <Field label="Phone" name="phone" type="tel" required />
                  <Field label="Email" name="email" type="email" />
                  <label className="grid gap-2 text-sm font-medium text-[var(--text)]">
                    Preferred service
                    <select name="service" className="min-h-12 rounded-2xl border border-[var(--border)] bg-[#FAF7FC] px-4 text-[var(--text)] outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[#542568]/20">
                      {services.map((service) => (
                        <option key={service}>{service}</option>
                      ))}
                    </select>
                  </label>
                  <Field label="Preferred date" name="date" type="date" />
                  <label className="grid gap-2 text-sm font-medium text-[var(--text)] md:col-span-2">
                    Message
                    <textarea name="message" rows={5} className="rounded-2xl border border-[var(--border)] bg-[#FAF7FC] px-4 py-3 text-[var(--text)] outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[#542568]/20" />
                  </label>
                </div>
                {error ? <p role="alert" className="mt-5 text-sm font-medium text-[var(--primary)]">{error}</p> : null}
                {submitted ? (
                  <p role="status" className="mt-5 flex items-center gap-2 text-sm font-medium text-[var(--primary)]">
                    <CheckCircle2 aria-hidden="true" className="h-4 w-4" />
                    Your details are ready. Please call or WhatsApp the salon to confirm availability.
                  </p>
                ) : null}
                <button type="submit" className="mt-8 min-h-14 rounded-full bg-[var(--primary)] px-8 text-sm font-medium uppercase tracking-[0.08em] text-white transition hover:bg-[var(--primary-dark)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--primary)]">
                  Prepare Request
                </button>
              </motion.form>
            </div>
          </SiteContainer>
        </section>

        <section className="section-space bg-white">
          <SiteContainer>
            <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
              <div>
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-[34px] border border-[var(--border)] bg-[#FAF7FC] p-6 shadow-[var(--shadow-md)] md:p-8"
              >
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--primary)]">Salon Location</p>
                  <h2 className="mt-5 font-serif text-[32px] font-semibold text-[var(--text)] md:text-5xl">Al Nahda 1, Dubai, UAE</h2>
                  <p className="mt-5 text-sm leading-7 text-[var(--muted)]">Salon Nelumbo is located in Al Nahda, Dubai, offering a peaceful and luxurious environment for beauty appointments.</p>
                  <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                    <a
                      href={salon.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-14 items-center justify-center rounded-full bg-[var(--primary)] px-6 text-sm font-semibold uppercase tracking-[0.08em] text-white transition hover:bg-[var(--primary-dark)]"
                    >
                      Get Directions
                    </a>
                    <a
                      href={salon.bookingWhatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-14 items-center justify-center rounded-full border border-[var(--border)] bg-white px-6 text-sm font-semibold text-[var(--primary)] transition hover:bg-[#F4EDF8]"
                    >
                      WhatsApp
                    </a>
                  </div>
                </div>
                <div className="mt-8 rounded-[34px] border border-[var(--border)] bg-[#F8F3FC] p-8 shadow-[var(--shadow-sm)]">
                  <SectionHeading
                    label="Location Details"
                    title={<>Find us in Dubai<br /><span className="italic text-[#9B72B3]">and arrive relaxed.</span></>}
                    description="Tap to open the salon location in Google Maps so you can plan your visit with ease."
                  />
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden rounded-[34px] border border-[var(--border)] bg-[#EDE3F2]/80 shadow-[var(--shadow-md)]"
              >
                <iframe
                  src="https://www.google.com/maps?q=Salon%20Nelumbo%20Al%20Nahda%20Dubai&output=embed"
                  title="Salon Nelumbo map"
                  className="h-[380px] w-full border-0 md:h-[500px]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </motion.div>
            </div>
          </SiteContainer>
        </section>
      </main>
      <Footer />
    </>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="grid gap-2 text-sm font-medium text-[var(--text)]">
      {label}
      <input
        name={name}
        type={type}
        required={required}
        className="min-h-12 rounded-2xl border border-[var(--border)] bg-[#FAF7FC] px-4 text-[var(--text)] outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[#542568]/20"
      />
    </label>
  );
}

function ContactCard({
  icon: Icon,
  title,
  detail,
  href,
  external = false,
}: {
  icon: typeof Phone;
  title: string;
  detail: string;
  href?: string;
  external?: boolean;
}) {
  const content = (
    <>
      <Icon aria-hidden="true" className="h-5 w-5 text-[#A678B6]" />
      <span>
        <span className="block text-xs font-medium uppercase tracking-[0.14em] text-[var(--muted)]">{title}</span>
        <span className="mt-1 block font-medium text-[var(--primary)]">{detail}</span>
      </span>
    </>
  );

  if (!href) {
    return <div className="flex items-center gap-4 rounded-[26px] border border-[var(--border)] bg-white/70 p-5">{content}</div>;
  }

  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="flex items-center gap-4 rounded-[26px] border border-[var(--border)] bg-white/70 p-5 transition hover:-translate-y-1 hover:border-[#542568]/30 hover:shadow-[var(--shadow-sm)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--primary)]"
    >
      {content}
    </a>
  );
}
