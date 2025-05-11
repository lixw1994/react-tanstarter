# [React TanStarter](https://github.com/lixw1994/react-tanstarter)

An enhanced template based on 🏝️ TanStack Start, with authentication control switches and configurable application name.

![Version](https://img.shields.io/badge/Version-1.0.0-blue)
![License](https://img.shields.io/badge/License-MIT-green)
![React](https://img.shields.io/badge/React-19-61DAFB)
![TanStack](https://img.shields.io/badge/TanStack-latest-FF4154)

- [React 19](https://react.dev) + [React Compiler](https://react.dev/learn/react-compiler)
- TanStack [Start](https://tanstack.com/start/latest) + [Router](https://tanstack.com/router/latest) + [Query](https://tanstack.com/query/latest)
- [Tailwind CSS v4](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)
- [Drizzle ORM](https://orm.drizzle.team/) + PostgreSQL
- [Better Auth](https://www.better-auth.com/) with configurable authentication control switches
- Configurable application name

## Getting Started

1. Clone this repository using gitpick (recommended):

   ```bash
   npx gitpick lixw1994/react-tanstarter myapp -b deploy/cloudflare
   cd myapp
   ```

   Or clone directly:

   ```bash
   git clone https://github.com/lixw1994/react-tanstarter.git myapp --depth 1 --branch deploy/cloudflare
   cd react-tanstarter && rm -rf .git
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Create a `.env` file based on [`.env.example`](./.env.example) and configure the following environment variables:

   ```bash
   cp .env.example .env.dev
   ```

   ```
   # Application name
   VITE_APP_NAME=Your App Name

   # Authentication control switches
   VITE_ALLOW_SIGNUP=true
   VITE_ALLOW_PASSWORD_AUTH=true
   VITE_ALLOW_GITHUB_AUTH=true
   VITE_ALLOW_GOOGLE_AUTH=true
   ```

4. Use drizzle-kit to push the database schema to your database:

   ```bash
   pnpm db push
   ```

   For more information, refer to: https://orm.drizzle.team/docs/migrations

5. Run the development server:

   ```bash
   pnpm dev
   ```

   The development server should now be running at [http://localhost:3000](http://localhost:3000).

## Enhanced Features

### Authentication Control Switches

This template adds the following authentication control switches that can be easily configured through environment variables:

- **VITE_ALLOW_SIGNUP**: Whether to allow user registration
- **VITE_ALLOW_PASSWORD_AUTH**: Whether to enable email/password login
- **VITE_ALLOW_GITHUB_AUTH**: Whether to enable GitHub social login
- **VITE_ALLOW_GOOGLE_AUTH**: Whether to enable Google social login

These switches help you flexibly configure your application's authentication methods as needed.

### Configurable Application Name

With the **VITE_APP_NAME** environment variable, you can easily change the name of your application, which will automatically be reflected in:

- Browser tab title
- Page metadata description
- Login and registration pages

### Cloudflare Pages Deployment

This template is configured to work with Cloudflare Pages. You can deploy it directly to Cloudflare Pages by following the instructions in the [TanStack Start documentation](https://tanstack.com/start/latest/docs/framework/react/hosting#cloudflare-pages).

#### Cloudflare Pages Variables

Copy `.env ` plain variables to `wrangler.toml.vars` and add encrypted variables to cloudflare pages secrets using `npx wrangler pages secret put <KEY>`.

## Useful Tools

#### Scripts

These scripts in [package.json](./package.json#L5) use **pnpm** by default, but you can modify them to use your preferred package manager.

- **`auth:generate`** - If you modify the Better Auth [configuration](./src/lib/server/auth.ts), you can regenerate the [authentication database schema](./src/lib/server/schema/auth.schema.ts).
- **`db`** - Run drizzle-kit commands (e.g., `pnpm db generate` to generate migrations).
- **`ui`** - shadcn/ui CLI (e.g., `pnpm ui add button` to add a button component).
- **`format`** and **`lint`** - Run Prettier and ESLint.
- **`deps`** - Selectively upgrade dependencies using npm-check-updates.
- **`deploy:cloudflare`** - Deploy to Cloudflare Pages.

#### Utility Components

- [`auth-guard.ts`](./src/lib/middleware/auth-guard.ts) - An example middleware for enforcing authentication on server functions.
- [`ThemeToggle.tsx`](./src/components/ThemeToggle.tsx) - A simple component for toggling between light and dark modes.

## Production Build

Read the [hosting documentation](https://tanstack.com/start/latest/docs/framework/react/hosting) to learn how to deploy your TanStack Start application.

## Contributing

Pull Requests and Issues are welcome! If you have any questions or suggestions, feel free to raise them.

## License

MIT
