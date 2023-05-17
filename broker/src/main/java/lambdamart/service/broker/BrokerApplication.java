package lambdamart.service.broker;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import lambdamart.service.broker.client.GraphQLVendorClient;

@SpringBootApplication
public class BrokerApplication {

	public static void main(String[] args) {
		SpringApplication.run(BrokerApplication.class, args);

		GraphQLVendorClient client = new GraphQLVendorClient("http://veggie-gophers:8080/query");

		String query = "{ vendor { title description icon inventory { id stock_level price } } }";
		String response = client.perform(query, null);

		System.out.println(response);
	}

}
