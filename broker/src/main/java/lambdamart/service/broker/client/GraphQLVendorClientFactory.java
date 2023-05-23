package lambdamart.service.broker.client;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;

@Service
public class GraphQLVendorClientFactory {

    private final Map<String, GraphQLVendorClient> vendorClients = new HashMap<>();
    private final Environment env;
    private static final Logger LOGGER = LoggerFactory.getLogger(GraphQLVendorClientFactory.class);

    public GraphQLVendorClientFactory(Environment env) {
        this.env = env;
    }

    @PostConstruct
    public void init() {
        LOGGER.info("Initializing GraphQLVendorClientFactory");
        String vendorUrlsStr = env.getProperty("vendor.urls");
        LOGGER.info("vendorUrlsStr: " + vendorUrlsStr);
        if (vendorUrlsStr != null) {
            String[] vendorUrlPairs = vendorUrlsStr.split(",");
            for (String vendorUrlPair : vendorUrlPairs) {
                LOGGER.info("vendorUrlPair: " + vendorUrlPair);
                String[] parts = vendorUrlPair.split("=");
                if (parts.length == 2) {
                    String vendorId = parts[0].trim();
                    String url = parts[1].trim();
                    vendorClients.put(vendorId, new GraphQLVendorClient(url));
                    LOGGER.info("Initializing client for vendorId: " + vendorId + ", URL: " + url);
                }
            }
        }
    }

    public GraphQLVendorClient getClient(String vendorId) {
        return vendorClients.get(vendorId);
    }

    public Map<String, GraphQLVendorClient> getClients() {
        return vendorClients;
    }
}
