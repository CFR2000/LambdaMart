package lambdamart.service.broker.client;

import java.util.List;
import java.util.concurrent.CompletableFuture;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import graphql.schema.DataFetcher;
import lambdamart.service.broker.models.InventoryItem;
import lambdamart.service.broker.models.PurchaseResult;
import lambdamart.service.broker.models.Vendor;

@Component
public class GraphQLDataFetchers {

    @Autowired
    private VendorService vendorService;

    public DataFetcher<CompletableFuture<List<Vendor>>> getVendorDataFetcher() {
        return environment -> vendorService.getAllVendors().toFuture();
    }

    public DataFetcher<CompletableFuture<InventoryItem>> getItemDataFetcher() {
        return environment -> {
            String vendorId = environment.getArgument("vendorId");
            String itemId = environment.getArgument("itemId");
            return vendorService.getItem(vendorId, itemId).toFuture();
        };
    }

    public DataFetcher<CompletableFuture<PurchaseResult>> getPurchaseDataFetcher() {
        return environment -> {
            String vendorId = environment.getArgument("vendorId");
            String productId = environment.getArgument("productId");
            int quantity = environment.getArgument("quantity");
            return vendorService.purchase(vendorId, productId, quantity).toFuture();
        };
    }
}
