/**
 * Local photo preparation — reads private-photo-input/, writes public/photos/
 * and src/data/gallery-manifest.json. Never modifies originals.
 */
import fs from "fs/promises";
import path from "path";
import sharp from "sharp";

const ROOT = process.cwd();
const INPUT_DIR = path.join(ROOT, "private-photo-input");
const CONFIG_PATH = path.join(INPUT_DIR, "prepare.config.json");
const OUTPUT_DIR = path.join(ROOT, "public", "photos");
const MANIFEST_PATH = path.join(ROOT, "src", "data", "gallery-manifest.json");

const MAX_EDGE = 1600;
const WEBP_QUALITY = 82;
const ALLOWED_INPUT = new Set([".jpg", ".jpeg", ".png", ".webp"]);
const OUTPUT_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*\.webp$/;

async function pathExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

function logError(message) {
  console.error(`\x1b[31mError:\x1b[0m ${message}`);
}

function logWarn(message) {
  console.warn(`\x1b[33mWarning:\x1b[0m ${message}`);
}

function logOk(message) {
  console.log(`\x1b[32m✓\x1b[0m ${message}`);
}

async function loadConfig() {
  if (!(await pathExists(CONFIG_PATH))) {
    throw new Error(
      `Missing ${path.relative(ROOT, CONFIG_PATH)}. Copy the template from private-photo-input/README.md.`,
    );
  }
  const raw = await fs.readFile(CONFIG_PATH, "utf8");
  const parsed = JSON.parse(raw);
  if (!parsed || !Array.isArray(parsed.items)) {
    throw new Error("`prepare.config.json` must contain an \"items\" array.");
  }
  return parsed.items;
}

function validateOutputName(name, label) {
  if (typeof name !== "string" || !OUTPUT_PATTERN.test(name)) {
    throw new Error(
      `${label}: output must match safe names like hero.webp or photo-01.webp (lowercase, hyphens, .webp only).`,
    );
  }
  if (name.includes("/") || name.includes("\\") || name.includes("..")) {
    throw new Error(`${label}: output must be a plain filename, not a path.`);
  }
}

async function convertOne(inputPath, outputPath) {
  const image = sharp(inputPath, { failOn: "none" });
  const meta = await image.metadata();

  let pipeline = sharp(inputPath).rotate(); // respect EXIF orientation

  const width = meta.width ?? 0;
  const height = meta.height ?? 0;
  const longest = Math.max(width, height);

  if (longest > MAX_EDGE) {
    pipeline = pipeline.resize({
      width: MAX_EDGE,
      height: MAX_EDGE,
      fit: "inside",
      withoutEnlargement: true,
    });
  }

  await pipeline
    .webp({ quality: WEBP_QUALITY, effort: 4 })
    .toFile(outputPath);

  const outMeta = await sharp(outputPath).metadata();
  return {
    width: outMeta.width ?? width,
    height: outMeta.height ?? height,
  };
}

async function main() {
  console.log("Preparing photos for Aysha's Little Universe…\n");

  let items;
  try {
    items = await loadConfig();
  } catch (err) {
    logError(err instanceof Error ? err.message : String(err));
    process.exitCode = 1;
    return;
  }

  const seenOutputs = new Map();
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const label = `items[${i}]`;
    if (!item || typeof item !== "object") {
      logError(`${label}: must be an object with "input" and "output".`);
      process.exitCode = 1;
      return;
    }
    const { input, output } = item;
    if (typeof input !== "string" || typeof output !== "string") {
      logError(`${label}: "input" and "output" must be strings.`);
      process.exitCode = 1;
      return;
    }
    try {
      validateOutputName(output, label);
    } catch (err) {
      logError(err instanceof Error ? err.message : String(err));
      process.exitCode = 1;
      return;
    }
    if (seenOutputs.has(output)) {
      logError(
        `Duplicate output name "${output}" (${seenOutputs.get(output)} and ${label}). Each output must be unique.`,
      );
      process.exitCode = 1;
      return;
    }
    seenOutputs.set(output, label);
  }

  await fs.mkdir(OUTPUT_DIR, { recursive: true });

  const successful = [];
  let hadFailure = false;

  for (const item of items) {
    const inputFile = item.input;
    const outputFile = item.output;
    const inputPath = path.join(INPUT_DIR, inputFile);
    const ext = path.extname(inputFile).toLowerCase();

    if (!ALLOWED_INPUT.has(ext)) {
      logError(
        `Skipping "${inputFile}": unsupported type (use JPEG, PNG, or WebP).`,
      );
      hadFailure = true;
      continue;
    }

    if (!(await pathExists(inputPath))) {
      logWarn(`Input not found, skipping: ${inputFile}`);
      continue;
    }

    const outputPath = path.join(OUTPUT_DIR, outputFile);

    try {
      const { width, height } = await convertOne(inputPath, outputPath);
      successful.push({
        output: outputFile,
        src: `/photos/${outputFile}`,
        width,
        height,
        sourceInput: inputFile,
      });
      logOk(`${inputFile} → public/photos/${outputFile} (${width}×${height})`);
    } catch (err) {
      logError(
        `Failed to convert "${inputFile}": ${err instanceof Error ? err.message : String(err)}`,
      );
      hadFailure = true;
    }
  }

  const manifest = {
    version: 1,
    generatedAt: new Date().toISOString(),
    files: successful,
  };

  await fs.writeFile(MANIFEST_PATH, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
  console.log(
    `\nWrote manifest with ${successful.length} file(s): ${path.relative(ROOT, MANIFEST_PATH)}`,
  );

  if (successful.length === 0) {
    logWarn(
      "No photos were converted. Add files to private-photo-input/ and match them in prepare.config.json.",
    );
  }

  if (hadFailure) {
    process.exitCode = 1;
  }
}

main().catch((err) => {
  logError(err instanceof Error ? err.message : String(err));
  process.exit(1);
});
