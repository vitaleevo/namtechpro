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
    const events = useQuery(api.events.list);
    const dbCategories = useQuery(api.categories.list, { type: "event" });
    const [filter, setFilter] = useState('All');

    const filteredEvents = useMemo(() => {
        if (!events) return [];
        if (filter === 'All') return events;
        return events.filter((e: Doc<"events">) => e.type === filter);
    }, [events, filter]);

    const filteredFeatured = useMemo(() => {
        if (!featuredEvents) return [];
        if (filter === 'All') return featuredEvents;
        return (featuredEvents as any[]).filter(e => e.type === filter);
    }, [featuredEvents, filter]);

    const filters = [
        { id: 'All', label: 'Todos' },
        { id: 'Project', label: 'Projetos' },
        { id: 'Event', label: 'Eventos' },
    ];

    if (events === undefined) {
        return (
            <div className="pt-40 pb-24 flex items-center justify-center min-h-screen bg-white">
                <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <section className="relative h-[50vh] flex items-center overflow-hidden mb-16">
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

            {/* Featured Events Section */}
            {filteredFeatured.length > 0 && (
                <FeaturedEvents events={filteredFeatured} />
            )}
        </div>
    );
};
