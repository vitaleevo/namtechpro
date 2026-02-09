"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Option {
    value: string;
    label: string;
}

interface CustomSelectProps {
    options: Option[];
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    label?: string;
    className?: string;
}

export const CustomSelect = ({ options, value, onChange, placeholder, label, className }: CustomSelectProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const selectedOption = options.find(opt => opt.value === value);

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
        <div className={cn("space-y-2", className)} ref={containerRef}>
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
                    <span className={cn(selectedOption ? "text-primary font-bold" : "text-slate-400")}>
                        {selectedOption ? selectedOption.label : placeholder}
                    </span>
                    <ChevronDown className={cn("w-5 h-5 text-slate-400 transition-transform", isOpen && "rotate-180")} />
                </button>

                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className="absolute z-50 w-full mt-2 bg-white/90 backdrop-blur-xl border border-white/40 rounded-3xl shadow-2xl p-2 overflow-hidden"
                        >
                            <div className="max-h-60 overflow-y-auto custom-scrollbar pr-2">
                                {options.map((option) => (
                                    <button
                                        key={option.value}
                                        type="button"
                                        onClick={() => {
                                            onChange(option.value);
                                            setIsOpen(false);
                                        }}
                                        className={cn(
                                            "w-full px-4 py-3 rounded-xl flex items-center justify-between text-left transition-all hover:bg-primary/5 group",
                                            value === option.value ? "bg-primary text-white" : "text-slate-600"
                                        )}
                                    >
                                        <span className="font-medium">{option.label}</span>
                                        {value === option.value && <Check className="w-4 h-4 text-white" />}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};
