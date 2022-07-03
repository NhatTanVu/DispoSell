package DispoSell.models;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "orderdetail",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = {"orderID", "productID"})
        })
@IdClass(OrderPKId.class)
public class OrderDetail implements Serializable{
    @Id
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "orderID", referencedColumnName = "orderID")
    private Order order;

    @Id
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "productID",referencedColumnName = "productID")
    @MapsId
    private Product product;

    private int quantity;

    public OrderDetail() {
    }

    public OrderDetail(Order order, Product product, int quantity) {
        this.order = order;
        this.product = product;
        this.quantity = quantity;
    }
    
    public Order getOrder() {
        return order;
    }

    public void setOrder(Order order) {
        this.order = order;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}
