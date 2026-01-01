package py.com.cooperativa.reducto.sgti.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;
import py.com.cooperativa.reducto.sgti.entity.Ticket;

import java.util.Optional;
import java.util.UUID;

/**
 * Repositorio para Ticket
 */
@Repository
public interface TicketRepository extends JpaRepository<Ticket, UUID>, JpaSpecificationExecutor<Ticket> {

    Optional<Ticket> findByNumero(String numero);

    @org.springframework.data.jpa.repository.Query("SELECT t.estado.nombre, COUNT(t) FROM Ticket t WHERE t.fechaCreacion BETWEEN :startDate AND :endDate GROUP BY t.estado.nombre")
    java.util.List<Object[]> countTicketsByEstadoBetween(
            @org.springframework.data.repository.query.Param("startDate") java.time.LocalDateTime startDate,
            @org.springframework.data.repository.query.Param("endDate") java.time.LocalDateTime endDate);

    @org.springframework.data.jpa.repository.Query("SELECT t.prioridad.nombre, COUNT(t) FROM Ticket t WHERE t.fechaCreacion BETWEEN :startDate AND :endDate GROUP BY t.prioridad.nombre")
    java.util.List<Object[]> countTicketsByPrioridadBetween(
            @org.springframework.data.repository.query.Param("startDate") java.time.LocalDateTime startDate,
            @org.springframework.data.repository.query.Param("endDate") java.time.LocalDateTime endDate);

    long countByFechaCreacionBetween(java.time.LocalDateTime startDate, java.time.LocalDateTime endDate);
}
