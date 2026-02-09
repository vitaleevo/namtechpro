import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    products: defineTable({
        name: v.string(),
        category: v.string(),
        description: v.string(),
        imageUrl: v.string(),
        storageId: v.optional(v.id("_storage")),
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

    events: defineTable({
        title: v.string(),
        description: v.string(),
        date: v.string(), // ISO string date
        time: v.optional(v.string()), // HH:mm
        location: v.string(),
        type: v.string(), // 'Event', 'Project', 'Community'
        imageUrl: v.string(),
        storageId: v.optional(v.id("_storage")),
        featured: v.boolean(),
        content: v.optional(v.string()), // Detailed content
    }).index("by_date", ["date"]),

    blog_posts: defineTable({
        title: v.string(),
        slug: v.string(),
        excerpt: v.string(),
        content: v.string(),
        author: v.string(),
        publishedAt: v.string(), // ISO string date
        imageUrl: v.string(),
        storageId: v.optional(v.id("_storage")),
        category: v.string(),
        readTime: v.string(), // e.g., "5 min read"
    }).index("by_published", ["publishedAt"]).index("by_category", ["category"]),

    appointments: defineTable({
        customerName: v.string(),
        email: v.string(),
        phone: v.string(),
        serviceType: v.string(), // e.g., "Naval Tech", "Solar Audit", "Radio Maintenance"
        location: v.string(), // Namibe, Luanda, Lobito
        date: v.string(), // ISO string
        time: v.string(), // HH:mm
        message: v.optional(v.string()),
        status: v.string(), // "pending", "confirmed", "completed", "cancelled"
        createdAt: v.string(),
    }).index("by_date", ["date"]).index("by_status", ["status"]),

    categories: defineTable({
        name: v.string(),
        slug: v.string(),
        type: v.string(), // 'product' or 'blog'
        description: v.optional(v.string()),
    }).index("by_type", ["type"]).index("by_slug", ["slug"]),

    chat_sessions: defineTable({
        status: v.string(), // "bot", "human", "closed"
        userName: v.optional(v.string()),
        lastMessageAt: v.number(),
    }).index("by_status", ["status"]),

    chat_messages: defineTable({
        sessionId: v.id("chat_sessions"),
        sender: v.string(), // "user", "bot", "admin"
        text: v.string(),
        options: v.optional(v.array(v.string())), // Quick replies
        createdAt: v.number(),
    }).index("by_session", ["sessionId"]),
});
