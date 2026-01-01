package py.com.cooperativa.reducto.sgti;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;

/**
 * SGTI Enterprise - Sistema de Gestión Integral por Tickets
 * Cooperativa Reducto
 * 
 * @author SGTI Team
 * @version 1.0.0
 */
@SpringBootApplication
@EnableJpaAuditing
@EnableAsync
@EnableScheduling
public class SgtiApplication {

    public static void main(String[] args) {
        SpringApplication.run(SgtiApplication.class, args);
    }
}
