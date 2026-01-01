"use client";

import { CreateTicketForm } from "@/components/tickets/CreateTicketForm";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CreateTicketPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Link href="/dashboard/tickets">
                    <Button variant="ghost" size="icon">
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent dark:from-white dark:to-gray-400">
                        Nuevo Ticket
                    </h1>
                    <p className="text-muted-foreground">
                        Complete el formulario para abrir un nuevo caso de soporte.
                    </p>
                </div>
            </div>

            <CreateTicketForm />
        </div>
    );
}
