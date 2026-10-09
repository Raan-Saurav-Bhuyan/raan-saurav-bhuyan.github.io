# raan-saurav-bhuyan.github.io

Personal portfolio, academic research showcase, and blogging website for **Raan Saurav Bhuyan**, built with **Astro
v5**, **Tailwind CSS v4**, and **MDX**, automatically built and deployed to **GitHub Pages** via **GitHub Actions**.

---

## 📑 Table of Contents

- [Project Architecture & Directory Structure](#-project-architecture--directory-structure)
- [Tech Stack & Dependencies](#-tech-stack--dependencies)
- [Configuration & Integration Guide](#-configuration--integration-guide)
- [Content Management (Collections)](#-content-management-collections)
- [Component & Layout System](#-component--layout-system)
- [Static Assets & Media](#-static-assets--media)
- [CI/CD & GitHub Pages Deployment](#-cicd--github-pages-deployment)
- [Local Development & Build Commands](#-local-development--build-commands)
- [Dependencies Reference & Best Practices](#-dependencies-reference--best-practices)

---

## 🏛 Project Architecture & Directory Structure

```text
raan-saurav-bhuyan.github.io/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions CI/CD pipeline for GitHub Pages
├── frontend/
│   ├── public/                 # Static assets copied directly to dist/
│   │   ├── favicon.ico
│   │   ├── favicon.svg
│   │   └── images/             # Recommended location for images & slideshow assets
│   ├── src/
│   │   ├── components/         # Reusable Astro UI components
│   │   │   ├── BlogPreview.astro       # Displays recent blog post cards
│   │   │   ├── FieldSlideshow.astro    # Interactive research slideshow carousel
│   │   │   ├── Footer.astro            # Site footer with dynamic year & links
│   │   │   ├── Hero.astro              # Landing hero section with CTA buttons
│   │   │   ├── Navbar.astro            # Sticky top navigation bar
│   │   │   └── ResearchPreview.astro   # Displays recent research project cards
│   │   ├── content/            # Type-safe content collections
│   │   │   ├── config.ts       # Zod schema definitions for posts & projects
│   │   │   ├── posts/          # Markdown/MDX blog post entries
│   │   │   └── projects/       # Markdown/MDX research project entries
│   │   ├── layouts/            # Page shell templates
│   │   │   ├── BaseLayout.astro        # Base HTML skeleton & ClientRouter
│   │   │   └── MainLayout.astro        # Standard page layout (Navbar + Slot + Footer)
│   │   ├── pages/              # File-based routing & dynamic routes
│   │   │   ├── index.astro             # Home / Landing page
│   │   │   ├── about.astro             # Academic bio & research interests
│   │   │   ├── contact.astro           # Contact channels & social profiles
│   │   │   ├── blog/
│   │   │   │   ├── index.astro         # Blog post index
│   │   │   │   └── [slug].astro        # Dynamic SSG blog post reader
│   │   │   └── projects/
│   │   │       ├── index.astro         # Research projects index
│   │   │       └── [slug].astro        # Dynamic SSG project detail view
│   │   ├── scripts/            # Client-side JavaScript
│   │   │   └── slideshow.js            # Slideshow event listener & state manager
│   │   └── styles/             # Global CSS
│   │       └── global.css              # Tailwind v4 import & custom glassmorphism styles
│   ├── astro.config.mjs        # Astro configuration & Vite plugin integrations
│   ├── package.json            # Frontend scripts & dependencies
│   ├── package-lock.json       # Exact locked dependency tree
│   └── tsconfig.json           # TypeScript configuration extending astro/tsconfigs/strict
├── .gitignore                  # Git ignore rules for root
└── README.md                   # Project documentation & reference memory
```

---

## ⚡ Tech Stack & Dependencies

| Package                                                                              | Version   | Purpose                                                                          |
|:-------------------------------------------------------------------------------------|:----------|:---------------------------------------------------------------------------------|
| [`astro`](https://astro.build/)                                                      | `^5.4.2`  | Core static site generator framework (SSG, Islands Architecture, Content Layer). |
| [`@astrojs/mdx`](https://docs.astro.build/en/guides/integrations-guide/mdx/)         | `^4.1.0`  | Enables MDX support (Markdown + interactive JSX/Astro components).               |
| [`@astrojs/sitemap`](https://docs.astro.build/en/guides/integrations-guide/sitemap/) | `^3.2.1`  | Generates `sitemap-index.xml` and `sitemap-0.xml` automatically at build time.   |
| [`tailwindcss`](https://tailwindcss.com/)                                            | `^4.0.12` | Next-generation CSS framework (Tailwind CSS v4 with modern CSS-first engine).    |
| [`@tailwindcss/vite`](https://tailwindcss.com/docs/installation)                     | `^4.0.12` | Official Vite plugin for Tailwind CSS v4 integration.                            |

---

## ⚙️ Configuration & Integration Guide

### `frontend/astro.config.mjs`

```javascript
import {defineConfig} from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
    site: "https://raan-saurav-bhuyan.github.io",
    integrations: [mdx(), sitemap()],
    vite: {
        plugins: [tailwindcss()],
    },
});
```

- **Site URL**: Configured for the user site root `https://raan-saurav-bhuyan.github.io`.
- **Integrations**: MDX parsing and automatic XML Sitemap generation.
- **Vite Integration**: Uses `@tailwindcss/vite` directly inside Vite plugins array without needing `tailwind.config.js`
  or `postcss.config.js`.

### `frontend/src/styles/global.css`

Tailwind v4 is loaded via native CSS import:

```css
@import "tailwindcss";
```

Custom utilities include:

- `.glassmorphism`: Translucent frosted glass effect (`backdrop-filter: blur(12px)`, subtle white borders).
- Gradient backgrounds and typography refinements.

---

## 📝 Content Management (Collections)

Content schemas are strictly typed using Zod in `frontend/src/content/config.ts`.

### 1. Blog Posts (`src/content/posts/*.md`)

```typescript
const postsCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        description: z.string(),
        pubDate: z.date(),
        heroImage: z.string().optional(),
        tags: z.array(z.string()).default([]),
    }),
});
```

**Example Frontmatter:**

```markdown
---
title: "Title of Your Blog Post"
description: "A short summary of what this article is about."
pubDate: 2026-10-09
tags: ["Astro", "Web Development", "Research"]
heroImage: "/images/blog-banner.jpg"
---

Your markdown or MDX content here...
```

### 2. Research Projects (`src/content/projects/*.md`)

```typescript
const projectsCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        description: z.string(),
        pubDate: z.date(),
        heroImage: z.string().optional(),
        repo: z.string().url().optional(),
        tags: z.array(z.string()).default([]),
    }),
});
```

**Example Frontmatter:**

```markdown
---
title: "Project Name"
description: "Abstract or summary of research project."
pubDate: 2026-10-09
repo: "https://github.com/raan-saurav-bhuyan/project-name"
tags: ["Machine Learning", "Mathematics"]
heroImage: "/images/project-cover.jpg"
---

Detailed description, equations, figures, and research write-up...
```

---

## 🧩 Component & Layout System

1. **`BaseLayout.astro`**:
    - Manages `<head>`, HTML metadata, viewport, character encoding, title props, and view transitions via
      `<ClientRouter />`.
2. **`MainLayout.astro`**:
    - Imports `@styles/global.css` and renders the site wrapper with `<Navbar />`, `<slot />`, and `<Footer />`.
3. **`Navbar.astro`**:
    - Sticky header with glassmorphism blur and navigation links (`/about`, `/projects`, `/blog`, `/contact`).
4. **`Hero.astro`**:
    - Visual header with headline and direct action buttons.
5. **`FieldSlideshow.astro` + `src/scripts/slideshow.js`**:
    - Interactive research fieldwork carousel with next/prev buttons, slide counters, and dot pagination.
6. **`BlogPreview.astro` & `ResearchPreview.astro`**:
    - Fetches collections via `getCollection()` in server frontmatter and renders the latest 2 items on the home page.
7. **`Footer.astro`**:
    - Dynamic year evaluation (`new Date().getFullYear()`) and social links.

---

## 🖼 Static Assets & Media

Place static files in `frontend/public/`. During the build, all contents of `public/` are copied directly to
`frontend/dist/`.

- **Favicons**: `public/favicon.ico`, `public/favicon.svg`
- **Recommended Image Folders**:
    - `public/images/hero.jpg` — Landing page hero image
    - `public/images/background.jpg` — Ambient page background
    - `public/images/slideshow/` — Slideshow photo assets (`field1.jpg`, `field2.jpg`, etc.)

---

## 🚀 CI/CD & GitHub Pages Deployment

The automated deployment workflow is configured in `.github/workflows/deploy.yml`:

---

## 💻 Local Development & Build Commands

All development commands should be executed from the `frontend/` directory:

```bash
# Navigate to the frontend directory
cd frontend

# Install exact dependencies
npm install

# Start local development server with hot-reload (http://localhost:4321)
npm run dev

# Build production static bundle (generates frontend/dist/)
npm run build

# Preview the production build locally
npm run preview

# Astro CLI utility commands (e.g. astro check, astro sync)
npx astro check
npx astro sync
```

---

## 📚 Dependencies Reference & Best Practices

### 1. Astro v5

- **Content Layer & Collections**: Use `getCollection('posts')` or `getCollection('projects')` in page frontmatter.
  Always run `npx astro sync` or `npm run build` after altering `src/content/config.ts` to regenerate TypeScript
  declarations in `.astro/types.d.ts`.
- **View Transitions**: Use `<ClientRouter />` from `astro:transitions` for seamless SPA-like page transitions without
  full page reloads.
- **Static Site Generation (SSG)**: Dynamic routes must export `async function getStaticPaths()` that returns an array
  of `params: { slug }` and `props`.

### 2. Tailwind CSS v4

- **CSS-First Configuration**: Tailwind v4 uses CSS variables and `@theme` directives in CSS rather than a standalone
  `tailwind.config.js`.
- **Vite Integration**: Integrated via `@tailwindcss/vite` in `astro.config.mjs`.

### 3. @astrojs/mdx

- Enables `.mdx` files alongside `.md` inside `src/content/` or `src/pages/`.
- Allows embedding interactive Astro and framework components directly in markdown content.

### 4. @astrojs/sitemap

- Automatically indexes all static routes defined in `src/pages/` and content collections.
- Output location: `frontend/dist/sitemap-index.xml` and `frontend/dist/sitemap-0.xml`.
