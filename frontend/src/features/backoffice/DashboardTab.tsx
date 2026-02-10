"use client";

import React from "react";
import { motion } from "framer-motion";
import {
    MessageSquare,
    ShoppingBag,
    BarChart3,
    Monitor,
    ArrowUpRight,
    ArrowDownRight,
    Zap,
    CheckCircle2,
} from "lucide-react";

interface CategoryCount {
    name: string;
    count: number;
}

interface Stats {
    totalProducts: number;
    totalLeads: number;
    totalAppointments: number;
    totalEvents: number;
    categoryCounts: CategoryCount[];
}

interface DashboardTabProps {
    stats: Stats | undefined;
}

export const DashboardTab: React.FC<DashboardTabProps> = ({ stats }) => {
    const cards = [
        { label: "Inquéritos", val: stats?.totalLeads || 0, trend: "+12%", up: true, icon: MessageSquare, color: "blue" },
        { label: "Equipamentos", val: stats?.totalProducts || 0, trend: "+3", up: true, icon: ShoppingBag, color: "emerald" },
        { label: "Taxa Conversão", val: "24%", trend: "-2%", up: false, icon: BarChart3, color: "amber" },
        { label: "Sistema", val: "Online", trend: "100%", up: true, icon: Monitor, color: "indigo" },
    ];

    return (
        <div className="space-y-12">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {cards.map((s, i) => (
                    <div key={i} className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/50 transition-all hover:scale-[1.02]">
                        <div className="flex justify-between items-start mb-8">
                            <div className={`w-14 h-14 bg-${s.color}-500/10 text-${s.color}-500 rounded-2xl flex items-center justify-center`}>
                                <s.icon size={28} />
                            </div>
                            <div className={`flex items-center gap-1 text-xs font-black ${s.up ? "text-emerald-500" : "text-red-500"}`}>
                                {s.trend}
                                {s.up ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                            </div>
                        </div>
                        <p className="text-5xl font-black text-slate-900 mb-2 tracking-tighter">{s.val}</p>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{s.label}</p>
                    </div>
                ))}
            </div>

            {/* Inventory + System Status */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white p-12 rounded-[4rem] border border-slate-100">
                    <div className="flex justify-between items-center mb-12">
                        <h3 className="text-2xl font-black tracking-tight">Distribuição de Inventário</h3>
                        <button className="text-blue-600 font-black text-xs uppercase tracking-widest flex items-center gap-2">
                            Ver Tudo <ArrowUpRight size={16} />
                        </button>
                    </div>
                    <div className="space-y-8">
                        {stats?.categoryCounts.map((cat, i) => (
                            <div key={i} className="space-y-3">
                                <div className="flex justify-between text-sm font-black uppercase tracking-widest text-slate-500">
                                    <span>{cat.name}</span>
                                    <span>{cat.count} Unidades</span>
                                </div>
                                <div className="h-4 bg-slate-100 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${(cat.count / (stats.totalProducts || 1)) * 100}%` }}
                                        transition={{ duration: 1, delay: i * 0.1 }}
                                        className="h-full bg-blue-600 rounded-full shadow-lg shadow-blue-500/30"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-slate-900 p-12 rounded-[4rem] text-white flex flex-col justify-between relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full -mr-32 -mt-32 blur-3xl" />
                    <div>
                        <Zap size={48} className="text-blue-500 mb-8" />
                        <h3 className="text-3xl font-black mb-6 leading-tight">Estado Operacional Luanda/Namibe</h3>
                        <p className="text-slate-400 font-medium mb-12">
                            Todos os sistemas de monitorização satélite estão operacionais. Nenhuma falha crítica reportada nas últimas 24h.
                        </p>
                    </div>
                    <button className="w-full py-5 bg-white text-slate-900 rounded-2xl font-black text-sm hover:scale-105 transition-all flex items-center justify-center gap-3">
                        <CheckCircle2 size={20} className="text-emerald-500" />
                        Relatório de Sistema
                    </button>
                </div>
            </div>
        </div>
    );
};
