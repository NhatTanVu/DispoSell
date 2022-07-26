package DispoSell.services;

import DispoSell.models.*;
import DispoSell.payload.request.*;
import DispoSell.repositories.*;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.HashSet;
import java.util.Set;

@Service
@Transactional
public class DeliveryService {
    private final DeliveryRepository deliveryRepository;
    private final OrderRepository orderRepository;
    private final OrderStatusRepository orderStatusRepository;
    private final UserRepository userRepository;
    private EmailService emailService;

    public DeliveryService(DeliveryRepository deliveryRepository,
                           OrderRepository orderRepository,
                           OrderStatusRepository orderStatusRepository,
                           UserRepository userRepository,
                           EmailService emailService) {
        this.deliveryRepository = deliveryRepository;
        this.orderRepository = orderRepository;
        this.orderStatusRepository = orderStatusRepository;
        this.userRepository = userRepository;
        this.emailService = emailService;
    }

    public Delivery scheduleDelivery(ScheduleDeliveryRequest deliveryRequest) throws IllegalArgumentException {
        Order order = this.orderRepository.findByOrderID(deliveryRequest.getOrderID());
        if (order == null ||
                (order.getStatus().getName() != EOrderStatus.ORDER_STATUS_APPROVED &&
                        order.getStatus().getName() != EOrderStatus.ORDER_STATUS_PAID))
            throw new IllegalArgumentException();
        Set<User> shippers = new HashSet<>();
        for (Long shipperID : deliveryRequest.getShippers()) {
            User shipper = userRepository.findById(shipperID).get();
            if (shipper.getRoles().stream().filter(r -> r.getName().equals(ERole.ROLE_SHIPPER)).findFirst().isPresent())
                shippers.add(shipper);
            else
                throw new IllegalArgumentException();
        }

        Delivery delivery = new Delivery();
        delivery.setOrder(order);
        delivery.setShippers(shippers);
        delivery.setStartLocation(deliveryRequest.getStartLocation());
        delivery.setEndLocation(deliveryRequest.getEndLocation());
        delivery.setStartTime(deliveryRequest.getStartTime());
        delivery.setVehicleNumber(deliveryRequest.getVehicleNumber());
        delivery.setVehicleType(deliveryRequest.getVehicleType());

        Delivery newDelivery = this.deliveryRepository.save(delivery);

        order = this.orderRepository.findByOrderID(deliveryRequest.getOrderID());
        OrderStatus status = this.orderStatusRepository.findByName(EOrderStatus.ORDER_STATUS_SCHEDULED).get();
        order.setStatus(status);
        this.orderRepository.save(order);

        this.emailService.sendSimpleMessage(order.getEmail(), "[DispoSell] Order scheduled", "Your order #" + order.getOrderID() + " was scheduled for delivery.");
        this.emailService.sendSimpleMessageToAdmin( "[DispoSell] Order scheduled", "Order #" + order.getOrderID() + " was scheduled for delivery.");

        return this.deliveryRepository.findById(newDelivery.getDeliveryID()).get();
    }
}