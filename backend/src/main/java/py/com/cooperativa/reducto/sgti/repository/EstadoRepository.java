package py.com.cooperativa.reducto.sgti.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import py.com.cooperativa.reducto.sgti.entity.Estado;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface EstadoRepository extends JpaRepository<Estado, UUID> {
    Optional<Estado> findByNombre(String nombre);

    List<Estado> findByActivoTrue();
}
