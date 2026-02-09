import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("products").collect();
    },
});

export const getByCategory = query({
    args: { category: v.string() },
    handler: async (ctx, args) => {
        if (args.category === "Todos") {
            return await ctx.db.query("products").collect();
        }
        return await ctx.db
            .query("products")
            .withIndex("by_category", (q) => q.eq("category", args.category))
            .collect();
    },
});

export const addProduct = mutation({
    args: {
        name: v.string(),
        category: v.string(),
        description: v.string(),
        imageUrl: v.string(),
        status: v.string(),
        brand: v.string(),
        specs: v.array(v.string()),
    },
    handler: async (ctx, args) => {
        return await ctx.db.insert("products", args);
    },
});
