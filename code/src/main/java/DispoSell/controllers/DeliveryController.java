package DispoSell.controllers;

import DispoSell.models.Delivery;
import DispoSell.payload.request.ScheduleDeliveryRequest;
import DispoSell.repositories.DeliveryRepository;
import DispoSell.services.DeliveryService;
import org.springframework.http.ResponseEntity;
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
        }
        catch (IllegalArgumentException illegalArgumentException) {
            return ResponseEntity.badRequest().build();
        }
    }
}
