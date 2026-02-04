
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Catalog from './pages/Catalog';
import Backoffice from './pages/Backoffice';
import CleanEnergy from './pages/CleanEnergy';
import HumanResources from './pages/HumanResources';
import Contact from './pages/Contact';
import Support247 from './pages/Support247';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import TechnicalAssistant from './components/TechnicalAssistant';
import { Page } from './types';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.Home);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('PT');

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const renderPage = () => {
    window.scrollTo(0, 0);
    switch (currentPage) {
      case Page.Home: return <Home onNavigate={setCurrentPage} />;
      case Page.About: return <About onNavigate={setCurrentPage} />;
      case Page.Catalog: return <Catalog onNavigate={setCurrentPage} />;
      case Page.Backoffice: return <Backoffice />;
      case Page.CleanEnergy: return <CleanEnergy />;
      case Page.HumanResources: return <HumanResources />;
      case Page.Contact: return <Contact />;
      case Page.Support247: return <Support247 onNavigate={setCurrentPage} />;
      case Page.Terms: return <Terms />;
      case Page.Privacy: return <Privacy />;
      default: return <Home onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300">
      <Navbar 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
        isDarkMode={isDarkMode} 
        toggleDarkMode={toggleDarkMode}
        currentLanguage={currentLanguage}
        setLanguage={setCurrentLanguage}
      />
      
      <main className="animate-in fade-in duration-500">
        {renderPage()}
      </main>

      <footer className="bg-primary pt-20 pb-10 text-white mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <img 
                  src="logo.png" 
                  alt="Namtech Pro" 
                  className="h-12 w-auto brightness-0 invert" 
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                Especialistas em integração de sistemas de navegação, rádio e energia industrial em Angola. Líderes no suporte técnico marítimo no Namibe.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-bold uppercase tracking-widest text-secondary mb-6">Empresa</h4>
              <ul className="space-y-4 text-slate-400 text-sm">
                <li><button onClick={() => setCurrentPage(Page.About)} className="hover:text-white transition-colors">Sobre Nós</button></li>
                <li><button onClick={() => setCurrentPage(Page.HumanResources)} className="hover:text-white transition-colors">Carreiras</button></li>
                <li><button onClick={() => setCurrentPage(Page.Contact)} className="hover:text-white transition-colors">Contactos</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-bold uppercase tracking-widest text-secondary mb-6">Soluções</h4>
              <ul className="space-y-4 text-slate-400 text-sm">
                <li><button onClick={() => setCurrentPage(Page.Catalog)} className="hover:text-white transition-colors">Equipamentos</button></li>
                <li><button onClick={() => setCurrentPage(Page.CleanEnergy)} className="hover:text-white transition-colors">Energia Limpa</button></li>
                <li><button onClick={() => setCurrentPage(Page.Support247)} className="hover:text-white transition-colors">Assistência 24/7</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-bold uppercase tracking-widest text-secondary mb-6">Contacto</h4>
              <p className="text-slate-400 text-sm mb-2">Zona Industrial, Namibe, Angola</p>
              <p className="text-slate-400 text-sm mb-6">+244 9XX XXX XXX</p>
              <div className="flex gap-4">
                <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-secondary hover:text-primary transition-all">
                  <span className="material-symbols-outlined text-sm">public</span>
                </button>
                <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-secondary hover:text-primary transition-all">
                  <span className="material-symbols-outlined text-sm">share</span>
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-slate-500">© 2024 Namtech Pro. Excelência Tecnológica em Moçâmedes.</p>
            <div className="flex gap-6 text-xs text-slate-500">
              <button onClick={() => setCurrentPage(Page.Terms)} className="hover:text-slate-300">Termos de Serviço</button>
              <button onClick={() => setCurrentPage(Page.Privacy)} className="hover:text-slate-300">Privacidade</button>
            </div>
          </div>
        </div>
      </footer>

      <TechnicalAssistant />
    </div>
  );
};

export default App;
