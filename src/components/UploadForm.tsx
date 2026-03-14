"use client";

import { useState, useRef } from "react";
import { Upload, X, Loader2, Image as ImageIcon } from "lucide-react";

export default function UploadForm({ onUploadSuccess }: { onUploadSuccess?: () => void }) {
    const [files, setFiles] = useState<File[]>([]);
    const [previews, setPreviews] = useState<string[]>([]);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const selectedFiles = Array.from(e.target.files);
            setFiles((prev) => [...prev, ...selectedFiles]);

            // Create local previews
            selectedFiles.forEach((file) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setPreviews((prev) => [...prev, reader.result as string]);
                };
                reader.readAsDataURL(file);
            });
        }
    };

    const handleUpload = async () => {
        if (files.length === 0) return;

        setUploading(true);
        try {
            // Upload all files concurrently
            const uploadPromises = files.map(async (file) => {
                const uniqueFilename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, '')}`;
                const response = await fetch(`/api/upload?filename=${uniqueFilename}`, {
                    method: "POST",
                    body: file,
                });
                if (!response.ok) throw new Error(`Upload failed for ${file.name}`);
                return response;
            });

            await Promise.all(uploadPromises);

            // Reset form
            setFiles([]);
            setPreviews([]);
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }

            if (onUploadSuccess) onUploadSuccess();

            alert(`Successfully uploaded ${files.length} images!`);
        } catch (error) {
            console.error(error);
            alert("Failed to upload some images. Make sure you have set BLOB_READ_WRITE_TOKEN.");
        } finally {
            setUploading(false);
        }
    };

    const removeFile = (indexToRemove: number, e: React.MouseEvent) => {
        e.stopPropagation();
        setFiles(files.filter((_, i) => i !== indexToRemove));
        setPreviews(previews.filter((_, i) => i !== indexToRemove));
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
                    multiple // Added multiple attribute
                    className="hidden"
                />

                {previews.length > 0 ? (
                    <div className="flex flex-wrap gap-4 justify-center">
                        {previews.map((preview, index) => (
                            <div key={index} className="relative inline-block">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={preview} alt={`Preview ${index}`} className="h-32 object-cover rounded-lg shadow-md" />
                                <button
                                    onClick={(e) => removeFile(index, e)}
                                    className="absolute -top-3 -right-3 bg-white p-1 rounded-full shadow-md text-gray-500 hover:text-red-500 transition-colors z-10"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center text-rose-400">
                        <ImageIcon className="w-12 h-12 mb-3 opacity-50" />
                        <p className="font-medium text-rose-500">Click to select images</p>
                        <p className="text-sm mt-1 opacity-70">Supports JPG, PNG, WEBP (Multiple allowed)</p>
                    </div>
                )}
            </div>

            <button
                onClick={handleUpload}
                disabled={files.length === 0 || uploading}
                className="w-full bg-rose-500 text-white py-3 rounded-lg font-medium hover:bg-rose-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
            >
                {uploading ? (
                    <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Uploading to Vercel...
                    </>
                ) : (
                    `Save ${files.length > 0 ? files.length : ''} Memor${files.length === 1 ? 'y' : 'ies'}`
                )}
            </button>
        </div>
    );
}
