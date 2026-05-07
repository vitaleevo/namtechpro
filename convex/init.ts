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
            imageUrl: "/assets/new/equipamentos-maritimos.webp",
            specs: ["Tecnologia Doppler", "Target Analyzer", "24 polegadas"]
        });

        await ctx.db.insert("products", {
            name: "Piloto Automático Simrad AP44",
            category: catMap.con,
            brand: "Simrad",
            description: "Controlador intuitivo com ecrã de alta visibilidade de 4.1 polegadas.",
            status: "Disponível",
            imageUrl: "/assets/new/piloto-automatico.webp",
            specs: ["Glass Helm Design", "NMEA 2000", "No Drift Steering"]
        });

        await ctx.db.insert("products", {
            name: "Rádio VHF Icom IC-M605",
            category: catMap.com,
            brand: "Icom",
            description: "Rádio VHF com recetor AIS integrado e ecrã TFT a cores.",
            status: "Novo",
            imageUrl: "/assets/new/radio-vhf-icom-ic.jpg",
            specs: ["AIS Integrado", "Classe D DSC", "Interface Intuitiva"]
        });

        await ctx.db.insert("products", {
            name: "Iridium Certus 100",
            category: catMap.com,
            brand: "Iridium",
            description: "Terminal satélite compacto para voz e dados em qualquer ponto do globo.",
            status: "Disponível",
            imageUrl: "/assets/new/iridium-certus-100.webp",
            specs: ["Dados IP até 88kbps", "Voz de alta qualidade", "Design compacto"]
        });



        await ctx.db.insert("products", {
            name: "Telefone Satélite Iridium",
            category: "Comunicação",
            brand: "Iridium",
            description: "Comunicação fiável em qualquer lugar do mundo, ideal para expedições e uso marítimo.",
            status: "Novo",
            imageUrl: "/assets/new/telefone-satelite.jpg",
            specs: ["Cobertura Global", "Voz e Dados", "Resistente"]
        });



        await ctx.db.insert("products", {
            name: "SR 1350 Patrol C",
            category: catMap.nav,
            brand: "SEARIB'S / KD Workboats",
            description: "Embarcação de patrulha de alta performance, reforçada com Kevlar e velocidade > 60 MN.",
            status: "Top Vendas",
            imageUrl: "/assets/new/equipamentos-maritimos.webp",
            specs: ["Comprimento: 13,20m", "Potência: 3x350Hp", "Material: Kevlar/Resinas"]
        });

        await ctx.db.insert("products", {
            name: "Display Simrad NSX 12",
            category: catMap.nav,
            brand: "Simrad",
            description: "Ecrã de alta definição com interface Android intuitiva e sonar de última geração.",
            status: "Novo",
            imageUrl: "/images/equipamentos/simrad/9 evo 3s with radar.jpg",
            specs: ["Ecrã IPS 12\"", "Interface NSX", "Suporte Radar/Sonar"]
        });

        await ctx.db.insert("products", {
            name: "Motor Suzuki DF350A",
            category: "Propulsão",
            brand: "Suzuki Marine",
            description: "O motor fora de borda mais potente da Suzuki com sistema de hélice dupla contra-rotante.",
            status: "Top Vendas",
            imageUrl: "/images/equipamentos/suzuki/suzuki-S-1900M15.jpg",
            specs: ["350 Cavalos", "Hélice Dupla", "V6 4.4L"]
        });

        await ctx.db.insert("products", {
            name: "Barco KD 750 Pro",
            category: catMap.nav,
            brand: "KD Workboats",
            description: "Embarcação utilitária em alumínio naval para trabalhos pesados e logística.",
            status: "Disponível",
            imageUrl: "/images/barcos/kd-workboats/20180702_130746.jpg",
            specs: ["Alumínio Naval", "Carga Útil Elevada", "Customizável"]
        });

        await ctx.db.insert("products", {
            name: "Boia de Sinalização Cardinal",
            category: "Acessórios",
            brand: "Namtech Pro",
            description: "Boia de canal de alta visibilidade com sistema de iluminação integrado.",
            status: "Disponível",
            imageUrl: "/images/boias/depositphotos_164132740-stock-photo-colorful-beacons-at-the-depot.jpg",
            specs: ["Resistente a UV", "LED de Alta Intensidade", "Ancoragem Reforçada"]
        });

        await ctx.db.insert("products", {
            name: "Victron MultiPlus 3000",
            category: "Energia",
            brand: "Victron Energy",
            description: "Inversor/carregador híbrido para sistemas marítimos e industriais. Garante a transição perfeita entre a energia de cais e as baterias.",
            status: "Top Vendas",
            imageUrl: "/assets/new/victron-energy.webp",
            specs: ["Onda Senoidal Pura", "Ligação em Paralelo", "Monitorização Remota"]
        });

        await ctx.db.insert("products", {
            name: "Bateria AGM Victron 12V/220Ah",
            category: "Energia",
            brand: "Victron Energy",
            description: "Bateria AGM de ciclo profundo com baixa auto-descarga e elevado desempenho. Especialmente desenhada para uso marítimo.",
            status: "Disponível",
            imageUrl: "/assets/new/victron-energy.webp",
            specs: ["Tecnologia VRLA", "Ciclo Profundo", "Sem Manutenção"]
        });

        await ctx.db.insert("products", {
            name: "Kit de Resgate Marítimo",
            category: "Segurança",
            brand: "Lalizas",
            description: "Equipamento completo de salvamento para embarcações profissionais.",
            status: "Novo",
            imageUrl: "/images/acessorios/D_NQ_NP_678750-MLB41306837783_042020-V.jpg",
            specs: ["Certificação SOLAS", "Fácil Acesso", "Durável"]
        });

        // Seed Events
        await ctx.db.insert("events", {
            title: "Workshop Técnico Furuno",
            description: "Formação intensiva sobre a nova série NXT de radares para técnicos locais e armadores.",
            date: "2026-03-20",
            location: "Centro de Formação Namtech",
            type: "Event",
            imageUrl: "/images/decorativas/nav-equipment.jpg",
            featured: true,
            content: "Formação técnica avançada cobrindo instalação, configuração e manutenção da nova série NXT de radares Furuno. Destinado a técnicos especializados e armadores que buscam excelência operacional."
        });

        await ctx.db.insert("events", {
            title: "Apoio à Comunidade Piscatória",
            description: "Doação de rádios VHF e formação de segurança para a cooperativa de pesca artesanal.",
            date: "2026-01-10",
            location: "Praia das Miragens",
            type: "Community",
            imageUrl: "/images/decorativas/african-sailboat.jpg",
            featured: true,
            content: "Iniciativa de responsabilidade social da Namtech Pro para aumentar a segurança no mar da comunidade piscatória local, fornecendo equipamentos de comunicação críticos e treinamento básico de SOS."
        });



        await ctx.db.insert("events", {
            title: "Namtech Pro na FILDA 2025",
            description: "Destaque para as soluções de defesa e conetividade via satélite na Feira Internacional de Luanda.",
            date: "2025-07-20",
            location: "Luanda, FILDA",
            type: "Event",
            imageUrl: "/images/eventos/f1.jpg",
            featured: false,
            content: "Apresentação da nova parceria exclusiva com a KD Workboats para o mercado angolano."
        });

        // Seed Blog
        await ctx.db.insert("blog_posts", {
            title: "Defesa Costeira: Tecnologia EO/IR em Angola",
            slug: "tecnologia-eoir-angola",
            excerpt: "Como os novos sistemas da Current Scientific Corp estão a proteger as águas territoriais angolanas.",
            content: "Conteúdo completo do artigo...",
            author: "Eng. Carlos Costa",
            publishedAt: "2026-04-10",
            imageUrl: "/assets/new/equipamentos-maritimos.webp",
            category: "Defesa",
            readTime: "6 min"
        });

        // 6. Services
        const existingServices = await ctx.db.query("services").collect();
        if (existingServices.length === 0) {
            const services = [
                {
                    title: "Defesa & Vigilância",
                    slug: "defesa-vigilancia",
                    description: "Sistemas avançados de câmeras térmicas e monitorização para proteção de infraestruturas.",
                    fullContent: "Parceria com a Current Scientific Corp para fornecer as melhores soluções de inteligência, vigilância e reconhecimento (ISR) em Angola.",
                    icon: "Shield",
                    imageUrl: "/assets/new/equipamentos-maritimos.webp",
                    features: ["Sistemas EO/IR", "Vigilância de Longo Alcance", "Controlo de Fronteiras"]
                },
                {
                    title: "Infraestruturas de Atracação",
                    slug: "atracacao",
                    description: "Projeto e instalação de pontões flutuantes e sistemas de acostagem.",
                    fullContent: "Criamos soluções modulares e duradouras para atracação de embarcações de recreio e profissionais.",
                    icon: "Anchor",
                    imageUrl: "/assets/new/servicos.jpg",
                    features: ["Pontões Flutuantes", "Ancoragem Segura", "Manutenção de Cais"]
                },

                {
                    title: "Mergulho Profissional",
                    slug: "mergulho",
                    description: "Fornecimento de equipamentos de mergulho técnico e compressores Coltri.",
                    fullContent: "Equipamentos completos para mergulhadores profissionais, incluindo propulsores subaquáticos SUEX e sistemas de ar comprimido.",
                    icon: "Droplets",
                    imageUrl: "/assets/new/servicos.jpg",
                    features: ["Compressores Coltri", "Propulsores SUEX", "Equipamento Técnico"]
                }
            ];

            for (const service of services) {
                await ctx.db.insert("services", service);
            }
        }

        return "Seed completed!";
    },
});
