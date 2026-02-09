import { EventsDetailContent } from "@/features/events/EventsDetailContent";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { Metadata } from "next";
import { Id } from "@/convex/_generated/dataModel";

interface PageProps {
    params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { id } = await params;

    const event = await fetchQuery(api.events.getById, { id: id as Id<"events"> });

    if (!event) {
        return {
            title: "Evento não encontrado | Namtech Pro",
        };
    }

    return {
        title: `${event.title} | Projetos Namtech Pro`,
        description: event.description,
        openGraph: {
            title: event.title,
            description: event.description,
            images: [event.imageUrl],
        },
    };
}

export default async function EventPage({ params }: PageProps) {
    const { id } = await params;

    const event = await fetchQuery(api.events.getById, { id: id as Id<"events"> });

    if (!event) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <h1 className="text-2xl font-bold">Evento não encontrado</h1>
            </div>
        );
    }

    return <EventsDetailContent event={event} />;
}
