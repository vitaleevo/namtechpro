"use client";

import React from 'react';
import { motion } from "framer-motion";
import { Shield, Target, Award, Users, Ship, Anchor, MapPin, ArrowRight, Zap } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from '@/i18n';

export const AboutContent = () => {
    const { t } = useLanguage();

    return (
        <div className="pt-20 overflow-x-hidden bg-white">
            {/* Hero Section - Extra Wide & Dramatic */}
            <section className="relative h-[90vh] flex items-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        alt="Namibe Coast"
                        fill
                        priority
                        className="object-cover scale-105"
                        src="/images/decorativas/ocean-waves.jpg"
                    />
                    {/* Strong Black Overlay for Text Readability - No Blur */}
                    <div className="absolute inset-0 bg-black/40"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="max-w-4xl"
                    >
                        <span className="inline-block py-2 px-6 bg-secondary text-primary rounded-full text-[10px] font-black uppercase tracking-[0.4em] mb-10">
                            {t.about.badge}
                        </span>
                        <h1 className="text-5xl md:text-7xl font-display font-black text-white mb-12 tracking-tighter leading-tight">
                            {t.about.title} <br />
                            <span className="text-secondary italic">{t.about.titleHighlight}</span>
                        </h1>
                        <p className="text-2xl md:text-3xl text-white/90 max-w-2xl font-medium leading-relaxed mb-16 border-l-4 border-secondary pl-10">
                            {t.about.subtitle}
                        </p>
                    </motion.div>
                </div>

                {/* Floating Stats */}
                <div className="absolute bottom-20 right-12 hidden xl:flex flex-col gap-6">
                    {[
                        { label: t.about.stats.projects, val: '50+' },
                        { label: t.about.stats.clients, val: '120+' },
                        { label: t.about.stats.coverage, val: '100%' }
                    ].map((s, i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 + (i * 0.1) }}
                            className="bg-black/80 border border-white/10 p-8 rounded-[2rem] w-48 shadow-2xl"
                        >
                            <p className="text-secondary text-4xl font-black mb-1">{s.val}</p>
                            <p className="text-white text-[10px] font-black uppercase tracking-widest">{s.label}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Company History & Expertise */}
            <section className="py-32 bg-slate-50 relative overflow-hidden border-y border-slate-100">
                {/* Decorative Shape - No Blur */}
                <div className="absolute top-0 right-0 w-[60rem] h-[60rem] bg-slate-100 rounded-full -mr-[30rem] -mt-[30rem] z-0"></div>
                
                <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <span className="text-secondary font-black uppercase tracking-[0.3em] text-[10px] mb-8 block">{t.about.identityBadge}</span>
                            <h2 className="text-4xl md:text-6xl font-display font-black text-primary mb-12 tracking-tighter leading-none">
                                {t.about.historyTitle} <span className="text-secondary italic">{t.about.historyHighlight}</span>
                            </h2>
                            <div className="space-y-8">
                                <p className="text-xl text-slate-600 font-medium leading-relaxed">
                                    {t.about.companyHistory}
                                </p>
                                <p className="text-lg text-slate-500 leading-relaxed italic border-l-4 border-secondary pl-8">
                                    {t.about.detailsSection}
                                </p>
                                <p className="text-lg text-slate-500 leading-relaxed">
                                    {t.about.radioSatSection}
                                </p>
                            </div>

                            <div className="mt-16 p-10 bg-white rounded-[3rem] border border-slate-100 shadow-xl">
                                <div className="flex items-center gap-6 mb-8">
                                    <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-primary border border-slate-100">
                                        <Users size={24} />
                                    </div>
                                    <h4 className="font-black uppercase tracking-widest text-xs text-primary">{t.about.teamBadge}</h4>
                                </div>
                                <p className="text-slate-600 font-medium leading-relaxed mb-6">
                                    {t.about.teamSection}
                                </p>
                                <p className="text-primary font-black text-sm">
                                    {t.about.closingSection}
                                </p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="bg-primary p-12 md:p-20 rounded-[5rem] text-white shadow-2xl"
                        >
                            <h3 className="text-3xl font-black mb-12 text-secondary tracking-tight border-b border-white/10 pb-8">
                                {t.about.expertiseTitle}
                            </h3>
                            <div className="grid grid-cols-1 gap-6">
                                {t.about.expertiseItems.map((item: string, i: number) => (
                                    <div key={i} className="flex items-start gap-6 group">
                                        <div className="w-6 h-6 rounded-full border-2 border-secondary/30 group-hover:border-secondary transition-all shrink-0 flex items-center justify-center mt-1">
                                            <div className="w-1.5 h-1.5 rounded-full bg-secondary"></div>
                                        </div>
                                        <p className="text-lg text-slate-200 group-hover:text-white transition-colors font-medium">
                                            {item}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Specialized Solutions - New Strategic Content */}
            <section className="py-32 bg-primary text-white relative overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-10">
                    <Image
                        src="/images/decorativas/fishing-vessel.jpg"
                        alt="Background"
                        fill
                        className="object-cover"
                    />
                </div>
                <div className="absolute inset-0 bg-primary/40 z-0"></div>

                <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
                    <div className="text-center mb-24">
                        <span className="text-secondary font-black uppercase tracking-[0.3em] text-[10px] mb-8 block">{t.about.innovationBadge}</span>
                        <h2 className="text-4xl md:text-6xl font-display font-black text-white tracking-tighter leading-none">
                            {t.about.specializedSolTitle}
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {t.about.specializedSol.map((sol: any, i: number) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white/5 border border-white/10 p-12 rounded-[3rem] hover:bg-white/10 transition-all group"
                            >
                                <div className="w-16 h-16 bg-secondary text-primary rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform font-bold">
                                    {i === 0 ? <Shield size={32} /> : i === 1 ? <Anchor size={32} /> : <Zap size={32} />}
                                </div>
                                <h4 className="text-2xl font-black mb-6 tracking-tight text-white">{sol.title}</h4>
                                <p className="text-slate-300 font-medium leading-relaxed group-hover:text-white transition-colors">
                                    {sol.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Strategic Partners */}
            <section className="py-32 bg-white relative">
                <div className="max-w-7xl mx-auto px-6 lg:px-12">
                    <div className="flex flex-col items-center text-center mb-24">
                        <span className="text-secondary font-black uppercase tracking-[0.3em] text-[10px] mb-8 block">{t.about.globalNetworkBadge}</span>
                        <h2 className="text-4xl md:text-5xl font-display font-black text-primary tracking-tighter leading-none mb-8">
                            {t.about.partnersTitle}
                        </h2>
                        <div className="inline-flex items-center gap-4 py-3 px-8 bg-slate-50 border border-slate-100 rounded-full">
                            <Award className="text-primary" size={20} />
                            <span className="text-primary font-black uppercase tracking-widest text-[10px]">
                                {t.about.exclusiveDistributor}: <span className="text-primary ml-2">KD Workboats</span>
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-wrap justify-center gap-4 md:gap-8">
                        {t.about.partners.map((partner: string, i: number) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05 }}
                                className="py-4 px-8 bg-slate-50 border border-slate-100 rounded-2xl hover:border-primary/30 hover:bg-white hover:shadow-xl transition-all cursor-default"
                            >
                                <span className="text-slate-500 font-black tracking-tighter uppercase text-sm">
                                    {partner}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Locations / Infrastructure - Showroom Gallery */}
            <section className="py-32 bg-slate-50 border-t border-slate-100">
                <div className="max-w-7xl mx-auto px-6 lg:px-12">
                    <div className="flex flex-col lg:flex-row justify-between items-end gap-12 mb-24">
                        <div className="max-w-2xl">
                            <span className="text-secondary font-black uppercase tracking-[0.3em] text-[10px] mb-8 block">{t.about.infrastructureBadge}</span>
                            <h2 className="text-4xl md:text-6xl font-display font-black text-primary tracking-tighter leading-none">
                                {t.about.infrastructureTitle} <span className="text-secondary italic">{t.about.infrastructureHighlight}</span> {t.about.infrastructureSuffix}
                            </h2>
                        </div>
                        <p className="text-xl text-slate-500 max-w-md font-medium">
                            {t.about.infrastructureSubtitle}
                        </p>
                    </div>

                    {/* Store Gallery - Masonry-style Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-16">
                        {/* Facade - Large Feature */}
                        <motion.div 
                            whileHover={{ y: -5 }}
                            className="col-span-2 row-span-2 relative rounded-3xl overflow-hidden group cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-500"
                        >
                            <div className="relative h-full min-h-[400px]">
                                <Image src="/images/loja/fachada.jpg" alt="Fachada Namtech Pro" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <div className="absolute bottom-6 left-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    <p className="font-black text-lg">Fachada Principal</p>
                                    <p className="text-sm text-white/80">Namibe, Angola</p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Entrada */}
                        <motion.div 
                            whileHover={{ y: -5 }}
                            className="relative rounded-3xl overflow-hidden group cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500"
                        >
                            <div className="relative h-48 md:h-56">
                                <Image src="/images/loja/entrada.jpg" alt="Entrada da Loja" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            </div>
                        </motion.div>

                        {/* Montra */}
                        <motion.div 
                            whileHover={{ y: -5 }}
                            className="relative rounded-3xl overflow-hidden group cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500"
                        >
                            <div className="relative h-48 md:h-56">
                                <Image src="/images/loja/montra.jpg" alt="Montra" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            </div>
                        </motion.div>

                        {/* Showroom Geral */}
                        <motion.div 
                            whileHover={{ y: -5 }}
                            className="relative rounded-3xl overflow-hidden group cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500"
                        >
                            <div className="relative h-48 md:h-56">
                                <Image src="/images/loja/showroom-geral.jpg" alt="Showroom Geral" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            </div>
                        </motion.div>

                        {/* Yamaha Motor */}
                        <motion.div 
                            whileHover={{ y: -5 }}
                            className="relative rounded-3xl overflow-hidden group cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500"
                        >
                            <div className="relative h-48 md:h-56">
                                <Image src="/images/loja/yamaha-motor.jpg" alt="Yamaha Enduro" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Second Row - Equipment Details */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
                        {[
                            { src: '/images/loja/interior-furuno.jpg', alt: 'Equipamentos Furuno' },
                            { src: '/images/loja/showroom-panoramica.jpg', alt: 'Showroom Panorâmica' },
                            { src: '/images/loja/equipamentos-socorro.jpg', alt: 'Equipamentos de Socorro' },
                            { src: '/images/loja/vitrine-acessorios.jpg', alt: 'Vitrine de Acessórios' },
                        ].map((img, i) => (
                            <motion.div 
                                key={i}
                                whileHover={{ y: -5 }}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="relative rounded-2xl overflow-hidden group cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500"
                            >
                                <div className="relative h-48 md:h-56">
                                    <Image src={img.src} alt={img.alt} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Third Row - More Detail Shots */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { src: '/images/loja/interior-humminbird.jpg', alt: 'Humminbird Display' },
                            { src: '/images/loja/furuno-display.jpg', alt: 'Furuno Radar Display' },
                            { src: '/images/loja/hondex-equipamentos.jpg', alt: 'Hondex Equipamentos' },
                            { src: '/images/loja/interior-vitrine.jpg', alt: 'Vitrine de Comunicações' },
                        ].map((img, i) => (
                            <motion.div 
                                key={i}
                                whileHover={{ y: -5 }}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="relative rounded-2xl overflow-hidden group cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500"
                            >
                                <div className="relative h-48 md:h-56">
                                    <Image src={img.src} alt={img.alt} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Location Card */}
                    <div className="mt-16 bg-white rounded-[3rem] p-12 flex flex-col md:flex-row justify-between items-center text-center md:text-left border border-slate-100 shadow-sm gap-8">
                        <div className="flex items-center gap-6">
                            <MapPin className="text-secondary" size={48} />
                            <div>
                                <h4 className="font-black text-2xl text-primary">Namibe, Angola</h4>
                                <p className="text-slate-500 font-medium">{t.about.locationSubtitle}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-4xl font-display font-black text-primary">16+</p>
                            <p className="text-sm text-slate-500 uppercase tracking-widest font-bold">{t.about.infrastructure}</p>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};
