import { Navbar } from "@/features/navigation/Navbar";
import { Footer } from "@/features/navigation/Footer";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface PageProps {
    params: Promise<{ slug: string }>;
}

const servicesData: Record<string, {
    title: string;
    description: string;
    fullContent: string;
    features: string[];
}> = {
    'clean-energy': {
        title: 'Energia Limpa',
        description: 'Transformamos a matriz energética da sua frota ou infraestrutura portuária com soluções solares e híbridas.',
        fullContent: 'A Namtech Pro fornece soluções completas de energia renovável para operações marítimas e terrestres. Os nossos sistemas solares fotovoltaicos, bancos de baterias de lítio e soluções híbridas garantem autonomia energética para embarcações, terminais portuários e infraestruturas industriais ao longo de todo o litoral angolano.',
        features: ['Solar Fotovoltaico', 'Sistemas Híbridos', 'Bancos de Baterias', 'Eólica Marítima'],
    },
    'support-247': {
        title: 'Suporte Técnico 24/7',
        description: 'Assistência técnica de emergência para sistemas críticos de navegação e rádio em todo o litoral angolano.',
        fullContent: 'Com uma equipa de piquete disponível 24 horas por dia, 7 dias por semana, garantimos intervenção rápida em sistemas críticos de navegação, radiocomunicações e energia. A nossa cobertura abrange todo o litoral de Angola, desde o Namibe até ao Soyo.',
        features: ['Piquete 24/7', 'Diagnóstico Remoto', 'Mobilização Rápida', 'Peças Críticas em Stock'],
    },
    'maintenance': {
        title: 'Manutenção Industrial',
        description: 'Planos de manutenção preventiva e corretiva para equipamentos de precisão e eletrónica de potência.',
        fullContent: 'Oferecemos contratos de manutenção anuais com planos personalizados para cada tipo de embarcação ou instalação. A calibração certificada dos equipamentos e os relatórios técnicos detalhados garantem que os seus sistemas operam sempre com máxima eficiência.',
        features: ['Manutenção Preventiva', 'Contratos Anuais', 'Calibração Certificada', 'Relatórios Técnicos'],
    },
    'satellite': {
        title: 'Conetividade Satélite',
        description: 'Integração de sistemas VSAT e Iridium para comunicação ininterrupta em alto mar.',
        fullContent: 'Fornecemos e instalamos soluções de comunicação via satélite das marcas Iridium, Thuraya e Inmarsat. Internet de alta velocidade VSAT para embarcações e plataformas offshore, garantindo voz e dados em qualquer ponto do Atlântico.',
        features: ['VSAT Marítimo', 'Iridium / Thuraya', 'Internet a Bordo', 'Voz via Satélite'],
    },
    'hydrographic': {
        title: 'Sistemas Hidrográficos',
        description: 'Soluções de sondagem e mapeamento submarino de alta precisão para operações portuárias.',
        fullContent: 'Especializamo-nos em sondagem multifeixe, batimetria e levantamentos SIG para apoio a operações portuárias, dragagem e construção marítima. Os nossos sistemas de mapeamento submarino oferecem precisão centimétrica.',
        features: ['Sondagem Multifeixe', 'Mapeamento Submarino', 'Batimetria', 'Levantamentos SIG'],
    },
};

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const service = servicesData[slug];

    if (!service) {
        return {
            title: "Serviço não encontrado | Namtech Pro",
        };
    }

    return {
        title: `${service.title} | Engenharia Marítima Namtech Pro`,
        description: service.description,
    };
}

export default async function ServicePage({ params }: PageProps) {
    const { slug } = await params;
    const service = servicesData[slug];

    if (!service) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-white">
            <Navbar />
            <div className="pt-32 pb-20">
                <div className="max-w-4xl mx-auto px-6 lg:px-12">
                    <Link
                        href="/servicos"
                        className="inline-flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-widest mb-10 hover:text-secondary transition-colors"
                    >
                        <ArrowLeft size={16} />
                        Voltar aos Serviços
                    </Link>

                    <h1 className="text-5xl md:text-7xl font-black text-primary mb-8 tracking-tighter">
                        {service.title}
                    </h1>

                    <p className="text-xl text-slate-500 font-medium leading-relaxed mb-12 border-l-4 border-secondary pl-6">
                        {service.description}
                    </p>

                    <div className="bg-slate-50 rounded-3xl p-10 md:p-16 border border-slate-100 mb-12">
                        <p className="text-lg text-slate-700 leading-relaxed">
                            {service.fullContent}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {service.features.map((feature, i) => (
                            <div
                                key={i}
                                className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm"
                            >
                                <div className="w-8 h-8 bg-secondary/10 rounded-xl flex items-center justify-center text-secondary font-black text-xs">
                                    {i + 1}
                                </div>
                                <span className="text-slate-700 font-bold text-sm uppercase tracking-wider">
                                    {feature}
                                </span>
                            </div>
                        ))}
                    </div>

                    <div className="mt-16 flex flex-col sm:flex-row gap-4">
                        <Link
                            href="/contactos"
                            className="px-10 py-5 bg-primary text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-primary/90 transition-all text-center"
                        >
                            Solicitar Proposta
                        </Link>
                        <Link
                            href="tel:+244921791515"
                            className="px-10 py-5 bg-secondary text-primary rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-secondary/90 transition-all text-center"
                        >
                            Falar com Engenheiro
                        </Link>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}
