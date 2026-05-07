import fs from 'fs';
import path from 'path';
import { Navbar } from '@/features/navigation/Navbar';
import { Footer } from '@/features/navigation/Footer';
import { HomeClient } from '@/features/home/HomeClient';
import type { EventGallery } from '@/features/events/FeaturedEvents';

export default function Home() {
  // Real event data fetching (Server Side)
  const folders = [
    { id: 'FILDA 2025', title: 'FILDA 2025 - Feira Internacional de Luanda', date: 'Julho 2025', location: 'Luanda', dir: 'eventos' },
    { id: 'FEIRA DA CIDADE de MOÇAMEDES 2025', title: 'Feira da Cidade de Moçâmedes 2025', date: 'Março 2025', location: 'Namibe', dir: 'eventos' },
  ];

  const featuredEvents: EventGallery[] = folders.map(folder => {
    const folderPath = path.join(process.cwd(), 'public/images', folder.dir, folder.id);
    let images: string[] = [];
    let videos: string[] = [];
    
    try {
      if (fs.existsSync(folderPath)) {
        const files = fs.readdirSync(folderPath);
        images = files
          .filter(f => f.toLowerCase().endsWith('.jpg') || f.toLowerCase().endsWith('.png') || f.toLowerCase().endsWith('.webp'))
          .map(f => `/images/${folder.dir}/${folder.id}/${f}`);
        videos = files
          .filter(f => f.toLowerCase().endsWith('.mp4'))
          .map(f => `/images/${folder.dir}/${folder.id}/${f}`);
      }
    } catch (e) {
      console.error("Error reading event folder:", folderPath);
    }
    
    return {
      id: folder.id,
      title: folder.title,
      date: folder.date,
      location: folder.location,
      images,
      videos
    };
  }).filter(e => e.images.length > 0);

  return (
    <main className="min-h-screen bg-white text-primary font-sans">
      <Navbar />
      <HomeClient featuredEvents={featuredEvents} />
      <Footer />
    </main>
  );
}
