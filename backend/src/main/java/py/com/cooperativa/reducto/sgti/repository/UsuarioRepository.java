package py.com.cooperativa.reducto.sgti.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;
import py.com.cooperativa.reducto.sgti.entity.Usuario;

import java.util.Optional;
import java.util.UUID;

/**
 * Repositorio para Usuario
 */
@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, UUID>, JpaSpecificationExecutor<Usuario> {

    Optional<Usuario> findByEmail(String email);

    Optional<Usuario> findByCedula(String cedula);

    boolean existsByEmail(String email);

    boolean existsByCedula(String cedula);
}
