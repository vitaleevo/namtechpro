import { Navbar } from "@/features/navigation/Navbar";
import { Footer } from "@/features/navigation/Footer";
import { CleanEnergyContent } from "@/features/services/CleanEnergyContent";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Energia Limpa",
    description: "Soluções de energia renovável e sustentabilidade para frotas marítimas e infraestruturas industriais em Angola.",
    openGraph: {
        title: "Energia Limpa | Namtech Pro",
        description: "Soluções de energia renovável e sustentabilidade para frotas marítimas e infraestruturas industriais em Angola.",
    },
    alternates: {
        canonical: "/servicos/energia-limpa",
    },
};

export default function CleanEnergyPage() {
    return (
        <main className="min-h-screen bg-white">
            <Navbar />
            <CleanEnergyContent />
            <Footer />
        </main>
    );
}
