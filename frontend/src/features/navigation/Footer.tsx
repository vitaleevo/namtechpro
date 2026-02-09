"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/i18n';

export const Footer = () => {
    const { t } = useLanguage();

    return (
        <footer className="bg-primary pt-20 pb-10 text-white mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div className="col-span-1 md:col-span-1">
                        <div className="flex items-center gap-2 mb-6">
                            <Image
                                src="/images/logo-primary.png"
                                alt="Namtech Pro"
                                width={160}
                                height={48}
                                className="h-12 w-auto brightness-0 invert"
                            />
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            {t.footer.description}
                        </p>
                    </div>
                    <div>
                        <h4 className="text-sm font-bold uppercase tracking-widest text-secondary mb-6">{t.footer.company}</h4>
                        <ul className="space-y-4 text-slate-400 text-sm">
                            <li><Link href="/sobre" className="hover:text-white transition-colors">{t.footer.aboutUs}</Link></li>
                            <li><Link href="/eventos" className="hover:text-white transition-colors">{t.nav.events}</Link></li>
                            <li><Link href="/blog" className="hover:text-white transition-colors">{t.nav.blog}</Link></li>
                            <li><Link href="/agendamento" className="hover:text-white transition-colors">{t.booking.title}</Link></li>
                            <li><Link href="/contactos" className="hover:text-white transition-colors">{t.footer.contacts}</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-sm font-bold uppercase tracking-widest text-secondary mb-6">{t.footer.solutions}</h4>
                        <ul className="space-y-4 text-slate-400 text-sm">
                            <li><Link href="/catalogo" className="hover:text-white transition-colors">{t.footer.equipment}</Link></li>
                            <li><Link href="/servicos/energia-limpa" className="hover:text-white transition-colors">{t.footer.cleanEnergy}</Link></li>
                            <li><Link href="/servicos/suporte" className="hover:text-white transition-colors">{t.footer.support247}</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-sm font-bold uppercase tracking-widest text-secondary mb-6">{t.footer.contactTitle}</h4>
                        <p className="text-slate-400 text-sm mb-2">{t.footer.address}</p>
                        <p className="text-slate-400 text-sm mb-6">+244 9XX XXX XXX</p>
                        <div className="flex gap-4">
                            <a href="https://www.facebook.com/Namtechpro" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-secondary hover:text-primary transition-all">
                                <span className="material-symbols-outlined text-sm">public</span>
                            </a>
                            <a href="https://www.instagram.com/namtechpro/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-secondary hover:text-primary transition-all">
                                <span className="material-symbols-outlined text-sm">share</span>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-slate-500">© {new Date().getFullYear()} Namtech Pro. {t.footer.copyright}</p>
                    <div className="flex gap-6 text-xs text-slate-500">
                        <Link href="/termos" className="hover:text-slate-300">{t.footer.terms}</Link>
                        <Link href="/privacidade" className="hover:text-slate-300">{t.footer.privacy}</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};
