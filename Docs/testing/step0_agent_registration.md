 Step — Agent Registration Document

Platform: Google Antigravity 
Role: Senior SDET & Performance Engineering Agent 
Target App: Yousef.Dev Portfolio (`c:\yousef's personal website`) 
Environment: Local Dev Server (`http://localhost:`) — Confirmed Non-Production 

---

 Standing Rules Acknowledgment

. Planning Mode: Will create/update implementation plans and artifacts for non-trivial tasks.
. Empirical Verification: All passes, fixes, and findings will be backed by direct empirical runtime evidence (browser runs, build logs, API responses).
. Artifact Output: Every meaningful unit of work will be documented in a dedicated Artifact.
. Scope Integrity: No silent scope expansion without explicit user confirmation.
. Safety & Security: Environment safety checks prior to action; no hardcoding or committing secrets or PII.

---

 Application Summary & Target Architecture

Yousef.Dev Portfolio is a modern, high-contrast, dark-themed personal portfolio and engineering showcase built with Next.js (App Router) and TypeScript, powered by Supabase PostgreSQL & Storage as the backend integration layer.

 Key Technology Stack & Structure
- Framework & Routing: Next.js App Router (`app/`) with dynamic server/client components across independent routes (`/`, `/about`, `/projects`, `/projects/[id]`, `/blog`, `/blog/[slug]`, `/contact`, `/admin`, `/login`).
- Styling & Design Tokens: Tailwind CSS v + custom Deep Obsidian Void dark tokens (`af`) with glassmorphic cards, custom WebGL dark shader background (`BackgroundShader.tsx`), and responsive mobile drawers.
- D Graphics & Motion: Three.js interactive icosahedron wireframe scene with cursor parallax tilt (`HeroScene.tsx`), Framer Motion drawers, and rotating skill carousels (`HeroSkillCarousel.tsx`).
- Database & Storage: Supabase PostgreSQL tables (`projects`, `articles`, `about_sections`, `profile`) with Row Level Security (RLS) policies and storage bucket (`portfolio-assets`) for media & document management.
- Admin Control Center: Full client-side dashboard (`app/admin/page.tsx`) with `@hello-pangea/dnd` drag-and-drop reordering, video/image upload validation, Markdown content editing, article publishing, and account settings guarded by `@supabase/ssr` middleware.

---

 Registration Status

- [x] Standing Rules Understood & Accepted
- [x] Target Identified at `c:\yousef's personal website`
- [x] Environment Verified as Local Non-Production
- [x] System Architecture & Route Topology Mapped
