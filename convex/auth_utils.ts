import { ConvexError } from "convex/values";
import { QueryCtx, MutationCtx } from "./_generated/server";

/**
 * Admin email sourced from Convex environment variable.
 * Set via: npx convex env set ADMIN_EMAIL "namtechproo@gmail.com"
 *
 * Falls back to hardcoded value only if the env var is not set.
 * This is the SINGLE SOURCE OF TRUTH for the Convex backend.
 * The frontend reads from its own env var: NEXT_PUBLIC_ADMIN_EMAIL
 */
function getAdminEmail(): string {
    // @ts-ignore
    return process.env.ADMIN_EMAIL || "namtechproo@gmail.com";
}

export async function validateAdmin(ctx: QueryCtx | MutationCtx) {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
        // Log para ajudar a debugar no terminal `npx convex dev`
        console.error("[AUTH ERROR] Identity is null. O token JWT está em falta ou é inválido.");
        console.error("Possível causa: Template JWT 'convex' não configurado no Clerk Dashboard.");
        throw new ConvexError("Não autenticado. Por favor, faça login.");
    }

    const adminEmail = getAdminEmail();

    if (identity.email !== adminEmail) {
        console.error(`[AUTH ERROR] Acesso negado para: ${identity.email}`);
        throw new ConvexError("Acesso restrito. Apenas o administrador único tem permissão.");
    }

    return identity;
}
