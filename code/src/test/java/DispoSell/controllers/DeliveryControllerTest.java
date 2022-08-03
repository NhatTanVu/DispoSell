package DispoSell.controllers;

import DispoSell.models.*;
import DispoSell.payload.request.ScheduleDeliveryRequest;
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
import static org.mockito.Mockito.when;

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
    void scheduleDelivery_nullRequest() {
        // Arrange
        ScheduleDeliveryRequest deliveryRequest = new ScheduleDeliveryRequest();
        when(deliveryService.scheduleDelivery(deliveryRequest)).thenThrow(IllegalArgumentException.class);
        // Act
        ResponseEntity<?> response = deliveryControllerImpl.scheduleDelivery(deliveryRequest);
        // Assert
        assertEquals(HttpStatus.BAD_REQUEST.value(), response.getStatusCodeValue());
    }


}