# Chapter pages

One HTML template renders every chapter two ways from the same file: a scrollable page for the screen, and 16:9 pages for print. `docs/index.html` is the map: every chapter with its subtitle and its direct test, plus the reading-order note. The direct test is pulled from each chapter's `## The direct test` section by the build.

## Read

```
open docs/index.html
```

Each chapter page has a sticky rail with the chapter's sections (the active one tracks as you scroll), a light/dark toggle top right (shared with the index), a print button, prev/next chapter links at the end, and a **Copy** button on every going-deeper prompt.

## Tune

Press `` ` `` on any chapter page to open the control panel. **Screen** knobs affect the scroll view (mode, theme, body size, measure, rail width); **Pages** knobs affect print (ratio, columns, padding, part breaks, rail); type, colour and card knobs affect both. Changes apply live. Settings persist in the browser across chapter files; **Copy settings** gives the JSON to paste into `design/settings.json` so the build uses it. Presets: *paper* (default), *sample* (the lab manual's white and teal), *slate* (dark; also what the toggle uses).

## Print / PDF

The Print button (or ⌘P) paginates the current chapter into 16:9 pages with the current settings and theme, and prints from the browser. For the whole set from the command line:

```
node design/build.mjs            # HTML pages + index, into docs/
node design/build.mjs --pdf      # also a PDF per chapter via headless Chrome
node design/build.mjs --pdf chapters/chapter-02-shape-of-data.md   # one chapter
```

Build renders ignore the browser's saved theme and the system appearance; they use `design/settings.json` only. Output names come from the chapter heading: `chapter-06-authorization.html` / `.pdf`. Fonts load from Google Fonts at render time (Poppins, Charis SIL, Manrope, Inter, Instrument Sans, DM Sans, Space Grotesk, Source Serif 4, Literata, Newsreader, Spectral, JetBrains Mono); Charter and Menlo are offered in the panel and resolve only on macOS. The body default is Charis SIL, SIL's extension of Bitstream Charter, so the pages look the same on every platform.

## How the template reads a chapter

- `# Chapter N — Title`, the `##` subtitle, the first paragraph, and an italic *Assumes…* paragraph form the hero (title page in print).
- Each later `#` heading is a part; `##` headings are sections. Both appear in the rail.
- Blockquote entries (`**Name** — gist` then `*Tell:*`, `**Ask:**`, `**Check:**` lines) become numbered cards in a two-column grid. The tell renders last and muted whatever its position in the markdown, since it's the field that needs a look at code; ask and check come first. `## The direct test` becomes the outlined box; `## Where this connects` becomes the footer.
- `**D1 · Title** *(shape)*`, followed by a blockquote (optionally with one lead-in paragraph between) and an italic note, becomes a prompt card with its note beside it and a Copy button.
- `[DIAGRAM: …]` is replaced at build time by `design/diagrams/NN.svg` (the chapter number; `NN-2.svg` for a second marker in the same chapter), inlined so it follows the theme and the panel. A marker with no file renders as a placeholder box. The SVGs carry no colours or fonts of their own: lines are `class="ln"` (`ac` accent, `mu` muted, `dash`), shapes `class="box"` (`ac`, `tint`, `dash`), filled cells `fill-ac`, text plain / `mu` / `ac` / `lab` (small caps label) / `mono` / `onac` (on an accent fill), arrowheads `ah`. The Diagrams panel group sets width, stroke weight and label size.

## Hosting

Everything in `docs/` is generated and static; GitHub Pages serves it from the `main` branch, so a rebuild plus a push is a deploy. `index.html` is the entry point. Don't edit files in `docs/` by hand; change the chapter markdown, the template, or the settings, and rebuild.
