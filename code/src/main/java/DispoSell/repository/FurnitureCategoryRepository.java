package DispoSell.repository;

import DispoSell.models.Category;
import DispoSell.models.FurnitureCondition;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FurnitureCategoryRepository extends JpaRepository<Category, Long> {
}
