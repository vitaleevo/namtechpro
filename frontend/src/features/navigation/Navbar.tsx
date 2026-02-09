"use client";

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useLanguage, Language } from '@/i18n';
import { useUser, UserButton } from '@clerk/nextjs';

const ADMIN_EMAIL = "namtechproo@gmail.com";

export const Navbar = () => {
    const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
    const langMenuRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();
    const { language, setLanguage, t } = useLanguage();
    const { user } = useUser();
    const isAdmin = user?.emailAddresses.some(e => e.emailAddress === ADMIN_EMAIL);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
                setIsLangMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const navLinks = [
        { label: t.nav.home, href: '/' },
        { label: t.nav.about, href: '/sobre' },
        { label: t.nav.catalog, href: '/catalogo' },
        { label: t.nav.services, href: '/servicos' },
        { label: t.nav.events, href: '/eventos' },
        { label: t.nav.blog, href: '/blog' },
        { label: t.booking.title, href: '/agendamento' },
        { label: t.nav.contact, href: '/contactos' },
        ...(isAdmin ? [{ label: "BackOffice", href: '/namtechprobackoffice' }] : []),
    ];

    const languages: { code: Language; label: string; flag: string }[] = [
        { code: 'PT', label: 'Português', flag: '🇵🇹' },
        { code: 'EN', label: 'English', flag: '🇺🇸' },
        { code: 'FR', label: 'Français', flag: '🇫🇷' },
    ];

    return (
        <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 transition-colors">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center">
                    {/* Logo Section */}
                    <Link href="/" className="flex items-center gap-4 cursor-pointer">
                        <div className="flex items-center gap-3">
                            <Image
                                src="/images/logo-primary.png"
                                alt="Namtech Pro"
                                width={160}
                                height={48}
                                className="h-10 md:h-12 w-auto object-contain"
                                priority
                            />
                        </div>
                    </Link>

                    {/* Navigation Links */}
                    <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`text-xs lg:text-sm font-semibold transition-all whitespace-nowrap ${pathname === link.href
                                    ? 'text-primary border-b-2 border-secondary pb-1'
                                    : 'text-slate-600 hover:text-primary'
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Actions Section */}
                    <div className="flex items-center gap-2 lg:gap-4">
                        {/* Language Selector */}
                        <div className="relative" ref={langMenuRef}>
                            <button
                                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                                className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-slate-100 text-slate-600 transition-all border border-transparent hover:border-slate-200"
                            >
                                <span className="material-symbols-outlined text-lg">language</span>
                                <span className="text-[10px] font-black uppercase tracking-widest">{language}</span>
                                <span className={`material-symbols-outlined text-xs transition-transform duration-300 ${isLangMenuOpen ? 'rotate-180' : ''}`}>expand_more</span>
                            </button>

                            {/* Language Dropdown Menu */}
                            {isLangMenuOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in duration-200 z-[60]">
                                    <div className="p-2 space-y-1">
                                        {languages.map((lang) => (
                                            <button
                                                key={lang.code}
                                                onClick={() => {
                                                    setLanguage(lang.code);
                                                    setIsLangMenuOpen(false);
                                                }}
                                                className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${language === lang.code
                                                    ? 'bg-primary text-white'
                                                    : 'hover:bg-slate-50 text-slate-600'
                                                    }`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <span className="text-lg leading-none">{lang.flag}</span>
                                                    <span className="text-xs font-bold">{lang.label}</span>
                                                </div>
                                                {language === lang.code && (
                                                    <span className="material-symbols-outlined text-xs text-secondary">check_circle</span>
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* User Profile / Logout */}
                        {user && (
                            <div className="ml-2 border-l border-slate-200 pl-4">
                                <UserButton
                                    afterSignOutUrl="/"
                                    appearance={{
                                        elements: {
                                            avatarBox: "w-10 h-10"
                                        }
                                    }}
                                />
                            </div>
                        )}

                        <Link
                            href="/contactos"
                            className="hidden xl:flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg text-xs font-semibold hover:bg-primary-dark transition-all"
                        >
                            <span className="material-symbols-outlined text-sm">support_agent</span>
                            {t.nav.support}
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};
