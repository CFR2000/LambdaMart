package lambdamart.service.broker.client;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.function.Function;

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

        List<Mono<Vendor>> vendorsMono = new ArrayList<>();

        for (String vendorId : clientFactory.getClients().keySet()) {
            GraphQLVendorClient client = clientFactory.getClient(vendorId);
            String query = "{ vendor { title description icon inventory { id stockLevel price } } }";

            vendorsMono.add(client.perform(query, null).flatMap(response -> {
                try {
                    // parse the response
                    Map<String, Object> responseMap = mapper.readValue(response, new TypeReference<>() {
                    });
                    Map<String, Object> dataMap = (Map<String, Object>) responseMap.get("data");
                    Map<String, Object> vendorData = (Map<String, Object>) dataMap.get("vendor");

                    // convert the vendor data into a Vendor object and return it as a Mono
                    return Mono.just(mapper.convertValue(vendorData, Vendor.class));
                } catch (Exception e) {
                    System.err.println("Failed to parse the response: " + e);
                    return Mono.empty();
                }
            }));
        }

        return Flux.fromIterable(vendorsMono).flatMap(Function.identity()).collectList();
    }

    public Mono<InventoryItem> getItem(String vendorId, String itemId) {
        GraphQLVendorClient client = clientFactory.getClient(vendorId);
        String query = "{ item(id: \"" + itemId + "\") { id stockLevel price } }";

        ObjectMapper mapper = new ObjectMapper();

        return client.perform(query, null).flatMap(response -> {
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
                return Mono.empty();
            }
        });
    }

    public Mono<PurchaseResult> purchase(String vendorId, String productId, int quantity) {
        GraphQLVendorClient client = clientFactory.getClient(vendorId);
        String mutation = "mutation { purchase(id: \"" + productId + "\", quantity: "
                + quantity + ") }";

        ObjectMapper mapper = new ObjectMapper();

        return client.perform(mutation, null).flatMap(response -> {
            try {
                // parse the response
                Map<String, Object> responseMap = mapper.readValue(response, new TypeReference<>() {
                });
                Map<String, Object> dataMap = (Map<String, Object>) responseMap.get("data");

                String purchaseResult = (String) dataMap.get("purchase");

                // convert the result to a PurchaseResult enum and return it as a Mono
                return Mono.just(PurchaseResult.valueOf(purchaseResult.toUpperCase()));
            } catch (Exception e) {
                System.err.println("Failed to parse the response: " + e);
                return Mono.empty();
            }
        });
    }
}
