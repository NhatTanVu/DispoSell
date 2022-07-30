package DispoSell.services;

import DispoSell.repositories.*;
import DispoSell.models.*;
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

import java.util.HashSet;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class OrderServiceTest {

    @InjectMocks
    OrderService orderService;

    @Mock
    ProductService productService;

    @Mock
    TradeOrderRepository tradeOrderRepository;

    @Mock
    OrderDetailRepository orderDetailRepository;

    @Mock
    PurchaseOrderRepository purchaseOrderRepository;

    @Mock
    EmailService emailService;

    @Mock
    OrderStatusRepository orderStatusRepository;

    @Before("")
    public void init() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void createTradeOrder() {
        // Arrange
        Long orderID = 1L;
        String testEmail = "test@gmail.com";
        String testEmailSubject = "[DispoSell] Trade Order created";
        String testEmailContent = "Trade Order <a target='_blank' href='http://localhost/orderDetail/" + orderID + "'>#" + orderID + "</a> was created.";
        TradeOrder tradeOrder = new TradeOrder();
        tradeOrder.setOrderID(orderID);
        tradeOrder.setEmail(testEmail);
        when(tradeOrderRepository.save(tradeOrder)).thenReturn(tradeOrder);
        MockHttpServletRequest request = new MockHttpServletRequest();
        RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));
        // Act
        orderService.createTradeOrder(tradeOrder);
        // Assert
        verify(tradeOrderRepository).save(tradeOrder);
        verify(emailService).sendHtmlMessage(testEmail, testEmailSubject, testEmailContent);
        verify(emailService).sendHtmlMessageToAdmin(testEmailSubject, testEmailContent);
    }

    @Test
    void createPurchaseOrder_nullPurchaseOrder() {
        // Arrange + Act + Assert
        assertThrows(IllegalArgumentException.class, () -> {
            orderService.createPurchaseOrder(null);
        });
    }

    @Test
    void createPurchaseOrder_emptyPaymentTransactionID() {
        // Arrange
        PurchaseOrder purchaseOrder = new PurchaseOrder();
        purchaseOrder.setPaymentTransactionID("");
        // Act + Assert
        assertThrows(IllegalArgumentException.class, () -> {
            orderService.createPurchaseOrder(purchaseOrder);
        });
    }

    @Test
    void createPurchaseOrder_noOrderDetails() {
        // Arrange
        PurchaseOrder purchaseOrder = new PurchaseOrder();
        purchaseOrder.setPaymentTransactionID("paymentTransactionID");
        // Act + Assert
        assertThrows(IllegalArgumentException.class, () -> {
            orderService.createPurchaseOrder(purchaseOrder);
        });
    }

    @Test
    void createPurchaseOrder() {
        // Arrange
        Long orderID = 1L;
        Long productID = 1L;
        int productQuantity = 2;
        String testEmail = "test@gmail.com";
        String testEmailSubject = "[DispoSell] Purchase Order created";
        String testEmailContent = "Purchase Order <a target='_blank' href='http://localhost/orderDetail/" + orderID + "'>#" + orderID + "</a> was created.";
        PurchaseOrder purchaseOrder = new PurchaseOrder();
        purchaseOrder.setEmail(testEmail);
        purchaseOrder.setOrderID(orderID);
        purchaseOrder.setPaymentTransactionID("paymentTransactionID");
        Product product = new Product();
        product.setProductID(productID);
        OrderDetail orderDetail = new OrderDetail(purchaseOrder, product, productQuantity);
        HashSet<OrderDetail> orderDetails = new HashSet<>();
        orderDetails.add(orderDetail);
        purchaseOrder.setOrderDetails(orderDetails);
        when(orderStatusRepository.findByName(EOrderStatus.ORDER_STATUS_PAID)).thenReturn(Optional.of(new OrderStatus(EOrderStatus.ORDER_STATUS_PAID)));
        when(purchaseOrderRepository.save(purchaseOrder)).thenReturn(purchaseOrder);
        MockHttpServletRequest request = new MockHttpServletRequest();
        RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));
        // Act
        orderService.createPurchaseOrder(purchaseOrder);
        // Assert
        verify(productService).updateAvailableQuantity(productID, productQuantity);
        verify(orderStatusRepository).findByName(EOrderStatus.ORDER_STATUS_PAID);
        verify(purchaseOrderRepository).save(purchaseOrder);
        verify(orderDetailRepository).save(orderDetail);
        verify(emailService).sendHtmlMessage(testEmail, testEmailSubject, testEmailContent);
        verify(emailService).sendHtmlMessageToAdmin(testEmailSubject, testEmailContent);
    }
}