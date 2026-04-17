"use client";

import React from 'react';
import { motion } from "framer-motion";
import { Shield, Target, Award, Users, Ship, Anchor, MapPin, ArrowRight } from "lucide-react";
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
                        src="https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&q=80&w=2000"
                    />
                    <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[1px]"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/60 to-transparent"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="max-w-4xl"
                    >
                        <span className="inline-block py-2 px-6 bg-secondary/20 text-secondary border border-secondary/30 rounded-full text-[10px] font-black uppercase tracking-[0.4em] mb-10">
                            {t.about.badge}
                        </span>
                        <h1 className="text-7xl md:text-[10rem] font-display font-black text-white mb-12 tracking-tighter leading-[0.85]">
                            {t.about.title} <br />
                            <span className="text-secondary italic">{t.about.titleHighlight}</span>
                        </h1>
                        <p className="text-2xl md:text-3xl text-slate-300 max-w-2xl font-medium leading-relaxed mb-16 border-l-4 border-secondary pl-10">
                            {t.about.subtitle}
                        </p>
                    </motion.div>
                </div>

                {/* Floating Stats */}
                <div className="absolute bottom-20 right-12 hidden xl:flex flex-col gap-6">
                    {[
                        { label: 'Projectos', val: '50+' },
                        { label: 'Clientes', val: '120+' },
                        { label: 'Cobertura', val: '100%' }
                    ].map((s, i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 + (i * 0.1) }}
                            className="bg-white/10 backdrop-blur-xl border border-white/10 p-8 rounded-[2rem] w-48"
                        >
                            <p className="text-secondary text-4xl font-black mb-1">{s.val}</p>
                            <p className="text-white text-[10px] font-black uppercase tracking-widest">{s.label}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Core Values Section */}
            <section className="py-32 bg-slate-50 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[60rem] h-[60rem] bg-primary/5 rounded-full blur-[120px] -mr-[30rem] -mt-[30rem]"></div>
                
                <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
                        <div>
                            <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px] mb-8 block">Nossa Essência</span>
                            <h2 className="text-5xl md:text-7xl font-display font-black text-slate-900 mb-12 tracking-tighter leading-none">
                                A nossa <span className="text-primary italic">Filosofia</span> de trabalho
                            </h2>
                            <p className="text-xl text-slate-500 font-medium leading-relaxed mb-16">
                                {t.about.philosophyDesc}
                            </p>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {[
                                    { icon: Shield, title: 'Confiança', desc: 'Sistemas críticos exigem segurança absoluta.' },
                                    { icon: Target, title: 'Precisão', desc: 'Engenharia de detalhe para mar alto.' }
                                ].map((item, i) => (
                                    <div key={i} className="p-10 bg-white rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
                                        <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all mb-8">
                                            <item.icon size={30} />
                                        </div>
                                        <h4 className="font-black uppercase tracking-widest text-xs mb-4">{item.title}</h4>
                                        <p className="text-sm text-slate-400 font-medium">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="relative">
                            <div className="bg-primary p-16 md:p-24 rounded-[5rem] text-white shadow-3xl">
                                <h3 className="text-4xl font-black mb-16 text-secondary tracking-tighter leading-none border-b border-white/10 pb-12">
                                    {t.about.ourJourney}
                                </h3>
                                <div className="space-y-12">
                                    {[
                                        { year: '2022', event: 'Fundação da Namtech Pro com foco em tecnologia naval.' },
                                        { year: '2024', event: 'Expansão para o setor de energia renovável solar.' },
                                        { year: '2025', event: 'Reconhecimento na FILDA como líder regional.' },
                                        { year: '2026', event: 'Consolidação da maior rede de suporte 24/7 em Angola.' }
                                    ].map((timeline, i) => (
                                        <div key={i} className="flex gap-10 group relative">
                                            {i !== 3 && <div className="absolute left-[1.125rem] top-12 bottom-[-2.5rem] w-px bg-white/10"></div>}
                                            <div className="w-10 h-10 rounded-full border-4 border-secondary/20 group-hover:border-secondary transition-all shrink-0 flex items-center justify-center bg-primary z-10">
                                                <div className="w-2 h-2 rounded-full bg-secondary"></div>
                                            </div>
                                            <div>
                                                <span className="text-2xl font-black text-secondary/30 group-hover:text-secondary transition-colors block mb-2">{timeline.year}</span>
                                                <p className="text-lg text-slate-400 group-hover:text-slate-100 transition-colors leading-relaxed font-medium">{timeline.event}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Locations / Infrastructure */}
            <section className="py-32 bg-white">
                <div className="max-w-7xl mx-auto px-6 lg:px-12">
                    <div className="flex flex-col lg:flex-row justify-between items-end gap-12 mb-24">
                        <div className="max-w-2xl">
                            <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px] mb-8 block">Infraestrutura</span>
                            <h2 className="text-5xl md:text-7xl font-display font-black text-slate-900 tracking-tighter leading-none">
                                Onde a <span className="text-primary italic">Inovação</span> acontece
                            </h2>
                        </div>
                        <p className="text-xl text-slate-500 max-w-md font-medium">
                            As nossas instalações no Namibe estão equipadas para responder aos maiores desafios da indústria marítima.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { img: 'https://images.unsplash.com/photo-1610488661603-60dbfb50cdce?auto=format&fit=crop&q=80&w=600', label: 'Showroom Principal', detail: 'Espaço comercial com os mais recentes equipamentos.' },
                            { img: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&q=80&w=600', label: 'Centro de Engenharia', detail: 'Laboratório de diagnóstico e reparação eletrónica.' },
                            { img: 'https://images.unsplash.com/photo-1536257104079-aa99c6460a5a?auto=format&fit=crop&q=80&w=600', label: 'Unidade Industrial', detail: 'Base de operações para integrações navais.' },
                            { img: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?auto=format&fit=crop&q=80&w=600', label: 'Logística Regional', detail: 'Armazém central para distribuição em Angola.' }
                        ].map((box, i) => (
                            <motion.div 
                                key={i}
                                whileHover={{ y: -10 }}
                                className="group bg-white rounded-[3rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500"
                            >
                                <div className="h-72 overflow-hidden relative">
                                    <Image src={box.img} alt={box.label} fill className="object-cover transition-transform duration-1000 group-hover:scale-110" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                </div>
                                <div className="p-10">
                                    <h4 className="font-black text-lg mb-4 text-primary tracking-tight">{box.label}</h4>
                                    <p className="text-sm text-slate-500 leading-relaxed font-medium">{box.detail}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section - Dark & Powerful */}
            <section className="py-24 px-6 lg:px-12">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-primary rounded-[5rem] p-16 md:p-32 text-center relative overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)]">
                        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
                        <div className="absolute top-0 right-0 w-[50rem] h-[50rem] bg-secondary/10 rounded-full blur-[150px] -mr-[25rem] -mt-[25rem]"></div>
                        
                        <div className="relative z-10">
                            <h2 className="text-5xl md:text-8xl font-display font-black text-white mb-12 tracking-tighter leading-none uppercase">
                                Faça parte desta <span className="text-secondary">Visão</span>
                            </h2>
                            <p className="text-2xl text-slate-300 mb-16 max-w-3xl mx-auto leading-relaxed font-medium">
                                Estamos sempre à procura de engenheiros, técnicos e comerciais apaixonados pela excelência marítima.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
                                <Link
                                    href="/contactos"
                                    className="w-full sm:w-auto px-16 py-7 bg-white text-primary rounded-[2rem] font-black uppercase tracking-widest text-sm hover:bg-secondary transition-all shadow-2xl flex items-center justify-center gap-4"
                                >
                                    Falar com o Recrutamento
                                    <ArrowRight size={20} />
                                </Link>
                                <Link
                                    href="/contactos"
                                    className="w-full sm:w-auto px-16 py-7 border-2 border-white/20 text-white rounded-[2rem] font-black uppercase tracking-widest text-sm hover:bg-white/10 transition-all flex items-center justify-center"
                                >
                                    Enviar CV
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
