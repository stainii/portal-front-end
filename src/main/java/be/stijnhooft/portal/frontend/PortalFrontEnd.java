package be.stijnhooft.portal.frontend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.transaction.annotation.EnableTransactionManagement;

/**
 * Startup point of the application.
 **/
@SpringBootApplication
@EnableTransactionManagement
public class PortalFrontEnd {
    public static void main(String[] args) {
        SpringApplication.run(PortalFrontEnd.class, args);
    }
}
