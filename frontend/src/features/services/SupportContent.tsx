"use client";

import React from 'react';
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from '@/i18n';

export const SupportContent = () => {
    const { t } = useLanguage();

    return (
        <div className="pt-20 overflow-x-hidden">
            {/* Hero Section */}
            <section className="relative h-[60vh] flex items-center bg-slate-900 overflow-hidden text-white">
                <div className="absolute inset-0 opacity-40">
                    <Image src="https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&q=80&w=2000" alt="Support Center" fill priority className="object-cover" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-transparent"></div>
                <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/20 border border-red-500/50 text-red-400 text-xs font-black uppercase tracking-[0.3em] mb-8 animate-pulse"
                    >
                        <span className="w-2 h-2 rounded-full bg-red-500"></span>
                        {t.supportPage.live}
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-display font-black text-white mb-6 tracking-tighter"
                    >
                        {t.supportPage.title} <span className="text-secondary">{t.supportPage.titleHighlight}</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed"
                    >
                        {t.supportPage.subtitle}
                    </motion.p>
                </div>
            </section>

            {/* SLA Tiers */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">{t.supportPage.slaTitle}</h2>
                        <p className="text-slate-500">{t.supportPage.slaSubtitle}</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                tier: t.supportPage.bronze,
                                time: t.supportPage.response24h,
                                features: ['Suporte Remoto Ilimitado', 'Diagnóstico via Email/Chat', 'Desconto em Peças', 'Horário Comercial'],
                                price: t.supportPage.basicSupport
                            },
                            {
                                tier: t.supportPage.silver,
                                time: t.supportPage.response12h,
                                features: ['Prioridade de Mobilização', '2 Visitas Preventivas/Ano', 'Relatórios de Performance', 'Suporte WhatsApp 24/7'],
                                price: t.supportPage.mostPopular,
                                highlight: true
                            },
                            {
                                tier: t.supportPage.gold,
                                time: t.supportPage.response4h,
                                features: ['Intervenção Imediata', 'Gestor de Conta Dedicado', 'Stock de Backup Local', 'Monitorização Cloud em Tempo Real'],
                                price: t.supportPage.missionCritical
                            }
                        ].map((s, i) => (
                            <div key={i} className={`p-10 rounded-[3rem] border transition-all ${s.highlight ? 'bg-primary text-white border-primary shadow-2xl scale-105 z-10' : 'bg-slate-50 border-slate-100'}`}>
                                <h3 className="text-2xl font-black mb-2">{s.tier}</h3>
                                <p className={`text-3xl font-display font-bold mb-6 ${s.highlight ? 'text-secondary' : 'text-primary'}`}>{s.time}</p>
                                <div className={`h-px mb-8 ${s.highlight ? 'bg-white/20' : 'bg-slate-200'}`}></div>
                                <ul className="space-y-4 mb-10">
                                    {s.features.map((f, j) => (
                                        <li key={j} className="flex items-center gap-3 text-sm opacity-80">
                                            <span className="material-symbols-outlined text-sm text-secondary">check_circle</span>
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                                <button className={`w-full py-4 rounded-xl font-bold transition-all ${s.highlight ? 'bg-secondary text-primary hover:bg-yellow-400' : 'bg-primary text-white hover:bg-slate-800'}`}>
                                    {t.supportPage.consultPricing}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Emergency Contact */}
            <section className="py-24 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="bg-red-600 rounded-[4rem] p-12 md:p-20 text-white flex flex-col md:flex-row items-center justify-between gap-12 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
                        <div className="max-w-xl">
                            <h2 className="text-4xl font-display font-black mb-6 leading-tight">{t.supportPage.emergencyLine}</h2>
                            <p className="text-lg text-red-100 mb-8 opacity-90">
                                {t.supportPage.emergencyDesc}
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <a href="tel:+244900000000" className="bg-white text-red-600 px-8 py-4 rounded-2xl font-black text-xl flex items-center gap-3 hover:scale-105 transition-all">
                                    <span className="material-symbols-outlined">call</span>
                                    +244 9XX XXX XXX
                                </a>
                            </div>
                        </div>
                        <div className="w-64 h-64 flex items-center justify-center">
                            <div className="w-full h-full rounded-full border-8 border-white/20 flex items-center justify-center">
                                <span className="material-symbols-outlined text-8xl">engineering</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Capabilities */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div>
                            <span className="text-primary font-black uppercase tracking-[0.3em] text-xs mb-4 block">{t.supportPage.technicalCapacity}</span>
                            <h2 className="text-4xl font-display font-bold mb-8">{t.supportPage.whyUnbeatable}</h2>
                            <div className="space-y-8">
                                {[
                                    { title: t.supportPage.certifiedTechs, desc: t.supportPage.certifiedTechsDesc },
                                    { title: t.supportPage.mobileUnits, desc: t.supportPage.mobileUnitsDesc },
                                    { title: t.supportPage.localLab, desc: t.supportPage.localLabDesc }
                                ].map((cap, i) => (
                                    <div key={i} className="flex gap-6">
                                        <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-primary shrink-0">
                                            <span className="material-symbols-outlined">verified</span>
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-bold mb-2">{cap.title}</h4>
                                            <p className="text-sm text-slate-500 leading-relaxed">{cap.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="relative h-64 rounded-3xl shadow-xl overflow-hidden mt-12">
                                <Image src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=400" fill className="object-cover" alt="Tech 1" />
                            </div>
                            <div className="relative h-64 rounded-3xl shadow-xl overflow-hidden">
                                <Image src="https://images.unsplash.com/photo-1544725121-be3fb520280c?auto=format&fit=crop&q=80&w=400" fill className="object-cover" alt="Tech 2" />
                            </div>
                            <div className="relative h-64 rounded-3xl shadow-xl overflow-hidden -mt-12">
                                <Image src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=400" fill className="object-cover" alt="Tech 3" />
                            </div>
                            <div className="relative h-64 rounded-3xl shadow-xl overflow-hidden mt-4">
                                <Image src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=400" fill className="object-cover" alt="Tech 4" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Global Support Marquee */}
            <section className="py-20 bg-slate-50 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 mb-12 text-center">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{t.supportPage.globalSupport}</p>
                </div>
                <div className="flex space-x-20 opacity-40">
                    {['PANAMA FLAG', 'LIBERIA REGISTER', 'MARSHALL ISLANDS', 'ANGOLA PORTS', 'SAFETY FIRST', 'SOLAS COMPLIANT'].map((x, i) => (
                        <span key={i} className="text-3xl font-display font-black whitespace-nowrap">{x}</span>
                    ))}
                </div>
            </section>
        </div>
    );
};
