# Visual Aesthetics Reference

## Spacing System

Spacing communicates relationships. Consistent spacing = professional feel.

| Relationship | Spacing             | Use Cases                             |
| ------------ | ------------------- | ------------------------------------- |
| Tight        | `gap-1` `gap-2`     | Label↔Input, icon↔text, button groups |
| Related      | `gap-4`             | Card content, list items, form fields |
| Sections     | `gap-6` `gap-8`     | Page sections, independent modules    |
| Page padding | `p-4 md:p-6 lg:p-8` | Responsive container padding          |

## Typography Hierarchy

| Level            | Classes                                            | Usage                           |
| ---------------- | -------------------------------------------------- | ------------------------------- |
| L1 Page title    | `text-2xl font-bold` or `text-3xl font-bold`       | Page top, one per page          |
| L2 Section title | `text-lg font-semibold` or `text-xl font-semibold` | Card titles, section headers    |
| L3 Body          | Default `text-base`                                | Main content                    |
| L4 Secondary     | `text-sm text-muted-foreground`                    | Descriptions, hints, timestamps |
| L5 Label         | `text-xs`                                          | Badges, tags, metadata          |

### Typography Details

- Use `text-balance` for headings, `text-pretty` for body
- Use `tabular-nums` for numeric data alignment
- Use `truncate` or `line-clamp` for dense UI
- Use curly quotes `" "` not straight `" "`
- Use ellipsis `…` not three dots `...`
- Line length: 45-75 characters (`max-w-prose`)

## Color Hierarchy

```
Emphasis ←─────────────────────────────────────→ De-emphasis

Text:   text-foreground → text-muted-foreground
Background: bg-primary → bg-secondary → bg-muted → bg-background
Border: border-border (default) → border-input (inputs)
```

### Color Consistency

- On non-neutral backgrounds, tint borders/shadows/text toward same hue
- Interactive states (`:hover`, `:active`, `:focus`) have higher contrast than rest
- Limit accent color to one per view

## Visual Details

### Optical Alignment

**"Adjust ±1px when perception beats geometry."**

Sometimes mathematically perfect alignment looks wrong. Trust your eyes.

### Layered Shadows

**"Mimic ambient + direct light with at least two layers."**

```tsx
// Use Tailwind defaults
className="shadow-sm"
className="shadow-md"

// Or layer manually for depth
// Layer 1: Ambient (soft, spread)
// Layer 2: Direct (sharp, offset)
```

### Nested Border Radius

Child radius ≤ parent radius, concentrically aligned.

```tsx
// Formula: inner-radius = outer-radius - padding
<div className="rounded-xl p-2">     {/* 12px radius */}
  <div className="rounded-lg">       {/* 8px radius (smaller) */}
</div>
```

### Border Clarity

- Combine borders and shadows for definition
- Semi-transparent borders improve edge clarity
- In dark mode, use borders instead of shadows

## Interactive States

**Every interactive element needs visual feedback:**

| State    | Implementation                                     | Duration |
| -------- | -------------------------------------------------- | -------- |
| hover    | `hover:bg-accent` or `hover:bg-primary/90`         | 150ms    |
| focus    | `focus-visible:ring-2 focus-visible:ring-ring`     | -        |
| active   | `active:scale-[0.98]` or darken color              | -        |
| disabled | `disabled:opacity-50 disabled:pointer-events-none` | -        |
| loading  | `animate-spin` or `animate-pulse`                  | -        |

**Transitions**:

```tsx
// GOOD: Explicit properties
transition-colors duration-150
transition-transform duration-200
transition-opacity duration-150

// BAD: Never use
transition-all  // Animates everything, performance issue
```

## Creative Freedom

Within constraints, these areas allow creativity:

### Empty States

- Use meaningful illustrations/icons
- Copy can have personality (but stay professional)
- Layout can break the usual grid
- **MUST have one clear next action**

### Loading States

- Skeleton shapes hint at content structure
- Add 150-300ms delay before showing (avoid flash)
- Minimum 300-500ms visible once shown
- Use optimistic updates when success is likely

### Data Visualization

- Chart colors reflect hierarchy
- Empty data has guiding design
- Hover interactions add discovery joy

### Page Transitions

- Entry animations add fluidity
- `animate-in fade-in slide-in-from-bottom-4`
- Never block user interaction
- Must be interruptible

## Dark Mode Notes

Semantic tokens auto-adapt, but watch for:

| Light Mode              | Dark Mode Adjustment            |
| ----------------------- | ------------------------------- |
| Shadows show depth      | Use borders/backgrounds instead |
| High saturation accents | Project tokens handle this      |
| Images/icons            | Check contrast                  |

Test in actual dark environment, not just theme toggle.

## Completion Checklist

- [ ] **Hierarchy**: Does user know where to look first?
- [ ] **Spacing**: Consistent rhythm? Nothing "looks off"?
- [ ] **Alignment**: Optically aligned? ±1px adjustments made?
- [ ] **Feedback**: hover/focus/loading states complete?
- [ ] **Dark mode**: Looks good in both modes?
- [ ] **Mobile**: Touch targets ≥ 44px? Layout sensible?
- [ ] **Typography**: `text-balance`/`text-pretty`/`tabular-nums` applied?
- [ ] **Details**: Border radius nested correctly? Shadows layered?
