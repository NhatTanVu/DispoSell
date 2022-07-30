package DispoSell.models;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "shipperdeliveries",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = {"deliveryID", "shipperID"})
        })
@IdClass(ShipperDeliveryPKId.class)
public class ShipperDelivery implements Serializable{
    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "deliveryID", referencedColumnName = "deliveryID")
    private Delivery delivery;

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "shipperID", referencedColumnName = "id")
    private User shipper;

    public ShipperDelivery(){

    }

    public Delivery getDelivery() {
        return delivery;
    }

    public void setDelivery(Delivery delivery) {
        this.delivery = delivery;
    }

    public User getShipper() {
        return shipper;
    }

    public void setShipper(User shipper) {
        this.shipper = shipper;
    }
}
