"use client";

import React, { useState, useMemo } from 'react';
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Mail, Eye, X, Check, Verified, List } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from '@/i18n';
import { productTranslations } from './productTranslations';

export const CatalogContent = () => {
    const { t, language } = useLanguage();
    const products = useQuery(api.products.list);
    const [searchTerm, setSearchTerm] = useState('');

    // Use a fixed sentinel value for "All" to avoid logic issues when language changes
    const ALL_CATEGORY = 'ALL_CATEGORIES_SENTINEL';
    const [selectedCategory, setSelectedCategory] = useState(ALL_CATEGORY);

    const [detailedProduct, setDetailedProduct] = useState<any>(null);

    const categories = useMemo(() => {
        if (!products) return [ALL_CATEGORY];
        return [ALL_CATEGORY, ...Array.from(new Set(products.map(p => p.category)))];
    }, [products]);

    // Helper function to translate database category values to current language
    const getCategoryLabel = (cat: string) => {
        if (cat === ALL_CATEGORY) return t.catalog.all;

        // Map known DB values (likely in PT) to translation keys
        const map: Record<string, string> = {
            'Navegação': t.catalog.catNavigation,
            'Controlo': t.catalog.catControl,
            'Comunicação': t.catalog.catCommunication,
            'Energia': t.catalog.catEnergy,
            // Add fallbacks if needed
            'Navigation': t.catalog.catNavigation,
            'Control': t.catalog.catControl,
            'Communication': t.catalog.catCommunication,
            'Energy': t.catalog.catEnergy,
            'Contrôle': t.catalog.catControl,
            'Énergie': t.catalog.catEnergy
        };

        return map[cat] || cat;
    };

    // Helper function to translate status
    const getStatusLabel = (status: string) => {
        const map: Record<string, string> = {
            'Novo': t.catalog.statusNew,
            'Disponivel': t.catalog.statusAvailable,
            'Disponível': t.catalog.statusAvailable,
            'Top Vendas': t.catalog.statusBestSeller,
            'New': t.catalog.statusNew,
            'Available': t.catalog.statusAvailable,
            'Best Seller': t.catalog.statusBestSeller
        };
        return map[status] || status;
    };

    // Helper to translate product content (name, desc, specs)
    const getTranslatedProduct = (product: any) => {
        if (language === 'PT') return product;

        const translations = productTranslations[product.name];
        if (!translations) return product;

        const langTrans = translations[language as 'EN' | 'FR'];
        if (!langTrans) return product;

        return {
            ...product,
            name: langTrans.name || product.name,
            description: langTrans.description || product.description,
            specs: langTrans.specs || product.specs
        };
    };

    const filteredProducts = useMemo(() => {
        if (!products) return [];
        return products.filter(p =>
            (selectedCategory === ALL_CATEGORY || p.category === selectedCategory) &&
            (p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                p.brand.toLowerCase().includes(searchTerm.toLowerCase()))
        );
    }, [products, searchTerm, selectedCategory]);

    const closeModal = () => setDetailedProduct(null);

    if (products === undefined) {
        return (
            <div className="pt-40 pb-24 flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="pt-32 pb-24 bg-slate-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16">
                    <div className="max-w-xl">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-6xl font-display font-black text-primary mb-4 tracking-tighter"
                        >
                            {t.catalog.title} <span className="text-secondary">{t.catalog.titleHighlight}</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-slate-500"
                        >
                            {t.catalog.subtitle}
                        </motion.p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                        <div className="relative flex-1 sm:w-80">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                            <input
                                type="text"
                                placeholder={t.catalog.searchPlaceholder}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 bg-white border-none rounded-2xl shadow-sm focus:ring-2 focus:ring-primary outline-none transition-all"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Sidebar Filters */}
                    <aside className="lg:w-64 space-y-10">
                        <div>
                            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-6">{t.catalog.categories}</h3>
                            <div className="space-y-2">
                                {categories.map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => setSelectedCategory(cat)}
                                        className={`w-full flex items-center justify-between p-4 rounded-xl transition-all font-bold text-sm ${selectedCategory === cat
                                            ? 'bg-primary text-white shadow-lg'
                                            : 'bg-white text-slate-600 hover:bg-slate-100'
                                            }`}
                                    >
                                        {getCategoryLabel(cat)}
                                        {selectedCategory === cat && <Check size={16} />}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="bg-primary/5 p-8 rounded-[2rem] border border-primary/10">
                            <h4 className="text-sm font-bold text-primary mb-4 flex items-center gap-2">
                                <Verified size={18} />
                                {t.catalog.qualityGuaranteed}
                            </h4>
                            <p className="text-xs text-slate-500 leading-relaxed">
                                {t.catalog.qualityDesc}
                            </p>
                        </div>
                    </aside>

                    {/* Product Grid */}
                    <div className="flex-1">
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                            {filteredProducts.map((p, idx) => {
                                const product = getTranslatedProduct(p);
                                return (
                                    <motion.div
                                        layout
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.05 }}
                                        key={product._id}
                                        className="group bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden hover:shadow-2xl transition-all duration-500 flex flex-col"
                                    >
                                        <div className="relative h-64 bg-slate-100 overflow-hidden">
                                            <Image
                                                src={product.imageUrl && typeof product.imageUrl === 'string' && product.imageUrl !== "" ? product.imageUrl : 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae'}
                                                alt={product.name}
                                                fill
                                                className="object-cover group-hover:scale-110 transition-transform duration-700"
                                            />
                                            <div className="absolute top-6 left-6 flex flex-col gap-2">
                                                <span className="bg-primary text-white text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
                                                    {getStatusLabel(product.status)}
                                                </span>
                                                <span className="bg-secondary text-primary text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
                                                    {product.brand}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="p-8 flex-1 flex flex-col">
                                            <p className="text-[10px] font-black text-secondary uppercase tracking-[0.3em] mb-3">
                                                {getCategoryLabel(product.category)}
                                            </p>
                                            <h3 className="text-xl font-bold text-slate-900 mb-2 leading-tight group-hover:text-primary transition-colors">
                                                {product.name}
                                            </h3>
                                            <p className="text-sm text-slate-500 mb-6 line-clamp-2">{product.description}</p>

                                            <div className="space-y-3 mb-8">
                                                {product.specs.slice(0, 3).map((s: string, i: number) => (
                                                    <div key={i} className="flex items-center gap-2 text-[11px] font-medium text-slate-400">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                                                        {s}
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="mt-auto space-y-3">
                                                <Link
                                                    href={`/contactos?subject=${encodeURIComponent(product.name)}`}
                                                    className="w-full bg-primary text-white py-4 rounded-xl font-black text-sm hover:bg-slate-800 hover:scale-[1.02] transition-all flex items-center justify-center gap-3 shadow-lg shadow-primary/10"
                                                >
                                                    <Mail size={16} />
                                                    {t.catalog.requestQuote}
                                                </Link>
                                                <button
                                                    onClick={() => setDetailedProduct(product)}
                                                    className="w-full bg-slate-100 text-slate-600 py-4 rounded-xl font-bold text-sm hover:bg-slate-200 transition-all flex items-center justify-center gap-3"
                                                >
                                                    <Eye size={16} />
                                                    {t.catalog.viewDetails}
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>

                        {filteredProducts.length === 0 && (
                            <div className="text-center py-40 bg-white rounded-[4rem]">
                                <Search size={64} className="mx-auto text-slate-200 mb-6" />
                                <h3 className="text-2xl font-bold text-slate-400">{t.catalog.noResults}</h3>
                                <button
                                    onClick={() => { setSearchTerm(''); setSelectedCategory(ALL_CATEGORY); }}
                                    className="mt-6 text-primary font-bold hover:underline"
                                >
                                    {t.catalog.clearFilters}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Product Details Modal */}
            <AnimatePresence>
                {detailedProduct && (
                    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-300">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-primary/40 backdrop-blur-md"
                            onClick={closeModal}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-5xl bg-white rounded-[3rem] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col md:flex-row"
                        >
                            <button
                                onClick={closeModal}
                                className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md text-white md:text-primary flex items-center justify-center transition-all"
                            >
                                <X size={24} />
                            </button>

                            {/* Modal Image Section */}
                            <div className="md:w-1/2 h-64 md:h-auto overflow-hidden relative">
                                <Image
                                    src={detailedProduct.imageUrl && typeof detailedProduct.imageUrl === 'string' && detailedProduct.imageUrl !== "" ? detailedProduct.imageUrl : 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae'}
                                    alt={detailedProduct.name}
                                    fill
                                    className="object-cover scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent md:hidden"></div>
                                <div className="absolute bottom-6 left-6 flex flex-col gap-2 md:hidden">
                                    <span className="bg-secondary text-primary text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest">{detailedProduct.brand}</span>
                                </div>
                            </div>

                            {/* Modal Content Section */}
                            <div className="md:w-1/2 p-8 md:p-16 overflow-y-auto">
                                {detailedProduct && (() => {
                                    const displayedProduct = getTranslatedProduct(detailedProduct);
                                    return (
                                        <>
                                            <div className="mb-8">
                                                <div className="flex items-center gap-3 mb-4">
                                                    <span className="bg-secondary/10 text-secondary text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-[0.2em]">
                                                        {getCategoryLabel(displayedProduct.category)}
                                                    </span>
                                                    <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                                                        REF: {displayedProduct._id?.slice(-6)}
                                                    </span>
                                                </div>
                                                <h2 className="text-3xl md:text-5xl font-display font-black text-primary mb-6 leading-tight">
                                                    {displayedProduct.name}
                                                </h2>
                                                <p className="text-lg text-slate-500 leading-relaxed">
                                                    {displayedProduct.description}
                                                </p>
                                            </div>

                                            <div className="space-y-8 mb-12">
                                                <div>
                                                    <h4 className="text-xs font-black uppercase tracking-[0.3em] text-primary mb-6 flex items-center gap-2">
                                                        <List size={18} />
                                                        {t.catalog.specifications}
                                                    </h4>
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                        {displayedProduct.specs.map((spec: string, idx: number) => (
                                                            <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                                                                <Check size={16} className="text-secondary shrink-0 mt-0.5" />
                                                                <span className="text-sm font-medium text-slate-600">{spec}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>

                                                <div className="p-8 bg-primary rounded-3xl text-white">
                                                    <div className="flex items-center gap-4 mb-4">
                                                        <Verified size={20} className="text-secondary" />
                                                        <h5 className="font-bold">{t.catalog.certifiedInstall}</h5>
                                                    </div>
                                                    <p className="text-xs text-slate-300 leading-relaxed mb-6">
                                                        {t.catalog.certifiedInstallDesc}
                                                    </p>
                                                    <div className="flex flex-col sm:flex-row gap-4">
                                                        <Link
                                                            href={`/catalogo/${displayedProduct._id}`}
                                                            onClick={closeModal}
                                                            className="flex-1 py-4 border-2 border-slate-500 text-white rounded-xl font-bold text-sm hover:border-secondary hover:text-secondary transition-all flex items-center justify-center gap-3"
                                                        >
                                                            <Eye size={18} />
                                                            {t.catalog.viewDetails || 'Ver Detalhes'}
                                                        </Link>
                                                        <Link
                                                            href={`/contactos?subject=${encodeURIComponent(displayedProduct.name)}`}
                                                            onClick={closeModal}
                                                            className="flex-1 py-4 bg-secondary text-primary rounded-xl font-black text-sm hover:bg-yellow-400 transition-all flex items-center justify-center gap-3"
                                                        >
                                                            {t.catalog.requestInstallQuote}
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    );
                                })()}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};
