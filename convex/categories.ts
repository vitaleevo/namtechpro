import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { validateAdmin } from "./auth_utils";

export const list = query({
    args: { type: v.optional(v.string()) },
    handler: async (ctx, args) => {
        if (args.type) {
            return await ctx.db
                .query("categories")
                .withIndex("by_type", (q) => q.eq("type", args.type!))
                .collect();
        }
        return await ctx.db.query("categories").collect();
    },
});

export const create = mutation({
    args: {
        name: v.string(),
        slug: v.string(),
        type: v.string(),
        description: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        await validateAdmin(ctx);
        return await ctx.db.insert("categories", args);
    },
});

export const update = mutation({
    args: {
        id: v.id("categories"),
        name: v.string(),
        slug: v.string(),
        type: v.string(),
        description: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        await validateAdmin(ctx);
        const { id, ...data } = args;
        await ctx.db.patch(id, data);
    },
});

export const remove = mutation({
    args: { id: v.id("categories") },
    handler: async (ctx, args) => {
        await validateAdmin(ctx);
        await ctx.db.delete(args.id);
    },
});
