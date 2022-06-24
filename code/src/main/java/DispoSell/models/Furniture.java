package DispoSell.models;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.time.ZonedDateTime;
import java.util.Set;

@Entity
@Table(name = "Furniture")
public class Furniture {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Size(max = 100)
    @NotBlank
    private String name;

    @Size(max = 250)
    private String description;

    @OneToOne
    @JoinColumn(name = "approverID", referencedColumnName = "id")
    private User approver;

    private ZonedDateTime approvedDate;

    @OneToMany(mappedBy="furniture")
    private Set<FurnitureMedia> furnitureMedia;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getApprover() {
        return approver;
    }

    public void setApprover(User approverID) {
        this.approver = approverID;
    }

    public ZonedDateTime getApprovedDate() {
        return approvedDate;
    }

    public void setApprovedDate(ZonedDateTime approvedDate) {
        this.approvedDate = approvedDate;
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

    public Set<FurnitureMedia> getFurnitureMedia() {
        return furnitureMedia;
    }

    public void setFurnitureMedia(Set<FurnitureMedia> furnitureMedia) {
        this.furnitureMedia = furnitureMedia;
    }
}
