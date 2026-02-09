"use client";

import React from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export const ProductGrid = () => {
    const products = useQuery(api.products.list);

    if (products === undefined) {
        return (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
                <div className="w-10 h-10 border-4 border-blue-600/30 border-t-blue-600 rounded-full animate-spin" />
                <p className="text-slate-400 font-bold animate-pulse">Sincronizando com Convex...</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {products.map((product, index) => (
                <motion.div
                    key={product._id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="group bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden hover:shadow-2xl hover:shadow-blue-600/10 transition-all duration-500"
                >
                    <div className="relative h-64 overflow-hidden">
                        <Image
                            src={product.imageUrl}
                            alt={product.name}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
                        <div className="absolute top-6 left-6">
                            <span className="bg-blue-600 text-white text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest shadow-lg">
                                {product.status}
                            </span>
                        </div>
                    </div>

                    <div className="p-10">
                        <p className="text-blue-600 text-[10px] font-black uppercase tracking-[0.3em] mb-3">
                            {product.category}
                        </p>
                        <h3 className="text-2xl font-black text-slate-900 mb-4 line-clamp-1 group-hover:text-blue-600 transition-colors">
                            {product.name}
                        </h3>
                        <p className="text-sm text-slate-500 mb-8 line-clamp-2">
                            {product.description}
                        </p>

                        <div className="flex items-center justify-between pt-8 border-t border-slate-100">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                                {product.brand}
                            </span>
                            <Link
                                href={`/catalogo/${product._id}`}
                                className="flex items-center gap-2 text-blue-600 font-black text-sm group-hover:gap-4 transition-all"
                            >
                                DETALHES
                                <ArrowRight size={16} />
                            </Link>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    );
};
