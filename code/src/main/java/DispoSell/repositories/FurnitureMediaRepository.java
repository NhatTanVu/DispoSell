package DispoSell.repositories;

import DispoSell.models.FurnitureMedia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FurnitureMediaRepository extends JpaRepository<FurnitureMedia, Long> {
}
