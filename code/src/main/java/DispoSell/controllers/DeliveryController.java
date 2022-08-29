package DispoSell.controllers;

import DispoSell.models.Delivery;
import DispoSell.models.Order;
import DispoSell.payload.request.ScheduleDeliveryRequest;
import DispoSell.payload.request.TrackingInfo;
import DispoSell.repositories.DeliveryRepository;
import DispoSell.services.DeliveryService;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
public class DeliveryController {
    private final DeliveryRepository deliveryRepository;
    private final DeliveryService deliveryService;

    public DeliveryController(DeliveryRepository deliveryRepository, DeliveryService deliveryService) {
        this.deliveryRepository = deliveryRepository;
        this.deliveryService = deliveryService;
    }

    @GetMapping("/api/deliveries")
    public List<Delivery> getAllDeliveries() {
        List<Delivery> list = deliveryRepository.findAll();
        return list;
    }

    @PostMapping("/api/scheduleDelivery")
    @PreAuthorize("hasRole('ROLE_ADMINISTRATOR')")
    public ResponseEntity<?> scheduleDelivery(@RequestBody ScheduleDeliveryRequest deliveryRequest) {
        try {
            Delivery delivery = deliveryService.scheduleDelivery(deliveryRequest);
            return ResponseEntity.ok(delivery);
        } catch (IllegalArgumentException illegalArgumentException) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/api/startDelivery")
    @PreAuthorize("hasRole('ROLE_ADMINISTRATOR') || hasRole('ROLE_SHIPPER')")
    public ResponseEntity<?> startDelivery(@RequestBody long orderID) {
        try {
            Order result = deliveryService.startDelivery(orderID);
            return ResponseEntity.ok(result);
        } catch (IllegalArgumentException illegalArgumentException) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/api/endDelivery")
    @PreAuthorize("hasRole('ROLE_ADMINISTRATOR') || hasRole('ROLE_SHIPPER')")
    public ResponseEntity<?> endDelivery(@RequestBody long orderID) {
        try {
            Order result = deliveryService.endDelivery(orderID);
            return ResponseEntity.ok(result);
        } catch (IllegalArgumentException illegalArgumentException) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/api/deliveryByOrderID")
    public Delivery getDeliveryByOrderID(@RequestParam(value = "orderID") Long orderID) {
        Delivery id = deliveryRepository.findByOrderOrderID(orderID);
        return id;
    }

    @MessageMapping("/updateTracking")
    @SendTo("/onTrackingUpdated")
    public TrackingInfo updateTracking(TrackingInfo info) {
        return deliveryService.updateTracking(info);
    }

    @MessageMapping("/completeTracking")
    @SendTo("/onTrackingCompleted")
    public boolean completeTracking(TrackingInfo info) {
        return deliveryService.completeTracking(info);
    }
}
