package DispoSell.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Set;

@Table(name = "orders")
@Entity
@Inheritance(strategy = InheritanceType.JOINED)
public class Order implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderID;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userID", referencedColumnName = "id")
    @JsonBackReference
    private User user;

    @NotNull
    private ZonedDateTime orderedDate;

    private ZonedDateTime scheduledDate;

    @NotNull
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "statusID", referencedColumnName = "statusID")
    private OrderStatus status;

    @NotBlank
    @Size(max = 20)
    private String contactNumber;

    @NotBlank
    @Size(max = 250)
    private String address;

    @NotNull
    private Boolean isPurchaseOrder;

    private Float credit;

    @OneToMany(mappedBy = "order")
    @JsonManagedReference
    private Set<OrderDetail> orderDetails;

    public Order() {
    }

    public Long getOrderID() {
        return orderID;
    }

    public void setOrderID(Long orderID) {
        this.orderID = orderID;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public ZonedDateTime getOrderedDate() {
        return orderedDate;
    }

    public void setOrderedDate(ZonedDateTime orderedDate) {
        this.orderedDate = orderedDate;
    }

    public ZonedDateTime getScheduledDate() {
        return scheduledDate;
    }

    public void setScheduledDate(ZonedDateTime scheduledDate) {
        this.scheduledDate = scheduledDate;
    }

    public OrderStatus getStatus() {
        return status;
    }

    public void setStatus(OrderStatus status) {
        this.status = status;
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

    public Boolean getPurchaseOrder() {
        return isPurchaseOrder;
    }

    public void setPurchaseOrder(Boolean isPurchaseOrder) {
        this.isPurchaseOrder = isPurchaseOrder;
    }

    public Float getCredit() {
        return credit;
    }

    public void setCredit(Float credit) {
        this.credit = credit;
    }

    public Set<OrderDetail> getOrderDetails() {
        return orderDetails;
    }

    public void setOrderDetails(Set<OrderDetail> orderDetails) {
        this.orderDetails = orderDetails;
    }
}
