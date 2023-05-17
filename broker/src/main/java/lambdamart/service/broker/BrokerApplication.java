package lambdamart.service.broker;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import lambdamart.service.broker.client.VendorService;
import lambdamart.service.broker.models.PurchaseResult;

@SpringBootApplication
public class BrokerApplication {

	public static void main(String[] args) {
		SpringApplication.run(BrokerApplication.class, args);
	}

	@Bean
	public CommandLineRunner commandLineRunner(VendorService vendorService) {
		return args -> {

			System.out.println("Purchases:");
			PurchaseResult result = vendorService.purchase("veggie-gophers", "1", 4);
			PurchaseResult result2 = vendorService.purchase("veggie-gophers", "1", 250);
			PurchaseResult result3 = vendorService.purchase("veggie-gophers", "10", 4);

			System.out.println(result);
			System.out.println(result2);
			System.out.println(result3);
		};
	}

}
