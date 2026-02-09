import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    products: defineTable({
        name: v.string(),
        category: v.string(),
        description: v.string(),
        imageUrl: v.string(),
        status: v.string(), // e.g., "Novo", "Disponível", "Top Vendas"
        brand: v.string(),
        specs: v.array(v.string()),
    }).index("by_category", ["category"]),

    leads: defineTable({
        name: v.string(),
        email: v.string(),
        phone: v.optional(v.string()),
        subject: v.string(),
        message: v.string(),
    }).index("by_email", ["email"]),
});
