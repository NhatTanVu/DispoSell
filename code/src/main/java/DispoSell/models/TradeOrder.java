package DispoSell.models;

import javax.persistence.*;
import java.io.Serializable;
import java.time.ZonedDateTime;

@Entity
@Table(name = "tradeorder")
@IdClass(Order.class)
public class TradeOrder implements Serializable{

    @Id
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "orderID", referencedColumnName = "orderID")
    private Order orderID;

    private Float creditTraded;

    private ZonedDateTime confirmedDate;

    public TradeOrder(){

    }

    public Order getOrderID() {
        return orderID;
    }

    public void setOrderID(Order orderID) {
        this.orderID = orderID;
    }

    public Float getCreditTraded() {
        return creditTraded;
    }

    public void setCreditTraded(Float creditTraded) {
        this.creditTraded = creditTraded;
    }

    public ZonedDateTime getConfirmedDate() {
        return confirmedDate;
    }

    public void setConfirmedDate(ZonedDateTime confirmedDate) {
        this.confirmedDate = confirmedDate;
    }
}
