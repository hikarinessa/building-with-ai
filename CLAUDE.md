# Building with AI — course project

A course for people who build software with AI assistance and don't read code. A ten-minute toolkit chapter 0 and twelve standalone chapters; each of the twelve teaches one mental model at high altitude, names how that area goes wrong when a model writes the code, and closes with prompts the reader hands to their own assistant to go deeper (the prompts are meant to ship tested; `curriculum.md`'s build order records how far that has actually got). Delivered as scrollable HTML pages (with a PDF per chapter from the same source).

## Layout

- `curriculum.md` — the spine and the single source for authoring: premise (including the assumed stack and the kind of assistant the prompts expect), the five-beat chapter template, the prompt shapes, every chapter's scope and failure entries, what's deliberately out, and the build order with current status. Read this first.
- `tone-of-voice.md` — governs all prose, headings and subtitles included. Read it before writing or editing a chapter.
- `chapters/chapter-NN-slug.md` — chapters 00–12, one file each; 00 is the toolkit the others' checks point at.
- `design/` — the rendering pipeline: `template.html` (one file, scroll view for screen + paged view for print, with a live control panel), `build.mjs`, `settings.json` (the baked-in design defaults), `README.md` (how to read, tune, build, host). `docs/` is the generated output, served by GitHub Pages from `main` — never edit it by hand; rebuild and commit.
- `reference/authorization-lab-manual.pdf` — the earlier five-sitting lab manual on authorization. It's the depth track chapter 6 points to and the typographic reference (Poppins headings; the pages set body text in Petrona).
- `archive/` — superseded curriculum drafts, kept for history only. Nothing current depends on them.

## Workflow

1. Author or edit a chapter in `chapters/`, following the template in `curriculum.md` and the rules in `tone-of-voice.md`.
2. `node design/build.mjs` regenerates the HTML pages and index; `--pdf` adds the PDFs. `open docs/index.html` to read.
3. Update the status line in `curriculum.md`'s build order when a chapter's state changes (drafted, prompts tested, revised).

## Authoring rules that have bitten before

- Headings and subtitles describe, they don't perform. "Who can see what, and where generated code leaves the check out" is the calibration; a rhythm tail like "…decided before you're tired" is the failure. Default register: the one used for defining terms.
- Write for durability: each chapter's model rests on a principle that doesn't depend on how capable current models are (trust boundaries, verification economics, independence of review). Current-model behaviour appears as a measured instance, never as the foundation.
- Every *ask* and going-deeper prompt gets tested against a real tool on a real repository with a planted finding before shipping; a prompt that returns reassurance instead of a checkable artifact, or a list that misses the plant, is rewritten. What has actually been tested, and at what level, is recorded in `curriculum.md`'s build order — keep that line true.
- Chapters stand alone; reference another chapter's model in one line rather than re-teaching it. Every chapter from 1 on carries at least one `[DIAGRAM: …]` marker.
- A check that needs a capability the reader may not have (a test copy, devtools, a local build, a named commit) points at the chapter 0 prompt that provides it, or hands the setup to the assistant in the check itself. Nothing in the course is built; the reader investigates.
- Edit files into their final resting state — no residue of earlier drafts, no version numbers in filenames.

## Pipeline notes

- The template converts pandoc's HTML into typed blocks by pattern (entries, prompts, direct test, footer); if a chapter's markdown departs from the shapes in `design/README.md`, the render degrades to plain paragraphs rather than erroring — check the page.
- Chrome headless honours `@page` sizes; build renders pass `?build=1` so they use `settings.json` and ignore the browser's saved theme and the system appearance.
- The panel's page count and "N overflowing" line is the check that a print layout is sound; an overflowing page gets a red outline in the preview.
