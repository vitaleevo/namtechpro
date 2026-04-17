"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Ship, Anchor, Shield, Fuel, Navigation, Waves, ArrowRight, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const boats = [
    {
        name: "Lancha NP-24 Intercetor",
        type: "Segurança e Vigilância",
        length: "14.5m",
        speed: "42 Knots",
        range: "350 nm",
        price: "Sob Consulta",
        image: "https://images.unsplash.com/photo-1544551763-8cb069f29d20?auto=format&fit=crop&q=80&w=1000",
        description: "Embarcação de alta velocidade projetada para patrulhamento costeiro, interceção rápida e missões táticas especiais."
    },
    {
        name: "Namtech Rescue 1200",
        type: "Busca e Salvamento (SAR)",
        length: "12m",
        speed: "35 Knots",
        range: "400 nm",
        price: "Sob Consulta",
        image: "https://images.unsplash.com/photo-1530919771146-5fd70281b37f?auto=format&fit=crop&q=80&w=1000",
        description: "Unidade de salvamento marítimo autoadireitável, equipada com os mais avançados sistemas de busca eletrónica e suporte médico."
    },
    {
        name: "Ocean Pro Trawler 185",
        type: "Pesca Profissional",
        length: "18.5m",
        speed: "12 Knots",
        range: "1200 nm",
        price: "Sob Consulta",
        image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=1000",
        description: "Embarcação de pesca industrial robusta, otimizada para longos períodos em alto mar com sistemas de frio redundantes."
    }
];

export default function BarcosPage() {
    return (
        <main className="min-h-screen bg-white pt-20">
            {/* Hero Section */}
            <section className="relative h-[70vh] flex items-center overflow-hidden bg-primary">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/novas fotos/Serviços.jpg"
                        alt="Namtech Fleet"
                        fill
                        className="object-cover opacity-40 grayscale"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-transparent"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="max-w-3xl"
                    >
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/20 text-secondary border border-secondary/30 rounded-full text-[10px] font-black uppercase tracking-[0.4em] mb-8">
                            <Anchor size={12} />
                            Divisão de Embarcações
                        </span>
                        <h1 className="text-6xl md:text-8xl font-display font-black text-white mb-10 tracking-tighter leading-none">
                            Venda de <br />
                            <span className="text-secondary italic">Embarcações</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-300 font-medium leading-relaxed max-w-2xl border-l-4 border-secondary pl-8">
                            Projetamos e comercializamos embarcações de alta performance com integração tecnológica de última geração para Angola.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Filter / Inventory Header */}
            <section className="py-24 max-w-7xl mx-auto px-6 lg:px-12">
                <div className="flex flex-col lg:flex-row justify-between items-end gap-12 mb-20">
                    <div className="max-w-2xl">
                        <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px] mb-6 block">Catálogo Premium</span>
                        <h2 className="text-4xl md:text-6xl font-display font-black text-slate-900 tracking-tighter leading-none">
                            Disponibilidade <span className="text-primary italic">Imediata</span>
                        </h2>
                    </div>
                    <div className="flex gap-4">
                        {['Todas', 'Patrulha', 'Pesca', 'Salvamento'].map((f, i) => (
                            <button key={i} className={`px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${i === 0 ? 'bg-primary text-white shadow-xl shadow-primary/20' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}>
                                {f}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {boats.map((boat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group bg-white rounded-[3.5rem] overflow-hidden border border-slate-100 hover:shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)] transition-all duration-700"
                        >
                            {/* Image Part */}
                            <div className="relative h-80 overflow-hidden">
                                <Image
                                    src={boat.image}
                                    alt={boat.name}
                                    fill
                                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent"></div>
                                <div className="absolute top-8 left-8">
                                    <span className="bg-white/95 backdrop-blur shadow-xl text-primary text-[9px] font-black uppercase px-5 py-2.5 rounded-full tracking-widest">
                                        {boat.type}
                                    </span>
                                </div>
                            </div>

                            {/* Content Part */}
                            <div className="p-12">
                                <h3 className="text-3xl font-black text-slate-900 mb-6 tracking-tight group-hover:text-primary transition-colors">
                                    {boat.name}
                                </h3>
                                <p className="text-slate-500 mb-10 leading-relaxed font-medium line-clamp-2">
                                    {boat.description}
                                </p>

                                <div className="grid grid-cols-2 gap-8 mb-12 border-y border-slate-100 py-10">
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-slate-400">
                                            <Ship size={14} />
                                            <span className="text-[10px] font-black uppercase tracking-widest">Comprimento</span>
                                        </div>
                                        <p className="text-base font-bold text-slate-900">{boat.length}</p>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-slate-400">
                                            <Waves size={14} />
                                            <span className="text-[10px] font-black uppercase tracking-widest">Velocidade</span>
                                        </div>
                                        <p className="text-base font-bold text-slate-900">{boat.speed}</p>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-slate-400">
                                            <Fuel size={14} />
                                            <span className="text-[10px] font-black uppercase tracking-widest">Autonomia</span>
                                        </div>
                                        <p className="text-base font-bold text-slate-900">{boat.range}</p>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-slate-400">
                                            <Shield size={14} />
                                            <span className="text-[10px] font-black uppercase tracking-widest">Garantia</span>
                                        </div>
                                        <p className="text-base font-extrabold text-primary">24 Meses</p>
                                    </div>
                                </div>

                                <Link
                                    href="/contactos"
                                    className="w-full py-6 bg-slate-900 text-white rounded-[2rem] font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-4 hover:bg-primary transition-all shadow-xl active:scale-95"
                                >
                                    Solicitar Dossier
                                    <ArrowRight size={16} />
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Custom Projects Section */}
            <section className="py-32 bg-slate-50 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
                    <div className="bg-primary rounded-[5rem] overflow-hidden shadow-3xl text-white flex flex-col lg:flex-row">
                        <div className="lg:w-1/2 p-16 md:p-24 space-y-12">
                            <span className="text-secondary font-black uppercase tracking-[0.3em] text-[10px]">Serviços Especiais</span>
                            <h2 className="text-5xl md:text-7xl font-display font-black tracking-tighter leading-none">
                                Engenharia <br />
                                <span className="text-secondary italic">Por Medida</span>
                            </h2>
                            <p className="text-xl text-slate-300 font-medium leading-relaxed">
                                Trabalhamos em conjunto com armadoras e entidades governamentais para fornecer soluções de frota personalizadas.
                            </p>
                            
                            <ul className="space-y-6">
                                {[
                                    'Projeto e Construção Customizada',
                                    'Integração de Sistemas AIS e Radar',
                                    'Remotorização de Frotas Antigas',
                                    'Consultoria de Eficiência Energética'
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-4 text-slate-300">
                                        <CheckCircle2 size={24} className="text-secondary shrink-0" />
                                        <span className="font-bold text-lg">{item}</span>
                                    </li>
                                ))}
                            </ul>

                            <button className="px-12 py-6 bg-secondary text-primary rounded-[2rem] font-black uppercase tracking-widest text-sm hover:bg-yellow-400 transition-all shadow-2xl">
                                Agendar Reunião Técnica
                            </button>
                        </div>
                        <div className="lg:w-1/2 relative min-h-[500px]">
                            <Image
                                src="https://images.unsplash.com/photo-1540962351504-03099e0a754b?auto=format&fit=crop&q=80&w=1200"
                                alt="Custom Engineering"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-primary via-transparent to-transparent"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Support Highlight - Reused Brand Asset */}
            <section className="py-24 px-6 lg:px-12">
                <div className="max-w-7xl mx-auto">
                    <div className="p-16 md:p-24 bg-white rounded-[4rem] border border-slate-100 flex flex-col lg:flex-row items-center justify-between gap-12 shadow-2xl">
                        <div className="max-w-2xl text-center lg:text-left">
                            <h3 className="text-4xl font-black text-slate-900 mb-6 tracking-tight leading-none uppercase">
                                Assistência Técnica <span className="text-primary italic">Global</span>
                            </h3>
                            <p className="text-lg text-slate-500 font-medium leading-relaxed">
                                Todas as nossas embarcações incluem cobertura total de manutenção preventiva e corretiva em toda a costa de Angola.
                            </p>
                        </div>
                        <div className="flex gap-6 shrink-0">
                            {[
                                { val: '24h', label: 'Suporte' },
                                { val: '48h', label: 'Intervenção' }
                            ].map((stat, i) => (
                                <div key={i} className="w-40 h-40 bg-slate-50 rounded-[3rem] border border-slate-100 flex flex-col items-center justify-center">
                                    <p className="text-primary text-4xl font-black mb-1">{stat.val}</p>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
