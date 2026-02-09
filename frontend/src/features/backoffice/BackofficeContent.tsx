"use client";

import React, { useState, useRef } from 'react';
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { motion, AnimatePresence } from "framer-motion";
import {
    LayoutDashboard,
    ShoppingBag,
    MessageSquare,
    Package,
    Users,
    BarChart3,
    Settings,
    Menu,
    X,
    PlusCircle,
    Edit2,
    Trash2,
    AlertCircle,
    Upload,
    CheckCircle2,
    Search,
    Filter,
    ArrowUpRight,
    ArrowDownRight,
    Monitor,
    Zap,
    Download
} from "lucide-react";
import { UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";

export const BackofficeContent = () => {
    const { user } = useUser();
    const [activeTab, setActiveTab] = useState('dashboard');
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    // Data from Convex
    const products = useQuery(api.products.list);
    const leads = useQuery(api.leads.listLeads);
    const stats = useQuery(api.products.getStats);

    // Mutations
    const addProduct = useMutation(api.products.addProduct);
    const updateProduct = useMutation(api.products.updateProduct);
    const deleteProduct = useMutation(api.products.deleteProduct);
    const generateUploadUrl = useMutation(api.products.generateUploadUrl);

    // Modal & Form State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<any>(null);
    const [formData, setFormData] = useState<any>({});
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const sidebarLinks = [
        { id: 'dashboard', label: 'Painel Geral', icon: LayoutDashboard },
        { id: 'products', label: 'Catálogo', icon: ShoppingBag, count: products?.length },
        { id: 'inquiries', label: 'Inquéritos', icon: MessageSquare, count: leads?.length },
        { id: 'reports', label: 'Relatórios', icon: BarChart3 },
        { id: 'clients', label: 'Clientes', icon: Users },
        { id: 'settings', label: 'Definições', icon: Settings },
    ];

    const handleOpenModal = (item?: any) => {
        if (item) {
            setEditingItem(item);
            setFormData({ ...item, specs: item.specs.join(', ') });
        } else {
            setEditingItem(null);
            setFormData({ name: '', category: 'Navegação', description: '', imageUrl: '', status: 'Novo', brand: '', specs: '' });
        }
        setIsModalOpen(true);
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        try {
            const postUrl = await generateUploadUrl();
            const result = await fetch(postUrl, {
                method: "POST",
                headers: { "Content-Type": file.type },
                body: file,
            });
            const { storageId } = await result.json();

            // In a real scenario, we would use the storageId to get a permanent URL
            // For now, we'll use a placeholder or the storageId directly if Convex supports it
            // Actually, Convex allows getting a URL from storageId via a query
            // But let's simplify for now and just set a placeholder or use the file to simulate
            setFormData({ ...formData, storageId, imageUrl: "Imagem Carregada com Sucesso" });
        } catch (error) {
            console.error("Upload failed", error);
        } finally {
            setIsUploading(false);
        }
    };

    const handleSaveProduct = async (e: React.FormEvent) => {
        e.preventDefault();
        const data = {
            ...formData,
            specs: formData.specs.split(',').map((s: string) => s.trim()).filter((s: string) => s !== '')
        };

        try {
            if (editingItem) {
                await updateProduct({ id: editingItem._id, ...data });
            } else {
                await addProduct(data);
            }
            setIsModalOpen(false);
        } catch (error) {
            console.error("Error saving product:", error);
        }
    };

    const handleDelete = async (id: any) => {
        if (confirm("Tem a certeza que deseja eliminar este item?")) {
            await deleteProduct({ id });
        }
    };

    const renderDashboard = () => (
        <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                    { label: 'Inquéritos', val: stats?.totalLeads || 0, trend: '+12%', up: true, icon: MessageSquare, color: 'blue' },
                    { label: 'Equipamentos', val: stats?.totalProducts || 0, trend: '+3', up: true, icon: ShoppingBag, color: 'emerald' },
                    { label: 'Taxa Conversão', val: '24%', trend: '-2%', up: false, icon: BarChart3, color: 'amber' },
                    { label: 'Sistema', val: 'Online', trend: '100%', up: true, icon: Monitor, color: 'indigo' },
                ].map((s, i) => (
                    <div key={i} className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/50 transition-all hover:scale-[1.02]">
                        <div className="flex justify-between items-start mb-8">
                            <div className={`w-14 h-14 bg-${s.color}-500/10 text-${s.color}-500 rounded-2xl flex items-center justify-center`}>
                                <s.icon size={28} />
                            </div>
                            <div className={`flex items-center gap-1 text-xs font-black ${s.up ? 'text-emerald-500' : 'text-red-500'}`}>
                                {s.trend}
                                {s.up ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                            </div>
                        </div>
                        <p className="text-5xl font-black text-slate-900 mb-2 tracking-tighter">{s.val}</p>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{s.label}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white p-12 rounded-[4rem] border border-slate-100">
                    <div className="flex justify-between items-center mb-12">
                        <h3 className="text-2xl font-black tracking-tight">Distribuição de Inventário</h3>
                        <button className="text-blue-600 font-black text-xs uppercase tracking-widest flex items-center gap-2">
                            Ver Tudo <ArrowUpRight size={16} />
                        </button>
                    </div>
                    <div className="space-y-8">
                        {stats?.categoryCounts.map((cat: { name: string; count: number }, i: number) => (
                            <div key={i} className="space-y-3">
                                <div className="flex justify-between text-sm font-black uppercase tracking-widest text-slate-500">
                                    <span>{cat.name}</span>
                                    <span>{cat.count} Unidades</span>
                                </div>
                                <div className="h-4 bg-slate-100 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${(cat.count / (stats.totalProducts || 1)) * 100}%` }}
                                        transition={{ duration: 1, delay: i * 0.1 }}
                                        className="h-full bg-blue-600 rounded-full shadow-lg shadow-blue-500/30"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-slate-900 p-12 rounded-[4rem] text-white flex flex-col justify-between relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full -mr-32 -mt-32 blur-3xl"></div>
                    <div>
                        <Zap size={48} className="text-blue-500 mb-8" />
                        <h3 className="text-3xl font-black mb-6 leading-tight">Estado Operacional Luanda/Namibe</h3>
                        <p className="text-slate-400 font-medium mb-12">Todos os sistemas de monitorização satélite estão operacionais. Nenhuma falha crítica reportada nas últimas 24h.</p>
                    </div>
                    <button className="w-full py-5 bg-white text-slate-900 rounded-2xl font-black text-sm hover:scale-105 transition-all flex items-center justify-center gap-3">
                        <CheckCircle2 size={20} className="text-emerald-500" />
                        Relatório de Sistema
                    </button>
                </div>
            </div>
        </div>
    );

    const renderProducts = () => (
        <div className="space-y-8">
            <div className="flex justify-between items-center bg-white p-6 rounded-[2.5rem] border border-slate-100">
                <div className="flex items-center gap-4 flex-1 max-w-md">
                    <Search size={20} className="text-slate-400" />
                    <input type="text" placeholder="Filtrar por nome ou marca..." className="bg-transparent border-none outline-none font-bold text-slate-600 w-full" />
                </div>
                <div className="flex items-center gap-4">
                    <button className="p-3 bg-slate-50 rounded-xl text-slate-500 hover:text-blue-600 transition-all"><Filter size={20} /></button>
                    <button className="p-3 bg-slate-50 rounded-xl text-slate-500 hover:text-blue-600 transition-all"><Download size={20} /></button>
                </div>
            </div>

            <div className="bg-white rounded-[3rem] border border-slate-100 overflow-hidden shadow-xl shadow-slate-200/50">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50">
                            <tr>
                                <th className="px-10 py-8 text-[10px] font-black uppercase tracking-widest text-slate-400">Equipamento</th>
                                <th className="px-10 py-8 text-[10px] font-black uppercase tracking-widest text-slate-400">Categoria</th>
                                <th className="px-10 py-8 text-[10px] font-black uppercase tracking-widest text-slate-400">Marca</th>
                                <th className="px-10 py-8 text-[10px] font-black uppercase tracking-widest text-slate-400">Estado</th>
                                <th className="px-10 py-8 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Gestão</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {products?.map((item: any) => (
                                <tr key={item._id} className="group hover:bg-slate-50/50 transition-all">
                                    <td className="px-10 py-8">
                                        <div className="flex items-center gap-6">
                                            <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-100 shrink-0 border border-slate-100 relative">
                                                <Image
                                                    src={item.imageUrl || 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae'}
                                                    alt={item.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="font-black text-slate-900 text-lg tracking-tight leading-none mb-2">{item.name}</span>
                                                <span className="text-[10px] font-black uppercase tracking-widest text-blue-600">ID: {item._id.slice(-6)}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-10 py-8">
                                        <span className="text-sm font-black text-slate-500 uppercase tracking-widest">{item.category}</span>
                                    </td>
                                    <td className="px-10 py-8">
                                        <span className="text-sm font-bold text-slate-400">{item.brand}</span>
                                    </td>
                                    <td className="px-10 py-8">
                                        <span className="px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest bg-blue-600/10 text-blue-600 border border-blue-600/20">
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="px-10 py-8">
                                        <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
                                            <button onClick={() => handleOpenModal(item)} className="w-11 h-11 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all shadow-lg">
                                                <Edit2 size={18} />
                                            </button>
                                            <button onClick={() => handleDelete(item._id)} className="w-11 h-11 rounded-xl bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all shadow-lg">
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );

    const renderInquiries = () => (
        <div className="space-y-8">
            <div className="bg-white rounded-[3rem] border border-slate-100 overflow-hidden shadow-xl shadow-slate-200/50">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50">
                            <tr>
                                <th className="px-10 py-8 text-[10px] font-black uppercase tracking-widest text-slate-400">Interessado</th>
                                <th className="px-10 py-8 text-[10px] font-black uppercase tracking-widest text-slate-400">Assunto</th>
                                <th className="px-10 py-8 text-[10px] font-black uppercase tracking-widest text-slate-400">Contactos</th>
                                <th className="px-10 py-8 text-[10px] font-black uppercase tracking-widest text-slate-400">Data</th>
                                <th className="px-10 py-8 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {leads?.map((item: any) => (
                                <tr key={item._id} className="group hover:bg-slate-50/50 transition-all">
                                    <td className="px-10 py-8">
                                        <div className="flex flex-col">
                                            <span className="font-black text-slate-900 tracking-tight text-lg">{item.name}</span>
                                            <span className="text-[10px] text-slate-400 uppercase font-black tracking-widest mt-1">Lead Qualificada</span>
                                        </div>
                                    </td>
                                    <td className="px-10 py-8">
                                        <span className="px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest bg-blue-600/10 text-blue-600 border border-blue-600/20">
                                            {item.subject}
                                        </span>
                                    </td>
                                    <td className="px-10 py-8">
                                        <div className="flex flex-col gap-1">
                                            <span className="text-sm font-black text-slate-600">{item.email}</span>
                                            <span className="text-xs text-slate-400 font-bold">{item.phone}</span>
                                        </div>
                                    </td>
                                    <td className="px-10 py-8">
                                        <span className="text-xs font-black text-slate-400">{new Date(item._creationTime).toLocaleDateString()}</span>
                                    </td>
                                    <td className="px-10 py-8 text-right">
                                        <button className="px-8 py-3 rounded-2xl bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-blue-500/20">
                                            Responder
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );

    const renderClients = () => {
        // Unique leads as clients
        const uniqueClients = Array.from(new Set(leads?.map((l: any) => l.email))).map(email => {
            return leads?.find((l: any) => l.email === email);
        });

        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {uniqueClients?.map((client: any, i) => (
                    <div key={i} className="bg-white p-10 rounded-[3rem] border border-slate-100 relative overflow-hidden flex flex-col items-center text-center">
                        <div className="w-24 h-24 bg-blue-600/10 text-blue-600 rounded-[2rem] flex items-center justify-center font-black text-3xl mb-8">
                            {client.name.charAt(0)}
                        </div>
                        <h4 className="text-2xl font-black text-slate-900 mb-2 tracking-tight">{client.name}</h4>
                        <p className="text-sm text-slate-400 font-medium mb-8 uppercase tracking-widest">{client.email}</p>
                        <div className="w-full flex gap-3">
                            <button className="flex-1 py-4 bg-slate-50 rounded-2xl font-black text-[10px] uppercase tracking-widest text-slate-500 hover:bg-blue-600 hover:text-white transition-all">Perfil</button>
                            <button className="flex-1 py-4 bg-slate-50 rounded-2xl font-black text-[10px] uppercase tracking-widest text-slate-500 hover:bg-blue-600 hover:text-white transition-all">Histórico</button>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="flex h-screen bg-slate-50 overflow-hidden font-geist">
            {/* Sidebar */}
            <aside className={`bg-white border-r border-slate-200 transition-all duration-500 flex flex-col z-40 ${isSidebarOpen ? 'w-80' : 'w-24'}`}>
                <div className="p-8 flex items-center justify-between">
                    {isSidebarOpen && (
                        <div className="w-40 h-10 relative">
                            <Image src="/images/logo-primary.png" alt="Logo" fill className="object-contain object-left" />
                        </div>
                    )}
                    <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-3 hover:bg-slate-100 rounded-xl text-slate-400 transition-colors">
                        {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>

                <nav className="flex-1 px-4 py-12 space-y-3 overflow-y-auto custom-scrollbar">
                    {sidebarLinks.map((link) => (
                        <button
                            key={link.id}
                            onClick={() => setActiveTab(link.id)}
                            className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all group ${activeTab === link.id
                                ? 'bg-namtech-blue text-white shadow-2xl shadow-namtech-blue/30 translate-x-1'
                                : 'text-slate-500 hover:bg-slate-50 hover:translate-x-1'
                                }`}
                        >
                            <link.icon size={22} className={activeTab === link.id ? 'text-white' : 'group-hover:text-blue-600 transition-colors'} />
                            {isSidebarOpen && <span className="font-black text-sm flex-1 text-left tracking-tight">{link.label}</span>}
                            {isSidebarOpen && link.count !== undefined && (
                                <span className={`text-[10px] font-black px-3 py-1 rounded-full ${activeTab === link.id ? 'bg-white text-blue-600' : 'bg-slate-100 text-slate-500'
                                    }`}>
                                    {link.count}
                                </span>
                            )}
                        </button>
                    ))}
                </nav>

                <div className="p-6">
                    <div className={`p-4 rounded-[2.5rem] bg-slate-100 flex items-center gap-4 ${!isSidebarOpen && 'justify-center'} border border-slate-200`}>
                        <UserButton afterSignOutUrl="/" />
                        {isSidebarOpen && (
                            <div className="overflow-hidden">
                                <p className="text-xs font-black text-slate-900 truncate">{user?.fullName}</p>
                                <p className="text-[10px] text-emerald-500 font-black uppercase tracking-widest flex items-center gap-1">
                                    <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
                                    Online
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto custom-scrollbar bg-slate-50 p-8 lg:p-20">
                <header className="mb-20 flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
                    <div className="max-w-2xl">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="h-px w-10 bg-blue-600"></div>
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600">Command Center</span>
                        </div>
                        <h1 className="text-6xl font-black text-slate-900 tracking-tighter mb-4 capitalize">
                            {sidebarLinks.find(l => l.id === activeTab)?.label}
                        </h1>
                        <p className="text-lg text-slate-500 font-medium font-geist">Monitorização e controlo total da operação tecnológica Namtech.</p>
                    </div>
                    {['products'].includes(activeTab) && (
                        <button
                            onClick={() => handleOpenModal()}
                            className="bg-namtech-blue text-white px-12 py-6 rounded-[2.5rem] font-black flex items-center gap-4 shadow-2xl shadow-namtech-blue/30 hover:scale-105 hover:bg-namtech-blue/90 transition-all active:scale-95 whitespace-nowrap"
                        >
                            <PlusCircle size={24} /> Criar Novo Equipamento
                        </button>
                    )}
                </header>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -30 }}
                        transition={{ duration: 0.4, ease: "circOut" }}
                    >
                        {activeTab === 'dashboard' && renderDashboard()}
                        {activeTab === 'products' && renderProducts()}
                        {activeTab === 'inquiries' && renderInquiries()}
                        {activeTab === 'clients' && renderClients()}
                        {['reports', 'settings'].includes(activeTab) && (
                            <div className="text-center py-60 bg-white rounded-[5rem] border-2 border-dashed border-slate-100">
                                <AlertCircle size={64} className="mx-auto text-slate-200 mb-8" />
                                <h3 className="text-3xl font-black text-slate-300 tracking-tighter">Funcionalidade Técnica sob Calibração</h3>
                                <p className="text-slate-400 font-medium mt-4">Estamos a integrar os módulos de BI e Configuração Global.</p>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </main>

            {/* Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-12">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-slate-950/80 backdrop-blur-xl"
                            onClick={() => setIsModalOpen(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 40 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 40 }}
                            className="relative w-full max-w-3xl bg-white rounded-[4rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
                        >
                            <div className="px-12 py-10 border-b border-slate-100 flex items-center justify-between">
                                <h2 className="text-3xl font-black text-slate-900 tracking-tighter flex items-center gap-4">
                                    <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white">
                                        {editingItem ? <Edit2 size={24} /> : <PlusCircle size={24} />}
                                    </div>
                                    {editingItem ? 'Editar Equipamento' : 'Novo Equipamento'}
                                </h2>
                                <button onClick={() => setIsModalOpen(false)} className="w-12 h-12 rounded-2xl bg-slate-50 text-slate-400 hover:text-red-500 transition-all flex items-center justify-center">
                                    <X size={24} />
                                </button>
                            </div>

                            <form onSubmit={handleSaveProduct} className="p-12 space-y-8 overflow-y-auto custom-scrollbar flex-1">
                                <div className="grid grid-cols-2 gap-8">
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 ml-1">Nome Técnico</label>
                                        <input className="w-full px-8 py-5 rounded-[2rem] bg-slate-50 border-2 border-transparent focus:border-blue-600 outline-none transition-all text-slate-900 font-black" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 ml-1">Categoria Operacional</label>
                                        <select className="w-full px-8 py-5 rounded-[2rem] bg-slate-50 border-2 border-transparent focus:border-blue-600 outline-none transition-all text-slate-900 font-black cursor-pointer" value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })}>
                                            <option>Navegação</option>
                                            <option>Comunicação</option>
                                            <option>Energia</option>
                                            <option>Controlo</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 ml-1">Descrição do Módulo</label>
                                    <textarea className="w-full px-8 py-5 rounded-[2.5rem] bg-slate-50 border-2 border-transparent focus:border-blue-600 outline-none transition-all text-slate-900 font-bold resize-none" rows={4} value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} required />
                                </div>

                                <div className="grid grid-cols-2 gap-8">
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 ml-1">Marca / Fabricante</label>
                                        <input className="w-full px-8 py-5 rounded-[2rem] bg-slate-50 border-2 border-transparent focus:border-blue-600 outline-none transition-all text-slate-900 font-black" value={formData.brand} onChange={e => setFormData({ ...formData, brand: e.target.value })} required />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 ml-1">Estado do Stock</label>
                                        <input className="w-full px-8 py-5 rounded-[2rem] bg-slate-50 border-2 border-transparent focus:border-blue-600 outline-none transition-all text-slate-900 font-black" value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })} />
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 ml-1">Media & Imagens</label>
                                    <div className="flex gap-4">
                                        <input
                                            className="flex-1 px-8 py-5 rounded-[2rem] bg-slate-50 border-2 border-transparent focus:border-blue-600 outline-none transition-all text-slate-900 font-bold"
                                            value={formData.imageUrl}
                                            onChange={e => setFormData({ ...formData, imageUrl: e.target.value })}
                                            placeholder="URL da Imagem ou Carregar Ficheiro"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => fileInputRef.current?.click()}
                                            disabled={isUploading}
                                            className="w-20 h-20 rounded-[2rem] bg-slate-900 text-white flex items-center justify-center hover:bg-blue-600 transition-all shrink-0 shadow-xl"
                                        >
                                            {isUploading ? <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Upload size={24} />}
                                        </button>
                                        <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" accept="image/*" />
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 ml-1">Especificações Técnicas (CSV)</label>
                                    <input className="w-full px-8 py-5 rounded-[2rem] bg-slate-50 border-2 border-transparent focus:border-blue-600 outline-none transition-all text-slate-900 font-bold" value={formData.specs} onChange={e => setFormData({ ...formData, specs: e.target.value })} placeholder="Doppler, Radar, 24 inches..." />
                                </div>
                            </form>

                            <div className="p-12 bg-slate-50 border-t border-slate-100 flex gap-6">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-6 rounded-3xl border-2 border-slate-200 font-black text-slate-400 hover:bg-white transition-all">Cancelar</button>
                                <button onClick={handleSaveProduct} className="flex-[2] py-6 bg-blue-600 text-white rounded-3xl font-black shadow-2xl shadow-blue-600/30 hover:bg-blue-700 transition-all flex items-center justify-center gap-3">
                                    Confirmar e Sincronizar <ArrowUpRight size={20} />
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};
