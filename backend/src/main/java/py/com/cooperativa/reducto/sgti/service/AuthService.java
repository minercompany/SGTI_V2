package py.com.cooperativa.reducto.sgti.service;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import py.com.cooperativa.reducto.sgti.config.JwtUtil;
import py.com.cooperativa.reducto.sgti.dto.LoginRequest;
import py.com.cooperativa.reducto.sgti.dto.LoginResponse;
import py.com.cooperativa.reducto.sgti.entity.Auditoria;
import py.com.cooperativa.reducto.sgti.entity.Usuario;
import py.com.cooperativa.reducto.sgti.repository.AuditoriaRepository;
import py.com.cooperativa.reducto.sgti.repository.UsuarioRepository;

import java.time.LocalDateTime;

/**
 * Servicio de autenticación
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final UsuarioRepository usuarioRepository;
    private final AuditoriaRepository auditoriaRepository;
    private final JwtUtil jwtUtil;

    @Transactional
    public LoginResponse login(LoginRequest request, HttpServletRequest httpRequest) {
        try {
            // Authenticate
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));

            // Get user
            Usuario usuario = usuarioRepository.findByEmail(request.getEmail())
                    .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

            // Generate token
            String token = jwtUtil.generateToken(
                    usuario.getEmail(),
                    usuario.getId().toString(),
                    usuario.getRol().name(),
                    usuario.getNombreCompleto());

            // Update last access
            usuario.setUltimoAcceso(LocalDateTime.now());
            usuarioRepository.save(usuario);

            // Audit log
            registrarAuditoria(usuario, httpRequest, "LOGIN", true);

            // Response
            return LoginResponse.builder()
                    .token(token)
                    .type("Bearer")
                    .user(LoginResponse.UserInfo.builder()
                            .id(usuario.getId().toString())
                            .email(usuario.getEmail())
                            .nombreCompleto(usuario.getNombreCompleto())
                            .rol(usuario.getRol().name())
                            .build())
                    .build();

        } catch (AuthenticationException e) {
            log.error("Login failed for: {}", request.getEmail(), e);
            // Audit failed login
            registrarAuditoriaFallida(request.getEmail(), httpRequest);
            throw new RuntimeException("Credenciales inválidas");
        }
    }

    private void registrarAuditoria(Usuario usuario, HttpServletRequest request, String accion, boolean exitoso) {
        Auditoria auditoria = Auditoria.builder()
                .entidad("usuarios")
                .entidadId(usuario.getId().toString())
                .accion(accion)
                .timestamp(LocalDateTime.now())
                .ipAddress(getClientIp(request))
                .userAgent(request.getHeader("User-Agent"))
                .usuario(usuario)
                .usuarioEmail(usuario.getEmail())
                .build();

        auditoriaRepository.save(auditoria);
    }

    private void registrarAuditoriaFallida(String email, HttpServletRequest request) {
        Auditoria auditoria = Auditoria.builder()
                .entidad("auth")
                .entidadId("login-failed")
                .accion("LOGIN_FAILED")
                .timestamp(LocalDateTime.now())
                .ipAddress(getClientIp(request))
                .userAgent(request.getHeader("User-Agent"))
                .usuarioEmail(email)
                .build();

        auditoriaRepository.save(auditoria);
    }

    public py.com.cooperativa.reducto.sgti.dto.UserProfileDto getProfile(String email) {
        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        return py.com.cooperativa.reducto.sgti.dto.UserProfileDto.builder()
                .id(usuario.getId().toString())
                .nombreCompleto(usuario.getNombreCompleto())
                .email(usuario.getEmail())
                .rol(usuario.getRol().name())
                .departamento(
                        usuario.getDepartamento() != null ? usuario.getDepartamento().getNombre() : "Sin Departamento")
                .telefono(usuario.getTelefono())
                .cedula(usuario.getCedula())
                .ultimoAcceso(usuario.getUltimoAcceso())
                .activo(usuario.getActivo())
                .ticketsCreados(usuario.getTicketsCreados().size())
                .ticketsAsignados(usuario.getTicketsAsignados().size())
                .build();
    }

    private String getClientIp(HttpServletRequest request) {
        String xfHeader = request.getHeader("X-Forwarded-For");
        if (xfHeader == null) {
            return request.getRemoteAddr();
        }
        return xfHeader.split(",")[0];
    }
}
