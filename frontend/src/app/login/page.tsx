"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import Image from "next/image";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) throw new Error("Credenciales inválidas");

            const data = await response.json();
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

            toast.success("¡Bienvenido!");
            router.push("/dashboard");
        } catch (error) {
            toast.error("Error al iniciar sesión. Verifica tus credenciales.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
            {/* Decorative Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-lime-300/30 to-teal-400/30 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-orange-300/30 to-amber-400/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-lime-200/20 to-green-200/20 rounded-full blur-3xl"></div>
            </div>

            {/* Login Card */}
            <div className="relative w-full max-w-md mx-4">
                <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-green-500/20 border border-white/50 overflow-hidden">
                    {/* Header with Gradient */}
                    <div className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 p-8 text-center relative">
                        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>

                        {/* Logo */}
                        <div className="relative mb-4 flex justify-center">
                            <div className="bg-white p-4 rounded-2xl shadow-lg">
                                <Image
                                    src="/logo.png"
                                    alt="Cooperativa Reducto"
                                    width={120}
                                    height={120}
                                    className="object-contain"
                                    priority
                                />
                            </div>
                        </div>

                        <h1 className="text-3xl font-bold text-white mb-2 relative z-10">
                            Sistema de Tickets
                        </h1>
                        <p className="text-green-50 text-sm relative z-10">
                            Cooperativa Reducto
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="p-8 space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                Usuario
                            </label>
                            <Input
                                type="text"
                                placeholder="Ingresa tu usuario"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="h-12 border-2 border-green-200 focus:border-green-500 focus:ring-green-500 rounded-xl bg-white/50 backdrop-blur-sm transition-all"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                                Contraseña
                            </label>
                            <Input
                                type="password"
                                placeholder="Ingresa tu contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="h-12 border-2 border-green-200 focus:border-green-500 focus:ring-green-500 rounded-xl bg-white/50 backdrop-blur-sm transition-all"
                            />
                        </div>

                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full h-12 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 hover:from-green-600 hover:via-emerald-600 hover:to-teal-600 text-white font-semibold rounded-xl shadow-lg shadow-green-500/30 hover:shadow-green-500/50 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
                        >
                            {isLoading ? (
                                <div className="flex items-center gap-2">
                                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <span>Ingresando...</span>
                                </div>
                            ) : (
                                <span className="flex items-center justify-center gap-2">
                                    <span>Iniciar Sesión</span>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </span>
                            )}
                        </Button>

                        <p className="text-center text-sm text-gray-600 mt-4">
                            ¿Problemas para ingresar?{" "}
                            <a href="#" className="text-green-600 hover:text-green-700 font-semibold hover:underline">
                                Contacta a soporte
                            </a>
                        </p>
                    </form>

                    {/* Footer */}
                    <div className="bg-gradient-to-r from-lime-50 to-green-50 px-8 py-4 text-center border-t border-green-200">
                        <p className="text-xs text-gray-600">
                            © 2025 Cooperativa Reducto • Sistema de Gestión de Tickets
                        </p>
                    </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-6 -left-6 w-12 h-12 bg-gradient-to-br from-lime-400 to-green-500 rounded-full blur-md opacity-60 animate-bounce"></div>
                <div className="absolute -bottom-6 -right-6 w-16 h-16 bg-gradient-to-br from-cyan-400 to-green-500 rounded-full blur-md opacity-60 animate-bounce delay-500"></div>
            </div>
        </div>
    );
}
