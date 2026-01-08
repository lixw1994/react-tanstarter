# React TanStarter

[English](./README.md) | [中文](./README.zh-CN.md)

一个生产就绪的全栈 React 模板，已配置身份验证、数据库和国际化。一键部署到 Cloudflare。

![React](https://img.shields.io/badge/React-19-61DAFB)
![TanStack](https://img.shields.io/badge/TanStack-latest-FF4154)
![Cloudflare](https://img.shields.io/badge/Cloudflare-Workers-F38020)

## ✨ 特性

- **React 19** + TanStack [Start](https://tanstack.com/start/latest) + [Router](https://tanstack.com/router/latest) + [Query](https://tanstack.com/query/latest)
- **Tailwind CSS v4** + [shadcn/ui](https://ui.shadcn.com/)
- **Drizzle ORM** + Cloudflare D1 (SQLite)
- **Better Auth** 支持 GitHub、Google、飞书 OAuth
- **国际化** 内置中英双语
- **一键部署** 到 Cloudflare Workers

## 🚀 快速开始

```bash
# 克隆项目
npx gitpick lixw1994/react-tanstarter myapp
cd myapp

# 安装依赖
pnpm install

# 配置环境变量
cp .env .env.local
# 编辑 .env.local 填入你的密钥

# 推送数据库结构
pnpm db:push

# 启动开发服务器
pnpm dev
```

访问 [http://localhost:3000](http://localhost:3000)

## ⚙️ 配置说明

### 环境变量

本项目遵循 Vite 环境变量规范：

```
.env                  # 模板文件（提交到仓库）
.env.local            # 本地密钥（gitignore）
.env.production       # 生产环境公开配置（提交，与 wrangler.toml 同步）
.env.production.local # 生产环境密钥（gitignore，用于 drizzle 远程操作）
```

**加载顺序**（后者覆盖前者）：

```
.env → .env.local → .env.[mode] → .env.[mode].local
```

#### 公开变量（`VITE_` 前缀 - 暴露给客户端）

| 变量                       | 说明             |
| -------------------------- | ---------------- |
| `VITE_APP_NAME`            | 应用名称         |
| `VITE_BASE_URL`            | 基础 URL         |
| `VITE_ALLOW_SIGNUP`        | 是否允许用户注册 |
| `VITE_ALLOW_PASSWORD_AUTH` | 是否启用邮箱密码 |
| `VITE_ALLOW_GITHUB_AUTH`   | 是否启用 GitHub  |
| `VITE_ALLOW_GOOGLE_AUTH`   | 是否启用 Google  |
| `VITE_ALLOW_FEISHU_AUTH`   | 是否启用飞书     |

#### 服务端变量（密钥 - 放在 `.local` 文件中）

| 变量                     | 说明                        |
| ------------------------ | --------------------------- |
| `ADMIN_EMAILS`           | 管理员邮箱（逗号分隔）      |
| `BETTER_AUTH_SECRET`     | 认证密钥（至少 32 字符）    |
| `BETTER_AUTH_URL`        | 认证回调基础 URL            |
| `GITHUB_CLIENT_ID`       | GitHub OAuth 凭证           |
| `GITHUB_CLIENT_SECRET`   |                             |
| `GOOGLE_CLIENT_ID`       | Google OAuth 凭证           |
| `GOOGLE_CLIENT_SECRET`   |                             |
| `FEISHU_CLIENT_ID`       | 飞书 OAuth 凭证             |
| `FEISHU_CLIENT_SECRET`   |                             |
| `CLOUDFLARE_ACCOUNT_ID`  | 用于 drizzle 远程数据库操作 |
| `CLOUDFLARE_DATABASE_ID` |                             |
| `CLOUDFLARE_D1_TOKEN`    |                             |

### 切换语言

进入 **设置 → 语言** 可在 English 和简体中文之间切换。

## 📦 常用命令

| 命令                      | 说明                      |
| ------------------------- | ------------------------- |
| `pnpm dev`                | 启动开发服务器            |
| `pnpm build`              | 构建生产版本              |
| `pnpm db:push`            | 推送结构到本地 D1         |
| `pnpm db:push:production` | 推送结构到远程 D1         |
| `pnpm cf:deploy`          | 部署到 Cloudflare Workers |
| `pnpm ui`                 | 添加 shadcn/ui 组件       |
| `pnpm auth:generate`      | 重新生成认证结构          |

## 📁 项目结构

```
src/
├── components/        # UI 组件
│   ├── auth/          # 认证相关组件
│   ├── layout/        # 布局组件
│   └── ui/            # shadcn/ui 组件
├── config/            # 环境变量和导航配置
├── i18n/              # 国际化
│   └── locales/       # 翻译文件（en.json, zh.json）
├── lib/               # 核心库
│   ├── auth/          # Better Auth 配置
│   └── db/            # Drizzle ORM 配置
└── routes/            # 基于文件的路由
    ├── (app)/         # 需要登录的路由
    ├── (auth)/        # 登录/注册路由
    └── (public)/      # 公开路由
```

## 🚢 部署到 Cloudflare

### 1. 创建 D1 数据库

```bash
pnpm wrangler d1 create tanstarter-db
```

将返回的 `database_id` 更新到 `wrangler.toml`。

### 2. 配置环境变量

**公开变量**：编辑 `wrangler.toml` 的 `[vars]` 部分（与 `.env.production` 保持同步）

**密钥**：通过 Cloudflare Secrets 设置（不要写入代码）：

```bash
pnpm cf:secret put BETTER_AUTH_SECRET
pnpm cf:secret put ADMIN_EMAILS
pnpm cf:secret put GITHUB_CLIENT_ID
pnpm cf:secret put GITHUB_CLIENT_SECRET
# ... 其他 OAuth 密钥
```

### 3. 推送数据库结构

```bash
# 创建 .env.production.local 并填入 CLOUDFLARE_* 凭证
pnpm db:push:production
```

### 4. 部署

```bash
pnpm cf:deploy
```
