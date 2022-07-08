package DispoSell.models;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.ZonedDateTime;
import java.util.Set;

@Entity
@Table(name = "products",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = "productID")
        })
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long productID;

    @Size(max = 100)
    @NotBlank
    private String name;

    @Size(max = 250)
    private String description;

    @Size(max = 20)
    private String material;

    @Size(max = 20)
    private String color;

    private Float height;

    private Float width;

    private Float length;

    @NotNull
    private Integer availableQuantity;

    @NotNull
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "conditionID", referencedColumnName = "conditionID")
    private ProductCondition condition;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "categoryID", referencedColumnName = "categoryID")
    private ProductCategory category;

    private Float estimatedPrice;

    private Float estimatedCost;

    private Float credit;

    private Float sellingPrice;

    private Float actualCost;

    @OneToOne
    @JoinColumn(name = "approverID", referencedColumnName = "id")
    private User approver;

    private ZonedDateTime approvedDate;

    @OneToOne
    @JoinColumn(name = "verifierID", referencedColumnName = "id")
    private User verifier;

    private ZonedDateTime verifiedDate;

    @OneToOne
    @JoinColumn(name = "publisherID", referencedColumnName = "id")
    private User publisher;

    private ZonedDateTime publishedDate;

    @OneToMany(mappedBy = "product")
    @JsonManagedReference
    private Set<ProductMedia> productMedia;

    public Product() {
    }

    public Long getProductID() {
        return productID;
    }

    public void setProductID(Long productID) {
        this.productID = productID;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getMaterial() {
        return material;
    }

    public void setMaterial(String material) {
        this.material = material;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public Float getHeight() {
        return height;
    }

    public void setHeight(Float height) {
        this.height = height;
    }

    public Float getWidth() {
        return width;
    }

    public void setWidth(Float width) {
        this.width = width;
    }

    public Float getLength() {
        return length;
    }

    public void setLength(Float length) {
        this.length = length;
    }

    public Integer getAvailableQuantity() {
        return availableQuantity;
    }

    public void setAvailableQuantity(Integer quantity) {
        this.availableQuantity = quantity;
    }

    public ProductCondition getCondition() {
        return condition;
    }

    public void setCondition(ProductCondition condition) {
        this.condition = condition;
    }

    public ProductCategory getCategory() {
        return category;
    }

    public void setCategory(ProductCategory category) {
        this.category = category;
    }

    public Float getEstimatedPrice() {
        return estimatedPrice;
    }

    public void setEstimatedPrice(Float estimatedPrice) {
        this.estimatedPrice = estimatedPrice;
    }

    public Float getEstimatedCost() {
        return estimatedCost;
    }

    public void setEstimatedCost(Float estimatedCost) {
        this.estimatedCost = estimatedCost;
    }

    public Float getCredit() {
        return credit;
    }

    public void setCredit(Float credit) {
        this.credit = credit;
    }

    public Float getSellingPrice() {
        return sellingPrice;
    }

    public void setSellingPrice(Float sellingPrice) {
        this.sellingPrice = sellingPrice;
    }

    public Float getActualCost() {
        return actualCost;
    }

    public void setActualCost(Float actualCost) {
        this.actualCost = actualCost;
    }

    public User getApprover() {
        return approver;
    }

    public void setApprover(User approver) {
        this.approver = approver;
    }

    public ZonedDateTime getApprovedDate() {
        return approvedDate;
    }

    public void setApprovedDate(ZonedDateTime approvedDate) {
        this.approvedDate = approvedDate;
    }

    public User getVerifier() {
        return verifier;
    }

    public void setVerifier(User verifier) {
        this.verifier = verifier;
    }

    public ZonedDateTime getVerifiedDate() {
        return verifiedDate;
    }

    public void setVerifiedDate(ZonedDateTime verifiedDate) {
        this.verifiedDate = verifiedDate;
    }

    public User getPublisher() {
        return publisher;
    }

    public void setPublisher(User publisher) {
        this.publisher = publisher;
    }

    public ZonedDateTime getPublishedDate() {
        return publishedDate;
    }

    public void setPublishedDate(ZonedDateTime publishedDate) {
        this.publishedDate = publishedDate;
    }

    public Set<ProductMedia> getProductMedia() {
        return productMedia;
    }

    public void setProductMedia(Set<ProductMedia> productMedia) {
        this.productMedia = productMedia;
    }
}
