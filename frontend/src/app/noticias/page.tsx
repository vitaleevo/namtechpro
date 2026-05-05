import { Navbar } from "@/features/navigation/Navbar";
import { Footer } from "@/features/navigation/Footer";
import { PageHero } from "@/components/ui/PageHero";

export const metadata = {
  title: "Notícias | Namtech Pro",
  description: "Últimas notícias e novidades da Namtech Pro e do setor marítimo.",
};

export default function NoticiasPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <PageHero
        title="Notícias"
        subtitle="Acompanhe as últimas novidades, lançamentos e atualizações do setor marítimo e da nossa empresa."
        image="/images/decorativas/lighthouse-cape.jpg"
      />
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 text-center">
          <h2 className="text-2xl font-bold text-primary mb-4">Página em Construção</h2>
          <p className="text-slate-600">Estamos a preparar a secção de notícias.</p>
        </div>
      </div>
      <Footer />
    </main>
  );
}
