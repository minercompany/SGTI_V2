package py.com.cooperativa.reducto.sgti.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import py.com.cooperativa.reducto.sgti.dto.CreateRespuestaDto;
import py.com.cooperativa.reducto.sgti.dto.CreateTicketDto;
import py.com.cooperativa.reducto.sgti.dto.TicketResponseDto;
import py.com.cooperativa.reducto.sgti.dto.UpdateTicketDto;
import py.com.cooperativa.reducto.sgti.entity.Usuario;
import py.com.cooperativa.reducto.sgti.repository.UsuarioRepository;
import py.com.cooperativa.reducto.sgti.service.TicketService;

import java.util.UUID;

/**
 * Controlador REST para tickets
 */
@RestController
@RequestMapping("/api/tickets")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "http://localhost:3000")
public class TicketController {

    private final TicketService ticketService;
    private final UsuarioRepository usuarioRepository;
    private final py.com.cooperativa.reducto.sgti.service.ReportService reportService;

    @PostMapping
    public ResponseEntity<TicketResponseDto> createTicket(
            @Valid @RequestBody CreateTicketDto dto,
            Authentication authentication) {
        log.info("Creating ticket: {}", dto.getAsunto());

        Usuario usuario = usuarioRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        TicketResponseDto response = ticketService.createTicket(dto, usuario.getId());
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping
    public ResponseEntity<Page<TicketResponseDto>> listTickets(
            Pageable pageable,
            @RequestParam(required = false) UUID estadoId,
            @RequestParam(required = false) UUID prioridadId,
            @RequestParam(required = false) UUID departamentoId,
            @RequestParam(required = false) UUID agenteId,
            @RequestParam(required = false) @org.springframework.format.annotation.DateTimeFormat(iso = org.springframework.format.annotation.DateTimeFormat.ISO.DATE_TIME) java.time.LocalDateTime startDate,
            @RequestParam(required = false) @org.springframework.format.annotation.DateTimeFormat(iso = org.springframework.format.annotation.DateTimeFormat.ISO.DATE_TIME) java.time.LocalDateTime endDate) {
        log.info("Listing tickets with filters");
        Page<TicketResponseDto> tickets = ticketService.listTickets(pageable, estadoId, prioridadId, departamentoId,
                agenteId, startDate, endDate);
        return ResponseEntity.ok(tickets);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TicketResponseDto> getTicket(@PathVariable UUID id) {
        log.info("Getting ticket: {}", id);
        TicketResponseDto ticket = ticketService.getTicketById(id);
        return ResponseEntity.ok(ticket);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<TicketResponseDto> updateTicket(
            @PathVariable UUID id,
            @Valid @RequestBody UpdateTicketDto dto,
            Authentication authentication) {
        log.info("Updating ticket: {}", id);

        Usuario usuario = usuarioRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        TicketResponseDto response = ticketService.updateTicket(id, dto, usuario.getId());
        return ResponseEntity.ok(response);
    }

    @PostMapping("/{id}/responses")
    public ResponseEntity<Void> addResponse(
            @PathVariable UUID id,
            @Valid @RequestBody CreateRespuestaDto dto,
            Authentication authentication) {
        log.info("Adding response to ticket: {}", id);

        Usuario usuario = usuarioRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        ticketService.addResponse(id, dto, usuario.getId());
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping("/stats")
    public ResponseEntity<py.com.cooperativa.reducto.sgti.dto.DashboardStatsDto> getStats(
            @RequestParam(required = false) @org.springframework.format.annotation.DateTimeFormat(iso = org.springframework.format.annotation.DateTimeFormat.ISO.DATE_TIME) java.time.LocalDateTime startDate,
            @RequestParam(required = false) @org.springframework.format.annotation.DateTimeFormat(iso = org.springframework.format.annotation.DateTimeFormat.ISO.DATE_TIME) java.time.LocalDateTime endDate) {
        return ResponseEntity.ok(ticketService.getDashboardStats(startDate, endDate));
    }

    @GetMapping("/export/excel")
    public ResponseEntity<byte[]> exportExcel(
            @RequestParam(required = false) UUID estadoId,
            @RequestParam(required = false) UUID prioridadId,
            @RequestParam(required = false) UUID departamentoId,
            @RequestParam(required = false) UUID agenteId,
            @RequestParam(required = false) @org.springframework.format.annotation.DateTimeFormat(iso = org.springframework.format.annotation.DateTimeFormat.ISO.DATE_TIME) java.time.LocalDateTime startDate,
            @RequestParam(required = false) @org.springframework.format.annotation.DateTimeFormat(iso = org.springframework.format.annotation.DateTimeFormat.ISO.DATE_TIME) java.time.LocalDateTime endDate)
            throws java.io.IOException {

        org.springframework.data.domain.Pageable unpaged = org.springframework.data.domain.Pageable.unpaged();
        org.springframework.data.domain.Page<py.com.cooperativa.reducto.sgti.dto.TicketResponseDto> tickets = ticketService
                .listTickets(unpaged, estadoId, prioridadId, departamentoId, agenteId, startDate, endDate);
        py.com.cooperativa.reducto.sgti.dto.DashboardStatsDto stats = ticketService.getDashboardStats(startDate,
                endDate);

        byte[] excelContent = reportService.generateExcelReport(tickets.getContent(), stats);

        return ResponseEntity.ok()
                .header(org.springframework.http.HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\"reporte_tickets.xlsx\"")
                .contentType(org.springframework.http.MediaType
                        .parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
                .body(excelContent);
    }

    @GetMapping("/export/pdf")
    public ResponseEntity<byte[]> exportPdf(
            @RequestParam(required = false) UUID estadoId,
            @RequestParam(required = false) UUID prioridadId,
            @RequestParam(required = false) UUID departamentoId,
            @RequestParam(required = false) UUID agenteId,
            @RequestParam(required = false) @org.springframework.format.annotation.DateTimeFormat(iso = org.springframework.format.annotation.DateTimeFormat.ISO.DATE_TIME) java.time.LocalDateTime startDate,
            @RequestParam(required = false) @org.springframework.format.annotation.DateTimeFormat(iso = org.springframework.format.annotation.DateTimeFormat.ISO.DATE_TIME) java.time.LocalDateTime endDate) {

        org.springframework.data.domain.Pageable unpaged = org.springframework.data.domain.Pageable.unpaged();
        org.springframework.data.domain.Page<py.com.cooperativa.reducto.sgti.dto.TicketResponseDto> tickets = ticketService
                .listTickets(unpaged, estadoId, prioridadId, departamentoId, agenteId, startDate, endDate);
        py.com.cooperativa.reducto.sgti.dto.DashboardStatsDto stats = ticketService.getDashboardStats(startDate,
                endDate);

        byte[] pdfContent = reportService.generatePdfReport(tickets.getContent(), stats);

        return ResponseEntity.ok()
                .header(org.springframework.http.HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\"reporte_tickets.pdf\"")
                .contentType(org.springframework.http.MediaType.APPLICATION_PDF)
                .body(pdfContent);
    }
}
