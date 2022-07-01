package DispoSell.models;

import java.io.Serializable;

public class ShipperDeliveryPKId implements Serializable {
    private Long deliveryID;
    private Long shipperID;

    public ShipperDeliveryPKId() {

    }

    public ShipperDeliveryPKId(Long deliveryID, Long shipperID){
        this.deliveryID = deliveryID;
        this.shipperID = shipperID;
    }
}
