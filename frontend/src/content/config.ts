import { defineCollection, z } from "astro:content";

/*
  Blog collection schema
*/
const posts = defineCollection({
    type: "content",

    schema: z.object({
        title: z.string(),
        description: z.string(),
        pubDate: z.coerce.date(),
        updatedDate: z.coerce.date().optional(),
        draft: z.boolean().optional(),
    }),
});

/*
  Research projects collection schema
*/
const projects = defineCollection({
    type: "content",

    schema: z.object({
        title: z.string(),
        description: z.string(),
        pubDate: z.coerce.date(),

        updatedDate: z.coerce.date().optional(),

        draft: z.boolean().optional(),

        tags: z.array(z.string()).optional(),

        repo: z.string().url().optional(),

        paper: z.string().url().optional(),
    }),
});

/*
  Export all collections
*/
export const collections = {
    posts,
    projects,
};