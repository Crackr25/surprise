import Link from "next/link";
import { Heart } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <div className="z-10 text-center glass-panel p-6 sm:p-8 md:p-12 rounded-3xl max-w-xl mx-auto w-full border border-white/50">
        <Heart className="w-10 h-10 sm:w-12 sm:h-12 text-rose-400 mx-auto mb-6 animate-pulse" fill="currentColor" />
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-cursive text-rose-500 mb-4 leading-tight">
          Hello Beautiful
        </h1>
        <p className="text-lg text-charcoal/80 mb-8 font-light">
          I made a little something just for you.
        </p>

        <Link
          href="/surprise"
          className="inline-block bg-white text-rose-500 px-8 py-3 rounded-full font-medium shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 ring-2 ring-rose-100 ring-offset-2 ring-offset-blush"
        >
          Open Surprise
        </Link>
      </div>
    </main>
  );
}
