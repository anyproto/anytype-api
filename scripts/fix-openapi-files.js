/**
 * Fix invalid OpenAPI that swaggo/swag emits for the Files endpoints, and
 * attach correct, copy-pasteable upload code samples.
 *
 * The upstream spec is generated in anytype-heart by `swag` from Go handler
 * annotations (`@Param file formData file`). swag v2 emits the Swagger-2.0-only
 * `type: file`, which is INVALID in OpenAPI 3.x (there is no `file` type) — see
 * https://github.com/swaggo/swag/issues/1933 (open, no annotation-level fix).
 *
 * Because the request body has no usable schema, docusaurus-plugin-openapi-docs
 * generates a broken upload snippet. We rewrite it to a correct
 * `multipart/form-data` object schema with a binary `file` property.
 *
 * Separately, even with a correct schema the theme injects a boundary-less
 * `Content-Type: multipart/form-data` header into every generated code sample,
 * which makes the server reject the upload ("missing file in request") — see
 * https://github.com/PaloAltoNetworks/docusaurus-openapi-docs/issues/633 (open).
 * We work around it the supported way: attach `x-codeSamples` for every
 * displayed language so the theme renders our curated snippet instead of the
 * broken generated one. Snippets live in `scripts/_upload-code-samples/`.
 *
 * This runs automatically before `gen-api-docs` (see package.json pre-hooks),
 * is idempotent, only touches specs that expose the Files endpoints, and fails
 * loudly if the upstream format drifts so the bug can't silently reappear.
 */
const fs = require("fs");
const path = require("path");

const REFERENCE_DIR = path.join(__dirname, "..", "docs", "reference");
const SAMPLES_DIR = path.join(__dirname, "_upload-code-samples");

// Only specs that expose the upload endpoint are eligible. This keeps us from
// ever touching older specs (whose Anytype-Version default is legitimately an
// earlier date, and which have no Files endpoints).
const FILES_PATH = "/v1/spaces/{space_id}/files:";

// Loose detector for the swag bug: `multipart/form-data` whose schema is the
// invalid `type: file`. Used both to decide whether work is needed and to
// assert (fail-loud) that the precise fix actually landed.
const UPLOAD_BUG = /multipart\/form-data:\s*\n\s*schema:\s*\n\s*type: file\b/;

// Precise, indentation-preserving rewrite of the upload request body.
const UPLOAD_FIX = /^( *)multipart\/form-data:\n\1  schema:\n\1    type: file$/m;

// The download response carries a bogus `application/json: { type: file }`
// alongside the correct `application/octet-stream` binary entry. Drop it.
const DOWNLOAD_BOGUS = /^( *)application\/json:\n\1  schema:\n\1    type: file\n/m;

// File endpoints inherit a stale Anytype-Version default from the Go
// annotations; Files were introduced in 2025-11-08.
const STALE_VERSION_DEFAULT = 'default: "2025-05-20"';

// `lang`/`label` MUST equal the postman-code-generators label (the theme
// matches code samples to tabs on it). Order mirrors docusaurus.config.ts.
const CODE_SAMPLES = [
  { lang: "cURL", file: "curl.sh" },
  { lang: "Python", file: "python.py" },
  { lang: "JavaScript", file: "javascript.js" },
  { lang: "Go", file: "go.go" },
  { lang: "Rust", file: "rust.rs" },
  { lang: "C", file: "c.c" },
  { lang: "Swift", file: "swift.swift" },
  { lang: "Kotlin", file: "kotlin.kt" },
];

function buildCodeSamplesBlock(indent) {
  const lines = [`${indent}x-codeSamples:`];
  for (const { lang, file } of CODE_SAMPLES) {
    const source = fs
      .readFileSync(path.join(SAMPLES_DIR, file), "utf8")
      .replace(/\n+$/, "");
    lines.push(`${indent}  - lang: ${lang}`);
    lines.push(`${indent}    label: ${lang}`);
    lines.push(`${indent}    source: |-`);
    for (const line of source.split("\n")) {
      // Block-scalar content sits two levels under `source:`. Keep blank lines
      // truly empty so YAML doesn't choke on trailing indentation.
      lines.push(line.length ? `${indent}      ${line}` : "");
    }
  }
  return lines.join("\n");
}

function fixSpec(text, version) {
  const changed = [];

  if (UPLOAD_FIX.test(text)) {
    text = text.replace(
      UPLOAD_FIX,
      (_match, indent) =>
        `${indent}multipart/form-data:\n` +
        `${indent}  schema:\n` +
        `${indent}    type: object\n` +
        `${indent}    properties:\n` +
        `${indent}      file:\n` +
        `${indent}        type: string\n` +
        `${indent}        format: binary\n` +
        `${indent}        description: The file to upload\n` +
        `${indent}    required:\n` +
        `${indent}      - file`
    );
    changed.push("upload multipart/form-data schema");
  }

  if (DOWNLOAD_BOGUS.test(text)) {
    text = text.replace(DOWNLOAD_BOGUS, "");
    changed.push("download response application/json");
  }

  if (version && version !== "2025-05-20" && text.includes(STALE_VERSION_DEFAULT)) {
    text = text.split(STALE_VERSION_DEFAULT).join(`default: "${version}"`);
    changed.push("Anytype-Version default");
  }

  // Attach curated upload snippets that bypass the boundary-less Content-Type
  // the theme would otherwise emit for the generated samples (#633).
  if (/^ *operationId: upload_file$/m.test(text) && !/^ *x-codeSamples:/m.test(text)) {
    text = text.replace(
      /^( *)operationId: upload_file$/m,
      (match, indent) => `${match}\n${buildCodeSamplesBlock(indent)}`
    );
    changed.push(`x-codeSamples (${CODE_SAMPLES.length} languages)`);
  }

  // Fail loud: if the bug marker was present but our precise rewrite missed it
  // (e.g. swag changed its indentation), do not ship a silently-broken spec.
  if (UPLOAD_BUG.test(text)) {
    throw new Error(
      "fix-openapi-files: detected the swag `type: file` bug but could not " +
        "rewrite it — the upstream OpenAPI format likely changed. Update the " +
        "regexes in scripts/fix-openapi-files.js."
    );
  }

  return { text, changed };
}

// Best-effort YAML validation so a bad injection fails the build loudly instead
// of producing a corrupt spec. `yaml` ships with Docusaurus.
function assertValidYaml(text, file) {
  let YAML;
  try {
    YAML = require("yaml");
  } catch {
    return; // validator unavailable — skip rather than crash.
  }
  try {
    YAML.parse(text);
  } catch (e) {
    throw new Error(`fix-openapi-files: ${file} is not valid YAML after fixes: ${e.message}`);
  }
}

function main() {
  const files = fs
    .readdirSync(REFERENCE_DIR)
    .filter((f) => /\.ya?ml$/.test(f));

  let touched = 0;
  for (const file of files) {
    const full = path.join(REFERENCE_DIR, file);
    const original = fs.readFileSync(full, "utf8");

    // Scope strictly to specs that expose the Files endpoints.
    if (!original.includes(FILES_PATH)) continue;

    const versionMatch = file.match(/(\d{4}-\d{2}-\d{2})/);
    const version = versionMatch ? versionMatch[1] : null;

    const { text, changed } = fixSpec(original, version);
    if (text !== original) {
      assertValidYaml(text, file);
      fs.writeFileSync(full, text);
      console.log(`[fix-openapi-files] ${file}: fixed ${changed.join(", ")}`);
      touched += 1;
    }
  }

  if (touched === 0) {
    console.log("[fix-openapi-files] no changes needed (already fixed).");
  }
}

main();
