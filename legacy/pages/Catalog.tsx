
import React, { useState, useMemo } from 'react';
import { Product, Page } from '../types';

interface CatalogProps {
  onNavigate: (page: Page) => void;
}

const EXTENDED_PRODUCTS: Product[] = [
  {
    id: 'DRS4D-NXT',
    name: 'Radar Furuno DRS4D-NXT',
    category: 'Navegação',
    description: 'Radar de estado sólido com tecnologia Doppler Target Analyzer. Oferece uma consciência situacional sem precedentes, identificando alvos perigosos instantaneamente através de cores dinâmicas no ecrã.',
    imageUrl: 'https://images.unsplash.com/photo-1516937941344-00b4e0337589?auto=format&fit=crop&q=80&w=400',
    status: 'Novo',
    brand: 'Furuno',
    specs: ['Doppler technology', 'Target Analyzer', 'Fast Target Tracking', '24" Radome', 'Solid State Electronics', 'Bird Mode included']
  },
  {
    id: 'AP44-SIM',
    name: 'Piloto Automático Simrad AP44',
    category: 'Controlo',
    description: 'Controlador intuitivo com ecrã de 4.1 polegadas de alta visibilidade. Perfeito para embarcações que exigem precisão absoluta em rotas complexas ou condições de mar adversas.',
    imageUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=400',
    status: 'Disponível',
    brand: 'Simrad',
    specs: ['Glass Helm Design', 'NMEA 2000', 'No Drift Steering', 'Rotary Control Dial', 'Automated Turning Patterns']
  },
  {
    id: 'IC-M605',
    name: 'Rádio VHF Icom IC-M605',
    category: 'Comunicação',
    description: 'Rádio VHF com receptor AIS integrado e ecrã TFT colorido. O padrão ouro para comunicação marítima, permitindo a visualização de alvos AIS diretamente no visor do rádio.',
    imageUrl: 'https://images.unsplash.com/photo-1558486012-817176f84c6d?auto=format&fit=crop&q=80&w=400',
    status: 'Top Vendas',
    brand: 'Icom',
    specs: ['Integrated AIS', 'DSC Class D', 'Intuitive UI', 'Noise Cancelling', 'Last Call Voice Recording']
  },
  {
    id: 'CERTUS-100',
    name: 'Iridium Certus 100',
    category: 'Comunicação',
    description: 'Terminal satélite compacto para voz e dados em qualquer ponto do globo. Ideal para manter a conectividade da tripulação e sistemas de monitorização em tempo real em alto mar.',
    imageUrl: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=400',
    status: 'Novo',
    brand: 'Iridium',
    specs: ['IP data up to 88kbps', 'High-quality voice', 'Small footprint', 'Pole-to-pole coverage', 'Easy installation']
  },
  {
    id: 'SOLAR-FLEX-200',
    name: 'Painel Solar Marítimo 200W',
    category: 'Energia',
    description: 'Painel monocristalino flexível com revestimento ETFE para alta durabilidade. Desenvolvido para resistir ao ambiente salino extremo sem perda de eficiência.',
    imageUrl: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=400',
    status: 'Disponível',
    brand: 'Namtech Eco',
    specs: ['Flexible design', 'Saltwater resistant', 'Anti-reflective', 'ETFE coating', 'High efficiency cells']
  },
  {
    id: 'VICTRON-MULTI-3K',
    name: 'Victron MultiPlus 3000',
    category: 'Energia',
    description: 'Inversor/carregador híbrido para sistemas marítimos e industriais. Garante uma transição perfeita entre energia de cais e baterias, protegendo eletrónicos sensíveis.',
    imageUrl: 'https://images.unsplash.com/photo-1590490359854-dfba19688d70?auto=format&fit=crop&q=80&w=400',
    status: 'Top Vendas',
    brand: 'Victron',
    specs: ['Pure Sine Wave', 'Parallel connection', 'Remote monitoring', 'PowerAssist technology', 'UPS functionality']
  }
];

const Catalog: React.FC<CatalogProps> = ({ onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [detailedProduct, setDetailedProduct] = useState<Product | null>(null);

  const categories = useMemo(() => {
    return ['Todos', ...Array.from(new Set(EXTENDED_PRODUCTS.map(p => p.category)))];
  }, []);

  const filteredProducts = useMemo(() => {
    return EXTENDED_PRODUCTS.filter(p => 
      (selectedCategory === 'Todos' || p.category === selectedCategory) &&
      (p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
       p.brand.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [searchTerm, selectedCategory]);

  const closeModal = () => setDetailedProduct(null);

  return (
    <div className="pt-32 pb-24 bg-slate-50 dark:bg-slate-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16">
          <div className="max-w-xl">
            <h1 className="text-4xl md:text-6xl font-display font-black text-primary dark:text-white mb-4 tracking-tighter">
              Equipamentos <span className="text-secondary">Premium</span>
            </h1>
            <p className="text-slate-500 dark:text-slate-400">
              Soluções integradas de navegação, rádio e energia com certificação internacional e assistência técnica local.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <div className="relative flex-1 sm:w-80">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">search</span>
              <input
                type="text"
                placeholder="Procurar por modelo ou marca..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white dark:bg-slate-800 border-none rounded-2xl shadow-sm focus:ring-2 focus:ring-primary outline-none transition-all dark:text-white"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar Filters */}
          <aside className="lg:w-64 space-y-10">
            <div>
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-6">Categorias Técnicas</h3>
              <div className="space-y-2">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full flex items-center justify-between p-4 rounded-xl transition-all font-bold text-sm ${
                      selectedCategory === cat 
                        ? 'bg-primary text-white shadow-lg' 
                        : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100'
                    }`}
                  >
                    {cat}
                    {selectedCategory === cat && <span className="material-symbols-outlined text-sm">check</span>}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-primary/5 dark:bg-primary/20 p-8 rounded-[2rem] border border-primary/10">
              <h4 className="text-sm font-bold text-primary dark:text-secondary mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-lg">verified</span>
                Qualidade Garantida
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Todos os nossos equipamentos incluem garantia oficial e primeira instalação certificada pela nossa equipa no Namibe.
              </p>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredProducts.map(product => (
                <div key={product.id} className="group bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 overflow-hidden hover:shadow-2xl transition-all duration-500 flex flex-col">
                  <div className="relative h-64 bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <img 
                      src={product.imageUrl} 
                      alt={product.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                    />
                    <div className="absolute top-6 left-6 flex flex-col gap-2">
                      <span className="bg-primary text-white text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
                        {product.status}
                      </span>
                      <span className="bg-secondary text-primary text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
                        {product.brand}
                      </span>
                    </div>
                  </div>
                  <div className="p-8 flex-1 flex flex-col">
                    <p className="text-[10px] font-black text-secondary uppercase tracking-[0.3em] mb-3">{product.category}</p>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 leading-tight group-hover:text-primary dark:group-hover:text-secondary transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 line-clamp-2">{product.description}</p>
                    
                    <div className="space-y-3 mb-8">
                      {product.specs.slice(0, 3).map((s, i) => (
                        <div key={i} className="flex items-center gap-2 text-[11px] font-medium text-slate-400">
                          <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                          {s}
                        </div>
                      ))}
                    </div>

                    <div className="mt-auto space-y-3">
                      <button 
                        onClick={() => onNavigate(Page.Contact)}
                        className="w-full bg-primary text-white py-4 rounded-xl font-black text-sm hover:bg-slate-800 hover:scale-[1.02] transition-all flex items-center justify-center gap-3 shadow-lg shadow-primary/10"
                      >
                        <span className="material-symbols-outlined text-sm font-bold">mail</span>
                        Pedir Orçamento
                      </button>
                      <button 
                        onClick={() => setDetailedProduct(product)}
                        className="w-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 py-4 rounded-xl font-bold text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition-all flex items-center justify-center gap-3"
                      >
                        <span className="material-symbols-outlined text-sm">visibility</span>
                        Ver Detalhes
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-40 bg-white dark:bg-slate-900 rounded-[4rem]">
                <span className="material-symbols-outlined text-6xl text-slate-200 mb-6">search_off</span>
                <h3 className="text-2xl font-bold text-slate-400">Nenhum equipamento encontrado.</h3>
                <button 
                  onClick={() => { setSearchTerm(''); setSelectedCategory('Todos'); }}
                  className="mt-6 text-primary font-bold hover:underline"
                >
                  Limpar todos os filtros
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Product Details Modal */}
      {detailedProduct && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-primary/40 backdrop-blur-md" onClick={closeModal}></div>
          <div className="relative w-full max-w-5xl bg-white dark:bg-slate-900 rounded-[3rem] shadow-2xl overflow-hidden animate-in slide-in-from-bottom-10 duration-500 max-h-[90vh] flex flex-col md:flex-row">
            {/* Close Button */}
            <button 
              onClick={closeModal}
              className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md text-white md:text-primary dark:text-white flex items-center justify-center transition-all"
            >
              <span className="material-symbols-outlined">close</span>
            </button>

            {/* Modal Image Section */}
            <div className="md:w-1/2 h-64 md:h-auto overflow-hidden relative">
              <img 
                src={detailedProduct.imageUrl} 
                alt={detailedProduct.name} 
                className="w-full h-full object-cover scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent md:hidden"></div>
              <div className="absolute bottom-6 left-6 flex flex-col gap-2 md:hidden">
                <span className="bg-secondary text-primary text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest">{detailedProduct.brand}</span>
              </div>
            </div>

            {/* Modal Content Section */}
            <div className="md:w-1/2 p-8 md:p-16 overflow-y-auto">
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-secondary/10 text-secondary text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-[0.2em]">
                    {detailedProduct.category}
                  </span>
                  <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                    REF: {detailedProduct.id}
                  </span>
                </div>
                <h2 className="text-3xl md:text-5xl font-display font-black text-primary dark:text-white mb-6 leading-tight">
                  {detailedProduct.name}
                </h2>
                <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed">
                  {detailedProduct.description}
                </p>
              </div>

              <div className="space-y-8 mb-12">
                <div>
                  <h4 className="text-xs font-black uppercase tracking-[0.3em] text-primary dark:text-secondary mb-6 flex items-center gap-2">
                    <span className="material-symbols-outlined text-lg">list_alt</span>
                    Especificações Técnicas
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {detailedProduct.specs.map((spec, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                        <span className="material-symbols-outlined text-secondary text-sm shrink-0 mt-0.5">check_circle</span>
                        <span className="text-sm font-medium text-slate-600 dark:text-slate-300">{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-8 bg-primary rounded-3xl text-white">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="material-symbols-outlined text-secondary">verified</span>
                    <h5 className="font-bold">Instalação Namtech Pro</h5>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed mb-6">
                    Este equipamento requer instalação especializada para garantir o cumprimento das normas internacionais de navegação. A nossa equipa no Namibe providencia suporte técnico completo.
                  </p>
                  <button 
                    onClick={() => { closeModal(); onNavigate(Page.Contact); }}
                    className="w-full py-4 bg-secondary text-primary rounded-xl font-black text-sm hover:bg-yellow-400 transition-all flex items-center justify-center gap-3"
                  >
                    Solicitar Orçamento de Instalação
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Catalog;
