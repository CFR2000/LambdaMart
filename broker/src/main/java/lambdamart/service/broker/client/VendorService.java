package lambdamart.service.broker.client;

import java.util.Collections;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import lambdamart.service.broker.models.InventoryItem;
import lambdamart.service.broker.models.PurchaseResult;
import lambdamart.service.broker.models.Vendor;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class VendorService {
    @Autowired
    private GraphQLVendorClientFactory clientFactory;

    public Mono<List<Vendor>> getAllVendors() {
        ObjectMapper mapper = new ObjectMapper();

        return Flux.fromIterable(clientFactory.getClients().keySet())
                .flatMap(vendorId -> {
                    GraphQLVendorClient client = clientFactory.getClient(vendorId);
                    String query = "{ vendor { title description icon inventory { id stock_level price } } }";

                    return client.perform(query, null)
                            .flatMap(responseEntity -> {
                                if (!responseEntity.getStatusCode().is2xxSuccessful()) {
                                    System.err.println("Request failed: " + responseEntity.getBody());
                                    return Mono.empty();
                                }

                                String response = responseEntity.getBody();

                                try {
                                    // parse the response
                                    Map<String, Object> responseMap = mapper.readValue(response, new TypeReference<>() {
                                    });
                                    Map<String, Object> dataMap = (Map<String, Object>) responseMap.get("data");
                                    Map<String, Object> vendorData = (Map<String, Object>) dataMap.get("vendor");

                                    // convert the vendor data into a Vendor object and return it
                                    return Mono.just(mapper.convertValue(vendorData, Vendor.class));
                                } catch (Exception e) {
                                    System.err.println("Failed to parse the response: " + e);
                                    return Mono.empty();
                                }
                            });
                })
                .collectList()
                .onErrorReturn(Collections.emptyList());
    }

    public Mono<InventoryItem> getItem(String vendorId, String itemId) {
        GraphQLVendorClient client = clientFactory.getClient(vendorId);
        String query = "{ item(id: \"" + itemId + "\") { id stock_level price } }";

        return client.perform(query, null)
                .flatMap(responseEntity -> {
                    if (!responseEntity.getStatusCode().is2xxSuccessful()) {
                        System.err.println("Request failed: " + responseEntity.getBody());
                        return Mono.just(new InventoryItem());
                    }

                    String response = responseEntity.getBody();

                    ObjectMapper mapper = new ObjectMapper();
                    try {
                        // parse the response
                        Map<String, Object> responseMap = mapper.readValue(response, new TypeReference<>() {
                        });

                        // extract the "data" and "item" from the response
                        Map<String, Object> dataMap = (Map<String, Object>) responseMap.get("data");
                        Map<String, Object> itemMap = (Map<String, Object>) dataMap.get("item");

                        return Mono.just(mapper.convertValue(itemMap, InventoryItem.class));
                    } catch (Exception e) {
                        System.err.println("Failed to parse the response: " + e);
                        return Mono.just(new InventoryItem());
                    }
                });
    }

    public Mono<PurchaseResult> purchase(String vendorId, String productId, int quantity) {
        GraphQLVendorClient client = clientFactory.getClient(vendorId);
        String mutation = "mutation { purchase(id: \"" + productId + "\", quantity: "
                + quantity + ") }";

        return client.perform(mutation, null)
                .flatMap(responseEntity -> {
                    if (!responseEntity.getStatusCode().is2xxSuccessful()) {
                        System.err.println("Request failed: " + responseEntity.getBody());
                        return Mono.just(PurchaseResult.ITEM_NOT_FOUND);
                    }

                    String response = responseEntity.getBody();

                    ObjectMapper mapper = new ObjectMapper();

                    try {
                        // parse the response
                        Map<String, Object> responseMap = mapper.readValue(response, new TypeReference<>() {
                        });
                        Map<String, Object> dataMap = (Map<String, Object>) responseMap.get("data");

                        String purchaseResult = (String) dataMap.get("purchase");

                        // convert the result to a PurchaseResult enum
                        return Mono.just(PurchaseResult.valueOf(purchaseResult.toUpperCase()));
                    } catch (Exception e) {
                        System.err.println("Failed to parse the response: " + e);
                        return Mono.just(PurchaseResult.ITEM_NOT_FOUND);
                    }
                });
    }

}
