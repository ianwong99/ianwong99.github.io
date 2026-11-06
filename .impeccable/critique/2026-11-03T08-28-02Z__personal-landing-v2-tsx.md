---
target: personal-landing-v2.tsx
total_score: 18
max_score: 32
na_heuristics: 7,10
p0_count: 1
p1_count: 1
target_identity: "file:/Users/ianw/.gemini/antigravity/brain/b1b3cbf9-f3a1-40fb-b6d7-acc13951f32e/scratch/ianwong99.github.io/personal-landing-v2.tsx"
target_fingerprint: "sha256:ed5c536a6b532589784ca92f21fe9c89cd13dacd3eb61576fd9a3934d72ed5c6"
target_path: /Users/ianw/.gemini/antigravity/brain/b1b3cbf9-f3a1-40fb-b6d7-acc13951f32e/scratch/ianwong99.github.io/personal-landing-v2.tsx
timestamp: 2026-11-03T08-28-02Z
slug: personal-landing-v2-tsx
---
Method: dual-agent (A: 7ecb51c5-f418-4d38-99fa-bf5b61c0c2de · B: 1abc18b6-8841-4d06-af74-7d4f79331c73)

#### Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 2 | Scroll-spy boundary (`rect.top <= 100`) desyncs on fast scroll; fixed header has `backdrop-blur-sm` with no background fill, causing scrolled text to bleed underneath |
| 2 | Match System / Real World | 3 | Standard portfolio sections, but setting all prose in `font-mono` violates natural reading ergonomics |
| 3 | User Control and Freedom | 3 | Direct section links and theme switch work, but project cards are unclickable dead-ends with no links or drill-down |
| 4 | Consistency and Standards | 2 | Light mode breaks color consistency (`h1` hardcoded `text-gray-100` on `bg-gray-50`); unused `Github`/`ExternalLink` imports; 12 ad-hoc Tailwind gray/green classes |
| 5 | Error Prevention | 2 | Catastrophic 1.1:1 contrast in light mode on hero title; no `:focus-visible` rings anywhere (Hallmark FAIL 26a) |
| 6 | Recognition Rather Than Recall | 2 | Icon-only social links lack labels/tooltips/`aria-label`; projects have no visual previews, diagrams, or code links |
| 7 | Flexibility and Efficiency | n/a | Persuade/Experience portfolio surface |
| 8 | Aesthetic and Minimalist Design | 2 | Every section forced to `min-h-screen py-24` (`100vh`, Hallmark FAIL 6a), creating large empty voids; `font-mono` across all copy flattens hierarchy |
| 9 | Error Recovery | 2 | No theme persistence or recovery when light mode renders the hero heading invisible |
| 10 | Help and Documentation | n/a | Persuade/Experience portfolio surface |
| **Total** | | **18/32** | **Acceptable (56.3%)** |

#### Design Specificity Verdict

**LLM assessment**: `personal-landing-v2.tsx` is a verbatim structural and visual clone of the Brittany Chiang v4 developer portfolio template (`font-mono` everywhere, `bg-gray-900` with `text-green-400` terminal accents, `01.`–`04.` numbered headings, `▹` list carets, bottom-left vertical social rail, and boilerplate copy like *"Hi, my name is Ian Wong. I build intelligent systems."* and *"03. Some Things I've Built"*). Nothing in the visual system reflects your actual work across Machine Learning, D3.js data visualization, native desktop tooling (`filebot`), or mathematics education.

**Deterministic scan**:
- `impeccable detect --json`: 0 static regex findings (raw `.tsx` file is uncompiled and live `https://ianwong99.github.io` returns HTTP 404 because commit `0fbd30b` deleted `index.html`).
- Hallmark `sloplint --genre modern-minimal --before`: **4 Floor FAILs**, **2 Reflexes**, **3 Warnings**:
  - **FAIL 6a**: `min-h-screen` (`100vh`) used on hero and all 5 sections instead of `dvh`/`svh`.
  - **FAIL 10a**: Unscoped `transition-all duration-500` on hero entrance.
  - **FAIL 26a**: Zero `:focus-visible` keyboard focus styles anywhere.
  - **FAIL 27**: Hover transform transitions (`hover:-translate-y-1`) lack `prefers-reduced-motion` fallbacks.
  - **REFLEX 26b**: No `:active` state styling on interactive controls (`:disabled` is a false positive since there are no form inputs).
  - **WARN 58 / 74 / F1**: Hero paragraph exceeds modern-minimal conciseness target; 12 uncurated stock Tailwind palette utilities (`gray-*`, `green-400`) instead of semantic OKLCH tokens; 8 straight apostrophes in prose.

#### Overall Impression
You have a genuinely compelling personal narrative—combining Georgia Tech Machine Learning graduate research, interactive D3.js/Spark data visualization, native systems tooling (`filebot`), and secondary mathematics teaching—trapped inside a broken, uncompiled 2019 tutorial template that currently serves a 404 on GitHub Pages.

#### What's Working
1. **Authentic Multi-Disciplinary Positioning**: The combination of Georgia Tech ML graduate research, mathematics curriculum design, and large-scale data visualization gives you a distinct narrative angle that few engineers have.
2. **Clean Section Inventory**: The core facts (Georgia Tech GTA, Richmond School District, US Property Price Visualization, Fake News Detector, plus newer repos like `filebot` and `VizWizards-M2-data-exploration`) provide strong factual material for a Hallmark Dusk build.

#### Priority Issues
- **[P0] What**: Live site returns HTTP 404 (`https://ianwong99.github.io` and Vercel both 404) because commit `0fbd30b` ("nuke") removed `index.html` and committed raw `personal-landing-v2.tsx`.
  - **Why it matters**: Visitors, recruiters, and collaborators clicking your GitHub Pages link hit an immediate 404 dead end.
  - **Fix**: Build and ship a production-ready `index.html` + `tokens.css` + `base.css` (or compiled bundle) directly deployable at the root of `ianwong99/ianwong99.github.io`.
  - **Suggested command**: `$impeccable harden`
- **[P1] What**: Broken light mode contrast (`<h1 className="... text-gray-100">Ian Wong.</h1>` on `bg-gray-50` yields 1.1:1 contrast) and missing `:focus-visible` / `prefers-reduced-motion` support (Hallmark Floor FAILs 26a, 27).
  - **Why it matters**: Toggling light mode makes your name disappear completely; keyboard and reduced-motion users lack basic accessibility affordances.
  - **Fix**: Replace ad-hoc Tailwind gray/green classes with Hallmark Dusk's OKLCH token system (`--color-paper`, `--color-ink`, `--color-day-ink`, `--color-well`, `--color-accent`, `--color-accent-2`) and instant `:focus-visible` outlines.
  - **Suggested command**: `$impeccable colorize`
- **[P2] What**: Category-interchangeable Brittany Chiang v4 clone (`font-mono` everywhere, numbered `01.`–`04.` eyebrows, `▹` bullets, `min-h-screen` voids).
  - **Why it matters**: Numbered section eyebrows (`01. About Me`) and full-page monospace are textbook template tells (Hallmark Floor 54, Reflex 64) that obscure your identity as an ML & visualization builder.
  - **Fix**: Remake in Hallmark's **Dusk** theme (`Wix Madefor Display` + `Wix Madefor Text`, dusk landscape hero with radial fog scrim, smoked glass product showcase with lit top edge, slate bands, bone wells, periwinkle + apricot signals).
  - **Suggested command**: `$impeccable shape`
- **[P2] What**: Dead-end project cards (`Github` and `ExternalLink` are imported on line 2 but never rendered; recent flagship work like `filebot` and `VizWizards` is missing).
  - **Why it matters**: Readers cannot inspect your repositories, see a live visual artifact, or discover your latest projects.
  - **Fix**: Build an interactive project showcase in Dusk's smoked-glass and bone-well surfaces with real repo links and live interactive previews of your ML/visualization and native tooling work.
  - **Suggested command**: `$impeccable polish`
- **[P3] What**: Monospace typography monoculture (`font-mono` on root wrapper) and ungrouped 8-item tech list.
  - **Why it matters**: Long-form prose in monospace slows reading and flattens hierarchy between display heads, body copy, and metadata.
  - **Fix**: Set headings in `Wix Madefor Display` (weight 500, `-0.022em` tracking), body in `Wix Madefor Text` (17px, 1.55 line-height), and tabular numerals (`tabular-nums`) for metrics and accuracy figures.
  - **Suggested command**: `$impeccable typeset`

#### Persona Red Flags
- **Taylor (Technical Recruiter / Hiring Manager)**: Hits a 404 on `ianwong99.github.io`; when inspecting the source component, finds unclickable project cards with no links to GitHub repos or resume, and immediately recognizes the Brittany Chiang v4 layout.
- **Sam (Accessibility / Keyboard User)**: Encounters zero `:focus-visible` states (FAIL 26a), unlabeled icon-only social links (`Linkedin`, `Mail`), unhidden `▹` glyph bullets, and 1.1:1 invisible hero text when toggling light mode.
- **Alex (ML / Systems Peer)**: Sees claims of millions of property records, D3.js clustering, and 83%+ NLP accuracy, but sees no visual artifact, interactive model/chart preview, or mention of your newer `filebot` / `VizWizards` work.

#### Minor Observations
- Fixed header (`backdrop-blur-sm`) has no background tint, so scrolled text collides with navigation links.
- Social rail includes LinkedIn and Mail but omits your GitHub profile (`github.com/ianwong99`).
- Every section forces `min-h-screen py-24`, leaving massive empty dark voids around short sections like About and Contact.

#### Questions to Consider
- What if the Dusk hero's smoked-glass pane showcased a live interactive view of your systems and ML work (e.g., an interactive model/pipeline run ledger or visualization explorer) right beside the headline?
- Should we include your newer projects (`filebot` and `VizWizards-M2-data-exploration`) alongside `US Property Price Visualization` and `Fake News Detector`?
