"use client";

import React, { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Calendar, Camera, Video, X, ChevronLeft, ChevronRight } from 'lucide-react';

export type EventGallery = {
    id: string;
    title: string;
    date: string;
    location: string;
    images: string[];
    videos: string[];
};

export const FeaturedEvents = ({ events }: { events: EventGallery[] }) => {
    const [selectedMedia, setSelectedMedia] = useState<{ 
        eventId: string; 
        index: number; 
        type: 'image' | 'video' 
    } | null>(null);

    const handleNext = useCallback((e?: React.MouseEvent | KeyboardEvent) => {
        e?.stopPropagation();
        if (!selectedMedia) return;
        
        const event = events.find(ev => ev.id === selectedMedia.eventId);
        if (!event) return;

        const totalMedia = event.images.length + event.videos.length;
        const nextIndex = (selectedMedia.index + 1) % totalMedia;
        
        const type = nextIndex < event.videos.length ? 'video' : 'image';
        setSelectedMedia({ ...selectedMedia, index: nextIndex, type });
    }, [selectedMedia, events]);

    const handlePrev = useCallback((e?: React.MouseEvent | KeyboardEvent) => {
        e?.stopPropagation();
        if (!selectedMedia) return;
        
        const event = events.find(ev => ev.id === selectedMedia.eventId);
        if (!event) return;

        const totalMedia = event.images.length + event.videos.length;
        const prevIndex = (selectedMedia.index - 1 + totalMedia) % totalMedia;
        
        const type = prevIndex < event.videos.length ? 'video' : 'image';
        setSelectedMedia({ ...selectedMedia, index: prevIndex, type });
    }, [selectedMedia, events]);

    // Keyboard Navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!selectedMedia) return;
            
            if (e.key === 'ArrowRight') handleNext(e);
            if (e.key === 'ArrowLeft') handlePrev(e);
            if (e.key === 'Escape') setSelectedMedia(null);
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedMedia, handleNext, handlePrev]);

    const getCurrentMediaUrl = () => {
        if (!selectedMedia) return '';
        const event = events.find(ev => ev.id === selectedMedia.eventId);
        if (!event) return '';

        if (selectedMedia.index < event.videos.length) {
            return event.videos[selectedMedia.index];
        }
        return event.images[selectedMedia.index - event.videos.length];
    };

    return (
        <section className="py-24 bg-white border-b border-slate-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <span className="text-secondary font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">Em Destaque</span>
                    <h2 className="text-4xl md:text-5xl font-display font-black text-primary tracking-tighter">
                        Eventos Onde <span className="text-primary">Participamos</span>
                    </h2>
                    <p className="text-slate-500 max-w-2xl mx-auto mt-6">
                        Confira a nossa presença em algumas das mais importantes feiras e exposições do setor, onde demonstramos as nossas soluções marítimas e interagimos com os nossos parceiros.
                    </p>
                </div>

                <div className="space-y-32">
                    {events.map((event, idx) => (
                        <div key={event.id} className="relative">
                            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                                <div>
                                    <h3 className="text-3xl font-display font-black text-primary">{event.title}</h3>
                                    <div className="flex items-center gap-4 mt-3 text-sm font-bold text-slate-500 uppercase tracking-widest">
                                        <span className="flex items-center gap-1"><Calendar size={16} className="text-secondary" /> {event.date}</span>
                                        <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                                        <span className="flex items-center gap-1"><MapPin size={16} className="text-secondary" /> {event.location}</span>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <span className="bg-slate-50 border border-slate-100 text-slate-600 px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2">
                                        <Camera size={14} className="text-primary" /> {event.images.length} Fotos
                                    </span>
                                    {event.videos.length > 0 && (
                                        <span className="bg-slate-50 border border-slate-100 text-slate-600 px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2">
                                            <Video size={14} className="text-primary" /> {event.videos.length} Vídeos
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Featured Gallery Grid */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {/* First large image */}
                                {event.images[0] && (
                                    <motion.div 
                                        whileHover={{ y: -5 }}
                                        className="col-span-2 row-span-2 relative rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 min-h-[300px] md:min-h-[400px] group"
                                        onClick={() => setSelectedMedia({ eventId: event.id, index: event.videos.length, type: 'image' })}
                                    >
                                        <Image src={event.images[0]} alt={event.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                                            <Camera className="text-white opacity-0 group-hover:opacity-100 transition-opacity scale-50 group-hover:scale-100 duration-300" size={32} />
                                        </div>
                                    </motion.div>
                                )}

                                {/* Other media */}
                                {event.videos.slice(0, 1).map((vid, vIdx) => (
                                    <motion.div 
                                        key={vid}
                                        whileHover={{ y: -5 }}
                                        className="relative rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 min-h-[150px] md:min-h-[200px] group col-span-2"
                                        onClick={() => setSelectedMedia({ eventId: event.id, index: vIdx, type: 'video' })}
                                    >
                                        <video src={vid} className="object-cover w-full h-full" />
                                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/40 transition-colors">
                                            <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                                                <Video className="text-white" size={24} />
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}

                                {event.images.slice(1, event.videos.length > 0 ? 5 : 7).map((img, iIdx) => (
                                    <motion.div 
                                        key={img}
                                        whileHover={{ y: -5 }}
                                        className="relative rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 min-h-[150px] md:min-h-[200px] group"
                                        onClick={() => setSelectedMedia({ eventId: event.id, index: event.videos.length + iIdx + 1, type: 'image' })}
                                    >
                                        <Image src={img} alt={event.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                                            <Camera className="text-white opacity-0 group-hover:opacity-100 transition-opacity scale-50 group-hover:scale-100 duration-300" size={24} />
                                        </div>
                                    </motion.div>
                                ))}

                                {/* Plus More indicator */}
                                {event.images.length > (event.videos.length > 0 ? 5 : 7) && (
                                    <motion.div 
                                        whileHover={{ y: -5 }}
                                        className="relative rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 min-h-[150px] md:min-h-[200px] group"
                                        onClick={() => setSelectedMedia({ 
                                            eventId: event.id, 
                                            index: event.videos.length + (event.videos.length > 0 ? 5 : 7), 
                                            type: 'image' 
                                        })}
                                    >
                                        <Image src={event.images[event.videos.length > 0 ? 5 : 7]} alt={event.title} fill className="object-cover" />
                                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                            <span className="text-white font-black text-2xl">+{event.images.length - (event.videos.length > 0 ? 5 : 7)}</span>
                                        </div>
                                    </motion.div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedMedia && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-12"
                        onClick={() => setSelectedMedia(null)}
                    >
                        {/* Close Button */}
                        <button 
                            onClick={() => setSelectedMedia(null)}
                            className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-[110] bg-white/10 p-2 rounded-full hover:bg-white/20"
                        >
                            <X size={28} />
                        </button>

                        {/* Navigation Controls */}
                        <button 
                            onClick={handlePrev}
                            className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-all z-[110] bg-white/10 p-3 md:p-4 rounded-full hover:bg-white/20 hover:scale-110"
                        >
                            <ChevronLeft size={32} />
                        </button>

                        <button 
                            onClick={handleNext}
                            className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-all z-[110] bg-white/10 p-3 md:p-4 rounded-full hover:bg-white/20 hover:scale-110"
                        >
                            <ChevronRight size={32} />
                        </button>
                        
                        {/* Media Container */}
                        <motion.div 
                            key={getCurrentMediaUrl()}
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            className="relative w-full h-full flex items-center justify-center"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {selectedMedia.type === 'image' ? (
                                <div className="relative w-full h-full">
                                    <Image 
                                        src={getCurrentMediaUrl()} 
                                        alt="Event Media" 
                                        fill 
                                        className="object-contain"
                                        priority
                                    />
                                </div>
                            ) : (
                                <video 
                                    src={getCurrentMediaUrl()} 
                                    controls 
                                    autoPlay 
                                    className="max-w-full max-h-full rounded-lg shadow-2xl" 
                                />
                            )}
                            
                            {/* Caption/Counter */}
                            <div className="absolute bottom-0 left-0 right-0 py-6 text-center">
                                <p className="text-white/50 text-sm font-bold tracking-widest uppercase">
                                    {events.find(e => e.id === selectedMedia.eventId)?.title} — {selectedMedia.index + 1} / {
                                        (events.find(e => e.id === selectedMedia.eventId)?.images.length || 0) + 
                                        (events.find(e => e.id === selectedMedia.eventId)?.videos.length || 0)
                                    }
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};
