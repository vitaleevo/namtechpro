import { query } from "./_generated/server";

export const getProductCategories = query({
    args: {},
    handler: async (ctx) => {
        const products = await ctx.db.query("products").collect();
        const categoryMap = new Map<string, { name: string; products: { name: string; brand: string; description: string; imageUrl: string; status: string }[] }>();

        for (const product of products) {
            const existing = categoryMap.get(product.category);
            const storageUrl = product.storageId ? await ctx.storage.getUrl(product.storageId) : null;

            const productEntry = {
                name: product.name,
                brand: product.brand,
                description: product.description,
                imageUrl: storageUrl || product.imageUrl,
                status: product.status,
            };

            if (existing) {
                existing.products.push(productEntry);
            } else {
                categoryMap.set(product.category, {
                    name: product.category,
                    products: [productEntry],
                });
            }
        }

        return Array.from(categoryMap.values());
    },
});

export const getServices = query({
    args: {},
    handler: async (ctx) => {
        const services = await ctx.db.query("services").collect();
        return services.map(s => ({
            title: s.title,
            slug: s.slug,
            description: s.description,
            icon: s.icon,
            imageUrl: s.imageUrl,
            features: s.features,
        }));
    },
});

export const getEvents = query({
    args: {},
    handler: async (ctx) => {
        const events = await ctx.db.query("events").collect();
        return events
            .filter(e => e.featured)
            .slice(0, 5)
            .map(e => ({
                title: e.title,
                description: e.description,
                date: e.date,
                location: e.location,
                type: e.type,
                imageUrl: e.imageUrl,
            }));
    },
});
