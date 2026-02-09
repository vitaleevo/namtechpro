"use client";

import React from 'react';
import { motion } from "framer-motion";
import { ArrowLeft, Mail, List, Verified, Check } from "lucide-react";
import Link from 'next/link';
import { Navbar } from "@/features/navigation/Navbar";
import { Footer } from "@/features/navigation/Footer";
import { useLanguage } from '@/i18n';
import Image from 'next/image';

interface ProductDetailContentProps {
    product: any;
}

export function ProductDetailContent({ product }: ProductDetailContentProps) {
    const { t } = useLanguage();

    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            <div className="pt-32 pb-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Link
                        href="/catalogo"
                        className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-primary mb-12 transition-colors group"
                    >
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        {t.catalog.clearFilters ? 'Voltar ao Catálogo' : 'Back to Catalog'}
                    </Link>

                    <div className="flex flex-col lg:flex-row gap-16">
                        {/* Image Section */}
                        <div className="lg:w-1/2 aspect-square rounded-[3rem] overflow-hidden relative shadow-2xl bg-slate-50">
                            <Image
                                src={product.imageUrl && typeof product.imageUrl === 'string' && product.imageUrl !== "" ? product.imageUrl : 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae'}
                                alt={product.name}
                                fill
                                priority
                                className="object-cover"
                            />
                        </div>

                        {/* Content Section */}
                        <div className="lg:w-1/2 flex flex-col justify-center">
                            <div className="mb-8">
                                <div className="flex items-center gap-4 mb-6">
                                    <span className="bg-secondary/10 text-secondary text-xs font-black px-4 py-2 rounded-full uppercase tracking-[0.2em]">
                                        {product.category}
                                    </span>
                                    <span className="bg-primary/5 text-primary text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest">
                                        {product.brand}
                                    </span>
                                </div>
                                <h1 className="text-4xl md:text-6xl font-display font-black text-primary mb-8 leading-tight tracking-tighter">
                                    {product.name}
                                </h1>
                                <p className="text-xl text-slate-500 leading-relaxed">
                                    {product.description}
                                </p>
                            </div>

                            <div className="space-y-10 mb-12">
                                <div>
                                    <h4 className="text-sm font-black uppercase tracking-[0.3em] text-primary mb-6 flex items-center gap-2">
                                        <List size={20} />
                                        {t.catalog.specifications}
                                    </h4>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {product.specs.map((spec: string, idx: number) => (
                                            <div key={idx} className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                                                <Check size={18} className="text-secondary shrink-0 mt-0.5" />
                                                <span className="text-base font-medium text-slate-600">{spec}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="p-8 md:p-12 bg-primary rounded-[3rem] text-white shadow-2xl shadow-primary/20">
                                    <div className="flex items-center gap-4 mb-6">
                                        <Verified size={24} className="text-secondary" />
                                        <h5 className="text-xl font-bold">{t.catalog.certifiedInstall}</h5>
                                    </div>
                                    <p className="text-sm text-slate-300 leading-relaxed mb-8">
                                        {t.catalog.certifiedInstallDesc}
                                    </p>
                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <Link
                                            href={`/contactos?subject=${encodeURIComponent(product.name)}`}
                                            className="flex-1 py-5 bg-secondary text-primary rounded-2xl font-black text-base hover:bg-yellow-400 hover:scale-[1.02] transition-all flex items-center justify-center gap-3"
                                        >
                                            <Mail size={20} />
                                            {t.catalog.requestQuote}
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
