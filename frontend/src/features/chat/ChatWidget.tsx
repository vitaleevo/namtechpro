"use client";

import React, { useState, useEffect, useRef } from "react";
import { useQuery, useMutation, useAction } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { motion, AnimatePresence } from "framer-motion";
import {
    MessageCircle,
    X,
    Send,
    Bot,
    User,
    Minimize2,
    ChevronRight,
    HeadphonesIcon,
    Sparkles
} from "lucide-react";
import { useLanguage } from "@/i18n";

export const ChatWidget = () => {
    const { t } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const [sessionId, setSessionId] = useState<Id<"chat_sessions"> | null>(null);
    const [inputText, setInputText] = useState("");
    const [isTyping, setIsTyping] = useState(false);

    // Mutations and Queries
    const createSession = useMutation(api.chat.createSession);
    const addMessage = useMutation(api.chat.addMessage);
    const processBotResponse = useAction(api.chat.processBotResponse);
    const messages = useQuery(api.chat.getMessages, sessionId ? { sessionId } : "skip");
    const session = useQuery(api.chat.listActiveSessions); // We'll just look for our own session if we have ID

    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Initialize session from localStorage if exists
    useEffect(() => {
        const savedId = localStorage.getItem("namtech_chat_session_id");
        if (savedId) {
            setSessionId(savedId as Id<"chat_sessions">);
        }
    }, []);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (isOpen) {
            scrollToBottom();
        }
    }, [messages, isOpen, isTyping]);

    const handleOpen = async () => {
        setIsOpen(true);
        if (!sessionId) {
            const id = await createSession({ userName: "Visitante" });
            setSessionId(id);
            localStorage.setItem("namtech_chat_session_id", id);

            // Initial welcome message from bot
            await addMessage({
                sessionId: id,
                sender: "bot",
                text: "Olá! Bem-vindo à Namtech Pro. Sou o seu assistente virtual e estou aqui para agilizar o seu atendimento. O que gostaria de fazer?",
                options: ["Ver Produtos", "Nossos Serviços", "Falar com Humano"]
            });
        }
    };

    const handleSend = async (e?: React.FormEvent, customText?: string) => {
        if (e) e.preventDefault();
        const text = customText || inputText.trim();
        if (!text || !sessionId) return;

        if (!customText) setInputText("");

        // Add user message
        await addMessage({
            sessionId,
            sender: "user",
            text
        });

        // Trigger bot response logic
        setIsTyping(true);
        // Simulate thinking time
        setTimeout(async () => {
            try {
                await processBotResponse({ sessionId, text });
            } finally {
                setIsTyping(false);
            }
        }, 1000);
    };

    return (
        <>
            {/* Floating Button */}
            <motion.button
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleOpen}
                className={`fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transition-all bg-primary text-white ${isOpen ? 'scale-0 opacity-0 pointer-events-none' : 'opacity-100'}`}
            >
                <MessageCircle size={32} />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-secondary rounded-full border-2 border-white animate-pulse" />
            </motion.button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 100, scale: 0.8, transformOrigin: 'bottom right' }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 100, scale: 0.8 }}
                        className="fixed bottom-0 right-0 sm:bottom-6 sm:right-6 z-[60] w-full sm:w-[400px] h-full sm:h-[600px] sm:max-h-[80vh] bg-white sm:rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] border border-slate-100 flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="bg-primary p-6 text-white relative flex items-center gap-4 overflow-hidden shadow-lg">
                            <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center shrink-0">
                                <HeadphonesIcon size={24} className="text-secondary" />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-black text-lg leading-none mb-1">Namtech Suporte</h3>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                    <span className="text-[10px] font-black uppercase tracking-widest opacity-80">Online agora</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-1">
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 hover:bg-white/10 rounded-xl transition-all"
                                    title="Minimizar"
                                >
                                    <Minimize2 size={20} />
                                </button>
                                <button
                                    onClick={() => {
                                        if (confirm("Deseja encerrar esta sessão de chat?")) {
                                            localStorage.removeItem("namtech_chat_session_id");
                                            setSessionId(null);
                                            setIsOpen(false);
                                        }
                                    }}
                                    className="p-2 hover:bg-red-500/20 rounded-xl transition-all text-white/70 hover:text-white"
                                    title="Fechar e Limpar"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Decorative Sparkle */}
                            <Sparkles className="absolute -right-4 -top-4 w-24 h-24 opacity-10 rotate-12" />
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar bg-slate-50/50">
                            {messages?.map((msg, idx) => {
                                const isUser = msg.sender === "user";
                                const isBot = msg.sender === "bot";
                                const isAdmin = msg.sender === "admin";

                                return (
                                    <motion.div
                                        initial={{ opacity: 0, x: isUser ? 20 : -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        key={idx}
                                        className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div className={`max-w-[85%] flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
                                            <div className={`px-5 py-3 rounded-2xl text-sm font-medium shadow-sm leading-relaxed ${isUser
                                                ? 'bg-primary text-white rounded-tr-none'
                                                : isAdmin
                                                    ? 'bg-slate-900 text-white rounded-tl-none'
                                                    : 'bg-white text-slate-700 rounded-tl-none border border-slate-100'
                                                }`}>
                                                {msg.text.split('\n').map((line, i) => (
                                                    <React.Fragment key={i}>
                                                        {line}
                                                        {i !== msg.text.split('\n').length - 1 && <br />}
                                                    </React.Fragment>
                                                ))}
                                            </div>

                                            {/* Options / Quick Replies */}
                                            {isBot && msg.options && msg.options.length > 0 && idx === messages.length - 1 && (
                                                <div className="mt-3 flex flex-wrap gap-2">
                                                    {msg.options.map((opt) => (
                                                        <button
                                                            key={opt}
                                                            onClick={() => handleSend(undefined, opt)}
                                                            className="px-4 py-2 bg-white border border-primary/20 text-primary text-xs font-bold rounded-full hover:bg-primary hover:text-white transition-all shadow-sm"
                                                        >
                                                            {opt}
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                            {!isUser && (
                                                <div className="mt-1 flex items-center gap-1.5 px-2">
                                                    {isBot ? (
                                                        <>
                                                            <Bot size={10} className="text-primary/40" />
                                                            <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Bot Namtech</span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <User size={10} className="text-secondary" />
                                                            <span className="text-[9px] font-black text-secondary uppercase tracking-widest text-[#fcb913]">Admin Namtech</span>
                                                        </>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </motion.div>
                                );
                            })}

                            {/* Typing Indicator */}
                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="bg-white px-5 py-3 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-1 border border-slate-100">
                                        <span className="w-1 h-1 bg-slate-300 rounded-full animate-bounce" />
                                        <span className="w-1 h-1 bg-slate-300 rounded-full animate-bounce delay-100" />
                                        <span className="w-1 h-1 bg-slate-300 rounded-full animate-bounce delay-200" />
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-6 bg-white border-t border-slate-100">
                            <form onSubmit={handleSend} className="relative flex items-center gap-3">
                                <input
                                    type="text"
                                    value={inputText}
                                    onChange={e => setInputText(e.target.value)}
                                    placeholder="Escreva a sua mensagem..."
                                    className="flex-1 bg-slate-100 px-6 py-4 rounded-2xl border-none text-sm font-medium focus:ring-2 focus:ring-primary outline-none transition-all pr-14"
                                />
                                <button
                                    type="submit"
                                    disabled={!inputText.trim()}
                                    className="absolute right-1.5 p-3 bg-primary text-white rounded-xl shadow-lg shadow-primary/20 hover:bg-slate-800 transition-all disabled:opacity-50"
                                >
                                    <ChevronRight size={20} />
                                </button>
                            </form>
                            <p className="text-[9px] text-center text-slate-300 mt-4 uppercase font-black tracking-widest">
                                Powered by Namtech Cloud
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
