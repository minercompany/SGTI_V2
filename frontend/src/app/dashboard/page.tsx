'use client'

import { motion } from 'framer-motion'
import {
    Ticket,
    Clock,
    AlertTriangle,
    CheckCircle2,
    TrendingUp,
    Users,
    BarChart3,
    ArrowUpRight,
    ArrowDownRight,
} from 'lucide-react'
import { DashboardCharts } from '@/components/dashboard/DashboardCharts'

const stats = [
    {
        name: 'Tickets Abiertos',
        value: '127',
        change: '+12%',
        changeType: 'increase',
        icon: Ticket,
        color: 'primary',
    },
    {
        name: 'En Proceso',
        value: '45',
        change: '-8%',
        changeType: 'decrease',
        icon: Clock,
        color: 'warning',
    },
    {
        name: 'SLA Vencidos',
        value: '8',
        change: '+2',
        changeType: 'increase',
        icon: AlertTriangle,
        color: 'danger',
    },
    {
        name: 'Resueltos Hoy',
        value: '23',
        change: '+18%',
        changeType: 'increase',
        icon: CheckCircle2,
        color: 'success',
    },
]

const recentTickets = [
    { id: 'SGTI-2024-00451', subject: 'Problema con acceso a plataforma', status: 'Abierto', priority: 'Alta', agent: 'Juan Pérez' },
    { id: 'SGTI-2024-00450', subject: 'Solicitud de extracto de cuenta', status: 'En Proceso', priority: 'Normal', agent: 'María García' },
    { id: 'SGTI-2024-00449', subject: 'Consulta sobre préstamo', status: 'En Proceso', priority: 'Baja', agent: 'Carlos López' },
    { id: 'SGTI-2024-00448', subject: 'Actualización de datos personales', status: 'Resuelto', priority: 'Normal', agent: 'Ana Martínez' },
    { id: 'SGTI-2024-00447', subject: 'Reclamo por cobro indebido', status: 'Abierto', priority: 'Urgente', agent: 'Sin asignar' },
]

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
}

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
}

export default function DashboardPage() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold">Dashboard</h1>
                    <p className="text-muted-foreground">
                        Bienvenido de vuelta. Aquí está el resumen de hoy.
                    </p>
                </div>
                <button className="btn-primary flex items-center gap-2">
                    <Ticket className="w-4 h-4" />
                    Nuevo Ticket
                </button>
            </div>

            {/* Stats Grid */}
            {/* Data Visualization */}
            <DashboardCharts />

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Tickets */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="lg:col-span-2 glass-card"
                >
                    <div className="p-5 border-b border-border flex items-center justify-between">
                        <h2 className="font-semibold">Tickets Recientes</h2>
                        <a href="/dashboard/tickets" className="text-sm text-primary hover:underline">
                            Ver todos
                        </a>
                    </div>
                    <div className="divide-y divide-border">
                        {recentTickets.map((ticket) => (
                            <div
                                key={ticket.id}
                                className="p-4 hover:bg-background-tertiary/50 transition-colors cursor-pointer"
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-mono text-muted-foreground">
                                                {ticket.id}
                                            </span>
                                            <span
                                                className={`
                          badge
                          ${ticket.priority === 'Urgente' ? 'badge-danger' : ''}
                          ${ticket.priority === 'Alta' ? 'badge-warning' : ''}
                          ${ticket.priority === 'Normal' ? 'badge-primary' : ''}
                          ${ticket.priority === 'Baja' ? 'bg-muted/20 text-muted-foreground' : ''}
                        `}
                                            >
                                                {ticket.priority}
                                            </span>
                                        </div>
                                        <p className="mt-1 font-medium truncate">{ticket.subject}</p>
                                        <p className="mt-1 text-sm text-muted-foreground">
                                            Asignado a: {ticket.agent}
                                        </p>
                                    </div>
                                    <span
                                        className={`
                      badge flex-shrink-0
                      ${ticket.status === 'Abierto' ? 'badge-success' : ''}
                      ${ticket.status === 'En Proceso' ? 'badge-warning' : ''}
                      ${ticket.status === 'Resuelto' ? 'bg-muted/20 text-muted-foreground' : ''}
                    `}
                                    >
                                        {ticket.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Performance */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="glass-card"
                >
                    <div className="p-5 border-b border-border">
                        <h2 className="font-semibold">Rendimiento del Equipo</h2>
                    </div>
                    <div className="p-5 space-y-4">
                        {/* SLA Compliance */}
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm text-muted-foreground">Cumplimiento SLA</span>
                                <span className="text-sm font-semibold text-success">87%</span>
                            </div>
                            <div className="h-2 bg-background-tertiary rounded-full overflow-hidden">
                                <div className="h-full w-[87%] bg-gradient-to-r from-success to-emerald-400 rounded-full" />
                            </div>
                        </div>

                        {/* Response Time */}
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm text-muted-foreground">Tiempo de Respuesta</span>
                                <span className="text-sm font-semibold text-primary">2.4h</span>
                            </div>
                            <div className="h-2 bg-background-tertiary rounded-full overflow-hidden">
                                <div className="h-full w-[65%] bg-gradient-to-r from-primary to-violet-400 rounded-full" />
                            </div>
                        </div>

                        {/* Resolution Time */}
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm text-muted-foreground">Tiempo de Resolución</span>
                                <span className="text-sm font-semibold text-warning">18.5h</span>
                            </div>
                            <div className="h-2 bg-background-tertiary rounded-full overflow-hidden">
                                <div className="h-full w-[72%] bg-gradient-to-r from-warning to-amber-400 rounded-full" />
                            </div>
                        </div>

                        {/* CSAT */}
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm text-muted-foreground">Satisfacción (CSAT)</span>
                                <span className="text-sm font-semibold text-success">4.6/5</span>
                            </div>
                            <div className="h-2 bg-background-tertiary rounded-full overflow-hidden">
                                <div className="h-full w-[92%] bg-gradient-to-r from-success to-emerald-400 rounded-full" />
                            </div>
                        </div>
                    </div>

                    <div className="p-5 border-t border-border">
                        <a
                            href="/dashboard/reports"
                            className="flex items-center justify-center gap-2 text-sm text-primary hover:underline"
                        >
                            <BarChart3 className="w-4 h-4" />
                            Ver reportes completos
                        </a>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}
