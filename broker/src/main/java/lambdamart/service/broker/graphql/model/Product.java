package lambdamart.service.broker.graphql.model;

public class Product {
    private String id;
    private String title;
    private String description;
    private String image;
    private String class_name;
    private int class_id;
    private String coarse_class_name;
    private int coarse_class_id;
    private String iconic_image_path;

    public Product(String id, String title, String description, String image, String class_name, int class_id, String coarse_class_name, int coarse_class_id, String iconic_image_path) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.image = image;
        this.class_name = class_name;
        this.class_id = class_id;
        this.coarse_class_name = coarse_class_name;
        this.coarse_class_id = coarse_class_id;
        this.iconic_image_path = iconic_image_path;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
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

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getClass_name() {
        return class_name;
    }

    public void setClass_name(String class_name) {
        this.class_name = class_name;
    }

    public int getClass_id() {
        return class_id;
    }

    public void setClass_id(int class_id) {
        this.class_id = class_id;
    }

    public String getCoarse_class_name() {
        return coarse_class_name;
    }

    public void setCoarse_class_name(String coarse_class_name) {
        this.coarse_class_name = coarse_class_name;
    }

    public int getCoarse_class_id() {
        return coarse_class_id;
    }

    public void setCoarse_class_id(int coarse_class_id) {
        this.coarse_class_id = coarse_class_id;
    }

    public String getIconic_image_path() {
        return iconic_image_path;
    }

    public void setIconic_image_path(String iconic_image_path) {
        this.iconic_image_path = iconic_image_path;
    }
}
