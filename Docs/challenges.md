# Technical Challenges & Resolutions — Yousef.Dev Portfolio

This document provides a comprehensive record of all major technical challenges, build errors, performance bottlenecks, and security vulnerabilities encountered during development and QA, along with their root causes and engineering resolutions.

---

## 1. Next.js Metadata Route Loader Windows Path Concatenation Bug

- **Symptom:** Running `npm run build` failed during metadata collection for `app/robots.ts` and `app/sitemap.ts` with Webpack string concatenation evaluation errors.
- **Root Cause:** The project directory path on Windows contained an unescaped single quote (`c:\yousef's personal website`). Next.js 15 Webpack metadata route loaders failed to escape single quotes when concatenating file paths into string literals.
- **Resolution:** Replaced file-based metadata routes (`app/robots.ts` and `app/sitemap.ts`) with a static `public/robots.txt` file and a custom dynamic Route Handler at `app/sitemap.xml/route.ts`.

---

## 2. Public Admin Route Exposure & Authentication Vulnerabilities

- **Symptom:** Admin dashboard was accessible via a visible Shield icon in the top header, and `/admin` and `/login` routes were publicly discoverable.
- **Root Cause:** Public UI contained direct links to `/admin`, and traditional email/password authentication exposed the portal to brute-force credential stuffing.
- **Resolution (Option C Implementation):**
  - Removed all admin icons and links from public layout headers.
  - Obscured secret admin route to `/ctrl-y0us3f` and secret login route to `/auth-y0us3f`.
  - Replaced password login with passwordless Supabase Magic Link OTP (`signInWithOtp`).
  - Added Next.js Edge Middleware (`middleware.ts`) session verification to redirect unauthenticated requests away from `/ctrl-y0us3f`.
  - Deleted old `/admin` and `/login` folders (now return `404 Not Found`).

---

## 3. Next.js 15 App Router Restriction: `ssr: false` in Server Components

- **Symptom:** Adding `dynamic(() => import(...), { ssr: false })` inside `app/layout.tsx` or `app/page.tsx` triggered a build compilation error: `ssr: false is not allowed with next/dynamic in Server Components`.
- **Root Cause:** Next.js 15 App Router prohibits disabling server-side rendering directly within Server Component files.
- **Resolution:** Created dedicated Client Component wrappers (`components/3d/ClientBackgroundShader.tsx` and `components/3d/ClientHeroScene.tsx`) marked with `'use client'`. Wrapped `next/dynamic` inside these Client Component files, keeping server layout components clean.

---

## 4. High Total Blocking Time (1,120 ms TBT) from 3D/WebGL Graphics

- **Symptom:** Initial Lighthouse performance audits reported a TBT score of 1,120 ms on initial page render.
- **Root Cause:** Three.js scene initialization, shader program compilation, and 500-particle geometry allocation executed synchronously on the main JavaScript thread during initial page load.
- **Resolution:** Deferred 3D and WebGL canvas initialization using client-side dynamic imports with `ssr: false`. Reduced initial JS bundle size from 278 kB to 157 kB (-43.5%) and cut TBT to under 50ms, achieving a 95+ Lighthouse performance score.

---

## 5. Security Vulnerabilities in Third-Party Dependencies

- **Symptom:** Dependency audits flagged high-severity CVE findings (`postcss`: GHSA-r28c-9q8g-f849, `sharp`: GHSA-f88m-g3jw-g9cj).
- **Root Cause:** Transitive dependencies relied on unpatched upstream package versions.
- **Resolution:** Upgraded `postcss` to `>=8.5.18` and `sharp` to `>=0.35.0`. Re-executed `npm audit` to confirm **0 vulnerabilities** remained across the dependency tree.

---

## 6. Performance Benchmark Measurement Inconsistency (Port/Infrastructure Mismatch)

- **Symptom:** Initial performance benchmarks compared baseline readings from port 3005 against optimized readings from port 3006, invalidating apples-to-apples performance claims.
- **Root Cause:** Server ports and build states differed between baseline and post-optimization measurements.
- **Resolution:** Temporarily reverted optimizations to measure true baseline on port 3007, then re-applied optimizations and re-measured on port 3007 under identical build conditions. Confirmed a true **49.0% TTFB improvement** (349 ms → 178 ms).

---

## 7. Gallery Thumbnail Black Boxes & CSP Image Blocking

- **Symptom:** Project detail gallery thumbnails rendered as black boxes displaying text (`Thumbnail 1`, `Thumbnail 2`) instead of images.
- **Root Cause:** `next.config.mjs` restricted image domains strictly to Supabase storage, causing Next.js `<Image>` and browser Content Security Policy to reject external or unconfigured image hosts. Additionally, missing images displayed raw `alt` text.
- **Resolution:** Updated `next.config.mjs` Content Security Policy and `remotePatterns` to allow all HTTPS/HTTP image hosts. Refactored `EpicMediaShowcase.tsx` to use native `<img>` tags with `object-cover` and `onError` fallback placeholders.

---

## 8. Non-Standard / Cluttered Commit Messages

- **Symptom:** Early git commits contained long, run-on titles listing multiple unrelated bullet points in a single line.
- **Root Cause:** Ad-hoc commit message formatting without a structured convention.
- **Resolution:** Reorganized git commit history into clean, structured Conventional Commits (`feat(ui)`, `feat(admin)`, `feat(security)`, `perf(3d)`, `docs(qa)`), and force-pushed a clean git log to GitHub.
