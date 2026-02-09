import { query, mutation } from "./_generated/server";
import { v, ConvexError } from "convex/values";
import { validateAdmin } from "./auth_utils";

export const list = query({
    args: {},
    handler: async (ctx) => {
        const events = await ctx.db.query("events").withIndex("by_date").order("desc").collect();
        return await Promise.all(events.map(async (e) => {
            const storageUrl = e.storageId ? await ctx.storage.getUrl(e.storageId) : null;
            return {
                ...e,
                imageUrl: storageUrl || e.imageUrl || 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae'
            };
        }));
    },
});

export const getById = query({
    args: { id: v.id("events") },
    handler: async (ctx, args) => {
        const event = await ctx.db.get(args.id);
        if (!event) return null;
        const storageUrl = event.storageId ? await ctx.storage.getUrl(event.storageId) : null;
        return {
            ...event,
            imageUrl: storageUrl || event.imageUrl || 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae'
        };
    },
});

// mutation import is already at top now

export const create = mutation({
    args: {
        title: v.string(),
        description: v.string(),
        date: v.string(),
        location: v.string(),
        type: v.string(),
        imageUrl: v.string(),
        storageId: v.optional(v.id("_storage")),
        featured: v.boolean(),
        content: v.optional(v.string()),
        time: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        await validateAdmin(ctx);
        return await ctx.db.insert("events", args);
    },
});

export const update = mutation({
    args: {
        id: v.id("events"),
        title: v.string(),
        description: v.string(),
        date: v.string(),
        location: v.string(),
        type: v.string(),
        imageUrl: v.string(),
        storageId: v.optional(v.id("_storage")),
        featured: v.boolean(),
        content: v.optional(v.string()),
        time: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        await validateAdmin(ctx);
        const { id, ...data } = args;
        await ctx.db.patch(id, data);
    },
});

export const remove = mutation({
    args: { id: v.id("events") },
    handler: async (ctx, args) => {
        await validateAdmin(ctx);
        await ctx.db.delete(args.id);
    },
});
