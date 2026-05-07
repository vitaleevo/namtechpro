import { useLanguage } from "@/i18n";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const HeroSection = () => {
    const { t } = useLanguage();
    
    return (
        <>
            {/* Hero Section */}
            <section className="relative min-h-[95vh] flex items-start pt-44 md:pt-56 pb-48 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        alt="Maritime Navigation"
                        fill
                        priority
                        className="object-cover scale-105"
                        src="/images/decorativas/hero_new.jpg"
                    />
                    <div className="absolute inset-0 bg-black/30"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-orange-600 via-amber-500 to-black opacity-80"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl text-white">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center gap-3 mb-6"
                        >
                            <span className="inline-block py-1.5 px-3 rounded bg-secondary text-primary text-[10px] font-black uppercase tracking-widest shadow-sm">
                                {t.hero.badge}
                            </span>
                            <span className="text-slate-200 text-[10px] font-bold uppercase tracking-widest border-l border-white/30 pl-3">
                                {t.hero.locations}
                            </span>
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-5xl md:text-8xl font-display font-extrabold mb-8 leading-[1.1] tracking-tight"
                        >
                            {t.hero.title} <span className="text-secondary">{t.hero.titleHighlight}</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-lg md:text-xl text-white/90 mb-10 leading-relaxed max-w-2xl font-medium"
                        >
                            {t.hero.subtitle}
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="flex flex-col sm:flex-row gap-5 mb-10"
                        >
                            <Link
                                href="/catalogo"
                                className="px-10 py-5 bg-secondary text-primary rounded-lg font-black text-lg hover:bg-yellow-400 hover:scale-105 transition-all shadow-2xl flex items-center justify-center gap-3"
                            >
                                {t.hero.viewEquipment}
                                <ArrowRight size={20} />
                            </Link>
                            <Link
                                href="/servicos"
                                className="px-10 py-5 bg-white/10 border border-white/20 text-white rounded-lg font-bold text-lg hover:bg-white/20 transition-all flex items-center justify-center gap-2"
                            >
                                {t.hero.ourServices}
                            </Link>
                        </motion.div>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-32 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50 animate-bounce">
                    <span className="text-[10px] font-bold uppercase tracking-widest">{t.hero.scroll}</span>
                    <span className="material-symbols-outlined">expand_more</span>
                </div>
            </section>

            {/* Sectors Section */}
            <section className="relative z-20 -mt-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                    {[
                        { label: t.home.sectors.boats, image: '/images/barcos/pesca.jpg' },
                        { label: t.home.sectors.rescue, image: '/images/produtos/novos/salvacao.jpg' },
                        { label: t.home.sectors.services, image: '/images/loja/fachada.jpg' },
                        { label: t.home.sectors.equipment, image: '/images/produtos/novos/acessorios.jpg' }
                    ].map((sector, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 + i * 0.1 }}
                            className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden group flex flex-col items-center text-center transform hover:-translate-y-2 transition-transform"
                        >
                            <div className="relative w-full h-48 md:h-56 bg-slate-100">
                                <Image src={sector.image} alt={sector.label} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                            </div>
                            <div className="p-4 md:p-6 flex-1 flex items-center justify-center">
                                <span className="text-xs md:text-sm font-bold text-primary uppercase tracking-widest leading-relaxed">{sector.label}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Partners Marquee */}
            <section className="py-20 bg-white overflow-hidden border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-4 mb-10 text-center">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-[0.3em]">{t.partners.title}</p>
                </div>
                <div className="flex space-x-12 whitespace-nowrap opacity-70 grayscale hover:grayscale-0 transition-all">
                    {['FURUNO', 'ICOM', 'SIMRAD', 'IRIDIUM', 'RAYMARINE', 'GARMIN', 'COBHAM', 'VICTRON'].map((brand, i) => (
                        <span key={i} className="text-3xl md:text-5xl font-display font-black text-slate-400 tracking-tighter">
                            {brand}
                        </span>
                    ))}
                </div>
            </section>

            {/* Main Core Business */}
            <section className="py-32 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
                        <div className="max-w-2xl">
                            <h2 className="text-4xl md:text-6xl font-display font-bold text-primary mb-6 leading-tight">
                                {t.coreBusiness.title} <span className="text-secondary">{t.coreBusiness.titleHighlight}</span> {t.coreBusiness.titleEnd}
                            </h2>
                            <p className="text-lg text-slate-600">
                                {t.coreBusiness.subtitle}
                            </p>
                        </div>
                        <div className="h-px flex-1 bg-slate-200 hidden md:block mb-6 mx-8"></div>
                        <span className="material-symbols-outlined text-secondary text-6xl">anchor</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                        {[
                            { icon: 'explore', title: t.coreBusiness.navigation, desc: t.coreBusiness.navigationDesc, href: '/catalogo?category=Navegação' },
                            { icon: 'settings_input_antenna', title: t.coreBusiness.radio, desc: t.coreBusiness.radioDesc, href: '/catalogo?category=Comunicação' },
                            { icon: 'satellite_alt', title: t.coreBusiness.satellite, desc: t.coreBusiness.satelliteDesc, href: '/catalogo?category=Comunicação' },
                            { icon: 'directions_boat', title: t.home.sectors.boats, desc: t.coreBusiness.vesselsDesc, href: '/barcos' }
                        ].map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                viewport={{ once: true }}
                                className="group relative bg-white p-10 rounded-3xl shadow-sm border border-slate-100 hover:shadow-2xl hover:-translate-y-4 transition-all duration-500 overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-full -mr-16 -mt-16 group-hover:bg-secondary transition-colors duration-500"></div>
                                <span className="material-symbols-outlined text-6xl text-primary mb-8 block transition-transform group-hover:scale-110 group-hover:text-secondary relative z-10">
                                    {item.icon}
                                </span>
                                <h3 className="text-2xl font-bold mb-4 relative z-10 text-primary">{item.title}</h3>
                                <p className="text-slate-600 leading-relaxed text-sm relative z-10">{item.desc}</p>
                                <div className="mt-8 pt-6 border-t border-slate-50">
                                    <Link 
                                        href={item.href}
                                        className="text-secondary text-xs font-bold uppercase tracking-widest flex items-center gap-2 group-hover:gap-4 transition-all"
                                    >
                                        {t.coreBusiness.learnMore} <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Feature Split Section */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div className="relative">
                            <div className="relative rounded-3xl overflow-hidden shadow-2xl z-10 w-full h-[600px]">
                                <Image src="/images/decorativas/trawler-fishing.jpg" alt="Equipa Técnica" fill className="object-cover" />
                                <div className="absolute inset-0 bg-black/30"></div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                                <div className="absolute bottom-10 left-10 text-white">
                                    <p className="text-5xl font-display font-black mb-2">24/7</p>
                                    <p className="text-sm font-bold uppercase tracking-widest text-secondary">{t.whyChoose.support247}</p>
                                </div>
                            </div>
                            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-slate-100 rounded-full"></div>
                            <div className="absolute -top-10 -left-10 w-48 h-48 bg-slate-50 rounded-full border border-slate-200"></div>
                        </div>

                        <div className="space-y-10">
                            <span className="text-secondary font-black uppercase tracking-widest text-sm">{t.whyChoose.badge}</span>
                            <h2 className="text-4xl md:text-5xl font-display font-bold text-primary leading-tight">
                                {t.whyChoose.title}
                            </h2>
                            <div className="space-y-8">
                                {[
                                    { title: t.whyChoose.certification, desc: t.whyChoose.certificationDesc, icon: 'verified_user' },
                                    { title: t.whyChoose.presence, desc: t.whyChoose.presenceDesc, icon: 'public' },
                                    { title: t.whyChoose.stock, desc: t.whyChoose.stockDesc, icon: 'inventory_2' },
                                    { title: 'Registo ANPG', desc: 'Empresa registada na ANPG para actuar junto do sector petrolífero.', icon: 'assignment_turned_in' }
                                ].map((feature, i) => (
                                    <div key={i} className="flex gap-6">
                                        <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center">
                                            <span className="material-symbols-outlined text-secondary">{feature.icon}</span>
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-bold mb-2 text-primary">{feature.title}</h4>
                                            <p className="text-slate-600 text-sm">{feature.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-32 bg-slate-50 text-primary overflow-hidden relative border-t border-slate-100">
                <div className="absolute top-0 right-0 opacity-5">
                    <span className="material-symbols-outlined text-[30rem] -mr-40 -mt-20">format_quote</span>
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl font-display font-bold mb-4">{t.testimonials.title}</h2>
                        <div className="h-1 w-20 bg-secondary mx-auto"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {[
                            { name: 'Cap. Manuel Santos', role: 'Frota de Pesca', text: 'A instalação dos novos radares Furuno mudou completamente a nossa segurança em noites de nevoeiro cerrado no Namibe.' },
                            { name: 'Eng. Amélia Costa', role: 'Gestora Portuária', text: 'O suporte técnico da Namtech é exemplar. Estão sempre disponíveis quando a pressão operacional é máxima.' },
                            { name: 'João Miguel', role: 'Logística Marítima', text: 'A solução de VSAT permitiu-nos digitalizar toda a nossa operação em alto mar. Um parceiro indispensável.' }
                        ].map((t_item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-all"
                            >
                                <div className="flex gap-1 text-secondary mb-6">
                                    {[...Array(5)].map((_, star) => <span key={star} className="material-symbols-outlined text-sm">star</span>)}
                                </div>
                                <p className="italic text-slate-600 mb-8 leading-relaxed">"{t_item.text}"</p>
                                <div>
                                    <p className="font-bold text-lg text-primary">{t_item.name}</p>
                                    <p className="text-xs text-secondary font-bold uppercase tracking-wider">{t_item.role}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-24 bg-white">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-primary p-12 md:p-20 rounded-[3rem] text-center shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-black/10 rounded-full -mr-32 -mt-32 group-hover:scale-150 transition-transform duration-700"></div>
                        <div className="relative z-10">
                            <h2 className="text-4xl md:text-6xl font-display font-black text-white mb-8 tracking-tighter">
                                {t.cta.title}
                            </h2>
                            <p className="text-xl text-slate-200 mb-12 max-w-2xl mx-auto font-medium">
                                {t.cta.subtitle}
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    href="/catalogo"
                                    className="px-12 py-5 bg-secondary text-primary rounded-2xl font-black text-lg hover:bg-yellow-400 transition-all shadow-xl"
                                >
                                    {t.cta.catalog}
                                </Link>
                                <Link
                                    href="/contactos"
                                    className="px-12 py-5 bg-white/10 text-white rounded-2xl font-black text-lg hover:bg-white/20 transition-all shadow-xl border border-white/10"
                                >
                                    {t.cta.consultant}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};
