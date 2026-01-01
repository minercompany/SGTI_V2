"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { Loader2, Send, Paperclip } from "lucide-react";
import { toast } from "sonner";
import { ticketService } from "@/services/ticketService";
import { motion } from "framer-motion";

const ticketSchema = z.object({
    asunto: z.string().min(5, "El asunto debe tener al menos 5 caracteres"),
    descripcion: z.string().min(10, "La descripción debe tener al menos 10 caracteres"),
    departamentoId: z.string().min(1, "Seleccione un departamento"),
    categoriaId: z.string().min(1, "Seleccione una categoría"),
    prioridadId: z.string().min(1, "Seleccione una prioridad"),
});

type TicketFormValues = z.infer<typeof ticketSchema>;

// Mock data based on seed
const DEPARTMENTS = [
    { id: '4e951d1d-ab73-4336-a51e-5b4fdee1ede7', nombre: 'Tecnología' },
    { id: '5fc05a76-9d32-47f2-9f3b-8914563a6332', nombre: 'Contabilidad' },
    { id: 'a8e93276-8f21-4a3b-9e4c-123456789012', nombre: 'Servicio al Cliente' },
];

const CATEGORIES = [
    { id: '692684bb-121c-4646-ac61-b5a0ccd36e4b', nombre: 'Error de Sistema', deptId: '4e951d1d-ab73-4336-a51e-5b4fdee1ede7' },
    { id: '5b4a0ec6-dcd9-43e1-a7bd-b7cca02fc682', nombre: 'Consulta', deptId: 'a8e93276-8f21-4a3b-9e4c-123456789012' },
    { id: '1b720ac6-8100-4f20-af69-0c9e16ebc434', nombre: 'Solicitud de Equipo', deptId: '4e951d1d-ab73-4336-a51e-5b4fdee1ede7' },
];

const PRIORITIES = [
    { id: '60248c46-dcba-4ff5-9da7-22e0733dd72e', nombre: 'Baja', color: '#64748B' },
    { id: '3b794a85-8d88-482a-9fce-ffe73d7119a4', nombre: 'Normal', color: '#3B82F6' },
    { id: '4223435b-8fc9-4497-a229-c744ea99477f', nombre: 'Alta', color: '#F59E0B' },
    { id: '8c921345-a1b2-4c3d-e5f6-789012345678', nombre: 'Urgente', color: '#EF4444' },
];

export function CreateTicketForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    // Mock token retrieval
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') || '' : '';

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm<TicketFormValues>({
        resolver: zodResolver(ticketSchema),
    });

    const selectedDeptId = watch("departamentoId");
    const filteredCategories = CATEGORIES.filter(c => !c.deptId || c.deptId === selectedDeptId);

    async function onSubmit(data: TicketFormValues) {
        if (!token) {
            toast.error("No estás autenticado");
            return;
        }

        setIsSubmitting(true);
        try {
            await ticketService.createTicket(data, token);
            toast.success("Ticket creado exitosamente");
            reset();
            // Optional: Redirect
        } catch (error) {
            toast.error("Error al crear ticket", {
                description: (error as Error).message
            });
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-xl border bg-card/50 shadow-sm backdrop-blur-sm max-w-2xl mx-auto"
        >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-2">
                    <h2 className="text-xl font-semibold">Nuevo Ticket</h2>
                    <p className="text-sm text-muted-foreground">Complete los detalles para registrar una nueva solicitud.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Departamento */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Departamento</label>
                        <select
                            {...register("departamentoId")}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        >
                            <option value="">Seleccione...</option>
                            {DEPARTMENTS.map(d => (
                                <option key={d.id} value={d.id}>{d.nombre}</option>
                            ))}
                        </select>
                        {errors.departamentoId && (
                            <p className="text-sm text-destructive">{errors.departamentoId.message}</p>
                        )}
                    </div>

                    {/* Categoria */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Categoría</label>
                        <select
                            {...register("categoriaId")}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            disabled={!selectedDeptId}
                        >
                            <option value="">Seleccione...</option>
                            {filteredCategories.map(c => (
                                <option key={c.id} value={c.id}>{c.nombre}</option>
                            ))}
                        </select>
                        {errors.categoriaId && (
                            <p className="text-sm text-destructive">{errors.categoriaId.message}</p>
                        )}
                    </div>
                </div>

                {/* Prioridad */}
                <div className="space-y-2">
                    <label className="text-sm font-medium">Prioridad</label>
                    <div className="flex gap-2">
                        {PRIORITIES.map(p => (
                            <label key={p.id} className="cursor-pointer">
                                <input
                                    type="radio"
                                    value={p.id}
                                    {...register("prioridadId")}
                                    className="peer sr-only"
                                />
                                <div className="px-4 py-2 rounded-md border peer-checked:bg-primary/10 peer-checked:border-primary peer-checked:text-primary hover:bg-muted transition-all text-sm font-medium">
                                    {p.nombre}
                                </div>
                            </label>
                        ))}
                    </div>
                    {errors.prioridadId && (
                        <p className="text-sm text-destructive">{errors.prioridadId.message}</p>
                    )}
                </div>

                {/* Asunto */}
                <div className="space-y-2">
                    <label className="text-sm font-medium">Asunto</label>
                    <Input
                        placeholder="Resumen breve del problema..."
                        {...register("asunto")}
                    />
                    {errors.asunto && (
                        <p className="text-sm text-destructive">{errors.asunto.message}</p>
                    )}
                </div>

                {/* Descripcion */}
                <div className="space-y-2">
                    <label className="text-sm font-medium">Descripción</label>
                    <Textarea
                        placeholder="Detalle el problema, pasos para reproducir, etc..."
                        className="min-h-[150px]"
                        {...register("descripcion")}
                    />
                    {errors.descripcion && (
                        <p className="text-sm text-destructive">{errors.descripcion.message}</p>
                    )}
                </div>

                {/* Archivos (Visual only for now) */}
                <div className="rounded-lg border border-dashed p-8 text-center hover:bg-muted/50 transition-colors cursor-pointer">
                    <div className="flex flex-col items-center gap-2 text-muted-foreground">
                        <Paperclip className="h-8 w-8" />
                        <p className="text-sm">Arrastre archivos aquí o haga clic para adjuntar (Opcional)</p>
                    </div>
                </div>

                <div className="flex justify-end gap-2 pt-4">
                    <Button variant="ghost" type="button" onClick={() => reset()}>
                        Cancelar
                    </Button>
                    <Button type="submit" disabled={isSubmitting} className="bg-gradient-to-r from-primary to-violet-600">
                        {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
                        Crear Ticket
                    </Button>
                </div>
            </form>
        </motion.div>
    );
}
