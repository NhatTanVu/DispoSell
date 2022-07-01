package DispoSell.models;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "shippersdeliverorder",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = {"deliveryID", "shipperID"})
        })
@IdClass(ShipperDeliveryPKId.class)
public class ShippersDeliversOrder implements Serializable{


    @Id
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "deliveryID", referencedColumnName = "deliveryID")
    private Delivery deliveryID;

    @Id
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "shipperID", referencedColumnName = "id")
    private User shipperID;

    public ShippersDeliversOrder(){

    }

    public Delivery getDeliveryID() {
        return deliveryID;
    }

    public void setDeliveryID(Delivery deliveryID) {
        this.deliveryID = deliveryID;
    }

    public User getShipperID() {
        return shipperID;
    }

    public void setShipperID(User shipperID) {
        this.shipperID = shipperID;
    }
}
