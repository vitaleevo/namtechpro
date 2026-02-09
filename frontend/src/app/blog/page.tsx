import { Navbar } from "@/features/navigation/Navbar";
import { Footer } from "@/features/navigation/Footer";
import { BlogList } from "@/features/blog/BlogList";

import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Blog & Notícias | Namtech Pro',
    description: 'Fique atualizado com as últimas novidades sobre tecnologia marítima, energia e economia azul em Angola.',
};

export default function BlogPage() {
    return (
        <main className="min-h-screen bg-white">
            <Navbar />
            <BlogList />
            <Footer />
        </main>
    );
}
