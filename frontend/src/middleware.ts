import { clerkMiddleware, createRouteMatcher, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { ADMIN_EMAIL } from "@/lib/constants";

const isProtectedRoute = createRouteMatcher([
    "/namtechprobackoffice(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
    if (isProtectedRoute(req)) {
        try {
            const { userId } = await auth();

            if (!userId) {
                await auth.protect();
                return;
            }

            // Fetch user details from Clerk to verify email securely
            const client = await clerkClient();
            const user = await client.users.getUser(userId);

            if (!user) {
                return NextResponse.redirect(new URL("/", req.url));
            }

            const userEmail = user.emailAddresses.find(
                (e) => e.id === user.primaryEmailAddressId
            )?.emailAddress;

            if (userEmail !== ADMIN_EMAIL) {
                console.warn(`Acesso negado para: ${userEmail}`);
                return NextResponse.redirect(new URL("/", req.url));
            }
        } catch (error) {
            console.error("Middleware Auth Error:", error);
            // Redireciona para home em vez de dar 500 Internal Server Error
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
