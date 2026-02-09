"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useLanguage } from '@/i18n';
import { CustomSelect } from '@/components/ui/Select';
import { CustomDatePicker } from '@/components/ui/DatePicker';
import { CustomTimePicker } from '@/components/ui/TimePicker';

export const BookingForm = () => {
    const { t } = useLanguage();
    const createAppointment = useMutation(api.appointments.createAppointment);
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const [formData, setFormData] = useState({
        customerName: '',
        email: '',
        phone: '',
        serviceType: 'naval',
        location: 'namibe',
        date: '',
        time: '',
        message: ''
    });

    const serviceOptions = [
        { value: 'naval', label: t.booking.services.naval },
        { value: 'solar', label: t.booking.services.solar },
        { value: 'radio', label: t.booking.services.radio },
        { value: 'general', label: t.booking.services.general },
    ];

    const locationOptions = [
        { value: 'namibe', label: t.booking.locations.namibe },
        { value: 'luanda', label: t.booking.locations.luanda },
        { value: 'lobito', label: t.booking.locations.lobito },
        { value: 'offshore', label: t.booking.locations.offshore },
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Iniciando submissão do formulário...', formData);

        if (!formData.date) {
            alert('Por favor, selecione uma data.');
            return;
        }

        setStatus('loading');
        try {
            const result = await createAppointment({
                customerName: formData.customerName,
                email: formData.email,
                phone: formData.phone,
                serviceType: formData.serviceType,
                location: formData.location,
                date: formData.date,
                time: formData.time,
                message: formData.message || undefined,
            });

            console.log('Agendamento criado com sucesso! ID:', result);

            setStatus('success');
            setFormData({
                customerName: '',
                email: '',
                phone: '',
                serviceType: 'naval',
                location: 'namibe',
                date: '',
                time: '',
                message: ''
            });
        } catch (error) {
            console.error('Erro ao criar agendamento no Convex:', error);
            setStatus('error');
            // Feedback visual imediato se houver erro
            alert('Houve um erro ao processar o seu agendamento através do servidor. Por favor, tente novamente.');
        }
    };

    if (status === 'success') {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white/80 backdrop-blur-xl p-12 rounded-[2.5rem] shadow-2xl border border-white/20 text-center"
            >
                <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="material-symbols-outlined text-4xl">verified</span>
                </div>
                <h2 className="text-3xl font-black text-primary mb-4">{t.booking.successTitle}</h2>
                <p className="text-slate-500 mb-8">{t.booking.successDesc}</p>
                <button
                    onClick={() => setStatus('idle')}
                    className="px-10 py-4 bg-primary text-white rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-xl shadow-primary/20"
                >
                    Fazer outro Agendamento
                </button>
            </motion.div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-8 bg-white/40 backdrop-blur-md p-8 md:p-12 rounded-[3rem] border border-white/40 shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">{t.booking.name}</label>
                    <input
                        type="text"
                        required
                        value={formData.customerName}
                        onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                        className="w-full px-6 py-4 rounded-2xl bg-white/60 border border-slate-200 focus:ring-4 focus:ring-primary/5 outline-none transition-all"
                        placeholder="Ex: João Manuel"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">{t.booking.email}</label>
                    <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-6 py-4 rounded-2xl bg-white/60 border border-slate-200 focus:ring-4 focus:ring-primary/5 outline-none transition-all"
                        placeholder="exemplo@namtechpro.ao"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">{t.booking.phone}</label>
                    <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-6 py-4 rounded-2xl bg-white/60 border border-slate-200 focus:ring-4 focus:ring-primary/5 outline-none transition-all"
                        placeholder="+244"
                    />
                </div>

                <CustomSelect
                    label={t.booking.service}
                    options={serviceOptions}
                    value={formData.serviceType}
                    onChange={(val) => setFormData({ ...formData, serviceType: val })}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end">
                <CustomSelect
                    label={t.booking.location}
                    options={locationOptions}
                    value={formData.location}
                    onChange={(val) => setFormData({ ...formData, location: val })}
                />

                <CustomDatePicker
                    label={t.booking.date}
                    value={formData.date}
                    onChange={(val) => setFormData({ ...formData, date: val })}
                />

                <CustomTimePicker
                    label={t.booking.time}
                    value={formData.time}
                    onChange={(val) => setFormData({ ...formData, time: val })}
                />
            </div>

            <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">{t.booking.message}</label>
                <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-6 py-4 rounded-2xl bg-white/60 border border-slate-200 focus:ring-4 focus:ring-primary/5 outline-none transition-all resize-none"
                    placeholder="Especifique o modelo do equipamento ou detalhes da urgência..."
                />
            </div>

            <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-primary text-white py-6 rounded-[2rem] font-black text-xl hover:bg-slate-800 transition-all shadow-2xl shadow-primary/20 flex items-center justify-center gap-4 disabled:opacity-70"
            >
                {status === 'loading' ? (
                    <>
                        <div className="w-6 h-6 border-4 border-white/20 border-t-white rounded-full animate-spin" />
                        {t.booking.loading}
                    </>
                ) : (
                    <>
                        {t.booking.submit}
                        <span className="material-symbols-outlined">event_available</span>
                    </>
                )}
            </button>

            {status === 'error' && (
                <p className="text-red-500 text-center font-bold animate-bounce">
                    {t.booking.error}
                </p>
            )}
        </form>
    );
};
