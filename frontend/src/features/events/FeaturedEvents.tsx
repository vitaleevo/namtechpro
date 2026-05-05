"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Camera, Video, X } from 'lucide-react';

export type EventGallery = {
    id: string;
    title: string;
    date: string;
    location: string;
    images: string[];
    videos: string[];
};

export const FeaturedEvents = ({ events }: { events: EventGallery[] }) => {
    const [selectedMedia, setSelectedMedia] = useState<{ url: string; type: 'image' | 'video' } | null>(null);

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
                                        onClick={() => setSelectedMedia({ url: event.images[0], type: 'image' })}
                                    >
                                        <Image src={event.images[0]} alt={event.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                                            <Camera className="text-white opacity-0 group-hover:opacity-100 transition-opacity scale-50 group-hover:scale-100 duration-300" size={32} />
                                        </div>
                                    </motion.div>
                                )}

                                {/* Other media */}
                                {event.videos.slice(0, 1).map((vid) => (
                                    <motion.div 
                                        key={vid}
                                        whileHover={{ y: -5 }}
                                        className="relative rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 min-h-[150px] md:min-h-[200px] group col-span-2"
                                        onClick={() => setSelectedMedia({ url: vid, type: 'video' })}
                                    >
                                        <video src={vid} className="object-cover w-full h-full" />
                                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/40 transition-colors">
                                            <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                                                <Video className="text-white" size={24} />
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}

                                {event.images.slice(1, event.videos.length > 0 ? 5 : 7).map((img) => (
                                    <motion.div 
                                        key={img}
                                        whileHover={{ y: -5 }}
                                        className="relative rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 min-h-[150px] md:min-h-[200px] group"
                                        onClick={() => setSelectedMedia({ url: img, type: 'image' })}
                                    >
                                        <Image src={img} alt={event.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                                            <Camera className="text-white opacity-0 group-hover:opacity-100 transition-opacity scale-50 group-hover:scale-100 duration-300" size={24} />
                                        </div>
                                    </motion.div>
                                ))}

                                {/* Plus More indicator if there are more images */}
                                {event.images.length > (event.videos.length > 0 ? 5 : 7) && (
                                    <motion.div 
                                        whileHover={{ y: -5 }}
                                        className="relative rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 min-h-[150px] md:min-h-[200px] group"
                                        onClick={() => setSelectedMedia({ url: event.images[event.videos.length > 0 ? 5 : 7], type: 'image' })} // Open next image
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
            {selectedMedia && (
                <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4">
                    <button 
                        onClick={() => setSelectedMedia(null)}
                        className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-[110]"
                    >
                        <X size={36} />
                    </button>
                    
                    <div className="relative w-full max-w-5xl aspect-video rounded-xl overflow-hidden">
                        {selectedMedia.type === 'image' ? (
                            <Image src={selectedMedia.url} alt="Media" fill className="object-contain" />
                        ) : (
                            <video src={selectedMedia.url} controls autoPlay className="w-full h-full object-contain" />
                        )}
                    </div>
                </div>
            )}
        </section>
    );
};
