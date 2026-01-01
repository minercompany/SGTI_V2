package py.com.cooperativa.reducto.sgti.dto;

import lombok.Data;

import java.util.UUID;

/**
 * DTO para actualizar un ticket
 */
@Data
public class UpdateTicketDto {

    private String asunto;
    private String descripcion;
    private UUID categoriaId;
    private UUID prioridadId;
    private UUID agenteId;
    private UUID estadoId;
}
