package DispoSell.models;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.time.ZonedDateTime;
import java.util.Set;

@Entity
@Table(name = "furniture",
        uniqueConstraints = {
        @UniqueConstraint(columnNames = "furnitureID")
})
public class Furniture {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long furnitureID;

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

    private Integer quantity;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "conditionID", referencedColumnName = "conditionID")
    private FurnitureCondition conditionID;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "categoryID", referencedColumnName = "categoryID")
    private FurnitureCategory categoryID;

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

    @OneToMany(mappedBy="furniture")
    private Set<FurnitureMedia> furnitureMedia;

    public Long getFurnitureID() {
        return furnitureID;
    }

    public void setFurnitureID(Long furnitureID) {
        this.furnitureID = furnitureID;
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

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public FurnitureCondition getConditionID() {
        return conditionID;
    }

    public void setConditionID(FurnitureCondition conditionID) {
        this.conditionID = conditionID;
    }

    public FurnitureCategory getCategoryID() {
        return categoryID;
    }

    public void setCategoryID(FurnitureCategory categoryID) {
        this.categoryID = categoryID;
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

    public Set<FurnitureMedia> getFurnitureMedia() {
        return furnitureMedia;
    }

    public void setFurnitureMedia(Set<FurnitureMedia> furnitureMedia) {
        this.furnitureMedia = furnitureMedia;
    }
}
