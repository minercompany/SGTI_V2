package py.com.cooperativa.reducto.sgti.entity;

import jakarta.persistence.*;
import lombok.*;
import java.util.UUID;

/**
 * Entidad Estado para tickets
 */
@Entity
@Table(name = "estados")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Estado {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false, unique = true)
    private String nombre;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TipoEstado tipo;

    @Column(name = "color_hex", nullable = false)
    private String colorHex;

    @Column(nullable = false)
    @Builder.Default
    private Integer orden = 0;

    @Column(nullable = false)
    @Builder.Default
    private Boolean activo = true;

    public enum TipoEstado {
        ABIERTO,
        EN_PROCESO,
        CERRADO
    }
}
