package lambdamart.service.broker.graphql.model;

public class Vendor {
    private String title;
    private String description;
    private String icon;
    private InventoryItem[] inventory;

    public Vendor(String title, String description, String icon, InventoryItem[] inventory) {
        this.title = title;
        this.description = description;
        this.icon = icon;
        this.inventory = inventory;
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

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }

    public InventoryItem[] getInventory() {
        return inventory;
    }

    public void setInventory(InventoryItem[] inventory) {
        this.inventory = inventory;
    }
}
