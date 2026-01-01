package py.com.cooperativa.reducto.sgti.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * DTO para eventos de tickets vía WebSocket
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TicketEventDto {

    private String eventType; // CREATED, UPDATED, ASSIGNED, RESPONSE, SLA_WARNING, SLA_BREACHED
    private java.util.UUID ticketId;
    private String ticketNumero;
    private String message;
    private java.util.UUID departamentoId;
    private java.util.UUID usuarioId;
    private LocalDateTime timestamp;

    // Data adicional según el tipo de evento
    private Object data;
}
