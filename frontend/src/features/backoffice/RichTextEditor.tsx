"use client";

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Underline from '@tiptap/extension-underline';
import Placeholder from '@tiptap/extension-placeholder';
import TextAlign from '@tiptap/extension-text-align';
import ImageResize from 'tiptap-extension-resize-image';
import {
    Bold, Italic, Underline as UnderlineIcon,
    Link as LinkIcon, List, ListOrdered,
    AlignLeft, AlignCenter, AlignRight,
    Heading1, Heading2, Heading3,
    Image as ImageIcon, Undo, Redo,
    Quote, Loader2
} from 'lucide-react';
import { useMutation, useConvex } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useRef, useState, useCallback } from 'react';

interface RichTextEditorProps {
    value: string;
    onChange: (content: string) => void;
    placeholder?: string;
}

const Toolbar = ({ editor, isUploading }: { editor: any, isUploading: boolean }) => { // Tiptap editor typing is complex, using any for now to unblock build.
    const generateUploadUrl = useMutation(api.files.generateUploadUrl);
    const convex = useConvex();
    const fileInputRef = useRef<HTMLInputElement>(null);

    if (!editor) return null;

    const addLink = () => {
        const url = window.prompt('URL do link:');
        if (url) {
            editor.chain().focus().setLink({ href: url }).run();
        }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            const postUrl = await generateUploadUrl();
            const result = await fetch(postUrl, {
                method: "POST",
                headers: { "Content-Type": file.type },
                body: file,
            });

            if (!result.ok) throw new Error("Upload failed");

            const { storageId } = await result.json();
            const imageUrl = await convex.query(api.files.getUrl, { storageId });

            if (imageUrl) {
                editor.chain().focus().setImage({ src: imageUrl }).run();
            }
        } catch (error) {
            console.error(error);
            alert("Erro ao carregar imagem.");
        } finally {
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    const activeClass = "bg-primary text-white shadow-sm";
    const inactiveClass = "text-slate-500 hover:bg-slate-100";
    const btnClass = "p-2 rounded-lg transition-all flex items-center justify-center disabled:opacity-50";

    return (
        <div className="flex flex-wrap items-center gap-1 p-2 border-b border-slate-200 bg-slate-50/50 backdrop-blur-sm sticky top-0 z-10 rounded-t-xl">
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={`${btnClass} ${editor.isActive('bold') ? activeClass : inactiveClass}`}
                title="Negrito"
            >
                <Bold size={18} />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={`${btnClass} ${editor.isActive('italic') ? activeClass : inactiveClass}`}
                title="Itálico"
            >
                <Italic size={18} />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                className={`${btnClass} ${editor.isActive('underline') ? activeClass : inactiveClass}`}
                title="Sublinhado"
            >
                <UnderlineIcon size={18} />
            </button>

            <div className="w-px h-6 bg-slate-200 mx-1" />

            <button
                type="button"
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                className={`${btnClass} ${editor.isActive('heading', { level: 1 }) ? activeClass : inactiveClass}`}
                title="Título 1"
            >
                <Heading1 size={18} />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                className={`${btnClass} ${editor.isActive('heading', { level: 2 }) ? activeClass : inactiveClass}`}
                title="Título 2"
            >
                <Heading2 size={18} />
            </button>

            <div className="w-px h-6 bg-slate-200 mx-1" />

            <button
                type="button"
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={`${btnClass} ${editor.isActive('bulletList') ? activeClass : inactiveClass}`}
                title="Lista de Marcadores"
            >
                <List size={18} />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={`${btnClass} ${editor.isActive('orderedList') ? activeClass : inactiveClass}`}
                title="Lista Numerada"
            >
                <ListOrdered size={18} />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                className={`${btnClass} ${editor.isActive('blockquote') ? activeClass : inactiveClass}`}
                title="Citação"
            >
                <Quote size={18} />
            </button>

            <div className="w-px h-6 bg-slate-200 mx-1" />

            <button
                type="button"
                onClick={() => editor.chain().focus().setTextAlign('left').run()}
                className={`${btnClass} ${editor.isActive({ textAlign: 'left' }) ? activeClass : inactiveClass}`}
                title="Alinhar à Esquerda"
            >
                <AlignLeft size={18} />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().setTextAlign('center').run()}
                className={`${btnClass} ${editor.isActive({ textAlign: 'center' }) ? activeClass : inactiveClass}`}
                title="Centralizar"
            >
                <AlignCenter size={18} />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().setTextAlign('right').run()}
                className={`${btnClass} ${editor.isActive({ textAlign: 'right' }) ? activeClass : inactiveClass}`}
                title="Alinhar à Direita"
            >
                <AlignRight size={18} />
            </button>

            <div className="w-px h-6 bg-slate-200 mx-1" />

            <button
                type="button"
                onClick={addLink}
                className={`${btnClass} ${editor.isActive('link') ? activeClass : inactiveClass}`}
                title="Inserir Link"
            >
                <LinkIcon size={18} />
            </button>

            <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                className="hidden"
                accept="image/*"
            />
            <button
                type="button"
                disabled={isUploading}
                onClick={() => fileInputRef.current?.click()}
                className={`${btnClass} ${inactiveClass}`}
                title="Inserir Imagem"
            >
                {isUploading ? <Loader2 size={18} className="animate-spin text-primary" /> : <ImageIcon size={18} />}
            </button>

            <div className="flex-1" />

            <button
                type="button"
                onClick={() => editor.chain().focus().undo().run()}
                className={btnClass}
                title="Desfazer"
            >
                <Undo size={18} className="text-slate-400" />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().redo().run()}
                className={btnClass}
                title="Refazer"
            >
                <Redo size={18} className="text-slate-400" />
            </button>
        </div>
    );
};

export const RichTextEditor = ({ value, onChange, placeholder }: RichTextEditorProps) => {
    const convex = useConvex();
    const generateUploadUrl = useMutation(api.files.generateUploadUrl);
    const [isUploading, setIsUploading] = useState(false);

    const uploadFile = useCallback(async (file: File) => {
        try {
            setIsUploading(true);
            const postUrl = await generateUploadUrl();
            const result = await fetch(postUrl, {
                method: "POST",
                headers: { "Content-Type": file.type },
                body: file,
            });
            if (!result.ok) throw new Error("Upload failed");
            const { storageId } = await result.json();
            return await convex.query(api.files.getUrl, { storageId });
        } catch (error) {
            console.error(error);
            return null;
        } finally {
            setIsUploading(false);
        }
    }, [convex, generateUploadUrl]);

    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: 'text-primary underline font-bold',
                },
            }),
            (ImageResize as any).configure({
                HTMLAttributes: {
                    class: 'rounded-2xl max-w-full h-auto my-8 shadow-lg border border-slate-100 cursor-pointer transition-all hover:ring-4 hover:ring-primary/20',
                },
            }),
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            Placeholder.configure({
                placeholder: placeholder || 'Comece a escrever...',
            }),
        ],
        content: value,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: 'prose prose-slate prose-lg max-w-none focus:outline-none min-h-[400px] p-8 bg-white rounded-b-xl',
            },
            handleDrop: (view, event, slice, moved) => {
                if (!moved && event.dataTransfer && event.dataTransfer.files && event.dataTransfer.files[0]) {
                    const file = event.dataTransfer.files[0];
                    if (file.type.startsWith("image/")) {
                        uploadFile(file).then(url => {
                            if (url) {
                                const { schema } = view.state;
                                const nodeType = schema.nodes.image || schema.nodes.resizableImage;
                                if (nodeType) {
                                    const node = nodeType.create({ src: url });
                                    const transaction = view.state.tr.replaceSelectionWith(node);
                                    view.dispatch(transaction);
                                }
                            }
                        });
                        return true;
                    }
                }
                return false;
            },
            handlePaste: (view, event) => {
                const items = Array.from(event.clipboardData?.items || []);
                const imageItem = items.find(item => item.type.startsWith("image/"));
                if (imageItem) {
                    const file = imageItem.getAsFile();
                    if (file) {
                        uploadFile(file).then(url => {
                            if (url) {
                                const { schema } = view.state;
                                const nodeType = schema.nodes.image || schema.nodes.resizableImage;
                                if (nodeType) {
                                    const node = nodeType.create({ src: url });
                                    const transaction = view.state.tr.replaceSelectionWith(node);
                                    view.dispatch(transaction);
                                }
                            }
                        });
                        return true;
                    }
                }
                return false;
            }
        },
        immediatelyRender: false,
    });

    return (
        <div className="border border-slate-200 rounded-xl overflow-hidden focus-within:border-primary transition-colors shadow-sm bg-white relative">
            {isUploading && (
                <div className="absolute inset-x-0 top-0 h-1 bg-primary/20 z-20">
                    <div className="h-full bg-primary animate-[upload-progress_2s_infinite]" />
                </div>
            )}
            <Toolbar editor={editor} isUploading={isUploading} />
            <EditorContent editor={editor} />

            <style jsx global>{`
                @keyframes upload-progress {
                    0% { width: 0; left: 0; }
                    50% { width: 100%; left: 0; }
                    100% { width: 0; left: 100%; }
                }
                .tiptap p.is-editor-empty:first-child::before {
                    content: attr(data-placeholder);
                    float: left;
                    color: #adb5bd;
                    pointer-events: none;
                    height: 0;
                }
                .tiptap blockquote {
                    border-left: 4px solid #fcb913;
                    padding-left: 1rem;
                    font-style: italic;
                    color: #475569;
                    background: #f8fafc;
                    padding: 1rem;
                    border-radius: 0 0.5rem 0.5rem 0;
                }
                /* Selection styles for images */
                .tiptap img.ProseMirror-selectednode {
                    outline: 3px solid #1E2B58;
                    box-shadow: 0 0 0 6px rgba(30, 43, 88, 0.1);
                }
                /* Resize handle styles */
                .tiptap .image-resizer {
                    display: inline-block;
                    position: relative;
                }
                .tiptap .image-resizer__handler {
                    position: absolute;
                    right: 0;
                    bottom: 0;
                    width: 12px;
                    height: 12px;
                    background: #1E2B58;
                    border: 2px solid white;
                    border-radius: 2px;
                    cursor: nwse-resize;
                    z-index: 10;
                }
            `}</style>
        </div>
    );
};
