
const API_URL = "/api/auth";

export interface UserProfile {
    id: string;
    nombreCompleto: string;
    email: string;
    rol: string;
    departamento: string;
    telefono?: string;
    cedula?: string;
    ultimoAcceso?: string;
    activo: boolean;
    ticketsCreados: number;
    ticketsAsignados: number;
}

export const authService = {
    async getProfile(token: string): Promise<UserProfile> {
        const response = await fetch(`${API_URL}/me`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Error fetching user profile");
        }

        return response.json();
    }
};
