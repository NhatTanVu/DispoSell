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
                user.setPassword(passwordEncoder.encode("test_user_123456"));
                user.setAvatarUrl("test_user_123456 avatar.png");
                Role userRole = roleRepository.findByName(ERole.ROLE_USER).get();
                Set<Role> roles = new HashSet<>();
                roles.add(userRole);
                user.setRoles(roles);
                userRepository.save(user);

                user = userRepository.findByUsername("test_user_123456").get();
                Product product = new Product();
                ProductCondition condition = productConditionRepository.findByName(EProductCondition.PRODUCT_CONDITION_UNUSED).get();
                product.setName("White Side Table");
                product.setCondition(condition);
                product.setDescription("Description 1");
                product.setApprover(user);
                product.setApprovedDate(java.time.ZonedDateTime.now());
                product.setAvailableQuantity(10);
                product.setSellingPrice(30f);
                ProductCategory productCategory1=productCategoryRepository.findById(4l).get();
                product.setCategory(productCategory1);
//                product.setPublishedDate(ZonedDateTime.of(LocalDateTime.parse("2019-03-27 10:15:30 am"), ZoneId.systemDefault()));
                product.setPublishedDate(ZonedDateTime.of(2013,10,21,12,15,22,00,ZoneId.systemDefault()));
                productRepository.save(product);

                product = productRepository.findByName("White Side Table").get();
                ProductMedia media1 = new ProductMedia(product, "/images/products/4.jpeg", "jpeg", null, null, true);
                productMediaRepository.save(media1);
//                ProductMedia media2 = new ProductMedia(product, "/images/products/5.jpeg", "jpeg", user);
//                productMediaRepository.save(media2);

                product = new Product();
                product.setName("Thin White Bed Frame");
                product.setCondition(condition);
                product.setDescription("Description 2");
                product.setAvailableQuantity(20);
                product.setSellingPrice(100.99f);
                ProductCategory productCategory2=productCategoryRepository.findById(1l).get();
                product.setCategory(productCategory2);
//                product.setPublishedDate(ZonedDateTime.of(LocalDateTime.parse("2018-03-27 10:15:30 am"), ZoneId.systemDefault()));
                product.setPublishedDate(ZonedDateTime.of(2014,10,21,12,15,22,00,ZoneId.systemDefault()));
                productRepository.save(product);

                product = productRepository.findByName("Thin White Bed Frame").get();
                ProductMedia media3 = new ProductMedia(product, "/images/products/3.jpeg", "jpeg", null, null, true);
                productMediaRepository.save(media3);
            }

            // TODO: Remove later, for testing only
            if (userRepository.findByUsername("test_user_290194").isEmpty()) {
                User user = new User();
                user.setUsername("test_user_290194");
                user.setEmail("test_user_2901946@gmail.com");
                user.setContactAddress("test_user_290194 delivery address");
                user.setPhoneNumber("987654321");
                user.setPassword(passwordEncoder.encode("test_user_290194"));
                user.setAvatarUrl("test_user_290194 avatar.png");
                Role userRole = roleRepository.findByName(ERole.ROLE_USER).get();
                Set<Role> roles = new HashSet<>();
                roles.add(userRole);
                user.setRoles(roles);
                userRepository.save(user);

                user = userRepository.findByUsername("test_user_290194").get();
                Product product = new Product();
                ProductCondition condition = productConditionRepository.findByName(EProductCondition.PRODUCT_CONDITION_UNUSED).get();
                product.setName("Off White Folding Chair");
                product.setCondition(condition);
                product.setDescription("Description 3");
                product.setApprover(user);
                product.setApprovedDate(java.time.ZonedDateTime.now());
                product.setAvailableQuantity(40);
                product.setSellingPrice(20.49f);
                ProductCategory productCategory1=productCategoryRepository.findById(2l).get();
                product.setCategory(productCategory1);
//                product.setPublishedDate(ZonedDateTime.of(LocalDateTime.parse("2020-03-27 10:15:30 am"), ZoneId.systemDefault()));
                product.setPublishedDate(ZonedDateTime.of(2015,10,21,12,15,22,00,ZoneId.systemDefault()));
                productRepository.save(product);

                product = productRepository.findByName("Off White Folding Chair").get();
                ProductMedia media1 = new ProductMedia(product, "/images/products/2.jpg", "jpg", null, null, true);
                productMediaRepository.save(media1);
                ProductMedia media2 = new ProductMedia(product, "/images/products/5.jpeg", "jpeg", user, java.time.ZonedDateTime.now(), false);
                productMediaRepository.save(media2);
//                ProductMedia media21 = new ProductMedia(product, "off_white_folding_chair_3.jpg", "jpg", user);
//                productMediaRepository.save(media21);

                product = new Product();
                product.setName("Light Gray Lounge Sofa");
                product.setCondition(condition);
                product.setDescription("Description 4");
                product.setAvailableQuantity(50);
                product.setSellingPrice(99.9f);
                ProductCategory productCategory2=productCategoryRepository.findById(5l).get();
                product.setCategory(productCategory2);
//                product.setPublishedDate(ZonedDateTime.of(LocalDateTime.parse("2021-03-27 10:15:30 am"), ZoneId.systemDefault()));
                product.setPublishedDate(ZonedDateTime.of(2016,10,21,12,15,22,00,ZoneId.systemDefault()));
                productRepository.save(product);

                product = productRepository.findByName("Light Gray Lounge Sofa").get();
                ProductMedia media3 = new ProductMedia(product, "/images/products/1.jpeg", "jpeg", null, null, true);
                productMediaRepository.save(media3);
//                ProductMedia media4 = new ProductMedia(product, "light_gray_lounge_sofa_2.webp", "webp", user);
//                productMediaRepository.save(media4);

                product = new Product();
                product.setName("Bar Stools");
                product.setCondition(condition);
                product.setDescription("Description 5");
                product.setAvailableQuantity(10);
                product.setSellingPrice(149.0f);
                ProductCategory productCategory3=productCategoryRepository.findById(6l).get();
                product.setCategory(productCategory3);
//                product.setPublishedDate(ZonedDateTime.of(LocalDateTime.parse("2022-03-27 10:15:30 am"), ZoneId.systemDefault()));
                product.setPublishedDate(ZonedDateTime.of(2017,10,21,12,15,22,00,ZoneId.systemDefault()));
                productRepository.save(product);

                product = productRepository.findByName("Bar Stools").get();
                ProductMedia media4 = new ProductMedia(product, "/images/products/stools.jpg", "jpg", null, null, true);
                productMediaRepository.save(media4);
                ProductMedia media5 = new ProductMedia(product, "/images/products/stools1.jpg", "jpg", null, null, false);
                productMediaRepository.save(media5);

                product = new Product();
                product.setName("Extendable Dining Table");
                product.setCondition(condition);
                product.setDescription("Description 6");
                product.setAvailableQuantity(2);
                product.setSellingPrice(579.0f);
                ProductCategory productCategory4=productCategoryRepository.findById(3l).get();
                product.setCategory(productCategory4);
//                product.setPublishedDate(ZonedDateTime.of(LocalDateTime.parse("2023-03-27 10:15:30 am"), ZoneId.systemDefault()));
                product.setPublishedDate(ZonedDateTime.of(2018,10,21,12,15,22,00,ZoneId.systemDefault()));
                productRepository.save(product);

                product = productRepository.findByName("Extendable Dining Table").get();
                ProductMedia media6 = new ProductMedia(product, "/images/products/diningTable1.jpg", "jpg", null, null, true);
                productMediaRepository.save(media6);
                ProductMedia media7 = new ProductMedia(product, "/images/products/diningTable2.jpg", "jpg", null, null, false);
                productMediaRepository.save(media7);

                product = new Product();
                product.setName("Round Dining Table");
                product.setCondition(condition);
                product.setDescription("Description 7");
                product.setAvailableQuantity(6);
                product.setSellingPrice(449.0f);
                ProductCategory productCategory5=productCategoryRepository.findById(3l).get();
                product.setCategory(productCategory5);
                product.setPublishedDate(ZonedDateTime.of(2019,10,21,12,15,22,00,ZoneId.systemDefault()));
                productRepository.save(product);

                product = productRepository.findByName("Round Dining Table").get();
                ProductMedia media8 = new ProductMedia(product, "/images/products/diningTable3.jpg", "jpg", null, null, true);
                productMediaRepository.save(media8);
                ProductMedia media9 = new ProductMedia(product, "/images/products/diningTable4.jpg", "jpg", null, null, false);
                productMediaRepository.save(media9);
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
                order.setEmail(user.getEmail());
                order.setFirstName(user.getFirstName());
                order.setLastName(user.getLastName());
                Long orderID = tradeOrderRepository.save(order).getOrderID();

                order = tradeOrderRepository.findById(orderID).get();
                Product product = productRepository.findByName("Off White Folding Chair").get();
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
                shipper.setPassword(passwordEncoder.encode("test_shipper_123456"));
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

        };
    }
}