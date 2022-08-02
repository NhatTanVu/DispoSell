package DispoSell.controllers;

import DispoSell.models.*;
import DispoSell.repositories.*;
import DispoSell.services.*;
import org.aspectj.lang.annotation.Before;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.*;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.*;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class OrderControllerTest {
    @InjectMocks
    private OrderController orderControllerImpl;

    @Mock
    private OrderService orderService;

    @Mock
    private PurchaseOrderRepository purchaseOrderRepository;

    @Mock
    private TradeOrderRepository tradeOrderRepository;

    @Mock
    private OrderStatusRepository orderStatusRepository;

    @Before("")
    public void init() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void getAllPurchaseOrders() {
        // Arrange
        PurchaseOrder purchaseOrder1 = new PurchaseOrder();
        purchaseOrder1.setOrderID(1L);
        List<PurchaseOrder> purchaseOrders = new ArrayList<>(
                Arrays.asList(purchaseOrder1)
        );
        when(purchaseOrderRepository.findAll()).thenReturn(purchaseOrders);
        // Act
        List<PurchaseOrder> orders = orderControllerImpl.getAllPurchaseOrders();
        // Assert
        assertEquals(purchaseOrders, orders);
    }

    @Test
    void getAllTradeOrders() {
        // Arrange
        TradeOrder tradeOrder1 = new TradeOrder();
        tradeOrder1.setOrderID(1L);
        List<TradeOrder> tradeOrders = new ArrayList<>(
                Arrays.asList(tradeOrder1)
        );
        when(tradeOrderRepository.findAll()).thenReturn(tradeOrders);
        // Act
        List<TradeOrder> orders = orderControllerImpl.getAllTradeOrders();
        // Assert
        assertEquals(tradeOrders, orders);
    }

    @Test
    void createTradeOrder() {
        User user = new User();
        user.setId(1L);
        user.setEmail("test@email.com");
        user.setContactAddress("123 Street, Vancouver, BC, X1X 1X1");
        user.setPhoneNumber("123412341");
        user.setFirstName("FirstName");
        user.setLastName("LastName");
        user.setPassword("password");
        user.setUsername("user");
        Set<Role> role = new HashSet<>();
        Role roleUser = new Role(ERole.ROLE_USER);
        role.add(roleUser);
        user.setRoles(role);
        Set<OrderDetail> orderDetailSet = new HashSet<>();
        TradeOrder tradeOrder = new TradeOrder();
        tradeOrder.setOrderID(1L);
        tradeOrder.setOrderDetails(orderDetailSet);
        tradeOrder.setPurchaseOrder(false);
        tradeOrder.setOrderedDate(java.time.ZonedDateTime.now());
        tradeOrder.setEmail(user.getEmail());
        tradeOrder.setAddress(user.getContactAddress());
        tradeOrder.setContactNumber(user.getPhoneNumber());
        tradeOrder.setFirstName(user.getFirstName());
        tradeOrder.setLastName(user.getLastName());
        tradeOrder.setCredit(null);
        tradeOrder.setScheduledDate(null);
        tradeOrder.setUser(user);

        when(orderService.createTradeOrder(tradeOrder)).thenReturn(tradeOrder);

        ResponseEntity<?> response = orderControllerImpl.createTradeOrder(tradeOrder);

        assertEquals(HttpStatus.OK.value(), response.getStatusCodeValue());
        assertEquals(tradeOrder, response.getBody());
        assertEquals(false, tradeOrder.getPurchaseOrder());
        verify(orderService).createTradeOrder(tradeOrder);
    }

    @Test
    void createPurchaseOrder() {
        Set<OrderDetail> orderDetailSet = new HashSet<>();
        PurchaseOrder purchaseOrder = new PurchaseOrder();
        OrderStatus status = new OrderStatus();
        status.setName(EOrderStatus.ORDER_STATUS_PAID);
        purchaseOrder.setStatus(status);
        purchaseOrder.setPurchaseOrder(true);
        purchaseOrder.setOrderID(1L);
        purchaseOrder.setEmail("test@email.com");
        purchaseOrder.setAddress("123 Street, Vancouver, BC, X1X 1X1");
        purchaseOrder.setContactNumber("123412341");
        purchaseOrder.setFirstName("FirstName");
        purchaseOrder.setLastName("LastName");
        purchaseOrder.setOrderDetails(orderDetailSet);
        purchaseOrder.setCredit(null);
        purchaseOrder.setUser(null);
        purchaseOrder.setScheduledDate(null);
        purchaseOrder.setOrderedDate(java.time.ZonedDateTime.now());
        purchaseOrder.setPaymentDate(null);
        purchaseOrder.setPaymentAmount(99F);
        purchaseOrder.setPaymentMethod(null);
        purchaseOrder.setPaymentTransactionID("test");

        when(orderService.createPurchaseOrder(purchaseOrder)).thenReturn(purchaseOrder);

        ResponseEntity<?> response = orderControllerImpl.createPurchaseOrder(purchaseOrder);

        assertEquals(HttpStatus.OK.value(), response.getStatusCodeValue());
        assertEquals(purchaseOrder, response.getBody());
        assertEquals(1L, purchaseOrder.getOrderID());
        verify(orderService).createPurchaseOrder(purchaseOrder);
    }

    @Test
    void getPurchaseOrderByID() {
        PurchaseOrder purchaseOrder = new PurchaseOrder();
        purchaseOrder.setOrderID(1L);
        Order id = purchaseOrder;

        when(purchaseOrderRepository.findByOrderID(purchaseOrder.getOrderID())).thenReturn(purchaseOrder);

        Order orderID = orderControllerImpl.getPurchaseOrderByID(1L);

        assertEquals(id, orderID);
    }

    @Test
    void getTradeOrderByID() {
        TradeOrder tradeOrder = new TradeOrder();
        tradeOrder.setOrderID(1L);
        Order id = tradeOrder;

        when(tradeOrderRepository.findByOrderID(tradeOrder.getOrderID())).thenReturn(tradeOrder);

        Order orderID = orderControllerImpl.getTradeOrderByID(1L);

        assertEquals(id, orderID);
    }
}