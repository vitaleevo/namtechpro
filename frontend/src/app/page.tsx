import { Navbar } from '@/features/navigation/Navbar';
import { Footer } from '@/features/navigation/Footer';
import { HomeClient } from '@/features/home/HomeClient';
import { staticEvents } from '@/features/events/staticEvents';

export default function Home() {
  // Use static events data to avoid 'fs' usage that causes large bundle sizes on Vercel
  const featuredEvents = staticEvents.slice(0, 2);

  return (
    <main className="min-h-screen bg-white text-primary font-sans">
      <Navbar />
      <HomeClient featuredEvents={featuredEvents} />
      <Footer />
    </main>
  );
}
