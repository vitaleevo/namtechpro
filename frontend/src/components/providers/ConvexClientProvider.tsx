"use client";

import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ConvexReactClient } from "convex/react";
import { ReactNode, useMemo } from "react";

// Lazy singleton — only created once, and only when the provider mounts
// This avoids "No address provided" errors during static prerendering
let convexSingleton: ConvexReactClient | null = null;

function getConvexClient(): ConvexReactClient {
    const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
    
    if (!convexSingleton) {
        // If the URL is missing during build/prerendering, provide a dummy one
        // so the build doesn't crash. Real URL must be in Vercel env vars.
        const effectiveUrl = convexUrl || "https://dummy-for-build.convex.cloud";
        
        if (!convexUrl && typeof window !== 'undefined') {
            console.warn("NEXT_PUBLIC_CONVEX_URL is missing in browser environment.");
        }
        
        convexSingleton = new ConvexReactClient(effectiveUrl);
    }
    return convexSingleton;
}

export function ConvexClientProvider({ children }: { children: ReactNode }) {
    // Avoid creating a real client during SSR if we don't have a URL
    // but we need to return the provider to keep the tree consistent.
    const convex = useMemo(() => getConvexClient(), []);

    const clerkKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ?? "";

    return (
        <ClerkProvider publishableKey={clerkKey}>
            <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
                {children}
            </ConvexProviderWithClerk>
        </ClerkProvider>
    );
}
