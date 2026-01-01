package py.com.cooperativa.reducto.sgti.dto;

import lombok.Builder;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Builder
public class UserProfileDto {
    private String id;
    private String nombreCompleto;
    private String email;
    private String rol;
    private String departamento;
    private String telefono;
    private String cedula;
    private LocalDateTime ultimoAcceso;
    private boolean activo;
    private int ticketsCreados;
    private int ticketsAsignados; // Para agentes
}
