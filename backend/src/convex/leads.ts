import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createLead = mutation({
    args: {
        name: v.string(),
        email: v.string(),
        phone: v.optional(v.string()),
        subject: v.string(),
        message: v.string(),
    },
    handler: async (ctx, args) => {
        return await ctx.db.insert("leads", {
            ...args,
        });
    },
});

export const listLeads = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("leads").collect();
    },
});
