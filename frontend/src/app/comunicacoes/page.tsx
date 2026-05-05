"use client";

import React from 'react';
import { Navbar } from "@/features/navigation/Navbar";
import { Footer } from "@/features/navigation/Footer";
import { CatalogContent } from "@/features/catalog/CatalogContent";

export default function ComunicacoesPage() {
    return (
        <main className="min-h-screen bg-white">
            <Navbar />
            <CatalogContent initialCategory="Comunicação" />
            <Footer />
        </main>
    );
}
