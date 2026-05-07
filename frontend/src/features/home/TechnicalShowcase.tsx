"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Wrench, Settings, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

import { useLanguage } from '@/i18n';

export const TechnicalShowcase = () => {
    const { t } = useLanguage();
    const ts = t.home.techShowcase;

    const works = [
        {
            title: ts.radarMaint,
            category: ts.radarCat,
            image: "/images/trabalhos/novos/trabalho1.jpg"
        },
        {
            title: ts.vsatInst,
            category: ts.vsatCat,
            image: "/images/trabalhos/novos/trabalho2.jpg"
        },
        {
            title: ts.motorRep,
            category: ts.motorCat,
            image: "/images/trabalhos/novos/trabalho3.jpg"
        },
        {
            title: ts.sonarCal,
            category: ts.sonarCat,
            image: "/images/trabalhos/novos/trabalho4.jpg"
        }
    ];

    return (
        <section className="py-32 bg-slate-50 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                    <div className="max-w-2xl">
                        <span className="text-secondary font-black text-[10px] uppercase tracking-[0.5em] mb-4 block">{ts.badge}</span>
                        <h2 className="text-5xl md:text-7xl font-display font-black text-primary tracking-tighter leading-none">
                            {ts.title} <span className="text-secondary">{ts.highlight}</span> <br/> {ts.subtitle}
                        </h2>
                    </div>
                    <Link 
                        href="/servicos"
                        className="text-primary font-black text-xs uppercase tracking-widest flex items-center gap-4 group hover:text-secondary transition-colors"
                    >
                        {ts.viewAll} <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {works.map((work, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="group relative h-[500px] rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer"
                        >
                            <Image 
                                src={work.image} 
                                alt={work.title} 
                                fill 
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
                            
                            <div className="absolute bottom-0 left-0 w-full p-10 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-secondary mb-3 block">
                                    {work.category}
                                </span>
                                <h3 className="text-2xl font-display font-black mb-6 tracking-tight leading-tight">
                                    {work.title}
                                </h3>
                                <div className="h-0.5 w-0 group-hover:w-full bg-secondary transition-all duration-500"></div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-slate-200 pt-16">
                    <div className="flex gap-6">
                        <div className="w-14 h-14 rounded-2xl bg-white shadow-xl flex items-center justify-center shrink-0">
                            <ShieldCheck className="text-secondary" size={28} />
                        </div>
                        <div>
                            <h4 className="text-lg font-black text-primary uppercase tracking-tight mb-2">{ts.quality}</h4>
                            <p className="text-sm text-slate-500 leading-relaxed">{ts.qualityDesc}</p>
                        </div>
                    </div>
                    <div className="flex gap-6">
                        <div className="w-14 h-14 rounded-2xl bg-white shadow-xl flex items-center justify-center shrink-0">
                            <Settings className="text-secondary" size={28} />
                        </div>
                        <div>
                            <h4 className="text-lg font-black text-primary uppercase tracking-tight mb-2">{ts.parts}</h4>
                            <p className="text-sm text-slate-500 leading-relaxed">{ts.partsDesc}</p>
                        </div>
                    </div>
                    <div className="flex gap-6">
                        <div className="w-14 h-14 rounded-2xl bg-white shadow-xl flex items-center justify-center shrink-0">
                            <Wrench className="text-secondary" size={28} />
                        </div>
                        <div>
                            <h4 className="text-lg font-black text-primary uppercase tracking-tight mb-2">{ts.team}</h4>
                            <p className="text-sm text-slate-500 leading-relaxed">{ts.teamDesc}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
