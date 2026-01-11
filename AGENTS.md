# AGENTS.md

This file provides guidance to AI coding assistants (Cursor, Copilot, etc.) when working with code in this repository.

## Commands

```bash
pnpm dev              # Start dev server on port 3000
pnpm build            # Build for production (includes type check)
pnpm check            # Format + lint + type check (run before committing)
pnpm db:push          # Push schema to local D1
pnpm db:push:production  # Push schema to remote D1
pnpm ui add <name>    # Add shadcn/ui component
pnpm cf:deploy        # Build and deploy to Cloudflare Workers
```

## Architecture

### Tech Stack
- **Framework**: TanStack Start (React 19 SSR) + TanStack Router + TanStack Query
- **Styling**: Tailwind CSS v4 + shadcn/ui
- **Database**: Drizzle ORM + Cloudflare D1 (SQLite)
- **Auth**: Better Auth with OAuth (GitHub, Google, Feishu)
- **Deploy**: Cloudflare Workers

### Request Flow
1. `src/server-entry.ts` - Cloudflare Worker entry point, creates `db` and `auth` instances per request
2. `src/router.tsx` - Creates router with QueryClient, sets up SSR query integration
3. `src/routes/__root.tsx` - Root route, fetches auth state in `beforeLoad`, provides to all routes

### Route Groups
Routes use TanStack Router file-based routing with parenthesized groups:
- `(app)/` - Authenticated routes, redirects to `/login` if no user
- `(auth)/` - Login/signup pages
- `(public)/` - Public pages (landing, about)

### Server Context
Server functions access context via TanStack Start middleware:
```typescript
// Available in server functions via context
context.db    // Drizzle ORM instance
context.auth  // Better Auth instance
context.env   // Cloudflare env bindings
```

### Auth Middleware
- `authMiddleware` - Requires authenticated user, adds `user` to context
- `adminMiddleware` - Requires user email in `ADMIN_EMAILS` env var

### i18n
Translations in `src/i18n/locales/{en,zh}.json`. Use `useTranslation()` hook from react-i18next.

## Environment Variables

### File Structure
```
.env                  # Template with defaults (committed)
.env.local            # Local secrets (gitignored)
.env.production       # Production public config (committed)
.env.production.local # Production secrets for drizzle remote ops (gitignored)
wrangler.toml         # Cloudflare Workers config, [vars] section synced with .env.production
```

### Load Order (Vite)
`.env` → `.env.local` → `.env.[mode]` → `.env.[mode].local` (later overrides earlier)

### Adding New Variables
1. **Client-side** (`VITE_` prefix): Add to `src/config/client-env.ts` schema
2. **Server-side**: Add to `src/config/server-env.ts` schema
3. **Production**: Add to `wrangler.toml` `[vars]` (public) or use `pnpm cf:secret put <KEY>` (secrets)

### Key Variables
| Variable | Type | Description |
|----------|------|-------------|
| `VITE_*` | Client | Exposed to browser, feature flags |
| `ADMIN_EMAILS` | Server | Comma-separated admin emails |
| `BETTER_AUTH_SECRET` | Server | Auth secret (min 32 chars) |
| `*_CLIENT_ID/SECRET` | Server | OAuth provider credentials |
| `CLOUDFLARE_*` | Local only | For `db:push:production` command |

## Design Guidelines (MANDATORY)

**IMPORTANT: The following guidelines MUST be followed for all development tasks.**

Detailed design guidance in `.claude/skills/tanstarter-design/`.

### tanstarter-design
Frontend design guidance. **MUST follow before creating any pages/components.** Key points:
- **Mobile First**: `p-4 md:p-6 lg:p-8` (small to large)
- **Semantic tokens**: `bg-background`, `text-foreground` (not hardcoded colors)
- **i18n required**: `{t("key")}` (not hardcoded text)
- **New pages**: Use `PageContainer` component, add nav in `src/config/nav.ts`

### confidence-check
Pre-implementation assessment. **MUST verify after completing development tasks**:
- No duplicate implementations exist
- Architecture compliance (use existing stack)
- Official docs reviewed
- Requires ≥90% confidence to proceed

## Code Style
- Follow KISS principle - avoid over-engineering
- Use `pnpm` for package management
- ESLint configured with TypeScript, React, and TanStack plugins
