"use client";

import { useQuery, useConvexAuth } from "convex/react";
import { api } from "@/convex/_generated/api";
import {
    ShoppingBag,
    Users,
    Calendar,
    Newspaper,
    ArrowUpRight,
    Clock,
    TrendingUp,
    Activity,
    ChevronRight,
    Search
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function DashboardPage() {
    const { isAuthenticated } = useConvexAuth();

    // Only fetch data if authenticated to avoid "Not authenticated" errors
    const stats = useQuery(api.products.getStats, isAuthenticated ? {} : "skip");
    const events = useQuery(api.events.list); // Public or protected? Let's assume public for now or handle similarly
    const posts = useQuery(api.blog.list);
    const appointments = useQuery(api.appointments.listAppointments, isAuthenticated ? {} : "skip");

    const dashboardStats = [
        {
            label: "Produtos em Stock",
            value: stats?.totalProducts || 0,
            icon: ShoppingBag,
            color: "text-blue-600",
            bg: "bg-blue-50",
            href: "/namtechprobackoffice/products",
            description: "Gestão de inventário e catálogo"
        },
        {
            label: "Eventos & Projetos",
            value: stats?.totalEvents || 0,
            icon: Calendar,
            color: "text-purple-600",
            bg: "bg-purple-50",
            href: "/namtechprobackoffice/events",
            description: "Agenda e portfólio de ações"
        },
        {
            label: "Agendamentos",
            value: stats?.totalAppointments || 0,
            icon: Clock,
            color: "text-rose-600",
            bg: "bg-rose-50",
            href: "/namtechprobackoffice/appointments",
            description: "Pedidos de reunião e serviço"
        },
        {
            label: "Leads Totais",
            value: stats?.totalLeads || 0,
            icon: Users,
            color: "text-emerald-600",
            bg: "bg-emerald-50",
            href: "/namtechprobackoffice/leads",
            description: "Contactos e prospecção"
        },
    ];

    return (
        <div className="space-y-12 pb-20">
            {/* Header section with welcome message */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-2">
                <div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-2">Painel de Controlo</h1>
                    <p className="text-slate-500 font-medium text-base sm:text-lg">Bem-vindo à Namtech Cloud. Aqui está o resumo da sua operação.</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="hidden sm:flex bg-white px-6 py-3 rounded-2xl border-2 border-slate-100 items-center gap-3 shadow-sm">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-xs font-black uppercase tracking-widest text-slate-600">Sistema Online</span>
                    </div>
                </div>
            </div>

            {/* Main Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {dashboardStats.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <Link
                            key={stat.label}
                            href={stat.href}
                            className="bg-white p-6 sm:p-8 rounded-[2rem] sm:rounded-[2.5rem] shadow-sm border border-slate-100 hover:border-primary group transition-all duration-300 relative overflow-hidden active:scale-[0.98]"
                        >
                            <div className="relative z-10">
                                <div className="flex items-center justify-between mb-8">
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${stat.bg} shadow-inner`}>
                                        <Icon size={28} className={stat.color} />
                                    </div>
                                    <div className="p-2 bg-slate-50 rounded-xl text-slate-300 group-hover:text-primary group-hover:bg-primary/5 transition-all">
                                        <ArrowUpRight size={20} />
                                    </div>
                                </div>
                                <h3 className="text-4xl font-black text-slate-900 mb-1 tracking-tight">{stat.value}</h3>
                                <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">{stat.label}</p>
                                <p className="text-xs text-slate-400 font-medium leading-relaxed">{stat.description}</p>
                            </div>

                            {/* Decorative background element */}
                            <div className="absolute -right-4 -bottom-4 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-300">
                                <Icon size={120} />
                            </div>
                        </Link>
                    )
                })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-8 flex flex-col gap-8">
                    {/* Recent Appointments/Agendamentos Section */}
                    <section className="bg-white rounded-[2rem] sm:rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
                        <div className="p-6 sm:p-10 border-b border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-50/20">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-white rounded-2xl shadow-sm border border-slate-100 text-rose-500 shrink-0">
                                    <Clock size={24} />
                                </div>
                                <div className="min-w-0">
                                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight truncate">Próximos Agendamentos</h2>
                                    <p className="text-slate-400 text-xs sm:text-sm font-medium">Reuniões e serviços solicitados</p>
                                </div>
                            </div>
                            <Link
                                href="/namtechprobackoffice/appointments"
                                className="w-full sm:w-auto px-6 py-3 bg-white border-2 border-slate-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-600 hover:border-primary hover:text-primary transition-all flex items-center justify-center gap-2"
                            >
                                Ver Agenda <ChevronRight size={16} />
                            </Link>
                        </div>
                        <div className="p-6">
                            <div className="space-y-4">
                                {appointments?.slice(0, 5).map((app) => (
                                    <div key={app._id} className="flex items-center justify-between p-4 sm:p-5 hover:bg-slate-50 rounded-2xl sm:rounded-3xl transition-all group">
                                        <div className="flex items-center gap-3 sm:gap-5 min-w-0">
                                            <div className="w-10 h-10 sm:w-14 sm:h-14 bg-slate-100 rounded-xl sm:rounded-2xl flex items-center justify-center font-black text-slate-400 group-hover:bg-primary group-hover:text-white transition-all shadow-inner shrink-0">
                                                {app.customerName.charAt(0)}
                                            </div>
                                            <div className="min-w-0">
                                                <h4 className="font-black text-slate-900 text-base sm:text-lg group-hover:text-primary transition-colors truncate">{app.customerName}</h4>
                                                <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-slate-400">
                                                    <span className="font-bold flex items-center gap-1.5 whitespace-nowrap"><Calendar size={12} className="sm:w-3.5 sm:h-3.5" /> {new Date(app.date).toLocaleDateString()}</span>
                                                    <span className="hidden sm:inline">•</span>
                                                    <span className="font-bold flex items-center gap-1.5"><Clock size={12} className="sm:w-3.5 sm:h-3.5" /> {app.time}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="inline-flex">
                                            <span className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-widest ${app.status === 'confirmed' ? 'bg-emerald-50 text-emerald-600' :
                                                app.status === 'pending' ? 'bg-amber-50 text-amber-600' :
                                                    'bg-slate-50 text-slate-400'
                                                }`}>
                                                {app.status}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                                {(!appointments || appointments.length === 0) && (
                                    <div className="text-center py-20 bg-slate-50/50 rounded-[2rem] border-2 border-dashed border-slate-100">
                                        <Clock size={48} className="mx-auto text-slate-200 mb-4" />
                                        <p className="text-slate-400 font-black uppercase text-xs tracking-widest">Sem agendamentos pendentes</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>
                </div>

                <div className="lg:col-span-4 flex flex-col gap-8">
                    {/* Activity Feed / Stats Summary */}
                    <div className="bg-slate-900 rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-10 text-white shadow-2xl shadow-slate-900/20 relative overflow-hidden">
                        <div className="relative z-10">
                            <h2 className="text-lg sm:text-xl font-black uppercase tracking-[0.2em] text-primary mb-6 sm:mb-10">Insights</h2>

                            <div className="space-y-8">
                                <div className="space-y-2">
                                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Distribuição de Conteúdo</p>
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-sm font-bold">Blog / Notícias</span>
                                        <span className="text-sm font-black text-primary">{posts?.length || 0}</span>
                                    </div>
                                    <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-primary transition-all duration-1000"
                                            style={{ width: `${Math.min((posts?.length || 0) * 10, 100)}%` }}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-sm font-bold">Catálogo Solar & Naval</span>
                                        <span className="text-sm font-black text-blue-400">{stats?.totalProducts || 0}</span>
                                    </div>
                                    <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-blue-400 transition-all duration-1000"
                                            style={{ width: `${Math.min((stats?.totalProducts || 0) * 5, 100)}%` }}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-14 p-6 bg-white/5 border border-white/10 rounded-3xl flex items-center gap-5">
                                <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-slate-900 shadow-xl shadow-primary/20">
                                    <TrendingUp size={24} />
                                </div>
                                <div>
                                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Performance</p>
                                    <p className="font-bold text-sm">O sistema está a processar {stats?.totalLeads || 0} leads ativos.</p>
                                </div>
                            </div>
                        </div>

                        {/* Background flare */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] rounded-full -mr-32 -mt-32" />
                    </div>

                    {/* Quick Access/Search Links */}
                    <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 p-8">
                        <h3 className="text-lg font-black text-slate-900 mb-6 px-2">Acesso Rápido</h3>
                        <div className="grid grid-cols-2 gap-3">
                            <Link href="/namtechprobackoffice/categories" className="p-4 bg-slate-50 hover:bg-primary hover:text-white rounded-2xl text-xs font-black uppercase tracking-widest text-center transition-all">
                                Categorias
                            </Link>
                            <Link href="/namtechprobackoffice/products" className="p-4 bg-slate-50 hover:bg-primary hover:text-white rounded-2xl text-xs font-black uppercase tracking-widest text-center transition-all">
                                Stock
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
