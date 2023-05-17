package lambdamart.service.broker.models;

import java.util.List;

public class Vendor {
    private String title;
    private String description;
    private String icon;
    private List<InventoryItem> inventory;

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

    public List<InventoryItem> getInventory() {
        return inventory;
    }

    public void setInventory(List<InventoryItem> inventory) {
        this.inventory = inventory;
    }

    @Override
    public String toString() {
        return String.format("Vendor[title=%s, description=%s, icon=%s, inventory=%s]", title, description, icon,
                inventory);
    }
}
