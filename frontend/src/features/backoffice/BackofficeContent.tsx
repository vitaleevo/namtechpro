"use client";

import React, { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { motion, AnimatePresence } from "framer-motion";
import {
    LayoutDashboard,
    ShoppingBag,
    MessageSquare,
    Users,
    BarChart3,
    Settings,
    Menu,
    X,
    PlusCircle,
    AlertCircle,
} from "lucide-react";
import { UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";

// Refactored sub-components
import { DashboardTab } from "./DashboardTab";
import { ProductsTab } from "./ProductsTab";
import { InquiriesTab } from "./InquiriesTab";
import { ClientsTab } from "./ClientsTab";
import { ProductFormModal } from "./ProductFormModal";

export const BackofficeContent = () => {
    const { user } = useUser();
    const [activeTab, setActiveTab] = useState("dashboard");
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    // Data from Convex
    const products = useQuery(api.products.list);
    const leads = useQuery(api.leads.listLeads);
    const stats = useQuery(api.products.getStats);

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<any>(null);

    const sidebarLinks = [
        { id: "dashboard", label: "Painel Geral", icon: LayoutDashboard },
        { id: "products", label: "Catálogo", icon: ShoppingBag, count: products?.length },
        { id: "inquiries", label: "Inquéritos", icon: MessageSquare, count: leads?.length },
        { id: "reports", label: "Relatórios", icon: BarChart3 },
        { id: "clients", label: "Clientes", icon: Users },
        { id: "settings", label: "Definições", icon: Settings },
    ];


    const handleOpenModal = (item?: any) => {
        setEditingItem(item || null);
        setIsModalOpen(true);
    };

    const deleteProduct = useMutation(api.products.deleteProduct);

    const handleDeleteProduct = async (id: string) => {
        if (confirm("Tem a certeza que deseja eliminar este item?")) {
            await deleteProduct({ id: id as any });
        }
    };

    return (
        <div className="flex h-screen bg-slate-50 overflow-hidden font-geist">
            {/* Sidebar */}
            <aside
                className={`bg-white border-r border-slate-200 transition-all duration-500 flex flex-col z-40 ${isSidebarOpen ? "w-80" : "w-24"
                    }`}
            >
                <div className="p-8 flex items-center justify-between">
                    {isSidebarOpen && (
                        <div className="w-40 h-10 relative">
                            <Image src="/images/logo-primary.png" alt="Logo" fill className="object-contain object-left" />
                        </div>
                    )}
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="p-3 hover:bg-slate-100 rounded-xl text-slate-400 transition-colors"
                    >
                        {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>

                <nav className="flex-1 px-4 py-12 space-y-3 overflow-y-auto custom-scrollbar">
                    {sidebarLinks.map((link) => (
                        <button
                            key={link.id}
                            onClick={() => setActiveTab(link.id)}
                            className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all group ${activeTab === link.id
                                ? "bg-primary text-white shadow-2xl shadow-primary/30 translate-x-1"
                                : "text-slate-500 hover:bg-slate-50 hover:translate-x-1"
                                }`}
                        >
                            <link.icon
                                size={22}
                                className={activeTab === link.id ? "text-white" : "group-hover:text-blue-600 transition-colors"}
                            />
                            {isSidebarOpen && <span className="font-black text-sm flex-1 text-left tracking-tight">{link.label}</span>}
                            {isSidebarOpen && link.count !== undefined && (
                                <span
                                    className={`text-[10px] font-black px-3 py-1 rounded-full ${activeTab === link.id ? "bg-white text-blue-600" : "bg-slate-100 text-slate-500"
                                        }`}
                                >
                                    {link.count}
                                </span>
                            )}
                        </button>
                    ))}
                </nav>

                <div className="p-6">
                    <div
                        className={`p-4 rounded-[2.5rem] bg-slate-100 flex items-center gap-4 ${!isSidebarOpen && "justify-center"
                            } border border-slate-200`}
                    >
                        <UserButton afterSignOutUrl="/" />
                        {isSidebarOpen && (
                            <div className="overflow-hidden">
                                <p className="text-xs font-black text-slate-900 truncate">{user?.fullName}</p>
                                <p className="text-[10px] text-emerald-500 font-black uppercase tracking-widest flex items-center gap-1">
                                    <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
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
                            <div className="h-px w-10 bg-blue-600" />
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600">Command Center</span>
                        </div>
                        <h1 className="text-6xl font-black text-slate-900 tracking-tighter mb-4 capitalize">
                            {sidebarLinks.find((l) => l.id === activeTab)?.label}
                        </h1>
                        <p className="text-lg text-slate-500 font-medium">
                            Monitorização e controlo total da operação tecnológica Namtech.
                        </p>
                    </div>
                    {activeTab === "products" && (
                        <button
                            onClick={() => handleOpenModal()}
                            className="bg-primary text-white px-12 py-6 rounded-[2.5rem] font-black flex items-center gap-4 shadow-2xl shadow-primary/30 hover:scale-105 hover:bg-primary/90 transition-all active:scale-95 whitespace-nowrap"
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
                        {activeTab === "dashboard" && <DashboardTab stats={stats} />}
                        {activeTab === "products" && (
                            <ProductsTab products={products as any} onEdit={handleOpenModal} onDelete={handleDeleteProduct} />
                        )}
                        {activeTab === "inquiries" && <InquiriesTab leads={leads as any} />}
                        {activeTab === "clients" && <ClientsTab leads={leads as any} />}
                        {["reports", "settings"].includes(activeTab) && (
                            <div className="text-center py-60 bg-white rounded-[5rem] border-2 border-dashed border-slate-100">
                                <AlertCircle size={64} className="mx-auto text-slate-200 mb-8" />
                                <h3 className="text-3xl font-black text-slate-300 tracking-tighter">
                                    Funcionalidade Técnica sob Calibração
                                </h3>
                                <p className="text-slate-400 font-medium mt-4">
                                    Estamos a integrar os módulos de BI e Configuração Global.
                                </p>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </main>

            {/* Product Form Modal */}
            <ProductFormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                editingItem={editingItem}
                onSaved={() => { /* data refreshes automatically via Convex */ }}
            />
        </div>
    );
};
