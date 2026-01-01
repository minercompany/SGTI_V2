/**
 * ============================================================================
 * SGTI - Sistema de Gestión de Tickets Interdepartamental
 * ============================================================================
 * 
 * @archivo:      auth.ts
 * @proposito:    Configuración principal de NextAuth (v5)
 * @version:      1.0.0
 * @fecha:        2026-01-01
 * ============================================================================
 */

import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { z } from "zod"

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            name: "Credenciales",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Contraseña", type: "password" },
            },
            authorize: async (credentials) => {
                try {
                    const parsedCredentials = z
                        .object({ email: z.string().min(1), password: z.string().min(1) })
                        .safeParse(credentials)

                    if (parsedCredentials.success) {
                        const { email, password } = parsedCredentials.data
                        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8082'

                        const res = await fetch(`${backendUrl}/api/auth/login`, {
                            method: 'POST',
                            body: JSON.stringify({ email, password }),
                            headers: { "Content-Type": "application/json" },
                        })

                        const user = await res.json()

                        if (!res.ok || !user || !user.token) {
                            console.error("Error en login backend:", user);
                            return null
                        }

                        return {
                            id: user.user?.id || "1",
                            name: user.user?.nombreCompleto || user.user?.nombre || email,
                            email: user.user?.email || email,
                            rol: user.user?.rol || "USER",
                            access_token: user.token,
                        }
                    }
                    return null
                } catch (error) {
                    console.error("Error de conexión auth:", error)
                    return null
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id
                token.rol = (user as any).rol
                token.access_token = (user as any).access_token
            }
            return token
        },
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id as string
                (session.user as any).rol = token.rol as string
                (session.user as any).access_token = token.access_token as string
            }
            return session
        },
    },
    pages: {
        signIn: '/login',
    },
    session: {
        strategy: "jwt",
        maxAge: 8 * 60 * 60,
    },
    secret: process.env.AUTH_SECRET || "sgti-v2-secret-key-dev-2026",
    trustHost: true,
})
