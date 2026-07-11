export type SalonPackage = {
  id: number;
  title: string;
  items: string[];
  badge?: "Popular" | "Best Value";
};

export const packages: SalonPackage[] = [
  {
    id: 1,
    title: "Hair Renewal",
    items: ["Hair Spa", "U/V Cut", "Curl or Straight Blow-Dry"],
  },
  {
    id: 2,
    title: "Oil & Massage",
    items: ["Hot Oil Treatment", "Hand Massage", "Leg Massage"],
  },
  {
    id: 3,
    title: "Root Touch-Up",
    items: ["Root Colour", "Hair Spa", "Eyebrow Threading"],
  },
  {
    id: 4,
    title: "Relaxation Reset",
    items: [
      "Face Massage",
      "Neck and Shoulder Massage",
      "Hand Massage",
      "Leg Massage",
    ],
  },
  {
    id: 5,
    title: "Cut & Polish",
    badge: "Popular",
    items: ["Layer Cut", "Manicure", "Pedicure"],
  },
  {
    id: 6,
    title: "Wax & Thread",
    items: [
      "Half-Leg Wax",
      "Full-Arm Wax",
      "Underarm Wax",
      "Full-Face Threading",
    ],
  },
  {
    id: 7,
    title: "Fresh Finish",
    items: ["Hair Wash", "Blow-Dry", "Face Massage", "Full-Face Threading"],
  },
  {
    id: 8,
    title: "Foot Spa Glow",
    badge: "Best Value",
    items: [
      "Manicure",
      "Pedicure",
      "Voesh Four-Step Foot Spa",
      "Choice of Lemon, Chocolate, Olive or Eucalyptus Energy Boost",
      "Eyebrow Threading",
    ],
  },
  {
    id: 9,
    title: "Gel Nails",
    items: ["Gel Manicure", "Gel Pedicure", "Eyebrow Threading"],
  },
  {
    id: 10,
    title: "Polish & Massage",
    items: ["Manicure", "Pedicure", "Head and Shoulder Massage", "Leg Massage"],
  },
];

export function packageBookingUrl(packageId: number) {
  const message = `Hello Salon Nelumbo, I would like to book Package ${String(
    packageId,
  ).padStart(2, "0")}.`;

  return `https://wa.me/971501201938?text=${encodeURIComponent(message)}`;
}
