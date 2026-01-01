'use client';

import { Shield, Search } from 'lucide-react';
import { useState } from 'react';

export default function AdminAuditPage() {
    const [searchTerm, setSearchTerm] = useState('');

    const auditLogs = [
        { id: 1, user: 'admin@cooperativa.com.py', action: 'Creación de usuario', resource: 'Usuario: Juan Pérez', timestamp: '2025-01-01 10:30:45', ip: '192.168.1.100' },
        { id: 2, user: 'admin@cooperativa.com.py', action: 'Modificación de ticket', resource: 'Ticket #1234', timestamp: '2025-01-01 09:15:22', ip: '192.168.1.100' },
        { id: 3, user: 'maria.gonzalez@cooperativa.com.py', action: 'Exportación de reporte', resource: 'Reporte Mensual', timestamp: '2024-12-31 16:45:10', ip: '192.168.1.105' },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-rose-500 flex items-center justify-center shadow-lg">
                        <Shield className="w-6 h-6 text-white" />
                    </div>
                    Auditoría
                </h1>
                <p className="text-muted-foreground mt-2">Registro de todas las acciones del sistema</p>
            </div>

            <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-4 border border-gray-200">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Buscar en logs de auditoría..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 outline-none transition-all"
                    />
                </div>
            </div>

            <div className="bg-white/80 backdrop-blur-lg rounded-2xl border border-gray-200 overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Usuario</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Acción</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Recurso</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Fecha/Hora</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">IP</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {auditLogs.map((log) => (
                            <tr key={log.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium">{log.user}</td>
                                <td className="px-6 py-4 text-sm">{log.action}</td>
                                <td className="px-6 py-4 text-sm text-muted-foreground">{log.resource}</td>
                                <td className="px-6 py-4 text-sm">{log.timestamp}</td>
                                <td className="px-6 py-4 text-sm font-mono text-muted-foreground">{log.ip}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
