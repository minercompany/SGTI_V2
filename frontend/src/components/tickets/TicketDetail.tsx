"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ticketService } from "@/services/ticketService";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/input";
import {
    Loader2,
    ArrowLeft,
    Send,
    Clock,
    User,
    Building2,
    Tag,
    AlertCircle,
    MessageSquare
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { motion } from "framer-motion";

export function TicketDetail({ id }: { id: string }) {
    const [comment, setComment] = useState("");
    const queryClient = useQueryClient();
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') || '' : '';

    const { data: ticket, isLoading, isError, error } = useQuery({
        queryKey: ["ticket", id],
        queryFn: () => ticketService.getTicketById(id, token),
        enabled: !!token,
    });

    const mutation = useMutation({
        mutationFn: (newComment: string) => ticketService.addResponse(id, newComment, token),
        onSuccess: () => {
            toast.success("Respuesta agregada");
            setComment("");
            queryClient.invalidateQueries({ queryKey: ["ticket", id] });
        },
        onError: (err) => {
            toast.error("Error al agregar respuesta", { description: (err as Error).message });
        }
    });

    if (isLoading) return <div className="flex h-96 items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
    if (isError) return <div className="text-destructive text-center py-10">Error: {(error as Error).message}</div>;
    if (!ticket) return <div className="text-center py-10">Ticket no encontrado</div>;

    return (
        <div className="space-y-6 max-w-5xl mx-auto pb-10">
            {/* Header */}
            <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                    <div className="flex items-center gap-2 text-muted-foreground mb-2">
                        <Link href="/dashboard/tickets" className="hover:text-primary transition-colors flex items-center gap-1">
                            <ArrowLeft className="h-4 w-4" /> Volver
                        </Link>
                        <span>•</span>
                        <span>{ticket.numero}</span>
                    </div>
                    <h1 className="text-3xl font-bold text-foreground">{ticket.asunto}</h1>
                    <div className="flex items-center gap-3 pt-2">
                        <Badge style={{ backgroundColor: `${ticket.estado.colorHex}15`, color: ticket.estado.colorHex, borderColor: `${ticket.estado.colorHex}30` }} className="border px-3 py-1">
                            {ticket.estado.nombre}
                        </Badge>
                        <Badge style={{ backgroundColor: `${ticket.prioridad.colorHex}15`, color: ticket.prioridad.colorHex, borderColor: `${ticket.prioridad.colorHex}30` }} className="border px-3 py-1">
                            <AlertCircle className="w-3 h-3 mr-1" />
                            {ticket.prioridad.nombre}
                        </Badge>
                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {formatDate(ticket.fechaCreacion)}
                        </span>
                    </div>
                </div>

                {/* Actions (Mock) */}
                <div className="flex gap-2">
                    {/* Add action buttons here later */}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Description Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-card/50 backdrop-blur-sm border rounded-xl p-6 shadow-sm"
                    >
                        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                            <MessageSquare className="w-4 h-4 text-primary" />
                            Descripción
                        </h3>
                        <p className="text-foreground/90 whitespace-pre-wrap leading-relaxed">
                            {ticket.descripcion}
                        </p>
                    </motion.div>

                    {/* Activity / Comments */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold px-1">Actividad</h3>

                        {/* Timeline */}
                        <div className="relative space-y-6 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
                            {ticket.historial?.map((evento: any, index: number) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
                                >
                                    {/* Icon */}
                                    <div className="flex items-center justify-center w-10 h-10 rounded-full border border-border bg-background shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                                        <div className="w-2.5 h-2.5 bg-primary rounded-full animate-pulse" />
                                    </div>

                                    {/* Content */}
                                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-card border rounded-xl p-4 shadow-sm">
                                        <div className="flex items-center justify-between space-x-2 mb-1">
                                            <div className="font-bold text-foreground text-sm">{evento.tipoAccion}</div>
                                            <time className="font-caveat font-medium text-xs text-muted-foreground">{formatDate(evento.timestamp)}</time>
                                        </div>
                                        <div className="text-sm text-foreground/80">
                                            {evento.comentario} <span className="text-primary font-medium"> @{evento.usuario?.nombreCompleto || 'Sistema'}</span>
                                            {evento.valorAnterior && (
                                                <div className="mt-2 text-xs bg-muted/50 p-2 rounded border border-border/50">
                                                    <span className="text-muted-foreground line-through mr-2">{evento.valorAnterior}</span>
                                                    <span className="text-foreground">→ {evento.valorNuevo}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Response Input */}
                        <div className="mt-8 bg-card border rounded-xl p-4 shadow-sm">
                            <h4 className="text-sm font-medium mb-2">Agregar Respuesta / Nota</h4>
                            <Textarea
                                placeholder="Escribe una respuesta..."
                                className="min-h-[100px] mb-3"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            />
                            <div className="flex justify-end">
                                <Button
                                    onClick={() => mutation.mutate(comment)}
                                    disabled={!comment.trim() || mutation.isPending}
                                    className="bg-primary hover:bg-primary/90"
                                >
                                    {mutation.isPending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Send className="w-4 h-4 mr-2" />}
                                    Enviar Respuesta
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-card/50 backdrop-blur-sm border rounded-xl p-6 shadow-sm space-y-6"
                    >
                        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Detalles</h3>

                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <Building2 className="w-5 h-5 text-muted-foreground mt-0.5" />
                                <div>
                                    <p className="text-sm font-medium">Departamento</p>
                                    <p className="text-sm text-muted-foreground">{ticket.departamento.nombre}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <Tag className="w-5 h-5 text-muted-foreground mt-0.5" />
                                <div>
                                    <p className="text-sm font-medium">Categoría</p>
                                    <p className="text-sm text-muted-foreground">{ticket.categoria?.nombre || 'General'}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <User className="w-5 h-5 text-muted-foreground mt-0.5" />
                                <div>
                                    <p className="text-sm font-medium">Solicitante</p>
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-[10px] text-white font-bold">
                                            {ticket.solicitante.nombreCompleto.charAt(0)}
                                        </div>
                                        <p className="text-sm text-muted-foreground">{ticket.solicitante.nombreCompleto}</p>
                                    </div>
                                    <p className="text-xs text-muted-foreground ml-8">{ticket.solicitante.email}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <User className="w-5 h-5 text-muted-foreground mt-0.5" />
                                <div>
                                    <p className="text-sm font-medium">Agente Asignado</p>
                                    {ticket.agente ? (
                                        <div className="flex items-center gap-2">
                                            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-[10px] text-white font-bold">
                                                {ticket.agente.nombreCompleto.charAt(0)}
                                            </div>
                                            <p className="text-sm text-muted-foreground">{ticket.agente.nombreCompleto}</p>
                                        </div>
                                    ) : (
                                        <span className="text-sm text-muted-foreground italic">Sin asignar</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
