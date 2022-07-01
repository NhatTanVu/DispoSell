package DispoSell.repositories;

import DispoSell.models.FurnitureCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FurnitureCategoryRepository extends JpaRepository<FurnitureCategory, Long> {
}
