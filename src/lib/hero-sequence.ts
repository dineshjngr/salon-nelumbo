export interface CoverConfig {
  canvas: HTMLCanvasElement;
  image: HTMLImageElement | HTMLVideoElement | ImageBitmap;
  focalPointX?: number; // 0 to 1, default 0.5 (center)
  focalPointY?: number; // 0 to 1, default 0.5 (center)
}

/**
 * Draws an image on a canvas simulating `object-fit: cover` styling.
 * Supports sharpening with devicePixelRatio and positioning via focal points.
 */
export function drawImageCover({
  canvas,
  image,
  focalPointX = 0.5,
  focalPointY = 0.5,
}: CoverConfig) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const imageWidth = image.width || (image as ImageBitmap).width;
  const imageHeight = image.height || (image as ImageBitmap).height;

  if (imageWidth === 0 || imageHeight === 0) return;

  // Clear previous frame
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Calculate cover dimensions
  const scale = Math.max(canvas.width / imageWidth, canvas.height / imageHeight);
  const w = imageWidth * scale;
  const h = imageHeight * scale;

  // Center or shift using focal point coordinates
  const x = (canvas.width - w) * focalPointX;
  const y = (canvas.height - h) * focalPointY;

  // Draw the image
  ctx.drawImage(image, x, y, w, h);
}
