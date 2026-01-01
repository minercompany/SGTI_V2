package py.com.cooperativa.reducto.sgti.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import py.com.cooperativa.reducto.sgti.entity.Departamento;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface DepartamentoRepository extends JpaRepository<Departamento, UUID> {
    Optional<Departamento> findByNombre(String nombre);

    List<Departamento> findByActivoTrue();
}
