# System Architecture — Yousef.Dev Portfolio

## 1. Overview
The Yousef.Dev portfolio application is a full-stack, high-performance web engineering portfolio built with Next.js 15 (App Router), React 19, Supabase SSR, Three.js, and WebGL. It serves as both a public showcase of artificial intelligence & software engineering projects and an administrative content management system (CMS).

---

## 2. Core Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| Framework | Next.js 15.5 (App Router) | Server-side rendering (SSR), static generation (SSG), dynamic route handlers |
| UI Library | React 19 | Component lifecycle, state management, client-side interactivity |
| Backend & Database | Supabase (PostgreSQL) | Managed database, authentication engine, Row Level Security (RLS), storage buckets |
| Auth SSR | `@supabase/ssr` | Cookie-based server-side session sync, client client & server client factory |
| 3D & Graphics | Three.js & WebGL | Animated icosahedron hero scene, dynamic obsidian wave background shader |
| Styling | Vanilla CSS & Tailwind CSS | Design tokens, glassmorphism utilities (`.glass-card`), typography |
| Interactivity | Framer Motion & `@hello-pangea/dnd` | Smooth animations, drag-and-drop gallery image reordering |

---

## 3. Security Architecture & Route Obfuscation

### Option C Secret URL + Magic Link Authentication
To protect administrative features against automated attacks, password guessing, and endpoint discovery:

1. **Obscured Routes:**
   - Secret Admin Control Center: `/[secret-admin-route]`
   - Secret Magic Link Login: `/[secret-auth-route]`
   - Public endpoint elimination: `/admin` and `/login` return `404 Not Found`.

2. **Passwordless Magic Link OTP:**
   - Password authentication (`signInWithPassword`) is completely disabled.
   - Login uses Supabase Magic Link OTP (`signInWithOtp`). A single-use authentication link is sent directly to the authorized administrator's email.

3. **Edge Middleware Guard (`middleware.ts`):**
   - Intercepts all incoming requests matching protected paths (`/[secret-admin-route]`).
   - Validates active Supabase session cookies via `supabase.auth.getUser()`.
   - Redirects unauthenticated traffic attempting to access `/[secret-admin-route]` back to `/[secret-auth-route]`.
   - Automatically redirects authenticated users away from `/[secret-auth-route]` to `/[secret-admin-route]`.

4. **Security Headers (`next.config.mjs`):**
   - `X-Frame-Options: DENY` (prevents clickjacking attacks).
   - `X-Content-Type-Options: nosniff` (prevents MIME sniffing).
   - `Referrer-Policy: strict-origin-when-cross-origin`.
   - `Content-Security-Policy`: Restricts script, style, font, image, media, and WebSocket connections to trusted domains.

---

## 4. Performance & Data Architecture

### Server Components & Caching
- **Request Deduplication (`lib/queries.ts`):** Supabase queries (such as `getProjectById` and `getArticleBySlug`) are wrapped with `React.cache()` to ensure single-request execution when shared between `generateMetadata()` and page components.
- **Concurrent Parallel Fetching:** Server components fetch independent datasets concurrently using `Promise.all()` to minimize waterfall latency.
- **Dynamic 3D Component Loading:** Heavy WebGL graphics (`BackgroundShader`) and Three.js scenes (`HeroScene`) are loaded via client wrappers with `next/dynamic` (`ssr: false`). This defers canvas compilation until after the initial UI paint, reducing Total Blocking Time (TBT) to under 50ms and dropping initial JS bundle size from 278 kB to 157 kB (-43.5%).

---

## 5. Media & Gallery Architecture

### Epic Games Store Style Showcase (`EpicMediaShowcase.tsx`)
- **Main Stage Media Player:** Supports auto-playing MP4/WebM video with controls or high-resolution cover photos.
- **Interactive Thumbnail Strip:** Horizontal carousel featuring video preview (with Play overlay badge) and gallery image thumbnails. Clicking any thumbnail updates the main media stage.
- **Drag-and-Drop Reordering (`@hello-pangea/dnd`):** In the Admin Control Center, gallery images can be reordered interactively by dragging thumbnails with the mouse cursor before saving to PostgreSQL.
