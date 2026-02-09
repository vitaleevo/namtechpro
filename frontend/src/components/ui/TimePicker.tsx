"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Check, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TimePickerProps {
    value: string;
    onChange: (value: string) => void;
    label?: string;
}

export const CustomTimePicker = ({ value, onChange, label }: TimePickerProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Generate time slots every 30 minutes from 08:00 to 18:00
    const timeSlots = [];
    for (let hour = 8; hour <= 18; hour++) {
        const h = hour.toString().padStart(2, '0');
        timeSlots.push(`${h}:00`);
        timeSlots.push(`${h}:30`);
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="space-y-2" ref={containerRef}>
            {label && <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">{label}</label>}
            <div className="relative">
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className={cn(
                        "w-full px-6 py-4 rounded-2xl bg-white/60 border border-slate-200 text-left flex items-center justify-between transition-all outline-none",
                        isOpen ? "border-primary ring-4 ring-primary/5" : "hover:border-slate-300"
                    )}
                >
                    <span className={cn(value ? "text-primary font-bold" : "text-slate-400")}>
                        {value ? value : "-- : --"}
                    </span>
                    <Clock className="w-5 h-5 text-slate-400" />
                </button>

                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            className="absolute z-50 mt-2 w-full bg-white/95 backdrop-blur-xl border border-white/40 rounded-[2rem] shadow-2xl p-4 overflow-hidden"
                        >
                            <div className="max-h-60 overflow-y-auto custom-scrollbar pr-2">
                                <div className="grid grid-cols-2 gap-2">
                                    {timeSlots.map((slot) => (
                                        <button
                                            key={slot}
                                            type="button"
                                            onClick={() => {
                                                onChange(slot);
                                                setIsOpen(false);
                                            }}
                                            className={cn(
                                                "flex items-center justify-between px-4 py-3 rounded-xl transition-all",
                                                value === slot
                                                    ? "bg-primary text-white font-bold"
                                                    : "hover:bg-primary/5 text-slate-600 font-medium"
                                            )}
                                        >
                                            {slot}
                                            {value === slot && <Check className="w-4 h-4 text-white" />}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};
