"use client";

import React from 'react';
import { Navbar } from '@/features/navigation/Navbar';
import { Footer } from '@/features/navigation/Footer';
import { HeroSection } from '@/features/home/HeroSection';
import { ProductGrid } from '@/features/home/ProductGrid';
import { NewsSection } from '@/features/home/NewsSection';
import { ArrowRight, Box, Compass, Zap, Radio } from 'lucide-react';
import Link from 'next/link';

import { useLanguage } from '@/i18n';
import { motion } from 'framer-motion';

export default function Home() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen bg-white text-primary font-sans transition-colors duration-300">
      <Navbar />

      <div className="animate-in fade-in duration-500">
        <HeroSection />

        {/* Categories Quick Access - "Subpages" Access */}
        <section className="py-24 relative overflow-hidden bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <span className="text-secondary font-black text-[10px] uppercase tracking-[0.5em] mb-4 block">{t.home.specialtiesBadge}</span>
              <h2 className="text-5xl md:text-7xl font-display font-black text-primary tracking-tighter">{t.home.categoryTitle} <span className="text-secondary">{t.home.categoryHighlight}</span></h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { name: t.home.catNavigation, icon: <Compass size={32} />, slug: 'navegacao', color: 'bg-blue-50' },
                { name: t.home.catCommunication, icon: <Radio size={32} />, slug: 'comunicacao', color: 'bg-slate-50' },
                { name: t.home.catEnergy, icon: <Zap size={32} />, slug: 'energia', color: 'bg-yellow-50' },
                { name: t.home.catControl, icon: <Box size={32} />, slug: 'controlo', color: 'bg-indigo-50' },
              ].map((cat, i) => (
                <Link key={i} href={`/catalogo/${cat.slug}`}>
                  <motion.div 
                    whileHover={{ scale: 1.05, y: -5 }}
                    className={`p-10 rounded-[3rem] ${cat.color} flex flex-col items-center text-center group transition-all cursor-pointer border border-transparent hover:border-slate-200 hover:shadow-2xl`}
                  >
                    <div className="w-20 h-20 rounded-3xl bg-white shadow-xl flex items-center justify-center mb-6 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
                      {cat.icon}
                    </div>
                    <span className="text-lg font-black text-primary uppercase tracking-widest leading-none">{cat.name}</span>
                    <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2 text-secondary font-black text-[10px] uppercase tracking-widest">
                      {t.home.explore} <ArrowRight size={12} />
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Premium Featured Products Section */}
        <section className="py-40 bg-slate-50 relative overflow-hidden">
          {/* Clean background without blurs */}

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col lg:flex-row justify-between items-end mb-24 gap-12">
              <div className="max-w-3xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-0.5 w-12 bg-secondary"></div>
                  <span className="text-secondary font-black text-[10px] uppercase tracking-[0.4em] block">
                    {t.home.portfolioBadge}
                  </span>
                </div>
                <h2 className="text-5xl md:text-8xl font-display font-black text-primary mb-8 leading-[0.85] tracking-tighter">
                  {t.home.eliteTitle} <br/> <span className="text-secondary underline decoration-primary/10 underline-offset-8">{t.home.eliteHighlight}</span>
                </h2>
                <p className="text-slate-500 text-xl font-medium leading-relaxed max-w-xl">
                  {t.home.eliteDesc}
                </p>
              </div>
              
              <div className="flex flex-col items-end gap-6 w-full lg:w-auto">
                <Link 
                  href="/catalogo"
                  className="group relative overflow-hidden px-14 py-8 bg-primary text-white rounded-[2.5rem] font-black text-xs uppercase tracking-[0.3em] flex items-center justify-center gap-6 hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.3)] transition-all hover:-translate-y-1 active:scale-95"
                >
                  <span className="relative z-10">{t.home.exploreInventory}</span>
                  <ArrowRight size={24} className="relative z-10 transition-transform group-hover:translate-x-3 duration-500" />
                  <div className="absolute inset-0 bg-secondary translate-y-full group-hover:translate-y-0 transition-transform duration-700" />
                </Link>
                <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  {t.home.realTimeSync}
                </p>
              </div>
            </div>
            
            <div className="relative">
              <ProductGrid />
            </div>
          </div>
        </section>

        {/* Latest News Section */}
        <NewsSection />
      </div>

      <Footer />
    </main>
  );
}
