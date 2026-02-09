import { Navbar } from "@/features/navigation/Navbar";
import { Footer } from "@/features/navigation/Footer";
import { AboutContent } from "@/features/about/AboutContent";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Sobre Nós | Namtech Pro",
    description: "Conheça a história, missão e valores da Namtech Pro, líder em soluções tecnológicas marítimas e industriais em Angola.",
};

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-white">
            <Navbar />
            <AboutContent />

            <Footer />
        </main>
    );
}
