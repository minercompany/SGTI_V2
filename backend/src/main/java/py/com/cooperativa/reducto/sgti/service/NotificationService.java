package py.com.cooperativa.reducto.sgti.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import py.com.cooperativa.reducto.sgti.dto.TicketEventDto;

import java.time.LocalDateTime;

/**
 * Servicio para enviar notificaciones en tiempo real vía WebSocket
 * Sprint 1: Activación Premium
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class NotificationService {

        private final SimpMessagingTemplate messagingTemplate;

        /**
         * Envía evento de ticket a todos los suscriptores del departamento
         */
        public void sendTicketEvent(String eventType, java.util.UUID ticketId, String ticketNumero,
                        java.util.UUID departamentoId, String message, Object data) {
                TicketEventDto event = TicketEventDto.builder()
                                .eventType(eventType)
                                .ticketId(ticketId)
                                .ticketNumero(ticketNumero)
                                .departamentoId(departamentoId)
                                .message(message)
                                .data(data)
                                .timestamp(LocalDateTime.now())
                                .build();

                // Enviar a todos los usuarios del departamento
                messagingTemplate.convertAndSend("/topic/tickets/" + departamentoId, event);

                // También enviar a canal general de tickets
                messagingTemplate.convertAndSend("/topic/tickets", event);

                log.info("WebSocket event sent: {} for ticket {}", eventType, ticketNumero);
        }

        /**
         * Envía notificación personal a un usuario específico
         */
        public void sendUserNotification(java.util.UUID userId, String message, Object data) {
                TicketEventDto event = TicketEventDto.builder()
                                .eventType("USER_NOTIFICATION")
                                .usuarioId(userId)
                                .message(message)
                                .data(data)
                                .timestamp(LocalDateTime.now())
                                .build();

                messagingTemplate.convertAndSendToUser(
                                userId.toString(),
                                "/queue/notifications",
                                event);

                log.info("Personal notification sent to user {}", userId);
        }

        /**
         * Envía alerta de SLA próximo a vencer
         */
        public void sendSlaWarning(java.util.UUID ticketId, String ticketNumero, java.util.UUID departamentoId,
                        int porcentajeRestante) {
                sendTicketEvent(
                                "SLA_WARNING",
                                ticketId,
                                ticketNumero,
                                departamentoId,
                                String.format("SLA en %d%% - Requiere atención", porcentajeRestante),
                                porcentajeRestante);
        }

        /**
         * Envía alerta de SLA vencido
         */
        public void sendSlaBreached(java.util.UUID ticketId, String ticketNumero, java.util.UUID departamentoId) {
                sendTicketEvent(
                                "SLA_BREACHED",
                                ticketId,
                                ticketNumero,
                                departamentoId,
                                "⚠️ SLA VENCIDO - Acción inmediata requerida",
                                null);
        }
}
