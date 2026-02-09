import { query, mutation } from "./_generated/server";
import { v, ConvexError } from "convex/values";
import { validateAdmin } from "./auth_utils";

export const list = query({
    args: {},
    handler: async (ctx) => {
        const products = await ctx.db.query("products").collect();
        return Promise.all(
            products.map(async (p) => {
                const storageUrl = p.storageId ? await ctx.storage.getUrl(p.storageId) : null;
                return {
                    ...p,
                    imageUrl: storageUrl || p.imageUrl || 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae'
                };
            })
        );
    },
});

export const getById = query({
    args: { id: v.id("products") },
    handler: async (ctx, args) => {
        const product = await ctx.db.get(args.id);
        if (!product) return null;
        const storageUrl = product.storageId ? await ctx.storage.getUrl(product.storageId) : null;
        return {
            ...product,
            imageUrl: storageUrl || product.imageUrl || 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae'
        };
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
        storageId: v.optional(v.id("_storage")),
    },
    handler: async (ctx, args) => {
        await validateAdmin(ctx);
        return await ctx.db.insert("products", args);
    },
});
export const deleteProduct = mutation({
    args: { id: v.id("products") },
    handler: async (ctx, args) => {
        await validateAdmin(ctx);
        await ctx.db.delete(args.id);
    },
});

export const updateProduct = mutation({
    args: {
        id: v.id("products"),
        name: v.string(),
        category: v.string(),
        description: v.string(),
        imageUrl: v.string(),
        status: v.string(),
        brand: v.string(),
        specs: v.array(v.string()),
        storageId: v.optional(v.id("_storage")),
    },
    handler: async (ctx, args) => {
        await validateAdmin(ctx);
        const { id, ...data } = args;
        await ctx.db.patch(id, data);
    },
});
export const generateUploadUrl = mutation(async (ctx) => {
    await validateAdmin(ctx);
    return await ctx.storage.generateUploadUrl();
});

export const getStats = query({
    args: {},
    handler: async (ctx) => {
        await validateAdmin(ctx);
        const products = await ctx.db.query("products").collect();
        const leads = await ctx.db.query("leads").collect();
        const appointments = await ctx.db.query("appointments").collect();
        const events = await ctx.db.query("events").collect();

        const registeredCategories = await ctx.db
            .query("categories")
            .withIndex("by_type", (q) => q.eq("type", "product"))
            .collect();

        const categoryCounts = registeredCategories.map(cat => ({
            name: cat.name,
            count: products.filter(p => p.category === cat.name).length
        }));

        // Fallback for products in categories not explicitly in the categories table
        const productCategories = new Set(products.map(p => p.category));
        productCategories.forEach(catName => {
            if (!registeredCategories.find(rc => rc.name === catName)) {
                categoryCounts.push({
                    name: catName,
                    count: products.filter(p => p.category === catName).length
                });
            }
        });

        return {
            totalProducts: products.length,
            totalLeads: leads.length,
            totalAppointments: appointments.length,
            totalEvents: events.length,
            categoryCounts
        };
    },
});
