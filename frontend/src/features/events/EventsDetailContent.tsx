"use client";

import React from 'react';
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, MapPin, Tag } from "lucide-react";
import Link from 'next/link';
import { Navbar } from "@/features/navigation/Navbar";
import { Footer } from "@/features/navigation/Footer";
import { useLanguage } from '@/i18n';
import Image from 'next/image';

interface EventsDetailContentProps {
    event: any;
}

export function EventsDetailContent({ event }: EventsDetailContentProps) {
    const { t } = useLanguage();

    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            <article className="pt-32 pb-24">
                {/* Hero / Header */}
                <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-12">
                    <Link
                        href="/eventos"
                        className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-primary mb-8 transition-colors group"
                    >
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        {t.blogPage?.subtitle ? 'Voltar' : 'Back'}
                    </Link>

                    <div className="flex items-center gap-4 text-xs font-bold text-slate-400 mb-6 uppercase tracking-wider">
                        <span className="text-secondary bg-secondary/10 px-3 py-1 rounded-full flex items-center gap-2">
                            <Tag size={12} />
                            {event.type}
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-black text-slate-900 mb-8 leading-tight">
                        {event.title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-6 border-y border-slate-100 py-6 text-sm text-slate-500 font-medium">
                        <div className="flex items-center gap-2">
                            <Calendar size={18} className="text-primary" />
                            {new Date(event.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-2">
                            <MapPin size={18} className="text-primary" />
                            {event.location}
                        </div>
                    </div>
                </div>

                {/* Featured Image */}
                <div className="max-w-5xl mx-auto px-4 sm:px-6 mb-16">
                    <div className="aspect-video rounded-[2rem] overflow-hidden shadow-xl relative">
                        <Image
                            src={event.imageUrl}
                            alt={event.title}
                            fill
                            priority
                            className="object-cover"
                        />
                    </div>
                </div>

                {/* Content */}
                <div className="max-w-3xl mx-auto px-4 sm:px-6">
                    <div className="prose prose-lg prose-slate prose-headings:font-display prose-headings:font-bold prose-a:text-primary hover:prose-a:text-secondary prose-img:rounded-xl">
                        <div
                            dangerouslySetInnerHTML={{ __html: event.content || event.description }}
                            className="leading-relaxed text-slate-600 text-lg"
                        />
                    </div>

                    {/* CTA Contact if project */}
                    <div className="mt-16 bg-slate-50 rounded-2xl p-8 border border-slate-100 text-center">
                        <h3 className="text-xl font-bold text-slate-900 mb-4">{t.cta.title}</h3>
                        <p className="text-slate-500 mb-6">{t.cta.subtitle}</p>
                        <Link
                            href={`/contactos?subject=${encodeURIComponent(event.title)}`}
                            className="inline-flex items-center justify-center bg-primary text-white font-bold py-3 px-8 rounded-xl hover:bg-slate-800 transition-all"
                        >
                            {t.nav.contact}
                        </Link>
                    </div>
                </div>
            </article>

            <Footer />
        </main>
    );
}
