"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Zap, Anchor } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export const HeroSection = () => {
    return (
        <>
            {/* Hero Section */}
            <section className="relative min-h-[95vh] flex items-start pt-44 md:pt-56 pb-48 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        alt="Maritime Navigation"
                        fill
                        priority
                        className="object-cover scale-105"
                        src="https://images.unsplash.com/photo-1524522173746-f628baad3644?auto=format&fit=crop&q=80&w=2000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/70 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-red-600 via-secondary to-black opacity-80"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl text-white">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center gap-3 mb-6"
                        >
                            <span className="inline-block py-1.5 px-3 rounded bg-secondary text-primary text-[10px] font-black uppercase tracking-widest shadow-sm">
                                Liderança Tecnológica em Angola
                            </span>
                            <span className="text-slate-200 text-[10px] font-bold uppercase tracking-widest border-l border-white/30 pl-3">
                                Namibe • Luanda • Lobito
                            </span>
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-5xl md:text-8xl font-display font-extrabold mb-8 leading-[1.1] tracking-tight"
                        >
                            A Vanguarda da <span className="text-secondary">Economia Azul</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-lg md:text-xl text-slate-100 mb-10 leading-relaxed max-w-2xl font-light opacity-90"
                        >
                            Desde o Porto do Namibe para todo o Atlântico Sul. Integramos sistemas marítimos e terrestres de precisão absoluta para operações críticas.
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="flex flex-col sm:flex-row gap-5 mb-10"
                        >
                            <Link
                                href="/catalogo"
                                className="px-10 py-5 bg-secondary text-primary rounded-lg font-black text-lg hover:bg-yellow-400 hover:scale-105 transition-all shadow-2xl flex items-center justify-center gap-3"
                            >
                                Ver Equipamentos
                                <ArrowRight size={20} />
                            </Link>
                            <Link
                                href="/servicos"
                                className="px-10 py-5 bg-white/10 backdrop-blur-xl border border-white/30 text-white rounded-lg font-bold text-lg hover:bg-white/20 transition-all flex items-center justify-center gap-2"
                            >
                                Nossos Serviços
                            </Link>
                        </motion.div>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-32 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50 animate-bounce">
                    <span className="text-[10px] font-bold uppercase tracking-widest">Scroll</span>
                    <span className="material-symbols-outlined">expand_more</span>
                </div>
            </section>

            {/* Stats Section */}
            <section className="relative z-20 -mt-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                    {[
                        { label: 'Anos de Experiência', val: '15+', icon: 'history_edu' },
                        { label: 'Navios Equipados', val: '450+', icon: 'directions_boat' },
                        { label: 'Técnicos Certificados', val: '24/7', icon: 'engineering' },
                        { label: 'Cidades Atendidas', val: '12', icon: 'location_city' }
                    ].map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 + i * 0.1 }}
                            className="bg-white p-8 rounded-2xl shadow-2xl border border-slate-100 flex flex-col items-center text-center transform hover:-translate-y-2 transition-transform"
                        >
                            <span className="material-symbols-outlined text-secondary text-3xl mb-4">{stat.icon}</span>
                            <span className="text-4xl font-display font-black text-primary mb-1">{stat.val}</span>
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest leading-tight">{stat.label}</span>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Partners Marquee */}
            <section className="py-20 bg-white overflow-hidden border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-4 mb-10 text-center">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.3em]">Distribuidores Oficiais & Parceiros</p>
                </div>
                <div className="flex space-x-12 whitespace-nowrap opacity-50 grayscale hover:grayscale-0 transition-all">
                    {['FURUNO', 'ICOM', 'SIMRAD', 'IRIDIUM', 'RAYMARINE', 'GARMIN', 'COBHAM', 'VICTRON'].map((brand, i) => (
                        <span key={i} className="text-3xl md:text-5xl font-display font-black text-slate-300 tracking-tighter">
                            {brand}
                        </span>
                    ))}
                </div>
            </section>

            {/* Main Core Business */}
            <section className="py-32 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
                        <div className="max-w-2xl">
                            <h2 className="text-4xl md:text-6xl font-display font-bold text-primary mb-6 leading-tight">
                                Engenharia de <span className="text-secondary">Precisão</span> para Ambientes Hostis.
                            </h2>
                            <p className="text-lg text-slate-600">
                                A nossa especialização cobre desde a pesca artesanal até às frotas petrolíferas de grande escala, garantindo que nunca perde o rumo ou a comunicação.
                            </p>
                        </div>
                        <div className="h-px flex-1 bg-slate-200 hidden md:block mb-6 mx-8"></div>
                        <span className="material-symbols-outlined text-secondary text-6xl">anchor</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                        {[
                            { icon: 'explore', title: 'Navegação', desc: 'Sistemas radar de última geração e cartas náuticas eletrónicas (ECDIS).' },
                            { icon: 'settings_input_antenna', title: 'Rádio-Comunicação', desc: 'Soluções GMDSS, VHF, UHF e MF/HF para segurança máxima no mar.' },
                            { icon: 'satellite_alt', title: 'Satélite & VSAT', desc: 'Internet de alta velocidade e voz em qualquer ponto do oceano.' },
                            { icon: 'solar_power', title: 'Energia Híbrida', desc: 'Sistemas solares e bancos de baterias para autonomia industrial.' }
                        ].map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                viewport={{ once: true }}
                                className="group relative bg-white p-10 rounded-3xl shadow-sm border border-slate-100 hover:shadow-2xl hover:-translate-y-4 transition-all duration-500 overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-full -mr-16 -mt-16 group-hover:bg-primary transition-colors duration-500"></div>
                                <span className="material-symbols-outlined text-6xl text-primary mb-8 block transition-transform group-hover:scale-110 group-hover:text-white relative z-10">
                                    {item.icon}
                                </span>
                                <h3 className="text-2xl font-bold mb-4 relative z-10">{item.title}</h3>
                                <p className="text-slate-500 leading-relaxed text-sm relative z-10">{item.desc}</p>
                                <div className="mt-8 pt-6 border-t border-slate-50">
                                    <button className="text-primary text-xs font-bold uppercase tracking-widest flex items-center gap-2 group-hover:gap-4 transition-all">
                                        Saber Mais <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Feature Split Section */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div className="relative">
                            <div className="relative rounded-3xl overflow-hidden shadow-2xl z-10 w-full h-[600px]">
                                <Image src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=800" alt="Equipa Técnica" fill className="object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent"></div>
                                <div className="absolute bottom-10 left-10 text-white">
                                    <p className="text-5xl font-display font-black mb-2">24/7</p>
                                    <p className="text-sm font-bold uppercase tracking-widest text-secondary">Assistência Local</p>
                                </div>
                            </div>
                            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-secondary/10 rounded-full blur-3xl"></div>
                            <div className="absolute -top-10 -left-10 w-48 h-48 bg-primary/10 rounded-full blur-3xl"></div>
                        </div>

                        <div className="space-y-10">
                            <span className="text-secondary font-black uppercase tracking-widest text-sm">Excelência Operacional</span>
                            <h2 className="text-4xl md:text-5xl font-display font-bold text-primary leading-tight">
                                Porque escolher a Namtech Pro para a sua frota?
                            </h2>
                            <div className="space-y-8">
                                {[
                                    { title: 'Certificação Internacional', desc: 'Trabalhamos rigorosamente sob as normas da IMO (International Maritime Organization).', icon: 'verified_user' },
                                    { title: 'Presença Local, Visão Global', desc: 'Sede no Namibe com capacidade de mobilização para Luanda, Lobito e Soyo.', icon: 'public' },
                                    { title: 'Stock de Peças Críticas', desc: 'Mantemos um inventário local para evitar tempos de paragem prolongados.', icon: 'inventory_2' }
                                ].map((feature, i) => (
                                    <div key={i} className="flex gap-6">
                                        <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center">
                                            <span className="material-symbols-outlined text-primary">{feature.icon}</span>
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-bold mb-2">{feature.title}</h4>
                                            <p className="text-slate-500 text-sm">{feature.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-32 bg-primary text-white overflow-hidden relative">
                <div className="absolute top-0 right-0 opacity-10">
                    <span className="material-symbols-outlined text-[30rem] -mr-40 -mt-20">format_quote</span>
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl font-display font-bold mb-4">Confiança que Atravessa Oceanos</h2>
                        <div className="h-1 w-20 bg-secondary mx-auto"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {[
                            { name: 'Cap. Manuel Santos', role: 'Frota de Pesca', text: 'A instalação dos novos radares Furuno mudou completamente a nossa segurança em noites de nevoeiro cerrado no Namibe.' },
                            { name: 'Eng. Amélia Costa', role: 'Gestora Portuária', text: 'O suporte técnico da Namtech é exemplar. Estão sempre disponíveis quando a pressão operacional é máxima.' },
                            { name: 'João Miguel', role: 'Logística Marítima', text: 'A solução de VSAT permitiu-nos digitalizar toda a nossa operação em alto mar. Um parceiro indispensável.' }
                        ].map((t, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-white/5 backdrop-blur-lg p-10 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors"
                            >
                                <div className="flex gap-1 text-secondary mb-6">
                                    {[...Array(5)].map((_, star) => <span key={star} className="material-symbols-outlined text-sm">star</span>)}
                                </div>
                                <p className="italic text-slate-300 mb-8 leading-relaxed">&quot;{t.text}&quot;</p>
                                <div>
                                    <p className="font-bold text-lg">{t.name}</p>
                                    <p className="text-xs text-secondary font-bold uppercase tracking-wider">{t.role}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-24 bg-white">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-secondary p-12 md:p-20 rounded-[3rem] text-center shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full -mr-32 -mt-32 group-hover:scale-150 transition-transform duration-700"></div>
                        <div className="relative z-10">
                            <h2 className="text-4xl md:text-6xl font-display font-black text-primary mb-8 tracking-tighter">
                                Pronto para Elevar a sua Tecnologia?
                            </h2>
                            <p className="text-xl text-primary/80 mb-12 max-w-2xl mx-auto font-medium">
                                Solicite hoje um diagnóstico técnico gratuito da sua embarcação ou infraestrutura industrial.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    href="/catalogo"
                                    className="px-12 py-5 bg-primary text-white rounded-2xl font-black text-lg hover:bg-slate-800 transition-all shadow-xl"
                                >
                                    Consultar Catálogo
                                </Link>
                                <Link
                                    href="/contactos"
                                    className="px-12 py-5 bg-white text-primary rounded-2xl font-black text-lg hover:bg-slate-50 transition-all shadow-xl border-2 border-primary/10"
                                >
                                    Falar com Consultor
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};
