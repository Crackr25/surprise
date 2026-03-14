"use client";

import { useState, useEffect, useCallback } from "react";
import UploadForm from "@/components/UploadForm";
import { ImageIcon, Trash2, Home } from "lucide-react";
import Link from "next/link";
import type { PutBlobResult } from "@vercel/blob";

export default function AdminDashboard() {
    const [images, setImages] = useState<PutBlobResult[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchImages = useCallback(async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/images");
            const data = await res.json();
            if (data.blobs) {
                setImages(data.blobs);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchImages();
    }, [fetchImages]);

    return (
        <div className="min-h-screen bg-blush p-4 md:p-8">
            <div className="max-w-4xl mx-auto">
                <header className="flex items-center justify-between mb-8 pb-4 border-b border-rose-200">
                    <div>
                        <h1 className="text-2xl font-bold text-charcoal flex items-center gap-2">
                            <ImageIcon className="text-rose-500" />
                            Surprise Setup Panel
                        </h1>
                        <p className="text-sm text-charcoal/70 mt-1">
                            Add photos here. They will appear in the gallery automatically.
                        </p>
                    </div>

                    <Link href="/" className="flex items-center gap-2 text-rose-500 hover:text-rose-600 bg-white px-4 py-2 rounded-lg shadow-sm font-medium">
                        <Home className="w-4 h-4" />
                        View App
                    </Link>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-1">
                        <UploadForm onUploadSuccess={fetchImages} />

                        <div className="mt-8 bg-rose-100/50 p-4 rounded-xl text-sm text-rose-900">
                            <strong>Note:</strong> You need to have <code>BLOB_READ_WRITE_TOKEN</code> set in your environment variables on Vercel (or in <code>.env.local</code> locally) for uploads to work!
                        </div>
                    </div>

                    <div className="md:col-span-2">
                        <div className="bg-white p-6 rounded-2xl border border-rose-100 shadow-sm min-h-[400px]">
                            <h3 className="text-xl font-medium text-charcoal mb-4">Uploaded Images ({images.length})</h3>

                            {loading ? (
                                <div className="flex justify-center py-20">
                                    <div className="animate-pulse flex gap-2">
                                        <div className="w-3 h-3 bg-rose-400 rounded-full"></div>
                                        <div className="w-3 h-3 bg-rose-400 rounded-full animation-delay-200"></div>
                                        <div className="w-3 h-3 bg-rose-400 rounded-full animation-delay-400"></div>
                                    </div>
                                </div>
                            ) : images.length === 0 ? (
                                <div className="text-center py-20 text-charcoal/50">
                                    <ImageIcon className="w-12 h-12 mx-auto mb-3 opacity-20" />
                                    <p>No images uploaded yet.</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                    {images.map((img) => (
                                        <div key={img.url} className="relative group rounded-xl overflow-hidden aspect-square border border-rose-100 bg-rose-50">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img src={img.url} alt="Uploaded memory" className="object-cover w-full h-full" />

                                            {/* In a real app we'd add delete functionality here */}
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <button className="bg-white/20 hover:bg-red-500 text-white p-2 rounded-full backdrop-blur-sm transition-colors" title="Requires Delete API implementation">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
