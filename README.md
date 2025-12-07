# React TanStarter

[English](./README.md) | [中文](./README.zh-CN.md)

A production-ready full-stack React template with authentication, database, and i18n configured. Deploy to Cloudflare in one click.

![React](https://img.shields.io/badge/React-19-61DAFB)
![TanStack](https://img.shields.io/badge/TanStack-latest-FF4154)
![Cloudflare](https://img.shields.io/badge/Cloudflare-Pages-F38020)

## ✨ Features

- **React 19** with TanStack [Start](https://tanstack.com/start/latest) + [Router](https://tanstack.com/router/latest) + [Query](https://tanstack.com/query/latest)
- **Tailwind CSS v4** + [shadcn/ui](https://ui.shadcn.com/)
- **Drizzle ORM** + Cloudflare D1 (SQLite)
- **Better Auth** with GitHub, Google, Feishu OAuth
- **i18n** built-in (English & Chinese)
- **One-click deploy** to Cloudflare Pages

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

Visit [http://localhost:5173](http://localhost:5173)

## ⚙️ Configuration

### Environment Variables

| Variable                   | Description                              |
| -------------------------- | ---------------------------------------- |
| `VITE_APP_NAME`            | Application name                         |
| `VITE_BASE_URL`            | Base URL (e.g., `http://localhost:5173`) |
| `VITE_ALLOW_SIGNUP`        | Enable user registration                 |
| `VITE_ALLOW_PASSWORD_AUTH` | Enable email/password login              |
| `VITE_ALLOW_GITHUB_AUTH`   | Enable GitHub OAuth                      |
| `VITE_ALLOW_GOOGLE_AUTH`   | Enable Google OAuth                      |
| `VITE_ALLOW_FEISHU_AUTH`   | Enable Feishu OAuth                      |
| `ADMIN_EMAILS`             | Comma-separated admin emails             |
| `BETTER_AUTH_SECRET`       | Auth secret (min 32 chars)               |

### Language Switching

Go to **Settings → Language** to switch between English and 简体中文.

## 📦 Scripts

| Command               | Description                |
| --------------------- | -------------------------- |
| `pnpm dev`            | Start development server   |
| `pnpm build`          | Build for production       |
| `pnpm db:push`        | Push schema to local D1    |
| `pnpm db:push:remote` | Push schema to remote D1   |
| `pnpm cf:deploy`      | Deploy to Cloudflare Pages |
| `pnpm ui`             | Add shadcn/ui components   |
| `pnpm auth:generate`  | Regenerate auth schema     |

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

1. Create a D1 database in Cloudflare Dashboard
2. Update `wrangler.toml` with your database ID
3. Set secrets: `pnpm cf:secret put BETTER_AUTH_SECRET`
4. Deploy: `pnpm cf:deploy`
