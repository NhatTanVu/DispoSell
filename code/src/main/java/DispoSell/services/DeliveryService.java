package DispoSell.services;

import DispoSell.models.*;
import DispoSell.payload.request.*;
import DispoSell.repositories.*;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

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

    public String getOrderType(Order order) {
        return (order instanceof PurchaseOrder) ? "Purchase Order" : "Trade Order";
    }

    private String getMailContent(Order order, Delivery delivery) {
        String baseUrl = ServletUriComponentsBuilder.fromCurrentRequestUri()
                .replacePath(null)
                .build()
                .toUriString();
        String content = getOrderType(order) + " <a target='_blank' href='" + baseUrl + "/orderDetails/"
                + order.getOrderID() + "'>#" + order.getOrderID()
                + "</a> was scheduled for delivery on "
                + delivery.getEndTime() + ".";
        return content;
    }

    private String getMailSubject(Order order) {
        return "[DispoSell] " + getOrderType(order) + " scheduled";
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
        delivery.setEndTime(deliveryRequest.getEndTime());
        delivery.setVehicleNumber(deliveryRequest.getVehicleNumber());
        delivery.setVehicleType(deliveryRequest.getVehicleType());

        Delivery newDelivery = this.deliveryRepository.save(delivery);

        order = this.orderRepository.findByOrderID(deliveryRequest.getOrderID());
        OrderStatus status = this.orderStatusRepository.findByName(EOrderStatus.ORDER_STATUS_SCHEDULED).get();
        order.setStatus(status);
        this.orderRepository.save(order);

        newDelivery = this.deliveryRepository.findById(newDelivery.getDeliveryID()).get();

        this.emailService.sendHtmlMessage(order.getEmail(), getMailSubject(order), getMailContent(order, newDelivery));
        this.emailService.sendHtmlMessageToAdmin(getMailSubject(order), getMailContent(order, newDelivery));

        return newDelivery;
    }

    public Order startDelivery(Long orderID) {
        Order order = orderRepository.findByOrderID(orderID);
        if (order != null) {
            OrderStatus status = this.orderStatusRepository.findByName(EOrderStatus.ORDER_STATUS_IN_DELIVERY).get();
            order.setStatus(status);
            return this.orderRepository.save(order);
        } else {
            return null;
        }
    }

    public TrackingInfo updateTracking(TrackingInfo info) {
        String currentLocation = "{\"lat\": " + info.getLat() + ", \"lng\": " + info.getLng() + "}";
        Delivery delivery = deliveryRepository.findById(info.getDeliveryID()).get();
        delivery.setCurrentLocation(currentLocation);
        deliveryRepository.save(delivery);
        return info;
    }

    public Order endDelivery(Long orderID) {
        Order order = orderRepository.findByOrderID(orderID);
        if (order != null) {
            OrderStatus status = this.orderStatusRepository.findByName(EOrderStatus.ORDER_STATUS_DONE).get();
            order.setStatus(status);
            return this.orderRepository.save(order);
        } else {
            return null;
        }
    }

    public boolean completeTracking(TrackingInfo info) {
        Delivery delivery = deliveryRepository.findById(info.getDeliveryID()).get();
        long orderID = delivery.getOrder().getOrderID();
        endDelivery(orderID);
        return true;
    }
}