"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Ship, Anchor, Shield, Fuel, Navigation, Waves, ArrowRight, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Navbar } from '@/features/navigation/Navbar';
import { Footer } from '@/features/navigation/Footer';

const boats = [
    {
        name: "KD Workboats Interceptor 14",
        type: "Segurança e Defesa",
        length: "14.5m",
        speed: "45 Knots",
        range: "350 nm",
        image: '/images/barcos/kd-workboats/police-01.jpg',
        description: "Embarcação tática de alta velocidade projetada para patrulhamento costeiro, interceção rápida e missões especiais de segurança marítima."
    },
    {
        name: "KD Workboats SAR 12",
        type: "Busca e Salvamento",
        length: "12m",
        speed: "38 Knots",
        range: "400 nm",
        image: "/images/barcos/kd-workboats/rescue-04.jpg",
        description: "Unidade de salvamento marítimo de resposta rápida, equipada com avançados sistemas de busca eletrónica e capacidade de resgate."
    },
    {
        name: "Searibs SR 650 Patrol",
        type: "Patrulha Costeira",
        length: "6.5m",
        speed: "40 Knots",
        range: "150 nm",
        image: "/images/barcos/searibs/cropped-DSC01578.webp",
        description: "Embarcação rígida inflável (RIB) de alto desempenho, otimizada para missões de patrulha, fiscalização e resposta rápida."
    },
    {
        name: "Ocean Trawler Pro",
        type: "Operações Offshore",
        length: "18.5m",
        speed: "18 Knots",
        range: "1200 nm",
        image: "/images/barcos/kd-workboats/shunter2.jpg",
        description: "Embarcação robusta otimizada para longos períodos em alto mar, transporte de tripulação e suporte logístico a plataformas offshore."
    }
];

export default function BarcosPage() {
    return (
        <>
        <Navbar />
        <main className="min-h-screen bg-white pt-24">
            {/* Hero Section */}
            <section className="relative px-6 lg:px-12 mb-20">
                <div className="max-w-7xl mx-auto rounded-3xl overflow-hidden relative h-[60vh] min-h-[500px] flex items-center shadow-2xl">
                    <div className="absolute inset-0 z-0">
                        <Image
                            src="/images/decorativas/hero_principal.jpg"
                            alt="Namtech Fleet"
                            fill
                            className="object-cover"
                            priority
                        />
                        <div className="absolute inset-0 bg-black/50"></div>
                        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent"></div>
                    </div>

                    <div className="relative z-10 p-10 lg:p-20 w-full">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="max-w-2xl"
                        >
                            <span className="inline-flex items-center gap-2 px-4 py-2 bg-secondary text-white rounded-full text-xs font-bold uppercase tracking-widest mb-6">
                                <Ship size={14} />
                                Divisão de Embarcações
                            </span>
                            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-tight">
                                Soluções Marítimas de <span className="text-secondary italic font-serif">Excelência</span>
                            </h1>
                            <p className="text-lg md:text-xl text-white/90 font-medium leading-relaxed mb-8">
                                Fornecemos embarcações de alta performance das prestigiadas marcas KD Workboats e Searibs, ideais para patrulha, resgate e operações offshore em Angola.
                            </p>
                            <Link href="#catalogo-embarcacoes" className="inline-flex items-center gap-3 bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg hover:shadow-primary/30">
                                Ver Catálogo
                                <ArrowRight size={18} />
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Catalog Grid Section */}
            <section id="catalogo-embarcacoes" className="py-20 bg-slate-50">
                <div className="max-w-7xl mx-auto px-6 lg:px-12">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                        <div className="max-w-2xl">
                            <span className="text-secondary font-bold uppercase tracking-widest text-sm mb-3 block">Frota Disponível</span>
                            <h2 className="text-4xl md:text-5xl font-bold text-primary tracking-tight">
                                Catálogo de Embarcações
                            </h2>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {boats.map((boat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                className="group bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
                            >
                                {/* Image Part */}
                                <div className="relative h-64 overflow-hidden bg-slate-100">
                                    <Image
                                        src={boat.image}
                                        alt={boat.name}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <span className="bg-white/95 text-primary text-xs font-bold uppercase px-3 py-1.5 rounded-lg shadow-sm border border-slate-100">
                                            {boat.type}
                                        </span>
                                    </div>
                                </div>

                                {/* Content Part */}
                                <div className="p-8 flex-1 flex flex-col">
                                    <h3 className="text-2xl font-bold text-primary mb-3 group-hover:text-primary transition-colors">
                                        {boat.name}
                                    </h3>
                                    <p className="text-slate-600 mb-8 leading-relaxed flex-1">
                                        {boat.description}
                                    </p>

                                    <div className="grid grid-cols-2 gap-4 mb-8 bg-slate-50 p-4 rounded-xl border border-slate-100">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-1.5 text-slate-500">
                                                <Ship size={14} />
                                                <span className="text-xs font-semibold uppercase">Comprimento</span>
                                            </div>
                                            <p className="text-sm font-bold text-primary">{boat.length}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-1.5 text-slate-500">
                                                <Waves size={14} />
                                                <span className="text-xs font-semibold uppercase">Velocidade</span>
                                            </div>
                                            <p className="text-sm font-bold text-primary">{boat.speed}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-1.5 text-slate-500">
                                                <Fuel size={14} />
                                                <span className="text-xs font-semibold uppercase">Autonomia</span>
                                            </div>
                                            <p className="text-sm font-bold text-primary">{boat.range}</p>
                                        </div>
                                    </div>

                                    <Link
                                        href="/contactos"
                                        className="w-full py-3.5 bg-primary/5 text-primary border border-primary/20 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-primary hover:text-white transition-all"
                                    >
                                        Solicitar Orçamento
                                        <ArrowRight size={16} />
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Custom Projects Section */}
            <section className="py-20 bg-white relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
                    <div className="bg-primary rounded-3xl overflow-hidden shadow-2xl flex flex-col lg:flex-row">
                        <div className="lg:w-1/2 p-10 lg:p-16 space-y-8">
                            <span className="text-secondary font-bold uppercase tracking-widest text-sm">Serviços Especiais</span>
                            <h2 className="text-4xl lg:text-5xl font-bold text-white tracking-tight">
                                Projetos de Engenharia <span className="text-secondary italic font-serif">Por Medida</span>
                            </h2>
                            <p className="text-lg text-slate-300 leading-relaxed">
                                Representamos marcas internacionais de renome e fornecemos soluções customizadas para as forças de defesa, segurança e empresas offshore.
                            </p>
                            
                            <ul className="space-y-4 pt-4">
                                {[
                                    'Consultoria e Aquisição Customizada',
                                    'Integração de Sistemas de Navegação',
                                    'Instalação de Eletrónica Marítima',
                                    'Manutenção e Suporte Técnico'
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-slate-200">
                                        <CheckCircle2 size={20} className="text-secondary shrink-0" />
                                        <span className="font-medium text-base">{item}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="pt-6">
                                <Link href="/contactos" className="inline-flex items-center gap-3 px-8 py-4 bg-white text-primary rounded-xl font-bold hover:bg-slate-100 transition-colors">
                                    Falar com um Especialista
                                </Link>
                            </div>
                        </div>
                        <div className="lg:w-1/2 relative min-h-[400px]">
                            <Image
                                src="/images/decorativas/catamaran-sailing.webp"
                                alt="Custom Engineering"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </main>
        <Footer />
        </>
    );
}
