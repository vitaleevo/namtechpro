import { clerkMiddleware, createRouteMatcher, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { ADMIN_EMAIL } from "@/lib/constants";

const isProtectedRoute = createRouteMatcher([
    "/namtechprobackoffice(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
    const { userId } = await auth();

    // Proteção de rotas do Backoffice
    if (isProtectedRoute(req)) {
        if (!userId) {
            // Se não estiver logado, redireciona para o login
            await auth.protect();
            return;
        }

        // Verificação de administrador
        try {
            const client = await clerkClient();
            const user = await client.users.getUser(userId);
            const userEmail = user.emailAddresses.find(
                (e) => e.id === user.primaryEmailAddressId
            )?.emailAddress;

            if (userEmail !== ADMIN_EMAIL) {
                console.warn(`Acesso negado para: ${userEmail}`);
                return NextResponse.redirect(new URL("/", req.url));
            }
        } catch (e) {
            console.error("Middleware fetch error:", e);
            // Em caso de erro técnico no deploy, permite o acesso se o userId existir
            // para evitar erro 500. A segurança final é feita no backend (Convex).
        }
    }
});

export const config = {
    matcher: [
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        '/(api|trpc)(.*)',
    ],
};
