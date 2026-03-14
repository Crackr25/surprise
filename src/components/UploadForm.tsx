"use client";

import { useState, useRef } from "react";
import { Upload, X, Loader2, Image as ImageIcon } from "lucide-react";

export default function UploadForm({ onUploadSuccess }: { onUploadSuccess?: () => void }) {
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const selectedFile = e.target.files[0];
            setFile(selectedFile);

            // Create local preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(selectedFile);
        }
    };

    const handleUpload = async () => {
        if (!file) return;

        setUploading(true);
        try {
            // Create a unique filename
            const uniqueFilename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, '')}`;

            const response = await fetch(`/api/upload?filename=${uniqueFilename}`, {
                method: "POST",
                body: file, // Send file stream directly
            });

            if (!response.ok) {
                throw new Error("Upload failed");
            }

            // Reset form
            setFile(null);
            setPreview(null);
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }

            if (onUploadSuccess) onUploadSuccess();

            alert("Image uploaded successfully!");
        } catch (error) {
            console.error(error);
            alert("Failed to upload. Make sure you have set BLOB_READ_WRITE_TOKEN.");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="bg-white p-6 rounded-2xl border border-rose-100 shadow-sm">
            <h3 className="text-xl font-medium text-charcoal mb-4 flex items-center gap-2">
                <Upload className="w-5 h-5 text-rose-500" />
                Upload New Memory
            </h3>

            <div
                className="border-2 border-dashed border-rose-200 rounded-xl p-8 text-center bg-rose-50/50 hover:bg-rose-50 transition-colors cursor-pointer mb-4"
                onClick={() => fileInputRef.current?.click()}
            >
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                />

                {preview ? (
                    <div className="relative inline-block">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={preview} alt="Preview" className="max-h-48 rounded-lg shadow-md" />
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setFile(null);
                                setPreview(null);
                            }}
                            className="absolute -top-3 -right-3 bg-white p-1 rounded-full shadow-md text-gray-500 hover:text-red-500 transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-col items-center text-rose-400">
                        <ImageIcon className="w-12 h-12 mb-3 opacity-50" />
                        <p className="font-medium text-rose-500">Click to select an image</p>
                        <p className="text-sm mt-1 opacity-70">Supports JPG, PNG, WEBP</p>
                    </div>
                )}
            </div>

            <button
                onClick={handleUpload}
                disabled={!file || uploading}
                className="w-full bg-rose-500 text-white py-3 rounded-lg font-medium hover:bg-rose-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
            >
                {uploading ? (
                    <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Uploading to Vercel...
                    </>
                ) : (
                    "Save Memory"
                )}
            </button>
        </div>
    );
}
