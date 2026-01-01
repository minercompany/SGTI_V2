package py.com.cooperativa.reducto.sgti.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

/**
 * Entidad Departamento
 */
@Entity
@Table(name = "departamentos")
@EntityListeners(AuditingEntityListener.class)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Departamento {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false, unique = true)
    private String nombre;

    @Column
    private String descripcion;

    @Column(name = "email_notificacion")
    private String emailNotificacion;

    @Column
    private String color;

    @Column
    private String icono;

    @Column(nullable = false)
    @Builder.Default
    private Integer orden = 0;

    @Column(nullable = false)
    @Builder.Default
    private Boolean activo = true;

    @CreatedDate
    @Column(name = "fecha_creacion", nullable = false, updatable = false)
    private LocalDateTime fechaCreacion;

    // Relaciones
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "jefe_id")
    private Usuario jefe;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "padre_id")
    private Departamento padre;

    @OneToMany(mappedBy = "padre", fetch = FetchType.LAZY)
    @Builder.Default
    private Set<Departamento> subdepartamentos = new HashSet<>();

    @OneToMany(mappedBy = "departamento", fetch = FetchType.LAZY)
    @Builder.Default
    private Set<Usuario> usuarios = new HashSet<>();

    @OneToMany(mappedBy = "departamento", fetch = FetchType.LAZY)
    @Builder.Default
    private Set<Ticket> tickets = new HashSet<>();

    @OneToMany(mappedBy = "departamento", fetch = FetchType.LAZY)
    @Builder.Default
    private Set<Categoria> categorias = new HashSet<>();
}
