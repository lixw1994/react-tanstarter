# UI Skills: Opinionated Constraints

> Opinionated constraints for building better interfaces with agents.
> Source: https://www.ui-skills.com/

## Stack

| Rule | Constraint |
| ---- | ---------- |
| MUST | Use Tailwind CSS defaults (spacing, radius, shadows) before custom values |
| MUST | Use motion/react (formerly framer-motion) when JavaScript animation is required |
| SHOULD | Use tw-animate-css for entrance and micro-animations in Tailwind CSS |
| MUST | Use `cn` utility (clsx + tailwind-merge) for class logic |

## Components

| Rule | Constraint |
| ---- | ---------- |
| MUST | Use accessible component primitives for anything with keyboard or focus behavior (Base UI, React Aria, Radix) |
| MUST | Use the project's existing component primitives first |
| NEVER | Mix primitive systems within the same interaction surface |
| SHOULD | Prefer Base UI for new primitives if compatible with the stack |
| MUST | Add an `aria-label` to icon-only buttons |
| NEVER | Rebuild keyboard or focus behavior by hand unless explicitly requested |

## Interaction

| Rule | Constraint |
| ---- | ---------- |
| MUST | Use an AlertDialog for destructive or irreversible actions |
| SHOULD | Use structural skeletons for loading states |
| NEVER | Use `h-screen`, use `h-dvh` instead |
| MUST | Respect `safe-area-inset` for fixed elements |
| MUST | Show errors next to where the action happens |
| NEVER | Block paste in input or textarea elements |

## Animation

| Rule | Constraint |
| ---- | ---------- |
| NEVER | Add animation unless it is explicitly requested |
| MUST | Animate only compositor props (`transform`, `opacity`) |
| NEVER | Animate layout properties (`width`, `height`, `top`, `left`, `margin`, `padding`) |
| SHOULD | Avoid animating paint properties (`background`, `color`) except for small, local UI (text, icons) |
| SHOULD | Use `ease-out` on entrance |
| NEVER | Exceed 200ms for interaction feedback |
| MUST | Pause looping animations when off-screen |
| MUST | Respect `prefers-reduced-motion` |
| NEVER | Introduce custom easing curves unless explicitly requested |
| SHOULD | Avoid animating large images or full-screen surfaces |

## Typography

| Rule | Constraint |
| ---- | ---------- |
| MUST | Use `text-balance` for headings and `text-pretty` for body/paragraphs |
| MUST | Use `tabular-nums` for data |
| SHOULD | Use `truncate` or `line-clamp` for dense UI |
| NEVER | Modify `letter-spacing` (`tracking-`) unless explicitly requested |

## Layout

| Rule | Constraint |
| ---- | ---------- |
| MUST | Use a fixed z-index scale (no arbitrary `z-x`) |
| SHOULD | Use `size-x` for square elements instead of `w-x` + `h-x` |

## Performance

| Rule | Constraint |
| ---- | ---------- |
| NEVER | Animate large `blur()` or `backdrop-filter` surfaces |
| NEVER | Apply `will-change` outside an active animation |
| NEVER | Use `useEffect` for anything that can be expressed as render logic |

## Design

| Rule | Constraint |
| ---- | ---------- |
| NEVER | Use gradients unless explicitly requested |
| NEVER | Use purple or multicolor gradients |
| NEVER | Use glow effects as primary affordances |
| SHOULD | Use Tailwind CSS default shadow scale unless explicitly requested |
| MUST | Give empty states one clear next action |
| SHOULD | Limit accent color usage to one per view |
| SHOULD | Use existing theme or Tailwind CSS color tokens before introducing new ones |

---

## Quick Reference

### Do's

```tsx
// Use cn() for class logic
<div className={cn("p-4", isActive && "bg-accent")} />

// Use h-dvh instead of h-screen
<div className="h-dvh" />

// Use size-x for squares
<div className="size-8" />  // Not w-8 h-8

// Use text-balance for headings
<h1 className="text-balance">Long heading text</h1>

// Use tabular-nums for data
<span className="tabular-nums">1,234.56</span>

// Respect safe-area-inset
<nav className="fixed bottom-0 pb-[env(safe-area-inset-bottom)]" />

// Icon buttons need aria-label
<button aria-label="Close"><XIcon /></button>
```

### Don'ts

```tsx
// Don't animate layout properties
<div className="animate-[width_200ms]" />  // Bad

// Don't use h-screen
<div className="h-screen" />  // Bad, use h-dvh

// Don't block paste
<input onPaste={(e) => e.preventDefault()} />  // Bad

// Don't use arbitrary z-index
<div className="z-[9999]" />  // Bad

// Don't add gradients without request
<div className="bg-gradient-to-r from-purple-500 to-pink-500" />  // Bad

// Don't modify letter-spacing
<p className="tracking-wide" />  // Bad unless requested
```
