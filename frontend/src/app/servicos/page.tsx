import { Navbar } from "@/features/navigation/Navbar";
import { Footer } from "@/features/navigation/Footer";
import { ServicesContent } from "@/features/services/ServicesContent";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Serviços de Engenharia",
    description: "Conheça nossas soluções de suporte técnico, energia limpa, manutenção industrial e formação especializada em Angola.",
    openGraph: {
        title: "Serviços de Engenharia | Namtech Pro",
        description: "Conheça nossas soluções de suporte técnico, energia limpa, manutenção industrial e formação especializada em Angola.",
    },
    twitter: {
        card: "summary_large_image",
        title: "Serviços de Engenharia | Namtech Pro",
        description: "Soluções de suporte técnico e energia limpa em Angola.",
    },
    alternates: {
        canonical: "/servicos",
    },
};

export default function ServicesPage() {
    return (
        <main className="min-h-screen bg-white">
            <Navbar />
            <ServicesContent />
            <Footer />
        </main>
    );
}
