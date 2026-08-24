const fs = require("fs");
const path = require("path");

const replacements = [];

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
