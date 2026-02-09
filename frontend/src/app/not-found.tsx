"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Home, Anchor } from "lucide-react";
import { Navbar } from "@/features/navigation/Navbar";
import { Footer } from "@/features/navigation/Footer";

export default function NotFound() {
    return (
        <main className="min-h-screen bg-slate-50 flex flex-col">
            <Navbar />
            <div className="flex-1 flex items-center justify-center px-4 pt-20">
                <div className="max-w-2xl w-full text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="mb-8 relative inline-block"
                    >
                        <div className="absolute inset-0 bg-secondary/20 blur-3xl rounded-full scale-150 animate-pulse"></div>
                        <Anchor size={120} className="text-primary relative z-10 mx-auto" strokeWidth={1.5} />
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-7xl md:text-9xl font-black text-primary mb-6 tracking-tighter"
                    >
                        404
                    </motion.h1>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-2xl md:text-4xl font-bold text-slate-900 mb-6"
                    >
                        Rota não encontrada
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-slate-500 text-lg mb-12 max-w-md mx-auto"
                    >
                        Parece que a sua embarcação saiu do curso. A página que procura não existe ou foi movida.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <button
                            onClick={() => window.history.back()}
                            className="w-full sm:w-auto px-8 py-4 bg-white text-primary border-2 border-slate-200 rounded-2xl font-bold flex items-center justify-center gap-2 hover:border-primary transition-all"
                        >
                            <ArrowLeft size={20} />
                            Voltar
                        </button>
                        <Link
                            href="/"
                            className="w-full sm:w-auto px-8 py-4 bg-primary text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 shadow-xl shadow-primary/20 transition-all"
                        >
                            <Home size={20} />
                            Página Inicial
                        </Link>
                    </motion.div>
                </div>
            </div>
            <Footer />
        </main>
    );
}
