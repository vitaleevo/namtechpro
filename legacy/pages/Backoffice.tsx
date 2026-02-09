
import React, { useState } from 'react';
import { Inquiry, Product } from '../types';

// Interfaces internas para o Backoffice
interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  stock: number;
  category: string;
  status: 'In Stock' | 'Low' | 'Out of Stock';
}

interface Client {
  id: string;
  name: string;
  industry: string;
  location: string;
  contact: string;
  status: 'Active' | 'Inactive';
}

interface Report {
  id: string;
  title: string;
  type: 'Technical' | 'Financial' | 'Inventory';
  date: string;
  author: string;
}

const INITIAL_INQUIRIES: Inquiry[] = [
  { id: '1', date: '24 Out, 2024', client: 'Sonar Logistics Ltd.', location: 'Luanda, AO', product: 'VSAT Satellite Solution', status: 'New', initials: 'SL' },
  { id: '2', date: '22 Out, 2024', client: 'Marine Fleet Services', location: 'Pointe-Noire, CG', product: 'GMDSS Safety Package', status: 'Contacted', initials: 'MF' },
];

const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'DRS4D-NXT',
    name: 'Radar Furuno DRS4D-NXT',
    category: 'Navegação',
    description: 'Radar de estado sólido com tecnologia Doppler Target Analyzer.',
    imageUrl: 'https://images.unsplash.com/photo-1516937941344-00b4e0337589?auto=format&fit=crop&q=80&w=400',
    status: 'Novo',
    brand: 'Furuno',
    specs: ['Doppler technology', 'Target Analyzer']
  },
];

const Backoffice: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  // Data States
  const [inquiries, setInquiries] = useState<Inquiry[]>(INITIAL_INQUIRIES);
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [reports, setReports] = useState<Report[]>([]);
  
  // Admin Profile State
  const [adminProfile, setAdminProfile] = useState({
    name: 'Admin Namtech',
    email: 'admin@namtechpro.ao',
    role: 'Super Administrador',
    phone: '+244 923 000 000',
    location: 'Sede Namibe, Angola',
    bio: 'Especialista em infraestrutura de TI e sistemas marítimos críticos.',
    joinedDate: 'Janeiro 2022',
    avatar: 'AD'
  });

  const [settings, setSettings] = useState({ companyName: 'Namtech Pro', adminEmail: 'admin@namtechpro.ao', systemMode: 'Production' });

  // Modal Control
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [formData, setFormData] = useState<any>({});

  const sidebarLinks = [
    { id: 'dashboard', label: 'Painel Geral', icon: 'dashboard' },
    { id: 'profile', label: 'O Meu Perfil', icon: 'account_circle' },
    { id: 'products', label: 'Catálogo', icon: 'shopping_bag', count: products.length },
    { id: 'inquiries', label: 'Inquéritos', icon: 'forum', count: inquiries.length },
    { id: 'inventory', label: 'Inventário', icon: 'inventory_2' },
    { id: 'clients', label: 'Clientes', icon: 'groups' },
    { id: 'reports', label: 'Relatórios', icon: 'analytics' },
    { id: 'settings', label: 'Definições', icon: 'settings' },
  ];

  const handleOpenModal = (item?: any) => {
    if (item) {
      setEditId(item.id);
      const data = activeTab === 'products' ? { ...item, specs: item.specs.join(', ') } : item;
      setFormData(data);
    } else {
      setEditId(null);
      setFormData({});
    }
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const id = editId || Math.random().toString(36).substr(2, 9);
    // Generic logic for demonstration
    setIsModalOpen(false);
  };

  const renderProfile = () => (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Profile Header */}
      <div className="relative h-64 rounded-[3rem] overflow-hidden bg-primary shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary-light opacity-50"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
        <div className="absolute -bottom-1 w-full h-1/2 bg-gradient-to-t from-slate-50 dark:from-slate-950 to-transparent"></div>
        
        <div className="absolute bottom-8 left-12 flex items-end gap-8">
          <div className="w-32 h-32 rounded-[2.5rem] bg-secondary text-primary border-8 border-slate-50 dark:border-slate-950 flex items-center justify-center text-4xl font-black shadow-2xl relative group">
            {adminProfile.avatar}
            <button className="absolute bottom-2 right-2 w-8 h-8 rounded-full bg-white text-primary flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
              <span className="material-symbols-outlined text-sm">photo_camera</span>
            </button>
          </div>
          <div className="mb-4">
            <h2 className="text-3xl font-black text-primary dark:text-white mb-1">{adminProfile.name}</h2>
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-black uppercase tracking-widest rounded-full">
                {adminProfile.role}
              </span>
              <span className="text-slate-400 text-xs font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">location_on</span>
                {adminProfile.location}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-black text-primary dark:text-white">Informação Pessoal</h3>
              <button className="px-6 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-black text-slate-500 hover:bg-primary hover:text-white transition-all">
                Editar Perfil
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Nome Completo</label>
                <p className="text-sm font-bold dark:text-white">{adminProfile.name}</p>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Email Corporativo</label>
                <p className="text-sm font-bold dark:text-white">{adminProfile.email}</p>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Telefone</label>
                <p className="text-sm font-bold dark:text-white">{adminProfile.phone}</p>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Membro desde</label>
                <p className="text-sm font-bold dark:text-white">{adminProfile.joinedDate}</p>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-slate-50 dark:border-slate-800">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest block mb-4">Biografia Técnica</label>
              <p className="text-sm text-slate-500 leading-relaxed">{adminProfile.bio}</p>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm">
            <h3 className="text-xl font-black text-primary dark:text-white mb-8">Segurança da Conta</h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between p-6 rounded-2xl bg-slate-50 dark:bg-slate-950/50">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center">
                    <span className="material-symbols-outlined text-xl">password</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold dark:text-white">Alterar Password</p>
                    <p className="text-xs text-slate-400">Recomendado mudar a cada 90 dias.</p>
                  </div>
                </div>
                <button className="text-xs font-black text-primary hover:underline uppercase tracking-widest">Alterar</button>
              </div>
              
              <div className="flex items-center justify-between p-6 rounded-2xl bg-slate-50 dark:bg-slate-950/50">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                    <span className="material-symbols-outlined text-xl">verified_user</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold dark:text-white">Autenticação 2FA</p>
                    <p className="text-xs text-slate-400">Segurança extra via App ou SMS.</p>
                  </div>
                </div>
                <div className="w-12 h-6 bg-emerald-500 rounded-full relative p-1 cursor-pointer">
                  <div className="w-4 h-4 bg-white rounded-full ml-auto shadow-sm"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Activity & Stats */}
        <div className="space-y-8">
          <div className="bg-primary p-10 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform"></div>
            <h3 className="text-xl font-black mb-8 relative z-10 flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary">analytics</span>
              O Meu Impacto
            </h3>
            <div className="space-y-6 relative z-10">
              <div className="flex justify-between items-end border-b border-white/10 pb-4">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Ações no Catálogo</span>
                <span className="text-2xl font-black text-secondary">42</span>
              </div>
              <div className="flex justify-between items-end border-b border-white/10 pb-4">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Inquéritos Geridos</span>
                <span className="text-2xl font-black text-secondary">156</span>
              </div>
              <div className="flex justify-between items-end">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Relatórios Emitidos</span>
                <span className="text-2xl font-black text-secondary">12</span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm">
            <h3 className="text-xl font-black text-primary dark:text-white mb-8">Log de Acesso</h3>
            <div className="space-y-6">
              {[
                { event: 'Login efetuado', date: 'Hoje, 08:42', ip: '192.168.1.45' },
                { event: 'Alteração de Stock', date: 'Ontem, 16:20', ip: '192.168.1.45' },
                { event: 'Novo Inquérito Respondido', date: '24 Out, 11:30', ip: '192.168.1.12' },
              ].map((log, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-1.5"></div>
                  <div>
                    <p className="text-sm font-bold dark:text-white">{log.event}</p>
                    <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">{log.date} • IP: {log.ip}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-10 py-4 rounded-xl border border-slate-100 dark:border-slate-800 text-[10px] font-black uppercase text-slate-400 hover:bg-slate-50 transition-all">
              Ver Histórico Completo
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDashboard = () => (
    <div className="space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Inquéritos Ativos', val: inquiries.length, color: 'blue', icon: 'forum' },
          { label: 'Items no Catálogo', val: products.length, color: 'secondary', icon: 'shopping_bag' },
          { label: 'Total Clientes', val: clients.length || 0, color: 'amber', icon: 'groups' },
          { label: 'Alertas Técnicos', val: '2', color: 'red', icon: 'warning' },
        ].map((s, i) => (
          <div key={i} className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm">
            <span className={`material-symbols-outlined text-${s.color === 'secondary' ? 'primary' : s.color + '-500'} mb-4 block`}>{s.icon}</span>
            <p className="text-4xl font-black dark:text-white">{s.val}</p>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{s.label}</p>
          </div>
        ))}
      </div>
      <div className="bg-primary/5 dark:bg-primary/20 p-12 rounded-[3rem] text-center border border-primary/10">
        <h2 className="text-2xl font-black mb-4">Bem-vindo ao Command Center da Namtech</h2>
        <p className="text-slate-500 max-w-xl mx-auto">Monitorize e gira todas as operações técnicas do Namibe e Luanda a partir desta interface centralizada.</p>
      </div>
    </div>
  );

  const renderTable = (headers: string[], data: any[], fields: string[]) => (
    <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-50 dark:bg-slate-950/50">
            <tr>
              {activeTab === 'products' && <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 w-20">Img</th>}
              {headers.map((h, i) => (
                <th key={i} className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">{h}</th>
              ))}
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
            {data.length > 0 ? data.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-all group">
                {activeTab === 'products' && (
                  <td className="px-8 py-4">
                    <img src={item.imageUrl} alt="" className="w-10 h-10 rounded-lg object-cover shadow-sm" />
                  </td>
                )}
                {fields.map((f, i) => (
                  <td key={i} className="px-8 py-6 text-sm font-medium dark:text-slate-300">
                    {f === 'status' ? (
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                        ['In Stock', 'Active', 'Proposal Sent', 'Disponível', 'Novo'].includes(item[f]) 
                          ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' 
                          : 'bg-amber-50 text-amber-600 border border-amber-100'
                      }`}>
                        {item[f]}
                      </span>
                    ) : item[f]}
                  </td>
                ))}
                <td className="px-8 py-6 text-right">
                  <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => handleOpenModal(item)} className="w-8 h-8 rounded-lg text-slate-400 hover:bg-secondary hover:text-primary transition-all"><span className="material-symbols-outlined text-sm">edit</span></button>
                    <button className="w-8 h-8 rounded-lg text-slate-400 hover:bg-red-500 hover:text-white transition-all"><span className="material-symbols-outlined text-sm">delete</span></button>
                  </div>
                </td>
              </tr>
            )) : (
              <tr><td colSpan={10} className="px-8 py-20 text-center text-slate-400">Nenhum registo disponível.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950 pt-20 overflow-hidden">
      <aside className={`bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transition-all duration-300 flex flex-col z-40 ${isSidebarOpen ? 'w-72' : 'w-20'}`}>
        <div className="p-6 flex items-center justify-between">
          {isSidebarOpen && <span className="text-xs font-black uppercase tracking-[0.3em] text-slate-400">Admin Panel</span>}
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400"><span className="material-symbols-outlined">{isSidebarOpen ? 'menu_open' : 'menu'}</span></button>
        </div>
        <nav className="flex-1 px-4 space-y-2 mt-4 overflow-y-auto">
          {sidebarLinks.map((link) => (
            <button key={link.id} onClick={() => setActiveTab(link.id)} className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all ${activeTab === link.id ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'}`}>
              <span className={`material-symbols-outlined ${activeTab === link.id ? 'text-secondary' : ''}`}>{link.icon}</span>
              {isSidebarOpen && <span className="font-bold text-sm">{link.label}</span>}
              {isSidebarOpen && link.count !== undefined && <span className="ml-auto bg-secondary text-primary text-[10px] font-black px-2 py-0.5 rounded-full">{link.count}</span>}
            </button>
          ))}
        </nav>
        
        {/* Quick User View in Sidebar Base */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800">
          <div className={`flex items-center gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 cursor-pointer hover:bg-slate-100 transition-all`} onClick={() => setActiveTab('profile')}>
            <div className="w-10 h-10 rounded-xl bg-secondary text-primary flex items-center justify-center font-black shrink-0">
              {adminProfile.avatar}
            </div>
            {isSidebarOpen && (
              <div className="overflow-hidden">
                <p className="text-xs font-bold truncate dark:text-white">{adminProfile.name}</p>
                <p className="text-[9px] text-slate-400 uppercase tracking-widest font-black">Online</p>
              </div>
            )}
          </div>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto p-8 lg:p-12">
        <header className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-4xl font-black font-display text-primary dark:text-white capitalize tracking-tighter">
              {sidebarLinks.find(l => l.id === activeTab)?.label}
            </h1>
            <p className="text-slate-500">Gestão operacional da Namtech Pro.</p>
          </div>
          {['products', 'inquiries', 'inventory', 'clients', 'reports'].includes(activeTab) && (
            <button onClick={() => handleOpenModal()} className="bg-primary text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2 shadow-xl shadow-primary/20 hover:scale-105 transition-all active:scale-95">
              <span className="material-symbols-outlined">add_circle</span> Criar Novo
            </button>
          )}
        </header>

        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'profile' && renderProfile()}
        {activeTab === 'products' && renderTable(['Nome', 'Marca', 'Categoria', 'Estado'], products, ['name', 'brand', 'category', 'status'])}
        {activeTab === 'inquiries' && renderTable(['Cliente', 'Serviço', 'Estado'], inquiries, ['client', 'product', 'status'])}
        {activeTab === 'inventory' && renderTable(['Nome', 'SKU', 'Stock', 'Estado'], inventory, ['name', 'sku', 'stock', 'status'])}
        {activeTab === 'clients' && renderTable(['Nome', 'Indústria', 'Localização'], clients, ['name', 'industry', 'location'])}
        {activeTab === 'reports' && renderTable(['Título', 'Tipo', 'Data'], reports, ['title', 'type', 'date'])}
        {activeTab === 'settings' && (
          <div className="max-w-2xl bg-white dark:bg-slate-900 p-12 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-sm">
            <h3 className="text-xl font-black mb-8">Definições Globais do Sistema</h3>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-slate-400">Nome da Empresa</label>
                <input className="w-full p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border-none dark:text-white" value={settings.companyName} onChange={e => setSettings({...settings, companyName: e.target.value})} />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-slate-400">Email de Administração</label>
                <input className="w-full p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border-none dark:text-white" value={settings.adminEmail} onChange={e => setSettings({...settings, adminEmail: e.target.value})} />
              </div>
              <button className="bg-primary text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-primary/20 hover:bg-slate-800 transition-all">Guardar Configurações</button>
            </div>
          </div>
        )}
      </main>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-primary/40 backdrop-blur-md" onClick={() => setIsModalOpen(false)}></div>
          <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in duration-200">
            <div className="p-8 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50">
              <h2 className="text-2xl font-black text-primary dark:text-white flex items-center gap-3">
                <span className="material-symbols-outlined text-secondary">{editId ? 'edit' : 'add_circle'}</span>
                {editId ? 'Editar Registo' : 'Novo Registo'}
              </h2>
            </div>
            <form onSubmit={handleSave} className="p-8 space-y-4">
              <p className="text-sm text-slate-400 text-center py-4 italic">O formulário de edição/criação será carregado dinamicamente para {activeTab}.</p>
              <div className="pt-6 flex gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-6 py-4 rounded-xl border border-slate-200 dark:border-slate-700 font-bold text-slate-500">Cancelar</button>
                <button type="submit" className="flex-[2] px-6 py-4 bg-primary text-white rounded-xl font-black shadow-xl">Guardar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Backoffice;
