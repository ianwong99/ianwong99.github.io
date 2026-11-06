---
name: "Ian Wong — Dusk Research & Systems Portfolio"
description: "Atmospheric Dusk portfolio for Georgia Tech ML research (NeurIPS 2025 MLE-Dojo) and FileBot Nova."
colors:
  paper: "oklch(0.18 0.015 260)"
  ground: "oklch(0.24 0.015 260)"
  well: "oklch(0.95 0.008 75)"
  ink: "oklch(0.97 0.005 80)"
  ink-quiet: "oklch(0.76 0.01 255)"
  ink-faint: "oklch(0.55 0.01 255)"
  well-ink: "oklch(0.16 0.01 260)"
  well-quiet: "oklch(0.45 0.01 260)"
  accent: "oklch(0.70 0.14 275)"
  accent-deep: "oklch(0.60 0.16 275)"
  accent-ink: "oklch(0.14 0.02 275)"
  warm: "oklch(0.76 0.13 55)"
  hair: "oklch(0.98 0.005 80 / 0.10)"
  well-hair: "oklch(0.16 0.01 260 / 0.10)"
typography:
  display:
    fontFamily: "Wix Madefor Display, system-ui, -apple-system, sans-serif"
    fontSize: "clamp(2.25rem, 1.5rem + 3vw, 3.625rem)"
    fontWeight: 500
    lineHeight: 1.04
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Wix Madefor Display, system-ui, -apple-system, sans-serif"
    fontSize: "clamp(1.75rem, 1.2rem + 2.2vw, 2.75rem)"
    fontWeight: 500
    lineHeight: 1.08
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Wix Madefor Display, system-ui, -apple-system, sans-serif"
    fontSize: "clamp(1.125rem, 1rem + 0.5vw, 1.375rem)"
    fontWeight: 500
    lineHeight: 1.22
    letterSpacing: "-0.015em"
  body:
    fontFamily: "Wix Madefor Text, system-ui, -apple-system, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "Wix Madefor Text, system-ui, -apple-system, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.45
rounded:
  sm: "6px"
  md: "12px"
  lg: "16px"
  pill: "999px"
spacing:
  s1: "0.25rem"
  s2: "0.5rem"
  s3: "0.75rem"
  s4: "1rem"
  s5: "1.5rem"
  s6: "2rem"
  s7: "3rem"
  s8: "4.5rem"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.well-ink}"
    rounded: "{rounded.pill}"
    padding: "0.65rem 1.25rem"
  button-quiet:
    backgroundColor: "oklch(0.98 0.005 80 / 0.08)"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0.65rem 1.25rem"
  card-glass:
    backgroundColor: "oklch(0.14 0.015 260 / 0.62)"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "1.5rem"
  card-bone-well:
    backgroundColor: "{colors.well}"
    textColor: "{colors.well-ink}"
    rounded: "{rounded.lg}"
    padding: "2rem"
---

# Design System: Ian Wong — Dusk Research & Systems Portfolio

## Overview

**Creative North Star: "The Smoked Glass Workbench at Dusk"**

This design system sets rigorous machine learning research (*MLE-Dojo*, NeurIPS 2025) and low-footprint native desktop engineering (*FileBot Nova*) against a quiet, atmospheric landscape at sunset. Rather than shouting with neon syntax gradients, floating orbs, or decorative skill progress bars, the page behaves like an interactive instrument panel suspended over a valley of fog under a warm apricot-and-slate sky.

Below the hero fold, the sky darkens into deep slate-indigo (`--color-paper`) where two distinct surface treatments do the work: **smoked glass panes** (`backdrop-filter: blur(28px) saturate(1.4)` with a 10% warm-white rim) for live interactive inspection, and **warm bone wells** (`oklch(0.95 0.008 75)`) that hold academic citations and desktop screenshots like lit pages on a dark desk.

We explicitly reject the over-copied 3-column dark-slate card grid (`#0f172a`), purple-to-pink gradient text, uppercase letter-spaced eyebrows above headings, and arbitrary skill-percentage meters.

**Key Characteristics:**
- **Atmospheric Dusk Stage:** Full-bleed twilight landscape (`vallee-brouillard.jpg` by Thomas Bresson) under a directional dark scrim, pairing two-line display typography on the left with a smoked glass research-and-systems ledger on the right.
- **Dual-Surface Polarity:** Smoked glass panes (`oklch(0.14 0.015 260 / 0.62)`) for interactive state inspection; warm bone wells (`--color-well`) for published artifacts.
- **Restrained Signal Accents:** Periwinkle (`--color-accent`) and sunset apricot (`--color-warm`) appear strictly as 7px status dots, active row markers, and focus rings—never as flood fills or gradient washes.
- **Ruled Editorial Precision:** Experience history and technical stack are set as clean, hairline-divided (`1px solid var(--color-hair)`) multi-column rows with `tabular-nums` alignment.

## Colors

The Dusk palette draws its neutrals from evening slate (`hue 260`) and warm bone (`hue 75–80`), punctuated by periwinkle and apricot signal lights.

### Primary
- **Periwinkle Signal** (`oklch(0.70 0.14 275)`): Active tab dot, verified checkmark icon, and keyboard `:focus-visible` outline.
- **Periwinkle Deep** (`oklch(0.60 0.16 275)`): Hover and active accent state.

### Secondary
- **Sunset Apricot** (`oklch(0.76 0.13 55)`): Secondary status dot for active teaching/benchmark milestones and flagged execution rows (`oklch(0.76 0.13 55 / 0.07)` row wash).

### Neutral
- **Twilight Slate Paper** (`oklch(0.18 0.015 260)`): Primary page canvas below the hero fold.
- **Lifted Slate Ground** (`oklch(0.24 0.015 260)`): Bookend contact band and elevated dark surfaces.
- **Warm Bone Well** (`oklch(0.95 0.008 75)`): Light-surface well container for published research metadata and product screenshots; switches text to **Well Ink** (`oklch(0.16 0.01 260)`) and **Well Quiet** (`oklch(0.45 0.01 260)`).
- **Warm White Ink** (`oklch(0.97 0.005 80)`): Primary display and body text on dark slate and smoked glass, and the solid fill of primary pill buttons.
- **Quiet Slate Ink** (`oklch(0.76 0.01 255)`): Lead paragraphs, secondary descriptions, and unselected tabs.
- **Faint Slate Ink** (`oklch(0.55 0.01 255)`): Table headers, timestamps, and photo credits.
- **Glass Rim Hairline** (`oklch(0.98 0.005 80 / 0.10)`): `1px` perimeter and row divider on dark and glass surfaces.

### Named Rules
**The Signal-Dot Rule.** Periwinkle (`--color-accent`) and Apricot (`--color-warm`) never fill buttons, cards, or section backgrounds. They appear only on indicator dots (`7px`), 16px status icons, and 2px focus rings.

**The Dual-Polarity Rule.** Whenever a surface switches to `--color-well` (Warm Bone), all child typography and hairlines must switch to `--color-well-ink`, `--color-well-quiet`, and `--color-well-hair` so contrast exceeds 11:1.

## Typography

**Display Font:** `Wix Madefor Display` (with `system-ui, -apple-system, sans-serif` fallback)
**Body Font:** `Wix Madefor Text` (with `system-ui, -apple-system, sans-serif` fallback)

**Character:** Geometric humanist grotesque with crisp terminals, open counters, and native `tabular-nums` support—giving technical tables and academic citations a calm, architectural authority without resorting to monospace clichés.

### Hierarchy
- **Display (`h1`)** (`500`, `clamp(2.25rem, 1.5rem + 3vw, 3.625rem)`, `line-height: 1.04`, `letter-spacing: -0.03em`): Hero headline; maximum 2 lines and 6 words (`ML environments and native tools.`).
- **Headline (`h2`)** (`500`, `clamp(1.75rem, 1.2rem + 2.2vw, 2.75rem)`, `line-height: 1.08`, `letter-spacing: -0.025em`): Section openings, set in sentence case with a period.
- **Title (`h3`)** (`500`, `clamp(1.125rem, 1rem + 0.5vw, 1.375rem)`, `line-height: 1.22`, `letter-spacing: -0.015em`): Pane titles, bone well headings, and role titles.
- **Body** (`400`, `1rem`, `line-height: 1.55`, `max-width: 62ch`): Narrative summaries and table cells.
- **Label / Meta** (`400`, `0.875rem`, `line-height: 1.45`): Sentence-case metadata, dates, and column headers.

### Named Rules
**The Sentence-Case Rule.** Every heading, button, badge, and table header is set in sentence case. All-caps tracked labels (`text-transform: uppercase; letter-spacing: 0.1em`) are forbidden.

**The Tabular Figure Rule.** Metrics, counts (`200+ tasks`, `153 KB`, `1,500 students`), and date ranges use `font-variant-numeric: tabular-nums`.

## Layout

- **Container:** `max-width: 78rem` (`1248px`) with fluid inline padding `clamp(1.5rem, 4vw, 3.5rem)`.
- **Hero Stage Grid:** 12-column asymmetric split (`5fr` copy on the left, `7fr` smoked glass ledger on the right) pinned near the bottom of a `100svh` (`min-height: 44rem`) stage over the full-bleed landscape photograph.
- **Interactive Tour Grid:** `4fr` vertical tab stack on the left paired with an `8fr` smoked glass data table pane on the right.
- **Bone Wells Grid:** Equal `1fr 1fr` two-column grid (`gap: 2rem`) holding the NeurIPS 2025 paper well and the FileBot Nova workbench well, with captions placed outside and below each well.
- **Responsive Breakpoints:**
  - `<= 60rem` (`960px`): Hero, Tour, Wells, About, and Contact grids collapse cleanly to single-column stacks.
  - `<= 40rem` (`640px`): Navigation links collapse so the brand and primary action remain unobstructed; `.pane-table` rows restack into labelled vertical blocks so zero words are hidden on mobile.

## Elevation & Depth

Depth is achieved through **atmospheric translucency over photography** in the hero and **tonal lightness contrast** below the fold—never through wide soft drop shadows stacked over hairline borders.

### Surface Vocabulary
- **Smoked Glass (`.glass`)**: `background: oklch(0.14 0.015 260 / 0.62)`, `backdrop-filter: blur(28px) saturate(1.4)`, `border: 1px solid oklch(0.98 0.005 80 / 0.10)`. Used for the hero ledger, interactive system tour pane, and education card.
- **Scrolled Header Glass (`.site-header.is-scrolled`)**: `background: oklch(0.18 0.015 260 / 0.78)`, `backdrop-filter: blur(20px) saturate(1.3)`, `border-bottom: 1px solid var(--color-hair)`.
- **Warm Bone Well (`.bone-well`)**: Solid `background: oklch(0.95 0.008 75)` with `border: 1px solid oklch(0.16 0.01 260 / 0.10)`. No drop shadow; the lightness jump from `0.18` slate to `0.95` bone creates crisp separation.

### Named Rules
**The Single-Boundary Rule.** A container defines its edge with a `1px` hairline border (`--color-hair` or `--color-well-hair`) OR tonal contrast—never both a hairline border and a wide `box-shadow`.

## Shapes

- **Pill Controls (`999px`)**: All primary buttons, ghost buttons, and status badges use full pill geometry (`--radius-pill: 999px`).
- **Panels & Wells (`16px`)**: Smoked glass panes (`.glass`) and warm bone wells (`.bone-well`) use `--radius-lg: 16px`.
- **Inner Interactive Rows (`12px` / `6px`)**: Tour selector tabs use `--radius-md: 12px`; monogram tiles (`.ledger__initial`) and inner screenshot frames use `--radius-sm: 6px`.
- **No Nested Cards:** Inside `.glass` or `.bone-well`, child regions are separated strictly by `1px solid` hairlines (`border-top` / `border-bottom`), never by nested bordered/rounded boxes.

## Components

### Buttons (`.btn`)
- **Shape:** Full pill (`border-radius: 999px`), `padding: 0.65rem 1.25rem`, `font-size: 0.9375rem`, `font-weight: 500`.
- **Primary (`.btn`):** Solid warm white (`--color-ink`) with dark well-ink text (`--color-well-ink`). Darkens by `8%` on `:hover`, scales to `0.99` on `:active`.
- **Hero Quiet (`.btn--hero-quiet`):** True translucent ghost pill (`background: oklch(0.98 0.005 80 / 0.05)`) with a `1px solid oklch(0.98 0.005 80 / 0.24)` rim over the hero photograph.
- **Well Quiet (`.btn--well-quiet`):** Transparent pill with `1px solid var(--color-well-hair)` for actions inside light bone wells.

### Smoked Glass Ledger (`.ledger`)
- **Structure:** Header row with live status pill (`NeurIPS 2025 + v2.0 live`), 4 interactive button rows (`.ledger__row-btn`) with monogram square, title/subtitle, signal status icon, and right-aligned tabular metric, plus a bottom hairline summary strip (`.ledger__strip`) with a direct external/section link.

### Interactive System Tour (`.tour-grid`)
- **Structure:** Left `tablist` of 3 architecture views (`MLE-Dojo POMDP environment`, `FileBot Nova ShowScraper4`, `Native desktop runtime`) with an active apricot indicator dot; right `tabpanel` smoked glass table displaying 5 structured rows and a flagged highlight row (`is-flagged`). Includes a surface-mode toggle to preview the panes in Warm Bone Well mode vs. Smoked Glass mode.

### Warm Bone Wells (`.bone-well`)
- **Structure:** High-contrast light well (`--color-well`) housing either a 2x2 hairline-ruled specification list (`<dl class="bone-well__list">`) for the NeurIPS 2025 paper or a framed native macOS product screenshot (`filebot-nova-dark.png`), paired with external caption headings below the well.

## Do's and Don'ts

### Do:
- **Do** keep the hero `h1` at 6 words or fewer so it sets cleanly in 2 lines beside the smoked glass ledger.
- **Do** use `1px solid var(--color-hair)` (or `--color-well-hair` inside bone wells) to divide rows and metadata lists without introducing nested cards.
- **Do** verify every interactive element has explicit `:hover`, `:focus-visible`, `:active`, and `:disabled` states and honors `@media (prefers-reduced-motion: reduce)`.
- **Do** credit every Commons/library photograph in the footer `[data-credits]` line (`Thomas Bresson, CC BY 3.0, Wikimedia Commons`).

### Don't:
- **Don't** place a bordered, rounded card inside another bordered, rounded `.glass` or `.bone-well` container (`nested-cards`).
- **Don't** use uppercase letter-spaced eyebrows above `h1` or `h2` headings.
- **Don't** hide table columns on mobile (`< 40rem`); restack `.pane-table` rows vertically so mobile visitors read the full technical content.
- **Don't** use purple-to-blue/pink gradients, glowing orbs, or `transition: all`.
