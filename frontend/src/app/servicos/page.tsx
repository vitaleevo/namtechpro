import { Navbar } from "@/features/navigation/Navbar";
import { Footer } from "@/features/navigation/Footer";
import { ServicesContent } from "@/features/services/ServicesContent";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Serviços de Engenharia | Namtech Pro",
    description: "Conheça nossas soluções de suporte técnico, energia limpa, manutenção industrial e formação especializada em Angola.",
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
