"use client";

import React from 'react';
import { motion } from "framer-motion";
import { ArrowLeft, User, Calendar, Clock, Share2 } from "lucide-react";
import Link from 'next/link';
import { Navbar } from "@/features/navigation/Navbar";
import { Footer } from "@/features/navigation/Footer";
import { useLanguage } from '@/i18n';
import Image from 'next/image';

interface BlogContentProps {
    post: any;
    relatedPosts: any[];
}

export function BlogContent({ post, relatedPosts }: BlogContentProps) {
    const { t } = useLanguage();

    const copyToClipboard = () => {
        if (typeof window !== 'undefined') {
            navigator.clipboard.writeText(window.location.href);
            alert("Link copiado!");
        }
    };

    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            <article className="pt-32 pb-24">
                {/* Hero / Header */}
                <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-12">
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-primary mb-8 transition-colors group"
                    >
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        {t.blogPage?.subtitle ? 'Voltar' : 'Back'}
                    </Link>

                    <div className="flex items-center gap-4 text-xs font-bold text-slate-400 mb-6 uppercase tracking-wider">
                        <span className="text-secondary bg-secondary/10 px-3 py-1 rounded-full">{post.category}</span>
                        <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                        <span className="flex items-center gap-1">
                            <Clock size={12} />
                            {post.readTime}
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-black text-slate-900 mb-8 leading-tight">
                        {post.title}
                    </h1>

                    <div className="flex items-center justify-between border-y border-slate-100 py-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center">
                                <User size={24} className="text-slate-400" />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-slate-900">{post.author}</p>
                                <p className="text-xs text-slate-500 flex items-center gap-2">
                                    <Calendar size={12} />
                                    {new Date(post.publishedAt).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={copyToClipboard}
                            className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center hover:bg-slate-100 text-slate-400 hover:text-primary transition-all active:scale-95"
                            title="Copiar Link"
                        >
                            <Share2 size={18} />
                        </button>
                    </div>
                </div>

                {/* Featured Image */}
                <div className="max-w-5xl mx-auto px-4 sm:px-6 mb-16">
                    <div className="aspect-video rounded-[2rem] overflow-hidden shadow-xl relative">
                        <Image
                            src={post.imageUrl}
                            alt={post.title}
                            fill
                            priority
                            className="object-cover"
                        />
                    </div>
                </div>

                {/* Content */}
                <div className="max-w-3xl mx-auto px-4 sm:px-6 mb-24">
                    <div className="prose prose-lg prose-slate prose-headings:font-display prose-headings:font-bold prose-a:text-primary hover:prose-a:text-secondary prose-img:rounded-xl">
                        <div
                            dangerouslySetInnerHTML={{ __html: post.content }}
                            className="leading-relaxed text-slate-600 text-lg"
                        />
                    </div>
                </div>

                {/* Related Posts */}
                {relatedPosts && relatedPosts.length > 0 && (
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 border-t border-slate-100 pt-16">
                        <h3 className="text-2xl font-display font-bold text-slate-900 mb-8">Outros artigos que pode gostar</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {relatedPosts.map((related) => (
                                <Link
                                    key={related._id}
                                    href={`/blog/${related.slug}`}
                                    className="group block"
                                >
                                    <div className="aspect-video rounded-2xl overflow-hidden mb-4 relative">
                                        <Image
                                            src={related.imageUrl}
                                            alt={related.title}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                    </div>
                                    <p className="text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">{related.category}</p>
                                    <h4 className="text-lg font-bold text-slate-900 group-hover:text-primary transition-colors line-clamp-2">
                                        {related.title}
                                    </h4>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </article>

            <Footer />
        </main>
    );
}
