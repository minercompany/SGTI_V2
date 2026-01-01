import { useEffect, useRef, useState } from 'react';
import { Client, StompSubscription } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

interface TicketEvent {
    eventType: string;
    ticketId: number;
    ticketNumero: string;
    message: string;
    departamentoId: number;
    timestamp: string;
    data?: any;
}

export function useWebSocket(departamentoId?: number) {
    const [isConnected, setIsConnected] = useState(false);
    const [lastEvent, setLastEvent] = useState<TicketEvent | null>(null);
    const clientRef = useRef<Client | null>(null);
    const subscriptionRef = useRef<StompSubscription | null>(null);

    useEffect(() => {
        // Crear cliente STOMP
        const client = new Client({
            webSocketFactory: () => new SockJS('http://localhost:8082/ws'),
            debug: (str) => {
                console.log('[WebSocket]', str);
            },
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
        });

        client.onConnect = () => {
            console.log('[WebSocket] Conectado');
            setIsConnected(true);

            // Suscribirse a eventos de tickets
            if (departamentoId) {
                // Canal específico del departamento
                subscriptionRef.current = client.subscribe(
                    `/topic/tickets/${departamentoId}`,
                    (message) => {
                        const event: TicketEvent = JSON.parse(message.body);
                        console.log('[WebSocket] Evento recibido:', event);
                        setLastEvent(event);
                    }
                );
            } else {
                //Canal general de todos los tickets
                subscriptionRef.current = client.subscribe(
                    '/topic/tickets',
                    (message) => {
                        const event: TicketEvent = JSON.parse(message.body);
                        console.log('[WebSocket] Evento recibido:', event);
                        setLastEvent(event);
                    }
                );
            }
        };

        client.onDisconnect = () => {
            console.log('[WebSocket] Desconectado');
            setIsConnected(false);
        };

        client.onStompError = (frame) => {
            console.error('[WebSocket] Error STOMP:', frame);
            setIsConnected(false);
        };

        client.activate();
        clientRef.current = client;

        // Cleanup
        return () => {
            subscriptionRef.current?.unsubscribe();
            client.deactivate();
        };
    }, [departamentoId]);

    return {
        isConnected,
        lastEvent,
    };
}
