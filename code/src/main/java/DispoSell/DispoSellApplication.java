package DispoSell;

import DispoSell.models.*;
import DispoSell.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

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

//            // TODO: Remove later, for testing only
//            if (userRepository.findByUsername("test_user_123456").isEmpty()) {
//                User user = new User();
//                user.setUsername("test_user_123456");
//                user.setEmail("test_user_123456@gmail.com");
//                user.setContactAddress("test_user_123456 delivery address");
//                user.setPhoneNumber("123456789");
//                user.setPassword(passwordEncoder.encode("test_user_123456"));
//                user.setAvatarUrl("test_user_123456 avatar.png");
//                Role userRole = roleRepository.findByName(ERole.ROLE_USER).get();
//                Set<Role> roles = new HashSet<>();
//                roles.add(userRole);
//                user.setRoles(roles);
//                userRepository.save(user);
//
//                user = userRepository.findByUsername("test_user_123456").get();
//
//                //add product 1
//                Products product = new Products();
//                ProductCondition condition = productConditionRepository.findByName(EProductCondition.PRODUCT_CONDITION_UNUSED).get();
//                product.setName("White Side Table");
//                product.setCondition(condition);
//                product.setDescription("This is description for White Side Table. Bla bla bla. This is description for White Side Table. Bla bla bla.");
//                product.setApprover(user);
//                product.setApprovedDate(java.time.ZonedDateTime.now());
//                product.setAvailableQuantity(10);
////                product.setCategory();
//                product.setSellingPrice(30f);
//                productRepository.save(product);
//
//                //add media of product 1. cannot add duplicate url in 1 product
//                product = productRepository.findByName("White Side Table").get();
//                ProductMedia media1_product1 = new ProductMedia(product, "../../resources/static/images/products/white_side_table1.jpeg", "png", null);
//                productMediaRepository.save(media1_product1);
//
//                //add product 2
////                Products product2 = new Products();
//                product.setName("Thin White Bed Frame");
//                product.setCondition(condition);
//                product.setDescription("This is description for Thin White Bed Frame. Bla bla bla. This is description for Thin White Bed Frame. Bla bla bla.");
//                product.setAvailableQuantity(2);
//                product.setSellingPrice(70f);
//                productRepository.save(product);
//
//                //add media of product 2
//                product = productRepository.findByName("Thin White Bed Frame").get();
//                ProductMedia media1_product2 = new ProductMedia(product, "../../resources/static/images/products/thin_white_bed_frame_1.jpeg", "png", null);
//                productMediaRepository.save(media1_product2);
//            }
//
//            // TODO: Remove later, for testing only
//            if (userRepository.findByUsername("test_user_290194").isEmpty()) {
//                User user = new User();
//                user.setUsername("test_user_290194");
//                user.setEmail("test_user_2901946@gmail.com");
//                user.setContactAddress("test_user_290194 delivery address");
//                user.setPhoneNumber("987654321");
//                user.setPassword(passwordEncoder.encode("test_user_290194"));
//                user.setAvatarUrl("test_user_290194 avatar.png");
//                Role userRole = roleRepository.findByName(ERole.ROLE_USER).get();
//                Set<Role> roles = new HashSet<>();
//                roles.add(userRole);
//                user.setRoles(roles);
//                userRepository.save(user);
//
//                user = userRepository.findByUsername("test_user_290194").get();
//
//                //add product 3
//                Products product = new Products();
//                ProductCondition condition = productConditionRepository.findByName(EProductCondition.PRODUCT_CONDITION_UNUSED).get();
//                product.setName("Off White Folding Chair");
//                product.setCondition(condition);
//                product.setDescription("This is description for Off White Folding Chair. Bla bla bla. This is description for Off White Folding Chair. Bla bla bla.");
//                product.setApprover(user);
//                product.setApprovedDate(java.time.ZonedDateTime.now());
//                product.setAvailableQuantity(40);
////                product.setCategory();
//                product.setSellingPrice(20.5f);
//                productRepository.save(product);
//
//                //add media of product 3
//                product = productRepository.findByName("Off White Folding Chair").get();
//                ProductMedia media1_product3 = new ProductMedia(product, "../../resources/static/images/products/off_white_folding_chair_1.jpeg", "png", null);
//                productMediaRepository.save(media1_product3);
//                ProductMedia media2_product3 = new ProductMedia(product, "../../resources/static/images/products/off_white_folding_chair_2.jpeg", "png", user);
//                productMediaRepository.save(media2_product3);
//
//                //add product 4
////                Products product4 = new Products();
//                product.setName("Light Gray Lounge Sofa");
//                product.setCondition(condition);
//                product.setDescription("This is description for Light Gray Lounge Sofa. Bla bla bla. This is description for Light Gray Lounge Sofa. Bla bla bla.");
//                product.setAvailableQuantity(50);
//                product.setSellingPrice(100.99f);
//                productRepository.save(product);
//
//                //add media of product 4
//                product = productRepository.findByName("Light Gray Lounge Sofa").get();
//                ProductMedia media1_product4 = new ProductMedia(product, "../../resources/static/images/products/light_gray_lounge_sofa_1.jpeg", "png", null);
//                productMediaRepository.save(media1_product4);
//                ProductMedia media2_product4 = new ProductMedia(product, "../../resources/static/images/products/light_gray_lounge_sofa_2.jpeg", "png", user);
//                productMediaRepository.save(media2_product4);
//            }
//
//            // TODO: Remove later, for testing only
//            if (tradeOrderRepository.count() == 0) {
//                TradeOrder order = new TradeOrder();
//                order.setOrderedDate(java.time.ZonedDateTime.now());
//                order.setConfirmedDate(java.time.ZonedDateTime.now());
//                User user = userRepository.findByUsername("test_user_123456").get();
//                OrderStatus status = orderStatusRepository.findByName(EOrderStatus.ORDER_STATUS_IN_DELIVERY).get();
//                order.setUser(user);
//                order.setStatus(status);
//                order.setContactNumber(user.getPhoneNumber());
//                order.setAddress(user.getContactAddress());
//                Long orderID = tradeOrderRepository.save(order).getOrderID();
//
//                order = tradeOrderRepository.findById(orderID).get();
//                Products product = productRepository.findByName("Off White Folding Chair").get();
//                OrderDetail orderDetail = new OrderDetail(order, product, 2);
//                orderDetailRepository.save(orderDetail);
//
//                Delivery delivery = new Delivery();
//                order = tradeOrderRepository.findById(orderID).get();
//                delivery.setOrder(order);
//                delivery.setStartLocation("Start 1");
//                delivery.setEndLocation("End 1");
//                Long deliveryID = deliveryRepository.save(delivery).getDeliveryID();
//
//                User shipper = new User();
//                shipper.setUsername("test_shipper_123456");
//                shipper.setEmail("test_shipper_123456@gmail.com");
//                shipper.setContactAddress("test_shipper_123456 delivery address");
//                shipper.setPhoneNumber("123456789");
//                shipper.setPassword(passwordEncoder.encode("test_shipper_123456"));
//                shipper.setAvatarUrl("test_shipper_123456 avatar.png");
//                Role userRole = roleRepository.findByName(ERole.ROLE_SHIPPER).get();
//                Set<Role> roles = new HashSet<>();
//                roles.add(userRole);
//                shipper.setRoles(roles);
//                userRepository.save(shipper);
//
//                ShipperDelivery shipperDelivery = new ShipperDelivery();
//                delivery = deliveryRepository.findById(deliveryID).get();
//                shipperDelivery.setDelivery(delivery);
//                shipper = userRepository.findByUsername("test_shipper_123456").get();
//                shipperDelivery.setShipper(shipper);
//                shipperDeliveryRepository.save(shipperDelivery);
//            }
//
//            // TODO: Remove later, for testing only
//            if(purchaseOrderRepository.count() == 0) {
//                PurchaseOrder order = new PurchaseOrder();
//                order.setOrderedDate(java.time.ZonedDateTime.now());
//                User user = userRepository.findByUsername("test_user_290194").get();
//                OrderStatus status = orderStatusRepository.findByName(EOrderStatus.ORDER_STATUS_NEW).get();
//                order.setUser(user);
//                order.setStatus(status);
//                order.setContactNumber(user.getPhoneNumber());
//                order.setAddress(user.getContactAddress());
//                Long orderID = purchaseOrderRepository.save(order).getOrderID();
//
//                order = purchaseOrderRepository.findById(orderID).get();
//                Products product = productRepository.findByName("Light Gray Lounge Sofa").get();
//                OrderDetail orderDetail = new OrderDetail(order, product, 5);
//                orderDetailRepository.save(orderDetail);
//            }
//
//        };
//    }
//}

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
                productRepository.save(product);

                product = productRepository.findByName("White Side Table").get();
                ProductMedia media1 = new ProductMedia(product, "/images/products/4.jpeg", "jpeg", null);
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
                productRepository.save(product);

                product = productRepository.findByName("Thin White Bed Frame").get();
                ProductMedia media3 = new ProductMedia(product, "/images/products/3.jpeg", "jpeg", null);
                productMediaRepository.save(media3);
//                ProductMedia media4 = new ProductMedia(product, "img21.png", "png", user);
//                productMediaRepository.save(media4);
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
                productRepository.save(product);

                product = productRepository.findByName("Off White Folding Chair").get();
                ProductMedia media1 = new ProductMedia(product, "/images/products/2.jpg", "jpg", null);
                productMediaRepository.save(media1);
                ProductMedia media2 = new ProductMedia(product, "/images/products/5.jpeg", "jpeg", user);
                productMediaRepository.save(media2);
//                ProductMedia media21 = new ProductMedia(product, "off_white_folding_chair_3.jpg", "jpg", user);
//                productMediaRepository.save(media21);

                product = new Product();
                product.setName("Light Gray Lounge Sofa");
                product.setCondition(condition);
                product.setDescription("Description 4");
                product.setAvailableQuantity(50);
                product.setSellingPrice(150f);
                ProductCategory productCategory2=productCategoryRepository.findById(5l).get();
                product.setCategory(productCategory2);
                productRepository.save(product);

                product = productRepository.findByName("Light Gray Lounge Sofa").get();
                ProductMedia media3 = new ProductMedia(product, "/images/products/1.jpeg", "jpeg", null);
                productMediaRepository.save(media3);
//                ProductMedia media4 = new ProductMedia(product, "light_gray_lounge_sofa_2.webp", "webp", user);
//                productMediaRepository.save(media4);
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
                Product product = productRepository.findByName("Light Gray Lounge Sofa").get();
                OrderDetail orderDetail = new OrderDetail(order, product, 5);
                orderDetailRepository.save(orderDetail);
            }

        };
    }
}