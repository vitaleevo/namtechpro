"use client";

import React from 'react';
import { motion } from "framer-motion";
import { Zap, ShieldCheck, Hammer, Satellite, Droplets, CheckCircle2, ArrowRight, Radio, Wrench } from "lucide-react";
import Link from "next/link";
import { useLanguage } from '@/i18n';
import Image from 'next/image';

const services = [

    {
        id: 'support-247',
        icon: Wrench,
        titleKey: 'support247' as const,
        descKey: 'support247Desc' as const,
        features: ['Piquete 24/7', 'Diagnóstico Remoto', 'Mobilização Rápida', 'Peças Críticas em Stock'],
        image: '/images/decorativas/combat-info-center.jpg',
    },
    {
        id: 'maintenance',
        icon: Hammer,
        titleKey: 'maintenance' as const,
        descKey: 'maintenanceDesc' as const,
        features: ['Manutenção Preventiva', 'Contratos Anuais', 'Calibração Certificada', 'Relatórios Técnicos'],
        image: '/images/imagens/Sondas.jpg',
    },
    {
        id: 'satellite',
        icon: Satellite,
        titleKey: 'satellite' as const,
        descKey: 'satelliteDesc' as const,
        features: ['VSAT Marítimo', 'Iridium / Thuraya', 'Internet a Bordo', 'Voz via Satélite'],
        image: '/images/imagens/Mundo Namtech.jpeg',
    },
    {
        id: 'hydrographic',
        icon: Droplets,
        titleKey: 'hydrographic' as const,
        descKey: 'hydrographicDesc' as const,
        features: ['Sondagem Multifeixe', 'Mapeamento Submarino', 'Batimetria', 'Levantamentos SIG'],
        image: '/images/imagens/Sonares.png',
    },
];

export const ServicesContent = () => {
    const { t } = useLanguage();

    return (
        <div className="pt-20 bg-slate-50">
            {/* Hero Section */}
            <section className="relative h-[80vh] flex items-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        alt="Maritime Services"
                        fill
                        priority
                        className="object-cover"
                        src="/images/decorativas/nav-equipment.jpg"
                    />
                    <div className="absolute inset-0 bg-black/60"></div>
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/20 to-black/40"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="max-w-4xl"
                    >
                        <span className="text-secondary font-black uppercase tracking-[0.5em] text-xs mb-8 block">
                            {t.services.excelenceBadge}
                        </span>
                        <h1 className="text-6xl md:text-9xl font-display font-black text-white mb-10 tracking-tighter leading-none">
                            {t.services.heroTitle} <span className="text-secondary italic">{t.services.heroTitleHighlight}</span>
                        </h1>
                        <p className="text-2xl text-white/90 max-w-2xl font-medium leading-relaxed mb-12 border-l-4 border-secondary pl-8">
                            {t.services.heroSubtitle}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Services Grid */}
            <section className="py-32">
                <div className="max-w-7xl mx-auto px-6 lg:px-12">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                        {services.map((service, i) => {
                            const Icon = service.icon;
                            const title = (t.services as any)[service.titleKey] || service.titleKey;
                            const desc = (t.services as any)[service.descKey] || service.descKey;
                            return (
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    viewport={{ once: true }}
                                    key={service.id}
                                    className="group relative bg-white rounded-[3rem] border border-slate-100 p-2 overflow-hidden hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)] transition-all duration-500"
                                >
                                    <div className="p-10">
                                        <div className="flex items-center justify-between mb-12">
                                            <div className="w-20 h-20 bg-primary/5 rounded-[2rem] flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
                                                <Icon size={40} />
                                            </div>
                                            <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
                                                0{i + 1}
                                            </span>
                                        </div>

                                        <h3 className="text-3xl font-black text-primary mb-6 group-hover:text-primary transition-colors tracking-tighter">
                                            {title}
                                        </h3>
                                        <p className="text-slate-500 leading-relaxed font-medium mb-10 text-lg">
                                            {desc}
                                        </p>

                                        <div className="space-y-4 mb-12">
                                            {service.features.map((feature, j) => (
                                                <div key={j} className="flex items-center gap-3 text-sm text-slate-400 font-bold uppercase tracking-widest">
                                                    <CheckCircle2 size={16} className="text-secondary" />
                                                    {feature}
                                                </div>
                                            ))}
                                        </div>

                                        <Link
                                            href="/contactos"
                                            className="inline-flex w-full items-center justify-between p-6 bg-slate-50 rounded-2xl text-primary font-black uppercase tracking-widest text-xs group-hover:bg-primary group-hover:text-white transition-all duration-500"
                                        >
                                            {t.services.viewDetails}
                                            <ArrowRight size={20} />
                                        </Link>
                                    </div>
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full -mr-16 -mt-16 group-hover:bg-secondary/20 transition-colors"></div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Support Highlight - Elite Version */}
            <section className="py-24 px-6 lg:px-12">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-slate-900 rounded-[4.5rem] p-12 md:p-24 text-white relative overflow-hidden border border-white/5">
                        <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-secondary/10 rounded-full -mr-[20rem] -mt-[20rem]"></div>
                        <div className="absolute bottom-0 left-0 w-[40rem] h-[40rem] bg-primary/20 rounded-full -ml-[20rem] -mb-[20rem]"></div>
                        
                        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-16">
                            <div className="max-w-2xl text-center lg:text-left">
                                <motion.span
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    className="inline-block py-2 px-6 bg-secondary/10 text-secondary border border-secondary/20 rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-10"
                                >
                                    {t.services.criticalSupportBadge}
                                </motion.span>
                                <h2 className="text-5xl md:text-8xl font-display font-black mb-10 tracking-tighter leading-none">
                                    {t.services.needSupport}
                                </h2>
                                <p className="text-xl text-slate-400 font-medium mb-12 leading-relaxed">
                                    {t.services.supportDesc}
                                </p>
                                <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
                                    <Link
                                        href="tel:+244921791515"
                                        className="px-14 py-6 bg-secondary text-primary rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-white hover:scale-105 transition-all shadow-2xl flex items-center justify-center gap-4"
                                    >
                                        {t.services.talkToEngineer}
                                        <ArrowRight size={20} />
                                    </Link>
                                    <Link
                                        href="/contactos"
                                        className="px-14 py-6 bg-black/40 text-white border border-white/10 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-black/60 transition-all flex items-center justify-center"
                                    >
                                        {t.services.sendRequest}
                                    </Link>
                                </div>
                            </div>
                            <motion.div
                                initial={{ rotate: 10, scale: 0.9 }}
                                whileInView={{ rotate: 0, scale: 1 }}
                                transition={{ type: "spring", damping: 10 }}
                                className="w-80 h-80 bg-black/40 rounded-[3rem] border border-white/10 flex items-center justify-center relative group"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-transparent rounded-[3rem] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <ShieldCheck size={160} className="text-secondary relative z-10" />
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
