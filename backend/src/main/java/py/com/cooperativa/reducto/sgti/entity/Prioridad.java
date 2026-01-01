package py.com.cooperativa.reducto.sgti.entity;

import jakarta.persistence.*;
import lombok.*;
import java.util.UUID;

/**
 * Entidad Prioridad
 */
@Entity
@Table(name = "prioridades")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Prioridad {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false, unique = true)
    private String nombre;

    @Column(nullable = false)
    private Integer nivel;  // 1=Baja, 2=Normal, 3=Alta, 4=Urgente

    @Column(name = "color_hex", nullable = false)
    private String colorHex;

    @Column(name = "tiempo_respuesta_horas")
    @Builder.Default
    private Integer tiempoRespuestaHoras = 24;

    @Column(nullable = false)
    @Builder.Default
    private Boolean activo = true;
}
