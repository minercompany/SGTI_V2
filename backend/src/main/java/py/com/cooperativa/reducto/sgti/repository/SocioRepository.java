package py.com.cooperativa.reducto.sgti.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import py.com.cooperativa.reducto.sgti.entity.Socio;
import java.util.UUID;
import java.util.Optional;

public interface SocioRepository extends JpaRepository<Socio, UUID> {
    Optional<Socio> findByCedula(String cedula);
}
