package DispoSell.controllers;

import DispoSell.models.*;
import DispoSell.payload.request.ScheduleDeliveryRequest;
import DispoSell.payload.request.TrackingInfo;
import DispoSell.repositories.DeliveryRepository;
import DispoSell.services.DeliveryService;
import org.aspectj.lang.annotation.Before;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.*;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class DeliveryControllerTest {

    @InjectMocks
    private DeliveryController deliveryControllerImpl;

    @Mock
    private DeliveryService deliveryService;

    @Mock
    private DeliveryRepository deliveryRepository;

    @Before("")
    public void init() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void getAllDeliveries() {
        // Arrange
        Delivery deliveryID = new Delivery();
        deliveryID.setDeliveryID(1L);
        List<Delivery> deliveries = new ArrayList<>(
                Arrays.asList(deliveryID)
        );
        when(deliveryRepository.findAll()).thenReturn(deliveries);
        // Act
        List<Delivery> scheduledDeliveries = deliveryControllerImpl.getAllDeliveries();
        // Assert
        assertEquals(deliveries, scheduledDeliveries);
    }

    @Test
    void scheduleDelivery() {
        // Arrange
        ScheduleDeliveryRequest deliveryRequest = new ScheduleDeliveryRequest();
        Delivery scheduleDelivery = new Delivery();
        when(deliveryService.scheduleDelivery(deliveryRequest)).thenReturn(scheduleDelivery);
        // Act
        ResponseEntity<?> response = deliveryControllerImpl.scheduleDelivery(deliveryRequest);
        // Assert
        assertEquals(HttpStatus.OK.value(), response.getStatusCodeValue());
        assertEquals(scheduleDelivery, response.getBody());
    }


    @Test
    void scheduleDelivery_badRequest() {
        // Arrange
        ScheduleDeliveryRequest deliveryRequest = new ScheduleDeliveryRequest();
        when(deliveryService.scheduleDelivery(deliveryRequest)).thenThrow(IllegalArgumentException.class);
        // Act
        ResponseEntity<?> response = deliveryControllerImpl.scheduleDelivery(deliveryRequest);
        // Assert
        assertEquals(HttpStatus.BAD_REQUEST.value(), response.getStatusCodeValue());
    }

    @Test
    void startDelivery() {
        // Arrange
        long orderID = 1;
        Order order = new Order();
        order.setOrderID(orderID);
        when(deliveryService.startDelivery(orderID)).thenReturn(order);
        // Act
        ResponseEntity<?> response = deliveryControllerImpl.startDelivery(orderID);
        // Assert
        assertEquals(HttpStatus.OK.value(), response.getStatusCodeValue());
        assertEquals(order, response.getBody());
        verify(deliveryService, times(1)).startDelivery(orderID);
    }

    @Test
    void startDelivery_notFound() {
        // Arrange
        long orderID = 1;
        when(deliveryService.startDelivery(orderID)).thenReturn(null);
        // Act
        ResponseEntity<?> response = deliveryControllerImpl.startDelivery(orderID);
        // Assert
        assertEquals(HttpStatus.NOT_FOUND.value(), response.getStatusCodeValue());
        verify(deliveryService, times(1)).startDelivery(orderID);
    }

    @Test
    void endDelivery() {
        // Arrange
        long orderID = 1;
        Order order = new Order();
        order.setOrderID(orderID);
        when(deliveryService.endDelivery(orderID)).thenReturn(order);
        // Act
        ResponseEntity<?> response = deliveryControllerImpl.endDelivery(orderID);
        // Assert
        assertEquals(HttpStatus.OK.value(), response.getStatusCodeValue());
        assertEquals(order, response.getBody());
        verify(deliveryService, times(1)).endDelivery(orderID);
    }

    @Test
    void endDelivery_notFound() {
        // Arrange
        long orderID = 1;
        when(deliveryService.endDelivery(orderID)).thenReturn(null);
        // Act
        ResponseEntity<?> response = deliveryControllerImpl.endDelivery(orderID);
        // Assert
        assertEquals(HttpStatus.NOT_FOUND.value(), response.getStatusCodeValue());
        verify(deliveryService, times(1)).endDelivery(orderID);
    }

    @Test
    void getDeliveryByOrderID() {
        // Arrange
        long orderID = 1;
        Order order = new Order();
        order.setOrderID(orderID);
        Delivery delivery = new Delivery();
        delivery.setOrder(order);
        when(deliveryRepository.findByOrderOrderID(orderID)).thenReturn(delivery);
        // Act
        Delivery response = deliveryControllerImpl.getDeliveryByOrderID(orderID);
        // Assert
        assertEquals(delivery, response);
        verify(deliveryRepository, times(1)).findByOrderOrderID(orderID);
    }

    @Test
    void updateTracking() {
        // Arrange
        TrackingInfo info = new TrackingInfo();
        TrackingInfo updatedInfo = new TrackingInfo();
        when(deliveryService.updateTracking(info)).thenReturn(updatedInfo);
        // Act
        TrackingInfo response = deliveryControllerImpl.updateTracking(info);
        // Assert
        assertEquals(info, response);
        verify(deliveryService, times(1)).updateTracking(info);
    }

    @Test
    void completeTracking() {
        // Arrange
        TrackingInfo info = new TrackingInfo();
        when(deliveryService.completeTracking(info)).thenReturn(true);
        // Act
        boolean response = deliveryControllerImpl.completeTracking(info);
        // Assert
        assertEquals(true, response);
        verify(deliveryService, times(1)).completeTracking(info);
    }
}