package py.com.cooperativa.reducto.sgti.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/**
 * Entidad Ticket - Core del sistema
 */
@Entity
@Table(name = "tickets", indexes = {
        @Index(name = "idx_ticket_numero", columnList = "numero"),
        @Index(name = "idx_ticket_departamento_estado", columnList = "departamento_id, estado_id"),
        @Index(name = "idx_ticket_agente_estado", columnList = "agente_id, estado_id"),
        @Index(name = "idx_ticket_fecha_creacion", columnList = "fecha_creacion")
})
@EntityListeners(AuditingEntityListener.class)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Ticket {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false, unique = true)
    private String numero; // SGTI-2024-00001

    @Column(nullable = false)
    private String asunto;

    @Column(columnDefinition = "TEXT")
    private String descripcion;

    // Fechas importantes
    @CreatedDate
    @Column(name = "fecha_creacion", nullable = false, updatable = false)
    private LocalDateTime fechaCreacion;

    @LastModifiedDate
    @Column(name = "fecha_actualizacion")
    private LocalDateTime fechaActualizacion;

    @Column(name = "fecha_primera_respuesta")
    private LocalDateTime fechaPrimeraRespuesta;

    @Column(name = "fecha_cierre")
    private LocalDateTime fechaCierre;

    @Column(name = "fecha_vencimiento_sla")
    private LocalDateTime fechaVencimientoSla;

    @Column(name = "sla_pausado")
    @Builder.Default
    private Boolean slaPausado = false;

    // Relaciones obligatorias
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "solicitante_id", nullable = false)
    private Usuario solicitante;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "departamento_id", nullable = false)
    private Departamento departamento;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "prioridad_id", nullable = false)
    private Prioridad prioridad;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "estado_id", nullable = false)
    private Estado estado;

    // Relaciones opcionales
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "agente_id")
    private Usuario agente;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "categoria_id")
    private Categoria categoria;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sla_id")
    private Sla sla;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "socio_id")
    private SocioCache socio;

    // Colecciones
    @OneToMany(mappedBy = "ticket", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @OrderBy("fechaCreacion ASC")
    @Builder.Default
    private List<Respuesta> respuestas = new ArrayList<>();

    @OneToMany(mappedBy = "ticket", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @OrderBy("timestamp DESC")
    @Builder.Default
    private List<HistorialTicket> historial = new ArrayList<>();

    @OneToMany(mappedBy = "ticket", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @Builder.Default
    private List<Archivo> archivos = new ArrayList<>();

    // Métodos de utilidad
    public void agregarRespuesta(Respuesta respuesta) {
        respuestas.add(respuesta);
        respuesta.setTicket(this);
        if (fechaPrimeraRespuesta == null && respuesta.getAutor() != null
                && !respuesta.getAutor().equals(solicitante)) {
            fechaPrimeraRespuesta = LocalDateTime.now();
        }
    }

    public void agregarHistorial(HistorialTicket evento) {
        historial.add(evento);
        evento.setTicket(this);
    }
}
