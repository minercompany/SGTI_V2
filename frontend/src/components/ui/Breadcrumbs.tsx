import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export function Breadcrumbs() {
    return (
        <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Link href="/dashboard" className="hover:text-primary transition-colors">
                <Home className="h-4 w-4" />
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="font-medium text-foreground">Tickets</span>
        </nav>
    );
}
