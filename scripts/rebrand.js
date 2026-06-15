const fs = require("fs");
const path = require("path");

const replacements = [
  ["ARBIChO", "FIPHO"],
  ["ARBICHO", "FIPHO"],
  ["Abu Rayhan Biruni", "Ahmad al-Fargʻoniy"],
  ["Abu Rayhan Beruni", "Ahmad al-Fargʻoniy"],
  ["arbicho@olympcenter.uz", "info@fipho.uz"],
  ["info@arbicho.com", "info@fipho.uz"],
  ["@arbicho.com", "@fipho.uz"],
  ["arbicho.uz", "fipho.uz"],
  ["/past-arbicho", "/past-fipho"],
  ["/future-arbicho", "/future-fipho"],
  ["/arbicho-sponsors", "/fipho-sponsors"],
  ["Chemistry Olympiad", "Physics Olympiad"],
  ["chemistry olympiad", "physics olympiad"],
  ["International Chemistry", "International Physics"],
  ["Chemistry Competition", "Physics Competition"],
  ["chemistry competition", "physics competition"],
  ["chemists", "physicists"],
  ["chemist", "physicist"],
  ["chemistry", "physics"],
  ["Chemistry", "Physics"],
  ["bg-[#011c2c]", "bg-fipho-navy"],
  ["from-[#011c2c]", "from-fipho-navy"],
  ["to-[#011c2c]", "to-fipho-navy"],
  ["from-[#012e40]", "from-fipho-navy-light"],
  ["to-[#012e40]", "to-fipho-navy-light"],
  ["from-[#012c43]", "from-fipho-navy-light"],
  ["to-[#023430]", "to-fipho-navy"],
  ["from-[#023430]", "from-fipho-navy"],
  ["emerald-500/5", "fipho-blue/5"],
  ["emerald-500/10", "fipho-blue/10"],
  ["emerald-500/20", "fipho-blue/20"],
  ["emerald-800/20", "fipho-blue/20"],
  ["emerald-800/10", "fipho-blue/10"],
  ["emerald-900/10", "fipho-light/80"],
  ["emerald-900/95", "fipho-navy/95"],
  ["emerald-950", "fipho-navy"],
  ["emerald-500", "fipho-blue"],
  ["emerald-400", "fipho-gold"],
  ["emerald-300", "fipho-gold"],
  ["emerald-100/80", "fipho-slate/70"],
  ["emerald-100/70", "fipho-slate/70"],
  ["emerald-100/90", "fipho-slate/80"],
  ["emerald-100", "fipho-navy"],
  ["hover:bg-emerald-600", "hover:bg-fipho-blue/90"],
  ["hover:bg-emerald-950/50", "hover:bg-fipho-navy/10"],
  ["hover:text-emerald-50", "hover:text-white"],
  ["hover:text-emerald-300", "hover:text-fipho-gold"],
  ["hover:text-emerald-100", "hover:text-fipho-gold"],
  ["border-emerald-400/50", "border-fipho-blue/30"],
  ["text-emerald-500/70", "text-fipho-blue/70"],
  ["bg-emerald-600", "bg-fipho-blue"],
  ["from-emerald-900", "from-fipho-navy"],
  ["to-emerald-950", "to-fipho-navy"],
  ["from-emerald-600", "from-fipho-blue"],
  ["to-emerald-900", "to-fipho-navy"],
  ["arbicho", "fipho"],
  ["Arbicho", "FIPHO"],
];

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory() && entry.name !== "node_modules" && entry.name !== ".next") {
      walk(full, files);
    } else if (/\.(tsx?|jsx?)$/.test(entry.name)) {
      files.push(full);
    }
  }
  return files;
}

const root = path.join(__dirname, "..");
const dirs = ["app", "components", "data"].map((d) => path.join(root, d));
let count = 0;

for (const dir of dirs) {
  if (!fs.existsSync(dir)) continue;
  for (const file of walk(dir)) {
    if (file.includes("node_modules")) continue;
    let content = fs.readFileSync(file, "utf8");
    const original = content;
    for (const [from, to] of replacements) {
      content = content.split(from).join(to);
    }
    if (content !== original) {
      fs.writeFileSync(file, content);
      count++;
      console.log("Updated:", file);
    }
  }
}

console.log(`Done. Updated ${count} files.`);
