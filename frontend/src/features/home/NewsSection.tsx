"use client";

import React from 'react';
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { motion } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";
import Link from 'next/link';
import Image from 'next/image';

export const NewsSection = () => {
    const posts = useQuery(api.blog.list);

    // Only show top 3 latest posts
    const latestPosts = posts?.slice(0, 3);

    if (!latestPosts || latestPosts.length === 0) return null;

    return (
        <section className="py-32 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                    <div>
                        <h2 className="text-4xl md:text-6xl font-display font-bold text-primary mb-6">
                            Blog & <span className="text-secondary">Notícias</span>
                        </h2>
                        <div className="h-1.5 w-24 bg-secondary rounded-full"></div>
                    </div>
                    <Link
                        href="/blog"
                        className="group flex items-center gap-3 text-primary font-black text-sm uppercase tracking-widest hover:text-secondary transition-colors"
                    >
                        Ver todos os artigos
                        <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                            <ArrowRight size={18} />
                        </div>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {latestPosts.map((post, idx) => (
                        <motion.div
                            key={post._id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 hover:shadow-2xl transition-all duration-500 group"
                        >
                            <div className="relative h-64 overflow-hidden">
                                <Image
                                    src={post.imageUrl}
                                    alt={post.title}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute top-6 left-6">
                                    <span className="bg-white/90 backdrop-blur text-primary text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest shadow-lg">
                                        {post.category}
                                    </span>
                                </div>
                            </div>
                            <div className="p-10">
                                <div className="flex items-center gap-3 text-xs font-bold text-slate-400 mb-6 uppercase tracking-wider">
                                    <Calendar size={14} className="text-secondary" />
                                    {new Date(post.publishedAt).toLocaleDateString()}
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-4 leading-tight group-hover:text-primary transition-colors line-clamp-2">
                                    {post.title}
                                </h3>
                                <p className="text-slate-500 mb-8 line-clamp-3 text-sm leading-relaxed">
                                    {post.excerpt}
                                </p>
                                <Link
                                    href={`/blog/${post.slug}`}
                                    className="inline-flex items-center gap-2 text-primary font-black text-xs uppercase tracking-widest hover:gap-4 transition-all"
                                >
                                    Ler Artigo Completo
                                    <ArrowRight size={16} />
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
