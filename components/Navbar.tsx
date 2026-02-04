
import React, { useState, useRef, useEffect } from 'react';
import { Page } from '../types';

interface NavbarProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  currentLanguage: string;
  setLanguage: (lang: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ 
  currentPage, 
  setCurrentPage, 
  isDarkMode, 
  toggleDarkMode,
  currentLanguage,
  setLanguage
}) => {
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const langMenuRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: 'PT', label: 'Português', flag: '🇵🇹' },
    { code: 'EN', label: 'English', flag: '🇺🇸' },
    { code: 'FR', label: 'Français', flag: '🇫🇷' },
  ];

  const navLinks = [
    { label: 'Início', page: Page.Home },
    { label: 'Sobre Nós', page: Page.About },
    { label: 'Catálogo', page: Page.Catalog },
    { label: 'Energia Limpa', page: Page.CleanEnergy },
    { label: 'Capital Humano', page: Page.HumanResources },
    { label: 'Contacto', page: Page.Contact },
    { label: 'Admin', page: Page.Backoffice },
  ];

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

  return (
    <nav className="fixed w-full z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo Section */}
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => setCurrentPage(Page.Home)}>
            <div className="flex items-center gap-3">
              <img 
                src="logo.png" 
                alt="Namtech Pro" 
                className="h-10 md:h-12 w-auto object-contain dark:brightness-110"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement!.innerHTML += '<span class="text-xl font-bold tracking-tight dark:text-white">NAMTECH <span class="text-primary dark:text-secondary">PRO</span></span>';
                }}
              />
            </div>
            <div className="hidden lg:flex flex-col border-l border-slate-200 dark:border-slate-700 pl-4">
              <span className="text-[10px] font-bold uppercase tracking-widest text-secondary">Sede Regional</span>
              <span className="text-xs font-semibold text-primary dark:text-slate-300">Namibe, Angola</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.page}
                onClick={() => setCurrentPage(link.page)}
                className={`text-xs lg:text-sm font-semibold transition-all whitespace-nowrap ${
                  currentPage === link.page
                    ? 'text-primary dark:text-secondary border-b-2 border-secondary pb-1'
                    : 'text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-white'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Actions Section */}
          <div className="flex items-center gap-2 lg:gap-4">
            {/* Language Selector */}
            <div className="relative" ref={langMenuRef}>
              <button
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-all border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
              >
                <span className="material-symbols-outlined text-lg">language</span>
                <span className="text-[10px] font-black uppercase tracking-widest">{currentLanguage}</span>
                <span className={`material-symbols-outlined text-xs transition-transform duration-300 ${isLangMenuOpen ? 'rotate-180' : ''}`}>expand_more</span>
              </button>

              {/* Language Dropdown Menu */}
              {isLangMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden animate-in fade-in zoom-in duration-200 z-[60]">
                  <div className="p-2 space-y-1">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code);
                          setIsLangMenuOpen(false);
                        }}
                        className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${
                          currentLanguage === lang.code 
                            ? 'bg-primary text-white' 
                            : 'hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-lg leading-none">{lang.flag}</span>
                          <span className="text-xs font-bold">{lang.label}</span>
                        </div>
                        {currentLanguage === lang.code && (
                          <span className="material-symbols-outlined text-xs text-secondary">check_circle</span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors"
            >
              <span className="material-symbols-outlined text-xl">
                {isDarkMode ? 'light_mode' : 'dark_mode'}
              </span>
            </button>

            <button 
              onClick={() => setCurrentPage(Page.Contact)}
              className="hidden xl:flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg text-xs font-semibold hover:bg-primary-dark transition-all"
            >
              <span className="material-symbols-outlined text-sm">support_agent</span>
              Suporte
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
