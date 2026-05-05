"use client";

import React from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Star, ShieldCheck, Zap } from "lucide-react";
import { useLanguage } from '@/i18n';

export const ProductGrid = () => {
    const { t } = useLanguage();
    const convexProducts = useQuery(api.products.list);

    if (convexProducts === undefined) {
        return (
            <div className="flex flex-col items-center justify-center py-32 gap-6">
                <div className="relative w-16 h-16">
                    <div className="absolute inset-0 border-4 border-primary/10 rounded-full" />
                    <div className="absolute inset-0 border-4 border-t-secondary rounded-full animate-spin" />
                </div>
                <p className="text-primary font-black text-[10px] uppercase tracking-[0.4em] animate-pulse">{t.home.syncingElite}</p>
            </div>
        );
    }

    // Filtramos os produtos profissionais mais relevantes
    const featuredNames = [
        "Piloto Automático Simrad AP44",
        "Rádio VHF Icom IC-M605",
        "Iridium Certus 100",
        "Painel Solar Marítimo 200W",
        "Victron MultiPlus 3000",
        "Telefone Satélite Iridium"
    ];

    const products = convexProducts.filter(p => featuredNames.includes(p.name));

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {products.map((product, index) => (
                <motion.div
                    key={product._id}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                    viewport={{ once: true }}
                    className="group relative h-full"
                >
                    <div className="relative h-full bg-white rounded-[4rem] border border-slate-100 overflow-hidden hover:shadow-[0_80px_120px_-20px_rgba(0,0,0,0.12)] transition-all duration-700 flex flex-col translate-z-0">
                        
                        {/* Status & Category Floating */}
                        <div className="absolute top-10 left-10 z-20 flex flex-col gap-3">
                            <span className="bg-secondary text-primary text-[9px] font-black px-6 py-2.5 rounded-full uppercase tracking-[0.2em] shadow-2xl">
                                {product.status}
                            </span>
                        </div>

                        {/* Image Container with Parallax Zoom */}
                        <div className="relative h-96 overflow-hidden shrink-0">
                            <Image
                                src={product.imageUrl}
                                alt={product.name}
                                fill
                                className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                            
                            {/* Brand Tag */}
                            <div className="absolute bottom-6 right-10 z-20 bg-slate-50 px-6 py-2 rounded-2xl shadow-xl">
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{product.brand}</span>
                            </div>
                        </div>

                        {/* Content Section */}
                        <div className="p-12 flex flex-col flex-grow">
                            <div className="mb-8">
                                <span className="text-secondary font-black text-[10px] uppercase tracking-[0.4em] inline-block mb-4">
                                    {product.category}
                                </span>
                                <h3 className="text-3xl font-display font-black text-primary leading-tight tracking-tight">
                                    {product.name}
                                </h3>
                            </div>

                            <p className="text-slate-500 text-base leading-relaxed mb-12 flex-grow font-medium">
                                {product.description}
                            </p>

                            <div className="flex items-center gap-4 mb-10 overflow-x-auto pb-2 scrollbar-none">
                                {product.specs?.slice(0, 3).map((spec: string, i: number) => (
                                    <span key={i} className="whitespace-nowrap bg-slate-50 text-slate-400 text-[9px] font-black uppercase tracking-widest px-4 py-2.5 rounded-xl border border-slate-100">
                                        {spec}
                                    </span>
                                ))}
                            </div>

                            <div className="mt-auto">
                                <Link
                                    href={`/catalogo/${product._id}`}
                                    className="relative w-full group/btn overflow-hidden px-8 py-6 bg-primary text-white rounded-[2.5rem] font-black text-[10px] uppercase tracking-[0.3em] flex items-center justify-center gap-4 hover:shadow-2xl transition-all active:scale-95"
                                >
                                    <span className="relative z-10">{t.home.exploreSpecs}</span>
                                    <ArrowRight size={16} className="relative z-10 transition-transform group-hover/btn:translate-x-2" />
                                    <div className="absolute inset-0 bg-secondary translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 rounded-[2.5rem]" />
                                </Link>
                            </div>
                        </div>

                        {/* Top Decoration */}
                        <div className="absolute top-0 right-0 w-40 h-40 bg-secondary/5 rounded-full -mr-20 -mt-20 group-hover:bg-secondary/20 transition-colors duration-700" />
                    </div>
                </motion.div>
            ))}
        </div>
    );
};
