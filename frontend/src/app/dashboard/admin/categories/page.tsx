'use client';

import { Folder, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AdminCategoriesPage() {
    const categories = [
        { id: 1, name: 'Soporte Técnico', tickets: 245, color: 'bg-blue-500' },
        { id: 2, name: 'Consulta General', tickets: 189, color: 'bg-green-500' },
        { id: 3, name: 'Problema de Acceso', tickets: 98, color: 'bg-orange-500' },
        { id: 4, name: 'Solicitud de Cambio', tickets: 76, color: 'bg-purple-500' },
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-lg">
                            <Folder className="w-6 h-6 text-white" />
                        </div>
                        Categorías
                    </h1>
                    <p className="text-muted-foreground mt-2">Gestiona las categorías de tickets</p>
                </div>
                <Button className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600">
                    <Plus className="w-4 h-4 mr-2" />
                    Nueva Categoría
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {categories.map((cat) => (
                    <div key={cat.id} className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 border border-gray-200 flex items-center gap-4">
                        <div className={`w-16 h-16 rounded-xl ${cat.color} flex items-center justify-center text-white font-bold text-xl`}>
                            {cat.tickets}
                        </div>
                        <div className="flex-1">
                            <h3 className="font-bold text-lg">{cat.name}</h3>
                            <p className="text-sm text-muted-foreground">{cat.tickets} tickets registrados</p>
                        </div>
                        <Button variant="outline" size="sm">Editar</Button>
                    </div>
                ))}
            </div>
        </div>
    );
}
