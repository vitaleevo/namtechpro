"use client";

import { useQuery, useMutation, useConvexAuth } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import {
    Send,
    MessageCircle,
    User,
    Clock,
    CheckCheck,
    XCircle,
    Bot,
    Search,
    ChevronRight,
    AlertCircle
} from "lucide-react";
import { useState, useEffect, useRef } from "react";

export default function AdminChatPage() {
    const { isAuthenticated } = useConvexAuth();
    const sessions = useQuery(api.chat.listActiveSessions, isAuthenticated ? {} : "skip");
    const [selectedSessionId, setSelectedSessionId] = useState<Id<"chat_sessions"> | null>(null);
    const messages = useQuery(api.chat.getMessages, selectedSessionId ? { sessionId: selectedSessionId } : "skip");

    const sendMessage = useMutation(api.chat.addMessage);
    const closeSession = useMutation(api.chat.closeSession);
    const [inputText, setInputText] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputText.trim() || !selectedSessionId) return;

        await sendMessage({
            sessionId: selectedSessionId,
            sender: "admin",
            text: inputText.trim()
        });

        setInputText("");
    };

    const handleClose = async (id: Id<"chat_sessions">) => {
        if (confirm("Deseja encerrar este atendimento?")) {
            await closeSession({ sessionId: id });
            if (selectedSessionId === id) setSelectedSessionId(null);
        }
    };

    const filteredSessions = sessions?.filter(s =>
        (s.userName || "Visitante").toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.status.includes(searchTerm.toLowerCase())
    ).sort((a, b) => b.lastMessageAt - a.lastMessageAt);

    const selectedSession = sessions?.find(s => s._id === selectedSessionId);

    return (
        <div className="h-[calc(100vh-120px)] flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight">Suporte Live</h1>
                    <p className="text-slate-500 font-medium">Fale em tempo real com os visitantes do site.</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-100 flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600">Central Ativa</span>
                    </div>
                </div>
            </div>

            <div className="flex-1 flex gap-6 overflow-hidden">
                {/* Sidebar: Conversations List */}
                <div className="w-80 bg-white rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col overflow-hidden">
                    <div className="p-6 border-b border-slate-100">
                        <div className="relative">
                            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Procurar conversas..."
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border-none text-sm font-medium focus:ring-2 focus:ring-primary outline-none transition-all"
                            />
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto custom-scrollbar">
                        {filteredSessions?.map((session) => (
                            <button
                                key={session._id}
                                onClick={() => setSelectedSessionId(session._id)}
                                className={`w-full p-6 text-left border-b border-slate-50 transition-all hover:bg-slate-50 relative group ${selectedSessionId === session._id ? 'bg-primary/5' : ''}`}
                            >
                                {selectedSessionId === session._id && (
                                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary" />
                                )}
                                <div className="flex items-start justify-between mb-2">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-xs ${session.status === 'human' ? 'bg-amber-100 text-amber-600' : 'bg-slate-100 text-slate-400'}`}>
                                            {session.userName ? session.userName.charAt(0) : <User size={16} />}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-900 text-sm">{session.userName || "Visitante"}</h4>
                                            <p className="text-[10px] text-slate-400 font-medium">
                                                {new Date(session.lastMessageAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </p>
                                        </div>
                                    </div>
                                    {session.status === 'human' && (
                                        <div className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
                                    )}
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md ${session.status === 'human' ? 'bg-amber-50 text-amber-600' : 'bg-blue-50 text-blue-600'
                                        }`}>
                                        {session.status === 'human' ? 'Urgente: Humano' : 'Bot Ativo'}
                                    </span>
                                </div>
                            </button>
                        ))}
                        {(!filteredSessions || filteredSessions.length === 0) && (
                            <div className="p-10 text-center opacity-40">
                                <MessageCircle size={40} className="mx-auto mb-4" />
                                <p className="text-xs font-black uppercase tracking-widest">Sem chats ativos</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Main: Chat View */}
                <div className="flex-1 bg-white rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col overflow-hidden relative">
                    {selectedSessionId ? (
                        <>
                            {/* Chat Header */}
                            <div className="p-8 border-b border-slate-100 bg-slate-50/20 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white shadow-lg shadow-primary/20 font-black">
                                        {selectedSession?.userName?.charAt(0) || <User size={20} />}
                                    </div>
                                    <div>
                                        <h3 className="font-black text-slate-900 leading-none mb-1">{selectedSession?.userName || "Visitante Anónimo"}</h3>
                                        <div className="flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Sessão Ativa</span>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleClose(selectedSessionId)}
                                    className="flex items-center gap-2 px-4 py-2 text-red-500 hover:bg-red-50 rounded-xl transition-all text-xs font-black uppercase tracking-widest"
                                >
                                    <XCircle size={16} />
                                    Encerrar
                                </button>
                            </div>

                            {/* Messages Container */}
                            <div className="flex-1 overflow-y-auto p-10 space-y-6 custom-scrollbar bg-slate-50/10">
                                {messages?.map((msg, idx) => {
                                    const isAdmin = msg.sender === "admin";
                                    const isBot = msg.sender === "bot";

                                    return (
                                        <div
                                            key={msg._id}
                                            className={`flex ${isAdmin ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}
                                        >
                                            <div className={`max-w-[70%] flex flex-col ${isAdmin ? 'items-end' : 'items-start'}`}>
                                                <div className={`px-6 py-4 rounded-[1.8rem] text-sm font-medium shadow-sm leading-relaxed ${isAdmin
                                                        ? 'bg-slate-900 text-white rounded-tr-none'
                                                        : isBot
                                                            ? 'bg-primary/10 text-primary rounded-tl-none border border-primary/10'
                                                            : 'bg-white text-slate-700 rounded-tl-none border border-slate-100'
                                                    }`}>
                                                    {isBot && <div className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest mb-1 opacity-60"><Bot size={10} /> Auto-Resposta</div>}
                                                    {msg.text}
                                                </div>
                                                <div className="mt-2 flex items-center gap-2 px-2">
                                                    <span className="text-[9px] font-bold text-slate-300 uppercase">
                                                        {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                    </span>
                                                    {isAdmin && <CheckCheck size={12} className="text-emerald-500" />}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Input Area */}
                            <div className="p-8 bg-white border-t border-slate-100">
                                <form onSubmit={handleSend} className="relative flex items-center gap-4">
                                    <input
                                        type="text"
                                        value={inputText}
                                        onChange={e => setInputText(e.target.value)}
                                        placeholder="Escreva a sua mensagem para o cliente..."
                                        className="flex-1 bg-slate-50 px-8 py-5 rounded-[2rem] border-none text-sm font-medium focus:ring-2 focus:ring-primary outline-none transition-all pr-20"
                                    />
                                    <button
                                        type="submit"
                                        disabled={!inputText.trim()}
                                        className="absolute right-2 p-4 bg-primary text-white rounded-[1.5rem] shadow-xl shadow-primary/20 hover:bg-slate-800 transition-all active:scale-95 disabled:opacity-50 disabled:active:scale-100"
                                    >
                                        <Send size={20} />
                                    </button>
                                </form>
                                <p className="text-[10px] text-center text-slate-400 mt-4 uppercase font-black tracking-widest">
                                    O cliente receberá esta mensagem instantaneamente no site.
                                </p>
                            </div>
                        </>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center text-center p-20 opacity-30">
                            <div className="w-32 h-32 bg-slate-50 rounded-[3rem] flex items-center justify-center mb-10 shadow-inner">
                                <MessageCircle size={64} className="text-slate-200" />
                            </div>
                            <h3 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">Centro de Suporte</h3>
                            <p className="max-w-sm text-slate-500 font-medium">
                                Selecione uma conversa na barra lateral para começar a responder aos seus clientes.
                            </p>
                        </div>
                    )}

                    {/* Notification Overlay for Human Requests */}
                    {!selectedSessionId && sessions?.some(s => s.status === 'human') && (
                        <div className="absolute top-10 left-1/2 -translate-x-1/2 z-10 animate-bounce">
                            <div className="bg-amber-500 text-white px-8 py-4 rounded-full shadow-2xl flex items-center gap-3">
                                <AlertCircle size={20} />
                                <span className="font-black uppercase tracking-widest text-xs">Tens clientes a aguardar resposta!</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
