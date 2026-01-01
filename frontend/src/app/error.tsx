'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error('Error capturado:', error);
    }, [error]);

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-background">
            <div className="text-center space-y-4 max-w-md">
                <h1 className="text-4xl font-bold text-destructive">¡Algo salió mal!</h1>
                <p className="text-muted-foreground">
                    {error.message || 'Ha ocurrido un error inesperado'}
                </p>
                <div className="flex gap-4 justify-center">
                    <Button onClick={() => reset()}>
                        Intentar nuevamente
                    </Button>
                    <Button variant="outline" onClick={() => window.location.href = '/dashboard'}>
                        Ir al Dashboard
                    </Button>
                </div>
            </div>
        </div>
    );
}
