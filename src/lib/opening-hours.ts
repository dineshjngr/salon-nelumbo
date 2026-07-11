export type DailyHours = {
  open: string;
  close: string;
};

export type OpeningStatus = {
  isOpen: boolean;
  statusLabel: string;
  detailLabel: string;
  nextChangeLabel: string;
  minutesUntilChange: number | null;
  currentTime: Date;
};

const timeZone = "Asia/Dubai";

const weeklyHours: Record<number, DailyHours> = {
  0: { open: "10:00", close: "23:00" },
  1: { open: "10:00", close: "23:00" },
  2: { open: "10:00", close: "23:00" },
  3: { open: "10:00", close: "23:00" },
  4: { open: "10:00", close: "23:00" },
  5: { open: "10:00", close: "23:00" },
  6: { open: "10:00", close: "23:00" },
};

function getDubaiDate(now = new Date()) {
  const formatter = new Intl.DateTimeFormat("en-GB", {
    timeZone,
    hour12: false,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const parts = formatter.formatToParts(now);
  const lookup = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return new Date(
    `${lookup.year}-${lookup.month}-${lookup.day}T${lookup.hour}:${lookup.minute}:${lookup.second}.000`
  );
}

function parseTime(value: string) {
  const [hours, minutes] = value.split(":").map(Number);
  return { hours, minutes };
}

function formatTime(date: Date) {
  return new Intl.DateTimeFormat("en-AE", {
    timeZone,
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

function formatMinutes(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (hours <= 0) {
    return `${Math.max(1, remainingMinutes)}m`;
  }

  return `${hours}h ${String(remainingMinutes).padStart(2, "0")}m`;
}

export function getOpeningStatus(now = new Date()): OpeningStatus {
  const dubaiNow = getDubaiDate(now);
  const dayHours = weeklyHours[dubaiNow.getDay()];
  const [openHours, openMinutes] = [parseTime(dayHours.open).hours, parseTime(dayHours.open).minutes];
  const [closeHours, closeMinutes] = [parseTime(dayHours.close).hours, parseTime(dayHours.close).minutes];

  const openDate = new Date(dubaiNow);
  openDate.setHours(openHours, openMinutes, 0, 0);

  const closeDate = new Date(dubaiNow);
  closeDate.setHours(closeHours, closeMinutes, 0, 0);

  const isOpen = dubaiNow >= openDate && dubaiNow < closeDate;

  if (isOpen) {
    const minutesUntilClose = Math.max(0, Math.round((closeDate.getTime() - dubaiNow.getTime()) / 60000));
    return {
      isOpen: true,
      statusLabel: "OPEN NOW",
      detailLabel: `Closes in ${formatMinutes(minutesUntilClose)}`,
      nextChangeLabel: `Closes at ${formatTime(closeDate)}`,
      minutesUntilChange: minutesUntilClose,
      currentTime: dubaiNow,
    };
  }

  const nextOpen = new Date(dubaiNow);
  if (dubaiNow >= closeDate) {
    nextOpen.setDate(nextOpen.getDate() + 1);
  }
  nextOpen.setHours(openHours, openMinutes, 0, 0);

  const minutesUntilOpen = Math.max(0, Math.round((nextOpen.getTime() - dubaiNow.getTime()) / 60000));

  return {
    isOpen: false,
    statusLabel: "CLOSED",
    detailLabel: "Opens tomorrow",
    nextChangeLabel: `${formatTime(nextOpen)}`,
    minutesUntilChange: minutesUntilOpen,
    currentTime: dubaiNow,
  };
}
