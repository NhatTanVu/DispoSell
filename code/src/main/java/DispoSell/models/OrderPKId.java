package DispoSell.models;

import javax.persistence.Id;
import java.io.Serializable;


public class OrderPKId implements Serializable {
    private Long order;
    private Long product;

    public OrderPKId() {
    }

    public OrderPKId(Long order, Long product) {
        this.order = order;
        this.product = product;
    }

}
