"use client";

'use client';

import { useEffect, useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import { ticketService } from "@/services/ticketService";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, PieChart, BarChart } from "lucide-react";
import {
    PieChart as RePieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    BarChart as ReBarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend
} from "recharts";
import { motion } from "framer-motion";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

export function DashboardCharts({ customStats, isLoading: externalLoading }: { customStats?: any, isLoading?: boolean }) {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") || "" : "";

    const { data: internalStats, isLoading: internalLoading, isError } = useQuery({
        queryKey: ["dashboard-stats"],
        queryFn: () => ticketService.getStats(token),
        enabled: !!token && !customStats,
        refetchInterval: 60000,
    });

    const stats = customStats || internalStats;
    const isLoading = externalLoading || internalLoading;

    if (isLoading) {
        return (
            <div className="flex h-64 items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (!stats || (isError && !customStats)) {
        return <div className="text-center p-6 text-muted-foreground">No se pudieron cargar las estadísticas</div>;
    }

    // Transform maps to arrays for Recharts
    const statusData = Object.entries(stats.ticketsPorEstado || {}).map(([name, value]) => ({
        name,
        value,
    }));

    const priorityData = Object.entries(stats.ticketsPorPrioridad || {}).map(([name, value]) => ({
        name,
        value,
    }));

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
            >
                <Card className="h-[400px]">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <PieChart className="h-5 w-5 text-primary" />
                            Tickets por Estado
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="h-[320px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <RePieChart>
                                <Pie
                                    data={statusData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={100}
                                    fill="#8884d8"
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {statusData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                />
                                <Legend verticalAlign="bottom" height={36} />
                            </RePieChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
            >
                <Card className="h-[400px]">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <BarChart className="h-5 w-5 text-primary" />
                            Tickets por Prioridad
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="h-[320px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <ReBarChart
                                data={priorityData}
                                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                            >
                                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} />
                                <Tooltip
                                    cursor={{ fill: 'transparent' }}
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                />
                                <Bar dataKey="value" fill="#8884d8" radius={[4, 4, 0, 0]}>
                                    {priorityData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Bar>
                            </ReBarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="lg:col-span-2"
            >
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Total Tickets</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.totalTickets}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Tickets Abiertos</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-orange-500">{stats.ticketsAbiertos}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Promedio SLA</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-500">98.5%</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Satisfacción</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-blue-500">4.8/5</div>
                        </CardContent>
                    </Card>
                </div>
            </motion.div>
        </div>
    );
}
