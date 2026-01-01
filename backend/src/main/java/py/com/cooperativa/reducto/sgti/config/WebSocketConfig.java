package py.com.cooperativa.reducto.sgti.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

/**
 * Configuración WebSocket para notificaciones en tiempo real
 * Sprint 1: Activación Premium
 */
@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        // Habilitar un simple broker en memoria
        config.enableSimpleBroker("/topic", "/queue");

        // Prefijo para mensajes desde el cliente
        config.setApplicationDestinationPrefixes("/app");
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        // Endpoint WebSocket
        registry.addEndpoint("/ws")
                .setAllowedOrigins("http://localhost:3000") // Frontend
                .withSockJS(); // Fallback para navegadores antiguos
    }
}
