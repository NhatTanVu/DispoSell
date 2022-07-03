package DispoSell.models;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Entity
@Table(name = "orderstatuses")
public class OrderStatus {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long statusID;

    @Column(length = 50)
    @Enumerated(EnumType.STRING)
    private EOrderStatus name;

    public OrderStatus() {
        this.name = EOrderStatus.ORDER_STATUS_NEW;
    }

    public OrderStatus(EOrderStatus name) {
        this.name = name;
    }

    public Long getStatusID() {
        return statusID;
    }

    public void setStatusID(Long statusID) {
        this.statusID = statusID;
    }

    public EOrderStatus getName() {
        return name;
    }

    public void setName(EOrderStatus name) {
        this.name = name;
    }
}
