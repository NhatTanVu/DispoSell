package DispoSell.repository;

import DispoSell.models.FurnitureCategory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FurnitureCategoryRepository extends JpaRepository<FurnitureCategory, Long> {
}