 Step — Baseline Performance Metrics Document

Mission B Phase — Baseline Performance Metrics 
Environment: Production Server (`http://localhost:`) — Non-Production Local Machine 
Measurement Method: HTTP . Benchmark (`npx next start -p `) + Next.js Static Analysis 

---

 . Frontend Bundle & Route Sizes (Build Trace Output)

| Route | Route Type | Page Size (HTML/Payload) | First Load JS (Shared + Route) |
|---|---|---|---|
| `/` (Home) | Dynamic (ƒ) | kB | kB |
| `/about` | Dynamic (ƒ) | B | kB |
| `/projects` | Dynamic (ƒ) | . kB | kB |
| `/projects/[id]` | Dynamic (ƒ) | B | kB |
| `/blog` | Dynamic (ƒ) | B | kB |
| `/blog/[slug]` | Dynamic (ƒ) | B | kB |
| `/contact` | Dynamic (ƒ) | B | kB |
| `/login` | Dynamic (ƒ) | . kB | kB |
| `/admin` | Dynamic (ƒ) | . kB | kB |
| `/_not-found` | Dynamic (ƒ) | B | kB |
| Shared Chunks | — | — | kB |

---

 . Server Latency & TTFB Benchmarks ( Samples / Route)

| Route | Status | Response Size | TTFB p | Latency p | Latency p | Latency p | Average Latency |
|---|---|---|---|---|---|---|---|
| `/` (Home) | OK | . KB | ms | ms | ms | ms | ms |
| `/about` | OK | . KB | ms | ms | ms | ms | ms |
| `/projects` | OK | . KB | ms | ms | ms | ms | ms |
| `/blog` | OK | . KB | ms | ms | ms | ms | ms |
| `/contact` | OK | . KB | ms | ms | ms | ms | ms |
| `/login` | OK | . KB | ms | ms | ms | ms | ms |
| `/admin` | Redirect | . KB | ms | ms | ms | ms | ms |

---

 . Core Database Query Costs (Supabase PostgreSQL)

- Home Page (`/`): Executes separate sequential queries: `profile` SELECT single (ms), `projects` SELECT featured (ms), `articles` SELECT published (ms). Total server query time ~ms.
- Projects Page (`/projects`): `projects` SELECT all ordered by `sort_order` (~ms).
- About Page (`/about`): `about_sections` SELECT all ordered by `sort_order` + `profile` SELECT single (~ms).
- Blog Page (`/blog`): `articles` SELECT published ordered by `published_at` (~ms).
- Contact Page (`/contact`): `profile` SELECT single (~ms).

---

 Hard Constraints Confirmation
- All Mission B performance optimizations must preserve % identical external behavior, API contracts, and UI states.
- Numbers established above serve as the exact regression gate.
