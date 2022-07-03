package DispoSell.repositories;

import DispoSell.models.BuyingOrder;
import DispoSell.models.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BuyingOrderRepository extends JpaRepository<BuyingOrder, Long> {
}
