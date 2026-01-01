import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from 'sonner'
import { Providers } from './providers'

export const metadata: Metadata = {
  title: 'SGTI Enterprise | Sistema de Gestión por Tickets',
  description: 'Sistema de Gestión Integral por Tickets - Cooperativa Reducto',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Providers>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: 'hsl(140 60% 97%)',
                border: '1px solid hsl(140 30% 85%)',
                color: 'hsl(140 40% 15%)',
              },
            }}
          />
        </Providers>
      </body>
    </html>
  )
}
