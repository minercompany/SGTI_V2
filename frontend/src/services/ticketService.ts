
const API_URL = "/api";

export interface Ticket {
    id: string;
    numero: string;
    asunto: string;
    descripcion: string;
    estado: {
        id: string;
        nombre: string;
        tipo: string;
        colorHex: string;
    };
    prioridad: {
        id: string;
        nombre: string;
        nivel: number;
        colorHex: string;
    };
    departamento: {
        id: string;
        nombre: string;
        color: string;
    };
    solicitante: {
        id: string;
        nombreCompleto: string;
        email: string;
    };
    agente?: {
        id: string;
        nombreCompleto: string;
        email: string;
    };
    fechaCreacion: string;
    fechaActualizacion: string;
    fechaVencimientoSla?: string;
}

export interface Page<T> {
    content: T[];
    totalPages: number;
    totalElements: number;
    last: boolean;
    size: number;
    number: number;
    numberOfElements: number;
    first: boolean;
    empty: boolean;
}

export const ticketService = {
    async listTickets(page = 0, size = 10, filters: any = {}, token: string): Promise<Page<Ticket>> {
        const params = new URLSearchParams({
            page: page.toString(),
            size: size.toString(),
        });

        Object.entries(filters).forEach(([key, value]) => {
            if (value) {
                if (key === 'startDate' || key === 'endDate') {
                    if (value instanceof Date) {
                        params.append(key, value.toISOString());
                    } else {
                        params.append(key, value as string);
                    }
                } else {
                    params.append(key, value as string);
                }
            }
        });

        const response = await fetch(`${API_URL}/tickets?${params}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Error fetching tickets");
        }

        return response.json();
    },

    async getTicketById(id: string, token: string): Promise<Ticket & { historial: any[] }> {
        const response = await fetch(`${API_URL}/tickets/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Error fetching ticket details");
        }

        return response.json();
    },

    async addResponse(id: string, comentario: string, token: string) {
        const response = await fetch(`${API_URL}/tickets/${id}/responses`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ comentario, esInterno: false })
        });

        if (!response.ok) {
            throw new Error("Error adding response");
        }

        return response.json();
    },

    async createTicket(ticketData: any, token: string) {
        const response = await fetch(`${API_URL}/tickets`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(ticketData),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || "Error creating ticket");
        }

        return response.json();
    },

    async getStats(token: string, startDate?: Date, endDate?: Date) {
        let url = `${API_URL}/tickets/stats`;
        const params = new URLSearchParams();
        if (startDate) params.append('startDate', startDate.toISOString());
        if (endDate) params.append('endDate', endDate.toISOString());

        if (startDate || endDate) {
            url += `?${params.toString()}`;
        }

        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Error fetching stats");
        }
        return response.json();
    },

    async exportTickets(token: string, format: 'excel' | 'pdf', filters: any = {}) {
        const params = new URLSearchParams();

        Object.entries(filters).forEach(([key, value]) => {
            if (value) {
                if (key === 'startDate' || key === 'endDate') {
                    if (value instanceof Date) {
                        params.append(key, value.toISOString());
                    } else {
                        params.append(key, value as string);
                    }
                } else {
                    params.append(key, value as string);
                }
            }
        });

        const response = await fetch(`${API_URL}/tickets/export/${format}?${params.toString()}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Error exporting ${format}`);
        }

        return response.blob();
    }
};
