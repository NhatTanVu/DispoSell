package DispoSell;

import DispoSell.models.*;
import DispoSell.repositories.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

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
                                        ShipperDeliveryRepository shipperDeliveryRepository
                                        ) {
        return args -> {
            if (roleRepository.count() == 0) {
                roleRepository.save(new Role(ERole.ROLE_ADMINISTRATOR));
                roleRepository.save(new Role(ERole.ROLE_SHIPPER));
                roleRepository.save(new Role(ERole.ROLE_USER));
            }
            if (orderStatusRepository.count() == 0) {
                orderStatusRepository.save(new OrderStatus(EOrderStatus.ORDER_STATUS_NEW));
                orderStatusRepository.save(new OrderStatus(EOrderStatus.ORDER_STATUS_SCHEDULED));
                orderStatusRepository.save(new OrderStatus(EOrderStatus.ORDER_STATUS_PAID));
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

            // TODO: Remove later, for testing only
            if (userRepository.findByUsername("test_user_123456").isEmpty()) {
                User user = new User();
                user.setUsername("test_user_123456");
                user.setEmail("test_user_123456@gmail.com");
                user.setContactAddress("test_user_123456 delivery address");
                user.setPhoneNumber("123456789");
                user.setPassword("test_user_123456 password");
                user.setAvatarUrl("test_user_123456 avatar.png");
                Role userRole = roleRepository.findByName(ERole.ROLE_USER).get();
                Set<Role> roles = new HashSet<>();
                roles.add(userRole);
                user.setRoles(roles);
                userRepository.save(user);

                user = userRepository.findByUsername("test_user_123456").get();
                Product product = new Product();
                ProductCondition condition = productConditionRepository.findByName(EProductCondition.PRODUCT_CONDITION_UNUSED).get();
                product.setName("Furniture 1");
                product.setCondition(condition);
                product.setDescription("Description 1");
                product.setApprover(user);
                product.setApprovedDate(java.time.ZonedDateTime.now());
                productRepository.save(product);

                product = productRepository.findByName("Furniture 1").get();
                ProductMedia media1 = new ProductMedia(product, "img1.png", "png", null);
                productMediaRepository.save(media1);

                ProductMedia media2 = new ProductMedia(product, "img2.png", "png", user);
                productMediaRepository.save(media2);

                product = new Product();
                product.setName("Furniture 2");
                product.setCondition(condition);
                product.setDescription("Description 2");
                productRepository.save(product);
            }

            // TODO: Remove later, for testing only
            if (userRepository.findByUsername("test_user_290194").isEmpty()) {
                User user = new User();
                user.setUsername("test_user_290194");
                user.setEmail("test_user_2901946@gmail.com");
                user.setContactAddress("test_user_290194 delivery address");
                user.setPhoneNumber("987654321");
                user.setPassword("test_user_290194 password");
                user.setAvatarUrl("test_user_290194 avatar.png");
                Role userRole = roleRepository.findByName(ERole.ROLE_USER).get();
                Set<Role> roles = new HashSet<>();
                roles.add(userRole);
                user.setRoles(roles);
                userRepository.save(user);

                user = userRepository.findByUsername("test_user_290194").get();
                Product product = new Product();
                ProductCondition condition = productConditionRepository.findByName(EProductCondition.PRODUCT_CONDITION_UNUSED).get();
                product.setName("Furniture 3");
                product.setCondition(condition);
                product.setDescription("Description 3");
                product.setApprover(user);
                product.setApprovedDate(java.time.ZonedDateTime.now());
                productRepository.save(product);

                product = productRepository.findByName("Furniture 3").get();
                ProductMedia media1 = new ProductMedia(product, "img3.png", "png", null);
                productMediaRepository.save(media1);

                ProductMedia media2 = new ProductMedia(product, "img4.png", "png", user);
                productMediaRepository.save(media2);

                product = new Product();
                product.setName("Furniture 4");
                product.setCondition(condition);
                product.setDescription("Description 4");
                productRepository.save(product);

            }

            // TODO: Remove later, for testing only
            if (tradeOrderRepository.count() == 0) {
                TradeOrder order = new TradeOrder();
                order.setOrderedDate(java.time.ZonedDateTime.now());
                order.setConfirmedDate(java.time.ZonedDateTime.now());
                User user = userRepository.findByUsername("test_user_123456").get();
                OrderStatus status = orderStatusRepository.findByName(EOrderStatus.ORDER_STATUS_IN_DELIVERY).get();
                order.setUser(user);
                order.setStatus(status);
                order.setContactNumber(user.getPhoneNumber());
                order.setAddress(user.getContactAddress());
                Long orderID = tradeOrderRepository.save(order).getOrderID();

                order = tradeOrderRepository.findById(orderID).get();
                Product product = productRepository.findByName("Furniture 3").get();
                OrderDetail orderDetail = new OrderDetail(order, product, 2);
                orderDetailRepository.save(orderDetail);

                Delivery delivery = new Delivery();
                order = tradeOrderRepository.findById(orderID).get();
                delivery.setOrder(order);
                delivery.setStartLocation("Start 1");
                delivery.setEndLocation("End 1");
                Long deliveryID = deliveryRepository.save(delivery).getDeliveryID();

                User shipper = new User();
                shipper.setUsername("test_shipper_123456");
                shipper.setEmail("test_shipper_123456@gmail.com");
                shipper.setContactAddress("test_shipper_123456 delivery address");
                shipper.setPhoneNumber("123456789");
                shipper.setPassword("test_shipper_123456 password");
                shipper.setAvatarUrl("test_shipper_123456 avatar.png");
                Role userRole = roleRepository.findByName(ERole.ROLE_SHIPPER).get();
                Set<Role> roles = new HashSet<>();
                roles.add(userRole);
                shipper.setRoles(roles);
                userRepository.save(shipper);

                ShipperDelivery shipperDelivery = new ShipperDelivery();
                delivery = deliveryRepository.findById(deliveryID).get();
                shipperDelivery.setDelivery(delivery);
                shipper = userRepository.findByUsername("test_shipper_123456").get();
                shipperDelivery.setShipper(shipper);
                shipperDeliveryRepository.save(shipperDelivery);
            }

            // TODO: Remove later, for testing only
            if(purchaseOrderRepository.count() == 0) {
                PurchaseOrder order = new PurchaseOrder();
                order.setOrderedDate(java.time.ZonedDateTime.now());
                User user = userRepository.findByUsername("test_user_290194").get();
                OrderStatus status = orderStatusRepository.findByName(EOrderStatus.ORDER_STATUS_NEW).get();
                order.setUser(user);
                order.setStatus(status);
                order.setContactNumber(user.getPhoneNumber());
                order.setAddress(user.getContactAddress());
                Long orderID = purchaseOrderRepository.save(order).getOrderID();

                order = purchaseOrderRepository.findById(orderID).get();
                Product product = productRepository.findByName("Furniture 4").get();
                OrderDetail orderDetail = new OrderDetail(order, product, 5);
                orderDetailRepository.save(orderDetail);
            }

        };
    }
}
