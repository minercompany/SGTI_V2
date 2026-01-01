"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FileSpreadsheet, FileText, Loader2, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ExportReportDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onExport: (format: 'excel' | 'pdf') => void;
}

export function ExportReportDialog({ open, onOpenChange, onExport }: ExportReportDialogProps) {
    const [format, setFormat] = useState<'excel' | 'pdf'>('excel');
    const [status, setStatus] = useState<'idle' | 'generating' | 'completed'>('idle');

    const handleExport = () => {
        setStatus('generating');
        // Simulate generation time
        setTimeout(() => {
            setStatus('completed');
            setTimeout(() => {
                onExport(format);
                onOpenChange(false);
                setStatus('idle');
            }, 1000);
        }, 2000);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Exportar Reporte</DialogTitle>
                    <DialogDescription>
                        Seleccione el formato y las opciones para descargar el reporte detallado.
                    </DialogDescription>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                    <AnimatePresence mode="wait">
                        {status === 'idle' && (
                            <motion.div
                                key="idle"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="space-y-4"
                            >
                                <RadioGroup defaultValue="excel" onValueChange={(v) => setFormat(v as any)} className="grid grid-cols-2 gap-4">
                                    <div>
                                        <RadioGroupItem value="excel" id="excel" className="peer sr-only" />
                                        <Label
                                            htmlFor="excel"
                                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer transition-all"
                                        >
                                            <FileSpreadsheet className="mb-3 h-6 w-6 text-green-600" />
                                            Excel
                                        </Label>
                                    </div>
                                    <div>
                                        <RadioGroupItem value="pdf" id="pdf" className="peer sr-only" />
                                        <Label
                                            htmlFor="pdf"
                                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer transition-all"
                                        >
                                            <FileText className="mb-3 h-6 w-6 text-red-600" />
                                            PDF
                                        </Label>
                                    </div>
                                </RadioGroup>
                            </motion.div>
                        )}

                        {status === 'generating' && (
                            <motion.div
                                key="generating"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="flex flex-col items-center justify-center py-8 space-y-4"
                            >
                                <Loader2 className="h-10 w-10 animate-spin text-primary" />
                                <p className="text-sm font-medium text-muted-foreground">Generando reporte...</p>
                            </motion.div>
                        )}

                        {status === 'completed' && (
                            <motion.div
                                key="completed"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="flex flex-col items-center justify-center py-8 space-y-4"
                            >
                                <CheckCircle className="h-10 w-10 text-green-500" />
                                <p className="text-sm font-medium text-green-600">¡Reporte listo!</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <DialogFooter>
                    {status === 'idle' && (
                        <>
                            <Button variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
                            <Button onClick={handleExport}>Generar descarga</Button>
                        </>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
