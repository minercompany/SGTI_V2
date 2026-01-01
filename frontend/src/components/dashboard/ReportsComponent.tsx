"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ticketService } from "@/services/ticketService";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import {
    Calendar as CalendarIcon,
    FileSpreadsheet,
    FileText,
    RefreshCcw,
    Loader2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { DashboardCharts } from "@/components/dashboard/DashboardCharts";
import { ExportReportDialog } from "@/components/dashboard/ExportReportDialog";


export function ReportsComponent() {

    const [date, setDate] = useState<Date | undefined>(new Date());
    const [isExporting, setIsExporting] = useState(false);

    const token = typeof window !== 'undefined' ? localStorage.getItem('token') || '' : '';

    // Calculate start and end of selected date for precise filtering
    const startDate = date ? new Date(date.setHours(0, 0, 0, 0)) : undefined;
    const endDate = date ? new Date(date.setHours(23, 59, 59, 999)) : undefined;

    const { data: ticketData, isLoading: isLoadingTickets, refetch: refetchTickets } = useQuery({
        queryKey: ["tickets-report", date],
        queryFn: () => ticketService.listTickets(0, 50, {}, token), // TODO: Add date params to listTickets
        enabled: !!token,
    });

    const { data: statsData, isLoading: isLoadingStats, refetch: refetchStats } = useQuery({
        queryKey: ["stats-report", date],
        queryFn: () => ticketService.getStats(token, startDate, endDate),
        enabled: !!token,
    });

    const handleRefetch = () => {
        refetchTickets();
        refetchStats();
    };

    const [exportDialogOpen, setExportDialogOpen] = useState(false);


    const handleExportClick = () => {
        setExportDialogOpen(true);
    };

    const handleExportConfirm = async (type: 'pdf' | 'excel') => {
        setIsExporting(true);
        const toastId = toast.loading(`Generando reporte ${type.toUpperCase()}...`);

        try {
            const blob = await ticketService.exportTickets(token, type, { startDate, endDate });

            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `reporte_tickets_${format(new Date(), 'yyyyMMdd_HHmm')}.${type === 'excel' ? 'xlsx' : 'pdf'}`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);

            toast.dismiss(toastId);
            toast.success(`Reporte ${type.toUpperCase()} descargado`, {
                description: "El archivo se ha guardado en tu dispositivo."
            });
        } catch (error) {
            console.error(error);
            toast.dismiss(toastId);
            toast.error("Error al exportar reporte", {
                description: "Por favor intente nuevamente."
            });
        } finally {
            setIsExporting(false);
        }
    };

    return (
        <div className="space-y-6">
            <ExportReportDialog
                open={exportDialogOpen}
                onOpenChange={setExportDialogOpen}
                onExport={handleExportConfirm}
            />

            {/* Control Bar */}
            <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center bg-card p-4 rounded-xl border shadow-sm">
                <div className="flex items-center gap-2">
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant={"outline"}
                                className={cn(
                                    "w-[240px] justify-start text-left font-normal",
                                    !date && "text-muted-foreground"
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {date ? format(date, "PPP", { locale: es }) : <span>Seleccionar fecha</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                    <Button variant="ghost" size="icon" onClick={() => handleRefetch()}>
                        <RefreshCcw className="h-4 w-4" />
                    </Button>
                </div>

                <div className="flex gap-2">
                    <Button variant="outline" onClick={() => handleExportClick()} disabled={isExporting}>
                        <FileSpreadsheet className="mr-2 h-4 w-4 text-green-600" />
                        Excel
                    </Button>
                    <Button variant="outline" onClick={() => handleExportClick()} disabled={isExporting}>
                        <FileText className="mr-2 h-4 w-4 text-red-600" />
                        PDF
                    </Button>
                </div>
            </div>

            {/* Visual Summary */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-3">
                    <Card>
                        <CardHeader>
                            <CardTitle>Análisis Gráfico</CardTitle>
                            <CardDescription>Distribución de tickets en el periodo seleccionado.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <DashboardCharts />
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Detailed Table */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                            <span>Detalle de Registros</span>
                            <Badge variant="outline" className="ml-2">
                                {ticketData ? ticketData.totalElements : 0} Registros
                            </Badge>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {isLoadingTickets ? (
                            <div className="flex h-64 items-center justify-center">
                                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                            </div>
                        ) : (
                            <div className="rounded-md border">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Ticket ID</TableHead>
                                            <TableHead>Asunto</TableHead>
                                            <TableHead>Estado</TableHead>
                                            <TableHead>Prioridad</TableHead>
                                            <TableHead>Solicitante</TableHead>
                                            <TableHead className="text-right">Fecha</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {ticketData?.content.map((ticket: any) => (
                                            <TableRow key={ticket.id}>
                                                <TableCell className="font-medium">{ticket.numero}</TableCell>
                                                <TableCell>{ticket.asunto}</TableCell>
                                                <TableCell>
                                                    <Badge style={{ backgroundColor: `${ticket.estado.colorHex}15`, color: ticket.estado.colorHex }} className="border-0">
                                                        {ticket.estado.nombre}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge variant="outline">{ticket.prioridad.nombre}</Badge>
                                                </TableCell>
                                                <TableCell>{ticket.solicitante.nombreCompleto}</TableCell>
                                                <TableCell className="text-right">{formatDate(ticket.fechaCreacion)}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
}
