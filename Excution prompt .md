**Goal:** Bootstrap the MVP for Yousef’s portfolio, implementing the Supabase schema, secure admin dashboard, and the core "Labs" content architecture.

### Assumptions
*   **ASSUMPTION:** The project uses `react-router-dom` for client-side routing.
*   **ASSUMPTION:** The "green" theme uses Tailwind colors: `bg-background` (near-black), `text-foreground` (white/gray), and `primary` (a soft terminal green).
*   **ASSUMPTION:** A project belongs to exactly one "Lab" (Category) for MVP simplicity.
*   **ASSUMPTION:** The `shadcn/ui` library is pre-installed; components used: `Button`, `Input`, `Textarea`, `Card`, `Form`, `Select`, `Dialog`.

### Data Model Changes
*   **Table: `labs`** (`id`, `name` (text), `slug` (text, unique))
*   **Table: `projects`** (`id`, `title`, `description`, `image_url`, `video_url`, `lab_id` (FK), `is_featured` (bool), `created_at`)
*   **RLS Policies:**
    *   `labs`: `SELECT` for `anon` (everyone), `ALL` for `authenticated` (admin only).
    *   `projects`: `SELECT` for `anon`, `ALL` for `authenticated`.
    *   **Storage:** `portfolio-assets` bucket, `SELECT` for `anon`, `ALL` for `authenticated`.

### Core Logic
*   **Auth:** Use `supabase.auth.signInWithPassword`. Protect `/admin/*` routes via a `ProtectedRoute` wrapper checking `supabase.auth.getSession()`.
*   **Main Grabber:** Fetch featured items via `supabase.from('projects').select('*').eq('is_featured', true).limit(5)`.
*   **Labs Routing:** Use dynamic route `/labs/:slug` to filter content: `supabase.from('projects').select('*, labs!inner(*)').eq('labs.slug', slug)`.

### Failure Modes
*   **Auth:** If `getSession` fails or returns null, redirect to `/login` immediately.
*   **Queries:** All Supabase calls must be wrapped in `try/catch` with a `toast` notification (shadcn/ui) on failure.
*   **Empty States:** If no projects found for a lab, render a "Coming Soon" component.

### Files to Create/Modify
*   `src/lib/supabase.ts`: Supabase client initialization.
*   `src/components/layout/Navbar.tsx`: Navigation with `Link` to Labs.
*   `src/pages/AdminDashboard.tsx`: CRUD interface for projects.
*   `src/pages/LabView.tsx`: Dynamic page rendering projects by `lab_id`.
*   `src/pages/Landing.tsx`: Hero section + Featured projects grid.
*   `src/components/ui/BlurCard.tsx`: Custom wrapper using `backdrop-blur-md` and `border-primary/20`.

### Supabase Queries
*   **Fetch Featured:** `supabase.from('projects').select('*, labs(name)').eq('is_featured', true).order('created_at', { ascending: false })`
*   **Fetch Lab Content:** `supabase.from('projects').select('*, labs!inner(*)').eq('labs.slug', params.slug)`
*   **Upsert Project:** `supabase.from('projects').upsert({ ...data })`

### Acceptance Criteria
1.  **Given** an unauthenticated user, **when** accessing `/admin`, **then** they are redirected to `/login`.
2.  **Given** a project marked `is_featured: true`, **when** the landing page loads, **then** it appears in the hero grid.
3.  **Given** a user clicks a "Lab" link, **when** the route changes, **then** the page fetches and displays only projects associated with that `lab_id`.
4.  **Given** the dark mode requirement, **when** any component is rendered, **then** it must use `bg-background` and `text-foreground` tokens.

### Open Questions
*   **Hero Section:** Is the hero content static or dynamic? (Proceeding with static for MVP, but modularized).
*   **Video:** Are we using `video` tags or `iframe` embeds? (Assuming `video` tags with `src` from Supabase Storage).

---
**Deploy/Run Note:** Run `npx supabase init` before starting. Ensure `NEXT_PUBLIC_SUPABASE_URL` and `ANON_KEY` are in `.env`. Use `framer-motion` for the requested blur-lighting animations.