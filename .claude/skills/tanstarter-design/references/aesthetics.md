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

## Color Hierarchy

```
Emphasis ←─────────────────────────────────────→ De-emphasis

Text:   text-foreground → text-muted-foreground
Background: bg-primary → bg-secondary → bg-muted → bg-background
Border: border-border (default) → border-input (inputs)
```

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
transition-colors duration-150     // Color changes
transition-all duration-200        // Multiple properties (use sparingly)
transition-transform duration-150  // Scale/translate
```

## Creative Freedom

Within constraints, these areas allow creativity:

### Empty States

- Use meaningful illustrations/icons
- Copy can have personality (but stay professional)
- Layout can break the usual grid
- Guide users to next action

### Loading States

- Skeleton shapes hint at content structure
- Subtle brand-colored animations
- Progress feedback for long operations

### Data Visualization

- Chart colors reflect hierarchy
- Empty data has guiding design
- Hover interactions add discovery joy

### Page Transitions

- Entry animations add fluidity
- `animate-in fade-in slide-in-from-bottom-4`
- Never block user interaction

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
- [ ] **Feedback**: hover/focus/loading states complete?
- [ ] **Dark mode**: Looks good in both modes?
- [ ] **Mobile**: Touch targets large enough? Layout sensible?
- [ ] **Details**: Alignment precise? Border radius consistent?
