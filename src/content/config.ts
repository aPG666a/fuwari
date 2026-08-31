import { defineCollection, z } from "astro:content";

const postsCollection = defineCollection({
	schema: z.object({
		title: z.string(),
		published: z.date(),
		updated: z.date().optional(),
		draft: z.boolean().optional().default(false),
		description: z.string().optional().default(""),
		image: z.string().optional().default(""),
		tags: z.array(z.string()).optional().default([]),
		category: z.string().optional().nullable().default(""),
		lang: z.string().optional().default(""),

		/* For internal use */
		prevTitle: z.string().default(""),
		prevSlug: z.string().default(""),
		nextTitle: z.string().default(""),
		nextSlug: z.string().default(""),
	}),
});
const specCollection = defineCollection({
	schema: z.object({}),
});

const notesCollection = defineCollection({
	schema: z.object({
		published: z.date(),
		images: z.array(z.string()).optional().default([]),
		tags: z.array(z.string()).optional().default([]),
		draft: z.boolean().optional().default(false),
	}),
});

const animeCollection = defineCollection({
	schema: z.object({
		title: z.string(),
		cover: z.string().optional().default(""),
		year: z.number().int().min(1900).max(2200),
		status: z.enum(["planned", "watching", "completed"]),
		score: z.number().min(0).max(10).optional(),
		review: z.string().optional().default(""),
		url: z.string().url().optional(),
		draft: z.boolean().optional().default(false),
	}),
});

export const collections = {
	posts: postsCollection,
	spec: specCollection,
	notes: notesCollection,
	anime: animeCollection,
};
