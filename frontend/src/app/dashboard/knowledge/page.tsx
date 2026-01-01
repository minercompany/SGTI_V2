'use client';

import { BookOpen, Plus, Search, Book, FileText, Video, Link as LinkIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { modulesService } from '@/services/modulesService';

export default function KnowledgePage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('all');

    const { data: articles = [], isLoading } = useQuery({
        queryKey: ['knowledge'],
        queryFn: modulesService.getKnowledge
    });

    const filteredArticles = articles.filter((article: any) => {
        const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = category === 'all' || article.category === category;
        return matchesSearch && matchesCategory;
    });

    const categories = ['all', 'Créditos', 'Ahorros', 'Soporte', 'General'];

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'article': return FileText;
            case 'video': return Video;
            case 'document': return Book;
            default: return FileText;
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center shadow-lg">
                            <BookOpen className="w-6 h-6 text-white" />
                        </div>
                        Knowledge Base
                    </h1>
                    <p className="text-muted-foreground mt-2">Base de conocimiento y documentación</p>
                </div>
                <Button className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 shadow-lg">
                    <Plus className="w-4 h-4 mr-2" />
                    Nuevo Artículo
                </Button>
            </div>

            {/* Search */}
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-4 border border-gray-200">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Buscar artículos, guías, tutoriales..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 outline-none transition-all"
                    />
                </div>
            </div>

            {/* Categories */}
            <div className="flex gap-2 flex-wrap">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setCategory(cat)}
                        className={`px-4 py-2 rounded-lg font-medium transition-all ${category === cat
                            ? 'bg-green-500 text-white shadow-md'
                            : 'bg-white/80 text-gray-700 hover:bg-gray-100'
                            }`}
                    >
                        {cat === 'all' ? 'Todos' : cat}
                    </button>
                ))}
            </div>

            {/* Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {isLoading ? (
                    <div className="col-span-3 text-center py-8 text-muted-foreground">Cargando artículos...</div>
                ) : filteredArticles.map((article: any) => {
                    const Icon = getTypeIcon(article.type);
                    return (
                        <div
                            key={article.id}
                            className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all cursor-pointer group"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <Icon className="w-6 h-6 text-white" />
                                </div>
                                <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                                    {article.category}
                                </span>
                            </div>

                            <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-green-600 transition-colors">
                                {article.title}
                            </h3>

                            <div className="flex items-center justify-between text-sm text-muted-foreground">
                                <span>{article.views} vistas</span>
                                <span>{article.author}</span>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Popular Articles */}
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 border border-gray-200">
                <h2 className="text-xl font-bold text-foreground mb-4">Artículos Más Vistos</h2>
                <div className="space-y-3">
                    {articles.sort((a: any, b: any) => b.views - a.views).slice(0, 3).map((article: any, index: number) => (
                        <div key={article.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
                            <div className="w-8 h-8 rounded-lg bg-green-100 text-green-700 font-bold flex items-center justify-center">
                                {index + 1}
                            </div>
                            <div className="flex-1">
                                <h4 className="font-medium text-foreground">{article.title}</h4>
                                <p className="text-sm text-muted-foreground">{article.views} vistas</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
