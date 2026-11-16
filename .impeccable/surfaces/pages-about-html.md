---
version: 1
slug: "pages-about-html"
primary_target: "_pages/about.html"
related_targets: ["_includes/masthead.html","_includes/footer.html"]
---

# Home (/) and site shell

Scope: home page plus the shared shell (masthead, footer, closing call) reused by every page. Visitor mode: Persuade.
Audience: recruiters and hiring managers for frontend / Angular roles. Action: download the resume or email. Proof: employers, role history, one live project, writing.
Constraints: Jekyll on GitHub Pages with no CSS build step; content stays CMS-editable through `_data/*.yml` and collection front matter.

## Direction contract

THESIS: The engineer, documented as a component. The site is a design-system spec sheet: a props table, redlines, version history, and a token table. It replaces the category default of a dark gradient hero with tech-logo pills.

OWN-WORLD: White paper ground, cool canvas (#f3f4f7) with a dot grid on preview frames, near-black ink, one spec blue (#2a52f5) for redlines, selection, focus, and the primary action. Schibsted Grotesk for all text; JetBrains Mono only for measurements, prop names, and dates. Hairline rules, 6px radius, one soft lift shadow.

STORY: In the first viewport a visitor learns who he is, what he builds, and where he works, and sees that he's open to work. Experience reads as a version history. One project gets a full spec. Writing shows depth. The page closes on a direct ask.

FIRST VIEWPORT: The name is set huge on the left inside a redline selection box with handles and a measurement label. Below it sit the role sentence, proof line, Download resume (primary) and Email me, then profile links. On the right is an `<Engineer>` props panel ending in an openToWork switch.

FORM: Component spec sheet, position 1 on my grounded list (IMPECCABLE'S PICK, chosen by the user over the assigned blueprint); seed:d76fb08daa7865c6. Signature interaction: Inspect mode. Hovering a documented element outlines it and labels it with its component name and live pixel size. Motion: the redline frame draws in once on load.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Open decisions
- Pending user review of the local render before DESIGN.md is written.
