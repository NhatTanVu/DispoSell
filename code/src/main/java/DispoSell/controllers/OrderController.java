package DispoSell.controllers;

import DispoSell.models.Order;
import DispoSell.models.ProductCategory;
import DispoSell.models.PurchaseOrder;
import DispoSell.models.TradeOrder;
import DispoSell.payload.request.LoginRequest;
import DispoSell.payload.response.JwtResponse;
import DispoSell.repositories.PurchaseOrderRepository;
import DispoSell.repositories.TradeOrderRepository;
import DispoSell.services.OrderService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
public class OrderController {

    private final OrderService orderService;
    private final PurchaseOrderRepository purchaseOrderRepository;
    private final TradeOrderRepository tradeOrderRepository;

    public OrderController(OrderService orderService,
                           PurchaseOrderRepository purchaseOrderRepository,
                           TradeOrderRepository tradeOrderRepository) {

        this.orderService = orderService;
        this.purchaseOrderRepository = purchaseOrderRepository;
        this.tradeOrderRepository = tradeOrderRepository;
    }

    @GetMapping("/api/purchaseorders")
    public List<PurchaseOrder> getAllPurchaseOrders() {
        List<PurchaseOrder> list = purchaseOrderRepository.findAll();
        return list;
    }

    @GetMapping("/api/tradeorders")
    public List<TradeOrder> getAllTradeOrders() {
        List<TradeOrder> list = tradeOrderRepository.findAll();
        return list;
    }

    @PostMapping("/api/createtradeorder")
    public ResponseEntity<?> createTradeOrder(@RequestBody TradeOrder tradeOrder) {
        return ResponseEntity.ok(orderService.createTradeOrder(tradeOrder));
    }

    @PostMapping("/api/createpurchaseorder")
    public ResponseEntity<?> createPurchaseOrder(@RequestBody PurchaseOrder purchaseOrder) {
        return ResponseEntity.ok(orderService.createPurchaseOrder(purchaseOrder));
    }
}
