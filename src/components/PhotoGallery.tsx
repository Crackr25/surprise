"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Loader2, Heart } from "lucide-react";
import type { PutBlobResult } from "@vercel/blob";

export default function PhotoGallery() {
    const [images, setImages] = useState<PutBlobResult[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchImages() {
            try {
                const res = await fetch("/api/images");
                const data = await res.json();
                if (data.blobs) {
                    setImages(data.blobs);
                }
            } catch (error) {
                console.error("Failed to load images", error);
            } finally {
                setLoading(false);
            }
        }

        fetchImages();
    }, []);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-rose-400">
                <Loader2 className="w-8 h-8 animate-spin mb-4" />
                <p className="font-cursive text-xl animate-pulse">Loading our memories...</p>
            </div>
        );
    }

    if (images.length === 0) {
        return (
            <div className="text-center py-20">
                <Heart className="w-12 h-12 mx-auto text-rose-300 opacity-50 mb-4" />
                <p className="text-charcoal/60">Upload some photos in the Admin Panel to see them here! 💕</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-4 pb-20">
            {images.map((img, index) => {
                // Create slight random rotations for cute polaroid effect
                const randomRotation = index % 2 === 0 ? `rotate-${(index % 3) + 1}deg` : `-rotate-${(index % 3) + 1}deg`;

                return (
                    <motion.div
                        key={img.url}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
                        className={`bg-white p-4 pb-12 rounded-sm shadow-md transition-all duration-300 ${randomRotation}`}
                        style={{
                            transform: `rotate(${index % 2 === 0 ? (index % 3) + 2 : -((index % 3) + 2)}deg)`
                        }}
                    >
                        <div className="aspect-square w-full rounded overflow-hidden bg-rose-50 border border-rose-100 relative">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={img.url}
                                alt="A beautiful memory"
                                className="object-cover w-full h-full hover:scale-110 transition-transform duration-700"
                            />
                        </div>
                        {/* Soft decorative tape effect */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-4 bg-white/40 shadow-sm blur-[0.5px] -mt-2 rotate-2 opacity-70"></div>
                    </motion.div>
                );
            })}
        </div>
    );
}
