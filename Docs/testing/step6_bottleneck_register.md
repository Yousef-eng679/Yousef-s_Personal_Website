 Step — Bottleneck Register Document

Mission B Phase — Bottleneck Identification 
Evaluation Basis: Baseline Metrics Document + Source Code Profiling 

---

 Bottleneck Register

| ID | Location | Measured Cost | Root Cause | Proposed Fix | Risk Rating | Impact × Effort Rank |
|---|---|---|---|---|---|---|
| BN- | `app/page.tsx` (Home) | ~ms query wait time (p: ms) | sequential `await` Supabase calls (`profile`, `projects`, `articles`) | Execute queries concurrently with `Promise.all([ ... ])` | Negligible | (High / Low) |
| BN- | `app/about/page.tsx` | ~ms query wait time (p: ms) | Sequential `await` calls for `about_sections` and `profile` | Execute queries concurrently with `Promise.all([ ... ])` | Negligible | (Medium / Low) |
| BN- | `app/page.tsx`, `app/about/page.tsx`, `app/projects/page.tsx`, `app/blog/page.tsx` | -ms latency on every request | `export const revalidate = ;` forces on-demand SSR on every request | Enable ISR (`revalidate = `) or stale-while-revalidate caching for instant <ms static response | Negligible | (High / Low) |
| BN- | `components/ui/ProjectCard.tsx`, `components/projects/ProjectsGallery.tsx`, `app/blog/page.tsx` | Up to KB payload per card | Raw `<img>` tags without responsive sizing or lazy loading | Wrap images with Next.js `next/image` or responsive image optimization props | Negligible | (Medium / Medium) |

---

 Risk & Functional Safety Analysis
- BN- & BN-: Concurrent database fetching via `Promise.all` returns identical data payloads with change to external behavior or component props.
- BN-: Incremental Static Regeneration (ISR) serves cached static responses in <ms while automatically refreshing background data every seconds (or upon revalidate trigger), preserving complete UI/API fidelity.
- BN-: Image optimization reduces network payload and LCP without altering layout dimensions or design tokens.
