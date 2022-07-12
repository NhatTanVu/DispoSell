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

    public OrderService(ProductService productService, TradeOrderRepository tradeOrderRepository,
                        OrderDetailRepository orderDetailRepository, ProductRepository productRepository,
                        PurchaseOrderRepository purchaseOrderRepository) {
        this.productService = productService;
        this.tradeOrderRepository = tradeOrderRepository;
        this.orderDetailRepository = orderDetailRepository;
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

            PurchaseOrder newOrder = this.purchaseOrderRepository.save(purchaseOrder);
            for (OrderDetail orderDetail : purchaseOrder.getOrderDetails()) {
                orderDetail.setOrder(newOrder);
                this.orderDetailRepository.save(orderDetail);
            }

            return newOrder;
        } else
            throw new IllegalArgumentException();
    }
}