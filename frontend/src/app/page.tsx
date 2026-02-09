"use client";

import React from 'react';
import { Navbar } from '@/features/navigation/Navbar';
import { Footer } from '@/features/navigation/Footer';
import { HeroSection } from '@/features/home/HeroSection';
import { ProductGrid } from '@/features/home/ProductGrid';
import { NewsSection } from '@/features/home/NewsSection';

import { useLanguage } from '@/i18n';
import { motion } from 'framer-motion';

export default function Home() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen bg-background-light text-slate-900 font-sans transition-colors duration-300">
      <Navbar />

      <div className="animate-in fade-in duration-500">
        <HeroSection />

        {/* Featured Products Section */}
        <section className="py-32 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-6xl font-display font-bold text-primary mb-6">
                Produtos <span className="text-secondary">Destaque</span>
              </h2>
              <div className="h-1.5 w-24 bg-secondary mx-auto rounded-full"></div>
            </div>
            <ProductGrid />
          </div>
        </section>

        {/* Latest News Section */}
        <NewsSection />
      </div>

      <Footer />
    </main>
  );
}
