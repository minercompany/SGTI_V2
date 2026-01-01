package py.com.cooperativa.reducto.sgti.entity;

import jakarta.persistence.*;
import lombok.*;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

/**
 * Entidad SLA - Service Level Agreement
 */
@Entity
@Table(name = "slas")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Sla {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private String nombre;

    @Column(name = "tiempo_respuesta")
    private Integer tiempoRespuesta; // Horas

    @Column(name = "tiempo_resolucion")
    private Integer tiempoResolucion; // Horas

    @Column(nullable = false)
    @Builder.Default
    private Boolean activo = true;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "departamento_id")
    private Departamento departamento;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "calendario_id")
    private CalendarioLaboral calendario;

    @OneToMany(mappedBy = "sla", fetch = FetchType.LAZY)
    @Builder.Default
    private Set<Ticket> tickets = new HashSet<>();
}
