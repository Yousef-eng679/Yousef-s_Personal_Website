 Step — Test Scope Document

Mission A Phase — Reconnaissance & Testing Topology 
Environment: Local Dev Server (`http://localhost:`) — Confirmed Non-Production 

---

 . Route & Endpoint Topology

| Route / Endpoint | Access Level | Data Operations | Input Surfaces |
|---|---|---|---|
| `/` (Home) | Public | Read (`profile`, `projects`, `articles`) | — |
| `/about` | Public | Read (`about_sections`, `profile`) | — |
| `/projects` | Public | Read (`projects`) | Category Filter Pills (`All`, `Projects`, `Research`, `Tools`) |
| `/projects/[id]` | Public | Read (`projects` by UUID) | — |
| `/blog` | Public | Read (`articles` where `is_published = true`) | — |
| `/blog/[slug]` | Public | Read (`articles` by `slug`) | — |
| `/contact` | Public | Read (`profile`) | Mailto link |
| `/login` | Public | Auth (`signInWithPassword`) | Email, Password inputs |
| `/admin` | Authenticated | Full CRUD (`projects`, `articles`, `about_sections`, `profile`, Storage uploads) | Project Form, Article Form, About Form, Profile Form, File Uploads |

---

 . User Roles & Auth Boundaries

. Anonymous / Public User: Read-only access to portfolio showcase, project detail views, articles, about info, and contact links. Accessing `/admin` redirects to `/login`.
. Authenticated Admin User: Authenticated via Supabase Auth session (`admin@yousef.dev`). Access to `/admin` dashboard with full CRUD privileges and Supabase Storage bucket access (`portfolio-assets`).

---

 . Data Entry Surfaces & Form Inputs

- Login Form: `/login` — `email`, `password`.
- Project Editor Modal: `/admin` — `title`, `description`, `long_description`, `content` (Markdown), `icon_emoji`, `icon_color`, `category`, `tech_stack`, `image_url` (upload/text), `video_url` (upload/text, MB max), `github_url`, `live_url`, `gallery_urls`, `is_featured`, `sort_order`.
- Article Editor Modal: `/admin` — `title`, `slug`, `summary`, `content` (Markdown), `cover_image_url` (upload/text), `read_time`, `is_published`.
- About Section Editor Modal: `/admin` — `title`, `content` (Markdown), `image_url` (upload/text), `sort_order`.
- Profile Form: `/admin` — `full_name`, `title`, `bio`, `headline`, `email`, `github_url`, `linkedin_url`, `cv_url` (upload), `available_for_work`.

---

 . Scope Definition

 In Scope
- EE functional testing of all public routes and admin portal.
- Form validation, error handling, state persistence, responsive behavior, keyboard accessibility.
- Auth boundaries & middleware enforcement (`/admin` access control).
- Input sanitization (XSS, SQLi, Path Traversal, File Upload validation).
- Dependency CVE audit (`npm audit`).

 Out of Scope
- Mass DoS / stress testing on third-party Supabase cloud infrastructure.
- Production environment modifications.
