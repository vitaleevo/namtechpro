import Link from "next/link";
import { ProductDetailContent } from "@/features/catalog/ProductDetailContent";
import { CatalogContent } from "@/features/catalog/CatalogContent";
import { Navbar } from "@/features/navigation/Navbar";
import { Footer } from "@/features/navigation/Footer";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { Metadata } from "next";
import { Id } from "@/convex/_generated/dataModel";
import { Suspense } from "react";

interface PageProps {
    params: Promise<{ id: string }>;
}

// Helper function to check if a string is a valid Convex ID
function isValidConvexId(id: string): boolean {
    // Convex IDs have format: "xxxxx|xxxxx..." (alphanumeric with pipe)
    return /^[a-z0-9]+[|]/i.test(id);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { id } = await params;

    // Check if it's a real Convex ID or a category slug
    if (isValidConvexId(id)) {
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
    } else {
        // It's a category slug
        const products = await fetchQuery(api.products.getBySlug, { slug: id });
        const categoryName = products.length > 0 ? products[0].category : id;
        return {
            title: `Catálogo: ${categoryName} | Namtech Pro`,
            description: `Explore a nossa gama de produtos na categoria ${categoryName}.`,
        };
    }
}

// Force dynamic rendering
export const dynamic = "force-dynamic";

export default async function ProductPage({ params }: PageProps) {
    const { id } = await params;

    // Check if it's a real Convex ID or a category slug
    if (isValidConvexId(id)) {
        try {
            // Fetch single product by ID
            const product = await fetchQuery(api.products.getById, { id: id as Id<"products"> });

            if (!product) {
                return (
                    <div className="min-h-screen flex items-center justify-center">
                        <h1 className="text-2xl font-bold">Produto não encontrado</h1>
                    </div>
                );
            }

            return <ProductDetailContent product={product} />;
        } catch (error) {
            console.error("Error fetching product:", error);
            return (
                <div className="min-h-screen flex items-center justify-center">
                    <h1 className="text-2xl font-bold">Erro ao carregar produto</h1>
                </div>
            );
        }
    } else {
        try {
            // It's a category slug - fetch all products in this category
            const products = await fetchQuery(api.products.getBySlug, { slug: id });

            if (products.length === 0) {
                return (
                    <div className="min-h-screen flex flex-col items-center justify-center p-20 bg-slate-50">
                        <Navbar />
                        <h1 className="text-4xl font-black text-primary mb-6">Categoria não encontrada</h1>
                        <p className="text-slate-500 mb-10">Lamentamos, mas não encontrámos produtos nesta categoria.</p>
                        <Link href="/catalogo" className="bg-primary text-white px-10 py-4 rounded-xl font-bold">Voltar ao Catálogo</Link>
                        <Footer />
                    </div>
                );
            }

            // Show the catalog filtered by this category
            const actualCategoryName = products[0].category;

            return (
                <main className="min-h-screen bg-white">
                    <Navbar />
                    <Suspense fallback={<div className="min-h-screen flex items-center justify-center pt-24"><div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div></div>}>
                        <CatalogContent initialCategory={actualCategoryName} />
                    </Suspense>
                    <Footer />
                </main>
            );
        } catch (error) {
            console.error("Error fetching category:", error);
            return (
                <main className="min-h-screen bg-white">
                    <Navbar />
                    <div className="p-20 text-center">
                        <h1 className="text-2xl font-bold">Erro ao carregar categoria</h1>
                    </div>
                    <Footer />
                </main>
            );
        }
    }
}
