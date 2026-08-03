# Project File Structure — Yousef.Dev Portfolio

```text
c:/yousef's personal website/
├── app/
│   ├── about/
│   │   └── page.tsx                     # About Me page displaying profile & admin sections
│   ├── auth-y0us3f/
│   │   └── page.tsx                     # Secret Magic Link OTP login page (Passwordless)
│   ├── blog/
│   │   ├── [slug]/
│   │   │   └── page.tsx                 # Dynamic blog post reader (ReactMarkdown + remark-gfm)
│   │   ├── loading.tsx                  # Loading skeleton for blog pages
│   │   └── page.tsx                     # Blog listing page
│   ├── contact/
│   │   └── page.tsx                     # Contact page with profile email & social links
│   ├── ctrl-y0us3f/
│   │   └── page.tsx                     # Secret Admin Dashboard (Projects, Articles, About, Profile)
│   ├── projects/
│   │   ├── [id]/
│   │   │   └── page.tsx                 # Dynamic project detail page (Epic Media Showcase)
│   │   ├── loading.tsx                  # Loading skeleton for project gallery
│   │   └── page.tsx                     # Public projects gallery page with category filter
│   ├── sitemap.xml/
│   │   └── route.ts                     # Dynamic XML sitemap generator Route Handler
│   ├── error.tsx                        # Client-side error boundary with glass-card retry UI
│   ├── global-error.tsx                 # Root layout error boundary for fatal crashes
│   ├── globals.css                      # Global design system tokens, utility classes, prose
│   ├── layout.tsx                       # Root layout (Sidebar, Header, BackgroundShader, Fonts)
│   ├── loading.tsx                      # Root loading skeleton placeholder
│   ├── not-found.tsx                    # Custom glass-card 404 Not Found page
│   └── page.tsx                         # Landing page (Hero section, Featured Projects, Insights)
├── components/
│   ├── 3d/
│   │   ├── BackgroundShader.tsx         # WebGL dark wave shader canvas component
│   │   ├── ClientBackgroundShader.tsx   # Client wrapper with ssr: false for BackgroundShader
│   │   ├── ClientHeroScene.tsx          # Client wrapper with ssr: false for HeroScene
│   │   └── HeroScene.tsx                # Three.js animated icosahedron core & particle scene
│   ├── layout/
│   │   ├── Header.tsx                   # Top header component (Cleaned, no admin indicators)
│   │   ├── MobileSidebar.tsx            # Slide-over drawer menu for mobile screens
│   │   └── Sidebar.tsx                  # Persistent left sidebar navigation
│   ├── projects/
│   │   ├── EpicMediaShowcase.tsx        # Epic Games Store style media player & action card
│   │   └── ProjectsGallery.tsx          # Interactive project gallery with category filters
│   └── ui/
│       ├── EmptyState.tsx               # Reusable empty state placeholder component
│       ├── HeroSkillCarousel.tsx        # Dynamic animated skill badge carousel
│       ├── ProjectCard.tsx              # Project showcase card with hover video preview
│       └── SkeletonCard.tsx             # Animated skeleton card for loading states
├── Docs/
│   ├── testing/                         # Consolidated QA & Performance testing suite
│   │   ├── step0_agent_registration.md  # QA agent registration log
│   │   ├── step1_test_scope.md          # Comprehensive test scope & matrix
│   │   ├── step2_bug_log.md             # Defect tracking log
│   │   ├── step3_security_findings.md   # Dependency CVE audit & patch log
│   │   ├── step4_consolidated_qa_report.md # Regression test suite results
│   │   ├── step5_baseline_metrics.md    # Initial performance latency benchmarks
│   │   ├── step6_bottleneck_register.md # Bottleneck register & optimization plan
│   │   ├── step7_performance_fixes.md   # Code optimization record
│   │   ├── step8_final_performance_report.md # Post-optimization benchmark comparisons
│   │   ├── gap_closure_report.md        # Closure evidence report for audit gaps
│   │   └── antigravity_step_by_step_tasks.md # Step-by-step task tracking register
│   ├── Architecture.md                  # System architecture documentation
│   ├── file_structure.md                # Project file structure documentation
│   ├── UI_UX_guidelines.md              # Design system & UI/UX guidelines
│   └── challenges.md                    # Technical challenges faced & resolutions
├── lib/
│   └── queries.ts                       # React.cache() wrapped Supabase query fetchers
├── public/
│   └── robots.txt                       # Search engine crawler instructions
├── types/
│   └── database.ts                      # TypeScript definitions for Supabase schema
├── utils/
│   └── supabase/
│       ├── client.ts                    # Supabase browser client factory
│       ├── server.ts                    # Supabase server client factory (cookies)
│       └── middleware.ts                # Supabase middleware helper
├── .env.example                         # Environment variables template file
├── .env.local                           # Local environment credentials (gitignored)
├── middleware.ts                        # Next.js edge middleware for route protection
├── next.config.mjs                      # Next.js configuration (CSP, remote image patterns)
├── package.json                         # Project dependencies and npm scripts
└── tsconfig.json                        # TypeScript compiler options
```
