import React, { Suspense } from 'react';
import { Navbar } from "@/features/navigation/Navbar";
import { Footer } from "@/features/navigation/Footer";
import { CatalogContent } from "@/features/catalog/CatalogContent";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Comunicações Marítimas | Namtech Pro",
    description: "Sistemas de rádio VHF, UHF, comunicações via satélite e GMDSS em Angola.",
};

export default function ComunicacoesPage() {
    return (
        <main className="min-h-screen bg-white">
            <Navbar />
            <Suspense fallback={<div className="min-h-screen flex items-center justify-center pt-24"><div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div></div>}>
                <CatalogContent initialCategory="Comunicação" />
            </Suspense>
            <Footer />
        </main>
    );
}
