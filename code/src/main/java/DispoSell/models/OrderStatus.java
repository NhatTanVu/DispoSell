package DispoSell.models;

import javax.persistence.*;
import javax.validation.constraints.Size;

@Entity
@Table(name = "orderstatus")
public class OrderStatus {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long statusID;

    @Size(max = 20)
    private String statusName;
}
