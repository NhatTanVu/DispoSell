package DispoSell.models;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Entity
@Table(name = "category",
        uniqueConstraints = {
        @UniqueConstraint(columnNames = "categoryID")
    })
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String categoryID;

    @NotBlank
    @Size(max = 50)
    private String categoryname;

    public String getCategoryID() {
        return categoryID;
    }

    public void setCategoryID(String categoryID) {
        this.categoryID = categoryID;
    }

    public String getCategoryname() {
        return categoryname;
    }

    public void setCategoryname(String categoryname) {
        this.categoryname = categoryname;
    }
}
