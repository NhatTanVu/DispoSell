package DispoSell.models;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.io.Serializable;
import java.util.Set;

@Entity
@Table(name = "orderdetail",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = {"orderID", "furnitureID"})
        })
@IdClass(OrderPKId.class)
public class OrderDetail implements Serializable{


    @Id
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "orderID", referencedColumnName = "orderID")
    private Order orderID;

    @Id
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "furnitureID",referencedColumnName = "furnitureID")
    @MapsId
    private Furniture furnitureID;

    public OrderDetail(){

    }

    public Order getOrderID() {
        return orderID;
    }

    public void setOrderID(Order orderID) {
        this.orderID = orderID;
    }

    public Furniture getFurnitureID() {
        return furnitureID;
    }

    public void setFurnitureID(Furniture furnitureID) {
        this.furnitureID = furnitureID;
    }
}
