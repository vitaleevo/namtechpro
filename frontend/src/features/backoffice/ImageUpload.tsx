"use client";

import React, { useState, useRef, useEffect } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Upload, X, Image as ImageIcon, Loader2 } from "lucide-react";

interface ImageUploadProps {
    value?: string;
    onChange: (storageId: string) => void;
    onRemove: () => void;
}

export const ImageUpload = ({ value, onChange, onRemove }: ImageUploadProps) => {
    const generateUploadUrl = useMutation(api.files.generateUploadUrl);
    const [isLoading, setIsLoading] = useState(false);
    const [preview, setPreview] = useState<string | null>(value || null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Sync preview with value prop when value changes
    useEffect(() => {
        if (value) {
            setPreview(value);
        }
    }, [value]);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            setIsLoading(true);

            // Create preview
            const objectUrl = URL.createObjectURL(file);
            setPreview(objectUrl);

            // Get upload URL
            const postUrl = await generateUploadUrl();

            // Upload file
            const result = await fetch(postUrl, {
                method: "POST",
                headers: { "Content-Type": file.type },
                body: file,
            });

            if (!result.ok) throw new Error("Upload failed");

            const { storageId } = await result.json();
            onChange(storageId);
        } catch (error) {
            console.error("Upload error:", error);
            alert("Failed to upload image");
            setPreview(null);
        } finally {
            setIsLoading(false);
        }
    };

    const handleRemove = () => {
        setPreview(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
        onRemove();
    };

    return (
        <div className="flex flex-col gap-4">
            <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
            />

            {preview && preview !== "" ? (
                <div className="relative w-40 h-40 rounded-xl overflow-hidden border border-slate-200 group">
                    <img
                        src={preview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                    />
                    <button
                        type="button"
                        onClick={handleRemove}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                        <X size={16} />
                    </button>
                    {isLoading && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <Loader2 className="animate-spin text-white" />
                        </div>
                    )}
                </div>
            ) : (
                <button
                    type="button"
                    disabled={isLoading}
                    onClick={() => fileInputRef.current?.click()}
                    className="w-40 h-40 border-2 border-dashed border-slate-300 rounded-xl flex flex-col items-center justify-center gap-2 hover:border-primary hover:bg-slate-50 transition-colors text-slate-400 hover:text-primary"
                >
                    {isLoading ? (
                        <Loader2 className="animate-spin" />
                    ) : (
                        <>
                            <Upload size={24} />
                            <span className="text-xs font-bold uppercase">Upload Image</span>
                        </>
                    )}
                </button>
            )}
        </div>
    );
};
