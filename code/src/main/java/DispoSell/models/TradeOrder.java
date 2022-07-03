package DispoSell.models;

import javax.persistence.*;
import java.io.Serializable;
import java.time.ZonedDateTime;

@Entity
@Table(name = "tradeorders")
public class TradeOrder extends Order{
    private ZonedDateTime confirmedDate;

    public TradeOrder(){
    }

    public ZonedDateTime getConfirmedDate() {
        return confirmedDate;
    }

    public void setConfirmedDate(ZonedDateTime confirmedDate) {
        this.confirmedDate = confirmedDate;
    }
}
