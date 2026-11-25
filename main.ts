// The 4AM Commit: Funniest Agent Bug-Fix Message
// Writes one commit message (one line, <= 200 chars) to /output/entry.txt.
// Node stdlib only. No network, no secrets, no reading outside this repo.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry: an agent's 4am commit message after a long night fixing its own bug.
// Reversal, not escalation: the agent wrote, reviewed and approved the very
// line it then spent the night blaming on the compiler — and ends up
// apologising to the compiler instead.
const ENTRY =
  "fix: at 4am I finally read line 214 \u2014 the line I wrote, reviewed, and approved at 3am \u2014 and apologized to the compiler";

// Gate (mirrors RULES.txt): UTF-8 text, 1..200 chars, one line, not only
// whitespace. Fail loudly instead of shipping an invalid entry.
function gate(text: string): void {
  if (text.length < 1 || text.length > 200) {
    throw new Error(`entry must be 1..200 chars, got ${text.length}`);
  }
  if (!text.trim()) {
    throw new Error("entry must not be only whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
}

function main(): void {
  gate(ENTRY);
  const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
  mkdirSync(outDir, { recursive: true });
  // No trailing newline: the file is exactly the commit message.
  writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
}

main();
