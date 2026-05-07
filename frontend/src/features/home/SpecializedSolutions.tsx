"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ShieldAlert, Ship, Anchor, ArrowRight } from 'lucide-react';
import Link from 'next/link';

import { useLanguage } from '@/i18n';

export const SpecializedSolutions = () => {
  const { t } = useLanguage();
  const sc = t.home.specSolutions;

  const solutions = [
    {
      title: sc.safety,
      desc: sc.safetyDesc,
      image: "/images/produtos/novos/salvacao.jpg",
      icon: <ShieldAlert size={24} className="text-secondary" />,
      link: "/catalogo/seguranca"
    },
    {
      title: sc.signaling,
      desc: sc.signalingDesc,
      image: "/images/produtos/novos/sinalizadores.jpg",
      icon: <Ship size={24} className="text-secondary" />,
      link: "/catalogo/sinalizacao"
    },
    {
      title: sc.accessories,
      desc: sc.accessoriesDesc,
      image: "/images/produtos/novos/acessorios.jpg",
      icon: <Anchor size={24} className="text-secondary" />,
      link: "/catalogo/acessorios"
    }
  ];

  return (
    <section className="py-32 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <span className="text-secondary font-black text-[10px] uppercase tracking-[0.5em] mb-4 block">{sc.badge}</span>
          <h2 className="text-4xl md:text-6xl font-display font-black text-primary tracking-tighter">
            {sc.title} <span className="text-secondary">{sc.highlight}</span>
          </h2>
          <p className="text-slate-500 mt-6 max-w-2xl mx-auto text-lg">
            {sc.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {solutions.map((sol, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group bg-white rounded-[2.5rem] p-4 border border-slate-100 hover:border-slate-200 transition-all duration-500 shadow-sm hover:shadow-2xl"
            >
              <div className="relative h-64 w-full rounded-[2rem] overflow-hidden mb-8">
                <Image
                  src={sol.image}
                  alt={sol.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4 w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg">
                  {sol.icon}
                </div>
              </div>
              
              <div className="px-6 pb-6">
                <h3 className="text-2xl font-display font-black text-primary mb-3">{sol.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-6">
                  {sol.desc}
                </p>
                <Link 
                  href={sol.link}
                  className="inline-flex items-center gap-2 text-primary font-black text-[10px] uppercase tracking-widest group/btn"
                >
                  {sc.learnMore} <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform text-secondary" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
