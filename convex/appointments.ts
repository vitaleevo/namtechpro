import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { validateAdmin } from "./auth_utils";
import { rateLimit } from "./rateLimit";

const validServiceTypes = ["Naval Tech", "Energy Systems", "Radio Maintenance", "GPS Installation", "Radar System"];
const validLocations = ["Namibe", "Luanda", "Lobito"];

function isValidTime(time: string): boolean {
    const regex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    return regex.test(time);
}

function isValidDate(date: string): boolean {
    const d = new Date(date);
    return d instanceof Date && !isNaN(d.getTime());
}

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
        await rateLimit(ctx, "createAppointment");
        
        if (args.customerName.length < 2) {
            throw new Error("Nome deve ter pelo menos 2 caracteres");
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(args.email)) {
            throw new Error("Email inválido");
        }
        
        if (args.phone.length < 9) {
            throw new Error("Telefone deve ter pelo menos 9 dígitos");
        }
        
        if (!validServiceTypes.includes(args.serviceType)) {
            throw new Error("Tipo de serviço inválido");
        }
        
        if (!validLocations.includes(args.location)) {
            throw new Error("Localização inválida");
        }
        
        if (!isValidDate(args.date)) {
            throw new Error("Data inválida");
        }
        
        if (!isValidTime(args.time)) {
            throw new Error("Hora inválida (formato HH:MM)");
        }
        
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
