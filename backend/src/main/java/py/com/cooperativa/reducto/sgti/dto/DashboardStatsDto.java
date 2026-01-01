package py.com.cooperativa.reducto.sgti.dto;

import lombok.Builder;
import lombok.Data;
import java.util.Map;

@Data
@Builder
public class DashboardStatsDto {
    private Map<String, Long> ticketsPorEstado;
    private Map<String, Long> ticketsPorPrioridad;
    private long totalTickets;
    private long ticketsAbiertos;
}
