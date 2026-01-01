package py.com.cooperativa.reducto.sgti.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import py.com.cooperativa.reducto.sgti.dto.LoginRequest;
import py.com.cooperativa.reducto.sgti.dto.LoginResponse;
import py.com.cooperativa.reducto.sgti.service.AuthService;

/**
 * Controlador de autenticación
 */
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(
            @Valid @RequestBody LoginRequest request,
            HttpServletRequest httpRequest) {
        log.info("Login attempt for: {}", request.getEmail());
        LoginResponse response = authService.login(request, httpRequest);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/me")
    public ResponseEntity<py.com.cooperativa.reducto.sgti.dto.UserProfileDto> getCurrentUser(
            java.security.Principal principal) {
        if (principal == null) {
            return ResponseEntity.status(401).build();
        }
        return ResponseEntity.ok(authService.getProfile(principal.getName()));
    }
}
