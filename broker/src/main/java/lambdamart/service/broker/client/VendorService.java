package lambdamart.service.broker.client;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import lambdamart.service.broker.models.InventoryItem;
import lambdamart.service.broker.models.PurchaseResult;
import lambdamart.service.broker.models.Vendor;

@Service
public class VendorService {
    @Autowired
    private GraphQLVendorClientFactory clientFactory;

    public List<Vendor> getAllVendors() {
        ObjectMapper mapper = new ObjectMapper();
        List<Vendor> vendors = new ArrayList<>();

        for (String vendorId : clientFactory.getClients().keySet()) {
            GraphQLVendorClient client = clientFactory.getClient(vendorId);
            String query = "{ vendor { title description icon inventory { id stock_level price } } }";
            String response = client.perform(query, null);

            try {
                // parse the response
                Map<String, Object> responseMap = mapper.readValue(response, new TypeReference<>() {
                });
                Map<String, Object> dataMap = (Map<String, Object>) responseMap.get("data");
                Map<String, Object> vendorData = (Map<String, Object>) dataMap.get("vendor");

                // convert the vendor data into a Vendor object and add it to the list
                vendors.add(mapper.convertValue(vendorData, Vendor.class));
            } catch (Exception e) {
                System.err.println("Failed to parse the response: " + e);
                return vendors;
            }
        }

        return vendors;
    }

    public InventoryItem getItem(String vendorId, String itemId) {
        GraphQLVendorClient client = clientFactory.getClient(vendorId);
        String query = "{ item(id: \"" + itemId + "\") { id stock_level price } }";
        String response = client.perform(query, null);

        ObjectMapper mapper = new ObjectMapper();
        try {
            // parse the response
            Map<String, Object> responseMap = mapper.readValue(response, new TypeReference<>() {
            });

            // extract the "data" and "item" from the response
            Map<String, Object> dataMap = (Map<String, Object>) responseMap.get("data");
            Map<String, Object> itemMap = (Map<String, Object>) dataMap.get("item");

            return mapper.convertValue(itemMap, InventoryItem.class);
        } catch (Exception e) {
            System.err.println("Failed to parse the response: " + e);
            return new InventoryItem();
        }
    }

    public PurchaseResult purchase(String vendorId, String productId, int quantity) {
        GraphQLVendorClient client = clientFactory.getClient(vendorId);
        String mutation = "mutation { purchase(id: \"" + productId + "\", quantity: "
                + quantity + ") }";
        String response = client.perform(mutation, null);

        ObjectMapper mapper = new ObjectMapper();

        try {
            // parse the response
            Map<String, Object> responseMap = mapper.readValue(response, new TypeReference<>() {
            });
            Map<String, Object> dataMap = (Map<String, Object>) responseMap.get("data");

            String purchaseResult = (String) dataMap.get("purchase");

            // convert the result to a PurchaseResult enum
            return PurchaseResult.valueOf(purchaseResult.toUpperCase());
        } catch (Exception e) {
            System.err.println("Failed to parse the response: " + e);
            return PurchaseResult.ITEM_NOT_FOUND;
        }
    }

}
