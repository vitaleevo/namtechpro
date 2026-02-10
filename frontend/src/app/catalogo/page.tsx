import { Navbar } from "@/features/navigation/Navbar";
import { Footer } from "@/features/navigation/Footer";
import { CatalogContent } from "@/features/catalog/CatalogContent";
import { Metadata } from "next";

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

export default function CatalogPage() {
    return (
        <main className="min-h-screen bg-white">
            <Navbar />
            <CatalogContent />
            <Footer />
        </main>
    );
}
