package py.com.cooperativa.reducto.sgti.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.UUID;

/**
 * Entidad HistorialTicket - Auditoría de cambios en tickets
 */
@Entity
@Table(name = "historial_tickets", indexes = {
        @Index(name = "idx_historial_ticket", columnList = "ticket_id, timestamp")
})
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HistorialTicket {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "tipo_accion", nullable = false)
    private String tipoAccion; // CREACION, ASIGNACION, CAMBIO_ESTADO, etc.

    @Column(name = "valor_anterior", columnDefinition = "TEXT")
    private String valorAnterior;

    @Column(name = "valor_nuevo", columnDefinition = "TEXT")
    private String valorNuevo;

    @Column
    private String comentario;

    @Column(name = "es_interno")
    @Builder.Default
    private Boolean esInterno = false;

    @Column(nullable = false)
    @Builder.Default
    private LocalDateTime timestamp = LocalDateTime.now();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ticket_id", nullable = false)
    private Ticket ticket;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;
}
