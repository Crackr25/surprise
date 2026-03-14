"use client";

import { useState } from "react";
import FloatingHearts from "@/components/FloatingHearts";
import EnvelopeSurprise from "@/components/EnvelopeSurprise";
import PhotoGallery from "@/components/PhotoGallery";

export default function SurprisePage() {
    const [showGallery, setShowGallery] = useState(false);

    return (
        <main className="min-h-screen relative p-4 pb-20 overflow-x-hidden">
            <FloatingHearts />

            <div className="max-w-5xl mx-auto pt-20">
                <EnvelopeSurprise onOpen={() => setShowGallery(true)} />

                {showGallery && (
                    <div className="mt-20 z-10 relative text-center">
                        <h3 className="text-3xl font-cursive text-rose-400 mb-10">Our Precious Memories</h3>
                        <PhotoGallery />
                    </div>
                )}
            </div>
        </main>
    );
}
