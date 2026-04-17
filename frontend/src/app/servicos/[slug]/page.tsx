import { ServiceDetailContent } from "@/features/services/ServiceDetailContent";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { Metadata } from "next";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const service = await fetchQuery(api.services.getBySlug, { slug });

    if (!service) {
        return {
            title: "Serviço não encontrado | Namtech Pro",
        };
    }

    return {
        title: `${service.title} | Engenharia Marítima Namtech Pro`,
        description: service.description,
        openGraph: {
            title: service.title,
            description: service.description,
            images: [service.imageUrl],
        },
    };
}

export default async function ServicePage({ params }: PageProps) {
    const { slug } = await params;
    const service = await fetchQuery(api.services.getBySlug, { slug });

    if (!service) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <h1 className="text-2xl font-bold">Serviço não encontrado</h1>
            </div>
        );
    }

    return <ServiceDetailContent service={service} />;
}
