package DispoSell.repositories;

import DispoSell.models.Delivery;
import DispoSell.models.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DeliveryRepository extends JpaRepository<Delivery, Long> {
    Delivery findByOrderOrderID(Long orderID);
}
