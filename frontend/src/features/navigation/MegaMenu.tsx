"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface MegaMenuProps {
    isOpen: boolean;
    content: {
        sections: {
            title: string;
            image?: string;
            description?: string;
            items: { label: string; href: string; description?: string; icon: string; external?: boolean }[];
        }[];
        featured?: {
            title: string;
            description: string;
            image: string;
            href: string;
        };
    };
    onClose: () => void;
}

export const MegaMenu = ({ isOpen, content, onClose }: MegaMenuProps) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop to close menu when clicking outside */}
                    <div
                        className="fixed inset-0 top-20 bg-slate-900/10 backdrop-blur-sm z-40"
                        onMouseEnter={onClose}
                    />

                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute left-0 right-0 top-full bg-white border-b border-slate-200 shadow-2xl z-50 overflow-hidden"
                    >
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                            <div className={`grid gap-x-8 gap-y-12 ${content.sections.length <= 4 ? 'grid-cols-4' :
                                content.sections.length <= 6 ? 'grid-cols-6' :
                                    'grid-cols-4 lg:grid-cols-8'
                                }`}>
                                {content.sections.map((section, idx) => (
                                    <div key={idx} className="space-y-6">
                                        {/* Section Header Image */}
                                        {section.image && (
                                            <div className="relative aspect-square w-full overflow-hidden rounded-sm bg-slate-100 mb-4 group/img">
                                                <Image
                                                    src={section.image}
                                                    alt={section.title}
                                                    fill
                                                    className="object-cover transition-transform duration-700 group-hover/img:scale-110"
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 25vw, 15vw"
                                                />
                                            </div>
                                        )}

                                        <div className="space-y-4">
                                            <h3 className="text-[13px] font-black uppercase tracking-tighter text-slate-900 border-b-2 border-slate-900 pb-1 inline-block">
                                                {section.title}
                                            </h3>
                                            {section.description && (
                                                <p className="text-[10px] italic text-slate-500 leading-tight">
                                                    {section.description}
                                                </p>
                                            )}
                                            <ul className="space-y-2">
                                                {section.items.map((item, itemIdx) => (
                                                    <li key={itemIdx}>
                                                        {item.external ? (
                                                            <a
                                                                href={item.href}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="text-[12px] font-medium text-slate-600 hover:text-primary transition-colors block py-0.5 flex items-center gap-1"
                                                            >
                                                                {item.label}
                                                                <span className="material-symbols-outlined text-[10px]">open_in_new</span>
                                                            </a>
                                                        ) : (
                                                            <Link
                                                                href={item.href}
                                                                onClick={onClose}
                                                                className="text-[12px] font-medium text-slate-600 hover:text-primary transition-colors block py-0.5"
                                                            >
                                                                {item.label}
                                                            </Link>
                                                        )}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Bottom bar for some context */}
                        <div className="bg-slate-50 py-4 border-t border-slate-100">
                            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                <span>Assistência Técnica Certificada pela IMO</span>
                                <div className="flex gap-4">
                                    <span className="flex items-center gap-1">
                                        <span className="w-2 h-2 rounded-full bg-green-500" />
                                        Suporte Online
                                    </span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
