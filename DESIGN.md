---
name: Neon Nocturnal
colors:
  surface: '#15121b'
  surface-dim: '#15121b'
  surface-bright: '#3c3742'
  surface-container-lowest: '#100d16'
  surface-container-low: '#1d1a24'
  surface-container: '#221e28'
  surface-container-high: '#2c2833'
  surface-container-highest: '#37333e'
  on-surface: '#e8dfee'
  on-surface-variant: '#ccc3d8'
  inverse-surface: '#e8dfee'
  inverse-on-surface: '#332f39'
  outline: '#958da1'
  outline-variant: '#4a4455'
  surface-tint: '#d2bbff'
  primary: '#d2bbff'
  on-primary: '#3f008e'
  primary-container: '#7c3aed'
  on-primary-container: '#ede0ff'
  inverse-primary: '#732ee4'
  secondary: '#adc6ff'
  on-secondary: '#002e6a'
  secondary-container: '#0566d9'
  on-secondary-container: '#e6ecff'
  tertiary: '#f9bd22'
  on-tertiary: '#402d00'
  tertiary-container: '#836100'
  on-tertiary-container: '#ffe2ab'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#eaddff'
  primary-fixed-dim: '#d2bbff'
  on-primary-fixed: '#25005a'
  on-primary-fixed-variant: '#5a00c6'
  secondary-fixed: '#d8e2ff'
  secondary-fixed-dim: '#adc6ff'
  on-secondary-fixed: '#001a42'
  on-secondary-fixed-variant: '#004395'
  tertiary-fixed: '#ffdf9f'
  tertiary-fixed-dim: '#f9bd22'
  on-tertiary-fixed: '#261a00'
  on-tertiary-fixed-variant: '#5c4300'
  background: '#15121b'
  on-background: '#e8dfee'
  surface-variant: '#37333e'
typography:
  headline-xl:
    fontFamily: Hanken Grotesk
    fontSize: 48px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 28px
    fontWeight: '700'
    lineHeight: '1.2'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  label-md:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.05em
  mono-sm:
    fontFamily: Geist
    fontSize: 13px
    fontWeight: '400'
    lineHeight: '1.4'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 8px
  sm: 16px
  md: 24px
  lg: 40px
  xl: 64px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 48px
---

## Brand & Style
This design system centers on a high-end, developer-centric aesthetic that balances dark-mode utility with vibrant, energetic accents. It is designed for professional portfolios, SaaS dashboards, and creative technology platforms.

The personality is **technical, ambitious, and polished**. It utilizes a "Dark Tech" style—mixing deep neutral backgrounds with neon "glow" states and glassmorphism. The emotional goal is to provide a focused, low-strain environment that feels cutting-edge and premium. High-contrast typography and subtle atmospheric blurs (auroras) are used to create depth without clutter.

## Colors
The palette is built on a "True Dark" foundation to ensure maximum contrast for neon elements.

- **Primary (Electric Violet):** Used for primary actions, active navigation states, and branding.
- **Secondary (Cyber Blue):** Used for secondary highlights, links, and data visualization.
- **Tertiary (Solar Gold):** Reserved for warning states, special status indicators, or "premium" features.
- **Neutrals:** The background uses a near-black slate to prevent pure-black "smearing" on OLED screens while maintaining deep depth. Surface containers use a slightly lighter slate to define hierarchy.

## Typography
The typography system uses a tri-font strategy to differentiate between brand expression, readability, and technical data.

- **Headlines:** Use **Hanken Grotesk** for a sharp, contemporary feel. Tighten tracking on larger sizes to create a "locked-in" editorial look.
- **Body:** Use **Inter** for its exceptional legibility in dark environments. Maintain generous line height (1.6x) to avoid visual density.
- **Labels & UI:** Use **Geist** for utility elements, navigation, and badges. Its technical, monospaced-influenced proportions reinforce the developer-centric brand.

## Layout & Spacing
The layout follows a **fluid grid system** with defined maximum widths for readability.

- **Desktop:** 12-column grid with a maximum content width of 1280px. Left-hand persistent navigation (240px) is preferred for complex apps, while centered layouts are used for editorial content.
- **Mobile:** 4-column grid with 16px side margins.
- **Spacing Rhythm:** Based on a 4px/8px scale. Use `lg` (40px) for section vertical spacing and `sm` (16px) for internal card padding to maintain a "clean" and airy aesthetic.

## Elevation & Depth
Depth is created through **Tonal Layering** and **Glassmorphism** rather than traditional heavy shadows.

- **Layer 0 (Background):** Deepest slate (#0B0C10).
- **Layer 1 (Surface):** Subtle elevation using #161B22. This layer should have a 1px border of #FFFFFF (10% opacity) to define edges.
- **Glassmorphism:** Overlays and dropdowns use a backdrop blur (20px) with a semi-transparent background (60% opacity) and a thin "inner glow" border.
- **Accents:** Use a "neon diffusion" effect. Interactive elements (like active cards) should project a faint, colored outer glow matching the primary or secondary color (e.g., 20px blur, 15% opacity).

## Shapes
The shape language is "Soft-Modern." 

Standard components use a **0.5rem (8px)** corner radius to feel approachable but professional. Buttons and input fields should strictly adhere to this. "Pill" shapes are reserved exclusively for status indicators (chips) and the primary "Call to Action" buttons to distinguish them from structural layout containers.

## Components
- **Buttons:** Primary buttons use a linear gradient (Primary to Secondary) with white text. Secondary buttons are "ghost" style with a 1px border and 10% background fill.
- **Cards:** Cards should have a subtle 1px border. On hover, the border color transitions to the primary color, and the "neon diffusion" glow appears.
- **Chips/Badges:** Small, high-contrast labels using the **Geist** font. Use a low-opacity version of the accent colors for the background (e.g., 10% Primary Purple).
- **Inputs:** Darker than the surface layer, with a 1px border that glows when focused. Use a monospaced font for input text in technical contexts.
- **Navigation:** Vertical sidebar for desktops with icons using 20px sizing. Active states should be indicated by a vertical "pill" marker and a low-opacity background tint.