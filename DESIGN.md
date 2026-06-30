---
name: Serene Focus
colors:
  surface: '#f4fafd'
  surface-dim: '#d4dbdd'
  surface-bright: '#f4fafd'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eef5f7'
  surface-container: '#e8eff1'
  surface-container-high: '#e2e9ec'
  surface-container-highest: '#dde4e6'
  on-surface: '#161d1f'
  on-surface-variant: '#3d4948'
  inverse-surface: '#2b3234'
  inverse-on-surface: '#ebf2f4'
  outline: '#6d7a78'
  outline-variant: '#bcc9c7'
  surface-tint: '#006a66'
  primary: '#006a66'
  on-primary: '#ffffff'
  primary-container: '#20a39e'
  on-primary-container: '#003230'
  inverse-primary: '#66d8d2'
  secondary: '#5c5f60'
  on-secondary: '#ffffff'
  secondary-container: '#e1e3e4'
  on-secondary-container: '#626566'
  tertiary: '#954924'
  on-tertiary: '#ffffff'
  tertiary-container: '#d57b52'
  on-tertiary-container: '#501a00'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#84f5ef'
  primary-fixed-dim: '#66d8d2'
  on-primary-fixed: '#00201f'
  on-primary-fixed-variant: '#00504d'
  secondary-fixed: '#e1e3e4'
  secondary-fixed-dim: '#c5c7c8'
  on-secondary-fixed: '#191c1d'
  on-secondary-fixed-variant: '#454748'
  tertiary-fixed: '#ffdbcd'
  tertiary-fixed-dim: '#ffb596'
  on-tertiary-fixed: '#360f00'
  on-tertiary-fixed-variant: '#77320f'
  background: '#f4fafd'
  on-background: '#161d1f'
  surface-variant: '#dde4e6'
  cta-accent: '#EF5B5B'
  surface-soft: oklch(0.967 0.003 264.542)
  white: '#FFFFFF'
typography:
  display-lg:
    fontFamily: Roboto
    fontSize: 48px
    fontWeight: '300'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Roboto
    fontSize: 32px
    fontWeight: '500'
    lineHeight: '1.3'
  headline-lg-mobile:
    fontFamily: Roboto
    fontSize: 28px
    fontWeight: '500'
    lineHeight: '1.3'
  headline-md:
    fontFamily: Roboto
    fontSize: 24px
    fontWeight: '500'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Roboto
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Roboto
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-md:
    fontFamily: Roboto
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.2'
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Roboto
    fontSize: 12px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1200px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 40px
---

## Brand & Style

This design system is crafted for a premium wellness and productivity experience. It centers on the concept of "Soft UI Evolution"—a bridge between minimalist digital interfaces and organic, physical objects. The goal is to evoke a sense of mental clarity, calm, and deliberate focus.

The style leverages **Modern Softness** and **Minimalism**. It avoids the flatness of traditional Material Design in favor of subtle depth, utilizing ambient shadows and tonal layering to create a tactile, high-end feel. The interface should feel like a quiet, well-organized workspace—breathable, intentional, and free of cognitive noise. All transitions are fluid and gentle, reinforcing a rhythm of steady productivity rather than urgent distraction.

## Colors

The palette is anchored by a calming **Teal** primary, representing growth and mental stability. The **Secondary** color (a very desaturated, cool-toned grey-blue) acts as the primary canvas for UI elements, providing a softer alternative to pure white that reduces eye strain during long focus sessions.

Despite the user's label of "Gold," the hex code **#EF5B5B** (a warm Coral) is utilized as the CTA accent. This color is used sparingly for high-priority actions and state indicators where immediate attention is required without appearing aggressive. The **Charcoal** text color ensures high legibility and WCAG AA compliance against the soft backgrounds. 

- **Primary:** Core actions, active states, and brand moments.
- **Secondary/Surface:** Used for cards, containers, and backgrounds to create tonal depth.
- **CTA Accent:** High-contrast interactions and critical feedback.
- **Neutral:** Typography and iconography for maximum clarity.

## Typography

This design system uses **Roboto** exclusively to maintain a clean, systematic, and highly legible environment. Hierarchy is established through weight and scale rather than decorative variations.

**Display and Headlines** utilize lighter weights (300) for large-scale typography to maintain a "premium" feel, while medium weights (500) are used for standard headings to ensure structure. **Body text** is set with generous line heights (1.6) to promote readability and "breathability" in the content. **Labels** utilize slightly heavier weights or uppercase styling to distinguish functional UI text from narrative content.

## Layout & Spacing

The layout philosophy is built on a **Fluid Grid** with a strict 8px baseline rhythm. This ensures that every element—from the height of a button to the padding of a card—is mathematically harmonious.

- **Desktop:** 12-column grid with a 1200px max-width. Use 24px gutters to allow elements plenty of room to breathe.
- **Tablet:** 8-column grid with 24px margins.
- **Mobile:** 4-column grid with 16px margins. 

Emphasis should be placed on "Negative Space as a Feature." Vertical rhythm should favor larger gaps (48px or 64px) between major sections to prevent the UI from feeling cluttered, which is essential for a productivity app aimed at focus.

## Elevation & Depth

Hierarchy is communicated through **Tonal Layers** and **Ambient Shadows**. Instead of harsh drop shadows, this design system uses multiple stacked box-shadows with very low opacity and large blur radii to simulate soft, natural light.

- **Level 0 (Base):** The main background (`#FFFFFF`).
- **Level 1 (Subtle):** Elements like cards or secondary containers using `oklch(0.967 0.003 264.542)`. No shadow, just a color shift.
- **Level 2 (Raised):** Interactive elements or primary cards. Use a soft shadow: `0 4px 20px rgba(45, 52, 54, 0.04)`.
- **Level 3 (Overlay):** Modals or floating menus. Use a deeper, more diffused shadow: `0 12px 40px rgba(45, 52, 54, 0.08)`.

Transitions between these states must be smooth (250ms ease-out) to avoid jarring the user.

## Shapes

The shape language is **Rounded and Organic**. The use of a `0.5rem` base radius ensures that components feel friendly and soft without appearing juvenile. 

- **Standard Components:** 8px (0.5rem) radius for buttons, input fields, and small cards.
- **Large Containers:** 16px (1rem) radius for main content areas and modals.
- **Interaction Feedback:** Use "squircle" inspired clipping where possible for a more premium, custom-feel than standard circles.

## Components

### Buttons
Primary buttons use the Teal background with White text. Hover states should not darken the color, but rather increase the shadow elevation and shift the background color slightly lighter. CTA buttons (#EF5B5B) follow the same logic. All buttons feature a 250ms transition.

### Input Fields
Inputs use a Level 1 surface (`oklch(...)`) with no border. On focus, they transition to a white background with a subtle Level 2 shadow and a 2px Teal bottom-border or subtle inner glow.

### Cards
Cards are the primary organizational unit. They should rarely use borders; instead, use Level 1 or Level 2 elevation to define their boundaries. Content inside cards should have a minimum padding of 24px.

### Chips & Lists
Chips are pill-shaped and used for categorization. They use a light Teal tint for active states. Lists should feature generous vertical spacing (at least 16px between items) with subtle separators in the Secondary color.

### Checkboxes & Radios
These should be custom-styled to match the roundedness of the system. Checkboxes use the Teal primary color when active, featuring a smooth "pop" scale animation (1.1x) when toggled.

### Progress Indicators
Given the focus on productivity, progress bars should be smooth, using a Teal-to-Soft-Blue gradient (very subtle) to show movement and completion without inducing stress.