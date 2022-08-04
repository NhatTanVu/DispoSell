package DispoSell.repositories;

import DispoSell.models.Order;
import DispoSell.models.PurchaseOrder;
import DispoSell.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PurchaseOrderRepository extends JpaRepository<PurchaseOrder, Long> {
    Order findByOrderID(Long orderID);
    List<PurchaseOrder> findByUser(User user);
}
