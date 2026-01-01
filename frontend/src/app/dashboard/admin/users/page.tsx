'use client';

import { Users, Plus, Search, Shield, UserCheck, UserX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default function AdminUsersPage() {
    const users = [
        { id: 1, name: 'Admin System', email: 'admin@cooperativa.com.py', role: 'SUPER_ADMIN', status: 'Activo', department: 'TI' },
        { id: 2, name: 'Juan Pérez', email: 'juan.perez@cooperativa.com.py', role: 'AGENT', status: 'Activo', department: 'Soporte' },
        { id: 3, name: 'María González', email: 'maria.gonzalez@cooperativa.com.py', role: 'MANAGER', status: 'Activo', department: 'Créditos' },
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                            <Users className="w-6 h-6 text-white" />
                        </div>
                        Gestión de Usuarios
                    </h1>
                    <p className="text-muted-foreground mt-2">Administra usuarios del sistema</p>
                </div>
                <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                    <Plus className="w-4 h-4 mr-2" />
                    Nuevo Usuario
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 border border-gray-200">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                            <Users className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Total Usuarios</p>
                            <p className="text-2xl font-bold">156</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 border border-gray-200">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                            <UserCheck className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Activos</p>
                            <p className="text-2xl font-bold">142</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 border border-gray-200">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                            <Shield className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Administradores</p>
                            <p className="text-2xl font-bold">8</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white/80 backdrop-blur-lg rounded-2xl border border-gray-200 overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Nombre</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Email</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Rol</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Departamento</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Estado</th>
                            <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {users.map((user) => (
                            <tr key={user.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 font-medium">{user.name}</td>
                                <td className="px-6 py-4 text-sm text-muted-foreground">{user.email}</td>
                                <td className="px-6 py-4">
                                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700">
                                        {user.role}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm">{user.department}</td>
                                <td className="px-6 py-4">
                                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                                        {user.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <Button variant="outline" size="sm">Editar</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
