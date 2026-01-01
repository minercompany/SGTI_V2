package py.com.cooperativa.reducto.sgti.entity;

import jakarta.persistence.*;
import lombok.*;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

/**
 * Entidad CalendarioLaboral - Horarios de trabajo para SLA
 */
@Entity
@Table(name = "calendarios_laborales")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CalendarioLaboral {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false, unique = true)
    private String nombre;

    @Column(name = "zona_horaria")
    @Builder.Default
    private String zonaHoraria = "America/Asuncion";

    // Horarios por día (formato HH:mm)
    @Column(name = "lunes_inicio")
    private String lunesInicio;
    @Column(name = "lunes_fin")
    private String lunesFin;

    @Column(name = "martes_inicio")
    private String martesInicio;
    @Column(name = "martes_fin")
    private String martesFin;

    @Column(name = "miercoles_inicio")
    private String miercolesInicio;
    @Column(name = "miercoles_fin")
    private String miercolesFin;

    @Column(name = "jueves_inicio")
    private String juevesInicio;
    @Column(name = "jueves_fin")
    private String juevesFin;

    @Column(name = "viernes_inicio")
    private String viernesInicio;
    @Column(name = "viernes_fin")
    private String viernesFin;

    @Column(name = "sabado_inicio")
    private String sabadoInicio;
    @Column(name = "sabado_fin")
    private String sabadoFin;

    @Column(name = "domingo_inicio")
    private String domingoInicio;
    @Column(name = "domingo_fin")
    private String domingoFin;

    @Column(nullable = false)
    @Builder.Default
    private Boolean activo = true;

    @OneToMany(mappedBy = "calendario", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @Builder.Default
    private Set<Feriado> feriados = new HashSet<>();
}
