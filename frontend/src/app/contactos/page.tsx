import { Navbar } from "@/features/navigation/Navbar";
import { Footer } from "@/features/navigation/Footer";
import { ContactContent } from "@/features/contact/ContactContent";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: "Contactos | Namtech Pro",
    description: "Entre em contacto com a equipa técnica da Namtech Pro. Suporte técnico marítimo e industrial 24/7 em Angola.",
};

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-white">
            <Navbar />
            <Suspense fallback={<div className="min-h-screen flex items-center justify-center pt-24"><div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div></div>}>
                <ContactContent />
            </Suspense>
            <Footer />
        </main>
    );
}
