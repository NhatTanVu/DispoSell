package DispoSell.repositories;

import DispoSell.models.Order;
import DispoSell.models.Role;
import DispoSell.models.TradeOrder;
import DispoSell.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TradeOrderRepository extends JpaRepository<TradeOrder, Long> {
    Order findByOrderID(Long orderID);
    List<TradeOrder> findByUser(User user);
}
