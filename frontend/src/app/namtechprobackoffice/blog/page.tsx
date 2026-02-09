"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Plus, Pencil, Trash2, X, Save, Search, User } from "lucide-react";
import { ImageUpload } from "@/features/backoffice/ImageUpload";
import { RichTextEditor } from "@/features/backoffice/RichTextEditor";
import Image from "next/image";
import { CustomDatePicker } from "@/components/ui/DatePicker";
import { CustomSelect } from "@/components/ui/Select";

interface BlogPostFormData {
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    author: string;
    publishedAt: string;
    imageUrl: string;
    storageId?: string;
    category: string;
    readTime: string;
}

const initialForm: BlogPostFormData = {
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    author: 'Namtech Editor',
    publishedAt: new Date().toISOString().split('T')[0],
    imageUrl: '',
    category: 'Tecnologia',
    readTime: '5 min read'
};

export default function BlogPage() {
    const posts = useQuery(api.blog.list);
    const dbCategories = useQuery(api.categories.list, { type: "blog" });
    const createPost = useMutation(api.blog.create);
    const updatePost = useMutation(api.blog.update);
    const deletePost = useMutation(api.blog.remove);

    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState<Id<"blog_posts"> | null>(null);
    const [formData, setFormData] = useState<BlogPostFormData>(initialForm);
    const [searchTerm, setSearchTerm] = useState("");

    const generateSlug = (title: string) => {
        return title
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)+/g, '');
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const title = e.target.value;
        setFormData(prev => ({
            ...prev,
            title,
            slug: !editingId ? generateSlug(title) : prev.slug // Auto-generate slug only on create
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const data = {
            title: formData.title,
            slug: formData.slug,
            excerpt: formData.excerpt,
            content: formData.content,
            author: formData.author,
            publishedAt: formData.publishedAt,
            imageUrl: formData.imageUrl,
            storageId: formData.storageId as Id<"_storage"> | undefined,
            category: formData.category,
            readTime: formData.readTime
        };

        if (editingId) {
            await updatePost({ id: editingId, ...data });
        } else {
            await createPost(data);
        }

        setIsEditing(false);
        setEditingId(null);
        setFormData(initialForm);
    };

    const handleEdit = (post: any) => {
        setFormData({
            title: post.title,
            slug: post.slug,
            excerpt: post.excerpt,
            content: post.content,
            author: post.author,
            publishedAt: post.publishedAt,
            imageUrl: post.imageUrl,
            storageId: post.storageId,
            category: post.category,
            readTime: post.readTime
        });
        setEditingId(post._id);
        setIsEditing(true);
    };

    const handleDelete = async (id: Id<"blog_posts">) => {
        if (confirm("Tem certeza que deseja excluir esta postagem?")) {
            await deletePost({ id });
        }
    };

    const handleImageUpload = (storageId: string) => {
        setFormData(prev => ({ ...prev, storageId, imageUrl: '' }));
    };

    const filteredPosts = posts?.filter(p =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.content.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8 relative">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Blog e Notícias</h1>
                    <p className="text-slate-500">Gerencie artigos e publicações</p>
                </div>
                <button
                    onClick={() => { setIsEditing(true); setEditingId(null); setFormData(initialForm); }}
                    className="bg-primary text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
                >
                    <Plus size={20} />
                    Novo Artigo
                </button>
            </div>

            {/* Modal Overlay */}
            {isEditing && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity animate-in fade-in duration-300"
                        onClick={() => setIsEditing(false)}
                    />

                    {/* Modal Mockup content */}
                    <div className="relative bg-white w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] border border-slate-100 animate-in zoom-in-95 fade-in duration-300 custom-scrollbar">
                        <div className="p-8 md:p-12">
                            <div className="flex items-center justify-between mb-10">
                                <div>
                                    <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                                        {editingId ? 'Editar Artigo' : 'Criar Novo Post'}
                                    </h2>
                                    <p className="text-slate-500 mt-1">Preencha os detalhes para publicar no portal.</p>
                                </div>
                                <button
                                    onClick={() => setIsEditing(false)}
                                    className="p-3 bg-slate-50 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-2xl transition-all"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="text-sm font-black text-slate-700 uppercase tracking-wider">Título do Artigo</label>
                                        <input
                                            type="text"
                                            value={formData.title}
                                            onChange={handleTitleChange}
                                            placeholder="Ex: As novas tendências de energia..."
                                            className="w-full px-5 py-4 rounded-2xl border-2 border-slate-100 focus:border-primary outline-none transition-all text-lg font-medium bg-slate-50/50"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-black text-slate-700 uppercase tracking-wider">Slug (URL amigável)</label>
                                        <input
                                            type="text"
                                            value={formData.slug}
                                            onChange={e => setFormData({ ...formData, slug: e.target.value })}
                                            className="w-full px-5 py-4 rounded-2xl border-2 border-slate-100 focus:border-primary outline-none transition-all bg-slate-100/50 text-slate-500 font-mono text-sm"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-black text-slate-700 uppercase tracking-wider">Categoria</label>
                                        <CustomSelect
                                            value={formData.category}
                                            options={dbCategories?.map(cat => ({ value: cat.name, label: cat.name })) || [
                                                { value: 'Tecnologia', label: 'Tecnologia' },
                                                { value: 'Energia', label: 'Energia' },
                                                { value: 'Regulação', label: 'Regulação' },
                                                { value: 'Marítimo', label: 'Marítimo' }
                                            ]}
                                            onChange={value => setFormData({ ...formData, category: value })}
                                            className="w-full"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-black text-slate-700 uppercase tracking-wider">Publicação</label>
                                        <CustomDatePicker
                                            value={formData.publishedAt}
                                            onChange={date => setFormData({ ...formData, publishedAt: date })}
                                            label=""
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-black text-slate-700 uppercase tracking-wider">Leitura</label>
                                        <input
                                            type="text"
                                            placeholder="5 min"
                                            value={formData.readTime}
                                            onChange={e => setFormData({ ...formData, readTime: e.target.value })}
                                            className="w-full px-5 py-4 rounded-2xl border-2 border-slate-100 focus:border-primary outline-none transition-all bg-slate-50/50 font-bold text-slate-700"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-black text-slate-700 uppercase tracking-wider">Resumo Rápido</label>
                                    <textarea
                                        value={formData.excerpt}
                                        onChange={e => setFormData({ ...formData, excerpt: e.target.value })}
                                        className="w-full px-5 py-4 rounded-2xl border-2 border-slate-100 focus:border-primary outline-none transition-all h-28 bg-slate-50/50 resize-none font-medium text-slate-600"
                                        placeholder="Uma breve descrição que aparecerá nos cards da lista..."
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-black text-slate-700 uppercase tracking-wider">Conteúdo Principal</label>
                                    <RichTextEditor
                                        value={formData.content}
                                        onChange={(content) => setFormData({ ...formData, content })}
                                        placeholder="Comece a escrever a sua história..."
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-black text-slate-700 uppercase tracking-wider">Imagem de Capa</label>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50/50 p-6 rounded-3xl border-2 border-dashed border-slate-200">
                                        <ImageUpload
                                            value={formData.imageUrl}
                                            onChange={(sid) => handleImageUpload(sid)}
                                            onRemove={() => setFormData(prev => ({ ...prev, storageId: undefined, imageUrl: '' }))}
                                        />
                                        <div className="flex flex-col justify-center gap-3">
                                            <label className="text-xs font-bold text-slate-400 uppercase">Link da Imagem</label>
                                            <input
                                                type="text"
                                                value={formData.imageUrl}
                                                onChange={e => setFormData({ ...formData, imageUrl: e.target.value })}
                                                placeholder="https://..."
                                                className="w-full px-4 py-3 rounded-xl border-2 border-slate-100 focus:border-primary outline-none text-sm font-mono"
                                                disabled={!!formData.storageId}
                                            />
                                            <p className="text-[10px] text-slate-400">Pode carregar um ficheiro ou colar um link direto.</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-end gap-4 pt-10 border-t border-slate-100">
                                    <button
                                        type="button"
                                        onClick={() => setIsEditing(false)}
                                        className="px-8 py-4 rounded-2xl font-black text-slate-400 hover:text-slate-900 transition-all uppercase tracking-widest text-xs"
                                    >
                                        Descartar Alterações
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-10 py-4 rounded-2xl font-black bg-primary text-white hover:bg-slate-800 transition-all shadow-xl shadow-primary/20 flex items-center gap-3 uppercase tracking-widest text-xs"
                                    >
                                        <Save size={18} />
                                        {editingId ? 'Atualizar Artigo' : 'Publicar Agora'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Content List Section - Always visible behind modal or by itself */}
            <div className={`transition-all duration-500 ${isEditing ? 'blur-sm grayscale opacity-30 select-none' : ''}`}>
                <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
                    <div className="p-6 border-b border-slate-100 flex items-center gap-4 bg-slate-50/30">
                        <div className="relative flex-1 max-w-sm">
                            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Procurar nos seus rascunhos..."
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-6 py-3 rounded-2xl border border-slate-200 focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all font-medium"
                            />
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50/50 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
                                <tr>
                                    <th className="p-6">Artigo</th>
                                    <th className="p-6">Autor & Data</th>
                                    <th className="p-6">Categoria</th>
                                    <th className="p-6 text-right">Ações</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filteredPosts?.map((post) => (
                                    <tr key={post._id} className="hover:bg-slate-50 transition-colors group">
                                        <td className="p-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-16 h-12 rounded-xl bg-slate-100 overflow-hidden relative shadow-inner">
                                                    <Image src={post.imageUrl || 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d'} alt={post.title} fill className="object-cover transition-transform group-hover:scale-110 duration-500" />
                                                </div>
                                                <div>
                                                    <p className="font-black text-slate-900 line-clamp-1 leading-none mb-1">{post.title}</p>
                                                    <p className="text-xs text-slate-400 line-clamp-1">{post.excerpt}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <div className="flex flex-col gap-1">
                                                <div className="flex items-center gap-2 text-slate-600 font-bold text-sm">
                                                    <User size={14} className="text-primary/60" />
                                                    {post.author}
                                                </div>
                                                <p className="text-[10px] font-black text-slate-300 uppercase tracking-wider">{new Date(post.publishedAt).toLocaleDateString('pt-PT', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <span className="px-4 py-1.5 rounded-full text-xs font-black bg-white border border-slate-100 text-slate-500 shadow-sm group-hover:bg-primary group-hover:text-white transition-all cursor-default uppercase tracking-wider">
                                                {post.category}
                                            </span>
                                        </td>
                                        <td className="p-6 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    onClick={() => handleEdit(post)}
                                                    className="p-3 bg-white hover:bg-blue-500 rounded-xl text-slate-400 hover:text-white transition-all shadow-sm border border-slate-100"
                                                    title="Editar"
                                                >
                                                    <Pencil size={18} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(post._id)}
                                                    className="p-3 bg-white hover:bg-red-500 rounded-xl text-slate-400 hover:text-white transition-all shadow-sm border border-slate-100"
                                                    title="Excluir"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {filteredPosts?.length === 0 && (
                            <div className="text-center py-24">
                                <p className="text-slate-400 font-bold text-xl">Nenhum artigo encontrado com esse nome.</p>
                                <p className="text-slate-300 text-sm mt-1">Tente usar palavras-chave diferentes.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
