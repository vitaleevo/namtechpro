import { mutation } from "./_generated/server";

export const seed = mutation({
    args: {},
    handler: async (ctx) => {
        // Clear existing (optional, usually safer for dev)
        const existingEvents = await ctx.db.query("events").collect();
        for (const event of existingEvents) {
            await ctx.db.delete(event._id);
        }
        const existingPosts = await ctx.db.query("blog_posts").collect();
        for (const post of existingPosts) {
            await ctx.db.delete(post._id);
        }

        // Seed Events
        await ctx.db.insert("events", {
            title: "Projeto Solar Porto do Namibe",
            description: "Implementação de sistema híbrido de 500kW para suporte às operações portuárias, reduzindo o consumo de diesel em 40%.",
            date: "2025-11-15",
            location: "Porto Comercial, Namibe",
            type: "Project",
            imageUrl: "https://images.unsplash.com/photo-1594818379496-da1e345b0ded?auto=format&fit=crop&q=80&w=1000",
            featured: true,
            content: "Detalhes completos do projeto..."
        });

        await ctx.db.insert("events", {
            title: "Workshop Técnico Furuno",
            description: "Formação intensiva sobre a nova série NXT de radares para técnicos locais e armadores.",
            date: "2026-03-20",
            location: "Centro de Formação Namtech",
            type: "Event",
            imageUrl: "https://images.unsplash.com/photo-1581092921461-eab62e97a78e?auto=format&fit=crop&q=80&w=1000",
            featured: false,
            content: "Detalhes do workshop..."
        });

        await ctx.db.insert("events", {
            title: "Apoio à Comunidade Piscatória",
            description: "Doação de rádios VHF e formação de segurança para a cooperativa de pesca artesanal.",
            date: "2026-01-10",
            location: "Praia das Miragens",
            type: "Community",
            imageUrl: "https://images.unsplash.com/photo-1544551763-8cb069f29d20?auto=format&fit=crop&q=80&w=1000",
            featured: true,
            content: "Detalhes da ação social..."
        });

        // Seed Blog
        await ctx.db.insert("blog_posts", {
            title: "A Revolução dos Radares de Estado Sólido",
            slug: "revolucao-radares-estado-solido",
            excerpt: "Como a tecnologia Doppler está a mudar a segurança na navegação costeira e o que isso significa para a sua frota.",
            content: "Conteúdo completo do artigo...",
            author: "Eng. Miguel Silva",
            publishedAt: "2026-02-01",
            imageUrl: "https://images.unsplash.com/photo-1566378246598-5b11a0d486cc?auto=format&fit=crop&q=80&w=1000",
            category: "Tecnologia",
            readTime: "5 min"
        });

        await ctx.db.insert("blog_posts", {
            title: "Manutenção Preventiva: O Segredo da Longevidade",
            slug: "manutencao-preventiva-segredo",
            excerpt: "Poupe milhares de kwanzas em reparações de emergência com um plano simples de verificação mensal.",
            content: "Conteúdo completo...",
            author: "Carlos Manuel",
            publishedAt: "2026-01-25",
            imageUrl: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=1000",
            category: "Manutenção",
            readTime: "3 min"
        });

        await ctx.db.insert("blog_posts", {
            title: "Energia Solar em Alto Mar: Mito ou Realidade?",
            slug: "energia-solar-alto-mar",
            excerpt: "Analisamos a eficiência dos novos painéis flexíveis Namtech em condições reais de operação no Atlântico Sul.",
            content: "Conteúdo completo...",
            author: "Dra. Ana Costa",
            publishedAt: "2026-01-15",
            imageUrl: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=1000",
            category: "Energia",
            readTime: "7 min"
        });

        return "Seed completed!";
    },
});
