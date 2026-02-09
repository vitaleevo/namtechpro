"use client";

import React from 'react';
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from '@/i18n';

export const CleanEnergyContent = () => {
    const { t } = useLanguage();

    return (
        <div className="pt-20 overflow-x-hidden">
            {/* Hero Section */}
            <section className="relative h-[80vh] flex items-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        alt="Energia Solar e Marítima"
                        fill
                        priority
                        className="object-cover scale-105"
                        src="https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=2000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/95 via-emerald-900/70 to-transparent"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl text-white">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center gap-3 mb-6"
                        >
                            <span className="inline-block py-1.5 px-3 rounded bg-emerald-500 text-white text-[10px] font-black uppercase tracking-widest shadow-lg">
                                {t.cleanEnergyPage.badge}
                            </span>
                            <div className="h-px w-12 bg-emerald-500/50"></div>
                            <span className="text-emerald-200 text-[10px] font-bold uppercase tracking-widest">{t.cleanEnergyPage.iso}</span>
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-5xl md:text-8xl font-display font-extrabold mb-8 leading-tight tracking-tighter"
                        >
                            {t.cleanEnergyPage.title} <span className="text-emerald-400">{t.cleanEnergyPage.titleHighlight}</span> {t.cleanEnergyPage.titleEnd}
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-xl text-slate-100 mb-10 leading-relaxed font-light opacity-90 max-w-2xl"
                        >
                            {t.cleanEnergyPage.subtitle}
                        </motion.p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link href="/contactos" className="px-10 py-5 bg-emerald-500 text-white rounded-xl font-black text-lg hover:bg-emerald-600 hover:scale-105 transition-all shadow-2xl flex items-center justify-center gap-3">
                                {t.cleanEnergyPage.requestAudit}
                                <span className="material-symbols-outlined">eco</span>
                            </Link>
                            <Link href="/catalogo" className="px-10 py-5 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-xl font-bold text-lg hover:bg-white/20 transition-all text-center">
                                {t.cleanEnergyPage.viewCatalog}
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Quick View */}
            <section className="relative z-20 -mt-12 max-w-5xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        { label: t.cleanEnergyPage.consumptionReduction, val: t.cleanEnergyPage.upTo40, sub: t.cleanEnergyPage.hybridSystems },
                        { label: t.cleanEnergyPage.batteryLife, val: t.cleanEnergyPage.tenYears, sub: t.cleanEnergyPage.lifepo4 },
                        { label: t.cleanEnergyPage.roi, val: t.cleanEnergyPage.threeToFive, sub: t.cleanEnergyPage.industrialAvg }
                    ].map((s, i) => (
                        <div key={i} className="bg-white p-8 rounded-2xl shadow-xl border border-emerald-100 text-center">
                            <p className="text-3xl font-black text-emerald-600 mb-1">{s.val}</p>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">{s.label}</p>
                            <p className="text-[10px] text-slate-400 italic">{s.sub}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Solutions Detailed */}
            <section className="py-32 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
                        <div className="max-w-2xl">
                            <h2 className="text-4xl md:text-6xl font-display font-bold text-primary mb-6">{t.cleanEnergyPage.innovationTitle} <span className="text-emerald-500">{t.cleanEnergyPage.innovationHighlight}</span></h2>
                            <p className="text-lg text-slate-500">
                                {t.cleanEnergyPage.innovationSubtitle}
                            </p>
                        </div>
                        <span className="material-symbols-outlined text-emerald-500 text-6xl opacity-20">solar_power</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {[
                            {
                                title: t.cleanEnergyPage.electricPropulsion,
                                desc: t.cleanEnergyPage.electricPropulsionDesc,
                                icon: 'electric_bolt',
                                features: ['Zero ruído em porto', 'Manutenção reduzida', 'Torque instantâneo']
                            },
                            {
                                title: t.cleanEnergyPage.essContainers,
                                desc: t.cleanEnergyPage.essContainersDesc,
                                icon: 'battery_charging_full',
                                features: ['Escalável até MWh', 'Plug & Play', 'Monitorização GSM']
                            },
                            {
                                title: t.cleanEnergyPage.marineSolar,
                                desc: t.cleanEnergyPage.marineSolarDesc,
                                icon: 'wb_sunny',
                                features: ['Resistência a impactos', 'Anti-derrapante', 'Leveza extrema']
                            }
                        ].map((sol, i) => (
                            <div key={i} className="group relative p-10 rounded-[2.5rem] bg-slate-50 border border-slate-100 hover:border-emerald-500/50 transition-all duration-500">
                                <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-emerald-500 transition-colors">
                                    <span className="material-symbols-outlined text-4xl text-emerald-600 group-hover:text-white transition-colors">{sol.icon}</span>
                                </div>
                                <h3 className="text-2xl font-bold mb-4">{sol.title}</h3>
                                <p className="text-slate-500 text-sm leading-relaxed mb-8">{sol.desc}</p>
                                <ul className="space-y-3">
                                    {sol.features.map((f, j) => (
                                        <li key={j} className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                                            <span className="material-symbols-outlined text-emerald-500 text-sm">done_all</span>
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Methodology Section */}
            <section className="py-24 bg-emerald-950 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-emerald-900/50 skew-x-12 translate-x-32"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div>
                            <span className="text-emerald-400 font-black uppercase tracking-[0.3em] text-xs mb-4 block">{t.cleanEnergyPage.ourProcess}</span>
                            <h2 className="text-4xl md:text-5xl font-display font-bold mb-12 leading-tight">{t.cleanEnergyPage.processTitle}</h2>
                            <div className="space-y-12">
                                {[
                                    { step: '01', title: t.cleanEnergyPage.audit, desc: t.cleanEnergyPage.auditDesc },
                                    { step: '02', title: t.cleanEnergyPage.engineering, desc: t.cleanEnergyPage.engineeringDesc },
                                    { step: '03', title: t.cleanEnergyPage.installation, desc: t.cleanEnergyPage.installationDesc }
                                ].map((m, i) => (
                                    <div key={i} className="flex gap-8 group">
                                        <span className="text-5xl font-display font-black text-emerald-800 group-hover:text-emerald-500 transition-colors">{m.step}</span>
                                        <div>
                                            <h4 className="text-xl font-bold mb-2">{m.title}</h4>
                                            <p className="text-emerald-100/60 text-sm leading-relaxed">{m.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="relative">
                            <div className="aspect-square rounded-[4rem] overflow-hidden shadow-2xl border-8 border-white/5 relative">
                                <Image src="https://images.unsplash.com/photo-1542332213-9b5a5a3fab35?auto=format&fit=crop&q=80&w=800" alt="Solar Panels Installation" fill className="object-cover" />
                            </div>
                            <div className="absolute -bottom-10 -right-10 bg-emerald-500 p-10 rounded-3xl shadow-2xl">
                                <p className="text-4xl font-black mb-1">99.9%</p>
                                <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-900">{t.cleanEnergyPage.uptimeGuaranteed}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Partnerships Section */}
            <section className="py-24 bg-white border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.3em] mb-12 text-center">{t.cleanEnergyPage.techPartners}</p>
                    <div className="flex flex-wrap justify-center gap-12 md:gap-24 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
                        {['VICTRON ENERGY', 'SUNPOWER', 'TESLA ENERGY', 'SMA', 'FRONIUS'].map((p, i) => (
                            <span key={i} className="text-2xl md:text-3xl font-display font-black tracking-tighter text-slate-800">{p}</span>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-32 bg-slate-50">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-display font-bold text-primary mb-4">{t.cleanEnergyPage.faqTitle}</h2>
                        <p className="text-slate-500">{t.cleanEnergyPage.faqSubtitle}</p>
                    </div>

                    <div className="space-y-4">
                        {[
                            { q: t.cleanEnergyPage.faqQ1, a: t.cleanEnergyPage.faqA1 },
                            { q: t.cleanEnergyPage.faqQ2, a: t.cleanEnergyPage.faqA2 },
                            { q: t.cleanEnergyPage.faqQ3, a: t.cleanEnergyPage.faqA3 }
                        ].map((item, i) => (
                            <details key={i} className="group bg-white rounded-2xl border border-slate-200 overflow-hidden">
                                <summary className="flex justify-between items-center p-6 cursor-pointer list-none">
                                    <span className="font-bold text-slate-800">{item.q}</span>
                                    <span className="material-symbols-outlined group-open:rotate-180 transition-transform">expand_more</span>
                                </summary>
                                <div className="px-6 pb-6 text-sm text-slate-500 leading-relaxed border-t border-slate-50 pt-4">
                                    {item.a}
                                </div>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final Green CTA */}
            <section className="py-24 bg-white">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="bg-emerald-500 p-12 md:p-24 rounded-[4rem] text-center shadow-3xl relative overflow-hidden">
                        <div className="absolute inset-0 opacity-10 pointer-events-none">
                            <span className="material-symbols-outlined text-[40rem] -ml-40 -mt-20">eco</span>
                        </div>
                        <div className="relative z-10">
                            <h2 className="text-4xl md:text-7xl font-display font-black text-emerald-950 mb-8 tracking-tighter leading-none">
                                {t.cleanEnergyPage.ctaTitle} <br />{t.cleanEnergyPage.ctaTitleEnd}
                            </h2>
                            <p className="text-xl text-emerald-900/70 mb-12 max-w-2xl mx-auto font-medium">
                                {t.cleanEnergyPage.ctaSubtitle}
                            </p>
                            <Link href="/contactos" className="inline-block px-16 py-6 bg-emerald-950 text-white rounded-2xl font-black text-xl hover:bg-emerald-900 transition-all shadow-xl hover:-translate-y-1">
                                {t.cleanEnergyPage.talkToSpecialist}
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
