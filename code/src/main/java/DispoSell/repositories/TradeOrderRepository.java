package DispoSell.repositories;

import DispoSell.models.Order;
import DispoSell.models.Role;
import DispoSell.models.TradeOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TradeOrderRepository extends JpaRepository<TradeOrder, Long> {
    Order findByOrderID(Long orderID);
}
