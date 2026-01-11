# Vercel Geist Design System Principles

> Extracted from Vercel's design philosophy and Geist design system.

## Core Philosophy

**"Design for developers, with developers."**

Vercel's design prioritizes:

1. **Clarity over cleverness** - Every element serves a purpose
2. **Speed of comprehension** - Users understand instantly
3. **Systematic consistency** - Patterns repeat predictably
4. **Functional beauty** - Aesthetics emerge from utility

---

## Typography: Geist Font System

### Font Pairing

```
Geist Sans  → UI text, headings, body copy
Geist Mono  → Code, technical data, timestamps
```

### Type Scale (Modular)

| Name   | Size   | Line Height | Weight    | Use Case                    |
| ------ | ------ | ----------- | --------- | --------------------------- |
| xs     | 12px   | 16px        | 400       | Captions, badges, metadata  |
| sm     | 14px   | 20px        | 400       | Secondary text, descriptions|
| base   | 16px   | 24px        | 400       | Body text, default          |
| lg     | 18px   | 28px        | 500       | Emphasized body             |
| xl     | 20px   | 28px        | 600       | Section headers             |
| 2xl    | 24px   | 32px        | 600       | Card titles                 |
| 3xl    | 30px   | 36px        | 700       | Page titles                 |
| 4xl    | 36px   | 40px        | 700       | Hero headings               |

### Typography Principles

1. **Limit to 3 sizes per view** - More creates visual noise
2. **Weight creates hierarchy** - Not just size
3. **Line length: 45-75 characters** - Optimal readability
4. **Monospace for data** - Numbers, codes, IDs align better

```tsx
// Good: Clear hierarchy with minimal variation
<h1 className="text-3xl font-bold">Dashboard</h1>
<p className="text-muted-foreground">Overview of your projects</p>
<span className="font-mono text-sm">ID: proj_abc123</span>
```

---

## Color System

### Semantic Color Architecture

```
┌─────────────────────────────────────────────────────────┐
│  Foreground (text, icons)                               │
│    ├── foreground        → Primary text                 │
│    ├── muted-foreground  → Secondary text               │
│    └── accent-foreground → Text on accent backgrounds   │
├─────────────────────────────────────────────────────────┤
│  Background (surfaces)                                  │
│    ├── background        → Page background              │
│    ├── card              → Elevated surfaces            │
│    ├── muted             → Subtle backgrounds           │
│    └── accent            → Hover states                 │
├─────────────────────────────────────────────────────────┤
│  Semantic (meaning)                                     │
│    ├── primary           → Main actions                 │
│    ├── secondary         → Alternative actions          │
│    ├── destructive       → Danger, delete               │
│    └── success/warning   → Status indicators            │
├─────────────────────────────────────────────────────────┤
│  Border                                                 │
│    ├── border            → Default borders              │
│    ├── input             → Form input borders           │
│    └── ring              → Focus rings                  │
└─────────────────────────────────────────────────────────┘
```

### Color Usage Rules

1. **Never use raw colors** - Always semantic tokens
2. **Foreground/background pairing** - Ensure contrast
3. **Accent sparingly** - One accent color per view
4. **Status colors are sacred** - Red=error, Green=success, Yellow=warning

```tsx
// Good: Semantic tokens
<div className="bg-card text-card-foreground border border-border">
  <p className="text-muted-foreground">Secondary info</p>
  <Button variant="destructive">Delete</Button>
</div>

// Bad: Raw colors
<div className="bg-white text-gray-900 border border-gray-200">
```

---

## Spacing: The 4px Grid

### Base Unit: 4px

All spacing derives from 4px:

| Token | Value | Tailwind | Use Case                        |
| ----- | ----- | -------- | ------------------------------- |
| 1     | 4px   | `gap-1`  | Icon-text gap, tight groups     |
| 2     | 8px   | `gap-2`  | Related items, button padding   |
| 3     | 12px  | `gap-3`  | List items, form fields         |
| 4     | 16px  | `gap-4`  | Card padding, section gaps      |
| 6     | 24px  | `gap-6`  | Major sections                  |
| 8     | 32px  | `gap-8`  | Page sections                   |
| 12    | 48px  | `gap-12` | Large separations               |
| 16    | 64px  | `gap-16` | Hero sections                   |

### Spacing Principles

1. **Proximity = Relationship** - Close items are related
2. **Consistent rhythm** - Same spacing for same relationships
3. **Breathing room** - Don't crowd elements
4. **Responsive scaling** - Tighter on mobile, looser on desktop

```tsx
// Responsive spacing pattern
<div className="p-4 md:p-6 lg:p-8">
  <div className="space-y-4 md:space-y-6">
    {/* Content */}
  </div>
</div>
```

---

## Component Patterns

### Cards

```tsx
// Standard card structure
<Card className="p-4 md:p-6">
  <CardHeader className="p-0 pb-4">
    <CardTitle className="text-lg font-semibold">Title</CardTitle>
    <CardDescription>Supporting text</CardDescription>
  </CardHeader>
  <CardContent className="p-0">
    {/* Main content */}
  </CardContent>
  <CardFooter className="p-0 pt-4">
    {/* Actions */}
  </CardFooter>
</Card>
```

### Buttons

| Variant     | Use Case                          | Visual Weight |
| ----------- | --------------------------------- | ------------- |
| default     | Primary actions                   | High          |
| secondary   | Alternative actions               | Medium        |
| outline     | Tertiary actions                  | Low           |
| ghost       | Inline actions, icon buttons      | Minimal       |
| destructive | Delete, remove, dangerous actions | High (red)    |

**Button sizing:**

```tsx
// Touch-friendly minimum
<Button className="min-h-11">  {/* 44px touch target */}
```

### Forms

```tsx
// Consistent form pattern
<div className="space-y-4">
  <div className="space-y-2">
    <Label htmlFor="email">Email</Label>
    <Input id="email" type="email" placeholder="you@example.com" />
    <p className="text-sm text-muted-foreground">
      We'll never share your email.
    </p>
  </div>
</div>
```

---

## Motion & Animation

### Timing Functions

| Duration | Use Case                    | Easing              |
| -------- | --------------------------- | ------------------- |
| 100ms    | Micro-interactions (hover)  | ease-out            |
| 150ms    | State changes (toggle)      | ease-out            |
| 200ms    | Reveals (dropdown)          | ease-out            |
| 300ms    | Layout shifts (sidebar)     | ease-in-out         |
| 500ms    | Page transitions            | ease-in-out         |

### Animation Principles

1. **Purpose over decoration** - Animation should inform, not distract
2. **Respect reduced motion** - Honor `prefers-reduced-motion`
3. **Exit faster than enter** - Closing feels snappier
4. **Stagger thoughtfully** - Lists animate in sequence

```tsx
// Respect reduced motion
<div className="motion-safe:animate-in motion-safe:fade-in">
```

---

## Layout Patterns

### Container Widths

| Type       | Max Width | Use Case                    |
| ---------- | --------- | --------------------------- |
| Prose      | 65ch      | Long-form text              |
| Content    | 768px     | Forms, settings             |
| Wide       | 1024px    | Dashboards, lists           |
| Full       | 1280px    | Complex layouts             |
| Fluid      | 100%      | Edge-to-edge                |

### Grid System

```tsx
// Responsive grid
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
```

### Sidebar Layout

```tsx
// App shell pattern
<div className="flex min-h-screen">
  <aside className="w-64 shrink-0 border-r hidden md:block">
    {/* Sidebar */}
  </aside>
  <main className="flex-1 overflow-auto">
    {/* Content */}
  </main>
</div>
```

---

## Dark Mode Excellence

### Principles

1. **Not just inverted** - Dark mode is a separate design
2. **Reduce contrast slightly** - Pure white (#fff) is harsh
3. **Elevate with lightness** - Higher surfaces are lighter
4. **Shadows become borders** - Shadows don't work in dark

### Implementation

```tsx
// Elevation in dark mode
<Card className="bg-card">           {/* Base level */}
<Card className="bg-card/80">        {/* Elevated */}
<Popover className="bg-popover">     {/* Floating */}
```

---

## Accessibility Checklist

- [ ] Color contrast ≥ 4.5:1 for text
- [ ] Touch targets ≥ 44×44px
- [ ] Focus indicators visible
- [ ] Keyboard navigation works
- [ ] Screen reader labels present
- [ ] Reduced motion respected
- [ ] Error states are clear (not just color)
