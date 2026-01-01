'use client';

import { Users, Plus, Search, UserCheck, UserX, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { modulesService } from '@/services/modulesService';

export default function SociosPage() {
    const [searchTerm, setSearchTerm] = useState('');

    const { data: socios = [], isLoading } = useQuery({
        queryKey: ['socios'],
        queryFn: modulesService.getSocios
    });

    const filteredSocios = socios.filter((s: any) =>
        s.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.cedula.includes(searchTerm)
    );

    const stats = [
        { label: 'Total Socios', value: socios.length.toString(), icon: Users, color: 'from-green-500 to-teal-500' },
        { label: 'Activos', value: socios.filter((s: any) => s.estado === 'Activo').length.toString(), icon: UserCheck, color: 'from-blue-500 to-cyan-500' },
        { label: 'Inactivos', value: socios.filter((s: any) => s.estado !== 'Activo').length.toString(), icon: UserX, color: 'from-orange-500 to-amber-500' },
        { label: 'Nuevos (mes)', value: '+47', icon: TrendingUp, color: 'from-purple-500 to-pink-500' },
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center shadow-lg">
                            <Users className="w-6 h-6 text-white" />
                        </div>
                        Socios
                    </h1>
                    <p className="text-muted-foreground mt-2">Gestión de socios de la cooperativa</p>
                </div>
                <Button className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 shadow-lg">
                    <Plus className="w-4 h-4 mr-2" />
                    Nuevo Socio
                </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <div key={index} className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 border border-gray-200 shadow-sm">
                            <div className="flex items-center justify-between mb-3">
                                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                                    <Icon className="w-5 h-5 text-white" />
                                </div>
                            </div>
                            <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                        </div>
                    );
                })}
            </div>

            {/* Search */}
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-4 border border-gray-200">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Buscar por nombre, cédula..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 outline-none transition-all"
                    />
                </div>
            </div>

            {/* Socios Table */}
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Nombre</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Cédula</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Estado</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Ahorros</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Créditos</th>
                                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {isLoading ? (
                                <tr>
                                    <td colSpan={6} className="text-center py-8 text-muted-foreground">Cargando socios...</td>
                                </tr>
                            ) : filteredSocios.map((socio: any) => (
                                <tr key={socio.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="font-medium text-foreground">{socio.nombre}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                                        {socio.cedula}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${socio.estado === 'Activo' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                                            }`}>
                                            {socio.estado}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground">
                                        {socio.ahorros}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                                        {socio.creditos}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right">
                                        <Button variant="outline" size="sm">Ver Perfil</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
