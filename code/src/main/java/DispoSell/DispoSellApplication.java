package DispoSell;

import DispoSell.models.*;
import DispoSell.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Set;

@SpringBootApplication
public class DispoSellApplication {

    public static void main(String[] args) {
        SpringApplication.run(DispoSellApplication.class, args);
    }

    @Bean
    CommandLineRunner commandLineRunner(RoleRepository roleRepository,
                                        UserRepository userRepository,
                                        ProductRepository productRepository,
                                        ProductMediaRepository productMediaRepository,
                                        OrderStatusRepository orderStatusRepository,
                                        ProductConditionRepository productConditionRepository,
                                        ProductCategoryRepository productCategoryRepository,
                                        TradeOrderRepository tradeOrderRepository,
                                        PurchaseOrderRepository purchaseOrderRepository,
                                        OrderDetailRepository orderDetailRepository,
                                        DeliveryRepository deliveryRepository,
                                        ShipperDeliveryRepository shipperDeliveryRepository,
                                        PasswordEncoder passwordEncoder
                                        ) {
        return args -> {
            if (roleRepository.count() == 0) {
                roleRepository.save(new Role(ERole.ROLE_ADMINISTRATOR));
                roleRepository.save(new Role(ERole.ROLE_SHIPPER));
                roleRepository.save(new Role(ERole.ROLE_USER));
            }
            if (orderStatusRepository.count() == 0) {
                orderStatusRepository.save(new OrderStatus(EOrderStatus.ORDER_STATUS_NEW));
                orderStatusRepository.save(new OrderStatus(EOrderStatus.ORDER_STATUS_APPROVED));
                orderStatusRepository.save(new OrderStatus(EOrderStatus.ORDER_STATUS_REJECTED));
                orderStatusRepository.save(new OrderStatus(EOrderStatus.ORDER_STATUS_PAID));
                orderStatusRepository.save(new OrderStatus(EOrderStatus.ORDER_STATUS_SCHEDULED));
                orderStatusRepository.save(new OrderStatus(EOrderStatus.ORDER_STATUS_IN_DELIVERY));
                orderStatusRepository.save(new OrderStatus(EOrderStatus.ORDER_STATUS_DONE));
                orderStatusRepository.save(new OrderStatus(EOrderStatus.ORDER_STATUS_CANCELLED));
            }
            if (productConditionRepository.count() == 0) {
                productConditionRepository.save(new ProductCondition(EProductCondition.PRODUCT_CONDITION_UNUSED));
                productConditionRepository.save(new ProductCondition(EProductCondition.PRODUCT_CONDITION_VERY_GOOD));
                productConditionRepository.save(new ProductCondition(EProductCondition.PRODUCT_CONDITION_GOOD));
                productConditionRepository.save(new ProductCondition(EProductCondition.PRODUCT_CONDITION_FAIR));
            }
            if (productCategoryRepository.count() == 0) {
                productCategoryRepository.save(new ProductCategory("Bed Frames"));
                productCategoryRepository.save(new ProductCategory("Chairs"));
                productCategoryRepository.save(new ProductCategory("Dining Tables"));
                productCategoryRepository.save(new ProductCategory("Side Tables"));
                productCategoryRepository.save(new ProductCategory("Sofas"));
                productCategoryRepository.save(new ProductCategory("Stools"));
            }
        };
    }
}