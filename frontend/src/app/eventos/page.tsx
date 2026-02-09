import { Navbar } from "@/features/navigation/Navbar";
import { Footer } from "@/features/navigation/Footer";
import { EventsContent } from "@/features/events/EventsContent";

import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Eventos & Projetos | Namtech Pro',
    description: 'Acompanhe os projetos e eventos mais recentes da Namtech Pro. Inovação e tecnologia marítima em ação.',
};

export default function EventsPage() {
    return (
        <main className="min-h-screen bg-white">
            <Navbar />
            <EventsContent />
            <Footer />
        </main>
    );
}
