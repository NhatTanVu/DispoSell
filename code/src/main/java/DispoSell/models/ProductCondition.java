package DispoSell.models;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Entity
@Table(name = "productconditions",
        uniqueConstraints = {
        @UniqueConstraint(columnNames = "conditionID")
    })
public class ProductCondition {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "conditionID")
    private Long id;

    @Column(length = 50)
    @Enumerated(EnumType.STRING)
    private EProductCondition name;

    public ProductCondition(){
    }

    public ProductCondition(EProductCondition name){
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public EProductCondition getName() {
        return name;
    }

    public void setName(EProductCondition name) {
        this.name = name;
    }
}
