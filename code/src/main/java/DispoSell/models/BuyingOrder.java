package DispoSell.models;

import javax.persistence.*;
import java.io.Serializable;
import java.time.ZonedDateTime;

@Entity
@Table(name = "buyingorder",
        uniqueConstraints = {
        @UniqueConstraint(columnNames = "orderID")
        })
@IdClass(Order.class)
public class BuyingOrder implements Serializable{

    @Id
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "orderID", referencedColumnName = "orderID")
    private Order orderID;

    private Float creditUsed;

    private ZonedDateTime paymentDate;

    private String paymentMethod;

    private Float paymentAmount;

    private Long paymentTransactionID;

    public BuyingOrder(){

    }

    public Order getOrderID() {
        return orderID;
    }

    public void setOrderID(Order orderID) {
        this.orderID = orderID;
    }

    public Float getCreditUsed() {
        return creditUsed;
    }

    public void setCreditUsed(Float creditUsed) {
        this.creditUsed = creditUsed;
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

    public Long getPaymentTransactionID() {
        return paymentTransactionID;
    }

    public void setPaymentTransactionID(Long paymentTransactionID) {
        this.paymentTransactionID = paymentTransactionID;
    }
}
