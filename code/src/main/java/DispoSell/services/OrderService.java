package DispoSell.services;

import DispoSell.models.*;
import DispoSell.repositories.*;
import org.springframework.stereotype.Service;

@Service
public class OrderService {
    private final ProductService productService;
    private final TradeOrderRepository tradeOrderRepository;
    private final OrderDetailRepository orderDetailRepository;
    private final PaymentService paymentService;
    private final PurchaseOrderRepository purchaseOrderRepository;

    public OrderService(ProductService productService, TradeOrderRepository tradeOrderRepository,
                        OrderDetailRepository orderDetailRepository, ProductRepository productRepository,
                        PaymentService paymentService, PurchaseOrderRepository purchaseOrderRepository) {
        this.productService = productService;
        this.tradeOrderRepository = tradeOrderRepository;
        this.orderDetailRepository = orderDetailRepository;
        this.paymentService = paymentService;
        this.purchaseOrderRepository = purchaseOrderRepository;
    }

    public TradeOrder createTradeOrder(TradeOrder tradeOrder) {
        if (tradeOrder.getOrderedDate() == null) {
            tradeOrder.setOrderedDate(java.time.ZonedDateTime.now());
        }
        tradeOrder.setPurchaseOrder(false);

        if (tradeOrder.getOrderDetails() != null) {
            for (OrderDetail orderDetail : tradeOrder.getOrderDetails()) {
                Product newProduct = orderDetail.getProduct();
                newProduct.setAvailableQuantity(orderDetail.getQuantity());
                orderDetail.setProduct(this.productService.createProduct(newProduct));
            }
        }

        TradeOrder newOrder = this.tradeOrderRepository.save(tradeOrder);

        if (tradeOrder.getOrderDetails() != null) {
            for (OrderDetail orderDetail : tradeOrder.getOrderDetails()) {
                orderDetail.setOrder(newOrder);
                this.orderDetailRepository.save(orderDetail);
            }
        }

        return newOrder;
    }

    public PurchaseOrder createPurchaseOrder(PurchaseOrder purchaseOrder) {
        if (purchaseOrder.getOrderedDate() == null) {
            purchaseOrder.setOrderedDate(java.time.ZonedDateTime.now());
        }
        purchaseOrder.setPurchaseOrder(true);
        float amount = purchaseOrder.getPaymentAmount();
        String paymentTransactionID = this.paymentService.sale(amount, "", "");
        if (!paymentTransactionID.isEmpty()) {
            purchaseOrder.setPaymentTransactionID(paymentTransactionID);
            if (purchaseOrder.getOrderDetails() != null) {
                for (OrderDetail orderDetail : purchaseOrder.getOrderDetails()) {
                    Product purchasedProduct = orderDetail.getProduct();
                    this.productService.updateAvailableQuantity(purchasedProduct.getProductID(), orderDetail.getQuantity());
                }
            }

            PurchaseOrder newOrder = this.purchaseOrderRepository.save(purchaseOrder);

            if (purchaseOrder.getOrderDetails() != null) {
                for (OrderDetail orderDetail : purchaseOrder.getOrderDetails()) {
                    orderDetail.setOrder(newOrder);
                    this.orderDetailRepository.save(orderDetail);
                }
            }

            return newOrder;
        } else
            return null;
    }
}
