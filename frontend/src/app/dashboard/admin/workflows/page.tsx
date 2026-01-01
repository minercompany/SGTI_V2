'use client';

import { Zap, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AdminWorkflowsPage() {
    const workflows = [
        { id: 1, name: 'Aprobación de Crédito', steps: 5, active: true },
        { id: 2, name: 'Escalamiento Automático', steps: 3, active: true },
        { id: 3, name: 'Cierre de Ticket', steps: 4, active: false },
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center shadow-lg">
                            <Zap className="w-6 h-6 text-white" />
                        </div>
                        Workflows
                    </h1>
                    <p className="text-muted-foreground mt-2">Automatiza procesos y flujos de trabajo</p>
                </div>
                <Button className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600">
                    <Plus className="w-4 h-4 mr-2" />
                    Nuevo Workflow
                </Button>
            </div>

            <div className="space-y-4">
                {workflows.map((workflow) => (
                    <div key={workflow.id} className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-xl font-bold">{workflow.name}</h3>
                                <p className="text-sm text-muted-foreground">{workflow.steps} pasos configurados</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${workflow.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                                    }`}>
                                    {workflow.active ? 'Activo' : 'Inactivo'}
                                </span>
                                <Button variant="outline">Configurar</Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
