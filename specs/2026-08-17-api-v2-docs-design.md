# Anytype API v2 (pre-release) in the docs site

**Date:** 2026-08-17
**Status:** Approved, ready for implementation planning

## Problem

The site documents one API. Its version dropdown selects among *date versions*
(`2025-11-08`, `2025-05-20`, `2025-04-22`) — the values of the `Anytype-Version`
header. Every one of those specs describes `/v1/...` paths.

`anytype-heart` now generates a second OpenAPI document for API v2
(`core/api/docs/v2/openapi.yaml`): 45 operations over `/v2/...`, twelve resource
tags, no `Anytype-Version` parameter on any route. It ships as a pre-release.

The site needs to serve both, and a reader needs to be able to move between them
without guessing at URLs.

## Decisions

| Decision | Choice | Why |
| --- | --- | --- |
| Where v2 lives in the UI | One dropdown, two labelled groups | v1's date list stays exactly as it is; v2 sits above it as a single entry |
| v2 URL | `/docs/reference/v2` (dateless) | v2 has no date axis yet; adding one to the URL would document a version the API does not honour |
| v2 sidebar grouping | Upstream `@Tags` (already fixed) | Landed in anytype-heart before this design; twelve tags with descriptions |
| Plugin wiring | Second API instance `anytypeV2` | Keeps v2's future date versions out of v1's version map |
| `info.title` | Normalize to `Anytype API` in our copy | `kebabCase("Anytype API v2")` is `anytype-api-v-2`, a malformed-looking URL |
| `info.version` | **Leave as `2025-11-08`** | Load-bearing upstream: it is the `Anytype-Version` header v2 also reports (`core/api/v2/doc.go`) |
| Pre-release signalling | Landing page + site announcement bar + dropdown label | Covers dropdown arrivals, deep links, and every other page on the site |
| Site search | Index v2 alongside v1 latest | v2 endpoints should be findable during pre-release |
| Changelog | One new section announcing v2 | Consistent with how every other API change is recorded |

Rejected: modelling v2 as a fourth version key inside the existing `anytype`
instance. Smaller diff today, wrong at GA — the plugin merges the parent version
into `versions.json`, so v1's and v2's date versions would land in one flat map
and fight over which is "latest".

## Architecture

### 1. Plugin instance

`docusaurus-plugin-openapi-docs` takes a record of instance-id → options. Today
it holds one key, `anytype`. v2 becomes a second key, `anytypeV2`, with no
`version`/`versions` fields — a non-versioned instance, because v2 has a single
document.

```ts
// openapi.config.ts
export interface OpenApiV2Config {
  specPath: string;
  outputDir: string;
  label: string;        // "v2"
  baseUrl: string;      // "/docs/reference/v2" — the landing page
  downloadUrl: string;
}

export const openApiV2Config: OpenApiV2Config = {
  specPath: "docs/reference/openapi-v2.yaml",
  outputDir: "docs/reference/v2",
  label: "v2",
  baseUrl: "/docs/reference/v2",
  downloadUrl:
    "https://raw.githubusercontent.com/anyproto/anytype-api/main/docs/reference/openapi-v2.yaml",
};
```

`getOpenApiPluginConfig()` returns both instances. v2's `sidebarOptions` match
v1's (`groupPathsBy: "tag"`, `categoryLinkSource: "tag"`).

Safety, verified against the installed plugin: `cleanApiDocs` globs
`*.api.mdx`, `*.info.mdx`, `*.tag.mdx`, `sidebar.{js,ts}` and `*.json` at
`deep: 1` inside its own `outputDir`, plus `rm -rf outputDir/schemas`. Cleaning
`docs/reference/` therefore never reaches into `docs/reference/v2/`, and vice
versa. The two instances can share a parent directory.

`package.json` extends `make-reference` to cover both instances:

```
"make-reference":
  "bun run clean-api-docs:version anytype:all
   && bun run gen-api-docs:version anytype:all
   && bun run clean-api-docs anytypeV2
   && bun run gen-api-docs anytypeV2"
```

The existing `pregen-api-docs` hook runs `fix-openapi` before each generate, so
the normalization in §2 applies to both invocations.

### 2. Spec sync and normalization

The spec is copied by hand from anytype-heart, matching how the v1 specs are
maintained:

```
cp ../anytype-heart/core/api/docs/v2/openapi.yaml docs/reference/openapi-v2.yaml
```

`scripts/fix-openapi-files.js` gains one v2 rule. Scope it the way the file
already scopes its v1 rules — by detecting a path in the document, not by
filename:

- **Detector:** the document contains a line matching `/^ {2}\/v2\//m`.
- **Rule:** rewrite `^  title: Anytype API v2$` to `  title: Anytype API`.
- **Idempotent:** a second run finds the normalized title and does nothing.
- **Fail loud:** if a v2 document has neither the original nor the normalized
  title, throw — the upstream general-info block changed and the URL would
  silently move.

Rationale for the rewrite: the plugin derives the Introduction page's `id` from
`kebabCase(info.title)`, and lodash splits letter-digit boundaries, so
`Anytype API v2` becomes `anytype-api-v-2`. Every title containing `v2` has this
problem — there is no title string that both says "v2" and produces a clean id.
The v2 marker is carried by the URL, the dropdown, and the landing page instead.

Nothing else in the spec is touched. In particular `info.version` stays
`2025-11-08`: `core/api/v2/doc.go` documents it as deliberately equal to v1's,
being the `Anytype-Version` header value one gin engine sets for both route
groups. Rewriting it would make the downloadable spec disagree with the running
server.

Two upstream fixes already landed and need no work here: the twelve resource
tags (was a single `V2` tag) and the unprefixed operationIds (was `v2_*`, which
would have produced `/docs/reference/v2/v2-create-object`).

### 3. URL map

| Page | URL |
| --- | --- |
| v2 landing (hand-written) | `/docs/reference/v2` |
| v2 Introduction (generated from spec) | `/docs/reference/v2/anytype-api` |
| v2 tag category | `/docs/reference/v2/objects` |
| v2 operation | `/docs/reference/v2/create-object` |
| v1 latest (unchanged) | `/docs/reference`, `/docs/reference/2025-11-08/...` |
| v1 pinned (unchanged) | `/docs/reference/2025-05-20/...` |

**No existing URL changes.** Doc ids are directory-scoped, so
`reference/v2/create-object` and `reference/2025-11-08/create-object` coexist.

### 4. Version dropdown

`sidebars.ts` currently imports the plugin-generated
`docs/reference/versions.json` — it is that file's only reader. It stops doing
so and builds the dropdown from `openapi.config.ts`, which can carry the group
metadata a flat JSON array cannot. The generated `versions.json` continues to be
written by the plugin; it simply becomes unread.

```ts
export interface VersionGroup {
  title: string;
  items: { label: string; display: string; href: string }[];
}

export function getVersionGroups(): VersionGroup[];
```

Returns two groups: `API v2 — pre-release` (one item, display `v2`), then
`API v1` (`showVersions` in order, the latest suffixed `(latest)`).

```
┌──────────────────────────────────┐
│ API Version: v2 (pre-release)  ▾ │
├──────────────────────────────────┤
│  API v2 — pre-release            │
│    ● v2                          │
│  API v1                          │
│    2025-11-08  (latest)          │
│    2025-05-20                    │
│    2025-04-22                    │
└──────────────────────────────────┘
```

`versionDropdown()` takes `(currentDisplay, groups)` instead of
`(currentVersion, versions)`. Group titles render as non-interactive `<li>`
elements — not `dropdown__link`, so they are not focusable and not clickable.
`src/css/custom.css` gains a rule for the group-title class: smaller, muted,
uppercase, matching the existing dropdown metrics.

The button label shows the current entry's `display` value, so a v2 page reads
`API Version: v2 (pre-release)` and a v1 page reads `API Version: 2025-11-08`,
as today.

### 5. Sidebar

`sidebars.ts` adds `import referenceSidebarV2 from "./docs/reference/v2/sidebar"`
and exports an `openApiSidebarV2` key.

v2's sidebar mirrors `buildApiSidebar()` with one difference: the Reference
category's `link` is a `type: "doc"` pointing at the hand-written landing page,
rather than the `generated-index` v1 uses.

```
[ version dropdown ]
Reference  →  /docs/reference/v2   (hand-written landing page)
  Introduction                     (generated .info.mdx)
  Auth · Spaces · Objects · Search · Types · Properties
  Lists · Chat · Members · Files · Templates · Schemas
Changelog                          (ref)
```

The twelve categories come from the spec's top-level `tags:` block, so each
category page carries its tag description — better than v1, whose spec has no
top-level `tags:` at all.

The existing `missingReferenceSidebars` guard is extended to cover v2, so
forgetting the import fails the build with the same helpful error rather than
rendering an empty sidebar.

### 6. Landing page

New file `docs/reference/v2-overview.mdx`, with `slug: /reference/v2`.

It lives **outside** the generated `docs/reference/v2/` directory on purpose:
`clean-api-docs` operates inside `outputDir`, and keeping hand-written content
out of a generated tree removes any chance of a regeneration eating it.

Content:

1. A `:::warning` admonition: v2 is a pre-release, its surface may change without
   a version bump, and it should not be depended on by shipped integrations yet.
2. What v2 is — AnyBlock JSON documents rather than block trees (one GET returns
   an editable document, one PATCH edits it); one vocabulary (snake_case
   throughout, addressed by name rather than by id); compact responses; a single
   error shape with path-addressed issues; `etag`/`If-Match`;
   `Idempotency-Key`; `?dry_run=true`; paginated list surfaces;
   runtime-discoverable schemas; short space references.

   Note: the C2 vocabulary rule is upstream prose in `core/api/v2/doc.go` and
   has changed once already during pre-release. Re-read it from the synced spec
   before restating it here.
3. A v1 → v2 orientation table for readers who know v1.
4. A link into the generated Introduction for the spec description and download.

### 7. Search, sitemap, changelog, announcement bar

**Search.** `@easyops-cn/docusaurus-search-local` currently ignores
`reference/(?!2025-11-08/).*`, indexing only v1 latest. It becomes:

```ts
ignoreFiles: [new RegExp(`reference/(?!(${openApiConfig.latestVersion}/|v2))`)]
```

Note the placement of the slash: `v2` without a trailing slash so the pattern
covers both `reference/v2/...` (generated pages) and `reference/v2-overview`
(the landing page's source path).

*Observed, not changed:* the current pattern also excludes
`docs/reference/changelog` from the search index. That predates this work and is
left alone.

**Sitemap.** A rule for v2 at priority `0.6` — below v1 latest (`0.7`), well
above pinned v1 dates (`0.2`):

```ts
if (item.url.includes("/reference/v2")) return { ...item, priority: 0.6 };
```

It goes after the latest-version rule. The existing `\d{4}-\d{2}-\d{2}` rule
cannot match `v2`, so the two do not interact.

**Changelog.** A new top section in `docs/reference/changelog.mdx` following the
established format: an `<h2>` with a stable id, an italic line naming the
anytype-heart release and the API version it applies to, then `### Added`.

The release line is written from the actual anytype-heart release that ships v2.
If v2 has not yet appeared in a tagged release at implementation time, the line
reads *"Unreleased — available in builds from `<branch>` (`<short-sha>`)"*
instead of naming a version. No placeholder text ships.

*Known wrinkle, accepted:* `changelog.mdx` pins
`displayed_sidebar: openApiSidebar20251108`, so following the Changelog link
from the v2 sidebar swaps the reader to the v1 sidebar. Forking the page per
major is not worth it for a pre-release.

**Announcement bar.** Docusaurus supports exactly one, currently advertising the
Anytype CLI. It is replaced for the pre-release window:

```ts
announcementBar: {
  id: "api_v2_prerelease",
  content: '🧪 <strong>Pre-release:</strong> <a href="/docs/reference/v2">Anytype API v2</a> …',
  backgroundColor: "#ffdbd8",
  textColor: "#000000",
  isCloseable: false,
}
```

The CLI announcement is retired, not merged — two messages in one bar reads as
neither. Restoring it is a one-line revert when the v2 window closes.

## Files touched

| File | Change |
| --- | --- |
| `openapi.config.ts` | Add `openApiV2Config`, `getVersionGroups()`, second plugin instance |
| `docusaurus.config.ts` | Search `ignoreFiles`, sitemap rule, announcement bar |
| `sidebars.ts` | Grouped dropdown, v2 sidebar, drop `versions.json` import, extend guard |
| `package.json` | `make-reference` covers both instances |
| `scripts/fix-openapi-files.js` | v2 `info.title` normalization |
| `src/css/custom.css` | Dropdown group-title style |
| `docs/reference/openapi-v2.yaml` | New — copied from anytype-heart |
| `docs/reference/v2/**` | New — generated |
| `docs/reference/v2-overview.mdx` | New — hand-written landing page |
| `docs/reference/changelog.mdx` | New section |
| `CLAUDE.md` | Document the v2 spec sync and the two-instance layout |

## Out of scope

- **Guides and Examples stay v1-only.** Every tutorial targets `/v1/...`; porting
  them is its own project, gated on v2 stabilising.
- **v2 date versions.** Added at GA, when v2 starts minting `Anytype-Version`
  values of its own. The `anytypeV2` instance gains a `versions` map then, and
  `/docs/reference/v2` becomes the latest alias — the same shape v1 has today.
- **The v2 upload endpoint's request body.** `POST /v2/spaces/{space_id}/files`
  declares `multipart/form-data: {type: object}` with no properties, and the
  JSON `{"url": …}` body its description promises is absent from the spec
  entirely. That is an upstream annotation gap in `core/api/v2/handler`, in the
  same family as the v1 `type: file` bug `fix-openapi-files.js` works around. It
  should be filed against anytype-heart, not patched here.

## Verification

1. `bun run make-reference` — both instances regenerate; the v2 output contains
   `anytype-api.info.mdx` (not `anytype-api-v-2.info.mdx`), twelve `.tag.mdx`
   files, and `sidebar.ts`.
2. `bun run make-reference` a second time — confirms the normalization is
   idempotent and produces no diff.
3. `bun run lint`.
4. `bun run build` — with `onBrokenLinks: "throw"` this is the real test; any
   dropdown href or sidebar ref that does not resolve fails the build.
5. `bun run serve`, then walk:
   - The dropdown shows two groups; the current entry is marked active in both
     directions of navigation.
   - v2's sidebar shows twelve categories with descriptions, not one flat list.
   - `/docs/reference` still lands on v1 latest; the navbar Reference link is
     unchanged.
   - Spot-check three v1 URLs (latest, a pinned date, the changelog) — unchanged.
   - Search returns v2 hits and the v2 landing page.
   - The announcement bar links to `/docs/reference/v2`.
