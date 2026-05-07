"use client";

import React, { useState, useMemo } from 'react';
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { motion } from "framer-motion";
import { Calendar, MapPin, ArrowRight, Tag } from "lucide-react";
import { useLanguage } from '@/i18n';
import Link from 'next/link';
import Image from 'next/image';
import { FeaturedEvents, type EventGallery } from './FeaturedEvents';

export const EventsContent = ({ featuredEvents = [] }: { featuredEvents?: EventGallery[] }) => {
    const { t } = useLanguage();
    const dbEvents = useQuery(api.events.list);
    const [filter, setFilter] = useState('All');

    const processedEvents = useMemo(() => {
        if (!dbEvents) return [];
        return dbEvents.map(e => ({
            id: e.id,
            title: e.title,
            date: e.date,
            location: e.location,
            imageUrl: e.imageUrl,
            images: e.images || [e.imageUrl],
            videos: e.videos || [],
            type: e.type
        })) as EventGallery[];
    }, [dbEvents]);

    const filteredFeatured = useMemo(() => {
        if (filter === 'All') return processedEvents;
        return processedEvents.filter(e => e.type === filter);
    }, [processedEvents, filter]);

    const filters = [
        { id: 'All', label: 'Todos' },
        { id: 'Project', label: 'Projetos' },
        { id: 'Event', label: 'Eventos' },
    ];

    if (dbEvents === undefined) {
        return (
            <div className="pt-40 pb-24 flex items-center justify-center min-h-screen bg-white">
                <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <section className="relative h-[50vh] flex items-center overflow-hidden mb-24">
                <div className="absolute inset-0 z-0">
                    <Image
                        alt="Events & Projects"
                        fill
                        priority
                        className="object-cover"
                        src="/images/decorativas/hero_principal.jpg"
                    />
                    <div className="absolute inset-0 bg-black/40"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 w-full text-center text-white">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-8xl font-display font-black mb-6 tracking-tighter text-white"
                    >
                        {t.eventsPage.title} <span className="text-secondary">{t.eventsPage.titleHighlight}</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-white/90 max-w-2xl mx-auto font-medium"
                    >
                        {t.eventsPage.subtitle}
                    </motion.p>
                </div>
            </section>

            {/* Filter Section */}
            <div className="max-w-7xl mx-auto px-4 mb-12">
                <div className="flex gap-4 justify-center">
                    {filters.map((f) => (
                        <button
                            key={f.id}
                            onClick={() => setFilter(f.id)}
                            className={`px-8 py-3 rounded-full text-sm font-black uppercase tracking-widest transition-all ${
                                filter === f.id 
                                ? 'bg-primary text-white shadow-xl scale-105' 
                                : 'bg-slate-50 text-slate-400 hover:bg-slate-100'
                            }`}
                        >
                            {f.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Featured Events Section */}
            {filteredFeatured.length > 0 ? (
                <FeaturedEvents events={filteredFeatured} />
            ) : (
                <div className="py-24 text-center text-slate-400 font-bold uppercase tracking-widest">
                    Nenhum item encontrado nesta categoria.
                </div>
            )}
        </div>
    );
};
