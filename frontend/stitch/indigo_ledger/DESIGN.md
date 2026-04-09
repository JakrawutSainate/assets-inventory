# Design System Strategy: The Fluid Custodian

## 1. Overview & Creative North Star
The "Fluid Custodian" is the creative North Star for this design system. It moves away from the rigid, grid-locked aesthetic of traditional inventory management and toward a high-end editorial experience. The system is built on the philosophy of **Tonal Authority**: the idea that a professional tool should feel as sophisticated as a premium physical workspace.

To break the "template" look, we utilize **Intentional Asymmetry**. Instead of perfectly centered grids, we use generous whitespace (64px+) and offset typography to guide the eye. Overlapping elements—such as an image of an asset slightly breaking the container of a card—provide a sense of depth and tactile reality. The goal is to make borrowing an asset feel less like a database entry and more like a curated exchange.

---

## 2. Colors & Surface Architecture

The palette is anchored by the depth of Indigo and the clarity of Slate. However, its execution is governed by two non-negotiable rules designed to eliminate the "cheap" feel of default UI kits.

### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders for sectioning or layout. Physical boundaries must be defined solely through background color shifts. Use `surface-container-low` for secondary sections sitting on a `surface` background. This creates a "molded" look rather than a "sketched" look.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers—like stacked sheets of vellum.
- **Base:** `surface` (#f8f9ff)
- **Deep Sections:** `surface-container-low` (#eff4ff)
- **Primary Content Blocks:** `surface-container-lowest` (#ffffff)
- **Elevated Overlays:** `surface-container-high` (#dce9ff)

### The "Glass & Gradient" Rule
To elevate the primary actions, avoid flat indigo. Main CTAs and Hero backgrounds should utilize a subtle **Signature Texture**: a linear gradient from `primary` (#3525cd) to `primary_container` (#4f46e5) at a 135-degree angle. Floating navigation or modal headers must use **Glassmorphism**: a background color of `surface_container_lowest` at 80% opacity with a `20px` backdrop-blur.

---

## 3. Typography: The Editorial Voice

We use **Inter** not as a functional font, but as an editorial statement. The contrast between tight `label-sm` metadata and expansive `display-md` headers creates an authoritative hierarchy.

- **Display & Headlines:** Use `display-sm` (2.25rem) for asset categories. Letter-spacing should be set to `-0.02em` to feel "tight" and high-end.
- **Titles:** `title-lg` (1.375rem) is reserved for asset names. It represents the "Product" in this ecosystem.
- **Labels:** `label-md` and `label-sm` are your metadata workhorses. Always use `on_surface_variant` (#464555) for these to ensure they sit back in the visual hierarchy while remaining legible.
- **The "High-Low" Contrast:** Pair a `display-md` header with a `body-sm` description immediately below it. This dramatic shift in scale mimics luxury magazine layouts.

---

## 4. Elevation & Depth: Tonal Layering

Traditional shadows often muddy a "clean" design. In this system, depth is achieved through light and layering.

*   **The Layering Principle:** Rather than adding a shadow to a card, place a `surface-container-lowest` card inside a `surface-container-low` wrapper. The difference in hex value provides all the separation needed.
*   **Ambient Shadows:** For floating elements (Modals/Popovers), use an "Ambient Shadow": `0 20px 40px rgba(13, 28, 46, 0.06)`. Note the color: we use a tint of `on_surface` (#0d1c2e), never pure black.
*   **The "Ghost Border" Fallback:** If a container must sit on an identical background color, use a **Ghost Border**. Apply `outline_variant` (#c7c4d8) at **15% opacity**. This creates a suggestion of a border that vanishes upon focus.

---

## 5. Components

### Cards & Lists
**Constraint:** No divider lines. Period.
- To separate assets in a list, use a `16px` vertical gap and alternating background tints (`surface` vs `surface-container-low`). 
- **Asset Cards:** Use `md` (0.75rem) corners. The image of the asset should have no border; its shape defines its boundary.

### Buttons
- **Primary:** The Gradient Rule applies. Use the Indigo-to-Indigo-Container gradient. 
- **Secondary:** Use `secondary_container` (#b6b4ff) with `on_secondary_container` (#454386) text. No border.
- **Tertiary:** Text only, using `primary` (#3525cd).

### Input Fields
Avoid the "box" look. Use `surface_container_low` as the fill color with a `2px` bottom-only highlight in `primary` when focused. This mimics a professional form or ledger.

### Status Chips
Status shouldn't scream; it should inform.
- **Success:** `surface_container` background with `on_tertiary_fixed_variant` text (tints of green). 
- Use the `full` (9999px) roundedness scale for all chips to contrast against the `md` roundedness of cards.

### Borrowing Timeline (Context Specific)
A custom component for this system. Use a vertical "Thread" made of `outline_variant` at 20% opacity. The "events" (Requested, Approved, Returned) are `surface-container-lowest` nodes that sit *over* the thread, creating a sense of progress through physical stacking.

---

## 6. Do’s and Don’ts

### Do:
- **Do** use asymmetrical margins. A left-aligned header with right-aligned metadata creates a modern, open feel.
- **Do** use "Optical Alignment." If an icon looks too small next to Inter typography, manually adjust its scale rather than sticking to a rigid 24px box.
- **Do** lean into the Dark Mode for Admin. Ensure `inverse_surface` (#233144) is the primary canvas to reduce eye strain for high-frequency users.

### Don’t:
- **Don't** use 100% black text. Always use `on_surface` (#0d1c2e) for high-contrast text to keep the "slate" sophistication.
- **Don't** use standard 1px borders. If you feel you need a border, try a 4px padding increase or a color shift first.
- **Don't** cram content. If a dashboard feels full, it is failing. Increase the `surface` whitespace to allow the "Custodial" feel to breathe.