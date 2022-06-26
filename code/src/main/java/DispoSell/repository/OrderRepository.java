package DispoSell.repository;

import DispoSell.models.FurnitureCondition;
import DispoSell.models.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> {

}
