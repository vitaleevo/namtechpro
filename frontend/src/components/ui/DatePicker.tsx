"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
    format,
    addMonths,
    subMonths,
    startOfMonth,
    endOfMonth,
    startOfWeek,
    endOfWeek,
    eachDayOfInterval,
    isSameMonth,
    isSameDay,
    isToday
} from 'date-fns';
import { pt, enUS, fr } from 'date-fns/locale';
import { useLanguage } from '@/i18n';

interface DatePickerProps {
    value: string;
    onChange: (value: string) => void;
    label?: string;
}

export const CustomDatePicker = ({ value, onChange, label }: DatePickerProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentMonth, setCurrentMonth] = useState(value ? new Date(value) : new Date());
    const containerRef = useRef<HTMLDivElement>(null);
    const { language } = useLanguage();

    const locale = language === 'PT' ? pt : language === 'FR' ? fr : enUS;

    const selectedDate = value ? new Date(value) : null;

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const days = eachDayOfInterval({
        start: startOfWeek(startOfMonth(currentMonth), { weekStartsOn: 0 }),
        end: endOfWeek(endOfMonth(currentMonth), { weekStartsOn: 0 }),
    });

    const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
    const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

    const handleDateClick = (day: Date) => {
        onChange(format(day, 'yyyy-MM-dd'));
        setIsOpen(false);
    };

    return (
        <div className="space-y-2" ref={containerRef}>
            {label && <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">{label}</label>}
            <div className="relative">
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className={cn(
                        "w-full px-6 py-4 rounded-2xl bg-slate-800/50 border border-white/10 text-left flex items-center justify-between transition-all outline-none text-white",
                        isOpen ? "border-secondary ring-4 ring-secondary/20" : "hover:border-white/20"
                    )}
                >
                    <span className={cn(selectedDate ? "text-white font-bold" : "text-slate-500")}>
                        {selectedDate ? format(selectedDate, 'PPP', { locale }) : "Selecionar data"}
                    </span>
                    <CalendarIcon className="w-5 h-5 text-slate-400" />
                </button>

                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            className="absolute z-50 mt-2 bg-slate-900 border border-white/10 rounded-[2rem] shadow-2xl p-6 min-w-[320px]"
                        >
                            {/* Calendar Header */}
                            <div className="flex items-center justify-between mb-6">
                                <button type="button" onClick={prevMonth} className="p-2 hover:bg-white/5 rounded-full transition-colors">
                                    <ChevronLeft className="w-5 h-5 text-secondary" />
                                </button>
                                <h3 className="font-display font-black text-white capitalize">
                                    {format(currentMonth, 'MMMM yyyy', { locale })}
                                </h3>
                                <button type="button" onClick={nextMonth} className="p-2 hover:bg-white/5 rounded-full transition-colors">
                                    <ChevronRight className="w-5 h-5 text-secondary" />
                                </button>
                            </div>

                            {/* Day Names */}
                            <div className="grid grid-cols-7 mb-2">
                                {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((day, i) => (
                                    <div key={i} className="text-center text-[10px] font-black text-slate-400 uppercase tracking-tighter">
                                        {day}
                                    </div>
                                ))}
                            </div>

                            {/* Grid */}
                            <div className="grid grid-cols-7 gap-1">
                                {days.map((day, i) => {
                                    const isSelected = selectedDate && isSameDay(day, selectedDate);
                                    const isCurrentMonth = isSameMonth(day, currentMonth);

                                    return (
                                        <button
                                            key={i}
                                            type="button"
                                            onClick={() => handleDateClick(day)}
                                            className={cn(
                                                "h-10 w-10 rounded-xl flex items-center justify-center text-sm transition-all",
                                                !isCurrentMonth && "text-slate-700 pointer-events-none",
                                                isCurrentMonth && !isSelected && "hover:bg-white/5 text-slate-300 font-medium",
                                                isSelected && "bg-secondary text-primary font-bold shadow-lg shadow-secondary/20",
                                                isToday(day) && !isSelected && "border border-secondary/50 text-secondary font-bold"
                                            )}
                                        >
                                            {format(day, 'd')}
                                        </button>
                                    );
                                })}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};
