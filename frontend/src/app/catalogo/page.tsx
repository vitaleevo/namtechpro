import { Navbar } from "@/features/navigation/Navbar";
import { Footer } from "@/features/navigation/Footer";
import { CatalogContent } from "@/features/catalog/CatalogContent";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: "Catálogo de Equipamentos",
    description: "Explore nossa seleção premium de radares, GPS, rádios VHF e soluções de energia renovável para o sector marítimo e industrial.",
    openGraph: {
        title: "Catálogo de Equipamentos | Namtech Pro",
        description: "Explore nossa seleção premium de radares, GPS, rádios VHF e soluções de energia renovável.",
    },
    twitter: {
        card: "summary_large_image",
        title: "Catálogo de Equipamentos | Namtech Pro",
        description: "Radares, GPS, rádios VHF e soluções de energia renovável.",
    },
    alternates: {
        canonical: "/catalogo",
    },
};

// Force dynamic rendering — never try to prerender this page
export const dynamic = "force-dynamic";

export default function CatalogPage() {
    return (
        <main className="min-h-screen bg-white">
            <Navbar />
            <Suspense fallback={<div className="min-h-screen flex items-center justify-center pt-24"><div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div></div>}>
                <CatalogContent />
            </Suspense>
            <Footer />
        </main>
    );
}
