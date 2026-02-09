"use client";

import React from 'react';
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from '@/i18n';

export const AboutContent = () => {
    const { t } = useLanguage();

    return (
        <div className="pt-20 overflow-x-hidden">
            {/* Hero Section */}
            <section className="relative h-[70vh] flex items-center overflow-hidden">
                <div className="absolute inset-0 z-0 text-white">
                    <Image
                        alt="Namibe Coast"
                        fill
                        priority
                        className="object-cover"
                        src="https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&q=80&w=2000"
                    />
                    <div className="absolute inset-0 bg-primary/85 backdrop-blur-sm"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-secondary font-black uppercase tracking-[0.4em] text-xs mb-6 block"
                    >
                        {t.about.badge}
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-8xl font-display font-black text-white mb-8 tracking-tighter leading-none"
                    >
                        {t.about.title} <br /><span className="text-secondary">{t.about.titleHighlight}</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-light"
                    >
                        {t.about.subtitle}
                    </motion.p>
                </div>
            </section>

            {/* Philosophy & Timeline */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div className="space-y-12">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
                                    <span className="material-symbols-outlined text-secondary text-4xl mb-4">flag</span>
                                    <h3 className="text-xl font-bold mb-3">{t.about.philosophy}</h3>
                                    <p className="text-sm text-slate-500 leading-relaxed">{t.about.philosophyDesc}</p>
                                </div>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="bg-primary p-12 rounded-[4rem] text-white">
                                <h3 className="text-3xl font-bold mb-8 text-secondary">{t.about.ourJourney}</h3>
                                <div className="space-y-10">
                                    {[
                                        { year: '2010', event: 'Fundação da Namtech Pro no Namibe com foco em rádio-eletrónica.' },
                                        { year: '2014', event: 'Expansão para Luanda e parceria oficial com a Furuno.' },
                                        { year: '2018', event: 'Inauguração do centro de formação técnica para o sector marítimo.' },
                                        { year: '2023', event: 'Lançamento da divisão de Energia Limpa e Sustentabilidade.' }
                                    ].map((timeline, i) => (
                                        <div key={i} className="flex gap-6 group">
                                            <span className="text-2xl font-black text-secondary/30 group-hover:text-secondary transition-colors">{timeline.year}</span>
                                            <p className="text-sm text-slate-400 group-hover:text-slate-100 transition-colors leading-relaxed">{timeline.event}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-secondary/10 rounded-full blur-3xl"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Infrastructure Section */}
            <section className="py-24 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-display font-bold mb-4">{t.about.infrastructure}</h2>
                        <p className="text-slate-500 max-w-2xl mx-auto">{t.about.infrastructureDesc}</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=400', label: 'Laboratórios de Eletrónica', detail: 'Reparação de componentes ao nível SMT.' },
                            { img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=400', label: 'Centro de Logística', detail: 'Stock permanente de peças críticas em Angola.' },
                            { img: 'https://images.unsplash.com/photo-1524230572899-a752b3835840?auto=format&fit=crop&q=80&w=400', label: 'Unidades Móveis 4x4', detail: 'Assistência técnica em qualquer localidade.' },
                            { img: 'https://images.unsplash.com/photo-1544725121-be3fb520280c?auto=format&fit=crop&q=80&w=400', label: 'Auditório de Formação', detail: 'Certificações reconhecidas pela IMO.' }
                        ].map((box, i) => (
                            <div key={i} className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all">
                                <div className="h-48 overflow-hidden relative">
                                    <Image src={box.img} alt={box.label} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                                </div>
                                <div className="p-6">
                                    <h4 className="font-bold text-lg mb-2">{box.label}</h4>
                                    <p className="text-xs text-slate-500 leading-relaxed">{box.detail}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Certifications Marquee */}
            <section className="py-20 bg-primary text-white">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h3 className="text-xs font-bold uppercase tracking-[0.5em] text-secondary mb-12">{t.about.certifications}</h3>
                    <div className="flex flex-wrap justify-center gap-12 md:gap-20 opacity-60">
                        {['ISO 9001:2015', 'ABS CERTIFIED', 'BUREAU VERITAS', 'DNV·GL', 'CLASSNK', 'RINA'].map((cert, i) => (
                            <span key={i} className="text-xl md:text-2xl font-display font-bold border-b-2 border-transparent hover:border-secondary transition-all cursor-default">{cert}</span>
                        ))}
                    </div>
                </div>
            </section>

            {/* Leadership / CTA */}
            <section className="py-32 bg-white">
                <div className="max-w-5xl mx-auto px-4 text-center">
                    <h2 className="text-4xl md:text-6xl font-display font-bold mb-8">{t.about.careersTitle}</h2>
                    <p className="text-xl text-slate-500 mb-12 leading-relaxed">
                        {t.about.careersDesc}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/contactos"
                            className="px-10 py-5 bg-primary text-white rounded-2xl font-black text-lg hover:bg-slate-800 transition-all shadow-xl"
                        >
                            {t.about.viewOpportunities}
                        </Link>
                        <Link
                            href="/contactos"
                            className="px-10 py-5 bg-white text-primary border-2 border-primary/10 rounded-2xl font-black text-lg hover:bg-slate-50 transition-all"
                        >
                            {t.about.contactManagement}
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};
