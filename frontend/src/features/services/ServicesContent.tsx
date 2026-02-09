"use client";

import React from 'react';
import { motion } from "framer-motion";
import { Zap, ShieldCheck, Hammer, Satellite, Droplets } from "lucide-react";
import Link from "next/link";
import { useLanguage } from '@/i18n';

export const ServicesContent = () => {
    const { t } = useLanguage();

    const mainServices = [
        {
            title: t.services.cleanEnergy,
            desc: t.services.cleanEnergyDesc,
            icon: Zap,
            color: "text-emerald-500",
            bg: "bg-emerald-500/10",
            href: "/servicos/energia-limpa"
        },
        {
            title: t.services.support247,
            desc: t.services.support247Desc,
            icon: ShieldCheck,
            color: "text-red-500",
            bg: "bg-red-500/10",
            href: "/servicos/suporte"
        },
        {
            title: t.services.maintenance,
            desc: t.services.maintenanceDesc,
            icon: Hammer,
            color: "text-amber-500",
            bg: "bg-amber-500/10",
            href: "/servicos"
        },
        {
            title: t.services.satellite,
            desc: t.services.satelliteDesc,
            icon: Satellite,
            color: "text-indigo-500",
            bg: "bg-indigo-500/10",
            href: "/servicos"
        },
        {
            title: t.services.hydrographic,
            desc: t.services.hydrographicDesc,
            icon: Droplets,
            color: "text-cyan-500",
            bg: "bg-cyan-500/10",
            href: "/servicos"
        }
    ];

    return (
        <div className="pt-20">
            {/* Hero Section */}
            <section className="relative py-32 bg-primary overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-secondary rounded-full blur-[120px] -ml-48 -mt-48"></div>
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-600 rounded-full blur-[120px] -mr-48 -mb-48"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-8xl font-display font-black text-white mb-8 tracking-tighter"
                    >
                        {t.services.heroTitle} <span className="text-secondary">{t.services.heroTitleHighlight}</span> <br /> {t.services.heroTitleEnd}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-slate-300 max-w-3xl mx-auto font-medium"
                    >
                        {t.services.heroSubtitle}
                    </motion.p>
                </div>
            </section>

            {/* Services Grid */}
            <section className="py-32 bg-white">
                <div className="max-w-7xl mx-auto px-6 lg:px-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {mainServices.map((service, i) => (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                key={i}
                                className="group p-10 rounded-[3rem] bg-slate-50 border border-slate-100 hover:border-primary transition-all duration-500"
                            >
                                <div className={`w-16 h-16 ${service.bg} ${service.color} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500`}>
                                    <service.icon size={32} />
                                </div>
                                <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">{service.title}</h3>
                                <p className="text-slate-500 leading-relaxed font-medium mb-8">{service.desc}</p>
                                <Link
                                    href={service.href}
                                    className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-widest text-primary hover:gap-4 transition-all"
                                >
                                    {t.services.learnMore}
                                    <span className="text-lg">→</span>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Support Highlight */}
            <section className="py-24 bg-slate-50">
                <div className="max-w-7xl mx-auto px-6 lg:px-12">
                    <div className="bg-primary rounded-[4rem] p-12 md:p-24 text-white relative overflow-hidden shadow-2xl">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -mr-48 -mt-48"></div>
                        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
                            <div className="max-w-2xl text-center lg:text-left">
                                <h2 className="text-4xl md:text-6xl font-display font-black mb-8 tracking-tighter">{t.services.needSupport}</h2>
                                <p className="text-xl text-slate-300 font-medium mb-12">
                                    {t.services.supportDesc}
                                </p>
                                <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
                                    <Link
                                        href="tel:+244900000000"
                                        className="px-12 py-5 bg-secondary text-primary rounded-2xl font-black text-lg hover:bg-yellow-400 hover:scale-105 transition-all shadow-xl flex items-center justify-center gap-3"
                                    >
                                        {t.services.call247}
                                    </Link>
                                    <Link
                                        href="/contactos"
                                        className="px-12 py-5 bg-white/10 text-white border border-white/20 rounded-2xl font-black text-lg hover:bg-white/20 transition-all flex items-center justify-center"
                                    >
                                        {t.services.openTicket}
                                    </Link>
                                </div>
                            </div>
                            <div className="w-64 h-64 bg-secondary/20 rounded-full border-8 border-secondary/30 flex items-center justify-center animate-pulse">
                                <ShieldCheck size={120} className="text-secondary" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
