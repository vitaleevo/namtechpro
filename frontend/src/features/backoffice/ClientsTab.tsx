"use client";

import React from "react";

interface Lead {
    _id: string;
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
}

interface ClientsTabProps {
    leads: Lead[] | undefined;
}

export const ClientsTab: React.FC<ClientsTabProps> = ({ leads }) => {
    // Deduplicate leads by email to show unique clients
    const uniqueClients = Array.from(
        new Set(leads?.map((l) => l.email))
    ).map((email) => leads?.find((l) => l.email === email));

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {uniqueClients?.map((client, i) =>
                client ? (
                    <div
                        key={i}
                        className="bg-white p-10 rounded-[3rem] border border-slate-100 relative overflow-hidden flex flex-col items-center text-center"
                    >
                        <div className="w-24 h-24 bg-blue-600/10 text-blue-600 rounded-[2rem] flex items-center justify-center font-black text-3xl mb-8">
                            {client.name.charAt(0)}
                        </div>
                        <h4 className="text-2xl font-black text-slate-900 mb-2 tracking-tight">{client.name}</h4>
                        <p className="text-sm text-slate-400 font-medium mb-8 uppercase tracking-widest">{client.email}</p>
                        <div className="w-full flex gap-3">
                            <button className="flex-1 py-4 bg-slate-50 rounded-2xl font-black text-[10px] uppercase tracking-widest text-slate-500 hover:bg-blue-600 hover:text-white transition-all">
                                Perfil
                            </button>
                            <button className="flex-1 py-4 bg-slate-50 rounded-2xl font-black text-[10px] uppercase tracking-widest text-slate-500 hover:bg-blue-600 hover:text-white transition-all">
                                Histórico
                            </button>
                        </div>
                    </div>
                ) : null
            )}
        </div>
    );
};
