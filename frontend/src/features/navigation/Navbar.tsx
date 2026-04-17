"use client";

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useLanguage, Language } from '@/i18n';
import { useUser, UserButton } from '@clerk/nextjs';
import { MegaMenu } from './MegaMenu';

const ADMIN_EMAIL = "namtechproo@gmail.com";

export const Navbar = () => {
    const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
    const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
    const langMenuRef = useRef<HTMLDivElement>(null);
    const navbarRef = useRef<HTMLElement>(null);
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

    const servicesMegaContent = {
        sections: [
            {
                title: language === 'PT' ? "Agendamento" : "Booking",
                image: "/images/imagens/Sondas.jpg",
                items: [
                    { label: language === 'PT' ? "Marcar Assistência" : "Book Service", href: "/agendamento", icon: "calendar_month" },
                ]
            },
            {
                title: language === 'PT' ? "Assistência Técnica" : "Technical Support",
                image: "/images/imagens/Sondas.jpg",
                items: [
                    { label: language === 'PT' ? "Instalação Certificada" : "Certified Installation", href: "/servicos", icon: "construction" },
                    { label: language === 'PT' ? "Manutenção e Reparação" : "Maintenance and Repair", href: "/servicos", icon: "build" },
                ]
            },
            {
                title: "NAMTECH SOLUTIONS",
                image: "/images/imagens/Radar_antenna.jpg",
                items: [
                    { label: language === 'PT' ? "Sugestão de Soluções" : "Bespoke Solutions", href: "/servicos#solutions", icon: "lightbulb" },
                    { label: language === 'PT' ? "Energia Limpa a Bordo" : "Clean Energy at Sea", href: "/servicos#energy", icon: "solar_power" },
                ]
            }
        ]
    };

    const comunicacoesMegaContent = {
        sections: [
            {
                title: "Radios VHF",
                image: "/images/imagens/Radar_antenna.jpg", // Placeholder for Communications
                items: [
                    { label: "Sailor", href: "/catalogo?category=Radios%20VHF", icon: "radio" },
                    { label: "Navicon", href: "/catalogo?category=Radios%20VHF", icon: "radio" },
                    { label: "Entel", href: "/catalogo?category=Radios%20VHF", icon: "radio" },
                    { label: "CPS", href: "/catalogo?category=Radios%20VHF", icon: "radio" }
                ]
            },
            {
                title: "Rádios HF/SSB",
                image: "/images/imagens/Radar_antenna.jpg",
                items: [
                    { label: "Sailor", href: "/catalogo?category=R%C3%A1dios%20HF%2FSSB", icon: "radio" },
                    { label: "Entel", href: "/catalogo?category=R%C3%A1dios%20HF%2FSSB", icon: "radio" }
                ]
            },
            {
                title: "Radios PMR",
                image: "/images/imagens/Radar_antenna.jpg",
                items: [
                    { label: "Entel", href: "/catalogo?category=Radios%20PMR", icon: "radio" },
                    { label: "CPS", href: "/catalogo?category=Radios%20PMR", icon: "radio" }
                ]
            },
            {
                title: "GMDSS",
                image: "/images/imagens/Radar_antenna.jpg",
                items: [
                    { label: "Sailor Cobham", href: "/catalogo?category=GMDSS", icon: "emergency" },
                    { label: "Thrane", href: "/catalogo?category=GMDSS", icon: "emergency" }
                ]
            },
            {
                title: "Satélite",
                image: "/images/imagens/Radar_antenna.jpg",
                items: [
                    { label: "Iridium", href: "/catalogo?category=Sat%C3%A9lite", icon: "satellite_alt" },
                    { label: "Inmarsat", href: "/catalogo?category=Sat%C3%A9lite", icon: "satellite_alt" },
                    { label: "Thuraya", href: "/catalogo?category=Sat%C3%A9lite", icon: "satellite_alt" },
                    { label: "OneWeb / Intellian", href: "/catalogo?category=Sat%C3%A9lite", icon: "satellite_alt" }
                ]
            },
            {
                title: "TV & Internas",
                image: "/images/imagens/Radar_antenna.jpg",
                items: [
                    { label: "Satélite TV (Intellian)", href: "/catalogo?category=Sat%C3%A9lite%20Televis%C3%A3o", icon: "tv" },
                    { label: "Internas (Phontech)", href: "/catalogo?category=Comunica%C3%A7%C3%B5es%20internas", icon: "phone_in_talk" }
                ]
            },
            {
                title: "4G/5G & Antenas",
                image: "/images/imagens/Radar_antenna.jpg",
                items: [
                    { label: "4G / 5G (Scout)", href: "/catalogo?category=4G%20%2F%205G%20on%20Board", icon: "cell_tower" },
                    { label: "Antenas / Acessórios", href: "/catalogo?category=Antenas%20%2F%20Acess%C3%B3rios", icon: "settings_input_antenna" }
                ]
            },
            {
                title: "Terrestres",
                image: "/images/imagens/Radar_antenna.jpg",
                items: [
                    { label: "Satélite (Iridium...)", href: "/catalogo?category=Comunica%C3%A7%C3%B5es%20Terrestres", icon: "satellite_alt" },
                    { label: "Radio (VHF/UHF/PMR)", href: "/catalogo?category=Comunica%C3%A7%C3%B5es%20Terrestres", icon: "radio" }
                ]
            }
        ]
    };

    const segurancaMegaContent = {
        sections: [
            {
                title: "Palamentas",
                image: "/images/imagens/Seguran%C3%A7a%20Mar%C3%ADtima.png",
                items: [
                    { label: "Coletes", href: "/catalogo?category=Palamentas", icon: "lifebelt" },
                    { label: "Balsas", href: "/catalogo?category=Palamentas", icon: "vessel" },
                    { label: "Pirotécnicos", href: "/catalogo?category=Palamentas", icon: "flare" },
                    { label: "Boias", href: "/catalogo?category=Palamentas", icon: "radio_button_unchecked" }
                ]
            },
            {
                title: "Conforto & Navegação",
                image: "/images/imagens/Seguran%C3%A7a%20Mar%C3%ADtima.png",
                items: [
                    { label: "Direções & Comandos", href: "/catalogo?category=Conforto", icon: "sports_steeringwheel" },
                    { label: "Binóculos", href: "/catalogo?category=Conforto", icon: "visibility" }
                ]
            },
            {
                title: "Eletricidade I",
                image: "/images/imagens/Seguran%C3%A7a%20Mar%C3%ADtima.png",
                items: [
                    { label: "Geradores", href: "/catalogo?category=Eletricidade", icon: "bolt" },
                    { label: "Carregadores de Bateria", href: "/catalogo?category=Eletricidade", icon: "battery_charging_full" }
                ]
            },
            {
                title: "Eletricidade II",
                image: "/images/imagens/Seguran%C3%A7a%20Mar%C3%ADtima.png",
                items: [
                    { label: "Inversores / Conversores", href: "/catalogo?category=Eletricidade", icon: "published_with_changes" },
                    { label: "Bancos de Energia", href: "/catalogo?category=Eletricidade", icon: "battery_full" },
                    { label: "Faróis de Navegação", href: "/catalogo?category=Eletricidade", icon: "light" }
                ]
            },
            {
                title: "Estabilização",
                image: "/images/imagens/Seguran%C3%A7a%20Mar%C3%ADtima.png",
                items: [
                    { label: "Giroestabilizadores", href: "/catalogo?category=Conforto", icon: "balance" },
                    { label: "Guinchos Elétricos", href: "/catalogo?category=Conforto", icon: "anchor" }
                ]
            },
            {
                title: "Propulsão & Água",
                image: "/images/imagens/Seguran%C3%A7a%20Mar%C3%ADtima.png",
                items: [
                    { label: "Propulsores de Proa", href: "/catalogo?category=Conforto", icon: "propane_tank" },
                    { label: "Aquecimento de Água", href: "/catalogo?category=Conforto", icon: "water_heater" }
                ]
            },
            {
                title: "Climatização",
                image: "/images/imagens/Seguran%C3%A7a%20Mar%C3%ADtima.png",
                items: [
                    { label: "A/C", href: "/catalogo?category=Conforto", icon: "ac_unit" },
                    { label: "Frigoríficos", href: "/catalogo?category=Conforto", icon: "kitchen" }
                ]
            },
            {
                title: "Tratamento",
                image: "/images/imagens/Seguran%C3%A7a%20Mar%C3%ADtima.png",
                items: [
                    { label: "Dessalinizadores", href: "/catalogo?category=Conforto", icon: "water_drop" }
                ]
            }
        ]
    };

    const atualidadesMegaContent = {
        sections: [
            {
                title: language === 'PT' ? "Mundo Namtech" : "Namtech World",
                image: "/images/imagens/Mundo%20Namtech.jpeg",
                description: language === 'PT' ? "Partilhe connosco notícias ligadas ao setor marítimo." : "Share maritime news with us.",
                items: [
                    { label: language === 'PT' ? "Eventos & Feiras" : "Events & Fairs", href: "/eventos", icon: "event" },
                    { label: language === 'PT' ? "Projetos no Terreno" : "Field Projects", href: "/projetos", icon: "architecture" },
                    { label: language === 'PT' ? "Notícias da Empresa" : "Company News", href: "/noticias", icon: "newspaper" },
                ]
            },
            {
                title: language === 'PT' ? "Meteorologia & Maré" : "Weather & Tides",
                image: "/images/imagens/Mundo%20Namtech.jpeg",
                items: [
                    { label: "Windguru (Namibe)", href: "https://www.windguru.cz/50205", icon: "air", external: true },
                    { label: "Marine Traffic", href: "https://www.marinetraffic.com", icon: "directions_boat", external: true },
                    { label: language === 'PT' ? "Previsão Meteorológica" : "Weather Forecast", href: "https://www.ipma.pt", icon: "cloud", external: true },
                    { label: language === 'PT' ? "Organismos Públicos" : "Public Organisms", href: "/links-uteis", icon: "account_balance" }
                ]
            }
        ]
    };

    const eletronicaMegaContent = {
        sections: [
            {
                title: "Radares",
                image: "/images/imagens/Radar_antenna.jpg",
                items: [
                    { label: "Antenas", href: "/catalogo?category=Radares", icon: "settings_input_antenna" },
                    { label: "Sistemas de Radar", href: "/catalogo?category=Radares", icon: "radar" },
                    { label: "Acessórios", href: "/catalogo?category=Radares", icon: "cable" }
                ]
            },
            {
                title: "Sondas",
                image: "/images/imagens/Sondas.jpg",
                items: [
                    { label: "Furuno", href: "/catalogo?category=Sondas", icon: "waves" },
                    { label: "Simrad", href: "/catalogo?category=Sondas", icon: "waves" },
                    { label: "Hondex", href: "/catalogo?category=Sondas", icon: "waves" },
                    { label: "Humminbird", href: "/catalogo?category=Sondas", icon: "waves" },
                    { label: "Notus", href: "/catalogo?category=Sondas", icon: "grid_on" },
                    { label: "Acessórios", href: "/catalogo?category=Sondas", icon: "cable" }
                ]
            },
            {
                title: "Sonares",
                image: "/images/imagens/Sonares.png",
                items: [
                    { label: "Furuno", href: "/catalogo?category=Sonares", icon: "settings_input_component" },
                    { label: "Suzuki", href: "/catalogo?category=Sonares", icon: "settings_input_component" },
                    { label: "Sonic", href: "/catalogo?category=Sonares", icon: "settings_input_component" },
                    { label: "Acessórios", href: "/catalogo?category=Sonares", icon: "cable" }
                ]
            },
            {
                title: "GPS / PLOTTER",
                image: "/images/imagens/GPS.PLOTTER.jpg",
                items: [
                    { label: "Furuno", href: "/catalogo?category=GPS%20%2F%20PLOTTER", icon: "location_on" },
                    { label: "Humminbird", href: "/catalogo?category=GPS%20%2F%20PLOTTER", icon: "location_on" },
                    { label: "Simrad", href: "/catalogo?category=GPS%20%2F%20PLOTTER", icon: "location_on" },
                    { label: "Onwa", href: "/catalogo?category=GPS%20%2F%20PLOTTER", icon: "location_on" },
                    { label: "BHC", href: "/catalogo?category=GPS%20%2F%20PLOTTER", icon: "location_on" },
                    { label: "Acessórios", href: "/catalogo?category=GPS%20%2F%20PLOTTER", icon: "cable" }
                ]
            },
            {
                title: "Cartografia",
                image: "/images/imagens/Cartografia.webp",
                items: [
                    { label: "Timezero", href: "/catalogo?category=Cartografia", icon: "map" },
                    { label: "C-Map", href: "/catalogo?category=Cartografia", icon: "map" },
                    { label: "Navionics", href: "/catalogo?category=Cartografia", icon: "map" }
                ]
            },
            {
                title: "Displays",
                image: "/images/imagens/Displays.jpg",
                items: [
                    { label: "TZT da Furuno", href: "/catalogo?category=Displays", icon: "monitor" },
                    { label: "XPLORER Humminbird", href: "/catalogo?category=Displays", icon: "monitor" },
                    { label: "NS da Simrad", href: "/catalogo?category=Displays", icon: "monitor" },
                    { label: "Neovo", href: "/catalogo?category=Displays", icon: "monitor" }
                ]
            },
            {
                title: "Sistemas AIS",
                image: "/images/imagens/Radar_antenna.jpg",
                items: [
                    { label: "em-track", href: "/catalogo?category=Sistemas%20AIS", icon: "directions_boat" },
                    { label: "Furuno", href: "/catalogo?category=Sistemas%20AIS", icon: "directions_boat" }
                ]
            },
            {
                title: "Pilotos Automáticos",
                image: "/images/imagens/Pilotos%20Autom%C3%A1ticos.webp",
                items: [
                    { label: "Furuno", href: "/catalogo?category=Pilotos%20Autom%C3%A1ticos", icon: "settings_ethernet" }
                ]
            }
        ]
    };

    const navLinks = [
        { label: "SOBRE NÓS", href: '/sobre' },
        { label: "ELETRONICA MARÍTIMA", href: '/catalogo', mega: eletronicaMegaContent },
        { label: "COMUNICAÇÕES", href: '/comunicacoes', mega: comunicacoesMegaContent },
        { label: "SEGURANÇA & ACESSÓRIOS", href: '/seguranca', mega: segurancaMegaContent },
        { label: "BARCOS", href: '/barcos' },
        { label: "SERVIÇOS", href: '/servicos', mega: servicesMegaContent },
        { label: "ATUALIDADES", href: '/atualidades', mega: atualidadesMegaContent },
        { label: "CONTATOS", href: '/contactos' },
        ...(isAdmin ? [{ label: "BackOffice", href: '/namtechprobackoffice' }] : []),
    ];

    const languages: { code: Language; label: string; flag: string }[] = [
        { code: 'PT', label: 'Português', flag: '🇵🇹' },
        { code: 'EN', label: 'English', flag: '🇺🇸' },
        { code: 'FR', label: 'Français', flag: '🇫🇷' },
    ];

    return (
        <nav
            ref={navbarRef}
            className="fixed w-full z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 transition-colors"
            onMouseLeave={() => setActiveMegaMenu(null)}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center">
                    {/* Logo Section */}
                    <Link href="/" className="flex items-center gap-4 cursor-pointer shrink-0">
                        <Image
                            src="/images/logo-horizontal.png"
                            alt="Namtech Pro"
                            width={140}
                            height={42}
                            className="h-8 md:h-10 w-auto object-contain"
                            priority
                        />
                    </Link>

                    {/* Navigation Links */}
                    <div className="hidden lg:flex flex-1 justify-center items-center space-x-3 xl:space-x-5 h-full">
                        {navLinks.map((link) => (
                            <div
                                key={link.href}
                                className="h-full flex items-center"
                                onMouseEnter={() => link.mega ? setActiveMegaMenu(link.href) : setActiveMegaMenu(null)}
                            >
                                <Link
                                    href={link.href}
                                    className={`relative group text-[9px] xl:text-[11px] font-black tracking-tight uppercase whitespace-nowrap py-2 h-full flex items-center gap-1 transition-colors ${pathname === link.href
                                        ? 'text-primary'
                                        : 'text-slate-600 hover:text-primary'
                                        }`}
                                >
                                    {link.label}
                                    {link.mega && (
                                        <span className={`material-symbols-outlined text-xs transition-transform duration-300 ${activeMegaMenu === link.href ? 'rotate-180' : ''}`}>
                                            expand_more
                                        </span>
                                    )}
                                    {pathname === link.href && (
                                        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-secondary rounded-full" />
                                    )}
                                </Link>

                                {link.mega && (
                                    <MegaMenu
                                        isOpen={activeMegaMenu === link.href}
                                        content={link.mega as any}
                                        onClose={() => setActiveMegaMenu(null)}
                                    />
                                )}
                            </div>
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
                    </div>
                </div>
            </div>
        </nav>
    );
};

