# UI / UX Guidelines — Yousef.Dev Portfolio

## 1. Design Philosophy
The Yousef.Dev portfolio follows a **Neon Nocturnal** dark-theme aesthetic designed to evoke a modern, high-tech engineering feel. It prioritizes high visual contrast, glassmorphism, responsive layouts, and rich micro-animations without sacrificing performance.

---

## 2. Color Palette & Design Tokens

### Surface & Background Tokens
- **Base Surface (`bg-surface`):** `#15121b` (Deep obsidian violet background)
- **Lowest Surface (`bg-surface-lowest`):** `#100d16` (Dark card & sidebar container)
- **Low Surface (`bg-surface-low`):** `#1d1a24` (Elevated card background)
- **Container Surface (`bg-surface-container`):** `#2a2632` (Interactive hover surface)

### Accent Tokens
- **Primary Accent (`accent-purple`):** `#8b5cf6` (Vibrant electric purple)
- **Secondary Accent (`accent-blue`):** `#3b82f6` (Tech blue)
- **Success / Available Status:** `#10b981` (Emerald 500)
- **Warning / Alert:** `#f59e0b` (Amber 500)

### Border Tokens
- **Subtle Border:** `border-white/5`
- **Card Border:** `border-white/10`
- **Active / Focused Border:** `border-accent-purple/50`

---

## 3. Typography & Hierarchy

- **Heading Font:** Hanken Grotesk (`--font-hanken`) — Heavy black weights (`font-black`, `font-bold`) for bold section headlines.
- **Body Font:** Inter (`--font-inter`) — Clean, readable sans-serif for body text, project descriptions, and technical specifications.
- **Code & Specs Font:** Fira Code (`--font-geist-mono`) — Monospaced font for technical tags, category labels, and code blocks.

---

## 4. Component Patterns & Styling Rules

### Glassmorphism Cards (`.glass-card`)
- Backdrop blur: `backdrop-blur-xl` or `backdrop-blur-md`
- Background: `bg-surface-low/80` or `bg-surface-lowest/40`
- Border: `border border-white/10`
- Hover state: `hover:border-accent-purple/50`, `hover:shadow-2xl`, smooth `transition-all duration-300`

### Interactive Buttons (`.btn-glow`)
- Primary Action: `bg-accent-purple text-white font-black rounded-xl hover:bg-accent-purple/90` with glowing box-shadow (`shadow-[0_0_30px_rgba(139,92,246,0.4)]`).
- Secondary Action: `bg-surface-low border border-white/10 text-white font-bold rounded-xl hover:border-white/20 hover:scale-[1.02]`.

### Epic Games Store Media Showcase Layout
- **Media Stage:** 16:9 aspect ratio container with subtle shadow and border.
- **Thumbnail Strip:** Horizontal scroll bar with active thumbnail highlight (`ring-2 ring-accent-purple border-accent-purple scale-105`).
- **Sidebar Action Card:** Sticky right-column layout featuring app branding, primary "Launch App" CTA, secondary "GitHub Repository" button, and developer metadata table.

---

## 5. Animation & Reduced Motion Standards
- All WebGL shaders and 3D scenes inspect `window.matchMedia('(prefers-reduced-motion: reduce)')`. If reduced motion is requested, animation loops pause and render static frames.
- Background graphics pause execution when the browser tab is hidden (`document.hidden`) to conserve GPU and battery resources.
