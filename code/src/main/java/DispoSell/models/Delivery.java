package DispoSell.models;


import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "deliveries")
public class Delivery {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long deliveryID;

    @NotNull
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "orderID", referencedColumnName = "orderID")
    private Order order;

    private String vehicleNumber;

    private String vehicleType;

    private ZonedDateTime startTime;

    private ZonedDateTime endTime;

    @NotBlank
    private String startLocation;

    private String currentLocation;

    @NotBlank
    private String endLocation;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "shipperdeliveries",
            joinColumns = @JoinColumn(name = "deliveryID"),
            inverseJoinColumns = @JoinColumn(name = "shipperID"))
    private Set<User> shippers = new HashSet<>();

    public Delivery(){
    }

    public Long getDeliveryID() {
        return deliveryID;
    }

    public void setDeliveryID(Long deliveryID) {
        this.deliveryID = deliveryID;
    }

    public Order getOrder() {
        return order;
    }

    public void setOrder(Order order) {
        this.order = order;
    }

    public String getVehicleNumber() {
        return vehicleNumber;
    }

    public void setVehicleNumber(String vehicleNumber) {
        this.vehicleNumber = vehicleNumber;
    }

    public String getVehicleType() {
        return vehicleType;
    }

    public void setVehicleType(String vehicleType) {
        this.vehicleType = vehicleType;
    }

    public ZonedDateTime getStartTime() {
        return startTime;
    }

    public void setStartTime(ZonedDateTime startTime) {
        this.startTime = startTime;
    }

    public ZonedDateTime getEndTime() {
        return endTime;
    }

    public void setEndTime(ZonedDateTime endTime) {
        this.endTime = endTime;
    }

    public String getStartLocation() {
        return startLocation;
    }

    public void setStartLocation(String startLocation) {
        this.startLocation = startLocation;
    }

    public String getCurrentLocation() {
        return currentLocation;
    }

    public void setCurrentLocation(String currentLocation) {
        this.currentLocation = currentLocation;
    }

    public String getEndLocation() {
        return endLocation;
    }

    public void setEndLocation(String endLocation) {
        this.endLocation = endLocation;
    }

    public Set<User> getShippers() {
        return shippers;
    }

    public void setShippers(Set<User> shippers) {
        this.shippers = shippers;
    }
}
