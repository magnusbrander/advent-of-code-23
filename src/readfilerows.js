import { readFileSync } from "fs";

/**
 *
 * @param {string} path
 * @returns {string[]}
 */
function readFileRows(path) {
  const fileContent = readFileSync(path, { encoding: "utf8" });
  const rows = fileContent.split("\n");
  return rows;
}

export { readFileRows };
