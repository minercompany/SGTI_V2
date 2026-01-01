package py.com.cooperativa.reducto.sgti.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

/**
 * Entidad Usuario - Usuarios del sistema SGTI
 */
@Entity
@Table(name = "usuarios")
@EntityListeners(AuditingEntityListener.class)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "nombre_completo", nullable = false)
    private String nombreCompleto;

    @Column(nullable = false, unique = true)
    private String email;

    @Column
    private String telefono;

    @Column(nullable = false)
    private String password;

    @Column
    private String cedula;

    @Column
    private String avatar;

    @Column
    private String firma;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Builder.Default
    private RolUsuario rol = RolUsuario.USUARIO;

    @Column(nullable = false)
    @Builder.Default
    private Boolean activo = true;

    @CreatedDate
    @Column(name = "fecha_creacion", nullable = false, updatable = false)
    private LocalDateTime fechaCreacion;

    @LastModifiedDate
    @Column(name = "fecha_actualizacion")
    private LocalDateTime fechaActualizacion;

    @Column(name = "ultimo_acceso")
    private LocalDateTime ultimoAcceso;

    // Relaciones
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "departamento_id")
    private Departamento departamento;

    @OneToMany(mappedBy = "solicitante", fetch = FetchType.LAZY)
    @Builder.Default
    private Set<Ticket> ticketsCreados = new HashSet<>();

    @OneToMany(mappedBy = "agente", fetch = FetchType.LAZY)
    @Builder.Default
    private Set<Ticket> ticketsAsignados = new HashSet<>();

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "equipo_usuario",
        joinColumns = @JoinColumn(name = "usuario_id"),
        inverseJoinColumns = @JoinColumn(name = "equipo_id")
    )
    @Builder.Default
    private Set<Equipo> equipos = new HashSet<>();

    // Enums
    public enum RolUsuario {
        SUPER_ADMIN,
        GERENTE,
        SUPERVISOR,
        AGENTE,
        USUARIO,
        AUDITOR
    }
}
