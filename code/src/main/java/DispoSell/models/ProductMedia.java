package DispoSell.models;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.time.ZonedDateTime;

@Entity
@Table(name = "productmedia",
        uniqueConstraints = {
        @UniqueConstraint(columnNames = { "productID", "url" })
})
public class ProductMedia {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Size(max = 250)
    @NotBlank
    private String url;

    @Size(max = 30)
    @NotBlank
    @Column(name = "fileType")
    private String fileType;

    @ManyToOne
    @JoinColumn(name = "productID", nullable = false)
    private Product product;

    @OneToOne
    @JoinColumn(name = "publisherID", referencedColumnName = "id")
    private User publisher;

    @Column(name = "publishedDate")
    private ZonedDateTime publishedDate;

    public ProductMedia() {
    }

    public ProductMedia(Product product, String url, String fileType, User publisher) {
        this.product = product;
        this.url = url;
        this.fileType = fileType;
        this.publisher = publisher;
        if (this.publisher != null)
            this.publishedDate = java.time.ZonedDateTime.now();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getFileType() {
        return fileType;
    }

    public void setFileType(String fileType) {
        this.fileType = fileType;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
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
}
