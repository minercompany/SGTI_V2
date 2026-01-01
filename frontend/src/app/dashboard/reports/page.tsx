"use client";

import { ReportsComponent } from "@/components/dashboard/ReportsComponent";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export default function ReportsPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight text-gradient">Reportes Avanzados</h1>
            </div>
            <ReportsComponent />
        </div>
    );
}
