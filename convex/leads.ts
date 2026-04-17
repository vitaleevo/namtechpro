import { mutation, query } from "./_generated/server";
import { v, ConvexError } from "convex/values";
import { validateAdmin } from "./auth_utils";
import { rateLimit } from "./rateLimit";

export const createLead = mutation({
    args: {
        name: v.string(),
        email: v.string(),
        phone: v.optional(v.string()),
        subject: v.string(),
        message: v.string(),
    },
    handler: async (ctx, args) => {
        await rateLimit(ctx, "createLead");
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(args.email)) {
            throw new ConvexError("Email inválido");
        }
        
        if (args.message.length < 10) {
            throw new ConvexError("Mensagem deve ter pelo menos 10 caracteres");
        }
        
        return await ctx.db.insert("leads", {
            ...args,
        });
    },
});

export const listLeads = query({
    args: {},
    handler: async (ctx) => {
        await validateAdmin(ctx);
        return await ctx.db.query("leads").order("desc").collect();
    },
});

export const removeLead = mutation({
    args: { id: v.id("leads") },
    handler: async (ctx, args) => {
        await validateAdmin(ctx);
        await ctx.db.delete(args.id);
    },
});
