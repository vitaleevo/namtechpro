"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Radio, Satellite, Tv, Signal, Shield, ArrowRight } from 'lucide-react';
import Link from 'next/link';

import { useLanguage } from '@/i18n';

export const CommunicationShowcase = () => {
  const { t } = useLanguage();
  const sc = t.home.commShowcase;

  const categories = [
    {
      id: "hf-ssb",
      title: sc.hfSsb,
      brands: ["Sailor", "Entel"],
      image: "/images/produtos/novos/sailor_hf.jpg",
      icon: <Radio size={24} className="text-secondary" />,
      link: "/catalogo/comunicacao/hf-ssb"
    },
    {
      id: "pmr",
      title: sc.pmr,
      brands: ["Entel", "CPS"],
      image: "/images/produtos/novos/entel_ht644.jpg",
      icon: <Radio size={24} className="text-secondary" />,
      link: "/catalogo/comunicacao/pmr"
    },
    {
      id: "gmdss",
      title: sc.gmdss,
      brands: ["Sailor Cobham", "Thrane"],
      image: "/images/produtos/novos/sinalizadores.jpg",
      icon: <Shield size={24} className="text-secondary" />,
      link: "/catalogo/comunicacao/gmdss"
    },
    {
      id: "satellite",
      title: sc.satellite,
      brands: ["Iridium", "Inmarsat", "Thuraya", "OneWeb / Intellian"],
      image: "/images/produtos/novos/iridium_handheld.jpg",
      icon: <Satellite size={24} className="text-secondary" />,
      link: "/catalogo/comunicacao/satelite"
    },
    {
      id: "tv",
      title: sc.tv,
      brands: ["Satélite TV (Intellian)", "Internas (Phontech)"],
      image: "/images/loja/montra.jpg",
      icon: <Tv size={24} className="text-secondary" />,
      link: "/catalogo/comunicacao/tv-internas"
    },
    {
      id: "network",
      title: sc.network,
      brands: ["4G / 5G (Scout)", "Antenas / Acessórios"],
      image: "/images/produtos/novos/radar_nxt.jpg",
      icon: <Signal size={24} className="text-secondary" />,
      link: "/catalogo/comunicacao/redes"
    },
    {
      id: "terrestrial",
      title: sc.terrestrial,
      brands: ["Satélite (Iridium)", "Radio (VHF/UHF/PMR)"],
      image: "/images/produtos/novos/iridium_use.webp",
      icon: <Radio size={24} className="text-secondary" />,
      link: "/catalogo/comunicacao/terrestre"
    }
  ];

  return (
    <section className="py-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <span className="text-secondary font-black text-[10px] uppercase tracking-[0.5em] mb-4 block">{sc.badge}</span>
            <h2 className="text-4xl md:text-7xl font-display font-black text-primary tracking-tighter leading-none">
              {sc.title} <br/> <span className="text-secondary">{sc.highlight}</span>
            </h2>
          </div>
          <p className="text-slate-500 text-lg max-w-sm font-medium leading-relaxed">
            {sc.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative h-[500px] rounded-[3rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-700"
            >
              <Image
                src={cat.image}
                alt={cat.title}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-700" />
              
              <div className="absolute inset-0 p-10 flex flex-col justify-between z-10">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-2xl transition-transform duration-500 group-hover:-rotate-12">
                  {cat.icon}
                </div>
                
                <div>
                  <h3 className="text-3xl font-display font-black text-white mb-4 tracking-tight group-hover:text-secondary transition-colors">{cat.title}</h3>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {cat.brands.map((brand) => (
                      <span key={brand} className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-[10px] font-black text-white uppercase tracking-widest border border-white/20">
                        {brand}
                      </span>
                    ))}
                  </div>
                  <Link 
                    href={cat.link}
                    className="inline-flex items-center gap-3 px-8 py-4 bg-white text-primary rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-secondary hover:text-white transition-all transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 duration-500"
                  >
                    {sc.viewCatalog} <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
