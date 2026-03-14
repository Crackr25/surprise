"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import FloatingHearts from "@/components/FloatingHearts";
import EnvelopeSurprise from "@/components/EnvelopeSurprise";
import LoveReasons from "@/components/LoveReasons";
import PhotoGallery from "@/components/PhotoGallery";

export default function SurprisePage() {
    const [showGallery, setShowGallery] = useState(false);

    return (
        <main className="min-h-screen relative p-4 pb-20 overflow-x-hidden">
            <FloatingHearts />

            <div className="max-w-5xl mx-auto pt-20">
                <EnvelopeSurprise onOpen={() => setShowGallery(true)} />

                {showGallery && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        className="mt-16 z-10 relative"
                    >
                        <LoveReasons />

                        <div className="text-center mt-32">
                            <h3 className="text-3xl font-cursive text-rose-400 mb-10">Our Precious Memories</h3>
                            <PhotoGallery />
                        </div>
                    </motion.div>
                )}
            </div>
        </main>
    );
}
