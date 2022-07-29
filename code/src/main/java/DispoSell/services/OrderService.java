package DispoSell.services;

import DispoSell.models.*;
import DispoSell.repositories.*;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

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

    private String getOrderType(Order order) {
        return (order instanceof PurchaseOrder) ? "Purchase Order" : "Trade Order";
    }

    private String getMailContent(Order order) {
        String baseUrl = ServletUriComponentsBuilder.fromCurrentRequestUri()
                .replacePath(null)
                .build()
                .toUriString();
        String content = getOrderType(order) + " <a target='_blank' href='" + baseUrl + "/orderDetail/" + order.getOrderID() + "'>#" + order.getOrderID() + "</a> was created.";
        return content;
    }

    private String getMailSubject(Order order) {
        return "[DispoSell] " + getOrderType(order) + " created";
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

        this.emailService.sendHtmlMessage(newOrder.getEmail(), getMailSubject(newOrder), getMailContent(newOrder));
        this.emailService.sendHtmlMessageToAdmin( getMailSubject(newOrder), getMailContent(newOrder));

        return newOrder;
    }

    public PurchaseOrder createPurchaseOrder(PurchaseOrder purchaseOrder) throws IllegalArgumentException {
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

            this.emailService.sendHtmlMessage(newOrder.getEmail(), getMailSubject(newOrder), getMailContent(newOrder));
            this.emailService.sendHtmlMessageToAdmin( getMailSubject(newOrder), getMailContent(newOrder));

            return newOrder;
        } else
            throw new IllegalArgumentException();
    }
}
