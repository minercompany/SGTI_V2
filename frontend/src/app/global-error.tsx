'use client';

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <html>
            <body>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '100vh',
                    fontFamily: 'system-ui, sans-serif'
                }}>
                    <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Error Global</h1>
                    <p style={{ marginBottom: '2rem', color: '#666' }}>
                        {error.message || 'Ha ocurrido un error inesperado'}
                    </p>
                    <button
                        onClick={() => reset()}
                        style={{
                            padding: '0.5rem 1rem',
                            borderRadius: '0.375rem',
                            backgroundColor: '#3b82f6',
                            color: 'white',
                            border: 'none',
                            cursor: 'pointer'
                        }}
                    >
                        Intentar nuevamente
                    </button>
                </div>
            </body>
        </html>
    );
}
