package DispoSell.models;

import jdk.jfr.BooleanFlag;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.time.ZonedDateTime;
import java.util.Set;

@Entity
@Table(name = "orders",
uniqueConstraints = {
        @UniqueConstraint(columnNames = "orderID")
})
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderID;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userID")
    private User userID;

    @NotBlank
    private ZonedDateTime orderDate;
    @NotBlank
    private ZonedDateTime scheduledDate;

    @Size(max = 30)
    @NotBlank
    private String orderStatus;

    @NotBlank
    @Size(max = 20)
    private String contactNumber;

    @NotBlank
    @Size(max = 250)
    private String address;

    @NotBlank
    private Boolean isBuyingOrder;

    public Order() {
    }

    public Long getOrderID() {
        return orderID;
    }

    public void setOrderID(Long orderID) {
        this.orderID = orderID;
    }

    public User getUserID() {
        return userID;
    }

    public void setUserID(User userID) {
        this.userID = userID;
    }

    public ZonedDateTime getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(ZonedDateTime orderDate) {
        this.orderDate = orderDate;
    }

    public ZonedDateTime getScheduledDate() {
        return scheduledDate;
    }

    public void setScheduledDate(ZonedDateTime scheduledDate) {
        this.scheduledDate = scheduledDate;
    }

    public String getOrderStatus() {
        return orderStatus;
    }

    public void setOrderStatus(String orderStatus) {
        this.orderStatus = orderStatus;
    }

    public String getContactNumber() {
        return contactNumber;
    }

    public void setContactNumber(String contactNumber) {
        this.contactNumber = contactNumber;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Boolean getBuyingOrder() {
        return isBuyingOrder;
    }

    public void setBuyingOrder(Boolean buyingOrder) {
        isBuyingOrder = buyingOrder;
    }
}
