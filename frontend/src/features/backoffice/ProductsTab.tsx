"use client";

import React from "react";
import {
    Search,
    Filter,
    Download,
    Edit2,
    Trash2,
} from "lucide-react";
import Image from "next/image";

interface Product {
    _id: string;
    name: string;
    category: string;
    brand: string;
    status: string;
    imageUrl: string;
    description: string;
    specs: string[];
    storageId?: string;
}

interface ProductsTabProps {
    products: Product[] | undefined;
    onEdit: (item: Product) => void;
    onDelete: (id: string) => void;
}

export const ProductsTab: React.FC<ProductsTabProps> = ({ products, onEdit, onDelete }) => {
    return (
        <div className="space-y-8">
            {/* Search & Filters */}
            <div className="flex justify-between items-center bg-white p-6 rounded-[2.5rem] border border-slate-100">
                <div className="flex items-center gap-4 flex-1 max-w-md">
                    <Search size={20} className="text-slate-400" />
                    <input
                        type="text"
                        placeholder="Filtrar por nome ou marca..."
                        className="bg-transparent border-none outline-none font-bold text-slate-600 w-full"
                    />
                </div>
                <div className="flex items-center gap-4">
                    <button className="p-3 bg-slate-50 rounded-xl text-slate-500 hover:text-blue-600 transition-all">
                        <Filter size={20} />
                    </button>
                    <button className="p-3 bg-slate-50 rounded-xl text-slate-500 hover:text-blue-600 transition-all">
                        <Download size={20} />
                    </button>
                </div>
            </div>

            {/* Products Table */}
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
                            {products?.map((item) => (
                                <tr key={item._id} className="group hover:bg-slate-50/50 transition-all">
                                    <td className="px-10 py-8">
                                        <div className="flex items-center gap-6">
                                            <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-100 shrink-0 border border-slate-100 relative">
                                                <Image
                                                    src={item.imageUrl || "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae"}
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
                                            <button
                                                onClick={() => onEdit(item)}
                                                className="w-11 h-11 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all shadow-lg"
                                            >
                                                <Edit2 size={18} />
                                            </button>
                                            <button
                                                onClick={() => onDelete(item._id)}
                                                className="w-11 h-11 rounded-xl bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all shadow-lg"
                                            >
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
};
