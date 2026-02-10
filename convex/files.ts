import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { validateAdmin } from "./auth_utils";

/**
 * Generate a signed upload URL.
 * SECURITY: Only authenticated admins can generate upload URLs
 * to prevent unauthorized file uploads to Convex storage.
 */
export const generateUploadUrl = mutation(async (ctx) => {
    await validateAdmin(ctx);
    return await ctx.storage.generateUploadUrl();
});

export const getUrl = query({
    args: { storageId: v.id("_storage") },
    handler: async (ctx, args) => {
        return await ctx.storage.getUrl(args.storageId);
    },
});
