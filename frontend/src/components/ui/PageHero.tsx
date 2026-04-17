"use client";

import React from 'react';
import { motion } from "framer-motion";
import Image from "next/image";

interface PageHeroProps {
    title: string;
    highlight?: string;
    subtitle: string;
    image: string;
    height?: string;
}

export const PageHero = ({ title, highlight, subtitle, image, height = "h-[60vh]" }: PageHeroProps) => {
    return (
        <section className={`relative ${height} flex items-center overflow-hidden w-full`}>
            {/* Background Image with Ken Burns Effect */}
            <motion.div
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 10, ease: "easeOut" }}
                className="absolute inset-0 z-0"
            >
                <Image
                    alt={title}
                    fill
                    priority
                    className="object-cover"
                    src={image}
                />
            </motion.div>

            {/* Premium Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-transparent z-10"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent z-10"></div>

            {/* Content */}
            <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="max-w-3xl">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <div className="h-1 w-12 bg-secondary rounded-full"></div>
                            <span className="text-secondary font-black text-xs uppercase tracking-[0.3em]">Excellence Pro</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-black text-white mb-8 leading-[0.9] tracking-tighter">
                            {title}{" "}
                            {highlight && (
                                <span className="text-secondary block md:inline-block">
                                    {highlight}
                                </span>
                            )}
                        </h1>

                        <p className="text-xl md:text-2xl text-slate-200 font-medium leading-relaxed max-w-2xl border-l-2 border-white/20 pl-6 backdrop-blur-sm py-2">
                            {subtitle}
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Decorative Element */}
            <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-slate-50 to-transparent z-30"></div>

            {/* Floating Tech Elements (Subtle) */}
            <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-secondary/10 rounded-full blur-3xl pulse z-10"></div>
        </section>
    );
};
