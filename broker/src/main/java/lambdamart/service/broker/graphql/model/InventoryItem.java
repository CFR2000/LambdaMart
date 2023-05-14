package lambdamart.service.broker.graphql.model;

public class InventoryItem {
    private String title;
    private String description;
    private Double price;

    public InventoryItem(String title, String description, Double price) {
        this.title = title;
        this.description = description;
        this.price = price;
    }


    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }
}
