import { Navbar } from "@/features/navigation/Navbar";
import { Footer } from "@/features/navigation/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Política de Privacidade",
    description: "Consulte a política de privacidade e tratamento de dados da Namtech Pro.",
    alternates: {
        canonical: "/privacidade",
    },
};

export default function PrivacyPage() {
    return (
        <main className="min-h-screen bg-slate-50 flex flex-col">
            <Navbar />
            <div className="flex-1 max-w-4xl mx-auto px-4 py-32">
                <h1 className="text-4xl font-black text-primary mb-8">Política de Privacidade</h1>
                <div className="prose prose-slate bg-white p-12 rounded-[2.5rem] shadow-xl border border-slate-100">
                    <p className="mb-6">Última atualização: Janeiro 2025</p>
                    <h2 className="text-xl font-bold mb-4">1. Recolha de Dados</h2>
                    <p className="mb-6 text-slate-600">A sua privacidade é importante para nós. É política da Namtech Pro respeitar a sua privacidade em relação a qualquer informação sua que possamos recolher.</p>
                    <h2 className="text-xl font-bold mb-4">2. Uso de Informações</h2>
                    <p className="mb-6 text-slate-600">Solicitamos informações pessoais apenas quando realmente precisamos delas para lhe fornecer um serviço, como o formulário de contacto.</p>
                    <h2 className="text-xl font-bold mb-4">3. Retenção de Dados</h2>
                    <p className="mb-6 text-slate-600">Apenas retemos as informações recolhidas pelo tempo necessário para fornecer o serviço solicitado.</p>
                </div>
            </div>
            <Footer />
        </main>
    );
}
