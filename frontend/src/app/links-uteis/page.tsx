import { Navbar } from "@/features/navigation/Navbar";
import { Footer } from "@/features/navigation/Footer";
import { PageHero } from "@/components/ui/PageHero";

export const metadata = {
  title: "Links Úteis | Namtech Pro",
  description: "Organismos públicos e links úteis do setor marítimo recomendados pela Namtech Pro.",
};

export default function LinksUteisPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <PageHero
        title="Links Úteis"
        subtitle="Acesso rápido a organismos públicos e recursos úteis do setor marítimo."
        image="/images/decorativas/lighthouse-storm.jpg"
      />
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 text-center">
          <h2 className="text-2xl font-bold text-primary mb-4">Página em Construção</h2>
          <p className="text-slate-600">Estamos a preparar a nossa secção de links úteis e entidades.</p>
        </div>
      </div>
      <Footer />
    </main>
  );
}
