"use client";

import React from "react";

interface Lead {
    _id: string;
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
    _creationTime: number;
}

interface InquiriesTabProps {
    leads: Lead[] | undefined;
}

export const InquiriesTab: React.FC<InquiriesTabProps> = ({ leads }) => {
    return (
        <div className="space-y-8">
            <div className="bg-white rounded-[3rem] border border-slate-100 overflow-hidden shadow-xl shadow-slate-200/50">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50">
                            <tr>
                                <th className="px-10 py-8 text-[10px] font-black uppercase tracking-widest text-slate-400">Interessado</th>
                                <th className="px-10 py-8 text-[10px] font-black uppercase tracking-widest text-slate-400">Assunto</th>
                                <th className="px-10 py-8 text-[10px] font-black uppercase tracking-widest text-slate-400">Contactos</th>
                                <th className="px-10 py-8 text-[10px] font-black uppercase tracking-widest text-slate-400">Data</th>
                                <th className="px-10 py-8 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {leads?.map((item) => (
                                <tr key={item._id} className="group hover:bg-slate-50/50 transition-all">
                                    <td className="px-10 py-8">
                                        <div className="flex flex-col">
                                            <span className="font-black text-slate-900 tracking-tight text-lg">{item.name}</span>
                                            <span className="text-[10px] text-slate-400 uppercase font-black tracking-widest mt-1">Lead Qualificada</span>
                                        </div>
                                    </td>
                                    <td className="px-10 py-8">
                                        <span className="px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest bg-blue-600/10 text-blue-600 border border-blue-600/20">
                                            {item.subject}
                                        </span>
                                    </td>
                                    <td className="px-10 py-8">
                                        <div className="flex flex-col gap-1">
                                            <span className="text-sm font-black text-slate-600">{item.email}</span>
                                            <span className="text-xs text-slate-400 font-bold">{item.phone}</span>
                                        </div>
                                    </td>
                                    <td className="px-10 py-8">
                                        <span className="text-xs font-black text-slate-400">{new Date(item._creationTime).toLocaleDateString()}</span>
                                    </td>
                                    <td className="px-10 py-8 text-right">
                                        <button className="px-8 py-3 rounded-2xl bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-blue-500/20">
                                            Responder
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
