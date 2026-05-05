"use client";

import React from 'react';
import { Navbar } from '@/features/navigation/Navbar';
import { Footer } from '@/features/navigation/Footer';
import { BookingForm } from '@/features/appointments/BookingForm';
import { useLanguage } from '@/i18n';
import { motion } from 'framer-motion';

export default function BookingPage() {
    const { t } = useLanguage();

    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            <section className="relative pt-44 pb-32 overflow-hidden">
                {/* Background Decorations */}
                <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-900/40 -skew-x-12 transform origin-top-right border-l border-white/5" />
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-secondary/5 rounded-full" />

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div>
                            <motion.span
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="inline-block py-2 px-4 rounded-full bg-secondary/20 text-secondary text-xs font-black uppercase tracking-widest mb-6 border border-secondary/20"
                            >
                                {t.booking.title}
                            </motion.span>
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-5xl md:text-7xl font-display font-black text-white mb-8 leading-tight"
                            >
                                Precisão Técnica <br />
                                <span className="text-secondary">Onde e Quando</span> <br />
                                Necessitar.
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-xl text-slate-400 mb-12 leading-relaxed max-w-lg"
                            >
                                {t.booking.subtitle} Mobilizamos as nossas unidades 4x4 do Namibe para qualquer ponto do litoral ou offshore.
                            </motion.p>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="p-6 bg-slate-900 rounded-3xl shadow-sm border border-white/5">
                                    <span className="material-symbols-outlined text-secondary text-3xl mb-3">verified_user</span>
                                    <p className="font-bold text-white">Técnicos Certificados</p>
                                    <p className="text-xs text-slate-500">Furuno & Icom</p>
                                </div>
                                <div className="p-6 bg-slate-900 rounded-3xl shadow-sm border border-white/5">
                                    <span className="material-symbols-outlined text-secondary text-3xl mb-3">local_shipping</span>
                                    <p className="font-bold text-white">Unidades Móveis</p>
                                    <p className="text-xs text-slate-500">Resposta Rápida</p>
                                </div>
                            </div>
                        </div>

                        <div className="relative">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.3 }}
                            >
                                <BookingForm />
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
