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

export const EventsContent = () => {
    const { t } = useLanguage();
    const events = useQuery(api.events.list);
    const dbCategories = useQuery(api.categories.list, { type: "event" });
    const [filter, setFilter] = useState('All');

    const filteredEvents = useMemo(() => {
        if (!events) return [];
        if (filter === 'All') return events;
        return events.filter((e: Doc<"events">) => e.type === filter);
    }, [events, filter]);

    const filters = useMemo(() => {
        const baseFilters = [
            { id: 'All', label: t.eventsPage.filterAll }
        ];

        if (dbCategories && dbCategories.length > 0) {
            return [
                ...baseFilters,
                ...dbCategories.map(cat => ({ id: cat.name, label: cat.name }))
            ];
        }

        return [
            ...baseFilters,
            { id: 'Project', label: t.eventsPage.filterProjects },
            { id: 'Event', label: t.eventsPage.filterEvents },
        ];
    }, [dbCategories, t.eventsPage]);

    if (events === undefined) {
        return (
            <div className="pt-40 pb-24 flex items-center justify-center min-h-screen bg-slate-50">
                <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="bg-slate-50 min-h-screen">
            {/* Hero Section */}
            <section className="relative h-[50vh] flex items-center overflow-hidden mb-16">
                <div className="absolute inset-0 z-0">
                    <Image
                        alt="Events & Projects"
                        fill
                        priority
                        className="object-cover"
                        src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2000"
                    />
                    <div className="absolute inset-0 bg-primary/70 backdrop-blur-[2px]"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 w-full text-center text-white">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-8xl font-display font-black mb-6 tracking-tighter"
                    >
                        {t.eventsPage.title} <span className="text-secondary">{t.eventsPage.titleHighlight}</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-slate-200 max-w-2xl mx-auto font-medium"
                    >
                        {t.eventsPage.subtitle}
                    </motion.p>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Filters */}
                <div className="flex flex-wrap justify-center gap-4 mb-16">
                    {filters.map((f) => (
                        <button
                            key={f.id}
                            onClick={() => setFilter(f.id)}
                            className={`px-6 py-3 rounded-full font-bold text-sm transition-all ${filter === f.id
                                ? 'bg-primary text-white shadow-lg scale-105'
                                : 'bg-white text-slate-500 hover:bg-slate-100'
                                }`}
                        >
                            {f.label}
                        </button>
                    ))}
                </div>

                {/* Empty State */}
                {filteredEvents.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-24 bg-white rounded-[2rem] border border-slate-100 shadow-sm"
                    >
                        <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Tag className="text-slate-300" size={32} />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-2">
                            {t.eventsPage.noResults}
                        </h3>
                        <p className="text-slate-500 mb-8 max-w-md mx-auto">
                            {t.eventsPage.noResultsDesc}
                        </p>
                        <button
                            onClick={() => setFilter('All')}
                            className="inline-flex items-center gap-2 text-primary font-bold hover:underline"
                        >
                            <ArrowRight size={16} />
                            {t.catalog?.clearFilters}
                        </button>
                    </motion.div>
                )}

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredEvents.map((event: Doc<"events">, idx: number) => (
                        <motion.div
                            key={event._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="group bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-slate-100 flex flex-col h-full"
                        >
                            <div className="relative h-64 overflow-hidden">
                                <Link href={`/eventos/${event._id}`} className="block h-full w-full">
                                    <Image
                                        src={event.imageUrl}
                                        alt={event.title}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                </Link>
                                <div className="absolute top-4 left-4 pointer-events-none">
                                    <span className="bg-white/90 backdrop-blur text-primary text-xs font-black px-3 py-1.5 rounded-full uppercase tracking-widest shadow-lg flex items-center gap-2">
                                        <Tag size={12} />
                                        {event.type}
                                    </span>
                                </div>
                            </div>
                            <div className="p-8 flex-1 flex flex-col">
                                <div className="flex items-center gap-4 text-xs font-bold text-slate-400 mb-4 uppercase tracking-wider">
                                    <span className="flex items-center gap-1">
                                        <Calendar size={14} className="text-secondary" />
                                        {new Date(event.date).toLocaleDateString()}
                                    </span>
                                    <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                                    <span className="flex items-center gap-1">
                                        <MapPin size={14} className="text-secondary" />
                                        {event.location}
                                    </span>
                                </div>
                                <Link href={`/eventos/${event._id}`} className="block hover:text-primary transition-colors">
                                    <h3 className="text-2xl font-bold text-slate-900 mb-4 leading-tight group-hover:text-primary transition-colors">
                                        {event.title}
                                    </h3>
                                </Link>
                                <p className="text-slate-500 mb-8 line-clamp-3 flex-1">
                                    {event.description}
                                </p>
                                <Link
                                    href={`/eventos/${event._id}`}
                                    className="w-full py-4 bg-slate-50 group-hover:bg-primary group-hover:text-white rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 text-slate-600"
                                >
                                    {t.eventsPage.readMore}
                                    <ArrowRight size={16} />
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};
