package DispoSell.repositories;

import DispoSell.models.FurnitureCondition;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FurnitureConditionRepository extends JpaRepository<FurnitureCondition, Long> {

}
