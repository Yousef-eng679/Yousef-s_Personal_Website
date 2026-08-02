# UI/UX Design & Experience Guidelines: Neon Nocturnal
**Project:** Yousef.Dev — AI Engineer & Full-Stack Developer Portfolio  
**Design Philosophy:** Neon Nocturnal — High-End Dark Tech, Tonal Glassmorphism, 3D WebGL Canvas, & Persistent Sidebar Navigation

---

## 1. Core Visual Identity & Design Tokens

### 1.1 Color System ("Neon Nocturnal")
The color palette balances a deep slate nocturnal canvas with vibrant electric violet, cyber blue, and solar gold accents.

```css
:root {
  /* Surface Layers (Tonal Depth) */
  --bg-surface: #15121b;               /* Base Canvas Background */
  --bg-surface-lowest: #100d16;        /* Sidebar & Deepest Card Layer */
  --bg-surface-low: #1d1a24;           /* Card Base & Inputs */
  --bg-surface-container: #2a2632;     /* Card Hover / Container */
  --bg-surface-bright: #3c3742;        /* High-Contrast Borders & Skeletons */

  /* Primary Accent - Electric Violet */
  --accent-purple: #8b5cf6;            /* Primary Action Buttons & Glows */
  --accent-purple-dim: #7c3aed;        /* Darker Violet Container Accent */
  --accent-purple-glow: rgba(139, 92, 246, 0.4);

  /* Secondary Accent - Cyber Blue */
  --accent-blue: #3b82f6;              /* Secondary Links & Outer Mesh */
  --accent-blue-dim: #0566d9;

  /* Tertiary Accent - Solar Gold */
  --accent-gold: #f9bd22;              /* Highlights & Status Badges */

  /* Neutral Text & Borders */
  --text-primary: #ffffff;             /* Primary Headings */
  --text-secondary: #cbd5e1;           /* Slate 300 Body Copy */
  --text-muted: #64748b;               /* Slate 500 Subtitles / Meta */

  /* Borders & Glass Opacity */
  --border-subtle: rgba(255, 255, 255, 0.05);
  --border-purple-hover: rgba(139, 92, 246, 0.3);
}
```

### 1.2 Typography Tri-Font Strategy
- **Headlines & Big Display:** `Hanken Grotesk` (Weights: 700–900, tight tracking `-0.02em`, bold editorial feel).
- **Body & Copy:** `Inter` (Generous line height `1.6`, exceptional legibility in dark environments).
- **Labels, Badges & Code:** `Geist` or Monospace (Technical, developer-centric proportions).

---

## 2. Structural Layout Architecture (From `code.html`)

### 2.1 Persistent Left Sidebar (`w-64`, Desktop `lg:flex`)
- **Positioning:** Fixed left panel (`bg-surface-lowest/80 backdrop-blur-xl border-r border-white/5`).
- **Brand Avatar:** Initials avatar badge ("Y") with glowing purple background.
- **Nav Links:**
  - `Home` (Dashboard & 3D Hero)
  - `About` (Experience, Skills & CV)
  - `Projects` (All Showcase Work & Demos)
  - `Blog` / `Articles` (Deep Dives & Essays)
  - `Contact` (Direct Messaging & Inquiries)
- **Integrations & Footer Status:**
  - GitHub & LinkedIn external links.
  - Live **"Available for work"** status chip with animated pulsing emerald indicator.

### 2.2 Sticky Header Topbar
- **Search Command Center (⌘K):** Interactive input searching projects, skills, or articles.
- **Quick Controls:** Notification bell, theme toggle, and admin quick access avatar.

### 2.3 3D Interactive Hero Canvas
- **Three.js WebGL Scene:** Dual-layer Icosahedron core (Wireframe Electric Violet inner core + Cyber Blue outer cage) surrounded by floating particle field (`500` particles).
- **Interactive Micro-Animation:** Hovering over the 3D canvas accelerates rotation speed (4.5x target speed multiplier) with smooth lerp physics.
- **Atmospheric Auroras:** Radial ambient glow blurs (`bg-accent-purple/20 blur-[120px]`).

---

## 3. Glassmorphism & Card Design

### 3.1 `GlassCard` Specs
```css
.glass-card {
  background: rgba(29, 26, 36, 0.6);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 1rem; /* 16px */
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.glass-card:hover {
  background: rgba(42, 38, 50, 0.8);
  border-color: rgba(139, 92, 246, 0.3);
  transform: translateY(-4px);
  box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.5);
}
```

### 3.2 Featured Project Cards
- **Emoji/Icon Header Badge:** Rounded icon container (`bg-accent-purple/20` or `bg-emerald-500/20`).
- **Title & Description:** Bold white heading, Slate 400 body copy with 1.6 line height.
- **Tech Stack Chips:** Small pills with `bg-surface-bright/30 border border-white/5 text-[10px] font-bold text-slate-300 uppercase`.
- **Project Link Footer:** Arrow transition on hover (`group-hover/link:translate-x-1`).

---

## 4. UX Edge Cases & Failure Mode Standards

1. **Mobile Layout (`<1024px`):**
   - Left sidebar collapses into a top mobile navbar or slide-over glass drawer.
   - 3D Three.js canvas adjusts canvas resolution dynamically on window resize.
2. **WebGL Fallback:**
   - If WebGL is disabled or unsupported in browser, render stylized 2D CSS glowing orbital gradient.
3. **Empty Query Results (⌘K Search):**
   - Render styled "No matching projects or skills found" state.
4. **Auth & Route Guards:**
   - Protected `/admin` route redirects unauthenticated users to `/login`.
