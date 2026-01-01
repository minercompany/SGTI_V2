"use client";


import { useEffect, useState } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { ticketService, Ticket } from "@/services/ticketService";
import { formatCurrency, formatDate } from "@/lib/utils";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Loader2,
    Plus,
    Search,
    Filter,
    MoreVertical,
    ArrowUpRight
} from "lucide-react";
import { motion } from "framer-motion";

export function TicketList() {
    const [page, setPage] = useState(0);
    const [statusId, setStatusId] = useState<string>("");
    const [priorityId, setPriorityId] = useState<string>("");

    // Mock token retrieval - replace with actual auth logic
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') || '' : '';

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["tickets", page, statusId, priorityId],
        queryFn: () => ticketService.listTickets(page, 10, { estadoId: statusId, prioridadId: priorityId }, token),
        enabled: !!token,
    });

    // Mock data for filters (should fetch from API)
    const STATUSES = [
        { id: '', nombre: 'Todos los Estados' },
        { id: '1', nombre: 'Abierto' },
        { id: '2', nombre: 'En Proceso' },
        { id: '3', nombre: 'Resuelto' },
        { id: '4', nombre: 'Cerrado' },
    ];

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
                Error al cargar tickets: {(error as Error).message}
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header Actions */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="relative flex-1 md:max-w-sm">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                        placeholder="Buscar tickets..."
                        className="h-10 w-full rounded-full border border-input bg-background pl-10 pr-4 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <select
                        className="h-10 rounded-full border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        value={statusId}
                        onChange={(e) => setStatusId(e.target.value)}
                    >
                        <option value="">Todos los Estados</option>
                        {/* Note: In a real app, fetch these IDs dynamically */}
                    </select>

                    <Link href="/dashboard/tickets/create">
                        <Button className="h-10 rounded-full bg-gradient-to-r from-primary to-violet-600 shadow-lg shadow-primary/25 hover:shadow-primary/40">
                            <Plus className="mr-2 h-4 w-4" />
                            Nuevo Ticket
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Table */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="rounded-xl border bg-card/50 shadow-sm backdrop-blur-sm"
            >
                <Table>
                    <TableHeader>
                        <TableRow className="hover:bg-transparent">
                            <TableHead className="w-[100px]">ID</TableHead>
                            <TableHead>Asunto</TableHead>
                            <TableHead>Departamento</TableHead>
                            <TableHead>Estado</TableHead>
                            <TableHead>Prioridad</TableHead>
                            <TableHead>Solicitante</TableHead>
                            <TableHead className="text-right">Fecha</TableHead>
                            <TableHead className="w-[50px]"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data?.content.map((ticket, index) => (
                            <Link key={ticket.id} href={`/dashboard/tickets/${ticket.id}`} legacyBehavior>
                                <TableRow className="group cursor-pointer hover:bg-muted/50">
                                    <TableCell className="font-medium text-primary">
                                        {ticket.numero}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-col">
                                            <span className="font-medium text-foreground">{ticket.asunto}</span>
                                            <span className="text-xs text-muted-foreground line-clamp-1">
                                                {ticket.descripcion}
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className="bg-background/50">
                                            {ticket.departamento.nombre}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            style={{
                                                backgroundColor: `${ticket.estado.colorHex}15`,
                                                color: ticket.estado.colorHex,
                                                borderColor: `${ticket.estado.colorHex}30`
                                            }}
                                            className="border"
                                        >
                                            {ticket.estado.nombre}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            style={{
                                                backgroundColor: `${ticket.prioridad.colorHex}15`,
                                                color: ticket.prioridad.colorHex,
                                                borderColor: `${ticket.prioridad.colorHex}30`
                                            }}
                                            className="border"
                                        >
                                            {ticket.prioridad.nombre}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium text-primary">
                                                {ticket.solicitante.nombreCompleto.charAt(0)}
                                            </div>
                                            <span className="text-sm">{ticket.solicitante.nombreCompleto}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right text-muted-foreground text-xs">
                                        {formatDate(ticket.fechaCreacion)}
                                    </TableCell>
                                    <TableCell>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <ArrowUpRight className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            </Link>
                        ))}
                    </TableBody>
                </Table>

                <div className="p-4 border-t text-xs text-muted-foreground flex justify-between items-center">
                    <span>
                        Mostrando {data?.numberOfElements} de {data?.totalElements} tickets
                    </span>
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            disabled={data?.first}
                            onClick={() => setPage(p => Math.max(0, p - 1))}
                        >
                            Anterior
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            disabled={data?.last}
                            onClick={() => setPage(p => p + 1)}
                        >
                            Siguiente
                        </Button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
