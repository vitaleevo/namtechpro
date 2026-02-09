import { BlogContent } from "@/features/blog/BlogContent";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { Metadata } from "next";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;

    // We fetch the post on the server for metadata
    const post = await fetchQuery(api.blog.getBySlug, { slug });

    if (!post) {
        return {
            title: "Artigo não encontrado | Namtech Pro",
        };
    }

    return {
        title: `${post.title} | Blog Namtech Pro`,
        description: post.excerpt,
        openGraph: {
            title: post.title,
            description: post.excerpt,
            images: [post.imageUrl],
        },
    };
}

export default async function BlogPostPage({ params }: PageProps) {
    const { slug } = await params;

    const post = await fetchQuery(api.blog.getBySlug, { slug });

    if (!post) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <h1 className="text-2xl font-bold">Artigo não encontrado</h1>
            </div>
        );
    }

    const relatedPosts = await fetchQuery(api.blog.getRelated, {
        category: post.category,
        currentSlug: slug
    });

    return <BlogContent post={post} relatedPosts={relatedPosts || []} />;
}
