package lambdamart.service.broker.models;

import com.fasterxml.jackson.annotation.JsonProperty;

public class InventoryItem {
    private String id;
    private int stockLevel;
    private float price;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    @JsonProperty("stock_level")
    public int getStockLevel() {
        return stockLevel;
    }

    @JsonProperty("stock_level")
    public void setStockLevel(int stockLevel) {
        this.stockLevel = stockLevel;
    }

    public float getPrice() {
        return price;
    }

    public void setPrice(float price) {
        this.price = price;
    }

    @Override
    public String toString() {
        return String.format("InventoryItem[id=%s, stockLevel=%d, price=%f]", id, stockLevel, price);
    }
}
