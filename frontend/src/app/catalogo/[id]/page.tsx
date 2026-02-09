import { ProductDetailContent } from "@/features/catalog/ProductDetailContent";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { Metadata } from "next";
import { Id } from "@/convex/_generated/dataModel";

interface PageProps {
    params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { id } = await params;

    // We assume the ID is a valid products ID
    const product = await fetchQuery(api.products.getById, { id: id as Id<"products"> });

    if (!product) {
        return {
            title: "Produto não encontrado | Namtech Pro",
        };
    }

    return {
        title: `${product.name} | ${product.brand} | Catálogo Namtech Pro`,
        description: product.description,
        openGraph: {
            title: product.name,
            description: product.description,
            images: [product.imageUrl],
        },
    };
}

export default async function ProductPage({ params }: PageProps) {
    const { id } = await params;

    const product = await fetchQuery(api.products.getById, { id: id as Id<"products"> });

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <h1 className="text-2xl font-bold">Produto não encontrado</h1>
            </div>
        );
    }

    return <ProductDetailContent product={product} />;
}
