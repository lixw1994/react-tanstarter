# Vercel Web Interface Guidelines

> Extracted from Vercel's design philosophy and Web Interface Guidelines.
> Source: https://vercel.com/design/guidelines

## Core Philosophy

**"Interfaces succeed because of hundreds of choices."**

Every detail matters. Success comes from the accumulation of countless small decisions made correctly.

### Design Principles

1. **Clarity over cleverness** - Every element serves a purpose
2. **Speed of comprehension** - Users understand instantly
3. **Systematic consistency** - Patterns repeat predictably
4. **Functional beauty** - Aesthetics emerge from utility

---

## Keyboard & Focus

### Keyboard First

- All flows are keyboard-operable and follow WAI-ARIA Authoring Patterns
- Every focusable element shows a visible focus ring
- Prefer `:focus-visible` over `:focus` for cleaner mouse UX

### Focus Management

```tsx
// Use focus traps for modals/dialogs
// Move focus according to WAI-ARIA patterns
// Return focus to trigger element on close

// Focus ring styling
className="focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
```

---

## Touch & Click Targets

### Target Sizing

| Visual Size | Click Target | Context |
| ----------- | ------------ | ------- |
| < 24px      | Expand to ≥ 24px | Desktop |
| Any         | ≥ 44px       | Mobile  |

### Mobile Input

```tsx
// Prevent iOS Safari auto-zoom on input focus
<input className="text-base" />  // ≥ 16px font size

// Prevent double-tap zoom
<div className="touch-action-manipulation" />
// Or in CSS: touch-action: manipulation;
```

---

## Loading States

### Timing Rules

| Phase | Duration | Purpose |
| ----- | -------- | ------- |
| Delay before showing | 150-300ms | Avoid flash for fast operations |
| Minimum visible time | 300-500ms | Avoid jarring flash once shown |

### Implementation

```tsx
// Show loading indicator while preserving original label
<Button disabled={isLoading}>
  {isLoading && <Loader2 className="mr-2 size-4 animate-spin" />}
  {label}  {/* Keep original label visible */}
</Button>

// Optimistic updates for high-success operations
// On failure: show error and rollback, or provide undo
```

---

## Animation

### Core Principles

1. **Only animate when it clarifies cause & effect** or adds deliberate delight
2. **Honor `prefers-reduced-motion`** - provide reduced-motion variants
3. **Animations must be interruptible** by user input
4. **Input-driven, not auto-play** - respond to user actions

### Implementation Priority

```
1. CSS transitions/animations (preferred)
2. Web Animations API
3. JavaScript libraries (last resort)
```

### GPU-Friendly Animation

```tsx
// GOOD: Compositor properties only
className="transition-transform transition-opacity"

// BAD: Triggers layout/paint
className="transition-all"  // Never use
className="animate-[width_200ms]"  // Layout property
className="animate-[background_200ms]"  // Paint property (except small UI)
```

### Timing

| Duration | Use Case | Easing |
| -------- | -------- | ------ |
| 100ms | Micro-interactions (hover) | ease-out |
| 150ms | State changes (toggle) | ease-out |
| 200ms | Reveals (dropdown) | ease-out |
| 300ms | Layout shifts (sidebar) | ease-in-out |

---

## Layout & Alignment

### Optical Alignment

**"Adjust ±1px when perception beats geometry."**

Sometimes mathematically perfect alignment looks wrong. Trust your eyes and adjust by 1-2px when needed.

### Deliberate Alignment

Every element should intentionally align to:
- Grid lines
- Baselines
- Edges
- Optical centers

### Responsive Testing

- Test on mobile, laptop, and ultrawide
- Scale ultrawide to 50% to simulate
- Use safe-area variables for notches/insets
- Prefer flex/grid/intrinsic layouts over JS measurement

---

## Content & Typography

### Text Hierarchy

```tsx
// Headings
<h1 className="text-balance">Balanced heading text</h1>

// Body text
<p className="text-pretty">Pretty paragraph text with good line breaks</p>

// Data
<span className="tabular-nums font-mono">1,234.56</span>
```

### Typography Details

| Element | Rule |
| ------- | ---- |
| Quotes | Use curly `" "` not straight `" "` |
| Ellipsis | Use `…` not `...` |
| Numbers | Use `tabular-nums` for alignment |
| Line length | 45-75 characters optimal |

### Help Text

- Prefer inline explanations over tooltips
- Tooltips are a last resort, not first choice

---

## Forms

### Input Behavior

```tsx
// Enter submits (single control) or applies to last control (multi)
// Textarea: ⌘/⌃+Enter submits, Enter inserts newline

// Click label focuses control
<Label htmlFor="email">Email</Label>
<Input id="email" />
```

### Validation Rules

| Rule | Implementation |
| ---- | -------------- |
| Don't block input | Allow any input, validate after |
| Don't pre-disable submit | Allow submission to show validation |
| Error placement | Show errors next to field |
| Error focus | Focus first invalid field on submit |

```tsx
// BAD: Blocking input
<input onKeyDown={(e) => !/\d/.test(e.key) && e.preventDefault()} />

// GOOD: Allow input, validate
<input type="text" inputMode="numeric" />
// Then validate on blur/submit
```

---

## Visual Details

### Shadows

**"Mimic ambient + direct light with at least two layers."**

```tsx
// Layered shadow example
className="shadow-sm"  // Use Tailwind defaults
// Or custom: shadow-[0_1px_2px_rgba(0,0,0,0.05),0_4px_8px_rgba(0,0,0,0.1)]
```

### Borders

- Combine borders and shadows for clarity
- Semi-transparent borders improve edge definition
- On tinted backgrounds, tint borders/shadows to match

### Nested Border Radius

```tsx
// Child radius ≤ parent radius, concentrically aligned
<div className="rounded-xl p-2">           {/* Parent: 12px */}
  <div className="rounded-lg">             {/* Child: 8px (smaller) */}
</div>

// Formula: inner-radius = outer-radius - padding
```

### Color Consistency

- On non-neutral backgrounds, tint borders/shadows/text toward same hue
- Interactive states (`:hover`, `:active`, `:focus`) have higher contrast than rest

---

## Performance

### Network Budget

- `POST/PATCH/DELETE` operations complete in < 500ms
- Show loading state if exceeding budget

### Optimization Checklist

```tsx
// Virtualize large lists
<VirtualList items={items} />  // For >100 items
// Or use content-visibility: auto

// Preload critical fonts
<link rel="preload" href="/fonts/geist.woff2" as="font" crossOrigin="" />

// Prevent CLS with explicit dimensions
<img width={400} height={300} />

// Preconnect to CDN domains
<link rel="preconnect" href="https://cdn.example.com" />
```

### Device Testing

- Test iOS Low Power Mode
- Test macOS Safari
- Test with network throttling

---

## Accessibility

### Semantic HTML First

```tsx
// GOOD: Native elements
<button>Click me</button>
<a href="/page">Link</a>
<label htmlFor="input">Label</label>

// LAST RESORT: ARIA
<div role="button" tabIndex={0} aria-label="Click me">
```

### Checklist

- [ ] Color contrast ≥ 4.5:1 for text (prefer APCA over WCAG 2)
- [ ] Touch targets ≥ 44×44px on mobile
- [ ] Focus indicators visible
- [ ] Keyboard navigation works
- [ ] Screen reader labels present (`aria-label` for icon buttons)
- [ ] Reduced motion respected
- [ ] Error states clear (not just color)
- [ ] Hierarchical headings (`<h1–h6>`)
- [ ] "Skip to content" link available

---

## Vercel Copy Style

### Writing Rules

| Rule | Example |
| ---- | ------- |
| Active voice | "Deploy your app" not "Your app can be deployed" |
| Title case for headings | "Getting Started" not "Getting started" |
| Use `&` over `and` | "Build & Deploy" |
| Use numerals | "8 deployments" not "eight deployments" |
| Consistent decimals | All 0 or all 2 decimal places, never mixed |
| Number-unit spacing | `10 MB` with non-breaking space (`10&nbsp;MB`) |
