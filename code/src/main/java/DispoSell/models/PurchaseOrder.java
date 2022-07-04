package DispoSell.models;

import javax.persistence.*;
import java.time.ZonedDateTime;

@Entity
@Table(name = "purchaseorders")
public class PurchaseOrder extends Order{
    private ZonedDateTime paymentDate;

    private String paymentMethod;

    private Float paymentAmount;

    private String paymentTransactionID;

    public PurchaseOrder(){
    }

    public ZonedDateTime getPaymentDate() {
        return paymentDate;
    }

    public void setPaymentDate(ZonedDateTime paymentDate) {
        this.paymentDate = paymentDate;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public Float getPaymentAmount() {
        return paymentAmount;
    }

    public void setPaymentAmount(Float paymentAmount) {
        this.paymentAmount = paymentAmount;
    }

    public String getPaymentTransactionID() { return paymentTransactionID; }

    public void setPaymentTransactionID(String paymentTransactionID) { this.paymentTransactionID = paymentTransactionID; }
}
