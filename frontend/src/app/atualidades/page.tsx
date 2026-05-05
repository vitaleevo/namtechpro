"use client";

import React from 'react';
import { Navbar } from "@/features/navigation/Navbar";
import { Footer } from "@/features/navigation/Footer";
import { BlogList } from "@/features/blog/BlogList";

export default function AtualidadesPage() {
    return (
        <main className="min-h-screen bg-white">
            <Navbar />
            <div className="pt-20">
                <BlogList />
            </div>
            <Footer />
        </main>
    );
}
