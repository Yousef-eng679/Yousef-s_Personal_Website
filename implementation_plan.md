# Final Implementation Plan: Yousef.Dev — AI Engineer & Full-Stack Portfolio

Build Yousef's personal portfolio website using **Next.js (App Router)**, **Three.js** (3D WebGL hero scene + background shader), **Tailwind CSS**, **Framer Motion**, and **Supabase**, adhering strictly to the **Neon Nocturnal** design system (`DESIGN.md`) and visual layout (`code.html`).

## User Review Required

> [!IMPORTANT]
> **Shift in Architecture**:
> Instead of separating content into isolated "Labs" routes, the application uses a **unified single-page dashboard architecture** with persistent left sidebar navigation (Home, About, Projects, Blog, Contact), topbar search command bar (`⌘K`), 3D Three.js interactive canvas, and project showcase sections.

> [!NOTE]
> **Supabase Live Credentials**:
> The project will use the active Supabase project (`My_personal_Website`):
> - `NEXT_PUBLIC_SUPABASE_URL`: `https://aancvsttiralqneuwnxw.supabase.co`
> - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

## Proposed Changes

---

### Project Setup & Dependencies

#### [NEW] [package.json](file:///c:/yousef's%20personal%20website/package.json)
Initialize Next.js project dependencies:
- `next` (Next.js 15 App Router)
- `react`, `react-dom` (React 19)
- `@supabase/ssr`, `@supabase/supabase-js` (Supabase Server/Client SDKs)
- `three`, `@types/three` (3D WebGL Canvas Engine)
- `framer-motion` (Fluid animations)
- `lucide-react` (Modern icons)
- `clsx`, `tailwind-merge`

#### [NEW] [next.config.mjs](file:///c:/yousef's%20personal%20website/next.config.mjs)
Configure image remote patterns for Supabase Storage and Unsplash.

#### [NEW] [tailwind.config.ts](file:///c:/yousef's%20personal%20website/tailwind.config.ts)
Configure **Neon Nocturnal** design system colors (`surface`, `accent-purple` `#8b5cf6`, `accent-blue` `#3b82f6`, `accent-gold` `#f9bd22`), font families (`Hanken Grotesk`, `Inter`, `Geist`), and keyframe animations (`fade-in-up`).

#### [NEW] [app/globals.css](file:///c:/yousef's%20personal%20website/app/globals.css)
Inject Google Fonts (`Hanken Grotesk`), custom glassmorphism utilities (`.glass-card`, `.sidebar-link`), custom webkit scrollbar (`#3c3742` thumb with `#8b5cf6` hover glow), and procedural background shader styling.

---

### Database Schema & Supabase Configuration

#### [NEW] [supabase/schema.sql](file:///c:/yousef's%20personal%20website/supabase/schema.sql)
Provide SQL DDL for database setup:
- Create `projects` table (`id`, `title`, `description`, `category`, `image_url`, `video_url`, `github_url`, `live_url`, `icon_emoji`, `is_featured` boolean, `tech_stack` text array, `created_at`).
- Create `articles` table (`id`, `title`, `summary`, `content`, `slug`, `read_time`, `published_at`).
- Create `profile` table (`id`, `full_name`, `title`, `bio`, `available_for_work` boolean, `cv_url`, `github_url`, `linkedin_url`).
- Enable RLS policies: `anon` SELECT access; `authenticated` ALL permissions.
- Create `portfolio-assets` storage bucket for uploaded media.
- Seed initial project entries (`NeuralChat AI`, `DataVista`, `ShopSphere`, `DevFlow`, `ImageGen Studio`).

#### [NEW] [utils/supabase/server.ts](file:///c:/yousef's%20personal%20website/utils/supabase/server.ts) & [utils/supabase/client.ts](file:///c:/yousef's%20personal%20website/utils/supabase/client.ts)
Supabase server and browser client singletons using `@supabase/ssr`.

#### [NEW] [middleware.ts](file:///c:/yousef's%20personal%20website/middleware.ts)
Next.js Middleware updating Supabase auth session cookies and protecting `/admin/*` routes.

---

### Shared Layout & 3D Interactive Components

#### [NEW] [components/layout/Sidebar.tsx](file:///c:/yousef's%20personal%20website/components/layout/Sidebar.tsx)
Persistent left sidebar (`w-64`, `bg-surface-lowest/80 backdrop-blur-xl border-r border-white/5`):
- Brand avatar ("Y") with glowing purple background.
- Nav links (`Home`, `About`, `Projects`, `Blog`, `Contact`) with active state right-border accent (`border-r-2 border-accent-purple`).
- External integration links (GitHub, LinkedIn).
- Availability status indicator ("Available for work" with pulsing emerald dot).

#### [NEW] [components/layout/Header.tsx](file:///c:/yousef's%20personal%20website/components/layout/Header.tsx)
Top sticky header (`h-16`, `bg-surface-lowest/40 backdrop-blur-md border-b border-white/5`):
- Search bar input (`⌘K` command search across projects and skills).
- Quick action buttons and admin user avatar.

#### [NEW] [components/3d/HeroScene.tsx](file:///c:/yousef's%20personal%20website/components/3d/HeroScene.tsx)
Interactive Three.js 3D WebGL Canvas Component:
- Dual-layer wireframe Icosahedron geometry (Inner Electric Violet core + Outer Cyber Blue cage).
- Floating 500-particle field.
- Mouse hover listener that accelerates rotation speed (4.5x target speed multiplier).
- Background ambient radial glow blurs.

#### [NEW] [components/3d/BackgroundShader.tsx](file:///c:/yousef's%20personal%20website/components/3d/BackgroundShader.tsx)
Procedural WebGL fragment shader creating subtle animated dark background waves and grain texture.

#### [NEW] [components/ui/ProjectCard.tsx](file:///c:/yousef's%20personal%20website/components/ui/ProjectCard.tsx)
Glassmorphic project card component (`.glass-card`):
- Icon/emoji badge container (`bg-accent-purple/20` or `bg-emerald-500/20`).
- Title, description, and uppercase tech stack badges (`Next.js`, `Python`, `LangChain`, etc.).
- Project link footer with animated arrow icon.

---

### Pages & Routes (`app/`)

#### [NEW] [app/layout.tsx](file:///c:/yousef's%20personal%20website/app/layout.tsx)
Root layout setting up Google Fonts (`Hanken Grotesk`, `Inter`), background WebGL shader, persistent Sidebar, Header topbar, and main container.

#### [NEW] [app/page.tsx](file:///c:/yousef's%20personal%20website/app/page.tsx)
Main Portfolio Dashboard Page:
- **Hero Section:** Greeting ("Hello, I'm Yousef 👋"), headline ("Yousef.Dev / AI Engineer & Full-Stack Developer"), "View My Work" CTA with neon glow (`shadow-[0_0_25px_rgba(139,92,246,0.5)]`), "Download CV" CTA, and interactive 3D WebGL Hero Scene.
- **Featured Projects Section:** 4-column responsive grid of `ProjectCard` components fetched from Supabase.
- **About & Skills Section:** Interactive tech stack breakdown and bio summary.

#### [NEW] [app/login/page.tsx](file:///c:/yousef's%20personal%20website/app/login/page.tsx)
Admin login page (`/login`) in Neon Nocturnal glass style.

#### [NEW] [app/admin/page.tsx](file:///c:/yousef's%20personal%20website/app/admin/page.tsx)
Protected Admin Dashboard (`/admin`): CRUD operations for projects, articles, availability toggle, and media asset upload to Supabase Storage.

---

## Verification Plan

### Automated Build & Type Checks
- Execute `npm run build` to verify Next.js App Router compilation, static page generation, and zero TypeScript errors.

### Manual Verification Checklist
1. **3D WebGL Interaction:** Hover over the Three.js hero canvas -> verify rotation speed accelerates smoothly.
2. **Glassmorphism Hover State:** Hover over project cards -> verify border transitions to `rgba(139,92,246,0.3)` and `translateY(-4px)` elevation.
3. **Sidebar Active States:** Click nav links -> verify active state border and highlight.
4. **Auth Guard:** Access `/admin` while unauthenticated -> verify redirect to `/login`.
