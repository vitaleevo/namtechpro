"use client";

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useLanguage, Language } from '@/i18n';
import { useUser, UserButton } from '@clerk/nextjs';
import { MegaMenu } from './MegaMenu';

const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL || "namtechproo@gmail.com";

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
                title: t.megaMenu.defense,
                image: "/images/imagens/Sondas.jpg",
                items: [
                    { label: t.megaMenu.defenseSystems, href: "/catalogo?category=Defesa%20e%20Seguran%C3%A7a", icon: "shield" },
                    { label: t.megaMenu.surveillance, href: "/catalogo?category=Defesa%20e%20Seguran%C3%A7a", icon: "visibility" },
                ]
            },
            {
                title: t.megaMenu.docking,
                image: "/images/imagens/Sonares.png",
                items: [
                    { label: t.megaMenu.dockingEquip, href: "/catalogo?category=Atraca%C3%A7%C3%A3o%20e%20Dolfins", icon: "anchor" },
                    { label: t.megaMenu.divingSystems, href: "/catalogo?category=Equipamentos%20de%20Mergulho", icon: "scuba_diving" },
                ]
            },
            {
                title: t.megaMenu.support,
                image: "/images/imagens/Sondas.jpg",
                items: [
                    { label: t.megaMenu.certifiedInstall, href: "/servicos", icon: "construction" },
                    { label: t.megaMenu.maintenance, href: "/servicos", icon: "build" },
                ]
            },
            {
                title: "NAMTECH SOLUTIONS",
                image: "/assets/new/equipamentos-maritimos.webp",
                items: [
                    { label: t.megaMenu.bookService, href: "/agendamento", icon: "calendar_month" },
                    { label: t.megaMenu.cleanEnergySea, href: "/servicos#energy", icon: "solar_power" },
                ]
            }
        ]
    };

    const comunicacoesMegaContent = {
        sections: [
            {
                title: t.megaMenu.vhf,
                image: "/images/imagens/Radar_antenna.jpg",
                items: [
                    { label: "Sailor", href: "/catalogo?category=Radios%20VHF", icon: "radio" },
                    { label: "Navicon", href: "/catalogo?category=Radios%20VHF", icon: "radio" },
                    { label: "Entel", href: "/catalogo?category=Radios%20VHF", icon: "radio" },
                    { label: "CPS", href: "/catalogo?category=Radios%20VHF", icon: "radio" }
                ]
            },
            {
                title: t.megaMenu.hf,
                image: "/images/imagens/Radar_antenna.jpg",
                items: [
                    { label: "Sailor", href: "/catalogo?category=R%C3%A1dios%20HF%2FSSB", icon: "radio" },
                    { label: "Entel", href: "/catalogo?category=R%C3%A1dios%20HF%2FSSB", icon: "radio" }
                ]
            },
            {
                title: t.megaMenu.pmr,
                image: "/images/imagens/Radar_antenna.jpg",
                items: [
                    { label: "Entel", href: "/catalogo?category=Radios%20PMR", icon: "radio" },
                    { label: "CPS", href: "/catalogo?category=Radios%20PMR", icon: "radio" }
                ]
            },
            {
                title: t.megaMenu.gmdss,
                image: "/images/imagens/Radar_antenna.jpg",
                items: [
                    { label: "Sailor Cobham", href: "/catalogo?category=GMDSS", icon: "emergency" },
                    { label: "Thrane", href: "/catalogo?category=GMDSS", icon: "emergency" }
                ]
            },
            {
                title: t.megaMenu.satellite,
                image: "/images/imagens/Radar_antenna.jpg",
                items: [
                    { label: "Iridium", href: "/catalogo?category=Sat%C3%A9lite", icon: "satellite_alt" },
                    { label: "Inmarsat", href: "/catalogo?category=Sat%C3%A9lite", icon: "satellite_alt" },
                    { label: "Thuraya", href: "/catalogo?category=Sat%C3%A9lite", icon: "satellite_alt" },
                    { label: "OneWeb / Intellian", href: "/catalogo?category=Sat%C3%A9lite", icon: "satellite_alt" }
                ]
            },
            {
                title: t.megaMenu.tv,
                image: "/images/imagens/Radar_antenna.jpg",
                items: [
                    { label: "Satélite TV (Intellian)", href: "/catalogo?category=Sat%C3%A9lite%20Televis%C3%A3o", icon: "tv" },
                    { label: "Internas (Phontech)", href: "/catalogo?category=Comunica%C3%A7%C3%B5es%20internas", icon: "phone_in_talk" }
                ]
            },
            {
                title: t.megaMenu.network,
                image: "/images/imagens/Radar_antenna.jpg",
                items: [
                    { label: "4G / 5G (Scout)", href: "/catalogo?category=4G%20%2F%205G%20on%20Board", icon: "cell_tower" },
                    { label: "Antenas / Acessórios", href: "/catalogo?category=Antenas%20%2F%20Acess%C3%B3rios", icon: "settings_input_antenna" }
                ]
            },
            {
                title: t.megaMenu.terrestrial,
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
                title: t.megaMenu.rescue,
                image: "/assets/new/meios-de-socorro-palamentas.jpg",
                items: [
                    { label: "Coletes", href: "/catalogo?category=Palamentas", icon: "lifebelt" },
                    { label: "Balsas", href: "/catalogo?category=Palamentas", icon: "vessel" },
                    { label: "Pirotécnicos", href: "/catalogo?category=Palamentas", icon: "flare" },
                    { label: "Boias", href: "/catalogo?category=Palamentas", icon: "radio_button_unchecked" }
                ]
            },
            {
                title: t.megaMenu.comfort,
                image: "/images/imagens/Seguran%C3%A7a%20Mar%C3%ADtima.png",
                items: [
                    { label: "Direções & Comandos", href: "/catalogo?category=Conforto", icon: "sports_steeringwheel" },
                    { label: "Binóculos", href: "/catalogo?category=Conforto", icon: "visibility" }
                ]
            },
            {
                title: t.megaMenu.electricity1,
                image: "/images/imagens/Seguran%C3%A7a%20Mar%C3%ADtima.png",
                items: [
                    { label: "Geradores", href: "/catalogo?category=Eletricidade", icon: "bolt" },
                    { label: "Carregadores de Bateria", href: "/catalogo?category=Eletricidade", icon: "battery_charging_full" }
                ]
            },
            {
                title: t.megaMenu.electricity2,
                image: "/images/imagens/Seguran%C3%A7a%20Mar%C3%ADtima.png",
                items: [
                    { label: "Inversores / Conversores", href: "/catalogo?category=Eletricidade", icon: "published_with_changes" },
                    { label: "Bancos de Energia", href: "/catalogo?category=Eletricidade", icon: "battery_full" },
                    { label: "Faróis de Navegação", href: "/catalogo?category=Eletricidade", icon: "light" }
                ]
            },
            {
                title: t.megaMenu.stabilization,
                image: "/images/imagens/Seguran%C3%A7a%20Mar%C3%ADtima.png",
                items: [
                    { label: "Giroestabilizadores", href: "/catalogo?category=Conforto", icon: "balance" },
                    { label: "Guinchos Elétricos", href: "/catalogo?category=Conforto", icon: "anchor" }
                ]
            },
            {
                title: t.megaMenu.propulsion,
                image: "/images/imagens/Seguran%C3%A7a%20Mar%C3%ADtima.png",
                items: [
                    { label: "Propulsores de Proa", href: "/catalogo?category=Conforto", icon: "propane_tank" },
                    { label: "Aquecimento de Água", href: "/catalogo?category=Conforto", icon: "water_heater" }
                ]
            },
            {
                title: t.megaMenu.climatization,
                image: "/images/imagens/Seguran%C3%A7a%20Mar%C3%ADtima.png",
                items: [
                    { label: "A/C", href: "/catalogo?category=Conforto", icon: "ac_unit" },
                    { label: "Frigoríficos", href: "/catalogo?category=Conforto", icon: "kitchen" }
                ]
            },
            {
                title: t.megaMenu.treatment,
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
                title: t.megaMenu.world,
                image: "/assets/new/servicos.jpg",
                description: language === 'PT' ? "Partilhe connosco notícias ligadas ao setor marítimo." : 
                             language === 'EN' ? "Share maritime news with us." :
                             "Partagez des nouvelles maritimes avec nous.",
                items: [
                    { label: t.megaMenu.events, href: "/eventos", icon: "event" },
                    { label: t.megaMenu.projects, href: "/projetos", icon: "architecture" },
                    { label: t.megaMenu.companyNews, href: "/noticias", icon: "newspaper" },
                ]
            },
            {
                title: t.megaMenu.weather,
                image: "/images/imagens/Mundo%20Namtech.jpeg",
                items: [
                    { label: "Windguru (Namibe)", href: "https://www.windguru.cz/50205", icon: "air", external: true },
                    { label: "Marine Traffic", href: "https://www.marinetraffic.com", icon: "directions_boat", external: true },
                    { label: t.megaMenu.weatherForecast, href: "https://www.ipma.pt", icon: "cloud", external: true },
                    { label: t.megaMenu.publicOrganisms, href: "/links-uteis", icon: "account_balance" }
                ]
            }
        ]
    };

    const eletronicaMegaContent = {
        sections: [
            {
                title: t.megaMenu.radars,
                image: "/images/imagens/Radar_antenna.jpg",
                items: [
                    { label: t.megaMenu.antennas, href: "/catalogo?category=Radares", icon: "settings_input_antenna" },
                    { label: t.megaMenu.radarSystems, href: "/catalogo?category=Radares", icon: "radar" },
                    { label: t.megaMenu.accessories, href: "/catalogo?category=Radares", icon: "cable" }
                ]
            },
            {
                title: t.megaMenu.sounders,
                image: "/images/imagens/Sondas.jpg",
                items: [
                    { label: "Furuno", href: "/catalogo?category=Sondas", icon: "waves" },
                    { label: "Simrad", href: "/catalogo?category=Sondas", icon: "waves" },
                    { label: "Hondex", href: "/catalogo?category=Sondas", icon: "waves" },
                    { label: "Humminbird", href: "/catalogo?category=Sondas", icon: "waves" },
                    { label: "Notus", href: "/catalogo?category=Sondas", icon: "grid_on" },
                    { label: t.megaMenu.accessories, href: "/catalogo?category=Sondas", icon: "cable" }
                ]
            },
            {
                title: t.megaMenu.sonars,
                image: "/images/imagens/Sonares.png",
                items: [
                    { label: "Furuno", href: "/catalogo?category=Sonares", icon: "settings_input_component" },
                    { label: "Suzuki", href: "/catalogo?category=Sonares", icon: "settings_input_component" },
                    { label: "Sonic", href: "/catalogo?category=Sonares", icon: "settings_input_component" },
                    { label: t.megaMenu.accessories, href: "/catalogo?category=Sonares", icon: "cable" }
                ]
            },
            {
                title: t.megaMenu.gpsPlotter,
                image: "/assets/new/equipamentos-maritimos.webp",
                items: [
                    { label: "Furuno", href: "/catalogo?category=GPS%20%2F%20PLOTTER", icon: "location_on" },
                    { label: "Humminbird", href: "/catalogo?category=GPS%20%2F%20PLOTTER", icon: "location_on" },
                    { label: "Simrad", href: "/catalogo?category=GPS%20%2F%20PLOTTER", icon: "location_on" },
                    { label: "Onwa", href: "/catalogo?category=GPS%20%2F%20PLOTTER", icon: "location_on" },
                    { label: "BHC", href: "/catalogo?category=GPS%20%2F%20PLOTTER", icon: "location_on" },
                    { label: t.megaMenu.accessories, href: "/catalogo?category=GPS%20%2F%20PLOTTER", icon: "cable" }
                ]
            },
            {
                title: t.megaMenu.cartography,
                image: "/assets/new/equipamentos-maritimos.webp",
                items: [
                    { label: "Timezero", href: "/catalogo?category=Cartografia", icon: "map" },
                    { label: "C-Map", href: "/catalogo?category=Cartografia", icon: "map" },
                    { label: "Navionics", href: "/catalogo?category=Cartografia", icon: "map" }
                ]
            },
            {
                title: t.megaMenu.displays,
                image: "/assets/new/equipamentos-maritimos.webp",
                items: [
                    { label: "TZT da Furuno", href: "/catalogo?category=Displays", icon: "monitor" },
                    { label: "XPLORER Humminbird", href: "/catalogo?category=Displays", icon: "monitor" },
                    { label: "NS da Simrad", href: "/catalogo?category=Displays", icon: "monitor" },
                    { label: "Neovo", href: "/catalogo?category=Displays", icon: "monitor" }
                ]
            },
            {
                title: t.megaMenu.ais,
                image: "/images/imagens/Radar_antenna.jpg",
                items: [
                    { label: "em-track", href: "/catalogo?category=Sistemas%20AIS", icon: "directions_boat" },
                    { label: "Furuno", href: "/catalogo?category=Sistemas%20AIS", icon: "directions_boat" }
                ]
            },
            {
                title: t.megaMenu.autopilots,
                image: "/assets/new/piloto-automatico.webp",
                items: [
                    { label: "Furuno", href: "/catalogo?category=Pilotos%20Autom%C3%A1ticos", icon: "settings_ethernet" }
                ]
            }
        ]
    };

    const navLinks = [
        { label: t.nav.about, href: '/sobre' },
        { label: t.nav.electronics, href: '/catalogo', mega: eletronicaMegaContent },
        { label: t.nav.communications, href: '/comunicacoes', mega: comunicacoesMegaContent },
        { label: t.nav.safety, href: '/seguranca', mega: segurancaMegaContent },
        { label: t.nav.boats, href: '/barcos' },
        { label: t.nav.services, href: '/servicos', mega: servicesMegaContent },
        { label: t.nav.news, href: '/atualidades', mega: atualidadesMegaContent },
        { label: t.nav.contacts, href: '/contactos' },
        ...(isAdmin ? [{ label: t.nav.backoffice, href: '/namtechprobackoffice' }] : []),
    ];

    const languages: { code: Language; label: string; flag: string }[] = [
        { code: 'PT', label: 'Português', flag: '🇵🇹' },
        { code: 'EN', label: 'English', flag: '🇺🇸' },
        { code: 'FR', label: 'Français', flag: '🇫🇷' },
    ];

    return (
        <nav
            ref={navbarRef}
            className="fixed w-full z-50 bg-white border-b border-slate-200 transition-colors"
            onMouseLeave={() => setActiveMegaMenu(null)}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center">
                    {/* Logo Section */}
                    <Link href="/" className="flex items-center gap-4 cursor-pointer shrink-0">
                        <Image
                            src="/images/logo.png"
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
                                    className={`relative group text-[9px] xl:text-[11px] font-bold tracking-tight uppercase whitespace-nowrap py-2 h-full flex items-center gap-1 transition-colors ${pathname === link.href
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

