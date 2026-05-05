import React, { Suspense } from 'react';
import { Navbar } from "@/features/navigation/Navbar";
import { Footer } from "@/features/navigation/Footer";
import { CatalogContent } from "@/features/catalog/CatalogContent";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Segurança e Navegação | Namtech Pro",
    description: "Sistemas de radar, AIS e equipamentos de segurança marítima Namtech Pro.",
};

export default function SegurancaPage() {
    return (
        <main className="min-h-screen bg-white">
            <Navbar />
            <Suspense fallback={<div className="min-h-screen flex items-center justify-center pt-24"><div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div></div>}>
                <CatalogContent initialCategory="Segurança" />
            </Suspense>
            <Footer />
        </main>
    );
}
