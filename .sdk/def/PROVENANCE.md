# API definition provenance

## tillo-v2-openapi.json

- **Source:** https://tillo.readme.io/reference/ — Tillo's own OpenAPI
  document, which its documentation site publishes **one operation per
  reference page**. Every page carries the same `openapi`, `info`,
  `servers`, `security` and `components` header, with the `paths` entry
  for that operation. The page index is https://tillo.readme.io/llms.txt.
- **Publisher:** Tillo
- **Retrieved:** 2026-09-17
- **Format:** OpenAPI 3.1.0
- **Size:** 257266 bytes
- **Coverage:** 21 paths, 24 methods, 51 component schemas — every operation
  Tillo's API Reference lists.

## How this file was assembled

Tillo publishes no single downloadable document, so this one is the 24
reference pages' embedded OpenAPI fragments merged: `paths` and
`components` unioned, `info`/`servers`/`security` taken as published.
Nothing is hand-written and no name is rewritten — the fragments are one
document served in pieces, so the names are already consistent.

The 25th page, `authentication-api-v2`, is prose about HMAC signature
generation and carries no OpenAPI fragment.

Rebuild with `admin/scripts/tillo-merge.sh`; do not hand-edit this file.
