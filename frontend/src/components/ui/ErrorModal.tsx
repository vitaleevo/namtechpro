"use client";

import { motion, AnimatePresence } from "framer-motion";
import { XCircle, X } from "lucide-react";

interface ErrorModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    message?: string;
}

export default function ErrorModal({
    isOpen,
    onClose,
    title = "Ocorreu um Erro",
    message = "Algo correu mal. Por favor, tente novamente.",
}: ErrorModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: "spring", duration: 0.5 }}
                        className="relative w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl overflow-hidden"
                    >
                        {/* Header / Icon Area */}
                        <div className="relative bg-red-50 p-8 flex flex-col items-center justify-center text-center border-b border-red-100/50">
                            <button
                                onClick={onClose}
                                className="absolute top-6 right-6 p-2 rounded-full hover:bg-red-100/50 text-red-300 hover:text-red-500 transition-colors"
                            >
                                <X size={20} />
                            </button>

                            <div className="w-20 h-20 bg-white rounded-3xl shadow-lg shadow-red-500/10 flex items-center justify-center mb-6 transform -rotate-3">
                                <XCircle size={32} className="text-red-500" />
                            </div>

                            <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-2">
                                {title}
                            </h3>

                            <p className="text-slate-500 font-medium text-sm max-w-[80%] mx-auto leading-relaxed">
                                {message}
                            </p>
                        </div>

                        {/* Actions */}
                        <div className="p-6 bg-white">
                            <button
                                onClick={onClose}
                                className="w-full py-4 px-6 rounded-2xl font-bold text-white bg-red-500 hover:bg-red-600 shadow-xl shadow-red-500/20 active:scale-95 transition-all uppercase text-[10px] tracking-widest"
                            >
                                Entendido
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
