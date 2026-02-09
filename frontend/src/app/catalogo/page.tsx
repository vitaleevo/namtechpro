import { Navbar } from "@/features/navigation/Navbar";
import { Footer } from "@/features/navigation/Footer";
import { CatalogContent } from "@/features/catalog/CatalogContent";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Catálogo de Equipamentos | Namtech Pro",
    description: "Explore nossa seleção premium de radares, GPS, rádios VHF e soluções de energia renovável para o sector marítimo e industrial.",
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
