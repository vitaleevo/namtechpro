import { Navbar } from "@/features/navigation/Navbar";
import { Footer } from "@/features/navigation/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Termos e Condições",
    description: "Consulte os termos e condições de uso do site e serviços da Namtech Pro.",
    alternates: {
        canonical: "/termos",
    },
};

export default function TermsPage() {
    return (
        <main className="min-h-screen bg-slate-50 flex flex-col">
            <Navbar />
            <div className="flex-1 max-w-4xl mx-auto px-4 py-32">
                <h1 className="text-4xl font-black text-primary mb-8">Termos e Condições</h1>
                <div className="prose prose-slate bg-white p-12 rounded-[2.5rem] shadow-xl border border-slate-100">
                    <p className="mb-6">Última atualização: Janeiro 2025</p>
                    <h2 className="text-xl font-bold mb-4">1. Aceitação dos Termos</h2>
                    <p className="mb-6 text-slate-600">Ao aceder ao site da Namtech Pro, concorda em cumprir estes termos de serviço, todas as leis e regulamentos aplicáveis.</p>
                    <h2 className="text-xl font-bold mb-4">2. Uso de Licença</h2>
                    <p className="mb-6 text-slate-600">É concedida permissão para descarregar temporariamente uma cópia dos materiais no site da Namtech Pro apenas para visualização pessoal e não comercial.</p>
                    <h2 className="text-xl font-bold mb-4">3. Isenção de Responsabilidade</h2>
                    <p className="mb-6 text-slate-600">Os materiais no site da Namtech Pro são fornecidos &apos;como estão&apos;. A Namtech Pro não oferece garantias, expressas ou implícitas.</p>
                </div>
            </div>
            <Footer />
        </main>
    );
}
