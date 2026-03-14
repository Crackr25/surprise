"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export default function FloatingHearts() {
    const [hearts, setHearts] = useState<{ id: number; x: number; size: number; delay: number; duration: number }[]>([]);

    useEffect(() => {
        // Generate initial hearts
        const newHearts = Array.from({ length: 20 }).map((_, i) => ({
            id: i,
            x: Math.random() * 100, // percentage string
            size: Math.random() * 20 + 10, // 10px to 30px
            delay: Math.random() * 5, // 0 to 5s delay
            duration: Math.random() * 5 + 10, // 10s to 15s duration
        }));
        setHearts(newHearts);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {hearts.map((heart) => (
                <motion.div
                    key={heart.id}
                    initial={{ y: "110vh", x: `${heart.x}vw`, opacity: 0 }}
                    animate={{
                        y: "-10vh",
                        x: `${heart.x + (Math.random() * 10 - 5)}vw`,
                        opacity: [0, 0.8, 0],
                    }}
                    transition={{
                        duration: heart.duration,
                        repeat: Infinity,
                        delay: heart.delay,
                        ease: "linear",
                    }}
                    className="absolute"
                    style={{ width: heart.size, height: heart.size }}
                >
                    <Heart fill="#fecdd3" className="text-rose-200" style={{ width: "100%", height: "100%" }} />
                </motion.div>
            ))}
        </div>
    );
}
