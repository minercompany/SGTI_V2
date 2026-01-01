'use client';

import { ClipboardList, Plus, Filter, Calendar, User, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { modulesService } from '@/services/modulesService';

export default function TasksPage() {
    const [filter, setFilter] = useState('all');

    const { data: tasks = [], isLoading } = useQuery({
        queryKey: ['tasks'],
        queryFn: modulesService.getTasks
    });

    const filteredTasks = tasks.filter((task: any) => {
        if (filter === 'all') return true;
        return task.status === filter;
    });

    const stats = [
        { label: 'Pendientes', value: tasks.filter((t: any) => t.status === 'pending').length.toString(), color: 'text-orange-600' },
        { label: 'En Progreso', value: tasks.filter((t: any) => t.status === 'in_progress').length.toString(), color: 'text-blue-600' },
        { label: 'Completadas', value: tasks.filter((t: any) => t.status === 'completed').length.toString(), color: 'text-green-600' },
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center shadow-lg">
                            <ClipboardList className="w-6 h-6 text-white" />
                        </div>
                        Tareas
                    </h1>
                    <p className="text-muted-foreground mt-2">Gestiona tus tareas y asignaciones</p>
                </div>
                <Button className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 shadow-lg">
                    <Plus className="w-4 h-4 mr-2" />
                    Nueva Tarea
                </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 border border-gray-200 shadow-sm">
                        <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                        <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* Filters */}
            <div className="flex gap-2 flex-wrap">
                {['all', 'pending', 'in_progress', 'completed'].map((f) => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-4 py-2 rounded-lg font-medium transition-all ${filter === f
                            ? 'bg-green-500 text-white shadow-md'
                            : 'bg-white/80 text-gray-700 hover:bg-gray-100'
                            }`}
                    >
                        {f === 'all' ? 'Todas' : f === 'pending' ? 'Pendientes' : f === 'in_progress' ? 'En Progreso' : 'Completadas'}
                    </button>
                ))}
            </div>

            {/* Tasks List */}
            <div className="space-y-3">
                {isLoading ? (
                    <div className="text-center py-8 text-muted-foreground">Cargando tareas...</div>
                ) : filteredTasks.map((task: any) => (
                    <div
                        key={task.id}
                        className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all"
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <h3 className="text-lg font-semibold text-foreground">{task.title}</h3>
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${task.priority === 'high' ? 'bg-red-100 text-red-700' :
                                        task.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                                            'bg-green-100 text-green-700'
                                        }`}>
                                        {task.priority === 'high' ? 'Alta' : task.priority === 'medium' ? 'Media' : 'Baja'}
                                    </span>
                                </div>
                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                    <div className="flex items-center gap-1">
                                        <User className="w-4 h-4" />
                                        {task.assignedTo}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Calendar className="w-4 h-4" />
                                        {task.dueDate}
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Button variant="outline" size="sm">Ver Detalles</Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
