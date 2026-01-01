package py.com.cooperativa.reducto.sgti.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.util.UUID;

/**
 * Entidad Feriado - Días no laborales
 */
@Entity
@Table(name = "feriados")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Feriado {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private LocalDate fecha;

    @Column(nullable = false)
    private String nombre;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "calendario_id", nullable = false)
    private CalendarioLaboral calendario;
}
