"use client";

import { useQuery } from "@tanstack/react-query";
import { authService } from "@/services/authService";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Mail, Phone, Building2, Calendar, Shield, Ticket, CheckCircle, Clock } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { motion } from "framer-motion";

export function UserProfile() {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') || '' : '';

    const { data: user, isLoading, isError, error } = useQuery({
        queryKey: ["profile"],
        queryFn: () => authService.getProfile(token),
        enabled: !!token,
    });

    if (isLoading) {
        return (
            <div className="flex h-96 items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex h-96 items-center justify-center text-destructive">
                Error al cargar perfil: {(error as Error).message}
            </div>
        );
    }

    if (!user) return null;

    const initials = user.nombreCompleto
        .split(' ')
        .map(n => n[0])
        .join('')
        .substring(0, 2)
        .toUpperCase();

    // Mock recent activity for now
    const activities = [
        { id: 1, action: "Inicio de sesión exitoso", date: new Date().toISOString() },
        { id: 2, action: "Creación de Ticket #SGTI-2025-001", date: new Date(Date.now() - 86400000).toISOString() },
    ];

    return (
        <div className="space-y-6 max-w-5xl mx-auto pb-10">
            {/* Header Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Card className="border-none shadow-lg bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-950 overflow-hidden relative">
                    <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-primary/20 to-violet-500/20" />
                    <CardContent className="pt-12 px-8 pb-8 relative z-10">
                        <div className="flex flex-col md:flex-row items-center md:items-end gap-6">
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="relative"
                            >
                                <Avatar className="w-32 h-32 border-4 border-background shadow-xl">
                                    <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.nombreCompleto}`} />
                                    <AvatarFallback className="text-2xl font-bold bg-primary/10 text-primary">
                                        {initials}
                                    </AvatarFallback>
                                </Avatar>
                                <div className={`absolute bottom-2 right-2 w-6 h-6 rounded-full border-4 border-background ${user.activo ? 'bg-green-500' : 'bg-gray-400'}`} />
                            </motion.div>

                            <div className="flex-1 text-center md:text-left space-y-2 mb-2">
                                <h1 className="text-3xl font-bold text-foreground">{user.nombreCompleto}</h1>
                                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-sm text-muted-foreground">
                                    <span className="flex items-center gap-1">
                                        <Building2 className="w-4 h-4" />
                                        {user.departamento}
                                    </span>
                                    <span>•</span>
                                    <span className="flex items-center gap-1">
                                        <Mail className="w-4 h-4" />
                                        {user.email}
                                    </span>
                                    <span>•</span>
                                    <Badge variant="secondary" className="px-3 py-0.5 text-xs font-semibold uppercase tracking-wider bg-primary/10 text-primary hover:bg-primary/20">
                                        {user.rol}
                                    </Badge>
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <Button variant="outline">Editar Perfil</Button>
                                <Button>Cambiar Contraseña</Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                    { label: "Tickets Creados", value: user.ticketsCreados, icon: Ticket, color: "text-blue-500", bg: "bg-blue-500/10" },
                    { label: "Tickets Asignados", value: user.ticketsAsignados, icon: Shield, color: "text-violet-500", bg: "bg-violet-500/10" },
                    { label: "Días Activo", value: "124", icon: Clock, color: "text-emerald-500", bg: "bg-emerald-500/10" },
                ].map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * i + 0.3 }}
                    >
                        <Card>
                            <CardContent className="p-6 flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                                    <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                                </div>
                                <div className={`p-3 rounded-full ${stat.bg} ${stat.color}`}>
                                    <stat.icon className="w-6 h-6" />
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>

            {/* Detailed Info Tabs */}
            <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto md:mx-0">
                    <TabsTrigger value="overview">Información</TabsTrigger>
                    <TabsTrigger value="activity">Actividad</TabsTrigger>
                    <TabsTrigger value="settings">Preferencias</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Detalles Personales</CardTitle>
                            <CardDescription>Información registrada en el sistema.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-muted-foreground">Nombre Completo</label>
                                    <p className="font-medium">{user.nombreCompleto}</p>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-muted-foreground">Correo Electrónico</label>
                                    <p className="font-medium">{user.email}</p>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-muted-foreground">Teléfono</label>
                                    <p className="font-medium">{user.telefono || 'No registrado'}</p>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-muted-foreground">Cédula</label>
                                    <p className="font-medium">{user.cedula || 'No registrada'}</p>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-muted-foreground">Último Acceso</label>
                                    <p className="font-medium flex items-center gap-2">
                                        <Calendar className="w-4 h-4 text-muted-foreground" />
                                        {user.ultimoAcceso ? formatDate(user.ultimoAcceso) : 'Nunca'}
                                    </p>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-muted-foreground">Estado</label>
                                    <div className="flex items-center gap-2">
                                        <CheckCircle className={`w-4 h-4 ${user.activo ? 'text-green-500' : 'text-red-500'}`} />
                                        <p className="font-medium">{user.activo ? 'Cuenta Activa' : 'Cuenta Inactiva'}</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="activity" className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Actividad Reciente</CardTitle>
                            <CardDescription>Tus últimas acciones en el sistema.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-8">
                                {activities.map((activity, i) => (
                                    <div key={i} className="flex">
                                        <div className="flex flex-col items-center mr-4">
                                            <div className="w-[1px] h-full bg-border" />
                                            <div className="w-2 h-2 rounded-full bg-primary my-1" />
                                            <div className="w-[1px] h-full bg-border" />
                                        </div>
                                        <div className="pb-8">
                                            <p className="font-medium">{activity.action}</p>
                                            <p className="text-sm text-muted-foreground">{formatDate(activity.date)}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="settings" className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Configuración</CardTitle>
                            <CardDescription>Administra tus preferencias de cuenta.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground text-sm italic">Próximamente: Configuración de notificaciones y tema.</p>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
