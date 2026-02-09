import { query, mutation } from "./_generated/server";
import { v, ConvexError } from "convex/values";
import { validateAdmin } from "./auth_utils";

export const list = query({
    args: {},
    handler: async (ctx) => {
        const posts = await ctx.db.query("blog_posts").withIndex("by_published").order("desc").collect();
        return await Promise.all(posts.map(async (p) => {
            const storageUrl = p.storageId ? await ctx.storage.getUrl(p.storageId) : null;
            return {
                ...p,
                imageUrl: storageUrl || p.imageUrl || 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae'
            };
        }));
    },
});

export const getBySlug = query({
    args: { slug: v.string() },
    handler: async (ctx, args) => {
        const post = await ctx.db
            .query("blog_posts")
            .withIndex("by_published")
            .filter((q) => q.eq(q.field("slug"), args.slug))
            .first();
        if (!post) return null;
        const storageUrl = post.storageId ? await ctx.storage.getUrl(post.storageId) : null;
        return {
            ...post,
            imageUrl: storageUrl || post.imageUrl || 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae'
        };
    },
});

export const getRelated = query({
    args: { category: v.string(), currentSlug: v.string() },
    handler: async (ctx, args) => {
        const posts = await ctx.db
            .query("blog_posts")
            .withIndex("by_category", (q) => q.eq("category", args.category))
            .take(4);

        const filtered = posts
            .filter(p => p.slug !== args.currentSlug)
            .slice(0, 3);

        return await Promise.all(filtered.map(async (p) => {
            const storageUrl = p.storageId ? await ctx.storage.getUrl(p.storageId) : null;
            return {
                ...p,
                imageUrl: storageUrl || p.imageUrl || 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae'
            };
        }));
    },
});

// mutation import is already at top now

export const create = mutation({
    args: {
        title: v.string(),
        slug: v.string(),
        excerpt: v.string(),
        content: v.string(),
        author: v.string(),
        publishedAt: v.string(),
        imageUrl: v.string(),
        storageId: v.optional(v.id("_storage")),
        category: v.string(),
        readTime: v.string(),
    },
    handler: async (ctx, args) => {
        await validateAdmin(ctx);
        return await ctx.db.insert("blog_posts", args);
    },
});

export const update = mutation({
    args: {
        id: v.id("blog_posts"),
        title: v.string(),
        slug: v.string(),
        excerpt: v.string(),
        content: v.string(),
        author: v.string(),
        publishedAt: v.string(),
        imageUrl: v.string(),
        storageId: v.optional(v.id("_storage")),
        category: v.string(),
        readTime: v.string(),
    },
    handler: async (ctx, args) => {
        await validateAdmin(ctx);
        const { id, ...data } = args;
        await ctx.db.patch(id, data);
    },
});

export const remove = mutation({
    args: { id: v.id("blog_posts") },
    handler: async (ctx, args) => {
        await validateAdmin(ctx);
        await ctx.db.delete(args.id);
    },
});
