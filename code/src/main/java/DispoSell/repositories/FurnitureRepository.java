package DispoSell.repositories;

import DispoSell.models.Furniture;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FurnitureRepository extends JpaRepository<Furniture, Long> {
    Optional<Furniture> findByName(String name);
}
