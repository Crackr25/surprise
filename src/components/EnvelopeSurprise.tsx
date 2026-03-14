"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Heart } from "lucide-react";

export default function EnvelopeSurprise({ onOpen }: { onOpen: () => void }) {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => {
        setIsOpen(true);
        setTimeout(() => {
            onOpen();
        }, 2000); // Trigger next phase after envelope opens
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] z-10 relative">
            <AnimatePresence>
                {!isOpen && (
                    <motion.button
                        key="envelope"
                        exit={{ scale: 0.8, opacity: 0, y: -50 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleOpen}
                        className="relative cursor-pointer group"
                    >
                        <div className="w-64 h-48 bg-rose-200 rounded-lg shadow-xl flex items-center justify-center relative border-2 border-rose-300 overflow-hidden">
                            {/* Envelope Flap visual */}
                            <div className="absolute top-0 w-full h-0 border-t-[80px] border-t-rose-300 border-l-[128px] border-l-transparent border-r-[128px] border-r-transparent origin-top transition-transform duration-500 group-hover:-rotate-x-12"></div>

                            <Mail className="w-16 h-16 text-rose-500 z-10" />
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-8 z-10 flex items-center gap-2">
                                <span className="font-cursive text-xl text-rose-600">Open Me</span>
                                <Heart className="w-5 h-5 text-rose-500 animate-pulse" fill="currentColor" />
                            </div>
                        </div>
                    </motion.button>
                )}

                {isOpen && (
                    <motion.div
                        key="letter"
                        initial={{ opacity: 0, scale: 0.8, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="w-full max-w-lg glass-panel p-6 sm:p-8 md:p-12 rounded-2xl shadow-2xl text-center"
                    >
                        <h2 className="text-3xl sm:text-4xl font-cursive text-rose-500 mb-4 sm:mb-6">My Love...</h2>
                        <p className="text-base sm:text-lg text-charcoal/80 leading-relaxed mb-6">
                            You make every day brighter and my heart fuller. I put together these little memories for you, just to remind you how much you mean to me.
                        </p>
                        <Heart className="w-8 h-8 text-rose-400 mx-auto" fill="currentColor" />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
