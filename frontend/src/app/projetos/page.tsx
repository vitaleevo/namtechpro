import { Navbar } from "@/features/navigation/Navbar";
import { Footer } from "@/features/navigation/Footer";
import { PageHero } from "@/components/ui/PageHero";

export const metadata = {
  title: "Projetos | Namtech Pro",
  description: "Conheça os projetos e instalações realizadas pela Namtech Pro.",
};

export default function ProjetosPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <PageHero
        title="Projetos"
        subtitle="Conheça as nossas instalações e os projetos que desenvolvemos para os nossos clientes no setor marítimo."
        image="/images/decorativas/oil-platform.jpg"
      />
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 text-center">
          <h2 className="text-2xl font-bold text-primary mb-4">Página em Construção</h2>
          <p className="text-slate-600">Estamos a preparar informações detalhadas sobre os nossos projetos.</p>
        </div>
      </div>
      <Footer />
    </main>
  );
}
