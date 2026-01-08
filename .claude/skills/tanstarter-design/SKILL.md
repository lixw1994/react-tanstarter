---
name: TanStarter Frontend Design
description: |
  Frontend design skill for this React TanStarter project. Combines design thinking, visual aesthetics, and project constraints.
  Use when: Creating pages, components, or UI features. Guides both creative decisions and technical implementation.
  Ensures: Mobile First, design token usage, visual hierarchy, and production-grade quality.
---

# TanStarter Frontend Design

## Part 1: Design Thinking

**Think before you code.**

### Understand Context

- **Purpose**: What problem does this interface solve? What does the user want to accomplish?
- **Emotion**: What's the user's state of mind? (Focused work / Casual browsing / Urgent task)
- **Hierarchy**: What's most important? Where should the user's eye land first?

### Choose the Tone

Different scenarios need different visual intensity:

| Scenario                 | Tone                 | Characteristics                           |
| ------------------------ | -------------------- | ----------------------------------------- |
| Data dashboard           | Function-first       | Restrained, clear hierarchy, high density |
| Empty state / Onboarding | Emotional connection | Whitespace, illustrations, guidance       |
| Forms / Settings         | Clean & efficient    | Logical grouping, instant feedback        |
| Landing / Showcase       | Visual impact        | Bold typography, motion, personality      |

### Define Constraints vs Freedom

**Must follow**: Design tokens, component specs, accessibility, Mobile First

**Can explore**: Layout composition, micro-interactions, spatial rhythm, visual details

---

## Part 2: Visual Aesthetics

### Hierarchy is Everything

Build clear visual hierarchy through contrast:

```
Size:  Large = important, Small = secondary
Color: text-foreground = primary, text-muted-foreground = secondary
Space: Close = related, Far = independent
```

### Spatial Composition

**Whitespace is part of the design**, not "unfilled space".

- Related elements stay close, unrelated elements stay apart
- Asymmetry can create visual tension
- Density variation guides the eye

### Micro-interactions

Motion serves understanding, not decoration:

- **Instant feedback** (150ms): hover, click
- **State transitions** (200ms): expand, toggle
- **Spatial changes** (300ms): sidebar, modal

### Details = Quality

- Consistent spacing rhythm
- Precise alignment
- Appropriate border radius
- Subtle shadows/borders

**See** → [references/aesthetics.md](references/aesthetics.md)

---

## Part 3: Project Constraints

### Mobile First (Required)

```
✅ Correct: p-4 md:p-6 lg:p-8 (small to large)
❌ Wrong:   p-8 md:p-6 sm:p-4 (large to small)

✅ Correct: flex-col sm:flex-row (stack first, then row)
❌ Wrong:   flex-row sm:flex-col
```

When writing styles, ask: **"How does this look on mobile?"**

### Semantic Tokens (Required)

```
✅ bg-background, bg-card, bg-muted, bg-primary
❌ bg-white, bg-gray-100, #3b82f6

✅ text-foreground, text-muted-foreground
❌ text-black, text-gray-500
```

### Internationalization (Required)

```tsx
✅ <Button>{t("common.save")}</Button>
❌ <Button>Save</Button>
```

### Routes & Components

**New page**:

```tsx
// src/routes/(app)/my-page.tsx
import { createFileRoute } from "@tanstack/react-router";
import { PageContainer } from "~/components/layout/app/PageContainer";

export const Route = createFileRoute("/(app)/my-page")({
  component: MyPage,
});
```

**Navigation config**: Edit `src/config/nav.ts`

**Existing UI components**: `src/components/ui/` (Button, Card, Input, Label, DropdownMenu, Tooltip)

---

## Part 4: Prohibitions & Standards

### Prohibited

| Prohibited       | Reason                 |
| ---------------- | ---------------------- |
| New UI libraries | Already have shadcn/ui |
| CSS-in-JS        | Already have Tailwind  |
| Hardcoded colors | Breaks theming         |
| Hardcoded text   | Breaks i18n            |
| Desktop First    | Violates principle     |

### Quality Standards

- Touch targets ≥ 44px (`min-h-11`)
- Icon buttons have `aria-label`
- Forms have `<Label htmlFor>`
- Components accept `className` prop
- Use `cn()` to merge classNames

---

## Reference Code

- Page example → `src/routes/(app)/dashboard.tsx`
- Sidebar → `src/components/layout/app/sidebar/`
- Style tokens → `src/styles.css`
