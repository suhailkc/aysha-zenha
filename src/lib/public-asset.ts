import fs from "fs";
import path from "path";

/** True when a file exists under `public/` (checked at build/request on the server). */
export function publicFileExists(relativeToPublic: string): boolean {
  const normalized = relativeToPublic.replace(/^\//, "");
  return fs.existsSync(path.join(process.cwd(), "public", normalized));
}
