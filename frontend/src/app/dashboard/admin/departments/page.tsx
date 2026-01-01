'use client';

import { Building2, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AdminDepartmentsPage() {
    const departments = [
        { id: 1, name: 'Soporte Técnico', agents: 12, tickets: 145, avgResponseTime: '2.5h' },
        { id: 2, name: 'Créditos', agents: 8, tickets: 89, avgResponseTime: '4.2h' },
        { id: 3, name: 'Recursos Humanos', agents: 5, tickets: 34, avgResponseTime: '6.1h' },
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg">
                            <Building2 className="w-6 h-6 text-white" />
                        </div>
                        Departamentos
                    </h1>
                    <p className="text-muted-foreground mt-2">Gestiona los departamentos de la cooperativa</p>
                </div>
                <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600">
                    <Plus className="w-4 h-4 mr-2" />
                    Nuevo Departamento
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {departments.map((dept) => (
                    <div key={dept.id} className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 border border-gray-200 shadow-sm">
                        <h3 className="text-xl font-bold mb-4">{dept.name}</h3>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Agentes:</span>
                                <span className="font-semibold">{dept.agents}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Tickets:</span>
                                <span className="font-semibold">{dept.tickets}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Tiempo Promedio:</span>
                                <span className="font-semibold">{dept.avgResponseTime}</span>
                            </div>
                        </div>
                        <Button variant="outline" className="w-full mt-4">Configurar</Button>
                    </div>
                ))}
            </div>
        </div>
    );
}
