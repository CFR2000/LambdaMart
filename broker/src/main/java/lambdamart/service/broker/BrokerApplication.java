package lambdamart.service.broker;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import lambdamart.service.broker.client.VendorService;

@SpringBootApplication
public class BrokerApplication {

	public static void main(String[] args) {
		SpringApplication.run(BrokerApplication.class, args);
	}

	@Bean
	public CommandLineRunner commandLineRunner(VendorService vendorService) {
		return args -> {

			vendorService.getItem("veggie-gophers", "1")
					.subscribe(result -> System.out.println(result));
		};
	}

}
