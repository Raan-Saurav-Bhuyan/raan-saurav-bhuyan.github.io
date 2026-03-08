// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://raan-saurav-bhuyan.github.io",

  integrations: [
    mdx(),
    sitemap()
  ],

  markdown: {
    syntaxHighlight: "shiki",
    shikiConfig: {
      theme: "github-dark"
    }
  },

  vite: {
    plugins: [
      tailwindcss()
    ]
  }
});