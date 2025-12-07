# React TanStarter

[English](./README.md) | [中文](./README.zh-CN.md)

一个生产就绪的全栈 React 模板，已配置身份验证、数据库和国际化。一键部署到 Cloudflare。

![React](https://img.shields.io/badge/React-19-61DAFB)
![TanStack](https://img.shields.io/badge/TanStack-latest-FF4154)
![Cloudflare](https://img.shields.io/badge/Cloudflare-Pages-F38020)

## ✨ 特性

- **React 19** + TanStack [Start](https://tanstack.com/start/latest) + [Router](https://tanstack.com/router/latest) + [Query](https://tanstack.com/query/latest)
- **Tailwind CSS v4** + [shadcn/ui](https://ui.shadcn.com/)
- **Drizzle ORM** + Cloudflare D1 (SQLite)
- **Better Auth** 支持 GitHub、Google、飞书 OAuth
- **国际化** 内置中英双语
- **一键部署** 到 Cloudflare Pages

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

访问 [http://localhost:5173](http://localhost:5173)

## ⚙️ 配置说明

### 环境变量

| 变量                       | 说明                                   |
| -------------------------- | -------------------------------------- |
| `VITE_APP_NAME`            | 应用名称                               |
| `VITE_BASE_URL`            | 基础 URL（如 `http://localhost:5173`） |
| `VITE_ALLOW_SIGNUP`        | 是否允许用户注册                       |
| `VITE_ALLOW_PASSWORD_AUTH` | 是否启用邮箱密码登录                   |
| `VITE_ALLOW_GITHUB_AUTH`   | 是否启用 GitHub 登录                   |
| `VITE_ALLOW_GOOGLE_AUTH`   | 是否启用 Google 登录                   |
| `VITE_ALLOW_FEISHU_AUTH`   | 是否启用飞书登录                       |
| `ADMIN_EMAILS`             | 管理员邮箱（逗号分隔）                 |
| `BETTER_AUTH_SECRET`       | 认证密钥（至少 32 字符）               |

### 切换语言

进入 **设置 → 语言** 可在 English 和简体中文之间切换。

## 📦 常用命令

| 命令                  | 说明                    |
| --------------------- | ----------------------- |
| `pnpm dev`            | 启动开发服务器          |
| `pnpm build`          | 构建生产版本            |
| `pnpm db:push`        | 推送结构到本地 D1       |
| `pnpm db:push:remote` | 推送结构到远程 D1       |
| `pnpm cf:deploy`      | 部署到 Cloudflare Pages |
| `pnpm ui`             | 添加 shadcn/ui 组件     |
| `pnpm auth:generate`  | 重新生成认证结构        |

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

1. 在 Cloudflare 控制台创建 D1 数据库
2. 更新 `wrangler.toml` 中的数据库 ID
3. 设置密钥：`pnpm cf:secret put BETTER_AUTH_SECRET`
4. 部署：`pnpm cf:deploy`
