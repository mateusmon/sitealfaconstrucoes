---
name: caly-adapt
description: Audits and improves the responsive behavior of an existing website across small and large phones, tablets, laptops, and wide desktop screens. Use when asked to make a site responsive, fix mobile or tablet layouts, eliminate horizontal overflow, or adapt every page to different screen sizes.
---

# CalyAdapt

Analyze the existing website as a whole, implement responsive improvements in its actual project files, then verify the result across representative viewport sizes. Treat mobile, tablet, desktop, and very wide displays as first-class layouts.

## Working rules

- Work in the existing project and follow its framework, component patterns, design tokens, and coding conventions.
- Inspect the complete site before editing: identify routes, shared layouts, navigation, reusable components, global styles, and any pages with distinct structures.
- Preserve the site's content, brand, behavior, and visual identity. Change layout and interaction only as needed for responsiveness.
- Fix root causes in shared components or layout styles when possible. Avoid accumulating one-off overrides.
- Do not claim a viewport or page was tested unless it was actually inspected.
- If a browser preview or screenshot tool is available, use it. Otherwise use the project's build, tests, linting, and code inspection, and clearly state what visual checks could not be performed.
- Do not ask the user to list every route or breakpoint if the repository can reveal them. Ask only when a decision depends on missing product intent, such as whether a desktop-only interaction may change on mobile.

## Workflow

### 1. Map the site

1. Inspect the project structure, package scripts, framework, styling system, and existing responsive conventions.
2. Find all routes/pages and shared shells. Include nested routes and meaningful states such as menus, dialogs, tables, forms, galleries, and dashboards.
3. Identify the highest-impact shared elements: header/navigation, page container, grids, typography, cards, media, forms, tables, and footers.
4. Start the app using the project's existing instructions when possible. Record the available route and viewport coverage before changing code.

### 2. Audit actual layouts

Inspect each page at narrow mobile, typical mobile, tablet portrait/landscape, desktop, and wide desktop sizes. Look for:

- Horizontal page overflow, clipped content, unintended scrollbars, and elements wider than the viewport.
- Fixed widths/heights, absolute positioning, rigid grids, oversized gaps, and breakpoint assumptions that fail between common device sizes.
- Navigation that wraps badly, overlaps, becomes unreachable, or has no usable compact state.
- Text that becomes too small, too wide, clipped, or difficult to scan; headings that break awkwardly.
- Images, video, embeds, and decorative media that distort, overflow, or consume too much mobile space.
- Cards and columns that become cramped, uneven, or excessively stretched on large displays.
- Tables, charts, code blocks, and forms that cannot be used on narrow screens.
- Controls that are too small, too close together, hidden behind overlays, or difficult to reach by touch.
- Sticky/fixed elements, dialogs, dropdowns, and menus that cover important content or exceed the visible screen.
- Landscape orientation, long labels, localization, user-generated content, and browser zoom where practical.

Record specific findings by page/component and reproduce each issue before changing it.

### 3. Implement responsive behavior

Use the project's established tools and make the smallest coherent set of changes that fixes all identified pages.

- Prefer fluid sizing, flexible layout, minmax(), min(), max(), clamp(), wrapping, and content-driven dimensions over fixed pixel widths.
- Use a consistent responsive container with sensible maximum width and side padding; prevent content from becoming excessively wide on large screens.
- Let grids reflow naturally. Reduce columns or stack sections when content no longer fits comfortably; do not merely shrink desktop layouts.
- Define breakpoints where the content needs them. Avoid targeting named devices or adding breakpoints without a demonstrated layout need.
- Use responsive image sizing and appropriate aspect ratios; preserve intrinsic proportions and avoid layout shifts where supported.
- Ensure long words, URLs, and labels can wrap or scroll within their own region without widening the whole page.
- For wide tables or data visualizations, choose a usable mobile treatment: compact columns, a card/list view, or a contained horizontal scroller with a visible affordance. Do not make the entire page scroll sideways.
- Give mobile navigation a clear, operable compact pattern. Preserve keyboard access, focus visibility, labels, and menu state semantics.
- Keep touch targets comfortably usable (aim for roughly 44 CSS px where the design permits), with enough spacing to avoid accidental taps.
- Respect reduced-motion preferences and do not introduce motion that blocks interaction.
- Keep changes consistent with the design system. Do not hide important content or functionality simply to make a screenshot fit.

### 4. Verify and refine

At minimum, verify representative widths near:

| Class | Suggested CSS viewport widths |
|---|---:|
| Very narrow phone | 320–360 px |
| Typical phone | 375–430 px |
| Small tablet | 600–700 px |
| Tablet | 768–900 px |
| Compact desktop | 1024–1280 px |
| Desktop | 1366–1600 px |
| Wide desktop | 1920–2560 px |

Use these as coverage points, not hard-coded device breakpoints. Check intermediate widths around every changed breakpoint. Also check portrait and landscape for layouts whose behavior changes with orientation.

For every route and important interactive state:

1. Inspect the layout at the relevant widths using the available browser preview or screenshots.
2. Check for page-level horizontal overflow, clipped text, overlap, excessive empty space, stretched media, and unreachable controls.
3. Exercise navigation, menus, forms, dialogs, tabs, and other important interactions at narrow and wide widths.
4. Correct the source issue and repeat the affected checks.
5. Run relevant build, lint, type-check, and tests already defined by the project. Do not add dependencies or tests just to mirror the CSS changes.

If there are too many routes to check individually, test every unique template and shared layout, then spot-check remaining routes. State exactly which templates/routes and viewport sizes were checked.

## Completion report

When finished, summarize:

- The main responsive issues found and the shared components/pages changed.
- How layouts now adapt across mobile, tablet, desktop, and wide screens.
- The routes/templates, viewport widths, and interactions actually verified.
- Build or test results, plus any remaining issue that needs product input or could not be visually verified.

A request such as “make the whole site responsive” authorizes auditing and fixing the existing website within the current project. Proceed through implementation and verification; do not stop after providing a plan or a list of recommendations.

