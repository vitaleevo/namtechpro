"use client";

import React, { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Plus, Pencil, Trash2, X, Save, Search, Package, Tag, Layers } from "lucide-react";
import { ImageUpload } from "@/features/backoffice/ImageUpload";
import Image from "next/image";
import { CustomSelect } from "@/components/ui/Select";

interface ProductFormData {
    name: string;
    category: string;
    description: string;
    imageUrl: string;
    storageId?: string;
    status: string;
    brand: string;
    specs: string; // Helper for text area
}

const initialForm: ProductFormData = {
    name: '',
    category: 'Energia Solar',
    description: '',
    imageUrl: '',
    status: 'Disponível',
    brand: 'Namtech',
    specs: ''
};

export default function ProductsPage() {
    const products = useQuery(api.products.list);
    const dbCategories = useQuery(api.categories.list, { type: "product" });
    const createProduct = useMutation(api.products.addProduct);
    const updateProduct = useMutation(api.products.updateProduct);
    const deleteProduct = useMutation(api.products.deleteProduct);

    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState<Id<"products"> | null>(null);
    const [formData, setFormData] = useState<ProductFormData>(initialForm);
    const [searchTerm, setSearchTerm] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const specsArray = formData.specs.split('\n').filter(s => s.trim() !== '');

        const data = {
            name: formData.name,
            category: formData.category,
            description: formData.description,
            imageUrl: formData.imageUrl,
            storageId: formData.storageId as Id<"_storage"> | undefined,
            status: formData.status,
            brand: formData.brand,
            specs: specsArray,
        };

        try {
            if (editingId) {
                await updateProduct({ id: editingId, ...data });
            } else {
                await createProduct(data);
            }

            setIsEditing(false);
            setEditingId(null);
            setFormData(initialForm);
        } catch (error: any) {
            console.error("Erro ao salvar produto:", error);
            alert(error.message || "Erdro desconhecido ao salvar. Verifique se está autenticado.");
        }
    };

    const handleEdit = (product: any) => {
        setFormData({
            name: product.name,
            category: product.category,
            description: product.description,
            imageUrl: product.imageUrl,
            storageId: product.storageId,
            status: product.status,
            brand: product.brand,
            specs: product.specs.join('\n')
        });
        setEditingId(product._id);
        setIsEditing(true);
    };

    const handleDelete = async (id: Id<"products">) => {
        if (confirm("Tem certeza que deseja excluir este produto?")) {
            await deleteProduct({ id });
        }
    };

    const handleImageUpload = (storageId: string) => {
        setFormData(prev => ({ ...prev, storageId }));
    };

    const filteredProducts = products?.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8 relative">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Catálogo de Produtos</h1>
                    <p className="text-slate-500">Gerencie seu inventário de soluções tecnológicas</p>
                </div>
                <button
                    onClick={() => { setIsEditing(true); setEditingId(null); setFormData(initialForm); }}
                    className="bg-primary text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
                >
                    <Plus size={20} />
                    Novo Produto
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

                    {/* Modal Content */}
                    <div className="relative bg-white w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] border border-slate-100 animate-in zoom-in-95 fade-in duration-300 custom-scrollbar">
                        <div className="p-8 md:p-12">
                            <div className="flex items-center justify-between mb-10">
                                <div>
                                    <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                                        {editingId ? 'Editar Produto' : 'Adicionar ao Catálogo'}
                                    </h2>
                                    <p className="text-slate-500 mt-1">Configure as especificações e visibilidade do item.</p>
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
                                        <label className="text-sm font-black text-slate-700 uppercase tracking-wider">Nome do Produto</label>
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full px-5 py-4 rounded-2xl border-2 border-slate-100 focus:border-primary outline-none transition-all text-lg font-medium bg-slate-50/50"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-black text-slate-700 uppercase tracking-wider">Marca / Fabricante</label>
                                        <input
                                            type="text"
                                            value={formData.brand}
                                            onChange={e => setFormData({ ...formData, brand: e.target.value })}
                                            className="w-full px-5 py-4 rounded-2xl border-2 border-slate-100 focus:border-primary outline-none transition-all bg-slate-50/50 font-medium"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-black text-slate-700 uppercase tracking-wider">Categoria</label>
                                        <CustomSelect
                                            value={formData.category}
                                            options={dbCategories?.map(cat => ({ value: cat.name, label: cat.name })) || [
                                                { value: 'Energia Solar', label: 'Energia Solar' },
                                                { value: 'Mobilidade Elétrica', label: 'Mobilidade Elétrica' },
                                                { value: 'Iluminação', label: 'Iluminação' },
                                                { value: 'Agricultura', label: 'Agricultura' },
                                                { value: 'Segurança', label: 'Segurança' }
                                            ]}
                                            onChange={value => setFormData({ ...formData, category: value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-black text-slate-700 uppercase tracking-wider">Status de Disponibilidade</label>
                                        <CustomSelect
                                            value={formData.status}
                                            options={[
                                                { value: 'Disponível', label: 'Disponível' },
                                                { value: 'Novo', label: 'Item Novo (Badge)' },
                                                { value: 'Esgotado', label: 'Sem Stock' },
                                                { value: 'Top Vendas', label: 'Destaque de Vendas' }
                                            ]}
                                            onChange={value => setFormData({ ...formData, status: value })}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-black text-slate-700 uppercase tracking-wider">Descrição Comercial</label>
                                    <textarea
                                        value={formData.description}
                                        onChange={e => setFormData({ ...formData, description: e.target.value })}
                                        className="w-full px-5 py-4 rounded-2xl border-2 border-slate-100 focus:border-primary outline-none transition-all h-28 bg-slate-50/50 resize-none font-medium text-slate-600"
                                        placeholder="Breve resumo sobre a solução e seus benefícios..."
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-black text-slate-700 uppercase tracking-wider">Ficha Técnica (uma por linha)</label>
                                    <textarea
                                        value={formData.specs}
                                        onChange={e => setFormData({ ...formData, specs: e.target.value })}
                                        className="w-full px-5 py-4 rounded-2xl border-2 border-slate-100 focus:border-primary outline-none transition-all h-32 bg-slate-50/50 font-mono text-sm"
                                        placeholder="- Potência: 550W&#10;- Eficiência: 21.3%&#10;- Garantia: 25 anos"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-black text-slate-700 uppercase tracking-wider">Imagem do Produto</label>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50/50 p-6 rounded-3xl border-2 border-dashed border-slate-200">
                                        <ImageUpload
                                            value={formData.imageUrl}
                                            onChange={(sid) => handleImageUpload(sid)}
                                            onRemove={() => setFormData(prev => ({ ...prev, storageId: undefined, imageUrl: '' }))}
                                        />
                                        <div className="flex flex-col justify-center gap-3">
                                            <label className="text-xs font-bold text-slate-400 uppercase">Link Direto da Imagem</label>
                                            <input
                                                type="text"
                                                value={formData.imageUrl}
                                                onChange={e => setFormData({ ...formData, imageUrl: e.target.value })}
                                                placeholder="https://..."
                                                className="w-full px-4 py-3 rounded-xl border-2 border-slate-100 focus:border-primary outline-none text-sm font-mono"
                                                disabled={!!formData.storageId}
                                            />
                                            <p className="text-[10px] text-slate-400 italic">O upload direta fornece melhor performance de carregamento.</p>
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
                                        {editingId ? 'Atualizar Produto' : 'Publicar no Site'}
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
                                placeholder="Procurar produtos por nome ou categoria..."
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
                                    <th className="p-6">Informação do Produto</th>
                                    <th className="p-6">Categoria & Marca</th>
                                    <th className="p-6">Estado</th>
                                    <th className="p-6 text-right">Ações</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filteredProducts?.map((product) => (
                                    <tr key={product._id} className="hover:bg-slate-50 transition-colors group">
                                        <td className="p-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-16 h-12 rounded-xl bg-slate-100 overflow-hidden relative shadow-inner">
                                                    <Image
                                                        src={(product.imageUrl && typeof product.imageUrl === 'string' && product.imageUrl !== "") ? product.imageUrl : 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae'}
                                                        alt={product.name}
                                                        fill
                                                        className="object-cover transition-transform group-hover:scale-110 duration-500"
                                                    />
                                                </div>
                                                <div>
                                                    <p className="font-black text-slate-900 line-clamp-1 leading-none mb-1">{product.name}</p>
                                                    <div className="flex items-center gap-2 text-[10px] font-black text-slate-300 uppercase tracking-widest leading-none">
                                                        <Tag size={10} />
                                                        Ref: {product._id.toString().slice(-4).toUpperCase()}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <div className="flex flex-col gap-1">
                                                <div className="flex items-center gap-2 text-slate-600 font-bold text-sm">
                                                    <Layers size={14} className="text-primary/60" />
                                                    {product.category}
                                                </div>
                                                <div className="flex items-center gap-2 text-[10px] font-black text-slate-300 uppercase tracking-wider">
                                                    <Package size={10} />
                                                    {product.brand}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <span className={`px-4 py-1.5 rounded-full text-xs font-black border transition-all cursor-default uppercase tracking-wider ${product.status === 'Disponível' ? 'bg-green-50 border-green-100 text-green-600' :
                                                product.status === 'Novo' ? 'bg-blue-50 border-blue-100 text-blue-600' :
                                                    product.status === 'Top Vendas' ? 'bg-amber-50 border-amber-100 text-amber-600' :
                                                        'bg-slate-50 border-slate-100 text-slate-500'
                                                }`}>
                                                {product.status}
                                            </span>
                                        </td>
                                        <td className="p-6 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    onClick={() => handleEdit(product)}
                                                    className="p-3 bg-white hover:bg-blue-500 rounded-xl text-slate-400 hover:text-white transition-all shadow-sm border border-slate-100"
                                                    title="Editar Detalhes"
                                                >
                                                    <Pencil size={18} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(product._id)}
                                                    className="p-3 bg-white hover:bg-red-500 rounded-xl text-slate-400 hover:text-white transition-all shadow-sm border border-slate-100"
                                                    title="Remover Item"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {(!filteredProducts || filteredProducts.length === 0) && (
                            <div className="text-center py-24">
                                <p className="text-slate-400 font-bold text-xl">Nenhum produto em stock.</p>
                                <p className="text-slate-300 text-sm mt-1">Tente ajustar a sua pesquisa.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
