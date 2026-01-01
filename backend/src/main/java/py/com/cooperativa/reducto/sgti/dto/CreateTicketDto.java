package py.com.cooperativa.reducto.sgti.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.UUID;

/**
 * DTO para crear un nuevo ticket
 */
@Data
public class CreateTicketDto {

    @NotBlank(message = "El asunto es requerido")
    private String asunto;

    @NotBlank(message = "La descripción es requerida")
    private String descripcion;

    @NotNull(message = "El departamento es requerido")
    private UUID departamentoId;

    @NotNull(message = "La categoría es requerida")
    private UUID categoriaId;

    @NotNull(message = "La prioridad es requerida")
    private UUID prioridadId;

    // Opcional: asignar directamente a un agente
    private UUID agenteId;

    // Opcional: información del socio
    private String cedulaSocio;

    // Opcional: archivos adjuntos (se manejan por separado)
}
