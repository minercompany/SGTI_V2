'use client';

import { Settings, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AdminSettingsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-500 to-slate-600 flex items-center justify-center shadow-lg">
                        <Settings className="w-6 h-6 text-white" />
                    </div>
                    Configuración del Sistema
                </h1>
                <p className="text-muted-foreground mt-2">Ajustes generales de la plataforma</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 border border-gray-200">
                    <h3 className="font-bold text-lg mb-4">Configuración General</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Nombre del Sistema</label>
                            <input type="text" defaultValue="SGTI Enterprise" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Email de Notificaciones</label>
                            <input type="email" defaultValue="notificaciones@cooperativa.com.py" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 outline-none" />
                        </div>
                    </div>
                </div>

                <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 border border-gray-200">
                    <h3 className="font-bold text-lg mb-4">SLA y Tiempos</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Tiempo de Respuesta (horas)</label>
                            <input type="number" defaultValue="4" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Tiempo de Resolución (horas)</label>
                            <input type="number" defaultValue="24" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 outline-none" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-end">
                <Button className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600">
                    <Save className="w-4 h-4 mr-2" />
                    Guardar Cambios
                </Button>
            </div>
        </div>
    );
}
