"use client";

import React from 'react';
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { motion } from "framer-motion";
import { Calendar, User, ArrowRight, Clock } from "lucide-react";
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/i18n';

export const BlogList = () => {
    const { t } = useLanguage();
    const posts = useQuery(api.blog.list);

    if (posts === undefined) {
        return (
            <div className="pt-40 pb-24 flex items-center justify-center min-h-screen">
                <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <section className="pt-32 pb-24 bg-slate-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-display font-black text-primary mb-6"
                    >
                        Blog & <span className="text-secondary">Notícias</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-slate-500 max-w-2xl mx-auto text-lg"
                    >
                        Fique por dentro das últimas inovações, projetos e dicas do sector marítimo e tecnológico.
                    </motion.p>
                </div>

                {/* Grid */}
                {posts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map((post, idx) => (
                            <motion.div
                                key={post._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="group bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-slate-100 flex flex-col h-full"
                            >
                                <div className="relative h-64 overflow-hidden">
                                    <Link href={`/blog/${post.slug}`} className="block h-full w-full">
                                        <Image
                                            src={post.imageUrl}
                                            alt={post.title}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                    </Link>
                                    <div className="absolute top-4 left-4">
                                        <span className="bg-white/90 backdrop-blur text-primary text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
                                            {post.category}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-8 flex-1 flex flex-col">
                                    <div className="flex items-center gap-4 text-xs font-bold text-slate-400 mb-4 uppercase tracking-wider">
                                        <span className="flex items-center gap-1">
                                            <Calendar size={14} className="text-secondary" />
                                            {new Date(post.publishedAt).toLocaleDateString()}
                                        </span>
                                        <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                                        <span className="flex items-center gap-1">
                                            <Clock size={14} className="text-secondary" />
                                            {post.readTime}
                                        </span>
                                    </div>
                                    <Link href={`/blog/${post.slug}`} className="block hover:text-primary transition-colors">
                                        <h3 className="text-2xl font-bold text-slate-900 mb-4 leading-tight group-hover:text-primary transition-colors line-clamp-2">
                                            {post.title}
                                        </h3>
                                    </Link>
                                    <p className="text-slate-500 mb-8 line-clamp-3 flex-1">
                                        {post.excerpt}
                                    </p>
                                    <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-primary text-xs">
                                                {post.author.charAt(0)}
                                            </div>
                                            <span className="text-xs font-bold text-slate-600">{post.author}</span>
                                        </div>
                                        <Link
                                            href={`/blog/${post.slug}`}
                                            className="text-primary font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:gap-3 transition-all"
                                        >
                                            Ler Mais
                                            <ArrowRight size={14} />
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-24 bg-white rounded-[3rem] border border-slate-100">
                        <p className="text-slate-400 font-bold">Ainda não há publicações no blog.</p>
                    </div>
                )}
            </div>
        </section>
    );
};
