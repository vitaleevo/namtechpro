import { Navbar } from "@/features/navigation/Navbar";
import { Footer } from "@/features/navigation/Footer";
import { ContactContent } from "@/features/contact/ContactContent";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contactos",
    description: "Entre em contacto com a equipa técnica da Namtech Pro. Suporte técnico marítimo e industrial 24/7 em Angola.",
    openGraph: {
        title: "Contactos | Namtech Pro",
        description: "Entre em contacto com a equipa técnica da Namtech Pro. Suporte técnico marítimo e industrial 24/7 em Angola.",
    },
    twitter: {
        card: "summary_large_image",
        title: "Contactos | Namtech Pro",
        description: "Suporte técnico 24/7 em Angola.",
    },
    alternates: {
        canonical: "/contactos",
    },
};

type Props = {
    searchParams: { [key: string]: string | string[] | undefined };
};

export default function ContactPage({ searchParams }: Props) {
    const subjectQuery = typeof searchParams.subject === 'string' ? searchParams.subject : undefined;

    return (
        <main className="min-h-screen bg-white">
            <Navbar />
            <ContactContent initialSubject={subjectQuery} />
            <Footer />
        </main>
    );
}
