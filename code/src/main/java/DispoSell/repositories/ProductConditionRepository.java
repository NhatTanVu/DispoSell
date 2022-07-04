package DispoSell.repositories;

import DispoSell.models.EProductCondition;
import DispoSell.models.OrderStatus;
import DispoSell.models.ProductCondition;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProductConditionRepository extends JpaRepository<ProductCondition, Long> {
    Optional<ProductCondition> findByName(EProductCondition name);
}
