"use client";

import { useState } from "react";
import { useQuery, useMutation, useConvexAuth } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import {
    Clock,
    Calendar,
    Trash2,
    Search,
    Mail,
    Phone,
    MapPin,
    CheckCircle2,
    XCircle,
    Timer,
    ChevronRight,
    MessageSquare
} from "lucide-react";
import DeleteConfirmationModal from "@/components/ui/DeleteConfirmationModal";
import ErrorModal from "@/components/ui/ErrorModal";

export default function AppointmentsPage() {
    const { isAuthenticated } = useConvexAuth();
    const appointments = useQuery(api.appointments.listAppointments, isAuthenticated ? {} : "skip");
    const updateStatus = useMutation(api.appointments.updateStatus);
    const deleteAppointment = useMutation(api.appointments.remove);

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedId, setSelectedId] = useState<Id<"appointments"> | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [appointmentToDelete, setAppointmentToDelete] = useState<Id<"appointments"> | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const filteredAppointments = appointments?.filter(app =>
        app.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.serviceType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const selectedApp = appointments?.find(app => app._id === selectedId);

    const handleUpdateStatus = async (id: Id<"appointments">, status: string) => {
        try {
            await updateStatus({ id, status });
        } catch (error) {
            console.error("Failed to update status:", error);
            setErrorMessage("Não foi possível atualizar o estado do agendamento. Por favor, tente novamente.");
            setIsErrorModalOpen(true);
        }
    };

    const handleDelete = (e: React.MouseEvent, id: Id<"appointments">) => {
        e.stopPropagation();
        setAppointmentToDelete(id);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = async () => {
        if (appointmentToDelete) {
            setIsDeleting(true);
            try {
                await deleteAppointment({ id: appointmentToDelete });
                if (selectedId === appointmentToDelete) setSelectedId(null);
                setIsDeleteModalOpen(false);
                setAppointmentToDelete(null);
            } catch (error) {
                console.error("Failed to delete appointment:", error);
                setErrorMessage("Não foi possível eliminar o agendamento. Por favor, verifique a sua ligação ou tente mais tarde.");
                setIsErrorModalOpen(true);
            } finally {
                setIsDeleting(false);
            }
        }
    };

    return (
        <div className="space-y-10 relative">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight">Gestão de Agenda</h1>
                    <p className="text-slate-500 font-medium">Controle os pedidos de intervenção e consultoria técnica.</p>
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
                                placeholder="Filtrar por nome ou serviço..."
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-6 py-4 rounded-2xl border-2 border-slate-100 focus:border-primary outline-none transition-all text-sm font-medium"
                            />
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto custom-scrollbar divide-y divide-slate-50">
                        {filteredAppointments?.map((app) => (
                            <div
                                key={app._id}
                                onClick={() => setSelectedId(app._id)}
                                className={`w-full text-left p-6 hover:bg-slate-50 transition-all flex flex-col gap-2 relative group cursor-pointer ${selectedId === app._id ? 'bg-primary/5' : ''}`}
                            >
                                {selectedId === app._id && (
                                    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-primary" />
                                )}

                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">{app.serviceType}</span>
                                    <div className={`w-2.5 h-2.5 rounded-full ${app.status === 'confirmed' ? 'bg-emerald-500' :
                                        app.status === 'pending' ? 'bg-amber-500 animate-pulse' :
                                            'bg-slate-300'
                                        }`} />
                                </div>

                                <h4 className={`text-base font-black transition-colors ${selectedId === app._id ? 'text-primary' : 'text-slate-900'}`}>
                                    {app.customerName}
                                </h4>

                                <div className="flex items-center gap-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                    <span className="flex items-center gap-1.5"><Calendar size={12} /> {new Date(app.date).toLocaleDateString()}</span>
                                    <span>•</span>
                                    <span className="flex items-center gap-1.5"><Clock size={12} /> {app.time}</span>
                                </div>

                                <button
                                    onClick={(e) => handleDelete(e, app._id)}
                                    className="absolute right-6 top-1/2 -translate-y-1/2 p-2.5 bg-white text-red-500 rounded-xl shadow-lg border border-slate-100 opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white"
                                >
                                    <Trash2 size={14} />
                                </button>
                            </div>
                        ))}

                        {(!filteredAppointments || filteredAppointments.length === 0) && (
                            <div className="flex flex-col items-center justify-center py-32 px-10 text-center">
                                <Timer size={40} className="text-slate-100 mb-4" />
                                <p className="text-slate-400 font-black text-sm uppercase tracking-widest">Sem Marcações</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Content Area */}
                <div className="lg:col-span-8">
                    {selectedApp ? (
                        <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 h-[750px] flex flex-col overflow-hidden animate-in fade-in slide-in-from-right duration-500">
                            {/* Header Section */}
                            <div className="p-10 border-b border-slate-100 bg-slate-50/20">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                                    <div className="flex items-center gap-6">
                                        <div className="w-20 h-20 bg-slate-900 text-white rounded-[2rem] flex items-center justify-center font-black text-3xl shadow-xl shadow-slate-900/20">
                                            {selectedApp.customerName.charAt(0)}
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-3 mb-1">
                                                <h2 className="text-3xl font-black text-slate-900 tracking-tight">{selectedApp.customerName}</h2>
                                                <span className={`px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full ${selectedApp.status === 'confirmed' ? 'bg-emerald-50 text-emerald-600' :
                                                    selectedApp.status === 'pending' ? 'bg-amber-50 text-amber-600' :
                                                        'bg-slate-50 text-slate-400'
                                                    }`}>
                                                    {selectedApp.status}
                                                </span>
                                            </div>
                                            <p className="text-lg text-slate-500 font-medium">{selectedApp.serviceType}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        {selectedApp.status === 'pending' && (
                                            <button
                                                onClick={() => handleUpdateStatus(selectedApp._id, 'confirmed')}
                                                className="bg-emerald-500 text-white px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2 hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20"
                                            >
                                                <CheckCircle2 size={16} /> Confirmar
                                            </button>
                                        )}
                                        {(selectedApp.status === 'pending' || selectedApp.status === 'confirmed') && (
                                            <button
                                                onClick={() => handleUpdateStatus(selectedApp._id, 'cancelled')}
                                                className="bg-slate-100 text-slate-400 px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2 hover:bg-red-50 hover:text-red-500 transition-all"
                                            >
                                                <XCircle size={16} /> Cancelar
                                            </button>
                                        )}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="bg-white p-6 rounded-3xl border-2 border-slate-50 flex items-center gap-5 shadow-sm">
                                        <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-500 flex items-center justify-center">
                                            <Calendar size={20} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mb-0.5">Data Prevista</p>
                                            <p className="font-black text-slate-700 text-sm">{new Date(selectedApp.date).toLocaleDateString('pt-PT', { day: '2-digit', month: 'long', year: 'numeric' })}</p>
                                        </div>
                                    </div>
                                    <div className="bg-white p-6 rounded-3xl border-2 border-slate-50 flex items-center gap-5 shadow-sm">
                                        <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-500 flex items-center justify-center">
                                            <Clock size={20} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mb-0.5">Hora Marcada</p>
                                            <p className="font-black text-slate-700 text-sm">{selectedApp.time}</p>
                                        </div>
                                    </div>
                                    <div className="bg-white p-6 rounded-3xl border-2 border-slate-50 flex items-center gap-5 shadow-sm">
                                        <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-500 flex items-center justify-center">
                                            <MapPin size={20} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mb-0.5">Localização</p>
                                            <p className="font-black text-slate-700 text-sm">{selectedApp.location}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Details Content */}
                            <div className="flex-1 p-10 overflow-y-auto custom-scrollbar bg-slate-50/10">
                                <div className="space-y-10">
                                    {/* Contact Info */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <a href={`mailto:${selectedApp.email}`} className="flex items-center gap-4 p-5 bg-white rounded-[2rem] border border-slate-100 hover:border-primary transition-all group">
                                            <div className="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 group-hover:bg-primary group-hover:text-white transition-all flex items-center justify-center">
                                                <Mail size={18} />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Email</p>
                                                <p className="text-sm font-bold text-slate-600">{selectedApp.email}</p>
                                            </div>
                                        </a>
                                        <a href={`tel:${selectedApp.phone}`} className="flex items-center gap-4 p-5 bg-white rounded-[2rem] border border-slate-100 hover:border-primary transition-all group">
                                            <div className="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 group-hover:bg-emerald-500 group-hover:text-white transition-all flex items-center justify-center">
                                                <Phone size={18} />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Telefone</p>
                                                <p className="text-sm font-bold text-slate-600">{selectedApp.phone}</p>
                                            </div>
                                        </a>
                                    </div>

                                    {/* Message */}
                                    {selectedApp.message && (
                                        <div className="flex items-start gap-6">
                                            <div className="w-12 h-12 rounded-2xl bg-white border-2 border-slate-100 flex items-center justify-center flex-shrink-0 shadow-sm">
                                                <MessageSquare size={20} className="text-primary" />
                                            </div>
                                            <div className="space-y-4 flex-1">
                                                <div className="flex items-center gap-3">
                                                    <h4 className="font-black text-slate-400 uppercase text-[10px] tracking-[0.2em]">Notas Adicionais</h4>
                                                    <div className="h-px bg-slate-100 flex-1" />
                                                </div>
                                                <div className="bg-white px-8 py-8 rounded-[2rem] rounded-tl-none border border-slate-100 shadow-sm">
                                                    <p className="text-slate-600 text-lg leading-relaxed font-serif italic">
                                                        &quot;{selectedApp.message}&quot;
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 h-[750px] flex flex-col items-center justify-center text-center p-20">
                            <div className="w-32 h-32 bg-slate-50 rounded-[2.5rem] flex items-center justify-center mb-8 shadow-inner animate-pulse">
                                <Clock size={48} className="text-slate-200" />
                            </div>
                            <h3 className="text-3xl font-black text-slate-900 mb-3 tracking-tight">Agenda Namtech</h3>
                            <p className="text-slate-400 max-w-sm font-medium leading-relaxed">
                                Selecione um agendamento da lista para visualizar os detalhes, gerir o estado da marcação e contactar o cliente.
                            </p>
                        </div>
                    )}
                </div>
            </div>


            <DeleteConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={confirmDelete}
                title="Eliminar Agendamento"
                description="Tem a certeza que deseja eliminar este agendamento permanentemente? Esta ação não pode ser desfeita."
                isDeleting={isDeleting}
            />

            <ErrorModal
                isOpen={isErrorModalOpen}
                onClose={() => setIsErrorModalOpen(false)}
                title="Erro"
                message={errorMessage}
            />
        </div>
    );
}
