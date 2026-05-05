"use client";

import React from 'react';
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, Mail, List, Verified, Check, Shield, Zap, Anchor, Globe, ArrowRight } from "lucide-react";
import Link from 'next/link';
import { Navbar } from "@/features/navigation/Navbar";
import { Footer } from "@/features/navigation/Footer";
import { useLanguage } from '@/i18n';
import Image from 'next/image';
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

interface ProductDetailContentProps {
    product: any;
}

export function ProductDetailContent({ product }: ProductDetailContentProps) {
    const { t } = useLanguage();
    const { scrollY } = useScroll();
    const quoteBarY = useTransform(scrollY, [0, 400], [100, 0]);

    // Fetch related products from the same category
    const allProducts = useQuery(api.products.list);
    const relatedProducts = allProducts
        ? allProducts
            .filter(p => p.category === product.category && p._id !== product._id)
            .slice(0, 3)
        : [];

    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            {/* Barra de Ação Fixa (Mobile/Desktop) - Aparece ao rolar */}
            <motion.div
                style={{ y: quoteBarY }}
                className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-4xl"
            >
                <div className="bg-primary/95 p-4 rounded-3xl border border-white/10 shadow-2xl flex items-center justify-between gap-6 overflow-hidden relative group">
                    <div className="hidden sm:flex items-center gap-4 pl-4 shrink-0">
                        <div className="w-12 h-12 rounded-xl bg-white/10 relative overflow-hidden">
                            <Image src={product.imageUrl} alt={product.name} fill className="object-cover" />
                        </div>
                        <div>
                            <p className="text-white font-black text-sm line-clamp-1">{product.name}</p>
                            <p className="text-secondary text-[10px] font-black uppercase tracking-widest">{product.brand}</p>
                        </div>
                    </div>
                    <Link
                        href={`/contactos?subject=${encodeURIComponent(product.name)}`}
                        className="flex-1 sm:flex-none px-12 py-4 bg-secondary text-primary rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-yellow-400 hover:scale-[1.02] transition-all flex items-center justify-center gap-3"
                    >
                        <Mail size={18} />
                        Solicitar Orçamento
                    </Link>
                </div>
            </motion.div>

            <div className="pt-32 pb-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Breadcrumbs & Voltar */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-16">
                        <Link
                            href="/catalogo"
                            className="inline-flex items-center gap-3 text-sm font-black text-slate-400 hover:text-primary transition-all group"
                        >
                            <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                                <ArrowLeft size={18} />
                            </div>
                            {t.catalog.clearFilters ? 'Voltar ao Catálogo' : 'Back to Catalog'}
                        </Link>

                        <div className="flex items-center gap-2">
                            <div className="h-0.5 w-12 bg-secondary rounded-full"></div>
                            <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">Detalhe do Equipamento</span>
                        </div>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-20">
                        {/* Seção da Imagem Principal */}
                        <div className="lg:w-1/2 space-y-8">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="aspect-square rounded-[4rem] overflow-hidden relative shadow-2xl bg-slate-50 border border-slate-100 group"
                            >
                                <Image
                                    src={product.imageUrl || '/images/decorativas/nav-equipment.jpg'}
                                    alt={product.name}
                                    fill
                                    priority
                                    className="object-cover group-hover:scale-110 transition-transform duration-[2s]"
                                />
                                <div className="absolute top-10 left-10">
                                    <span className="bg-primary text-white text-[10px] font-black px-6 py-3 rounded-full uppercase tracking-[0.3em] shadow-2xl">
                                        {product.status}
                                    </span>
                                </div>
                            </motion.div>

                            {/* Pontos Prometidos */}
                            <div className="grid grid-cols-3 gap-6">
                                {[
                                    { icon: <Shield size={20} />, label: 'Garantia Global' },
                                    { icon: <Zap size={20} />, label: 'Instalação Rápida' },
                                    { icon: <Globe size={20} />, label: 'Apoio em Angola' }
                                ].map((badge, i) => (
                                    <div key={i} className="flex flex-col items-center gap-3 p-6 rounded-[2rem] bg-slate-50 border border-slate-100">
                                        <div className="text-secondary">{badge.icon}</div>
                                        <span className="text-[9px] font-black uppercase text-slate-400 tracking-tighter text-center">{badge.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Conteúdo Técnico */}
                        <div className="lg:w-1/2 pt-6">
                            <div className="mb-12">
                                <div className="flex items-center gap-3 mb-8">
                                    <span className="bg-secondary text-primary text-[10px] font-black px-5 py-2 rounded-full uppercase tracking-widest">
                                        {product.category}
                                    </span>
                                    <span className="text-slate-300 font-black">/</span>
                                    <span className="text-primary font-black text-[10px] uppercase tracking-widest">
                                        {product.brand}
                                    </span>
                                </div>
                                <h1 className="text-5xl md:text-7xl font-display font-black text-primary mb-10 leading-[0.9] tracking-tighter">
                                    {product.name}
                                </h1>
                                <p className="text-xl text-slate-500 leading-relaxed font-medium">
                                    {product.description}
                                </p>
                            </div>

                            <div className="space-y-12">
                                {/* Especificações Técnicas */}
                                <div>
                                    <h4 className="text-sm font-black uppercase tracking-[0.3em] text-primary mb-10 flex items-center gap-4">
                                        <div className="w-10 h-0.5 bg-secondary"></div>
                                        Especificações Técnicas
                                    </h4>
                                    <div className="grid grid-cols-1 gap-4">
                                        {product.specs?.map((spec: string, idx: number) => (
                                            <motion.div
                                                key={idx}
                                                initial={{ opacity: 0, x: -20 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                transition={{ delay: idx * 0.05 }}
                                                className="flex items-center justify-between p-6 rounded-2xl bg-white border border-slate-100 hover:border-secondary/30 transition-all group"
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className="w-2 h-2 rounded-full bg-secondary group-hover:scale-150 transition-transform"></div>
                                                    <span className="text-base font-bold text-slate-700">{spec}</span>
                                                </div>
                                                <Verified size={16} className="text-slate-200 group-hover:text-secondary transition-colors" />
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>

                                {/* Bloco de Instalação Certificada */}
                                <div className="p-10 md:p-14 bg-primary rounded-[4rem] text-white shadow-3xl shadow-primary/20 relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 group-hover:scale-125 transition-transform duration-1000"></div>

                                    <div className="relative z-10">
                                        <div className="flex items-center gap-5 mb-8">
                                            <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center text-primary shadow-xl">
                                                <Anchor size={30} />
                                            </div>
                                            <div>
                                                <h5 className="text-2xl font-black">{t.catalog.certifiedInstall}</h5>
                                                <p className="text-secondary text-xs font-bold uppercase tracking-widest leading-none">Padrão Namtech Export</p>
                                            </div>
                                        </div>
                                        <p className="text-base text-slate-300 leading-relaxed mb-10 font-medium">
                                            {t.catalog.certifiedInstallDesc} Este equipamento requer instalação por técnicos certificados para manter a garantia do fabricante e a segurança da embarcação.
                                        </p>
                                        <Link
                                            href={`/contactos?subject=${encodeURIComponent(product.name)}`}
                                            className="w-full py-6 bg-white text-primary rounded-2xl font-black text-base uppercase tracking-widest hover:bg-secondary transition-all flex items-center justify-center gap-4 shadow-xl"
                                        >
                                            <Mail size={22} />
                                            {t.catalog.requestQuote}
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Produtos Relacionados - SOMENTE DO CATÁLOGO CONVEX */}
                    {relatedProducts.length > 0 && (
                        <div className="mt-40">
                            <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
                                <div className="max-w-xl">
                                    <span className="text-slate-400 font-black text-[10px] uppercase tracking-[0.4em] inline-block mb-4">Complementos</span>
                                    <h2 className="text-4xl md:text-6xl font-display font-black text-primary tracking-tighter leading-none">
                                        Equipamentos <span className="text-secondary italic">Relacionados</span>
                                    </h2>
                                </div>
                                <Link
                                    href="/catalogo"
                                    className="px-8 py-4 border-2 border-slate-100 text-primary rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-primary hover:text-white hover:border-primary transition-all flex items-center gap-3"
                                >
                                    Ver Catálogo Completo
                                    <ArrowRight size={14} />
                                </Link>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                                {relatedProducts.map((relProduct, idx) => (
                                    <motion.div
                                        key={relProduct._id}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="group"
                                    >
                                        <div className="bg-slate-50 rounded-[3rem] p-8 border border-slate-100 hover:bg-white hover:shadow-2xl hover:border-transparent transition-all duration-500 h-full flex flex-col">
                                            <div className="aspect-video rounded-[2rem] overflow-hidden mb-8 relative">
                                                <Image
                                                    src={relProduct.imageUrl}
                                                    alt={relProduct.name}
                                                    fill
                                                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <span className="text-secondary font-black text-[9px] uppercase tracking-widest mb-3 block">{relProduct.brand}</span>
                                                <h4 className="text-xl font-bold text-primary mb-4 leading-tight">{relProduct.name}</h4>
                                                <p className="text-sm text-slate-500 mb-8 line-clamp-2">{relProduct.description}</p>
                                            </div>
                                            <Link
                                                href={`/catalogo/${relProduct._id}`}
                                                className="w-full py-5 bg-white border border-slate-200 text-primary rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-primary hover:text-white transition-all text-center flex items-center justify-center gap-3"
                                            >
                                                Explorar Ficha Técnica
                                                <ArrowRight size={14} />
                                            </Link>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <Footer />
        </main>
    );
}

