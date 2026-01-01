package py.com.cooperativa.reducto.sgti.specification;

import org.springframework.data.jpa.domain.Specification;
import py.com.cooperativa.reducto.sgti.entity.Ticket;

import java.time.LocalDateTime;
import java.util.UUID;

public class TicketSpecification {

    public static Specification<Ticket> withFilters(UUID estadoId, UUID prioridadId, UUID departamentoId, UUID agenteId,
            LocalDateTime startDate, LocalDateTime endDate) {
        return (root, query, criteriaBuilder) -> {
            java.util.List<jakarta.persistence.criteria.Predicate> predicates = new java.util.ArrayList<>();

            if (estadoId != null) {
                predicates.add(criteriaBuilder.equal(root.get("estado").get("id"), estadoId));
            }
            if (prioridadId != null) {
                predicates.add(criteriaBuilder.equal(root.get("prioridad").get("id"), prioridadId));
            }
            if (departamentoId != null) {
                predicates.add(criteriaBuilder.equal(root.get("departamento").get("id"), departamentoId));
            }
            if (agenteId != null) {
                predicates.add(criteriaBuilder.equal(root.get("agente").get("id"), agenteId));
            }
            if (startDate != null && endDate != null) {
                predicates.add(criteriaBuilder.between(root.get("fechaCreacion"), startDate, endDate));
            } else if (startDate != null) {
                predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("fechaCreacion"), startDate));
            } else if (endDate != null) {
                predicates.add(criteriaBuilder.lessThanOrEqualTo(root.get("fechaCreacion"), endDate));
            }

            return criteriaBuilder.and(predicates.toArray(new jakarta.persistence.criteria.Predicate[0]));
        };
    }
}
