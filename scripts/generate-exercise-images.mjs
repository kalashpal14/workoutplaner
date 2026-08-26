import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const DATA_DIR = path.join(ROOT, "src/lib/data/exercises");
const OUT_DIR = path.join(ROOT, "public/exercises");

const INK = "#27272a";
const SW = 7;

const GROUP_COLORS = {
  chest: "#ef4444",
  back: "#3b82f6",
  legs: "#10b981",
  shoulders: "#f59e0b",
  arms: "#a855f7",
  core: "#ec4899",
};

function head(x, y) {
  return `<circle cx="${x}" cy="${y}" r="10" fill="${INK}"/>`;
}
function poly(points, w = SW) {
  return `<polyline points="${points}" fill="none" stroke="${INK}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;
}
function barbell(x, y, color, len = 76) {
  const h = len / 2;
  return (
    `<line x1="${x - h}" y1="${y}" x2="${x + h}" y2="${y}" stroke="${INK}" stroke-width="4" stroke-linecap="round"/>` +
    `<rect x="${x - h - 6}" y="${y - 13}" width="9" height="26" rx="3" fill="${color}"/>` +
    `<rect x="${x + h - 3}" y="${y - 13}" width="9" height="26" rx="3" fill="${color}"/>`
  );
}
function dumbbell(x, y, color) {
  return (
    `<line x1="${x - 11}" y1="${y}" x2="${x + 11}" y2="${y}" stroke="${INK}" stroke-width="4" stroke-linecap="round"/>` +
    `<rect x="${x - 15}" y="${y - 7}" width="7" height="14" rx="2.5" fill="${color}"/>` +
    `<rect x="${x + 8}" y="${y - 7}" width="7" height="14" rx="2.5" fill="${color}"/>`
  );
}
function bench(x1, x2, y) {
  return (
    `<line x1="${x1}" y1="${y}" x2="${x2}" y2="${y}" stroke="${INK}" stroke-width="8" stroke-linecap="round"/>` +
    `<line x1="${x1 + 12}" y1="${y}" x2="${x1 + 12}" y2="${y + 40}" stroke="${INK}" stroke-width="5"/>` +
    `<line x1="${x2 - 12}" y1="${y}" x2="${x2 - 12}" y2="${y + 40}" stroke="${INK}" stroke-width="5"/>`
  );
}

const POSES = {
  "bench-press": (c) =>
    bench(45, 155, 118) +
    head(58, 108) +
    poly(`68,112 128,116`) +
    poly(`128,116 150,134 158,160`, 6) +
    poly(`78,108 92,64`) +
    `<circle cx="95" cy="56" r="15" fill="${c}" opacity="0.9"/><circle cx="95" cy="56" r="6" fill="${INK}"/>`,
  fly: (c) =>
    bench(45, 155, 118) +
    head(58, 108) +
    poly(`68,112 128,116`) +
    poly(`128,116 150,134 158,160`, 6) +
    poly(`76,108 46,84`) +
    poly(`80,110 108,84`) +
    dumbbell(38, 78, c) +
    dumbbell(116, 79, c),
  pushup: () =>
    head(46, 98) +
    poly(`56,104 142,118`) +
    poly(`64,106 64,162`, 6) +
    poly(`142,118 174,160`, 6) +
    `<ellipse cx="64" cy="166" rx="14" ry="4" fill="${INK}" opacity="0.25"/>`,
  dip: (c) =>
    `<line x1="30" y1="96" x2="170" y2="96" stroke="${c}" stroke-width="6" stroke-linecap="round"/>` +
    `<line x1="45" y1="96" x2="45" y2="170" stroke="${INK}" stroke-width="5"/>` +
    `<line x1="155" y1="96" x2="155" y2="170" stroke="${INK}" stroke-width="5"/>` +
    head(100, 58) +
    poly(`100,70 100,112`) +
    poly(`100,74 84,96`, 6) +
    poly(`100,112 118,132 112,148`, 6),
  deadlift: (c) =>
    head(72, 68) +
    poly(`78,76 112,122`) +
    poly(`84,88 90,130`, 6) +
    poly(`112,124 116,144`, 7) +
    poly(`116,144 110,164`, 7) +
    barbell(95, 136, c),
  pullup: (c) =>
    `<line x1="40" y1="26" x2="160" y2="26" stroke="${c}" stroke-width="6" stroke-linecap="round"/>` +
    head(100, 44) +
    poly(`100,56 100,100`) +
    poly(`100,58 86,28`, 6) +
    poly(`100,100 88,122 96,140`, 6),
  pulldown: (c) =>
    `<rect x="66" y="122" width="56" height="8" rx="4" fill="${INK}"/>` +
    `<line x1="72" y1="130" x2="72" y2="168" stroke="${INK}" stroke-width="5"/>` +
    `<line x1="116" y1="130" x2="116" y2="168" stroke="${INK}" stroke-width="5"/>` +
    head(86, 58) +
    poly(`89,70 91,118`) +
    poly(`89,76 101,36`, 6) +
    `<line x1="70" y1="30" x2="130" y2="30" stroke="${c}" stroke-width="6" stroke-linecap="round"/>` +
    `<line x1="100" y1="30" x2="100" y2="8" stroke="${INK}" stroke-width="4"/>` +
    poly(`91,118 128,126 130,156`, 6),
  row: (c) =>
    head(70, 66) +
    poly(`76,74 112,122`) +
    poly(`80,86 96,112 100,122`, 6) +
    poly(`112,124 118,144`, 7) +
    poly(`118,144 112,164`, 7) +
    barbell(96, 126, c),
  "row-seated": (c) =>
    `<rect x="58" y="130" width="52" height="8" rx="4" fill="${INK}"/>` +
    head(72, 76) +
    poly(`76,88 80,128`) +
    poly(`80,128 124,140 128,162`, 6) +
    poly(`78,94 128,102`, 6) +
    `<rect x="124" y="96" width="12" height="12" rx="3" fill="${c}"/>` +
    `<line x1="136" y1="102" x2="184" y2="66" stroke="${INK}" stroke-width="4"/>` +
    `<circle cx="184" cy="64" r="6" fill="${INK}"/>`,
  "row-single": (c) =>
    bench(40, 140, 120) +
    head(56, 66) +
    poly(`61,74 76,118`) +
    poly(`63,80 63,116`, 6) +
    poly(`66,84 84,140`, 6) +
    dumbbell(84, 146, c) +
    poly(`76,118 104,148 100,164`, 6),
  "face-pull": (c) =>
    head(100, 52) +
    poly(`100,64 100,120`) +
    poly(`100,70 82,74 88,58`, 6) +
    `<line x1="88" y1="58" x2="176" y2="26" stroke="${c}" stroke-width="4"/>` +
    `<line x1="94" y1="62" x2="180" y2="34" stroke="${c}" stroke-width="4"/>` +
    poly(`100,120 94,165`, 6) +
    poly(`100,120 108,165`, 6),
  squat: (c) =>
    head(102, 54) +
    poly(`104,66 96,116`) +
    poly(`96,116 74,136`, 7) +
    poly(`74,136 78,164`, 7) +
    poly(`96,116 116,140`, 7) +
    poly(`116,140 122,164`, 7) +
    poly(`104,68 128,62`, 6) +
    barbell(104, 60, c),
  "leg-press": (c) =>
    `<line x1="40" y1="140" x2="90" y2="150" stroke="${INK}" stroke-width="8" stroke-linecap="round"/>` +
    head(56, 100) +
    poly(`62,106 94,128`) +
    poly(`94,128 130,114 154,94`, 7) +
    `<line x1="146" y1="110" x2="168" y2="82" stroke="${c}" stroke-width="8" stroke-linecap="round"/>`,
  lunge: () =>
    head(90, 50) +
    poly(`93,62 96,110`) +
    poly(`96,110 70,134 64,162`, 6) +
    poly(`96,110 120,140 130,160`, 6) +
    poly(`93,66 82,110`, 6),
  "leg-extension": (c) =>
    `<rect x="52" y="124" width="62" height="9" rx="4" fill="${INK}"/>` +
    `<line x1="60" y1="133" x2="60" y2="168" stroke="${INK}" stroke-width="5"/>` +
    `<line x1="106" y1="133" x2="106" y2="168" stroke="${INK}" stroke-width="5"/>` +
    head(76, 60) +
    poly(`79,72 83,122`) +
    poly(`83,124 124,120 150,118`, 6) +
    `<circle cx="130" cy="119" r="9" fill="${c}"/>` +
    `<line x1="130" y1="128" x2="138" y2="164" stroke="${INK}" stroke-width="5"/>`,
  "leg-curl": (c) =>
    bench(40, 160, 118) +
    head(52, 104) +
    poly(`62,108 120,112`) +
    poly(`120,112 142,116`, 7) +
    poly(`142,116 128,88`, 7) +
    `<circle cx="127" cy="84" r="8" fill="${c}"/>` +
    poly(`62,112 70,160`, 6),
  "calf-raise": (c) =>
    `<rect x="70" y="158" width="64" height="10" rx="3" fill="${INK}"/>` +
    head(100, 48) +
    poly(`100,60 100,118`) +
    poly(`100,118 96,150 96,156`, 6) +
    poly(`100,118 106,150 106,156`, 6) +
    `<path d="M 88 156 L 112 156 L 106 148 Z" fill="${c}"/>`,
  bridge: (c) =>
    head(50, 138) +
    poly(`60,142 106,126`) +
    poly(`106,126 136,146`, 7) +
    poly(`136,146 140,162`, 6) +
    `<path d="M 100 120 Q 106 112 112 122" fill="none" stroke="${c}" stroke-width="5" stroke-linecap="round"/>`,
  "overhead-press": (c) =>
    head(100, 54) +
    poly(`100,66 100,120`) +
    poly(`100,120 92,165`, 6) +
    poly(`100,120 110,165`, 6) +
    poly(`94,68 84,44`, 6) +
    poly(`106,68 116,44`, 6) +
    barbell(100, 40, c),
  "lateral-raise": (c) =>
    head(100, 50) +
    poly(`100,62 100,120`) +
    poly(`88,74 56,70`, 6) +
    poly(`112,74 144,70`, 6) +
    poly(`100,120 86,164`, 6) +
    poly(`100,120 114,164`, 6) +
    dumbbell(46, 70, c) +
    dumbbell(154, 70, c),
  "front-raise": (c) =>
    head(96, 52) +
    poly(`98,64 100,120`) +
    poly(`98,72 136,70`, 6) +
    dumbbell(144, 70, c) +
    poly(`100,120 94,164`, 6) +
    poly(`100,120 108,164`, 6),
  "rear-fly": (c) =>
    head(62, 74) +
    poly(`68,80 110,120`) +
    poly(`72,88 98,62`, 6) +
    dumbbell(102, 58, c) +
    poly(`110,120 116,142`, 7) +
    poly(`116,142 110,164`, 7),
  "upright-row": (c) =>
    head(100, 50) +
    poly(`100,62 100,120`) +
    poly(`100,120 92,165`, 6) +
    poly(`100,120 110,165`, 6) +
    poly(`94,66 72,74`, 6) +
    poly(`106,66 128,74`, 6) +
    barbell(100, 80, c),
  shrug: (c) =>
    head(100, 50) +
    poly(`100,62 100,120`) +
    poly(`100,120 92,165`, 6) +
    poly(`100,120 110,165`, 6) +
    poly(`94,68 84,124`, 6) +
    poly(`106,68 116,124`, 6) +
    barbell(100, 128, c),
  "curl-barbell": (c) =>
    head(100, 50) +
    poly(`100,62 100,120`) +
    poly(`100,120 92,165`, 6) +
    poly(`100,120 110,165`, 6) +
    poly(`94,68 82,96`, 6) +
    poly(`106,68 118,96`, 6) +
    barbell(100, 100, c, 64),
  "curl-dumbbell": (c) =>
    head(98, 50) +
    poly(`100,62 102,120`) +
    poly(`102,120 94,164`, 6) +
    poly(`102,120 110,164`, 6) +
    poly(`96,68 96,96 106,74`, 6) +
    dumbbell(110, 70, c) +
    poly(`102,74 100,126`, 6) +
    dumbbell(100, 132, c),
  pushdown: (c) =>
    head(84, 52) +
    poly(`87,64 89,118`) +
    poly(`89,118 83,164`, 6) +
    poly(`89,118 97,164`, 6) +
    poly(`88,70 104,100`, 6) +
    `<line x1="106" y1="102" x2="178" y2="28" stroke="${c}" stroke-width="4"/>` +
    `<circle cx="179" cy="27" r="6" fill="${INK}"/>`,
  "triceps-overhead": (c) =>
    head(100, 54) +
    poly(`100,66 100,120`) +
    poly(`100,120 92,165`, 6) +
    poly(`100,120 110,165`, 6) +
    poly(`98,70 116,52 108,38`, 6) +
    dumbbell(104, 34, c),
  "skull-crusher": (c) =>
    bench(50, 150, 116) +
    head(60, 106) +
    poly(`70,110 124,114`) +
    poly(`124,114 148,134 156,158`, 6) +
    poly(`74,106 86,78 80,60`, 6) +
    `<line x1="66" y1="56" x2="94" y2="56" stroke="${c}" stroke-width="6" stroke-linecap="round"/>`,
  "wrist-curl": (c) =>
    `<rect x="40" y="112" width="110" height="8" rx="4" fill="${INK}"/>` +
    head(52, 66) +
    poly(`55,78 59,110`) +
    poly(`62,108 64,158`, 6) +
    poly(`59,112 108,116`, 6) +
    `<path d="M 108 116 q 10 0 10 8" fill="none" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>` +
    dumbbell(120, 128, c),
  plank: () =>
    head(46, 104) +
    poly(`56,110 146,124`) +
    poly(`62,112 62,158 84,160`, 6) +
    poly(`146,124 174,162`, 6),
  "plank-side": (c) =>
    head(66, 92) +
    poly(`70,104 116,132 156,158`, 8) +
    poly(`70,106 70,156 90,160`, 6) +
    poly(`70,108 54,74`, 6) +
    `<circle cx="53" cy="68" r="6" fill="${c}"/>`,
  crunch: () =>
    head(58, 132) +
    poly(`68,138 104,132`) +
    poly(`104,134 130,118 142,150`, 6) +
    poly(`60,128 74,120`, 6),
  "leg-raise": (c) =>
    `<line x1="40" y1="22" x2="160" y2="22" stroke="${c}" stroke-width="6" stroke-linecap="round"/>` +
    head(100, 40) +
    poly(`100,52 100,96`) +
    poly(`100,54 88,24`, 6) +
    poly(`100,96 146,88`, 7),
  twist: (c) =>
    head(94, 62) +
    poly(`96,74 99,116`) +
    poly(`99,116 128,128 132,156`, 6) +
    poly(`90,78 56,74`, 6) +
    poly(`102,78 138,76`, 6) +
    `<circle cx="147" cy="76" r="8" fill="${c}"/>`,
  rollout: (c) =>
    `<circle cx="66" cy="140" r="13" fill="none" stroke="${c}" stroke-width="6"/>` +
    `<circle cx="66" cy="140" r="3" fill="${INK}"/>` +
    head(100, 78) +
    poly(`104,90 112,128`) +
    poly(`98,86 70,136`, 6) +
    poly(`112,128 138,158`, 6) +
    `<line x1="112" y1="136" x2="138" y2="164" stroke="${INK}" stroke-width="6" stroke-linecap="round"/>`,
};

function wrap(inner) {
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">` +
    `<rect width="200" height="200" rx="20" fill="#fafafa"/>` +
    `<rect x="1" y="1" width="198" height="198" rx="19" fill="none" stroke="#e4e4e7" stroke-width="2"/>` +
    `<ellipse cx="100" cy="174" rx="58" ry="6" fill="#e4e4e7"/>` +
    inner +
    `</svg>`
  );
}

fs.mkdirSync(OUT_DIR, { recursive: true });

let count = 0;
const missing = [];

for (const file of fs.readdirSync(DATA_DIR)) {
  const text = fs.readFileSync(path.join(DATA_DIR, file), "utf8");
  for (const m of text.matchAll(/\{[^{}]*\}/g)) {
    const block = m[0];
    const id = block.match(/id:\s*"([^"]+)"/)?.[1];
    const template = block.match(/template:\s*"([^"]+)"/)?.[1];
    const group = block.match(/muscleGroup:\s*"([^"]+)"/)?.[1];
    if (!id || !template || !group) continue;
    const pose = POSES[template];
    if (!pose) {
      missing.push(`${id} -> ${template}`);
      continue;
    }
    fs.writeFileSync(
      path.join(OUT_DIR, `${id}.svg`),
      wrap(pose(GROUP_COLORS[group]))
    );
    count++;
  }
}

console.log(`Generated ${count} exercise illustrations.`);
if (missing.length) {
  console.error("Missing templates:");
  missing.forEach((m) => console.error(" -", m));
  process.exit(1);
}
