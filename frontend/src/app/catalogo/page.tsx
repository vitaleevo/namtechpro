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

type Props = {
    searchParams: { [key: string]: string | string[] | undefined };
};

export default function CatalogPage({ searchParams }: Props) {
    // Acessa o searchParam através de prop e não hook (evita erro no build)
    const categoryQuery = typeof searchParams.category === 'string' ? searchParams.category : undefined;

    return (
        <main className="min-h-screen bg-white">
            <Navbar />
            <CatalogContent initialCategory={categoryQuery} />
            <Footer />
        </main>
    );
}
