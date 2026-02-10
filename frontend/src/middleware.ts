import { clerkMiddleware, createRouteMatcher, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { ADMIN_EMAIL } from "@/lib/constants";

const isProtectedRoute = createRouteMatcher([
    "/namtechprobackoffice(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
    if (isProtectedRoute(req)) {
        const { userId } = await auth();

        if (!userId) {
            await auth.protect();
            return;
        }

        try {
            // Fetch user details from Clerk to verify email securely
            const client = await clerkClient();
            const user = await client.users.getUser(userId);

            if (!user) {
                console.error("Usuário não encontrado no Clerk");
                return NextResponse.redirect(new URL("/", req.url));
            }

            const userEmail = user.emailAddresses.find(
                (e) => e.id === user.primaryEmailAddressId
            )?.emailAddress;

            if (userEmail !== ADMIN_EMAIL) {
                console.warn(`Tentativa de acesso não autorizado: ${userEmail}`);
                return NextResponse.redirect(new URL("/", req.url));
            }
        } catch (error) {
            console.error("Erro no Clerk Middleware:", error);
            // Em caso de erro de rede ou API do Clerk, redireciona para a home por segurança
            return NextResponse.redirect(new URL("/", req.url));
        }
    }
});

export const config = {
    matcher: [
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        '/(api|trpc)(.*)',
    ],
};
