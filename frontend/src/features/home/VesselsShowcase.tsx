"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight, Anchor, Shield, LifeBuoy } from 'lucide-react';
import Link from 'next/link';

import { useLanguage } from '@/i18n';

export const VesselsShowcase = () => {
  const { t } = useLanguage();
  const vs = t.home.vesselsShowcase;

  const brands = [
    {
      name: "KD Workboats",
      description: vs.kdDesc,
      image: "/images/produtos/novos/kd_workboats.jpg",
      logo: "/images/logos/parceiros/kd-workboats.png",
      features: [vs.features.aluminum, vs.features.custom, vs.features.durability]
    },
    {
      name: "SeaRibs",
      description: vs.searibsDesc,
      image: "/images/produtos/novos/searibs.jpg",
      logo: "/images/logos/parceiros/searibs.png",
      features: [vs.features.hypalon, vs.features.casco, vs.features.cert]
    }
  ];

  return (
    <section className="py-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <span className="text-secondary font-black text-[10px] uppercase tracking-[0.5em] mb-4 block">{vs.badge}</span>
            <h2 className="text-4xl md:text-6xl font-display font-black text-primary tracking-tighter">
              {vs.title} <span className="text-secondary">{vs.highlight}</span>
            </h2>
            <p className="text-slate-500 mt-6 text-lg leading-relaxed">
              {vs.subtitle}
            </p>
          </div>
          <Link 
            href="/catalogo"
            className="flex items-center gap-3 text-primary font-black text-xs uppercase tracking-widest group border-b-2 border-primary/10 pb-2 hover:border-secondary transition-all"
          >
            {vs.viewCatalog} <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {brands.map((brand, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="group relative bg-slate-50 rounded-[3rem] overflow-hidden border border-slate-100 hover:border-slate-200 transition-all duration-500 shadow-sm hover:shadow-2xl"
            >
              <div className="relative h-[400px] w-full overflow-hidden">
                <Image
                  src={brand.image}
                  alt={brand.name}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent"></div>
                
                <div className="absolute bottom-8 left-8 right-8">
                  <h3 className="text-4xl font-display font-black text-white mb-2">{brand.name}</h3>
                  <p className="text-white/80 font-medium text-sm max-w-md">{brand.description}</p>
                </div>
              </div>

              <div className="p-10">
                <div className="grid grid-cols-3 gap-4">
                  {brand.features.map((feature, idx) => (
                    <div key={idx} className="flex flex-col items-center text-center">
                      <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center mb-3 text-secondary">
                        {idx === 0 ? <Anchor size={18} /> : idx === 1 ? <Shield size={18} /> : <LifeBuoy size={18} />}
                      </div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <button className="w-full mt-10 py-5 rounded-2xl bg-white border border-slate-200 text-primary font-black text-xs uppercase tracking-[0.2em] hover:bg-primary hover:text-white transition-all duration-300">
                  {vs.requestSpecs}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
