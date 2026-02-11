"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id, Doc } from "@/convex/_generated/dataModel";
import { Plus, Pencil, Trash2, X, Save, Search, MapPin, Calendar as CalendarIcon } from "lucide-react";
import { ImageUpload } from "@/features/backoffice/ImageUpload";
import { RichTextEditor } from "@/features/backoffice/RichTextEditor";
import Image from "next/image";
import { CustomDatePicker } from "@/components/ui/DatePicker";
import { CustomSelect } from "@/components/ui/Select";
import { CustomTimePicker } from "@/components/ui/TimePicker";

interface EventFormData {
    title: string;
    description: string;
    date: string;
    location: string;
    type: string;
    imageUrl: string;
    storageId?: string;
    featured: boolean;
    content: string;
    time?: string;
}

const initialForm: EventFormData = {
    title: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    location: '',
    type: 'Event',
    imageUrl: '',
    featured: false,
    content: '',
    time: '09:00'
};

export default function EventsPage() {
    const events = useQuery(api.events.list);
    const dbCategories = useQuery(api.categories.list, { type: "event" });
    const createEvent = useMutation(api.events.create);
    const updateEvent = useMutation(api.events.update);
    const deleteEvent = useMutation(api.events.remove);

    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState<Id<"events"> | null>(null);
    const [formData, setFormData] = useState<EventFormData>(initialForm);
    const [searchTerm, setSearchTerm] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const data = {
            title: formData.title,
            description: formData.description,
            date: formData.date,
            location: formData.location,
            type: formData.type,
            imageUrl: formData.imageUrl,
            storageId: formData.storageId as Id<"_storage"> | undefined,
            featured: formData.featured,
            content: formData.content,
            time: formData.time,
        };

        if (editingId) {
            await updateEvent({ id: editingId, ...data });
        } else {
            await createEvent(data);
        }

        setIsEditing(false);
        setEditingId(null);
        setFormData(initialForm);
    };

    const handleEdit = (event: Doc<"events">) => {
        setFormData({
            title: event.title,
            description: event.description,
            date: event.date,
            location: event.location,
            type: event.type,
            imageUrl: event.imageUrl,
            storageId: event.storageId,
            featured: event.featured,
            content: event.content || '',
            time: event.time || '09:00'
        });
        setEditingId(event._id);
        setIsEditing(true);
    };

    const handleDelete = async (id: Id<"events">) => {
        if (confirm("Tem certeza que deseja excluir este evento?")) {
            await deleteEvent({ id });
        }
    };

    const handleImageUpload = (storageId: string) => {
        setFormData(prev => ({ ...prev, storageId, imageUrl: '' }));
    };

    const filteredEvents = events?.filter(e =>
        e.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8 relative">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Eventos e Projetos</h1>
                    <p className="text-slate-500">Gerencie seus eventos comunitários e projetos</p>
                </div>
                <button
                    onClick={() => { setIsEditing(true); setEditingId(null); setFormData(initialForm); }}
                    className="bg-primary text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
                >
                    <Plus size={20} />
                    Novo Evento
                </button>
            </div>

            {/* Modal Overlay */}
            {isEditing && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity animate-in fade-in duration-300"
                        onClick={() => setIsEditing(false)}
                    />

                    {/* Modal Mockup content */}
                    <div className="relative bg-white w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] border border-slate-100 animate-in zoom-in-95 fade-in duration-300 custom-scrollbar">
                        <div className="p-8 md:p-12">
                            <div className="flex items-center justify-between mb-10">
                                <div>
                                    <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                                        {editingId ? 'Editar Evento' : 'Criar Novo Evento'}
                                    </h2>
                                    <p className="text-slate-500 mt-1">Preencha os detalhes para divulgar o evento.</p>
                                </div>
                                <button
                                    onClick={() => setIsEditing(false)}
                                    className="p-3 bg-slate-50 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-2xl transition-all"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="text-sm font-black text-slate-700 uppercase tracking-wider">Título do Evento</label>
                                        <input
                                            type="text"
                                            value={formData.title}
                                            onChange={e => setFormData({ ...formData, title: e.target.value })}
                                            placeholder="Ex: Workshop de Energias Renováveis..."
                                            className="w-full px-5 py-4 rounded-2xl border-2 border-slate-100 focus:border-primary outline-none transition-all text-lg font-medium bg-slate-50/50"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-black text-slate-700 uppercase tracking-wider">Localização</label>
                                        <input
                                            type="text"
                                            value={formData.location}
                                            onChange={e => setFormData({ ...formData, location: e.target.value })}
                                            placeholder="Ex: Luanda, Angola"
                                            className="w-full px-5 py-4 rounded-2xl border-2 border-slate-100 focus:border-primary outline-none transition-all bg-slate-50/50 font-medium"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-black text-slate-700 uppercase tracking-wider">Tipo de Atividade</label>
                                        <CustomSelect
                                            value={formData.type}
                                            options={dbCategories?.map(cat => ({ value: cat.name, label: cat.name })) || [
                                                { value: 'Event', label: 'Evento' },
                                                { value: 'Project', label: 'Projeto' },
                                                { value: 'Community', label: 'Comunidade' }
                                            ]}
                                            onChange={value => setFormData({ ...formData, type: value })}
                                            className="w-full"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-black text-slate-700 uppercase tracking-wider">Data do Evento</label>
                                        <CustomDatePicker
                                            value={formData.date}
                                            onChange={date => setFormData({ ...formData, date })}
                                            label=""
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-black text-slate-700 uppercase tracking-wider">Hora</label>
                                        <CustomTimePicker
                                            value={formData.time || '09:00'}
                                            onChange={time => setFormData({ ...formData, time })}
                                            label=""
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-black text-slate-700 uppercase tracking-wider">Breve Descrição</label>
                                    <textarea
                                        value={formData.description}
                                        onChange={e => setFormData({ ...formData, description: e.target.value })}
                                        className="w-full px-5 py-4 rounded-2xl border-2 border-slate-100 focus:border-primary outline-none transition-all h-28 bg-slate-50/50 resize-none font-medium text-slate-600"
                                        placeholder="Um resumo que aparecerá na listagem principal..."
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-black text-slate-700 uppercase tracking-wider">Detalhes Completos</label>
                                    <RichTextEditor
                                        value={formData.content}
                                        onChange={(content) => setFormData({ ...formData, content })}
                                        placeholder="Descreva o evento com todos os detalhes..."
                                    />
                                </div>

                                <div className="flex items-center gap-4 bg-primary/5 p-4 rounded-2xl border-2 border-primary/10">
                                    <input
                                        type="checkbox"
                                        id="featured"
                                        checked={formData.featured}
                                        onChange={e => setFormData({ ...formData, featured: e.target.checked })}
                                        className="w-6 h-6 rounded-lg border-primary/20 text-primary focus:ring-primary transition-all cursor-pointer"
                                    />
                                    <label htmlFor="featured" className="text-sm font-black text-primary uppercase tracking-wider cursor-pointer">Colocar em Destaque na Homepage</label>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-black text-slate-700 uppercase tracking-wider">Imagem Representativa</label>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50/50 p-6 rounded-3xl border-2 border-dashed border-slate-200">
                                        <ImageUpload
                                            value={formData.imageUrl}
                                            onChange={(sid) => handleImageUpload(sid)}
                                            onRemove={() => setFormData(prev => ({ ...prev, storageId: undefined, imageUrl: '' }))}
                                        />
                                        <div className="flex flex-col justify-center gap-3">
                                            <label className="text-xs font-bold text-slate-400 uppercase">Link da Imagem</label>
                                            <input
                                                type="text"
                                                value={formData.imageUrl}
                                                onChange={e => setFormData({ ...formData, imageUrl: e.target.value })}
                                                placeholder="https://..."
                                                className="w-full px-4 py-3 rounded-xl border-2 border-slate-100 focus:border-primary outline-none text-sm font-mono"
                                                disabled={!!formData.storageId}
                                            />
                                            <p className="text-[10px] text-slate-400">Pode carregar um ficheiro ou colar um link direto.</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-end gap-4 pt-10 border-t border-slate-100">
                                    <button
                                        type="button"
                                        onClick={() => setIsEditing(false)}
                                        className="px-8 py-4 rounded-2xl font-black text-slate-400 hover:text-slate-900 transition-all uppercase tracking-widest text-xs"
                                    >
                                        Descartar
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-10 py-4 rounded-2xl font-black bg-primary text-white hover:bg-slate-800 transition-all shadow-xl shadow-primary/20 flex items-center gap-3 uppercase tracking-widest text-xs"
                                    >
                                        <Save size={18} />
                                        {editingId ? 'Atualizar Evento' : 'Criar Evento'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Content List Section */}
            <div className={`transition-all duration-500 ${isEditing ? 'blur-sm grayscale opacity-30 select-none' : ''}`}>
                <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
                    <div className="p-6 border-b border-slate-100 flex items-center gap-4 bg-slate-50/30">
                        <div className="relative flex-1 max-w-sm">
                            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Procurar eventos ou locais..."
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-6 py-3 rounded-2xl border border-slate-200 focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all font-medium"
                            />
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50/50 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
                                <tr>
                                    <th className="p-6">Evento / Projeto</th>
                                    <th className="p-6">Tipo</th>
                                    <th className="p-6">Data & Local</th>
                                    <th className="p-6 text-right">Ações</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filteredEvents?.map((event) => (
                                    <tr key={event._id} className="hover:bg-slate-50 transition-colors group">
                                        <td className="p-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-16 h-12 rounded-xl bg-slate-100 overflow-hidden relative shadow-inner">
                                                    <Image src={event.imageUrl || 'https://images.unsplash.com/photo-1540575861501-7cf05a4b125a'} alt={event.title} fill className="object-cover transition-transform group-hover:scale-110 duration-500" />
                                                </div>
                                                <div>
                                                    <p className="font-black text-slate-900 line-clamp-1 leading-none mb-1">{event.title}</p>
                                                    {event.featured && (
                                                        <span className="text-[9px] bg-secondary text-primary px-2 py-0.5 rounded-full font-black uppercase tracking-tighter">Destaque</span>
                                                    )}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <span className={`px-4 py-1.5 rounded-full text-xs font-black border transition-all cursor-default uppercase tracking-wider ${event.type === 'Project' ? 'bg-blue-50 border-blue-100 text-blue-600' :
                                                event.type === 'Event' ? 'bg-green-50 border-green-100 text-green-600' :
                                                    'bg-slate-50 border-slate-100 text-slate-500'
                                                }`}>
                                                {event.type}
                                            </span>
                                        </td>
                                        <td className="p-6">
                                            <div className="flex flex-col gap-1">
                                                <div className="flex items-center gap-2 text-slate-600 font-bold text-sm">
                                                    <CalendarIcon size={14} className="text-primary/60" />
                                                    {new Date(event.date).toLocaleDateString('pt-PT', { day: 'numeric', month: 'short' })}
                                                    {event.time && <span className="text-slate-400 font-normal ml-1">às {event.time}</span>}
                                                </div>
                                                <div className="flex items-center gap-2 text-[10px] font-black text-slate-300 uppercase tracking-wider">
                                                    <MapPin size={10} />
                                                    {event.location}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-6 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    onClick={() => handleEdit(event)}
                                                    className="p-3 bg-white hover:bg-blue-500 rounded-xl text-slate-400 hover:text-white transition-all shadow-sm border border-slate-100"
                                                    title="Editar"
                                                >
                                                    <Pencil size={18} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(event._id)}
                                                    className="p-3 bg-white hover:bg-red-500 rounded-xl text-slate-400 hover:text-white transition-all shadow-sm border border-slate-100"
                                                    title="Excluir"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {filteredEvents?.length === 0 && (
                            <div className="text-center py-24">
                                <p className="text-slate-400 font-bold text-xl">Nenhum evento encontrado.</p>
                                <p className="text-slate-300 text-sm mt-1">Tente ajustar os filtros de busca.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
