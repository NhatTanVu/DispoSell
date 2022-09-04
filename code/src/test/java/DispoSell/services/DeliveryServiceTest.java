package DispoSell.services;

import DispoSell.models.*;
import DispoSell.payload.request.ScheduleDeliveryRequest;
import DispoSell.payload.request.TrackingInfo;
import DispoSell.repositories.*;
import org.aspectj.lang.annotation.Before;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class DeliveryServiceTest {

    @InjectMocks
    DeliveryService deliveryService = spy(new DeliveryService());

    @Mock
    DeliveryRepository deliveryRepository;

    @Mock
    OrderRepository orderRepository;

    @Mock
    OrderStatusRepository orderStatusRepository;

    @Mock
    UserRepository userRepository;

    @Mock
    EmailService emailService;

    @Before("")
    public void init() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void scheduleDelivery() {
        // Arrange
        ScheduleDeliveryRequest deliveryRequest = new ScheduleDeliveryRequest();
        long orderID = 1;
        long shipperID = 3;
        ArrayList<Long> shipperIDs = new ArrayList<>();
        shipperIDs.add(shipperID);
        deliveryRequest.setOrderID(orderID);
        deliveryRequest.setShippers(shipperIDs);
        Order order = new Order();
        order.setStatus(new OrderStatus(EOrderStatus.ORDER_STATUS_PAID));
        User shipper = new User();
        HashSet<Role> roles = new HashSet<>();
        roles.add(new Role(ERole.ROLE_SHIPPER));
        shipper.setRoles(roles);
        when(orderRepository.findByOrderID(orderID)).thenReturn(order);
        when(userRepository.findById(shipperID)).thenReturn(Optional.of(shipper));
        when(orderStatusRepository.findByName(EOrderStatus.ORDER_STATUS_SCHEDULED)).thenReturn(Optional.of(new OrderStatus(EOrderStatus.ORDER_STATUS_SCHEDULED)));
        Delivery savedDelivery = new Delivery();
        when(deliveryRepository.save(any())).thenReturn(savedDelivery);
        when(deliveryRepository.findById(any())).thenReturn(Optional.of(savedDelivery));
        MockHttpServletRequest request = new MockHttpServletRequest();
        RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));
        // Act
        Delivery response = deliveryService.scheduleDelivery(deliveryRequest);
        // Assert
        verify(deliveryRepository, times(1)).save(any());
        assertEquals(savedDelivery, response);
        verify(emailService, times(1)).sendHtmlMessage(any(), any(), any());
        verify(emailService, times(1)).sendHtmlMessageToAdmin(any(), any());
    }

    @Test
    void scheduleDelivery_noOrder() {
        // Arrange
        ScheduleDeliveryRequest deliveryRequest = new ScheduleDeliveryRequest();
        long orderID = 1;
        long shipperID = 3;
        ArrayList<Long> shipperIDs = new ArrayList<>();
        shipperIDs.add(shipperID);
        deliveryRequest.setOrderID(orderID);
        deliveryRequest.setShippers(shipperIDs);
        when(orderRepository.findByOrderID(orderID)).thenReturn(null);
        // Act + Assert
        assertThrows(IllegalArgumentException.class, () -> {
            deliveryService.scheduleDelivery(deliveryRequest);
        });
    }

    @Test
    void scheduleDelivery_noShipper() {
        // Arrange
        ScheduleDeliveryRequest deliveryRequest = new ScheduleDeliveryRequest();
        long orderID = 1;
        long shipperID = 3;
        ArrayList<Long> shipperIDs = new ArrayList<>();
        shipperIDs.add(shipperID);
        deliveryRequest.setOrderID(orderID);
        deliveryRequest.setShippers(shipperIDs);
        Order order = new Order();
        order.setStatus(new OrderStatus(EOrderStatus.ORDER_STATUS_PAID));
        User user = new User();
        HashSet<Role> roles = new HashSet<>();
        roles.add(new Role(ERole.ROLE_USER));
        roles.add(new Role(ERole.ROLE_ADMINISTRATOR));
        user.setRoles(roles);
        when(orderRepository.findByOrderID(orderID)).thenReturn(order);
        when(userRepository.findById(shipperID)).thenReturn(Optional.of(user));
        // Act + Assert
        assertThrows(IllegalArgumentException.class, () -> {
            deliveryService.scheduleDelivery(deliveryRequest);
        });
    }

    @Test
    void startDelivery() {
        // Arrange
        long orderID = 1;
        Order order = new Order();
        order.setOrderID(orderID);
        order.setStatus(new OrderStatus(EOrderStatus.ORDER_STATUS_SCHEDULED));
        when(orderRepository.findByOrderID(orderID)).thenReturn(order);
        when(orderStatusRepository.findByName(EOrderStatus.ORDER_STATUS_IN_DELIVERY)).thenReturn(Optional.of(new OrderStatus(EOrderStatus.ORDER_STATUS_IN_DELIVERY)));
        Order inDeliveryOrder = new Order();
        inDeliveryOrder.setOrderID(orderID);
        inDeliveryOrder.setStatus(new OrderStatus(EOrderStatus.ORDER_STATUS_IN_DELIVERY));
        when(orderRepository.save(order)).thenReturn(inDeliveryOrder);
        // Act
        Order response = deliveryService.startDelivery(orderID);
        // Assert
        assertEquals(inDeliveryOrder, response);
        assertEquals(orderID, response.getOrderID());
    }

    @Test
    void startDelivery_nullOrder() {
        // Arrange
        long orderID = 1;
        when(orderRepository.findByOrderID(orderID)).thenReturn(null);
        // Act
        Order response = deliveryService.startDelivery(orderID);
        // Assert
        assertEquals(null, response);
    }

    @Test
    void startDelivery_invalidOrderStatus() {
        // Arrange
        long orderID = 1;
        Order order = new Order();
        order.setOrderID(orderID);
        order.setStatus(new OrderStatus(EOrderStatus.ORDER_STATUS_PAID));
        when(orderRepository.findByOrderID(orderID)).thenReturn(order);
        // Act + Assert
        assertThrows(IllegalArgumentException.class, () -> {
            deliveryService.startDelivery(orderID);
        });
    }

    @Test
    void updateTracking() {
        // Arrange
        long deliveryID = 1;
        double lat = 49.203691381047534;
        double lng = -122.91278600692749;
        TrackingInfo info = new TrackingInfo();
        info.setDeliveryID(deliveryID);
        info.setLat(lat);
        info.setLng(lng);
        String currentLocation = "{\"lat\": " + info.getLat() + ", \"lng\": " + info.getLng() + "}";
        Delivery delivery = new Delivery();
        delivery.setCurrentLocation(currentLocation);
        when(deliveryRepository.findById(deliveryID)).thenReturn(Optional.of(delivery));
        // Act
        deliveryService.updateTracking(info);
        // Assert
        verify(deliveryRepository, times(1)).save(delivery);
    }

    @Test
    void endDelivery() {
        // Arrange
        long orderID = 1;
        Order order = new Order();
        order.setOrderID(orderID);
        when(orderRepository.findByOrderID(orderID)).thenReturn(order);
        when(orderStatusRepository.findByName(EOrderStatus.ORDER_STATUS_DONE)).thenReturn(Optional.of(new OrderStatus(EOrderStatus.ORDER_STATUS_DONE)));
        Order doneOrder = new Order();
        doneOrder.setOrderID(orderID);
        doneOrder.setStatus(new OrderStatus(EOrderStatus.ORDER_STATUS_DONE));
        when(orderRepository.save(order)).thenReturn(doneOrder);
        // Act
        Order response = deliveryService.endDelivery(orderID);
        // Assert
        assertEquals(doneOrder, response);
        assertEquals(orderID, response.getOrderID());
    }

    @Test
    void endDelivery_nullOrder() {
        // Arrange
        when(orderRepository.findByOrderID(any())).thenReturn(null);
        // Act
        Order response = deliveryService.endDelivery(any());
        // Assert
        assertEquals(null, response);
    }

    @Test
    void completeTracking() {
        // Arrange
        long deliveryID = 1;
        long orderID = 2;
        Order order = new Order();
        order.setOrderID(orderID);
        Delivery delivery = new Delivery();
        delivery.setDeliveryID(deliveryID);
        delivery.setOrder(order);
        when(deliveryRepository.findById(deliveryID)).thenReturn(Optional.of(delivery));
        TrackingInfo trackingInfo = new TrackingInfo();
        trackingInfo.setDeliveryID(deliveryID);
        Order returnOrder = new Order();
        returnOrder.setOrderID(orderID);
        doReturn(returnOrder).when(deliveryService).endDelivery(orderID);
        // Act
        deliveryService.completeTracking(trackingInfo);
        // Assert
        verify(deliveryService, times(1)).endDelivery(orderID);
    }
}