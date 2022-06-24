package DispoSell.models;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.time.ZonedDateTime;

@Entity
@Table(name = "FurnitureMedia")
public class FurnitureMedia {
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
    @JoinColumn(name = "furnitureID", nullable = false)
    private Furniture furniture;

    @OneToOne
    @JoinColumn(name = "publisherID", referencedColumnName = "id")
    private User publisher;

    @Column(name = "publishedDate")
    private ZonedDateTime publishedDate;

    public FurnitureMedia() {
    }

    public FurnitureMedia(Furniture furniture, String url, String fileType, User publisher) {
        this.furniture = furniture;
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

    public Furniture getFurniture() {
        return furniture;
    }

    public void setFurniture(Furniture furniture) {
        this.furniture = furniture;
    }

    public User getPublisher() {
        return publisher;
    }

    public void setPublisher(User publisherID) {
        this.publisher = publisherID;
    }

    public ZonedDateTime getpublishedDate() {
        return publishedDate;
    }

    public void setpublishedDate(ZonedDateTime publishedDate) {
        this.publishedDate = publishedDate;
    }
}
