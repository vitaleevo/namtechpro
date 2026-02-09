import { mutation } from "./_generated/server";

const INITIAL_PRODUCTS = [
    {
        name: 'Radar Furuno DRS4D-NXT',
        category: 'Navegação',
        description: 'Radar de estado sólido com tecnologia Doppler Target Analyzer. Oferece uma consciência situacional sem precedentes, identificando alvos perigosos instantaneamente através de cores dinâmicas no ecrã.',
        imageUrl: 'https://images.unsplash.com/photo-1516937941344-00b4e0337589?auto=format&fit=crop&q=80&w=400',
        status: 'Novo',
        brand: 'Furuno',
        specs: ['Doppler technology', 'Target Analyzer', 'Fast Target Tracking', '24" Radome', 'Solid State Electronics', 'Bird Mode included']
    },
    {
        name: 'Piloto Automático Simrad AP44',
        category: 'Controlo',
        description: 'Controlador intuitivo com ecrã de 4.1 polegadas de alta visibilidade. Perfeito para embarcações que exigem precisão absoluta em rotas complexas ou condições de mar adversas.',
        imageUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=400',
        status: 'Disponível',
        brand: 'Simrad',
        specs: ['Glass Helm Design', 'NMEA 2000', 'No Drift Steering', 'Rotary Control Dial', 'Automated Turning Patterns']
    },
    {
        name: 'Rádio VHF Icom IC-M605',
        category: 'Comunicação',
        description: 'Rádio VHF com receptor AIS integrado e ecrã TFT colorido. O padrão ouro para comunicação marítima, permitindo a visualização de alvos AIS diretamente no visor do rádio.',
        imageUrl: 'https://images.unsplash.com/photo-1558486012-817176f84c6d?auto=format&fit=crop&q=80&w=400',
        status: 'Top Vendas',
        brand: 'Icom',
        specs: ['Integrated AIS', 'DSC Class D', 'Intuitive UI', 'Noise Cancelling', 'Last Call Voice Recording']
    },
    {
        name: 'Iridium Certus 100',
        category: 'Comunicação',
        description: 'Terminal satélite compacto para voz e dados em qualquer ponto do globo. Ideal para manter a conectividade da tripulação e sistemas de monitorização em tempo real em alto mar.',
        imageUrl: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=400',
        status: 'Novo',
        brand: 'Iridium',
        specs: ['IP data up to 88kbps', 'High-quality voice', 'Small footprint', 'Pole-to-pole coverage', 'Easy installation']
    },
    {
        name: 'Painel Solar Marítimo 200W',
        category: 'Energia',
        description: 'Painel monocristalino flexível com revestimento ETFE para alta durabilidade. Desenvolvido para resistir ao ambiente salino extremo sem perda de eficiência.',
        imageUrl: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=400',
        status: 'Disponível',
        brand: 'Namtech Eco',
        specs: ['Flexible design', 'Saltwater resistant', 'Anti-reflective', 'ETFE coating', 'High efficiency cells']
    },
    {
        name: 'Victron MultiPlus 3000',
        category: 'Energia',
        description: 'Inversor/carregador híbrido para sistemas marítimos e industriais. Garante uma transição perfeita entre energia de cais e baterias, protegendo eletrónicos sensíveis.',
        imageUrl: 'https://images.unsplash.com/photo-1590490359854-dfba19688d70?auto=format&fit=crop&q=80&w=400',
        status: 'Top Vendas',
        brand: 'Victron',
        specs: ['Pure Sine Wave', 'Parallel connection', 'Remote monitoring', 'PowerAssist technology', 'UPS functionality']
    }
];

export const seed = mutation({
    args: {},
    handler: async (ctx) => {
        const existing = await ctx.db.query("products").collect();
        if (existing.length > 0) return;

        for (const product of INITIAL_PRODUCTS) {
            await ctx.db.insert("products", product);
        }
    },
});
