import { Navbar } from "@/features/navigation/Navbar";
import { Footer } from "@/features/navigation/Footer";
import { AboutContent } from "@/features/about/AboutContent";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Sobre Nós",
    description: "Conheça a história, missão e valores da Namtech Pro, líder em soluções tecnológicas marítimas e industriais em Angola.",
    openGraph: {
        title: "Sobre Nós | Namtech Pro",
        description: "Conheça a história, missão e valores da Namtech Pro, líder em soluções tecnológicas marítimas e industriais em Angola.",
    },
    twitter: {
        card: "summary_large_image",
        title: "Sobre Nós | Namtech Pro",
        description: "Conheça a história, missão e valores da Namtech Pro.",
    },
    alternates: {
        canonical: "/sobre",
    },
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
