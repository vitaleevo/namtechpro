"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useClerk, useUser, SignIn } from "@clerk/nextjs";
import { useConvexAuth } from "convex/react";
import {
    LayoutDashboard,
    ShoppingBag,
    Calendar,
    Newspaper,
    LogOut,
    Menu,
    X,
    Users,
    Tag,
    Clock,
    Lock,
    AlertTriangle,
    MessageCircle
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ADMIN_EMAIL } from "@/lib/constants";

export default function BackofficeLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { signOut } = useClerk();
    const { user, isLoaded, isSignedIn } = useUser();
    const { isAuthenticated, isLoading: isConvexLoading } = useConvexAuth();

    const handleSignOut = async () => {
        await signOut();
        window.location.href = "/";
    };

    if (!isLoaded || isConvexLoading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <p className="text-slate-400 font-medium animate-pulse">A carregar sistema...</p>
            </div>
        );
    }

    if (!isSignedIn) {
        return (
            <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
                <div className="w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-100 p-10 text-center">
                    <div className="relative w-48 h-16 mx-auto mb-8">
                        <Image src="/images/logo-primary.png" alt="Namtech Pro" fill className="object-contain" priority />
                    </div>
                    <SignIn redirectUrl="/namtechprobackoffice" />
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-8 text-center">
                <div className="w-16 h-16 border-4 border-slate-200 border-t-primary rounded-full animate-spin mb-6" />
                <h2 className="text-xl font-bold text-slate-900 mb-2">A finalizar autenticação...</h2>
                <p className="text-slate-500 mb-6">A estabelecer conexão segura com a base de dados.</p>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 max-w-lg w-full text-left">
                    <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Estado da Conexão</h3>
                    <div className="space-y-2 font-mono text-xs text-slate-600">
                        <div className="flex justify-between border-b border-slate-50 pb-2">
                            <span>Clerk Auth (Login):</span>
                            <span className="text-emerald-500 font-bold">Autenticado ✅</span>
                        </div>
                        <div className="flex justify-between border-b border-slate-50 pb-2">
                            <span>Convex Auth (Dados):</span>
                            <span className="text-amber-500 font-bold">A conectar... ⏳</span>
                        </div>
                        <div className="mt-4 text-slate-400 bg-slate-50 p-3 rounded-lg">
                            <p><strong>Dica de Debug:</strong> Se esta mensagem não desaparecer, o "JWT Template" no painel do Clerk pode não estar configurado corretamente com o nome "convex", ou o ambiente de desenvolvimento não foi atualizado.</p>
                        </div>
                        <button onClick={() => window.location.reload()} className="w-full mt-4 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors">
                            Tentar Novamente
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    const userEmail = user?.primaryEmailAddress?.emailAddress;
    if (userEmail !== ADMIN_EMAIL) {
        return (
            <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-8 text-center">
                <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mb-6">
                    <AlertTriangle size={32} />
                </div>
                <h2 className="text-xl font-bold text-slate-900 mb-2">Acesso Restrito</h2>
                <p className="text-slate-500 mb-6 max-w-md">Esta área é exclusiva para administradores do sistema.</p>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 w-full max-w-md text-left text-xs mb-6">
                    <p className="mb-2"><span className="font-bold">Conta Atual:</span> {userEmail}</p>
                    <p className="text-slate-400">Verifique se está a usar a conta correta ({ADMIN_EMAIL}).</p>
                </div>

                <div className="flex gap-3 w-full max-w-md">
                    <button onClick={handleSignOut} className="flex-1 py-3 px-4 bg-white border-2 border-slate-200 text-slate-600 rounded-xl font-bold hover:border-slate-300 transition-colors">
                        Trocar Conta
                    </button>
                    <Link href="/" className="flex-1 py-3 px-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors flex items-center justify-center">
                        Voltar ao Site
                    </Link>
                </div>
            </div>
        );
    }

    const links = [
        { href: "/namtechprobackoffice", label: "Dashboard", icon: LayoutDashboard },
        { href: "/namtechprobackoffice/products", label: "Catálogo", icon: ShoppingBag },
        { href: "/namtechprobackoffice/events", label: "Eventos & Projetos", icon: Calendar },
        { href: "/namtechprobackoffice/blog", label: "Blog & Notícias", icon: Newspaper },
        { href: "/namtechprobackoffice/categories", label: "Categorias", icon: Tag },
        { href: "/namtechprobackoffice/appointments", label: "Agendamentos", icon: Clock },
        { href: "/namtechprobackoffice/leads", label: "Contactos (Leads)", icon: Users },
        { href: "/namtechprobackoffice/chat", label: "Suporte Live", icon: MessageCircle },
    ];

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row">
            {/* Mobile Header */}
            <header className="lg:hidden bg-primary p-4 flex items-center justify-between sticky top-0 z-50 shadow-lg">
                <Link href="/namtechprobackoffice" className="relative w-32 h-8">
                    <Image src="/images/logo-white.png" alt="Namtech" fill className="object-contain" />
                </Link>
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="p-2 bg-white/10 rounded-xl text-white"
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: "-100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "-100%" }}
                        className="fixed inset-0 bg-primary z-40 lg:hidden flex flex-col p-8 pt-24"
                    >
                        <nav className="space-y-4">
                            {links.map((link) => {
                                const Icon = link.icon;
                                const isActive = pathname === link.href;
                                return (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className={`flex items-center gap-4 p-4 rounded-2xl transition-all ${isActive ? 'bg-secondary text-primary font-black' : 'text-white'}`}
                                    >
                                        <Icon size={24} />
                                        <span className="text-lg font-bold">{link.label}</span>
                                    </Link>
                                );
                            })}
                        </nav>
                        <button
                            onClick={handleSignOut}
                            className="mt-auto flex items-center gap-4 p-4 text-red-300 font-bold"
                        >
                            <LogOut size={24} />
                            Sair do Sistema
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Desktop Sidebar */}
            <aside className="hidden lg:flex flex-col bg-primary text-white sticky top-0 h-screen transition-all duration-300 z-20" style={{ width: isSidebarOpen ? 280 : 80 }}>
                <div className="p-6 flex items-center justify-between border-b border-white/10">
                    <Link href="/namtechprobackoffice" className="flex items-center gap-3">
                        {isSidebarOpen ? (
                            <div className="relative w-32 h-10"><Image src="/images/logo-white.png" alt="Namtech" fill className="object-contain" /></div>
                        ) : (
                            <div className="relative w-8 h-8 mx-auto"><Image src="/images/flavico.png" alt="N" fill className="object-contain" /></div>
                        )}
                    </Link>
                    <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-white/10 rounded-xl">
                        {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
                <nav className="px-3 py-6 space-y-2">
                    {links.map((link) => {
                        const Icon = link.icon;
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive ? "bg-secondary text-primary font-bold shadow-lg" : "text-slate-300 hover:bg-white/5"}`}
                            >
                                <Icon size={20} />
                                {isSidebarOpen && <span>{link.label}</span>}
                            </Link>
                        );
                    })}
                </nav>
                <button onClick={handleSignOut} className="absolute bottom-6 left-3 right-3 flex items-center gap-3 px-4 py-3 text-red-300 hover:text-red-100">
                    <LogOut size={20} />
                    {isSidebarOpen && <span>Sair</span>}
                </button>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-4 lg:p-8 overflow-y-auto min-h-screen">
                <div className="max-w-7xl mx-auto pb-20 lg:pb-0">
                    {children}
                </div>
            </main>
        </div>
    );
}
