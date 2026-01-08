# React TanStarter

[English](./README.md) | [中文](./README.zh-CN.md)

A production-ready full-stack React template with authentication, database, and i18n configured. Deploy to Cloudflare in one click.

![React](https://img.shields.io/badge/React-19-61DAFB)
![TanStack](https://img.shields.io/badge/TanStack-latest-FF4154)
![Cloudflare](https://img.shields.io/badge/Cloudflare-Workers-F38020)

## ✨ Features

- **React 19** with TanStack [Start](https://tanstack.com/start/latest) + [Router](https://tanstack.com/router/latest) + [Query](https://tanstack.com/query/latest)
- **Tailwind CSS v4** + [shadcn/ui](https://ui.shadcn.com/)
- **Drizzle ORM** + Cloudflare D1 (SQLite)
- **Better Auth** with GitHub, Google, Feishu OAuth
- **i18n** built-in (English & Chinese)
- **One-click deploy** to Cloudflare Workers

## 🚀 Quick Start

```bash
# Clone
npx gitpick lixw1994/react-tanstarter myapp
cd myapp

# Install
pnpm install

# Setup environment
cp .env .env.local
# Edit .env.local with your secrets

# Push database schema
pnpm db:push

# Start development
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000)

## ⚙️ Configuration

### Environment Variables

This project follows Vite's env file convention:

```
.env                  # Template with defaults (committed)
.env.local            # Local secrets (gitignored)
.env.production       # Production public config (committed, synced with wrangler.toml)
.env.production.local # Production secrets (gitignored, for drizzle remote ops)
```

**Load order** (later files override earlier):

```
.env → .env.local → .env.[mode] → .env.[mode].local
```

#### Public Variables (`VITE_` prefix - exposed to client)

| Variable                   | Description              |
| -------------------------- | ------------------------ |
| `VITE_APP_NAME`            | Application name         |
| `VITE_BASE_URL`            | Base URL                 |
| `VITE_ALLOW_SIGNUP`        | Enable user registration |
| `VITE_ALLOW_PASSWORD_AUTH` | Enable email/password    |
| `VITE_ALLOW_GITHUB_AUTH`   | Enable GitHub OAuth      |
| `VITE_ALLOW_GOOGLE_AUTH`   | Enable Google OAuth      |
| `VITE_ALLOW_FEISHU_AUTH`   | Enable Feishu OAuth      |

#### Server Variables (secrets - keep in `.local` files)

| Variable                 | Description                  |
| ------------------------ | ---------------------------- |
| `ADMIN_EMAILS`           | Comma-separated admin emails |
| `BETTER_AUTH_SECRET`     | Auth secret (min 32 chars)   |
| `BETTER_AUTH_URL`        | Auth callback base URL       |
| `GITHUB_CLIENT_ID`       | GitHub OAuth credentials     |
| `GITHUB_CLIENT_SECRET`   |                              |
| `GOOGLE_CLIENT_ID`       | Google OAuth credentials     |
| `GOOGLE_CLIENT_SECRET`   |                              |
| `FEISHU_CLIENT_ID`       | Feishu OAuth credentials     |
| `FEISHU_CLIENT_SECRET`   |                              |
| `CLOUDFLARE_ACCOUNT_ID`  | For drizzle remote ops       |
| `CLOUDFLARE_DATABASE_ID` |                              |
| `CLOUDFLARE_D1_TOKEN`    |                              |

### Language Switching

Go to **Settings → Language** to switch between English and 简体中文.

## 📦 Scripts

| Command                   | Description                  |
| ------------------------- | ---------------------------- |
| `pnpm dev`                | Start development server     |
| `pnpm build`              | Build for production         |
| `pnpm db:push`            | Push schema to local D1      |
| `pnpm db:push:production` | Push schema to remote D1     |
| `pnpm cf:deploy`          | Deploy to Cloudflare Workers |
| `pnpm ui`                 | Add shadcn/ui components     |
| `pnpm auth:generate`      | Regenerate auth schema       |

## 📁 Project Structure

```
src/
├── components/        # UI components
│   ├── auth/          # Auth-related components
│   ├── layout/        # Layout components
│   └── ui/            # shadcn/ui components
├── config/            # Environment & navigation config
├── i18n/              # Internationalization
│   └── locales/       # Translation files (en.json, zh.json)
├── lib/               # Core libraries
│   ├── auth/          # Better Auth setup
│   └── db/            # Drizzle ORM setup
└── routes/            # File-based routing
    ├── (app)/         # Authenticated routes
    ├── (auth)/        # Login/signup routes
    └── (public)/      # Public routes
```

## 🚢 Deploy to Cloudflare

### 1. Create D1 Database

```bash
pnpm cf:db create tanstarter-db
```

Update `wrangler.toml` with the returned `database_id`.

### 2. Configure Environment

**Public variables**: Edit `wrangler.toml` `[vars]` section (synced with `.env.production`)

**Secrets**: Set via Cloudflare secrets (not in code):

```bash
pnpm cf:secret put BETTER_AUTH_SECRET
pnpm cf:secret put ADMIN_EMAILS
pnpm cf:secret put GITHUB_CLIENT_ID
pnpm cf:secret put GITHUB_CLIENT_SECRET
# ... other OAuth secrets
```

### 3. Push Database Schema

```bash
# Create .env.production.local with CLOUDFLARE_* credentials
pnpm db:push:production
```

### 4. Deploy

```bash
pnpm cf:deploy
```
