package DispoSell.models;

import javax.persistence.Id;
import java.io.Serializable;


public class OrderPKId implements Serializable {
    private Long orderID;
    private Long furnitureID;

    public OrderPKId(){

    }

    public OrderPKId(Long orderID, Long furnitureID) {
        this.orderID = orderID;
        this.furnitureID = furnitureID;
    }

}
