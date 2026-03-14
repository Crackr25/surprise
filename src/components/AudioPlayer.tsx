"use client";

import { useEffect, useRef, useState } from "react";
import { Music, Volume2, VolumeX } from "lucide-react";

export default function AudioPlayer() {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [hasInteracted, setHasInteracted] = useState(false);

    // Modern browsers block autoplay until the user interacts with the page.
    // We'll try to play it as soon as they click anywhere.
    useEffect(() => {
        const handleInteraction = () => {
            if (!hasInteracted && audioRef.current) {
                audioRef.current.play()
                    .then(() => {
                        setIsPlaying(true);
                        setHasInteracted(true);
                    })
                    .catch(e => console.log("Audio play failed:", e));
            }
        };

        document.addEventListener("click", handleInteraction);
        return () => document.removeEventListener("click", handleInteraction);
    }, [hasInteracted]);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <audio
                ref={audioRef}
                src="https://cdn.pixabay.com/download/audio/2022/10/25/audio_2207b19dc6.mp3?filename=romantic-piano-122944.mp3"
                loop
            />

            <button
                onClick={togglePlay}
                className="bg-white/80 backdrop-blur-md p-3 rounded-full shadow-lg border border-rose-200 text-rose-500 hover:scale-110 transition-transform flex items-center justify-center group"
            >
                {isPlaying ? (
                    <Volume2 className="w-6 h-6 animate-pulse" />
                ) : (
                    <VolumeX className="w-6 h-6 opacity-70" />
                )}

                {/* Tooltip */}
                <span className="absolute right-full mr-4 bg-white px-3 py-1 rounded-lg text-sm font-medium text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md pointer-events-none border border-rose-100">
                    {isPlaying ? "Pause Music" : "Play Music"}
                </span>
            </button>
        </div>
    );
}
