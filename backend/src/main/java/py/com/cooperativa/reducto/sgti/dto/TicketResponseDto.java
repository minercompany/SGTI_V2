package py.com.cooperativa.reducto.sgti.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

/**
 * DTO de respuesta con información completa del ticket
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TicketResponseDto {

    private UUID id;
    private String numero;
    private String asunto;
    private String descripcion;

    // Relaciones simples
    private SimpleDepartamentoDto departamento;
    private SimpleCategoriaDto categoria;
    private SimpleEstadoDto estado;
    private SimplePrioridadDto prioridad;
    private SimpleUsuarioDto solicitante;
    private SimpleUsuarioDto agente;

    // Fechas
    private LocalDateTime fechaCreacion;
    private LocalDateTime fechaActualizacion;
    private LocalDateTime fechaPrimeraRespuesta;
    private LocalDateTime fechaCierre;
    private LocalDateTime fechaVencimientoSla;

    // SLA
    private Boolean slaPausado;

    // Estadísticas
    private Integer numeroRespuestas;

    // DTOs anidados
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class SimpleDepartamentoDto {
        private UUID id;
        private String nombre;
        private String color;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class SimpleCategoriaDto {
        private UUID id;
        private String nombre;
        private String icono;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class SimpleEstadoDto {
        private UUID id;
        private String nombre;
        private String tipo;
        private String colorHex;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class SimplePrioridadDto {
        private UUID id;
        private String nombre;
        private Integer nivel;
        private String colorHex;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class SimpleUsuarioDto {
        private UUID id;
        private String nombreCompleto;
        private String email;
    }
}
