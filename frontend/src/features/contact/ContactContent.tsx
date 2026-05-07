"use client";

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from "framer-motion";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useLanguage } from '@/i18n';
import Image from 'next/image';

export const ContactContent = () => {
    const { t } = useLanguage();
    const searchParams = useSearchParams();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: 'Geral',
        message: ''
    });

    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [emailError, setEmailError] = useState(false);

    useEffect(() => {
        const subjectParam = searchParams?.get('subject');
        if (subjectParam) {
            setFormData(prev => ({
                ...prev,
                subject: 'Orcamento',
                message: t.contact.autoMessage.replace('{0}', subjectParam)
            }));
        }
    }, [searchParams]);
    const saveLead = useMutation(api.leads.createLead);

    const validateEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email.toLowerCase());
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setFormData({ ...formData, email: value });
        if (value && !validateEmail(value)) {
            setEmailError(true);
        } else {
            setEmailError(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateEmail(formData.email)) {
            setEmailError(true);
            return;
        }

        setStatus('loading');
        try {
            await saveLead({
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                subject: formData.subject,
                message: formData.message,
            });
            setStatus('success');
            setFormData({ name: '', email: '', phone: '', subject: 'Geral', message: '' });
        } catch (error) {
            console.error("Error saving lead:", error);
            setStatus('error');
        }
    };

    return (
        <div className="bg-white min-h-screen">
            {/* New Hero Section for Contacts */}
            <section className="relative h-[45vh] flex items-center overflow-hidden mb-16">
                <div className="absolute inset-0 z-0">
                    <Image
                        alt="Contact Us"
                        fill
                        priority
                        className="object-cover"
                        src="/images/loja/fachada.jpg"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/30 to-transparent"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                </div>
                <div className="relative z-10 max-w-7xl mx-auto px-4 w-full text-center text-white">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-display font-black mb-4 tracking-tighter"
                    >
                        {t.contact.title} <span className="text-secondary">{t.contact.titleHighlight}</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-white/90 max-w-2xl mx-auto font-medium"
                    >
                        {t.contact.subtitle}
                    </motion.p>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Contact Information */}
                    <div className="lg:col-span-1 space-y-8">
                        <div className="bg-slate-50 p-10 rounded-[2.5rem] text-primary shadow-2xl relative overflow-hidden group border border-slate-200">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform"></div>

                            <h3 className="text-2xl font-bold mb-8 relative z-10">{t.contact.ourContacts}</h3>

                            <div className="space-y-6 relative z-10">
                                <div className="flex items-start gap-4">
                                    <span className="material-symbols-outlined text-secondary">location_on</span>
                                    <div>
                                        <p className="font-bold">{t.contact.location}</p>
                                        <p className="text-sm text-slate-600">{t.footer.address}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <span className="material-symbols-outlined text-secondary">call</span>
                                    <div>
                                        <p className="font-bold">{t.contact.phone}</p>
                                        <p className="text-sm text-slate-600">+244 921 791 515 ({t.footer.office})</p>
                                        <p className="text-sm text-slate-600">+244 921 807 557 ({t.footer.shop})</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <span className="material-symbols-outlined text-secondary">mail</span>
                                    <div>
                                        <p className="font-bold">{t.contact.email}</p>
                                        <p className="text-sm text-slate-600">geral@namtechpro.net</p>
                                        <p className="text-sm text-slate-600">comercial@namtechpro.net</p>
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-slate-200 flex gap-4">
                                    <a href="https://www.facebook.com/Namtechpro" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                                        <span className="material-symbols-outlined text-sm">public</span>
                                    </a>
                                    <a href="https://www.instagram.com/namtechpro/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                                        <span className="material-symbols-outlined text-sm">share</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-2 bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl border border-slate-200">
                        {status === 'success' ? (
                            <div className="h-full flex flex-col items-center justify-center text-center py-20 animate-in fade-in zoom-in">
                                <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6">
                                    <span className="material-symbols-outlined text-4xl">check_circle</span>
                                </div>
                                <h2 className="text-3xl font-bold mb-4 text-primary">{t.contact.successTitle}</h2>
                                <p className="text-slate-500 mb-8 max-w-sm">
                                    {t.contact.successDesc}
                                </p>
                                <button
                                    onClick={() => setStatus('idle')}
                                    className="px-8 py-3 bg-secondary text-primary rounded-xl font-bold hover:bg-white transition-all"
                                >
                                    {t.contact.sendAnother}
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700 ml-1">{t.contact.name}</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            placeholder="Ex: João Manuel"
                                            className="w-full px-4 py-4 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-secondary text-primary outline-none transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700 ml-1">{t.contact.emailLabel}</label>
                                        <input
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={handleEmailChange}
                                            placeholder="exemplo@empresa.ao"
                                            className={`w-full px-4 py-4 rounded-xl bg-slate-50 border focus:bg-white outline-none text-primary transition-all ${emailError
                                                ? 'border-red-500 focus:ring-red-500'
                                                : formData.email && !emailError
                                                    ? 'border-emerald-500 focus:ring-emerald-500'
                                                    : 'border-slate-200 focus:ring-secondary'
                                                }`}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700 ml-1">{t.contact.phone}</label>
                                        <input
                                            type="tel"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            placeholder="+244"
                                            className="w-full px-4 py-4 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-secondary text-primary outline-none transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700 ml-1">{t.contact.subject}</label>
                                        <select
                                            value={formData.subject}
                                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                            className="w-full px-4 py-4 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-secondary text-primary outline-none transition-all"
                                        >
                                            <option value="Geral">{t.contact.subjectGeneral}</option>
                                            <option value="Orcamento">{t.contact.subjectQuote}</option>
                                            <option value="Suporte">{t.contact.subjectSupport}</option>
                                            <option value="Energia">{t.contact.subjectEnergy}</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 ml-1">{t.contact.message}</label>
                                    <textarea
                                        rows={5}
                                        required
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        placeholder={t.contact.messagePlaceholder}
                                        className="w-full px-4 py-4 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-secondary text-primary outline-none transition-all resize-none"
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    disabled={status === 'loading'}
                                    className="w-full bg-secondary text-primary py-5 rounded-2xl font-black text-lg hover:bg-white transition-all shadow-xl shadow-secondary/10 flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {status === 'loading' ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                            {t.contact.sending}
                                        </>
                                    ) : (
                                        <>
                                            {t.contact.send}
                                            <span className="material-symbols-outlined">send</span>
                                        </>
                                    )}
                                </button>
                                {status === 'error' && (
                                    <p className="text-red-500 text-center text-sm font-bold mt-4 animate-bounce">
                                        {t.contact.errorSending}
                                    </p>
                                )}
                            </form>
                        )}
                    </div>
                </div>
            </div>

            {/* Store Gallery Section */}
            <section className="py-32 mt-16 bg-slate-50 border-t border-slate-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <span className="text-secondary font-black text-[10px] uppercase tracking-[0.5em] mb-4 block">Nossa Presença</span>
                        <h2 className="text-4xl md:text-6xl font-display font-black text-primary tracking-tighter">
                            Visite a nossa <span className="text-secondary">Loja no Namibe</span>
                        </h2>
                        <p className="text-slate-500 max-w-2xl mx-auto mt-6">
                            Venha conhecer o nosso showroom e falar pessoalmente com os nossos especialistas. Dispomos de uma vasta gama de equipamentos em stock e prontos para entrega.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { src: '/images/loja/fachada.jpg', span: 'col-span-2 row-span-2' },
                            { src: '/images/loja/showroom-geral.jpg', span: 'col-span-2' },
                            { src: '/images/loja/montra.jpg', span: 'col-span-1' },
                            { src: '/images/loja/entrada.jpg', span: 'col-span-1' },
                            { src: '/images/loja/interior-vitrine.jpg', span: 'col-span-2' },
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ scale: 1.02 }}
                                className={`relative rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 min-h-[200px] ${item.span}`}
                            >
                                <Image 
                                    src={item.src} 
                                    alt="Namtech Store" 
                                    fill 
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-primary/0 hover:bg-primary/10 transition-colors duration-300"></div>
                            </motion.div>
                        ))}
                    </div>
                    
                    <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-8 rounded-3xl border border-slate-100 flex items-center gap-6">
                            <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center shrink-0">
                                <span className="material-symbols-outlined text-secondary">inventory_2</span>
                            </div>
                            <p className="text-sm font-bold text-primary">Equipamentos em Stock para entrega imediata</p>
                        </div>
                        <div className="bg-white p-8 rounded-3xl border border-slate-100 flex items-center gap-6">
                            <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center shrink-0">
                                <span className="material-symbols-outlined text-secondary">support_agent</span>
                            </div>
                            <p className="text-sm font-bold text-primary">Atendimento personalizado e técnico especializado</p>
                        </div>
                        <div className="bg-white p-8 rounded-3xl border border-slate-100 flex items-center gap-6">
                            <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center shrink-0">
                                <span className="material-symbols-outlined text-secondary">engineering</span>
                            </div>
                            <p className="text-sm font-bold text-primary">Área técnica dedicada para reparações e testes</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
