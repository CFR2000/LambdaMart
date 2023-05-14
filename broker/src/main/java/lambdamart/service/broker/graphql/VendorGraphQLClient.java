package lambdamart.service.broker.graphql;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;

import reactor.core.publisher.Mono;

@Component
public class VendorGraphQLClient {

    private final WebClient webClient;

    @Autowired
    public VendorGraphQLClient(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.baseUrl("http://localhost:8080").build();
    }

    public Mono<Map> executeQuery(String query, Map<String, Object> variables) {
        return webClient.post()
                .uri("/query")
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(Map.of("query", query, "variables", variables))
                .retrieve()
                .bodyToMono(Map.class);
    }
}
