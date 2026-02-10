import { Navbar } from "@/features/navigation/Navbar";
import { Footer } from "@/features/navigation/Footer";
import { SupportContent } from "@/features/services/SupportContent";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Assistência 24/7",
    description: "Serviço de suporte técnico de emergência para sistemas de navegação, rádio e energia em Angola.",
    openGraph: {
        title: "Assistência 24/7 | Namtech Pro",
        description: "Serviço de suporte técnico de emergência para sistemas de navegação, rádio e energia em Angola.",
    },
    alternates: {
        canonical: "/servicos/suporte",
    },
};

export default function SupportPage() {
    return (
        <main className="min-h-screen bg-white">
            <Navbar />
            <SupportContent />
            <Footer />
        </main>
    );
}
