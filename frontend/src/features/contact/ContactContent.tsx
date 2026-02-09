"use client";

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from "framer-motion";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useLanguage } from '@/i18n';

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
                message: `Ref: ${subjectParam}\n\nGostaria de obter mais informações sobre este item.`
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
        <div className="pt-32 pb-24 bg-slate-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-display font-black text-primary mb-4"
                    >
                        {t.contact.title} <span className="text-secondary">{t.contact.titleHighlight}</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-slate-500 max-w-2xl mx-auto"
                    >
                        {t.contact.subtitle}
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Contact Information */}
                    <div className="lg:col-span-1 space-y-8">
                        <div className="bg-primary p-10 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform"></div>

                            <h3 className="text-2xl font-bold mb-8 relative z-10">{t.contact.ourContacts}</h3>

                            <div className="space-y-6 relative z-10">
                                <div className="flex items-start gap-4">
                                    <span className="material-symbols-outlined text-secondary">location_on</span>
                                    <div>
                                        <p className="font-bold">{t.contact.location}</p>
                                        <p className="text-sm text-slate-300">{t.footer.address}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <span className="material-symbols-outlined text-secondary">call</span>
                                    <div>
                                        <p className="font-bold">{t.contact.phone}</p>
                                        <p className="text-sm text-slate-300">+244 9XX XXX XXX</p>
                                        <p className="text-sm text-slate-300">+244 2XX XXX XXX</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <span className="material-symbols-outlined text-secondary">mail</span>
                                    <div>
                                        <p className="font-bold">{t.contact.email}</p>
                                        <p className="text-sm text-slate-300">suporte@namtechpro.ao</p>
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-white/10 flex gap-4">
                                    <a href="https://www.facebook.com/Namtechpro" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary hover:text-primary transition-all">
                                        <span className="material-symbols-outlined text-sm">public</span>
                                    </a>
                                    <a href="https://www.instagram.com/namtechpro/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary hover:text-primary transition-all">
                                        <span className="material-symbols-outlined text-sm">share</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-2 bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl border border-slate-100">
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
                                    className="px-8 py-3 bg-primary text-white rounded-xl font-bold hover:bg-slate-800 transition-all"
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
                                            className="w-full px-4 py-4 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-primary outline-none transition-all"
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
                                            className={`w-full px-4 py-4 rounded-xl bg-slate-50 border outline-none transition-all ${emailError
                                                ? 'border-red-500 focus:ring-red-500'
                                                : formData.email && !emailError
                                                    ? 'border-emerald-500 focus:ring-emerald-500'
                                                    : 'border-slate-200 focus:ring-primary'
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
                                            className="w-full px-4 py-4 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-primary outline-none transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700 ml-1">{t.contact.subject}</label>
                                        <select
                                            value={formData.subject}
                                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                            className="w-full px-4 py-4 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-primary outline-none transition-all"
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
                                        className="w-full px-4 py-4 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-primary outline-none transition-all resize-none"
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    disabled={status === 'loading'}
                                    className="w-full bg-primary text-white py-5 rounded-2xl font-black text-lg hover:bg-slate-800 transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
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
                                        Erro ao enviar. Por favor, tente novamente ou ligue diretamente.
                                    </p>
                                )}
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
