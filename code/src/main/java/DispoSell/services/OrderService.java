package DispoSell.services;

import DispoSell.models.*;
import DispoSell.repositories.*;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public class OrderService {
    private final ProductService productService;
    private final TradeOrderRepository tradeOrderRepository;
    private final OrderDetailRepository orderDetailRepository;
    private final PurchaseOrderRepository purchaseOrderRepository;
    private final EmailService emailService;
    private final OrderStatusRepository orderStatusRepository;

    public OrderService(ProductService productService, TradeOrderRepository tradeOrderRepository,
                        OrderDetailRepository orderDetailRepository, PurchaseOrderRepository purchaseOrderRepository,
                        EmailService emailService, OrderStatusRepository orderStatusRepository) {
        this.productService = productService;
        this.tradeOrderRepository = tradeOrderRepository;
        this.orderDetailRepository = orderDetailRepository;
        this.purchaseOrderRepository = purchaseOrderRepository;
        this.emailService = emailService;
        this.orderStatusRepository = orderStatusRepository;
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

        this.emailService.sendSimpleMessage(newOrder.getEmail(), "[DispoSell] Trade Order created", "Your trade order #" + newOrder.getOrderID() + " was created.");
        this.emailService.sendSimpleMessageToAdmin( "[DispoSell] Trade Order created", "New trade order #" + newOrder.getOrderID() + " was created.");

        return newOrder;
    }

    public PurchaseOrder createPurchaseOrder(PurchaseOrder purchaseOrder) {
        if (purchaseOrder == null)
            throw new IllegalArgumentException();

        if (purchaseOrder.getOrderedDate() == null) {
            purchaseOrder.setOrderedDate(java.time.ZonedDateTime.now());
        }
        purchaseOrder.setPurchaseOrder(true);
        String paymentTransactionID = purchaseOrder.getPaymentTransactionID();
        if (!paymentTransactionID.isEmpty()) {
            if (purchaseOrder.getOrderDetails() != null) {
                for (OrderDetail orderDetail : purchaseOrder.getOrderDetails()) {
                    Product purchasedProduct = orderDetail.getProduct();
                    this.productService.updateAvailableQuantity(purchasedProduct.getProductID(), orderDetail.getQuantity());
                }
            }
            else {
                throw new IllegalArgumentException();
            }

            OrderStatus status = orderStatusRepository.findByName(EOrderStatus.ORDER_STATUS_PAID).get();
            purchaseOrder.setStatus(status);
            PurchaseOrder newOrder = this.purchaseOrderRepository.save(purchaseOrder);
            for (OrderDetail orderDetail : purchaseOrder.getOrderDetails()) {
                orderDetail.setOrder(newOrder);
                this.orderDetailRepository.save(orderDetail);
            }

            this.emailService.sendSimpleMessage(newOrder.getEmail(), "[DispoSell] Purchase Order created", "Your purchase order #" + newOrder.getOrderID() + " was created.");
            this.emailService.sendSimpleMessageToAdmin( "[DispoSell] Purchase Order created", "New purchase order #" + newOrder.getOrderID() + " was created.");

            return newOrder;
        } else
            throw new IllegalArgumentException();
    }
}
