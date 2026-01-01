package py.com.cooperativa.reducto.sgti.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.UUID;

/**
 * Entidad SocioCache - Cache de datos de socios de la cooperativa
 */
@Entity
@Table(name = "socios_cache", indexes = {
        @Index(name = "idx_socio_cedula", columnList = "cedula")
})
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SocioCache {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false, unique = true)
    private String cedula;

    @Column(name = "nombre_completo")
    private String nombreCompleto;

    @Column
    private String telefono;

    @Column
    private String email;

    @Column
    private String direccion;

    @Column(name = "fecha_ingreso")
    private LocalDateTime fechaIngreso;

    @Column
    private String estado; // ACTIVO, INACTIVO

    @Column(name = "datos_raw", columnDefinition = "TEXT")
    private String datosRaw; // JSON completo del API

    @Column(name = "ultima_sync", nullable = false)
    @Builder.Default
    private LocalDateTime ultimaSync = LocalDateTime.now();
}
