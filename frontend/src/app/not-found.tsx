"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Home, Anchor } from "lucide-react";
import { Navbar } from "@/features/navigation/Navbar";
import { Footer } from "@/features/navigation/Footer";

export default function NotFound() {
    return (
        <main className="min-h-screen bg-white flex flex-col relative overflow-hidden">
            <Navbar />
            
            {/* Background Decorative Elements - No Blur */}
            <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-slate-50 rounded-bl-full z-0"></div>
            <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-slate-50 rounded-tr-full z-0"></div>

            <div className="flex-1 flex items-center justify-center relative z-10 px-4 pt-20">
                <div className="max-w-2xl w-full text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="mb-8 relative inline-block"
                    >
                        <Anchor size={120} className="text-primary relative z-10 mx-auto" strokeWidth={1.5} />
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-7xl md:text-9xl font-black text-slate-100 mb-6 tracking-tighter select-none"
                    >
                        404
                    </motion.h1>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-2xl md:text-4xl font-bold text-primary mb-6"
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
                            className="w-full sm:w-auto px-10 py-5 bg-slate-100 text-slate-600 border border-slate-200 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-slate-200 transition-all"
                        >
                            <ArrowLeft size={20} />
                            Voltar
                        </button>
                        <Link
                            href="/"
                            className="w-full sm:w-auto px-10 py-5 bg-primary text-white rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-slate-800 shadow-xl shadow-primary/20 transition-all"
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
