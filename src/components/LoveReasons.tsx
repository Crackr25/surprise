"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Star } from "lucide-react";

const reasons = [
    "Your beautiful smile that lights up my day.",
    "How you always know how to make me laugh.",
    "The way you care so deeply for everyone around you.",
    "Your incredible strength and passion.",
    "Because you are my absolute best friend.",
];

export default function LoveReasons() {
    const [revealed, setRevealed] = useState<number[]>([]);

    const toggleReveal = (index: number) => {
        if (!revealed.includes(index)) {
            setRevealed([...revealed, index]);
        }
    };

    return (
        <div className="max-w-3xl mx-auto mt-24 mb-16 text-center z-10 relative px-4">
            <h3 className="text-3xl font-cursive text-rose-500 mb-8 flex items-center justify-center gap-3">
                <Star className="text-rose-300 w-6 h-6 animate-spin-slow" />
                5 Reasons I Love You
                <Star className="text-rose-300 w-6 h-6 animate-spin-slow" />
            </h3>

            <div className="flex flex-col gap-4">
                {reasons.map((reason, index) => (
                    <motion.button
                        key={index}
                        onClick={() => toggleReveal(index)}
                        whileHover={{ scale: revealed.includes(index) ? 1 : 1.02 }}
                        whileTap={{ scale: revealed.includes(index) ? 1 : 0.98 }}
                        className={`p-4 md:p-6 rounded-xl border-2 transition-all duration-500 text-left relative overflow-hidden ${revealed.includes(index)
                                ? "bg-white/80 border-rose-200 shadow-md"
                                : "bg-rose-400 border-rose-500 shadow-lg cursor-pointer"
                            }`}
                    >
                        {/* Unrevealed state (Cover) */}
                        <div
                            className={`absolute inset-0 bg-rose-400 flex items-center justify-center text-white font-medium transition-opacity duration-700 ${revealed.includes(index) ? "opacity-0 pointer-events-none" : "opacity-100"
                                }`}
                        >
                            Click to Reveal #{index + 1}
                        </div>

                        {/* Revealed state (The Reason) */}
                        <div className={`flex items-center gap-4 transition-opacity duration-700 ${revealed.includes(index) ? "opacity-100" : "opacity-0"
                            }`}>
                            <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-500 flex items-center justify-center font-cursive text-xl flex-shrink-0">
                                {index + 1}
                            </div>
                            <p className="text-charcoal/80 text-lg sm:text-xl font-medium">
                                {reason}
                            </p>
                        </div>
                    </motion.button>
                ))}
            </div>
        </div>
    );
}
