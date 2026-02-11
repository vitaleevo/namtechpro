"use client";

import { useQuery, useMutation, useConvexAuth } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Trash2, Search, Mail, Phone, Calendar, User, MessageSquare } from "lucide-react";
import { useState } from "react";

export default function LeadsPage() {
    const { isAuthenticated } = useConvexAuth();
    const leads = useQuery(api.leads.listLeads, isAuthenticated ? {} : "skip");
    const deleteLead = useMutation(api.leads.removeLead);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedLead, setSelectedLead] = useState<unknown>(null);

    const handleDelete = async (e: React.MouseEvent, id: Id<"leads">) => {
        e.stopPropagation();
        if (confirm("Tem certeza que deseja remover este contacto?")) {
            await deleteLead({ id });
            if (selectedLead?._id === id) setSelectedLead(null);
        }
    };

    const filteredLeads = leads?.filter(lead =>
        lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.subject.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-10 relative">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight">Gestão de Leads</h1>
                    <p className="text-slate-500 font-medium">Acompanhe as interações e pedidos de contacto dos clientes.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* List Sidebar */}
                <div className="lg:col-span-4 bg-white rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col h-[750px] overflow-hidden">
                    <div className="p-6 border-b border-slate-100 bg-slate-50/30">
                        <div className="relative">
                            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Pesquisar por nome ou assunto..."
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-6 py-4 rounded-2xl border-2 border-slate-100 focus:border-primary outline-none transition-all text-sm font-medium"
                            />
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto custom-scrollbar divide-y divide-slate-50">
                        {filteredLeads?.map((lead) => (
                            <div
                                key={lead._id}
                                onClick={() => setSelectedLead(lead)}
                                className={`w-full text-left p-6 hover:bg-slate-50 transition-all flex flex-col gap-2 relative group cursor-pointer ${selectedLead?._id === lead._id ? 'bg-primary/5' : ''}`}
                            >
                                {selectedLead?._id === lead._id && (
                                    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-primary" />
                                )}

                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">{lead.subject}</span>
                                    <span className="text-[10px] text-slate-300 font-bold">
                                        {new Date(lead._creationTime).toLocaleDateString()}
                                    </span>
                                </div>

                                <h4 className={`text-base font-black transition-colors ${selectedLead?._id === lead._id ? 'text-primary' : 'text-slate-900'}`}>
                                    {lead.name}
                                </h4>
                                <p className="text-xs text-slate-500 line-clamp-1 font-medium">{lead.message}</p>

                                <button
                                    onClick={(e) => handleDelete(e, lead._id)}
                                    className="absolute right-6 top-1/2 -translate-y-1/2 p-2.5 bg-white text-red-500 rounded-xl shadow-lg border border-slate-100 opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white"
                                >
                                    <Trash2 size={14} />
                                </button>
                            </div>
                        ))}

                        {(!filteredLeads || filteredLeads.length === 0) && (
                            <div className="flex flex-col items-center justify-center py-32 px-10 text-center">
                                <Search size={40} className="text-slate-100 mb-4" />
                                <p className="text-slate-400 font-black text-sm uppercase tracking-widest">Sem Resultados</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Content Area */}
                <div className="lg:col-span-8">
                    {selectedLead ? (
                        <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 h-[750px] flex flex-col overflow-hidden animate-in fade-in slide-in-from-right duration-500">
                            {/* Header Section */}
                            <div className="p-10 border-b border-slate-100 bg-slate-50/20">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                                    <div className="flex items-center gap-6">
                                        <div className="w-20 h-20 bg-primary text-white rounded-[2rem] flex items-center justify-center font-black text-3xl shadow-xl shadow-primary/20">
                                            {selectedLead.name.charAt(0)}
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-3 mb-1">
                                                <h2 className="text-3xl font-black text-slate-900 tracking-tight">{selectedLead.name}</h2>
                                                <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest rounded-full">Prospecção</span>
                                            </div>
                                            <p className="text-lg text-slate-500 font-medium">Assunto: {selectedLead.subject}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="bg-white px-5 py-3 rounded-2xl border-2 border-slate-100 text-slate-500 font-black text-[10px] uppercase tracking-widest flex items-center gap-3 shadow-sm">
                                            <Calendar size={14} className="text-primary" />
                                            Recebido em {new Date(selectedLead._creationTime).toLocaleString()}
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <a
                                        href={`mailto:${selectedLead.email}`}
                                        className="bg-white p-6 rounded-3xl border-2 border-slate-50 hover:border-primary hover:bg-primary/5 transition-all flex items-center gap-5 group shadow-sm"
                                    >
                                        <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-500 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all shadow-inner">
                                            <Mail size={20} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mb-0.5">Endereço de Email</p>
                                            <p className="font-black text-slate-700 text-sm">{selectedLead.email}</p>
                                        </div>
                                    </a>

                                    {selectedLead.phone && (
                                        <a
                                            href={`tel:${selectedLead.phone}`}
                                            className="bg-white p-6 rounded-3xl border-2 border-slate-50 hover:border-primary hover:bg-primary/5 transition-all flex items-center gap-5 group shadow-sm"
                                        >
                                            <div className="w-12 h-12 rounded-2xl bg-green-50 text-green-500 flex items-center justify-center group-hover:bg-green-600 group-hover:text-white transition-all shadow-inner">
                                                <Phone size={20} />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mb-0.5">Telemóvel / Telefone</p>
                                                <p className="font-black text-slate-700 text-sm">{selectedLead.phone}</p>
                                            </div>
                                        </a>
                                    )}
                                </div>
                            </div>

                            {/* Message Content */}
                            <div className="flex-1 p-10 overflow-y-auto custom-scrollbar bg-slate-50/10">
                                <div className="flex items-start gap-6">
                                    <div className="w-12 h-12 rounded-2xl bg-white border-2 border-slate-100 flex items-center justify-center flex-shrink-0 shadow-sm">
                                        <MessageSquare size={20} className="text-primary" />
                                    </div>
                                    <div className="space-y-4 flex-1">
                                        <div className="flex items-center gap-3">
                                            <h4 className="font-black text-slate-400 uppercase text-[10px] tracking-[0.2em]">Mensagem do Cliente</h4>
                                            <div className="h-px bg-slate-100 flex-1" />
                                        </div>
                                        <div className="bg-white px-8 py-8 rounded-[2rem] rounded-tl-none border border-slate-100 shadow-sm">
                                            <p className="text-slate-600 text-lg leading-relaxed font-serif italic">
                                                &quot;{selectedLead.message}&quot;
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Action Footer */}
                            <div className="p-8 border-t border-slate-100 bg-white shadow-[0_-8px_30px_rgb(0,0,0,0.02)]">
                                <button
                                    onClick={() => window.location.href = `mailto:${selectedLead.email}?subject=Resposta: ${selectedLead.subject}`}
                                    className="w-full py-5 bg-slate-900 text-white rounded-[1.5rem] font-black uppercase tracking-[0.2em] text-xs hover:bg-primary transition-all shadow-xl shadow-slate-900/10 flex items-center justify-center gap-3 active:scale-[0.98]"
                                >
                                    <Mail size={18} />
                                    Iniciar Resposta por Email
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 h-[750px] flex flex-col items-center justify-center text-center p-20">
                            <div className="w-32 h-32 bg-slate-50 rounded-[2.5rem] flex items-center justify-center mb-8 shadow-inner animate-pulse">
                                <Mail size={48} className="text-slate-200" />
                            </div>
                            <h3 className="text-3xl font-black text-slate-900 mb-3 tracking-tight">Centro de Mensagens</h3>
                            <p className="text-slate-400 max-w-sm font-medium leading-relaxed">
                                Selecione uma lead da lista lateral para visualizar os detalhes do contacto e o histórico da mensagem.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
