package DispoSell.models;

import java.io.Serializable;

public class ShipperDeliveryPKId implements Serializable {
    private Long delivery;
    private Long shipper;

    public ShipperDeliveryPKId() {
    }

    public ShipperDeliveryPKId(Long delivery, Long shipper){
        this.delivery = delivery;
        this.shipper = shipper;
    }
}
