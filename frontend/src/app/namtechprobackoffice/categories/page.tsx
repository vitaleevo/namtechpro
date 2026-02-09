"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Plus, Pencil, Trash2, X, Save, Search, Layers, Type, FileText } from "lucide-react";
import { CustomSelect } from "@/components/ui/Select";

interface CategoryFormData {
    name: string;
    slug: string;
    type: string;
    description: string;
}

const initialForm: CategoryFormData = {
    name: '',
    slug: '',
    type: 'product',
    description: ''
};

export default function CategoriesPage() {
    const categories = useQuery(api.categories.list, {});
    const createCategory = useMutation(api.categories.create);
    const updateCategory = useMutation(api.categories.update);
    const deleteCategory = useMutation(api.categories.remove);

    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState<Id<"categories"> | null>(null);
    const [formData, setFormData] = useState<CategoryFormData>(initialForm);
    const [searchTerm, setSearchTerm] = useState("");

    const generateSlug = (name: string) => {
        return name
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^\w\s-]/g, "")
            .replace(/[\s+]/g, "-")
            .replace(/-+/g, "-")
            .trim();
    };

    const handleNameChange = (name: string) => {
        setFormData(prev => ({
            ...prev,
            name,
            slug: editingId ? prev.slug : generateSlug(name)
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const data = {
            name: formData.name,
            slug: formData.slug,
            type: formData.type,
            description: formData.description || undefined,
        };

        if (editingId) {
            await updateCategory({ id: editingId, ...data });
        } else {
            await createCategory(data);
        }

        setIsEditing(false);
        setEditingId(null);
        setFormData(initialForm);
    };

    const handleEdit = (category: any) => {
        setFormData({
            name: category.name,
            slug: category.slug,
            type: category.type,
            description: category.description || ''
        });
        setEditingId(category._id);
        setIsEditing(true);
    };

    const handleDelete = async (id: Id<"categories">) => {
        if (confirm("Tem certeza que deseja excluir esta categoria?")) {
            await deleteCategory({ id });
        }
    };

    const filteredCategories = categories?.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.type.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8 relative">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Gestão de Categorias</h1>
                    <p className="text-slate-500">Organize seus produtos e posts de blog</p>
                </div>
                <button
                    onClick={() => { setIsEditing(true); setEditingId(null); setFormData(initialForm); }}
                    className="bg-primary text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
                >
                    <Plus size={20} />
                    Nova Categoria
                </button>
            </div>

            {/* Modal Overlay */}
            {isEditing && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
                    <div
                        className="absolute inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity animate-in fade-in duration-300"
                        onClick={() => setIsEditing(false)}
                    />

                    <div className="relative bg-white w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] border border-slate-100 animate-in zoom-in-95 fade-in duration-300 custom-scrollbar">
                        <div className="p-8 md:p-12">
                            <div className="flex items-center justify-between mb-10">
                                <div>
                                    <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                                        {editingId ? 'Editar Categoria' : 'Nova Categoria'}
                                    </h2>
                                    <p className="text-slate-500 mt-1">Defina como os itens serão agrupados no site.</p>
                                </div>
                                <button
                                    onClick={() => setIsEditing(false)}
                                    className="p-3 bg-slate-50 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-2xl transition-all"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-black text-slate-700 uppercase tracking-wider">Nome da Categoria</label>
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={e => handleNameChange(e.target.value)}
                                            className="w-full px-5 py-4 rounded-2xl border-2 border-slate-100 focus:border-primary outline-none transition-all text-lg font-medium bg-slate-50/50"
                                            placeholder="Ex: Painéis Solares"
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-black text-slate-700 uppercase tracking-wider">Slug (URL)</label>
                                        <input
                                            type="text"
                                            value={formData.slug}
                                            onChange={e => setFormData({ ...formData, slug: e.target.value })}
                                            className="w-full px-5 py-4 rounded-2xl border-2 border-slate-100 focus:border-primary outline-none transition-all bg-slate-50/50 font-mono text-sm text-slate-500"
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-black text-slate-700 uppercase tracking-wider">Tipo de Uso</label>
                                        <CustomSelect
                                            value={formData.type}
                                            options={[
                                                { value: 'product', label: 'Produtos (Catálogo)' },
                                                { value: 'blog', label: 'Blog / Notícias' },
                                                { value: 'event', label: 'Eventos & Projetos' }
                                            ]}
                                            onChange={value => setFormData({ ...formData, type: value })}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-black text-slate-700 uppercase tracking-wider">Descrição (Opcional)</label>
                                        <textarea
                                            value={formData.description}
                                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                                            className="w-full px-5 py-4 rounded-2xl border-2 border-slate-100 focus:border-primary outline-none transition-all h-28 bg-slate-50/50 resize-none font-medium text-slate-600"
                                            placeholder="Descreva o propósito desta categoria..."
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-end gap-4 pt-10 border-t border-slate-100">
                                    <button
                                        type="button"
                                        onClick={() => setIsEditing(false)}
                                        className="px-8 py-4 rounded-2xl font-black text-slate-400 hover:text-slate-900 transition-all uppercase tracking-widest text-xs"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-10 py-4 rounded-2xl font-black bg-primary text-white hover:bg-slate-800 transition-all shadow-xl shadow-primary/20 flex items-center gap-3 uppercase tracking-widest text-xs"
                                    >
                                        <Save size={18} />
                                        {editingId ? 'Guardar Alterações' : 'Criar Categoria'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Table Section */}
            <div className={`transition-all duration-500 ${isEditing ? 'blur-sm grayscale opacity-30 select-none' : ''}`}>
                <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
                    <div className="p-6 border-b border-slate-100 flex items-center gap-4 bg-slate-50/30">
                        <div className="relative flex-1 max-w-sm">
                            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Procurar categorias..."
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
                                    <th className="p-6">Nome & Slug</th>
                                    <th className="p-6">Tipo</th>
                                    <th className="p-6">Descrição</th>
                                    <th className="p-6 text-right">Ações</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filteredCategories?.map((category) => (
                                    <tr key={category._id} className="hover:bg-slate-50 transition-colors group">
                                        <td className="p-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-xl bg-primary/5 text-primary flex items-center justify-center">
                                                    <Type size={18} />
                                                </div>
                                                <div>
                                                    <p className="font-black text-slate-900 leading-none mb-1">{category.name}</p>
                                                    <p className="text-[10px] font-mono text-slate-400">/{category.slug}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <div className="flex items-center gap-2">
                                                {category.type === 'product' ? (
                                                    <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                                                        <Layers size={12} />
                                                        Produtos
                                                    </span>
                                                ) : (
                                                    <span className="px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                                                        <FileText size={12} />
                                                        Blog
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="p-6 max-w-xs">
                                            <p className="text-sm text-slate-500 truncate font-medium">
                                                {category.description || 'Sem descrição'}
                                            </p>
                                        </td>
                                        <td className="p-6 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    onClick={() => handleEdit(category)}
                                                    className="p-3 bg-white hover:bg-blue-500 rounded-xl text-slate-400 hover:text-white transition-all shadow-sm border border-slate-100"
                                                >
                                                    <Pencil size={18} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(category._id)}
                                                    className="p-3 bg-white hover:bg-red-500 rounded-xl text-slate-400 hover:text-white transition-all shadow-sm border border-slate-100"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {(!filteredCategories || filteredCategories.length === 0) && (
                            <div className="text-center py-24">
                                <p className="text-slate-400 font-bold text-xl">Nenhuma categoria encontrada.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
