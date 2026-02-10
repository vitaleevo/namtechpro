"use client";

import React, { useRef, useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { motion, AnimatePresence } from "framer-motion";
import { PlusCircle, Edit2, X, Upload, ArrowUpRight } from "lucide-react";

interface ProductFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    editingItem: any | null;
    onSaved: () => void;
}

export const ProductFormModal: React.FC<ProductFormModalProps> = ({
    isOpen,
    onClose,
    editingItem,
    onSaved,
}) => {
    const addProduct = useMutation(api.products.addProduct);
    const updateProduct = useMutation(api.products.updateProduct);
    const generateUploadUrl = useMutation(api.products.generateUploadUrl);

    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isUploading, setIsUploading] = useState(false);

    const [formData, setFormData] = useState<any>(() => {
        if (editingItem) {
            return { ...editingItem, specs: editingItem.specs.join(", ") };
        }
        return {
            name: "",
            category: "Navegação",
            description: "",
            imageUrl: "",
            status: "Novo",
            brand: "",
            specs: "",
        };
    });

    // Reset form when editingItem changes
    React.useEffect(() => {
        if (editingItem) {
            setFormData({ ...editingItem, specs: editingItem.specs.join(", ") });
        } else {
            setFormData({
                name: "",
                category: "Navegação",
                description: "",
                imageUrl: "",
                status: "Novo",
                brand: "",
                specs: "",
            });
        }
    }, [editingItem]);

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
            setFormData((prev: any) => ({ ...prev, storageId, imageUrl: "Imagem Carregada com Sucesso" }));
        } catch (error) {
            console.error("Upload failed", error);
        } finally {
            setIsUploading(false);
        }
    };

    const handleSubmit = async (e?: React.FormEvent) => {
        e?.preventDefault();
        const data = {
            ...formData,
            specs: formData.specs
                .split(",")
                .map((s: string) => s.trim())
                .filter((s: string) => s !== ""),
        };

        try {
            if (editingItem) {
                await updateProduct({ id: editingItem._id, ...data });
            } else {
                await addProduct(data);
            }
            onSaved();
            onClose();
        } catch (error) {
            console.error("Error saving product:", error);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-12">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-slate-950/80 backdrop-blur-xl"
                        onClick={onClose}
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 40 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 40 }}
                        className="relative w-full max-w-3xl bg-white rounded-[4rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
                    >
                        {/* Header */}
                        <div className="px-12 py-10 border-b border-slate-100 flex items-center justify-between">
                            <h2 className="text-3xl font-black text-slate-900 tracking-tighter flex items-center gap-4">
                                <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white">
                                    {editingItem ? <Edit2 size={24} /> : <PlusCircle size={24} />}
                                </div>
                                {editingItem ? "Editar Equipamento" : "Novo Equipamento"}
                            </h2>
                            <button
                                onClick={onClose}
                                className="w-12 h-12 rounded-2xl bg-slate-50 text-slate-400 hover:text-red-500 transition-all flex items-center justify-center"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="p-12 space-y-8 overflow-y-auto custom-scrollbar flex-1">
                            <div className="grid grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 ml-1">Nome Técnico</label>
                                    <input
                                        className="w-full px-8 py-5 rounded-[2rem] bg-slate-50 border-2 border-transparent focus:border-blue-600 outline-none transition-all text-slate-900 font-black"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 ml-1">Categoria Operacional</label>
                                    <select
                                        className="w-full px-8 py-5 rounded-[2rem] bg-slate-50 border-2 border-transparent focus:border-blue-600 outline-none transition-all text-slate-900 font-black cursor-pointer"
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    >
                                        <option>Navegação</option>
                                        <option>Comunicação</option>
                                        <option>Energia</option>
                                        <option>Controlo</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 ml-1">Descrição do Módulo</label>
                                <textarea
                                    className="w-full px-8 py-5 rounded-[2.5rem] bg-slate-50 border-2 border-transparent focus:border-blue-600 outline-none transition-all text-slate-900 font-bold resize-none"
                                    rows={4}
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 ml-1">Marca / Fabricante</label>
                                    <input
                                        className="w-full px-8 py-5 rounded-[2rem] bg-slate-50 border-2 border-transparent focus:border-blue-600 outline-none transition-all text-slate-900 font-black"
                                        value={formData.brand}
                                        onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 ml-1">Estado do Stock</label>
                                    <input
                                        className="w-full px-8 py-5 rounded-[2rem] bg-slate-50 border-2 border-transparent focus:border-blue-600 outline-none transition-all text-slate-900 font-black"
                                        value={formData.status}
                                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 ml-1">Media & Imagens</label>
                                <div className="flex gap-4">
                                    <input
                                        className="flex-1 px-8 py-5 rounded-[2rem] bg-slate-50 border-2 border-transparent focus:border-blue-600 outline-none transition-all text-slate-900 font-bold"
                                        value={formData.imageUrl}
                                        onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                                        placeholder="URL da Imagem ou Carregar Ficheiro"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => fileInputRef.current?.click()}
                                        disabled={isUploading}
                                        className="w-20 h-20 rounded-[2rem] bg-slate-900 text-white flex items-center justify-center hover:bg-blue-600 transition-all shrink-0 shadow-xl"
                                    >
                                        {isUploading ? (
                                            <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        ) : (
                                            <Upload size={24} />
                                        )}
                                    </button>
                                    <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" accept="image/*" />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 ml-1">Especificações Técnicas (CSV)</label>
                                <input
                                    className="w-full px-8 py-5 rounded-[2rem] bg-slate-50 border-2 border-transparent focus:border-blue-600 outline-none transition-all text-slate-900 font-bold"
                                    value={formData.specs}
                                    onChange={(e) => setFormData({ ...formData, specs: e.target.value })}
                                    placeholder="Doppler, Radar, 24 inches..."
                                />
                            </div>
                        </form>

                        {/* Footer Actions */}
                        <div className="p-12 bg-slate-50 border-t border-slate-100 flex gap-6">
                            <button
                                type="button"
                                onClick={onClose}
                                className="flex-1 py-6 rounded-3xl border-2 border-slate-200 font-black text-slate-400 hover:bg-white transition-all"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={() => handleSubmit()}
                                className="flex-[2] py-6 bg-blue-600 text-white rounded-3xl font-black shadow-2xl shadow-blue-600/30 hover:bg-blue-700 transition-all flex items-center justify-center gap-3"
                            >
                                Confirmar e Sincronizar <ArrowUpRight size={20} />
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
