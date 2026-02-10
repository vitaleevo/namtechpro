import { ConvexError } from "convex/values";
import { QueryCtx, MutationCtx } from "./_generated/server";

// NOTE: Convex runs on its own server runtime and cannot import from the frontend.
// If you change this email, also update frontend/src/lib/constants.ts
export const ADMIN_EMAIL = "namtechproo@gmail.com";

export async function validateAdmin(ctx: QueryCtx | MutationCtx) {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
        // Log para ajudar a debugar no terminal `npx convex dev`
        console.error("[AUTH ERROR] Identity is null. O token JWT está em falta ou é inválido.");
        console.error("Possível causa: Template JWT 'convex' não configurado no Clerk Dashboard.");
        throw new ConvexError("Não autenticado. Por favor, faça login.");
    }

    if (identity.email !== ADMIN_EMAIL) {
        console.error(`[AUTH ERROR] Acesso negado para: ${identity.email}`);
        throw new ConvexError("Acesso restrito. Apenas o administrador único tem permissão.");
    }

    return identity;
}
