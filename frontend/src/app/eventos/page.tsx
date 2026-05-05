import fs from 'fs';
import path from 'path';
import { Navbar } from "@/features/navigation/Navbar";
import { Footer } from "@/features/navigation/Footer";
import { EventsContent } from "@/features/events/EventsContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Eventos & Projetos",
    description: "Acompanhe os projetos e eventos mais recentes da Namtech Pro. Inovação e tecnologia marítima em ação.",
    openGraph: {
        title: "Eventos & Projetos | Namtech Pro",
        description: "Acompanhe os projetos e eventos mais recentes da Namtech Pro. Inovação e tecnologia marítima em ação.",
    },
    twitter: {
        card: "summary_large_image",
        title: "Eventos & Projetos | Namtech Pro",
        description: "Projetos e eventos mais recentes da Namtech Pro.",
    },
    alternates: {
        canonical: "/eventos",
    },
};

export default function EventsPage() {
    const folders = [
        { id: 'FILDA 2025', title: 'FILDA 2025 - Feira Internacional de Luanda', date: 'Julho 2025', location: 'Luanda', type: 'Event', dir: 'eventos' },
        { id: 'FEIRA DA CIDADE de MOÇAMEDES 2025', title: 'Feira da Cidade de Moçâmedes 2025', date: 'Março 2025', location: 'Namibe', type: 'Event', dir: 'eventos' },
        { id: 'FEIRA DO TOMATE 2025 MOÇAMEDES', title: 'Feira do Tomate 2025', date: 'Junho 2025', location: 'Namibe', type: 'Event', dir: 'eventos' },
        { id: 'FEIRA DO TURISMO 2024 cidade MOÇAMEDES', title: 'Feira do Turismo 2024', date: 'Outubro 2024', location: 'Namibe', type: 'Event', dir: 'eventos' },
        { id: 'SEMI RIGIDO AFRICAN PARKS', title: 'Projeto African Parks - Manutenção Semi-Rígidos', date: 'Abril 2025', location: 'Parque Nacional de Iona', type: 'Project', dir: 'trabalhos' },
    ];

    const eventsData = folders.map(folder => {
        const folderPath = path.join(process.cwd(), 'public/images', folder.dir, folder.id);
        let images: string[] = [];
        let videos: string[] = [];
        
        try {
            if (fs.existsSync(folderPath)) {
                const files = fs.readdirSync(folderPath);
                images = files.filter(f => f.toLowerCase().endsWith('.jpg') || f.toLowerCase().endsWith('.png') || f.toLowerCase().endsWith('.webp')).map(f => `/images/${folder.dir}/${folder.id}/${f}`);
                videos = files.filter(f => f.toLowerCase().endsWith('.mp4')).map(f => `/images/${folder.dir}/${folder.id}/${f}`);
            }
        } catch (e) {
            console.error("Error reading event folder:", folderPath);
        }
        
        return {
            ...folder,
            images,
            videos
        };
    }).filter(e => e.images.length > 0 || e.videos.length > 0);

    return (
        <main className="min-h-screen bg-white">
            <Navbar />
            <EventsContent featuredEvents={eventsData} />
            <Footer />
        </main>
    );
}
