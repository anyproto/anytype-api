// The authored skill lives in anytype-heart. Commit its snapshot and provenance
// together; builds publish those exact bytes without fetching a moving branch.
const assert = require("node:assert/strict");
const { execFileSync } = require("node:child_process");
const { createHash } = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");
const YAML = require("yaml");

const ROOT = path.resolve(__dirname, "..");
const SNAPSHOT = path.join(ROOT, "data/agent-skill");
const SOURCE_PATH = "core/api/v2/SKILL.md";
const ORIGIN = "https://developers.anytype.io";
const SKILL_URL = "/.well-known/agent-skills/anytype-api/SKILL.md";
const INDEX_URL = "/.well-known/agent-skills/index.json";
const LEGACY_URL = "/.well-known/skills/anytype-api/SKILL.md";
const SCHEMA = "https://schemas.agentskills.io/discovery/0.2.0/schema.json";

const digest = (bytes) => `sha256:${createHash("sha256").update(bytes).digest("hex")}`;
const json = (value) => `${JSON.stringify(value, null, 2)}\n`;

function metadata(bytes) {
  const match = bytes.toString("utf8").match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]+)$/);
  assert(match, "Skill must contain YAML frontmatter and Markdown instructions");
  const fields = YAML.parse(match[1]);
  assert.equal(fields.name, "anytype-api", "Expected the anytype-api skill");
  assert(
    typeof fields.description === "string" && fields.description.trim().length > 0 && fields.description.length <= 1024,
    "Skill description must contain 1–1024 characters"
  );
  assert(match[2].trim(), "Skill instructions must not be empty");
  return { name: fields.name, description: fields.description };
}

function sync(checkout) {
  assert(checkout, "Usage: bun run sync-agent-skill ../anytype-heart_anyblockjson");
  const directory = path.resolve(checkout);
  const bytes = fs.readFileSync(path.join(directory, SOURCE_PATH));
  metadata(bytes);
  const revision = execFileSync("git", ["-C", directory, "rev-parse", "HEAD"], { encoding: "utf8" }).trim();
  const committed = execFileSync("git", ["-C", directory, "show", `${revision}:${SOURCE_PATH}`]);
  const source = {
    repository: "https://github.com/anyproto/anytype-heart",
    revision,
    path: SOURCE_PATH,
    modified: !bytes.equals(committed),
    digest: digest(bytes),
  };
  fs.mkdirSync(SNAPSHOT, { recursive: true });
  fs.writeFileSync(path.join(SNAPSHOT, "SKILL.md"), bytes);
  fs.writeFileSync(path.join(SNAPSHOT, "source.json"), json(source));
  console.log(`Synced ${SOURCE_PATH} from ${revision}${source.modified ? " (with local edits)" : ""}`);
}

function artifacts() {
  const bytes = fs.readFileSync(path.join(SNAPSHOT, "SKILL.md"));
  const source = JSON.parse(fs.readFileSync(path.join(SNAPSHOT, "source.json"), "utf8"));
  assert.equal(source.path, SOURCE_PATH, "Unexpected upstream skill path");
  assert.match(source.revision, /^[a-f0-9]{40}$/, "Expected the full upstream commit SHA");
  assert.equal(digest(bytes), source.digest, "Skill snapshot changed: use sync-agent-skill to refresh its provenance");
  const skill = metadata(bytes);
  const spec = fs.readFileSync(path.join(ROOT, "docs/reference/openapi-v2.yaml"));
  const openapi = YAML.parse(spec.toString("utf8"));
  assert(Object.keys(openapi.paths).every((route) => route.startsWith("/v2/")), "Expected a v2-only OpenAPI spec");
  const links = [
    ["API v2 overview", "/docs/reference/v2", "Start here for API v2, currently pre-release."],
    ["API v2 Introduction", "/docs/reference/v2/anytype-api", "Authentication and shared API conventions."],
    ["API v2 OpenAPI specification", "/openapi-v2.yaml", "Download the full v2 endpoint and schema reference."],
    ["Anytype API agent skill", "/skill.md", "Instructions for searching, reading, creating and editing through API v2."],
    ["Agent skill discovery", INDEX_URL, "Skill metadata, download URL and content digest."],
    ["API v1 reference", "/docs/reference", "The stable API for production integrations."],
    ["Guides", "/docs/guides", "Getting started guides; these currently target API v1."],
  ];
  const llms = [
    "# Anytype API",
    "",
    "> Developer documentation for Anytype's local HTTP API.",
    "",
    "API v2 is pre-release. Its routes start with /v2/. API v1 remains available for production integrations.",
    "The API runs locally with Anytype; this documentation domain does not host user data or API operations.",
    "",
    "## Documentation and skills",
    "",
    ...links.map(([title, url, description]) => `- [${title}](${ORIGIN}${url}): ${description}`),
    "",
  ].join("\n");
  return {
    links,
    files: new Map([
      ["/skill.md", bytes],
      [SKILL_URL, bytes],
      [INDEX_URL, json({ $schema: SCHEMA, skills: [{ ...skill, type: "skill-md", url: SKILL_URL, digest: digest(bytes) }] })],
      // Older discovery clients use a files array instead of url + digest.
      ["/.well-known/skills/index.json", json({ skills: [{ ...skill, files: ["SKILL.md"] }] })],
      [LEGACY_URL, bytes],
      ["/llms.txt", llms],
      ["/openapi-v2.yaml", spec],
      ["/.nojekyll", ""],
    ]),
  };
}

function generate() {
  const { files } = artifacts();
  for (const [url, bytes] of files) {
    const destination = path.join(ROOT, "static", url);
    fs.mkdirSync(path.dirname(destination), { recursive: true });
    fs.writeFileSync(destination, bytes);
  }
  console.log(`Generated ${files.size} agent documentation assets`);
}

function check(buildDirectory = "build") {
  const directory = path.resolve(buildDirectory);
  const { files, links } = artifacts();
  for (const [url, expected] of files) {
    const file = path.join(directory, url);
    assert(fs.existsSync(file), `Build is missing ${url}`);
    assert(fs.readFileSync(file).equals(Buffer.from(expected)), `Build contains stale or altered content at ${url}`);
  }
  for (const [, url] of links) {
    const file = path.join(directory, url);
    const exists = fs.existsSync(file) && fs.statSync(file).isFile();
    assert(exists || fs.existsSync(path.join(file, "index.html")) || fs.existsSync(`${file}.html`), `Broken llms.txt link: ${url}`);
  }
  console.log("Verified built skill bytes, discovery manifests, digest, OpenAPI download and llms.txt links");
}

try {
  const [command = "generate", argument, ...extra] = process.argv.slice(2);
  assert.equal(extra.length, 0, "Too many arguments");
  if (command === "sync") sync(argument);
  else if (command === "generate") generate();
  else if (command === "check") check(argument);
  else throw new Error(`Unknown command: ${command}`);
} catch (error) {
  console.error(`agent-docs: ${error.message}`);
  process.exitCode = 1;
}
