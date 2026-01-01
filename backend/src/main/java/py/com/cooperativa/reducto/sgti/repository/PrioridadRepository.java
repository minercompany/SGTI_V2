package py.com.cooperativa.reducto.sgti.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import py.com.cooperativa.reducto.sgti.entity.Prioridad;

import java.util.List;
import java.util.UUID;

@Repository
public interface PrioridadRepository extends JpaRepository<Prioridad, UUID> {
    List<Prioridad> findByActivoTrueOrderByNivelAsc();
}
