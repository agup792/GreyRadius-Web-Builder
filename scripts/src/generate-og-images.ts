import { Jimp } from "jimp";
import { resolve } from "path";

const OUT_DIR = resolve(process.cwd(), "../greyradius-website/assets/images");

const W = 1200;
const H = 630;

function rgba(r: number, g: number, b: number, a = 255): [number, number, number, number] {
  return [r, g, b, a];
}

type RGBA = [number, number, number, number];

const NAVY:   RGBA = rgba(31,  56, 100);
const ORANGE: RGBA = rgba(232, 105, 58);
const TEAL:   RGBA = rgba(22,  160, 133);
const PURPLE: RGBA = rgba(142,  68, 173);
const GREEN:  RGBA = rgba(39,  174,  96);
const BLUE:   RGBA = rgba(41,  128, 185);

function fillRect(data: Buffer, x: number, y: number, w: number, h: number, [r, g, b, a]: RGBA) {
  for (let py = Math.max(0, y); py < Math.min(H, y + h); py++) {
    for (let px = Math.max(0, x); px < Math.min(W, x + w); px++) {
      const idx = (py * W + px) * 4;
      data[idx    ] = r;
      data[idx + 1] = g;
      data[idx + 2] = b;
      data[idx + 3] = a;
    }
  }
}

function drawCircleRing(data: Buffer, cx: number, cy: number, radius: number, thickness: number, [r, g, b, a]: RGBA) {
  const r2outer = (radius + thickness) ** 2;
  const r2inner = (radius - thickness) ** 2;
  for (let py = cy - radius - thickness; py <= cy + radius + thickness; py++) {
    for (let px = cx - radius - thickness; px <= cx + radius + thickness; px++) {
      if (px < 0 || px >= W || py < 0 || py >= H) continue;
      const d2 = (px - cx) ** 2 + (py - cy) ** 2;
      if (d2 <= r2outer && d2 >= r2inner) {
        const idx = (py * W + px) * 4;
        data[idx    ] = r;
        data[idx + 1] = g;
        data[idx + 2] = b;
        data[idx + 3] = a;
      }
    }
  }
}

async function makeImage(accent: RGBA = ORANGE): Promise<InstanceType<typeof Jimp>> {
  const img = new Jimp({ width: W, height: H, color: 0x1f3864ff });
  const data = img.bitmap.data;

  const darkNavy: RGBA = rgba(20, 38, 70);
  for (let py = 0; py < H; py++) {
    for (let px = W - 300; px < W; px++) {
      const t = (px - (W - 300)) / 300;
      const idx = (py * W + px) * 4;
      data[idx    ] = Math.round(NAVY[0] + (darkNavy[0] - NAVY[0]) * t);
      data[idx + 1] = Math.round(NAVY[1] + (darkNavy[1] - NAVY[1]) * t);
      data[idx + 2] = Math.round(NAVY[2] + (darkNavy[2] - NAVY[2]) * t);
      data[idx + 3] = 255;
    }
  }

  const cx = 960, cy = 315;
  drawCircleRing(data, cx, cy, 180, 1, rgba(255, 255, 255, 30));
  drawCircleRing(data, cx, cy, 130, 1, rgba(255, 255, 255, 45));
  drawCircleRing(data, cx, cy, 80,  1, rgba(255, 255, 255, 60));
  drawCircleRing(data, cx, cy, 40,  1, rgba(255, 255, 255, 80));
  fillRect(data, cx - 10, cy - 10, 20, 20, rgba(accent[0], accent[1], accent[2], 200));

  const dotAt = (angle: number, r: number, size: number, c: RGBA) => {
    const rad = (angle * Math.PI) / 180;
    const px = Math.round(cx + r * Math.cos(rad));
    const py = Math.round(cy + r * Math.sin(rad));
    fillRect(data, px - size, py - size, size * 2, size * 2, c);
  };
  dotAt(-90, 180, 5, accent);
  dotAt(30,  180, 4, rgba(255, 255, 255, 120));
  dotAt(150, 180, 4, rgba(255, 255, 255, 120));
  dotAt(30,  130, 4, rgba(255, 255, 255, 100));
  dotAt(150, 130, 4, rgba(255, 255, 255, 100));

  fillRect(data, 0, H - 8, W, 8, accent);
  fillRect(data, 0, 0, 6, H, accent);

  fillRect(data, 80, 200, 500, 3, rgba(255, 255, 255, 40));
  fillRect(data, 80, 420, 400, 2, rgba(255, 255, 255, 25));

  return img;
}

async function save(img: InstanceType<typeof Jimp>, filename: string) {
  await img.write(`${OUT_DIR}/${filename}` as `${string}.png`);
  console.log(`  ✓ ${filename}`);
}

async function main() {
  console.log("Generating OG images for GreyRadius...\n");

  await save(await makeImage(ORANGE), "og-homepage.png");
  await save(await makeImage(ORANGE), "og-generic.png");
  await save(await makeImage(ORANGE), "og-services.png");
  await save(await makeImage(GREEN),  "og-industries.png");
  await save(await makeImage(PURPLE), "og-case-studies.png");
  await save(await makeImage(TEAL),   "og-insights.png");
  await save(await makeImage(BLUE),   "og-about.png");
  await save(await makeImage(ORANGE), "og-contact.png");

  console.log("\nAll OG images generated successfully.");
}

main().catch(console.error);
