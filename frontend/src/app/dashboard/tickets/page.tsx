"use client";

import { TicketList } from "@/components/tickets/TicketList";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export default function TicketsPage() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent dark:from-white dark:to-gray-400">
                    Tickets
                </h1>
                <p className="text-muted-foreground">
                    Gestione y realice seguimiento de las solicitudes de soporte.
                </p>
            </div>

            <TicketList />
        </div>
    );
}
