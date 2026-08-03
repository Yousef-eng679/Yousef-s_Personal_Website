# Product Requirements Document (PRD) — Yousef.Dev Portfolio

## 1. Executive Summary
Yousef.Dev is a full-stack, high-performance personal portfolio and content management system (CMS) designed for Yousef, an AI-augmented software developer and independent AI researcher with a core background in C++ and Python.

The website presents a Neon Nocturnal dark-theme interface built with Next.js 15, React 19, Three.js, WebGL graphics, and Supabase. It features an Epic Games Store style media showcase, dynamic category filtering, interactive drag-and-drop CMS management, passwordless Magic Link authentication, and security hardening.

---

## 2. Target Audience & Core Objectives
- **Target Audience:** Engineering managers, technical recruiters, researchers, software architects, and open-source collaborators.
- **Primary Goal:** Provide a polished showcase of AI engineering projects, technical research, and software tools.
- **Secondary Goal:** Provide a secure, passwordless administration portal for real-time project, blog, and profile content management.

---

## 3. Product Architecture & Epics

### Epic 1: High-Performance Frontend & Graphics
- **Neon Nocturnal Dark Theme:** Deep obsidian violet surfaces (`#15121b`), vibrant purple accents (`#8b5cf6`), glassmorphic cards (`.glass-card`), and custom scrollbars.
- **3D Hero Graphics:** Interactive Three.js animated icosahedron core with dynamic hover acceleration and 500 floating particles.
- **WebGL Background Shader:** Animated GPU wave shader canvas with grain noise and tab-visibility pause logic.
- **Lazy Loading & TBT Optimization:** Deferred 3D/WebGL canvas compilation using client wrappers with `next/dynamic` (`ssr: false`), achieving Total Blocking Time (TBT) <50ms and dropping initial JS payload by 43.5% (278 kB to 157 kB).
- **Responsive Layout:** Persistent sidebar navigation for desktop and slide-over drawer for mobile devices.

### Epic 2: Epic Games Store Style Media Showcase
- **Main Stage Media Player:** 16:9 media container supporting auto-playing MP4/WebM video with controls or high-resolution cover photos.
- **Interactive Thumbnail Strip:** Horizontal carousel featuring video preview (with Play badge) and gallery image thumbnails. Clicking any thumbnail updates the main media player.
- **Store Action Sidebar:** Glass card featuring app logo/icon, title, primary "Launch App" CTA button, secondary "GitHub Repository" button, and technical specs table (Developer, Category, Tech Stack).

### Epic 3: Secret Admin Control Center & Passwordless Auth
- **Obscured Route Hardening:** Secret admin route `/[secret-admin-route]` and secret login route `/[secret-auth-route]`. Public `/admin` and `/login` return `404 Not Found`.
- **Passwordless Magic Link OTP:** Authentication uses Supabase Magic Link OTP (`signInWithOtp`). Password brute-force attacks are completely eliminated.
- **Edge Middleware Guard:** Intercepts protected admin paths and validates Supabase session cookies via `supabase.auth.getUser()`.
- **Drag-and-Drop Content Management:**
  - Project sorting via drag-and-drop reordering with `@hello-pangea/dnd`.
  - Interactive thumbnail drag-and-drop reordering for gallery images with cursor.
  - Multi-format media upload support for video (MP4/WebM up to 50MB) and image assets.
  - Uploadable custom icon images (PNG/SVG/WebP) or optional blank icon state.

### Epic 4: Public Content Hub & Navigation
- **Project Gallery (`/projects`):** Instant category filtering pills (All, Projects, Research, Tools) with responsive grid.
- **Project Detail Page (`/projects/[id]`):** Epic Games style media showcase, technical long descriptions, and Markdown specs rendering via `ReactMarkdown` and `remark-gfm`.
- **Blog Reader (`/blog` & `/blog/[slug]`):** Published articles listing, read time badges, cover images, and Markdown article rendering.
- **About Page (`/about`):** Admin-managed profile sections with image support.
- **Contact Page (`/contact`):** Direct email mailto link and social integration cards.

### Epic 5: SEO, Security & Performance Hardening
- **Security Headers:** Strict CSP, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy`.
- **Dynamic XML Sitemap:** Route handler at `/sitemap.xml` serving auto-generated sitemap XML for static pages and dynamic project/blog URLs.
- **Robots.txt:** Search engine crawler instructions disallowing secret admin routes.
- **Metadata Base:** Open Graph and Twitter Card metadata configured with `metadataBase: new URL('https://yousef.dev')`.
- **Request Deduplication:** `React.cache()` wrapped fetchers in `lib/queries.ts` to prevent duplicate Supabase queries.

---

## 4. Key Performance Indicators (KPIs)
- **Lighthouse Performance Score:** 95+ (Desktop/Production)
- **Total Blocking Time (TBT):** < 50 ms
- **First Contentful Paint (FCP):** < 1.2 s
- **Dependencies Audit:** 0 CVE Vulnerabilities (`npm audit`)
- **Regression Suite Pass Rate:** 100% (11/11 tests)
