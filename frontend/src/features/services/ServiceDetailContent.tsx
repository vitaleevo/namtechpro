"use client";

import React from 'react';
import { motion } from "framer-motion";
import { CheckCircle2, ArrowLeft, Phone, Mail, Clock, MapPin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/features/navigation/Navbar";
import { Footer } from "@/features/navigation/Footer";

export const ServiceDetailContent = ({ service }: { service: any }) => {
    return (
        <main className="min-h-screen bg-white">
            <Navbar />
            
            {/* Action Bar (Sticky) */}
            <div className="fixed bottom-0 left-0 right-0 z-[60] p-4 pointer-events-none">
                <motion.div 
                    initial={{ y: 100 }}
                    animate={{ y: 0 }}
                    className="max-w-4xl mx-auto flex items-center justify-between p-6 bg-slate-900/90 backdrop-blur-xl rounded-[2.5rem] border border-white/10 shadow-2xl pointer-events-auto"
                >
                    <div className="hidden md:flex items-center gap-6 px-4">
                        <div className="flex flex-col">
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Serviço</span>
                            <span className="text-white font-bold">{service.title}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <Link 
                            href="tel:+244921791515"
                            className="flex-1 md:flex-none px-8 py-4 bg-white/10 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-white/20 transition-all flex items-center justify-center gap-2"
                        >
                            <Phone size={14} />
                            Emergência
                        </Link>
                        <Link 
                            href={`/contactos?subject=${encodeURIComponent(service.title)}`}
                            className="flex-1 md:flex-none px-8 py-4 bg-secondary text-primary rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-yellow-400 transition-all shadow-xl shadow-secondary/20 flex items-center justify-center gap-2"
                        >
                            Solicitar Proposta
                            <Mail size={14} />
                        </Link>
                    </div>
                </motion.div>
            </div>

            {/* Hero Section */}
            <section className="relative h-[65vh] flex items-end pb-24 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        alt={service.title}
                        fill
                        priority
                        className="object-cover"
                        src={service.imageUrl || "https://images.unsplash.com/photo-1540962351504-03099e0a754b?auto=format&fit=crop&q=80&w=2000"}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full">
                    <Link 
                        href="/servicos"
                        className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-8 hover:gap-4 transition-all"
                    >
                        <ArrowLeft size={14} />
                        Voltar aos Serviços
                    </Link>
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-8xl font-display font-black text-primary tracking-tighter leading-none"
                    >
                        {service.title}
                    </motion.h1>
                </div>
            </section>

            {/* Content Grid */}
            <section className="py-24 max-w-7xl mx-auto px-6 lg:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
                    {/* Main Description */}
                    <div className="lg:col-span-7">
                        <div className="prose prose-2xl prose-slate">
                            <p className="text-2xl font-medium text-slate-600 leading-relaxed mb-12 italic border-l-8 border-secondary pl-10">
                                {service.description}
                            </p>
                            <div className="text-lg text-slate-500 leading-relaxed space-y-6">
                                {service.fullContent.split('\n').map((para: string, i: number) => (
                                    <p key={i}>{para}</p>
                                ))}
                            </div>
                        </div>

                        {/* Feature Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-20">
                            {service.features.map((feature: string, i: number) => (
                                <div key={i} className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 flex items-start gap-4">
                                    <CheckCircle2 size={24} className="text-secondary shrink-0" />
                                    <span className="text-primary font-black uppercase tracking-widest text-[11px] leading-relaxed">
                                        {feature}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Sidebar / Info */}
                    <div className="lg:col-span-5 space-y-10">
                        <div className="p-12 bg-primary rounded-[3.5rem] text-white overflow-hidden relative shadow-2xl">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
                            
                            <h3 className="text-2xl font-black mb-10 tracking-tight">Informações Premium</h3>
                            
                            <div className="space-y-8">
                                <div className="flex gap-6">
                                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center shrink-0">
                                        <Clock className="text-secondary" size={24} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Tempo de Resposta</p>
                                        <p className="font-bold text-lg">Inferior a 4 horas em Moçâmedes</p>
                                    </div>
                                </div>
                                <div className="flex gap-6">
                                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center shrink-0">
                                        <MapPin className="text-secondary" size={24} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Abrangência</p>
                                        <p className="font-bold text-lg">Todo o litoral de Angola</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-12 p-8 bg-white/5 rounded-3xl border border-white/10">
                                <p className="text-sm text-slate-300 italic mb-6">
                                    "A Namtech Pro é o parceiro de confiança para as maiores armadoras de Angola, garantindo que o seu sistema nunca falha quando mais precisa."
                                </p>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center font-black text-primary text-xs">
                                        NP
                                    </div>
                                    <p className="text-xs font-black uppercase tracking-widest">Namtech Engineering Team</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
};
