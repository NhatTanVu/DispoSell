package DispoSell.repositories;

import DispoSell.models.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> {
    Order findByOrderID(Long orderID);
}
