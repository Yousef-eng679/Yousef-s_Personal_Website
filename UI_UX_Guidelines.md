 UI/UX Design & Experience Guidelines: Neon Nocturnal
Project: Yousef.Dev — AI Engineer & Full-Stack Developer Portfolio 
Design Philosophy: Neon Nocturnal — High-End Dark Tech, Tonal Glassmorphism, D WebGL Canvas, & Persistent Sidebar Navigation

---

 . Core Visual Identity & Design Tokens

 . Color System ("Neon Nocturnal")
The color palette balances a deep slate nocturnal canvas with vibrant electric violet, cyber blue, and solar gold accents.

```css
:root {
 / Surface Layers (Tonal Depth) /
 --bg-surface: b; / Base Canvas Background /
 --bg-surface-lowest: d; / Sidebar & Deepest Card Layer /
 --bg-surface-low: da; / Card Base & Inputs /
 --bg-surface-container: a; / Card Hover / Container /
 --bg-surface-bright: c; / High-Contrast Borders & Skeletons /

 / Primary Accent - Electric Violet /
 --accent-purple: bcf; / Primary Action Buttons & Glows /
 --accent-purple-dim: caed; / Darker Violet Container Accent /
 --accent-purple-glow: rgba(, , , .);

 / Secondary Accent - Cyber Blue /
 --accent-blue: bf; / Secondary Links & Outer Mesh /
 --accent-blue-dim: d;

 / Tertiary Accent - Solar Gold /
 --accent-gold: fbd; / Highlights & Status Badges /

 / Neutral Text & Borders /
 --text-primary: ffffff; / Primary Headings /
 --text-secondary: cbde; / Slate Body Copy /
 --text-muted: b; / Slate Subtitles / Meta /

 / Borders & Glass Opacity /
 --border-subtle: rgba(, , , .);
 --border-purple-hover: rgba(, , , .);
}
```

 . Typography Tri-Font Strategy
- Headlines & Big Display: `Hanken Grotesk` (Weights: –, tight tracking `-.em`, bold editorial feel).
- Body & Copy: `Inter` (Generous line height `.`, exceptional legibility in dark environments).
- Labels, Badges & Code: `Geist` or Monospace (Technical, developer-centric proportions).

---

 . Structural Layout Architecture (From `code.html`)

 . Persistent Left Sidebar (`w-`, Desktop `lg:flex`)
- Positioning: Fixed left panel (`bg-surface-lowest/ backdrop-blur-xl border-r border-white/`).
- Brand Avatar: Initials avatar badge ("Y") with glowing purple background.
- Nav Links:
 - `Home` (Dashboard & D Hero)
 - `About` (Experience, Skills & CV)
 - `Projects` (All Showcase Work & Demos)
 - `Blog` / `Articles` (Deep Dives & Essays)
 - `Contact` (Direct Messaging & Inquiries)
- Integrations & Footer Status:
 - GitHub & LinkedIn external links.
 - Live "Available for work" status chip with animated pulsing emerald indicator.

 . Sticky Header Topbar
- Search Command Center (⌘K): Interactive input searching projects, skills, or articles.
- Quick Controls: Notification bell, theme toggle, and admin quick access avatar.

 . D Interactive Hero Canvas
- Three.js WebGL Scene: Dual-layer Icosahedron core (Wireframe Electric Violet inner core + Cyber Blue outer cage) surrounded by floating particle field (`` particles).
- Interactive Micro-Animation: Hovering over the D canvas accelerates rotation speed (.x target speed multiplier) with smooth lerp physics.
- Atmospheric Auroras: Radial ambient glow blurs (`bg-accent-purple/ blur-[px]`).

---

 . Glassmorphism & Card Design

 . `GlassCard` Specs
```css
.glass-card {
 background: rgba(, , , .);
 backdrop-filter: blur(px);
 border: px solid rgba(, , , .);
 border-radius: rem; / px /
 transition: all .s cubic-bezier(., , ., );
}

.glass-card:hover {
 background: rgba(, , , .);
 border-color: rgba(, , , .);
 transform: translateY(-px);
 box-shadow: px px -px rgba(, , , .);
}
```

 . Featured Project Cards
- Emoji/Icon Header Badge: Rounded icon container (`bg-accent-purple/` or `bg-emerald-/`).
- Title & Description: Bold white heading, Slate body copy with . line height.
- Tech Stack Chips: Small pills with `bg-surface-bright/ border border-white/ text-[px] font-bold text-slate- uppercase`.
- Project Link Footer: Arrow transition on hover (`group-hover/link:translate-x-`).

---

 . UX Edge Cases & Failure Mode Standards

. Mobile Layout (`<px`):
 - Left sidebar collapses into a top mobile navbar or slide-over glass drawer.
 - D Three.js canvas adjusts canvas resolution dynamically on window resize.
. WebGL Fallback:
 - If WebGL is disabled or unsupported in browser, render stylized D CSS glowing orbital gradient.
. Empty Query Results (⌘K Search):
 - Render styled "No matching projects or skills found" state.
. Auth & Route Guards:
 - Protected `/admin` route redirects unauthenticated users to `/login`.
