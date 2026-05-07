import { internalMutation, mutation } from "./_generated/server";
import { v } from "convex/values";

export const uploadFromLocal = internalMutation({
    args: {
        title: v.string(),
        description: v.string(),
        date: v.string(),
        location: v.string(),
        type: v.string(),
        mainStorageId: v.optional(v.id("_storage")),
        galleryStorageIds: v.array(v.id("_storage")),
    },
    handler: async (ctx, args) => {
        // Check if event already exists
        const existing = await ctx.db
            .query("events")
            .filter((q) => q.eq(q.field("title"), args.title))
            .first();

        const eventData = {
            title: args.title,
            description: args.description,
            date: args.date,
            location: args.location,
            type: args.type,
            imageUrl: "", // Will be populated by getUrl in queries
            storageId: args.mainStorageId,
            galleryStorageIds: args.galleryStorageIds,
            featured: true,
        };

        if (existing) {
            await ctx.db.patch(existing._id, eventData);
            return existing._id;
        } else {
            return await ctx.db.insert("events", eventData);
        }
    },
});
