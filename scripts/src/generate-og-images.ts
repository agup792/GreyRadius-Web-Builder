import { createCanvas, GlobalFonts, type SKRSContext2D } from "@napi-rs/canvas";
import { writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = resolve(process.cwd(), "../greyradius-website/assets/images");
const FONT_PATH = resolve(__dirname, "fonts/Montserrat.ttf");

GlobalFonts.registerFromPath(FONT_PATH, "Montserrat");

const W = 1200;
const H = 630;

const ORANGE = "#E8693A";
const TEAL   = "#16a085";
const PURPLE = "#8e44ad";
const GREEN  = "#27ae60";
const BLUE   = "#2980b9";

type PageSpec = {
  filename: string;
  title: string;
  subtitle?: string;
  accent: string;
};

function wrapText(ctx: SKRSContext2D, text: string, maxWidth: number): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    const test = current ? `${current} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth && current) {
      lines.push(current);
      current = word;
    } else {
      current = test;
    }
  }
  if (current) lines.push(current);
  return lines;
}

function makeImage(spec: PageSpec): void {
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext("2d");

  const grad = ctx.createLinearGradient(0, 0, W, 0);
  grad.addColorStop(0, "#1f3864");
  grad.addColorStop(0.75, "#1f3864");
  grad.addColorStop(1, "#142646");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);

  const cx = 960;
  const cy = 315;
  const rings = [
    { r: 180, a: 0.12 },
    { r: 130, a: 0.18 },
    { r: 80,  a: 0.24 },
    { r: 40,  a: 0.32 },
  ];
  for (const { r, a } of rings) {
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(255,255,255,${a})`;
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }

  ctx.fillStyle = spec.accent;
  ctx.fillRect(cx - 10, cy - 10, 20, 20);

  const dots: Array<[number, number, number, string]> = [
    [-90, 180, 5, spec.accent],
    [30,  180, 4, "rgba(255,255,255,0.47)"],
    [150, 180, 4, "rgba(255,255,255,0.47)"],
    [30,  130, 4, "rgba(255,255,255,0.39)"],
    [150, 130, 4, "rgba(255,255,255,0.39)"],
  ];
  for (const [angle, r, size, color] of dots) {
    const rad = (angle * Math.PI) / 180;
    const px = Math.round(cx + r * Math.cos(rad));
    const py = Math.round(cy + r * Math.sin(rad));
    ctx.fillStyle = color;
    ctx.fillRect(px - size, py - size, size * 2, size * 2);
  }

  ctx.fillStyle = spec.accent;
  ctx.fillRect(0, H - 8, W, 8);
  ctx.fillRect(0, 0, 6, H);

  ctx.fillStyle = "rgba(255,255,255,0.16)";
  ctx.fillRect(80, 200, 500, 2);
  ctx.fillStyle = "rgba(255,255,255,0.10)";
  ctx.fillRect(80, 420, 400, 1.5);

  ctx.fillStyle = spec.accent;
  ctx.font = "bold 14px Montserrat";
  ctx.letterSpacing = "3px";
  ctx.fillText("GREYRADIUS CONSULTING", 80, 178);

  const TEXT_MAX_W = 630;
  ctx.letterSpacing = "-1px";
  const titleLinesTmp = (() => {
    ctx.font = "bold 52px Montserrat";
    return wrapText(ctx, spec.title, TEXT_MAX_W);
  })();

  const titleFontSize = titleLinesTmp.length <= 2 ? 52 : 42;
  const titleLineH = titleFontSize * 1.2;
  ctx.font = `bold ${titleFontSize}px Montserrat`;
  const titleLines = wrapText(ctx, spec.title, TEXT_MAX_W);

  ctx.fillStyle = "#ffffff";
  let titleY = spec.subtitle ? 260 : 290;
  if (titleLines.length >= 3) titleY = 230;

  for (const line of titleLines) {
    ctx.fillText(line, 80, titleY);
    titleY += titleLineH;
  }

  if (spec.subtitle) {
    ctx.font = "400 18px Montserrat";
    ctx.fillStyle = "rgba(255,255,255,0.65)";
    ctx.letterSpacing = "0px";
    const subtitleLines = wrapText(ctx, spec.subtitle, TEXT_MAX_W);
    let subY = titleY + 20;
    for (const line of subtitleLines) {
      ctx.fillText(line, 80, subY);
      subY += 26;
    }
  }

  const buf = canvas.toBuffer("image/png");
  writeFileSync(`${OUT_DIR}/${spec.filename}`, buf);
  console.log(`  ✓ ${spec.filename}`);
}

const pages: PageSpec[] = [
  { filename: "og-homepage.png",   title: "Strategy. Execution. Growth.",  subtitle: "Management consulting for emerging-market expansion.", accent: ORANGE },
  { filename: "og-generic.png",    title: "GreyRadius Consulting",          subtitle: "Output-led strategy and market-entry consulting.",   accent: ORANGE },
  { filename: "og-contact.png",    title: "Get in Touch",                   subtitle: "Start a conversation about your next market move.",  accent: ORANGE },
  { filename: "og-about.png",      title: "About GreyRadius",               subtitle: "9 years. 200+ projects. 4 countries.",               accent: BLUE   },

  { filename: "og-services.png",          title: "Our Services",                          subtitle: "Six output-led offerings built around your growth stage.", accent: ORANGE },
  { filename: "og-svc-opportunity.png",   title: "Opportunity Assessment",                subtitle: "Should you play in this market?",                          accent: ORANGE },
  { filename: "og-svc-feasibility.png",   title: "Feasibility & TEV",                     subtitle: "Is this play bankable?",                                   accent: ORANGE },
  { filename: "og-svc-market-entry.png",  title: "Market Entry Execution",                subtitle: "Land. Sign. Get the first customer.",                      accent: ORANGE },
  { filename: "og-svc-gtm.png",           title: "GTM Execution-as-a-Service",            subtitle: "We run the first 90 days for you.",                        accent: ORANGE },
  { filename: "og-svc-pitchbook.png",     title: "Pitchbook & Fundraising",               subtitle: "From slides to closed round.",                             accent: ORANGE },
  { filename: "og-svc-ai.png",            title: "AI Consulting & Transformation",         subtitle: "Strategy that ships.",                                     accent: ORANGE },

  { filename: "og-industries.png",          title: "Industries We Serve",              subtitle: "Deep vertical expertise across six sectors.",              accent: GREEN  },
  { filename: "og-ind-bfsi.png",            title: "BFSI",                             subtitle: "Banking, Financial Services & Insurance strategy.",        accent: GREEN  },
  { filename: "og-ind-cpg.png",             title: "CPG, FMCG & Retail",               subtitle: "Consumer goods growth strategy.",                          accent: GREEN  },
  { filename: "og-ind-energy.png",          title: "Energy & Chemicals",               subtitle: "Market strategy for energy and chemicals sectors.",        accent: GREEN  },
  { filename: "og-ind-healthcare.png",      title: "Healthcare & Life Sciences",       subtitle: "Market entry and commercialisation strategy.",             accent: GREEN  },
  { filename: "og-ind-investment.png",      title: "Investment Banks & PE",            subtitle: "Due-diligence and commercial assessment support.",         accent: GREEN  },
  { filename: "og-ind-technology.png",      title: "Technology",                       subtitle: "GTM and growth strategy for tech companies.",              accent: GREEN  },

  { filename: "og-case-studies.png",            title: "Case Studies",                              subtitle: "Real engagements, real outcomes.",                         accent: PURPLE },
  { filename: "og-cs-agri-chemical.png",         title: "Agri Chemical GTM & Product Development",   subtitle: "GreyRadius Case Study",                                   accent: PURPLE },
  { filename: "og-cs-alloy-metals.png",          title: "Alloy & Ferro Metals SEA Expansion",        subtitle: "GreyRadius Case Study",                                   accent: PURPLE },
  { filename: "og-cs-coal-mining.png",           title: "Coal Mining Material Handling",             subtitle: "GreyRadius Case Study",                                   accent: PURPLE },
  { filename: "og-cs-drone-startup.png",         title: "GTM Strategy for a Drone Startup",          subtitle: "GreyRadius Case Study",                                   accent: PURPLE },
  { filename: "og-cs-elearning.png",             title: "UAE E-Learning GCC Expansion Strategy",     subtitle: "GreyRadius Case Study",                                   accent: PURPLE },
  { filename: "og-cs-eye-care.png",              title: "Eye Care Pharma Market Entry",              subtitle: "GreyRadius Case Study",                                   accent: PURPLE },
  { filename: "og-cs-hospital-canada.png",       title: "US Hospital Chain Canada Market Entry",     subtitle: "GreyRadius Case Study",                                   accent: PURPLE },
  { filename: "og-cs-nativfresh.png",            title: "NativFresh CPG GTM Strategy",               subtitle: "GreyRadius Case Study",                                   accent: PURPLE },
  { filename: "og-cs-oncology.png",              title: "Oncology Clinical Trial Abstracts",         subtitle: "GreyRadius Case Study",                                   accent: PURPLE },
  { filename: "og-cs-retail-market.png",         title: "Retail Market Entry — New Consumer Brand",  subtitle: "GreyRadius Case Study",                                   accent: PURPLE },
  { filename: "og-cs-saas-pmf.png",              title: "SaaS Startup Finds Product-Market Fit",     subtitle: "GreyRadius Case Study",                                   accent: PURPLE },
  { filename: "og-cs-trinetra.png",              title: "Trinetra North American GTM Strategy",      subtitle: "GreyRadius Case Study",                                   accent: PURPLE },

  { filename: "og-insights.png",                title: "Insights",                                        subtitle: "Strategy, markets, and growth — from the GreyRadius team.", accent: TEAL   },
  { filename: "og-ins-ai-hype.png",              title: "Turning AI Hype Into Business Results",           subtitle: "GreyRadius Insights",                                       accent: TEAL   },
  { filename: "og-ins-consultants-vs.png",       title: "Consultants vs In-House Strategy Team",           subtitle: "GreyRadius Insights",                                       accent: TEAL   },
  { filename: "og-ins-cost-transform.png",       title: "Cost Transformation Beyond Cost Cutting",         subtitle: "GreyRadius Insights",                                       accent: TEAL   },
  { filename: "og-ins-supply-chain.png",         title: "Building Supply Chains That Bend Without Breaking", subtitle: "GreyRadius Insights",                                    accent: TEAL   },
  { filename: "og-ins-what-consultants.png",     title: "What Does a Management Consultant Actually Do?",  subtitle: "GreyRadius Insights",                                       accent: TEAL   },
  { filename: "og-ins-saturated-markets.png",    title: "Winning in Saturated Markets",                    subtitle: "GreyRadius Insights",                                       accent: TEAL   },
];

function main() {
  console.log("Generating OG images for GreyRadius...\n");
  for (const page of pages) {
    makeImage(page);
  }
  console.log(`\nAll ${pages.length} OG images generated successfully.`);
}

main();
