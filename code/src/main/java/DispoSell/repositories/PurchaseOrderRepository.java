package DispoSell.repositories;

import DispoSell.models.Order;
import DispoSell.models.PurchaseOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PurchaseOrderRepository extends JpaRepository<PurchaseOrder, Long> {
    Order findByOrderID(Long orderID);
}
