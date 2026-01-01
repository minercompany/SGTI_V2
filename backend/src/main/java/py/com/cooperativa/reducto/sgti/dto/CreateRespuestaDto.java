package py.com.cooperativa.reducto.sgti.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

/**
 * DTO para agregar una respuesta a un ticket
 */
@Data
public class CreateRespuestaDto {

    @NotBlank(message = "El contenido es requerido")
    private String contenido;

    private Boolean esInterna = false;
}
