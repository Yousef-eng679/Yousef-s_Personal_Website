---
name: Neon Nocturnal
colors:
 surface: 'b'
 surface-dim: 'b'
 surface-bright: 'c'
 surface-container-lowest: 'd'
 surface-container-low: 'da'
 surface-container: 'e'
 surface-container-high: 'c'
 surface-container-highest: 'e'
 on-surface: 'edfee'
 on-surface-variant: 'cccd'
 inverse-surface: 'edfee'
 inverse-on-surface: 'f'
 outline: 'da'
 outline-variant: 'a'
 surface-tint: 'dbbff'
 primary: 'dbbff'
 on-primary: 'fe'
 primary-container: 'caed'
 on-primary-container: 'edeff'
 inverse-primary: 'ee'
 secondary: 'adcff'
 on-secondary: 'ea'
 secondary-container: 'd'
 on-secondary-container: 'eecff'
 tertiary: 'fbd'
 on-tertiary: 'd'
 tertiary-container: ''
 on-tertiary-container: 'ffeab'
 error: 'ffbab'
 on-error: ''
 error-container: 'a'
 on-error-container: 'ffdad'
 primary-fixed: 'eaddff'
 primary-fixed-dim: 'dbbff'
 on-primary-fixed: 'a'
 on-primary-fixed-variant: 'ac'
 secondary-fixed: 'deff'
 secondary-fixed-dim: 'adcff'
 on-secondary-fixed: 'a'
 on-secondary-fixed-variant: ''
 tertiary-fixed: 'ffdff'
 tertiary-fixed-dim: 'fbd'
 on-tertiary-fixed: 'a'
 on-tertiary-fixed-variant: 'c'
 background: 'b'
 on-background: 'edfee'
 surface-variant: 'e'
typography:
 headline-xl:
 fontFamily: Hanken Grotesk
 fontSize: px
 fontWeight: ''
 lineHeight: '.'
 letterSpacing: -.em
 headline-lg:
 fontFamily: Hanken Grotesk
 fontSize: px
 fontWeight: ''
 lineHeight: '.'
 letterSpacing: -.em
 headline-lg-mobile:
 fontFamily: Hanken Grotesk
 fontSize: px
 fontWeight: ''
 lineHeight: '.'
 body-md:
 fontFamily: Inter
 fontSize: px
 fontWeight: ''
 lineHeight: '.'
 body-sm:
 fontFamily: Inter
 fontSize: px
 fontWeight: ''
 lineHeight: '.'
 label-md:
 fontFamily: Geist
 fontSize: px
 fontWeight: ''
 lineHeight: ''
 letterSpacing: .em
 mono-sm:
 fontFamily: Geist
 fontSize: px
 fontWeight: ''
 lineHeight: '.'
rounded:
 sm: .rem
 DEFAULT: .rem
 md: .rem
 lg: rem
 xl: .rem
 full: px
spacing:
 base: px
 xs: px
 sm: px
 md: px
 lg: px
 xl: px
 gutter: px
 margin-mobile: px
 margin-desktop: px
---

 Brand & Style
This design system centers on a high-end, developer-centric aesthetic that balances dark-mode utility with vibrant, energetic accents. It is designed for professional portfolios, SaaS dashboards, and creative technology platforms.

The personality is technical, ambitious, and polished. It utilizes a "Dark Tech" style—mixing deep neutral backgrounds with neon "glow" states and glassmorphism. The emotional goal is to provide a focused, low-strain environment that feels cutting-edge and premium. High-contrast typography and subtle atmospheric blurs (auroras) are used to create depth without clutter.

 Colors
The palette is built on a "True Dark" foundation to ensure maximum contrast for neon elements.

- Primary (Electric Violet): Used for primary actions, active navigation states, and branding.
- Secondary (Cyber Blue): Used for secondary highlights, links, and data visualization.
- Tertiary (Solar Gold): Reserved for warning states, special status indicators, or "premium" features.
- Neutrals: The background uses a near-black slate to prevent pure-black "smearing" on OLED screens while maintaining deep depth. Surface containers use a slightly lighter slate to define hierarchy.

 Typography
The typography system uses a tri-font strategy to differentiate between brand expression, readability, and technical data.

- Headlines: Use Hanken Grotesk for a sharp, contemporary feel. Tighten tracking on larger sizes to create a "locked-in" editorial look.
- Body: Use Inter for its exceptional legibility in dark environments. Maintain generous line height (.x) to avoid visual density.
- Labels & UI: Use Geist for utility elements, navigation, and badges. Its technical, monospaced-influenced proportions reinforce the developer-centric brand.

 Layout & Spacing
The layout follows a fluid grid system with defined maximum widths for readability.

- Desktop: -column grid with a maximum content width of px. Left-hand persistent navigation (px) is preferred for complex apps, while centered layouts are used for editorial content.
- Mobile: -column grid with px side margins.
- Spacing Rhythm: Based on a px/px scale. Use `lg` (px) for section vertical spacing and `sm` (px) for internal card padding to maintain a "clean" and airy aesthetic.

 Elevation & Depth
Depth is created through Tonal Layering and Glassmorphism rather than traditional heavy shadows.

- Layer (Background): Deepest slate (BC).
- Layer (Surface): Subtle elevation using B. This layer should have a px border of FFFFFF (% opacity) to define edges.
- Glassmorphism: Overlays and dropdowns use a backdrop blur (px) with a semi-transparent background (% opacity) and a thin "inner glow" border.
- Accents: Use a "neon diffusion" effect. Interactive elements (like active cards) should project a faint, colored outer glow matching the primary or secondary color (e.g., px blur, % opacity).

 Shapes
The shape language is "Soft-Modern." 

Standard components use a .rem (px) corner radius to feel approachable but professional. Buttons and input fields should strictly adhere to this. "Pill" shapes are reserved exclusively for status indicators (chips) and the primary "Call to Action" buttons to distinguish them from structural layout containers.

 Components
- Buttons: Primary buttons use a linear gradient (Primary to Secondary) with white text. Secondary buttons are "ghost" style with a px border and % background fill.
- Cards: Cards should have a subtle px border. On hover, the border color transitions to the primary color, and the "neon diffusion" glow appears.
- Chips/Badges: Small, high-contrast labels using the Geist font. Use a low-opacity version of the accent colors for the background (e.g., % Primary Purple).
- Inputs: Darker than the surface layer, with a px border that glows when focused. Use a monospaced font for input text in technical contexts.
- Navigation: Vertical sidebar for desktops with icons using px sizing. Active states should be indicated by a vertical "pill" marker and a low-opacity background tint.