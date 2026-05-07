"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useLanguage } from '@/i18n';

const brands = [
    { name: 'Suzuki', logo: '/images/equipamentos/suzuki/suzuki-logo-header_en-1.png' },
    { name: 'Furuno', type: 'text' },
    { name: 'Simrad', type: 'text' },
    { name: 'Iridium', type: 'text' },
    { name: 'Inmarsat', type: 'text' },
    { name: 'Entel', type: 'text' },
    { name: 'Sailor', type: 'text' },
    { name: 'Navicom', type: 'text' },
    { name: 'Intellian', type: 'text' },
    { name: 'OneWeb', type: 'text' },
    { name: 'Thrane', type: 'text' },
    { name: 'Thuraya', type: 'text' },
    { name: 'Phontech', type: 'text' },
    { name: 'Scout', type: 'text' },
    { name: 'CPS', type: 'text' },
];

export const BrandShowcase = () => {
    const { t } = useLanguage();

    return (
        <section className="py-24 bg-white border-y border-slate-100 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
                <span className="text-secondary font-black text-[10px] uppercase tracking-[0.5em] mb-4 block">
                    {t.partners?.title || "Parceiros Globais"}
                </span>
                <h2 className="text-3xl md:text-5xl font-display font-black text-primary tracking-tighter">
                    Tecnologia de <span className="text-secondary">Confiança</span>
                </h2>
            </div>

            <div className="relative">
                {/* Gradient Masks */}
                <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10"></div>
                <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10"></div>

                <div className="flex space-x-12 whitespace-nowrap animate-marquee">
                    {[...brands, ...brands].map((brand, i) => (
                        <div 
                            key={i} 
                            className="inline-flex items-center justify-center min-w-[200px] h-20 grayscale hover:grayscale-0 transition-all duration-500 opacity-60 hover:opacity-100"
                        >
                            {brand.logo ? (
                                <div className="relative w-32 h-12">
                                    <Image 
                                        src={brand.logo} 
                                        alt={brand.name} 
                                        fill 
                                        className="object-contain"
                                    />
                                </div>
                            ) : (
                                <span className="text-3xl md:text-4xl font-display font-black text-slate-400 tracking-tighter uppercase">
                                    {brand.name}
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <style jsx global>{`
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-marquee {
                    display: flex;
                    width: fit-content;
                    animation: marquee 30s linear infinite;
                }
                .animate-marquee:hover {
                    animation-play-state: paused;
                }
            `}</style>
        </section>
    );
};
