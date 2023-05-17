package lambdamart.service.broker.client;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;

import reactor.core.publisher.Mono;

public class GraphQLVendorClient {

    private final WebClient webClient;

    public GraphQLVendorClient(String url) {
        this.webClient = WebClient.builder()
                .baseUrl(url)
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .defaultHeader(HttpHeaders.ACCEPT, MediaType.APPLICATION_JSON_VALUE)
                .build();
    }

    public String perform(String query, Object variables) {

        Map<String, Object> body = new HashMap<>();
        body.put("query", query);
        body.put("variables", variables);
    
        try {
            return webClient.post()
                    .body(BodyInserters.fromValue(body))
                    .retrieve()
                    .onStatus(status -> !status.is2xxSuccessful(), clientResponse -> 
                        Mono.error(new RuntimeException("Request failed with status code: " + clientResponse.statusCode())))
                    .bodyToMono(String.class)
                    .block();
        } catch (RuntimeException ex) {
            throw new RuntimeException(ex.getMessage());
        }
    }
    
    
}
