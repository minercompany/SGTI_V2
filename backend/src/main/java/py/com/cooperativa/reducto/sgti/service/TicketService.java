package py.com.cooperativa.reducto.sgti.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import py.com.cooperativa.reducto.sgti.dto.CreateRespuestaDto;
import py.com.cooperativa.reducto.sgti.dto.CreateTicketDto;
import py.com.cooperativa.reducto.sgti.dto.TicketResponseDto;
import py.com.cooperativa.reducto.sgti.dto.UpdateTicketDto;
import py.com.cooperativa.reducto.sgti.entity.*;
import py.com.cooperativa.reducto.sgti.repository.*;

import java.time.LocalDateTime;
import java.time.Year;
import java.util.UUID;

/**
 * Servicio para gestión de tickets
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class TicketService {

        private final TicketRepository ticketRepository;
        private final UsuarioRepository usuarioRepository;
        private final DepartamentoRepository departamentoRepository;
        private final EstadoRepository estadoRepository;
        private final PrioridadRepository prioridadRepository;
        private final NotificationService notificationService;

        @Transactional
        public TicketResponseDto createTicket(CreateTicketDto dto, UUID solicitanteId) {
                // Obtener solicitante
                Usuario solicitante = usuarioRepository.findById(solicitanteId)
                                .orElseThrow(() -> new RuntimeException("Solicitante no encontrado"));

                // Obtener departamento
                Departamento departamento = departamentoRepository.findById(dto.getDepartamentoId())
                                .orElseThrow(() -> new RuntimeException("Departamento no encontrado"));

                // Obtener prioridad
                Prioridad prioridad = prioridadRepository.findById(dto.getPrioridadId())
                                .orElseThrow(() -> new RuntimeException("Prioridad no encontrada"));

                // Obtener estado inicial (primer estado, abierto)
                Estado estadoInicial = estadoRepository.findByNombre("Abierto")
                                .orElseThrow(() -> new RuntimeException("Estado Abierto no encontrado"));

                // Generar número de ticket
                String numero = generateTicketNumber();

                // Crear ticket
                Ticket ticket = Ticket.builder()
                                .numero(numero)
                                .asunto(dto.getAsunto())
                                .descripcion(dto.getDescripcion())
                                .solicitante(solicitante)
                                .departamento(departamento)
                                .prioridad(prioridad)
                                .estado(estadoInicial)
                                .fechaCreacion(LocalDateTime.now())
                                .fechaActualizacion(LocalDateTime.now())
                                .slaPausado(false)
                                .build();

                // Asignar agente si se especificó
                if (dto.getAgenteId() != null) {
                        Usuario agente = usuarioRepository.findById(dto.getAgenteId())
                                        .orElseThrow(() -> new RuntimeException("Agente no encontrado"));
                        ticket.setAgente(agente);
                }

                // Guardar
                ticket = ticketRepository.save(ticket);

                // Registrar en historial
                HistorialTicket historial = HistorialTicket.builder()
                                .tipoAccion("CREACION")
                                .comentario("Ticket creado")
                                .usuario(solicitante)
                                .timestamp(LocalDateTime.now())
                                .build();
                ticket.agregarHistorial(historial);

                log.info("Ticket creado: {} por usuario: {}", numero, solicitante.getEmail());

                // Emitir evento WebSocket
                notificationService.sendTicketEvent(
                                "CREATED",
                                ticket.getId(),
                                ticket.getNumero(),
                                departamento.getId(),
                                String.format("Nuevo ticket: %s", ticket.getAsunto()),
                                convertToDto(ticket));

                return convertToDto(ticket);
        }

        @Transactional(readOnly = true)
        public Page<TicketResponseDto> listTickets(Pageable pageable, UUID estadoId, UUID prioridadId,
                        UUID departamentoId, UUID agenteId, LocalDateTime startDate, LocalDateTime endDate) {
                org.springframework.data.jpa.domain.Specification<Ticket> spec = py.com.cooperativa.reducto.sgti.specification.TicketSpecification
                                .withFilters(estadoId, prioridadId, departamentoId, agenteId, startDate, endDate);
                return ticketRepository.findAll(spec, pageable)
                                .map(this::convertToDto);
        }

        @Transactional(readOnly = true)
        public TicketResponseDto getTicketById(UUID id) {
                Ticket ticket = ticketRepository.findById(id)
                                .orElseThrow(() -> new RuntimeException("Ticket no encontrado"));
                return convertToDto(ticket);
        }

        @Transactional
        public TicketResponseDto updateTicket(UUID id, UpdateTicketDto dto, UUID usuarioId) {
                Ticket ticket = ticketRepository.findById(id)
                                .orElseThrow(() -> new RuntimeException("Ticket no encontrado"));

                Usuario usuario = usuarioRepository.findById(usuarioId)
                                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

                // Actualizar campos si vienen
                if (dto.getAsunto() != null) {
                        ticket.setAsunto(dto.getAsunto());
                }
                if (dto.getDescripcion() != null) {
                        ticket.setDescripcion(dto.getDescripcion());
                }
                if (dto.getPrioridadId() != null) {
                        Prioridad prioridad = prioridadRepository.findById(dto.getPrioridadId())
                                        .orElseThrow(() -> new RuntimeException("Prioridad no encontrada"));
                        ticket.setPrioridad(prioridad);
                        HistorialTicket hist1 = HistorialTicket.builder()
                                        .tipoAccion("CAMBIO_PRIORIDAD")
                                        .valorNuevo(prioridad.getNombre())
                                        .comentario("Prioridad cambiada")
                                        .usuario(usuario)
                                        .timestamp(LocalDateTime.now())
                                        .build();
                        ticket.agregarHistorial(hist1);
                }
                if (dto.getAgenteId() != null) {
                        Usuario agente = usuarioRepository.findById(dto.getAgenteId())
                                        .orElseThrow(() -> new RuntimeException("Agente no encontrado"));
                        ticket.setAgente(agente);
                        HistorialTicket hist2 = HistorialTicket.builder()
                                        .tipoAccion("ASIGNACION")
                                        .valorNuevo(agente.getNombreCompleto())
                                        .comentario("Ticket asignado")
                                        .usuario(usuario)
                                        .timestamp(LocalDateTime.now())
                                        .build();
                        ticket.agregarHistorial(hist2);
                }
                if (dto.getEstadoId() != null) {
                        Estado estado = estadoRepository.findById(dto.getEstadoId())
                                        .orElseThrow(() -> new RuntimeException("Estado no encontrado"));
                        ticket.setEstado(estado);
                        HistorialTicket hist3 = HistorialTicket.builder()
                                        .tipoAccion("CAMBIO_ESTADO")
                                        .valorNuevo(estado.getNombre())
                                        .comentario("Estado cambiado")
                                        .usuario(usuario)
                                        .timestamp(LocalDateTime.now())
                                        .build();
                        ticket.agregarHistorial(hist3);
                }

                ticket.setFechaActualizacion(LocalDateTime.now());
                ticket = ticketRepository.save(ticket);

                return convertToDto(ticket);
        }

        @Transactional
        public void addResponse(UUID ticketId, CreateRespuestaDto dto, UUID autorId) {
                Ticket ticket = ticketRepository.findById(ticketId)
                                .orElseThrow(() -> new RuntimeException("Ticket no encontrado"));

                Usuario autor = usuarioRepository.findById(autorId)
                                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

                Respuesta respuesta = Respuesta.builder()
                                .contenido(dto.getContenido())
                                .esInterna(dto.getEsInterna())
                                .autor(autor)
                                .fechaCreacion(LocalDateTime.now())
                                .build();

                ticket.agregarRespuesta(respuesta);

                // Si es la primera respuesta, registrar fecha
                if (ticket.getFechaPrimeraRespuesta() == null) {
                        ticket.setFechaPrimeraRespuesta(LocalDateTime.now());
                }

                ticket.setFechaActualizacion(LocalDateTime.now());
                ticketRepository.save(ticket);

                log.info("Respuesta agregada al ticket: {}", ticket.getNumero());
        }

        @Transactional(readOnly = true)
        public py.com.cooperativa.reducto.sgti.dto.DashboardStatsDto getDashboardStats(
                        java.time.LocalDateTime startDate, java.time.LocalDateTime endDate) {
                if (startDate == null) {
                        startDate = java.time.LocalDateTime.now().minusMonths(1);
                }
                if (endDate == null) {
                        endDate = java.time.LocalDateTime.now();
                }

                java.util.List<Object[]> byEstado = ticketRepository.countTicketsByEstadoBetween(startDate, endDate);
                java.util.List<Object[]> byPrioridad = ticketRepository.countTicketsByPrioridadBetween(startDate,
                                endDate);

                java.util.Map<String, Long> estadoMap = new java.util.HashMap<>();
                for (Object[] row : byEstado) {
                        estadoMap.put((String) row[0], (Long) row[1]);
                }

                java.util.Map<String, Long> prioridadMap = new java.util.HashMap<>();
                for (Object[] row : byPrioridad) {
                        prioridadMap.put((String) row[0], (Long) row[1]);
                }

                long total = ticketRepository.countByFechaCreacionBetween(startDate, endDate);
                Long abiertos = estadoMap.getOrDefault("Abierto", 0L);

                return py.com.cooperativa.reducto.sgti.dto.DashboardStatsDto.builder()
                                .ticketsPorEstado(estadoMap)
                                .ticketsPorPrioridad(prioridadMap)
                                .totalTickets(total)
                                .ticketsAbiertos(abiertos)
                                .build();
        }

        private String generateTicketNumber() {
                // Formato: SGTI-2024-00001
                int currentYear = Year.now().getValue();
                long count = ticketRepository.count() + 1;
                return String.format("SGTI-%d-%05d", currentYear, count);
        }

        private TicketResponseDto convertToDto(Ticket ticket) {
                return TicketResponseDto.builder()
                                .id(ticket.getId())
                                .numero(ticket.getNumero())
                                .asunto(ticket.getAsunto())
                                .descripcion(ticket.getDescripcion())
                                .departamento(TicketResponseDto.SimpleDepartamentoDto.builder()
                                                .id(ticket.getDepartamento().getId())
                                                .nombre(ticket.getDepartamento().getNombre())
                                                .color(ticket.getDepartamento().getColor())
                                                .build())
                                .estado(TicketResponseDto.SimpleEstadoDto.builder()
                                                .id(ticket.getEstado().getId())
                                                .nombre(ticket.getEstado().getNombre())
                                                .tipo(ticket.getEstado().getTipo().name())
                                                .colorHex(ticket.getEstado().getColorHex())
                                                .build())
                                .prioridad(TicketResponseDto.SimplePrioridadDto.builder()
                                                .id(ticket.getPrioridad().getId())
                                                .nombre(ticket.getPrioridad().getNombre())
                                                .nivel(ticket.getPrioridad().getNivel())
                                                .colorHex(ticket.getPrioridad().getColorHex())
                                                .build())
                                .solicitante(TicketResponseDto.SimpleUsuarioDto.builder()
                                                .id(ticket.getSolicitante().getId())
                                                .nombreCompleto(ticket.getSolicitante().getNombreCompleto())
                                                .email(ticket.getSolicitante().getEmail())
                                                .build())
                                .agente(ticket.getAgente() != null ? TicketResponseDto.SimpleUsuarioDto.builder()
                                                .id(ticket.getAgente().getId())
                                                .nombreCompleto(ticket.getAgente().getNombreCompleto())
                                                .email(ticket.getAgente().getEmail())
                                                .build() : null)
                                .fechaCreacion(ticket.getFechaCreacion())
                                .fechaActualizacion(ticket.getFechaActualizacion())
                                .fechaPrimeraRespuesta(ticket.getFechaPrimeraRespuesta())
                                .fechaCierre(ticket.getFechaCierre())
                                .fechaVencimientoSla(ticket.getFechaVencimientoSla())
                                .slaPausado(ticket.getSlaPausado())
                                .numeroRespuestas(ticket.getRespuestas() != null ? ticket.getRespuestas().size() : 0)
                                .build();
        }
}
