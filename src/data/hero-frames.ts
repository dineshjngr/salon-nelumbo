export const FRAME_COUNT = 240;

export const heroFrames = Array.from(
  { length: FRAME_COUNT },
  (_, index) =>
    `/images/hero-sequence/frame-${String(index + 1).padStart(4, "0")}.jpg`
);
