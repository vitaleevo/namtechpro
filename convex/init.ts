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
        const existingProducts = await ctx.db.query("products").collect();
        for (const product of existingProducts) {
            await ctx.db.delete(product._id);
        }
        const existingCategories = await ctx.db.query("categories").collect();
        for (const category of existingCategories) {
            await ctx.db.delete(category._id);
        }

        // Seed Categories
        const catMap = {
            nav: "Navegação",
            com: "Comunicação",
            ene: "Energia",
            con: "Controlo"
        };

        for (const name of Object.values(catMap)) {
            await ctx.db.insert("categories", {
                name,
                slug: name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
                type: "product"
            });
        }

        // Seed Products
        await ctx.db.insert("products", {
            name: "Radar Furuno DRS4D-NXT",
            category: catMap.nav,
            brand: "Furuno",
            description: "Radar de estado sólido com tecnologia Doppler Target Analyzer.",
            status: "Top Vendas",
            imageUrl: "/products/radar.webp",
            specs: ["Tecnologia Doppler", "Target Analyzer", "24 polegadas"]
        });

        await ctx.db.insert("products", {
            name: "Piloto Automático Simrad AP44",
            category: catMap.con,
            brand: "Simrad",
            description: "Controlador intuitivo com ecrã de alta visibilidade de 4.1 polegadas.",
            status: "Disponível",
            imageUrl: "/products/piloto.webp",
            specs: ["Glass Helm Design", "NMEA 2000", "No Drift Steering"]
        });

        await ctx.db.insert("products", {
            name: "Rádio VHF Icom IC-M605",
            category: catMap.com,
            brand: "Icom",
            description: "Rádio VHF com recetor AIS integrado e ecrã TFT a cores.",
            status: "Novo",
            imageUrl: "/products/radio.jpg",
            specs: ["AIS Integrado", "Classe D DSC", "Interface Intuitiva"]
        });

        await ctx.db.insert("products", {
            name: "Iridium Certus 100",
            category: catMap.com,
            brand: "Iridium",
            description: "Terminal satélite compacto para voz e dados em qualquer ponto do globo.",
            status: "Disponível",
            imageUrl: "/products/iridium.webp",
            specs: ["Dados IP até 88kbps", "Voz de alta qualidade", "Design compacto"]
        });

        await ctx.db.insert("products", {
            name: "Painel Solar Marítimo 200W",
            category: catMap.ene,
            brand: "Namtech Solar",
            description: "Painel monocristalino flexível com revestimento ETFE para alta durabilidade.",
            status: "Novo",
            imageUrl: "/products/solar.webp",
            specs: ["Design flexível", "Resistente a água salgada", "Anti-reflexo"]
        });

        await ctx.db.insert("products", {
            name: "Victron MultiPlus 3000",
            category: catMap.ene,
            brand: "Victron Energy",
            description: "Inversor/carregador híbrido para sistemas marítimos e industriais.",
            status: "Top Vendas",
            imageUrl: "/products/victron.webp",
            specs: ["Onda Senoidal Pura", "Ligação em paralelo", "Monitorização remota"]
        });

        await ctx.db.insert("products", {
            name: "Telefone Satélite Iridium",
            category: "Comunicação",
            brand: "Iridium",
            description: "Comunicação fiável em qualquer lugar do mundo, ideal para expedições e uso marítimo.",
            status: "Novo",
            imageUrl: "/products/telefone_sat.jpg",
            specs: ["Cobertura Global", "Voz e Dados", "Resistente"]
        });

        await ctx.db.insert("products", {
            name: "Kit Solar Satelitário",
            category: catMap.ene,
            brand: "Namtech",
            description: "Solução completa de energia solar para alimentação de terminais satélite em áreas remotas.",
            status: "Disponível",
            imageUrl: "/products/telefone_sat.jpg",
            specs: ["Autonomia Total", "Fácil Instalação"]
        });

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
        // 6. Services
        const existingServices = await ctx.db.query("services").collect();
        if (existingServices.length === 0) {
            const services = [
                {
                    title: "Energia Limpa & Solar",
                    slug: "energia-limpa",
                    description: "Projetamos e instalamos sistemas fotovoltaicos navais e industriais em Angola.",
                    fullContent: "A Namtech Pro é especialista em soluções de energia sustentável. Desde a auditoria energética inicial até à instalação de painéis solares flexíveis e bancos de baterias de lítio de última geração, garantimos autonomia total para a sua embarcação ou unidade industrial.",
                    icon: "Zap",
                    imageUrl: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=1000",
                    features: ["Auditoria Energética", "Instalação de Painéis", "Manutenção de Baterias"]
                },
                {
                    title: "Suporte 24/7 & Emergência",
                    slug: "suporte",
                    description: "Assistência técnica especializada disponível 24 horas por dia para sistemas críticos.",
                    fullContent: "Entendemos que no mar, a falha de um componente pode ser crítica. Por isso, mantemos uma equipa de resposta rápida pronta para atuar em qualquer ponto da costa de Moçâmedes e Namibe, garantindo que o seu tempo de inatividade é minimizado.",
                    icon: "ShieldCheck",
                    imageUrl: "https://images.unsplash.com/photo-1552233329-cda35ec932e6?auto=format&fit=crop&q=80&w=1000",
                    features: ["Piquete de Emergência", "Diagnóstico Remoto", "Substituição de Peças"]
                },
                {
                    title: "Comunicação Satélite",
                    slug: "comunicacao-satelite",
                    description: "Venda e instalação de terminais Iridium e Inmarsat para voz e dados globais.",
                    fullContent: "Mantenha-se ligado onde quer que esteja. Oferecemos as melhores soluções de voz e dados via satélite, ideais para frotas de pesca, navios de carga e equipas de exploração remota.",
                    icon: "Satellite",
                    imageUrl: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?auto=format&fit=crop&q=80&w=1000",
                    features: ["Voz Global", "Internet de Banda Larga", "Monitorização de Frotas"]
                }
            ];

            for (const service of services) {
                await ctx.db.insert("services", service);
            }
        }

        return "Seed completed!";
    },
});
