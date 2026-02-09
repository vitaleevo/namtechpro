import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { validateAdmin } from "./auth_utils";

/**
 * Create a new appointment/scheduling request.
 */
export const createAppointment = mutation({
    args: {
        customerName: v.string(),
        email: v.string(),
        phone: v.string(),
        serviceType: v.string(),
        location: v.string(),
        date: v.string(),
        time: v.string(),
        message: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const appointmentId = await ctx.db.insert("appointments", {
            ...args,
            status: "pending",
            createdAt: new Date().toISOString(),
        });
        return appointmentId;
    },
});

/**
 * List all appointments (useful for backoffice).
 */
export const listAppointments = query({
    args: {},
    handler: async (ctx) => {
        await validateAdmin(ctx);
        return await ctx.db.query("appointments").order("desc").collect();
    },
});

/**
 * Update appointment status.
 */
export const updateStatus = mutation({
    args: {
        id: v.id("appointments"),
        status: v.string(), // "pending", "confirmed", "completed", "cancelled"
    },
    handler: async (ctx, args) => {
        await validateAdmin(ctx);
        await ctx.db.patch(args.id, { status: args.status });
    },
});

export const remove = mutation({
    args: { id: v.id("appointments") },
    handler: async (ctx, args) => {
        await validateAdmin(ctx);
        await ctx.db.delete(args.id);
    },
});
