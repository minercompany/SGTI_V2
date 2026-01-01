package py.com.cooperativa.reducto.sgti.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

/**
 * DTO para request de login
 */
@Data
public class LoginRequest {

    @NotBlank(message = "Usuario es requerido")
    private String email;

    @NotBlank(message = "Contraseña es requerida")
    private String password;
}
