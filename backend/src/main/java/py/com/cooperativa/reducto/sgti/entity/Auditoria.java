package py.com.cooperativa.reducto.sgti.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.UUID;

/**
 * Entidad Auditoria - Log completo de actividades
 */
@Entity
@Table(name = "auditoria", indexes = {
        @Index(name = "idx_auditoria_usuario", columnList = "usuario_id, timestamp"),
        @Index(name = "idx_auditoria_timestamp", columnList = "timestamp"),
        @Index(name = "idx_auditoria_entidad", columnList = "entidad, entidad_id")
})
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Auditoria {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private String entidad; // Tabla afectada: tickets, usuarios, etc.

    @Column(name = "entidad_id", nullable = false)
    private String entidadId;

    @Column(nullable = false)
    private String accion; // CREATE, UPDATE, DELETE, LOGIN, LOGOUT, VIEW

    @Column(nullable = false)
    @Builder.Default
    private LocalDateTime timestamp = LocalDateTime.now();

    @Column(name = "ip_address")
    private String ipAddress;

    @Column(name = "user_agent", columnDefinition = "TEXT")
    private String userAgent;

    @Column
    private String dispositivo; // mobile, desktop, tablet

    @Column
    private String navegador;

    @Column(name = "sistema_operativo")
    private String sistemaOperativo;

    @Column(name = "request_id")
    private String requestId;

    @Column(columnDefinition = "TEXT")
    private String cambios; // JSON diff

    @Column(columnDefinition = "TEXT")
    private String metadata;

    @Column(name = "duracion_ms")
    private Integer duracionMs;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;

    @Column(name = "usuario_email")
    private String usuarioEmail; // Redundancia por si se borra usuario
}
